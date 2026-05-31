import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';

const DogCursor = () => {
  const x = useMotionValue(-300);
  const y = useMotionValue(-300);

  const [cursorState, setCursorState] = useState("idle");
  const [visible, setVisible] = useState(false);

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

    const onDown = () => setCursorState("click"); const onUp = () =>
      setCursorState((prev) => (prev === "click" ? "idle" : prev));

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

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] select-none"
      style={{ x, y, translateX: "-50%", translateY: "-60%" }}
    >
      <motion.div
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
          {cursorState === "hover" ? "🐕" : "🐶"}
        </motion.div>
      </motion.div>

      {cursorState === "click" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 2.5 }}
          transition={{ duration: 0.35 }}
        >
          <span style={{ fontSize: "1rem" }}>✨</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DogCursor;
