const SNOWFLAKES = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 17) % 100}%`,
  delay: `${(index % 9) * 0.45}s`,
  duration: `${5 + (index % 6) * 0.45}s`,
}));

const TET_FLOWERS = Array.from({ length: 20 }, (_, index) => ({
  left: `${(index * 23) % 100}%`,
  delay: `${(index % 10) * 0.36}s`,
  duration: `${5.4 + (index % 5) * 0.5}s`,
}));

const KUNGFU_CHI = Array.from({ length: 16 }, (_, index) => ({
  left: `${(index * 19) % 100}%`,
  delay: `${(index % 8) * 0.42}s`,
  duration: `${4.8 + (index % 5) * 0.55}s`,
}));

const FARMER_GRASS = Array.from({ length: 34 }, (_, index) => ({
  left: `${(index * 7) % 100}%`,
  delay: `${(index % 9) * 0.18}s`,
  height: `${1.1 + (index % 5) * 0.28}rem`,
}));

const Flower = ({ className = "", style }) => (
  <span className={`theme-tet-flower ${className}`} style={style}>
    <span />
    <span />
    <span />
    <span />
    <span />
  </span>
);

export default function ThemeDecorations() {
  return (
    <div className="theme-decorations" aria-hidden="true">
      <div className="theme-tet-scene">
        {TET_FLOWERS.map((flower, index) => (
          <Flower
            key={index}
            className="theme-tet-falling-flower"
            style={{ left: flower.left, animationDelay: flower.delay, animationDuration: flower.duration }}
          />
        ))}
        <div className="theme-tet-lion">
          <div className="theme-tet-lion-horn" />
          <div className="theme-tet-lion-ear theme-tet-lion-ear-left" />
          <div className="theme-tet-lion-ear theme-tet-lion-ear-right" />
          <div className="theme-tet-lion-head">
            <div className="theme-tet-lion-eye theme-tet-lion-eye-left" />
            <div className="theme-tet-lion-eye theme-tet-lion-eye-right" />
            <div className="theme-tet-lion-nose" />
            <div className="theme-tet-lion-mouth" />
          </div>
          <div className="theme-tet-lion-body" />
          <div className="theme-tet-lion-tail" />
        </div>
      </div>

      <div className="theme-noel-scene">
        {SNOWFLAKES.map((flake, index) => (
          <span
            key={index}
            className="theme-noel-snow"
            style={{ left: flake.left, animationDelay: flake.delay, animationDuration: flake.duration }}
          />
        ))}
        <div className="theme-noel-santa">
          <div className="theme-noel-hat" />
          <div className="theme-noel-face" />
          <div className="theme-noel-beard" />
          <div className="theme-noel-body" />
        </div>
        <div className="theme-noel-reindeer">
          <div className="theme-noel-antlers" />
          <div className="theme-noel-head" />
          <div className="theme-noel-nose" />
          <div className="theme-noel-neck" />
          <div className="theme-noel-body-deer" />
          <div className="theme-noel-leg theme-noel-leg-1" />
          <div className="theme-noel-leg theme-noel-leg-2" />
        </div>
      </div>

      <div className="theme-kungfu-scene">
        {KUNGFU_CHI.map((chi, index) => (
          <span
            key={index}
            className="theme-kungfu-chi"
            style={{ left: chi.left, animationDelay: chi.delay, animationDuration: chi.duration }}
          />
        ))}
        <div className="theme-kungfu-bagua">
          <div className="theme-kungfu-yinyang">
            <span className="theme-kungfu-dot theme-kungfu-dot-dark" />
            <span className="theme-kungfu-dot theme-kungfu-dot-light" />
          </div>
          <span className="theme-kungfu-trigram theme-kungfu-trigram-1">☰</span>
          <span className="theme-kungfu-trigram theme-kungfu-trigram-2">☱</span>
          <span className="theme-kungfu-trigram theme-kungfu-trigram-3">☲</span>
          <span className="theme-kungfu-trigram theme-kungfu-trigram-4">☳</span>
          <span className="theme-kungfu-trigram theme-kungfu-trigram-5">☴</span>
          <span className="theme-kungfu-trigram theme-kungfu-trigram-6">☵</span>
          <span className="theme-kungfu-trigram theme-kungfu-trigram-7">☶</span>
          <span className="theme-kungfu-trigram theme-kungfu-trigram-8">☷</span>
        </div>
      </div>

      <div className="theme-farmer-scene">
        <div className="theme-farmer-grass-field">
          {FARMER_GRASS.map((grass, index) => (
            <span
              key={index}
              className="theme-farmer-grass"
              style={{ left: grass.left, height: grass.height, animationDelay: grass.delay }}
            />
          ))}
        </div>
        <div className="theme-farmer-buffalo">
          <div className="theme-farmer-horn theme-farmer-horn-left" />
          <div className="theme-farmer-horn theme-farmer-horn-right" />
          <div className="theme-farmer-head">
            <div className="theme-farmer-eye" />
            <div className="theme-farmer-snout" />
          </div>
          <div className="theme-farmer-body" />
          <div className="theme-farmer-tail" />
          <div className="theme-farmer-leg theme-farmer-leg-1" />
          <div className="theme-farmer-leg theme-farmer-leg-2" />
          <div className="theme-farmer-plow" />
        </div>
      </div>
    </div>
  );
}
