import { motion } from "framer-motion";

const VARIANTS = {
  fadeUp: { hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0 } },
  fadeLeft: { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0 } },
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

const ScrollReveal = ({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = 0.55,
  className = "",
}) => (
  <motion.div
    className={className}
    variants={VARIANTS[variant]}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default ScrollReveal;
