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
    mediaElement.style.transform = ""; //reset transform

    overlay.style.display = "none"; // Hide overlay
    body.style.overflow = "auto"; // Enable scrolling

    // Hide the arrows
    document.querySelector(".fa-arrow-left").style.display = "none";
    document.querySelector(".fa-arrow-right").style.display = "none";
  } else {
    var scaleFactor = calculateScaleFactor(mediaElement);

    //Apply the scale and centering
    mediaElement.style.transform = "translate(-50%, -50%) scale(" + scaleFactor + ")";

    mediaElement.classList.add("enlarged");
    overlay.style.display = "block"; // Show overlay
    body.style.overflow = "hidden"; // Disable scrolling
    // Show the arrows
    document.querySelector(".fa-arrow-left").style.display = "block";
    document.querySelector(".fa-arrow-right").style.display = "block";
  }
}
// Function to dynamically calculate the appropriate scaling factor
function calculateScaleFactor(imageElement) {
  var viewportWidth = window.innerWidth;
  var imageWidth = imageElement.offsetWidth;

  // Example calculation: adjust the scale factor based on your needs
  var scaleFactor = (viewportWidth / imageWidth) * 0.8; // Scale to 80% of viewport width

  // Limiting scale factor to a maximum of 1 (to prevent upscaling)
  scaleFactor = Math.min(scaleFactor, 1);
  return scaleFactor;
}

// Function to hide overlay and reset image size
function hideOverlay() {
  var overlay = document.getElementById("overlay");
  var enlargedImages = document.querySelectorAll(".enlarged");
  var videos = document.querySelectorAll("video");

  enlargedImages.forEach(function (mediaElement) {
    mediaElement.classList.remove("enlarged");
    mediaElement.style.transform = ""; // Reset the transform property
  });
  // Pause all videos
  videos.forEach(function (video) {
    video.pause();
  });

  overlay.style.display = "none";
  document.body.style.overflow = "auto"; // Enable scrolling
  // Also hide the arrows when the overlay is hidden
  document.querySelector(".left-arrow").style.display = "none";
  document.querySelector(".right-arrow").style.display = "none";
}

// Function to navigate elements when arrow clicked
function navigateMedia(direction) {
  var mediaElements = Array.from(document.querySelectorAll(".enlarge_img")); // Convert NodeList to Array
  var activeElement = document.querySelector(".enlarge_img.enlarged"); // Get the currently enlarged element
  var activeIndex = mediaElements.indexOf(activeElement); // Get the index of that element

  // Check for no active element
  if (activeElement !== null) {
    // Hide the currently active element and remove the 'enlarged' class
    activeElement.classList.remove("enlarged");
    activeElement.style.transform = ""; // Reset the transform property

    // Calculate the new index
    if (direction === "next") {
      activeIndex = (activeIndex + 1) % mediaElements.length;
    } else if (direction === "prev") {
      activeIndex = (activeIndex - 1 + mediaElements.length) % mediaElements.length;
    }

    // activeElement.style.display = "none";

    // Add the 'enlarged' class to the new element and show it
    var newActiveElement = mediaElements[activeIndex];
    var scaleFactor = calculateScaleFactor(newActiveElement);
    newActiveElement.style.transform = "translate(-50%, -50%) scale(" + scaleFactor + ")";

    newActiveElement.classList.add("enlarged");
    newActiveElement.style.display = "block";
  }
}

// ----- Event Listeners and Initializations -----

document.addEventListener("DOMContentLoaded", function () {
  setupInitialStates();
  initializeReverseNumbering();
  addEventListeners();
  addImageClickEventListeners();
  addArrowEventListeners(); // Initialize arrow navigation
});

// Hide the arrows
document.querySelector(".fa-arrow-left").style.display = "none";
document.querySelector(".fa-arrow-right").style.display = "none";

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
  var mediaElements = document.querySelectorAll(".enlarge_img, video");

  mediaElements.forEach(function (mediaElement) {
    mediaElement.addEventListener("click", function () {
      toggleMediaSize(this); // Make sure to call the correct function name
    });
  });
}

// Function to add event listeners for the navigation arrows
function addArrowEventListeners() {
  var leftArrow = document.querySelector(".left-arrow");
  var rightArrow = document.querySelector(".right-arrow");

  leftArrow.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the overlay from closing
    navigateMedia("prev");
  });
  rightArrow.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the overlay from closing
    navigateMedia("next");
  });
}
