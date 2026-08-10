/* =========================================================
   STEVEN IRFAN ROMMADHONI
   PORTFOLIO V2 — SCRIPT.JS
   TJKT × NETWORKING × CODING
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initNavbar();
    initMobileMenu();
    initTyping();
    initReveal();
    initCounters();
    initCursor();
    initMagnetic();
    initNetworkCanvas();
    initParallax();
    initActiveSection();
    initSmoothLinks();

});


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

    const loader = document.getElementById("loader");

    if (!loader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {
            loader.classList.add("hide");
        }, 1600);

    });

}


/* =========================================================
   NAVBAR
========================================================= */

function initNavbar() {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    function updateNavbar() {

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!menuButton || !mobileMenu) return;

    const mobileLinks = mobileMenu.querySelectorAll("a");

    function toggleMenu() {

        const active = menuButton.classList.toggle("active");

        mobileMenu.classList.toggle("active", active);

        document.body.classList.toggle("menu-open", active);

    }

    menuButton.addEventListener("click", toggleMenu);

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuButton.classList.remove("active");
            mobileMenu.classList.remove("active");
            document.body.classList.remove("menu-open");

        });

    });

}


/* =========================================================
   TYPING EFFECT
========================================================= */

function initTyping() {

    const target = document.querySelector(".typing-text");

    if (!target) return;

    const words = [
        "TECHNICIAN",
        "NETWORK ENGINEER",
        "WEB DEVELOPER",
        "CODER",
        "IT ENTHUSIAST"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {

        const current = words[wordIndex];

        if (!deleting) {

            target.textContent =
                current.substring(0, charIndex + 1);

            charIndex++;

            if (charIndex === current.length) {

                deleting = true;

                setTimeout(type, 1800);
                return;

            }

        } else {

            target.textContent =
                current.substring(0, charIndex - 1);

            charIndex--;

            if (charIndex === 0) {

                deleting = false;

                wordIndex =
                    (wordIndex + 1) % words.length;

            }

        }

        setTimeout(
            type,
            deleting ? 45 : 90
        );

    }

    type();

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initReveal() {

    const elements =
        document.querySelectorAll(".reveal");

    if (!elements.length) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );

    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   COUNTERS
========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (!counters.length) return;

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    const counter = entry.target;

                    animateCounter(counter);

                    observer.unobserve(counter);

                });

            },
            {
                threshold: 0.8
            }
        );

    counters.forEach(counter => {

        observer.observe(counter);

    });

}


function animateCounter(element) {

    const target =
        Number(
            element.dataset.counter
        );

    if (Number.isNaN(target)) return;

    const duration = 1300;

    const startTime = performance.now();

    function update(currentTime) {

        const progress =
            Math.min(
                (currentTime - startTime) / duration,
                1
            );

        const eased =
            1 - Math.pow(1 - progress, 3);

        const value =
            Math.floor(target * eased);

        element.textContent = value;

        if (progress < 1) {

            requestAnimationFrame(update);

        } else {

            element.textContent = target;

        }

    }

    requestAnimationFrame(update);

}


/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCursor() {

    const dot =
        document.querySelector(".cursor-dot");

    const ring =
        document.querySelector(".cursor-ring");

    if (!dot || !ring) return;

    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let ringX = mouseX;
    let ringY = mouseY;

    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            dot.style.left =
                `${mouseX}px`;

            dot.style.top =
                `${mouseY}px`;

        },
        {
            passive: true
        }
    );

    function animateCursor() {

        ringX +=
            (mouseX - ringX) * 0.14;

        ringY +=
            (mouseY - ringY) * 0.14;

        ring.style.left =
            `${ringX}px`;

        ring.style.top =
            `${ringY}px`;

        requestAnimationFrame(
            animateCursor
        );

    }

    animateCursor();


    const interactive =
        document.querySelectorAll(
            "a, button, .skill-card, .project-card, .contact-card"
        );

    interactive.forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                ring.style.width = "55px";
                ring.style.height = "55px";
                ring.style.background =
                    "rgba(255,255,255,.04)";

            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                ring.style.width = "34px";
                ring.style.height = "34px";
                ring.style.background =
                    "transparent";

            }
        );

    });

}


/* =========================================================
   MAGNETIC BUTTON
========================================================= */

function initMagnetic() {

    const elements =
        document.querySelectorAll(
            ".magnetic"
        );

    if (!elements.length) return;

    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {
        return;
    }

    elements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                const rect =
                    element.getBoundingClientRect();

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

            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "translate(0,0)";

            }
        );

    });

}


/* =========================================================
   NETWORK CANVAS
========================================================= */

function initNetworkCanvas() {

    const canvas =
        document.getElementById(
            "networkCanvas"
        );

    if (!canvas) return;

    const ctx =
        canvas.getContext("2d");

    if (!ctx) return;

    let width;
    let height;

    let particles = [];

    const mouse = {
        x: null,
        y: null,
        radius: 130
    };


    function resize() {

        const dpr =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        width =
            window.innerWidth;

        height =
            window.innerHeight;

        canvas.width =
            width * dpr;

        canvas.height =
            height * dpr;

        canvas.style.width =
            `${width}px`;

        canvas.style.height =
            `${height}px`;

        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        createParticles();

    }


    function createParticles() {

        particles = [];

        const count =
            Math.min(
                65,
                Math.floor(
                    (width * height) / 18000
                )
            );

        for (let i = 0; i < count; i++) {

            particles.push({

                x: Math.random() * width,
                y: Math.random() * height,

                vx:
                    (Math.random() - .5)
                    * .25,

                vy:
                    (Math.random() - .5)
                    * .25,

                size:
                    Math.random() * 1.5 + .5

            });

        }

    }


    function draw() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        for (let i = 0; i < particles.length; i++) {

            const particle =
                particles[i];

            particle.x += particle.vx;
            particle.y += particle.vy;


            if (
                particle.x < 0 ||
                particle.x > width
            ) {
                particle.vx *= -1;
            }

            if (
                particle.y < 0 ||
                particle.y > height
            ) {
                particle.vy *= -1;
            }


            if (mouse.x !== null) {

                const dx =
                    particle.x - mouse.x;

                const dy =
                    particle.y - mouse.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (
                    distance <
                    mouse.radius
                ) {

                    const force =
                        (mouse.radius -
                            distance) /
                        mouse.radius;

                    particle.x +=
                        (dx / distance) *
                        force *
                        .35;

                    particle.y +=
                        (dy / distance) *
                        force *
                        .35;

                }

            }


            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(255,255,255,.35)";

            ctx.fill();


            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const other =
                    particles[j];

                const dx =
                    particle.x - other.x;

                const dy =
                    particle.y - other.y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (distance < 135) {

                    const opacity =
                        1 -
                        distance / 135;

                    ctx.beginPath();

                    ctx.moveTo(
                        particle.x,
                        particle.y
                    );

                    ctx.lineTo(
                        other.x,
                        other.y
                    );

                    ctx.strokeStyle =
                        `rgba(255,255,255,${opacity * .07})`;

                    ctx.lineWidth = .6;

                    ctx.stroke();

                }

            }

        }

        requestAnimationFrame(draw);

    }


    window.addEventListener(
        "resize",
        resize,
        {
            passive: true
        }
    );


    document.addEventListener(
        "mousemove",
        event => {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

        },
        {
            passive: true
        }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            mouse.x = null;
            mouse.y = null;

        }
    );


    resize();
    draw();

}


/* =========================================================
   PARALLAX
========================================================= */

function initParallax() {

    const visual =
        document.querySelector(
            ".hero-visual"
        );

    if (!visual) return;

    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {
        return;
    }

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    .5);

            const y =
                (event.clientY /
                    window.innerHeight -
                    .5);

            targetX = x * 10;
            targetY = y * 10;

        },
        {
            passive: true
        }
    );


    function animate() {

        currentX +=
            (targetX - currentX) * .05;

        currentY +=
            (targetY - currentY) * .05;

        visual.style.transform =
            `translate(${currentX}px, ${currentY}px)`;

        requestAnimationFrame(
            animate
        );

    }

    animate();

}


/* =========================================================
   ACTIVE SECTION
========================================================= */

function initActiveSection() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const links =
        document.querySelectorAll(
            ".desktop-nav a"
        );

    if (!sections.length || !links.length) {
        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        entry.target.id;

                    links.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                        if (
                            link.getAttribute(
                                "href"
                            ) === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px"
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   SMOOTH LINKS
========================================================= */

function initSmoothLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !id ||
                    id === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(id);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });

}


/* =========================================================
   3D TILT — CARDS
========================================================= */

function initTiltCards() {

    const cards =
        document.querySelectorAll(
            ".skill-card, .project-card"
        );

    if (!cards.length) return;

    if (
        window.matchMedia(
            "(hover: none)"
        ).matches
    ) {
        return;
    }

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;

                const rotateX =
                    ((y / rect.height) -
                        .5) * -5;

                const rotateY =
                    ((x / rect.width) -
                        .5) * 5;

                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-7px)`;

            }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   TERMINAL RANDOM STATUS
========================================================= */

function initTerminalStatus() {

    const status =
        document.querySelector(
            ".active-terminal"
        );

    if (!status) return;

    const messages = [
        "SYSTEM ONLINE",
        "NETWORK READY",
        "PORT 80 OPEN",
        "SERVER ONLINE",
        "CODE EXECUTED"
    ];

    let index = 0;

    setInterval(() => {

        index =
            (index + 1) %
            messages.length;

        status.textContent =
            messages[index];

    }, 3000);

}


/* =========================================================
   INIT EXTRA EFFECTS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initTiltCards();
        initTerminalStatus();

    }
);


/* =========================================================
   CONSOLE SIGNATURE
========================================================= */

console.log(
`
╔══════════════════════════════════════╗
║   STEVEN IRFAN ROMMADHONI            ║
║   TJKT × NETWORKING × CODING         ║
║                                      ║
║   Portfolio System: ONLINE           ║
╚══════════════════════════════════════╝
`
);