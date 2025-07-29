// utils/isTokenExpired.js
import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  try {
    const { exp } = jwtDecode(token); // exp is in seconds
    const now = Date.now() / 1000;    // current time in seconds
    return exp < now;
  } catch (e) {
    return true; // treat invalid or corrupted tokens as expired
  }
}
