import React, { useState, useEffect, useRef } from "react";
import { PlayIcon, PauseIcon, ResetIcon } from "./../assets/Icon";

export default function Timer() {
  const [mode, setMode] = useState("input"); // 'input', 'running', 'paused'
  const [inputTime, setInputTime] = useState({ h: "", m: "", s: "" });
  const [timeRemaining, setTimeRemaining] = useState(0);

  const expectedEndTimeRef = useRef(0);
  const timerIntervalRef = useRef(null);

  // --- Preset Values ---
  const presets = [
    { label: "5m", values: { h: "", m: "5", s: "" } },
    { label: "10m", values: { h: "", m: "10", s: "" } },
    { label: "25m", values: { h: "", m: "25", s: "" } },
    { label: "45m", values: { h: "", m: "45", s: "" } },
    { label: "1h", values: { h: "1", m: "", s: "" } },
  ];

  const handlePresetClick = (presetValues) => {
    setInputTime(presetValues);
  };

  const startTimer = () => {
    let totalSeconds = timeRemaining;

    if (mode === "input") {
      const h = parseInt(inputTime.h || "0", 10);
      const m = parseInt(inputTime.m || "0", 10);
      const s = parseInt(inputTime.s || "0", 10);
      totalSeconds = h * 3600 + m * 60 + s;

      if (totalSeconds <= 0) return;
      setTimeRemaining(totalSeconds);
    }

    setMode("running");
    expectedEndTimeRef.current = Date.now() + totalSeconds * 1000;

    timerIntervalRef.current = setInterval(() => {
      const now = Date.now();
      const remaining = Math.round((expectedEndTimeRef.current - now) / 1000);

      if (remaining <= 0) {
        clearInterval(timerIntervalRef.current);
        setTimeRemaining(0);
        setMode("input");
      } else {
        setTimeRemaining(remaining);
      }
    }, 200);
  };

  const pauseTimer = () => {
    setMode("paused");
    clearInterval(timerIntervalRef.current);
  };

  const resetTimer = () => {
    setMode("input");
    clearInterval(timerIntervalRef.current);
    setTimeRemaining(0);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    setInputTime((prev) => ({ ...prev, [field]: value }));
  };

  const formatTimeDisplay = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    if (h > 0) {
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => clearInterval(timerIntervalRef.current);
  }, []);

  return (
    <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-500">
      <div className="h-48 flex flex-col items-center justify-center w-full">
        {mode === "input" ? (
          <div className="flex flex-col items-center w-full mt-4">
            {/* Input Fields */}
            <div className="flex items-center gap-4 text-white w-full max-w-xs mx-auto mb-10">
              {[
                { label: "h", placeholder: "00", value: inputTime.h },
                { label: "m", placeholder: "00", value: inputTime.m },
                { label: "s", placeholder: "00", value: inputTime.s },
              ].map((unit, idx) => (
                <React.Fragment key={unit.label}>
                  <div className="relative group w-20 flex flex-col items-center">
                    <input
                      type="number"
                      placeholder={unit.placeholder}
                      value={unit.value}
                      onChange={(e) => handleInputChange(e, unit.label)}
                      className="w-full bg-transparent text-center text-5xl sm:text-6xl font-extralight text-white border-b border-zinc-700/50 focus:border-blue-500/50 hover:border-zinc-500 transition-colors focus:outline-none placeholder:text-zinc-800 pb-2 z-10"
                    />
                    <span className="absolute -bottom-6 text-xs font-medium tracking-widest text-zinc-500 uppercase">
                      {unit.label}
                    </span>
                    <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                  {idx < 2 && (
                    <span className="text-3xl font-extralight text-zinc-700 mb-6">
                      :
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Presets Row */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full max-w-sm">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => handlePresetClick(preset.values)}
                  className="px-4 py-1.5 rounded-full border border-zinc-700/50 text-xs font-medium text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-white/5 transition-all duration-300 active:scale-95"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <div className="text-7xl sm:text-8xl font-mono font-extralight tracking-tighter text-white tabular-nums drop-shadow-md select-none">
              {formatTimeDisplay(timeRemaining)}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-8 mt-10">
        <button
          onClick={resetTimer}
          className={`group relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
            mode === "input"
              ? "opacity-30 cursor-not-allowed"
              : "hover:bg-white/5 active:scale-95"
          }`}
          disabled={mode === "input"}
          title="Reset"
        >
          <div className="absolute inset-0 rounded-full border border-zinc-700 group-hover:border-zinc-500 transition-colors" />
          <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
            <ResetIcon />
          </span>
        </button>

        <button
          onClick={mode === "running" ? pauseTimer : startTimer}
          className={`group relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 active:scale-95 ${
            mode === "running" ? "text-amber-400" : "text-blue-400"
          }`}
        >
          <div
            className={`absolute inset-0 rounded-full blur-xl opacity-40 transition-all duration-500 ${
              mode === "running"
                ? "bg-amber-500 group-hover:opacity-60 group-hover:blur-2xl"
                : "bg-blue-500 group-hover:opacity-60 group-hover:blur-2xl"
            }`}
          />
          <div
            className={`absolute inset-0 rounded-full bg-black/40 backdrop-blur-md border transition-colors duration-300 ${
              mode === "running"
                ? "border-amber-500/30 group-hover:border-amber-400/50"
                : "border-blue-500/30 group-hover:border-blue-400/50"
            }`}
          />
          <span className="relative z-10">
            {mode === "running" ? <PauseIcon /> : <PlayIcon />}
          </span>
        </button>
      </div>
    </div>
  );
}
