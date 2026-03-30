import React, { useRef } from 'react';
import './Ingredients.css';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Ingredients = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Spring-smoothed scroll
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });

    // Parallax for header — Y drift + subtle opacity fade
    const headerY = useTransform(smoothProgress, [0, 1], [0, -100]);
    const headerOpacity = useTransform(smoothProgress, [0, 0.4, 0.8], [1, 1, 0.3]);
    const headerScale = useTransform(smoothProgress, [0, 0.8], [1, 0.95]);

    // Funnel icon rotates slowly and drifts
    const funnelRotate = useTransform(smoothProgress, [0, 1], [0, 15]);
    const funnelY = useTransform(smoothProgress, [0, 1], [0, -50]);

    const flowers = [
        { src: '/flower1.png', id: 1, col: 0, row: 0 },
        { src: '/flower2.png', id: 2, col: 1, row: 0 },
        { src: '/flower3.png', id: 3, col: 2, row: 0 },
        { src: '/flower4.png', id: 4, col: 0, row: 1 },
        { src: '/flower5.png', id: 5, col: 1, row: 1 },
        { src: "/flower6'.png", id: 6, col: 2, row: 1 },
    ];

    // Distillation animation with added rotation per flower
    const getFlowerMotion = (col, row, id) => {
        const animationStart = 0.2;
        const animationEnd = 0.8;

        const yDistance = row === 0 ? 980 : 580;
        const y = useTransform(smoothProgress, [animationStart, animationEnd], [0, yDistance]);

        const xBase = col === 0 ? 400 : col === 2 ? -400 : 0;
        const x = useTransform(smoothProgress, [animationStart, 0.9], [0, xBase]);

        const opacity = useTransform(smoothProgress, [animationStart, 0.9, 0.98], [1, 1, 0.85]);
        const scale = useTransform(smoothProgress, [animationStart, 0.9], [1, 0.45]);

        // Rotation — each flower rotates differently based on position
        const rotateAmount = col === 0 ? 25 : col === 2 ? -25 : 15;
        const rotate = useTransform(smoothProgress, [animationStart, animationEnd], [0, rotateAmount]);

        // Blur as flowers converge (depth of field effect)
        const blurAmount = useTransform(smoothProgress, [0.7, 0.95], [0, 3]);

        return { x, y, opacity, scale, rotate, blurAmount };
    };

    return (
        <section className="ingredients" ref={containerRef}>
            <motion.div
                className="ingredients-header"
                style={{ y: headerY, opacity: headerOpacity, scale: headerScale }}
            >
                <h2 className="ingredients-title">Star Ingredients</h2>
            </motion.div>

            <div className="ingredients-grid">
                {flowers.map((flower) => {
                    const { x, y, opacity, scale, rotate, blurAmount } = getFlowerMotion(flower.col, flower.row, flower.id);
                    return (
                        <div key={flower.id} className="grid-item">
                            <motion.img
                                src={flower.src}
                                alt={`Flower ${flower.id}`}
                                className="flower-img"
                                style={{ x, y, opacity, scale, rotate, filter: useTransform(blurAmount, v => `blur(${v}px)`) }}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Ingredients;
