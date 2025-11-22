// Sample product data
const products = [
    {
        id: 1,
        name: "Coca-Cola 330ml",
        category: "beverages",
        prices: [
            { store: "alfamart", price: 8.5 },
            { store: "seven-eleven", price: 9.0 },
            { store: "dali", price: 7.8 },
            { store: "indomaret", price: 8.2 }
        ],
        image: "🥤"
    },
    {
        id: 2,
        name: "Lays Potato Chips",
        category: "snacks",
        prices: [
            { store: "alfamart", price: 12.5 },
            { store: "seven-eleven", price: 13.0 },
            { store: "dali", price: 11.0 },
            { store: "indomaret", price: 12.0 }
        ],
        image: "🍟"
    },
    {
        id: 3,
        name: "Fresh Milk 1L",
        category: "dairy",
        prices: [
            { store: "alfamart", price: 25.0 },
            { store: "seven-eleven", price: 27.5 },
            { store: "dali", price: 22.0 },
            { store: "indomaret", price: 24.5 }
        ],
        image: "🥛"
    },
    {
        id: 4,
        name: "Dove Shampoo",
        category: "personal-care",
        prices: [
            { store: "alfamart", price: 45.0 },
            { store: "seven-eleven", price: 48.0 },
            { store: "dali", price: 42.0 },
            { store: "indomaret", price: 44.5 }
        ],
        image: "🧴"
    },
    {
        id: 5,
        name: "Pepsi 330ml",
        category: "beverages",
        prices: [
            { store: "alfamart", price: 8.0 },
            { store: "seven-eleven", price: 8.5 },
            { store: "dali", price: 7.2 },
            { store: "indomaret", price: 7.8 }
        ],
        image: "🥤"
    },
    {
        id: 6,
        name: "Toblerone Chocolate",
        category: "snacks",
        prices: [
            { store: "alfamart", price: 18.5 },
            { store: "seven-eleven", price: 20.0 },
            { store: "dali", price: 16.0 },
            { store: "indomaret", price: 17.5 }
        ],
        image: "🍫"
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedProducts();
    loadAllProducts();
    setupMobileMenu();
});

// Mobile menu functionality
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Load featured products
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    const featuredProducts = products.slice(0, 4); // Show first 4 products as featured

    featuredContainer.innerHTML = featuredProducts.map(product => {
        const bestPrice = Math.min(...product.prices.map(p => p.price));
        const bestStore = product.prices.find(p => p.price === bestPrice).store;
        
        return `
            <div class="product-card">
                <div class="product-image">
                    ${product.image}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-category">${formatCategory(product.category)}</div>
                    <div class="product-prices">
                        <div class="price">₱${bestPrice.toFixed(2)}</div>
                        <span class="store-badge ${bestStore}">${formatStoreName(bestStore)}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Load all products for comparison
function loadAllProducts() {
    const productsContainer = document.getElementById('productsContainer');
    
    productsContainer.innerHTML = products.map(product => {
        const priceComparison = product.prices.map(price => `
            <div class="store-price ${getLowestPriceStore(product.prices) === price.store ? 'lowest' : ''}">
                <span class="store-name">${formatStoreName(price.store)}</span>
                <span class="price-amount">₱${price.price.toFixed(2)}</span>
            </div>
        `).join('');

        return `
            <div class="product-card" data-category="${product.category}" data-stores="${product.prices.map(p => p.store).join(',')}">
                <div class="product-image">
                    ${product.image}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-category">${formatCategory(product.category)}</div>
                    <div class="price-comparison">
                        ${priceComparison}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Filter products based on category and store
function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const storeFilter = document.getElementById('storeFilter').value;
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const stores = card.getAttribute('data-stores').split(',');

        const categoryMatch = categoryFilter === 'all' || category === categoryFilter;
        const storeMatch = storeFilter === 'all' || stores.includes(storeFilter);

        card.style.display = categoryMatch && storeMatch ? 'block' : 'none';
    });
}

// Search products
function searchProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const shouldShow = productName.includes(searchTerm);
        card.style.display = shouldShow ? 'block' : 'none';
    });
}

// Helper function to get the store with lowest price
function getLowestPriceStore(prices) {
    return prices.reduce((lowest, current) => 
        current.price < lowest.price ? current : lowest
    ).store;
}

// Helper function to format store names
function formatStoreName(store) {
    const storeNames = {
        'alfamart': 'Alfamart',
        'seven-eleven': '7-Eleven',
        'dali': 'Dali',
        'indomaret': 'Indomaret'
    };
    return storeNames[store] || store;
}

// Helper function to format category names
function formatCategory(category) {
    const categoryNames = {
        'beverages': 'Beverages',
        'snacks': 'Snacks',
        'dairy': 'Dairy',
        'personal-care': 'Personal Care'
    };
    return categoryNames[category] || category;
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});