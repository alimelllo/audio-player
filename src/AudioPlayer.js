import React from "react";
import Bar from "./Bar";
import { useState , useEffect} from "react";
import { PauseCircleFilled , PlayCircleFilled} from "@material-ui/icons";
import music from './music.mp3';
function Audio() {
 
  const audio = document.getElementById("audio");

  const [duration, setDuration] = useState();
  const [curTime, setCurTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [clickedTime, setClickedTime] = useState();

  useEffect(() => {
    const audio = document.getElementById("audio");

    // state setters wrappers
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurTime(audio.currentTime);
    }

    const setAudioTime = () => setCurTime(audio.currentTime);

    // DOM listeners: update React state on DOM events
    audio.addEventListener("loadeddata", setAudioData);

    audio.addEventListener("timeupdate", setAudioTime);

    // React state listeners: update DOM on React state changes
    playing ? audio.play() : audio.pause();

    if (clickedTime && clickedTime !== curTime) {
      audio.currentTime = clickedTime;
      setClickedTime(null);
    } 

    // effect cleanup
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    }
  });

const speedhandler = (speed) => {

  audio.playbackRate = speed ;
}



  return (
    <div className="player">
      <audio id="audio">
        <source src={music} />
        Your browser does not support the <code>audio</code> element.
      </audio>
      <div className="song">
      <h1 className="song__title">Instant Crush</h1>
      <h2 className="song__artist">Daft Punk ft. Julian Casablancas</h2>
    </div>
     
      <div className="controls">
        {playing ? 
          <button className="player__button" onClick={() => setPlaying(false)}>
          <PauseCircleFilled />
        </button>:
           <button className="player__button" onClick={() => setPlaying(true)}>
           <PlayCircleFilled />
         </button>
        }
         <div className="speed">  
        <button onClick={() => speedhandler(0.5)}>x 0.5 </button>
        <button onClick={() => speedhandler(0.75)}>x 0.75 </button>
        <button onClick={() => speedhandler(1)}>normal </button>
        <button onClick={() => speedhandler(1.5)}>x 1.5 </button>
      </div>
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </div>
    </div>
  );
}

export default Audio;
