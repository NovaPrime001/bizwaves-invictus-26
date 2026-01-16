import React, { useEffect, useRef } from 'react';

const Confetti: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // FIX: Initialize useRef with null for better type safety and to resolve potential inference issues.
    const animationFrameIdRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const pieces: any[] = [];
        const numberOfPieces = 250;
        const colors = ['#06b6d4', '#22d3ee', '#67e8f9', '#ffffff', '#facc15', '#ec4899'];

        const originX = width / 2;
        const originY = height / 2;

        function createPieces() {
            for (let i = 0; i < numberOfPieces; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 8 + 4;
                const gravity = 0.1;
                const friction = 0.98;
                const lifespan = Math.random() * 50 + 80;

                pieces.push({
                    x: originX,
                    y: originY,
                    velocityX: Math.cos(angle) * speed,
                    velocityY: Math.sin(angle) * speed - (Math.random() * 4),
                    size: Math.random() * 8 + 4,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 10,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    gravity: gravity,
                    friction: friction,
                    opacity: 1,
                    lifespan: lifespan,
                    life: 0,
                });
            }
        }

        function updateAndDraw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            for (let i = pieces.length - 1; i >= 0; i--) {
                const p = pieces[i];

                p.velocityY += p.gravity;
                p.velocityX *= p.friction;
                p.velocityY *= p.friction;
                p.x += p.velocityX;
                p.y += p.velocityY;
                p.rotation += p.rotationSpeed;
                
                p.life++;
                p.opacity = 1 - (p.life / p.lifespan);

                if (p.opacity <= 0) {
                    pieces.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.globalAlpha = p.opacity;
                ctx.fillStyle = p.color;
                ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                ctx.restore();
            }
        }

        function animate() {
            updateAndDraw();
            if (pieces.length > 0) {
                animationFrameIdRef.current = requestAnimationFrame(animate);
            } else {
                 if(ctx) ctx.clearRect(0, 0, width, height);
            }
        }
        
        const handleResize = () => {
             width = window.innerWidth;
             height = window.innerHeight;
             if(canvas) {
                canvas.width = width;
                canvas.height = height;
             }
        }

        createPieces();
        animate();
        window.addEventListener('resize', handleResize);
        
        const timeoutId = setTimeout(() => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            if(ctx) ctx.clearRect(0, 0, width, height);
        }, 2000);

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100, pointerEvents: 'none' }} />;
};

export default Confetti;