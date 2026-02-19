import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * StepTransition — full-screen 3D loading overlay shown between steps.
 * Calls `onDone()` after the animation completes (~2.2 s).
 */
export default function StepTransition({ label = 'Loading VCF file…', onDone }) {
    const [progress, setProgress] = useState(0);
    const [textIndex, setTextIndex] = useState(0);

    const messages = [
        'Parsing variant call format…',
        'Reading genomic markers…',
        'Mapping allele frequencies…',
        'Preparing drug interaction lookup…',
    ];

    useEffect(() => {
        // Cycle through messages
        const msgTimer = setInterval(() => {
            setTextIndex(i => Math.min(i + 1, messages.length - 1));
        }, 480);

        // Drive progress bar
        let pct = 0;
        const progTimer = setInterval(() => {
            pct += Math.random() * 14;
            if (pct >= 100) { pct = 100; clearInterval(progTimer); }
            setProgress(Math.min(pct, 100));
        }, 90);

        // Done after 2.2 s
        const done = setTimeout(onDone, 2200);

        return () => {
            clearInterval(msgTimer);
            clearInterval(progTimer);
            clearTimeout(done);
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                key="transition"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed', inset: 0, zIndex: 200,
                    background: 'rgba(10,14,26,0.96)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    gap: 32,
                }}
            >
                {/* 3D DNA ring stack */}
                <div style={{ position: 'relative', width: 120, height: 120, perspective: 600 }}>
                    {[0, 1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ rotateY: 360 }}
                            transition={{
                                duration: 1.8 - i * 0.15,
                                ease: 'linear',
                                repeat: Infinity,
                                delay: i * 0.12,
                            }}
                            style={{
                                position: 'absolute',
                                inset: i * 10,
                                borderRadius: '50%',
                                border: `2.5px solid ${['#3B82F6', '#A78BFA', '#34D399', '#FCD34D'][i]}`,
                                boxShadow: `0 0 12px ${['rgba(59,130,246,0.5)', 'rgba(167,139,250,0.5)', 'rgba(52,211,153,0.5)', 'rgba(252,211,77,0.5)'][i]}`,
                                transformStyle: 'preserve-3d',
                            }}
                        />
                    ))}
                    {/* Centre glow dot */}
                    <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        style={{
                            position: 'absolute', inset: 0,
                            margin: 'auto',
                            width: 18, height: 18,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, #60A5FA, #3B82F6)',
                            boxShadow: '0 0 20px rgba(59,130,246,0.8)',
                            top: 'calc(50% - 9px)', left: 'calc(50% - 9px)',
                        }}
                    />
                </div>

                {/* Label */}
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 22, fontWeight: 700,
                        color: '#E2E8F0',
                        marginBottom: 10,
                        letterSpacing: '-0.3px',
                    }}>
                        {label}
                    </div>

                    {/* Cycling sub-message */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={textIndex}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                            style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 12.5, color: '#64748B',
                                letterSpacing: '0.3px',
                            }}
                        >
                            {messages[textIndex]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress bar */}
                <div style={{ width: 260, height: 3, background: '#1E293B', borderRadius: 99, overflow: 'hidden' }}>
                    <motion.div
                        style={{
                            height: '100%',
                            width: progress + '%',
                            background: 'linear-gradient(90deg, #3B82F6, #A78BFA)',
                            borderRadius: 99,
                            boxShadow: '0 0 10px rgba(59,130,246,0.6)',
                        }}
                        transition={{ ease: 'linear' }}
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
