import React, { useState, useEffect } from 'react';

const Progress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 14;
    const totalDuration = 4200;
    const steps = Math.ceil(totalDuration / interval);
    let currentStep = 0;

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        currentStep++;
        if (currentStep >= steps) {
          clearInterval(timer);
          return 100;
        }
        const stepProgress = (currentStep / steps) * 100;
        return stepProgress;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='progress' style={{ width: '100%' }}>
      <div style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default Progress;