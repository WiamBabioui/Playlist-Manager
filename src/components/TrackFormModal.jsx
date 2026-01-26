import React, { useState, useEffect } from "react";

export default function TrackFormModal({ track, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("Pop");

  useEffect(() => {
    if (track) {
      setTitle(track.title);
      setArtist(track.artist);
      setAlbum(track.album);
      setGenre(track.genre);
    } else {
      setTitle(""); setArtist(""); setAlbum(""); setGenre("Pop");
    }
  }, [track]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...track, title, artist, album, genre, favorite: track?.favorite || false });
  };

  return (
    <div className="modal-overlay">
      <div className="modal glass">
        <h2>{track ? "Modifier le track" : "Ajouter un track"}</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} required/>
          <input type="text" placeholder="Artiste" value={artist} onChange={e => setArtist(e.target.value)} required/>
          <input type="text" placeholder="Album" value={album} onChange={e => setAlbum(e.target.value)} required/>
          <select value={genre} onChange={e => setGenre(e.target.value)}>
            <option>Pop</option>
            <option>Rock</option>
            <option>Jazz</option>
          </select>
          <div className="modal-actions">
            <button type="submit" className="btn-primary">{track ? "Sauvegarder" : "Ajouter"}</button>
            <button type="button" className="btn-secondary" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}
