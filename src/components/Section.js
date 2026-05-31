const Section = ({ children, className = "", fullHeight = false }) => (
  <section
    className={`
      snap-start w-full flex flex-col justify-center
      px-32 xl:px-24 lg:px-16 md:px-12 sm:px-8
      bg-light dark:bg-dark dark:text-light
      ${fullHeight ? "h-screen" : "min-h-screen py-16"}
      ${className}
    `}
  >
    {children}
  </section>
);

export default Section;
