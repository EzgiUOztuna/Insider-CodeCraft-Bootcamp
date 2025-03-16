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
