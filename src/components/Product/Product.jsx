import React, { useRef } from 'react';
import './Product.css';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Product = () => {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Spring-smoothed for buttery feel
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });

    const y = useTransform(smoothProgress, [0, 1], [100, -100]);
    const width = useTransform(smoothProgress, [0, 0.4], ["150vh", "100%"]);
    const height = useTransform(smoothProgress, [0, 0.4], ["50vh", "100%"]);
    const bottom = useTransform(smoothProgress, [0, 0.4], ["-5%", "0%"]);
    const borderRadius = useTransform(
        scrollYProgress,
        [0, 0.4],
        ["50% 50% 0 0", "0% 0% 0 0"]
    );

    // Multi-speed parallax for depth — header, left, right all at different speeds
    const headerY = useTransform(smoothProgress, [0, 1], [80, -60]);
    const headerX = useTransform(smoothProgress, [0, 0.3, 1], [-30, 0, 10]);
    const headerRotate = useTransform(smoothProgress, [0, 0.5], [-1, 0]);
    const headerOpacity = useTransform(smoothProgress, [0, 0.15, 0.7, 1], [0, 1, 1, 0.6]);

    const leftInfoY = useTransform(smoothProgress, [0, 1], [120, -40]);
    const leftInfoX = useTransform(smoothProgress, [0, 0.4, 1], [-60, 0, 5]);
    const leftInfoOpacity = useTransform(smoothProgress, [0.1, 0.3, 0.8, 1], [0, 1, 1, 0.5]);

    const rightInfoY = useTransform(smoothProgress, [0, 1], [100, -60]);
    const rightInfoX = useTransform(smoothProgress, [0, 0.4, 1], [60, 0, -5]);
    const rightInfoOpacity = useTransform(smoothProgress, [0.15, 0.35, 0.8, 1], [0, 1, 1, 0.5]);

    const bottomY = useTransform(smoothProgress, [0, 1], [60, -30]);
    const bottomOpacity = useTransform(smoothProgress, [0.2, 0.45, 0.85, 1], [0, 1, 1, 0.3]);
    const bottomScale = useTransform(smoothProgress, [0.2, 0.45], [0.9, 1]);

    // Background circle glow intensity
    const circleGlow = useTransform(smoothProgress, [0.3, 0.6], [0, 20]);

    return (
        <section className="product-section" id="product-section" ref={sectionRef}>
            <motion.div
                className="product-background-circle"
                style={{
                    width,
                    height,
                    bottom,
                    boxShadow: useTransform(circleGlow, v => `0 -10px ${v}px rgba(255,229,180,0.4)`)
                }}
            ></motion.div>

            {/* Top Left Header — drifts in from left with rotation */}
            <motion.div
                className="product-layout-header"
                style={{ y: headerY, x: headerX, rotate: headerRotate, opacity: headerOpacity }}
            >
                <h1 className="main-title">THE ESSENCE OF YOU</h1>
                <p className="sub-title">Elegance. Sophistication. Unforgettable.</p>
            </motion.div>

            <motion.div style={{ y }} className="product-content">
                <div className="product-placeholder">
                    {/* Bottle assembly lands here visually */}
                </div>
            </motion.div>

            {/* Left Content — slides in from left */}
            <motion.div
                className="product-info-left"
                style={{ y: leftInfoY, x: leftInfoX, opacity: leftInfoOpacity }}
            >
                <h3 className="info-title">EAU DE PARFUM</h3>
                <p className="info-text">
                    Experience a scent crafted to complement your<br />
                    unique spirit. A delicate blend of floral and woody notes that<br />
                    lingers beautifully.
                </p>
            </motion.div>

            {/* Right Content — slides in from right */}
            <motion.div
                className="product-info-right"
                style={{ y: rightInfoY, x: rightInfoX, opacity: rightInfoOpacity }}
            >
                <h3 className="info-title">50 ML</h3>
                <p className="info-text">
                    Perfectly sized for your daily ritual or travel.<br />
                    Refillable and designed to be cherished.
                </p>
            </motion.div>

            {/* Bottom Content — scales up and fades in */}
            <motion.div
                className="product-bottom"
                style={{ y: bottomY, opacity: bottomOpacity, scale: bottomScale }}
            >
                <h3 className="bottom-header">DISCOVER MORE</h3>
                <div className="bottom-icons">
                    <div className="icon-item">
                        <span className="icon">❀</span>
                        <span className="icon-label">Natural Ingredients</span>
                    </div>
                    <div className="icon-item">
                        <span className="icon">🍃</span>
                        <span className="icon-label">Sustainable Luxury</span>
                    </div>
                </div>
                <div className="copyright">© 2024 Perfume Co.</div>
            </motion.div>
        </section>
    );
};

export default Product;
