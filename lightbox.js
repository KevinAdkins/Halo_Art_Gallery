const lb = document.getElementById('lightbox');    // lb = overall lightbox container (the popup overlay)
const lbImg = document.getElementById('lightbox-img');  // the big image of the image in lightbox
const lbCap = document.getElementById('lightbox-cap'); // the caption of the image
const images = document.querySelectorAll('.gallery img'); // finds all images in gallery
const closeBtn = document.querySelector('.close'); // finds the close button (escape)
const nextBtn = document.querySelector('.next'); // finds the next button (right arrow)
const prevBtn = document.querySelector('.prev'); // finds the previous button (left arrow)

let currentIndex = 0; // keeps track of which image is currently being shown

images.forEach(img => { // loops through all found images
  img.addEventListener('click', () => { // adds click event listener to each image
    lbImg.src = img.src; // just copies the image url to the big image
    lbImg.alt = img.alt || ''; // copies alt text or makes it blank if no alt text
    lbCap.textContent = img.alt || ''; // copies caption text or makes it blank if no alt text
    lb.classList.add('open'); // adds the open class to lightbox so css can make it visible
    lb.setAttribute('aria-hidden', 'false'); // accessibility, tells screen readers it's visible now
  });
});

function showImage(index) { // function to show image based on index
  const img = images[index]; // gets the image at the specified index
  lbImg.src = img.src; // sets the lightbox image source
  lbImg.alt = img.alt || ''; // sets the alt text
  lbCap.textContent = img.alt || ''; // sets the caption text
}

nextBtn.addEventListener('click', e => { // click behavior for next button
  e.stopPropagation(); // stops the click from bubbling up to the lightbox container
  currentIndex = (currentIndex + 1) % images.length; // increments index and wraps around if at end
  showImage(currentIndex); // shows the image at the new index
});

prevBtn.addEventListener('click', e => { // click behavior for previous button
  e.stopPropagation(); // stops the click from bubbling up to the lightbox container
  currentIndex = (currentIndex - 1 + images.length) % images.length; // decrements index and wraps around if at start
  showImage(currentIndex); // shows the image at the new index
});

lb.addEventListener('click', e => { // click behavior for lightbox
  if (e.target === lb || e.target.classList.contains('close')) closeLB(); // if they click the overlay or the close button, close the lightbox
});

document.addEventListener('keydown', e => { // keydown behavior for whole document
  if (e.key === 'Escape' && lb.classList.contains('open')) closeLB(); // if they press escape and the lightbox is open, close the lightbox
  if (e.key === 'ArrowRight' && lb.classList.contains('open')) { // if they press right arrow and the lightbox is open
    currentIndex = (currentIndex + 1) % images.length; // increments index and wraps around if at end
    showImage(currentIndex); // shows the image at the new index
  }
  if (e.key === 'ArrowLeft' && lb.classList.contains('open')) { // if they press left arrow and the lightbox is open
    currentIndex = (currentIndex - 1 + images.length) % images.length; // decrements index and wraps around if at start
    showImage(currentIndex); // shows the image at the new index
  }
}); // these brackets are vital in the arrowkeys working

function closeLB() { // function to close the lightbox
  lb.classList.remove('open'); // removes the open class so css can hide it
  lb.setAttribute('aria-hidden', 'true'); // accessibility, tells screen readers it's hidden now
  lbImg.src = ''; // clear the image src so old image doesn't flash if new image is slow to load
}
