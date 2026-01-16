
import React from 'react';
import { guidelines } from '../constants';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="font-montserrat text-3xl md:text-4xl font-bold uppercase tracking-widest text-cyan-400 text-center mb-12 relative pb-4 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-24 after:h-1 after:bg-cyan-500/50 after:rounded-full">
      {children}
    </h2>
  );

const Guidelines: React.FC = () => {
  return (
    <section id="guidelines" className="py-20">
      <div className="container mx-auto px-6">
        <SectionTitle>General Guidelines</SectionTitle>
        <div className="max-w-4xl mx-auto bg-black/30 border border-cyan-500/30 rounded-lg p-8 md:p-12">
            <ul className="space-y-4 list-disc list-inside text-gray-300 text-lg">
                {guidelines.map((rule, index) => (
                    <li key={index} className="pl-2">{rule}</li>
                ))}
            </ul>
            <div className="mt-10 pt-6 border-t border-cyan-500/20">
                <h3 className="font-montserrat text-xl font-bold text-white mb-4">Accommodation</h3>
                <p className="text-gray-300 mb-4">Accommodation available on chargeable basis. For inquiries, please contact:</p>
                <div className="text-cyan-300 space-y-2">
                    <p>Athmik H Kunder – <a href="tel:+916360468766" className="hover:underline">+91 63604 68766</a></p>
                    <p>Deekshith – <a href="tel:+919845220251" className="hover:underline">+91 98452 20251</a></p>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Guidelines;
