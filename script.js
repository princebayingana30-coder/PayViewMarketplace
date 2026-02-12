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
}

// Authentication
// Authentication
// Authentication
const API_URL = 'http://localhost:3000/api';
const SERVER_URL = 'http://localhost:3000';

function getMediaUrl(path) {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('//')) return path;

    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;

    // Check if it's a video file
    const isVideo = cleanPath.match(/\.(mp4|webm|ogg)$/i);
    if (isVideo) {
        // Extract filename from path (assuming path is like 'uploads/filename.mp4' or just 'filename.mp4')
        const filename = cleanPath.split('/').pop();
        return `${API_URL}/stream/${filename}`;
    }

    return `${SERVER_URL}/${cleanPath}`;
}

function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // Check if we are on a protected page
    const protectedPages = ['dashboard.html', 'upload.html', 'inbox.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage)) {
        if (!token || !user) {
            window.location.href = 'login.html';
            return false;
        }
    }

    // Update navigation based on auth state
    updateAuthUI(!!token);
    return !!token;
}

function updateAuthUI(isLoggedIn) {
    const navMenu = document.getElementById('navMenu');
    if (!navMenu) return;

    // Remove existing auth links
    const authLinks = navMenu.querySelectorAll('.auth-link');
    authLinks.forEach(link => link.remove());

    if (isLoggedIn) {
        // Add Dashboard and Logout
        const dashboardLi = document.createElement('li');
        dashboardLi.className = 'auth-link';
        dashboardLi.innerHTML = '<a href="dashboard.html">Dashboard</a>';
        navMenu.appendChild(dashboardLi);

        const logoutLi = document.createElement('li');
        logoutLi.className = 'auth-link';
        logoutLi.innerHTML = '<a href="#" onclick="logout(event)">Logout</a>';
        navMenu.appendChild(logoutLi);
    } else {
        // Add Login and Register
        const loginLi = document.createElement('li');
        loginLi.className = 'auth-link';
        loginLi.innerHTML = '<a href="login.html">Login</a>';
        navMenu.appendChild(loginLi);

        const registerLi = document.createElement('li');
        registerLi.className = 'auth-link';
        registerLi.innerHTML = '<a href="register.html" class="btn btn-primary" style="padding: 0.5rem 1rem;">Register</a>';
        navMenu.appendChild(registerLi);
    }
}

function logout(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}
window.logout = logout;

async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true, user: data.user };
        } else {
            return { success: false, message: data.message || 'Login failed' };
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Network error. Please ensure the server is running on port 3000.' };
    }
}

async function register(userData) {
    try {
        if (userData.password !== userData.confirmPassword) {
            return { success: false, message: 'Passwords do not match' };
        }

        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                password: userData.password
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return { success: true, user: data.user };
        } else {
            return { success: false, message: data.message || 'Registration failed' };
        }
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, message: 'Network error. Please ensure the server is running on port 3000.' };
    }
}


// Listings Management
function getListings() {
    return JSON.parse(localStorage.getItem('listings'));
}

function saveListing(listing) {
    const listings = getListings();
    if (listing.id) {
        const index = listings.findIndex(l => l.id === listing.id);
        if (index !== -1) {
            listings[index] = listing;
        }
    } else {
        listing.id = Date.now();
        listing.createdAt = new Date().toISOString();
        listing.views = 0;
        listing.ownerId = JSON.parse(localStorage.getItem('currentUser')).id;
        listings.push(listing);
    }
    localStorage.setItem('listings', JSON.stringify(listings));
    return listing;
}

function deleteListing(id) {
    const listings = getListings();
    const filtered = listings.filter(l => l.id !== id);
    localStorage.setItem('listings', JSON.stringify(filtered));
}

function getListingById(id) {
    const listings = getListings();
    return listings.find(l => l.id === parseInt(id));
}


// -------------------- DISPLAY --------------------

function displayListings(listings, containerId, isOwnerView = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (!listings || listings.length === 0) {
        container.innerHTML = "<p>No listings found.</p>";
        return;
    }

    container.innerHTML = listings.map(listing => {
        let mediaHtml = '';
        let mediaType = 'image';
        let mediaSrc = '';

        if (listing.images && listing.images.length > 0) {
            mediaSrc = getMediaUrl(listing.images[0]);
            mediaHtml = `<img src="${mediaSrc}" alt="${listing.title}" class="listing-image" 
                         onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'"
                         onclick="event.stopPropagation(); openMediaFullscreen('${mediaSrc}', 'image', '${listing.title.replace(/'/g, "\\'")}')">`;
        } else if (listing.videos && listing.videos.length > 0) {
            mediaType = 'video';
            mediaSrc = getMediaUrl(listing.videos[0]);
            mediaHtml = `
                <div class="video-thumbnail-container" onclick="event.stopPropagation(); openMediaFullscreen('${mediaSrc}', 'video', '${listing.title.replace(/'/g, "\\'")}')" style="position: relative; width: 100%; height: 200px; background: #000; overflow: hidden; cursor: pointer;">
                    <video src="${mediaSrc}" style="width: 100%; height: 100%; object-fit: cover;"></video>
                    <div class="play-icon-overlay" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 3rem; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">
                        <i class="fas fa-play-circle"></i>
                    </div>
                </div>
            `;
        } else {
            mediaSrc = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';
            mediaHtml = `<img src="${mediaSrc}" alt="${listing.title}" class="listing-image" 
                         onclick="event.stopPropagation(); openMediaFullscreen('${mediaSrc}', 'image', '${listing.title.replace(/'/g, "\\'")}')">`;
        }

        // Handle MongoDB _id or string id
        const id = listing._id || listing.id;

        return `
            <div class="listing-card" data-id="${id}">
                ${mediaHtml}
                <div class="listing-content">
                    <div class="listing-header">
                        <h3 class="listing-title">${listing.title}</h3>
                        ${listing.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                    </div>
                    <div class="listing-category">${listing.category.toUpperCase()}</div>
                    <div class="listing-location">📍 ${listing.location}</div>
                    <div class="listing-price">${formatPrice(listing.price)} RWF</div>
                    ${listing.phone ? `<div class="listing-location" style="margin-top: 0.5rem;">📞 ${listing.phone}</div>` : ''}
                    <p style="color: var(--text-secondary); margin-top: 0.5rem;">${listing.description}</p>
                    ${isOwnerView ? `
                        <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                            <!-- Edit not implemented yet -->
                            <!-- <button class="btn btn-secondary" onclick="event.stopPropagation(); editListing('${id}')" style="flex: 1;">Edit</button> -->
                            <button class="btn" onclick="event.stopPropagation(); deleteListingConfirm('${id}')" style="flex: 1; background: var(--error);">Delete</button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }).join('');


    // Add click handlers - link to product details page
    container.querySelectorAll('.listing-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('button')) {
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

// Full-screen Media Viewer
function openMediaFullscreen(src, type, title) {
    // Remove existing modal if any
    const existingModal = document.getElementById('mediaFullscreenModal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.id = 'mediaFullscreenModal';

    let contentHtml = '';
    if (type === 'video') {
        contentHtml = `
            <video id="fullscreenVideo" controls autoplay style="max-width: 100%; max-height: 80vh; border-radius: 8px;">
                <source src="${src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        `;
    } else {
        contentHtml = `
            <img src="${src}" alt="${title}" style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 8px;">
        `;
    }

    modal.innerHTML = `
        <div class="video-modal-overlay" onclick="closeMediaFullscreen()">
            <div class="video-modal-content" onclick="event.stopPropagation()">
                <div class="video-modal-header">
                    <h3>${title}</h3>
                    <button class="video-modal-close" onclick="closeMediaFullscreen()">✕</button>
                </div>
                <div class="video-modal-body" style="display: flex; justify-content: center; align-items: center; background: black;">
                    ${contentHtml}
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        // Initialize Plyr if it's a video
        if (type === 'video' && typeof Plyr !== 'undefined') {
            const videoElement = document.getElementById('fullscreenVideo');
            if (videoElement) {
                new Plyr(videoElement, {
                    autoplay: true,
                    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']
                });
            }
        }
    }, 10);

    // Reuse existing styles if present, or add if missing. 
    // Usually only needs to run once, but safe to check.
    if (!document.getElementById('mediaFullscreenStyles')) {
        const style = document.createElement('style');
        style.id = 'mediaFullscreenStyles';
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
                max-width: 95vw;
                max-height: 95vh;
                width: auto;
                min-width: 300px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
            }
            .video-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem 1.5rem;
                border-bottom: 1px solid var(--border-color);
                background: var(--bg-secondary);
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
                padding: 0;
                background: black;
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }
}

function closeMediaFullscreen() {
    const modal = document.getElementById('mediaFullscreenModal');
    if (modal) {
        modal.remove();
    }
}

// Close media modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMediaFullscreen();
    }
});

function formatPrice(price) {
    return new Intl.NumberFormat("en-RW").format(price);
}

// Listing Detail View (for owner dashboard modal)
function viewListingDetail(id, isOwnerView = false) {
    const listing = getListingById(id);
    if (!listing) return;

    const modal = document.getElementById('listingModal');
    const content = document.getElementById('listingModalContent');

    if (modal && content) {
        content.innerHTML = `
            <div class="listing-detail">
                <div class="listing-detail-images">
                    ${(listing.images && listing.images.length > 0) || (listing.videos && listing.videos.length > 0)
                ? `
                    ${(listing.images || []).map(img =>
                    `<img src="${getMediaUrl(img)}" alt="${listing.title}" 
                                  onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'"
                                  onclick="openMediaFullscreen('${getMediaUrl(img)}', 'image', '${listing.title.replace(/'/g, "\\'")}')">`
                ).join('')}
                    ${(listing.videos || []).map(vid =>
                    `<div class="video-thumbnail-container" onclick="openMediaFullscreen('${getMediaUrl(vid)}', 'video', '${listing.title.replace(/'/g, "\\'")}')" style="position: relative; height: 100px; background: #000; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                            <video src="${getMediaUrl(vid)}" style="max-width: 100%; max-height: 100%;"></video>
                            <i class="fas fa-play-circle" style="position: absolute; color: white; font-size: 2rem;"></i>
                        </div>`
                ).join('')}
                  `
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
    try {
        const response = await fetch(`${API_URL}/listings/${id}`);
        if (!response.ok) throw new Error('Listing not found');

        const listing = await response.json();

        // Update views (optional: backend should handle this)
        // const listings = getListings();
        // ... (removed local storage logic)

        const images = (listing.images || []).map(img => ({ src: getMediaUrl(img), type: 'image' }));
        const videos = (listing.videos || []).map(vid => ({ src: getMediaUrl(vid), type: 'video' }));
        const allMedia = [...images, ...videos];
        const mainMedia = allMedia.length > 0 ? allMedia[0] : null;

        const content = document.getElementById('productDetailsContent');
        if (!content) return;

        content.innerHTML = `
            <div class="product-details-container">
                <div class="product-details-header">
                    <a href="listings.html" style="color: var(--neon-cyan); text-decoration: none; margin-bottom: 1rem; display: inline-block;">← Back to Listings</a>
                    <h1>${listing.title}</h1>
                    ${listing.verified ? '<span class="verified-badge">✓ Verified</span>' : ''}
                </div>
                
                <div class="product-details-grid">
                    <div class="product-media">
                        <div class="product-main-media" id="mainMedia" style="cursor: zoom-in;">
                            ${mainMedia ? (mainMedia.type === 'video'
                ? `<video src="${mainMedia.src}" controls onclick="openMediaFullscreen('${mainMedia.src}', 'video', '${listing.title.replace(/'/g, "\\'")}')"></video>`
                : `<img src="${mainMedia.src}" alt="${listing.title}" 
                       onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'"
                       onclick="openMediaFullscreen('${mainMedia.src}', 'image', '${listing.title.replace(/'/g, "\\'")}')">`
            ) : '<div class="listing-image-placeholder" style="height: 400px;">📷</div>'}
                        </div>
                        ${allMedia.length > 1 ? `
                            <div class="product-media-thumbnails">
                                ${allMedia.map((media, idx) => `
                                    <div class="media-thumbnail-wrapper ${idx === 0 ? 'active' : ''}" 
                                         onclick="changeMainMedia('${media.src}', ${media.type === 'video'})">
                                        ${media.type === 'video'
                    ? `<video src="${media.src}" class="media-thumbnail"></video><i class="fas fa-play-circle thumbnail-play-icon"></i>`
                    : `<img src="${media.src}" alt="Media ${idx + 1}" class="media-thumbnail">`}
                                    </div>
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
                            <h3>Description</h3>
                            <p>${listing.description}</p>
                        </div>
                        
                        <div class="product-hashtags">
                            ${listing.hashtags ? listing.hashtags.map(tag => `<span class="hashtag">#${tag}</span>`).join('') : ''}
                        </div>

                        <div class="product-actions">
                            <button class="btn btn-primary btn-block" onclick="contactSeller('${listing.ownerId}')">Contact Seller</button>
                            ${listing.phone ? `
                                <a href="tel:${listing.phone}" class="btn btn-secondary btn-block" style="text-align: center; margin-top: 1rem;">
                                    <i class="fas fa-phone"></i> Call Seller
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading product details:', error);
        document.getElementById('productDetailsContent').innerHTML = `
            <div class="no-listings">
                <p>Product not found. <a href="listings.html">Browse all listings</a></p>
            </div>
        `;
    }
}


// Change main media on thumbnail click
function changeMainMedia(mediaUrl, isVideo) {
    const mainMedia = document.getElementById('mainMedia');
    if (!mainMedia) return;

    if (isVideo) {
        mainMedia.innerHTML = `<video src="${mediaUrl}" controls onclick="openMediaFullscreen('${mediaUrl}', 'video', 'Listing Media')"></video>`;
    } else {
        mainMedia.innerHTML = `<img src="${mediaUrl}" alt="Product" 
                                    onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'"
                                    onclick="openMediaFullscreen('${mediaUrl}', 'image', 'Listing Media')">`;
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
    const uploadArea = document.getElementById('imageUploadZone');
    const fileInput = document.getElementById('listingImages');
    const previewGrid = document.getElementById('uploadedImages');

    if (!uploadArea || !fileInput) return;

    let uploadedImages = [];
    let uploadedImageFiles = []; // Store actual File objects

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
                uploadedImageFiles.push(file); // Store file object
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

        // Removed placeholder logic as it doesn't match HTML structure

        previewGrid.innerHTML = uploadedImages.map((img, index) => `
    <div class="image-preview">
        <img src="${img}" alt="Preview ${index + 1}">
            <button type="button" class="remove-image" onclick="removeImage(${index})">×</button>
        </div>
`).join('');
    }

    window.removeImage = (index) => {
        uploadedImages.splice(index, 1);
        uploadedImageFiles.splice(index, 1); // Remove file object
        updateImagePreview();
    };

    window.getUploadedImages = () => uploadedImages;
    window.getUploadedImageFiles = () => uploadedImageFiles; // Expose file objects
    window.clearUploadedImages = () => {
        uploadedImages = [];
        uploadedImageFiles = [];
        updateImagePreview();
        if (fileInput) fileInput.value = '';
    };
}

// Video Upload Handler
function initVideoUpload() {
    const uploadArea = document.getElementById('videoUploadZone');
    const fileInput = document.getElementById('listingVideos');
    const previewGrid = document.getElementById('uploadedVideos');

    if (!uploadArea || !fileInput) return;

    let uploadedVideos = [];
    let uploadedVideoFiles = []; // Store actual File objects

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
                uploadedVideoFiles.push(file); // Store file object
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

        // Removed placeholder logic as it doesn't match HTML structure

        previewGrid.innerHTML = uploadedVideos.map((video, index) => `
    <div class="video-preview">
                <video src="${video}" controls></video>
                <button type="button" class="remove-video" onclick="removeVideo(${index})">×</button>
            </div>
    `).join('');
    }

    window.removeVideo = (index) => {
        uploadedVideos.splice(index, 1);
        uploadedVideoFiles.splice(index, 1); // Remove file object
        updateVideoPreview();
    };

    window.getUploadedVideos = () => uploadedVideos;
    window.getUploadedVideoFiles = () => uploadedVideoFiles; // Expose file objects
    window.clearUploadedVideos = () => {
        uploadedVideos = [];
        uploadedVideoFiles = [];
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

function openListingForm(listingId = null) {
    const modal = document.getElementById('listingFormModal');
    const form = document.getElementById('listingForm');
    const title = document.getElementById('listingFormTitle');

    if (listingId) {
        const listing = getListingById(listingId);
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
        form.dataset.listingId = "";
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

function saveListingFromForm() {
    const form = document.getElementById('listingForm');
    const listingId = form.dataset.listingId;

    const images = window.getUploadedImages ? window.getUploadedImages() : [];
    const videos = window.getUploadedVideos ? window.getUploadedVideos() : [];

    // For demo, use placeholder if no images uploaded
    if (images.length === 0) {
        images.push('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800');
    }

    const listing = {
        id: listingId ? parseInt(listingId) : null,
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

    // Preserve existing ownerId and views if editing
    if (listingId) {
        const existing = getListingById(parseInt(listingId));
        if (existing) {
            listing.ownerId = existing.ownerId;
            listing.views = existing.views || 0;
            listing.createdAt = existing.createdAt;
        }
    }

    saveListing(listing);
    closeListingForm();
    loadDashboardListings();
    showNotification('Listing saved successfully!');
}

function editListing(id) {
    openListingForm(id);
}

async function deleteListingConfirm(id) {
    if (confirm('Are you sure you want to delete this listing?')) {
        try {
            const response = await fetch(`${API_URL}/listings/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                showNotification('Listing deleted successfully!');
                loadDashboardListings();
            } else {
                showNotification('Failed to delete listing', 'error');
            }
        } catch (error) {
            console.error('Delete error:', error);
            showNotification('Error deleting listing', 'error');
        }
    }
}
window.deleteListingConfirm = deleteListingConfirm;

// Dashboard
async function loadDashboardListings() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    document.getElementById('ownerName').textContent = user.name;

    try {
        const response = await fetch(`${API_URL}/listings/my`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            // Sort by newest first
            const listings = data.listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            // Show only first 4 in recent View
            const recentListings = listings.slice(0, 4);

            displayListings(recentListings, 'recentListingsGrid', true);

            // Update stats
            const totalViews = listings.reduce((sum, l) => sum + (l.views || 0), 0);
            const verifiedCount = listings.filter(l => l.verified).length;

            const totalListingsEl = document.getElementById('totalListings');
            const totalViewsEl = document.getElementById('totalViews');
            const verifiedListingsEl = document.getElementById('verifiedListings');

            if (totalListingsEl) totalListingsEl.textContent = listings.length;

            if (totalViewsEl) totalViewsEl.textContent = totalViews;
            if (verifiedListingsEl) verifiedListingsEl.textContent = verifiedCount;

            const noListings = document.getElementById('noRecentListings');
            if (noListings) {
                noListings.style.display = recentListings.length === 0 ? 'block' : 'none';
            }
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showNotification('Failed to load listings', 'error');
    }
}

async function loadAllMyListings() {
    try {
        const response = await fetch(`${API_URL}/listings/my`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            // Show all listings
            displayListings(data.listings, 'myListings', true);

            const noListings = document.getElementById('noMyListings');
            if (noListings) {
                noListings.style.display = data.listings.length === 0 ? 'block' : 'none';
            }
        }
    } catch (error) {
        console.error('Error loading my listings:', error);
    }
}

function initDashboardNavigation() {
    const buttons = document.querySelectorAll('.action-btn');
    const sections = document.querySelectorAll('.content-section');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.section;
            let targetId = `${target}Section`;

            // Map 'home' to 'dashboardSection'
            if (target === 'home') {
                targetId = 'dashboardSection';
            }

            // Update active state for buttons
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show target section, hide others
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            // If switching to listings, load them
            if (target === 'listings') {
                loadAllMyListings();
            }
        });
    });
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


// Upload Form (upload.html)
function initUploadForm() {
    const form = document.getElementById('uploadListingForm');
    if (!form) return;

    // Multi-step navigation
    const steps = form.querySelectorAll('.form-step');
    const nextBtns = form.querySelectorAll('.next-step');
    const prevBtns = form.querySelectorAll('.prev-step');
    const progressSteps = document.querySelectorAll('.progress-steps .step');
    const progressFill = document.querySelector('.progress-fill');

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = btn.closest('.form-step');
            const stepNum = parseInt(currentStep.dataset.step);
            if (validateStep(stepNum)) {
                if (stepNum === 2) updatePreview();
                goToStep(stepNum + 1);
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentStep = btn.closest('.form-step');
            const stepNum = parseInt(currentStep.dataset.step);
            goToStep(stepNum - 1);
        });
    });

    function goToStep(stepNum) {
        steps.forEach(s => s.classList.remove('active'));
        form.querySelector(`.form-step[data-step="${stepNum}"]`).classList.add('active');

        progressSteps.forEach(s => {
            const sNum = parseInt(s.dataset.step);
            if (sNum <= stepNum) s.classList.add('active');
            else s.classList.remove('active');
        });

        progressFill.style.width = `${(stepNum / 3) * 100}%`;
    }

    function validateStep(stepNum) {
        if (stepNum === 1) {
            const requiredIds = ['listingTitle', 'listingCategory', 'listingPrice', 'listingLocation', 'listingPhone', 'listingDescription'];
            let isValid = true;
            requiredIds.forEach(id => {
                const el = document.getElementById(id);
                if (!el.value) {
                    el.style.borderColor = 'red';
                    isValid = false;
                } else {
                    el.style.borderColor = '';
                }
            });
            if (!isValid) showNotification('Please fill in all required fields', 'error');
            return isValid;
        }
        return true;
    }

    function updatePreview() {
        document.getElementById('previewTitle').textContent = document.getElementById('listingTitle').value;
        const price = document.getElementById('listingPrice').value;
        document.getElementById('previewPrice').textContent = price ? formatPrice(price) + ' RWF' : 'Price TBD';
        document.getElementById('previewLocation').textContent = document.getElementById('listingLocation').value;
        document.getElementById('previewDescription').textContent = document.getElementById('listingDescription').value;
    }

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = document.getElementById('publishBtn');
        const originalText = submitBtn.innerHTML;

        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Publishing...';
            submitBtn.disabled = true;

            // 1. Upload files
            const imageFiles = window.getUploadedImageFiles();
            const videoFiles = window.getUploadedVideoFiles();

            let imageUrls = [];
            let videoUrls = [];

            if (imageFiles.length > 0) {
                const imgData = new FormData();
                imageFiles.forEach(file => imgData.append('files', file));

                const imgRes = await fetch(`${API_URL}/upload`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                    body: imgData
                });

                if (imgRes.ok) {
                    const data = await imgRes.json();
                    imageUrls = data.urls;
                }
            }

            if (videoFiles.length > 0) {
                const vidData = new FormData();
                videoFiles.forEach(file => vidData.append('files', file));

                const vidRes = await fetch(`${API_URL}/upload`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
                    body: vidData
                });

                if (vidRes.ok) {
                    const data = await vidRes.json();
                    videoUrls = data.urls;
                }
            }

            // 2. Create Listing
            const listingData = {
                title: document.getElementById('listingTitle').value,
                category: document.getElementById('listingCategory').value,
                price: parseInt(document.getElementById('listingPrice').value),
                location: document.getElementById('listingLocation').value,
                phone: document.getElementById('listingPhone').value,
                description: document.getElementById('listingDescription').value,
                hashtags: document.getElementById('listingHashtags').value.split(' ').filter(t => t),
                availability: document.getElementById('listingAvailability').value,
                images: imageUrls,
                videos: videoUrls,
                verified: false
            };

            const res = await fetch(`${API_URL}/listings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(listingData)
            });

            if (res.ok) {
                showNotification('Listing published successfully!', 'success');
                setTimeout(() => window.location.href = 'dashboard.html', 2000);
            } else {
                const data = await res.json();
                throw new Error(data.message || 'Failed to create listing');
            }

        } catch (error) {
            console.error('Publish error:', error);
            showNotification(error.message, 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
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
    try {
        const response = await fetch(`${API_URL}/listings`);
        if (!response.ok) throw new Error('Failed to load listings');

        const data = await response.json();
        let listings = data.listings;

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
    } catch (error) {
        console.error('Error loading listings:', error);
        const container = document.getElementById('listingsGrid');
        if (container) container.innerHTML = '<p>Error loading listings. Please try again later.</p>';
    }
}

// Home Page Featured Listings
async function loadFeaturedListings() {
    try {
        const response = await fetch(`${API_URL}/listings`);
        if (!response.ok) throw new Error('Failed to load listings');

        const data = await response.json();
        let listings = data.listings;

        // Show only first 3 newest
        listings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        listings = listings.slice(0, 3);

        displayListings(listings, 'featuredListings');
    } catch (error) {
        console.error('Error loading featured listings:', error);
    }
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

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const submitBtn = loginForm.querySelector('button[type="submit"]');

            // Show loading state
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Logging in...';
            submitBtn.disabled = true;

            const result = await login(email, password);

            if (result.success) {
                window.location.href = 'dashboard.html';
            } else {
                showNotification(result.message || 'Login failed', 'error');
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;

            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }

            const userData = {
                name: document.getElementById('regName').value,
                email: document.getElementById('regEmail').value,
                phone: document.getElementById('regPhone').value,
                password: password,
                confirmPassword: confirmPassword
            };

            const submitBtn = registerForm.querySelector('button[type="submit"]');
            // Show loading state
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Creating Account...';
            submitBtn.disabled = true;

            const result = await register(userData);
            if (result.success) {
                showNotification('Registration successful! Redirecting...', 'success');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            } else {
                showNotification(result.message || 'Registration failed', 'error');
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Logout
function initLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
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


// Initialize on page load
// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // initializeStorage(); // Removed: Using API now
    initNavigation();
    initModals();

    // Page-specific initializations
    if (window.location.pathname.includes('dashboard.html')) {
        if (checkAuth()) {
            loadDashboardListings();
            initListingForm();
            initDashboardNavigation();
            initLogout();
        }
    } else if (window.location.pathname.includes('listings.html')) {
        loadListingsPage();
        initFilters();
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/bebe/') || window.location.pathname.endsWith('/bebe')) {
        loadFeaturedListings();
    } else if (window.location.pathname.includes('contact.html')) {
        initContactForm();
    } else if (window.location.pathname.includes('upload.html')) {
        // Auth check happens in checkAuth() at start
        initUploadForm();
        initImageUpload();
        initVideoUpload();
        initLogout();
        initSectionNavigation();
    } else if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
        initAuthForms();
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

// Section Navigation for upload.html
function initSectionNavigation() {
    const buttons = document.querySelectorAll('.action-btn');
    const sections = document.querySelectorAll('.content-section');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.section;

            // Map 'home' to 'uploadSection' as it's the main content of this page
            const targetId = target === 'home' ? 'uploadSection' : `${target}Section`;

            // Update active state for buttons
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active'); // Add active class to clicked button

            // Show target section, hide others
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });

            // Specialized handling for 'my listings' if needed
            if (target === 'listings') {
                // Re-use display logic if possible, or fetch owner listings
                // Since loadDashboardListings is for dashboard, we might need a similar one here
                // or just reuse displayListings if we fetch the data.
                // For now, let's just make sure the tab switches. 
                // We can check if we need to load data:
                const myListingsContainer = document.getElementById('myListings');
                if (myListingsContainer && myListingsContainer.children.length === 0) {
                    // Try to load listings if empty
                    loadOwnerListingsForUploadPage();
                }
            }
        });
    });
}

async function loadOwnerListingsForUploadPage() {
    try {
        const response = await fetch(`${API_URL}/listings/my`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayListings(data.listings, 'myListings', true);
        }
    } catch (error) {
        console.error('Error loading my listings:', error);
    }
}

