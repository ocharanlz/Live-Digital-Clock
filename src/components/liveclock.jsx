import { useState, useEffect, useRef } from "react";

const LiveClock = ({ initialFormat = "12" }) => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [format, setFormat] = useState(initialFormat);
  const intervalRef = useRef(null);

  const updateTime = () => {
    const options = { hour12: format === "12", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    setTime(new Date().toLocaleTimeString([], options));
    setDate(new Date().toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
  };

  const startClock = () => {
    if (!isRunning) {
      setIsRunning(true);
      updateTime();
      intervalRef.current = setInterval(updateTime, 1000);
    }
  };

  const stopClock = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    updateTime();
  }, [format]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-300 text-white">
      <div className="text-2xl font-semibold mb-2">{date}</div>
      <div className="text-4xl font-bold mb-4">{time}</div>
      <div className="space-x-4">
        <button onClick={startClock} disabled={isRunning} className={`px-4 py-2 rounded ${isRunning ? "bg-gray-500" : "bg-green-500 hover:bg-green-700"}`}>Start</button>
        <button onClick={stopClock} disabled={!isRunning} className={`px-4 py-2 rounded ${!isRunning ? "bg-gray-500" : "bg-red-500 hover:bg-red-700"}`}>Stop</button>
        <button onClick={() => setFormat("12")} className={`px-4 py-2 rounded ${format === "12" ? "bg-yellow-700" : "bg-yellow-500 hover:bg-yellow-700"}`}>12-hour</button>
        <button onClick={() => setFormat("24")} className={`px-4 py-2 rounded ${format === "24" ? "bg-yellow-700" : "bg-yellow-500 hover:bg-yellow-700"}`}>24-hour</button>
      </div>
    </div>
  );
};

export default LiveClock;
