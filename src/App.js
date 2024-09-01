import React, { useState } from "react";
import './App.css';
import VideoStream from "./VideoStream";

function App() {
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(false); // Declare and initialize the 'loading' variable

  const hasUserMedia = () => {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
  };

  const handleMediaStream = async () => {
    try {
      setLoading(true); // Set 'loading' to true before requesting media stream
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
    } catch (err) {
      console.log("Error: ", err);
    } finally {
      setLoading(false); // Set 'loading' to false after handling media stream
    }
  };

  return (
    <div>
      <h1>Your Stream</h1>
      {stream ? <VideoStream stream={stream} /> : <p>Loading stream...</p>}
      <Button onClick={handleMediaStream} disabled={loading}>
        {loading ? "Loading..." : "Start Stream"}
      </Button>
    </div>
  );
}

export default App;
