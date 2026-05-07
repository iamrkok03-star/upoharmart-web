// INITIAL DATA
let products = [
    { id: 1, name: "iPhone 15 Pro Max", price: 159999, oldPrice: 179999, image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&w=400", desc: "A17 Pro চিপ, টাইটানিয়াম ডিজাইন, 48MP ক্যামেরা", category: "মোবাইল" },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: 144999, oldPrice: 164999, image: "https://images.pexels.com/photos/4042800/pexels-photo-4042800.jpeg?auto=compress&w=400", desc: "200MP ক্যামেরা, AI ফিচার্স", category: "মোবাইল" },
    { id: 3, name: "MacBook Pro M3", price: 189999, oldPrice: 209999, image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&w=400", desc: "M3 চিপ, 18GB র্যাম, 512GB SSD", category: "ল্যাপটপ" },
    { id: 4, name: "Sony WH-1000XM5", price: 34999, oldPrice: 44999, image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=400", desc: "নয়েজ ক্যান্সলিং হেডফোন", category: "গ্যাজেট" },
    { id: 5, name: "Apple Watch Ultra 2", price: 89999, oldPrice: 99999, image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&w=400", desc: "টাইটানিয়াম কেস, ডুয়াল ফ্রিকোয়েন্সি GPS", category: "গ্যাজেট" },
    { id: 6, name: "Nike Air Max", price: 12999, oldPrice: 16999, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=400", desc: "প্রিমিয়াম স্নিকার্স", category: "ফুটওয়্যার" },
    { id: 7, name: "Premium Leather Jacket", price: 8999, oldPrice: 12999, image: "https://images.pexels.com/photos/7679742/pexels-photo-7679742.jpeg?auto=compress&w=400", desc: "জেনুইন লেদার জ্যাকেট", category: "ফ্যাশন" },
    { id: 8, name: "ASUS ROG Strix G16", price: 179999, oldPrice: 199999, image: "https://images.pexels.com/photos/7970309/pexels-photo-7970309.jpeg?auto=compress&w=400", desc: "RTX 4060, 16GB র্যাম", category: "ল্যাপটপ" },
    { id: 9, name: "Xiaomi 14 Ultra", price: 114999, oldPrice: 129999, image: "https://images.pexels.com/photos/1450739/pexels-photo-1450739.jpeg?auto=compress&w=400", desc: "লাইকা ক্যামেরা", category: "মোবাইল" },
    { id: 10, name: "Adidas Ultraboost", price: 14999, oldPrice: 18999, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&w=400", desc: "কমফোর্ট রানিং শু", category: "ফুটওয়্যার" },
    { id: 11, name: "Dyson Airwrap", price: 49999, oldPrice: 59999, image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&w=400", desc: "হেয়ার স্টাইলিং টুল", category: "হোম অ্যাপ্লায়েন্স" },
    { id: 12, name: "iPad Pro 12.9", price: 134999, oldPrice: 149999, image: "https://images.pexels.com/photos/4042800/pexels-photo-4042800.jpeg?auto=compress&w=400", desc: "M2 চিপ, লিকুইড রেটিনা ডিসপ্লে", category: "ল্যাপটপ" },
    { id: 13, name: "Designer Hoodie", price: 3499, oldPrice: 5999, image: "https://images.pexels.com/photos/9958088/pexels-photo-9958088.jpeg?auto=compress&w=400", desc: "কটন হুডি, আনিসেক্স", category: "ফ্যাশン" },
    { id: 14, name: "Google Pixel 8 Pro", price: 119999, oldPrice: 134999, image: "https://images.pexels.com/photos/4042800/pexels-photo-4042800.jpeg?auto=compress&w=400", desc: "টেনসর G3, বেস্ট ক্যামেরা", category: "মোবাইল" },
    { id: 15, name: "Bose QC45", price: 29999, oldPrice: 39999, image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&w=400", desc: "ন্যায়েজ ক্যান্সলিং", category: "গ্যাজেট" }
];

let categories = [
    { id: 1, name: "মোবাইল", icon: "fa-mobile-alt" },
    { id: 2, name: "ল্যাপটপ", icon: "fa-laptop-code" },
    { id: 3, name: "ফ্যাশন", icon: "fa-tshirt" },
    { id: 4, name: "গ্যাজেট", icon: "fa-headphones" },
    { id: 5, name: "ফুটওয়্যার", icon: "fa-shoe-prints" },
    { id: 6, name: "হোম অ্যাপ্লায়েন্স", icon: "fa-home" }
];

let cart = [];
let currentUser = null;
let currentSlide = 0;
let slideInterval;

// Helper Functions
function showToast(msg) {
    let toast = document.getElementById('toastNotification');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function saveData() {
    localStorage.setItem('uphormart_products', JSON.stringify(products));
    localStorage.setItem('uphormart_categories', JSON.stringify(categories));
}

function loadData() {
    let savedProducts = localStorage.getItem('uphormart_products');
    let savedCategories = localStorage.getItem('uphormart_categories');
    if (savedProducts) products = JSON.parse(savedProducts);
    if (savedCategories) categories = JSON.parse(savedCategories);
    if (!products.length) saveData();
}

// Cart Functions
function updateCartBadge() {
    let total = cart.reduce((sum, i) => sum + i.quantity, 0);
    document.getElementById('cartCount').innerText = total;
    renderCart();
}

function addToCart(product) {
    let exist = cart.find(i => i.id === product.id);
    if (exist) exist.quantity++;
    else cart.push({ ...product, quantity: 1 });
    updateCartBadge();
    showToast(`${product.name} কার্টে যোগ হয়েছে 🛒`);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartBadge();
    showToast('পণ্য সরানো হয়েছে');
}

function updateQuantity(id, delta) {
    let item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
        updateCartBadge();
    }
}

function renderCart() {
    let cartDiv = document.getElementById('cartItems');
    let total = 0;
    if (cart.length === 0) {
        cartDiv.innerHTML = '<div class="empty-cart">🛒 আপনার কার্ট খালি</div>';
        document.getElementById('cartTotalAmount').innerText = '৳ 0';
        return;
    }
    let html = '';
    cart.forEach(item => {
        total += item.price * item.quantity;
        html += `
            <div class="admin-item">
                <div><strong>${item.name}</strong><br>৳${item.price} x ${item.quantity}</div>
                <div>
                    <button onclick="updateQuantity(${item.id}, -1)" style="background:#f97316;padding:5px 12px;border-radius:20px;border:none;color:white;">-</button>
                    <button onclick="updateQuantity(${item.id}, 1)" style="background:#f97316;padding:5px 12px;border-radius:20px;border:none;color:white;">+</button>
                    <button onclick="removeFromCart(${item.id})" style="background:#dc2626;padding:5px 12px;border-radius:20px;border:none;color:white;">🗑️</button>
                </div>
            </div>
        `;
    });
    cartDiv.innerHTML = html;
    document.getElementById('cartTotalAmount').innerText = `৳ ${total.toLocaleString()}`;
}

// Render Products
function renderProducts(filter = '') {
    let grid = document.getElementById('productsGrid');
    let filtered = products.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.category.toLowerCase().includes(filter.toLowerCase()));
    grid.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="openSingleProduct(${p.id})">
            <img class="product-img" src="${p.image}" alt="${p.name}">
            <div class="product-info">
                <div class="product-title">${p.name}</div>
                <div><span class="price-current">৳${p.price.toLocaleString()}</span> <span class="price-old">৳${p.oldPrice.toLocaleString()}</span></div>
                <div class="btn-group">
                    <button class="btn-cart" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})"><i class="fas fa-cart-plus"></i> কার্ট</button>
                    <button class="btn-buy" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')}); document.getElementById('cartBtn').click();"><i class="fas fa-bolt"></i> কিনুন</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFlashProducts() {
    let flashProducts = products.slice(0, 4);
    let container = document.getElementById('flashProducts');
    if (container) {
        container.innerHTML = flashProducts.map(p => `
            <div class="product-card" onclick="openSingleProduct(${p.id})">
                <img class="product-img" src="${p.image}"><div class="product-info"><div class="product-title">${p.name}</div><div><span class="price-current">৳${p.price}</span> <span class="price-old">৳${p.oldPrice}</span></div><div class="btn-group"><button class="btn-cart" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})">কার্ট</button><button class="btn-buy" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')}); document.getElementById('cartBtn').click();">কিনুন</button></div></div></div>
        `).join('');
    }
}

function renderCategoriesUI() {
    let grid = document.getElementById('categoriesGrid');
    if (grid) {
        grid.innerHTML = categories.map(cat => `
            <div class="category-card" onclick="filterByCategory('${cat.name}')">
                <i class="fas ${cat.icon}"></i><span>${cat.name}</span>
            </div>
        `).join('');
    }
    let catSelect = document.getElementById('prodCategorySelect');
    if (catSelect) {
        catSelect.innerHTML = categories.map(cat => `<option value="${cat.name}">${cat.name}</option>`).join('');
    }
}

function filterByCategory(catName) {
    let filtered = products.filter(p => p.category === catName);
    let grid = document.getElementById('productsGrid');
    grid.innerHTML = filtered.map(p => `
        <div class="product-card" onclick="openSingleProduct(${p.id})">
            <img class="product-img" src="${p.image}"><div class="product-info"><div class="product-title">${p.name}</div><div><span class="price-current">৳${p.price}</span> <span class="price-old">৳${p.oldPrice}</span></div><div class="btn-group"><button class="btn-cart" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})">কার্ট</button><button class="btn-buy" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')}); document.getElementById('cartBtn').click();">কিনুন</button></div></div></div>
    `).join('');
}

// Single Product
window.openSingleProduct = function(id) {
    let p = products.find(pr => pr.id === id);
    if (p) {
        document.getElementById('homePage').style.display = 'none';
        document.getElementById('adminPage').style.display = 'none';
        let singleDiv = document.getElementById('singlePage');
        singleDiv.style.display = 'block';
        singleDiv.innerHTML = `
            <div class="container" style="background:white;border-radius:40px;margin:40px auto;padding:40px">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px">
                    <div><img src="${p.image}" style="width:100%;border-radius:24px"></div>
                    <div><h1>${p.name}</h1><p class="price-current" style="font-size:32px">৳${p.price.toLocaleString()}</p><p><del>৳${p.oldPrice.toLocaleString()}</del></p><p><strong>বিবরণ:</strong> ${p.desc}</p><div class="btn-group" style="margin-top:30px"><button class="btn-cart" onclick="addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})">কার্টে যোগ দিন</button><button class="btn-buy" onclick="addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')}); document.getElementById('cartBtn').click();">এখনই কিনুন</button></div><button onclick="backToHome()" style="margin-top:20px;background:#e2e8f0;padding:10px 20px;border:none;border-radius:40px;cursor:pointer">← হোমে ফিরুন</button></div>
                </div>
            </div>
        `;
    }
};

function backToHome() {
    document.getElementById('homePage').style.display = 'block';
    document.getElementById('singlePage').style.display = 'none';
    document.getElementById('adminPage').style.display = 'none';
}

// Admin Functions
function renderAdminProducts() {
    let listDiv = document.getElementById('adminProductsList');
    listDiv.innerHTML = products.map(p => `
        <div class="admin-item">
            <div><strong>${p.name}</strong> | ৳${p.price} | ${p.category}</div>
            <div class="admin-item-actions">
                <button onclick="editProduct(${p.id})"><i class="fas fa-edit" style="color:#f97316"></i></button>
                <button onclick="deleteProduct(${p.id})"><i class="fas fa-trash" style="color:#dc2626"></i></button>
            </div>
        </div>
    `).join('');
    document.getElementById('totalProducts').innerText = products.length;
}

function renderCategoryAdminList() {
    let listDiv = document.getElementById('categoryList');
    listDiv.innerHTML = categories.map(cat => `
        <div class="admin-item">
            <span><i class="fas ${cat.icon}"></i> ${cat.name}</span>
            <button onclick="deleteCategory(${cat.id})" style="background:#dc2626;color:white;border:none;padding:5px 12px;border-radius:20px">ডিলিট</button>
        </div>
    `).join('');
}

window.deleteCategory = function(id) {
    categories = categories.filter(c => c.id !== id);
    renderCategoryAdminList();
    renderCategoriesUI();
    saveData();
    showToast('ক্যাটাগরি ডিলিট হয়েছে');
};

window.deleteProduct = function(id) {
    products = products.filter(p => p.id !== id);
    renderAdminProducts();
    renderProducts();
    renderFlashProducts();
    saveData();
    showToast('পণ্য ডিলিট হয়েছে');
};

window.editProduct = function(id) {
    let p = products.find(pr => pr.id === id);
    let newName = prompt('নতুন নাম', p.name);
    let newPrice = prompt('নতুন দাম', p.price);
    if (newName) p.name = newName;
    if (newPrice) p.price = Number(newPrice);
    renderAdminProducts();
    renderProducts();
    renderFlashProducts();
    saveData();
    showToast('পণ্য আপডেট হয়েছে');
};

// Add Product
document.getElementById('addProductBtn')?.addEventListener('click', () => {
    let newId = Date.now();
    let newProd = {
        id: newId,
        name: document.getElementById('prodName').value,
        price: Number(document.getElementById('prodPrice').value),
        oldPrice: Number(document.getElementById('prodOldPrice').value),
        image: document.getElementById('prodImage').value,
        desc: document.getElementById('prodDesc').value,
        category: document.getElementById('prodCategorySelect').value
    };
    if (newProd.name && newProd.price) {
        products.push(newProd);
        renderAdminProducts();
        renderProducts();
        renderFlashProducts();
        saveData();
        showToast('নতুন পণ্য যুক্ত হয়েছে ✅');
        document.getElementById('prodName').value = '';
        document.getElementById('prodPrice').value = '';
        document.getElementById('prodOldPrice').value = '';
        document.getElementById('prodImage').value = '';
        document.getElementById('prodDesc').value = '';
    } else showToast('সব ঘর পূরণ করুন');
});

document.getElementById('addCategoryBtn')?.addEventListener('click', () => {
    let catName = document.getElementById('newCategoryName').value;
    let catIcon = document.getElementById('newCategoryIcon').value || 'fa-tag';
    if (catName) {
        categories.push({ id: Date.now(), name: catName, icon: catIcon });
        renderCategoryAdminList();
        renderCategoriesUI();
        saveData();
        showToast('ক্যাটাগরি যোগ হয়েছে');
        document.getElementById('newCategoryName').value = '';
        document.getElementById('newCategoryIcon').value = '';
    }
});

// Slider
function initSlider() {
    let slides = document.querySelectorAll('.slide');
    let dotsDiv = document.getElementById('sliderDots');
    dotsDiv.innerHTML = '';
    slides.forEach((_, i) => {
        let dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => { currentSlide = i; updateSlider(); });
        dotsDiv.appendChild(dot);
    });
    function updateSlider() {
        document.querySelector('.slider-track').style.transform = `translateX(-${currentSlide * 100}%)`;
        document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
    }
    document.getElementById('nextSlide').onclick = () => { currentSlide = (currentSlide + 1) % slides.length; updateSlider(); };
    document.getElementById('prevSlide').onclick = () => { currentSlide = (currentSlide - 1 + slides.length) % slides.length; updateSlider(); };
    setInterval(() => { currentSlide = (currentSlide + 1) % slides.length; updateSlider(); }, 5000);
}

// Countdown Timer
function startCountdown() {
    let target = new Date();
    target.setHours(target.getHours() + 24);
    setInterval(() => {
        let now = new Date();
        let diff = target - now;
        if (diff <= 0) { target.setHours(target.getHours() + 24); return; }
        let hours = Math.floor(diff / 3600000);
        let minutes = Math.floor((diff % 3600000) / 60000);
        let seconds = Math.floor((diff % 60000) / 1000);
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    }, 1000);
}

// Auth
document.getElementById('accountBtn').onclick = () => {
    if (!currentUser) document.getElementById('loginModal').style.display = 'flex';
    else { currentUser = null; document.getElementById('userNameText').innerText = 'অ্যাকাউন্ট'; showToast('লগআউট হয়েছে'); renderProducts(); }
};
document.getElementById('doLogin').onclick = () => {
    let user = document.getElementById('loginUsername').value;
    let pass = document.getElementById('loginPassword').value;
    if (user === 'admin' && pass === 'admin123') {
        currentUser = { name: 'admin', role: 'admin' };
        document.getElementById('userNameText').innerText = 'অ্যাডমিন';
        document.getElementById('loginModal').style.display = 'none';
        showToast('স্বাগতম অ্যাডমিন! 👑');
    } else if (user && pass) {
        currentUser = { name: user, role: 'user' };
        document.getElementById('userNameText').innerText = user;
        document.getElementById('loginModal').style.display = 'none';
        showToast(`স্বাগতম ${user}!`);
    } else showToast('ইউজারনেম/পাস ভুল');
};
document.getElementById('guestLogin').onclick = () => {
    currentUser = { name: 'গেস্ট', role: 'guest' };
    document.getElementById('userNameText').innerText = 'গেস্ট';
    document.getElementById('loginModal').style.display = 'none';
    showToast('অতিথি হিসেবে ঢুকেছেন');
};
document.querySelectorAll('.modal-close').forEach(c => c.onclick = () => document.getElementById('loginModal').style.display = 'none');

// Admin Panel Navigation
document.getElementById('adminNavLink').onclick = (e) => {
    e.preventDefault();
    if (currentUser?.role === 'admin') {
        document.getElementById('homePage').style.display = 'none';
        document.getElementById('singlePage').style.display = 'none';
        document.getElementById('adminPage').style.display = 'block';
        renderAdminProducts();
        renderCategoryAdminList();
    } else showToast('শুধু অ্যাডমিন প্যানেল দেখতে পারেন! অ্যাডমিন লগইন করুন');
};
document.getElementById('closeAdmin').onclick = () => backToHome();

// Search
document.getElementById('searchBtn').onclick = () => renderProducts(document.getElementById('searchInput').value);
document.getElementById('searchInput').onkeyup = (e) => { if (e.key === 'Enter') renderProducts(e.target.value); };

// Cart UI
document.getElementById('cartBtn').onclick = () => document.getElementById('cartSidebar').classList.add('open');
document.getElementById('closeCart').onclick = () => document.getElementById('cartSidebar').classList.remove('open');
document.getElementById('cartOverlay').onclick = () => document.getElementById('cartSidebar').classList.remove('open');
document.getElementById('checkoutBtn').onclick = () => {
    if (cart.length) { alert('অর্ডার কনফার্ম হয়েছে! ধন্যবাদ 😊'); cart = []; updateCartBadge(); document.getElementById('cartSidebar').classList.remove('open'); showToast('অর্ডার সম্পন্ন হয়েছে'); }
    else showToast('কার্ট খালি');
};

// Mobile Menu
document.getElementById('mobileMenuBtn').onclick = () => document.getElementById('mobileDrawer').classList.add('open');
document.getElementById('closeDrawer').onclick = () => document.getElementById('mobileDrawer').classList.remove('open');
document.getElementById('drawerOverlay').onclick = () => document.getElementById('mobileDrawer').classList.remove('open');
document.getElementById('drawerLogout').onclick = () => { currentUser = null; document.getElementById('userNameText').innerText = 'অ্যাকাউন্ট'; showToast('লগআউট'); document.getElementById('mobileDrawer').classList.remove('open'); };

// Close Banner
document.querySelector('.close-banner')?.addEventListener('click', function() { this.parentElement.style.display = 'none'; });

// Initialize
loadData();
renderProducts();
renderFlashProducts();
renderCategoriesUI();
updateCartBadge();
initSlider();
startCountdown();
