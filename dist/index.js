// Hero Section Animation on Page Load
if (typeof gsap !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

window.addEventListener('load', () => {
  // Fade in hero section
  if (typeof gsap !== 'undefined') {
    gsap.fromTo(
      'section:first-child',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );
  }
});

// Top Bar & Navbar Scroll Behavior
const topBar = document.querySelector('body > div:first-child');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (topBar) {
    const topBarHeight = topBar.offsetHeight;
    if (window.scrollY >= topBarHeight) {
      navbar.style.top = '0';
    } else {
      navbar.style.top = (topBarHeight - window.scrollY) + 'px';
    }
  }
});

// Mobile Menu Toggle with Smooth Animation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const lines = mobileMenuBtn.querySelectorAll('span');

let isMenuOpen = false;

function toggleMenu() {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    // Open menu
    mobileMenu.classList.remove('hidden');
    // Use requestAnimationFrame to ensure the DOM has updated before calculating height
    requestAnimationFrame(() => {
      const menuHeight = mobileMenu.scrollHeight;
      mobileMenu.style.maxHeight = menuHeight + 'px';
    });

    // Animate hamburger to X
    lines[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
    lines[1].style.opacity = '0';
    lines[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
  } else {
    // Close menu
    mobileMenu.style.maxHeight = '0px';
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);

    // Reset hamburger to normal
    lines[0].style.transform = 'none';
    lines[1].style.opacity = '1';
    lines[2].style.transform = 'none';
  }
}

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) {
        toggleMenu();
      }
    });
  });
}

// Partners Carousel Auto-Loop
function initPartnersCarousel() {
  const carousel = document.getElementById('partnersCarousel');
  const container = document.getElementById('carouselContainer');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  if (!carousel || !container) return;

  fetch('./data/partners.json')
    .then(response => response.json())
    .then(partners => {
      // Create partner cards using safe DOM methods
      partners.forEach(partner => {
        const card = document.createElement('div');
        card.className = 'flex-shrink-0 w-full md:w-1/3 lg:w-1/4';

        const cardInner = document.createElement('div');
        cardInner.className = 'bg-gray-50 rounded-lg p-5 flex flex-col items-center justify-center h-32 hover:shadow-lg transition-shadow min-w-max';

        const img = document.createElement('img');
        img.src = partner.logo;
        img.alt = partner.name;
        img.className = 'h-24 w-auto mb-2 object-contain';

        const name = document.createElement('p');
        name.className = 'text-sm font-medium text-center text-gray-800';
        name.textContent = partner.name;

        cardInner.appendChild(img);
        cardInner.appendChild(name);
        card.appendChild(cardInner);

        carousel.appendChild(card);
      });

      // Duplicate cards for seamless loop
      const cards = carousel.querySelectorAll('div.flex-shrink-0');
      const clonedCards = Array.from(cards).map(card => card.cloneNode(true));
      clonedCards.forEach(card => carousel.appendChild(card));

      // Auto-scroll animation
      let scrollPos = 0;
      const speed = 0.5;
      const singleLoopWidth = carousel.scrollWidth / 2;
      const cardWidth = 300; // Approximate width for navigation
      let isRunning = true;
      let animationInterval;

      function startAnimation() {
        animationInterval = setInterval(() => {
          if (isRunning) {
            scrollPos += speed;
            if (scrollPos >= singleLoopWidth) {
              scrollPos = 0;
            }
            carousel.style.transform = `translateX(-${scrollPos}px)`;
          }
        }, 30);
      }

      // Pause on hover
      container.addEventListener('mouseenter', () => {
        isRunning = false;
      });

      container.addEventListener('mouseleave', () => {
        isRunning = true;
      });

      // Manual navigation
      if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
          isRunning = false;
          scrollPos = Math.max(0, scrollPos - cardWidth);
          carousel.style.transform = `translateX(-${scrollPos}px)`;
          setTimeout(() => {
            isRunning = true;
          }, 500);
        });

        nextBtn.addEventListener('click', () => {
          isRunning = false;
          scrollPos += cardWidth;
          if (scrollPos >= singleLoopWidth) {
            scrollPos = 0;
          }
          carousel.style.transform = `translateX(-${scrollPos}px)`;
          setTimeout(() => {
            isRunning = true;
          }, 500);
        });
      }

      startAnimation();
    })
    .catch(error => console.error('Error loading partners:', error));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPartnersCarousel);
} else {
  initPartnersCarousel();
}

// Partner Counter Animation
function initCounterAnimation() {
  const counter = document.getElementById('partnerCounter');
  if (!counter || typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  let hasAnimated = false;

  ScrollTrigger.create({
    trigger: counter,
    onEnter: () => {
      if (!hasAnimated) {
        hasAnimated = true;
        gsap.to(counter, {
          textContent: 50,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 }
        });
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCounterAnimation);
} else {
  initCounterAnimation();
}
