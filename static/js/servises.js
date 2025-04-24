
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


// Добавляем обработчик клика на родительский контейнер
document.body.addEventListener('click', (event) => {
  // Проверяем, что клик был по изображению внутри карточки
  const image = event.target.closest('.service-item img');
  
  if (image) {
    // Переключаем класс 'clean' для изображения
    image.classList.toggle('clean');
  }
});




document.addEventListener('DOMContentLoaded', () => {
  // Получаем все кнопки фильтра и карточки
  const filterButtons = document.querySelectorAll('.filter-button');
  const serviceCards = document.querySelectorAll('.service-card');

  // Функция для обновления отображения карточек
  function updateCards() {
    // Получаем список активных категорий
    const activeCategories = Array.from(filterButtons)
      .filter(button => button.getAttribute('data-state') === 'on')
      .map(button => button.getAttribute('data-category'));

    console.log('Активные категории:', activeCategories); // Отладка

    // Проходим по всем карточкам
    serviceCards.forEach(card => {
      // Проверяем наличие атрибута data-categories
      const categoriesAttr = card.getAttribute('data-categories');
      const cardCategories = categoriesAttr ? categoriesAttr.split(' ') : [];

      console.log(`Карточка ${card.querySelector('h2').innerText}:`, cardCategories); // Отладка

      // Если карточка содержит категорию "not", она всегда видима
      if (cardCategories.includes('not')) {
        card.classList.remove('hidden');
        return;
      }

      // Если нет активных категорий, показываем все карточки
      if (activeCategories.length === 0) {
        card.classList.remove('hidden');
        return;
      }

      // Проверяем, соответствует ли карточка хотя бы одной активной категории
      const isVisible = activeCategories.some(category => cardCategories.includes(category));
      card.classList.toggle('hidden', !isVisible);
    });
  }

  // Добавляем обработчики событий для кнопок фильтра
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Переключаем состояние кнопки
      const currentState = button.getAttribute('data-state');
      const newState = currentState === 'on' ? 'off' : 'on';
      button.setAttribute('data-state', newState);

      console.log(`Кнопка ${button.querySelector('span').innerText}:`, newState); // Отладка

      // Обновляем отображение карточек
      updateCards();
    });
  });

  // Инициализация: показываем все карточки
  updateCards();
});