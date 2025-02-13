document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const nextButton = document.querySelector(".carousel-control.next");
    const prevButton = document.querySelector(".carousel-control.prev");
    const indicators = document.querySelectorAll(".indicator");

    let currentIndex = 0;
    let isTransitioning = false;

    function updateSlideClasses() {
        slides.forEach((slide, index) => {
            slide.classList.toggle("active", index === currentIndex);

            const caption = slide.querySelector(".caption-content");
            if (caption) {
                const elements = caption.querySelectorAll("*");
                elements.forEach((el, i) => {
                    el.style.visibility = index === currentIndex ? "visible" : "hidden";
                    el.style.opacity = "0";
                    el.style.transform = "translateY(-30px)";
                    el.style.filter = "blur(10px)";
                    el.style.animation = index === currentIndex ? `fadeInBlur 1.2s ease-out forwards ${0.3 + i * 0.2}s` : "none";
                });
            }
        });

        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === currentIndex);
        });
    }

    function moveToNextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex = (currentIndex + 1) % slides.length;
        updateSlideClasses();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    function moveToPrevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlideClasses();

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    let autoSlideInterval = setInterval(moveToNextSlide, 20000);

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(moveToNextSlide, 20000);
    }

    nextButton.addEventListener("click", () => {
        moveToNextSlide();
        resetAutoSlide();
    });

    prevButton.addEventListener("click", () => {
        moveToPrevSlide();
        resetAutoSlide();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            if (isTransitioning) return;
            currentIndex = index;
            updateSlideClasses();
            resetAutoSlide();
        });
    });

    updateSlideClasses();
});

document.addEventListener("DOMContentLoaded", function () {
    const skillBoxes = document.querySelectorAll(".skill-box");

    skillBoxes.forEach(box => {
        box.addEventListener("click", function () {
            const category = box.getAttribute("data-category");
            if (category) {
                window.location.href = `#${category}`;
                setTimeout(() => {
                    const categoryButton = document.querySelector(`.filter-btn[data-category="${category}"]`);
                    if (categoryButton) {
                        categoryButton.click();
                    }
                }, 500);
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const skillBoxes = document.querySelectorAll(".skill-box");

    skillBoxes.forEach((box) => {
        const container = box.querySelector(".icons-container");
        const icons = container.querySelectorAll(".floating-icon");

        let radius = 50;
        let offsetX = -30;
        let offsetY = 60;

        icons.forEach((icon, index) => {
            let angle = (index / icons.length) * (2 * Math.PI);
            icon.dataset.angle = angle;
        });

        function moveIcons() {
            icons.forEach((icon) => {
                let angle = parseFloat(icon.dataset.angle);
                angle += 0.01;
                icon.dataset.angle = angle;

                let x = Math.cos(angle) * radius + offsetX;
                let y = Math.sin(angle) * radius + offsetY;

                icon.style.transform = `translate(${x}px, ${y}px)`;
            });

            requestAnimationFrame(moveIcons);
        }

        moveIcons();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const videoContainer = document.getElementById("video-container");
    const graphicContainer = document.getElementById("graphic-container");
    const codingContainer = document.getElementById("coding-container");

    const videos = [
        { id: "YourVideoID", title: "Your Video Title", category: "YourCategory", logo: "YourLogo.png", link: "YourLink.html" }
    ];

    const graphics = [
        { image: "YourImage.png", title: "Your Image Title", category: "YourCategory", logo: "YourLogo.png", link: "YourLink.html" }
    ];

    const codingProjects = [
        { image: "YourImage.png", title: "Your Code Title", category: "YourCategory", logo: "YourLogo.png", link: "YourLink.html" }
    ];

    function generateProject(container, projects, isVideo = false) {
        projects.forEach(project => {
            const projectElement = document.createElement("div");
            projectElement.classList.add("portfolio-box");
            projectElement.setAttribute("data-category", project.category);

            projectElement.innerHTML = isVideo ?
                `<div class="video-container">
                    <iframe src="https://www.youtube.com/embed/${project.id}" allowfullscreen></iframe>
                </div>
                <h4 class="project-title"><a href="${project.link}">${project.title}</a></h4>
                <div class="program-logo"><img src="photo-thumb/${project.logo}" alt="Logo"></div>` :
                `<div class="image-container">
                    <img src="image/${project.image}" alt="${project.title}">
                </div>
                <h4 class="project-title"><a href="${project.link}">${project.title}</a></h4>
                <div class="program-logo"><img src="photo-thumb/${project.logo}" alt="Logo"></div>`;

            container.appendChild(projectElement);
        });
    }

    generateProject(videoContainer, videos, true);
    generateProject(graphicContainer, graphics);
    generateProject(codingContainer, codingProjects);
});

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");

    let messageBox = document.createElement("div");
    messageBox.id = "form-message";
    messageBox.style.display = "none";
    contactForm.appendChild(messageBox);

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        fetch("YourMailScript.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            messageBox.innerHTML = data.status === "success" ? "✅ Your message has been sent!" : "❌ Your error message";
            messageBox.style.display = "block";

            setTimeout(() => {
                messageBox.style.display = "none";
            }, 5000);
        })
        .catch(error => {
            messageBox.innerHTML = "❌ An error occurred.";
            messageBox.style.display = "block";

            setTimeout(() => {
                messageBox.style.display = "none";
            }, 5000);
        });
    });
});
