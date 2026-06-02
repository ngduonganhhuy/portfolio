import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';

const DEFAULT_CURSOR = {
  idle: "🐶",
  hover: "🐕",
  burst: "✨",
};

const THEME_CURSORS = {
  noel: {
    idle: "☃️",
    hover: "⛄",
    burst: "❄️",
  },
  tet: {
    idle: "🦁",
    hover: "🧧",
    burst: "✨",
  },
  kungfu: {
    idle: "🥋",
    hover: "🤺",
    burst: "💥",
  },
  farmer: {
    idle: "🐃",
    hover: "🌾",
    burst: "🌱",
  },
};

const getThemeCursor = (themeId) => THEME_CURSORS[themeId] || DEFAULT_CURSOR;

const DogCursor = () => {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);

  const [cursorState, setCursorState] = useState("idle");
  const [themeId, setThemeId] = useState("classic");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const syncTheme = () => setThemeId(document.documentElement.dataset.theme || "classic");
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributeFilter: ["data-theme"],
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const isTouch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (isTouch) return;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      const hovering = el instanceof Element && Boolean(el.closest(INTERACTIVE));
      setCursorState((prev) => (prev === "click" ? "click" : hovering ? "hover" : "idle"));
    };

    const onDown = () => setCursorState("click");
    const onUp = () => setCursorState((prev) => (prev === "click" ? "idle" : prev));

    const onLeaveWindow = () => setVisible(false);
    const onEnterWindow = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);
    document.documentElement.addEventListener("mouseenter", onEnterWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.removeEventListener("mouseenter", onEnterWindow);
    };
  }, [x, y, visible]);

  if (!visible) return null;

  const themeCursor = getThemeCursor(themeId);
  const cursorSymbol = cursorState === "hover" ? themeCursor.hover : themeCursor.idle;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
      style={{ x, y, translateX: "-50%", translateY: "-60%" }}
    >
      <motion.div
        className="relative"
        animate={
          cursorState === "click"
            ? { scale: 0.65, y: 6 }
            : cursorState === "hover"
            ? { scale: 1.5, y: -4 }
            : { scale: 1, y: 0 }
          }
          transition={{ type: "spring", stiffness: 500, damping: 22 }}
        >
        <motion.div
          aria-hidden="true"
          className={`absolute -inset-1 rounded-full ${
            themeId === "tet"
              ? "bg-primary/20"
              : themeId === "noel"
              ? "bg-light/20"
              : themeId === "kungfu"
              ? "bg-primaryDark/20"
              : themeId === "farmer"
              ? "bg-primary/20"
              : "bg-transparent"
          }`}
          animate={
            cursorState === "hover"
              ? { opacity: [0.35, 0.75, 0.35], scale: [0.85, 1.15, 0.85] }
              : { opacity: 0, scale: 0.85 }
          }
          transition={{ duration: 0.8, ease: "easeInOut", repeat: cursorState === "hover" ? Infinity : 0 }}
        />
        <motion.div
          animate={
            cursorState === "idle"
              ? { rotate: [0, 18, -18, 12, -12, 6, 0] }
              : cursorState === "hover"
              ? { rotate: [0, 20, -20, 20, -20] }
              : { rotate: -25 }
          }
          transition={
            cursorState === "idle"
              ? { duration: 1.8, ease: "easeInOut", repeat: Infinity, repeatDelay: 2.5 }
              : cursorState === "hover"
              ? { duration: 0.4, ease: "easeInOut", repeat: Infinity }
              : { duration: 0.15 }
          }
          style={{ transformOrigin: "50% 80%", fontSize: "2rem", lineHeight: 1 }}
        >
          {cursorSymbol}
        </motion.div>
      </motion.div>

      {cursorState === "click" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 2.5 }}
          transition={{ duration: 0.35 }}
        >
          <span style={{ fontSize: "1rem" }}>{themeCursor.burst}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DogCursor;
