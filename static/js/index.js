// Пример простого скрипта для переключения страниц
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = this.getAttribute('href');
  });
});

//sing_on_btn
const sing_on = document.getElementsByClassName('.sing_in_btn');

if (sing_on){
  sing_on.addEventListener('click',() => {
    // Проверяем текущее состояние кнопки
    if (startButton.classList.contains('start') || (!startButton.classList.contains('started') && !startButton.classList.contains('stop') && !startButton.classList.contains('stopping'))) {


      startButton.classList.add('started'); // Добавляем класс started
      window.pywebview.api.start_button(1);
    }
  });
};
