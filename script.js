// --- NAVEGACIÓN ---
function showProject(id) {
    document.querySelectorAll('.project-section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// --- P1: CONTADOR ---
let count = localStorage.getItem('count') ? parseInt(localStorage.getItem('count')) : 0;
function updateCounterUI() {
    const el = document.getElementById('counter-val');
    el.innerText = count;
    el.style.color = count > 0 ? "green" : count < 0 ? "red" : "gray";
    localStorage.setItem('count', count);
}
function changeCounter(val) { count += val; updateCounterUI(); }
function resetCounter() { count = 0; updateCounterUI(); }
updateCounterUI();

// --- P2: TO-DO LIST ---
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function renderTasks() {
    const list = document.getElementById('todo-list');
    list.innerHTML = '';
    tasks.forEach((t, i) => {
        list.innerHTML += `<li onclick="toggleTask(${i})" style="${t.done ? 'text-decoration:line-through' : ''}">${t.text} <button onclick="removeTask(${i})">X</button></li>`;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function addTodo() {
    const input = document.getElementById('todo-input');
    if (input.value) { tasks.push({text: input.value, done: false}); input.value = ''; renderTasks(); }
}
function removeTask(i) { tasks.splice(i, 1); renderTasks(); }
function toggleTask(i) { tasks[i].done = !tasks[i].done; renderTasks(); }
renderTasks();

// --- P3: ADIVINA NÚMERO ---
let secretNum, attempts;
function initGuessGame() {
    secretNum = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('attempts').innerText = 0;
    document.getElementById('guess-msg').innerText = "¡Suerte!";
}
function checkGuess() {
    const val = document.getElementById('guess-input').value;
    attempts++;
    document.getElementById('attempts').innerText = attempts;
    const msg = val > secretNum ? "Muy alto" : val < secretNum ? "Muy bajo" : "¡CORRECTO!";
    document.getElementById('guess-msg').innerText = msg;
}
initGuessGame();

// --- P4: CALCULADORA ---
function calcPress(v) { document.getElementById('calc-display').value += v; }
function calcClear() { document.getElementById('calc-display').value = ''; }
function calculate() {
    try {
        let res = eval(document.getElementById('calc-display').value);
        if (res === Infinity) throw "Error";
        document.getElementById('calc-display').value = res;
    } catch { document.getElementById('calc-display').value = "Error"; }
}

// --- P5: COLOR ALEATORIO ---
function changeBgColor() {
    const color = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = color;
    document.getElementById('hex-code').innerText = color;
}
function copyToClipboard(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
    alert("Copiado!");
}

// --- P6: TEMPORIZADOR ---
let timer;
function startTimer() {
    let m = parseInt(document.getElementById('t-min').value || 0);
    let s = parseInt(document.getElementById('t-sec').value || 0);
    let total = m * 60 + s;
    timer = setInterval(() => {
        if (total <= 0) { clearInterval(timer); alert("¡Tiempo terminado!"); }
        total--;
        document.getElementById('timer-display').innerText = `${Math.floor(total/60)}:${total%60}`;
    }, 1000);
}
function pauseTimer() { clearInterval(timer); }

// --- P7: PASSWORD GENERATOR ---
function generatePass() {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById('c-upper').checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById('c-num').checked) chars += "0123456789";
    if (document.getElementById('c-sym').checked) chars += "!@#$%^&*()";
    let pass = "";
    for (let i = 0; i < document.getElementById('pass-len').value; i++) {
        pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    document.getElementById('pass-result').innerText = pass;
}

// --- P8: DARK MODE ---
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');

// --- P9: PIEDRA PAPEL TIJERA ---
let sUser = 0, sPc = 0;
function playRPS(user) {
    const options = ['Piedra', 'Papel', 'Tijera'];
    const pc = options[Math.floor(Math.random() * 3)];
    let res = "";
    if (user === pc) res = "Empate";
    else if ((user === 'Piedra' && pc === 'Tijera') || (user === 'Papel' && pc === 'Piedra') || (user === 'Tijera' && pc === 'Papel')) {
        res = "Ganaste"; sUser++;
    } else { res = "Perdiste"; sPc++; }
    document.getElementById('rps-result').innerText = `PC eligió ${pc}. ${res}`;
    document.getElementById('s-user').innerText = sUser;
    document.getElementById('s-pc').innerText = sPc;
}
function resetRPS() { sUser = 0; sPc = 0; document.getElementById('s-user').innerText = 0; document.getElementById('s-pc').innerText = 0; }

// --- P10: GALERÍA ---
const images = [
    {url: 'https://picsum.photos/id/237/200', cat: 'animal', name: 'Perro'},
    {url: 'https://picsum.photos/id/1012/200', cat: 'animal', name: 'Perro 2'},
    {url: 'https://picsum.photos/id/0/200', cat: 'tech', name: 'Laptop'},
    {url: 'https://picsum.photos/id/1/200', cat: 'tech', name: 'Teclado'}
];
function renderGallery(filter = 'all', search = '') {
    const grid = document.getElementById('gallery-grid');
    grid.innerHTML = '';
    images.forEach(img => {
        if ((filter === 'all' || img.cat === filter) && img.name.toLowerCase().includes(search.toLowerCase())) {
            grid.innerHTML += `<img src="${img.url}" onclick="openModal('${img.url}')">`;
        }
    });
}
function openModal(url) { document.getElementById('modal').style.display='flex'; document.getElementById('modal-img').src=url; }
function filterCat(c) { renderGallery(c); }
function filterGallery() { renderGallery('all', document.getElementById('gallery-search').value); }
renderGallery();