// ---------- Header + Nav injection ----------
function renderHeader(basePath, activePage) {
  const header = document.getElementById("site-header");
  if (!header) return;
  header.classList.add("site-header");

  header.innerHTML = `
    <div class="top-strip">
      <span>Government of Karnataka | ಕರ್ನಾಟಕ ಸರ್ಕಾರ</span>
      <span id="today-date"></span>
    </div>
    <div class="header-bar">
      <a class="brand" href="${basePath}pages/home.html">
        <img src="${basePath}assets/new-kar-govt-logo.jpeg" alt="Government of Karnataka Logo" class="logo">
        <div class="brand-text">
          <p class="kn-title">ಕರ್ನಾಟಕ ಸರ್ಕಾರ</p>
          <p class="dept-name">District Training Institute, Shimoga</p>
          <p class="en-subtitle">Government of Karnataka</p>
        </div>
      </a>
      <div class="header-actions">
        <a class="btn btn-ghost btn-logout" href="${basePath}index.html">Logout</a>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">&#9776;</button>
      </div>
    </div>
    <nav class="navbar" id="site-nav" aria-label="Main">
      <ul>
        <li><a href="${basePath}pages/home.html" data-page="home">Home</a></li>
        <li><a href="${basePath}pages/about.html" data-page="about">About Us</a></li>
        <li><a href="${basePath}pages/training-material.html" data-page="training">Training Material</a></li>
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
    if (el.dataset.page === activePage) {
      el.classList.add("active");
      el.setAttribute("aria-current", "page");
    }
  });

  const toggle = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".navbar");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    toggle.innerHTML = open ? "&#10005;" : "&#9776;";
  });

  decorateDocLinks();
}

function renderFooter(basePath) {
  const footer = document.getElementById("site-footer");
  if (!footer) return;
  footer.classList.add("site-footer");
  footer.innerHTML = `
    <p>&copy; ${new Date().getFullYear()} District Training Institute, Shimoga &mdash; Government of Karnataka. All Rights Reserved.</p>
    <p class="designed-by">Powered by Wbzard Labs</p>
  `;
}

// ---------- Document links ----------
// Adds file-type badges to every .doc-link and turns placeholder ("#") links
// into a clearly marked "Coming soon" state so learners don't hit dead links.
const FILE_TYPES = [
  [/\.pdf$/i, "PDF", "badge-pdf"],
  [/\.pptx?$/i, "PPT", "badge-ppt"],
  [/\.docx?$/i, "DOC", "badge-doc"],
];

function decorateDocLinks() {
  document.querySelectorAll(".doc-link:not([data-decorated])").forEach(link => {
    link.dataset.decorated = "1";
    const row = link.closest(".doc-row");
    const badges = document.createElement("span");
    badges.className = "doc-badges";
    const href = link.getAttribute("href") || "#";

    if (href === "#") {
      const soon = document.createElement("span");
      soon.className = "doc-link is-soon";
      soon.dataset.decorated = "1";
      soon.textContent = link.textContent;
      link.replaceWith(soon);
      if (row) row.classList.add("is-soon");
      badges.innerHTML = `<span class="badge badge-soon">Coming soon</span>`;
      if (row) row.appendChild(badges);
      return;
    }

    if (/^https?:/i.test(href)) {
      badges.innerHTML = `<span class="badge badge-link">Web link &#8599;</span>`;
    } else {
      const files = new URL(href, location.href).searchParams.getAll("file");
      const types = [];
      files.forEach(f => {
        const t = FILE_TYPES.find(([re]) => re.test(f));
        if (t && !types.includes(t)) types.push(t);
      });
      badges.innerHTML = types.map(([, label, cls]) => `<span class="badge ${cls}">${label}</span>`).join("") +
        (files.length > 1 ? `<span class="badge badge-parts">${files.length} parts</span>` : "");
    }
    if (row && badges.innerHTML) row.appendChild(badges);
  });

  // Year tiles on the Training Statistics and Calendar pages
  document.querySelectorAll(".year-doc").forEach(tile => {
    const status = tile.querySelector(".year-doc-status");
    if (tile.getAttribute("href") === "#") {
      tile.classList.add("is-soon");
      tile.removeAttribute("href");
      tile.setAttribute("aria-disabled", "true");
      status.textContent = "Coming soon";
    } else {
      status.textContent = "View document";
    }
  });
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
    msg.style.color = "#1f7a4d";
    msg.textContent = "Login successful. Redirecting...";
    setTimeout(() => { window.location.href = "pages/about.html"; }, 700);
  });
}

// ---------- Accordion (Training Material) ----------
function setAccordion(item, open) {
  item.classList.toggle("open", open);
  const head = item.querySelector(".accordion-head");
  if (head) head.setAttribute("aria-expanded", String(open));
}

function initAccordion() {
  document.querySelectorAll(".accordion-item").forEach(item => {
    const head = item.querySelector(".accordion-head");
    head.setAttribute("aria-expanded", "false");
    head.addEventListener("click", () => setAccordion(item, !item.classList.contains("open")));

    const count = item.querySelector("[data-count]");
    if (count) {
      const total = item.querySelectorAll(".doc-row").length;
      const available = item.querySelectorAll(".doc-row:not(.is-soon)").length;
      count.textContent = `${total} topics · ${available} available to view`;
    }
  });

  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target && target.classList.contains("accordion-item")) {
      setAccordion(target, true);
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }
}

// ---------- Training Material search ----------
function initTrainingSearch() {
  const input = document.getElementById("topic-search");
  if (!input) return;
  const items = [...document.querySelectorAll(".accordion-item")];
  const empty = document.getElementById("no-results");
  const status = document.getElementById("search-status");
  const total = document.querySelectorAll(".doc-row").length;
  const available = document.querySelectorAll(".doc-row:not(.is-soon)").length;
  const defaultStatus = `${total} topics across ${items.length} categories · ${available} available to view`;
  status.textContent = defaultStatus;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    let matches = 0;
    items.forEach(item => {
      let itemMatches = 0;
      item.querySelectorAll(".doc-row").forEach(row => {
        const hit = !q || row.querySelector(".doc-link").textContent.toLowerCase().includes(q);
        row.hidden = !hit;
        if (hit) itemMatches++;
      });
      item.hidden = itemMatches === 0;
      setAccordion(item, Boolean(q) && itemMatches > 0);
      matches += itemMatches;
    });
    empty.classList.toggle("show", matches === 0);
    status.textContent = q
      ? `${matches} topic${matches === 1 ? "" : "s"} found for “${input.value.trim()}”`
      : defaultStatus;
  });

  document.getElementById("expand-all").addEventListener("click", () => items.forEach(i => setAccordion(i, true)));
  document.getElementById("collapse-all").addEventListener("click", () => items.forEach(i => setAccordion(i, false)));
}
