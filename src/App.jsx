import React, { useState, useEffect } from 'react';
import './css/App.scss';
import Animate from './components/Animate';
import Hand from '../public/images/hands.png';
import Progress from './components/Progress';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const ScanArea = () => {
  const [activeHands, setActiveHands] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [showFinish, setShowFinish] = useState(false);

  const handleIconClick = (hand) => {
    if (activeHands.includes(hand)) {
      setActiveHands(activeHands.filter((h) => h !== hand));
    } else {
      setActiveHands([...activeHands, hand]);
    }
  };

  const HandIcon = ({ hand }) => {
    const isActive = activeHands.includes(hand);

    return (
      <div onClick={() => handleIconClick(hand)}>
        <img src={Hand} className={isActive ? 'active' : ''} />
        {activeHands.length > 0 && <Animate key="hand" />}
      </div>
    );
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
          <div className="scan-right">
            <HandIcon hand="right" />
          </div>
          <div style={{ transform: 'scaleX(-1)' }} className="scan-left">
            <HandIcon hand="left" />
          </div>
        </div>
        {showProgress && <Progress />}

        {showFinish && (
          <div className="finish">
            <div className="content">
              <AiOutlineCheckCircle />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScanArea;
