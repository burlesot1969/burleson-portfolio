# Wanderlust - Travel Photo Gallery Collage & Lightbox

A modern travel photo collage gallery built with **HTML5**, **CSS3**, and **Vanilla JavaScript**. It features a dynamic grid collage layout, hover zoom animations, and a full-screen glassmorphism lightbox overlay.

---

## 📍 Where is this gallery saved on your Mac?

This gallery is saved inside your portfolio project on your Desktop:
```
/Users/toddburleson/Desktop/burleson-portfolio/travel-gallery/
```

---

## 📁 How to Put Your Photos Here

### Simple Step-by-Step Guide for non-technical users:

1. **Create an `images` folder**:
   Inside `/Users/toddburleson/Desktop/burleson-portfolio/travel-gallery/`, create a folder called **`images`**.

2. **Copy your travel photos**:
   Drag and drop your JPEG or PNG travel photos into that new `images` folder (for example: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`).

3. **Link your photos in `script.js`**:
   Open [script.js](file:///Users/toddburleson/Desktop/burleson-portfolio/travel-gallery/script.js) and update the `defaultPhotos` list:
   ```javascript
   const defaultPhotos = [
     {
       src: 'images/photo1.jpg',
       title: 'My Trip Photo 1',
       location: 'Location Name',
       size: 'tall' // Choose layout size: 'normal', 'tall', 'wide', or 'large'
     },
     {
       src: 'images/photo2.jpg',
       title: 'My Trip Photo 2',
       location: 'Location Name',
       size: 'wide'
     }
   ];
   ```

4. **Instant Browser Method (Alternative)**:
   You can also double-click [index.html](file:///Users/toddburleson/Desktop/burleson-portfolio/travel-gallery/index.html) to open the web page in Chrome/Safari, then click **"Select Photos From Your Computer"** (or drag & drop your photos onto the browser page).

---

## 🖥️ How to View the Gallery

Simply double-click:
[index.html](file:///Users/toddburleson/Desktop/burleson-portfolio/travel-gallery/index.html)

Or in Finder, navigate to `Desktop` ➔ `burleson-portfolio` ➔ `travel-gallery` ➔ double-click `index.html`.
