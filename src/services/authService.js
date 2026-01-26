// src/services/authService.js

export function getCurrentUser() {
  // Retourne l'utilisateur connecté depuis localStorage
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

export function loginUser({ email, password }) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Email ou mot de passe incorrect");
  localStorage.setItem("currentUser", JSON.stringify(user));
  return user;
}

export function registerUser({ username, email, password }) {
  let users = JSON.parse(localStorage.getItem("users") || "[]");
  if (users.find((u) => u.email === email))
    throw new Error("Cet email existe déjà");
  const newUser = { username, email, password };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(newUser));
  return newUser;
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}
