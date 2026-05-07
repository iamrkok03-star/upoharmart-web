// এই অংশটি আপনার script.js এর শুরুতে যোগ করুন অথবা সম্পূর্ণ script.js রিপ্লেস করুন

// অ্যাডমিন প্যানেল শর্টকাট যোগ করা (ডেস্কটপের জন্য)
function addAdminShortcut() {
    // চেক করুন অ্যাডমিন শর্টকাট ইতিমধ্যে আছে কিনা
    if (!document.querySelector('.admin-shortcut') && currentUser?.role === 'admin') {
        let headerActions = document.querySelector('.header-actions');
        if (headerActions && !document.querySelector('.admin-shortcut')) {
            let adminLink = document.createElement('div');
            adminLink.className = 'action-btn admin-shortcut';
            adminLink.innerHTML = '<i class="fas fa-shield-alt"></i><span>অ্যাডমিন</span>';
            adminLink.style.cursor = 'pointer';
            adminLink.onclick = () => {
                document.getElementById('homePage').style.display = 'none';
                document.getElementById('singlePage').style.display = 'none';
                document.getElementById('adminPage').style.display = 'block';
                renderAdminProducts();
                renderCategoryAdminList();
                showToast('অ্যাডমিন প্যানেল খোলা হয়েছে 🔐');
            };
            headerActions.insertBefore(adminLink, headerActions.children[1]);
        }
    }
}

// লগইন সফল হলে অ্যাডমিন শর্টকাট দেখানো
let originalDoLogin = document.getElementById('doLogin').onclick;
document.getElementById('doLogin').onclick = () => {
    let user = document.getElementById('loginUsername').value;
    let pass = document.getElementById('loginPassword').value;
    if (user === 'admin' && pass === 'admin123') {
        currentUser = { name: 'admin', role: 'admin' };
        document.getElementById('userNameText').innerText = 'অ্যাডমিন';
        document.getElementById('loginModal').style.display = 'none';
        showToast('স্বাগতম অ্যাডমিন! 👑 আপনি এখন প্যানেল ব্যবহার করতে পারবেন');
        addAdminShortcut(); // অ্যাডমিন শর্টকাট যোগ করুন
        // অ্যাডমিন মেনু লিংক এনাবেল করুন
        document.querySelectorAll('.admin-link').forEach(link => {
            link.style.display = 'block';
            link.onclick = (e) => {
                e.preventDefault();
                document.getElementById('homePage').style.display = 'none';
                document.getElementById('singlePage').style.display = 'none';
                document.getElementById('adminPage').style.display = 'block';
                renderAdminProducts();
                renderCategoryAdminList();
            };
        });
    } else if (user && pass) {
        currentUser = { name: user, role: 'user' };
        document.getElementById('userNameText').innerText = user;
        document.getElementById('loginModal').style.display = 'none';
        showToast(`স্বাগতম ${user}!`);
    } else showToast('ইউজারনেম/পাস ভুল');
};

// পেজ লোড হলে চেক করা অ্যাডমিন লগইন ছিল কিনা
window.addEventListener('load', () => {
    // আগের লগইন চেক করুন (LocalStorage থেকে)
    let savedUser = localStorage.getItem('uphormart_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        document.getElementById('userNameText').innerText = currentUser.name;
        if (currentUser.role === 'admin') addAdminShortcut();
    }
});

// লগইন সেভ করা (LocalStorage এ)
function saveUserToLocalStorage() {
    if (currentUser) localStorage.setItem('uphormart_user', JSON.stringify(currentUser));
    else localStorage.removeItem('uphormart_user');
}

// লগআউট ফাংশন আপডেট
window.logoutUser = function() {
    currentUser = null;
    localStorage.removeItem('uphormart_user');
    document.getElementById('userNameText').innerText = 'অ্যাকাউন্ট';
    document.querySelector('.admin-shortcut')?.remove();
    showToast('লগআউট হয়েছে');
    renderProducts();
};
