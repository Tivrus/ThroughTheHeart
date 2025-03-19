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