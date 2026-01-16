
import React, { useState } from 'react';

interface Props {
  onClose: () => void;
}

const AccountSettingsModal: React.FC<Props> = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('admin'); // Mock username
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

    // This is a UI mockup. In a real app, this would call a secure backend endpoint.
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (newPassword && newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: "New passwords do not match." });
            return;
        }

        // --- MOCK LOGIC ---
        // In a real implementation:
        // 1. Send the data to your backend (e.g., Supabase function).
        // 2. The backend would verify the 'currentPassword'.
        // 3. The backend would update the user's credentials.
        console.log("Submitting account changes:", { username, newPassword: newPassword || "unchanged" });
        setMessage({ type: 'success', text: "Account settings updated successfully!" });
        // --- END MOCK LOGIC ---

        // Optionally close modal on success after a delay
        setTimeout(() => {
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[70] p-4" onClick={onClose}>
            <div className="bg-[#020624] border border-cyan-500/30 rounded-lg shadow-2xl shadow-cyan-500/10 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-cyan-500/20 flex justify-between items-center">
                    <h2 className="font-orbitron text-xl font-bold text-cyan-400">Account Settings</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-3xl">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6 space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">Username</label>
                            <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="w-full px-3 py-2 border border-gray-600 bg-gray-900/50 text-white rounded-md" />
                        </div>
                        <h3 className="text-lg font-semibold pt-2 text-white border-t border-gray-700/50">Change Password</h3>
                        <div>
                            <label htmlFor="currentPassword"  className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                            <input type="password" name="currentPassword" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter to change password" className="w-full px-3 py-2 border border-gray-600 bg-gray-900/50 text-white rounded-md" />
                        </div>
                         <div>
                            <label htmlFor="newPassword"  className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                            <input type="password" name="newPassword" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-600 bg-gray-900/50 text-white rounded-md" />
                        </div>
                         <div>
                            <label htmlFor="confirmPassword"  className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
                            <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-600 bg-gray-900/50 text-white rounded-md" />
                        </div>
                         {message && <div className={`text-sm p-3 rounded-md ${message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{message.text}</div>}
                    </div>
                    <div className="bg-black/30 px-6 py-4 flex justify-end space-x-4">
                        <button type="button" onClick={onClose} className="font-semibold text-sm border-2 border-gray-500 text-gray-300 px-4 py-2 rounded-md">Cancel</button>
                        <button type="submit" className="font-semibold text-sm bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-500">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountSettingsModal;
