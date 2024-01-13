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
  var scaleFactor = viewportWidth / imageWidth;

  // Limiting scale factor to a maximum of 1 (to prevent upscaling)
  scaleFactor = Math.min(scaleFactor, 0.8);

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
  if (activeElement) {
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

function updateArrowVisibility() {
  var leftArrow = document.querySelector(".fa-arrow-left");
  var rightArrow = document.querySelector(".fa-arrow-right");
  // Hide the arrows
  if (leftArrow) {
    leftArrow.style.display = "none"; // Force arrow to be off
  }

  if (rightArrow) {
    rightArrow.style.display = "none"; // Force arrow to be off
  }
}

// ----- Event Listeners and Initializations -----

document.addEventListener("DOMContentLoaded", function () {
  setupInitialStates();
  initializeReverseNumbering();
  subnavEventListeners();
  addImageClickEventListeners();
  addArrowEventListeners(); // Initialize arrow navigation
  updateArrowVisibility();
  SubnavSelector();
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
function subnavEventListeners() {
  var dropdownBtns = document.querySelectorAll(".subnav_dropbtn");
  var menuBar = document.querySelector(".menubar");
  var navlinks = document.querySelector(".navlinks");
  var subnavs = document.querySelectorAll(".subnav");

  dropdownBtns.forEach(function (dropdownBtn) {
    dropdownBtn.addEventListener("click", function () {
      var dropdownContent = this.nextElementSibling;
      var isDropdownHidden = window.getComputedStyle(dropdownContent).display === "none";

      dropdownContent.style.display = isDropdownHidden ? "block" : "none";
      dropdownContent.style.overflowY = isDropdownHidden ? "auto" : "none";
    });
  });

  if (menuBar && navlinks) {
    menuBar.addEventListener("click", function () {
      navlinks.classList.toggle("active");
      document.body.style.overflowY = navlinks.classList.contains("active") ? "hidden" : "auto";
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 600) {
        navlinks.classList.remove("active");
        document.body.style.overflowY = "auto";
        subnavs.forEach(function (subnav) {
          subnav.classList.remove("active");
          var dropdownContent = subnav.querySelector(".dropdown-content");
          if (dropdownContent) {
            dropdownContent.style.display = "none";
          }
        });
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
// Function to only allow one selection of one subnav at a time
function SubnavSelector() {
  var dropdownBtns = document.querySelectorAll(".subnav_dropbtn");

  dropdownBtns.forEach(function (dropdownBtn) {
    dropdownBtn.addEventListener("click", function () {
      if (window.innerWidth > 600) {
        var dropdownContent = this.nextElementSibling;
        var isCurrentlyActive = this.classList.contains("active");

        // Deactivate all dropdowns
        dropdownBtns.forEach(function (btn) {
          var otherDropdownContent = btn.nextElementSibling;
          otherDropdownContent.style.display = "none";
          btn.classList.remove("active");
        });

        // Toggle the current dropdown based on its previous state
        if (!isCurrentlyActive) {
          dropdownContent.style.display = "block";
          this.classList.add("active");
        }
      }
    });
  });
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

  if (leftArrow && rightArrow) {
    // Click events for arrows
    leftArrow.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent the overlay from closing
      navigateMedia("prev");
    });
    rightArrow.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent the overlay from closing
      navigateMedia("next");
    });
  }

  // Keyboard events for arrow keys
  document.addEventListener("keydown", function (event) {
    // check if the overlay is currently active to avoid
    // key event propagation to image viewer
    var overlay = document.getElementById("overlay");

    if (overlay && overlay.style.display == "block") {
      if (event.key === "ArrowLeft" && leftArrow) {
        // If the left arrow key is pressed
        navigateMedia("prev");
        leftArrow.classList.add("active");
        setTimeout(function () {
          leftArrow.classList.remove("active");
        }, 150); // Clear active state after 150ms
        event.preventDefault(); // Prevent default action to avoid scrolling the page
      } else if (event.key === "ArrowRight" && rightArrow) {
        // If the right arrow key is pressed
        navigateMedia("next");
        rightArrow.classList.add("active");
        setTimeout(function () {
          rightArrow.classList.remove("active");
        }, 150); // Clear active state after 150ms
        event.preventDefault(); // Prevent default action to avoid scrolling the page
      }
    }
  });
}

// Function to fetch the footer template content and insert it into the DOM.
window.addEventListener("DOMContentLoaded", () => {
  fetch("footer-template.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById("footer-placeholder").innerHTML = html;
      const currentYearElement = document.getElementById("current-year");
      if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
      }
    })
    .catch((error) => {
      console.error("Error fetching the footer template:", error);
    });
});

class fusedViewer {
  constructor(viewerId, imageId, overlayId, originalImagePath, alternateImagePath) {
    this.viewer = document.getElementById(viewerId);
    this.fusedImage = document.getElementById(imageId);
    this.infoOverlay = document.getElementById(overlayId);
    this.originalImagePath = originalImagePath;
    this.alternateImagePath = alternateImagePath;
    this.imagePath = originalImagePath;
    this.imageIndex = 0;
    this.totalImages = 0;
  }

  updateImagePath(newPath) {
    console.log(`Updating path for ${this.viewer.id} to: ${newPath}`);
    this.imagePath = newPath;
    this.updateImage();
  }

  async findTotalImages() {
    let exists = true;
    let index = 0;
    while (exists) {
      const imageUrl = this.getImageUrl(index);
      exists = await this.imageExists(imageUrl);
      if (exists) index++;
    }
    this.totalImages = index;

    // Set the default image index to the middle value
    this.imageIndex = Math.floor(this.totalImages / 2);

    this.updateImage();
  }

  init() {
    this.findTotalImages();
    this.addEventListeners();
  }
  addEventListeners() {
    const imageElement = document.querySelector(".fusedimage_style");
    const body = document.body;
    const rangeSlider = document.getElementById("myRange"); // Assuming the slider has an ID of "myRange"

    window.addEventListener("wheel", (event) => {
      const rect = imageElement.getBoundingClientRect();

      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        event.preventDefault(); // Prevent scrolling when over the image
        body.style.overflow = "hidden"; // Disable scrolling

        if (event.deltaY < 0) {
          this.imageIndex = Math.max(this.imageIndex - 1, 0);
        } else {
          this.imageIndex = Math.min(this.imageIndex + 1, this.totalImages - 1);
        }
        this.updateImage();
      } else {
        body.style.overflow = ""; // Re-enable scrolling when not over the image
      }
    });

    window.addEventListener("mousemove", (event) => {
      const rect = imageElement.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        body.style.overflow = ""; // Re-enable scrolling when mouse moves out of the image
      }
    });

    if (rangeSlider) {
      rangeSlider.addEventListener("input", () => {
        this.imageIndex = parseInt(rangeSlider.value);
        this.updateImage();
      });
    }
    // window.addEventListener("keydown", (event) => {
    //   switch (event.key) {
    //     case "ArrowUp":
    //     case "ArrowLeft":
    //       this.imageIndex = Math.max(this.imageIndex - 1, 0);
    //       break;
    //     case "ArrowDown":
    //     case "ArrowRight":
    //       this.imageIndex = Math.min(this.imageIndex + 1, this.totalImages - 1);
    //       break;
    //   }
    //   this.updateImage();
    // });
  }

  imageExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  getImageUrl(index) {
    return `${this.imagePath}/image_${String(index).padStart(5, "0")}.jpg`;
  }

  updateImage() {
    if (this.fusedImage) {
      this.fusedImage.src = this.getImageUrl(this.imageIndex);

      // Set the onload function for the image
      this.fusedImage.onload = () => {
        this.updateImageIndex();
      };
    } else {
      console.error("image element not found");
    }
  }
  updateImageIndex() {
    const rangeSlider = document.getElementById("myRange");

    if (rangeSlider && this.infoOverlay) {
      // Update the maximum value of the range slider
      // -1 needed to make sure the slider reaches to its full range
      rangeSlider.max = this.totalImages - 1;
      // console.log(this.totalImages);
      // Update the display with the correct index
      this.infoOverlay.innerHTML = `${this.imageIndex + 1}/${this.totalImages}`;

      // Ensure the slider reflects the current image index
      rangeSlider.value = this.imageIndex;
      // log.console(rangeSlider.value);
    }
  }
}
class SwitchButton {
  constructor(containerId, viewer) {
    this.switchContainer = document.getElementById(containerId);
    this.viewer = viewer;
    this.isOriginal = true;

    if (this.switchContainer) {
      const checkbox = this.switchContainer.querySelector('input[type="checkbox"]');

      if (checkbox) {
        checkbox.addEventListener("change", () => {
          console.log("label toggled");
          this.isOriginal = checkbox.checked; // Set isOriginal based on the checkbox state
          const newPath = this.isOriginal ? this.viewer.originalImagePath : this.viewer.alternateImagePath;
          this.viewer.updateImagePath(newPath);
        });
      } else {
        console.error("Checkbox element not found in container:", containerId);
      }
    } else {
      console.error("SwitchContainer element not found:", containerId);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const c1_coronalViewer = new fusedViewer(
    "c1_coronalViewer",
    "c1_coronalImage",
    "c1_coronalinfoOverlay",
    "images/03_06_20230206(L)/coronal_FOV(25)/cropped",
    "images/03_06_20230206(L)/coronal_FOV(25)/raw"
  );

  const c2_coronalViewer = new fusedViewer(
    "c2_coronalViewer",
    "c2_coronalImage",
    "c2_coronalinfoOverlay",
    "images/03_23_20230309(R)/coronal_FOV(25)/cropped",
    "images/03_23_20230309(R)/coronal_FOV(25)/raw"
  );
  const c3_coronalViewer = new fusedViewer(
    "c3_coronalViewer",
    "c3_coronalImage",
    "c3_coronalinfoOverlay",
    "images/03_37_20230322(L)/coronal_FOV(25)/cropped",
    "images/03_37_20230322(L)/coronal_FOV(25)/raw"
  );

  const c1_axialViewer = new fusedViewer(
    "c1_axialViewer",
    "c1_axialImage",
    "c1_axialinfoOverlay",
    "images/03_06_20230206(L)/axial_FOV(25)/cropped",
    "images/03_06_20230206(L)/axial_FOV(25)/raw"
  );

  const c2_axialViewer = new fusedViewer(
    "c2_axialViewer",
    "c2_axialImage",
    "c2_axialinfoOverlay",
    "images/03_23_20230309(R)/axial_FOV(25)/cropped",
    "images/03_23_20230309(R)/axial_FOV(25)/raw"
  );

  const c3_axialViewer = new fusedViewer(
    "c3_axialViewer",
    "c3_axialImage",
    "c3_axialinfoOverlay",
    "images/03_37_20230322(L)/axial_FOV(25)/cropped",
    "images/03_37_20230322(L)/axial_FOV(25)/raw"
  );

  const c1_sagittalViewer = new fusedViewer(
    "c1_sagittalViewer",
    "c1_sagittalImage",
    "c1_sagittalinfoOverlay",
    "images/03_06_20230206(L)/sagittal_FOV(25)/cropped",
    "images/03_06_20230206(L)/sagittal_FOV(25)/raw"
  );

  const c2_sagittalViewer = new fusedViewer(
    "c2_sagittalViewer",
    "c2_sagittalImage",
    "c2_sagittalinfoOverlay",
    "images/03_23_20230309(R)/sagittal_FOV(25)/cropped",
    "images/03_23_20230309(R)/sagittal_FOV(25)/raw"
  );

  const c3_sagittalViewer = new fusedViewer(
    "c3_sagittalViewer",
    "c3_sagittalImage",
    "c3_sagittalinfoOverlay",
    "images/03_37_20230322(L)/sagittal_FOV(25)/cropped",
    "images/03_37_20230322(L)/sagittal_FOV(25)/raw"
  );

  c1_coronalViewer.init();
  c2_coronalViewer.init();
  c3_coronalViewer.init();

  c1_axialViewer.init();
  c2_axialViewer.init();
  c3_axialViewer.init();

  c1_sagittalViewer.init();
  c2_sagittalViewer.init();
  c3_sagittalViewer.init();

  const c1_coronal_switchButton = new SwitchButton("c1_coronal_switchButton", c1_coronalViewer);
  const c2_coronal_switchButton = new SwitchButton("c2_coronal_switchButton", c2_coronalViewer);
  const c3_coronal_switchButton = new SwitchButton("c3_coronal_switchButton", c3_coronalViewer);

  const c1_axial_switchButton = new SwitchButton("c1_axial_switchButton", c1_axialViewer);
  const c2_axial_switchButton = new SwitchButton("c2_axial_switchButton", c2_axialViewer);
  const c3_axial_switchButton = new SwitchButton("c3_axial_switchButton", c3_axialViewer);

  const c1_sagittal_switchButton = new SwitchButton("c1_sagittal_switchButton", c1_sagittalViewer);
  const c2_sagittal_switchButton = new SwitchButton("c2_sagittal_switchButton", c2_sagittalViewer);
  const c3_sagittal_switchButton = new SwitchButton("c3_sagittal_switchButton", c3_sagittalViewer);
});
