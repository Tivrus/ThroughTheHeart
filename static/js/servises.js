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




// Получаем элементы
const openFormButton = document.querySelector('.cta-btn');
const formSection = document.querySelector('.form-section');
const formContainer = document.querySelector('.form-container');
const alphaBackground = document.querySelector('.alpha-background');
const middleFormBtn = document.querySelector('.cta-btn.pulse')
// Функция для открытия формы
function openForm() {
  formSection.classList.remove('hidden'); // Показываем форму
  formContainer.classList.remove('hidden'); // Показываем форму
  alphaBackground.classList.remove('hidden'); // Показываем форму
  formSection.classList.add('show'); // Показываем форму
  formContainer.classList.add('show'); // Показываем форму
  alphaBackground.classList.add('show'); // Показываем форму
}

// Функция для закрытия формы
function closeForm() {
  formSection.classList.remove('show'); // Показываем форму
  formContainer.classList.remove('show'); // Показываем форму
  alphaBackground.classList.remove('show'); // Показываем форму
  formSection.classList.add('hidden'); // Скрываем форму
  formContainer.classList.add('hidden'); // Скрываем форму
  alphaBackground.classList.add('hidden');
}

// Открываем форму по клику на кнопку
if (openFormButton) {
    openFormButton.addEventListener('click', openForm);
}

if (middleFormBtn) {
  middleFormBtn.addEventListener('click', openForm);
}
// Закрываем форму по клику на полупрозрачный фон
if (alphaBackground) {
    alphaBackground.addEventListener('click', closeForm);
}

// Закрываем форму при нажатии клавиши Escape
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeForm();
    }
});


// Находим изображение
const image = document.querySelector('.service-item img');

// Добавляем обработчик клика
image.addEventListener('click', () => {
  // Переключаем класс 'clear' для изображения
  image.classList.toggle('clear');
});