// script.js - uphormart Ecommerce Core (Cart, Filter, Slider, Toast)
(function() {
  // ---------- DUMMY PRODUCTS (8 professional items) ----------
  const products = [
    { id: 1, name: "Xiaomi Note 13 Pro", price: 349.99, oldPrice: 499.99, image: "https://images.pexels.com/photos/4042800/pexels-photo-4042800.jpeg?auto=compress&cs=tinysrgb&w=400", category: "mobiles" },
    { id: 2, name: "Noise Cancelling Headphones", price: 89.99, oldPrice: 149.99, image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400", category: "gadgets" },
    { id: 3, name: "Classic Slim Fit Shirt", price: 29.99, oldPrice: 59.99, image: "https://images.pexels.com/photos/7679742/pexels-photo-7679742.jpeg?auto=compress&cs=tinysrgb&w=400", category: "fashion" },
    { id: 4, name: "Gaming Laptop RTX 4060", price: 1299.99, oldPrice: 1599.99, image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400", category: "laptops" },
    { id: 5, name: "Smart Watch Ultra", price: 119.99, oldPrice: 199.99, image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400", category: "gadgets" },
    { id: 6, name: "Leather Sneakers", price: 69.99, oldPrice: 119.99, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400", category: "footwear" },
    { id: 7, name: "Wireless Mechanical Keyboard", price: 59.99, oldPrice: 99.99, image: "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=400", category: "gadgets" },
    { id: 8, name: "Premium Cotton Hoodie", price: 44.99, oldPrice: 79.99, image: "https://images.pexels.com/photos/9958088/pexels-photo-9958088.jpeg?auto=compress&cs=tinysrgb&w=400", category: "fashion" }
  ];

  let cart = []; // { id, name, price, image, quantity }
  let currentSlide = 0;
  let slideInterval;

  // DOM elements
  const productsGrid = document.getElementById('productsGrid');
  const cartCountSpan = document.getElementById('cartCountBadge');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartTotalSpan = document.getElementById('cartTotalPrice');
  const toastMsg = document.getElementById('toastMsg');
  const searchInput = document.getElementById('searchInput');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const searchBtn = document.getElementById('searchBtn');
  const mobileSearchBtn = document.getElementById('mobileSearchBtn');

  // Helper functions
  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountSpan.innerText = totalItems;
    renderCartSidebar();
  }

  function showToast(message) {
    toastMsg.innerText = message || "Item added to cart ✨";
    toastMsg.classList.add('show');
    setTimeout(() => toastMsg.classList.remove('show'), 2000);
  }

  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ 
        id: product.id, 
        name: product.name, 
        price: product.price, 
        image: product.image, 
        quantity: 1 
      });
    }
    updateCartUI();
    showToast(`${product.name} added to cart`);
  }

  function renderCartSidebar() {
    if (!cartItemsList) return;
    if (cart.length === 0) {
      cartItemsList.innerHTML = '<div class="empty-cart-msg">Your cart is empty 🛍️</div>';
      cartTotalSpan.innerText = "$0.00";
      return;
    }
    let html = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      html += `
        <div class="cart-item">
          <img class="cart-item-img" src="${item.image}" alt="${item.name}">
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            <div style="display:flex; gap:8px; margin-top:6px;"><span>Qty: ${item.quantity}</span> 
            <button class="remove-item" data-id="${item.id}" style="background:none; border:none; color:#f97316; cursor:pointer;">Remove</button></div>
          </div>
        </div>
      `;
    });
    cartItemsList.innerHTML = html;
    cartTotalSpan.innerText = `$${total.toFixed(2)}`;
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.id);
        removeCartItem(id);
      });
    });
  }

  function removeCartItem(id) {
    const index = cart.findIndex(i => i.id === id);
    if (index !== -1) {
      if (cart[index].quantity > 1) cart[index].quantity--;
      else cart.splice(index,1);
      updateCartUI();
      showToast("Item removed");
    }
  }

  function renderProducts(filterText = "") {
    const filterLower = filterText.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(filterLower) || p.category.includes(filterLower));
    productsGrid.innerHTML = filtered.map(prod => `
      <div class="product-card">
        <img class="product-img" src="${prod.image}" alt="${prod.name}" loading="lazy">
        <div class="product-info">
          <div class="product-title">${prod.name}</div>
          <div class="price-row">
            <span class="disc-price">$${prod.price.toFixed(2)}</span>
            <span class="old-price">$${prod.oldPrice.toFixed(2)}</span>
          </div>
          <button class="add-to-cart" data-id="${prod.id}"><i class="fas fa-cart-plus"></i> Add to Cart</button>
        </div>
      </div>
    `).join('');
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.id);
        addToCart(id);
      });
    });
  }

  // filter event handlers
  function handleSearch() {
    const query = searchInput.value;
    renderProducts(query);
    if (mobileSearchInput) mobileSearchInput.value = query;
  }
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keyup', (e) => { if(e.key === 'Enter') handleSearch(); });
  if(mobileSearchBtn && mobileSearchInput) {
    mobileSearchBtn.addEventListener('click', () => {
      const val = mobileSearchInput.value;
      searchInput.value = val;
      renderProducts(val);
    });
    mobileSearchInput.addEventListener('keyup', (e) => { if(e.key === 'Enter') { searchInput.value = mobileSearchInput.value; renderProducts(mobileSearchInput.value); } });
  }

  // slider logic
  const slidesContainer = document.getElementById('slides');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.getElementById('dotsContainer');
  const totalSlides = document.querySelectorAll('.slide').length;

  function updateSlider() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }
  function nextSlide() { currentSlide = (currentSlide + 1) % totalSlides; updateSlider(); resetInterval(); }
  function prevSlide() { currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; updateSlider(); resetInterval(); }
  function resetInterval() { clearInterval(slideInterval); slideInterval = setInterval(nextSlide, 4500); }
  function createDots() {
    for(let i=0; i<totalSlides; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if(i===0) dot.classList.add('active');
      dot.addEventListener('click', () => { currentSlide = i; updateSlider(); resetInterval(); });
      dotsContainer.appendChild(dot);
    }
  }
  if(prevBtn && nextBtn) {
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    createDots();
    slideInterval = setInterval(nextSlide, 4500);
  }

  // cart sidebar interactions
  const cartIcon = document.getElementById('cartIconBtn');
  const closeCartSidebar = document.getElementById('closeCartSidebar');
  function openCart() { cartSidebar.classList.add('open'); cartOverlay.classList.add('active'); }
  function closeCart() { cartSidebar.classList.remove('open'); cartOverlay.classList.remove('active'); }
  cartIcon.addEventListener('click', openCart);
  closeCartSidebar.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
  document.getElementById('checkoutBtn')?.addEventListener('click', () => { alert('✨ Order placed (demo). Thank you for shopping at uphormart!'); closeCart(); cart = []; updateCartUI(); renderProducts(searchInput.value); });

  // mobile hamburger
  const hamburger = document.getElementById('hamburgerMenu');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  function openDrawer() { mobileDrawer.classList.add('open'); drawerOverlay.classList.add('active'); }
  function closeDrawerF() { mobileDrawer.classList.remove('open'); drawerOverlay.classList.remove('active'); }
  hamburger?.addEventListener('click', openDrawer);
  closeDrawer?.addEventListener('click', closeDrawerF);
  drawerOverlay?.addEventListener('click', closeDrawerF);
  document.querySelectorAll('.drawer-nav a').forEach(link => link.addEventListener('click', closeDrawerF));

  // initial products & cart render
  renderProducts();
  updateCartUI();
})();
