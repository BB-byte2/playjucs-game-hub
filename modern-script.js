// Modern Game Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBox = document.getElementById('searchBox');
    const gameLinks = document.querySelectorAll('.game-link');
    const noResults = document.getElementById('noResults');

    // Search functionality
    searchBox.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        let visibleCount = 0;

        gameLinks.forEach(link => {
            const gameName = link.getAttribute('data-game').toLowerCase();
            
            if (gameName.includes(searchTerm)) {
                link.classList.remove('hidden');
                visibleCount++;
            } else {
                link.classList.add('hidden');
            }
        });

        // Show/hide no results message
        if (visibleCount === 0 && searchTerm.length > 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    });

    // Smooth scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideIn 0.5s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    gameLinks.forEach(link => observer.observe(link));

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === '/') {
            e.preventDefault();
            searchBox.focus();
        }
    });

    // Click animation
    gameLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(0, 255, 255, 0.6)';
            ripple.style.borderRadius = '50%';
            ripple.style.top = e.offsetY + 'px';
            ripple.style.left = e.offsetX + 'px';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);