document.getElementById('consultationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const form = event.target;
    const formData = new FormData(form);

    // Преобразуем данные формы в объект
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Отправляем данные в Google Sheets
    fetch('https://script.google.com/macros/s/AKfycbyDPpymtGnTNkl6asddAJjbx8PE7MBFEDZeZLyh9nP1sEH1WDe8ntJhTPI5LQ1Bm5JB/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Очистка формы и показ сообщения об успешной отправке
            form.reset();
            document.querySelector('.success-message').classList.remove('hidden');
        } else {
            console.error('Ошибка при отправке:', result.message);
        }
    })
    .catch(error => {
        console.error('Произошла ошибка:', error);
    });
});