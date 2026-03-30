import React, { useRef } from 'react';
import './Lifestyle.css';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Lifestyle = () => {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

    // Multi-layer parallax on the image
    const imgY = useTransform(smoothProgress, [0, 1], [-80, 80]);
    const imgScale = useTransform(smoothProgress, [0, 0.4, 1], [1.2, 1.08, 1]);
    // Subtle color temperature shift (warm vignette overlay)
    const overlayOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.4, 0.1, 0]);
    // Ken Burns-style subtle horizontal drift
    const imgX = useTransform(smoothProgress, [0, 1], [-15, 15]);
    // Slight rotation for cinematic feel
    const imgRotate = useTransform(smoothProgress, [0, 0.5, 1], [0.5, 0, -0.5]);

    return (
        <section className="lifestyle-section" id="lifestyle-section" ref={sectionRef}>
            <motion.img
                src="/last.jpeg"
                alt="Lifestyle"
                className="lifestyle-image"
                style={{ y: imgY, x: imgX, scale: imgScale, rotate: imgRotate }}
            />
            {/* Warm vignette overlay that fades as you scroll in */}
            <motion.div className="lifestyle-overlay" style={{ opacity: overlayOpacity }} />
        </section>
    );
};

export default Lifestyle;
