import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const LETTERS = "HOLMES".split("");

const easeSwipe = [0.76, 0, 0.24, 1];

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 2400);
    const t2 = setTimeout(() => setVisible(false), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] bg-dark flex flex-col items-center justify-center gap-6 overflow-hidden"
          animate={leaving ? { y: "-100%" } : { y: 0 }}
          transition={leaving ? { duration: 0.85, ease: easeSwipe } : {}}
        >
          {/* Letters */}
          <div className="flex items-end gap-1 sm:gap-0.5">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={i}
                className="text-[10vw] sm:text-[14vw] font-bold text-light leading-none tracking-widest"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.55, ease: "easeOut" }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Accent line */}
          <div className="relative w-64 sm:w-40 h-[2px] overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-primary dark:bg-primaryDark"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.75, duration: 0.7, ease: "easeInOut" }}
            />
          </div>

          {/* Subtitle */}
          <motion.p
            className="text-light/50 text-sm tracking-[0.35em] uppercase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            Portfolio
          </motion.p>

          {/* Corner dots */}
          {[
            "top-6 left-8",
            "top-6 right-8",
            "bottom-6 left-8",
            "bottom-6 right-8",
          ].map((pos, i) => (
            <motion.span
              key={pos}
              className={`absolute ${pos} w-1.5 h-1.5 rounded-full bg-light/20`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
