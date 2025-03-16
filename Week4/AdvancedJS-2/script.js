//ÖDEVDE DE RAHAT GÖRÜLEBİLMESİ AÇISINDAN KONSOLDA YAPILAN ÇALIŞMA BURAYA DA YAPILDI. 
//ÖRNEK DATA OLARAK ÖDEV 1'DEN FAYDALANILDI.

const appendLocation = document.querySelector('.container');
const buttonContainer = document.querySelector('.button-container');

//////////////////////////////////////////////////////////////////
async function fetchAndDisplayUsers() {
    try {
        const users = await fetchUsers();
        myLocalStorage.setValue("users", users);
        displayUsers();
    } catch (error) {
        console.error('Hata:', error);
    }
}

function fetchUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json());
}

const fetchedUser = fetchAndDisplayUsers();
//////////////////////////////////////////////////////////////////

//localStorage’da expire süresini farklı bir storage’da tutmayalım.
const myLocalStorage = (() => {
    const storage = {};

    function setValue(key, value, expiryTime) {
        storage[key] = {
            value,
            time: Date.now() + expiryTime,
        };
    }

    function getValue(key) {
        if (!storage[key]) return null;

        if (Date.now() > storage[key].time) {
            delete storage[key];
            return null;
        }
        return storage[key].value;
    }

    function removeValue(key) {
        delete storage[key]; // Veriyi sil
    }

    return {
        setValue,
        getValue,
        removeValue
    };
})();


function displayUsers() {
    const users = myLocalStorage.getValue("users");

    if (users) {
        users.forEach(user => {
            const userElement = document.createElement('div');
            userElement.classList.add('user');
            userElement.innerHTML = `
                <h3>${user.name}</h3>
                <p>${user.email}</p>
                <p>${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
                <button class="delete-btn">Sil</button>
            `;
            appendLocation.appendChild(userElement);

            userElement.querySelector('.delete-btn').addEventListener('click', () => {
                userElement.remove();

                const updatedUsers = users.filter(u => u.id !== user.id);
                myLocalStorage.setValue("users", updatedUsers);

                if (updatedUsers.length === 0) {
                    showReloadButton();
                }
            })
        });
    }
}

//"Verileri Tekrar Çek"
function showReloadButton() {
    const reloadButton = document.createElement('button');
    reloadButton.textContent = "Verileri Tekrar Çek";

    if (!sessionStorage.getItem('buttonClicked')) {
        buttonContainer.appendChild(reloadButton);

        reloadButton.addEventListener('click', () => {
            // Butona tıklanınca, butonun tıklanmış olduğunu sessionStorage'da kaydediyoruz
            sessionStorage.setItem('buttonClicked', 'true');

            // Butonu devre dışı bırak
            reloadButton.disabled = true;

            fetchAndDisplayUsers();
        });
    } else {
        console.log('Buton zaten kullanıldı.');
    }
}

//MutationObserver
const observer = new MutationObserver(mutations => {
    const users = appendLocation.querySelectorAll('.user');
    if (users.length === 0) {
        showReloadButton();
    }
});
observer.observe(appendLocation, { childList: true });


//CSS
const style = document.createElement('style');
style.innerHTML = `
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .user {
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 10px;
    }
`;
document.head.appendChild(style);