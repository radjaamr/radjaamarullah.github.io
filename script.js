/* =========================================================
   RADJA'S MOVIE
   Main JavaScript
========================================================= */


/* =========================================================
   MOVIE DATA
========================================================= */

const movies = [

    {
        id: 1,

        title: "Fight Club",

        genre: ["Drama", "Thriller"],

        year: 1999,

        duration: "139 min",

        rating: 8.8,

        price: 12,

        description:
            "Seorang pegawai kantoran biasa yang menderita insomnia bertemu dengan seorang pembuat sabun misterius bernama Tyler Durden. Persahabatan mereka berujung pada pendirian sebuah klub pertarungan bawah tanah yang mengubah hidup mereka selamanya.",

        /*
         * Poster image.
         * Replace this URL with your preferred poster if needed.
         */
        poster:
            "https://image.tmdb.org/t/p/w780/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",

        /*
         * YouTube trailer:
         * 20th Century Studios
         */
        trailer:
            "https://www.youtube.com/embed/BdJKm16Co6M?autoplay=1&rel=0"
    },


    {
        id: 2,

        title: "Forrest Gump",

        genre: ["Drama", "Romance"],

        year: 1994,

        duration: "142 min",

        rating: 8.8,

        price: 13,

        description:
            "Forrest Gump adalah seorang pria yang baik hati; cara pandangnya yang sederhana terhadap dunia membawanya melewati berbagai momen luar biasa dalam sejarah Amerika, sementara ia tetap mencintai sahabat masa kecilnya, Jenny.",

        poster:
            "https://image.tmdb.org/t/p/w780/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",

        /*
         * Paramount Movies
         */
        trailer:
            "https://www.youtube.com/embed/Mj9IA9tTfio?autoplay=1&rel=0"
    },


    {
        id: 3,

        title: "How to Lose a Guy in 10 Days",

        genre: ["Romance", "Comedy"],

        year: 2003,

        duration: "116 min",

        rating: 6.6,

        price: 11,

        description:
            "Andie Anderson adalah seorang jurnalis yang memutuskan untuk menulis artikel tentang cara membuat seorang pria mengakhiri hubungan dalam sepuluh hari. Di saat yang sama, Benjamin Barry bertaruh bahwa ia bisa membuat seorang wanita jatuh cinta padanya.",

        poster:
            "https://m.media-amazon.com/images/M/MV5BMjE4NTA1NzExN15BMl5BanBnXkFtZTYwNjc3MjM3._V1_FMjpg_UX1000_.jpg",

        /*
         * Rotten Tomatoes Classic Trailers
         */
        trailer:
            "https://www.youtube.com/embed/2ZMGk_Ml1fc?autoplay=1&rel=0"
    },


    {
        id: 4,

        title: "La La Land",

        genre: ["Musical", "Romance", "Drama"],

        year: 2016,

        duration: "128 min",

        rating: 8.0,

        price: 14,

        description:
            "Seorang musisi jazz yang penuh gairah dan seorang aktris pemula bertemu di Los Angeles dan jatuh cinta saat berusaha mewujudkan impian mereka di Kota Bintang.",

        poster:
            "https://image.tmdb.org/t/p/w780/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",

        /*
         * Lionsgate Movies
         */
        trailer:
            "https://www.youtube.com/embed/0pdqf4P9MB8?autoplay=1&rel=0"
    },


    {
        id: 5,

        title: "Indecent Proposal",

        genre: ["Drama", "Romance"],

        year: 1993,

        duration: "117 min",

        rating: 6.1,

        price: 12,

        description:
            "Sepasang suami istri muda dihadapkan pada keputusan yang sulit ketika seorang pria asing yang kaya raya menawarkan satu juta dolar kepada mereka sebagai imbalan untuk menghabiskan satu malam bersama sang istri.",

        poster:
            "https://m.media-amazon.com/images/M/MV5BMDEyN2UyYjItNjRjMy00YzM3LWEwNzktNDRjNjA5NmIzMmU1XkEyXkFqcGc@._V1_.jpg",

        /*
         * Rotten Tomoatoes
         */
        trailer:
            "https://www.youtube.com/embed/HumfQ0xklFU"
    }

];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const navbar = document.getElementById("navbar");

const hamburger = document.getElementById("hamburger");

const navMenu = document.getElementById("navMenu");

const navLinks = document.querySelectorAll(".nav-link");

const moviesGrid = document.getElementById("moviesGrid");

const searchInput = document.getElementById("searchInput");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const noResults =
    document.getElementById("noResults");

const backToTop =
    document.getElementById("backToTop");

const movieModal =
    document.getElementById("movieModal");

const trailerModal =
    document.getElementById("trailerModal");

const bookingModal =
    document.getElementById("bookingModal");

const successModal =
    document.getElementById("successModal");

const trailerFrame =
    document.getElementById("trailerFrame");

const trailerTitle =
    document.getElementById("trailerTitle");

const bookingForm =
    document.getElementById("bookingForm");

const contactForm =
    document.getElementById("contactForm");

const bookingMovie =
    document.getElementById("bookingMovie");

const bookingDate =
    document.getElementById("bookingDate");

const bookingQuantity =
    document.getElementById("bookingQuantity");

const bookingTime =
    document.getElementById("bookingTime");

const summaryMovie =
    document.getElementById("summaryMovie");

const summaryPrice =
    document.getElementById("summaryPrice");

const summaryQuantity =
    document.getElementById("summaryQuantity");

const summaryTotal =
    document.getElementById("summaryTotal");

const toast =
    document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");

const toastClose =
    document.getElementById("toastClose");


/* =========================================================
   STATE
========================================================= */

let currentMovieId = null;

let currentFilter = "All";

let toastTimer = null;


/* =========================================================
   FORMAT PRICE
========================================================= */

function formatPrice(price) {

    return `$${price.toFixed(2)}`;

}


/* =========================================================
   GET MOVIE
========================================================= */

function getMovieById(id) {

    return movies.find(movie => movie.id === Number(id));

}


/* =========================================================
   RENDER MOVIES
========================================================= */

function renderMovies() {

    const searchTerm =
        searchInput.value
            .trim()
            .toLowerCase();


    const filteredMovies =
        movies.filter(movie => {

            const matchesSearch =
                movie.title
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesFilter =
                currentFilter === "All" ||
                movie.genre.includes(currentFilter);


            return matchesSearch && matchesFilter;

        });


    moviesGrid.innerHTML = "";


    if (filteredMovies.length === 0) {

        noResults.classList.add("show");

        return;

    }


    noResults.classList.remove("show");


    filteredMovies.forEach((movie, index) => {

        const card =
            document.createElement("article");

        card.className = "movie-card";

        card.style.animationDelay =
            `${index * 0.08}s`;


        card.innerHTML = `

            <div class="movie-poster">

                <img
                    src="${movie.poster}"
                    alt="${movie.title} poster"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/600x900/15151C/FFFFFF?text=${encodeURIComponent(movie.title)}'"
                >

                <div class="rating-badge">
                    <i class="fa-solid fa-star"></i>
                    ${movie.rating}
                </div>

            </div>


            <div class="movie-info">

                <h3>
                    ${movie.title}
                </h3>


                <div class="movie-tags">

                    <span class="movie-tag">
                        ${movie.genre[0]}
                    </span>

                    <span class="movie-tag">
                        ${movie.year}
                    </span>

                    <span class="movie-tag">
                        ${movie.duration}
                    </span>

                </div>


                <p class="movie-description">
                    ${movie.description}
                </p>


                <div class="movie-bottom">

                    <div class="movie-price">

                        <span>
                            Ticket
                        </span>

                        <strong>
                            ${formatPrice(movie.price)}
                        </strong>

                    </div>


                    <div class="movie-buttons">

                        <button
                            class="card-btn details-btn"
                            data-action="details"
                            data-id="${movie.id}"
                        >
                            Details
                        </button>

                        <button
                            class="card-btn"
                            title="Watch Trailer"
                            aria-label="Watch Trailer"
                            data-action="trailer"
                            data-id="${movie.id}"
                        >
                            <i class="fa-solid fa-play"></i>
                        </button>

                    </div>

                </div>

            </div>

        `;


        moviesGrid.appendChild(card);

    });

}


/* =========================================================
   RENDER BOOKING MOVIE OPTIONS
========================================================= */

function renderBookingMovies() {

    bookingMovie.innerHTML = "";


    movies.forEach(movie => {

        const option =
            document.createElement("option");

        option.value = movie.id;

        option.textContent =
            `${movie.title} — ${formatPrice(movie.price)}`;

        bookingMovie.appendChild(option);

    });

}


/* =========================================================
   UPDATE BOOKING SUMMARY
========================================================= */

function updateBookingSummary() {

    const selectedMovie =
        getMovieById(bookingMovie.value);


    if (!selectedMovie) {

        summaryMovie.textContent = "-";

        summaryPrice.textContent = "$0.00";

        summaryQuantity.textContent = "1";

        summaryTotal.textContent = "$0.00";

        return;

    }


    const quantity =
        Number(bookingQuantity.value) || 1;


    const total =
        selectedMovie.price * quantity;


    summaryMovie.textContent =
        selectedMovie.title;


    summaryPrice.textContent =
        formatPrice(selectedMovie.price);


    summaryQuantity.textContent =
        quantity;


    summaryTotal.textContent =
        formatPrice(total);

}


/* =========================================================
   OPEN MODAL
========================================================= */

function openModal(modal) {

    if (!modal) return;


    modal.classList.add("active");

    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeModal(modal) {

    if (!modal) return;


    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");


    /*
     * Stop YouTube playback
     */
    if (modal === trailerModal) {

        trailerFrame.src = "";

    }


    /*
     * Check if another modal is still open.
     */
    const activeModal =
        document.querySelector(".modal.active");


    if (!activeModal) {

        document.body.classList.remove("modal-open");

    }

}


/* =========================================================
   MOVIE DETAIL
========================================================= */

function openMovieDetails(movieId) {

    const movie =
        getMovieById(movieId);


    if (!movie) return;


    currentMovieId = movie.id;


    document.getElementById("detailPoster").src =
        movie.poster;


    document.getElementById("detailPoster").alt =
        `${movie.title} poster`;


    document.getElementById("detailGenre").textContent =
        movie.genre.join(" • ");


    document.getElementById("detailTitle").textContent =
        movie.title;


    document.getElementById("detailYear").textContent =
        movie.year;


    document.getElementById("detailDuration").textContent =
        movie.duration;


    document.getElementById("detailRating").textContent =
        `${movie.rating}/10`;


    document.getElementById("detailPrice").textContent =
        formatPrice(movie.price);


    document.getElementById("detailDescription").textContent =
        movie.description;


    openModal(movieModal);

}


/* =========================================================
   OPEN TRAILER
========================================================= */

function openTrailer(movieId) {

    const movie =
        getMovieById(movieId);


    if (!movie) return;


    currentMovieId = movie.id;


    trailerTitle.textContent =
        `${movie.title} — Trailer`;


    trailerFrame.src =
        movie.trailer;


    openModal(trailerModal);

}


/* =========================================================
   OPEN BOOKING
========================================================= */

function openBooking(movieId = null) {

    if (movieId) {

        const movie =
            getMovieById(movieId);


        if (movie) {

            bookingMovie.value =
                movie.id;

        }

    }


    updateBookingSummary();

    openModal(bookingModal);

}


/* =========================================================
   GENERATE BOOKING ID
========================================================= */

function generateBookingId() {

    const randomNumber =
        Math.floor(10000 + Math.random() * 90000);


    return `RM-${randomNumber}`;

}


/* =========================================================
   TOAST
========================================================= */

function showToast(title, message) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 4500);

}


/* =========================================================
   HAMBURGER MENU
========================================================= */

hamburger.addEventListener("click", () => {

    hamburger.classList.toggle("active");

    navMenu.classList.toggle("active");

});


/* =========================================================
   NAVIGATION LINKS
========================================================= */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

    });

});


/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const sections =
    document.querySelectorAll("main section");


function updateActiveNav() {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");


                if (
                    link.getAttribute("href") ===
                    `#${sectionId}`
                ) {

                    link.classList.add("active");

                }

            });

        }

    });

}


/* =========================================================
   SCROLL EVENT
========================================================= */

window.addEventListener("scroll", () => {

    /*
     * Sticky navbar
     */

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }


    /*
     * Back to top
     */

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }


    updateActiveNav();

});


/* =========================================================
   SEARCH
========================================================= */

searchInput.addEventListener("input", () => {

    renderMovies();

});


/* =========================================================
   FILTER
========================================================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentFilter =
            button.dataset.filter;


        renderMovies();

    });

});


/* =========================================================
   MOVIE CARD BUTTONS
========================================================= */

moviesGrid.addEventListener("click", event => {

    const button =
        event.target.closest("[data-action]");


    if (!button) return;


    const action =
        button.dataset.action;


    const movieId =
        Number(button.dataset.id);


    if (action === "details") {

        openMovieDetails(movieId);

    }


    if (action === "trailer") {

        openTrailer(movieId);

    }

});


/* =========================================================
   DETAIL MODAL BUTTONS
========================================================= */

document
    .getElementById("detailTrailerBtn")
    .addEventListener("click", () => {

        if (!currentMovieId) return;


        closeModal(movieModal);

        openTrailer(currentMovieId);

    });


document
    .getElementById("detailBuyBtn")
    .addEventListener("click", () => {

        if (!currentMovieId) return;


        closeModal(movieModal);

        openBooking(currentMovieId);

    });


/* =========================================================
   BOOKING CALCULATION
========================================================= */

bookingMovie.addEventListener(
    "change",
    updateBookingSummary
);


bookingQuantity.addEventListener(
    "change",
    updateBookingSummary
);


/* =========================================================
   BOOKING FORM
========================================================= */

bookingForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!bookingForm.checkValidity()) {

            bookingForm.reportValidity();

            return;

        }


        const selectedMovie =
            getMovieById(bookingMovie.value);


        if (!selectedMovie) {

            showToast(
                "Error",
                "Please select a movie."
            );

            return;

        }


        const selectedDate =
            bookingDate.value;


        const selectedTime =
            bookingTime.value;


        const quantity =
            Number(bookingQuantity.value);


        if (!selectedDate || !selectedTime) {

            showToast(
                "Incomplete Form",
                "Please select date and time."
            );

            return;

        }


        const bookingId =
            generateBookingId();


        document.getElementById("bookingId")
            .textContent = bookingId;


        document.getElementById("successTitle")
            .textContent = "Booking Confirmed!";


        document.getElementById("successMessage")
            .textContent =
            `Thank you for booking ${selectedMovie.title} with Radja's Movie. ${quantity} ticket${quantity > 1 ? "s" : ""} reserved for ${selectedDate} at ${selectedTime}.`;


        closeModal(bookingModal);


        openModal(successModal);


        bookingForm.reset();


        /*
         * Restore first movie after reset
         */

        bookingMovie.value =
            selectedMovie.id;


        bookingQuantity.value = "1";


        updateBookingSummary();

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        if (!contactForm.checkValidity()) {

            contactForm.reportValidity();

            return;

        }


        showToast(
            "Message sent successfully!",
            "Thank you for contacting Radja's Movie."
        );


        contactForm.reset();

    }
);


/* =========================================================
   CLOSE BUTTONS
========================================================= */

document.addEventListener(
    "click",
    event => {

        const closeButton =
            event.target.closest("[data-close]");


        if (!closeButton) return;


        const modalId =
            closeButton.dataset.close;


        const modal =
            document.getElementById(modalId);


        closeModal(modal);

    }
);


/* =========================================================
   CLOSE MODAL BY CLICKING OUTSIDE
========================================================= */

document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        /*
         * Close only when clicking overlay,
         * not the modal content.
         */

        if (
            event.target.classList.contains(
                "modal-overlay"
            )
        ) {

            closeModal(modal);

        }

    });

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") return;


        const activeModal =
            document.querySelector(".modal.active");


        if (activeModal) {

            closeModal(activeModal);

        }


        hamburger.classList.remove("active");

        navMenu.classList.remove("active");

    }
);


/* =========================================================
   BACK TO TOP
========================================================= */

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   TOAST CLOSE
========================================================= */

toastClose.addEventListener("click", () => {

    toast.classList.remove("show");

});


/* =========================================================
   MINIMUM BOOKING DATE
========================================================= */

function setMinimumDate() {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");


    const day =
        String(today.getDate())
            .padStart(2, "0");


    const dateString =
        `${year}-${month}-${day}`;


    bookingDate.min =
        dateString;

}


setMinimumDate();


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   INITIALIZE
========================================================= */

function init() {

    renderMovies();

    renderBookingMovies();

    updateBookingSummary();

    updateActiveNav();

}


init();