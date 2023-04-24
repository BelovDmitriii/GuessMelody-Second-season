import { useEffect, useRef, useState } from 'react';

type AudioPlayerProps = {
  src: string;
  onPlayButtonClick: () => void;
  isPlaying: boolean;
}

function AudioPlayer({isPlaying, onPlayButtonClick, src}: AudioPlayerProps):JSX.Element {

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
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        <audio
          src={src}
          ref={audioRef}
          data-testid = "audio"
        />
      </div>
    </>
  );
}

export default AudioPlayer;
