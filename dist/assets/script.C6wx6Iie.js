window.addEventListener("DOMContentLoaded",t=>{console.log("called"),document.getElementById("expand").addEventListener("click",f),document.getElementById("contract").addEventListener("click",v)});document.querySelectorAll(".share-btn").forEach(t=>{t.id==="shareLinkedIn"?t.addEventListener("click",S):t.id==="shareEmail"?t.addEventListener("click",k):t.id==="shareTwitter"&&t.addEventListener("click",b)});document.querySelectorAll(".copyToClipboard").forEach(t=>{t.addEventListener("click",function(){var e=t.getAttribute("data-element-id");B(e)})});document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll(".toggle-year-trigger").forEach(t=>{t.addEventListener("click",function(){var e=this.getAttribute("data-target-id");y.call(this,e)})})});function y(t){var e=document.getElementById(t),n=this;e.style.display==="none"||e.style.display===""?(e.style.display="block",n.textContent=this.textContent.replace("+","-")):(e.style.display="none",n.textContent=this.textContent.replace("-","+"))}function f(){var t=document.querySelectorAll(".publications");t.forEach(function(e){e.style.display="block",e.previousElementSibling.textContent=e.previousElementSibling.textContent.replace("+","-")})}function v(){var t=document.querySelectorAll(".publications");t.forEach(function(e){e.style.display="none",e.previousElementSibling.textContent=e.previousElementSibling.textContent.replace("-","+")})}function w(){var t=document.querySelectorAll(".publication"),e=t.length;t.forEach(function(n,o){var a=e-o,i=n.querySelector("h3");i&&(i.textContent=a+". "+i.textContent)})}function p(){document.body.scrollTop>20||document.documentElement.scrollTop>20?document.getElementById("backToTopBtn").style.display="block":document.getElementById("backToTopBtn").style.display="none"}function _(t){var e=document.body,n=document.getElementById("overlay");if(t.classList.contains("enlarged"))t.classList.remove("enlarged"),t.style.transform="",n.style.display="none",e.style.overflow="auto",document.querySelector(".fa-arrow-left").style.display="none",document.querySelector(".fa-arrow-right").style.display="none";else{var o=h(t);t.style.transform="translate(-50%, -50%) scale("+o+")",t.classList.add("enlarged"),n.style.display="block",e.style.overflow="hidden",document.querySelector(".fa-arrow-left").style.display="block",document.querySelector(".fa-arrow-right").style.display="block"}}function h(t){var e=window.innerWidth,n=t.offsetWidth,o=e/n;return o=Math.min(o,.8),o}function I(){var t=document.getElementById("overlay");t.style.display="none";var e=document.querySelectorAll(".enlarged"),n=document.querySelectorAll("video");e.forEach(function(o){o.classList.remove("enlarged"),o.style.transform="",n.forEach(function(a){a.pause()})}),t.style.display="none",document.body.style.overflow="auto",document.querySelector(".left-arrow").style.display="none",document.querySelector(".right-arrow").style.display="none"}document.addEventListener("DOMContentLoaded",function(){var t=document.getElementById("overlay");t.addEventListener("click",function(e){e.target===t&&I()})});function u(t){var e=Array.from(document.querySelectorAll(".enlarge_img")),n=document.querySelector(".enlarge_img.enlarged"),o=e.indexOf(n);if(n){n.classList.remove("enlarged"),n.style.transform="",t==="next"?o=(o+1)%e.length:t==="prev"&&(o=(o-1+e.length)%e.length);var a=e[o],i=h(a);a.style.transform="translate(-50%, -50%) scale("+i+")",a.classList.add("enlarged"),a.style.display="block"}}function E(){var t=document.querySelector(".fa-arrow-left"),e=document.querySelector(".fa-arrow-right");t&&(t.style.display="none"),e&&(e.style.display="none")}function m(){var t=document.getElementById("shareModal");t.style.display=t.style.display==="block"?"none":"block"}function L(){var t=document.getElementById("downloadModal");t.style.display="block"}function g(){var t=document.getElementById("downloadModal");t.style.display="none"}function x(t){var e=document.getElementById(t);e.select(),document.execCommand("copy")}document.addEventListener("DOMContentLoaded",function(){C(),w(),O(),T(),V(),E(),M();var t=document.getElementById("share_icon"),e=document.querySelector(".modal .close"),n=window.location.href,o=document.getElementById("shareLink");o.value=n,window.addEventListener("click",function(l){var d=document.getElementById("shareModal");l.target===d&&m()}),t.addEventListener("click",m),e.addEventListener("click",m);var a=document.getElementById("download_icon"),i=document.querySelector(".download-close"),r=document.querySelectorAll(".attribution textarea");a.addEventListener("click",L),i.addEventListener("click",g),window.addEventListener("click",function(l){var d=document.getElementById("downloadModal");l.target===d&&g()}),r.forEach(function(l){l.addEventListener("click",function(){x(this.id)})})});function k(){var t="mailto:?subject=Check out this site&body="+encodeURIComponent(window.location.href);window.open(t,"_blank")}function b(){var t="Check out this site",e="https://twitter.com/intent/tweet?text="+encodeURIComponent(t)+"&url="+encodeURIComponent(window.location.href);window.open(e,"_blank")}function S(){console.log("shareLinkedIn function called");var t=window.location.href,e="https://www.linkedin.com/sharing/share-offsite/?url="+encodeURIComponent(t);window.open(e,"_blank")}function B(t){if(console.log("copyToClipboard called"),!!t){var e=document.getElementById(t);e?navigator.clipboard.writeText(e.value).then(()=>console.log("Content copied to clipboard")).catch(n=>console.error("Could not copy text: ",n)):console.error("Element with ID '"+t+"' not found.")}}function C(){var t=document.querySelectorAll(".publications");t.forEach(function(e){e.style.display="block",e.previousElementSibling.textContent="-"+e.previousElementSibling.textContent.slice(2)})}function O(){var t=document.querySelectorAll(".subnav_dropbtn"),e=document.querySelector(".menubar"),n=document.querySelector(".navlinks"),o=document.querySelectorAll(".subnav");t.forEach(function(i){i.addEventListener("click",function(){var r=this.nextElementSibling,l=window.getComputedStyle(r).display==="none";r.style.display=l?"block":"none",r.style.overflowY=l?"auto":"none"})}),e&&n?(e.addEventListener("click",function(){n.classList.toggle("active"),document.body.style.overflowY=n.classList.contains("active")?"hidden":"auto"}),window.addEventListener("resize",function(){window.innerWidth>600&&(n.classList.remove("active"),document.body.style.overflowY="auto",o.forEach(function(i){i.classList.remove("active");var r=i.querySelector(".dropdown-content");r&&(r.style.display="none")}))})):console.error("Menubar or navbar links not found"),window.onscroll=p;var a=document.getElementById("backToTopBtn");a&&a.addEventListener("click",function(){document.body.scrollTop=0,document.documentElement.scrollTop=0})}function M(){var t=document.querySelectorAll(".subnav_dropbtn");t.forEach(function(e){e.addEventListener("click",function(){if(window.innerWidth>600){var n=this.nextElementSibling,o=this.classList.contains("active");t.forEach(function(a){var i=a.nextElementSibling;i.style.display="none",a.classList.remove("active")}),o||(n.style.display="block",this.classList.add("active"))}})})}function T(){var t=document.querySelectorAll(".enlarge_img, video");t.forEach(function(e){e.addEventListener("click",function(){_(this)})})}function V(){var t=document.querySelector(".left-arrow"),e=document.querySelector(".right-arrow");t&&e&&(t.addEventListener("click",function(n){n.stopPropagation(),u("prev")}),e.addEventListener("click",function(n){n.stopPropagation(),u("next")})),document.addEventListener("keydown",function(n){var o=document.getElementById("overlay");o&&o.style.display=="block"&&(n.key==="ArrowLeft"&&t?(u("prev"),t.classList.add("active"),setTimeout(function(){t.classList.remove("active")},150),n.preventDefault()):n.key==="ArrowRight"&&e&&(u("next"),e.classList.add("active"),setTimeout(function(){e.classList.remove("active")},150),n.preventDefault()))})}window.addEventListener("DOMContentLoaded",()=>{fetch("template.html").then(t=>{if(!t.ok)throw new Error(`HTTP error! Status: ${t.status}`);return t.text()}).then(t=>{const n=new DOMParser().parseFromString(t,"text/html"),o=n.querySelector(".footer").outerHTML,a=n.querySelector(".legends").outerHTML,i=n.querySelector(".TermOfUse").outerHTML;document.getElementById("footer-placeholder").innerHTML=o,document.getElementById("legends-placeholder").innerHTML=a,document.getElementById("term-placeholder").innerHTML=i;const r=n.getElementsByClassName("current-year");for(let l=0;l<r.length;l++)r[l].textContent=new Date().getFullYear()}).catch(t=>{console.error("Error fetching the template:",t)})});class c{constructor(e,n,o,a,i){this.viewer=document.getElementById(e),this.fusedImage=document.getElementById(n),this.infoOverlay=document.getElementById(o),this.originalImagePath=a,this.alternateImagePath=i,this.imagePath=a,this.imageIndex=0,this.totalImages=0}updateImagePath(e){console.log(`Updating path for ${this.viewer.id} to: ${e}`),this.imagePath=e,this.updateImage()}async findTotalImages(){let e=!0,n=0;for(;e;){const o=this.getImageUrl(n);e=await this.imageExists(o),e&&n++}this.totalImages=n,this.imageIndex=Math.floor((this.totalImages-1)/2),this.updateImage()}downloadImage(){console.log(this.imageIndex);const e=this.getImageUrl(this.imageIndex),n=document.createElement("a");n.href=e,n.download=`image_${String(this.imageIndex).padStart(5,"0")}.jpg`,document.body.appendChild(n),n.click(),document.body.removeChild(n)}setupDownloadButton(){const e=document.getElementById("downloadBtn");e.onclick=()=>{this.downloadImage()}}init(){this.findTotalImages(),this.addEventListeners(),this.setupDownloadButton();const e=document.getElementById("myRange");e&&(e.value=Math.floor((this.totalImages-1)/2),this.updateImageIndex())}addEventListeners(){const e=document.querySelector(".fusedimage_style"),n=document.body,o=document.getElementById("myRange");window.addEventListener("wheel",a=>{const i=e.getBoundingClientRect();a.clientX>=i.left&&a.clientX<=i.right&&a.clientY>=i.top&&a.clientY<=i.bottom?(a.preventDefault(),n.style.overflow="hidden",a.deltaY<0?this.imageIndex=Math.min(this.imageIndex+1,this.totalImages-1):this.imageIndex=Math.max(this.imageIndex-1,0),this.updateImage()):n.style.overflow=""}),window.addEventListener("keydown",a=>{a.preventDefault(),a.key==="ArrowRight"||a.key==="ArrowDown"?this.imageIndex=Math.min(this.imageIndex+1,this.totalImages-1):(a.key==="ArrowLeft"||a.key==="ArrowUp")&&(this.imageIndex=Math.max(this.imageIndex-1,0)),this.updateImage()}),window.addEventListener("mousemove",a=>{const i=e.getBoundingClientRect();(a.clientX<i.left||a.clientX>i.right||a.clientY<i.top||a.clientY>i.bottom)&&(n.style.overflow="")}),o&&o.addEventListener("input",()=>{this.imageIndex=parseInt(o.value),this.imageIndex=Math.max(this.imageIndex,0),this.updateImage()})}imageExists(e){return new Promise(n=>{const o=new Image;o.onload=()=>n(!0),o.onerror=()=>n(!1),o.src=e})}getImageUrl(e){return`${this.imagePath}/image_${String(e).padStart(5,"0")}.jpg`}updateImage(){this.fusedImage&&(this.fusedImage.src=this.getImageUrl(this.imageIndex),this.updateImageIndex())}updateImageIndex(){const e=document.getElementById("myRange");e&&this.infoOverlay&&(e.max=this.totalImages-1,e.value=this.imageIndex,this.infoOverlay.innerHTML=`${this.imageIndex+1}/${this.totalImages}`)}}class q{constructor(e,n){if(this.switchContainer=document.getElementById(e),this.legendsWrapper=document.getElementById("legends-wrapper"),this.viewer=n,this.isOriginal=!0,this.switchContainer){const o=this.switchContainer.querySelector('input[type="checkbox"]');o?(o.checked=!this.isOriginal,o.addEventListener("change",()=>{console.log("label toggled"),this.isOriginal=!o.checked;const a=this.isOriginal?this.viewer.originalImagePath:this.viewer.alternateImagePath;this.viewer.updateImagePath(a),this.legendsWrapper&&(this.legendsWrapper.classList.contains("active")?(this.legendsWrapper.classList.remove("active"),this.legendsWrapper.style.display="none"):(this.legendsWrapper.classList.add("active"),this.legendsWrapper.style.display="block"))})):console.error("Checkbox element not found in container:",e)}else console.error("SwitchContainer element not found:",e)}}function s(t,e){return document.getElementById(t)?new q(t,e):null}document.addEventListener("DOMContentLoaded",()=>{const t=new c("c1_coronalViewer","c1_coronalImage","c1_coronalinfoOverlay","/images/03_06_20230206(L)/coronal_FOV(25)/original","/images/03_06_20230206(L)/coronal_FOV(25)/annotated"),e=new c("c2_coronalViewer","c2_coronalImage","c2_coronalinfoOverlay","/images/03_23_20230309(R)/coronal_FOV(25)/original","/images/03_23_20230309(R)/coronal_FOV(25)/annotated"),n=new c("c3_coronalViewer","c3_coronalImage","c3_coronalinfoOverlay","/images/03_37_20230322(L)/coronal_FOV(25)/original","/images/03_37_20230322(L)/coronal_FOV(25)/annotated"),o=new c("c1_axialViewer","c1_axialImage","c1_axialinfoOverlay","/images/03_06_20230206(L)/axial_FOV(25)/original","/images/03_06_20230206(L)/axial_FOV(25)/annotated"),a=new c("c2_axialViewer","c2_axialImage","c2_axialinfoOverlay","/images/03_23_20230309(R)/axial_FOV(25)/original","/images/03_23_20230309(R)/axial_FOV(25)/annotated"),i=new c("c3_axialViewer","c3_axialImage","c3_axialinfoOverlay","/images/03_37_20230322(L)/axial_FOV(25)/original","/images/03_37_20230322(L)/axial_FOV(25)/annotated"),r=new c("c1_sagittalViewer","c1_sagittalImage","c1_sagittalinfoOverlay","/images/03_06_20230206(L)/sagittal_FOV(25)/original","/images/03_06_20230206(L)/sagittal_FOV(25)/annotated"),l=new c("c2_sagittalViewer","c2_sagittalImage","c2_sagittalinfoOverlay","/images/03_23_20230309(R)/sagittal_FOV(25)/original","/images/03_23_20230309(R)/sagittal_FOV(25)/annotated"),d=new c("c3_sagittalViewer","c3_sagittalImage","c3_sagittalinfoOverlay","/images/03_37_20230322(L)/sagittal_FOV(25)/original","/images/03_37_20230322(L)/sagittal_FOV(25)/annotated");t.init(),e.init(),n.init(),o.init(),a.init(),i.init(),r.init(),l.init(),d.init(),s("c1_coronal_switchButton",t),s("c2_coronal_switchButton",e),s("c3_coronal_switchButton",n),s("c1_axial_switchButton",o),s("c2_axial_switchButton",a),s("c3_axial_switchButton",i),s("c1_sagittal_switchButton",r),s("c2_sagittal_switchButton",l),s("c3_sagittal_switchButton",d)});
