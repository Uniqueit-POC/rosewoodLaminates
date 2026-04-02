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
    let heroIndex = 0;
    const heroSlides = document.querySelectorAll(".slide");
    const heroDots = document.querySelectorAll(".dot");

    function showHeroSlides(n) {
        if (heroSlides.length === 0) return;
        heroSlides.forEach((s) => s.classList.remove("active"));
        heroDots.forEach((d) => d.classList.remove("active"));

        heroIndex = (n + heroSlides.length) % heroSlides.length;
        heroSlides[heroIndex].classList.add("active");
        if (heroDots[heroIndex]) heroDots[heroIndex].classList.add("active");
    }

    if (heroSlides.length > 0) {
        setInterval(() => { showHeroSlides(heroIndex + 1); }, 5000);
    }

    // ==========================================
    // 05. COMPANY LOGO SLIDER (Swiper)
    // ==========================================
    new Swiper(".logo-slider", {
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 2500, disableOnInteraction: false },
        breakpoints: {
            640: { slidesPerView: 3, spaceBetween: 30 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 7, spaceBetween: 50, allowTouchMove: false },
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
        { name: 'Teak Brown', hex: '#966F47', img: './assets/image/home/FindYourPerfect/1image.png' },
    ];

    let activeColIndex = 4;
    const fanWrap = document.getElementById('fanWrap');

    window.buildFan = function() {
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
            btn.onclick = () => { activeColIndex = i; buildFan(); updateColorUI(); };
            fanWrap.appendChild(btn);
        });
    };

    function updateColorUI() {
        const c = colors[activeColIndex];
        const img = document.getElementById('heroImg');
        if (img && c) {
            img.src = c.img;
            img.classList.remove('img-anim');
            void img.offsetWidth;
            img.classList.add('img-anim');
        }
        if (document.getElementById('barName') && c) document.getElementById('barName').textContent = c.name;
    }

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