// slides
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function changeSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}
setInterval(changeSlide, 5000);

// animaations
const cards = document.querySelectorAll('.destination-card, .package-card, .team-card');

function revealOnScroll() {
  const triggerPoint = window.innerHeight * 0.85;
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerPoint) {
      card.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
