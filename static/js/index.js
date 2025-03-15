// Пример простого скрипта для переключения страниц
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    window.location.href = this.getAttribute('href');
  });
});


document.getElementById('consultationForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    surname: document.getElementById('surname').value,
    phone: document.getElementById('phone').value,
    comment: document.getElementById('comment').value
  };

  try {
    const response = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      document.querySelector('.success-message').classList.remove('hidden');
      document.getElementById('consultationForm').reset();
      setTimeout(() => {
        document.querySelector('.success-message').classList.add('hidden');
      }, 3000);
    }
  } catch (error) {
    console.error('Ошибка отправки:', error);
  }
});
