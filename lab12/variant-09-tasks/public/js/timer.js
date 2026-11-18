// Индикатор оставшегося времени сессии (творческое задание)

let timerId = null;

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

// expiresAt - время окончания сессии от сервера, onExpire - что сделать по истечении
function startTimer(expiresAt, onExpire) {
  stopTimer();
  const end = new Date(expiresAt).getTime();

  const tick = () => {
    const left = Math.max(0, Math.round((end - Date.now()) / 1000));
    const mm = String(Math.floor(left / 60)).padStart(2, '0');
    const ss = String(left % 60).padStart(2, '0');
    $('#timer').textContent = 'Сессия закончится через ' + mm + ':' + ss;
    if (left === 0) {
      stopTimer();
      onExpire();
    }
  };

  tick();
  timerId = setInterval(tick, 1000);
}
