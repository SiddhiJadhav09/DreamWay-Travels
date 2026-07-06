// PROFILE DROPDOWN
function toggleProfileMenu() {
  const menu = document.getElementById("profileDropdown");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
  const profileMenu = document.querySelector(".profile-menu");
  const dropdown = document.getElementById("profileDropdown");

  if (!profileMenu.contains(event.target)) {
    dropdown.style.display = "none";
  }
});

function openLogin() {
  alert("Login Clicked");
}

function openSignup() {
  alert("Signup Clicked");
}
