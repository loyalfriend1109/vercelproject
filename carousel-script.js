// Array of image URLs - replace these with your actual image URLs
const images = [
  'https://picsum.photos/300/600?random=1',
  'https://picsum.photos/500/300?random=2',
  'https://picsum.photos/300/400?random=3',
  'https://picsum.photos/600/300?random=4',
  'https://picsum.photos/300/700?random=5',
  'https://picsum.photos/300/300?random=6',
];

class Carousel {
  constructor(images, speed = 200) {
    this.images = images;
    this.speed = speed;
    this.track = document.querySelector('.carousel-track');
    this.position = 0;
    this.lastTimestamp = null;
    this.isPaused = false;
    
    this.initialize();
    this.setupEventListeners();
    requestAnimationFrame(this.animate);
  }

  initialize() {
    // Create three sets of images for truly seamless scrolling
    const allImages = [...this.images, ...this.images, ...this.images];
    
    // Create and append slides
    allImages.forEach(url => {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Carousel image';
      
      slide.appendChild(img);
      this.track.appendChild(slide);
    });

    // Start from the middle set of images
    const singleSetWidth = this.images.length * 320;
    this.position = -singleSetWidth;
    this.track.style.transform = `translateX(${this.position}px)`;
  }

  setupEventListeners() {
    // Pause on hover
    this.track.addEventListener('mouseenter', () => {
      this.isPaused = true;
    });

    this.track.addEventListener('mouseleave', () => {
      this.isPaused = false;
      this.lastTimestamp = null; // Reset timestamp to prevent jumping
    });

    // Setup modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close-modal');

    // Add click event to all carousel slides
    this.track.addEventListener('click', (e) => {
      const clickedImg = e.target.closest('.carousel-slide img');
      if (clickedImg) {
        modal.style.display = 'block';
        modalImg.src = clickedImg.src;
      }
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }

  animate = (timestamp) => {
    if (this.isPaused) {
      this.lastTimestamp = null;
      requestAnimationFrame(this.animate);
      return;
    }

    if (!this.lastTimestamp) {
      this.lastTimestamp = timestamp;
    }
    
    const elapsed = timestamp - this.lastTimestamp;
    
    // Calculate movement based on speed and elapsed time
    const pixelsToMove = (this.speed * elapsed) / 1000;
    this.position -= pixelsToMove;
    
    const singleSetWidth = this.images.length * 320; // Width of one set of images
    
    // If we've scrolled past the middle set, reset to the equivalent position
    if (Math.abs(this.position) >= singleSetWidth * 2) {
      this.position += singleSetWidth;
    }
    
    // If we've scrolled backwards past the middle set
    if (Math.abs(this.position) <= 0) {
      this.position -= singleSetWidth;
    }
    
    // Apply the transform
    this.track.style.transform = `translateX(${this.position}px)`;
    
    this.lastTimestamp = timestamp;
    requestAnimationFrame(this.animate);
  }
}

// Wait for DOM to be fully loaded
window.addEventListener('DOMContentLoaded', () => {
  new Carousel(images);
});