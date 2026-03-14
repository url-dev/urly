// WAIT UNTIL DOM IS READY
document.addEventListener("DOMContentLoaded", function () {


    // LOADING SCREEN
    window.addEventListener("load", function () {
        const loader = document.querySelector(".loader");
        if (loader) {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 800);
        }
    });

    // TYPING TEXT EFFECT
    const roles = ["ComSci Student", "Web Developer", "BS Player", "A Novice"];
    let roleIndex = 0;
    let charIndex = 0;
    const typingSpan = document.querySelector(".typing-text span");

    function typeEffect() {
        if (!typingSpan) return;

        if (charIndex < roles[roleIndex].length) {
            typingSpan.textContent += roles[roleIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeEffect, 80);
        } else {
            setTimeout(eraseEffect, 1500);
        }
    }

    function eraseEffect() {
        if (!typingSpan) return;

        if (charIndex > 0) {
            typingSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseEffect, 40);
        } else {
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeEffect, 200);
        }
    }

    if (typingSpan) {
        typeEffect();
    }

    // SCROLL REVEAL
    const revealElements = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                el.classList.add("show");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // DARK / LIGHT MODE
    const toggleBtn = document.createElement("button");
    toggleBtn.innerText = "🌙";
    toggleBtn.classList.add("theme-toggle");
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            toggleBtn.innerText = "☀️";
            localStorage.setItem("theme", "dark");
        } else {
            toggleBtn.innerText = "🌙";
            localStorage.setItem("theme", "light");
        }
    });

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        toggleBtn.innerText = "☀️";
    }


    // NAVBAR SCROLL EFFECT
    const header = document.querySelector("header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }


    // CONTACT FORM VALIDATION + EMAILJS
    const form = document.getElementById("contact-form");
    const confirmation = document.getElementById("confirmation");

    if (form) {
        // Initialize EmailJS
        emailjs.init("fNAaKmlu-XX7uQY-l");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = form.querySelector("input[type='text']").value.trim();
            const email = form.querySelector("input[type='email']").value.trim();
            const message = form.querySelector("textarea").value.trim();

            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }

            // Send via EmailJS
            const params = {
                from_name: name,
                from_email: email,
                message: message
            };

            emailjs.send("service_pmysoqr", "template_r1bwhs5", params)
                .then(function (response) {
                    confirmation.innerText = "Email sent successfully!";
                    confirmation.style.color = "white";
                    form.reset();
                    console.log("SUCCESS", response.status, response.text);
                })
                .catch(function (error) {
                    confirmation.innerText = "Failed to send email. Try again.";
                    confirmation.style.color = "red";
                    console.log("FAILED", error);
                });
        });
    }

});


function showDesc(id) {
    const descs = document.querySelectorAll('.proj-desc');
    descs.forEach(d => d.style.display = 'none'); // hide all first

    const selected = document.getElementById(id);
    if (selected) selected.style.display = 'block'; // show selected
}