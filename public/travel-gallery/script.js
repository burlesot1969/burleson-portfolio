/**
 * ==============================================================================
 * EASTERN EUROPEAN TRIP - PHOTO GALLERY CAPTIONS & DATA
 * ==============================================================================
 * To edit titles, locations, or captions for any photo:
 * 1. Find the photo number below (Row 1: Photos 1-5 | Row 2: 6-10 | Row 3: 11-15).
 * 2. Update the text inside `title:` and `location:`.
 * 3. Save this file and refresh your browser!
 * ==============================================================================
 */

const photos = [
  // ------------------ ROW 1 (Columns 1 - 5) ------------------
  {
    id: 1,
    src: 'images/TB1.JPG',
    title: 'Airplane Sunset View',
    location: 'Flying over Eastern Europe'
  },
  {
    id: 2,
    src: 'images/TB2.JPG',
    title: 'Red Flying Sculpture',
    location: 'Prague Alleyway'
  },
  {
    id: 3,
    src: 'images/TB3.jpg',
    title: 'Astronomical Clock',
    location: 'Old Town Square, Prague'
  },
  {
    id: 4,
    src: 'images/TB4.JPG',
    title: 'Gothic Tower & Moon',
    location: 'Prague Night Sky'
  },
  {
    id: 5,
    src: 'images/TB5.JPG',
    title: 'Brick Wall Scenic Overlook',
    location: 'Scenic Viewpoint'
  },

  // ------------------ ROW 2 (Columns 1 - 5) ------------------
  {
    id: 6,
    src: 'images/TB6.JPG',
    title: 'Hungarian Parliament Sunset',
    location: 'Danube River, Budapest'
  },
  {
    id: 7,
    src: 'images/TB7.JPG',
    title: 'Porthole River View',
    location: 'Danube River Cruise'
  },
  {
    id: 8,
    src: 'images/TB8.JPG',
    title: 'Sunflower Field',
    location: 'Eastern European Countryside'
  },
  {
    id: 9,
    src: 'images/TB9.JPG',
    title: 'Black Church Steeple',
    location: 'Historic Town Steeple'
  },
  {
    id: 10,
    src: 'images/TB10.JPG',
    title: 'Golden Mosaic Cathedral Interior',
    location: 'Orthodox Cathedral'
  },

  // ------------------ ROW 3 (Columns 1 - 5) ------------------
  {
    id: 11,
    src: 'images/TB11.JPG',
    title: 'Raindrops on Window',
    location: 'Misty Afternoon'
  },
  {
    id: 12,
    src: 'images/TB12.jpg',
    title: 'Cobblestone Tunnel Archway',
    location: 'Ancient Fortification'
  },
  {
    id: 13,
    src: 'images/TB13.jpg',
    title: 'Hilltop Castle Fortress',
    location: 'Historic Citadel'
  },
  {
    id: 14,
    src: 'images/TB14.JPG',
    title: 'White Golden-Domed Cathedral',
    location: 'Grand Cathedral'
  },
  {
    id: 15,
    src: 'images/TB15.jpg',
    title: 'Purple Flower Blossom',
    location: 'Botanical Garden'
  }
];

let currentPhotoIndex = 0;

// DOM Elements
const gridHotspotsOverlay = document.getElementById('grid-hotspots-overlay');

const lightbox = document.getElementById('lightbox');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxLocation = document.getElementById('lightbox-location');
const lightboxCloseBtn = document.getElementById('lightbox-close');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxImageWrapper = document.getElementById('lightbox-image-wrapper');

// Initialize Application
function init() {
  render3x5GridHotspots();
  setupEventListeners();
}

// Render 15 Hotspot Cells in a 3x5 Grid Layout
function render3x5GridHotspots() {
  gridHotspotsOverlay.innerHTML = '';
  
  photos.forEach((photo, index) => {
    const cell = document.createElement('div');
    cell.className = 'grid-cell-hotspot';
    cell.dataset.index = index;
    cell.setAttribute('data-label', `Photo #${index + 1}`);
    
    // Click event to open Lightbox Modal
    cell.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(index);
    });
    
    gridHotspotsOverlay.appendChild(cell);
  });
}

// Lightbox Modal Logic
function openLightbox(index) {
  currentPhotoIndex = index;
  updateLightboxContent();
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
}

function updateLightboxContent() {
  const photo = photos[currentPhotoIndex];
  if (!photo) return;
  
  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.title;
  lightboxTitle.textContent = photo.title;
  lightboxLocation.textContent = `📍 ${photo.location}`;
}

// Setup Event Listeners
function setupEventListeners() {
  // 1. Close lightbox via 'X' button
  lightboxCloseBtn.addEventListener('click', closeLightbox);
  
  // 2. Close lightbox via background overlay click
  lightboxOverlay.addEventListener('click', closeLightbox);
  
  // 3. Close lightbox by tapping or clicking the image itself!
  lightboxImg.addEventListener('click', closeLightbox);
  lightboxImageWrapper.addEventListener('click', closeLightbox);
  lightboxContent.addEventListener('click', closeLightbox);
  
  // 4. Keyboard Escape key -> Returns to main collage
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', init);
