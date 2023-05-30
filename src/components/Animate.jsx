import React, { useEffect, useRef, useState } from 'react';

const ScanShow = () => {
    const canvasRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let x = 4;
        let y = 4;
        let speed = 1;
        let isBottom = false;
        let startTime = null;

        const draw = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (isAnimating) {
                ctx.fillStyle = '#2980B9';
                ctx.lineCap = 'round';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#2980B9';
                ctx.fillRect(x, y, 200, 5);

                if (!isBottom && y < canvas.height - 14) y += speed;
                else if (y === canvas.height - 14) isBottom = true;

                if (isBottom && y > 4) y -= speed;
                else if (y === 4) isBottom = false;

                if (elapsed < 2200) {
                    requestAnimationFrame(draw);
                } else {
                    setIsAnimating(false);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
            }
        };

        requestAnimationFrame(draw);
    }, []);

    return (
        <div className='canvas' style={{ display: isAnimating ? 'block' : 'none' }}>
            <canvas ref={canvasRef} />
        </div>
    )
};

export default (ScanShow)
