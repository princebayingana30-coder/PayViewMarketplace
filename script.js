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
function checkAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && window.location.pathname.includes('dashboard.html')) {
        return true;
    } else if (!currentUser && window.location.pathname.includes('dashboard.html')) {
        window.location.href = 'login.html';
        return false;
    }
    return !!currentUser;
}

function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user };
    }
    return { success: false, message: 'Invalid email or password' };
}

function register(userData) {
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (users.find(u => u.email === userData.email)) {
        return { success: false, message: 'Email already registered' };
    }
    
    if (userData.password !== userData.confirmPassword) {
        return { success: false, message: 'Passwords do not match' };
    }
    
    const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    return { success: true, user: newUser };
}

function logout() {
    localStorage.setItem('currentUser', JSON.stringify(null));
    window.location.href = 'index.html';
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

    if (listings.length === 0) {
        container.innerHTML = "<p>No listings found.</p>";
        return;
    }
    
    container.innerHTML = listings.map(listing => {
        const imageUrl = listing.images && listing.images.length > 0 
            ? listing.images[0] 
            : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800';
        
        return `
            <div class="listing-card" data-id="${listing.id}">
                <img src="${imageUrl}" alt="${listing.title}" class="listing-image" 
                     onerror="this.src='https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'">
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
                            <button class="btn btn-secondary" onclick="event.stopPropagation(); editListing(${listing.id})" style="flex: 1;">Edit</button>
                            <button class="btn" onclick="event.stopPropagation(); deleteListingConfirm(${listing.id})" style="flex: 1; background: var(--error);">Delete</button>
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
function loadProductDetails(id) {
    const listing = getListingById(id);
    if (!listing) {
        document.getElementById('productDetailsContent').innerHTML = `
            <div class="no-listings">
                <p>Product not found. <a href="listings.html">Browse all listings</a></p>
            </div>
        `;
        return;
    }
    
    // Increment views
    listing.views = (listing.views || 0) + 1;
    const listings = getListings();
    const index = listings.findIndex(l => l.id === listing.id);
    if (index !== -1) {
        listings[index] = listing;
        localStorage.setItem('listings', JSON.stringify(listings));
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

function deleteListingConfirm(id) {
    if (confirm('Are you sure you want to delete this listing?')) {
        deleteListing(id);
        loadDashboardListings();
        showNotification('Listing deleted successfully!');
    }
}

// Dashboard
function loadDashboardListings() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const listings = getListings();
    const myListings = listings.filter(l => l.ownerId === currentUser.id);
    
    displayListings(myListings, 'myListingsGrid', true);
    
    // Update stats
    const totalViews = myListings.reduce((sum, l) => sum + (l.views || 0), 0);
    const verifiedCount = myListings.filter(l => l.verified).length;
    
    const totalListingsEl = document.getElementById('totalListings');
    const totalViewsEl = document.getElementById('totalViews');
    const verifiedListingsEl = document.getElementById('verifiedListings');
    
    if (totalListingsEl) totalListingsEl.textContent = myListings.length;
    if (totalViewsEl) totalViewsEl.textContent = totalViews;
    if (verifiedListingsEl) verifiedListingsEl.textContent = verifiedCount;
    
    const noListings = document.getElementById('noMyListings');
    if (noListings) {
        noListings.style.display = myListings.length === 0 ? 'block' : 'none';
    }
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

function loadListingsPage() {
    let listings = getListings();
    
    // Filter out sample listings - only show products uploaded by real users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIds = users.map(u => u.id);
    
    // Only show listings that belong to registered users
    listings = listings.filter(l => {
        // If ownerId exists in users array, it's a real uploaded product
        return l.ownerId && userIds.includes(l.ownerId);
    });
    
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
function loadFeaturedListings() {
    let listings = getListings();
    
    // Filter out sample listings - only show products uploaded by real users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIds = users.map(u => u.id);
    
    // Only show listings that belong to registered users
    listings = listings.filter(l => {
        return l.ownerId && userIds.includes(l.ownerId);
    });
    
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
    
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            const result = login(email, password);
            if (result.success) {
                window.location.href = 'dashboard.html';
            } else {
                showNotification(result.message || 'Login failed', 'error');
            }
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
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
            
            const result = register(userData);
            if (result.success) {
                window.location.href = 'dashboard.html';
            } else {
                showNotification(result.message || 'Registration failed', 'error');
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
document.addEventListener('DOMContentLoaded', () => {
    initializeStorage();
    initNavigation();
    initModals();
    
    // Page-specific initializations
    if (window.location.pathname.includes('dashboard.html')) {
        if (checkAuth()) {
            loadDashboardListings();
            initListingForm();
            initLogout();
        }
    } else if (window.location.pathname.includes('listings.html')) {
        loadListingsPage();
        initFilters();
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/bebe/') || window.location.pathname.endsWith('/bebe')) {
        loadFeaturedListings();
    } else if (window.location.pathname.includes('contact.html')) {
        initContactForm();
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
