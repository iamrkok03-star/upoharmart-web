// Sample Data - পরে আমরা এখান থেকে আইটেম ডাইনামিকভাবে দেখাবো
const products = [
    { id: 1, name: "Premium Headphone", price: "$99", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300" },
    { id: 2, name: "Smart Watch", price: "$149", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300" },
    { id: 3, name: "iPhone Case", price: "$25", image: "https://images.unsplash.com/photo-1586953101554-aa69386d3e8a?w=300" },
    { id: 4, name: "Wireless Mouse", price: "$40", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300" }
];

const productGrid = document.getElementById('product-grid');

// ফাংশন যা প্রোডাক্টগুলো পেইজে দেখাবে
function displayProducts() {
    products.forEach(product => {
        const card = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                <button class="btn" style="padding: 8px 15px; font-size: 14px;">Add to Cart</button>
            </div>
        `;
        productGrid.innerHTML += card;
    });
}

displayProducts();