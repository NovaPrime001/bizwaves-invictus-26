
import React from 'react';
import { culturalEvents } from '../constants';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="font-montserrat text-3xl md:text-4xl font-bold uppercase tracking-widest text-cyan-400 text-center mb-12 relative pb-4 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-24 after:h-1 after:bg-cyan-500/50 after:rounded-full">
      {children}
    </h2>
);

const Registration: React.FC = () => {
  return (
    <section id="register" className="py-20 bg-black/20">
      <div className="container mx-auto px-6 text-center">
        <SectionTitle>Registration</SectionTitle>
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div className="bg-gray-900/30 border border-cyan-500/30 p-8 rounded-lg">
                    <h3 className="font-montserrat text-2xl font-bold text-white mb-4">Management Events</h3>
                    <p className="text-5xl font-orbitron text-cyan-400 mb-2">₹250</p>
                    <p className="text-lg text-gray-300">per participant</p>
                </div>
                 <div className="bg-gray-900/30 border border-cyan-500/30 p-8 rounded-lg">
                    <h3 className="font-montserrat text-2xl font-bold text-white mb-4">Cultural Events</h3>
                    <ul className="text-left space-y-2 text-lg text-gray-300">
                        {culturalEvents.map(event => (
                            <li key={event.name} className="flex justify-between">
                                <span>{event.name}</span>
                                <span className="font-bold text-cyan-400">
                                    ₹{event.feeAmount}
                                    <span className="text-sm text-gray-400 font-normal"> {event.feeType === 'per-team' ? '/ team' : '/ person'}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-8">
                Ready to showcase your skills? Register your team or yourself now and be a part of BIZWAVES – INVICTUS'26. Click the button below to go to our master registration form.
            </p>
             <a href="/register" className="inline-block font-bold text-lg bg-cyan-500 text-black px-12 py-4 rounded-md transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.8)] transform hover:scale-105">
                Register Now
            </a>
        </div>
      </div>
    </section>
  );
};

export default Registration;