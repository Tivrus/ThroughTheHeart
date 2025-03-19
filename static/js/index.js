// Пример простого скрипта для переключения страниц
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = this.getAttribute('href');
  });
});


// Получаем элементы
const openFormButton = document.querySelector('.open-form-btn');
const formSection = document.querySelector('.form-section');
const formContainer = document.querySelector('.form-container');
const alphaBackground = document.querySelector('.alpha-background');
const middleFormBtn = document.querySelector('.btn_form')
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