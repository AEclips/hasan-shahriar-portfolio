/* ==========================================================================
   MD. HASAN SHAHRIAR (MUKTO) — AWARD-WINNING RED & WHITE NEOBRUTALIST ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ------------------------------------------------------------------------
     0. OPENING SHUTTER BOOT SEQUENCE & NUMBER COUNTERS
     ------------------------------------------------------------------------ */
  const bootShutter = document.getElementById("boot-shutter");
  const shutterFill = document.getElementById("shutter-bar-fill");
  const shutterPct = document.getElementById("shutter-pct");

  let bootProgress = 0;
  const bootTimer = setInterval(() => {
    bootProgress += Math.floor(Math.random() * 22) + 14;
    if (bootProgress >= 100) {
      bootProgress = 100;
      clearInterval(bootTimer);
      if (shutterFill) shutterFill.style.width = "100%";
      if (shutterPct) shutterPct.textContent = "100%";
      setTimeout(() => {
        if (bootShutter) bootShutter.classList.add("is-loaded");
        animateCounters();
      }, 180);
    } else {
      if (shutterFill) shutterFill.style.width = `${bootProgress}%`;
      if (shutterPct) shutterPct.textContent = `${String(bootProgress).padStart(2, "0")}%`;
    }
  }, 60);

  function animateCounters() {
    document.querySelectorAll(".count-up").forEach((el) => {
      const target = Number(el.getAttribute("data-target") || 0);
      const start = target > 100 ? 2018 : 0;
      const duration = 900;
      const startTime = performance.now();

      function tick(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = Math.round(start + (target - start) * eased);
        el.textContent = String(val);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }

  /* ------------------------------------------------------------------------
     1. CUSTOM MAGNETIC BRUTALIST CURSOR & 3D TILT ENGINE
     ------------------------------------------------------------------------ */
  const cursorDot = document.getElementById("cursor-dot");
  const cursorFrame = document.getElementById("cursor-frame");
  const cursorLabel = document.getElementById("cursor-label");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let frameX = mouseX;
  let frameY = mouseY;

  if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      }
    });

    function renderCursor() {
      frameX += (mouseX - frameX) * 0.22;
      frameY += (mouseY - frameY) * 0.22;
      if (cursorFrame) {
        cursorFrame.style.left = `${frameX}px`;
        cursorFrame.style.top = `${frameY}px`;
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Contextual cursor labels on [data-cursor] elements
    document.querySelectorAll("[data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        const label = el.getAttribute("data-cursor") || "VIEW";
        if (cursorLabel) cursorLabel.textContent = label;
        if (cursorFrame) cursorFrame.classList.add("is-active");
      });
      el.addEventListener("mouseleave", () => {
        if (cursorFrame) cursorFrame.classList.remove("is-active");
      });
    });

    // Minimal, Ultra-Subtle 3D Tilt & Shadow Physics on [data-tilt] cards
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const maxTilt = card.classList.contains("passport-card") ? 1.35 : 0.95;
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;
        const shadowX = Math.round(((centerX - x) / centerX) * 1.5) + 6;
        const shadowY = Math.round(((centerY - y) / centerY) * 1.5) + 6;

        card.style.transform = `perspective(1400px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-1px)`;
        card.style.boxShadow = `${shadowX}px ${shadowY}px 0px var(--red)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
        card.style.boxShadow = "";
      });
    });

    // Subtle Minimal Magnetic Pull on Primary Buttons
    document.querySelectorAll(".magnetic-btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.06;
        const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.08;
        btn.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ------------------------------------------------------------------------
     2. SMOOTH NATURAL SCROLL NAVIGATION & PROGRESSIVE TEXT REVEAL ENGINE
     ------------------------------------------------------------------------ */
  const slides = Array.from(document.querySelectorAll(".snap-slide"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link[data-goto]"));
  const railDots = Array.from(document.querySelectorAll(".rail-dot[data-goto]"));
  const progressFill = document.getElementById("deck-progress-fill");
  const slideCounterTop = document.getElementById("slide-counter-top");
  const stepperIndicator = document.getElementById("stepper-indicator");
  const prevSlideBtn = document.getElementById("prev-slide-btn");
  const nextSlideBtn = document.getElementById("next-slide-btn");
  const snapToggleBtn = document.getElementById("snap-toggle");
  const snapLabel = document.getElementById("snap-label");
  const rootHtml = document.documentElement;

  // Ensure smooth free scrolling is always active (no forced section snap jumps)
  rootHtml.setAttribute("data-snap", "off");
  if (snapLabel) {
    snapLabel.textContent = "🌊 SMOOTH SCROLL";
  }
  if (snapToggleBtn) {
    snapToggleBtn.style.display = "none";
  }

  let currentSlideIndex = 0;
  const totalSlides = slides.length;

  function updateActiveSectionUI(index) {
    currentSlideIndex = Math.max(0, Math.min(totalSlides - 1, index));
    const humanNum = String(currentSlideIndex + 1).padStart(2, "0");
    const totalNum = String(totalSlides).padStart(2, "0");

    if (slideCounterTop) slideCounterTop.textContent = `${humanNum} / ${totalNum}`;
    if (stepperIndicator) stepperIndicator.textContent = `${humanNum}/${totalNum}`;

    navLinks.forEach((link) => {
      const targetIdx = Number(link.getAttribute("data-goto"));
      link.classList.toggle("active", targetIdx === currentSlideIndex);
    });

    railDots.forEach((dot) => {
      const targetIdx = Number(dot.getAttribute("data-goto"));
      dot.classList.toggle("active", targetIdx === currentSlideIndex);
    });
  }

  // Smooth continuous top scroll progress bar
  function updateScrollProgress() {
    if (!progressFill) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(5, (scrollTop / docHeight) * 100)) : 16.66;
    progressFill.style.width = `${pct.toFixed(1)}%`;
  }

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  updateScrollProgress();

  function goToSlide(index) {
    const clamped = Math.max(0, Math.min(totalSlides - 1, index));
    const targetSlide = slides[clamped];
    if (!targetSlide) return;

    updateActiveSectionUI(clamped);
    targetSlide.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Observe sections passively just to highlight the active nav item (never forces scroll jumps)
  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.getAttribute("data-slide-index") || 0);
          entry.target.classList.add("is-visible");
          updateActiveSectionUI(idx);
        }
      });
    },
    {
      root: null,
      threshold: 0.25,
    }
  );

  slides.forEach((slide) => slideObserver.observe(slide));

  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const idx = Number(el.getAttribute("data-goto") || 0);
      goToSlide(idx);
    });
  });

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener("click", () => {
      goToSlide(currentSlideIndex - 1);
    });
  }

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", () => {
      if (currentSlideIndex < totalSlides - 1) {
        goToSlide(currentSlideIndex + 1);
      } else {
        goToSlide(0);
      }
    });
  }

  /* ------------------------------------------------------------------------
     2B. PROGRESSIVE TEXT & ELEMENT SCROLL-REVEAL CHOREOGRAPHY
     ------------------------------------------------------------------------ */
  // 1) Wrap words inside headings for word-by-word upward reveal on scroll
  const headingSelectors = [
    ".section-title",
    ".bento-headline",
    ".card-subtitle",
    ".cap-title",
    ".project-title",
    ".fin-lab-title",
    ".roadmap-title",
    ".contact-title",
  ];

  document.querySelectorAll(headingSelectors.join(", ")).forEach((heading) => {
    const childNodes = Array.from(heading.childNodes);
    let wordCounter = 0;
    const fragment = document.createDocumentFragment();

    childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parts = (node.textContent || "").split(/(\s+)/);
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            fragment.appendChild(document.createTextNode(" "));
          } else {
            const mask = document.createElement("span");
            mask.className = "scroll-word-mask";
            const inner = document.createElement("span");
            inner.className = "scroll-word-inner";
            inner.style.setProperty("--word-d", `${(wordCounter * 0.038).toFixed(3)}s`);
            inner.textContent = part;
            mask.appendChild(inner);
            fragment.appendChild(mask);
            wordCounter++;
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node.cloneNode(true);
        const mask = document.createElement("span");
        mask.className = "scroll-word-mask";
        const inner = document.createElement("span");
        inner.className = "scroll-word-inner";
        inner.style.setProperty("--word-d", `${(wordCounter * 0.038).toFixed(3)}s`);
        inner.appendChild(el);
        mask.appendChild(inner);
        fragment.appendChild(mask);
        wordCounter++;
      }
    });

    heading.innerHTML = "";
    heading.appendChild(fragment);
    heading.classList.add("scroll-heading-target");
  });

  // 2) Tag paragraphs, badges, list items, and specs for smooth scroll-triggered fade-up
  const textRevealSelectors = [
    ".hero-lead",
    ".bento-text",
    ".bento-text-sm",
    ".project-desc",
    ".fin-lab-sub",
    ".roadmap-desc",
    ".contact-text",
    ".section-index",
    ".header-stamp",
    ".card-tag",
    ".card-meta",
    ".course-list li",
    ".habit-item",
    ".interest-pill",
    ".skill-meter",
    ".project-tags .tag",
    ".direct-item",
    ".spec-row",
  ];

  document.querySelectorAll(textRevealSelectors.join(", ")).forEach((el) => {
    el.classList.add("scroll-text-item");
    // Stagger sibling items inside the same parent container
    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter((c) =>
        c.classList.contains("scroll-text-item")
      );
      const idx = siblings.indexOf(el);
      if (idx > 0) {
        el.style.setProperty("--text-d", `${Math.min(idx * 0.055, 0.35).toFixed(3)}s`);
      }
    }
  });

  // 3) Observe all cards, headings, and text items so they smoothly appear as you scroll
  const revealTargets = document.querySelectorAll(
    ".anim-up, .anim-scale, .kinetic-word, .scroll-heading-target, .scroll-text-item"
  );

  const textScrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: "0px 0px -32px 0px",
    }
  );

  revealTargets.forEach((target) => textScrollObserver.observe(target));

  /* ------------------------------------------------------------------------
     3. LIVE DHAKA CLOCK (UTC+6) & CHRONOTYPE STATUS
     ------------------------------------------------------------------------ */
  const clockEl = document.getElementById("dhaka-clock");
  const chronoEl = document.getElementById("chronotype-status");

  function updateDhakaClock() {
    const now = new Date();
    const dhakaTimeStr = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Dhaka",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const dhakaHour = Number(
      now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour12: false,
        hour: "2-digit",
      })
    );

    if (clockEl) {
      clockEl.textContent = `${dhakaTimeStr} (UTC+6)`;
    }

    if (chronoEl) {
      if (dhakaHour >= 20 || dhakaHour < 1) {
        chronoEl.textContent = "🔥 NIGHT-OWL PEAK DEEP WORK";
      } else if (dhakaHour >= 10 && dhakaHour < 16) {
        chronoEl.textContent = "📊 STRATEGY & DIU STUDY BLOCK";
      } else if (dhakaHour >= 1 && dhakaHour < 8) {
        chronoEl.textContent = "🌙 RECOVERY & CIRCADIAN REST";
      } else {
        chronoEl.textContent = "⚡ ACTIVE EXECUTION WINDOW";
      }
    }
  }

  updateDhakaClock();
  setInterval(updateDhakaClock, 1000);

  /* ------------------------------------------------------------------------
     4. STARK WHITE / CRIMSON BLACKOUT THEME TOGGLE
     ------------------------------------------------------------------------ */
  const themeBtn = document.getElementById("theme-toggle");
  const themeLabel = document.getElementById("theme-label");

  const savedTheme = localStorage.getItem("mukto_rw_theme") || "light";
  applyTheme(savedTheme);

  function applyTheme(mode) {
    rootHtml.setAttribute("data-theme", mode);
    localStorage.setItem("mukto_rw_theme", mode);
    if (themeLabel) {
      themeLabel.textContent = mode === "dark" ? "WHITE MODE" : "BLACKOUT";
    }
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = rootHtml.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(current);
      showToast(
        current === "dark"
          ? "● Crimson Blackout Mode Activated"
          : "○ Stark Red & White Gallery Mode Activated"
      );
    });
  }

  /* ------------------------------------------------------------------------
     5. MOBILE NAVIGATION MENU & PRINT DOSSIER
     ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const navLinksContainer = document.getElementById("nav-links");
  const printBtn = document.getElementById("print-dossier-btn");

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = navLinksContainer.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    navLinksContainer.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinksContainer.classList.remove("open");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  /* ------------------------------------------------------------------------
     6. 3-MODE PASSPORT PHOTO SWITCHER + FULL PHOTO / CROP FIT + LIGHTBOX
     ------------------------------------------------------------------------ */
  const photoFlipBtn = document.getElementById("photo-flip-btn");
  const photoFitBtn = document.getElementById("photo-fit-btn");
  const photoFitLabel = document.getElementById("photo-fit-label");
  const photoZoomBtn = document.getElementById("photo-zoom-btn");
  const photoFrame = document.getElementById("passport-photo-frame");
  const passportImg = document.getElementById("passport-img");
  const photoModeLabel = document.getElementById("photo-mode-label");
  const photoSticker = document.getElementById("photo-sticker");

  const photoModes = [
    {
      src: "assets/mukto-blazer.jpg",
      alt: "Md. Hasan Shahriar in Executive Blazer at Daffodil International University",
      label: "EXECUTIVE BLAZER",
      sticker: "DIU CAMPUS // EXECUTIVE",
    },
    {
      src: "assets/mukto-casual.jpg",
      alt: "Md. Hasan Shahriar — Casual Builder Portrait",
      label: "CASUAL BUILDER",
      sticker: "DHAKA // 23.81°N",
    },
    {
      src: "assets/profile.jpg",
      alt: "Md. Hasan Shahriar — Formal CV Headshot",
      label: "FORMAL CV ID",
      sticker: "DIU // 251-11-177",
    },
  ];

  let currentPhotoIdx = 0;

  function applyPhotoIndex(idx) {
    currentPhotoIdx = (idx + photoModes.length) % photoModes.length;
    const mode = photoModes[currentPhotoIdx];
    if (passportImg) {
      passportImg.style.opacity = "0.2";
      passportImg.style.transform = "scale(1.03)";
      setTimeout(() => {
        passportImg.src = mode.src;
        passportImg.alt = mode.alt;
        passportImg.style.opacity = "1";
        passportImg.style.transform = "";
      }, 130);
    }
    if (photoModeLabel) photoModeLabel.textContent = mode.label;
    if (photoSticker) photoSticker.textContent = mode.sticker;
  }

  if (photoFlipBtn && passportImg) {
    photoFlipBtn.addEventListener("click", () => {
      applyPhotoIndex(currentPhotoIdx + 1);
    });
  }

  // Default is Crop View ("cover"); clicking "FULL VIEW" toggles 100% Uncropped Full View ("full") right in the photo section
  function togglePhotoFullView() {
    if (!photoFrame) return;
    const currentFit = photoFrame.getAttribute("data-photo-fit") || "cover";
    const nextFit = currentFit === "cover" ? "full" : "cover";
    photoFrame.setAttribute("data-photo-fit", nextFit);
    if (photoZoomBtn) {
      photoZoomBtn.classList.toggle("is-active-fit", nextFit === "full");
      photoZoomBtn.innerHTML = nextFit === "full" ? "🖼️ CROP VIEW" : "🔍 FULL VIEW";
    }
    showToast(
      nextFit === "full"
        ? "🔍 Full View Enabled — Showing 100% Uncropped Photo"
        : "🖼️ Crop View Enabled"
    );
  }

  if (photoZoomBtn) {
    photoZoomBtn.addEventListener("click", togglePhotoFullView);
  }
  if (passportImg) {
    passportImg.addEventListener("click", togglePhotoFullView);
  }

  /* ------------------------------------------------------------------------
     7. HERO 3-PILLAR LENS SWITCHER
     ------------------------------------------------------------------------ */
  const lensBtns = document.querySelectorAll(".lens-btn");
  const lensReadout = document.getElementById("lens-readout");

  const lensMessages = {
    all: `<strong>SYNTHESIS MODE:</strong> Combining BBA marketing &amp; financial strategy (Pathao Super-App study, DBBL vs. IBBL 5Y ratios, Google Digital Marketing) with Python econometrics (BUS-201), shipped Android/web apps (MuktoFlow V2.0 APK, UniGrade), and AEclipse motion storytelling.`,
    business: `<strong>BUSINESS, MARKETING &amp; FINANCE LENS:</strong> BBA strategist at DIU (Batch 68-D), Google Digital Garage certified (2024), Active Member of DIU Business &amp; Education Club, and former HealthOS Tele Purchase Executive.`,
    tech: `<strong>AI, PYTHON &amp; TECH BUILDER LENS:</strong> Shipping practical tools with Python (Pandas, NumPy, SciPy, Seaborn), SQL MIS, React, and Google AI Studio — including MuktoFlow V2.0 (Android APK + Gemini API), UniGrade CGPA Planner, and DokanPOS.`,
    media: `<strong>AECLIPSE CREATIVE AGENCY &amp; MOTION LENS:</strong> Founder &amp; Lead Creative at AEclipse and UY Lab-trained Video Editor (After Effects, Premiere Pro, Photoshop, Illustrator, CapCut) with 16+ published multi-platform Shorts &amp; Reels.`,
  };

  lensBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lens = btn.getAttribute("data-lens") || "all";
      lensBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      if (lensReadout && lensMessages[lens]) {
        lensReadout.innerHTML = lensMessages[lens];
      }
    });
  });

  /* ------------------------------------------------------------------------
     8. LIVE MINI MUKTOFLOW POMODORO WIDGET
     ------------------------------------------------------------------------ */
  const pomoDisplay = document.getElementById("pomo-display");
  const pomoStartBtn = document.getElementById("pomo-start-btn");
  const pomoModeBtn = document.getElementById("pomo-mode-btn");
  const pomoResetBtn = document.getElementById("pomo-reset-btn");
  const pomoModeLabel = document.getElementById("pomo-mode-label");

  let pomoFocusMode = true;
  let pomoSeconds = 25 * 60;
  let pomoInterval = null;

  function renderPomoTime() {
    if (!pomoDisplay) return;
    const mins = String(Math.floor(pomoSeconds / 60)).padStart(2, "0");
    const secs = String(pomoSeconds % 60).padStart(2, "0");
    pomoDisplay.textContent = `${mins}:${secs}`;
  }

  if (pomoStartBtn) {
    pomoStartBtn.addEventListener("click", () => {
      if (pomoInterval) {
        clearInterval(pomoInterval);
        pomoInterval = null;
        pomoStartBtn.textContent = "RESUME";
      } else {
        pomoStartBtn.textContent = "PAUSE";
        pomoInterval = setInterval(() => {
          if (pomoSeconds > 0) {
            pomoSeconds--;
            renderPomoTime();
          } else {
            clearInterval(pomoInterval);
            pomoInterval = null;
            pomoStartBtn.textContent = "START";
            showToast("🍅 MuktoFlow Cycle Complete! Take a breath.");
          }
        }, 1000);
      }
    });
  }

  if (pomoModeBtn) {
    pomoModeBtn.addEventListener("click", () => {
      if (pomoInterval) {
        clearInterval(pomoInterval);
        pomoInterval = null;
      }
      pomoFocusMode = !pomoFocusMode;
      pomoSeconds = pomoFocusMode ? 25 * 60 : 5 * 60;
      if (pomoModeBtn) pomoModeBtn.textContent = pomoFocusMode ? "5M" : "25M";
      if (pomoModeLabel) {
        pomoModeLabel.textContent = pomoFocusMode ? "25M FOCUS" : "5M BREAK";
      }
      if (pomoStartBtn) pomoStartBtn.textContent = "START";
      renderPomoTime();
    });
  }

  if (pomoResetBtn) {
    pomoResetBtn.addEventListener("click", () => {
      if (pomoInterval) {
        clearInterval(pomoInterval);
        pomoInterval = null;
      }
      pomoSeconds = pomoFocusMode ? 25 * 60 : 5 * 60;
      if (pomoStartBtn) pomoStartBtn.textContent = "START";
      renderPomoTime();
    });
  }

  /* ------------------------------------------------------------------------
     9. PROJECT FILTERING WITH SMOOTH TRANSITION
     ------------------------------------------------------------------------ */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter") || "all";
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      projectCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     10. QUANTITATIVE FINANCIAL LAB (DBBL VS. IBBL 2019–2023)
     ------------------------------------------------------------------------ */
  const finTabs = document.querySelectorAll(".fin-tab");
  const finLabBody = document.getElementById("fin-lab-body");

  const finLabData = {
    profitability: {
      title: "① Profitability Benchmark: Margin Resilience vs. Scale",
      desc: "Evaluates how Bangladesh's technology-driven conventional retail banking leader (DBBL) and largest Shariah-compliant bank (IBBL) generated returns across the 2019–2023 cycle.",
      rows: [
        ["Return on Equity (ROE)", "High-teen ROE supported by low-cost CASA retail deposits", "Stable Mudaraba/Musharaka return profile with larger asset base"],
        ["Return on Assets (ROA)", "Superior asset yield via NexusPay & FastTrack digital fee income", "Lower spread margin offset by high financing volume"],
        ["Net Profit Margin (NPM)", "Strong operating buffer despite 9%-6% interest rate cap era", "Consistent profit-sharing distribution across 5 fiscal years"],
      ],
    },
    liquidity: {
      title: "② Liquidity & Buffer Management (LDR vs. IDR)",
      desc: "Compares conventional Loan-to-Deposit Ratio (LDR) against Islamic Investment-to-Deposit Ratio (IDR) and cash reserve compliance under Bangladesh Bank norms.",
      rows: [
        ["Cash Buffer Ratio", "High liquid treasury & ATM/CRM cash network coverage across 64 districts", "Statutory Shariah liquidity reserves constrained by sukuk availability"],
        ["LDR / IDR Discipline", "Conservative LDR within central bank regulatory ceiling", "Higher IDR utilization driven by trade & industrial investment demand"],
        ["Deposit Mix Advantage", "Industry-leading low-cost current & savings (CASA) ratio", "Massive remittance inflow & rural deposit mobilization network"],
      ],
    },
    efficiency: {
      title: "③ Operational Efficiency & Asset Utilization",
      desc: "Assesses Cost-to-Income discipline, digital channel leverage, and why traditional Inventory Turnover is structurally N/A for financial institutions.",
      rows: [
        ["Cost-to-Income Ratio", "Higher tech capex (ATMs/Core Banking) yielding long-term automation", "Lean branch operating ratio relative to total deposit volume"],
        ["Asset Turnover", "Strong non-funded & digital banking fee velocity", "Steady financing income turnover across SME & corporate portfolios"],
        ["Methodology Note", "Inventory Turnover = N/A (Financial intermediaries hold monetary assets)", "Evaluated via Operating Expense to Total Operating Income"],
      ],
    },
    leverage: {
      title: "④ Capital Adequacy, Solvency & Leverage Risk",
      desc: "Examines Debt-to-Equity multiples, Tier-1/Tier-2 capital buffers, and long-term solvency across macro shocks.",
      rows: [
        ["Debt-to-Equity Multiple", "Deposit-funded banking structure backed by strong retained earnings", "Higher leverage multiple requiring continuous Tier-1 capital retention"],
        ["Capital Adequacy (CRAR)", "Consistently above Basel-III minimum regulatory threshold", "Supported by Mudaraba perpetual bonds & subordinated sukuk"],
        ["Strategic Recommendation", "Expand SME credit scoring & AI-assisted NPL monitoring", "Strengthen liquidity buffers & diversify Shariah treasury instruments"],
      ],
    },
  };

  function renderFinLab(tabKey) {
    if (!finLabBody || !finLabData[tabKey]) return;
    const d = finLabData[tabKey];
    const rowsHtml = d.rows
      .map(
        (r) => `
        <tr>
          <td><strong>${r[0]}</strong></td>
          <td>${r[1]}</td>
          <td>${r[2]}</td>
        </tr>
      `
      )
      .join("");

    finLabBody.innerHTML = `
      <div class="fin-grid">
        <div>
          <h4 class="fin-Dimension-title">${d.title}</h4>
          <p class="fin-dimension-desc">${d.desc}</p>
          <span class="stamp-badge stamp-red">✓ AUDITED ANNUAL REPORT DATA (2019–2023)</span>
        </div>
        <div>
          <table class="fin-metrics-table">
            <thead>
              <tr>
                <th>METRIC / DIMENSION</th>
                <th>DBBL (CONVENTIONAL)</th>
                <th>IBBL (SHARIAH)</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderFinLab("profitability");

  finTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.getAttribute("data-fintab") || "profitability";
      finTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      renderFinLab(key);
    });
  });

  /* ------------------------------------------------------------------------
     11. CASE STUDY MODAL CONTROLLER
     ------------------------------------------------------------------------ */
  const modal = document.getElementById("case-modal");
  const modalCode = document.getElementById("modal-code");
  const modalBody = document.getElementById("modal-body");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  const caseStudies = {
    muktoflow: {
      code: "PRJ // 01 — MUKTOFLOW V2.0 & POMOFOCUS ANDROID APK",
      title: "MuktoFlow V2.0 — Zen Pomodoro, Task & Streak Engine",
      summary:
        "Designed and built by Md. Hasan Shahriar to solve fragmented student attention. MuktoFlow V2.0 combines a distraction-free Pomodoro focus clock with task prioritization, ambient audio soundscapes, streak analytics, and server-side Gemini API intelligence.",
      specs: [
        "📱 <strong>Shipped Android Packages:</strong> Compiled into standalone installable Android packages (<code>MuktoFlow V2.0.apk</code> &amp; <code>Pomofocus.apk</code>) via Gradle &amp; Kotlin.",
        "🧠 <strong>Gemini API Integration:</strong> Configured with <code>MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API</code> to break down complex academic or business goals into actionable 25-minute sprints.",
        "🎧 <strong>Sensory Focus Design:</strong> Built-in ambient soundscapes and streak tracking engineered around behavioral habit loops.",
      ],
    },
    unigrade: {
      code: "PRJ // 02 — UNIGRADE CGPA ENGINE & DOKANPOS WEB SUITE",
      title: "UniGrade CGPA Planner, DokanPOS & Lifestyle Control Hub",
      summary:
        "A suite of client-side and retail web applications built for university students and SME operations — combining multi-semester SGPA/CGPA simulation with retail Point-of-Sale security and behavioral habit tracking.",
      specs: [
        "🧮 <strong>UniGrade Target GPA Engine:</strong> Computes exact required GPA across remaining credits with presets for 4.0 (DIU), 4.3, 5.0, and 10.0 scales plus 1-click PDF transcript export via <code>jsPDF</code>.",
        "🏪 <strong>DokanPOS &amp; Expense Tracker:</strong> Features role-based access verification (<code>test-role-security.mjs</code>), real-time cart/checkout workflows, and personal budgeting.",
        "⏰ <strong>Lifestyle Control Command Center:</strong> Interactive React + Vite dashboard implementing James Clear’s 4 Laws of Behavior Change and chronotype-aligned work blocks.",
      ],
    },
    lifestyle: {
      code: "DAT // 03 — PYTHON ECONOMETRICS (BUS-201) & MIS LAB MODELING",
      title: "Applied Statistical Data Analysis in Python & Excel MIS What-If Lab",
      summary:
        "Two quantitative analytical dossiers authored at Daffodil International University: a 24-page Python statistical investigation of undergraduate academic performance and a corporate Management Information Systems (MIS) financial modeling report.",
      specs: [
        "🐍 <strong>Python Econometrics (BUS-201):</strong> Executed descriptive statistics, skewness/kurtosis audits, Pearson correlation matrices, and Ordinary Least Squares (OLS) linear regression using <code>Pandas</code>, <code>NumPy</code>, <code>SciPy</code>, <code>Matplotlib</code>, and <code>Seaborn</code>.",
        "🚗 <strong>MIS Automotive Dataset Analysis:</strong> Built dynamic <code>COUNTIF</code>, <code>AVERAGEIF</code>, and <code>SUMIF</code> models plus Pivot Tables across 7 global automakers (identifying Mercedes-Benz as top revenue generator at <strong>$26.07M</strong> across 298 units).",
        "📈 <strong>Corporate Break-Even &amp; 20-Year TVM Sensitivity:</strong> Modeled operational Break-Even at <strong>5,000 units</strong> ($50 unit price vs. $30 variable cost &amp; $100K fixed cost) and projected a 20-year compound investment portfolio reaching <strong>$328,826.93</strong> at 9.5% interest.",
      ],
    },
    dokanpos: {
      code: "STR // 04 — PATHAO LTD. SUPER-APP & FINTECH TRANSFORMATION STUDY",
      title: "Pathao Ltd. — Digital Transformation, 3PL Logistics & Pathao Pay Case Study",
      summary:
        "Comprehensive strategic business research examining how Pathao evolved from a 2015 stealth e-commerce delivery team in Dhaka into a $100M+ Bangladeshi Super-App serving 10M+ users and 500,000+ gig-economy earners.",
      specs: [
        "🛵 <strong>Four-Pillar Super-App Ecosystem:</strong> Analyzed unit economics across Ride-Sharing (bikes/cars), Pathao Food (hyperlocal Q-commerce), Pathao Courier (64-district 3PL network handling <strong>100,000+ daily parcels</strong> with ~50% market share), and Pathao Pay.",
        "💳 <strong>FinTech &amp; BNPL Innovation:</strong> Evaluated Pathao Pay’s Bangladesh Bank PSP license, digital wallet loops, debit card integration, and 'Pay Later' micro-credit for Gen-Z consumers.",
        "📊 <strong>VC Capital &amp; SWOT Matrix:</strong> Documented $50M+ in institutional funding (Go-Jek, VentureSouq, Battery Road Digital Holdings), post-pandemic EBITDA profitability, and algorithmic route optimization.",
      ],
    },
    finresearch: {
      code: "FIN // 05 — 5Y BANKING RATIOS (DBBL VS IBBL) & ANTHROPIC AI DOSSIER",
      title: "DBBL vs. IBBL (2019–2023), Pharma 5Y Study & Dario Amodei Research Report",
      summary:
        "Led a 6-member FIN-301 research team auditing 5 fiscal years of Bangladeshi banking and pharmaceutical balance sheets, alongside an executive technology dossier on Anthropic CEO Dario Amodei and frontier AI governance.",
      specs: [
        "🏦 <strong>Dual-System Banking Benchmark:</strong> Compared Dutch-Bangla Bank PLC (conventional retail &amp; NexusPay tech leader) against Islami Bank Bangladesh PLC (Shariah-compliant Mudaraba/Musharaka leader) across ROA, ROE, NPM, LDR/IDR, and Basel-III solvency.",
        "💊 <strong>Pharmaceutical Sector 5Y Study:</strong> Longitudinal ratio modeling comparing working capital velocity, liquidity buffers, and leverage across top Bangladeshi pharma manufacturers.",
        "🤖 <strong>Dario Amodei &amp; Constitutional AI Dossier:</strong> Authored an in-depth biography and technical policy review covering Scaling Laws, RLHF, Constitutional AI, Responsible Scaling Policies (ASL levels), and <em>Machines of Loving Grace</em>.",
      ],
    },
    aeclipse: {
      code: "MED // 06 — AECLIPSE CREATIVE AGENCY & MOTION PRODUCTION",
      title: "AEclipse — Founder, Brand Strategist & Multi-Platform Motion Pipeline",
      summary:
        "Founded AEclipse to deliver AI-powered visual storytelling, motion graphics, and psychological/historical video essays across YouTube Shorts, Facebook Reels, and Instagram Reels.",
      specs: [
        "📈 <strong>Verified Multi-Platform Reach:</strong> Produced and tracked 16+ original episodes in the AEclipse Content Tracker — highlighted by Ep. 09 <em>'Never Explain Yourself to Anyone'</em> (<strong>2,053 views</strong>) and Ep. 13 <em>'Disappear When They Take You for Granted'</em> (<strong>1,401 views</strong>).",
        "🎬 <strong>Professional Post-Production Suite:</strong> Certified at UY Lab; combines Adobe After Effects, Premiere Pro, Photoshop, Illustrator, and CapCut with AI visual synthesis (Gemini Omni / Veo &amp; Master Prompt frameworks).",
        "🧠 <strong>Strategic Narrative Themes:</strong> Scripts original essays on stoic emotional control (<em>'Stop Reacting to Everything'</em>), negotiation power, geopolitics, and leadership psychology.",
      ],
    },
  };

  document.querySelectorAll("[data-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-modal");
      const data = caseStudies[key];
      if (!data || !modal || !modalBody) return;

      if (modalCode) modalCode.textContent = data.code;
      modalBody.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.summary}</p>
        <ul class="modal-spec-list">
          ${data.specs.map((s) => `<li>${s}</li>`).join("")}
        </ul>
      `;
      modal.hidden = false;
    });
  });

  function closeModal() {
    if (modal) modal.hidden = true;
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && !modal.hidden) {
      closeModal();
    }
  });

  /* ------------------------------------------------------------------------
     12. COPY CHIPS & CONTACT FORM DISPATCH
     ------------------------------------------------------------------------ */
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const val = btn.getAttribute("data-copy") || "";
      navigator.clipboard?.writeText(val);
      showToast(`✓ Copied: ${val}`);
    });
  });

  const contactForm = document.getElementById("contact-form");
  const formError = document.getElementById("form-error");
  const formSuccess = document.getElementById("form-success");
  const successSummary = document.getElementById("success-summary");
  const resetFormBtn = document.getElementById("reset-form-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("sender-name")?.value.trim();
      const email = document.getElementById("sender-email")?.value.trim();
      const topic = document.getElementById("sender-topic")?.value;
      const message = document.getElementById("sender-message")?.value.trim();

      if (!name || !email || !message) {
        if (formError) formError.hidden = false;
        return;
      }

      if (formError) formError.hidden = true;
      contactForm.hidden = true;
      if (formSuccess) formSuccess.hidden = false;
      if (successSummary) {
        successSummary.innerHTML = `Thanks, <strong>${name}</strong>! Your note regarding <strong>"${topic}"</strong> has been formatted and logged. You can also connect directly on LinkedIn below.`;
      }
      showToast("🚀 Message logged in dispatch terminal!");
    });
  }

  if (resetFormBtn && contactForm && formSuccess) {
    resetFormBtn.addEventListener("click", () => {
      contactForm.reset();
      formSuccess.hidden = true;
      contactForm.hidden = false;
    });
  }

  /* ------------------------------------------------------------------------
     13. TOAST HELPER
     ------------------------------------------------------------------------ */
  const toastEl = document.getElementById("brutal-toast");
  const toastText = document.getElementById("toast-text");
  let toastTimeout = null;

  function showToast(msg) {
    if (!toastEl || !toastText) return;
    toastText.textContent = msg;
    toastEl.hidden = false;
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.hidden = true;
    }, 3200);
  }
});
