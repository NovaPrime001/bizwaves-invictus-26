
import React from 'react';
import Countdown from './Countdown';

const Hero: React.FC = () => {
  const posterImageUrl = '/images/hero-background.jpg';
  const festDate = new Date('2026-02-09T09:00:00');

  return (
    <section id="home" className="h-screen relative flex items-center justify-center text-center text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${posterImageUrl})` }}
      />
      <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-[#01041a] to-transparent z-10" />
      
      <div className="relative z-20 flex flex-col items-center px-4">
        <div className="mb-4">
            <p className="font-montserrat text-md md:text-xl text-cyan-300 tracking-widest">NATIONAL INSTITUTE OF TECHNOLOGY KARNATAKA, SURATHKAL</p>
            <p className="font-montserrat text-xs md:text-base text-gray-300 tracking-wider">School of Humanities, Social Sciences and Management (SHSSM)</p>
            <p className="font-avenir text-xs md:text-base text-gray-300 tracking-wider mt-1">Presents</p>
        </div>

        <h1 className="font-league-spartan text-5xl sm:text-7xl lg:text-9xl font-bold uppercase"
            style={{ textShadow: '0 0 15px rgba(0, 255, 255, 0.7), 0 0 25px rgba(0, 255, 255, 0.5)', letterSpacing: '10px' }}>
          BIZWAVES
        </h1>
        <h2 className="font-league-gothic text-4xl sm:text-6xl lg:text-8xl font-bold uppercase text-cyan-400 mb-4"
             style={{ textShadow: '0 0 10px rgba(0, 255, 255, 0.5)', letterSpacing: '10px' }}>
          INVICTUS'26
        </h2>
        
        <p className="font-montserrat text-lg md:text-2xl mb-6 tracking-widest">A National Level Management Fest</p>
        <p className="font-bold text-lg md:text-3xl mb-4 tracking-wider bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-500/50">
          9th & 10th February 2026
        </p>
        
        <div className="my-6 w-full max-w-2xl">
            <Countdown targetDate={festDate} />
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto px-4 sm:px-0">
          <a href="#events" className="inline-flex items-center justify-center w-full sm:w-auto font-bold text-lg bg-cyan-500 text-black px-8 py-3 rounded-md transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_20px_rgba(0,255,255,0.8)] transform hover:scale-105">
            View Events
          </a>
          <a href="#register" className="inline-flex items-center justify-center w-full sm:w-auto font-bold text-lg border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-md transition-all duration-300 hover:bg-cyan-400/20 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transform hover:scale-105">
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
