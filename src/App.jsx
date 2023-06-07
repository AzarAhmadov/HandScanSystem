import React, { useState, useEffect } from 'react';
import './css/App.scss';
import Progress from './components/Progress';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import RedImage from '../public/images/bt_red.png';
import GreenImage from '../public/images/bt_green.png';
import Logo from '../public/images/ENTezlogo.png';

const ScanArea = () => {
  const [activeHands, setActiveHands] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [showFinish, setShowFinish] = useState(false);
  const [buttonImage, setButtonImage] = useState(RedImage);
  const [completed, setCompleted] = useState(false);

  const handleIconHover = (event) => {
    if (completed) return;

    const hand = event.currentTarget.dataset.hand;

    if (activeHands.includes(hand)) {
      setActiveHands([]);
      setButtonImage(RedImage);
    } else {
      setActiveHands(['right', 'left']);
      setButtonImage(GreenImage);
    }
  };

  const handleKeyPress = (event) => {
    const hand = event.key;
    handleIconHover({ currentTarget: { dataset: { hand } } });
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    const hand = event.currentTarget.dataset.hand;

    setActiveHands(['right', 'left']);
    setButtonImage(GreenImage);
  };

  useEffect(() => {
    if (activeHands.length > 0 && !completed) {
      setShowProgress(true);
      const progressTimer = setTimeout(() => {
        setShowProgress(false);
        setShowFinish(true);
        const finishTimer = setTimeout(() => {
          setShowFinish(false);
          setCompleted(true);
        }, 4700);

        return () => clearTimeout(finishTimer);
      }, 4700);

      return () => clearTimeout(progressTimer);
    }
  }, [activeHands, completed]);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  return (
    <section id="finder">
      <div className="logo">
        <img src={Logo} />
      </div>
      <div
        className="container"
        onTouchStart={handleTouchStart}
      >
        <div className="row">
          <div
            className={`scan-right ${activeHands.includes('right') ? 'active' : ''}`}
            data-hand="right"
            onMouseEnter={handleIconHover}
          >
            <img src={buttonImage} alt="Button" className="button-image" />
          </div>
          <div
            className={`scan-left ${activeHands.includes('left') ? 'active' : ''}`}
            data-hand="left"
            onMouseEnter={handleIconHover}
          >
            <img src={buttonImage} alt="Button" className="button-image" />
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