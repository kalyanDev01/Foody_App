var storedVal = [];
let bulkCart = JSON.parse(localStorage.getItem('bulkCart')) || [];
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
  if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
  } else {
    navLinks.style.display = "flex";
  }
});
function orderPlaced() {
  alert("Your order is placed ✅");
}
function addToBulkOrders(obj) {
    let itemName = obj.target.textContent;
    let arr = itemName.split("₹");
    console.log(arr);
    itemName = arr[0];
    let amount = arr[1].split("/");
    amount = parseFloat(amount[0]);
    console.log(`Adding: ${itemName} - ₹${amount}/kg`);
    addToFlex(itemName, amount, 5);
}
function addToFlex(itemName, price, quantity) {
    let existingItem = bulkCart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        bulkCart.push({
            name: itemName,
            price: price,
            quantity: quantity
        });
    }
    
    saveBulkCart();
    updateCartDisplay();
}
function saveBulkCart() {
    localStorage.setItem('bulkCart', JSON.stringify(bulkCart));
}

function updateCartDisplay() {
    const cartDisplay = document.getElementById('bulk-cart-display');
    if (!cartDisplay) return;
    
    let html = '<h3>🛒 Bulk Cart <span id="cart-count">(' + bulkCart.length + ' items)</span></h3>';
    let totalAmount = 0;
    let totalWeight = 0;
    
    bulkCart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        totalWeight += item.quantity;
        
        html += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small>₹${item.price}/kg × ${item.quantity}kg = ₹${itemTotal.toFixed(2)}</small>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">❌ Remove</button>
            </div>
        `;
    });
    
    html += `
        <div class="cart-total">
            <strong>Total Weight: ${totalWeight}kg</strong><br>
            <strong>Total Amount: ₹${totalAmount.toFixed(2)}</strong>
        </div>
    `;
    
    cartDisplay.innerHTML = html;
    
    document.getElementById('itemsRequired').value = bulkCart.map(item => 
        `${item.name} ${item.quantity}kg`).join(', ');
    document.getElementById('amount').value = `₹${totalAmount}`;
}

function removeFromCart(index) {
    bulkCart.splice(index, 1);
    saveBulkCart();
    updateCartDisplay();
}
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();  
});
function submitForm(){
    bulkCart = [];
    localStorage.setItem('bulkCart', JSON.stringify(bulkCart));
    updateCartDisplay();
    alert("Order sent for confirmation");
}

