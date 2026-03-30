import React, { useRef } from 'react';
import heroVideo from '../../assets/hero-background.mp4';
import Navbar from '../Navbar/Navbar';
import './Hero.css';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Spring-smoothed scroll for buttery parallax
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

    // Multi-layer parallax background
    const bgY = useTransform(smoothProgress, [0, 1], [0, 200]);
    const bgScale = useTransform(smoothProgress, [0, 1], [1, 1.15]);
    // Vignette / overlay darkens as user scrolls away
    const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 0.1, 0.4]);

    // Clouds with varied depth (Y parallax + horizontal slide + rotation)
    const slideRight = useTransform(smoothProgress, [0, 0.4], [0, 1500]);
    const slideLeft = useTransform(smoothProgress, [0, 0.4], [0, -1500]);
    const slideRightFurther = useTransform(smoothProgress, [0, 0.4], [0, 2000]);
    const slideLeftFurther = useTransform(smoothProgress, [0, 0.4], [0, -2000]);
    // Clouds drift upward at different rates for depth
    const cloudYSlow = useTransform(smoothProgress, [0, 1], [0, -60]);
    const cloudYFast = useTransform(smoothProgress, [0, 1], [0, -120]);
    // Subtle cloud rotation
    const cloudRotSlow = useTransform(smoothProgress, [0, 1], [0, 3]);
    const cloudRotFast = useTransform(smoothProgress, [0, 1], [0, -5]);
    // Clouds fade as they exit
    const cloudOpacity = useTransform(smoothProgress, [0, 0.3, 0.6], [0.8, 0.6, 0]);

    const clouds = [
        { id: 1, x: slideLeft, y: cloudYSlow, rotate: cloudRotSlow },
        { id: 2, x: slideRight, y: cloudYFast, rotate: cloudRotFast },
        { id: 3, x: slideLeftFurther, y: cloudYFast, rotate: cloudRotSlow },
        { id: 4, x: slideRightFurther, y: cloudYSlow, rotate: cloudRotFast },
        { id: 5, x: slideLeft, y: cloudYFast, rotate: cloudRotFast },
        { id: 6, x: slideRight, y: cloudYSlow, rotate: cloudRotSlow },
        { id: 7, x: slideLeftFurther, y: cloudYSlow, rotate: cloudRotFast },
        { id: 8, x: slideRightFurther, y: cloudYFast, rotate: cloudRotSlow },
    ];

    // Floating particles at different parallax depths
    const particleY1 = useTransform(smoothProgress, [0, 1], [0, -250]);
    const particleY2 = useTransform(smoothProgress, [0, 1], [0, -150]);
    const particleY3 = useTransform(smoothProgress, [0, 1], [0, -350]);
    const particleX1 = useTransform(smoothProgress, [0, 1], [0, 30]);
    const particleX2 = useTransform(smoothProgress, [0, 1], [0, -20]);
    const particleX3 = useTransform(smoothProgress, [0, 1], [0, 40]);
    const particleOpacity = useTransform(smoothProgress, [0, 0.2, 0.8], [0.6, 0.4, 0]);

    return (
        <section className="hero" ref={containerRef}>
            <Navbar />
            <motion.video
                className="hero-bg-video"
                autoPlay
                loop
                muted
                playsInline
                style={{ y: bgY, scale: bgScale }}
            >
                <source src={heroVideo} type="video/mp4" />
            </motion.video>

            {/* Dark overlay for scroll depth */}
            <motion.div
                className="hero-overlay"
                style={{ opacity: overlayOpacity }}
            />

            {/* Floating particles — different parallax layers */}
            <motion.div className="hero-particle p1" style={{ y: particleY1, x: particleX1, opacity: particleOpacity }} />
            <motion.div className="hero-particle p2" style={{ y: particleY2, x: particleX2, opacity: particleOpacity }} />
            <motion.div className="hero-particle p3" style={{ y: particleY3, x: particleX3, opacity: particleOpacity }} />
            <motion.div className="hero-particle p4" style={{ y: particleY1, x: particleX3, opacity: particleOpacity }} />
            <motion.div className="hero-particle p5" style={{ y: particleY3, x: particleX1, opacity: particleOpacity }} />

            {/* Hero Main Title Wrapper */}
            <div className="hero-title-wrapper">
                <motion.div
                    className="hero-title-container"
                    initial={{ opacity: 0, scale: 0.8, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                >
                    <h1 className="hero-title">Flora</h1>
                </motion.div>

                {/* Hero Product Images (Dual Overlap) */}
                <motion.img
                    src="/hp.png"
                    alt="Perfume Bottles Right"
                    className="hero-product-img"
                    initial={{ opacity: 0, scale: 0.8, y: 200, x: 100, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1.15, y: 150, x: 100, rotate: 15 }}
                    transition={{ duration: 1.8, ease: "easeOut", delay: 0.8 }}
                />
                <motion.img
                    src="/hp.png"
                    alt="Perfume Bottles Left"
                    className="hero-product-img second-bottle"
                    initial={{ opacity: 0, scale: 0.7, y: 230, x: -130, rotate: 0 }}
                    animate={{ opacity: 1, scale: 0.95, y: 180, x: -100, rotate: -15 }}
                    transition={{ duration: 2.0, ease: "easeOut", delay: 1.0 }}
                />
            </div>

            <div className="clouds-container">
                {clouds.map((cloud) => (
                    <motion.img
                        key={cloud.id}
                        src="/cloud.png"
                        alt=""
                        style={{ x: cloud.x, y: cloud.y, rotate: cloud.rotate, opacity: cloudOpacity }}
                        className={`cloud cloud-${cloud.id}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default Hero;
