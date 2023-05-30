import React, { useState } from 'react';
import './css/App.scss';
import Animate from './components/Animate';
import Hand from '../public/images/left.jpeg';

const ScanArea = () => {
  const [activeHands, setActiveHands] = useState([]);

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

  return (
    <section id="finder">
      <div className="container">
        <div className="row">
          <div style={{ transform: 'scaleX(-1)' }} className="scan-left">
            <HandIcon hand="left" />
          </div>
          <div className="scan-right">
            <HandIcon hand="right" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScanArea;
