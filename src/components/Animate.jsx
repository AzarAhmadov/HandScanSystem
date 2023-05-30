import React, { useEffect, useRef, useState } from 'react';

const ScanShow = () => {
  const canvasRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let y = 4;
    let speed = 1;
    let direction = 1;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isAnimating) {
        ctx.fillStyle = '#fff';
        ctx.lineCap = 'round';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fff';
        ctx.fillRect(4, y, 200, 5);

        y += speed * direction;

        if (direction === 1 && y >= canvas.height - 14) {
          direction = -1; 
        } else if (direction === -1 && y <= 4) {
          setIsAnimating(false);
        }

        if (isAnimating) {
          requestAnimationFrame(draw);
        }
      }
    };

    requestAnimationFrame(draw);
  }, []);

  return (
    <div className="canvas" style={{ display: isAnimating ? 'block' : 'none' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ScanShow;
