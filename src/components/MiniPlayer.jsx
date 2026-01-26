import { FiPlay, FiPause, FiSkipBack, FiSkipForward } from "react-icons/fi";

export default function MiniPlayer({
  track,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev
}) {
  if (!track) return null;

  return (
    <div className="mini-player glass">
      <div className="mini-player-info">
        <h4>{track.title}</h4>
        <p>{track.artist}</p>
      </div>

      <div className="mini-player-controls">
        <button className="icon-btn" onClick={onPrev}>
          <FiSkipBack />
        </button>

        <button className="icon-btn" onClick={onPlayPause}>
          {isPlaying ? <FiPause /> : <FiPlay />}
        </button>

        <button className="icon-btn" onClick={onNext}>
          <FiSkipForward />
        </button>
      </div>
    </div>
  );
}
