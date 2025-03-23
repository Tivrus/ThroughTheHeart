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



// Выбираем все карточки услуг
const cards = document.querySelectorAll('.service-item');

// Функция для открытия формы
function openCardForm(priceElement) {
  priceElement.classList.remove('opened'); // Убираем класс "opened"
  priceElement.classList.add('closed');    // Добавляем класс "closed"
}

// Функция для закрытия формы
function closeCardForm(priceElement) {
  priceElement.classList.remove('closed'); // Убираем класс "closed"
  priceElement.classList.add('opened');    // Добавляем класс "opened"
}

// Перебираем все карточки
cards.forEach(card => {
  const price = card.querySelector('.price'); // Находим элемент с ценой внутри текущей карточки

  // Добавляем обработчик события mouseover (наведение мыши)
  card.addEventListener('mouseover', () => {
    openCardForm(price);
  });

  // Добавляем обработчик события mouseout (уход курсора)
  card.addEventListener('mouseout', () => {
    closeCardForm(price);
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultationForm');
  const successMessage = document.querySelector('.success-message');

  form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Собираем данные формы
      const formData = new FormData(form);

      // Отправляем данные на сервер
      const response = await fetch('/submit_form', {
          method: 'POST',
          body: formData,
      });

      const result = await response.json();

      if (result.status === 'success') {
          // Показываем сообщение об успехе
          successMessage.classList.remove('hidden');
          form.reset();
      } else {
          alert(result.message);
      }
  });
});