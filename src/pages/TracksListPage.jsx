import { useState } from "react";
import TrackCard from "../components/TrackCard";
import TrackFormModal from "../components/TrackFormModal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../index.css";
import { logoutUser } from "../services/authService";
import dummyTracks from "../utils/dummyTracks";
import MiniPlayer from "../components/MiniPlayer";


export default function TracksListPage() {
  const [tracks, setTracks] = useState(dummyTracks);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState(null);
  const [filter, setFilter] = useState("All");

  // 🎵 Track en cours
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const currentTrack = tracks.find(t => t.id === playingTrackId);


  const filteredTracks = tracks.filter((track) => {
    if (filter === "All") return true;
    if (filter === "FAVORITES") return track.favorite;
    return track.genre === filter;
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tracks);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setTracks(items);
  };

  const toggleFavorite = (id) => {
    setTracks(tracks.map(t =>
      t.id === id ? { ...t, favorite: !t.favorite } : t
    ));
  };

  const handleDelete = (id) => {
    setTracks(tracks.filter(t => t.id !== id));
    if (playingTrackId === id) setPlayingTrackId(null);
  };

  const handleEdit = (track) => {
    setEditingTrack(track);
    setModalOpen(true);
  };

  const handleSave = (track) => {
    if (track.id) {
      setTracks(tracks.map(t => t.id === track.id ? track : t));
    } else {
      setTracks([...tracks, { ...track, id: Date.now().toString() }]);
    }
    setModalOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  };

  // ▶️ PLAY / PAUSE
  const handlePlayToggle = (id) => {
    setPlayingTrackId(prev => (prev === id ? null : id));
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Ma Playlist</h1>
        <div>
          <button
            className="add-btn"
            onClick={() => {
              setEditingTrack(null);
              setModalOpen(true);
            }}
          >
            + Ajouter
          </button>
          <button className="add-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="filters">
        {["All", "Pop", "Rock", "Jazz", "FAVORITES"].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tracks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {filteredTracks.map((track, index) => (
                <Draggable key={track.id} draggableId={track.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TrackCard
                        track={track}
                        onFavorite={toggleFavorite}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                        isPlaying={playingTrackId === track.id}
                        onPlayToggle={handlePlayToggle}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {modalOpen && (
        <TrackFormModal
          track={editingTrack}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
      <MiniPlayer
  track={currentTrack}
  isPlaying={!!playingTrackId}
  onPlayPause={() => setPlayingTrackId(null)}
  onNext={() => {
    const index = tracks.findIndex(t => t.id === playingTrackId);
    if (index < tracks.length - 1) {
      setPlayingTrackId(tracks[index + 1].id);
    }
  }}
  onPrev={() => {
    const index = tracks.findIndex(t => t.id === playingTrackId);
    if (index > 0) {
      setPlayingTrackId(tracks[index - 1].id);
    }
  }}
/>

    </div>
    
  );
}
