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

  // === Ответ бота (заготовки) ===
  function replyTo(text) {
    const t = text.toLowerCase();
    let answer = 'Спасибо за сообщение! Я передам его Инне, и она свяжется с Вами.';

    if (t.includes('цен') || t.includes('стоим') || t.includes('сколько')) {
      answer = 'Стоимость сессии - 4 200 ₽ за 60 минут. Есть абонемент на 10 сессий со скидкой 15%.';
    } else if (t.includes('запис') || t.includes('консульт') || t.includes('время')) {
      answer = 'Чтобы записаться, оставьте, пожалуйста, Ваш телефон или Telegram - Инна свяжется с вами в течение 2 часов.';
    } else if (t.includes('онлайн') || t.includes('zoom') || t.includes('скайп')) {
      answer = 'Да, все консультации проходят онлайн - в Zoom или Telegram, в удобное для Вас время.';
    } else if (t.includes('привет') || t.includes('здравств')) {
      answer = 'Здравствуйте! Чем я могу Вам помочь?';
    }

    addMessage(answer, 'bot');
  }
})();






// (function () {
//   'use strict';

//   const toggle = document.getElementById('chat-toggle');
//   const box = document.getElementById('chat-box');
//   const close = document.getElementById('chat-close');
//   const messages = document.getElementById('chat-messages');

//   // Защита: если элементов нет на странице — выходим
//   if (!toggle || !box || !close || !messages) return;

//   let greeted = false;

//   // === Открыть / закрыть чат ===
//   toggle.addEventListener('click', function () {
//     const isOpen = box.classList.contains('open');

//     if (isOpen) {
//       box.classList.remove('open');
//     } else {
//       box.classList.add('open');

//       // Приветствие при первом открытии
//       if (!greeted) {
//         greeted = true;
//         setTimeout(showGreeting, 400);
//       }
//     }
//   });

//   // === Закрыть по крестику ===
//   close.addEventListener('click', function (e) {
//     e.stopPropagation();
//     box.classList.remove('open');
//   });

//   // === Показать приветствие ===
//   function showGreeting() {
//     const msg = document.createElement('div');
//     msg.className = 'chat-message';
//     msg.textContent = 'Привет! Чем я могу помочь?';
//     messages.appendChild(msg);
//     messages.scrollTop = messages.scrollHeight;
//   }
// })();