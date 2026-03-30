import React, { useLayoutEffect, useRef, useState } from 'react';
import './Scents.css';
import { motion, useScroll, useTransform } from 'framer-motion';

const Scents = () => {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const { scrollY } = useScroll();
    const [travelConfig, setTravelConfig] = useState({
        lockStart: 0,
        approachStart: 0,
        lockEnd: 1,
        travelEnd: 1,
        travelDistance: 0,
        visibleStart: 0,
        dropletVisibleStart: 0,
    });

    useLayoutEffect(() => {
        const updateTravelConfig = () => {
            const scentsEl = sectionRef.current;
            const productEl = document.getElementById('product-section');
            const lifestyleEl = document.getElementById('lifestyle-section');

            if (!scentsEl || !productEl || !lifestyleEl) {
                return;
            }

            const scrollTop = window.scrollY || window.pageYOffset;
            const viewportCenter = window.innerHeight / 2;

            const scentsRect = scentsEl.getBoundingClientRect();
            const productRect = productEl.getBoundingClientRect();
            const lifestyleRect = lifestyleEl.getBoundingClientRect();

            const scentsTop = scentsRect.top + scrollTop;
            const productTop = productRect.top + scrollTop;
            const lifestyleTop = lifestyleRect.top + scrollTop;

            const productCenter = productTop + productRect.height / 2 - viewportCenter;
            // Target: bottom of lifestyle section (minus padding so bottle sits above the edge)
            const lifestyleBottom = lifestyleTop + lifestyleRect.height - viewportCenter - 100;

            const sectionSpan = productRect.height + window.innerHeight;
            const lockOffset = 1000;
            const lockStart = productCenter - lockOffset;
            const capRelease = scentsTop + scentsRect.height;
            const lockEnd = Math.max(lockStart + sectionSpan * 0.4, capRelease);
            const travelEnd = Math.max(lockEnd + 1, lifestyleBottom);
            // The bottle is position:fixed at viewport center (top: 50%).
            // To lock at the bottom of Lifestyle, it only needs to travel
            // from viewport center to near the bottom of the viewport.
            const travelDistance = viewportCenter - 450 + 90;
            const visibleStart = scentsTop + 500;
            const dropletVisibleStart = scentsTop + 300;
            const approachStart = Math.max(visibleStart + 1, lockStart);
            setTravelConfig({
                lockStart,
                approachStart,
                lockEnd,
                travelEnd,
                travelDistance,
                visibleStart,
                dropletVisibleStart
            });
        };

        updateTravelConfig();
        window.addEventListener('resize', updateTravelConfig);
        return () => window.removeEventListener('resize', updateTravelConfig);
    }, []);

    // Droplet starts falling after the bottle has settled (approx 30% into section scroll)
    const dropletY = useTransform(scrollYProgress, [0.3, 0.6], [-100, 370]);

    // Sprayer floats down between 40% and 50% scroll, then locks
    const sprayerY = useTransform(scrollYProgress, [0.4, 0.5, 1], [-900, 10, 10]);
    const sprayerOpacity = useTransform(scrollYProgress, [0.4, 0.5, 1], [0, 1, 1]);
    // Sprayer rotation as it flies in
    const sprayerRotate = useTransform(scrollYProgress, [0.4, 0.5], [12, 0]);

    // Cap slides down when the unit locks (at the very end of scroll)
    const capY = useTransform(scrollYProgress, [0.85, 1.0], [-1500, 200]);
    // Cap wobble on arrival
    const capRotate = useTransform(scrollYProgress, [0.85, 0.92, 0.97, 1.0], [-15, 5, -2, 0]);

    // Bottle base zoom — starts small, zooms in during assembly, settles to 1
    const bottleBaseScale = useTransform(scrollYProgress, [0.1, 0.35, 0.6], [0.7, 1.08, 1]);
    // Subtle horizontal sway on the whole bottle during assembly
    const bottleSwayX = useTransform(scrollYProgress, [0.2, 0.4, 0.55, 0.7, 0.85], [0, -8, 5, -3, 0]);

    // Lock at the center of the Product section, hold for 40% of its scroll span,
    // then travel to the center of the Lifestyle section.
    const assemblyY = useTransform(
        scrollY,
        [
            travelConfig.visibleStart,
            travelConfig.approachStart,
            travelConfig.lockEnd,
            travelConfig.travelEnd
        ],
        [
            0,
            0,
            0,
            travelConfig.travelDistance
        ],
        { clamp: true }
    );
    // Zoom out the bottle as it travels to the last section
    const assemblyScale = useTransform(
        scrollY,
        [travelConfig.lockEnd, travelConfig.travelEnd],
        [1, 0.55],
        { clamp: true }
    );
    // Tilt left as it locks into the last section
    const assemblyRotate = useTransform(
        scrollY,
        [travelConfig.lockEnd, travelConfig.travelEnd],
        [0, -8],
        { clamp: true }
    );
    const bottleOpacity = useTransform(
        scrollY,
        [travelConfig.visibleStart, travelConfig.visibleStart + 200],
        [0, 1],
        { clamp: true }
    );
    const dropletOpacity = useTransform(
        scrollY,
        [travelConfig.dropletVisibleStart, travelConfig.dropletVisibleStart + 150],
        [0, 1],
        { clamp: true }
    );

    return (
        <section className="scents-banner" ref={sectionRef}>
            <div className="scents-container">
                <div className="flask-wrapper">
                    <img src="/funnel.png" alt="Flask" className="flask-overlay" />
                </div>

                <div className="bottle-assembly-anchor">
                    <motion.div
                        className="bottle-assembly"
                        style={{ y: assemblyY, scale: assemblyScale, rotate: assemblyRotate }}
                    >
                        <motion.img
                            src="/droplet.png"
                            alt="Perfume Droplet"
                            className="scents-droplet"
                            style={{
                                x: "-50%",
                                y: dropletY,
                                opacity: dropletOpacity
                            }}
                        />


                        <motion.div
                            className="bottle-wrapper"
                            style={{ opacity: bottleOpacity, scale: bottleBaseScale, x: bottleSwayX }}
                        >
                            <motion.img
                                src="/sprayer.png"
                                alt="Perfume Sprayer"
                                className="scents-sprayer"
                                style={{
                                    x: -370,
                                    y: sprayerY,
                                    opacity: sprayerOpacity,
                                    rotate: sprayerRotate
                                }}
                            />
                            <motion.img
                                src="/cap.png"
                                alt="Perfume Cap"
                                className="scents-cap"
                                style={{
                                    x: -244,
                                    y: capY,
                                    rotate: capRotate
                                }}
                            />
                            <img src="/bottle.png" alt="Perfume Bottle" className="scents-bottle" />
                        </motion.div>
                    </motion.div>
                </div>

                <h1 className="scents-bg-text">SCENT</h1>
            </div>
        </section>
    );
};

export default Scents;
