import { useState } from "react";
import Stopwatch from "./stopwatchAndTimer/Stopwatch";
import Timer from "./stopwatchAndTimer/Timer";

export default function App() {
  const [activeTab, setActiveTab] = useState("stopwatch");

  return (
    <div className="relative min-h-screen bg-[#050505] flex items-center justify-center p-4 overflow-hidden selection:bg-blue-500/30">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none transform -translate-y-1/2 animate-pulse duration-1000" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none transform translate-y-1/3 animate-pulse duration-1000 delay-500" />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-zinc-800/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />

      {/* Main App Container (Frosted Glass) */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900/40 backdrop-blur-3xl border border-white/[0.08] rounded-[2.5rem] shadow-2xl p-8 pb-12 flex flex-col gap-12">
        {/* Segmented Control Tabs */}
        <div className="relative flex p-1.5 bg-black/40 backdrop-blur-md rounded-full w-full max-w-[240px] mx-auto border border-white/5">
          <div
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white/10 rounded-full transition-transform duration-500 ease-out shadow-sm border border-white/5"
            style={{
              transform:
                activeTab === "stopwatch"
                  ? "translateX(0)"
                  : "translateX(100%)",
            }}
          />

          <button
            onClick={() => setActiveTab("stopwatch")}
            className={`relative z-10 flex-1 py-2 rounded-full text-xs font-semibold tracking-wider transition-colors duration-300 ${
              activeTab === "stopwatch"
                ? "text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            STOPWATCH
          </button>
          <button
            onClick={() => setActiveTab("timer")}
            className={`relative z-10 flex-1 py-2 rounded-full text-xs font-semibold tracking-wider transition-colors duration-300 ${
              activeTab === "timer"
                ? "text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            TIMER
          </button>
        </div>

        {/* Dynamic Component Rendering */}
        <div className="min-h-[300px] flex items-center justify-center">
          {activeTab === "stopwatch" ? <Stopwatch /> : <Timer />}
        </div>
      </div>
    </div>
  );
}
