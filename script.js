document.addEventListener('DOMContentLoaded', () => {
    // 1. ANIMAÇÃO DE REVELAÇÃO AO ROLAR (SCROLL REVEAL)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    // Executar ao carregar e ao rolar
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // 2. CONTADORES ANIMADOS (DASHBOARD)
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Iniciar contadores quando a seção de impacto estiver visível
    const impactSection = document.querySelector('#impacto');
    if (impactSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(impactSection);
            }
        }, { threshold: 0.5 });
        observer.observe(impactSection);
    }

    // 3. MENU MOBILE
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 4. EFEITO GLASS NA NAVBAR AO ROLAR
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('glass-nav', 'shadow-lg');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('glass-nav', 'shadow-lg');
            navbar.classList.remove('py-2');
            navbar.classList.add('py-4');
        }
    });

    // 5. FORMULÁRIO DE CONTATO (SIMULAÇÃO)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Enviando...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }
});
