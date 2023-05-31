import React, { useState, useEffect } from 'react';
import './css/App.scss';
import Progress from './components/Progress';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BsPower } from 'react-icons/bs';

const ScanArea = () => {
  const [activeHands, setActiveHands] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [showFinish, setShowFinish] = useState(false);

  const handleIconClick = (hand) => {
    if (activeHands.includes(hand)) {
      setActiveHands([]);
    } else {
      setActiveHands(['right', 'left']);
    }
  };

  useEffect(() => {
    if (activeHands.length > 0) {
      setShowProgress(true);
      const progressTimer = setTimeout(() => {
        setShowProgress(false);
        setShowFinish(true);
        const finishTimer = setTimeout(() => {
          setShowFinish(false);
        }, 4700);
        setActiveHands([]);

        return () => clearTimeout(finishTimer);
      }, 4700);

      return () => clearTimeout(progressTimer);
    }
  }, [activeHands]);

  return (
    <section id="finder">
      <div className="container">
        <div className="row">
          <div className={`scan-right ${activeHands.includes('right') ? 'active' : ''}`} onClick={() => handleIconClick('right')}>
            <div className="button-content"><BsPower /></div>
          </div>
          <div className={`scan-left ${activeHands.includes('left') ? 'active' : ''}`} onClick={() => handleIconClick('left')}>
            <div className="button-content"><BsPower /></div>
          </div>
        </div>
        {showProgress && <Progress />}
        <div className={`finish ${showFinish ? 'active' : ''}`}>
          <div className="content">
            <AiOutlineCheckCircle />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScanArea;
