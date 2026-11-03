import { useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";
import { title } from "framer-motion/client";

const paragraphs = [
  "May you always find endless happiness and success; this is my most heartfelt wish for you. ❤️",
  "04 November \nstill feels like a special, sacred occasion to me, a festival similar to Diwali.",
  "I always wonder if you are doing well, eating properly, and getting enough rest. I hope you are being gentler with yourself and taking steps toward everything you once shared you wanted to achieve.",
  "I wonder if you still laugh at the little things, find daily reasons to smile, and are surrounded by people who genuinely care about you.",
  "I wonder how you navigate your difficult days, whether you have someone to turn to when life feels overwhelming, and if you are taking good care of your heart.",
  "Above all, I hope you feel truly proud of yourself even for the smallest victories.",
  "It is 2026 now, and in just two months, this year will come to an end too. I never imagined a life where we would be separated. Since then, every day and night has felt very heavy. I may look cool in stories, but it is not how I feel.",
  "I have failed both in holding on to you and in trying to move on. I kept holding on to hope that maybe things could somehow be resolved, while knowing deep down that it was unrealistic. Relationships cannot be run by one person’s hopes or wishes alone.",
  "I have tried everything humanly possible to step into a new chapter and move forward, but no matter how hard I try, I just cannot seem to get away from you.",
  "Main thing is that hum life me ek hi JAAN banate hai",
  "Anyway, I should not dwell on this. Today is meant to celebrate you, not my sorrow. I will not write much more. I know you may not want to read this, and I understand that.",
  "They say the art of letting go means not reaching out, not telling someone you still have feelings, and hiding that you still care. But tell me: what is the point of having a heart then?",
  "Sabki apni ankhein, sabka apna chaand. You will always remain my 🌙.",
  "Happy Birthday once again, LOML ❤️ Wishing you robust health, abundant blessings, and the absolute best in all that lies ahead.",
  "Your well-wisher,\nVipin Mishra (xlr8)",
  "If you have read this far, a reply would truly make my day. Even if you choose not to, I understand. I will take your silence as a sign to stop reaching out.",
  "Since you have made it this far, let me share more 🥰 Tell me, what carries more weight: \n a kilogram of steel,\n or the realization that no amount of effort or reassurance can bring us back together?",
  "My feelings for you have always been deeply real. I am truly sorry for ruining everything. It remains the most intense emotional experience of my life.",
  "I tried reading books to cope, sat quietly by the ocean shores, and climbed mountains, seeking new experiences everywhere. Yet through it all, you were always on my mind.",
  "There are so many wonderful stories I wish I could share with you, and my heart continually wishes you were the one I could tell them to.",
  "I have felt helpless, but I believe there is still a way forward. I have come to realize how deeply feelings guide us.",
  "If the noise around you has quieted, and if there is even a small soft spot left in your heart for me, please, let us meet and talk like the adults we are now.",
  "Let us try to restart and fix the things we already discussed about our future. I am not asking for everything to be fixed instantly, but simply that we take our time to sit down and talk.",
];

const songs = [
  { title: "Gori", ur: "https://youtu.be/ZgfX6qZDO88?si=_dycSEXV6kdORZEi" },
  { title: "Jaan Ho Meri", url: "https://youtu.be/KQdizAPVBlc?si=jXuZQfuxmIIadIkC" },
  { title: "Tera Hi Rahun", url: "https://youtu.be/IsaOXzb4Uh0?si=xxINJbmOzuLoedLv" },
  { title: "Ishq Samajh Paaye", url: "https://youtu.be/am3QWc8A4xI?si=WUQdT-9viXcE9P0f" },
  { title: "Arz Kiya Hai", url: "https://youtu.be/-BJt4fCAtZE?si=t3TYZJTHycgBjSiY" },
  { title: "Alfaaz", url: "https://youtu.be/cQq6iLF66Gc?si=xZTJMyDzR1wSIYZK" },
  { title: "Chaandni", url: "https://youtu.be/tFKoFaLrpE4?si=fs2jTdYh-i5W-YFY" },
  { title: "Aaj Bhi", url: "https://youtu.be/K0ibsAQTyRQ?si=meqrfL8G9_7hfkQ0" },
];

function App() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [crushOpen, setCrushOpen] = useState(false);
  const [hurtOpen, setHurtOpen] = useState(false);
  const [hurtPhoto, setHurtPhoto] = useState(0);
  const [restartOpen, setRestartOpen] = useState(false);
  const [restartPhoto, setRestartPhoto] = useState(0);
  const [reminderVisible, setReminderVisible] = useState(true);
  const [songOffset, setSongOffset] = useState(0);
  const [songsPaused, setSongsPaused] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [holding, setHolding] = useState(false);
  const blowTimer = useRef(null);
  const audioRef = useRef(null);
  const popupOpen = letterOpen || crushOpen || hurtOpen || restartOpen;

  useEffect(() => {
    if (!letterOpen && !crushOpen && !hurtOpen && !restartOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setLetterOpen(false);
        setCrushOpen(false);
        setHurtOpen(false);
        setRestartOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [letterOpen, crushOpen, hurtOpen, restartOpen]);

  useEffect(() => {
    if (songsPaused) return undefined;
    const interval = window.setInterval(
      () => setSongOffset((offset) => (offset + 1) % songs.length),
      2800,
    );
    return () => window.clearInterval(interval);
  }, [songsPaused]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  const startBlowing = () => {
    if (!candlesLit) return;
    setHolding(true);
    blowTimer.current = window.setTimeout(() => {
      setCandlesLit(false);
      setHolding(false);
    }, 1100);
  };
  const stopBlowing = () => {
    window.clearTimeout(blowTimer.current);
    setHolding(false);
  };

  return (
    <main id="top">
      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music.mp3`}
        loop
        muted={muted}
        onEnded={() => setPlaying(false)}
      />
      {reminderVisible && !popupOpen && (
        <aside className="floating-reminder" aria-label="Birthday reminder">
          <img
            src={`${import.meta.env.BASE_URL}birthday-reminder.png`}
            alt="Calendar reminder: Chunnu ka janamdin tomorrow"
          />
          <button onClick={() => setReminderVisible(false)} aria-label="Dismiss reminder">
            <X size={17} />
          </button>
        </aside>
      )}
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
          <button
            className="letter-link"
            onClick={() => setLetterOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={letterOpen}
          >
            Read your letter <span>↗</span>
          </button>
          <button
            className="crush-link"
            onClick={() => setCrushOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={crushOpen}
          >
            Still crushing over you <span>↗</span>
          </button>
          <button
            className="crush-link hurt-link"
            onClick={() => setHurtOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={hurtOpen}
          >
            By the way, who hurt you bro? <span>↗</span>
          </button>
          <button
            className="crush-link restart-link"
            onClick={() => setRestartOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={restartOpen}
          >
            Can we restart? <span>↗</span>
          </button>
        </div>
      </section>
      {letterOpen && (
        <div
          className="letter-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLetterOpen(false);
          }}
        >
          <article
            className="letter-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="letter-title"
          >
            <button
              className="close-button"
              onClick={() => setLetterOpen(false)}
              aria-label="Close letter"
            >
              <X size={20} />
            </button>
            <p className="letter-date">04 November 2026</p>
            <h1 id="letter-title">
              Dearest Doctor ji,
              <br />
              <em>Happy Birthday 🎂</em>
            </h1>
            <div className="letter-body">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>
                  {paragraph.split("\n").map((line, lineIndex) => (
                    <span key={lineIndex}>
                      {lineIndex > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>
            <p className="invitation">I am inviting you to meet.</p>
          </article>
        </div>
      )}
      {crushOpen && (
        <div
          className="letter-overlay crush-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setCrushOpen(false);
          }}
        >
          <article
            className="crush-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="crush-title"
          >
            <button className="close-button" onClick={() => setCrushOpen(false)} aria-label="Close">
              <X size={20} />
            </button>

            <p className="crush-caption">
              And see, I am still crushing over you, even twinning our outfits.
            </p>
            <img
              className="twinning-photo"
              src={`${import.meta.env.BASE_URL}outfit-twins.jpeg`}
              alt="A side-by-side screenshot showing Shivani and Vipin wearing similar light-colored outfits"
            />
            <p className="crush-caption wedding-note">
              I also saw the video you posted of Mitali’s wedding. Trust me, I genuinely smiled. I
              was happy that you were enjoying those moments.
            </p>
          </article>
        </div>
      )}
      {hurtOpen && (
        <div
          className="letter-overlay crush-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setHurtOpen(false);
          }}
        >
          <article
            className="crush-card hurt-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hurt-title"
          >
            <button className="close-button" onClick={() => setHurtOpen(false)} aria-label="Close">
              <X size={20} />
            </button>
            <h2 id="hurt-title">
              By the way,
              <br />
              <em>who hurt you bro?</em>
            </h2>
            <p>
              The last time I checked your profile before you removed me as a follower, I noticed
              you reposted these:
            </p>
            <div className="hurt-gallery" aria-label="Photo carousel">
              <button
                className="gallery-arrow"
                onClick={() => setHurtPhoto((hurtPhoto + 3) % 4)}
                aria-label="Previous photo"
              >
                ‹
              </button>
              <img
                src={`${import.meta.env.BASE_URL}hurt-memory-${hurtPhoto + 1}.jpeg`}
                alt={`Shared memory ${hurtPhoto + 1} of 4`}
              />
              <button
                className="gallery-arrow"
                onClick={() => setHurtPhoto((hurtPhoto + 1) % 4)}
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
            <div className="gallery-dots" aria-label="Choose a photo">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  className={hurtPhoto === index ? "active" : ""}
                  onClick={() => setHurtPhoto(index)}
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={hurtPhoto === index ? "true" : undefined}
                />
              ))}
            </div>
            <div className="hurt-message">
              <p>I am 100% sure they aren't meant for me,</p>
              <p>
                Bhai please don't chase anyone or anything that doesn't provide the value you
                deserve.
              </p>
              <p>You are precious, don't settle for things that hurt you.</p>
              <p>Instagram algorithm knows which nerve is hurting more.</p>
              <p>
                And please, don't give your heart to a situation where your love and expression
                aren't reciprocated equally.
              </p>
              <p>
                I stand before you as a living example of how deeply falling in love can break you.
              </p>
            </div>
          </article>
        </div>
      )}
      {restartOpen && (
        <div
          className="letter-overlay crush-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setRestartOpen(false);
          }}
        >
          <article
            className="crush-card restart-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="restart-title"
          >
            <button
              className="close-button"
              onClick={() => setRestartOpen(false)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <h2 id="restart-title">
              Can we
              <br />
              <em>restart?</em>
            </h2>
            <div className="hurt-gallery" aria-label="Restart photo carousel">
              <button
                className="gallery-arrow"
                onClick={() => setRestartPhoto((restartPhoto + 3) % 4)}
                aria-label="Previous photo"
              >
                ‹
              </button>
              <img
                src={`${import.meta.env.BASE_URL}restart-${restartPhoto + 1}.jpeg`}
                alt={`Restart message ${restartPhoto + 1} of 4`}
              />
              <button
                className="gallery-arrow"
                onClick={() => setRestartPhoto((restartPhoto + 1) % 4)}
                aria-label="Next photo"
              >
                ›
              </button>
            </div>
            <div className="gallery-dots" aria-label="Choose a restart image">
              {[0, 1, 2, 3].map((index) => (
                <button
                  key={index}
                  className={restartPhoto === index ? "active" : ""}
                  onClick={() => setRestartPhoto(index)}
                  aria-label={`Show photo ${index + 1}`}
                  aria-current={restartPhoto === index ? "true" : undefined}
                />
              ))}
            </div>
            <a className="contact-vipin" href="tel:8962424011">
              Contact V
            </a>
          </article>
        </div>
      )}
      <footer
        className="songs-footer"
        onMouseEnter={() => setSongsPaused(true)}
        onMouseLeave={() => setSongsPaused(false)}
        onFocus={() => setSongsPaused(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setSongsPaused(false);
        }}
      >
        <h2>Songs dedicated to you</h2>
        <div className="song-window" aria-label="Song dedications">
          <div className="song-track" style={{ transform: `translateX(-${songOffset * 220}px)` }}>
            {[...songs, ...songs].map((song, index) => (
              <a
                className="song-card"
                href={song.url}
                target="_blank"
                rel="noreferrer"
                key={`${song.title}-${index}`}
              >
                <span className="song-note">♫</span>
                {song.title}
                <span className="song-play">↗</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
