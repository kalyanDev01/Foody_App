var storedVal = [];
let bulkCart = JSON.parse(localStorage.getItem('bulkCart')) || [];
function openHamburger() {
    let headerS1 = document.querySelector('.header_s1');
    headerS1.style.display = "none";

    let headerS2 = document.querySelector('.header_s2');
    headerS2.style.display = "flex";
    headerS2.style.flexDirection = "column";

    let header_s4_mb = document.getElementById("imgHamburger");
    let header_s5_mb = document.getElementById("imgClose");
    header_s4_mb.style.display = "none";
    header_s5_mb.style.display = "block";

    let icon1 = document.getElementById("icon1");
    let icon2 = document.getElementById("icon2");
    let icon3 = document.getElementById("icon3");
    icon1.style.display = "none";
    icon2.style.display = "none";
    icon3.style.display = "none";
}

function closeHamburger() {
    let headerS1 = document.querySelector('.header_s1');
    headerS1.style.display = "";

    let headerS2 = document.querySelector('.header_s2');
    headerS2.style.flexDirection = "row";
    headerS2.style.display = "none";


    let header_s4_mb = document.getElementById("imgHamburger");
    let header_s5_mb = document.getElementById("imgClose");
    header_s4_mb.style.display = "flex";
    header_s5_mb.style.display = "none";

    let icon1 = document.getElementById("icon1");
    let icon2 = document.getElementById("icon2");
    let icon3 = document.getElementById("icon3");
    icon1.style.display = "";
    icon2.style.display = "";
    icon3.style.display = "";

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

