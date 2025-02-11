// Define an array to store the inventory items
let inventory = [];

// Function to update the table
function updateInventoryTable() {
    const inventoryTableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    inventoryTableBody.innerHTML = ''; // Clear the table body before updating

    inventory.forEach((item, index) => {
        let row = inventoryTableBody.insertRow();

        // Insert product name, quantity, price, and actions
        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = `₹${item.price.toFixed(3)}`;
        
        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteItem(index);

        // Insert delete button into the table
        row.insertCell(3).appendChild(deleteButton);
    });
}

// Function to handle the form submission
document.getElementById('addProductForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the page from reloading on form submit

    const productName = document.getElementById('productName').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productPrice = document.getElementById('productPrice').value;

    if (productName && productQuantity && productPrice) {
        const newItem = {
            name: productName,
            quantity: parseInt(productQuantity),
            price: parseFloat(productPrice)
        };

        // Add the new item to the inventory array
        inventory.push(newItem);

        // Clear the input fields
        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
        document.getElementById('productPrice').value = '';

        // Update the inventory table
        updateInventoryTable();
    } else {
        alert('Please fill out all fields.');
    }
});

// Function to delete an item from the inventory
function deleteItem(index) {
    inventory.splice(index, 1); // Remove the item from the array
    updateInventoryTable(); // Update the table to reflect changes
}

// Initialize the inventory table when the page loads
updateInventoryTable();
