// Sample listings data with royalty-free image URLs
const sampleListings = [
    {
        id: 1,
        title: "Modern 3-Bedroom House in Kigali",
        category: "house",
        price: 25000000,
        location: "Kigali, Nyarugenge",
        phone: "+250 793 257 781",
        description: "Beautiful modern house with 3 bedrooms, 2 bathrooms, fully furnished. Located in a secure neighborhood with easy access to amenities.",
        availability: "available",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
        ],
        videos: [],
        verified: true,
        ownerId: 1,
        views: 245,
        createdAt: "2024-01-15"
    },
    {
        id: 2,
        title: "Toyota RAV4 2020 - Excellent Condition",
        category: "car",
        price: 18000000,
        location: "Kigali, Gasabo",
        phone: "+250 796 102 065",
        description: "Well-maintained Toyota RAV4 with low mileage. Full service history available. Perfect for family use.",
        availability: "available",
        images: [
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
            "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800"
        ],
        videos: [],
        verified: true,
        ownerId: 2,
        views: 189,
        createdAt: "2024-01-20"
    },
    {
        id: 3,
        title: "Prime Land for Sale - 5000 sqm",
        category: "land",
        price: 35000000,
        location: "Kigali, Kicukiro",
        phone: "+250 793 257 781",
        description: "Prime location land suitable for residential or commercial development. Clear title, ready for construction.",
        availability: "available",
        images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800",
            "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800"
        ],
        videos: [],
        verified: true,
        ownerId: 1,
        views: 312,
        createdAt: "2024-01-18"
    },
    {
        id: 4,
        title: "Luxury Apartment - 2 Bedrooms",
        category: "house",
        price: 12000000,
        location: "Kigali, Nyarugenge",
        phone: "+250 796 102 065",
        description: "Spacious 2-bedroom apartment with modern amenities, balcony, and parking space. Perfect for young professionals.",
        availability: "available",
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
        ],
        videos: [],
        verified: false,
        ownerId: 3,
        views: 156,
        createdAt: "2024-01-22"
    },
    {
        id: 5,
        title: "Honda CR-V 2019 - One Owner",
        category: "car",
        price: 15000000,
        location: "Kigali, Gasabo",
        phone: "+250 793 257 781",
        description: "Single owner Honda CR-V in excellent condition. All original parts, regularly serviced.",
        availability: "available",
        images: [
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"
        ],
        videos: [],
        verified: true,
        ownerId: 2,
        views: 201,
        createdAt: "2024-01-19"
    },
    {
        id: 6,
        title: "Commercial Space for Rent",
        category: "other",
        price: 800000,
        location: "Kigali, Kicukiro",
        phone: "+250 796 102 065",
        description: "Prime commercial space in busy area. Perfect for retail, office, or restaurant. High foot traffic.",
        availability: "available",
        images: [
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
        ],
        videos: [],
        verified: true,
        ownerId: 3,
        views: 278,
        createdAt: "2024-01-21"
    }
];

// Initialize localStorage data
   function connect() {
      fetch("https://payview-marketplace-3.onrender.com/api/v1/connect")
        .then(response => response.json())
        .then(data => {
          document.getElementById("result").innerText = data.message;
        })
        .catch(error => {
          document.getElementById("result").innerText = "Connection failed ❌";
          console.error(error);
        });
    }
function initializeStorage() {
    if (!localStorage.getItem('listings')) {
        localStorage.setItem('listings', JSON.stringify(sampleListings));
    }
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }
    if (!localStorage.getItem('messages')) {
        localStorage.setItem('messages', JSON.stringify([]));
    }
}

// Navigation
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Handle navigation based on authentication status
    const loginBtn = document.querySelector('.btn-login');
    const logoutBtn = document.getElementById('logoutBtn');
    const dashboardLink = document.querySelector('a[href*="dashboard"]');

    if (currentUser) {
        // User is logged in - hide login button, show logout/dashboard
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'inline-block';
        if (dashboardLink) dashboardLink.style.display = 'inline-block';

        // Add user greeting
        const navBrand = document.querySelector('.nav-brand h1');
        if (navBrand && !navBrand.querySelector('.user-greeting')) {
            const greeting = document.createElement('span');
            greeting.className = 'user-greeting';
            greeting.style.cssText = 'font-size: 0.8rem; color: var(--neon-cyan); margin-left: 10px;';
            greeting.textContent = `Welcome, ${currentUser.name.split(' ')[0]}!`;
            navBrand.appendChild(greeting);
        }
    } else {
        // User is not logged in - show login button, hide logout/dashboard
        if (loginBtn) loginBtn.style.display = 'inline-block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (dashboardLink) dashboardLink.style.display = 'none';
    }
}

// Authentication
// API Base URL
const API_BASE = 'https://payview-marketplace-4.onrender.com/api';

// Authentication functions with API + localStorage fallback
async function register(userData) {
    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, message: data.message || 'Registration failed' };
        }

        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('userRole', 'owner');
        return { success: true, user: data.user };
    } catch (error) {
        console.error('Registration error:', error);
        // Fallback: save user locally so app works without API
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.some(u => u.email === userData.email)) {
                return { success: false, message: 'Email already registered.' };
            }
            const user = {
                id: Date.now(),
                _id: String(Date.now()),
                name: userData.name,
                email: userData.email,
                phone: userData.phone || '',
                createdAt: new Date().toISOString()
            };
            users.push({ ...user, password: userData.password });
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('token', 'local-' + user.id);
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('userRole', 'owner');
            return { success: true, user };
        } catch (e) {
            return { success: false, message: 'Network error. Please try again.' };
        }
    }
}

async function login(email, password) {
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            return { success: false, message: data.message || 'Login failed' };
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('userRole', 'owner');
        return { success: true, user: data.user };
    } catch (error) {
        console.error('Login error:', error);
        // Fallback: check localStorage users
        try {
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === email && u.password === password);
            if (!user) {
                return { success: false, message: 'Invalid email or password.' };
            }
            const { password: _, ...userWithoutPassword } = user;
            const safeUser = { ...userWithoutPassword, id: user.id, _id: user._id || user.id };
            localStorage.setItem('token', 'local-' + user.id);
            localStorage.setItem('currentUser', JSON.stringify(safeUser));
            localStorage.setItem('userRole', 'owner');
            return { success: true, user: safeUser };
        } catch (e) {
            return { success: false, message: 'Network error. Please try again.' };
        }
    }
}

function logout() {
    localStorage.removeItem('token');
    localStorage.setItem('currentUser', JSON.stringify(null));
    localStorage.removeItem('userRole'); // Clear user role on logout
    window.location.href = 'index.html';
}

// Check authentication with API
function checkAuth() {
    const token = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!token || !currentUser) {
        return false;
    }

    // For dashboard access
    if (window.location.pathname.includes('dashboard.html')) {
        return true;
    }

    return !!currentUser;
}

function isLocalUser() {
    const token = localStorage.getItem('token');
    return token && String(token).startsWith('local-');
}

function getLocalListings() {
    return JSON.parse(localStorage.getItem('localListings') || '[]');
}

function setLocalListings(listings) {
    localStorage.setItem('localListings', JSON.stringify(listings));
}

// Listings Management with API + localStorage fallback
async function getListings() {
    if (isLocalUser()) {
        return getLocalListings();
    }
    try {
        const response = await fetch(`${API_BASE}/listings`);
        const data = await response.json();
        if (!response.ok) {
            console.error('Get listings error:', data.message);
            return getLocalListings();
        }
        return data.listings || [];
    } catch (error) {
        console.error('Get listings error:', error);
        return getLocalListings();
    }
}

async function saveListing(listing) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Please login to create listings');
    }

    if (isLocalUser()) {
        const list = getLocalListings();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const id = listing.id || listing._id || String(Date.now());
        const newListing = {
            ...listing,
            _id: id,
            id: id,
            ownerId: currentUser.id || currentUser._id,
            createdAt: listing.createdAt || new Date().toISOString(),
            views: listing.views || 0
        };
        const idx = list.findIndex(l => String(l._id || l.id) === String(id));
        if (idx >= 0) {
            list[idx] = { ...list[idx], ...newListing };
        } else {
            list.push(newListing);
        }
        setLocalListings(list);
        return newListing;
    }

    try {
        const method = listing.id ? 'PUT' : 'POST';
        const url = listing.id ? `${API_BASE}/listings/${listing.id}` : `${API_BASE}/listings`;
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(listing)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to save listing');
        }
        return data.listing;
    } catch (error) {
        console.error('Save listing error:', error);
        throw error;
    }
}

async function deleteListing(id) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Please login to delete listings');
    }
    if (isLocalUser()) {
        const list = getLocalListings().filter(l => String(l._id || l.id) !== String(id));
        setLocalListings(list);
        return { success: true };
    }
    try {
        const response = await fetch(`${API_BASE}/listings/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete listing');
        }
        return { success: true };
    } catch (error) {
        console.error('Delete listing error:', error);
        throw error;
    }
}

async function getUserListings() {
    const token = localStorage.getItem('token');
    if (!token) return [];
    if (isLocalUser()) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const uid = currentUser?.id || currentUser?._id;
        return getLocalListings().filter(l => String(l.ownerId) === String(uid));
    }
    try {
        const response = await fetch(`${API_BASE}/listings/my`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (!response.ok) {
            console.error('Get user listings error:', data.message);
            return [];
        }
        return data.listings || [];
    } catch (error) {
        console.error('Get user listings error:', error);
        return [];
    }
}

async function getListingById(id) {
    if (!id) return null;
    if (isLocalUser()) {
        const list = getLocalListings();
        const found = list.find(l => String(l._id || l.id) === String(id));
        return found || null;
    }
    try {
        const response = await fetch(`${API_BASE}/listings/${id}`);
        const data = await response.json();
        if (!response.ok) {
            console.error('Get listing error:', data.message);
            return null;
        }
        return data.listing || data;
    } catch (error) {
        console.error('Get listing error:', error);
        return null;
    }
}

// Display Listings
function displayListings(listings, containerId, isOwnerView = false) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (listings.length === 0) {
        const noListings = document.getElementById('noListings') || document.getElementById('noMyListings');
        if (noListings) noListings.style.display = 'block';
        return;
    }
    
    // Set proper grid layout for 3 columns
    container.style.gridTemplateColumns = 'repeat(auto-fill, minmax(320px, 1fr))';
    container.style.gap = '2rem';
    
    container.innerHTML = listings.map(listing => {
        const listingId = listing._id != null ? listing._id : listing.id;
        // Check if there are videos first, then images
        const hasVideos = listing.videos && listing.videos.length > 0;
        const hasImages = listing.images && listing.images.length > 0;

        let mediaContent = '';
        let mediaType = '';

        if (hasVideos) {
            // Show first video as thumbnail with play button
            mediaContent = `
                <video class="listing-video" muted preload="metadata">
                    <source src="${listing.videos[0]}" type="video/mp4">
                </video>
                <div class="video-play-overlay" onclick="playVideoFullscreen('${listing.videos[0]}', '${listing.title}')">
                    <div class="play-button">▶</div>
                </div>
            `;
            mediaType = 'video';
        } else if (hasImages) {
            // Show first image
            mediaContent = `
                <img src="${listing.images[0]}" alt="${listing.title}" class="listing-image"
                     onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'">
            `;
            mediaType = 'image';
        } else {
            // Fallback placeholder
            mediaContent = `
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" alt="${listing.title}" class="listing-image">
            `;
            mediaType = 'image';
        }

        // Format WhatsApp link
        const whatsappNumber = listing.whatsapp ? listing.whatsapp.replace(/\D/g, '') : '';
        const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=Hello, I'm interested in your listing: ${listing.title}` : '#';

        return `
            <div class="listing-card instagram-style" data-id="${listingId}">
                <div class="listing-image-container ${mediaType === 'video' ? 'has-video' : ''}">
                    ${mediaContent}
                    ${hasVideos ? `<div class="listing-video-badge">🎥 ${listing.videos.length} Video${listing.videos.length > 1 ? 's' : ''}</div>` : ''}
                    ${hasImages && !hasVideos ? `<div class="listing-image-badge">📷 ${listing.images.length} Image${listing.images.length > 1 ? 's' : ''}</div>` : ''}
                </div>
                <div class="listing-content">
                    <div class="listing-header">
                        <h3 class="listing-title">${listing.title}</h3>
                        ${listing.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                    </div>
                    <div class="listing-category">${listing.category.toUpperCase()}</div>
                    <div class="listing-location">📍 ${listing.location}</div>
                    <div class="listing-price">${formatPrice(listing.price)} RWF</div>
                    <p class="listing-description">${listing.description.substring(0, 100)}${listing.description.length > 100 ? '...' : ''}</p>

                    ${listing.hashtags && listing.hashtags.length > 0 ? `
                        <div class="listing-hashtags">
                            ${listing.hashtags.slice(0, 3).map(tag => `<span class="hashtag" onclick="event.stopPropagation(); searchByHashtag('${tag}')">${tag}</span>`).join('')}
                            ${listing.hashtags.length > 3 ? `<span class="hashtag more" onclick="event.stopPropagation(); showAllHashtags('${listingId}', ${JSON.stringify(listing.hashtags).replace(/'/g, "\\'")})">+${listing.hashtags.length - 3}</span>` : ''}
                        </div>
                    ` : ''}

                    <div class="listing-contacts">
                        <div class="contact-item">
                            <a href="tel:${listing.phone}" class="contact-link" title="Call">
                                <span class="contact-icon">📞</span>
                                <span class="contact-text">Call</span>
                            </a>
                        </div>
                        <div class="contact-item">
                            <a href="${whatsappLink}" target="_blank" class="contact-link whatsapp-link" title="WhatsApp">
                                <span class="contact-icon">💬</span>
                                <span class="contact-text">WhatsApp</span>
                            </a>
                        </div>
                    </div>

                    ${isOwnerView ? `
                        <div class="listing-actions">
                            <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); editListing('${listingId}')">Edit</button>
                            <button class="btn btn-danger btn-sm" onclick="event.stopPropagation(); deleteListingConfirm('${listingId}')">Delete</button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers - link to product details page
    container.querySelectorAll('.listing-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button') && !e.target.closest('a') && !e.target.closest('.video-play-overlay')) {
                const id = card.dataset.id;
                if (isOwnerView) {
                    // In owner view, open modal
                    viewListingDetail(id, true);
                } else {
                    // In client view, go to product details page
                    window.location.href = `product.html?id=${id}`;
                }
            }
        });
    });
}

// Full-screen video player function
function playVideoFullscreen(videoSrc, title) {
    // Remove existing video modal if any
    const existingModal = document.getElementById('videoFullscreenModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create full-screen video modal
    const modal = document.createElement('div');
    modal.id = 'videoFullscreenModal';
    modal.innerHTML = `
        <div class="video-modal-overlay">
            <div class="video-modal-content">
                <div class="video-modal-header">
                    <h3>${title}</h3>
                    <button class="video-modal-close" onclick="closeVideoFullscreen()">✕</button>
                </div>
                <div class="video-modal-body">
                    <video id="fullscreenVideo" controls autoplay style="width: 100%; max-height: 70vh; border-radius: 8px;">
                        <source src="${videoSrc}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Add styles for the modal
    const style = document.createElement('style');
    style.textContent = `
        .video-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        .video-modal-content {
            background: var(--bg-tertiary);
            border-radius: 12px;
            max-width: 90vw;
            max-height: 90vh;
            width: 100%;
            margin: 20px;
            overflow: hidden;
        }
        .video-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            border-bottom: 1px solid var(--border-color);
        }
        .video-modal-header h3 {
            margin: 0;
            color: var(--neon-cyan);
            font-size: 1.2rem;
        }
        .video-modal-close {
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: background 0.3s;
        }
        .video-modal-close:hover {
            background: var(--error);
        }
        .video-modal-body {
            padding: 1.5rem;
        }
    `;
    document.head.appendChild(style);

    // Focus on video
    setTimeout(() => {
        const video = document.getElementById('fullscreenVideo');
        if (video) {
            video.focus();
        }
    }, 100);
}

function closeVideoFullscreen() {
    const modal = document.getElementById('videoFullscreenModal');
    if (modal) {
        modal.remove();
    }
}

// Close video modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeVideoFullscreen();
    }
});

function formatPrice(price) {
    return new Intl.NumberFormat('en-RW').format(price);
}

// Listing Detail View (for owner dashboard modal)
async function viewListingDetail(id, isOwnerView = false) {
    const listing = await getListingById(id);
    if (!listing) return;

    const modal = document.getElementById('listingModal');
    const content = document.getElementById('listingModalContent');
    
    if (modal && content) {
        content.innerHTML = `
            <div class="listing-detail">
                <div class="listing-detail-images">
                    ${listing.images && listing.images.length > 0 
                        ? listing.images.map(img => 
                            `<img src="${img}" alt="${listing.title}" 
                                  onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'">`
                          ).join('')
                        : `<div class="listing-image-placeholder">📷</div>`
                    }
                </div>
                <div class="listing-detail-info">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                        <h2>${listing.title}</h2>
                        ${listing.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <span class="listing-category">${listing.category.toUpperCase()}</span>
                        <div class="listing-location" style="margin-top: 0.5rem;">📍 ${listing.location}</div>
                        ${listing.phone ? `<div class="listing-location" style="margin-top: 0.5rem;">📞 ${listing.phone}</div>` : ''}
                    </div>
                    <div class="listing-price" style="font-size: 2rem; margin-bottom: 1rem;">
                        ${formatPrice(listing.price)} RWF
                    </div>
                    <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1rem;">
                        ${listing.description}
                    </p>
                    <div style="margin-bottom: 1rem;">
                        <strong>Availability:</strong> 
                        <span style="color: ${listing.availability === 'available' ? 'var(--success)' : 'var(--warning)'};">
                            ${listing.availability.charAt(0).toUpperCase() + listing.availability.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
        `;
        modal.style.display = 'block';
    }
}

// Load Product Details Page
async function loadProductDetails(id) {
    const listing = await getListingById(id);
    if (!listing) {
        document.getElementById('productDetailsContent').innerHTML = `
            <div class="no-listings">
                <p>Product not found. <a href="listings.html">Browse all listings</a></p>
            </div>
        `;
        return;
    }

    // Increment views via API
    try {
        const token = localStorage.getItem('token');
        if (token) {
            await fetch(`${API_BASE}/listings/${id}/view`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }
    } catch (error) {
        console.error('Error incrementing views:', error);
    }
    
    const allMedia = [...(listing.images || []), ...(listing.videos || [])];
    const mainMedia = allMedia[0];
    
    const content = document.getElementById('productDetailsContent');
    content.innerHTML = `
        <div class="product-details-container">
            <div class="product-details-header">
                <a href="listings.html" style="color: var(--neon-cyan); text-decoration: none; margin-bottom: 1rem; display: inline-block;">← Back to Listings</a>
                <h1>${listing.title}</h1>
                ${listing.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
            </div>
            
            <div class="product-details-grid">
                <div class="product-media">
                    <div class="product-main-media" id="mainMedia">
                        ${mainMedia ? (mainMedia.includes('video') || mainMedia.endsWith('.mp4') || mainMedia.endsWith('.webm') 
                            ? `<video src="${mainMedia}" controls></video>`
                            : `<img src="${mainMedia}" alt="${listing.title}" onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'">`
                        ) : '<div class="listing-image-placeholder" style="height: 400px;">📷</div>'}
                    </div>
                    ${allMedia.length > 1 ? `
                        <div class="product-media-thumbnails">
                            ${allMedia.map((media, idx) => `
                                <img src="${media.includes('video') || media.endsWith('.mp4') || media.endsWith('.webm') 
                                    ? 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800' 
                                    : media}" 
                                     alt="Media ${idx + 1}" 
                                     class="media-thumbnail ${idx === 0 ? 'active' : ''}"
                                     onclick="changeMainMedia('${media}', ${media.includes('video') || media.endsWith('.mp4') || media.endsWith('.webm')})">
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div class="product-info">
                    <div class="product-price">${formatPrice(listing.price)} RWF</div>
                    
                    <div class="product-meta">
                        <div class="product-meta-item">
                            <strong>Category:</strong>
                            <span>${listing.category.toUpperCase()}</span>
                        </div>
                        <div class="product-meta-item">
                            <strong>📍 Location:</strong>
                            <span>${listing.location}</span>
                        </div>
                        ${listing.phone ? `
                            <div class="product-meta-item">
                                <strong>📞 Phone:</strong>
                                <span>${listing.phone}</span>
                            </div>
                        ` : ''}
                        <div class="product-meta-item">
                            <strong>Status:</strong>
                            <span style="color: ${listing.availability === 'available' ? 'var(--success)' : 'var(--warning)'};">
                                ${listing.availability.charAt(0).toUpperCase() + listing.availability.slice(1)}
                            </span>
                        </div>
                    </div>
                    
                    <div class="product-description">
                        <h3 style="color: var(--neon-cyan); margin-bottom: 1rem;">Description</h3>
                        <p>${listing.description}</p>
                    </div>
                    
                    ${listing.phone ? `
                        <div class="product-contact">
                            <a href="tel:${listing.phone.replace(/\s/g, '')}" class="contact-button phone">
                                📞 Call Owner
                            </a>
                            <a href="https://wa.me/${listing.phone.replace(/[^0-9]/g, '')}" target="_blank" class="contact-button whatsapp">
                                💬 WhatsApp Owner
                            </a>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Change main media on thumbnail click
function changeMainMedia(mediaUrl, isVideo) {
    const mainMedia = document.getElementById('mainMedia');
    if (!mainMedia) return;
    
    if (isVideo) {
        mainMedia.innerHTML = `<video src="${mediaUrl}" controls></video>`;
    } else {
        mainMedia.innerHTML = `<img src="${mediaUrl}" alt="Product" onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'">`;
    }
    
    // Update active thumbnail
    document.querySelectorAll('.media-thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.src === mediaUrl || thumb.onclick.toString().includes(mediaUrl)) {
            thumb.classList.add('active');
        }
    });
}

// Image Upload Handler
function initImageUpload() {
    const uploadArea = document.getElementById('imageUploadArea');
    const fileInput = document.getElementById('listingImages');
    const previewGrid = document.getElementById('imagePreviewGrid');
    
    if (!uploadArea || !fileInput) return;
    
    let uploadedImages = [];
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--neon-cyan)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const files = Array.from(e.dataTransfer.files);
        handleImageFiles(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleImageFiles(files);
    });
    
    function handleImageFiles(files) {
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    uploadedImages.push(e.target.result);
                    updateImagePreview();
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    function updateImagePreview() {
        if (!previewGrid) return;
        
        const placeholder = document.getElementById('uploadPlaceholder');
        if (uploadedImages.length > 0 && placeholder) {
            placeholder.style.display = 'none';
        } else if (placeholder) {
            placeholder.style.display = 'block';
        }
        
        previewGrid.innerHTML = uploadedImages.map((img, index) => `
            <div class="image-preview">
                <img src="${img}" alt="Preview ${index + 1}">
                <button type="button" class="remove-image" onclick="removeImage(${index})">×</button>
            </div>
        `).join('');
    }
    
    window.removeImage = (index) => {
        uploadedImages.splice(index, 1);
        updateImagePreview();
    };
    
    window.getUploadedImages = () => uploadedImages;
    window.clearUploadedImages = () => {
        uploadedImages = [];
        updateImagePreview();
        if (fileInput) fileInput.value = '';
    };
}

// Video Upload Handler
function initVideoUpload() {
    const uploadArea = document.getElementById('videoUploadArea');
    const fileInput = document.getElementById('listingVideos');
    const previewGrid = document.getElementById('videoPreviewGrid');
    
    if (!uploadArea || !fileInput) return;
    
    let uploadedVideos = [];
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--neon-cyan)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--border-color)';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--border-color)';
        const files = Array.from(e.dataTransfer.files);
        handleVideoFiles(files);
    });
    
    fileInput.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        handleVideoFiles(files);
    });
    
    function handleVideoFiles(files) {
        files.forEach(file => {
            if (file.type.startsWith('video/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    uploadedVideos.push(e.target.result);
                    updateVideoPreview();
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    function updateVideoPreview() {
        if (!previewGrid) return;
        
        const placeholder = document.getElementById('videoUploadPlaceholder');
        if (uploadedVideos.length > 0 && placeholder) {
            placeholder.style.display = 'none';
        } else if (placeholder) {
            placeholder.style.display = 'block';
        }
        
        previewGrid.innerHTML = uploadedVideos.map((video, index) => `
            <div class="video-preview">
                <video src="${video}" controls></video>
                <button type="button" class="remove-video" onclick="removeVideo(${index})">×</button>
            </div>
        `).join('');
    }
    
    window.removeVideo = (index) => {
        uploadedVideos.splice(index, 1);
        updateVideoPreview();
    };
    
    window.getUploadedVideos = () => uploadedVideos;
    window.clearUploadedVideos = () => {
        uploadedVideos = [];
        updateVideoPreview();
        if (fileInput) fileInput.value = '';
    };
}

// Listing Form
function initListingForm() {
    const form = document.getElementById('listingForm');
    const modal = document.getElementById('listingFormModal');
    const createBtn = document.getElementById('createListingBtn');
    const cancelBtn = document.getElementById('cancelListingForm');
    const closeBtn = document.getElementById('closeListingForm');
    
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            openListingForm();
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            closeListingForm();
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeListingForm();
        });
    }
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            saveListingFromForm();
        });
    }
    
    const createFirstBtn = document.getElementById('createFirstListing');
    if (createFirstBtn) {
        createFirstBtn.addEventListener('click', () => {
            openListingForm();
        });
    }
}

async function openListingForm(listingId = null) {
    const modal = document.getElementById('listingFormModal');
    const form = document.getElementById('listingForm');
    const title = document.getElementById('listingFormTitle');

    if (listingId) {
        const listing = await getListingById(String(listingId));
        if (listing) {
            document.getElementById('listingTitle').value = listing.title;
            document.getElementById('listingCategory').value = listing.category;
            document.getElementById('listingPrice').value = listing.price;
            document.getElementById('listingLocation').value = listing.location;
            document.getElementById('listingPhone').value = listing.phone || '';
            document.getElementById('listingDescription').value = listing.description;
            document.getElementById('listingAvailability').value = listing.availability;

            if (window.clearUploadedImages) window.clearUploadedImages();
            if (window.clearUploadedVideos) window.clearUploadedVideos();
            if (listing.images && listing.images.length > 0) {
                // For demo, we'll just show the images but not allow editing
                // In production, you'd handle image editing differently
            }

            form.dataset.listingId = listingId;
            if (title) title.textContent = 'Edit Listing';
        }
    } else {
        form.reset();
        if (window.clearUploadedImages) window.clearUploadedImages();
        if (window.clearUploadedVideos) window.clearUploadedVideos();
        form.dataset.listingId = '';
        if (title) title.textContent = 'Create New Listing';
    }

    if (modal) modal.style.display = 'block';
    initImageUpload();
    initVideoUpload();
}

function closeListingForm() {
    const modal = document.getElementById('listingFormModal');
    if (modal) modal.style.display = 'none';
    const form = document.getElementById('listingForm');
    if (form) {
        form.reset();
        form.dataset.listingId = '';
    }
    if (window.clearUploadedImages) window.clearUploadedImages();
    if (window.clearUploadedVideos) window.clearUploadedVideos();
}

async function saveListingFromForm() {
    const form = document.getElementById('listingForm');
    const listingId = form.dataset.listingId;

    const images = window.getUploadedImages ? window.getUploadedImages() : [];
    const videos = window.getUploadedVideos ? window.getUploadedVideos() : [];

    // For demo, use placeholder if no images uploaded
    if (images.length === 0) {
        images.push('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800');
    }

    const listing = {
        title: document.getElementById('listingTitle').value,
        category: document.getElementById('listingCategory').value,
        price: parseInt(document.getElementById('listingPrice').value),
        location: document.getElementById('listingLocation').value,
        phone: document.getElementById('listingPhone').value,
        description: document.getElementById('listingDescription').value,
        availability: document.getElementById('listingAvailability').value,
        images: images,
        videos: videos,
        verified: false
    };

    // Preserve existing data if editing
    if (listingId) {
        const existing = await getListingById(String(listingId));
        if (existing) {
            listing.id = existing._id != null ? existing._id : existing.id;
        }
    }

    try {
        await saveListing(listing);
        closeListingForm();
        await loadDashboardListings();
        showNotification('Listing saved successfully!');
    } catch (error) {
        showNotification('Error saving listing: ' + error.message);
    }
}

function editListing(id) {
    openListingForm(id);
}

async function deleteListingConfirm(id) {
    if (confirm('Are you sure you want to delete this listing?')) {
        try {
            await deleteListing(id);
            await loadDashboardListings();
            showNotification('Listing deleted successfully!');
        } catch (error) {
            showNotification('Error deleting listing: ' + error.message);
        }
    }
}

// Dashboard
async function loadDashboardListings() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const myListings = await getUserListings();

    // Update owner name
    const ownerNameEl = document.getElementById('ownerName');
    if (ownerNameEl) {
        ownerNameEl.textContent = currentUser.name || 'Owner';
    }

    // Update stats
    const totalViews = myListings.reduce((sum, l) => sum + (l.views || 0), 0);
    const verifiedCount = myListings.filter(l => l.verified).length;
    const totalEarnings = myListings.reduce((sum, l) => sum + (l.price * 0.02), 0); // Assuming 2% commission

    // Update stat elements
    const totalListingsEl = document.getElementById('totalListings');
    const totalViewsEl = document.getElementById('totalViews');
    const totalMessagesEl = document.getElementById('totalMessages');
    const totalEarningsEl = document.getElementById('totalEarnings');

    if (totalListingsEl) totalListingsEl.textContent = myListings.length;
    if (totalViewsEl) totalViewsEl.textContent = totalViews.toLocaleString();
    if (totalMessagesEl) totalMessagesEl.textContent = Math.floor(Math.random() * 50) + 10; // Mock data for now
    if (totalEarningsEl) totalEarningsEl.textContent = totalEarnings.toLocaleString() + ' RWF';

    // Load recent listings (last 3)
    const recentListings = myListings.slice(0, 3);
    displayListings(recentListings, 'recentListingsGrid', true);

    // Handle empty states
    const noRecentListings = document.getElementById('noRecentListings');
    if (noRecentListings) {
        noRecentListings.style.display = myListings.length === 0 ? 'block' : 'none';
    }

    // Load activity feed
    loadActivityFeed();

    // Initialize performance chart
    initializePerformanceChart();
}

async function loadActivityFeed() {
    const activityFeed = document.getElementById('activityFeed');
    if (!activityFeed) return;

    const activities = [
        {
            icon: 'fas fa-plus-circle',
            text: 'New listing created: "Modern Apartment"',
            time: '2 hours ago'
        },
        {
            icon: 'fas fa-eye',
            text: 'Your listing received 15 new views',
            time: '4 hours ago'
        },
        {
            icon: 'fas fa-comments',
            text: 'New inquiry about your Toyota RAV4',
            time: '1 day ago'
        },
        {
            icon: 'fas fa-star',
            text: 'Listing verified by PayView team',
            time: '2 days ago'
        }
    ];

    activityFeed.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon">
                <i class="${activity.icon}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        </div>
    `).join('');
}

function initializePerformanceChart() {
    // Simple mock chart using CSS (could be enhanced with Chart.js later)
    const chartContainer = document.querySelector('.performance-chart');
    if (!chartContainer) return;

    const mockData = [12, 19, 15, 25, 22, 30, 28];
    const maxValue = Math.max(...mockData);

    chartContainer.innerHTML = `
        <div class="chart-bars">
            ${mockData.map((value, index) => `
                <div class="chart-bar">
                    <div class="bar-fill" style="height: ${(value / maxValue) * 100}%"></div>
                    <span class="bar-label">${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Chat
function openChat(ownerId, listingId) {
    const modal = document.getElementById('chatModal');
    if (modal) {
        modal.style.display = 'block';
        loadChatConversations();
    }
}

function loadChatConversations() {
    // Demo chat functionality
    const chatList = document.getElementById('chatList');
    if (chatList) {
        chatList.innerHTML = `
            <div class="chat-item">
                <h4>Buyer Inquiry</h4>
                <p style="color: var(--text-secondary); font-size: 0.875rem;">Interested in your listing</p>
            </div>
        `;
    }
}

// Filters
function initFilters() {
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', loadListingsPage);
    }
    
    if (sortFilter) {
        sortFilter.addEventListener('change', loadListingsPage);
    }
}

async function loadListingsPage() {
    let listings = await getListings();

    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');

    if (categoryFilter && categoryFilter.value !== 'all') {
        listings = listings.filter(l => l.category === categoryFilter.value);
    }
    
    if (sortFilter) {
        switch (sortFilter.value) {
            case 'price-low':
                listings.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                listings.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
            default:
                listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
        }
    }
    
    displayListings(listings, 'listingsGrid');
    
    const noListings = document.getElementById('noListings');
    if (noListings) {
        noListings.style.display = listings.length === 0 ? 'block' : 'none';
    }
}

// Home Page Featured Listings
async function loadFeaturedListings() {
    let listings = await getListings();

    // Show only first 3
    listings = listings.slice(0, 3);
    displayListings(listings, 'featuredListings');
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    }
}

// Login/Register Forms
function initAuthForms() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Add password visibility toggles
    const passwordFields = ['loginPassword', 'regPassword', 'regConfirmPassword'];
    passwordFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const container = field.parentElement;
            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'password-toggle';
            toggleBtn.innerHTML = '👁️';
            toggleBtn.style.cssText = `
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
                background: none;
                border: none;
                cursor: pointer;
                font-size: 18px;
                color: var(--text-secondary);
            `;

            container.style.position = 'relative';
            container.appendChild(toggleBtn);

            toggleBtn.addEventListener('click', () => {
                const type = field.type === 'password' ? 'text' : 'password';
                field.type = type;
                toggleBtn.innerHTML = type === 'password' ? '👁️' : '🙈';
            });
        }
    });
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Login';
            if (submitBtn) {
                submitBtn.textContent = 'Logging in...';
                submitBtn.disabled = true;
            }
            try {
                const result = await login(email, password);
                if (result.success) {
                    showNotification('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = 'owner-home.html';
                    }, 500);
                } else {
                    showNotification(result.message || 'Login failed', 'error');
                }
            } catch (err) {
                console.error('Login error:', err);
                showNotification('Login failed. Please try again.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            const terms = document.getElementById('regTerms');
            if (terms && !terms.checked) {
                showNotification('You must agree to the terms and conditions', 'error');
                return;
            }
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : 'Register';
            if (submitBtn) {
                submitBtn.textContent = 'Registering...';
                submitBtn.disabled = true;
            }
            try {
                const result = await register({ name, email, phone, password });
                if (result.success) {
                    showNotification('Registration successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = 'owner-home.html';
                    }, 500);
                } else {
                    showNotification(result.message || 'Registration failed', 'error');
                }
            } catch (err) {
                console.error('Registration error:', err);
                showNotification('Registration failed. Please try again.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    }
}

// Logout
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    const footerLogout = document.getElementById('footerLogout');
    
    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    if (footerLogout) {
        footerLogout.addEventListener('click', handleLogout);
    }
}

// Upload Page Functions
function initUploadForm() {
    const form = document.getElementById('uploadListingForm');
    if (!form) return;

    let currentStep = 1;
    let uploadedImages = [];
    let uploadedVideos = [];
    let selectedImageFiles = [];
    let selectedVideoFiles = [];

    // Initialize step navigation
    initStepNavigation();

    // Initialize media uploads
    initMediaUploads();

    // Initialize preview updates
    initPreviewUpdates();

    function initStepNavigation() {
        // Next step buttons
        document.querySelectorAll('.next-step').forEach(btn => {
            btn.addEventListener('click', () => {
                if (validateCurrentStep()) {
                    goToStep(currentStep + 1);
                }
            });
        });

        // Previous step buttons
        document.querySelectorAll('.prev-step').forEach(btn => {
            btn.addEventListener('click', () => {
                goToStep(currentStep - 1);
            });
        });
    }

    function goToStep(step) {
        // Hide current step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');

        // Update step indicators
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`.step[data-step="${step}"]`).classList.add('active');

        // Show new step
        document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');

        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        progressFill.style.width = `${(step / 3) * 100}%`;

        currentStep = step;

        // Update preview if on step 3
        if (step === 3) {
            updatePreview();
        }
    }

    function validateCurrentStep() {
        const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const requiredFields = currentStepEl.querySelectorAll('[required]');

        for (let field of requiredFields) {
            if (!field.value.trim()) {
                showNotification(`Please fill in all required fields`, 'error');
                field.focus();
                return false;
            }
        }

        return true;
    }

    function initMediaUploads() {
        // Image upload zone
        const imageZone = document.getElementById('imageUploadZone');
        const imageInput = document.getElementById('listingImages');

        if (imageZone && imageInput) {
            imageZone.addEventListener('click', () => imageInput.click());

            imageInput.addEventListener('change', (e) => {
                handleImageUpload(e.target.files);
            });

            // Drag and drop
            imageZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                imageZone.style.borderColor = 'var(--neon-cyan)';
            });

            imageZone.addEventListener('dragleave', () => {
                imageZone.style.borderColor = 'var(--border-color)';
            });

            imageZone.addEventListener('drop', (e) => {
                e.preventDefault();
                imageZone.style.borderColor = 'var(--border-color)';
                handleImageUpload(e.dataTransfer.files);
            });
        }

        // Video upload zone
        const videoZone = document.getElementById('videoUploadZone');
        const videoInput = document.getElementById('listingVideos');

        if (videoZone && videoInput) {
            videoZone.addEventListener('click', () => videoInput.click());

            videoInput.addEventListener('change', (e) => {
                handleVideoUpload(e.target.files);
            });
        }
    }

    // FIXED: append to list and use correct data-index for remove (index in selectedImageFiles)
    function handleImageUpload(files) {
        const uploadedImagesEl = document.getElementById('uploadedImages');
        if (!uploadedImagesEl) return;
        const maxTotal = 10;
        const remaining = maxTotal - selectedImageFiles.length;
        if (remaining <= 0) return;
        const toAdd = Array.from(files).filter(f => f.type.startsWith('image/')).slice(0, remaining);
        toAdd.forEach((file) => {
            const idx = selectedImageFiles.length;
            selectedImageFiles.push(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const imgItem = document.createElement('div');
                imgItem.className = 'media-item';
                imgItem.innerHTML = `
                    <img src="${e.target.result}" alt="Upload">
                    <button type="button" class="remove-media" data-index="${idx}">×</button>
                `;
                uploadedImagesEl.appendChild(imgItem);
            };
            reader.readAsDataURL(file);
        });
    }

    // FIXED: append to list and use correct data-index for remove (index in selectedVideoFiles)
    function handleVideoUpload(files) {
        const uploadedVideosEl = document.getElementById('uploadedVideos');
        if (!uploadedVideosEl) return;
        const maxTotal = 2;
        const remaining = maxTotal - selectedVideoFiles.length;
        if (remaining <= 0) return;
        const toAdd = Array.from(files).filter(f => f.type.startsWith('video/')).slice(0, remaining);
        toAdd.forEach((file) => {
            const idx = selectedVideoFiles.length;
            selectedVideoFiles.push(file);
            const videoItem = document.createElement('div');
            videoItem.className = 'media-item';
            videoItem.innerHTML = `
                <video width="100" height="60" controls>
                    <source src="${URL.createObjectURL(file)}" type="${file.type}">
                </video>
                <button type="button" class="remove-media" data-index="${idx}">×</button>
            `;
            uploadedVideosEl.appendChild(videoItem);
        });
    }

    function initPreviewUpdates() {
        // Update preview in real-time as user types
        const inputs = ['listingTitle', 'listingPrice', 'listingLocation', 'listingDescription'];
        inputs.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', updatePreview);
            }
        });
    }

    function updatePreview() {
        const title = document.getElementById('listingTitle').value || 'Title will appear here';
        const price = document.getElementById('listingPrice').value || '0';
        const location = document.getElementById('listingLocation').value || 'Location will appear here';
        const description = document.getElementById('listingDescription').value || 'Description will appear here';

        document.getElementById('previewTitle').textContent = title;
        document.getElementById('previewPrice').textContent = price ? `${parseInt(price).toLocaleString()} RWF` : 'Price will appear here';
        document.getElementById('previewLocation').textContent = location;
        document.getElementById('previewDescription').textContent = description;
    }

    // Handle form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const publishBtn = document.getElementById('publishBtn');
        const originalText = publishBtn.innerHTML;
        publishBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
        publishBtn.disabled = true;

        try {
            // Convert images to base64
            uploadedImages = [];
            for (let file of selectedImageFiles) {
                const base64 = await fileToBase64(file);
                uploadedImages.push(base64);
            }

            // Convert videos to base64
            uploadedVideos = [];
            for (let file of selectedVideoFiles) {
                const base64 = await fileToBase64(file);
                uploadedVideos.push(base64);
            }

            const listingData = {
                title: document.getElementById('listingTitle').value,
                category: document.getElementById('listingCategory').value,
                price: parseInt(document.getElementById('listingPrice').value),
                location: document.getElementById('listingLocation').value,
                phone: document.getElementById('listingPhone').value,
                description: document.getElementById('listingDescription').value,
                availability: document.getElementById('listingAvailability').value,
                images: uploadedImages,
                videos: uploadedVideos,
                verified: false
            };

            // FIXED: saveListing returns the listing object (or throws), not { success }
            const result = await saveListing(listingData);

            if (result) {
                showNotification('Listing published successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                showNotification('Failed to publish listing', 'error');
            }
        } catch (error) {
            console.error('Upload error:', error);
            showNotification('Failed to publish listing. Please try again.', 'error');
        } finally {
            publishBtn.innerHTML = originalText;
            publishBtn.disabled = false;
        }
    });

    // FIXED: Remove media items by index; re-render preview so indices stay in sync
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-media')) {
            const index = parseInt(e.target.dataset.index, 10);
            const isVideo = e.target.closest('#uploadedVideos') !== null;
            if (isVideo) {
                selectedVideoFiles.splice(index, 1);
                const uploadedVideosEl = document.getElementById('uploadedVideos');
                if (uploadedVideosEl) {
                    uploadedVideosEl.innerHTML = '';
                    selectedVideoFiles.forEach((file, i) => {
                        const videoItem = document.createElement('div');
                        videoItem.className = 'media-item';
                        videoItem.innerHTML = `
                            <video width="100" height="60" controls>
                                <source src="${URL.createObjectURL(file)}" type="${file.type}">
                            </video>
                            <button type="button" class="remove-media" data-index="${i}">×</button>
                        `;
                        uploadedVideosEl.appendChild(videoItem);
                    });
                }
            } else {
                selectedImageFiles.splice(index, 1);
                const uploadedImagesEl = document.getElementById('uploadedImages');
                if (uploadedImagesEl) {
                    uploadedImagesEl.innerHTML = '';
                    selectedImageFiles.forEach((file, i) => {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                            const imgItem = document.createElement('div');
                            imgItem.className = 'media-item';
                            imgItem.innerHTML = `
                                <img src="${ev.target.result}" alt="Upload">
                                <button type="button" class="remove-media" data-index="${i}">×</button>
                            `;
                            uploadedImagesEl.appendChild(imgItem);
                        };
                        reader.readAsDataURL(file);
                    });
                }
            }
        }
    });
}

    // FIXED: fileToBase64 moved to global scope so upload form submit can use it
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
    // Expose fileToBase64 for use inside form submit handler
    window.fileToBase64 = fileToBase64;


// FIXED: global fileToBase64 for upload page (initUploadForm runs only on upload.html)
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function loadUserListings() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    const userListings = await getUserListings();

    const container = document.getElementById('myListings');
    if (!container) return;

    if (userListings.length === 0) {
        container.innerHTML = '<p class="no-listings">No listings yet. Create your first listing above!</p>';
        return;
    }

    displayListings(userListings, 'myListings', true);
}

// Modal Handlers
function initModals() {
    // Close modals on X click
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) modal.style.display = 'none';
        });
    });
    
    // Specific close handlers
    const closeListingModal = document.getElementById('closeListingModal');
    if (closeListingModal) {
        closeListingModal.addEventListener('click', () => {
            const modal = document.getElementById('listingModal');
            if (modal) modal.style.display = 'none';
        });
    }
    
    // Close modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
}

// Utility function to process hashtags
function processHashtags(hashtagString) {
    if (!hashtagString || hashtagString.trim() === '') {
        return [];
    }

    // Split by spaces, commas, or newlines, and clean up
    return hashtagString
        .split(/[\s,]+/)
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .map(tag => tag.startsWith('#') ? tag : '#' + tag)
        .filter((tag, index, arr) => arr.indexOf(tag) === index); // Remove duplicates
}

// Search functionality
async function performSearch(query, filters = {}) {
    try {
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (filters.category) params.append('category', filters.category);
        if (filters.location) params.append('location', filters.location);
        if (filters.minPrice) params.append('minPrice', filters.minPrice);
        if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
        if (filters.hashtags) params.append('hashtags', filters.hashtags);

        const response = await fetch(`/api/listings/search?${params}`);
        const listings = await response.json();

        if (response.ok) {
            return listings;
        } else {
            throw new Error('Search failed');
        }
    } catch (error) {
        console.error('Search error:', error);
        return [];
    }
}

async function getTrendingHashtags() {
    try {
        const response = await fetch('/api/hashtags/trending');
        const hashtags = await response.json();
        return response.ok ? hashtags : [];
    } catch (error) {
        console.error('Trending hashtags error:', error);
        return [];
    }
}

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (!searchInput || !searchBtn) return;

    // Search on button click
    searchBtn.addEventListener('click', () => {
        performSearchAndDisplay(searchInput.value.trim());
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearchAndDisplay(searchInput.value.trim());
        }
    });

    // Real-time search with debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                performSearchAndDisplay(query);
            } else if (query.length === 0) {
                // Reset to all listings if search is cleared
                loadListingsPage();
                showNotification('Showing all listings', 'info');
            }
        }, 500);
    });
}

async function performSearchAndDisplay(query) {
    if (!query) return;

    showNotification('Searching...', 'info');

    const listings = await performSearch(query);

    if (listings.length > 0) {
        displayListings(listings, 'listingsContainer', false);
        showNotification(`Found ${listings.length} listings`, 'success');
    } else {
        document.getElementById('listingsContainer').innerHTML = `
            <div class="no-listings">
                <i class="fas fa-search"></i>
                <h3>No listings found</h3>
                <p>Try different keywords or check your spelling</p>
            </div>
        `;
        showNotification('No listings found', 'info');
    }
}

function searchByHashtag(hashtag) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = hashtag;
        performSearchAndDisplay(hashtag);
    }
}

function showAllHashtags(listingId, hashtags) {
    // Create a modal or tooltip to show all hashtags
    const modal = document.createElement('div');
    modal.className = 'hashtags-modal';
    modal.innerHTML = `
        <div class="hashtags-modal-content">
            <div class="hashtags-modal-header">
                <h3>All Hashtags</h3>
                <button class="close-modal" onclick="this.closest('.hashtags-modal').remove()">×</button>
            </div>
            <div class="hashtags-modal-body">
                ${hashtags.map(tag => `<span class="hashtag" onclick="searchByHashtag('${tag}')">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? 'var(--error)' : 'var(--success)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Page-specific load functions
async function loadOwnerHome() {
    try {
        // Load related listings (recent listings from other users)
        const allListings = await getListings();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        // Filter out user's own listings and get recent ones
        const relatedListings = allListings
            .filter(listing => listing.ownerId !== currentUser.id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6); // Show 6 related listings

        const relatedContainer = document.getElementById('relatedListings');
        if (relatedContainer) {
            if (relatedListings.length === 0) {
                relatedContainer.innerHTML = '<p class="no-listings">No related listings available at the moment.</p>';
            } else {
                displayListings(relatedListings, 'relatedListings', false);
            }
        }

    } catch (error) {
        console.error('Error loading owner home:', error);
        showNotification('Failed to load related listings. Please refresh the page.', 'error');
    }
}

async function loadFeaturedListings() {
    try {
        const listings = await getListings();
        // Show first 6 listings as featured
        const featuredListings = listings.slice(0, 6);
        displayListings(featuredListings, 'featuredListings', false);
    } catch (error) {
        console.error('Error loading featured listings:', error);
        // Fallback to sample data
        displayListings(sampleListings.slice(0, 6), 'featuredListings', false);
    }
}

async function loadListingsPage() {
    try {
        const listings = await getListings();
        displayListings(listings, 'listingsGrid', false);
    } catch (error) {
        console.error('Error loading listings page:', error);
        // Fallback to sample data
        displayListings(sampleListings, 'listingsGrid', false);
    }
}

// Messaging Functions
async function sendMessage(messageData) {
    try {
        const response = await fetch(`${API_BASE}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send message');
        }

        return { success: true, messageId: data.messageId };
    } catch (error) {
        console.error('Send message error:', error);
        throw error;
    }
}

async function getMessages() {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            return [];
        }

        const response = await fetch(`${API_BASE}/messages`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Get messages error:', data.message);
            return [];
        }

        return data.messages || [];
    } catch (error) {
        console.error('Get messages error:', error);
        return [];
    }
}

async function markMessageAsRead(messageId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Please login to mark messages as read');
        }

        const response = await fetch(`${API_BASE}/messages/${messageId}/read`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to mark message as read');
        }

        return { success: true };
    } catch (error) {
        console.error('Mark read error:', error);
        throw error;
    }
}

async function deleteMessage(messageId) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Please login to delete messages');
        }

        const response = await fetch(`${API_BASE}/messages/${messageId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to delete message');
        }

        return { success: true };
    } catch (error) {
        console.error('Delete message error:', error);
        throw error;
    }
}

async function replyToMessage(messageId, replyData) {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Please login to reply to messages');
        }

        const response = await fetch(`${API_BASE}/messages/${messageId}/reply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(replyData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to send reply');
        }

        return { success: true };
    } catch (error) {
        console.error('Reply message error:', error);
        throw error;
    }
}

// Inbox Page Functions
async function loadInboxMessages() {
    try {
        const messages = await getMessages();
        const messagesList = document.getElementById('messagesList');
        const noMessages = document.getElementById('noMessages');

        if (!messagesList) return;

        if (messages.length === 0) {
            messagesList.innerHTML = '';
            if (noMessages) noMessages.style.display = 'block';
            return;
        }

        if (noMessages) noMessages.style.display = 'none';

        messagesList.innerHTML = messages.map(message => {
            const date = new Date(message.createdAt).toLocaleDateString();
            const time = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return `
                <div class="message-item ${message.isRead ? 'read' : 'unread'}" data-id="${message._id}">
                    <div class="message-header">
                        <div class="sender-info">
                            <div class="sender-avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="sender-details">
                                <h4>${message.senderName}</h4>
                                <p>${message.senderEmail}</p>
                            </div>
                        </div>
                        <div class="message-meta">
                            <span class="message-date">${date} ${time}</span>
                            ${!message.isRead ? '<span class="unread-indicator"></span>' : ''}
                        </div>
                    </div>
                    <div class="message-preview">
                        <h5>${message.subject}</h5>
                        <p>${message.message.substring(0, 100)}${message.message.length > 100 ? '...' : ''}</p>
                        ${message.listingId ? `<p class="listing-reference">Regarding: ${message.listingId.title}</p>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        // Add click handlers
        messagesList.querySelectorAll('.message-item').forEach(item => {
            item.addEventListener('click', () => {
                const messageId = item.dataset.id;
                viewMessageDetail(messageId);
            });
        });

    } catch (error) {
        console.error('Error loading inbox messages:', error);
        showNotification('Failed to load messages. Please refresh the page.', 'error');
    }
}

async function viewMessageDetail(messageId) {
    try {
        const messages = await getMessages();
        const message = messages.find(m => m._id === messageId);

        if (!message) {
            showNotification('Message not found', 'error');
            return;
        }

        // Mark as read if not already
        if (!message.isRead) {
            await markMessageAsRead(messageId);
            // Update UI
            const messageItem = document.querySelector(`[data-id="${messageId}"]`);
            if (messageItem) {
                messageItem.classList.remove('unread');
                messageItem.classList.add('read');
                const indicator = messageItem.querySelector('.unread-indicator');
                if (indicator) indicator.remove();
            }
        }

        // Populate message detail view
        document.getElementById('messageSubject').textContent = message.subject;
        document.getElementById('messageDate').textContent = new Date(message.createdAt).toLocaleString();
        document.getElementById('senderName').textContent = message.senderName;
        document.getElementById('senderEmail').textContent = message.senderEmail;
        document.getElementById('senderPhone').textContent = message.senderPhone;
        document.getElementById('messageContent').textContent = message.message;

        // Show listing info if available
        const listingInfo = document.getElementById('listingInfo');
        if (message.listingId) {
            document.getElementById('listingTitle').textContent = message.listingId.title;
            document.getElementById('listingPrice').textContent = `RWF ${formatPrice(message.listingId.price)}`;
            document.getElementById('listingLocation').textContent = message.listingId.location;

            const listingImage = document.getElementById('listingImage');
            if (message.listingId.images && message.listingId.images.length > 0) {
                listingImage.src = message.listingId.images[0];
                listingImage.style.display = 'block';
            } else {
                listingImage.style.display = 'none';
            }

            listingInfo.style.display = 'block';
        } else {
            listingInfo.style.display = 'none';
        }

        // Show message detail view
        document.getElementById('messagesList').style.display = 'none';
        document.getElementById('messageDetail').style.display = 'block';
        document.getElementById('messageDetail').dataset.messageId = messageId;

    } catch (error) {
        console.error('Error viewing message detail:', error);
        showNotification('Failed to load message details', 'error');
    }
}

function closeMessageDetail() {
    document.getElementById('messageDetail').style.display = 'none';
    document.getElementById('messagesList').style.display = 'block';
}

function openReplyModal() {
    document.getElementById('replyModal').style.display = 'block';
}

function closeReplyModal() {
    document.getElementById('replyModal').style.display = 'none';
    document.getElementById('replyForm').reset();
}

// Inbox Event Handlers
function initInboxHandlers() {
    // Back to list button
    const backBtn = document.getElementById('backToList');
    if (backBtn) {
        backBtn.addEventListener('click', closeMessageDetail);
    }

    // Reply button
    const replyBtn = document.getElementById('replyBtn');
    if (replyBtn) {
        replyBtn.addEventListener('click', openReplyModal);
    }

    // Mark as read button
    const markReadBtn = document.getElementById('markReadBtn');
    if (markReadBtn) {
        markReadBtn.addEventListener('click', async () => {
            const messageId = document.getElementById('messageDetail').dataset.messageId;
            if (messageId) {
                try {
                    await markMessageAsRead(messageId);
                    showNotification('Message marked as read', 'success');
                } catch (error) {
                    showNotification('Failed to mark message as read', 'error');
                }
            }
        });
    }

    // Delete message button
    const deleteBtn = document.getElementById('deleteMessageBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            const messageId = document.getElementById('messageDetail').dataset.messageId;
            if (messageId && confirm('Are you sure you want to delete this message?')) {
                try {
                    await deleteMessage(messageId);
                    showNotification('Message deleted', 'success');
                    closeMessageDetail();
                    loadInboxMessages(); // Reload the list
                } catch (error) {
                    showNotification('Failed to delete message', 'error');
                }
            }
        });
    }

    // Reply form
    const replyForm = document.getElementById('replyForm');
    if (replyForm) {
        replyForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const messageId = document.getElementById('messageDetail').dataset.messageId;
            const subject = document.getElementById('replySubject').value;
            const message = document.getElementById('replyMessage').value;

            if (!messageId) return;

            try {
                await replyToMessage(messageId, { subject, message });
                showNotification('Reply sent successfully', 'success');
                closeReplyModal();
            } catch (error) {
                showNotification('Failed to send reply', 'error');
            }
        });
    }

    // Modal close handlers
    const modal = document.getElementById('replyModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeReplyModal();
            }
        });

        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeReplyModal);
        }
    }
}

// Product Details Functions
async function loadProductDetails(productId) {
    try {
        const response = await fetch(`${API_BASE}/listings/${productId}`);
        const data = await response.json();

        if (!response.ok || !data.listing) {
            document.getElementById('productDetailsContent').innerHTML = `
                <div class="no-listings">
                    <p>Product not found. <a href="listings.html">Browse all listings</a></p>
                </div>
            `;
            return;
        }

        const listing = data.listing;
        displayProductDetails(listing);

    } catch (error) {
        console.error('Error loading product details:', error);
        document.getElementById('productDetailsContent').innerHTML = `
            <div class="no-listings">
                <p>Failed to load product details. <a href="listings.html">Browse all listings</a></p>
            </div>
        `;
    }
}

function displayProductDetails(listing) {
    const container = document.getElementById('productDetailsContent');

    // Format price
    const formattedPrice = formatPrice(listing.price);

    // Handle images
    const hasImages = listing.images && listing.images.length > 0;
    const mainImage = hasImages ? listing.images[0] : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';

    // Handle videos
    const hasVideos = listing.videos && listing.videos.length > 0;

    // Format WhatsApp link
    const whatsappNumber = listing.ownerId?.phone ? listing.ownerId.phone.replace(/\D/g, '') : '';
    const whatsappLink = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=Hello, I'm interested in your listing: ${listing.title}` : '#';

    const html = `
        <div class="product-details-container">
            <div class="product-gallery">
                <div class="main-image-container">
                    ${hasVideos ? `
                        <video class="product-video" controls>
                            <source src="${listing.videos[0]}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    ` : `
                        <img src="${mainImage}" alt="${listing.title}" class="product-main-image" onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'">
                    `}
                </div>
                ${hasImages && listing.images.length > 1 ? `
                    <div class="image-thumbnails">
                        ${listing.images.slice(0, 4).map((image, index) => `
                            <img src="${image}" alt="Thumbnail ${index + 1}" class="thumbnail" onclick="changeMainImage('${image}')" onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200'">
                        `).join('')}
                    </div>
                ` : ''}
            </div>

            <div class="product-info">
                <div class="product-header">
                    <h1 class="product-title">${listing.title}</h1>
                    ${listing.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                </div>

                <div class="product-meta">
                    <div class="product-price">${formattedPrice} RWF</div>
                    <div class="product-category">${listing.category.toUpperCase()}</div>
                    <div class="product-location">📍 ${listing.location}</div>
                </div>

                <div class="product-description">
                    <h3>Description</h3>
                    <p>${listing.description}</p>
                </div>

                <div class="owner-info">
                    <h3>Owner Information</h3>
                    <div class="owner-details">
                        <div class="owner-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="owner-contact">
                            <p><strong>${listing.ownerId?.name || 'Owner'}</strong></p>
                            <p>📞 ${listing.ownerId?.phone || 'Phone not available'}</p>
                        </div>
                    </div>
                </div>

                <div class="product-actions">
                    <button class="btn btn-primary btn-large" onclick="contactOwner('${listing._id}', '${listing.title}', '${listing.ownerId?._id || ''}')">
                        <i class="fas fa-envelope"></i> Send Message
                    </button>
                    <a href="tel:${listing.phone}" class="btn btn-secondary btn-large">
                        <i class="fas fa-phone"></i> Call
                    </a>
                    ${whatsappLink !== '#' ? `
                        <a href="${whatsappLink}" target="_blank" class="btn btn-success btn-large">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `;

    container.innerHTML = html;
}

function changeMainImage(imageSrc) {
    const mainImage = document.querySelector('.product-main-image');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

async function contactOwner(listingId, listingTitle, ownerId) {
    // Create message modal
    const modal = document.createElement('div');
    modal.id = 'contactModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Contact Owner</h3>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <div class="listing-reference">
                    <h4>Regarding: ${listingTitle}</h4>
                </div>
                <form id="contactForm">
                    <div class="form-group">
                        <label for="contactName">Your Name *</label>
                        <input type="text" id="contactName" required>
                    </div>
                    <div class="form-group">
                        <label for="contactEmail">Your Email *</label>
                        <input type="email" id="contactEmail" required>
                    </div>
                    <div class="form-group">
                        <label for="contactPhone">Your Phone *</label>
                        <input type="tel" id="contactPhone" required>
                    </div>
                    <div class="form-group">
                        <label for="contactSubject">Subject *</label>
                        <input type="text" id="contactSubject" value="Inquiry about ${listingTitle}" required>
                    </div>
                    <div class="form-group">
                        <label for="contactMessage">Message *</label>
                        <textarea id="contactMessage" rows="5" placeholder="Hello, I'm interested in this listing. Please provide more details..." required></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-secondary" onclick="closeContactModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Form submission
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const messageData = {
            senderName: document.getElementById('contactName').value,
            senderEmail: document.getElementById('contactEmail').value,
            senderPhone: document.getElementById('contactPhone').value,
            recipientId: ownerId,
            listingId: listingId,
            subject: document.getElementById('contactSubject').value,
            message: document.getElementById('contactMessage').value
        };

        try {
            await sendMessage(messageData);
            showNotification('Message sent successfully! The owner will contact you soon.', 'success');
            closeContactModal();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        }
    });

    // Close modal handlers
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeContactModal();
        }
    });

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', closeContactModal);
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.remove();
    }
}

// Navigation Toggle Functionality
function initNavigationToggles() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const sectionName = button.dataset.section;
            const section = document.getElementById(`${sectionName}Section`);
            
            if (!section) return;
            
            // Hide all content sections first
            document.querySelectorAll('.content-section').forEach(sec => {
                sec.classList.remove('active');
            });
            
            // Remove active class from all action buttons
            document.querySelectorAll('.action-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show the clicked section
            section.classList.add('active');
            button.classList.add('active');
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Load content for the section
            if (sectionName === 'listings') {
                loadOwnerListings();
            }
        });
    });
}

// Profile Dropdown Functionality
function initProfileDropdown() {
    const profileBtn = document.getElementById('profileBtn');
    const profileMenu = document.getElementById('profileMenu');
    
    if (profileBtn && profileMenu) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileMenu.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
                profileMenu.classList.remove('show');
            }
        });
    }
}

async function loadOwnerListings() {
    try {
        const userListings = await getUserListings();
        const myListingsContainer = document.getElementById('myListings');
        const noMyListings = document.getElementById('noMyListings');

        if (userListings.length === 0) {
            if (myListingsContainer) myListingsContainer.innerHTML = '';
            if (noMyListings) noMyListings.style.display = 'block';
        } else {
            if (noMyListings) noMyListings.style.display = 'none';
            displayListings(userListings, 'myListings', true);
        }

    } catch (error) {
        console.error('Error loading owner listings:', error);
        showNotification('Failed to load your listings. Please refresh the page.', 'error');
    }
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                subject: document.getElementById('contactSubject').value,
                message: document.getElementById('contactMessage').value
            };
            
            // For now, just show a success message
            // In a real implementation, you'd send this to a contact endpoint
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    initializeStorage();
    initNavigation();
    initModals();

    // Page-specific initializations
    if (window.location.pathname.includes('dashboard.html')) {
        if (checkAuth()) {
            initLogout();
            initNavigationToggles();
            initProfileDropdown();
            initContactForm();
            await loadDashboardListings();
            initListingForm();
        } else {
            window.location.href = 'login.html';
        }
    } else if (window.location.pathname.includes('upload.html')) {
        if (checkAuth()) {
            initLogout();
            initNavigationToggles();
            initProfileDropdown();
            initContactForm();
            initUploadForm();
            await loadUserListings();
        } else {
            window.location.href = 'login.html';
        }
    } else if (window.location.pathname.includes('owner-home.html')) {
        if (checkAuth()) {
            initLogout();
            initNavigationToggles();
            initProfileDropdown();
            initContactForm();
            await loadOwnerHome();
        } else {
            window.location.href = 'login.html';
        }
    } else if (window.location.pathname.includes('listings.html')) {
        await loadListingsPage();
        initFilters();
        initSearch();
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/bebe/') || window.location.pathname.endsWith('/bebe')) {
        await loadFeaturedListings();
    } else if (window.location.pathname.includes('contact.html')) {
        initContactForm();
    } else if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
        initAuthForms();
    } else if (window.location.pathname.includes('inbox.html')) {
        if (checkAuth()) {
            initLogout();
            initNavigationToggles();
            initProfileDropdown();
            initContactForm();
            loadInboxMessages();
            initInboxHandlers();
        } else {
            window.location.href = 'login.html';
        }
    } else if (window.location.pathname.includes('product.html')) {
        // Product details page - no auth required for viewing
        initNavigation();
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

