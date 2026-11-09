const listings = [
    {
        id: 1,
        title: 'Golden Alphonso Mangoes',
        price: 420,
        category: 'fruits',
        location: 'Ratlam, Madhya Pradesh',
        type: 'Featured',
        description: 'Farm-picked Alphonso mangoes with a naturally rich sweetness and vibrant aroma. Perfect for fresh dessert plates and gifting.',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 2,
        title: 'Fresh Red Onions',
        price: 35,
        category: 'vegetables',
        location: 'Neemuch, Madhya Pradesh',
        type: 'Farm grade',
        description: 'Premium red onions with strong flavour and fresh harvest quality. Ideal for daily cooking and bulk prep.',
        image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 3,
        title: 'A2 Cow Milk',
        price: 62,
        category: 'dairy',
        location: 'Ujjain, Madhya Pradesh',
        type: 'Organic',
        description: 'Fresh A2 milk sourced from healthy cows kept on natural grazing. Rich taste and nutrient dense.',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 4,
        title: 'Desi Wheat Grain',
        price: 230,
        category: 'grains',
        location: 'Bhopal, Madhya Pradesh',
        type: 'Bulk pack',
        description: 'Locally grown desi wheat with excellent milling quality and confident rural provenance.',
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 5,
        title: 'Murrah Buffalo',
        price: 96000,
        category: 'livestock',
        location: 'Mandsaur, Madhya Pradesh',
        type: 'Premium',
        description: 'Healthy Murrah buffalo bred for high milk yield and strong vitality under careful farm management.',
        image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 6,
        title: 'Soil Tiller Machine',
        price: 16800,
        category: 'tools',
        location: 'Dewas, Madhya Pradesh',
        type: 'Equipment',
        description: 'Efficient soil tiller for farmland preparation. Durable build, easy maintenance, and reliable field performance.',
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 7,
        title: 'Sweet Kesar Bananas',
        price: 58,
        category: 'fruits',
        location: 'Khargone, Madhya Pradesh',
        type: 'Fresh pick',
        description: 'Naturally ripened bananas with a mellow sweetness and soft texture ideal for home kitchens.',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=900&q=80'
    },
    {
        id: 8,
        title: 'Green Capsicum',
        price: 84,
        category: 'vegetables',
        location: 'Dhar, Madhya Pradesh',
        type: 'Fresh harvest',
        description: 'Crisp green capsicum grown with careful irrigation and sustainable farming practices.',
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80'
    }
];

const listingGrid = document.getElementById('listingGrid');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');
const categoryButtons = document.querySelectorAll('.category-button');
const detailsOverlay = document.getElementById('detailsOverlay');
const sellOverlay = document.getElementById('sellOverlay');
const notification = document.getElementById('notification');
const sellButton = document.getElementById('sellButton');
const sellForm = document.getElementById('sellForm');

let currentCategory = 'all';
let searchTerm = '';

function formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
}

function getFilteredListings() {
    return listings.filter((item) => {
        const categoryMatch = currentCategory === 'all' || item.category === currentCategory;
        const searchString = `${item.title} ${item.location} ${item.type}`.toLowerCase();
        const searchMatch = searchString.includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });
}

function renderListings() {
    const filteredListings = getFilteredListings();

    listingGrid.innerHTML = filteredListings
        .map(
            (item) => `
                <article class="listing-card" data-id="${item.id}">
                    <div class="image-container">
                        <img src="${item.image}" alt="${item.title}" />
                        <button class="card-plus" type="button" data-open-modal="${item.id}" aria-label="View ${item.title}">+</button>
                        ${item.type === 'Featured' ? '<div class="featured-badge">Featured</div>' : ''}
                    </div>
                    <div class="card-info">
                        <div class="price">₹${formatCurrency(item.price)}<small> / ${item.category === 'livestock' ? 'head' : 'kg'}</small></div>
                        <div class="item-title">${item.title}</div>
                        <div class="item-location">📍 ${item.location}</div>
                        <span class="item-type">${item.type}</span>
                    </div>
                </article>
            `
        )
        .join('');

    noResults.style.display = filteredListings.length ? 'none' : 'block';
}

function openDetailsModal(id) {
    const item = listings.find((entry) => entry.id === Number(id));
    if (!item) return;

    document.getElementById('modalImage').src = item.image;
    document.getElementById('modalCategory').textContent = item.type;
    document.getElementById('modalTitle').textContent = item.title;
    document.getElementById('modalPrice').innerHTML = `₹${formatCurrency(item.price)}<small> / ${item.category === 'livestock' ? 'head' : 'kg'}</small>`;
    document.getElementById('modalDescription').textContent = item.description;
    document.getElementById('modalLocation').textContent = item.location;
    detailsOverlay.classList.add('show');
    detailsOverlay.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
}

function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    clearTimeout(showNotification.timeoutId);
    showNotification.timeoutId = setTimeout(() => notification.classList.remove('show'), 2200);
}

searchInput.addEventListener('input', (event) => {
    searchTerm = event.target.value.trim();
    renderListings();
});

categoryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        categoryButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.dataset.category;
        renderListings();
    });
});

listingGrid.addEventListener('click', (event) => {
    const openButton = event.target.closest('[data-open-modal]');
    if (openButton) {
        openDetailsModal(openButton.dataset.openModal);
    }
});

document.querySelectorAll('[data-close]').forEach((button) => {
    button.addEventListener('click', () => {
        const target = button.dataset.close === 'details' ? detailsOverlay : sellOverlay;
        closeModal(target);
    });
});

sellButton.addEventListener('click', () => {
    sellOverlay.classList.add('show');
    sellOverlay.setAttribute('aria-hidden', 'false');
});

detailsOverlay.addEventListener('click', (event) => {
    if (event.target === detailsOverlay) {
        closeModal(detailsOverlay);
    }
});

sellOverlay.addEventListener('click', (event) => {
    if (event.target === sellOverlay) {
        closeModal(sellOverlay);
    }
});

sellForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const productName = document.getElementById('productName').value.trim();
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = Number(document.getElementById('productPrice').value);
    const productLocation = document.getElementById('productLocation').value.trim();

    if (!productName || !productLocation || !productPrice) {
        showNotification('Please complete all fields.');
        return;
    }

    listings.unshift({
        id: Date.now(),
        title: productName,
        price: productPrice,
        category: productCategory,
        location: productLocation,
        type: 'New listing',
        description: 'Freshly listed by a local farmer. Reach out to buy directly from the seller.',
        image: 'https://images.unsplash.com/photo-1464226184884-fa520dda47b7?auto=format&fit=crop&w=900&q=80'
    });

    sellForm.reset();
    closeModal(sellOverlay);
    renderListings();
    showNotification('Listing published successfully.');
});

renderListings();
