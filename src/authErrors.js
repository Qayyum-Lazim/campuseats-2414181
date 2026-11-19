
export function authErrorMessage(errorCode) {
  const messages = {
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/email-already-in-use": "This email is already registered.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/too-many-requests": "Too many attempts. Please try again later."
  };

  return messages[errorCode] || "Something went wrong. Please try again.";
}
