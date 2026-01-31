document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle between Hamburger (bars) and Close (X) icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }
    // --- 2. Product Filtering Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // A. Update the Visual Button State (Green Highlight)
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // B. Get the category to filter by (e.g., "fruits", "vegetables", or "all")
            const filterValue = button.getAttribute('data-filter');

            // C. Loop through every product card to decide: Show or Hide?
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    
                    // Small animation reset
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                }
            });
        });
    });

    // --- 3. Hero Slider Logic (NEW ADDITION) ---
    const slides = document.querySelectorAll('.slide');
    const slideInterval = 4000; // Change slide every 4 seconds
    let currentSlide = 0;

    // Check if slides exist to prevent errors on pages without the slider
    if (slides.length > 0) {
        const nextSlide = () => {
            // Remove 'active' class from the current slide
            slides[currentSlide].classList.remove('active');
            
            // Calculate the next slide index (loops back to 0 at the end)
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add 'active' class to the new slide
            slides[currentSlide].classList.add('active');
        };

        // Start the automatic loop
        setInterval(nextSlide, slideInterval);
    }
});
// --- Search Bar Logic ---
    const searchBox = document.getElementById('search-box');
    const productCards = document.querySelectorAll('.product-card');

    if (searchBox) {
        searchBox.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();

            productCards.forEach(card => {
                // Find product name text
                const productName = card.querySelector('.product-info a').innerText.toLowerCase();

                if (productName.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }