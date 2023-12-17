class CTViewer {
  constructor(viewerId, imageId, overlayId, originalImagePath, alternateImagePath) {
      this.viewer = document.getElementById(viewerId);
      this.ctImage = document.getElementById(imageId);
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
      return `${this.imagePath}/image_${String(index).padStart(5, '0')}.png`;
  }

  updateImage() {
    if (this.ctImage) {
        this.ctImage.src = this.getImageUrl(this.imageIndex);
        this.infoOverlay.textContent = `Image ${this.imageIndex + 1} of ${this.totalImages}`;
    } else {
        console.error('CT image element not found');
    }
}
}

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
  const coronalViewer = new CTViewer(
      'coronalViewer',
      'coronalImage',
      'infoOverlay',
      'images/03_06_20230206(L)/coronal_FOV(25)/cropped',
      'images/03_06_20230206(L)/coronal_FOV(25)/raw'
  );


  const axialViewer = new CTViewer(
    'axialViewer',
    'axialImage',
    'infoOverlay',
    'images/03_06_20230206(L)/axial_FOV(25)/cropped',
    'images/03_06_20230206(L)/axial_FOV(25)/raw'
);

const sagittalViewer = new CTViewer(
  'sagittalViewer',
  'sagittalImage',
  'infoOverlay',
  'images/03_06_20230206(L)/sagittal_FOV(25)/cropped',
  'images/03_06_20230206(L)/sagittal_FOV(25)/raw'
);
  coronalViewer.init();
  axialViewer.init();
  sagittalViewer.init();

  const coronal_switchButton = new SwitchButton('coronal_switchButton', coronalViewer);
  const axial_switchButton = new SwitchButton('axial_switchButton', axialViewer);
  const sagittal_switchButton = new SwitchButton('sagittal_switchButton', sagittalViewer);


});