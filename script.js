// DATABASE - প্রতিটি ক্যাটাগরিতে আলাদা পণ্য
let products = [
    { id: 1, name: "iPhone 15 Pro Max", price: 159999, oldPrice: 179999, image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&w=400", desc: "A17 চিপ, 48MP ক্যামেরা, টাইটানিয়াম বডি", category: "mobiles" },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 144999, oldPrice: 164999, image: "https://images.pexels.com/photos/4042800/pexels-photo-4042800.jpeg?auto=compress&w=400", desc: "AI স্পেস, 200MP ক্যামেরা", category: "mobiles" },
    { id: 3, name: "OnePlus 12", price: 74999, oldPrice: 89999, image: "https://images.pexels.com/photos/1450739/pexels-photo-1450739.jpeg?auto=compress&w=400", desc: "Snapdragon 8 Gen 3", category: "mobiles" },
    { id: 4, name: "Google Pixel 8 Pro", price: 119999, oldPrice: 134999, image: "https://images.pexels.com/photos/4042800/pexels-photo-4042800.jpeg?auto=compress&w=400", desc: "বেস্ট ক্যামেরা ফোন", category: "mobiles" },
    
    { id: 5, name: "MacBook Pro M3", price: 189999, oldPrice: 209999, image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&w=400", desc: "M3 চিপ, 18GB র্যাম", category: "laptops" },
    { id: 6, name: "Dell XPS 15", price: 169999, oldPrice: 189999, image: "https://images.pexels.com/photos/7970309/pexels-photo-7970309.jpeg?auto=compress&w=400", desc: "OLED ডিসপ্লে, RTX 4060", category: "laptops" },
    { id: 7, name: "ASUS ROG Strix", price: 179999, oldPrice: 199999, image: "https://images.pexels.com/photos/7970309/pexels-photo-7970309.jpeg?auto=compress&w=400", desc: "গেমিং ল্যাপটপ", category: "laptops" },
    { id: 8, name: "HP Spectre x360", price: 134999, oldPrice: 154999, image: "https://images.pexels.com/photos/7970309/pexels-photo-7970309.jpeg?auto=compress&w=400", desc: "২-ইন-১ ল্যাপটপ", category: "laptops" },
    
    { id: 9, name: "Nike Air Max", price: 12999, oldPrice: 16999, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=400", desc: "প্রিমিয়াম স্নিকার্স", category: "footwear" },
    { id: 10, name: "Adidas Ultraboost", price: 14999, oldPrice: 18999, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=400", desc: "কমফর্টেবল রানিং শু", category: "footwear" },
    
    { id: 11, name: "Premium Leather Jacket", price: 8999, oldPrice: 12999, image: "https://images.pexels.com/photos/7679742/pexels-photo-7679742.jpeg?auto=compress&w=400", desc: "পুরুষদের লেদার জ্যাকেট", category: "fashion" },
    { id: 12, name: "Designer Hoodie", price: 3499, oldPrice: 5999, image: "https://images.pexels.com/photos/9958088/pexels-photo-9958088.jpeg?auto=compress&w=400", desc: "কটন হুডি", category: "fashion" },
    
    { id: 13, name: "Sony WH-1000XM5", price: 34999, oldPrice: 44999, image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=400", desc: "নয়েজ ক্যান্সলিং হেডফোন", category: "gadgets" },
    { id: 14, name: "Apple AirPods Pro 2", price: 23999, oldPrice: 28999, image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=400", desc: "একটিভ নয়েজ ক্যান্সলিং", category: "gadgets" },
    { id: 15, name: "Samsung Galaxy Watch 6", price: 31999, oldPrice: 39999, image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=400", desc: "স্মার্ট ওয়াচ", category: "gadgets" },
    { id: 16, name: "Xiaomi Smart Band 8", price: 3499, oldPrice: 4999, image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=400", desc: "ফিটনেস ট্র্যাকার", category: "gadgets" }
];

let cart = [];
let currentUser = null;
let currentSlide = 0;
let slideInterval;

// DOM Elements
function showToast(msg) {
    let toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function updateCartBadge() {
    let total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').innerText = total;
    renderCart();
}

function addToCart(product) {
    let exist = cart.find(item => item.id === product.id);
    if (exist) exist.quantity++;
    else cart.push({ ...product, quantity: 1 });
    updateCartBadge();
    showToast(`${product.name} কার্টে যোগ হয়েছে ✅`);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartBadge();
    renderCart();
    showToast('পণ্য সরানো হয়েছে');
}

function renderCart() {
    let cartDiv = document.getElementById('cartItems');
    let total = 0;
    if (cart.length === 0) {
        cartDiv.innerHTML = '<div class="empty-cart">কার্ট খালি 🛒</div>';
        document.getElementById('cartTotal').innerText = '0';
        return;
    }
    let html = '';
    cart.forEach(item => {
        total += item.price * item.quantity;
        html += `<div class="admin-item" style="margin:10px 0">
            <div><strong>${item.name}</strong><br>৳${item.price} x ${item.quantity}</div>
            <button onclick="removeFromCart(${item.id})" style="background:#f97316;border:none;padding:8px 15px;border-radius:20px;color:white;cursor:pointer">🗑️</button>
        </div>`;
    });
    cartDiv.innerHTML = html;
    document.getElementById('cartTotal').innerText = total;
}

function renderProducts(filter = '') {
    let grid = document.getElementById('productsGrid');
    let filtered = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.category.includes(filter));
    grid.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="openSingleProduct(${p.id})">
            <img class="product-img" src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div><span class="price-current">৳${p.price.toLocaleString()}</span> <span class="price-old">৳${p.oldPrice.toLocaleString()}</span></div>
                <div class="btn-group">
                    <button class="btn-cart" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})"><i class="fas fa-cart-plus"></i> কার্ট</button>
                    <button class="btn-buy" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')}); document.getElementById('cartBtn').click();">কিনুন</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCategories() {
    let cats = ['mobiles', 'laptops', 'fashion', 'gadgets', 'footwear'];
    let catNames = { mobiles: '📱 মোবাইল', laptops: '💻 ল্যাপটপ', fashion: '👕 ফ্যাশন', gadgets: '🎧 গ্যাজেট', footwear: '👟 ফুটওয়্যার' };
    let grid = document.getElementById('categoriesGrid');
    grid.innerHTML = cats.map(cat => `
        <div class="category-card" onclick="filterByCategory('${cat}')">
            <i class="fas ${cat === 'mobiles' ? 'fa-mobile-alt' : cat === 'laptops' ? 'fa-laptop-code' : cat === 'fashion' ? 'fa-tshirt' : cat === 'gadgets' ? 'fa-headphones' : 'fa-shoe-prints'}"></i>
            <span>${catNames[cat]}</span>
        </div>
    `).join('');
}

window.filterByCategory = function(cat) {
    let filtered = products.filter(p => p.category === cat);
    let grid = document.getElementById('productsGrid');
    grid.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="openSingleProduct(${p.id})">
            <img class="product-img" src="${p.image}"><div class="product-info"><div class="product-title">${p.name}</div><div><span class="price-current">৳${p.price}</span> <span class="price-old">৳${p.oldPrice}</span></div><div class="btn-group"><button class="btn-cart" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})">কার্ট</button><button class="btn-buy" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')}); document.getElementById('cartBtn').click();">কিনুন</button></div></div></div>
    `).join('');
};

window.openSingleProduct = function(id) {
    let p = products.find(pr => pr.id === id);
    if (p) {
        document.getElementById('homePage').style.display = 'none';
        document.getElementById('adminPage').style.display = 'none';
        let singleDiv = document.getElementById('singlePage');
        singleDiv.style.display = 'block';
        singleDiv.innerHTML = `
            <div class="single-container">
                <div class="single-img"><img src="${p.image}" alt="${p.name}"></div>
                <div><h1>${p.name}</h1><p class="single-price">৳${p.price.toLocaleString()} <del>৳${p.oldPrice.toLocaleString()}</del></p><p><strong>বিবরণ:</strong> ${p.desc || 'প্রিমিয়াম কোয়ালিটি পণ্য'}</p><div class="btn-group" style="margin-top:30px"><button class="btn-cart" onclick="addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})">কার্টে যোগ দিন</button><button class="btn-buy" onclick="addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')}); document.getElementById('cartBtn').click();">এখনই কিনুন</button></div><button onclick="backToHome()" style="margin-top:20px;background:#e2e8f0
