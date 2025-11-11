"use client";

import { useState, useEffect, useRef } from "react";

export default function ShootingStar({ trigger }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const starRef = useRef(null);

  useEffect(() => {
    if (trigger) {
      // Random starting position (top area)
      const startX = Math.random() * 100;
      const startY = Math.random() * 30;
      // Random ending position (bottom area)
      const endX = startX + (Math.random() * 40 - 20);
      const endY = 70 + Math.random() * 30;

      setPosition({ startX, startY, endX, endY });
      setShow(true);

      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [trigger]);

  useEffect(() => {
    if (show && starRef.current) {
      const deltaX = (position.endX - position.startX) * 10;
      const deltaY = (position.endY - position.startY) * 10;
      const angle = Math.atan2(position.endY - position.startY, position.endX - position.startX) * (180 / Math.PI);
      
      starRef.current.style.setProperty('--end-x', `${deltaX}px`);
      starRef.current.style.setProperty('--end-y', `${deltaY}px`);
      starRef.current.style.setProperty('--angle', `${angle}deg`);
    }
  }, [show, position]);

  if (!show) return null;

  const angle = Math.atan2(position.endY - position.startY, position.endX - position.startX) * (180 / Math.PI);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30"
    >
      <div
        ref={starRef}
        className="absolute"
        style={{
          left: `${position.startX}%`,
          top: `${position.startY}%`,
          width: '4px',
          height: '150px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,215,0,0.8), rgba(255,255,255,0))',
          transform: `rotate(${angle}deg)`,
          transformOrigin: 'top center',
          boxShadow: '0 0 15px rgba(255,255,255,1), 0 0 30px rgba(255,215,0,0.6)',
          filter: 'blur(0.5px)',
          animation: 'shootingStarMove 2s ease-out forwards'
        }}
      />
      <div
        className="absolute text-3xl"
        style={{
          left: `${position.startX}%`,
          top: `${position.startY}%`,
          transform: 'translate(-50%, -50%)',
          animation: 'fadeOut 2s ease-out forwards',
          filter: 'drop-shadow(0 0 10px rgba(255,255,255,1))'
        }}
      >
        ⭐
      </div>
    </div>
  );
}

