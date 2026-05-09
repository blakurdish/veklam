// --- DATA FROM ORIGINAL SITE ---
const COLORS = [
  {name:'Charcoal', hex:'#2D2D2D'},
  {name:'Caramel',  hex:'#C8956C'},
  {name:'Ivory',    hex:'#F5F0E8'},
  {name:'Navy',     hex:'#1E3A5F'},
  {name:'Sage',     hex:'#8FAF8F'},
  {name:'Rose',     hex:'#D4829A'},
];
const PRODUCTS = [
  {id:'p1',name:'Linen Drop Tee',brand:'VEKLAM BASICS',desc:'Ultra-soft linen blend tee with a relaxed drop shoulder. Breathable, lightweight and timeless.',price:42,cat:'T-Shirt',images:['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800','https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800'],colors:[0,1,2],sizes:['XS','S','M','L','XL','XXL'],has3d:true,isNew:true,isTrending:false,rating:4.8,reviews:124,gradient:['#E8D5C4','#C8956C'],icon:'👕'},
  {id:'p2',name:'Cloud Hoodie',brand:'VEKLAM COZY',desc:'Impossibly soft fleece hoodie with kangaroo pocket. Perfect layering piece for any season.',price:89,cat:'Hoodie',images:['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800','https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800'],colors:[3,0,4],sizes:['S','M','L','XL','XXL'],has3d:true,isNew:false,isTrending:true,rating:4.9,reviews:287,gradient:['#C5D4E8','#7B9DC5'],icon:'🧥'},
  {id:'p3',name:'Wide Leg Trousers',brand:'VEKLAM FIT',desc:'Relaxed wide-leg silhouette in wrinkle-resistant crepe. Elevated comfort from office to evening.',price:67,cat:'Pants',images:['https://images.unsplash.com/photo-1594938298603-c8148c4b4fec?w=800'],colors:[1,5,2],sizes:['XS','S','M','L','XL'],has3d:true,isNew:false,isTrending:false,rating:4.6,reviews:89,gradient:['#D4E8D0','#7BC58B'],icon:'👖'},
  {id:'p4',name:'Oversized Coat',brand:'VEKLAM LUXE',desc:'Statement oversized coat in premium wool blend. Structured shoulders, clean minimalist lines.',price:145,cat:'Coat',images:['https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800'],colors:[0,2,3],sizes:['XS','S','M','L','XL'],has3d:true,isNew:false,isTrending:true,rating:4.7,reviews:156,gradient:['#E8C5D0','#C57B8B'],icon:'🧣'},
  {id:'p5',name:'Slip Midi Dress',brand:'VEKLAM LUXE',desc:'Elegant satin-finish midi dress with adjustable straps. Effortlessly transitions from day to night.',price:98,cat:'Dress',images:['https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800'],colors:[5,2,1],sizes:['XS','S','M','L'],has3d:true,isNew:true,isTrending:false,rating:4.9,reviews:203,gradient:['#E8D0E8','#C57BC5'],icon:'👗'},
  {id:'p6',name:'Bucket Hat',brand:'VEKLAM BASICS',desc:'Classic bucket hat in canvas. UV protective, packable, and styled for any look.',price:28,cat:'Accessories',images:['https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800'],colors:[0,4,1],sizes:['S/M','L/XL'],has3d:false,isNew:false,isTrending:false,rating:4.4,reviews:67,gradient:['#E8E8C5','#C5C57B'],icon:'🎩'},
];

// --- APP STATE ---
const state = {
    role: null,
    selectedCategory: 'All',
    cart: [],
    wishlist: []
};

// --- NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById('page-' + pageId) || document.getElementById(pageId);
    if (targetPage) targetPage.classList.add('active');
    
    const nav = document.getElementById('mainNav');
    if (pageId === 'hero') {
        nav.classList.remove('scrolled', 'navbar-light');
        nav.classList.add('navbar-dark');
    } else {
        nav.classList.add('scrolled', 'navbar-light');
        nav.classList.remove('navbar-dark');
    }
    window.scrollTo(0, 0);
}

// --- FIREBASE LOGIC ---
if (typeof firebase !== 'undefined') {
    const auth = firebase.auth();
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const password = e.target.querySelector('input[type="password"]').value;
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                showPage('app');
                loadDashboard();
            })
            .catch(err => alert('Login failed: ' + err.message));
    });
}

function demoLogin(role) {
    state.role = role;
    showPage('app');
    loadDashboard(role);
}

function logout() {
    if (typeof firebase !== 'undefined') firebase.auth().signOut();
    showPage('hero');
}

// --- DASHBOARD RENDERING ---
function loadDashboard(role = 'customer') {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="container py-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 class="playfair fw-bold mb-0">Veklam Shop</h2>
                    <p class="text-muted small">Welcome back, ${role.charAt(0).toUpperCase() + role.slice(1)}</p>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-outline-dark btn-sm rounded-pill px-3" onclick="logout()">Logout</button>
                </div>
            </div>

            <!-- Category Filter -->
            <div class="d-flex gap-2 mb-4 overflow-auto pb-2 no-scrollbar" id="category-bar">
                ${['All', 'T-Shirt', 'Hoodie', 'Pants', 'Coat', 'Dress', 'Accessories'].map(cat => `
                    <button class="btn ${state.selectedCategory === cat ? 'btn-dark' : 'btn-outline-secondary'} btn-sm rounded-pill px-4" 
                            onclick="setCategory('${cat}')">${cat}</button>
                `).join('')}
            </div>

            <!-- Product Grid -->
            <div class="row g-4" id="product-grid">
                ${renderProducts()}
            </div>
        </div>
    `;
}

function setCategory(cat) {
    state.selectedCategory = cat;
    loadDashboard(state.role);
}

function renderProducts() {
    const filtered = state.selectedCategory === 'All' 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.cat === state.selectedCategory);

    return filtered.map(p => `
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card border-0 shadow-sm rounded-4 overflow-hidden h-100 product-card-hover">
                <div class="position-relative">
                    <img src="${p.images[0]}" class="card-img-top" alt="${p.name}" style="height: 250px; object-fit: cover;">
                    ${p.isNew ? '<span class="position-absolute top-0 start-0 m-2 badge bg-primary rounded-pill">NEW</span>' : ''}
                    <button class="position-absolute top-0 end-0 m-2 btn btn-light btn-sm rounded-circle shadow-sm" onclick="toggleWishlist('${p.id}')">
                        <i class="bi bi-heart"></i>
                    </button>
                </div>
                <div class="card-body p-3">
                    <p class="text-muted small mb-1">${p.brand}</p>
                    <h6 class="fw-bold mb-2">${p.name}</h6>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold text-primary">$${p.price}</span>
                        <button class="btn btn-dark btn-sm rounded-pill px-3" onclick="addToCart('${p.id}')">Add</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const p = PRODUCTS.find(x => x.id === id);
    state.cart.push(p);
    alert(`${p.name} added to cart!`);
}

function toggleWishlist(id) {
    alert('Added to wishlist!');
}

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    showPage('hero');
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    if (document.getElementById('hero').classList.contains('active')) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled', 'navbar-light');
            nav.classList.remove('navbar-dark');
        } else {
            nav.classList.remove('scrolled', 'navbar-light');
            nav.classList.add('navbar-dark');
        }
    }
});
