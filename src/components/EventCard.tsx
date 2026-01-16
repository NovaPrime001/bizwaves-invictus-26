
import React from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
}

const UserGroupIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
);

const PhoneIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
);

const CalendarIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
);

const RupeeIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12M6 8h12M4 13h16M4 18h16M14.5 21l-3-6M12.5 3l3 6"/>
    </svg>
);

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 flex flex-col h-full transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] group">
      <div>
        {event.logo && (
          <div className="w-full h-32 flex items-center justify-center mb-4">
              <img 
                src={event.logo} 
                alt={`${event.name} logo`} 
                className="max-h-full max-w-full object-contain transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]"
              />
          </div>
        )}
        <div className="text-center flex flex-col justify-center min-h-[80px]">
          <h3 className="font-orbitron text-2xl font-bold text-cyan-400">{event.name}</h3>
          {event.subtitle && <p className="font-montserrat text-sm text-white mt-1 tracking-wider">{event.subtitle}</p>}
        </div>
      </div>
      
      {/* Always visible content */}
      <div className="mt-4 pt-4 border-t border-cyan-500/20 flex-grow flex flex-col justify-between">
        <div>
            {event.theme && <p className="text-gray-300 italic mb-4 text-left"><span className="font-bold">Theme:</span> {event.theme}</p>}
            {event.description && <p className="text-gray-300 leading-relaxed mb-4 text-left">{event.description}</p>}
        </div>
      
        <div>
            <div className="space-y-3 mb-4">
                {event.day && (
                    <div className="flex items-center text-white">
                        <CalendarIcon />
                        <span className="font-bold">Event Day:</span>
                        <span className="ml-2">{event.day}</span>
                    </div>
                )}
                <div className="flex items-center text-white">
                    <UserGroupIcon />
                    <span className="font-bold">Team Size:</span>
                    <span className="ml-2">{event.teamSize}</span>
                </div>
                 {event.feeAmount && (
                    <div className="flex items-center text-white">
                        <RupeeIcon />
                        <span className="font-bold">Fee:</span>
                        <span className="ml-2">₹{event.feeAmount} {event.feeType === 'per-team' ? 'per team' : 'per person'}</span>
                    </div>
                )}
            </div>
            <div>
            <h4 className="font-bold text-white flex items-center mb-2"><PhoneIcon /> Contacts:</h4>
            <div className="text-gray-400 text-sm space-y-2">
                {event.contacts.map((contact, index) => (
                <div key={index} className="flex items-center gap-2">
                    <span>{contact.name}</span>
                    <span className="text-gray-500">&ndash;</span>
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:text-cyan-300 transition-colors">{contact.phone}</a>
                </div>
                ))}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;