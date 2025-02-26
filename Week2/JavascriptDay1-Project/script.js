/*
let name = prompt("What is your name?");
let age = prompt("What is your age?");
let job = prompt("What is your job?");
console.log("User Information: {name: " + name + ", age: " + age + ", job: " + job + "}");
*/


let basket = [];

while (true) {
    let choice = prompt("To add product write 'Add', to list products write 'List', to remove write 'Remove', to exit write 'Exit'").trim().toLowerCase();

    if (choice === 'add') {
        let add = prompt("Write your product you would like to add to your basket: ").trim();
        let price = prompt("Price of the product: ").trim();

        if (!Number(price) || price === "") {
            console.log("Invalid price! Please enter a valid number.");
            continue;
        }

        basket.push({ product: add, price: Number(price) });
        console.log(`${add} added to the basket. Price: ${price}`);
    } else if (choice === 'list') {
        if (basket.length === 0) {
            console.log("Basket is empty.");
        } else {
            console.log("Your basket contains:");
            basket.forEach((item, index) => {
                console.log(`${index + 1}. ${item.product} - Price: ${item.price}`);
            });
            const totalPrice = basket.reduce((acc, item) => acc + item.price, 0);
            console.log(`Total Price: ${totalPrice}`);
        }
    } else if (choice === 'remove') {
        let remove = prompt("Which product would you like to remove from your basket?").trim();
        const index = basket.findIndex(item => item.product.toLowerCase() === remove.toLowerCase());

        if (index === -1) {
            console.log("Product not found in the basket.");
        } else {
            basket.splice(index, 1);
            console.log(`${remove} removed from the basket.`);
        }
    }
    else if (choice === 'exit') {
        console.log("Your basket has been saved. Exiting...");
        break;
    }
    else {
        console.log("Invalid choice. Please try again.");
    }
}

