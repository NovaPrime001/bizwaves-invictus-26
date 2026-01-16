
import React, { useState } from 'react';
import { RegistrationData, Team } from '../../types';
import ImagePreviewModal from './ImagePreviewModal';
import ConfirmationModal from './ConfirmationModal';

interface Props {
  registration: RegistrationData;
  onClose: () => void;
  onUpdate: (updatedRegistration: RegistrationData) => void;
}

const RegistrationDetailModal: React.FC<Props> = ({ registration, onClose, onUpdate }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [teamToDeleteIndex, setTeamToDeleteIndex] = useState<number | null>(null);

  const handleDeleteTeam = (teamIndex: number) => {
    setTeamToDeleteIndex(teamIndex);
    setIsConfirmOpen(true);
  };

  const confirmDeleteTeam = () => {
    if (teamToDeleteIndex !== null) {
      const updatedTeams = registration.teams.filter((_, index) => index !== teamToDeleteIndex);
      const totalParticipationSlots = updatedTeams.reduce((acc, team) => acc + team.participants.length, 0);
      const updatedRegistration = {
        ...registration,
        teams: updatedTeams,
        totalParticipants: totalParticipationSlots,
      };
      onUpdate(updatedRegistration);
    }
    setIsConfirmOpen(false);
    setTeamToDeleteIndex(null);
  };

  const handleVerifyPayment = () => {
    const updatedRegistration = {
        ...registration,
        paymentStatus: 'Verified' as const,
    };
    onUpdate(updatedRegistration);
  };

  const handleRejectPayment = () => {
    const updatedRegistration = {
        ...registration,
        paymentStatus: 'Rejected' as const,
    };
    onUpdate(updatedRegistration);
  };

  const handleRevertToPending = () => {
    const updatedRegistration = {
       ...registration,
       paymentStatus: 'Pending' as const,
   };
   onUpdate(updatedRegistration);
 }

  const StatusBadge: React.FC<{ status: RegistrationData['paymentStatus'] }> = ({ status }) => {
    const baseClasses = "px-2.5 py-1 text-xs font-bold rounded-full inline-block";
    if (status === 'Verified') {
      return <span className={`${baseClasses} bg-green-500/20 text-green-300`}>VERIFIED</span>;
    }
    if (status === 'Rejected') {
        return <span className={`${baseClasses} bg-red-500/20 text-red-300`}>REJECTED</span>;
    }
    return <span className={`${baseClasses} bg-yellow-500/20 text-yellow-300`}>PENDING</span>;
  };

  const getAmountColor = (status: RegistrationData['paymentStatus']) => {
    switch (status) {
        case 'Verified': return 'text-green-400';
        case 'Rejected': return 'text-red-400';
        default: return 'text-white';
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-[#020624] border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/10 w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-cyan-500/20 flex justify-between items-center sticky top-0 bg-[#020624]/80 backdrop-blur-md z-10">
            <h2 className="font-orbitron text-2xl font-bold text-cyan-400">Registration Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-montserrat text-xl font-bold text-white mb-4">SPOC Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-gray-900/30 p-4 rounded-md">
                <DetailItem label="SPOC Name" value={registration.spocName} />
                <DetailItem label="Institute" value={registration.institute} />
                <DetailItem label="Email" value={registration.email} />
                <DetailItem label="Phone" value={registration.phone} />
                <DetailItem label="Program" value={registration.program} />
                <DetailItem label="Course" value={registration.course} />
              </div>
            </div>
            
            <div>
              <h3 className="font-montserrat text-xl font-bold text-white mb-4">Payment Information</h3>
              <div className="bg-gray-900/30 p-4 rounded-md">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <DetailItem label="Total Participation Slots" value={registration.totalParticipants} />
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Total Fee Paid</p>
                        <p className={`font-semibold ${getAmountColor(registration.paymentStatus)}`}>₹{registration.totalParticipants * 250}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">Payment Status</p>
                        <p className="font-semibold text-white"><StatusBadge status={registration.paymentStatus} /></p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Payment Screenshot</p>
                      {registration.paymentScreenshot?.dataUrl ? (
                          <button onClick={() => setIsPreviewOpen(true)} className="font-semibold text-cyan-400 hover:underline text-left">
                              {registration.paymentScreenshot.name}
                          </button>
                      ) : (
                          <p className="font-semibold text-white">Not provided</p>
                      )}
                  </div>
                  {registration.paymentStatus === 'Pending' && registration.paymentScreenshot?.dataUrl && (
                    <div className="mt-4 flex flex-col sm:flex-row gap-2">
                        <button onClick={handleVerifyPayment} className="flex-1 font-semibold text-sm bg-green-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-green-500">
                            Mark as Verified
                        </button>
                        <button onClick={handleRejectPayment} className="flex-1 font-semibold text-sm bg-red-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-red-500">
                            Mark as Rejected
                        </button>
                    </div>
                  )}
                  {(registration.paymentStatus === 'Verified' || registration.paymentStatus === 'Rejected') && (
                    <button onClick={handleRevertToPending} className="mt-4 w-full font-semibold text-sm bg-yellow-600 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-yellow-500">
                        Revert to Pending
                    </button>
                  )}
              </div>
            </div>

            <div>
              <h3 className="font-montserrat text-xl font-bold text-white mb-4">Registered Teams ({registration.teams.length})</h3>
              <div className="space-y-4">
                {registration.teams.map((team, index) => (
                  <div key={index} className="bg-gray-900/30 p-4 rounded-md flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-cyan-300 mb-2">{team.eventName}</h4>
                      <ul className="list-disc list-inside pl-2 text-sm text-gray-300">
                        {team.participants.map((p, i) => (
                          <li key={i}>{p.name} - <span className="text-gray-400">{p.contact}</span></li>
                        ))}
                      </ul>
                    </div>
                    <button onClick={() => handleDeleteTeam(index)} className="text-red-500 hover:text-red-400"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPreviewOpen && registration.paymentScreenshot && (
        <ImagePreviewModal imageUrl={registration.paymentScreenshot.dataUrl} imageName={registration.paymentScreenshot.name} onClose={() => setIsPreviewOpen(false)} />
      )}
      {isConfirmOpen && teamToDeleteIndex !== null && (
        <ConfirmationModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={confirmDeleteTeam} title="Confirm Team Deletion" message={`Are you sure you want to delete the team for "${registration.teams[teamToDeleteIndex].eventName}"? This action cannot be undone.`} />
      )}
    </>
  );
};

const DetailItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
    <p className="font-semibold text-white">{value || '-'}</p>
  </div>
);

export default RegistrationDetailModal;