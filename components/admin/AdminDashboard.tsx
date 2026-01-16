
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { mockRegistrations, managementEvents, culturalEvents } from '../../constants';
import { RegistrationData } from '../../types';
import { calculateRegistrationFee } from '../../utils/feeHelper';
import RegistrationDetailModal from './RegistrationDetailModal';
import { exportEventToCSV } from '../../utils/csvHelper';
import ConfirmationModal from './ConfirmationModal';
import AccountSettingsModal from './AccountSettingsModal';
import UserManagement from './UserManagement';

const AdminDashboard: React.FC = () => {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [isSandboxMode, setIsSandboxMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegistration, setSelectedRegistration] = useState<RegistrationData | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [regToDeleteId, setRegToDeleteId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);
  const [isRevenueDetailVisible, setIsRevenueDetailVisible] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  const loadRegistrations = useCallback(() => {
    const storedRegistrations = localStorage.getItem('allRegistrations');
    let allData: RegistrationData[] = [];
    if (storedRegistrations) {
      try {
        const parsedData = JSON.parse(storedRegistrations);
        if (Array.isArray(parsedData)) {
            allData = parsedData;
        } else {
            console.error("Stored data is not an array, falling back to mock data.");
            allData = mockRegistrations;
        }
      } catch (error) {
        console.error("Failed to parse registrations, falling back to mock data.", error);
        allData = mockRegistrations;
      }
    } else {
      allData = mockRegistrations;
    }
    setRegistrations(allData);
    localStorage.setItem('allRegistrations', JSON.stringify(allData));
  }, []);

  useEffect(() => {
    // IMPORTANT: This localStorage check is NOT secure.
    // In a real app, you would have a protected route that verifies a server-side session (e.g., with Supabase).
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn !== 'true') {
      window.location.href = '/admin';
      return;
    }
    loadRegistrations();
  }, [loadRegistrations]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    window.location.href = '/admin';
  };
  
  const handleUpdateRegistration = useCallback((updatedRegistration: RegistrationData) => {
    const updatedList = registrations.map(reg => reg.id === updatedRegistration.id ? updatedRegistration : reg);
    setRegistrations(updatedList);
    localStorage.setItem('allRegistrations', JSON.stringify(updatedList));
    setSelectedRegistration(updatedRegistration);
  }, [registrations]);

  const handleDeleteRegistration = (registrationId: string) => {
    setRegToDeleteId(registrationId);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (regToDeleteId) {
      const updatedList = registrations.filter(reg => reg.id !== regToDeleteId);
      setRegistrations(updatedList);
      localStorage.setItem('allRegistrations', JSON.stringify(updatedList));
    }
    setIsConfirmOpen(false);
    setRegToDeleteId(null);
  };
  
  const handleDownload = (eventName: string) => {
    exportEventToCSV(registrations, eventName);
  };

  const currentRegistrations = useMemo(() => {
    return registrations.filter(r => !!r.isSandbox === isSandboxMode);
  }, [registrations, isSandboxMode]);

  const filteredRegistrations = useMemo(() => {
    return currentRegistrations.filter(reg =>
      reg.spocName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.teams.some(team => team.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [currentRegistrations, searchTerm]);

  const handleSelect = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredRegistrations.map(r => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleBulkVerify = () => {
    const updatedList = registrations.map(reg => 
      selectedIds.has(reg.id) ? { ...reg, paymentStatus: 'Verified' as const } : reg
    );
    setRegistrations(updatedList);
    localStorage.setItem('allRegistrations', JSON.stringify(updatedList));
    setSelectedIds(new Set());
  };

  const handleBulkDelete = () => setIsBulkConfirmOpen(true);
  
  const confirmBulkDelete = () => {
    const updatedList = registrations.filter(reg => !selectedIds.has(reg.id));
    setRegistrations(updatedList);
    localStorage.setItem('allRegistrations', JSON.stringify(updatedList));
    setIsBulkConfirmOpen(false);
    setSelectedIds(new Set());
  };

  const addSandboxData = () => {
    const sandboxReg: RegistrationData = {
        id: `sb-${new Date().getTime()}`,
        spocName: 'Sandbox User', institute: 'Testing University', email: 'sandbox@test.edu', phone: '1234567890', program: 'PG', course: 'Testing',
        teams: [{ eventName: 'WarRoom', participants: [{name: 'Test Participant', contact: '0987654321'}] }],
        totalParticipants: 1, paymentStatus: 'Pending', isSandbox: true
    };
    const updatedRegs = [...registrations, sandboxReg];
    setRegistrations(updatedRegs);
    localStorage.setItem('allRegistrations', JSON.stringify(updatedRegs));
  };

  const clearSandboxData = () => {
    const liveData = registrations.filter(r => !r.isSandbox);
    setRegistrations(liveData);
    localStorage.setItem('allRegistrations', JSON.stringify(liveData));
  };

  const { totalRevenue, verifiedRevenue, pendingRevenue, rejectedRevenue } = useMemo(() => {
    let verified = 0; let pending = 0; let rejected = 0;
    currentRegistrations.forEach(reg => {
      const fee = calculateRegistrationFee(reg);
      if (reg.paymentStatus === 'Verified') verified += fee;
      else if (reg.paymentStatus === 'Pending') pending += fee;
      else if (reg.paymentStatus === 'Rejected') rejected += fee;
    });
    return { totalRevenue: verified + pending, verifiedRevenue: verified, pendingRevenue: pending, rejectedRevenue: rejected };
  }, [currentRegistrations]);

  const totalTeams = currentRegistrations.reduce((acc, reg) => acc + reg.teams.length, 0);
  const totalParticipants = currentRegistrations.reduce((acc, reg) => acc + reg.totalParticipants, 0);
  
  const allEvents = [...managementEvents, ...culturalEvents];
  
  const getAmountColor = (status: RegistrationData['paymentStatus']) => {
    switch (status) {
        case 'Verified': return 'text-green-400';
        case 'Rejected': return 'text-red-400';
        default: return 'text-white';
    }
  };

  const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode, onClick?: () => void }> = ({ title, value, icon, onClick }) => (
    <div className={`bg-black/30 border border-cyan-500/20 p-6 rounded-lg flex items-center space-x-4 ${onClick ? 'cursor-pointer hover:bg-cyan-900/20' : ''}`} onClick={onClick}>
      <div className="text-cyan-400">{icon}</div>
      <div>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold font-orbitron text-white">{value}</p>
      </div>
    </div>
  );

  const StatusBadge: React.FC<{ status: RegistrationData['paymentStatus'] }> = ({ status }) => {
    const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full inline-block";
    if (status === 'Verified') return <span className={`${baseClasses} bg-green-500/20 text-green-300`}>Verified</span>;
    if (status === 'Rejected') return <span className={`${baseClasses} bg-red-500/20 text-red-300`}>Rejected</span>;
    return <span className={`${baseClasses} bg-yellow-500/20 text-yellow-300`}>Pending</span>;
  };

  const isAllSelected = filteredRegistrations.length > 0 && selectedIds.size === filteredRegistrations.length;

  return (
    <>
      <div className="min-h-screen bg-gray-900/50 text-white">
        <header className="bg-black/50 backdrop-blur-md shadow-lg shadow-cyan-500/10 sticky top-0 z-20">
          <div className="container mx-auto px-6 py-4 flex flex-wrap justify-between items-center gap-4">
             <div className="flex items-center gap-4">
                <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">&larr; Back to Home</a>
                 <button onClick={() => setIsAccountModalOpen(true)} title="Account Settings" className="text-gray-400 hover:text-cyan-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01-.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                </button>
             </div>
            <h1 className="text-2xl font-bold font-orbitron text-cyan-400 order-first sm:order-none w-full sm:w-auto text-center sm:text-left">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
                <label className="flex items-center cursor-pointer">
                    <span className="mr-2 text-sm font-medium">{isSandboxMode ? 'Sandbox Mode' : 'Live Mode'}</span>
                    <div className="relative">
                        <input type="checkbox" checked={isSandboxMode} onChange={() => setIsSandboxMode(!isSandboxMode)} className="sr-only" />
                        <div className="block bg-gray-600 w-12 h-6 rounded-full"></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isSandboxMode ? 'transform translate-x-6 bg-cyan-400' : ''}`}></div>
                    </div>
                </label>
                <button onClick={handleLogout} className="font-semibold text-sm bg-cyan-500 text-black px-4 py-2 rounded-md transition-all duration-300 hover:bg-cyan-400">Logout</button>
            </div>
          </div>
           {isSandboxMode && <div className="bg-yellow-900/50 text-yellow-300 text-center text-sm py-1 px-6 flex justify-between items-center"><span>You are in Sandbox Mode. All data is for testing only.</span><div className="flex gap-2"><button onClick={addSandboxData} className="text-xs hover:underline">Add Sample</button><button onClick={clearSandboxData} className="text-xs hover:underline">Clear All</button></div></div>}
        </header>
        
        <main className="container mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard title="Total Teams Registered" value={totalTeams} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
              <StatCard title="Total Participant Count" value={totalParticipants} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>} />
              <div className="relative">
                <StatCard title="Estimated Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 4h.01M18 10a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>} onClick={() => setIsRevenueDetailVisible(!isRevenueDetailVisible)} />
                {isRevenueDetailVisible && <div className="absolute top-full mt-2 w-full bg-gray-800 border border-cyan-500/20 rounded-lg p-4 z-10 text-sm space-y-2 shadow-lg"><p className="flex justify-between">Verified: <span className="text-green-400 font-semibold">₹{verifiedRevenue.toLocaleString()}</span></p><p className="flex justify-between">Pending: <span className="text-yellow-400 font-semibold">₹{pendingRevenue.toLocaleString()}</span></p><p className="flex justify-between">Rejected: <span className="text-red-400 font-semibold">₹{rejectedRevenue.toLocaleString()}</span></p></div>}
              </div>
          </div>
          
          <div className="bg-black/30 border border-cyan-500/20 rounded-lg shadow-lg">
            <div className="p-4 border-b border-cyan-500/20 flex flex-col md:flex-row gap-4 items-center">
              <input type="text" placeholder="Search by name, institute, email, or participant..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full md:flex-grow px-3 py-2 border border-gray-600 bg-gray-900/50 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
              <select onChange={(e) => { if(e.target.value) handleDownload(e.target.value)}} className="appearance-none w-full md:w-auto font-semibold text-sm bg-cyan-500 text-black px-4 py-2 rounded-md transition-all duration-300 hover:bg-cyan-400 focus:outline-none" defaultValue="">
                <option value="" disabled>Download Event List</option>
                {allEvents.map(event => <option key={event.name} value={event.name}>{event.name}</option>)}
              </select>
            </div>
            
            {selectedIds.size > 0 && <div className="bg-gray-800/60 p-3 flex flex-col sm:flex-row gap-4 items-center justify-between"><span className="text-sm font-semibold text-white">{selectedIds.size} registration{selectedIds.size > 1 ? 's' : ''} selected</span><div className="flex gap-4"><button onClick={handleBulkVerify} className="font-semibold text-xs bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-500">Mark as Verified</button><button onClick={handleBulkDelete} className="font-semibold text-xs bg-red-600 text-white px-3 py-1.5 rounded-md hover:bg-red-500">Delete Selected</button></div></div>}
            
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-cyan-300 uppercase bg-gray-900/50"><tr><th scope="col" className="px-6 py-3"><input type="checkbox" onChange={handleSelectAll} checked={isAllSelected} className="bg-gray-700 border-gray-600 text-cyan-600 focus:ring-cyan-500" /></th><th scope="col" className="px-6 py-3">SPOC Name</th><th scope="col" className="px-6 py-3">Institute</th><th scope="col" className="px-6 py-3 text-center">Participant Count</th><th scope="col" className="px-6 py-3">Amount</th><th scope="col" className="px-6 py-3">Payment Status</th><th scope="col" className="px-6 py-3 text-center">Action</th></tr></thead>
                <tbody>
                  {filteredRegistrations.map((reg) => (<tr key={reg.id} className={`border-b border-gray-800 ${selectedIds.has(reg.id) ? 'bg-cyan-900/30' : 'hover:bg-gray-800/50'}`}><td className="px-6 py-4"><input type="checkbox" checked={selectedIds.has(reg.id)} onChange={() => handleSelect(reg.id)} className="bg-gray-700 border-gray-600 text-cyan-600 focus:ring-cyan-500" /></td><td onClick={() => setSelectedRegistration(reg)} className="px-6 py-4 font-medium text-white whitespace-nowrap cursor-pointer">{reg.spocName}</td><td onClick={() => setSelectedRegistration(reg)} className="px-6 py-4 cursor-pointer">{reg.institute}</td><td onClick={() => setSelectedRegistration(reg)} className="px-6 py-4 text-center cursor-pointer">{reg.totalParticipants}</td><td onClick={() => setSelectedRegistration(reg)} className={`px-6 py-4 cursor-pointer font-semibold ${getAmountColor(reg.paymentStatus)}`}>₹{calculateRegistrationFee(reg).toLocaleString()}</td><td onClick={() => setSelectedRegistration(reg)} className="px-6 py-4 cursor-pointer"><StatusBadge status={reg.paymentStatus} /></td><td className="px-6 py-4 text-center"><button onClick={() => handleDeleteRegistration(reg.id)} className="text-red-400 hover:text-red-300"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button></td></tr>))}
                </tbody>
              </table>
            </div>
             <div className="md:hidden space-y-4 p-4">
              {filteredRegistrations.map((reg) => (<div key={reg.id} className={`bg-gray-800/50 rounded-lg p-4 border ${selectedIds.has(reg.id) ? 'border-cyan-500' : 'border-gray-700'}`}><div className="flex justify-between items-start"><div className="flex items-start gap-3 flex-grow cursor-pointer" onClick={() => setSelectedRegistration(reg)}><input type="checkbox" checked={selectedIds.has(reg.id)} onChange={() => handleSelect(reg.id)} onClick={(e) => e.stopPropagation()} className="mt-1 bg-gray-700 border-gray-600 text-cyan-600 focus:ring-cyan-500" /><div><p className="font-bold text-white text-lg">{reg.spocName}</p><p className="text-sm text-gray-400">{reg.institute}</p></div></div><button onClick={() => handleDeleteRegistration(reg.id)} className="text-red-400 hover:text-red-300 p-1 -mr-1 -mt-1"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button></div><div className="mt-3 pt-3 border-t border-gray-700/50 grid grid-cols-3 gap-2 text-center text-sm"><div><p className="text-gray-400 text-xs uppercase">Count</p><p className="text-white font-semibold">{reg.totalParticipants}</p></div><div><p className="text-gray-400 text-xs uppercase">Amount</p><p className={`font-semibold ${getAmountColor(reg.paymentStatus)}`}>₹{calculateRegistrationFee(reg).toLocaleString()}</p></div><div><p className="text-gray-400 text-xs uppercase">Status</p><StatusBadge status={reg.paymentStatus} /></div></div></div>))}
            </div>
            {filteredRegistrations.length === 0 && <p className="text-center py-8 text-gray-400">No registrations found.</p>}
          </div>
          <UserManagement />
        </main>
      </div>
      {selectedRegistration && (<RegistrationDetailModal registration={selectedRegistration} onClose={() => setSelectedRegistration(null)} onUpdate={handleUpdateRegistration} />)}
      <ConfirmationModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={confirmDelete} title="Confirm Deletion" message="Are you sure you want to delete this entire registration? This action is permanent and cannot be undone." />
      <ConfirmationModal isOpen={isBulkConfirmOpen} onClose={() => setIsBulkConfirmOpen(false)} onConfirm={confirmBulkDelete} title="Confirm Bulk Deletion" message={`Are you sure you want to delete ${selectedIds.size} selected registrations? This action cannot be undone.`} />
      {isAccountModalOpen && <AccountSettingsModal onClose={() => setIsAccountModalOpen(false)} />}
    </>
  );
};

export default AdminDashboard;