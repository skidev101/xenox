
import React, { useEffect, useState } from 'react';
import {FiAward,  } from 'react-icons/fi';

import { useSelector } from 'react-redux';


const Achievements = () => {
  const darkmode = useSelector((state) => state.darkMode);

  
  useEffect(() => { 
    setBadges([
      { id: 1, name: "First Project", earned: true },
      { id: 2, name: "5-Day Streak", earned: true },
      { id: 3, name: "Challenge Complete", earned: false },
    ]);
  }, []);


  const [badges, setBadges] = useState([]);

 



  return (
    <div className={`w-full max-w-4xl mx-auto p-4 ${darkmode ? 'bg-[#111313]' : 'bg-white'} rounded-[14px] font-grotesk`}>
      
      <div className="mb-8">
        <h2 className={`text-lg font-semibold mb-4 ${darkmode ? "text-white":''}`}>Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg text-center ${badge.earned ? (darkmode ? 'bg-yellow-900/30' : 'bg-yellow-100') : (darkmode ? 'bg-blue-600' : 'bg-blue-100')}`}
            >
              <FiAward className={`mx-auto text-2xl mb-2 ${badge.earned ? 'text-yellow-500' : (darkmode ? 'text-blue-300' : 'text-blue-400')}`} />
              <h3 className={`font-medium ${badge.earned ? ` ${darkmode ? 'text-yellow-400':'text-yellow-600'} ` : (darkmode ? 'text-blue-200' : 'text-blue-600')}`}>
                {badge.name}
              </h3>
              <p className={`text-xs mt-1 ${darkmode ? "text-white":''}`}>
                {badge.earned ? 'Earned!' : 'Keep going!'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;