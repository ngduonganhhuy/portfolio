import { SKILLS } from "@/data/skills";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const SPARKLES = [
  { left: "10%", top: "15%", delay: 0,   dur: 2.2, char: "✦", size: "0.55rem" },
  { left: "82%", top: "18%", delay: 0.7, dur: 1.8, char: "✧", size: "0.7rem"  },
  { left: "22%", top: "78%", delay: 1.2, dur: 2.5, char: "✦", size: "0.5rem"  },
  { left: "72%", top: "72%", delay: 0.3, dur: 2.0, char: "⋆", size: "0.9rem"  },
  { left: "46%", top: "8%",  delay: 1.5, dur: 1.6, char: "✦", size: "0.6rem"  },
  { left: "88%", top: "50%", delay: 0.9, dur: 2.3, char: "✧", size: "0.75rem" },
  { left: "6%",  top: "55%", delay: 2.0, dur: 1.9, char: "✦", size: "0.5rem"  },
  { left: "54%", top: "87%", delay: 0.5, dur: 2.1, char: "⋆", size: "0.85rem" },
  { left: "32%", top: "35%", delay: 1.8, dur: 1.7, char: "✧", size: "0.6rem"  },
  { left: "76%", top: "38%", delay: 0.2, dur: 2.4, char: "✦", size: "0.55rem" },
  { left: "16%", top: "90%", delay: 1.4, dur: 2.0, char: "✦", size: "0.5rem"  },
  { left: "60%", top: "12%", delay: 0.8, dur: 1.5, char: "✧", size: "0.7rem"  },
  { left: "93%", top: "82%", delay: 1.9, dur: 2.2, char: "⋆", size: "0.9rem"  },
  { left: "4%",  top: "32%", delay: 0.6, dur: 1.8, char: "✦", size: "0.6rem"  },
  { left: "38%", top: "5%",  delay: 2.3, dur: 2.6, char: "✧", size: "0.65rem" },
  { left: "66%", top: "92%", delay: 1.1, dur: 2.0, char: "✦", size: "0.5rem"  },
  { left: "95%", top: "28%", delay: 0.4, dur: 1.9, char: "⋆", size: "0.8rem"  },
  { left: "28%", top: "55%", delay: 1.6, dur: 2.3, char: "✦", size: "0.55rem" },
];

const RunningDog = ({ maxRadius }) => {
  const dogRef = useRef(null);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const maxRadiusRef = useRef(maxRadius);

  useEffect(() => { maxRadiusRef.current = maxRadius; }, [maxRadius]);

  useEffect(() => {
    const R0 = 60;
    const LAPS = 3.2;
    const DURATION = 13000;

    const tick = (time) => {
      const el = dogRef.current;
      if (!el) { rafRef.current = requestAnimationFrame(tick); return; }
      if (startTimeRef.current === null) startTimeRef.current = time;

      const t = ((time - startTimeRef.current) % DURATION) / DURATION;
      const R1 = maxRadiusRef.current;
      const r = R0 + (R1 - R0) * t;
      const a = t * LAPS * 2 * Math.PI - Math.PI / 2;
      const cx = r * Math.cos(a);
      const cy = r * Math.sin(a);

      const tN = t + 0.001;
      const rN = R0 + (R1 - R0) * tN;
      const aN = tN * LAPS * 2 * Math.PI - Math.PI / 2;
      const flip = rN * Math.cos(aN) - cx >= 0 ? 1 : -1;

      el.style.transform = `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px)) scaleX(${flip})`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={dogRef}
      className="absolute left-1/2 top-1/2 text-2xl pointer-events-none select-none leading-none z-20"
      style={{ willChange: "transform" }}
    >
      🐕
    </div>
  );
};

const SkillBadge = ({ name, x, y, url }) => (
  <Link href={url ?? "#"} target="_blank">
    <motion.div
      className="items-center justify-center rounded-full font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer absolute dark:text-dark dark:bg-light lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 xs:bg-transparent xs:dark:bg-transparent xs:text-dark xs:dark:text-light xs:font-bold"
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x, y, transition: { duration: 1.5 } }}
      animate={{ x, y }}
      transition={{ duration: 1.5 }}
    >
      {name}
    </motion.div>
  </Link>
);

const Skills = () => {
  const containerRef = useRef(null);
  const [maxRadius, setMaxRadius] = useState(280);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      // 85% of the shorter half-dimension so the spiral stays inside
      setMaxRadius(Math.min(width, height) / 2 * 0.85);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <h2 className="font-bold text-8xl w-full text-center dark:text-light md:text-6xl xs:text-4xl">
        Skills
      </h2>
      <div
        ref={containerRef}
        className="w-full flex-1 relative flex items-center justify-center
          bg-circularLight dark:bg-circularDark
          lg:bg-circularLightLg lg:dark:bg-circularDarkLg
          md:bg-circularLightMd md:dark:bg-circularDarkMd
          sm:bg-circularLightSm sm:dark:bg-circularDarkSm"
      >
        {/* Sparkles */}
        {SPARKLES.map((s, i) => (
          <motion.span
            key={i}
            className="absolute pointer-events-none select-none text-dark/50 dark:text-light/60"
            style={{ left: s.left, top: s.top, fontSize: s.size }}
            animate={{ opacity: [0, 1, 0.2, 1, 0], scale: [0.6, 1.3, 0.8, 1.2, 0.6] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
          >
            {s.char}
          </motion.span>
        ))}

        {/* Dog running along spiral */}
        <RunningDog maxRadius={maxRadius} />

        {/* Center badge */}
        <motion.div className="flex items-center justify-center rounded-full font-semibold bg-dark text-light p-8 shadow-dark cursor-pointer dark:text-dark dark:bg-light lg:p-6 md:p-4 xs:text-xs xs:p-2 relative z-10">
          Mobile
        </motion.div>

        {SKILLS.map((skill) => (
          <SkillBadge key={skill.name} {...skill} />
        ))}
      </div>
    </>
  );
};

export default Skills;
