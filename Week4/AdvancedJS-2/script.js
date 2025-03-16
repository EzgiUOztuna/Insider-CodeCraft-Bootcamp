const appendLocation = document.querySelector('.container');

// Fetch API call
function fetchUsers() {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
}

fetchUsers()
    .then(users => {
        myLocalStorage.setValue("users", users, 60000);
        displayUsers();
    })
    .catch(error => console.error('Hata:', error)); // Hata yakala


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

    return {
        setValue,
        getValue,
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
            `;
            appendLocation.appendChild(userElement);
        });
    }
}

/*
function deleteUsers() {
    const deletedUsers = myLocalStorage.getValue("users");

    if (deletedUsers) {
        myLocalStorage.setValue("users", [], 60000); // Sıfırla
    }
    appendLocation.innerHTML = ''; // Tüm elemanları sil
    console.log('Kullanıcılar silindi');


}
*/

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