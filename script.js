let display = document.getElementById('display');
let expression = '';

function append(value) {
  if (value === '^') {
    expression += '**';
  } else if (value === 'cos(') {
    expression += 'Math.cos(toRadians(';
  } else if (value === 'tan(') {
    expression += 'Math.tan(toRadians(';
  } else if (value === 'sin(') {
    expression += 'Math.sin(toRadians(';
  } else if (value === 'sqrt(') {
    expression += 'Math.sqrt(';
  } else {
    expression += value;
  }
  display.textContent = expression;
}

function clearAll() {
  expression = '';
  display.textContent = '0';
}

function deleteLast() {
  expression = expression.slice(0, -1);
  display.textContent = expression || '0';
}

function calculate() {
  try {
    let result = eval(expression);
    addToHistory(expression + ' = ' + result);
    display.textContent = result;
    expression = result.toString();
  } catch (e) {
    display.textContent = 'Error';
    expression = '';
  }
}

function toRadians(degrees) {
  return degrees * (Math.PI / 180);
}

// Guardar y cargar notas en localStorage
function saveNote() {
  const note = document.getElementById('notepad').value;
  localStorage.setItem('calculator_note', note);
  document.getElementById('note-status').textContent = '¡Guardado!';
  setTimeout(()=>{document.getElementById('note-status').textContent='';}, 1500);
}
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('calculator_note');
  if (saved) document.getElementById('notepad').value = saved;
});

// Registro de secuencias
let historyLog = [];
function addToHistory(entry) {
  historyLog.push(entry);
  if (historyLog.length > 10) historyLog.shift();
  document.getElementById('history-log').innerHTML = historyLog.map(e => `<div>${e}</div>`).join('');
}

// --- AUTOPLAY para videos de YouTube ---
window.addEventListener('DOMContentLoaded', () => {
  // Forzar autoplay en iframes de YouTube (agrega ?autoplay=1&mute=1 si no está)
  document.querySelectorAll('iframe[src*="youtube.com/embed/"]').forEach(iframe => {
    let src = iframe.getAttribute('src');
    if (!src.includes('autoplay=1')) {
      if (src.includes('?')) {
        src += '&autoplay=1&mute=1';
      } else {
        src += '?autoplay=1&mute=1';
      }
      iframe.setAttribute('src', src);
    }
  });
});