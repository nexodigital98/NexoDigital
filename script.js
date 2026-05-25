/* 
─────────────────────────────────────────────────────────────────────────
   script.js — Este archivo le da vida a la página.
   Aquí están todas las animaciones, el menú del celular,
   las preguntas frecuentes y la transición de la tarjeta al sitio.
   
   NO necesitas tocar este archivo para cambiar textos o colores.
   Solo édítalo si quieres modificar el comportamiento de algo.
─────────────────────────────────────────────────────────────────────────
*/

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. EFECTO PARALLAX 3D AL MOVER EL RATÓN
    // Hace que la tarjeta flote siguiendo el ratón (efecto premium en escritorio)
    // ==========================================
    const card = document.querySelector('.business-card');
    const container = document.querySelector('.perspective-container');
    const cardScreen     = document.getElementById('card-screen');
    const landingScreen  = document.getElementById('landing-screen');

    if (card && container) {
        container.addEventListener('mousemove', (e) => {
            // Si la tarjeta ya está volteada, desactivamos el efecto
            if (card.classList.contains('flipped')) return;

            const rect = container.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            // Ángulos de rotación (máximo 12 grados)
            const rotY =  (mouseX / (rect.width  / 2)) * 12;
            const rotX = -(mouseY / (rect.height / 2)) * 12;

            card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        });

        container.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
            // Pausamos la animación CSS para que el tilt parallax sea fluido
            card.style.animationPlayState = 'paused';
        });

        container.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            card.style.animationPlayState = 'running';
            // Restablecemos según el estado de la tarjeta
            if (!card.classList.contains('flipped')) {
                card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            } else {
                card.style.transform = 'rotateY(180deg)';
            }
        });
    }

    // ==========================================
    // 2. SOPORTE TÁCTIL / GIROSCOPIO PARA MÓVILES
    // En móviles, el tilt de la tarjeta sigue la orientación del dispositivo
    // ==========================================
    let gyroPermissionGranted = false;

    function applyGyroTilt(beta, gamma) {
        if (!card || card.classList.contains('flipped')) return;
        // beta = inclinación adelante/atrás (-90 a 90), gamma = izquierda/derecha (-90 a 90)
        const rotX = Math.min(Math.max(-(beta  - 30) * 0.4, -12), 12);
        const rotY = Math.min(Math.max(  gamma        * 0.4, -12), 12);
        card.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }

    if (window.DeviceOrientationEvent) {
        // iOS 13+ necesita permiso explícito
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            // Se pide permiso al hacer tap en la tarjeta
            container && container.addEventListener('click', () => {
                if (!gyroPermissionGranted) {
                    DeviceOrientationEvent.requestPermission()
                        .then(response => {
                            if (response === 'granted') {
                                gyroPermissionGranted = true;
                                window.addEventListener('deviceorientation', (e) => {
                                    applyGyroTilt(e.beta, e.gamma);
                                }, true);
                            }
                        }).catch(console.error);
                }
            }, { once: true });
        } else {
            // Android y otros — sin necesidad de permiso
            window.addEventListener('deviceorientation', (e) => {
                applyGyroTilt(e.beta, e.gamma);
            }, true);
            gyroPermissionGranted = true;
        }
    }

    // ==========================================
    // 3. GIRO DE LA TARJETA (FLIP)
    // Controla la rotación al pulsar los botones
    // ==========================================
    const btnFlipInfo = document.getElementById('btn-flip-info');
    const btnBackCard = document.getElementById('btn-back-card');

    function flipCard() {
        if (!card) return;
        card.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.classList.add('flipped');
        card.style.transform = 'rotateY(180deg)';
    }

    function unflipCard() {
        if (!card) return;
        card.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.classList.remove('flipped');
        card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }

    if (btnFlipInfo && card && cardScreen && landingScreen) {
        btnFlipInfo.addEventListener('click', () => {
            // 1. Girar la tarjeta en su lugar (0.8s)
            flipCard();

            // 2. Cuando termina de girar, expansión tipo puerta
            setTimeout(() => {
                container.classList.add('card-zoom');

                // 3. Cuando la expansión está en su pico, mostrar la landing
                setTimeout(() => {
                    // Ocultar pantalla de tarjeta
                    cardScreen.classList.add('hide-card');
                    // Liberar scroll y mostrar landing
                    document.body.style.overflow = '';
                    landingScreen.classList.add('show-landing');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    initScrollAnimations();
                }, 500);
            }, 800);
        });
    }
    btnBackCard && btnBackCard.addEventListener('click', unflipCard);


    // Soporte de swipe horizontal táctil para voltear la tarjeta en móviles
    if (card) {
        let touchStartX = 0;
        let touchStartY = 0;

        card.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        card.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            // Solo se activa si el swipe es mayormente horizontal y mayor a 50px
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
                if (!card.classList.contains('flipped')) {
                    flipCard();
                } else {
                    unflipCard();
                }
            }
        }, { passive: true });
    }

    // ==========================================
    // 4. TRANSICIÓN FLUIDA AL SITIO WEB
    // Oculta la tarjeta y revela la landing page con animaciones
    // ==========================================
    const btnEnterSite   = document.getElementById('btn-enter-site');
    const btnFloatingCard = document.getElementById('btn-floating-card');

    if (btnEnterSite && cardScreen && landingScreen) {
        btnEnterSite.addEventListener('click', () => {
            // Ya está volteada, así que expandimos inmediatamente
            container.classList.add('card-zoom');
            cardScreen.classList.add('hide-card');
            
            setTimeout(() => {
                landingScreen.classList.add('show-landing');
                window.scrollTo({ top: 0, behavior: 'instant' });
                // Iniciamos las animaciones de scroll al entrar a la landing
                initScrollAnimations();
            }, 100);
        });
    }

    if (btnFloatingCard && cardScreen && landingScreen) {
        btnFloatingCard.addEventListener('click', () => {
            landingScreen.classList.remove('show-landing');
            setTimeout(() => {
                cardScreen.classList.remove('hide-card');
                container.classList.remove('card-zoom');
                unflipCard();
                window.scrollTo({ top: 0, behavior: 'instant' });
            }, 450);
        });
    }

    // ==========================================
    // 5. FAQ ACORDEÓN
    // Controla la apertura/cierre de respuestas de forma fluida
    // ==========================================
    const faqItems = document.querySelectorAll('.sl-faq-item');

    faqItems.forEach(item => {
        const header = item.querySelector('.sl-faq-header');
        const body   = item.querySelector('.faq-body');

        header && header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Cerramos todos los demás acordeones
            faqItems.forEach(other => {
                if (other !== item) {
                    other.classList.remove('active');
                    const b = other.querySelector('.faq-body');
                    if (b) b.style.maxHeight = null;
                }
            });

            if (!isActive) {
                item.classList.add('active');
                body.style.maxHeight = body.scrollHeight + 'px';
            } else {
                item.classList.remove('active');
                body.style.maxHeight = null;
            }
        });
    });

    // ==========================================
    // 6. MENÚ DE NAVEGACIÓN MÓVIL (Hamburguesa)
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks   = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // ==========================================
    // 7. ANIMACIONES DE APARICIÓN POR SCROLL (Intersection Observer)
    // Los elementos aparecen suavemente al hacer scroll hacia ellos
    // ==========================================
    function initScrollAnimations() {
        // Añadimos la clase base a todos los elementos que deben animarse
        const animTargets = document.querySelectorAll(
            '.sl-service-card, .sl-combo-card, .sl-maint-card, .sl-achievements-card, ' +
            '.sl-quest-item, .sl-faq-item, .sl-section-header, ' +
            '.sl-cta-box, .sl-footer-grid'
        );

        animTargets.forEach((el, i) => {
            el.style.opacity    = '0';
            el.style.transform  = 'translateY(28px)';
            el.style.transition = `opacity 0.6s ease ${(i % 4) * 0.08}s, transform 0.6s ease ${(i % 4) * 0.08}s`;
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity   = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        animTargets.forEach(el => observer.observe(el));
    }

    // Si la landing ya está visible al cargar (sin tarjeta), inicializamos directo
    if (landingScreen && landingScreen.classList.contains('show-landing')) {
        initScrollAnimations();
    }

    // ==========================================
    // 8. BARRA DE PROGRESO DE SCROLL
    // Línea dorada en la parte superior que indica cuánto has scrolleado
    // ==========================================
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: 0%;
        background: linear-gradient(90deg, #C8A835, #F0D070, #00E5FF);
        z-index: 9999;
        transition: width 0.1s linear;
        pointer-events: none;
        box-shadow: 0 0 8px rgba(200,160,55,0.6);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop    = window.scrollY || document.documentElement.scrollTop;
        const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    }, { passive: true });

    // ==========================================
    // 9. CONTADORES ANIMADOS
    // Los precios/números cuentan del 0 al valor real cuando aparecen en pantalla
    // ==========================================
    function animateCounter(el, target, duration = 1200) {
        let start     = 0;
        const step    = Math.ceil(target / (duration / 16));
        const prefix  = el.dataset.prefix  || '';
        const suffix  = el.dataset.suffix  || '';

        const run = () => {
            start = Math.min(start + step, target);
            el.textContent = prefix + start + suffix;
            if (start < target) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
    }

    // Buscamos elementos marcados con data-counter para el contador
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const target = parseInt(entry.target.dataset.counter);
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

    // ==========================================
    // INICIALIZACIÓN COMPLETADA
    // ==========================================
    console.log('✅ Nexo Digital — Scripts cargados correctamente (v2.0)');

});
