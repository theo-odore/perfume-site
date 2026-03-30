import React, { useState } from 'react';
import './Navbar.css';
import { motion } from 'framer-motion';

const Navbar = () => {
    const navItems = ['Home', 'Fragrances', 'Collections', 'Craft', 'Journal'];
    const [activeIndex, setActiveIndex] = useState(1); // Set "Fragrances" as active by default to match image

    return (
        <motion.nav 
            className="navbar"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="navbar-container">
                {/* Center: Nav links in glass pill */}
                <div className="navbar-pill">
                    {navItems.map((item, index) => (
                        <a 
                            key={item} 
                            href={`#${item.toLowerCase()}`} 
                            className={`nav-link ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;



