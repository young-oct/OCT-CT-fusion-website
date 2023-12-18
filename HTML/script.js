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
      this.updateImage();
  }

  init() {
      this.findTotalImages();
      this.addEventListeners();
  }

  addEventListeners() {
      window.addEventListener('wheel', (event) => {
          if (event.deltaY < 0) {
              this.imageIndex = Math.max(this.imageIndex - 1, 0);
          } else {
              this.imageIndex = Math.min(this.imageIndex + 1, this.totalImages - 1);
          }
          this.updateImage();
      });

      window.addEventListener('keydown', (event) => {
          switch (event.key) {
              case 'ArrowUp':
              case 'ArrowLeft':
                  this.imageIndex = Math.max(this.imageIndex - 1, 0);
                  break;
              case 'ArrowDown':
              case 'ArrowRight':
                  this.imageIndex = Math.min(this.imageIndex + 1, this.totalImages - 1);
                  break;
          }
          this.updateImage();
      });
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
      return `${this.imagePath}/image_${String(index).padStart(5, '0')}.jpg`;
  }

  updateImage() {
    if (this.fusedImage) {
        this.fusedImage.src = this.getImageUrl(this.imageIndex);

        // Set the onload function for the image
        this.fusedImage.onload = () => {
            // Update the text content of infoOverlay once the image has loaded
            this.infoOverlay.textContent = `Image ${this.imageIndex + 1} of ${this.totalImages}`;
        };
    } else {
        console.error('image element not found');
    }
}}



class SwitchButton {
  constructor(buttonId, viewer) {
      this.button = document.getElementById(buttonId);
      this.viewer = viewer;
      this.isOriginal = true;

      if (this.button) {
          this.button.addEventListener('click', () => {
              console.log('SwitchButton clicked');
              this.isOriginal = !this.isOriginal;
              const newPath = this.isOriginal ? this.viewer.originalImagePath : this.viewer.alternateImagePath;
              this.viewer.updateImagePath(newPath);
          });
      } else {
          console.error('SwitchButton element not found:', buttonId);
      }
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const c1_coronalViewer = new fusedViewer(
      'c1_coronalViewer',
      'c1_coronalImage',
      'c1_coronalinfoOverlay',
      'images/03_06_20230206(L)/coronal_FOV(25)/cropped',
      'images/03_06_20230206(L)/coronal_FOV(25)/raw'
  );

  const c2_coronalViewer = new fusedViewer(
    'c2_coronalViewer',
    'c2_coronalImage',
    'c2_coronalinfoOverlay',
    'images/03_23_20230309(R)/coronal_FOV(25)/cropped',
    'images/03_23_20230309(R)/coronal_FOV(25)/raw'
);
const c3_coronalViewer = new fusedViewer(
    'c3_coronalViewer',
    'c3_coronalImage',
    'c3_coronalinfoOverlay',
    'images/03_37_20230322(L)/coronal_FOV(25)/cropped',
    'images/03_37_20230322(L)/coronal_FOV(25)/raw'
);

const c1_axialViewer = new fusedViewer(
    'c1_axialViewer',
    'c1_axialImage',
    'c1_axialinfoOverlay',
    'images/03_06_20230206(L)/axial_FOV(25)/cropped',
    'images/03_06_20230206(L)/axial_FOV(25)/raw'
);

const c2_axialViewer = new fusedViewer(
    'c2_axialViewer',
    'c2_axialImage',
    'c2_axialinfoOverlay',
    'images/03_23_20230309(R)/axial_FOV(25)/cropped',
    'images/03_23_20230309(R)/axial_FOV(25)/raw'
);

const c3_axialViewer = new fusedViewer(
    'c3_axialViewer',
    'c3_axialImage',
    'c3_axialinfoOverlay',
    'images/03_37_20230322(L)/axial_FOV(25)/cropped',
    'images/03_37_20230322(L)/axial_FOV(25)/raw'
);


const c1_sagittalViewer = new fusedViewer(
  'c1_sagittalViewer',
  'c1_sagittalImage',
  'c1_sagittalinfoOverlay',
  'images/03_06_20230206(L)/sagittal_FOV(25)/cropped',
  'images/03_06_20230206(L)/sagittal_FOV(25)/raw'
);

const c2_sagittalViewer = new fusedViewer(
    'c2_sagittalViewer',
    'c2_sagittalImage',
    'c2_sagittalinfoOverlay',
    'images/03_23_20230309(R)/sagittal_FOV(25)/cropped',
    'images/03_23_20230309(R)/sagittal_FOV(25)/raw'
  );

const c3_sagittalViewer = new fusedViewer(
    'c3_sagittalViewer',
    'c3_sagittalImage',
    'c3_sagittalinfoOverlay',
    'images/03_37_20230322(L)/sagittal_FOV(25)/cropped',
    'images/03_37_20230322(L)/sagittal_FOV(25)/raw'
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


  const c1_coronal_switchButton = new SwitchButton('c1_coronal_switchButton', c1_coronalViewer);
  const c2_coronal_switchButton = new SwitchButton('c2_coronal_switchButton', c2_coronalViewer);
  const c3_coronal_switchButton = new SwitchButton('c3_coronal_switchButton', c3_coronalViewer);

  const c1_axial_switchButton = new SwitchButton('c1_axial_switchButton', c1_axialViewer);
  const c2_axial_switchButton = new SwitchButton('c2_axial_switchButton', c2_axialViewer);
  const c3_axial_switchButton = new SwitchButton('c3_axial_switchButton', c3_axialViewer);

  const c1_sagittal_switchButton = new SwitchButton('c1_sagittal_switchButton', c1_sagittalViewer);
  const c2_sagittal_switchButton = new SwitchButton('c2_sagittal_switchButton', c2_sagittalViewer);
  const c3_sagittal_switchButton = new SwitchButton('c3_sagittal_switchButton', c3_sagittalViewer);


});