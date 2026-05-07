// Full Ecommerce + Admin + Single Product + Cart + Auth
AOS.init({ duration: 800, once: true });
let products = [
    { id: 1, name: "Xiaomi Note 13 Pro", price: 34999, oldPrice: 49999, image: "https://images.pexels.com/photos/4042800/pexels-photo-4042800.jpeg", desc: "৫জি, ১০৮এমপি ক্যামেরা, অ্যামোলেড ডিসপ্লে", category: "mobiles" },
    { id: 2, name: "Noise Cancelling Headphones", price: 8999, oldPrice: 14999, image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", desc: "হাই-রেস অডিও, ৪০ ঘণ্টা ব্যাটারি", category: "gadgets" },
    { id: 3, name: "Premium Slim Fit Shirt", price: 2999, oldPrice: 5999, image: "https://images.pexels.com/photos/7679742/pexels-photo-7679742.jpeg", desc: "কটন লিনেন, অরিজিনাল", category: "fashion" },
    { id: 4, name: "Gaming Laptop RTX 4060", price: 129999, oldPrice: 159999, image: "https://images.pexels.com/photos/18105/pexels-photo.jpg", desc: "১৬জিবি র্যাম, ১টিবি এসএসডি", category: "laptops" },
    { id: 5, name: "Smart Watch Ultra", price: 11999, oldPrice: 19999, image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg", desc: "ব্লুটুথ কল, ব্লাড অক্সিজেন", category: "gadgets" },
    { id: 6, name: "Leather Sneakers", price: 6999, oldPrice: 11999, image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg", desc: "প্রিমিয়াম লেদার", category: "footwear" },
];
let cart = [];
let currentUser = null;
let currentView = "home";

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartCountSpan = document.getElementById('cartCountBadge');
const cartSidebar = document.getElementById('cartSidebar');
const toastMsg = document.getElementById('toastMsg');
const searchInput = document.getElementById('searchInput');
const userDisplay = document.getElementById('userNameDisplay');
const loginModal = document.getElementById('loginModal');
const adminPanelDiv = document.getElementById('adminPanel');
const homePageDiv = document.getElementById('homePage');
const singlePageDiv = document.getElementById('singleProductPage');

function showToast(text) { toastMsg.innerText = text; toastMsg.classList.add('show'); setTimeout(()=>toastMsg.classList.remove('show'),2000);}
function updateCartUI() { cartCountSpan.innerText = cart.reduce((s, i) => s + i.qty, 0); renderCartSidebar(); }
function addToCart(product) { let exist = cart.find(i=>i.id===product.id); if(exist) exist.qty++; else cart.push({...product, qty:1}); updateCartUI(); showToast(`${product.name} কার্টে যোগ হয়েছে`); }
function renderCartSidebar() { let total=0, html=''; cart.forEach(item=>{ total+=item.price*item.qty; html+=`<div class="cart-item"><img src="${item.image}" width="60"><div>${item.name}<br>৳${item.price} x${item.qty}</div><button onclick="removeFromCart(${item.id})">🗑️</button></div>`;}); document.getElementById('cartItemsList').innerHTML=html||'<div class="empty-cart-msg">কার্ট খালি</div>'; document.getElementById('cartTotalPrice').innerText=`৳${total}`; }
window.removeFromCart = (id)=>{ cart=cart.filter(i=>i.id!==id); updateCartUI(); showToast('সরানো হয়েছে'); };
function renderProducts(filter=""){ let filtered = products.filter(p=>p.name.toLowerCase().includes(filter.toLowerCase()) || p.category.includes(filter)); productsGrid.innerHTML = filtered.map(p=>`<div class="product-card" onclick="openSingleProduct(${p.id})"><img class="product-img" src="${p.image}"><div class="product-info"><div class="product-title">${p.name}</div><div class="price-row"><span class="disc-price">৳${p.price}</span><span class="old-price">৳${p.oldPrice}</span></div><button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})"><i class="fas fa-cart-plus"></i> কিনুন</button><button class="buy-now-btn" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')}); openCartSidebar();">অর্ডার করুন</button></div></div>`).join(''); }
window.openSingleProduct = (id)=>{ let p = products.find(pr=>pr.id===id); if(p){ homePageDiv.style.display='none'; adminPanelDiv.style.display='none'; singlePageDiv.style.display='block'; singlePageDiv.innerHTML=`<div class="single-product-wrapper"><div class="single-img"><img src="${p.image}" alt=""></div><div class="single-details"><h1>${p.name}</h1><p class="premium-price">৳${p.price} <del>৳${p.oldPrice}</del></p><p><i class="fas fa-tag"></i> স্টক: প্রিমিয়াম কোয়ালিটি</p><p>📝 বিবরণ: ${p.desc || 'আসল পণ্য, ফ্রি ডেলিভারি'}</p><button class="buy-now-btn" onclick="addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')}); openCartSidebar();">এখনই কিনুন 🚀</button><button class="add-to-cart" onclick="addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')});">কার্টে যোগ করুন</button><br><button id="backHomeBtn">← হোমে ফিরুন</button></div></div>`; document.getElementById('backHomeBtn')?.addEventListener('click',()=>{ homePageDiv.style.display='block'; singlePageDiv.style.display='none'; }); } };
function openCartSidebar(){ cartSidebar.classList.add('open'); document.getElementById('cartOverlay').classList.add('active'); }
// Categories Filter
const categoriesList = ["mobiles","laptops","fashion","gadgets","footwear"];
function renderCategories(){ document.getElementById('categoriesGrid').innerHTML = categoriesList.map(cat=>`<div class="category-card" data-cat="${cat}"><i class="fas ${cat==='mobiles'?'fa-mobile-alt':cat==='laptops'?'fa-laptop-code':cat==='fashion'?'fa-tshirt':'fa-headphones'}"></i><span>${cat.toUpperCase()}</span></div>`).join(''); document.querySelectorAll('.category-card').forEach(c=>c.addEventListener('click',(e)=>{ let cat = c.dataset.cat; let filtered = products.filter(p=>p.category===cat); productsGrid.innerHTML = filtered.map(p=>`...`).join(''); renderProductsCustom(filtered); })); }
function renderProductsCustom(arr){ productsGrid.innerHTML = arr.map(p=>`<div class="product-card" onclick="openSingleProduct(${p.id})">...<button class="add-to-cart" onclick="event.stopPropagation(); addToCart(${JSON.stringify(p).replace(/"/g, '&quot;')})">কার্টে নিন</button></div>`).join(''); }
// Admin Panel
function renderAdminProducts(){ let listDiv=document.getElementById('adminProductsList'); listDiv.innerHTML=products.map(p=>`<div class="admin-item"><span><strong>${p.name}</strong> ৳${p.price}</span><div><button onclick="editProduct(${p.id})">✏️</button><button onclick="deleteProduct(${p.id})">🗑️</button></div></div>`).join(''); document.getElementById('totalProductsStat').innerText=products.length; }
window.deleteProduct=(id)=>{ products=products.filter(p=>p.id!==id); renderAdminProducts(); renderProducts(searchInput.value); showToast('পণ্য ডিলিট হয়েছে'); };
window.editProduct=(id)=>{ let p=products.find(x=>x.id===id); let newName=prompt('নতুন নাম',p.name); if(newName) p.name=newName; let newPrice=prompt('নতুন দাম',p.price); if(newPrice) p.price=Number(newPrice); renderAdminProducts(); renderProducts(searchInput.value); showToast('আপডেট করা হয়েছে'); };
document.getElementById('addProductBtn')?.addEventListener('click',()=>{ let newId=Date.now(); let newProd={ id:newId, name:document.getElementById('prodName').value, price:Number(document.getElementById('prodPrice').value), oldPrice:Number(document.getElementById('prodOldPrice').value), image:document.getElementById('prodImage').value, desc:document.getElementById('prodDesc').value, category:document.getElementById('prodCategory').value }; if(newProd.name && newProd.price){ products.push(newProd); renderAdminProducts(); renderProducts(searchInput.value); showToast('নতুন পণ্য যুক্ত!'); } else showToast('সব ঘর পূরণ করুন'); });
// Auth Logic
document.getElementById('userIcon').addEventListener('click',()=>{ if(!currentUser) loginModal.style.display='flex'; else { currentUser=null; userDisplay.innerText='অ্যাকাউন্ট'; showToast('লগআউট করা হয়েছে'); renderProducts(searchInput.value);} });
document.getElementById('doLoginBtn').onclick=()=>{ let u=document.getElementById('loginUsername').value; let p=document.getElementById('loginPassword').value; if(u==='admin' && p==='admin123'){ currentUser={username:'admin',role:'admin'}; userDisplay.innerText='অ্যাডমিন'; loginModal.style.display='none'; showToast('স্বাগতম অ্যাডমিন!'); } else if(u && p){ currentUser={username:u,role:'user'}; userDisplay.innerText=u; loginModal.style.display='none'; showToast(`হ্যালো ${u}`); } else showToast('ভুল তথ্য'); };
document.getElementById('guestLoginBtn').onclick=()=>{ currentUser={username:'গেস্ট',role:'guest'}; userDisplay.innerText='গেস্ট'; loginModal.style.display='none'; showToast('অতিথি হিসেবে ঢুকছেন'); };
document.querySelector('.close-modal').onclick=()=>loginModal.style.display='none';
// Admin Panel Navigation + Routing
document.querySelectorAll('.nav-link').forEach(link=>{ link.addEventListener('click',(e)=>{ let page=e.target.dataset.page; if(page==='admin'){ if(currentUser?.role==='admin'){ homePageDiv.style.display='none'; singlePageDiv.style.display='none'; adminPanelDiv.style.display='block'; renderAdminProducts(); } else showToast('শুধু অ্যাডমিন এই প্যানেল ব্যবহার করতে পারেন!'); } else if(page==='home'){ homePageDiv.style.display='block'; adminPanelDiv.style.display='none'; singlePageDiv.style.display='none'; renderProducts(searchInput.value); } }); });
document.getElementById('closeAdminBtn')?.addEventListener('click',()=>{ homePageDiv.style.display='block'; adminPanelDiv.style.display='none'; renderProducts(searchInput.value); });
// Search + Slider + Hamburger
searchInput.addEventListener('keyup',()=>renderProducts(searchInput.value));
document.getElementById('searchBtn').onclick=()=>renderProducts(searchInput.value);
// Slider Logic
let slideIndex=0; const slides=document.getElementById('slides'); const total=document.querySelectorAll('.slide').length;
function updateSlider(){ slides.style.transform=`translateX(-${slideIndex*100}%)`; document.querySelectorAll('.dot').forEach((d,i)=>{ d.classList.toggle('active',i===slideIndex);});}
document.getElementById('nextSlide').onclick=()=>{ slideIndex=(slideIndex+1)%total; updateSlider();}
document.getElementById('prevSlide').onclick=()=>{ slideIndex=(slideIndex-1+total)%total; updateSlider();}
setInterval(()=>{ slideIndex=(slideIndex+1)%total; updateSlider();},5000);
// Initialize
renderProducts(); renderCategories(); updateCartUI(); 
document.getElementById('cartIconBtn').onclick=()=>cartSidebar.classList.add('open'); document.getElementById('closeCartSidebar').onclick=()=>cartSidebar.classList.remove('open'); document.getElementById('checkoutBtn').onclick=()=>{ alert('অর্ডার প্রক্রিয়াধীন। ধন্যবাদ!'); cart=[]; updateCartUI(); cartSidebar.classList.remove('open'); };
// Mobile Menu
document.getElementById('hamburgerMenu').onclick=()=>document.getElementById('mobileDrawer').classList.add('open');
document.getElementById('closeDrawer').onclick=()=>document.getElementById('mobileDrawer').classList.remove('open');
