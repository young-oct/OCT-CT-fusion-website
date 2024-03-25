// ----- Utility Functions -----
// import "/css/style.css";

// Attach event listeners to your spans
window.addEventListener("DOMContentLoaded", (event) => {
  console.log("called");
  document.getElementById("expand").addEventListener("click", expandAll);
  document.getElementById("contract").addEventListener("click", contractAll);

  // document.getElementById("toggleYear").addEventListener("click", toggleYear);
});

document.querySelectorAll(".share-btn").forEach((btn) => {
  if (btn.id === "shareLinkedIn") {
    btn.addEventListener("click", shareLinkedIn);
  } else if (btn.id === "shareEmail") {
    btn.addEventListener("click", shareEmail);
  } else if (btn.id === "shareTwitter") {
    btn.addEventListener("click", shareTwitter);
  }
});

document.querySelectorAll(".copyToClipboard").forEach((btn) => {
  btn.addEventListener("click", function () {
    var elementId = btn.getAttribute("data-element-id");
    copyToClipboard(elementId);
  });
});

// Function to toggle the display of the publication list for a given year
// export function toggleYear(id) {
//   var element = document.getElementById(id);
//   var yearDiv = element.previousElementSibling;

//   if (element.style.display === "none" || element.style.display === "") {
//     element.style.display = "block";
//     yearDiv.textContent = yearDiv.textContent.replace("+", "-");
//   } else {
//     element.style.display = "none";
//     yearDiv.textContent = yearDiv.textContent.replace("-", "+");
//   }
// }

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".toggle-year-trigger").forEach((element) => {
    element.addEventListener("click", function () {
      var id = this.getAttribute("data-target-id");
      toggleYear.call(this, id); // Call toggleYear with 'this' referring to the clicked element
    });
  });
});

export function toggleYear(id) {
  var element = document.getElementById(id);
  var toggler = this; // Store a reference to 'this' outside the event listener function

  if (element.style.display === "none" || element.style.display === "") {
    element.style.display = "block";
    toggler.textContent = this.textContent.replace("+", "-"); // 'this' refers to the clicked element
  } else {
    element.style.display = "none";
    toggler.textContent = this.textContent.replace("-", "+"); // 'this' refers to the clicked element
  }
}

// Expands all the publication lists
export function expandAll() {
  var allYears = document.querySelectorAll(".publications");
  allYears.forEach(function (year) {
    year.style.display = "block";
    year.previousElementSibling.textContent = year.previousElementSibling.textContent.replace("+", "-");
  });
}

// Contracts all the publication lists
export function contractAll() {
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
export function hideOverlay() {
  var overlay = document.getElementById("overlay");
  overlay.style.display = "none";

  var enlargedImages = document.querySelectorAll(".enlarged");
  var videos = document.querySelectorAll("video");

  enlargedImages.forEach(function (mediaElement) {
    mediaElement.classList.remove("enlarged");
    mediaElement.style.transform = ""; // Reset the transform property

    // Pause all videos
    videos.forEach(function (video) {
      video.pause();
    });
  });

  overlay.style.display = "none";
  document.body.style.overflow = "auto"; // Enable scrolling
  // Also hide the arrows when the overlay is hidden
  document.querySelector(".left-arrow").style.display = "none";
  document.querySelector(".right-arrow").style.display = "none";
}

// Add this event listener in your DOMContentLoaded --- this mkaes sure when it clicks out, it disables. ---important
document.addEventListener("DOMContentLoaded", function () {
  var overlay = document.getElementById("overlay");

  overlay.addEventListener("click", function (event) {
    // Check if the clicked element is the overlay itself, not its children
    if (event.target === overlay) {
      hideOverlay();
    }
  });

  // ... your existing initialization code
});

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

// Function to toggle the share modal
function toggleShareModal() {
  var modal = document.getElementById("shareModal");
  modal.style.display = modal.style.display === "block" ? "none" : "block";
}

// ----- Event Listeners and Initializations -----

// Function to open the download modal
function openDownloadModal() {
  var downloadModal = document.getElementById("downloadModal");
  downloadModal.style.display = "block";
}

// Function to close the download modal
function closeDownloadModal() {
  var downloadModal = document.getElementById("downloadModal");
  downloadModal.style.display = "none";
}

// Function to copy attribution text to clipboard
function copyAttributionText(textAreaId) {
  var copyText = document.getElementById(textAreaId);
  copyText.select();
  document.execCommand("copy");
  // alert("Attribution copied to clipboard!");
}

document.addEventListener("DOMContentLoaded", function () {
  setupInitialStates();
  initializeReverseNumbering();
  subnavEventListeners();
  addImageClickEventListeners();
  addArrowEventListeners(); // Initialize arrow navigation
  updateArrowVisibility();
  SubnavSelector();
  var shareIcon = document.getElementById("share_icon");
  var closeBtn = document.querySelector(".modal .close");

  var currentPageUrl = window.location.href;
  var shareLinkInput = document.getElementById("shareLink");
  shareLinkInput.value = currentPageUrl;

  // Close the modal if the user clicks outside of it
  window.addEventListener("click", function (event) {
    var modal = document.getElementById("shareModal");
    if (event.target === modal) {
      toggleShareModal();
    }
  });

  // When the share icon is clicked, show the modal
  shareIcon.addEventListener("click", toggleShareModal);

  // When the close button (x) is clicked, close the modal
  closeBtn.addEventListener("click", toggleShareModal);

  var downloadIcon = document.getElementById("download_icon");
  var closeDownloadIcon = document.querySelector(".download-close");
  var attributionTextAreas = document.querySelectorAll(".attribution textarea");

  // Open modal when download icon is clicked
  downloadIcon.addEventListener("click", openDownloadModal);

  // Close modal when close icon (x) is clicked
  closeDownloadIcon.addEventListener("click", closeDownloadModal);

  // Click outside the modal to close it
  window.addEventListener("click", function (event) {
    var downloadModal = document.getElementById("downloadModal");
    if (event.target === downloadModal) {
      closeDownloadModal();
    }
  });

  // Copy attribution text to clipboard when textarea is clicked
  attributionTextAreas.forEach(function (textArea) {
    textArea.addEventListener("click", function () {
      copyAttributionText(this.id);
    });
  });
});

//  function for sharing via email
export function shareEmail() {
  var shareURL = "mailto:?subject=Check out this site&body=" + encodeURIComponent(window.location.href);
  window.open(shareURL, "_blank");
}
export function shareTwitter() {
  var text = "Check out this site";
  var shareURL =
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(text) +
    "&url=" +
    encodeURIComponent(window.location.href);
  window.open(shareURL, "_blank");
}
export function shareLinkedIn() {
  console.log("shareLinkedIn function called");

  var currentUrl = window.location.href; // Gets the current URL
  var shareURL = "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(currentUrl);

  window.open(shareURL, "_blank");
}

export function copyToClipboard(elementId) {
  console.log("copyToClipboard called");

  if (!elementId) return;

  var copyText = document.getElementById(elementId);
  if (copyText) {
    navigator.clipboard
      .writeText(copyText.value)
      .then(() => console.log("Content copied to clipboard"))
      .catch((err) => console.error("Could not copy text: ", err));
  } else {
    console.error("Element with ID '" + elementId + "' not found.");
  }
}

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
  fetch("template.html") // Replace 'template.html' with the path to your actual template file
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then((html) => {
      // Parse the HTML response to be able to manipulate it
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Get the footer and legends content from the parsed HTML
      const footerHTML = doc.querySelector(".footer").outerHTML;
      const legendsHTML = doc.querySelector(".legends").outerHTML;
      const termHTML = doc.querySelector(".TermOfUse").outerHTML;

      // Insert the footer and legends into their respective placeholders in the current document
      document.getElementById("footer-placeholder").innerHTML = footerHTML;
      document.getElementById("legends-placeholder").innerHTML = legendsHTML;
      document.getElementById("term-placeholder").innerHTML = termHTML;

      // Update the current year in all elements with the class "current-year"
      const currentYearElements = document.getElementsByClassName("current-year");
      for (let i = 0; i < currentYearElements.length; i++) {
        currentYearElements[i].textContent = new Date().getFullYear();
      }
    })
    .catch((error) => {
      console.error("Error fetching the template:", error);
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
    this.imageIndex = Math.floor((this.totalImages - 1) / 2);

    this.updateImage();
  }
  //This method handles creating a temporary link for downloading the currently displayed image.
  downloadImage() {
    console.log(this.imageIndex);

    const imagePath = this.getImageUrl(this.imageIndex);
    const tempLink = document.createElement("a");
    tempLink.href = imagePath;
    tempLink.download = `image_${String(this.imageIndex).padStart(5, "0")}.jpg`; // Dynamic filename
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  }
  // This method has an event listener to the download button which calls the downloadImage method when clicked.
  setupDownloadButton() {
    const downloadBtn = document.getElementById("downloadBtn");
    downloadBtn.onclick = () => {
      this.downloadImage();
      // console.log(this.imageIndex);
    };
  }

  init() {
    this.findTotalImages();
    this.addEventListeners();
    this.setupDownloadButton();

    // Set the initial value of the slider
    const rangeSlider = document.getElementById("myRange");
    if (rangeSlider) {
      rangeSlider.value = Math.floor((this.totalImages - 1) / 2); // Set initial value to the middle index
      this.updateImageIndex(); // Update display to show "1" instead of "0"
    }
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
        //When event.deltaY < 0 (scrolling up), this.imageIndex is increased.

        if (event.deltaY < 0) {
          //
          this.imageIndex = Math.min(this.imageIndex + 1, this.totalImages - 1);

          // this.imageIndex = Math.max(this.imageIndex - 1, 0);
        } else {
          // this.imageIndex = Math.min(this.imageIndex + 1, this.totalImages - 1);
          this.imageIndex = Math.max(this.imageIndex - 1, 0);
        }

        // //When event.deltaY < 0 (scrolling up), this.imageIndex is decresed.

        // if (event.deltaY < 0) {

        //   this.imageIndex = Math.max(this.imageIndex - 1, 0);
        // } else {
        //   this.imageIndex = Math.min(this.imageIndex + 1, this.totalImages - 1);
        // }
        this.updateImage();
        // console.log("imageIndex updated to:", this.imageIndex);
        //image index goes over by 1//
      } else {
        body.style.overflow = ""; // Re-enable scrolling when not over the image
      }
    });

    // Keyboard navigation
    window.addEventListener("keydown", (event) => {
      event.preventDefault(); // Prevent scrolling when over the image

      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        this.imageIndex = Math.min(this.imageIndex + 1, this.totalImages - 1);
      } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        this.imageIndex = Math.max(this.imageIndex - 1, 0);
      }
      this.updateImage();
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
        // Adjust the slider's value to start from 0
        this.imageIndex = parseInt(rangeSlider.value);

        // Ensure that imageIndex does not go below 0
        this.imageIndex = Math.max(this.imageIndex, 0);

        this.updateImage();
        // Optionally update the display or other elements related to imageIndex
      });
    }
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

      // this.fusedImage.onload = () => {
      //   // Update both the slider and the display index when the image is loaded
      //   const rangeSlider = document.getElementById("myRange");
      //   if (rangeSlider) {
      //     rangeSlider.value = this.imageIndex;
      //   }
      this.updateImageIndex();
    }
    // } else {
    //   console.error("image element not found");
    // }
  }

  updateImageIndex() {
    const rangeSlider = document.getElementById("myRange");

    if (rangeSlider && this.infoOverlay) {
      // Update the maximum value of the range slider
      // -1 needed to make sure the slider reaches to its full range
      rangeSlider.max = this.totalImages - 1;
      // console.log(this.totalImages);
      rangeSlider.value = this.imageIndex;

      // Update the display with the correct index
      this.infoOverlay.innerHTML = `${this.imageIndex + 1}/${this.totalImages}`;
      // console.log(rangeSlider.value);
      // console.log(this.imageIndex);
    }
  }
}
class SwitchButton {
  constructor(containerId, viewer) {
    this.switchContainer = document.getElementById(containerId);
    this.legendsWrapper = document.getElementById("legends-wrapper");
    this.viewer = viewer;
    this.isOriginal = true;

    if (this.switchContainer) {
      const checkbox = this.switchContainer.querySelector('input[type="checkbox"]');

      if (checkbox) {
        checkbox.checked = !this.isOriginal; // Set the initial state of the checkbox based on isOriginal

        checkbox.addEventListener("change", () => {
          console.log("label toggled");
          this.isOriginal = !checkbox.checked; // Update isOriginal based on the checkbox state
          const newPath = this.isOriginal ? this.viewer.originalImagePath : this.viewer.alternateImagePath;
          this.viewer.updateImagePath(newPath);

          // Toggle legends-wrapper active state and display
          if (this.legendsWrapper) {
            if (this.legendsWrapper.classList.contains("active")) {
              this.legendsWrapper.classList.remove("active");
              this.legendsWrapper.style.display = "none";
            } else {
              this.legendsWrapper.classList.add("active");
              this.legendsWrapper.style.display = "block";
            }
          }
        });
      } else {
        console.error("Checkbox element not found in container:", containerId);
      }
    } else {
      console.error("SwitchContainer element not found:", containerId);
    }
  }
}
function initializeSwitchButton(buttonId, viewer) {
  if (document.getElementById(buttonId)) {
    return new SwitchButton(buttonId, viewer);
  }
  return null; // or handle the absence of the element as needed
}

document.addEventListener("DOMContentLoaded", () => {
  const c1_coronalViewer = new fusedViewer(
    "c1_coronalViewer",
    "c1_coronalImage",
    "c1_coronalinfoOverlay",
    "/images/03_06_20230206(L)/coronal_FOV(25)/original",
    "/images/03_06_20230206(L)/coronal_FOV(25)/annotated"
  );

  const c2_coronalViewer = new fusedViewer(
    "c2_coronalViewer",
    "c2_coronalImage",
    "c2_coronalinfoOverlay",
    "/images/03_23_20230309(R)/coronal_FOV(25)/original",
    "/images/03_23_20230309(R)/coronal_FOV(25)/annotated"
  );
  const c3_coronalViewer = new fusedViewer(
    "c3_coronalViewer",
    "c3_coronalImage",
    "c3_coronalinfoOverlay",
    "/images/03_37_20230322(L)/coronal_FOV(25)/original",
    "/images/03_37_20230322(L)/coronal_FOV(25)/annotated"
  );

  const c1_axialViewer = new fusedViewer(
    "c1_axialViewer",
    "c1_axialImage",
    "c1_axialinfoOverlay",
    "/images/03_06_20230206(L)/axial_FOV(25)/original",
    "/images/03_06_20230206(L)/axial_FOV(25)/annotated"
  );

  const c2_axialViewer = new fusedViewer(
    "c2_axialViewer",
    "c2_axialImage",
    "c2_axialinfoOverlay",
    "/images/03_23_20230309(R)/axial_FOV(25)/original",
    "/images/03_23_20230309(R)/axial_FOV(25)/annotated"
  );

  const c3_axialViewer = new fusedViewer(
    "c3_axialViewer",
    "c3_axialImage",
    "c3_axialinfoOverlay",
    "/images/03_37_20230322(L)/axial_FOV(25)/original",
    "/images/03_37_20230322(L)/axial_FOV(25)/annotated"
  );

  const c1_sagittalViewer = new fusedViewer(
    "c1_sagittalViewer",
    "c1_sagittalImage",
    "c1_sagittalinfoOverlay",
    "/images/03_06_20230206(L)/sagittal_FOV(25)/original",
    "/images/03_06_20230206(L)/sagittal_FOV(25)/annotated"
  );

  const c2_sagittalViewer = new fusedViewer(
    "c2_sagittalViewer",
    "c2_sagittalImage",
    "c2_sagittalinfoOverlay",
    "/images/03_23_20230309(R)/sagittal_FOV(25)/original",
    "/images/03_23_20230309(R)/sagittal_FOV(25)/annotated"
  );

  const c3_sagittalViewer = new fusedViewer(
    "c3_sagittalViewer",
    "c3_sagittalImage",
    "c3_sagittalinfoOverlay",
    "/images/03_37_20230322(L)/sagittal_FOV(25)/original",
    "/images/03_37_20230322(L)/sagittal_FOV(25)/annotated"
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

  const c1_coronal_switchButton = initializeSwitchButton("c1_coronal_switchButton", c1_coronalViewer);
  const c2_coronal_switchButton = initializeSwitchButton("c2_coronal_switchButton", c2_coronalViewer);
  const c3_coronal_switchButton = initializeSwitchButton("c3_coronal_switchButton", c3_coronalViewer);

  const c1_axial_switchButton = initializeSwitchButton("c1_axial_switchButton", c1_axialViewer);
  const c2_axial_switchButton = initializeSwitchButton("c2_axial_switchButton", c2_axialViewer);
  const c3_axial_switchButton = initializeSwitchButton("c3_axial_switchButton", c3_axialViewer);

  const c1_sagittal_switchButton = initializeSwitchButton("c1_sagittal_switchButton", c1_sagittalViewer);
  const c2_sagittal_switchButton = initializeSwitchButton("c2_sagittal_switchButton", c2_sagittalViewer);
  const c3_sagittal_switchButton = initializeSwitchButton("c3_sagittal_switchButton", c3_sagittalViewer);
});
