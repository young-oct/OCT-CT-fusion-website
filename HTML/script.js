document.addEventListener("DOMContentLoaded", function () {
  // Select the dropdown button
  var dropdownBtn = document.querySelector(".subnav_dropbtn");

  // Check if dropdownBtn exists to avoid null reference errors
  if (dropdownBtn) {
    // Toggle dropdown on click
    dropdownBtn.addEventListener("click", function (event) {
      // Get the dropdown content associated with this button
      var dropdownContent = this.nextElementSibling;

      // Toggle the display of the dropdown content
      if (window.getComputedStyle(dropdownContent).display === "none") {
        dropdownContent.style.display = "block";
      } else {
        dropdownContent.style.display = "none";
      }
    });
  } else {
    console.error("Dropdown button not found");
  }

  // Select the menu bar button
  var menuBar = document.querySelector(".menubar");
  // Select the navbar links container
  var navbarlinks = document.querySelector(".navlinks");

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
});
