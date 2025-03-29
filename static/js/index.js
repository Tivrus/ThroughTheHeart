// Анимация загрузки
window.addEventListener('load', () => {
  document.querySelector('.preloader').classList.add('fade-out');
  setTimeout(() => {
      document.querySelector('.preloader').style.display = 'none';
  }, 1000);
});

// Адаптивное меню
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Параллакс эффект
document.addEventListener('mousemove', (e) => {
  const elements = document.querySelectorAll('.parallax');
  elements.forEach(element => {
      const speed = element.getAttribute('data-speed');
      const x = (window.innerWidth - e.pageX * speed)/100;
      const y = (window.innerHeight - e.pageY * speed)/100;
      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
});

// Анимация карточек
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
  });
});



document.getElementById('contacts').addEventListener('click', function (event) {

  const target = document.getElementById('contacts-section'); // Находим целевой элемент
  const offset = target.offsetTop; // Получаем позицию элемента относительно верха страницы

  // Плавная прокрутка
  window.scrollTo({
      top: offset,
      behavior: 'smooth'
  });
});