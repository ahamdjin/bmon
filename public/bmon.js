(() => {
  const CANONICAL_BASE = "https://bmon.ai";
  const CTA_URL = "/#book-demo";

  const BOOKING_ID = "gEVDq9hfE7hZU8XvE1zY";
  const IFRAME_SRC_BASE = `https://links.bmon.ai/widget/booking/${BOOKING_ID}`;
  const EMBED_SCRIPT_SRC = "https://links.bmon.ai/js/form_embed.js";
  const ATTRIB_KEY = "bmon_attrib";

  function getPathname() {
    const p = (window.location.pathname || "/").replace(/\/+$/, "");
    return p || "/";
  }

  function setPageAttr() {
    const pathname = getPathname();
    const page = pathname === "/" ? "home" : pathname.replace(/^\//, "");
    document.documentElement.setAttribute("data-bmon-page", page);
  }

  function debounce(fn, ms) {
    let t;
    return () => {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  function ensureEmbedScript() {
    if (document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }

  /* ------------------------------ Modal ------------------------------ */

  function ensureModalMarkup() {
    if (document.querySelector(".bmon-modal")) return;

    const modal = document.createElement("div");
    modal.className = "bmon-modal";
    modal.dataset.open = "false";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="bmon-modal__backdrop" data-bmon-modal-close="1"></div>
      <div class="bmon-modal__wrap" role="presentation">
        <section class="bmon-modal__card" role="dialog" aria-modal="true" aria-labelledby="bmon-book-call-title">
          <div class="bmon-modal__top">
            <h2 class="bmon-modal__title" id="bmon-book-call-title">Book a Free Strategy Call</h2>
            <button class="bmon-modal__close" type="button" data-bmon-modal-close="1" aria-label="Close">Close</button>
          </div>
          <div class="bmon-modal__body" id="bmon-book-call-body"></div>
        </section>
      </div>
    `;
    document.body.appendChild(modal);
  }

  function getModalEls() {
    const modal = document.querySelector(".bmon-modal");
    const body = document.getElementById("bmon-book-call-body");
    return { modal, body };
  }

  function openModal() {
    ensureModalMarkup();
    const { modal, body } = getModalEls();
    if (!modal || !body) return;
    if (modal.dataset.open === "true") return;

    modal.dataset.open = "true";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    while (body.firstChild) body.removeChild(body.firstChild);
    const iframe = document.createElement("iframe");
    iframe.className = "bmon-modal__iframe";
    iframe.src = IFRAME_SRC_BASE + window.location.search;
    iframe.title = "Book a strategy call";
    iframe.loading = "lazy";
    iframe.scrolling = "yes";
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    iframe.style.overflow = "auto";
    body.appendChild(iframe);

    ensureEmbedScript();

    const close = modal.querySelector(".bmon-modal__close");
    if (close instanceof HTMLElement) close.focus({ preventScroll: true });
  }

  function closeModal() {
    const { modal, body } = getModalEls();
    if (!modal || !body) return;
    if (modal.dataset.open !== "true") return;

    modal.dataset.open = "false";
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";

    while (body.firstChild) body.removeChild(body.firstChild);
  }

  function isModifiedClick(e) {
    return e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
  }

  function findAnchor(target) {
    if (!(target instanceof Element)) return null;
    return target.closest("a[href]");
  }

  function shouldOpenBookModalFromAnchor(a) {
    if (!a) return false;
    const href = a.getAttribute("href") || "";
    return (
      a.classList.contains("framer-dxFHZ") ||
      a.dataset.bmonCta === "1" ||
      a.hasAttribute("data-highlight") ||
      href.includes("#book-demo") ||
      href.includes("links.bmon.ai/widget/booking/")
    );
  }

  function elevateCtaStack() {
    document
      .querySelectorAll('a[data-highlight="true"], button[data-highlight="true"]')
      .forEach((el) => {
        if (!(el instanceof HTMLElement)) return;
        let node = el.parentElement;
        let steps = 0;
        while (node && steps < 8) {
          if (!(node instanceof HTMLElement)) break;
          const cls = node.className;
          const isLikelyWrapper =
            typeof cls === "string" && (cls.includes("container") || cls.includes("framer-"));
          if (isLikelyWrapper) {
            const cs = window.getComputedStyle(node);
            if (cs.transform !== "none" || cs.perspective !== "none" || cs.filter !== "none") {
              node.setAttribute("data-bmon-cta-stack", "1");
            }
            if (
              cs.overflow === "hidden" ||
              cs.overflowX === "hidden" ||
              cs.overflowY === "hidden" ||
              cs.clipPath !== "none"
            ) {
              node.setAttribute("data-bmon-cta-stack", "1");
            }
          }

          node = node.parentElement;
          steps += 1;
        }
      });
  }

  function sanitizeCtaLinks() {
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href") || "";
      const isBooking =
        href.includes("#book-demo") ||
        href.includes("links.bmon.ai/widget/booking/") ||
        a.dataset.bmonCta === "1";
      if (!isBooking && !a.hasAttribute("data-highlight")) return;
      a.removeAttribute("target");
      a.removeAttribute("rel");
    });
  }

  function initModal() {
    ensureModalMarkup();
    elevateCtaStack();
    sanitizeCtaLinks();

    document.addEventListener(
      "click",
      (e) => {
        const target = e.target;
        if (target instanceof Element && target.closest(".bmon-modal")) return;
        if (target instanceof Element && target.closest("#overlay")) return;

        const pathname = getPathname();
        const enforceAllButtons = pathname !== "/";

        const btnAny = enforceAllButtons && target instanceof Element ? target.closest("button") : null;

        const highlightAny =
          enforceAllButtons && target instanceof Element ? target.closest('[data-highlight="true"]') : null;

        const a = findAnchor(target);
        const btn =
          target instanceof Element ? target.closest('button[data-highlight="true"]') : null;

        const partnersCta =
          pathname === "/partners" && target instanceof Element
            ? target.closest("a,button,[role=\"button\"],[tabindex]")
            : null;
        const isBecomePartner =
          partnersCta instanceof HTMLElement
            ? /become\\s+a\\s+partner/i.test(partnersCta.textContent || "")
            : false;

        if (!shouldOpenBookModalFromAnchor(a) && !btn && !btnAny && !highlightAny && !isBecomePartner) {
          return;
        }
        if (isModifiedClick(e)) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        openModal();
      },
      true,
    );

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      closeModal();
    });

    document.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (!t.closest('[data-bmon-modal-close="1"]')) return;
      closeModal();
    });

    new MutationObserver(() => {
      elevateCtaStack();
      sanitizeCtaLinks();
    }).observe(document.body, { childList: true, subtree: true });
  }

  /* --------------------------- Booking embed -------------------------- */

  function getPersistedAttribution() {
    try {
      const raw = localStorage.getItem(ATTRIB_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return {};
      return parsed;
    } catch {
      return {};
    }
  }

  function buildBookingIframeSrc() {
    const url = new URL(IFRAME_SRC_BASE);
    const params = new URLSearchParams(window.location.search);
    const persisted = getPersistedAttribution();

    for (const [k, v] of Object.entries(persisted)) {
      if (params.has(k)) continue;
      if (typeof v !== "string" || !v) continue;
      params.set(k, v);
    }

    url.search = params.toString();
    return url.toString();
  }

  function isLegacyCalendarIframe(iframe) {
    if (!(iframe instanceof HTMLIFrameElement)) return false;
    if (iframe.closest(".bmon-modal")) return false;
    if (iframe.closest(".bmon-booking-embed")) return false;
    if (iframe.closest("#overlay")) return false;

    const src = (iframe.getAttribute("src") || "").toLowerCase();
    const srcdoc = (iframe.getAttribute("srcdoc") || "").toLowerCase();
    const hay = `${src}\n${srcdoc}`;
    if (!hay) return false;

    return (
      hay.includes("/widget/booking/") ||
      hay.includes("calendly.com") ||
      hay.includes("cal.com") ||
      hay.includes("meetings.hubspot.com") ||
      hay.includes("acuityscheduling.com") ||
      hay.includes("youcanbook.me") ||
      hay.includes("microsoft.com/bookings")
    );
  }

  function findPreferredBookingHost() {
    const cta = document.getElementById("book-demo");
    if (!cta) return null;
    const host = cta.querySelector(".framer-xi24iv-container");
    return host instanceof HTMLElement ? host : null;
  }

  function collectLegacyHosts() {
    const hosts = new Set();
    document.querySelectorAll("iframe").forEach((iframe) => {
      if (!isLegacyCalendarIframe(iframe)) return;

      const framerHost = iframe.closest(".framer-xi24iv-container");
      const host =
        framerHost instanceof HTMLElement
          ? framerHost
          : iframe.parentElement instanceof HTMLElement
            ? iframe.parentElement
            : null;
      if (host) hosts.add(host);
    });
    return hosts;
  }

  function normalizeBookingHost(host) {
    if (!(host instanceof HTMLElement)) return;

    const set = (el, prop, value) => el.style.setProperty(prop, value, "important");

    set(host, "position", "relative");
    set(host, "left", "auto");
    set(host, "top", "auto");
    set(host, "transform", "none");
    set(host, "width", "100%");
    set(host, "max-width", "none");
    set(host, "margin", "0");
    set(host, "height", "auto");
    set(host, "overflow", "visible");

    let node = host.parentElement;
    let steps = 0;
    while (node && steps < 4) {
      if (!(node instanceof HTMLElement)) break;
      if (node.id === "book-demo") break;

      set(node, "overflow", "visible");
      if (steps < 2) {
        set(node, "height", "auto");
        set(node, "min-height", "var(--bmon-booking-min-height, 980px)");
      }

      node = node.parentElement;
      steps += 1;
    }
  }

  function renderBooking(host) {
    if (!(host instanceof HTMLElement)) return;
    normalizeBookingHost(host);
    if (host.querySelector('[data-bmon-booking="1"]')) return;

    while (host.firstChild) host.removeChild(host.firstChild);

    const wrap = document.createElement("div");
    wrap.className = "bmon-booking-embed";
    wrap.setAttribute("data-bmon-booking", "1");

    const iframe = document.createElement("iframe");
    iframe.src = buildBookingIframeSrc();
    iframe.id = `${BOOKING_ID}_${Date.now()}`;
    iframe.title = "Book a strategy call";
    iframe.loading = "lazy";
    iframe.scrolling = "yes";
    iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    iframe.style.width = "100%";
    iframe.style.border = "none";
    iframe.style.overflow = "auto";
    iframe.style.minHeight = "var(--bmon-booking-min-height, 980px)";

    wrap.appendChild(iframe);
    host.appendChild(wrap);
  }

  function mountBooking() {
    const preferred = findPreferredBookingHost();
    if (preferred) {
      renderBooking(preferred);
      ensureEmbedScript();
      return;
    }

    const hosts = collectLegacyHosts();
    if (hosts.size === 0) return;

    hosts.forEach((host) => renderBooking(host));
    ensureEmbedScript();
  }

  function initBookingEmbed() {
    const pathname = getPathname();
    if (pathname === "/gohighlevel") return;

    mountBooking();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", mountBooking, { once: true });
    }

    new MutationObserver(debounce(mountBooking, 120)).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  /* --------------------------- Contact embed -------------------------- */

  function buildContactSection() {
    const bookingIframeId = `${BOOKING_ID}_${Date.now()}`;

    const section = document.createElement("section");
    section.id = "contact";
    section.className = "scroll-reveal";
    section.setAttribute("data-bmon-contact", "1");

    const container = document.createElement("div");
    container.className = "contact-section";
    container.innerHTML = `
      <h2 style="text-align:center; margin-bottom:2rem;">Get Started</h2>
      <p class="bmon-support">Prefer email? <a href="mailto:support@bmon.ai">support@bmon.ai</a> · <a href="tel:+12135834358">(213) 583-4358</a></p>

      <div class="contact-grid">
        <div class="contact-form">
          <h3 style="margin-bottom:1rem;">Contact Us</h3>
          <iframe
            src="https://links.bmon.ai/widget/form/NY32xCQFLTPaQZayLcny"
            style="width:100%;height:100%;border:none;border-radius:3px"
            id="inline-NY32xCQFLTPaQZayLcny"
            data-layout='{"id":"INLINE"}'
            data-trigger-type="alwaysShow"
            data-trigger-value=""
            data-activation-type="alwaysActivated"
            data-activation-value=""
            data-deactivation-type="neverDeactivate"
            data-deactivation-value=""
            data-form-name="genspark site"
            data-height="545"
            data-layout-iframe-id="inline-NY32xCQFLTPaQZayLcny"
            data-form-id="NY32xCQFLTPaQZayLcny"
            title="genspark site"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div class="calendar-embed">
          <h3 style="margin-bottom:1rem;">Book a Call</h3>
          <iframe
            src="${IFRAME_SRC_BASE}"
            style="width: 100%;border:none;overflow: auto;"
            scrolling="yes"
            id="${bookingIframeId}"
            title="Book a Call"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    `;

    section.appendChild(container);
    return section;
  }

  function mountContact() {
    const cta = document.getElementById("book-demo");
    if (!cta) return;

    const host = cta.querySelector(".framer-xi24iv-container");
    if (!host) return;
    if (host.querySelector('[data-bmon-contact="1"]')) return;

    while (host.firstChild) host.removeChild(host.firstChild);

    host.appendChild(buildContactSection());
    ensureEmbedScript();
  }

  function initContactEmbed() {
    const pathname = getPathname();
    if (pathname !== "/gohighlevel") return;

    mountContact();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", mountContact, { once: true });
    }

    new MutationObserver(debounce(mountContact, 120)).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  /* ------------------------------ Content ----------------------------- */

  function updateMeta() {
    const title = "BMON — Website Design, SEO & AI Automations for Local Growth";
    const description =
      "BMON helps local businesses get found and get booked with Website Design, AI Implementation, Automations, SEO, AI Conversation Bots, Social Media Management, and Ad Campaigns.";

    if (document.title) document.title = title;

    const setMeta = (selector, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute("content", value);
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
  }

  function updateCanonicalAndOgUrl() {
    const pathname = (window.location.pathname || "/").replace(/\/+$/, "") || "/";
    const canonicalUrl = `${CANONICAL_BASE}${pathname === "/" ? "/" : pathname}`;
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute("href", canonicalUrl);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);
  }

  function rewriteLinks() {
    document.querySelectorAll("a[href]").forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;

      // Normalize Framer relative links so they work from nested routes (e.g. /features/*)
      if (href.startsWith("./")) {
        a.setAttribute("href", href.replace(/^\.\//, "/"));
      }

      const nextHref = a.getAttribute("href") || "";
      const isBookingLink = nextHref.includes("#book-demo") || nextHref.includes("links.bmon.ai/widget/booking/");

      if (isBookingLink) {
        a.setAttribute("href", CTA_URL);
        a.removeAttribute("target");
        a.removeAttribute("rel");
        a.dataset.bmonCta = "1";
      }

      if (href.includes("app.bmon.ai") || href.includes("bmon.ai")) {
        a.setAttribute("href", CTA_URL);
        a.removeAttribute("target");
        a.removeAttribute("rel");
        a.dataset.bmonCta = "1";
      }
    });
  }

  function fixFooterLinks() {
    // Some Framer exports can include empty footer link labels; fill them with a sensible CTA.
    document.querySelectorAll("footer a[href]").forEach((a) => {
      if ((a.textContent || "").trim()) return;
      if (a.querySelector("svg")) return;

      const p = a.querySelector("p");
      if (!p) return;

      p.textContent = "Contact";
      a.setAttribute("href", CTA_URL);
    });
  }

  function mountFooterContact() {
    const bottom = document.querySelector('[data-framer-name="Bottom"]');
    if (!(bottom instanceof HTMLElement)) return;
    if (bottom.querySelector(".bmon-footer-contact")) return;

    const wrap = document.createElement("div");
    wrap.className = "bmon-footer-contact";
    wrap.innerHTML =
      '<a href="mailto:support@bmon.ai">support@bmon.ai</a>' +
      '<span class="bmon-footer-contact__sep" aria-hidden="true">·</span>' +
      '<a href="tel:+12135834358">(213) 583-4358</a>';

    const first = bottom.firstElementChild;
    if (first) bottom.insertBefore(wrap, first);
    else bottom.appendChild(wrap);
  }

  function rewriteText() {
    const exact = new Map([
      ["BMON", "BMON"],
      ["BMON", "BMON"],
      ["Meet BMON 👋", "Meet BMON 👋"],
      ["Meet BMON 👋 Your new AI-Powered Digital Marketing Specialist,", "Meet BMON 👋 Your done-for-you local growth team."],
      ["Your AI-Powered Digital Marketing Specialist", "Website Design • Local SEO • AI Automations • Reviews • Social & Ads"],
      ["who works tirelessly so you don’t have to.", "Strategy + execution—built for local businesses."],
      ["Your AI-Powered Digital Marketing Specialist, who works tirelessly so you don’t have to.", "Website Design, SEO, and AI automations that get you booked—without the busywork."],
      ["Start My Free Trial", "Book a Free Strategy Call"],
      ["Start Free Trial", "Book a Free Strategy Call"],
      ["Start free trial", "Book a Free Strategy Call"],
      ["Book My Free Demo", "Book a Free Strategy Call"],
      ["Book a demo", "Book a Free Strategy Call"],
      ["Book a Call", "Book a Free Strategy Call"],
      ["Log in", "Book a Free Strategy Call"],
      ["Login", "Book a Free Strategy Call"],
      ["Sign in", "Book a Free Strategy Call"],
      ["Sign In", "Book a Free Strategy Call"],
      ["Try Essential free", "Book a Free Strategy Call"],
      ["Try Premium free", "Book a Free Strategy Call"],
      ["Try Ultimate free", "Book a Free Strategy Call"],
      ["Ready to attract more customers?", "Ready to get more booked appointments?"],
      [
        "Get started today or book a free demo to see how BMON can help you grow your business.",
        "Book a free strategy call and get a plan for Website Design, SEO, Automations, and Ads—built for local growth.",
      ],
      [
        "Get discovered and chosen by consumers searching for the products or services you offer by improving your Local SEO.",
        "Show up when locals search—SEO + Google Business Profile optimizations that drive calls and booked appointments.",
      ],
      [
        "BMON ensures you protect and leverage your reputation by making it simple to get, respond to, and showcase reviews.",
        "Automate review requests and responses so you earn trust, win the click, and stay ahead of competitors.",
      ],
      [
        "Make data-driven decisions through centralized and visualized key metrics, and direct answers to your natural language questions.",
        "See what’s working in one dashboard—and get AI answers in plain English.",
      ],
      [
        "BMON builds your brand awareness and helps you stay top-of-mind by creating, targeting, and scheduling engaging cross-platform campaigns.",
        "Stay top-of-mind with Social Media Management and Ad Campaigns—planned, created, and scheduled for you.",
      ],
      ["Reputation Management", "Automations"],
      ["Insights & Analytics", "AI Implementation"],
      ["Social Media Management", "Social Media Management & Ad Campaigns"],
    ]);

    const substring = [
      [/BMON/g, "BMON"],
      [/\bMadison\b/g, "BMON"],
    ];

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const value = node?.nodeValue;
        if (!value || !value.trim()) return NodeFilter.FILTER_REJECT;

        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;

        const tag = parent.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return NodeFilter.FILTER_REJECT;

        // Avoid rewriting copy inside code/pre blocks or editable regions.
        if (parent.closest("pre, code, [contenteditable='true']")) return NodeFilter.FILTER_REJECT;

        return NodeFilter.FILTER_ACCEPT;
      },
    });

    const nodes = [];
    let node;
    while ((node = walker.nextNode())) nodes.push(node);

    for (const textNode of nodes) {
      const original = textNode.nodeValue;
      if (!original) continue;

      const trimmed = original.trim();
      if (!trimmed) continue;

      let next = original;

      const exactReplacement = exact.get(trimmed);
      if (exactReplacement) {
        next = original.replace(trimmed, exactReplacement);
      }

      for (const [re, to] of substring) {
        next = next.replace(re, to);
      }

      if (next !== original) textNode.nodeValue = next;
    }

    // Image alt text (keeps a11y intact after brand rename)
    document.querySelectorAll("img[alt]").forEach((img) => {
      const alt = img.getAttribute("alt");
      if (!alt) return;

      let next = alt;
      next = next.replace(/BMON/g, "BMON");
      next = next.replace(/\bMadison\b/g, "BMON");

      if (next !== alt) img.setAttribute("alt", next);
    });
  }

  function applyAll() {
    updateMeta();
    updateCanonicalAndOgUrl();
    rewriteLinks();
    fixFooterLinks();
    mountFooterContact();
    rewriteText();
  }

  function initContent() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", applyAll);
    } else {
      applyAll();
    }

    new MutationObserver(debounce(applyAll, 120)).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  /* ------------------------------ Boot ------------------------------- */

  function boot() {
    setPageAttr();
    initModal();
    initBookingEmbed();
    initContactEmbed();
    initContent();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();

