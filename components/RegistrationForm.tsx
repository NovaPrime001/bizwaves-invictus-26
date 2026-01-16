
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { RegistrationData, Team, Participant, Event } from '../types';
import { managementEvents, culturalEvents, mockRegistrations } from '../constants';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import Confetti from './Confetti';

// Helper components for UI and Form fields
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="font-montserrat text-3xl md:text-4xl font-bold uppercase tracking-widest text-cyan-400 text-center mb-12 relative pb-4 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-24 after:h-1 after:bg-cyan-500/50 after:rounded-full">
        {children}
    </h2>
);

const InputField: React.FC<{name: string, label: string, value: string, onChange: any, error?: string, type?: string, required?: boolean}> = ({name, label, value, onChange, error, type = 'text', required}) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}{required && ' *'}</label>
        <input type={type} name={name} id={name} value={value} onChange={onChange} required={required} className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-600'} bg-gray-900/50 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm`} />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
);

const allEvents = [...managementEvents, ...culturalEvents];
const eventDetailsMap = allEvents.reduce((acc, event) => {
    acc[event.name] = event;
    return acc;
}, {} as Record<string, Event>);

// Custom Event Selector Component
const CustomEventSelector: React.FC<{ onSelect: (eventName: string) => void; selectedEvent: string; }> = ({ onSelect, selectedEvent }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const selectedEventDetails = allEvents.find(e => e.name === selectedEvent);

    const filteredManagementEvents = managementEvents.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredCulturalEvents = culturalEvents.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-300 mb-1">Select an event to add a team *</label>
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full px-3 py-2 border border-gray-600 bg-gray-900/50 text-white rounded-md flex justify-between items-center">
                {selectedEventDetails ? (
                     <div className="flex items-center gap-3">
                        <img src={selectedEventDetails.logo} alt="" className="w-6 h-6 object-contain" />
                        <span>{selectedEventDetails.name}</span>
                    </div>
                ) : <span>Select an event...</span>}
               <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-[#020624] border border-cyan-500/30 rounded-md shadow-lg">
                   <div className="p-2 border-b border-cyan-500/20">
                     <input 
                        type="text" 
                        placeholder="Search for an event..."
                        className="w-full px-3 py-2 border border-gray-600 bg-gray-900/50 placeholder-gray-500 text-white rounded-md focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onClick={e => e.stopPropagation()}
                     />
                   </div>
                   <div className="max-h-60 overflow-y-auto">
                    {filteredManagementEvents.length > 0 && (
                       <div>
                            <h3 className="text-xs uppercase text-cyan-300 tracking-wider font-bold p-2">Management Events</h3>
                            {filteredManagementEvents.map(event => (
                                <div key={event.name} onClick={() => { onSelect(event.name); setIsOpen(false); setSearchTerm(''); }} className="flex items-center gap-3 p-2 cursor-pointer hover:bg-cyan-500/20">
                                    <img src={event.logo} alt={event.name} className="w-8 h-8 object-contain" />
                                    <span className="text-white">{event.name}</span>
                                </div>
                            ))}
                       </div>
                    )}
                    {filteredCulturalEvents.length > 0 && (
                       <div>
                            <h3 className="text-xs uppercase text-cyan-300 tracking-wider font-bold p-2">Cultural Events</h3>
                            {filteredCulturalEvents.map(event => (
                                <div key={event.name} onClick={() => { onSelect(event.name); setIsOpen(false); setSearchTerm(''); }} className="flex items-center gap-3 p-2 cursor-pointer hover:bg-cyan-500/20">
                                    <img src={event.logo} alt={event.name} className="w-8 h-8 object-contain" />
                                    <span className="text-white">{event.name}</span>
                                </div>
                            ))}
                       </div>
                    )}
                    {filteredManagementEvents.length === 0 && filteredCulturalEvents.length === 0 && (
                        <p className="text-gray-400 p-4 text-center">No events found.</p>
                    )}
                   </div>
                </div>
            )}
        </div>
    );
};

// Main Registration Form Component
const RegistrationForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Omit<RegistrationData, 'id' | 'totalParticipants' | 'paymentStatus'>>({
        spocName: '', institute: '', email: '', phone: '', program: '', course: '', teams: [], paymentScreenshot: undefined,
    });
    const [errors, setErrors] = useState<Record<string, any>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [editingTeamIndex, setEditingTeamIndex] = useState<number | null>(null);

    const [currentTeam, setCurrentTeam] = useState<{ eventName: string; participants: Participant[] }>({
        eventName: '', participants: []
    });
    
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const totalFee = useMemo(() => {
        return formData.teams.reduce((acc, team) => {
            const event = eventDetailsMap[team.eventName];
            if (!event || !event.feeAmount) return acc;
            if (event.feeType === 'per-team') {
                return acc + event.feeAmount;
            }
            if (event.feeType === 'per-person') {
                return acc + (event.feeAmount * team.participants.length);
            }
            return acc;
        }, 0);
    }, [formData.teams]);

    useEffect(() => {
        if (step === 3 && canvasRef.current) {
            const canvas = canvasRef.current;
            if (totalFee > 0) {
                const upiUrl = `upi://pay?pa=6363878596-2@ybl&pn=BIZWAVES%20NITK&am=${totalFee}&cu=INR`;
                QRCode.toCanvas(canvas, upiUrl, { width: 256, margin: 2, errorCorrectionLevel: 'H' }, (error) => {
                    if (error) console.error('QR Code generation failed:', error);
                });
            } else {
                const ctx = canvas.getContext('2d');
                if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, [step, totalFee]);

    const handleSpocChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEventSelection = (eventName: string) => {
        const teamSizeStr = eventDetailsMap[eventName]?.teamSize || '1';
        const [minSizeStr, maxSizeStr] = teamSizeStr.split('-');
        const minSize = parseInt(minSizeStr, 10);
        const displaySize = parseInt(maxSizeStr || minSizeStr, 10);

        setCurrentTeam({
            eventName,
            participants: Array(displaySize).fill({ name: '', contact: '' })
        });
    };

    const handleParticipantChange = (index: number, field: 'name' | 'contact', value: string) => {
        const updatedParticipants = [...currentTeam.participants];
        updatedParticipants[index] = { ...updatedParticipants[index], [field]: value };
        setCurrentTeam({ ...currentTeam, participants: updatedParticipants });
    };
    
    const getTeamSize = (eventName: string) => {
        const teamSizeStr = eventDetailsMap[eventName]?.teamSize || '1';
        const [minStr, maxStr] = teamSizeStr.split('-').map(s => s.trim());
        const min = parseInt(minStr, 10);
        const max = parseInt(maxStr || minStr, 10);
        return { min, max };
    };

    const handleAddOrUpdateTeam = () => {
        if (!currentTeam.eventName) return;

        const { min, max } = getTeamSize(currentTeam.eventName);
        
        // Filter out empty participant slots before validation
        const actualParticipants = currentTeam.participants.filter(p => p.name.trim() !== '' && p.contact.trim() !== '');

        // Validate minimum required participants
        if (actualParticipants.length < min) {
            alert(`Please enter details for at least ${min} participant(s) for ${currentTeam.eventName}.`);
            return;
        }

        // Validate that all entered participants are complete
        const incompleteParticipants = actualParticipants.some(p => p.name.trim() === '' || p.contact.trim() === '');
        if (incompleteParticipants) {
            alert(`Please fill in both name and contact for all entered participants.`);
            return;
        }

        const teamToSave = { ...currentTeam, participants: actualParticipants };

        if (editingTeamIndex !== null) {
            const updatedTeams = [...formData.teams];
            updatedTeams[editingTeamIndex] = teamToSave;
            setFormData(prev => ({ ...prev, teams: updatedTeams }));
            setEditingTeamIndex(null);
        } else {
            setFormData(prev => ({ ...prev, teams: [...prev.teams, teamToSave] }));
        }
        setCurrentTeam({ eventName: '', participants: [] });
    };
    
    const handleEditTeam = (index: number) => {
        const teamToEdit = formData.teams[index];
        const { max } = getTeamSize(teamToEdit.eventName);
        const paddedParticipants = [...teamToEdit.participants];
        while(paddedParticipants.length < max) {
            paddedParticipants.push({ name: '', contact: '' });
        }
        setEditingTeamIndex(index);
        setCurrentTeam({ ...teamToEdit, participants: paddedParticipants });
    };

    const handleRemoveTeam = (index: number) => {
        setFormData(prev => ({...prev, teams: prev.teams.filter((_, i) => i !== index)}));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, paymentScreenshot: { name: file.name, dataUrl: reader.result as string } }));
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const validateAndProceed = () => {
        if (step === 1) {
             const spocErrors: Record<string, any> = {};
            if (!formData.spocName) spocErrors.spocName = 'SPOC Name is required';
            if (!formData.institute) spocErrors.institute = 'Institute is required';
            if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) spocErrors.email = 'A valid email is required';
            if (!formData.phone) spocErrors.phone = 'A valid phone number is required';
            if (!formData.program) spocErrors.program = 'Program is required';
            setErrors(spocErrors);
            if (Object.keys(spocErrors).length === 0) nextStep();
        } else if (step === 2) {
            if (formData.teams.length === 0) {
                 setErrors({ teams: 'You must register at least one team.' });
                 return;
            }
            setErrors({});
            nextStep();
        }
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Submit clicked');
    console.log('Form data:', formData);

    try {
        const { data, error } = await supabase
        .from('registrations')
        .insert({
            spoc_name: formData.spocName,
            institute: formData.institute,
            email: formData.email,
            phone: formData.phone,
            program: formData.program,
            course: formData.course,
            total_participants: formData.totalParticipants,
            payment_status: 'Pending',
        })
        .select()
        .single();

        console.log('Supabase response:', data);
        console.log('Supabase error:', error);

        if (error) throw error;

    } catch (err) {
        console.error('Insert failed:', err);
    }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative z-20">
                <Confetti />
                <h1 className="font-orbitron text-4xl text-cyan-400 mb-4">Registration Successful!</h1>
                <p className="text-lg text-gray-300 mb-8">Thank you for registering! A confirmation mail or message will be sent after the payment verification.</p>
                <a href="/" className="font-bold text-lg bg-cyan-500 text-black px-8 py-3 rounded-md transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.8)]">
                    Back to Home
                </a>
            </div>
        );
    }
    
    const currentEventDetails = currentTeam.eventName ? eventDetailsMap[currentTeam.eventName] : null;
    const { min: minRequired = 0 } = currentEventDetails ? getTeamSize(currentEventDetails.name) : {};
    
    return (
        <div className="min-h-screen py-10">
            <div className="container mx-auto px-6">
                 <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">&larr; Back to Home</a>
                 <div className="mt-4 mb-8 text-center"><SectionTitle>BIZWAVES '26 Registration</SectionTitle></div>
                
                <div className="max-w-4xl mx-auto bg-black/30 border border-cyan-500/30 rounded-lg p-4 sm:p-8">
                    {step === 1 && (
                        <div>
                           <h3 className="font-montserrat text-2xl font-bold text-white mb-6">Step 1: SPOC & Institute Details</h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <InputField name="institute" label="Name of the Institute" value={formData.institute} onChange={handleSpocChange} error={errors.institute} required />
                               <InputField name="spocName" label="Name of the Student Point of Contact (SPOC)" value={formData.spocName} onChange={handleSpocChange} error={errors.spocName} required />
                               <InputField name="phone" label="Contact number (SPOC)" type="tel" value={formData.phone} onChange={handleSpocChange} error={errors.phone} required />
                               <InputField name="email" label="Email Address (SPOC)" type="email" value={formData.email} onChange={handleSpocChange} error={errors.email} required />
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-300">Program (SPOC) *</label>
                                    <RadioOption name="program" value="UG" checked={formData.program === 'UG'} onChange={handleSpocChange} label="UG" />
                                    <RadioOption name="program" value="PG" checked={formData.program === 'PG'} onChange={handleSpocChange} label="PG" />
                                     {errors.program && <p className="text-red-400 text-xs mt-1">{errors.program}</p>}
                                </div>
                               <InputField name="course" label="Course (SPOC)" value={formData.course} onChange={handleSpocChange} />
                           </div>
                           <div className="text-right mt-8">
                               <button onClick={validateAndProceed} className="w-full sm:w-auto font-bold text-lg bg-cyan-500 text-black px-8 py-3 rounded-md">Next: Add Teams</button>
                           </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div>
                            <h3 className="font-montserrat text-2xl font-bold text-white mb-6">{editingTeamIndex !== null ? 'Editing Team' : 'Step 2: Build Your Teams'}</h3>
                             {errors.teams && <p className="text-red-400 text-sm mb-4">{errors.teams}</p>}
                            <div className="bg-gray-900/40 p-4 sm:p-6 rounded-lg border border-gray-700 space-y-4">
                                <CustomEventSelector onSelect={handleEventSelection} selectedEvent={currentTeam.eventName} />
                               
                               {currentEventDetails && (
                                   <div>
                                       <h4 className="text-lg font-bold text-cyan-300 mt-4 mb-2">{currentEventDetails.name} - Team Details</h4>
                                       <p className="text-sm text-gray-400 mb-4">Minimum participants: {minRequired}. Maximum: {currentEventDetails.teamSize.split('-')[1] || minRequired}.</p>
                                       {currentTeam.participants.map((p, i) => (
                                           <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                                               <InputField name={`p-name-${i}`} label={`Participant ${i+1} Name`} value={p.name} onChange={e => handleParticipantChange(i, 'name', e.target.value)} required={i < minRequired} />
                                               <InputField name={`p-contact-${i}`} label={`Participant ${i+1} Contact`} value={p.contact} onChange={e => handleParticipantChange(i, 'contact', e.target.value)} required={i < minRequired} />
                                           </div>
                                       ))}
                                       <button onClick={handleAddOrUpdateTeam} className="font-semibold text-sm bg-cyan-600 text-white px-4 py-2 rounded-md mt-2">{editingTeamIndex !== null ? 'Update Team' : 'Add Team'}</button>
                                   </div>
                               )}
                            </div>
                            
                            <div className="mt-8">
                                <h4 className="font-montserrat text-xl font-bold text-white mb-4">Your Registered Teams</h4>
                                {formData.teams.length > 0 ? (
                                    <ul className="space-y-3">
                                        {formData.teams.map((team, i) => (
                                            <li key={i} className="bg-gray-800/50 p-3 rounded-md text-sm flex justify-between items-center">
                                                <div>
                                                    <span className="font-bold text-white">{team.eventName}: </span>
                                                    <span className="text-gray-300">{team.participants.map(p => p.name).join(', ')}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleEditTeam(i)} className="text-cyan-400 hover:text-cyan-300" title="Edit Team">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
                                                    </button>
                                                    <button onClick={() => handleRemoveTeam(i)} className="text-red-400 hover:text-red-300" title="Remove Team">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p className="text-gray-400">No teams added yet.</p>}
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4 mt-8">
                                <button onClick={prevStep} className="w-full sm:w-auto font-bold text-lg border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-md">Back</button>
                                <button onClick={validateAndProceed} className="w-full sm:w-auto font-bold text-lg bg-cyan-500 text-black px-8 py-3 rounded-md">Next: Payment</button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <form onSubmit={handleSubmit}>
                            <h3 className="font-montserrat text-2xl font-bold text-white mb-6">Step 3: Payment & Confirmation</h3>
                             <div className="bg-gray-900/40 p-6 rounded-lg border border-gray-700 text-center space-y-4">
                                 <p className="text-lg">Total Participants: <span className="font-bold text-xl text-cyan-300">{formData.teams.reduce((acc, team) => acc + team.participants.length, 0)}</span></p>
                                 <p className="text-xl">Total Registration Fee:</p>
                                 <p className="font-orbitron text-5xl text-cyan-400">₹{totalFee}</p>
                                 <canvas ref={canvasRef} className="mx-auto my-4 rounded-lg bg-white" />
                                 <p className="font-mono">UPI ID: 6363878596-2@ybl</p>
                             </div>
                             <div className="mt-8">
                                <label htmlFor="paymentScreenshot" className="block text-lg font-medium text-gray-300 mb-2">Upload Payment Screenshot *</label>
                                <input id="paymentScreenshot" name="paymentScreenshot" type="file" accept="image/*" onChange={handleFileChange} required className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-900/50 file:text-cyan-300 hover:file:bg-cyan-800/50"/>
                                {formData.paymentScreenshot && <p className="text-green-400 text-sm mt-2">File selected: {formData.paymentScreenshot.name}</p>}
                             </div>

                             <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4 mt-10 pt-6 border-t border-cyan-500/20">
                                <button onClick={prevStep} type="button" className="w-full sm:w-auto font-bold text-lg border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-md">Back</button>
                                <button type="submit" className="w-full sm:w-auto font-bold text-lg bg-cyan-500 text-black px-8 py-3 rounded-md">Confirm & Register</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

const RadioOption: React.FC<{ name: string; value: string; checked: boolean; onChange: any; label: string; }> = ({ name, value, checked, onChange, label }) => (
    <label className="flex items-center space-x-3 cursor-pointer">
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="h-4 w-4 border-gray-500 bg-gray-800 text-cyan-600 focus:ring-cyan-500" />
        <span className="text-gray-300">{label}</span>
    </label>
);

export default RegistrationForm;
