/* =========================================================
   STEVEN IRFAN ROMMADHONI
   PORTFOLIO V3 — STABLE MOTION ENGINE
   TJKT × NETWORKING × CODING
   Compatible with the current index.html + style.css
   ========================================================= */

(() => {
    "use strict";

    /* ---------------------------------------------------------
       HELPERS
    --------------------------------------------------------- */

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

    const ready = (fn) => {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", fn, { once: true });
        } else {
            fn();
        }
    };

    ready(() => {

        /* -----------------------------------------------------
           SAFETY
           ----------------------------------------------------- */

        document.documentElement.classList.add("js-ready");
        document.body.classList.add("js-ready");

        const motionStyle = document.createElement("style");

        motionStyle.id = "portfolio-motion-engine";

        motionStyle.textContent = `
            .loader-progress span {
                animation: loaderProgress 1.6s ease forwards !important;
                animation-play-state: running !important;
            }

            .availability span {
                animation: pulse 1.6s ease-in-out infinite !important;
                animation-play-state: running !important;
            }

            .typing-cursor {
                animation: blink .8s steps(1,end) infinite !important;
                animation-play-state: running !important;
            }

            .terminal-card {
                animation: terminalFloat 5s ease-in-out infinite !important;
                animation-play-state: running !important;
            }

            .active-terminal {
                animation: blink 1s steps(1,end) infinite !important;
                animation-play-state: running !important;
            }

            .scroll-indicator div::after {
                animation: scrollLine 2s linear infinite !important;
                animation-play-state: running !important;
            }

            .marquee-track {
                animation: marquee 28s linear infinite !important;
                animation-play-state: running !important;
            }

            .packet-a {
                animation: packetA 3s linear infinite !important;
                animation-play-state: running !important;
            }

            .packet-b {
                animation: packetB 3s linear infinite 1s !important;
                animation-play-state: running !important;
            }

            .packet-c {
                animation: packetC 3s linear infinite 2s !important;
                animation-play-state: running !important;
            }

            .mini-line::after {
                animation: miniPacket 2s linear infinite !important;
                animation-play-state: running !important;
            }

            .code-status span {
                animation: pulse 1.4s ease-in-out infinite !important;
                animation-play-state: running !important;
            }

            .reveal.show {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }

            .network-node,
            .client-node {
                will-change: transform, box-shadow;
            }

            .profile-orbit {
                will-change: transform;
            }
        `;

        document.head.appendChild(motionStyle);


        /* -----------------------------------------------------
           LOADER
           ----------------------------------------------------- */

        const loader = $("#loader");

        const hideLoader = () => {
            if (!loader) return;

            loader.classList.add("hide");

            setTimeout(() => {
                loader.style.display = "none";
            }, 900);
        };

        if (loader) {
            window.addEventListener("load", () => {
                setTimeout(hideLoader, 650);
            }, { once: true });

            setTimeout(hideLoader, 3000);
        }


        /* -----------------------------------------------------
           TYPING EFFECT
           ----------------------------------------------------- */

        const typing = $(".typing-text");

        if (typing) {

            const words = [
                "TECHNICIAN",
                "NETWORK ENGINEER",
                "MIKROTIK ENTHUSIAST",
                "WEB DEVELOPER",
                "CODER",
                "PROBLEM SOLVER"
            ];

            let word = 0;
            let index = 0;
            let deleting = false;
            let timer = null;

            const type = () => {

                const current = words[word];

                if (!deleting) {
                    index++;
                } else {
                    index--;
                }

                typing.textContent = current.slice(0, index);

                if (!deleting && index >= current.length) {
                    deleting = true;
                    timer = setTimeout(type, 1700);
                    return;
                }

                if (deleting && index <= 0) {
                    deleting = false;
                    word = (word + 1) % words.length;
                    timer = setTimeout(type, 350);
                    return;
                }

                timer = setTimeout(type, deleting ? 45 : 85);
            };

            typing.textContent = "";
            timer = setTimeout(type, 900);

            window.addEventListener("beforeunload", () => {
                if (timer) clearTimeout(timer);
            });
        }


        /* -----------------------------------------------------
           REVEAL ON SCROLL
           ----------------------------------------------------- */

        const revealItems = $$(".reveal");

        const showReveal = (element) => {
            element.classList.add("show");
        };

        if ("IntersectionObserver" in window) {

            const revealObserver = new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            showReveal(entry.target);

                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

            revealItems.forEach((element, index) => {

                element.style.transitionDelay =
                    `${Math.min(index * 45, 300)}ms`;

                revealObserver.observe(element);
            });

        } else {

            revealItems.forEach(showReveal);
        }

        setTimeout(() => {
            revealItems.forEach((element) => {

                const rect = element.getBoundingClientRect();

                if (rect.top < window.innerHeight + 100) {
                    showReveal(element);
                }
            });
        }, 1200);


        /* -----------------------------------------------------
           COUNTER
           ----------------------------------------------------- */

        const counters = $$("[data-counter]");

        const animateCounter = (element) => {

            if (element.dataset.counterDone === "true") return;

            const target = Number(element.dataset.counter);

            if (!Number.isFinite(target)) return;

            element.dataset.counterDone = "true";

            const duration = 1100;
            const start = performance.now();

            const tick = (now) => {

                const progress = Math.min(
                    (now - start) / duration,
                    1
                );

                const eased =
                    1 - Math.pow(1 - progress, 3);

                const value =
                    Math.round(target * eased);

                element.textContent =
                    String(value).padStart(2, "0");

                if (progress < 1) {
                    requestAnimationFrame(tick);
                }
            };

            requestAnimationFrame(tick);
        };


        if ("IntersectionObserver" in window) {

            const counterObserver = new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            animateCounter(entry.target);

                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.45
                }
            );

            counters.forEach((counter) => {
                counterObserver.observe(counter);
            });

        } else {

            counters.forEach(animateCounter);
        }


        /* -----------------------------------------------------
           NAVBAR
           ----------------------------------------------------- */

        const navbar = $(".navbar");

        const updateNavbar = () => {

            if (!navbar) return;

            navbar.classList.toggle(
                "scrolled",
                window.scrollY > 40
            );
        };

        updateNavbar();

        window.addEventListener(
            "scroll",
            updateNavbar,
            { passive: true }
        );


        /* -----------------------------------------------------
           ACTIVE NAV
           ----------------------------------------------------- */

        const navLinks = $$(".desktop-nav a");

        const sections = $$(
            "main section[id]"
        );

        const updateActiveNav = () => {

            if (!sections.length) return;

            const position =
                window.scrollY + 180;

            let current = "home";

            sections.forEach((section) => {

                if (
                    position >= section.offsetTop &&
                    position <
                    section.offsetTop +
                    section.offsetHeight
                ) {
                    current = section.id;
                }
            });

            navLinks.forEach((link) => {

                const href =
                    link.getAttribute("href");

                link.classList.toggle(
                    "active",
                    href === `#${current}`
                );
            });
        };

        updateActiveNav();

        let scrollFrame = false;

        window.addEventListener(
            "scroll",
            () => {

                if (scrollFrame) return;

                scrollFrame = true;

                requestAnimationFrame(() => {

                    updateActiveNav();

                    scrollFrame = false;
                });
            },
            { passive: true }
        );


        /* -----------------------------------------------------
           MOBILE MENU
           ----------------------------------------------------- */

        const menuButton = $(".menu-button");
        const mobileMenu = $(".mobile-menu");

        const closeMenu = () => {

            if (!mobileMenu) return;

            mobileMenu.classList.remove("active");

            if (menuButton) {
                menuButton.classList.remove("active");
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

            document.body.classList.remove(
                "menu-open"
            );
        };

        if (menuButton && mobileMenu) {

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.addEventListener(
                "click",
                () => {

                    const active =
                        mobileMenu.classList.toggle(
                            "active"
                        );

                    menuButton.classList.toggle(
                        "active",
                        active
                    );

                    menuButton.setAttribute(
                        "aria-expanded",
                        String(active)
                    );

                    document.body.classList.toggle(
                        "menu-open",
                        active
                    );
                }
            );

            $$(".mobile-menu a").forEach((link) => {

                link.addEventListener(
                    "click",
                    closeMenu
                );
            });
        }

        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {
                    closeMenu();
                }
            }
        );
              /* -----------------------------------------------------
           SMOOTH INTERNAL LINKS
           ----------------------------------------------------- */

        $$('a[href^="#"]').forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const id =
                        link.getAttribute("href");

                    if (!id || id === "#") return;

                    const target =
                        document.querySelector(id);

                    if (!target) return;

                    event.preventDefault();

                    const offset =
                        navbar ?
                        navbar.offsetHeight :
                        0;

                    const top =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        offset;

                    window.scrollTo({
                        top,
                        behavior: "smooth"
                    });
                }
            );
        });


        /* -----------------------------------------------------
           MAGNETIC BUTTONS
           ----------------------------------------------------- */

        const magnetic = $$(".magnetic");

        magnetic.forEach((element) => {

            element.addEventListener(
                "mousemove",
                (event) => {

                    if (window.innerWidth < 768)
                        return;

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
                        `translate(
                            ${x * 0.10}px,
                            ${y * 0.10}px
                        )`;
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    element.style.transform = "";
                }
            );
        });


        /* -----------------------------------------------------
           CARD TILT
           ----------------------------------------------------- */

        const tiltCards = $$(
            ".skill-card, .project-card, .contact-card"
        );

        tiltCards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    if (window.innerWidth < 900)
                        return;

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const rotateY =
                        ((x - rect.width / 2) /
                            rect.width) * 5;

                    const rotateX =
                        ((y - rect.height / 2) /
                            rect.height) * -5;

                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-4px)`;
                }
            );

            card.addEventListener(
                "mouseleave",
                () => {
                    card.style.transform = "";
                }
            );
        });


        /* -----------------------------------------------------
           HERO IMAGE PARALLAX
           ----------------------------------------------------- */

        const profileImage =
            $(".profile-image img");

        if (profileImage) {

            let px = 0;
            let py = 0;
            let tx = 0;
            let ty = 0;

            window.addEventListener(
                "mousemove",
                (event) => {

                    if (window.innerWidth < 900)
                        return;

                    px =
                        (event.clientX /
                            window.innerWidth -
                            0.5) * 8;

                    py =
                        (event.clientY /
                            window.innerHeight -
                            0.5) * 8;
                },
                { passive: true }
            );

            const imageLoop = () => {

                tx += (px - tx) * 0.06;
                ty += (py - ty) * 0.06;

                profileImage.style.transform =
                    `scale(1.035)
                     translate(${tx}px, ${ty}px)`;

                requestAnimationFrame(imageLoop);
            };

            imageLoop();
        }


        /* -----------------------------------------------------
           PROFILE ORBIT MOTION
           ----------------------------------------------------- */

        const orbitA = $(".orbit-a");
        const orbitB = $(".orbit-b");

        let orbitTime = 0;

        const orbitLoop = () => {

            orbitTime += 0.004;

            if (orbitA) {

                const y =
                    Math.sin(orbitTime) * 10;

                const rotate =
                    -28 +
                    Math.sin(orbitTime * 0.7) * 2;

                orbitA.style.transform =
                    `translateY(${y}px)
                     rotate(${rotate}deg)`;
            }

            if (orbitB) {

                const y =
                    Math.cos(orbitTime * 0.85) * 8;

                const rotate =
                    48 +
                    Math.cos(orbitTime * 0.6) * 2;

                orbitB.style.transform =
                    `translateY(${y}px)
                     rotate(${rotate}deg)`;
            }

            requestAnimationFrame(orbitLoop);
        };

        if (orbitA || orbitB) {
            orbitLoop();
        }


        /* -----------------------------------------------------
           NETWORK DIAGRAM LIVE PULSE
           ----------------------------------------------------- */

        const networkNodes = $$(
            ".network-node"
        );

        const networkClients = $$(
            ".client-node"
        );

        let networkTime = 0;

        const networkLoop = () => {

            networkTime += 0.025;

            networkNodes.forEach((node, index) => {

                const offset =
                    Math.sin(
                        networkTime +
                        index * 1.6
                    ) * 2.5;

                node.style.transform =
                    `translateY(${offset}px)`;

                node.style.boxShadow =
                    `0 0 ${
                        12 +
                        (Math.sin(
                            networkTime +
                            index
                        ) + 1) * 8
                    }px rgba(255,255,255,.04)`;
            });

            networkClients.forEach((node, index) => {

                const pulse =
                    Math.sin(
                        networkTime * 1.2 +
                        index
                    );

                node.style.transform =
                    `translateY(${pulse * 1.5}px)`;
            });

            requestAnimationFrame(networkLoop);
        };

        if (
            networkNodes.length ||
            networkClients.length
        ) {
            networkLoop();
        }


        /* -----------------------------------------------------
           TERMINAL LIVE STATUS
           ----------------------------------------------------- */

        const terminal =
            $(".terminal-card");

        if (terminal) {

            const successLines =
                $$(".terminal-body .success", terminal);

            const activeLine =
                $(".active-terminal", terminal);

            successLines.forEach((line, index) => {

                line.style.opacity = "0.55";

                setTimeout(() => {

                    line.style.transition =
                        "opacity .45s ease";

                    line.style.opacity = "1";

                }, 800 + index * 260);
            });

            if (activeLine) {

                let active = true;

                setInterval(() => {

                    active =
                        !active;

                    activeLine.style.opacity =
                        active ? "1" : ".35";

                }, 850);
            }
        }


        /* -----------------------------------------------------
           NETWORK CANVAS
           Background particle / connection system
           ----------------------------------------------------- */

        const canvas =
            $("#networkCanvas");

        if (canvas) {

            const ctx =
                canvas.getContext("2d");

            if (ctx) {

                let width = 0;
                let height = 0;
                let dpr = 1;

                let nodes = [];

                const getCount = () => {

                    if (window.innerWidth < 480)
                        return 24;

                    if (window.innerWidth < 900)
                        return 36;

                    return 62;
                };

                const resize = () => {

                    dpr =
                        Math.min(
                            window.devicePixelRatio || 1,
                            1.75
                        );

                    width =
                        window.innerWidth;

                    height =
                        window.innerHeight;

                    canvas.width =
                        Math.floor(
                            width * dpr
                        );

                    canvas.height =
                        Math.floor(
                            height * dpr
                        );

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
                };

                const createNodes = () => {

                    nodes = [];

                    const count =
                        getCount();

                    for (
                        let i = 0;
                        i < count;
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
                                (Math.random() -
                                    0.5) *
                                0.16,

                            vy:
                                (Math.random() -
                                    0.5) *
                                0.16,

                            r:
                                Math.random() *
                                1.2 +
                                0.35
                        });
                    }
                };

                const draw = () => {

                    ctx.clearRect(
                        0,
                        0,
                        width,
                        height
                    );

                    const maxDistance =
                        width < 768
                            ? 105
                            : 135;

                    nodes.forEach((node) => {

                        node.x += node.vx;
                        node.y += node.vy;

                        if (
                            node.x < -20 ||
                            node.x > width + 20
                        ) {
                            node.vx *= -1;
                        }

                        if (
                            node.y < -20 ||
                            node.y > height + 20
                        ) {
                            node.vy *= -1;
                        }
                    });

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
                                Math.hypot(
                                    dx,
                                    dy
                                );

                            if (
                                distance <
                                maxDistance
                            ) {

                                const opacity =
                                    (
                                        1 -
                                        distance /
                                        maxDistance
                                    ) * .22;

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
                                    `rgba(
                                        255,
                                        255,
                                        255,
                                        ${opacity}
                                    )`;

                                ctx.lineWidth =
                                    .5;

                                ctx.stroke();
                            }
                        }
                    }

                    nodes.forEach((node) => {

                        ctx.beginPath();

                        ctx.arc(
                            node.x,
                            node.y,
                            node.r,
                            0,
                            Math.PI * 2
                        );

                        ctx.fillStyle =
                            "rgba(255,255,255,.42)";

                        ctx.fill();
                    });

                    requestAnimationFrame(draw);
                };

                resize();
                createNodes();
                draw();

                let resizeTimer;

                window.addEventListener(
                    "resize",
                    () => {

                        clearTimeout(
                            resizeTimer
                        );

                        resizeTimer =
                            setTimeout(() => {

                                resize();
                                createNodes();

                            }, 180);
                    },
                    { passive: true }
                );
            }
        }        /* -----------------------------------------------------
           MINI PROJECT NETWORK
           ----------------------------------------------------- */

        const miniLines =
            $$(".mini-line");

        miniLines.forEach((line, index) => {

            line.style.setProperty(
                "--packet-delay",
                `${index * .7}s`
            );
        });


        /* -----------------------------------------------------
           MARQUEE
           ----------------------------------------------------- */

        const marquee =
            $(".marquee-track");

        if (marquee) {

            marquee.style.animationPlayState =
                "running";

            marquee.addEventListener(
                "mouseenter",
                () => {
                    marquee.style.animationPlayState =
                        "paused";
                }
            );

            marquee.addEventListener(
                "mouseleave",
                () => {
                    marquee.style.animationPlayState =
                        "running";
                }
            );
        }


        /* -----------------------------------------------------
           SCROLL PROGRESS
           ----------------------------------------------------- */

        const progress =
            document.createElement("div");

        progress.className =
            "portfolio-scroll-progress";

        progress.style.cssText = `
            position:fixed;
            top:0;
            left:0;
            width:0%;
            height:2px;
            background:#fff;
            z-index:100001;
            pointer-events:none;
            transition:width .08s linear;
        `;

        document.body.appendChild(progress);

        const updateProgress = () => {

            const max =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const value =
                max > 0
                    ? (window.scrollY / max) * 100
                    : 0;

            progress.style.width =
                `${value}%`;
        };

        updateProgress();

        window.addEventListener(
            "scroll",
            updateProgress,
            { passive: true }
        );


        /* -----------------------------------------------------
           CURSOR — DESKTOP ONLY
           ----------------------------------------------------- */

        const cursorDot =
            $(".cursor-dot");

        const cursorRing =
            $(".cursor-ring");

        if (
            cursorDot &&
            cursorRing &&
            window.matchMedia("(pointer:fine)").matches
        ) {

            let mouseX =
                window.innerWidth / 2;

            let mouseY =
                window.innerHeight / 2;

            let ringX = mouseX;
            let ringY = mouseY;

            document.addEventListener(
                "mousemove",
                (event) => {

                    mouseX =
                        event.clientX;

                    mouseY =
                        event.clientY;

                    cursorDot.style.transform =
                        `translate3d(
                            ${mouseX}px,
                            ${mouseY}px,
                            0
                        ) translate(-50%,-50%)`;
                },
                { passive: true }
            );

            const cursorLoop = () => {

                ringX +=
                    (mouseX - ringX) *
                    .13;

                ringY +=
                    (mouseY - ringY) *
                    .13;

                cursorRing.style.transform =
                    `translate3d(
                        ${ringX}px,
                        ${ringY}px,
                        0
                    ) translate(-50%,-50%)`;

                requestAnimationFrame(
                    cursorLoop
                );
            };

            cursorLoop();

            $$(
                "a, button, .skill-card, .project-card"
            ).forEach((element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        cursorRing.style.width =
                            "48px";

                        cursorRing.style.height =
                            "48px";

                        cursorRing.style.background =
                            "rgba(255,255,255,.04)";
                    }
                );

                element.addEventListener(
                    "mouseleave",
                    () => {

                        cursorRing.style.width =
                            "34px";

                        cursorRing.style.height =
                            "34px";

                        cursorRing.style.background =
                            "transparent";
                    }
                );
            });
        }


        /* -----------------------------------------------------
           IMAGE ERROR PROTECTION
           ----------------------------------------------------- */

        $$("img").forEach((image) => {

            image.addEventListener(
                "error",
                () => {

                    image.dataset.imageError =
                        "true";

                    image.alt =
                        "Steven Irfan Rommad­honi";
                }
            );
        });


        /* -----------------------------------------------------
           REDUCED-MOTION FALLBACK
           ----------------------------------------------------- */

        const reduceMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );

        if (reduceMotion.matches) {

            document.documentElement
                .classList.add(
                    "portfolio-force-motion"
                );

            revealItems.forEach(showReveal);
        }


        /* -----------------------------------------------------
           FINAL SAFETY CHECK
           ----------------------------------------------------- */

        setTimeout(() => {

            revealItems.forEach((element) => {

                const style =
                    window.getComputedStyle(
                        element
                    );

                if (
                    style.opacity === "0"
                ) {
                    element.classList.add(
                        "show"
                    );
                }
            });

        }, 2200);


        /* -----------------------------------------------------
           DEBUG
           ----------------------------------------------------- */

        console.log(
            "%c SIR. PORTFOLIO V3 ",
            "background:#fff;color:#000;padding:5px 9px;font-weight:700;"
        );

        console.log(
            "%c Motion Engine: ONLINE ",
            "color:#fff;font-weight:700;"
        );

        console.log(
            `Canvas: ${!!canvas} | ` +
            `Typing: ${!!typing} | ` +
            `Reveal: ${revealItems.length} | ` +
            `Packets: ${$$(".packet").length}`
        );

    });
})();