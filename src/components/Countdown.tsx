
import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft] && timeLeft[interval as keyof typeof timeLeft] !== 0) {
      return null;
    }

    return (
      <div key={interval} className="flex flex-col items-center">
        <span className="font-orbitron text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-wider">
          {String(timeLeft[interval as keyof typeof timeLeft]).padStart(2, '0')}
        </span>
        <span className="font-montserrat text-xs sm:text-sm uppercase text-cyan-300 tracking-widest mt-1">
          {interval}
        </span>
      </div>
    );
  });
  
  const Separator = () => <div className="font-orbitron text-3xl sm:text-5xl lg:text-6xl text-cyan-400/50">:</div>;

  return (
    <div className="flex justify-center items-center space-x-4 sm:space-x-8 bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-cyan-500/30">
        {timerComponents[0]}
        <Separator />
        {timerComponents[1]}
        <Separator />
        {timerComponents[2]}
        <Separator />
        {timerComponents[3]}
    </div>
  );
};

export default Countdown;
