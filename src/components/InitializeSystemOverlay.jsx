// src/components/InitializeSystemOverlay.jsx
import React, { useEffect, useState } from 'react';

const InitializeSystemOverlay = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  useEffect(() => {
    setProgress(0);
    setShowSuccessMsg(false);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setShowSuccessMsg(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000);
          return 100;
        }
        return prev + 0.5;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-90">
      <div className="text-center text-green-400 space-y-4 font-mono p-6 border border-green-500/30 bg-gray-900/80 max-w-sm w-full">
        {!showSuccessMsg && <p className="text-lg">Initializing AI System...</p>}
        {!showSuccessMsg && (
          <div className="text-green-300 text-sm space-y-1">
            <p>• Loading neural cores...</p>
            <p>• Activating quantum dev environment...</p>
            <p>• Establishing data matrix...</p>
          </div>
        )}
        {!showSuccessMsg && (
          <div className="w-full bg-green-800 mt-4 h-2 rounded relative overflow-hidden">
            <div
              className="absolute bg-green-400 h-2 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {showSuccessMsg && (
          <p className="text-xl text-green-400 font-bold">
            Initialized Successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default InitializeSystemOverlay;
