// Mobile nav toggle
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
menuBtn.addEventListener('click', () => {
  // Toggle visibility of the mobile navigation menu
  mobileNav.classList.toggle('hidden');
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    // Prevent default behavior of anchor links
    e.preventDefault();
    // Scroll smoothly to the target section
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    // Hide mobile navigation if it's open
    if (!mobileNav.classList.contains('hidden')) {
      mobileNav.classList.add('hidden');
    }
  });
});

// Section reveal on scroll
// Observer for revealing sections when they are scrolled into view
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add classes to make the element visible
      entry.target.classList.add('opacity-100', 'translate-y-0');
      // Stop observing the element as it is already revealed
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Apply the observer to all elements with the 'reveal' class
document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// Dark/Light mode toggle and persistence
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  // Toggle between dark and light mode
  document.documentElement.classList.toggle('dark');
  // Save the current theme in local storage
  localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
});

// On load: set theme based on local storage or system preference
if (
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  // Apply dark mode
  document.documentElement.classList.add('dark');
} else {
  // Apply light mode
  document.documentElement.classList.remove('dark');
}
