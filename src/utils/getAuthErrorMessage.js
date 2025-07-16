export default function getAuthErrorMessage(code){
    const map = {
    "auth/invalid-email": "Invalid email format.",
    "auth/email-already-in-use": "Email is already registered.",
    "auth/user-not-found": "No account found with that email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/too-many-requests": "Too many attempts. Try again later.",
    "display-name-taken": "Display name is already in use.",
    "auth/invalid-credential" : "Wrong credentials. Please try again.",
  };
  return map[code] || "Something went wrong.";
}