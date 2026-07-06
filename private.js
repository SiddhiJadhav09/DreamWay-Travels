// PROFILE DROPDOWN
function toggleProfileMenu() {
  document.getElementById("profileDropdown").classList.toggle("show-profile");
}

// TRAVEL DROPDOWN
document.querySelector(".travel-link").addEventListener("click", () => {
  document.querySelector(".travel-dropdown").classList.toggle("show-dropdown");
});

// CLOSE BOTH WHEN CLICKING OUTSIDE
document.addEventListener("click", function (event) {
  const profile = document.querySelector(".profile-menu");
  const travel = document.querySelector(".travel-menu");

  if (!profile.contains(event.target)) {
    document.getElementById("profileDropdown").classList.remove("show-profile");
  }

  if (!travel.contains(event.target)) {
    document.querySelector(".travel-dropdown").classList.remove("show-dropdown");
  }
});
