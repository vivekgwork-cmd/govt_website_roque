// ---------- Header + Nav injection ----------
function renderHeader(basePath, activePage) {
  const header = document.getElementById("site-header");
  if (!header) return;

  header.innerHTML = `
    <div class="top-strip">
      <span>Government of Karnataka | ಕರ್ನಾಟಕ ಸರ್ಕಾರ</span>
      <span id="today-date"></span>
    </div>
    <div class="site-header">
      <img src="${basePath}assets/karnataka-logo.png" alt="Government of Karnataka Logo" class="logo">
      <div class="header-text">
        <p class="kn-title">ಕರ್ನಾಟಕ ಸರ್ಕಾರ</p>
        <p class="en-subtitle">GOVERNMENT OF KARNATAKA</p>
        <p class="dept-name">District Training Institute, Shimoga</p>
      </div>
    </div>
    <nav class="navbar">
      <ul>
        <li><a href="${basePath}pages/home.html" data-page="home">Home</a></li>
        <li><a href="${basePath}pages/about.html" data-page="about">About Us</a></li>
        <li>
          <a href="${basePath}pages/training-material.html" data-page="training">Training Material</a>
        </li>
        <li><a href="${basePath}pages/circular.html" data-page="circular">Circulars</a></li>
        <li><a href="${basePath}pages/training-statistics.html" data-page="training-statistics">DTI Training Statistics</a></li>
        <li><a href="${basePath}pages/administrative-statistics.html" data-page="administrative-statistics">Administrative Statistics</a></li>
        <li><a href="${basePath}pages/calendar.html" data-page="calendar">Calendar</a></li>
        <li><a href="${basePath}pages/designed-by.html" data-page="designed">Designed By</a></li>
        <li class="nav-logout"><a href="${basePath}index.html">Logout</a></li>
      </ul>
    </nav>
  `;

  const dateEl = document.getElementById("today-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-IN", {
      year: "numeric", month: "long", day: "numeric"
    });
  }

  header.querySelectorAll("[data-page]").forEach(el => {
    if (el.dataset.page === activePage) el.classList.add("active");
  });
}

function renderFooter(basePath) {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  footer.classList.add("site-footer");
  footer.innerHTML = `
    <p>&copy; ${new Date().getFullYear()} District Training Institute, Shimoga &mdash; Government of Karnataka. All Rights Reserved.</p>
  `;
}

// ---------- Captcha (demo only) ----------
function randomCaptcha(len = 5) {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

const DEMO_LOGIN_ID = "dtc_shimoga";
const DEMO_PASSWORD = "Karnataka@123";

function initLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;

  const captchaBox = document.getElementById("captcha-text");
  const refreshBtn = document.getElementById("captcha-refresh");
  const msg = document.getElementById("form-msg");
  let current = randomCaptcha();
  captchaBox.textContent = current;

  refreshBtn.addEventListener("click", () => {
    current = randomCaptcha();
    captchaBox.textContent = current;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const captchaInput = document.getElementById("captcha-input").value.trim().toUpperCase();
    const userId = document.getElementById("login-id").value.trim();
    const pass = document.getElementById("login-password").value.trim();

    if (!userId || !pass) {
      msg.textContent = "Please enter Login ID and Password.";
      return;
    }
    if (userId !== DEMO_LOGIN_ID || pass !== DEMO_PASSWORD) {
      msg.textContent = "Invalid Login ID or Password.";
      return;
    }
    if (captchaInput !== current) {
      msg.textContent = "Incorrect captcha, please try again.";
      current = randomCaptcha();
      captchaBox.textContent = current;
      document.getElementById("captcha-input").value = "";
      return;
    }
    msg.style.color = "#2f7d32";
    msg.textContent = "Login successful. Redirecting...";
    setTimeout(() => { window.location.href = "pages/home.html"; }, 700);
  });
}

// ---------- Accordion (Training Material) ----------
function initAccordion() {
  document.querySelectorAll(".accordion-head").forEach(head => {
    head.addEventListener("click", () => {
      head.parentElement.classList.toggle("open");
    });
  });

  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) {
      target.classList.add("open");
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }
}
