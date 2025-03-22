// Set the current year in the footer
document.getElementById('currentYear').textContent = new Date().getFullYear();


function openTab(tabName) {
// Hide all tab content
const tabContents = document.querySelectorAll('.tab-content');
tabContents.forEach(content => {
content.style.display = 'none';
});

// Show the selected tab content
document.getElementById(tabName).style.display = 'block';
}

// Optionally, set a default tab to be open when the page loads
document.addEventListener('DOMContentLoaded', () => {
openTab('gallery'); // Open the Gallery tab by default
});
// JavaScript for Loading Spinner
window.addEventListener('load', () => {
    const spinner = document.getElementById('loading-spinner');
    spinner.style.display = 'none';
});

// Call loadContent() when needed
document.addEventListener('DOMContentLoaded', () => {
    loadContent(); // Example: Show spinner on page load
});

// Function to open a modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "flex";
    modal.setAttribute('aria-hidden', 'false');
}

// Function to close a modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        event.target.setAttribute('aria-hidden', 'true');
    }
}



let currentImageIndex = 0;
let currentModalImages = [];
let touchStartX = 0;
let touchEndX = 0;

// Function to open the image viewer
function openImageViewer(modalId, imageSrc) {
    const modal = document.getElementById(modalId);
    const images = Array.from(modal.querySelectorAll('.image-gallery img')).map(img => img.src);
    currentModalImages = images;
    currentImageIndex = images.indexOf(imageSrc);

    const imageViewer = document.getElementById('imageViewer');
    const expandedImage = document.getElementById('expandedImage');
    expandedImage.src = imageSrc; // Set the image source
    imageViewer.style.display = "flex"; // Show the image viewer

    // Update ARIA attributes
    imageViewer.setAttribute('aria-labelledby', 'imageViewerTitle');
    expandedImage.setAttribute('aria-describedby', 'imageDescription');

    // Set focus on the image viewer for accessibility
    imageViewer.focus();

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);
}

// Function to close the image viewer
function closeImageViewer() {
    document.getElementById('imageViewer').style.display = "none";

    // Remove keyboard event listener
    document.removeEventListener('keydown', handleKeyDown);
}

// Function to handle keyboard navigation
function handleKeyDown(e) {
    if (document.getElementById('imageViewer').style.display === 'flex') {
        switch (e.key) {
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeImageViewer();
                break;
        }
    }
}

// Function to show the previous image
function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = currentModalImages.length - 1; // Loop to the last image
    }
    updateImage();
}

// Function to show the next image
function nextImage() {
    if (currentImageIndex < currentModalImages.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0; // Loop to the first image
    }
    updateImage();
}

// Function to update the image with smooth transition
function updateImage() {
    const expandedImage = document.getElementById('expandedImage');
    expandedImage.src = currentModalImages[currentImageIndex]; // Update the image source
}

// Function to handle touch start event
function handleTouchStart(e) {
    touchStartX = e.touches[0].clientX; // Get the X coordinate of the touch
}

// Function to handle touch move event
function handleTouchMove(e) {
    touchEndX = e.touches[0].clientX; // Get the X coordinate of the touch
}

// Function to handle touch end event
function handleTouchEnd() {
    const swipeThreshold = 50; // Minimum distance to consider it a swipe
    const deltaX = touchEndX - touchStartX; // Calculate the horizontal distance

    if (deltaX > swipeThreshold) {
        // Swipe right -> Previous image
        prevImage();
    } else if (deltaX < -swipeThreshold) {
        // Swipe left -> Next image
        nextImage();
    }
}

// Add touch event listeners to the image container
const imageContainer = document.querySelector('.image-container');
if (imageContainer) {
    imageContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    imageContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    imageContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
}