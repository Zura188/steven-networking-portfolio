/* =========================================================
   STEVEN IRFAN ROMMADHONI
   PORTFOLIO — TJKT × NETWORKING × CODING
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const on = (element, event, callback, options = {}) => {
        if (element) {
            element.addEventListener(event, callback, options);
        }
    };


    /* =====================================================
       LOADER
    ===================================================== */

    const loader = $("#loader");

    if (loader) {

        document.body.classList.add("loading");

        window.addEventListener("load", () => {

            setTimeout(() => {

                loader.classList.add("loaded");
                document.body.classList.remove("loading");

                setTimeout(() => {
                    loader.style.display = "none";
                }, 900);

            }, 700);

        });

        // Fallback kalau load event bermasalah
        setTimeout(() => {

            loader.classList.add("loaded");
            document.body.classList.remove("loading");

            setTimeout(() => {
                loader.style.display = "none";
            }, 900);

        }, 3500);
    }


    /* =====================================================
       CUSTOM CURSOR
       ===================================================== */

    const cursorDot = $(".cursor-dot");
    const cursorRing = $(".cursor-ring");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    on(document, "mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursorDot) {
            cursorDot.style.transform =
                `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        }

    });

    function animateCursor() {

        ringX += (mouseX - ringX) * 0.14;
        ringY += (mouseY - ringY) * 0.14;

        if (cursorRing) {

            cursorRing.style.transform =
                `translate3d(${ringX}px, ${ringY}px, 0)`;

        }

        requestAnimationFrame(animateCursor);
    }

    if (cursorRing) {
        animateCursor();
    }


    /* Cursor hover */

    const interactiveElements = $$(
        "a, button, .magnetic, .skill-card, .project-card, .contact-card"
    );

    interactiveElements.forEach((element) => {

        on(element, "mouseenter", () => {

            document.body.classList.add("cursor-hover");

            if (cursorRing) {
                cursorRing.classList.add("active");
            }

        });

        on(element, "mouseleave", () => {

            document.body.classList.remove("cursor-hover");

            if (cursorRing) {
                cursorRing.classList.remove("active");
            }

        });

    });


    /* =====================================================
       MAGNETIC ELEMENTS
       ===================================================== */

    const magneticElements = $$(".magnetic");

    magneticElements.forEach((element) => {

        on(element, "mousemove", (event) => {

            // Matikan magnetic di layar kecil
            if (window.innerWidth < 768) return;

            const rect = element.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            element.style.transform =
                `translate(${x * 0.12}px, ${y * 0.12}px)`;

        });

        on(element, "mouseleave", () => {

            element.style.transform = "";

        });

    });


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton = $(".menu-button");
    const mobileMenu = $(".mobile-menu");

    function closeMobileMenu() {

        if (!mobileMenu) return;

        mobileMenu.classList.remove("active");

        if (menuButton) {
            menuButton.classList.remove("active");
        }

        document.body.classList.remove("menu-open");
    }


    on(menuButton, "click", () => {

        if (!mobileMenu) return;

        const isOpen =
            mobileMenu.classList.toggle("active");

        menuButton.classList.toggle("active", isOpen);

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    $$(".mobile-menu a").forEach((link) => {

        on(link, "click", () => {
            closeMobileMenu();
        });

    });


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    $$('a[href^="#"]').forEach((link) => {

        on(link, "click", (event) => {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) return;

            const target =
                document.querySelector(targetID);

            if (!target) return;

            event.preventDefault();

            const header =
                $(".navbar");

            const offset =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       REVEAL ON SCROLL
       ===================================================== */

    const revealElements = $$(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach((element, index) => {

            element.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 70, 500)}ms`
            );

            revealObserver.observe(element);

        });

    } else {

        // Fallback browser lama
        revealElements.forEach((element) => {
            element.classList.add("revealed");
        });

    }


    /* =====================================================
       COUNTER ANIMATION
       ===================================================== */

    const counters =
        $$("[data-counter]");

    function animateCounter(element) {

        const target =
            parseInt(
                element.dataset.counter,
                10
            );

        if (Number.isNaN(target)) return;

        const duration = 1200;

        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress =
                Math.min(
                    (currentTime - startTime) /
                    duration,
                    1
                );

            // Ease out
            const eased =
                1 - Math.pow(1 - progress, 3);

            const value =
                Math.floor(target * eased);

            element.textContent =
                String(value).padStart(2, "0");

            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    String(target).padStart(2, "0");

            }

        }

        requestAnimationFrame(
            updateCounter
        );
    }


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting &&
                            !entry.target.dataset.animated
                        ) {

                            entry.target.dataset.animated =
                                "true";

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.6
                }
            );

        counters.forEach((counter) => {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach((counter) => {
            animateCounter(counter);
        });

    }


    /* =====================================================
       TYPING EFFECT
       ===================================================== */

    const typingElement =
        $(".typing-text");

    const typingWords = [
        "NETWORK TECHNICIAN",
        "MIKROTIK ENTHUSIAST",
        "WEB DEVELOPER",
        "CODER",
        "PROBLEM SOLVER"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        if (!typingElement) return;

        const currentWord =
            typingWords[wordIndex];

        if (!deleting) {

            charIndex++;

            typingElement.textContent =
                currentWord.substring(
                    0,
                    charIndex
                );

            if (
                charIndex >=
                currentWord.length
            ) {

                deleting = true;

                setTimeout(
                    typeEffect,
                    1700
                );

                return;
            }

        } else {

            charIndex--;

            typingElement.textContent =
                currentWord.substring(
                    0,
                    charIndex
                );

            if (charIndex <= 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) %
                    typingWords.length;

            }

        }

        const speed =
            deleting ? 45 : 85;

        setTimeout(
            typeEffect,
            speed
        );

    }

    if (typingElement) {

        typingElement.textContent = "";

        setTimeout(
            typeEffect,
            1000
        );

    }


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const navLinks =
        $$(".desktop-nav a");

    const sections =
        $$("main section[id]");

    function updateActiveNav() {

        const scrollPosition =
            window.scrollY + 180;

        let currentSection = "";

        sections.forEach((section) => {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;

            if (
                scrollPosition >= top &&
                scrollPosition <
                top + height
            ) {

                currentSection =
                    section.id;

            }

        });

        navLinks.forEach((link) => {

            const href =
                link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    }

    let scrollTicking = false;

    on(window, "scroll", () => {

        if (!scrollTicking) {

            window.requestAnimationFrame(() => {

                updateActiveNav();

                scrollTicking = false;

            });

            scrollTicking = true;
        }

    });

    updateActiveNav();


    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    const navbar =
        $(".navbar");

    function navbarScroll() {

        if (!navbar) return;

        if (window.scrollY > 40) {

            navbar.classList.add(
                "scrolled"
            );

        } else {

            navbar.classList.remove(
                "scrolled"
            );

        }

    }

    on(window, "scroll", navbarScroll);

    navbarScroll();


    /* =====================================================
       NETWORK CANVAS
       ===================================================== */

    const canvas =
        $("#networkCanvas");

    if (canvas) {

        const ctx =
            canvas.getContext("2d");

        let width = 0;
        let height = 0;

        let nodes = [];

        const isMobile =
            window.innerWidth < 768;

        const NODE_COUNT =
            isMobile ? 28 : 55;

        function resizeCanvas() {

            const ratio =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );

            width =
                window.innerWidth;

            height =
                window.innerHeight;

            canvas.width =
                width * ratio;

            canvas.height =
                height * ratio;

            canvas.style.width =
                `${width}px`;

            canvas.style.height =
                `${height}px`;

            ctx.setTransform(
                ratio,
                0,
                0,
                ratio,
                0,
                0
            );

        }


        function createNodes() {

            nodes = [];

            for (
                let i = 0;
                i < NODE_COUNT;
                i++
            ) {

                nodes.push({

                    x:
                        Math.random() *
                        width,

                    y:
                        Math.random() *
                        height,

                    vx:
                        (Math.random() - 0.5) *
                        0.18,

                    vy:
                        (Math.random() - 0.5) *
                        0.18,

                    radius:
                        Math.random() *
                        1.5 +
                        0.4

                });

            }

        }


        function drawNetwork() {

            ctx.clearRect(
                0,
                0,
                width,
                height
            );

            // Update nodes
            nodes.forEach((node) => {

                node.x += node.vx;
                node.y += node.vy;

                if (
                    node.x < 0 ||
                    node.x > width
                ) {

                    node.vx *= -1;

                }

                if (
                    node.y < 0 ||
                    node.y > height
                ) {

                    node.vy *= -1;

                }

            });


            // Lines
            for (
                let i = 0;
                i < nodes.length;
                i++
            ) {

                for (
                    let j = i + 1;
                    j < nodes.length;
                    j++
                ) {

                    const a =
                        nodes[i];

                    const b =
                        nodes[j];

                    const dx =
                        a.x - b.x;

                    const dy =
                        a.y - b.y;

                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );

                    const maxDistance =
                        isMobile
                            ? 100
                            : 135;

                    if (
                        distance <
                        maxDistance
                    ) {

                        const opacity =
                            (1 -
                                distance /
                                maxDistance
                            ) * 0.28;

                        ctx.beginPath();

                        ctx.moveTo(
                            a.x,
                            a.y
                        );

                        ctx.lineTo(
                            b.x,
                            b.y
                        );

                        ctx.strokeStyle =
                            `rgba(255,255,255,${opacity})`;

                        ctx.lineWidth =
                            0.5;

                        ctx.stroke();

                    }

                }

            }


            // Nodes
            nodes.forEach((node) => {

                ctx.beginPath();

                ctx.arc(
                    node.x,
                    node.y,
                    node.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    "rgba(255,255,255,0.45)";

                ctx.fill();

            });


            requestAnimationFrame(
                drawNetwork
            );

        }


        resizeCanvas();
        createNodes();
        drawNetwork();


        let resizeTimeout;

        on(window, "resize", () => {

            clearTimeout(
                resizeTimeout
            );

            resizeTimeout =
                setTimeout(() => {

                    resizeCanvas();
                    createNodes();

                }, 150);

        });

    }


    /* =====================================================
       TERMINAL LIVE EFFECT
       ===================================================== */

    const terminal =
        $(".terminal-card");

    if (terminal) {

        const statusLines =
            $$(".terminal-body .success", terminal);

        const activeTerminal =
            $(".active-terminal", terminal);

        let terminalIndex = 0;

        // Initial state
        statusLines.forEach((line) => {

            line.style.opacity = "0";
            line.style.transform =
                "translateX(-8px)";

        });

        if (activeTerminal) {
            activeTerminal.style.opacity = "0";
        }


        function revealTerminalLine() {

            if (
                terminalIndex <
                statusLines.length
            ) {

                const line =
                    statusLines[
                        terminalIndex
                    ];

                line.style.transition =
                    "opacity .35s ease, transform .35s ease";

                line.style.opacity = "1";

                line.style.transform =
                    "translateX(0)";

                terminalIndex++;

                setTimeout(
                    revealTerminalLine,
                    180
                );

            } else {

                setTimeout(() => {

                    if (activeTerminal) {

                        activeTerminal.style.transition =
                            "opacity .4s ease";

                        activeTerminal.style.opacity =
                            "1";

                    }

                }, 250);

            }

        }


        setTimeout(
            revealTerminalLine,
            1000
        );

    }


    /* =====================================================
       PROJECT CARD TILT
       ===================================================== */

    const tiltCards =
        $$(".project-card, .skill-card");

    tiltCards.forEach((card) => {

        on(card, "mousemove", (event) => {

            if (window.innerWidth < 900)
                return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) /
                    centerY) *
                -3;

            const rotateY =
                ((x - centerX) /
                    centerX) *
                3;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-4px)`;

        });

        on(card, "mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       IMAGE PARALLAX
       ===================================================== */

    const profileImage =
        $(".profile-image img");

    on(window, "mousemove", (event) => {

        if (
            !profileImage ||
            window.innerWidth < 900
        ) return;

        const x =
            (event.clientX /
                window.innerWidth -
                0.5);

        const y =
            (event.clientY /
                window.innerHeight -
                0.5);

        profileImage.style.transform =
            `scale(1.04)
             translate(${x * 8}px, ${y * 8}px)`;

    });


    /* =====================================================
       MARQUEE PAUSE ON HOVER
       ===================================================== */

    const marquee =
        $(".marquee-track");

    if (marquee) {

        on(marquee, "mouseenter", () => {

            marquee.style.animationPlayState =
                "paused";

        });

        on(marquee, "mouseleave", () => {

            marquee.style.animationPlayState =
                "running";

        });

    }


    /* =====================================================
       SCROLL PROGRESS
       ===================================================== */

    const scrollProgress =
        document.createElement("div");

    scrollProgress.className =
        "scroll-progress";

    scrollProgress.style.position =
        "fixed";

    scrollProgress.style.top =
        "0";

    scrollProgress.style.left =
        "0";

    scrollProgress.style.height =
        "2px";

    scrollProgress.style.width =
        "0%";

    scrollProgress.style.background =
        "#ffffff";

    scrollProgress.style.zIndex =
        "99999";

    scrollProgress.style.pointerEvents =
        "none";

    document.body.appendChild(
        scrollProgress
    );


    function updateScrollProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;

        const percentage =
            documentHeight > 0
                ? (scrollTop /
                    documentHeight) *
                  100
                : 0;

        scrollProgress.style.width =
            `${percentage}%`;

    }

    on(
        window,
        "scroll",
        updateScrollProgress,
        { passive: true }
    );

    updateScrollProgress();


    /* =====================================================
       EDUCATION TIMELINE
       ===================================================== */

    const timelineItems =
        $$(".timeline-item");

    if ("IntersectionObserver" in window) {

        const timelineObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    });

                },
                {
                    threshold: 0.2
                }
            );

        timelineItems.forEach((item) => {

            timelineObserver.observe(
                item
            );

        });

    } else {

        timelineItems.forEach((item) => {
            item.classList.add("visible");
        });

    }


    /* =====================================================
       CONTACT CARD HOVER
       ===================================================== */

    const contactCards =
        $$(".contact-card");

    contactCards.forEach((card) => {

        on(card, "mouseenter", () => {

            card.classList.add(
                "contact-hover"
            );

        });

        on(card, "mouseleave", () => {

            card.classList.remove(
                "contact-hover"
            );

        });

    });


    /* =====================================================
       KEYBOARD ESCAPE
       ===================================================== */

    on(document, "keydown", (event) => {

        if (event.key === "Escape") {
            closeMobileMenu();
        }

    });


    /* =====================================================
       REDUCED MOTION
       ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

        revealElements.forEach((element) => {

            element.classList.add(
                "revealed"
            );

            element.style.transition =
                "none";

        });

    }


    /* =====================================================
       IMAGE ERROR HANDLER
       ===================================================== */

    const images =
        $$("img");

    images.forEach((image) => {

        on(image, "error", () => {

            image.classList.add(
                "image-error"
            );

            // Supaya layout tetap aman
            image.alt =
                "Profile image";

        });

    });


    /* =====================================================
       PAGE READY
       ===================================================== */

    document.body.classList.add(
        "js-ready"
    );

    console.log(
        "%c STEVEN IRFAN ROMMADHONI ",
        "background:#fff;color:#000;font-size:14px;font-weight:bold;padding:6px 10px;"
    );

    console.log(
        "%c TJKT × NETWORKING × CODING ",
        "color:#999;font-size:12px;"
    );

    console.log(
        "%c SYSTEM ONLINE ✓ ",
        "color:#fff;font-size:12px;"
    );

});