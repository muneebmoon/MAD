// Array to hold cart items
let cart = [];

// Function to add products to the cart
const addToCart = (productId, productName, quantity, price) => {
    const product = { productId, productName, quantity, price };
    cart.push(product);
    displayCart(); // Refresh the cart summary after adding
};

// Function to remove items from the cart by productId
const removeFromCart = (productId) => {
    const productIndex = cart.findIndex(item => item.productId === productId);
    if (productIndex > -1) {
        cart.splice(productIndex, 1); // Remove item
    }
    displayCart(); // Refresh the cart summary after removing
};

// Function to update the quantity of items in the cart
const updateQuantity = (productId, newQuantity) => {
    cart = cart.map(item => 
        item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    displayCart(); // Refresh the cart summary after updating
};

// Function to calculate total cost
const calculateTotalCost = () => {
    return cart.reduce((total, item) => total + item.quantity * item.price, 0);
};

// Function to apply a discount code (Optional Bonus)
const applyDiscount = (discountCode) => {
    const discount = discountCode === 'DISCOUNT10' ? 0.10 : 0; // Example discount code
    return calculateTotalCost() * (1 - discount);
};

// Function to display the cart summary
const displayCart = () => {
    const cartContainer = document.querySelector('.cart');
    const totalAmount = document.querySelector('.total-amount');

    // Clear previous items
    cartContainer.innerHTML = `
        <div class="cart-head">
            <b>Product #</b>
            <b>Product Description</b>
            <b>Price</b>
            <b>Remove Item</b>
        </div>
    `;

    // Display each product
    cart.map((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${index + 1}</p>
            <p>${item.productName}</p>
            <p>$${item.price * item.quantity}</p>
            <a href="javascript:void(0)" style="font-size: 22px;" onclick="removeFromCart(${item.productId})">
                <i class="fa-regular fa-circle-xmark"></i>
            </a>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Update total amount and discount information
    const total = calculateTotalCost();
    totalAmount.innerHTML = `
        <p>Total: $${total}</p>
        <p>10% Discount: <span>$${applyDiscount('DISCOUNT10').toFixed(2)}</span></p>
        <button onclick="checkout()">CheckOut</button>
    `;
};

// Function to filter out items with zero quantity
const filterZeroQuantityItems = () => {
    cart = cart.filter(item => item.quantity > 0);
    displayCart(); // Refresh the cart after filtering
};

// Example checkout function
const checkout = () => {
    alert(`Checkout Total: $${applyDiscount('DISCOUNT10').toFixed(2)}`);
};

// Initial items (can be added via UI interaction in a real app)
addToCart(1, 'Abaya', 2, 10);
addToCart(2, 'Shoes', 1, 50);
addToCart(3, 'Jeans', 3, 30);
