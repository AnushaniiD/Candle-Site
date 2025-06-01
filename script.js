document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('show');
            }
        });
    });
    
    // Product Data - Replace with your own product images
    const products = [
        {
            id: 1,
            name: "Santal Noir",
            price: 18.00,
            description: "A sophisticated blend of aged sandalwood, vanilla orchid, and rare oud. This complex fragrance develops beautifully as it burns, revealing subtle notes of amber and musk.",
            image: "assets/candle1.jpg",
            category: "Signature Collection"
        },
        {
            id: 2,
            name: "Ambre Nuit",
            price: 52.00,
            description: "Warm amber accord with hints of bergamot and tonka bean. This candle creates an intimate, enveloping atmosphere perfect for evening relaxation.",
            image: "assets/candle2.jpg",
            category: "Signature Collection"
        },
        {
            id: 3,
            name: "Fleurs Blanches",
            price: 35.00,
            description: "Delicate white flowers including jasmine sambac, gardenia, and a whisper of orange blossom. A fresh yet luxurious floral bouquet in candle form.",
            image: "assets/candle3.jpg",
            category: "Signature Collection"
        },
        {
            id: 4,
            name: "Figue Sauvage",
            price: 22.00,
            description: "Juicy wild fig balanced with green leaves and cedarwood. This refreshing yet warm scent transports you to a Mediterranean orchard at golden hour.",
            image: "assets/candle4.jpg",
            category: "Seasonal Collection"
        },
        {
            id: 5,
            name: "Thé Matcha",
            price: 48.00,
            description: "Ceremonial-grade matcha green tea with nuances of vetiver and rice milk. A calming, meditative fragrance for mindfulness moments.",
            image: "assets/candle5.jpg",
            category: "Seasonal Collection"
        },
        {
            id: 6,
            name: "Cuir de Russie",
            price: 38.00,
            description: "Luxurious leather accord with birch tar, smoky woods, and a touch of floralcy. Inspired by traditional Russian leather craftsmanship.",
            image: "assets/candle6.jpg",
            category: "Limited Edition"
        }
    ];
    
    // Shopping Cart
    let cart = [];
    const cartCount = document.querySelector('.cart-count');
    
    // Display Products
    const productsGrid = document.querySelector('.products-grid');
    
    function displayProducts() {
        productsGrid.innerHTML = '';
        
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        <button class="view-details" data-id="${product.id}">Details</button>
                    </div>
                </div>
            `;
            
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to the new buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
        
        document.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', showProductDetails);
        });
    }
    
    // Add to Cart Function
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartCount();
        showAddedToCartMessage(product.name);
    }
    
    // Update Cart Count
    function updateCartCount() {
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = count;
    }
    
    // Show Added to Cart Message
    function showAddedToCartMessage(productName) {
        const message = document.createElement('div');
        message.className = 'cart-message';
        message.textContent = `${productName} added to cart`;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 3000);
    }
    
    // Product Modal
    const modal = document.getElementById('productModal');
    const closeModal = document.querySelector('.close-modal');
    
    function showProductDetails(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);
        
        const modalContent = document.querySelector('.modal-product-details');
        modalContent.innerHTML = `
            <div class="modal-product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-product-info">
                <h2>${product.name}</h2>
                <div class="modal-product-price">$${product.price.toFixed(2)}</div>
                <p class="modal-product-category">${product.category}</p>
                <p class="modal-product-description">${product.description}</p>
                <div class="quantity-selector">
                    <button class="decrease-qty">-</button>
                    <input type="number" value="1" min="1" class="qty-input">
                    <button class="increase-qty">+</button>
                </div>
                <button class="btn modal-add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        // Add event listeners for quantity buttons
        const decreaseBtn = modalContent.querySelector('.decrease-qty');
        const increaseBtn = modalContent.querySelector('.increase-qty');
        const qtyInput = modalContent.querySelector('.qty-input');
        
        decreaseBtn.addEventListener('click', () => {
            if (parseInt(qtyInput.value) > 1) {
                qtyInput.value = parseInt(qtyInput.value) - 1;
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        });
        
        // Add event listener for modal add to cart button
        const modalAddToCart = modalContent.querySelector('.modal-add-to-cart');
        modalAddToCart.addEventListener('click', () => {
            const quantity = parseInt(qtyInput.value);
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    ...product,
                    quantity: quantity
                });
            }
            
            updateCartCount();
            showAddedToCartMessage(product.name);
            closeModal.click();
        });
        
        modal.style.display = 'block';
    }
    
    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your enquiry. Our patronage team will respond within 24 hours.');
        contactForm.reset();
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to your mailing list
        console.log('Newsletter subscription:', email);
        
        // Show success message
        alert('Thank you for joining the LuxeLume patronage. You will receive our seasonal journal and exclusive offers.');
        newsletterForm.reset();
    });
    
    // Initialize the page
    displayProducts();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#cart') return; // Skip cart link
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});