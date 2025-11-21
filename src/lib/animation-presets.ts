import { Variants } from 'framer-motion';

export const ANIMATION_PRESETS: Record<string, Variants> = {
    'fade-up': {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
    },
    'cyberpunk-glitch': {
        hidden: { opacity: 0, x: -20, skewX: 10 },
        visible: {
            opacity: 1,
            x: 0,
            skewX: 0,
            transition: {
                duration: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 10
            }
        }
    },
    'vortex-in': {
        hidden: { opacity: 0, scale: 0.5, rotate: -180 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: { duration: 1.2, type: "spring", bounce: 0.4 }
        }
    },
    'neon-pulse': {
        hidden: { opacity: 0, scale: 0.95, filter: "brightness(0.5)" },
        visible: {
            opacity: 1,
            scale: 1,
            filter: "brightness(1.2)",
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror"
            }
        }
    },
    'liquid-reveal': {
        hidden: { opacity: 0, clipPath: "circle(0% at 50% 50%)" },
        visible: {
            opacity: 1,
            clipPath: "circle(150% at 50% 50%)",
            transition: { duration: 1.5, ease: "circOut" }
        }
    },
    'matrix-rain': {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    },
    'cinematic-zoom': {
        hidden: { opacity: 0, scale: 1.1, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            transition: { duration: 1.5, ease: "easeOut" }
        }
    },
    '3d-flip': {
        hidden: { opacity: 0, rotateX: 90, transformPerspective: 1000 },
        visible: {
            opacity: 1,
            rotateX: 0,
            transformPerspective: 1000,
            transition: { duration: 0.8, ease: "backOut" }
        }
    }
};

export const HOVER_EFFECTS = {
    'glow': {
        scale: 1.02,
        boxShadow: "0 0 20px rgba(255,255,255,0.5)",
        transition: { duration: 0.3 }
    },
    'lift': {
        y: -10,
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        transition: { duration: 0.3 }
    },
    'shake': {
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.4 }
    },
    'neon-border': {
        boxShadow: [
            "0 0 5px #fff",
            "0 0 10px #fff",
            "0 0 20px #ff00de",
            "0 0 40px #ff00de"
        ],
        transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" }
    }
};
