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

// A function that sets up initial states on page load
function setupInitialStates() {
  // Perform setup tasks here, like setting initial display states
  var allYears = document.querySelectorAll(".publications");
  // Example: Hide all publication years on initial load
  allYears.forEach(function (year) {
    year.style.display = "block"; // This hides all the publication lists
    year.previousElementSibling.textContent = "-" + year.previousElementSibling.textContent.slice(2);
  });
}

function initializeReverseNumbering() {
  var allPublications = document.querySelectorAll(".publication");
  var totalPublications = allPublications.length;

  allPublications.forEach(function (pub, index) {
    // 'pub' is the current publication element
    // 'index' is the position of 'pub' in the NodeList

    var number = totalPublications - index;
    var numberingElement = document.createElement("span");

    var titleElement = pub.querySelector("h3");
    if (titleElement) {
      titleElement.textContent = number + ". " + titleElement.textContent;
      numberingElement.style.fontWeight = "bold";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Select the dropdown button
  var dropdownBtns = document.querySelectorAll(".subnav_dropbtn");
  // Select the menu bar button
  var menuBar = document.querySelector(".menubar");
  // Select the navbar links container
  var navbarlinks = document.querySelector(".navlinks");

  // Check if dropdownBtn exists to avoid null reference errors
  dropdownBtns.forEach(function (dropdownBtn) {
    // Toggle dropdown on click
    dropdownBtn.addEventListener("click", function () {
      // Get the dropdown content associated with this button
      var dropdownContent = this.nextElementSibling;

      // Toggle the display of the dropdown content
      if (window.getComputedStyle(dropdownContent).display === "none") {
        dropdownContent.style.display = "block";
      } else {
        dropdownContent.style.display = "none";
      }
    });
  });

  // Check if menuBar and navbarlinks exist to avoid null reference errors
  if (menuBar && navbarlinks) {
    menuBar.addEventListener("click", function () {
      // console.info("menu clicked");
      navbarlinks.classList.toggle("active");
      if (navbarlinks.classList.contains("active")) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    });

    window.addEventListener("resize", function () {
      // Check if the screen width is more than 600px
      if (window.innerWidth > 600) {
        // If so, ensure the navbarlinks are not in the 'active' state
        navbarlinks.classList.remove("active");
        //Also reset the body overflow
        document.body.style.overflowY = "auto";
      }
    });
  } else {
    console.error("Menubar or navbar links not found");
  }

  // Initialize functions here
  setupInitialStates();
  initializeReverseNumbering();
});
