
import React from 'react';
import { managementEvents, culturalEvents } from '../constants';
import EventCard from './EventCard';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="font-montserrat text-3xl md:text-4xl font-bold uppercase tracking-widest text-cyan-400 text-center mb-12 relative pb-4 after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-24 after:h-1 after:bg-cyan-500/50 after:rounded-full">
      {children}
    </h2>
  );
  
const SubSectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-white text-center mb-12 tracking-wider">
        {children}
    </h3>
);

const Events: React.FC = () => {
  return (
    <section id="events" className="py-20">
      <div className="container mx-auto px-6">
        <SectionTitle>Events</SectionTitle>
        
        <div>
          <SubSectionTitle>Management Events</SubSectionTitle>
          <div className="flex flex-wrap justify-center -m-4">
            {managementEvents.map((event) => (
              <div key={event.name} className="p-4 w-full md:w-1/2 lg:w-1/3 flex">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <SubSectionTitle>Cultural Events</SubSectionTitle>
          <div className="flex flex-wrap justify-center -m-4">
            {culturalEvents.map((event) => (
              <div key={event.name} className="p-4 w-full md:w-1/2 lg:w-1/3 flex">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
