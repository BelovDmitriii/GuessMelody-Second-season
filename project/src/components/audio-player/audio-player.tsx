import { useEffect, useRef, useState } from 'react';

type AudioPlayerProps = {
  src: string;
  autoPlay: boolean;
}

function AudioPlayer({autoPlay, src}: AudioPlayerProps):JSX.Element {
  const [isPlaying, setPlaying] = useState(autoPlay);
  const [isLoading, setLoading] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if(audioRef.current !== null) {
      audioRef.current.onloadeddata = () => setLoading(false);
    }

    return () => {
      if(audioRef.current !== null) {
        audioRef.current.onloadeddata = null;
        audioRef.current = null;
      }
    };
  },[src]);

  useEffect(() => {
    if(audioRef.current === null) {
      return;
    }
    if (isPlaying) {
      audioRef.current.play();
      return;
    }

    audioRef.current.pause();
  }, [isPlaying]);

  return(
    <>
      <button className={`track__button track__button--${isPlaying ? 'pause' : 'play'}`}
        type="button"
        disabled={isLoading}
        onClick={() => setPlaying(!isPlaying)}
      />
      <div className="track__status">
        <audio
          src={src}
          ref={audioRef}
        />
      </div>
    </>
  );
}

export default AudioPlayer;
