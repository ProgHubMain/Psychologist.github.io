(function () {
  'use strict';

  const toggle = document.getElementById('chat-toggle');
  const box = document.getElementById('chat-box');
  const close = document.getElementById('chat-close');
  const messages = document.getElementById('chat-messages');
  const input = document.getElementById('chat-input');

  if (!toggle || !box || !close || !messages || !input) return;

  let greeted = false;

  // === Открыть / закрыть чат ===
  toggle.addEventListener('click', function () {
    const isOpen = box.classList.contains('open');
    if (isOpen) {
      box.classList.remove('open');
    } else {
      box.classList.add('open');
      if (!greeted) {
        greeted = true;
        setTimeout(showGreeting, 400);
      }
      setTimeout(() => input.focus(), 500);
    }
  });

  close.addEventListener('click', function (e) {
    e.stopPropagation();
    box.classList.remove('open');
  });

  // === Отправка сообщения ===
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && input.value.trim() !== '') {
      const text = input.value.trim();
      addMessage(text, 'user');
      input.value = '';
      setTimeout(() => replyTo(text), 600);
    }
  });

  // === Приветствие ===
  function showGreeting() {
    addMessage('Привет! Чем я могу помочь?', 'bot');
  }

  // === Добавить сообщение в чат ===
  function addMessage(text, from) {
    const msg = document.createElement('div');
    msg.className = 'chat-message ' + (from === 'user' ? 'user' : 'bot');
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

    // === Ответ бота через GigaChat ===
  function replyTo(text) {
    const t = text.toLowerCase();

    // Быстрые локальные ответы (оставляем для скорости и точности)
    if (t.includes('цен') || t.includes('стоим') || t.includes('сколько')) {
      addMessage('Стоимость сессии - 4 200 ₽ за 60 минут. Есть абонемент на 10 сессий со скидкой 15%.', 'bot');
      return;
    }
    if (t.includes('запис') || t.includes('консульт') || t.includes('время')) {
      addMessage('Чтобы записаться, оставьте, пожалуйста, Ваш телефон или Telegram - Инна свяжется с вами в течение 2 часов.', 'bot');
      return;
    }
    if (t.includes('онлайн') || t.includes('zoom') || t.includes('скайп')) {
      addMessage('Да, все консультации проходят онлайн - в Zoom или Telegram, в удобное для Вас время.', 'bot');
      return;
    }
    if (t.includes('привет') || t.includes('здравств')) {
      addMessage('Здравствуйте! Чем я могу Вам помочь?', 'bot');
      return;
    }

    // Всё остальное — в GigaChat через наш прокси
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    })
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      addMessage(data.reply, 'bot');
    })
    .catch(error => {
      console.error('Ошибка чата:', error);
      addMessage('Извините, произошла ошибка. Попробуйте позже.', 'bot');
    });
  }
})();