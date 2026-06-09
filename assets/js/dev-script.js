document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 01. NAVIGATION / MOBILE MENU
    // ==========================================
    window.toggleMenu = function() {
        const menu = document.getElementById("mobile-menu");
        if (menu) {
            menu.classList.toggle("active");
        }
    };

    // ==========================================
    // 02. SIDEBAR: SMOOTH SCROLL & SCROLLSPY
    // ==========================================
    document.querySelectorAll('aside a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('aside a');

    window.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('bg-green-50/30', 'text-[#4AA13E]', 'font-bold');
            link.classList.add('text-[#555555]');
            if (current && link.getAttribute('href').includes(current)) {
                link.classList.add('bg-green-50/30', 'text-[#4AA13E]', 'font-bold');
                link.classList.remove('text-[#555555]');
            }
        });
    });

    // ==========================================
    // 03. SCROLL-TO-TOP / BOTTOM TOGGLE BTN
    // ==========================================
    const scrollBtn = document.getElementById('scroll-toggle');
    const scrollText = document.getElementById('scroll-text');
    const scrollLine = document.getElementById('scroll-line');

    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            const isBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;
            if (isBottom) {
                if (scrollText) {
                    scrollText.innerText = "Top";
                    scrollText.classList.replace('text-white/40', 'text-[#5DC94E]');
                }
                if (scrollLine) scrollLine.classList.add('rotate-0');
            } else {
                if (scrollText) {
                    scrollText.innerText = "Scroll";
                    scrollText.classList.replace('text-[#5DC94E]', 'text-white/40');
                }
                if (scrollLine) scrollLine.classList.remove('rotate-0');
            }
        });

        scrollBtn.addEventListener('click', () => {
            const isBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;
            if (isBottom) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        });
    }

    // ==========================================
    // 04. HOME PAGE HERO BANNER (Manual Slider)
    // ==========================================
   // 1. Initialize variables
let heroIndex = 0;
const heroSlides = document.querySelectorAll(".slide");
const heroDots = document.querySelectorAll(".dot");

// 2. Define the main display function
function showHeroSlides(n) {
    if (heroSlides.length === 0) return;

    // Reset: Hide all slides and reset dot styles
    heroSlides.forEach((s) => {
        s.classList.remove("active");
        s.style.display = "none"; 
    });
    
    heroDots.forEach((d) => {
        d.classList.remove("active", "bg-white", "w-8");
        d.classList.add("bg-white/20", "w-2");
    });

    // Calculate the correct index (looping back to 0 if at the end)
    heroIndex = (n + heroSlides.length) % heroSlides.length;

    // Show the active slide
    heroSlides[heroIndex].classList.add("active");
    heroSlides[heroIndex].style.display = "flex"; 

    // Highlight the active dot
    if (heroDots[heroIndex]) {
        heroDots[heroIndex].classList.add("active", "bg-white", "w-8");
        heroDots[heroIndex].classList.remove("bg-white/20", "w-2");
    }
}

/** * 3. THE FIX: Define currentSlide globally 
 * This is what your HTML onclick="currentSlide(0)" is looking for
 */
window.currentSlide = function(n) {
    showHeroSlides(n);
    resetTimer(); // Reset auto-play when user clicks manually
};

// 4. Auto-play Logic
let autoPlayInterval = setInterval(() => { 
    showHeroSlides(heroIndex + 1); 
}, 5000);

function resetTimer() {
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(() => { 
        showHeroSlides(heroIndex + 1); 
    }, 5000);
}

// 5. Initialize the first slide on page load
document.addEventListener("DOMContentLoaded", () => {
    showHeroSlides(0);
});

    // ==========================================
    // 05. COMPANY LOGO SLIDER (Swiper)
    // ==========================================
    new Swiper(".logo-slider", {
        slidesPerView: 3.5,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 2500, disableOnInteraction: false },
        breakpoints: {
            640: { slidesPerView: 3.5, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 7, spaceBetween: 10, allowTouchMove: false },
        },
    });

    // ==========================================
    // 06. PRODUCT TECHNICAL SPECS SLIDER (FIXED)
    // ==========================================


    // ==========================================
    // 07. FIND YOUR PERFECT SHADE (Color Fan)
    // ==========================================
   const colors = [
        { name: 'Forest Green', hex: '#2D5A27', img: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?q=80&w=900' },
            { name: 'Slate Gray', hex: '#5A6472', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=900' },
            { name: 'Cream White', hex: '#EDE8E0', img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=900' },
            { name: 'Carbon Black', hex: '#1A1A1A', img: 'https://images.unsplash.com/photo-1507337722123-25a25917ad6f?q=80&w=900' },
            { name: 'Teak Brown', hex: '#966F47', img: './assets/image/home/FindYourPerfect/1image.png' },
            { name: 'Olive Green', hex: '#6B7B3A', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=900' },
            { name: 'Dark Cherry', hex: '#72243A', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900' },
            { name: 'Sandstone', hex: '#C4A882', img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=900' },
            { name: 'Ocean Blue', hex: '#4A7B9D', img: 'https://images.unsplash.com/photo-1505144808405-026874426778?q=80&w=900' },
            { name: 'Rose Dust', hex: '#C4818A', img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=900' },
            { name: 'Midnight Blue', hex: '#1E3A5F', img: 'https://images.unsplash.com/photo-1505144808405-026874426778?q=80&w=900' },
            { name: 'Moss Green', hex: '#6B7B3A', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=900' },
            { name: 'Deep Burgundy', hex: '#72243A', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=900' },
            { name: 'Light Oak', hex: '#C4A882', img: 'https://images.unsplash.com/photo-1581417478175-a9ef18f20941?q=80&w=900' },
            { name: 'Steel Blue', hex: '#4A7B9D', img: 'https://images.unsplash.com/photo-1505144808405-026874426778?q=80&w=900' }
    ];

let activeColIndex = 4;

window.buildFan = function() {
    const fanWrap = document.getElementById('fanWrap');
    if (!fanWrap) return;
    fanWrap.innerHTML = '';
    const SWATCH_W = 85;
    const OVERLAP = 52;

    colors.forEach((c, i) => {
        const btn = document.createElement('button');
        btn.className = 'swatch' + (i === activeColIndex ? ' active' : '');
        btn.style.backgroundColor = c.hex;
        btn.style.left = (i * (SWATCH_W - OVERLAP)) + 'px';
        btn.style.zIndex = i === activeColIndex ? 100 : i + 1;
        btn.onclick = () => { 
            activeColIndex = i; 
            buildFan(); 
            updateColorUI(); 
        };
        fanWrap.appendChild(btn);
    });
};

function updateColorUI() {
    const c = colors[activeColIndex];
    if (!c) return;

    // 1. Update Hero Image
    const img = document.getElementById('heroImg');
    if (img) {
        img.src = c.img;
        img.classList.remove('img-anim');
        void img.offsetWidth; // Trigger reflow for animation
        img.classList.add('img-anim');
    }

    // 2. Update Overlay Bar Swatch and Name
    const barSwatch = document.getElementById('barSwatch');
    const barName = document.getElementById('barName');
    if (barSwatch) {
        barSwatch.style.backgroundColor = c.hex;
        barSwatch.style.boxShadow = `0px 8px 30px 0px ${c.hex}80`; // 80 adds transparency to hex
    }
    if (barName) barName.textContent = c.name;

    // 3. Update Detail Swatch and Name
    const detailSwatch = document.getElementById('detailSwatch');
    const detailName = document.getElementById('detailName');
    if (detailSwatch) {
        detailSwatch.style.backgroundColor = c.hex;
        detailSwatch.style.boxShadow = `0px 8px 30px 0px ${c.hex}80`;
        detailSwatch.style.borderColor = c.hex;
    }
    if (detailName) detailName.textContent = c.name;
}

// Initial Call
buildFan();
updateColorUI();

    // ==========================================
    // 08. BEFORE/AFTER IMAGE COMPARISON
    // ==========================================
    window.moveDivisor = function(val) {
        const divisor = document.getElementById("divisor");
        const handle = document.getElementById("handle");
        const beforeImg = document.getElementById("before-img");
        const container = document.getElementById("comparison-container");

        if (divisor && handle && beforeImg && container) {
            divisor.style.width = val + "%";
            handle.style.left = val + "%";
            beforeImg.style.width = container.offsetWidth + "px";
        }
    };

    // ==========================================
    // 09. ROSEWOOD LAMINATES SLIDER (mySwiper)
    // ==========================================
    new Swiper(".mySwiper", {
        slidesPerView: 1.5,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: {
            640: { slidesPerView: 2.5, centeredSlides: false },
            768: { enabled: false, slidesPerView: 5, spaceBetween: 0 },
        },
    });

    // ==========================================
    // 10. LOCATION / MAP SLIDER (locSwiper)
    // ==========================================
    new Swiper('.locSwiper', {
        slidesPerView: 1.2,
        centeredSlides: true,
        spaceBetween: 20,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            640: { slidesPerView: 2.2 }
        }
    });

});