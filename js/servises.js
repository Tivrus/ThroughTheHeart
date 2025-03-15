// Обработка кликов на карточках услуг
document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', () => {
      const service = item.getAttribute('data-service'); // Получаем ID услуги
      if (service === 'ear-piercing') {
        window.location.href = 'services.html#ear-piercing'; // Переход на прайс-лист для пирсинга ушей
      } else if (service === 'nose-piercing') {
        window.location.href = 'services.html#nose-piercing'; // Переход на прайс-лист для пирсинга носа
      } else if (service === 'lip-piercing') {
        window.location.href = 'services.html#lip-piercing'; // Переход на прайс-лист для пирсинга губ
      }
    });
  });