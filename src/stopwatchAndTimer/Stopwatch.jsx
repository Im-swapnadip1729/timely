import { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon, ResetIcon } from "../assets/Icon";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef(0);
  const requestRef = useRef(null);

  const animate = () => {
    // eslint-disable-next-line react-hooks/purity
    setTime(Date.now() - startTimeRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  const toggleStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - time;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setIsRunning(false);
      cancelAnimationFrame(requestRef.current);
    }
  };

  const resetStopwatch = () => {
    setIsRunning(false);
    cancelAnimationFrame(requestRef.current);
    setTime(0);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((ms % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const centiseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");
    return { minutes, seconds, centiseconds };
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const { minutes, seconds, centiseconds } = formatTime(time);

  return (
    <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-500">
      <div className="flex items-baseline justify-center w-full my-16 font-mono tracking-tighter tabular-nums select-none">
        <span className="text-7xl sm:text-8xl font-extralight text-zinc-900 dark:text-white drop-shadow-md transition-colors duration-500">
          {minutes}:{seconds}
        </span>
        <span className="text-4xl sm:text-5xl font-light text-zinc-400 dark:text-zinc-500 ml-2 transition-colors duration-500">
          .{centiseconds}
        </span>
      </div>

      <div className="flex items-center gap-8">
        <button
          onClick={resetStopwatch}
          className="group relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-zinc-200 dark:hover:bg-white/5 active:scale-95"
          title="Reset"
        >
          <div className="absolute inset-0 rounded-full border border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 transition-colors" />
          <span className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
            <ResetIcon />
          </span>
        </button>

        <button
          onClick={toggleStopwatch}
          className={`group relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 active:scale-95 ${
            isRunning
              ? "text-amber-500 dark:text-amber-400"
              : "text-emerald-500 dark:text-emerald-400"
          }`}
        >
          <div
            className={`absolute inset-0 rounded-full blur-xl opacity-20 dark:opacity-40 transition-all duration-500 ${
              isRunning
                ? "bg-amber-500 group-hover:opacity-40 dark:group-hover:opacity-60 group-hover:blur-2xl"
                : "bg-emerald-500 group-hover:opacity-40 dark:group-hover:opacity-60 group-hover:blur-2xl"
            }`}
          />
          <div
            className={`absolute inset-0 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md border transition-colors duration-300 ${
              isRunning
                ? "border-amber-500/30 group-hover:border-amber-400/50"
                : "border-emerald-500/30 group-hover:border-emerald-400/50"
            }`}
          />
          <span className="relative z-10">
            {isRunning ? <PauseIcon /> : <PlayIcon />}
          </span>
        </button>
      </div>
    </div>
  );
}