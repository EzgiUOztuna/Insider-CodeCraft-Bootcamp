const container = document.querySelector('.ins-api-users');

// Fetch API call
function fetchUsers() {  //Promise oluşturdum.
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/users ')
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
    })
}

fetchUsers() //Promise'i kullanarak veriyi yönettim.
    .then(users => console.log(users)) //Veriyi işle
    .catch(error => console.error('Hata:', error)); // Hata yakala


//LocalStorage'a veri kaydetme
function saveToLocalStorage(users) {
    const data = { users, timestamp: new Date().getTime() };
    localStorage.setItem('users', JSON.stringify(data));
}

//LocalStorage'dan veri çekme
function getFromLocalStorage() {
    const data = localStorage.getItem('users');
    if (data) {
        const parsedData = JSON.parse(data);
        const currentDate = new Date().getTime();
        if (currentDate - parsedData.timestamp < 24 * 60 * 60 * 1000) { // 1 günden geçenlerin data'yı yeniden çekmesi
            return parsedData.users;
        }
    }
    return null;
}