// define an array to store the inventory items
let inventory = [];

// function to update the table
function updateInventoryTable() {
    const inventorytableBody = document.getElementById('inventoryTable').getElementsByTagName('tbody')[0];
    inventorytableBody.innerHTML = ''; // clear the table body before updating

    inventory.forEach((item, index) => {
        let row = inventorytableBody.insertRow();

        // insert product name, quantity, price, and actions
        row.insertCell(0).textContent = item.name;
        row.insertCell(1).textContent = item.quantity;
        row.insertCell(2).textContent = `₹${item.price.toFixed(3)}`;

        // create delete button
        const deletebutton = document.createElement('button');
        deletebutton.classList.add('delete');
        deletebutton.textContent = 'Delete';
        deletebutton.onclick = () => deleteItem(index);

        // insert delete button into the table
        row.insertCell(3).appendChild(deletebutton);
    });
}

// function to handle the form submission
document.getElementById('addProductForm').addEventListener('submit', function (event) {
    event.preventDefault(); // prevent the page from reloading on form submit

    const productName = document.getElementById('productName').value;
    const productQuantity = document.getElementById('productQuantity').value;
    const productPrice = document.getElementById('productPrice').value;

    if (productName && productQuantity && productPrice) {
        const newItem = {
            name: productName,
            quantity: parseInt(productQuantity),
            price: parseFloat(productPrice)
        };

        // add the new item to the inventory array
        inventory.push(newItem);

        // clear the input fields
        document.getElementById('productName').value = '';
        document.getElementById('productQuantity').value = '';
        document.getElementById('productPrice').value = '';

        // update the inventory table
        updateInventoryTable();
    } else {
        alert('Please fill out all fields.');
    }
});

// function to delete an item from the inventory
function deleteItem(index) {
    inventory.splice(index, 1); // remove the item from the array
    updateInventoryTable(); // update the table to reflect changes
}

// initialize the inventory table when the page loads
updateInventoryTable();
