// Mobile Menu Toggle with Smooth Animation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');

    if (isHidden) {
      // Open menu
      mobileMenu.classList.remove('hidden');
      // Get the actual height of the menu content
      const menuHeight = mobileMenu.scrollHeight;
      mobileMenu.style.maxHeight = menuHeight + 'px';
    } else {
      // Close menu
      mobileMenu.style.maxHeight = '0px';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300); // Match the CSS transition duration
    }
  });

  // Close menu when a link is clicked
  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.maxHeight = '0px';
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);
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

// Hamburger Icon Animation (rotate lines on toggle)
if (mobileMenuBtn) {
  const lines = mobileMenuBtn.querySelectorAll('span');
  mobileMenuBtn.addEventListener('click', () => {
    lines.forEach((line, index) => {
      if (mobileMenu.classList.contains('hidden')) {
        // Reset animation
        line.style.transform = 'none';
        line.style.opacity = '1';
      } else {
        // Animate hamburger to X
        if (index === 0) line.style.transform = 'rotate(45deg) translate(8px, 8px)';
        if (index === 1) line.style.opacity = '0';
        if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -7px)';
      }
    });
  });
}
