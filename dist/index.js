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
    const menuHeight = mobileMenu.scrollHeight;
    mobileMenu.style.maxHeight = menuHeight + 'px';

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

  // Update menu height on window resize
  window.addEventListener('resize', () => {
    if (!mobileMenu.classList.contains('hidden')) {
      const menuHeight = mobileMenu.scrollHeight;
      mobileMenu.style.maxHeight = menuHeight + 'px';
    }
  });
}
