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

// ----- Event Listeners and Initializations -----

document.addEventListener("DOMContentLoaded", function () {
  setupInitialStates();
  initializeReverseNumbering();
  addEventListeners();
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
