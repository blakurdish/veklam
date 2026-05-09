// Page Navigation Logic
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById('page-' + pageId) || document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo(0, 0);
    }

    // Update Navbar style based on page
    const nav = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const navBrand = document.querySelector('.navbar-brand');

    if (pageId === 'hero') {
        nav.classList.remove('scrolled');
        nav.classList.remove('navbar-light');
        nav.classList.add('navbar-dark');
        navLinks.forEach(link => link.classList.add('text-white'));
        navBrand.classList.add('text-white');
    } else {
        nav.classList.add('scrolled');
        nav.classList.remove('navbar-dark');
        nav.classList.add('navbar-light');
        navLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-dark');
        });
        navBrand.classList.remove('text-white');
        navBrand.classList.add('text-dark');
    }
}

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const nav = document.getElementById('mainNav');
    const activePage = document.querySelector('.page.active');
    
    if (activePage && activePage.id === 'hero') {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-dark');
            });
            document.querySelector('.navbar-brand').classList.remove('text-white');
            document.querySelector('.navbar-brand').classList.add('text-dark');
        } else {
            nav.classList.remove('scrolled');
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.add('text-white');
                link.classList.remove('text-dark');
            });
            document.querySelector('.navbar-brand').classList.add('text-white');
            document.querySelector('.navbar-brand').classList.remove('text-dark');
        }
    }
});

function scrollToFeatures() {
    // For now, just a placeholder
    alert('Features section coming soon!');
}

// Firebase Logic
if (typeof firebase !== 'undefined') {
    const auth = firebase.auth();
    const db = firebase.firestore();

    // Handle Login
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        const password = e.target.querySelector('input[type="password"]').value;

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                console.log('Logged in:', userCredential.user);
                showPage('app');
                loadDashboard();
            })
            .catch((error) => {
                alert('Login failed: ' + error.message);
            });
    });
}

function demoLogin(role) {
    console.log('Demo login for:', role);
    // For demo purposes, we'll just show the app page
    showPage('app');
    loadDashboard(role);
}

function loadDashboard(role = 'customer') {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="container py-5">
            <div class="d-flex justify-content-between align-items-center mb-5">
                <h2 class="playfair fw-bold">Dashboard <span class="badge bg-dark fs-6 ms-2">${role}</span></h2>
                <button class="btn btn-outline-danger btn-sm" onclick="logout()">Logout</button>
            </div>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card border-0 shadow-sm p-4 rounded-4">
                        <h5 class="text-muted small text-uppercase fw-bold">Total Orders</h5>
                        <h2 class="playfair fw-bold mb-0">128</h2>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card border-0 shadow-sm p-4 rounded-4">
                        <h5 class="text-muted small text-uppercase fw-bold">Active Designs</h5>
                        <h2 class="playfair fw-bold mb-0">14</h2>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card border-0 shadow-sm p-4 rounded-4">
                        <h5 class="text-muted small text-uppercase fw-bold">Revenue</h5>
                        <h2 class="playfair fw-bold mb-0">$4,250</h2>
                    </div>
                </div>
            </div>
            <div class="mt-5">
                <h4 class="playfair fw-bold mb-4">Recent Activity</h4>
                <div class="table-responsive bg-white rounded-4 shadow-sm p-3">
                    <table class="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#ORD-001</td>
                                <td>Linen Drop Tee</td>
                                <td><span class="badge bg-success-subtle text-success">Delivered</span></td>
                                <td>May 08, 2026</td>
                            </tr>
                            <tr>
                                <td>#ORD-002</td>
                                <td>Cloud Hoodie</td>
                                <td><span class="badge bg-warning-subtle text-warning">Processing</span></td>
                                <td>May 09, 2026</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function logout() {
    if (typeof firebase !== 'undefined') {
        firebase.auth().signOut();
    }
    showPage('hero');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showPage('hero');
});
