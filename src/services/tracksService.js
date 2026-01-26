const TRACKS_KEY = "my_tracks";

export function getTracks() {
  const stored = localStorage.getItem(TRACKS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveTracks(tracks) {
  localStorage.setItem(TRACKS_KEY, JSON.stringify(tracks));
}
