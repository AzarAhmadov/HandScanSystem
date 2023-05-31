import React, { useState, useEffect } from 'react';
import './css/App.scss';
import Progress from './components/Progress';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import RedImage from '../public/images/bt_red.png';
import GreenImage from '../public/images/bt_green.png';

const ScanArea = () => {
  const [activeHands, setActiveHands] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [buttonImage, setButtonImage] = useState(RedImage);

  const handleIconClick = (hand) => {
    if (activeHands.includes(hand)) {
      setActiveHands([]);
      setButtonImage(RedImage);
    } else {
      setActiveHands(['right', 'left']);
      setButtonImage(GreenImage);
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
            <img src={buttonImage} alt="Button" className="button-image" />
          </div>
          <div className={`scan-left ${activeHands.includes('left') ? 'active' : ''}`} onClick={() => handleIconClick('left')}>
            <img src={buttonImage} alt="Button" className="button-image" />
          </div>
        </div>
        {showProgress && <Progress />}
        {showFinish && (
          <div className="finish active">
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
