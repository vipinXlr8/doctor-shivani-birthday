import { useEffect, useRef, useState } from "react";

function App() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [holding, setHolding] = useState(false);
  const [celebration, setCelebration] = useState(false);
  const blowTimer = useRef(null);
  const celebrationTimer = useRef(null);

  useEffect(
    () => () => {
      window.clearTimeout(blowTimer.current);
      window.clearTimeout(celebrationTimer.current);
    },
    [],
  );

  const startBlowing = () => {
    if (!candlesLit) return;
    setHolding(true);
    blowTimer.current = window.setTimeout(() => {
      setCandlesLit(false);
      setHolding(false);
      setCelebration(true);
      window.clearTimeout(celebrationTimer.current);
      celebrationTimer.current = window.setTimeout(() => setCelebration(false), 2400);
    }, 1100);
  };
  const stopBlowing = () => {
    window.clearTimeout(blowTimer.current);
    setHolding(false);
  };

  return (
    <main id="top">
      <section className="landing">
        <div className="birthday-scene">
          <p className="birthday-date">04 · 11 · 2026</p>
          <h1>
            Happy Birthday,
            <br />
            <em>Doctor Shivani Mishra</em>
          </h1>
          <div className={`cake-scene ${candlesLit ? "" : "is-blown"}`}>
            <div className="cake-shadow" />
            <div className="cake cake-bottom">
              <span className="frosting drip-one" />
              <span className="frosting drip-two" />
              <span className="frosting drip-three" />
            </div>
            <div className="cake cake-top">
              <span className="top-frosting" />
            </div>
            <div
              className="candles"
              aria-label={candlesLit ? "Candles are lit" : "Candles are blown out"}
            >
              {[0, 1, 2, 3, 4].map((candle) => (
                <span className="candle" key={candle} style={{ "--candle": candle }}>
                  <i className="flame" />
                  <i className="smoke" />
                </span>
              ))}
            </div>
            {celebration && (
              <div className="celebration-particles" aria-hidden="true">
                {Array.from({ length: 36 }, (_, index) => {
                  const angle = Math.PI + (index / 35) * Math.PI;
                  const distance = 48 + ((index * 37) % 96);
                  return (
                    <i
                      key={index}
                      style={{
                        "--x": `${Math.cos(angle) * distance}px`,
                        "--y": `${Math.sin(angle) * distance - 26}px`,
                        "--delay": `${(index % 8) * 18}ms`,
                        "--hue": `${(index * 47) % 360}`,
                      }}
                    />
                  );
                })}
              </div>
            )}
            <button
              className={`blow-target ${holding ? "is-holding" : ""}`}
              onPointerDown={startBlowing}
              onPointerUp={stopBlowing}
              onPointerLeave={stopBlowing}
              onPointerCancel={stopBlowing}
              onContextMenu={(event) => event.preventDefault()}
              aria-label={candlesLit ? "Hold to blow out the candles" : "Candles blown out"}
              aria-pressed={!candlesLit}
            >
              <span className="blow-progress" />
            </button>
          </div>
          <p className="cake-prompt" aria-live="polite">
            {candlesLit
              ? holding
                ? "Keep holding…"
                : "Press and hold on cake to blow out the candles"
              : "Make a wish ✨"}
          </p>
          {!candlesLit && (
            <button className="relight-button" onClick={() => setCandlesLit(true)}>
              Light the candles again
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default App;
