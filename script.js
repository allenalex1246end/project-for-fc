// Define an array to store inventory items
let inventory = [];

// Function to update the table
function updateInventoryTable() {
    const inventoryTableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    inventoryTableBody.innerHTML = ''; // Clear table before updating

    inventory.forEach((item, index) => {
        let row = inventoryTableBody.insertRow();

        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = `₹${item.price.toFixed(2)}`;

        // Create Buy button
        const buyButton = document.createElement('button');
        buyButton.textContent = 'Buy';
        buyButton.classList.add('buy');
        buyButton.onclick = () => buyItem(index);

        // Create Sell button
        const sellButton = document.createElement('button');
        sellButton.textContent = 'Sell';
        sellButton.classList.add('sell');
        sellButton.onclick = () => sellItem(index);

        // Create Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteItem(index);

        // Insert buttons into the table
        let actionCell = row.insertCell(3);
        actionCell.appendChild(buyButton);
        actionCell.appendChild(sellButton);
        actionCell.appendChild(deleteButton);
    });
}

// Function to handle the form submission
document.getElementById('addProductForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productPrice = document.getElementById('productPrice').value;

    if (productName && productQuantity && productPrice) {
        const newItem = {
            name: productName,
            quantity: parseInt(productQuantity),
            price: parseFloat(productPrice)
        };

        inventory.push(newItem);

        // Clear input fields
        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
        document.getElementById('productPrice').value = '';

        // Update inventory table
        updateInventoryTable();
    } else {
        alert('Please fill out all fields.');
    }
});

// Function to buy an item (increase quantity)
function buyItem(index) {
    const quantityToAdd = prompt("Enter quantity to buy:");
    if (quantityToAdd && !isNaN(quantityToAdd) && quantityToAdd > 0) {
        inventory[index].quantity += parseInt(quantityToAdd);
        updateInventoryTable();
    } else {
        alert("Invalid quantity.");
    }
}

// Function to sell an item (decrease quantity)
function sellItem(index) {
    const quantityToSell = prompt("Enter quantity to sell:");
    if (quantityToSell && !isNaN(quantityToSell) && quantityToSell > 0) {
        if (inventory[index].quantity >= quantityToSell) {
            inventory[index].quantity -= parseInt(quantityToSell);
            updateInventoryTable();
        } else {
            alert("Not enough stock available!");
        }
    } else {
        alert("Invalid quantity.");
    }
}

// Function to delete an item from inventory
function deleteItem(index) {
    inventory.splice(index, 1);
    updateInventoryTable();
}

// Initialize inventory table when the page loads
updateInventoryTable();
