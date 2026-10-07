const noteInput = document.querySelector('#noteInput');
const addNoteBtn = document.querySelector('#addNoteBtn');
const notesList = document.querySelector('#notesList');

addNoteBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    if (text === '') return;

    const li = document.createElement('li');
    li.textContent = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    li.append(deleteBtn);
    notesList.append(li);
    noteInput.value = '';
});