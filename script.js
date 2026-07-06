/* ===================== PROFILE DROPDOWN ===================== */
function toggleProfileMenu() {
  const dropdown = document.getElementById('profileDropdown');
  dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}

window.addEventListener('click', function(e) {
  const dropdown = document.getElementById('profileDropdown');
  const profileIcon = document.querySelector('.profile-icon');
  if (!profileIcon.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.style.display = 'none';
  }
});

/* ===================== MODALS ===================== */
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');

function openLogin() { loginModal.style.display = 'flex'; signupModal.style.display = 'none'; }
function openSignup() { signupModal.style.display = 'flex'; loginModal.style.display = 'none'; }
function closeLogin() { loginModal.style.display = 'none'; }
function closeSignup() { signupModal.style.display = 'none'; }
function switchToSignup() { loginModal.style.display = 'none'; signupModal.style.display = 'flex'; }
function switchToLogin() { signupModal.style.display = 'none'; loginModal.style.display = 'flex'; }

window.addEventListener('click', function(e) {
  if (e.target === loginModal) closeLogin();
  if (e.target === signupModal) closeSignup();
});

/* ===================== LOGIN / SIGNUP ===================== */
function updateUserUI() {
  const userName = localStorage.getItem("username");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const userLabel = document.getElementById("userLabel");
  const logoutBtn = document.getElementById("logoutBtn");

  if (userName) {
    userLabel.innerText = "Hello, " + userName;
    userLabel.style.display = "block";
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
  }
}

function handleLogin() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;

  if (email.trim() === "" || pass.trim() === "") {
    alert("Please enter valid details!");
    return;
  }

  const username = email.split("@")[0];
  localStorage.setItem("username", username);
  alert("🎉 Login Successful! Welcome " + username);
  closeLogin();
  updateUserUI();
}

function handleSignup() {
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const pass = document.getElementById("signupPass").value;

  if (name.trim() === "" || pass.trim() === "") {
    alert("Please fill all fields!");
    return;
  }

  localStorage.setItem("username", name);
  alert("🎉 Account created successfully! Welcome " + name);
  closeSignup();
  updateUserUI();
}

function logoutUser() {
  localStorage.removeItem("username");
  location.reload();
}

document.addEventListener("DOMContentLoaded", updateUserUI);

/* ===================== AUTO SLIDER ===================== */
const slider = document.getElementById('tourSlider');
const sliderContent = slider.innerHTML;
slider.innerHTML += sliderContent;
