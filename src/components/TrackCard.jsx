import { FiHeart, FiEdit2, FiTrash2, FiPlay, FiPause } from "react-icons/fi";

export default function TrackCard({
  track,
  onFavorite,
  onEdit,
  onDelete,
  isPlaying,
  onPlayToggle
}) {
  return (
    <div className="track-card">

      <div className="drag-handle">⋮⋮⋮</div>

      <div className="track-info">
        <h3>{track.title}</h3>
        <p>{track.artist}</p>
        <span className="badge">{track.genre}</span>
      </div>

      <div className="track-actions">

        {/* ▶️ PLAY / PAUSE */}
        <button className="icon-btn" onClick={() => onPlayToggle(track.id)}>
          {isPlaying ? <FiPause /> : <FiPlay />}
        </button>

        {/* ❤️ Favori */}
        <button
          className="icon-btn heart-btn"
          onClick={() => onFavorite(track.id)}
        >
          {track.favorite ? (
            <FiHeart className="filled" />
          ) : (
            <FiHeart className="outline" />
          )}
        </button>

        {/* ✏️ Modifier */}
        <button className="icon-btn" onClick={() => onEdit(track)}>
          <FiEdit2 />
        </button>

        {/* 🗑️ Supprimer */}
        <button className="icon-btn" onClick={() => onDelete(track.id)}>
          <FiTrash2 />
        </button>

      </div>
    </div>
  );
}
