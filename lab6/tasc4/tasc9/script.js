const productInput = document.querySelector('#productInput');
const addProductBtn = document.querySelector('#addProductBtn');
const productList = document.querySelector('#productList');

addProductBtn.addEventListener('click', () => {
    const name = productInput.value.trim();
    if (name === '') return;

    const li = document.createElement('li');
    
    const spanName = document.createElement('span');
    spanName.textContent = name;
    
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'controls';

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    
    const countSpan = document.createElement('span');
    countSpan.textContent = '1';
    
    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.className = 'delete-btn';

    plusBtn.addEventListener('click', () => {
        let count = parseInt(countSpan.textContent);
        countSpan.textContent = count + 1;
    });

    minusBtn.addEventListener('click', () => {
        let count = parseInt(countSpan.textContent);
        if (count > 1) {
            countSpan.textContent = count - 1;
        }
    });

    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    controlsDiv.append(minusBtn, countSpan, plusBtn, deleteBtn);
    li.append(spanName, controlsDiv);
    productList.append(li);
    productInput.value = '';
});