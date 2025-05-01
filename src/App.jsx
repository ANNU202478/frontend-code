import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function App() {
  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (showVideo && videoRef.current && !player) {
      const newPlayer = videojs(videoRef.current, {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: 'http://localhost:8000/live/stream.m3u8',
          type: 'application/x-mpegURL',
        }],
      });

      setPlayer(newPlayer);
    }

    // Cleanup on unmount
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [showVideo]);

  const startStream = () => {
    setShowVideo(true);
  };

  return (
    <div className="App">
      <h1>RTSP Live Feed</h1>
      <button onClick={startStream}>Start Live Feed</button>

      {showVideo && (
        <video
          ref={videoRef}
          className="video-js vjs-default-skin"
          playsInline
        />
      )}
    </div>
  );
}
