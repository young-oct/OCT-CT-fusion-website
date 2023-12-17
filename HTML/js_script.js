function CTViewer(viewerId, imageId, overlayId, imagePath) {
    this.viewer = document.getElementById(viewerId);
    this.ctImage = document.getElementById(imageId);
    this.infoOverlay = document.getElementById(overlayId);
    this.imagePath = imagePath;
    this.imageIndex = 0;
    this.totalImages = 0;

    this.imageExists = function(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    };

    this.getImageUrl = function(index) {
        return `${this.imagePath}/image_${String(index).padStart(5, '0')}.png`;
    };

    this.updateImage = function() {
        this.ctImage.src = this.getImageUrl(this.imageIndex);
        this.infoOverlay.textContent = `image ${this.imageIndex + 1} of ${this.totalImages}`;
    };

    this.findTotalImages = async function() {
        let exists = true;
        let index = 0;
        while (exists) {
            let imageUrl = this.getImageUrl(index);
            exists = await this.imageExists(imageUrl);
            if (exists) index++;
        }
        this.totalImages = index;
        this.updateImage();
    };

    this.init = function() {
        this.findTotalImages();
        this.addEventListeners();
    };

    this.addEventListeners = function() {
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
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const axialViewer = new CTViewer('axialViewer', 'axialImage', 'infoOverlay', 'images/03_06_20230206(L)/axial_FOV(25)/cropped/');
    const coronalViewer = new CTViewer('coronalViewer', 'coronalImage', 'infoOverlay', 'images/03_06_20230206(L)/coronal_FOV(25)/cropped/');
    const sagittalViewer = new CTViewer('sagittalViewer', 'sagittalImage', 'infoOverlay', 'images/03_06_20230206(L)/sagittal_FOV(25)/cropped/');

    coronalViewer.init();
    axialViewer.init();
    sagittalViewer.init();
});
