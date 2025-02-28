// Initialize Email.js
(function () {
  emailjs.init("LeGSwnqcXJ-xai3OW");
})();

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Send OTP (Fixed OTP: 123456)
function sendOTP(email) {
  const otp = "123456"; // Fixed OTP

  sessionStorage.setItem(email, otp);

  const templateParams = {
    to_email: email,
    otp: otp
  };

  emailjs.send("service_baho4jq", "template_cshmkzb", templateParams)
    .then(function (response) {
      console.log("✅ OTP Sent Successfully!", response);
      alert(`OTP sent to ${email}! 💌`);
    })
    .catch(function (error) {
      console.error("❌ EmailJS Error:", error);
      alert(`Oops! Something went wrong: ${error.text || "Unknown error"}`);
    });
}

// Request OTP for Signup
function requestOTP() {
  const email = document.getElementById("signup-email").value;
  if (!email || !validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  sendOTP(email);
}

// Request OTP for Password Reset
function requestForgotPasswordOTP() {
  const email = document.getElementById("forgot-email").value;
  if (!email || !validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userExists = users.some(user => user.email === email);

  if (!userExists) {
    alert("No account found with this email address.");
    return;
  }

  sendOTP(email);
}

// Hash passwords using SHA-256
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Handle Signup with Auto-Redirect to Login on Valid OTP
async function handleSignup(event) {
  event.preventDefault();

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const otpInput = document.getElementById("signup-otp").value;

  if (!username || !email || !password || !otpInput) {
    alert("Please fill in all fields.");
    return;
  }

  const storedOTP = sessionStorage.getItem(email);
  if (!storedOTP || otpInput !== "123456") {
    alert("Invalid OTP. Please check and try again.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.some(user => user.username === username)) {
    alert("Username already exists.");
    return;
  }

  if (users.some(user => user.email === email)) {
    alert("Email already registered.");
    return;
  }

  users.push({
    username,
    email,
    password: await hashPassword(password)
  });

  localStorage.setItem("users", JSON.stringify(users));
  sessionStorage.removeItem(email);

  alert("Signup successful! Please log in.");
  showLoginForm(); // Redirect to login form
}

// Handle Forgot Password with Redirect to Login
async function handleForgotPassword(event) {
  event.preventDefault();

  const email = document.getElementById("forgot-email").value;
  const otpInput = document.getElementById("forgot-otp").value;
  const newPassword = document.getElementById("forgot-password").value;

  if (!email || !otpInput || !newPassword) {
    alert("Please fill in all fields.");
    return;
  }

  const storedOTP = sessionStorage.getItem(email);
  if (!storedOTP || otpInput !== "123456") {
    alert("Invalid OTP. Please check and try again.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const userIndex = users.findIndex(user => user.email === email);

  if (userIndex === -1) {
    alert("No account found with this email address.");
    return;
  }

  users[userIndex].password = await hashPassword(newPassword);
  localStorage.setItem("users", JSON.stringify(users));
  sessionStorage.removeItem(email);

  alert("Password reset successful! Please log in.");
  showLoginForm(); // Redirect to login form
}

// Toggle Forms
function toggleForms() {
  document.getElementById("login-main").style.display = "none";
  document.getElementById("signup-main").style.display = "block";
  document.getElementById("forgot-password-main").style.display = "none";
}

// Show Forgot Password Form
function showForgotPasswordForm() {
  document.getElementById("login-main").style.display = "none";
  document.getElementById("signup-main").style.display = "none";
  document.getElementById("forgot-password-main").style.display = "block";
}

// Show Login Form
function showLoginForm() {
  document.getElementById("login-main").style.display = "block";
  document.getElementById("signup-main").style.display = "none";
  document.getElementById("forgot-password-main").style.display = "none";
}

// Handle Login with Attempt Limit
async function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  // Get stored login attempts
  let attempts = parseInt(sessionStorage.getItem("loginAttempts")) || 0;

  if (attempts >= 5) {
    alert("Too many failed attempts! Please try again later.");
    return;
  }

  const hashedPassword = await hashPassword(password);
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.username === username && u.password === hashedPassword);

  if (user) {
    alert("Login successful!");
    sessionStorage.setItem("loggedInUser", username);
    sessionStorage.removeItem("loginAttempts"); // Reset failed attempts
    window.location.href = "home.html"; // Redirect after login
  } else {
    attempts++;
    sessionStorage.setItem("loginAttempts", attempts);

    const remainingAttempts = 5 - attempts;
    alert(`Invalid username or password. ${remainingAttempts} attempts remaining.`);

    if (attempts >= 5) {
      alert("Too many failed attempts! Please try again later.");
      document.getElementById("login-form").style.display = "none"; // Hide login form temporarily
      setTimeout(() => {
        sessionStorage.removeItem("loginAttempts");
        document.getElementById("login-form").style.display = "block"; // Show login form again
      }, 30000); // 30 seconds timeout before retry
    }
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("signup-form").addEventListener("submit", handleSignup);
  document.getElementById("login-form").addEventListener("submit", handleLogin);
  document.getElementById("forgot-password-form").addEventListener("submit", handleForgotPassword);
  document.getElementById("request-otp").addEventListener("click", requestOTP);
  document.getElementById("forgot-request-otp").addEventListener("click", requestForgotPasswordOTP);
  document.getElementById("signup-link").addEventListener("click", toggleForms);
  document.getElementById("forgot-password-link").addEventListener("click", showForgotPasswordForm);
});
