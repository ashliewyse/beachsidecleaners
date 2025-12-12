/* -----------------------------------------------------------
   Smooth Scroll
----------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* -----------------------------------------------------------
   Contact Form
----------------------------------------------------------- */
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("successMsg").style.display = "block";
  e.target.reset();
  setTimeout(() => {
    document.getElementById("successMsg").style.display = "none";
  }, 2500);
});

/* -----------------------------------------------------------
   Testimonial Slider
----------------------------------------------------------- */
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(i) {
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}

document.querySelector(".next").addEventListener("click", () => {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
});

document.querySelector(".prev").addEventListener("click", () => {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
});

/* -----------------------------------------------------------
   Light/Dark Theme Toggle
----------------------------------------------------------- */
document.getElementById("themeToggle").addEventListener("click", () => {
  const html = document.documentElement;
  const mode = html.getAttribute("data-theme") === "light" ? "dark" : "light";
  html.setAttribute("data-theme", mode);
});

/* -----------------------------------------------------------
   Gallery Lightbox
----------------------------------------------------------- */
document.querySelectorAll(".gallery-grid img").forEach(img => {
  img.addEventListener("click", () => {
    document.getElementById("lightboxImg").src = img.src;
    document.getElementById("lightbox").style.display = "flex";
  });
});

document.getElementById("lightbox").addEventListener("click", () => {
  document.getElementById("lightbox").style.display = "none";
});

/* -----------------------------------------------------------
   Chat Widget
----------------------------------------------------------- */
const chatBubble = document.getElementById("chatBubble");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");

chatBubble.addEventListener("click", () => {
  chatBubble.style.display = "none";
  chatBox.style.display = "flex";
});

closeChat.addEventListener("click", () => {
  chatBox.style.display = "none";
  chatBubble.style.display = "block";
});

document.getElementById("chatInput").addEventListener("keypress", e => {
  if (e.key === "Enter" && e.target.value.trim() !== "") {
    const msg = document.createElement("div");
    msg.className = "chat-msg";
    msg.textContent = e.target.value;
    document.getElementById("chatMessages").appendChild(msg);
    e.target.value = "";
  }
});

/* -----------------------------------------------------------
   Booking Modal
----------------------------------------------------------- */
const bookingModal = document.getElementById("bookingModal");

["openBooking", "openBooking2", "openBooking3"].forEach(id => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("click", e => {
      e.preventDefault();
      bookingModal.style.display = "flex";
    });
  }
});

document.getElementById("closeBooking").addEventListener("click", () => {
  bookingModal.style.display = "none";
});

bookingModal.addEventListener("click", e => {
  if (e.target === bookingModal) bookingModal.style.display = "none";
});

document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("bookingSuccess").style.display = "block";
  e.target.reset();
  setTimeout(() => {
    document.getElementById("bookingSuccess").style.display = "none";
    bookingModal.style.display = "none";
  }, 2000);
});

/* -----------------------------------------------------------
   UPDATED MAP — NW Indiana, SW Michigan, Chicago
----------------------------------------------------------- */
const map = L.map('map').setView([41.7, -87.5], 8);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const locations = [
  { name: "Chicago, IL", coords: [41.8781, -87.6298] },
  { name: "Hammond, IN", coords: [41.5834, -87.5000] },
  { name: "Gary, IN", coords: [41.6020, -87.3370] },
  { name: "Merrillville, IN", coords: [41.4828, -87.3328] },
  { name: "Michigan City, IN", coords: [41.7075, -86.8950] },
  { name: "New Buffalo, MI", coords: [41.7936, -86.7435] }
];

locations.forEach(loc => {
  L.marker(loc.coords)
    .addTo(map)
    .bindPopup(`<b>${loc.name}</b><br>Now servicing!`);
});
