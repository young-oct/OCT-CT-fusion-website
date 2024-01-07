// ----- Utility Functions -----

// Function to toggle the display of the publication list for a given year
function toggleYear(id) {
  var element = document.getElementById(id);
  var yearDiv = element.previousElementSibling;

  if (element.style.display === "none" || element.style.display === "") {
    element.style.display = "block";
    yearDiv.textContent = yearDiv.textContent.replace("+", "-");
  } else {
    element.style.display = "none";
    yearDiv.textContent = yearDiv.textContent.replace("-", "+");
  }
}

// Expands all the publication lists
function expandAll() {
  var allYears = document.querySelectorAll(".publications");
  allYears.forEach(function (year) {
    year.style.display = "block";
    year.previousElementSibling.textContent = year.previousElementSibling.textContent.replace("+", "-");
  });
}

// Contracts all the publication lists
function contractAll() {
  var allYears = document.querySelectorAll(".publications");
  allYears.forEach(function (year) {
    year.style.display = "none";
    year.previousElementSibling.textContent = year.previousElementSibling.textContent.replace("-", "+");
  });
}

// Function to apply reverse numbering to publications
function initializeReverseNumbering() {
  var allPublications = document.querySelectorAll(".publication");
  var totalPublications = allPublications.length;

  allPublications.forEach(function (pub, index) {
    var number = totalPublications - index;
    var titleElement = pub.querySelector("h3");
    if (titleElement) {
      titleElement.textContent = number + ". " + titleElement.textContent;
    }
  });
}

// Function to manage scroll behavior and back-to-top button
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backToTopBtn").style.display = "block";
  } else {
    document.getElementById("backToTopBtn").style.display = "none";
  }
}

// Add function for toggling image size
function toggleMediaSize(mediaElement) {
  var body = document.body;
  var overlay = document.getElementById("overlay");

  if (mediaElement.classList.contains("enlarged")) {
    mediaElement.classList.remove("enlarged");
    overlay.style.display = "none"; // Hide overlay
    body.style.overflow = "auto"; // Enable scrolling
  } else {
    mediaElement.classList.add("enlarged");
    overlay.style.display = "block"; // Show overlay
    body.style.overflow = "hidden"; // Disable scrolling
  }
}

// Function to hide overlay and reset image size
function hideOverlay() {
  var enlargedImages = document.querySelectorAll(".enlarged");
  enlargedImages.forEach(function (mediaElement) {
    mediaElement.classList.remove("enlarged");
  });
  document.getElementById("overlay").style.display = "none";
  document.body.style.overflow = "auto"; // Enable scrolling
}

// ----- Event Listeners and Initializations -----

document.addEventListener("DOMContentLoaded", function () {
  setupInitialStates();
  initializeReverseNumbering();
  addEventListeners();
  addImageClickEventListeners();
});

// Function to setup initial states on page load
function setupInitialStates() {
  var allYears = document.querySelectorAll(".publications");
  allYears.forEach(function (year) {
    year.style.display = "block";
    year.previousElementSibling.textContent = "-" + year.previousElementSibling.textContent.slice(2);
  });
}

// Function to add event listeners
function addEventListeners() {
  var dropdownBtns = document.querySelectorAll(".subnav_dropbtn");
  var menuBar = document.querySelector(".menubar");
  var navbarlinks = document.querySelector(".navlinks");

  dropdownBtns.forEach(function (dropdownBtn) {
    dropdownBtn.addEventListener("click", function () {
      var dropdownContent = this.nextElementSibling;
      dropdownContent.style.display = window.getComputedStyle(dropdownContent).display === "none" ? "block" : "none";
    });
  });

  if (menuBar && navbarlinks) {
    menuBar.addEventListener("click", function () {
      navbarlinks.classList.toggle("active");
      document.body.style.overflowY = navbarlinks.classList.contains("active") ? "hidden" : "auto";
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 600) {
        navbarlinks.classList.remove("active");
        document.body.style.overflowY = "auto";
      }
    });
  } else {
    console.error("Menubar or navbar links not found");
  }

  window.onscroll = scrollFunction;

  var backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    });
  }
}
// Function to add event listeners to images for toggling size
function addImageClickEventListeners() {
  var mediaElements = document.querySelectorAll("img, video");

  mediaElements.forEach(function (mediaElement) {
    mediaElement.addEventListener("click", function () {
      toggleMediaSize(this); // Make sure to call the correct function name
    });
  });
}
