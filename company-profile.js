(() => {
  const STORAGE_KEY = "paramAutomationCompanyProfile";
  const cleanPhone = (value = "") => String(value).replace(/\D/g, "");
  const escapeHtml = (value = "") => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
  const slugify = (value = "") => String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "category";
  const resolveImageSrc = (value = "") => window.ParamImageBundle?.resolve?.(value) || value;
  let savedProfile = {};
  try { savedProfile = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (error) {}
  const baseProfile = window.PARAM_COMPANY_PROFILE || {};
  let profile = { ...baseProfile, ...savedProfile };
  ["facebook", "instagram", "productCataloguePdf", "productCataloguePdfData"].forEach((key) => {
    if (!profile[key] && baseProfile[key]) profile[key] = baseProfile[key];
  });

  const setText = (selector, value) => {
    if (!value) return;
    document.querySelectorAll(selector).forEach((element) => {
      delete element.paramOriginalText;
      element.textContent = value;
    });
  };

  const setLink = (selector, href) => {
    document.querySelectorAll(selector).forEach((element) => {
      element.hidden = !href;
      if (href) element.href = href;
    });
  };

  const locationKey = (value = "") => String(value).toLowerCase().replace(/[^a-z0-9]+/g, "");

  const stateAreaRegions = {
    andhrapradesh: { x: 56, y: 66, w: 15, h: 10 },
    arunachalpradesh: { x: 78, y: 26, w: 11, h: 6 },
    assam: { x: 75, y: 32, w: 14, h: 6 },
    bihar: { x: 61, y: 39, w: 13, h: 7 },
    chhattisgarh: { x: 54, y: 50, w: 12, h: 11 },
    goa: { x: 42, y: 69, w: 5, h: 5 },
    gujarat: { x: 28, y: 49, w: 15, h: 12 },
    haryana: { x: 39, y: 31, w: 8, h: 6 },
    himachalpradesh: { x: 39, y: 23, w: 10, h: 6 },
    jharkhand: { x: 62, y: 46, w: 10, h: 7 },
    karnataka: { x: 43, y: 68, w: 14, h: 13 },
    kerala: { x: 45, y: 82, w: 8, h: 11 },
    madhyapradesh: { x: 42, y: 43, w: 20, h: 16 },
    maharashtra: { x: 39, y: 58, w: 20, h: 12 },
    manipur: { x: 79, y: 39, w: 6, h: 5 },
    meghalaya: { x: 73, y: 36, w: 8, h: 4 },
    mizoram: { x: 77, y: 44, w: 6, h: 6 },
    nagaland: { x: 81, y: 34, w: 6, h: 5 },
    odisha: { x: 61, y: 53, w: 12, h: 9 },
    punjab: { x: 36, y: 28, w: 8, h: 6 },
    rajasthan: { x: 30, y: 36, w: 18, h: 13 },
    sikkim: { x: 70, y: 31, w: 4, h: 4 },
    tamilnadu: { x: 50, y: 81, w: 12, h: 12 },
    telangana: { x: 52, y: 62, w: 11, h: 9 },
    tripura: { x: 75, y: 41, w: 5, h: 5 },
    uttarpradesh: { x: 46, y: 34, w: 17, h: 9 },
    uttarakhand: { x: 45, y: 27, w: 9, h: 6 },
    westbengal: { x: 69, y: 43, w: 10, h: 10 },
    delhi: { x: 42, y: 33, w: 4, h: 4 },
  };

  const districtAreaRegions = {
    madhyapradesh: {
      bhopal: { x: 48, y: 51, w: 5, h: 4 },
      chhindwara: { x: 56, y: 53, w: 6, h: 5 },
      jabalpur: { x: 59, y: 48, w: 6, h: 5 },
      khandwa: { x: 45, y: 57, w: 6, h: 5 },
      narmadapuram: { x: 50, y: 55, w: 6, h: 4 },
      hoshangabad: { x: 50, y: 55, w: 6, h: 4 },
      narsinghpur: { x: 55, y: 48, w: 5, h: 4 },
      sagar: { x: 54, y: 44, w: 6, h: 5 },
      seoni: { x: 60, y: 53, w: 5, h: 4 },
      betul: { x: 51, y: 59, w: 6, h: 5 },
      indore: { x: 42, y: 55, w: 5, h: 4 },
      ujjain: { x: 43, y: 52, w: 5, h: 4 },
      rewa: { x: 63, y: 41, w: 5, h: 4 },
      satna: { x: 60, y: 42, w: 5, h: 4 },
      gwalior: { x: 45, y: 38, w: 5, h: 4 },
    },
  };

  const fallbackAreaRegion = (state = "", district = "") => {
    const base = stateAreaRegions[locationKey(state)] || { x: 42, y: 43, w: 18, h: 14 };
    const key = locationKey(`${state}-${district}`);
    let hash = 0;
    for (const character of key) hash = (hash * 31 + character.charCodeAt(0)) % 997;
    return {
      x: base.x + (hash % Math.max(1, Math.floor(base.w / 2))),
      y: base.y + (Math.floor(hash / 17) % Math.max(1, Math.floor(base.h / 2))),
      w: Math.max(4, Math.min(8, base.w * 0.42)),
      h: Math.max(3, Math.min(7, base.h * 0.42)),
    };
  };

  const getAreaRegion = (state = "Madhya Pradesh", district = "") =>
    districtAreaRegions[locationKey(state)]?.[locationKey(district)] ||
    (district ? fallbackAreaRegion(state, district) : stateAreaRegions[locationKey(state)]) ||
    fallbackAreaRegion(state, district);

  const mpOutline = "M176 90 L238 44 L313 64 L373 51 L438 100 L514 116 L594 184 L570 252 L620 330 L572 411 L503 485 L415 502 L336 466 L247 492 L169 435 L100 376 L125 285 L62 214 L116 145 Z";

  const districtSvgRegions = {
    bhopal: "M290 265 L340 250 L372 280 L358 326 L306 332 L276 302 Z",
    chhindwara: "M420 345 L500 330 L552 370 L530 430 L452 444 L404 395 Z",
    jabalpur: "M455 232 L540 218 L592 274 L568 332 L487 330 L438 283 Z",
    khandwa: "M178 365 L250 348 L296 390 L270 455 L190 456 L146 410 Z",
    narmadapuram: "M285 330 L370 316 L418 356 L390 414 L304 418 L258 374 Z",
    hoshangabad: "M285 330 L370 316 L418 356 L390 414 L304 418 L258 374 Z",
    narsinghpur: "M382 244 L454 232 L492 276 L466 328 L392 326 L356 282 Z",
    sagar: "M330 170 L408 158 L456 208 L424 264 L346 258 L306 210 Z",
    seoni: "M492 336 L560 326 L602 370 L578 424 L512 430 L470 386 Z",
    betul: "M278 402 L354 388 L400 434 L368 486 L288 482 L246 440 Z",
    indore: "M174 270 L246 252 L290 296 L266 350 L192 348 L148 304 Z",
    ujjain: "M208 226 L280 206 L326 250 L302 304 L230 304 L184 260 Z",
    rewa: "M514 126 L590 150 L626 212 L586 258 L510 242 L476 178 Z",
    satna: "M462 146 L526 126 L572 174 L546 232 L478 232 L438 182 Z",
    gwalior: "M186 88 L256 58 L318 88 L304 152 L226 156 L168 120 Z",
  };

  const fallbackDistrictSvg = (state = "", district = "") => {
    const region = getAreaRegion(state, district);
    const x = 60 + region.x * 5.6;
    const y = 30 + region.y * 5.2;
    const w = region.w * 4.8;
    const h = region.h * 4.4;
    return `M${x} ${y} L${x + w * 0.85} ${y - h * 0.12} L${x + w} ${y + h * 0.5} L${x + w * 0.72} ${y + h} L${x + w * 0.12} ${y + h * 0.84} L${x - w * 0.08} ${y + h * 0.28} Z`;
  };

  const parseServiceLocations = () => {
    const rawLocations = Array.isArray(profile.serviceLocations)
      ? profile.serviceLocations
      : String(profile.serviceLocations || "").split(/\n+/);
    return rawLocations
      .map((entry) => {
        if (typeof entry === "object" && entry) return entry;
        const parts = String(entry).split("|").map((part) => part.trim()).filter(Boolean);
        const state = parts.length > 1 ? parts[0] : "Madhya Pradesh";
        const district = parts.length > 1 ? parts[1] : parts[0];
        const city = parts.length > 2 ? parts[2] : "";
        const region = getAreaRegion(state, district);
        return {
          state,
          district,
          city,
          ...region,
        };
      })
      .filter((location) => location.district);
  };

  const renderCoverageMap = () => {
    const mapImage = document.querySelector("[data-coverage-map-image]");
    if (!mapImage) return;
    const fallbackImage = "assets/maps/india-professional-map.jpg";
    const imagePath = profile.coverageMapImage || fallbackImage;
    const cacheVersion = profile.updatedAt || "";
    const resolvedImagePath = resolveImageSrc(imagePath);
    const imageSrc = resolvedImagePath.startsWith("data:") || !cacheVersion || /[?&]v=/.test(resolvedImagePath) ? resolvedImagePath : `${resolvedImagePath}?v=${encodeURIComponent(cacheVersion)}`;
    mapImage.onerror = () => {
      if (mapImage.dataset.fallbackApplied === "true") return;
      mapImage.dataset.fallbackApplied = "true";
      mapImage.src = resolveImageSrc(fallbackImage);
    };
    mapImage.dataset.fallbackApplied = "false";
    mapImage.src = imageSrc;
    mapImage.alt = `${profile.companyName || "Param Automation"} supply coverage map`;
  };

  const renderProductCatalogue = () => {
    const catalogueUrl = profile.productCataloguePdfData || profile.productCataloguePdf || "";
    document.querySelectorAll("[data-product-catalogue]").forEach((link) => {
      link.hidden = false;
      link.href = catalogueUrl || "#";
      link.dataset.catalogueReady = catalogueUrl ? "true" : "false";
      link.setAttribute("aria-disabled", catalogueUrl ? "false" : "true");
      link.title = catalogueUrl ? "Download latest product catalogue" : "Upload product catalogue PDF from admin dashboard";
      link.download = "param-automation-product-catalogue.pdf";
      link.setAttribute("type", "application/pdf");
    });
  };

  const renderWebsiteCategories = () => {
    const controls = document.querySelector(".product-controls");
    const track = document.querySelector(".product-track");
    if (!controls || !track || !Array.isArray(profile.websiteCategories)) return;
    const categories = profile.websiteCategories.filter((category) => category && category.enabled !== false && category.name);
    controls.innerHTML = `<button class="is-active" type="button" data-filter="all">All</button>${categories.map((category, index) => {
      const id = `${slugify(category.filterLabel || category.name)}-${index}`;
      category.renderId = id;
      return `<button type="button" data-filter="${escapeHtml(id)}">${escapeHtml(category.filterLabel || category.name)}</button>`;
    }).join("")}`;
    track.innerHTML = categories.map((category) => `
      <article class="product-card" data-category="${escapeHtml(category.renderId)}">
        <img src="${escapeHtml(resolveImageSrc(category.image || "assets/brand/logo.jpg"))}" alt="${escapeHtml(category.name)}" />
        <div><h3>${escapeHtml(category.name)}</h3><p>${escapeHtml(category.description || "")}</p><a href="${escapeHtml(category.link || "#contact")}">View More <span>→</span></a></div>
      </article>`).join("");
  };

  const renderIndustries = () => {
    const list = document.querySelector(".industry-list");
    const note = document.querySelector("#industry-note");
    if (!list || !Array.isArray(profile.industries)) return;
    const industries = profile.industries.filter((industry) => industry && industry.enabled !== false && industry.name);
    const defaultIcons = {
      "Smart Homes": "⌂",
      "Agriculture & Irrigation": "♧",
      "Manufacturing Industries": "▤",
      "Commercial Buildings": "▥",
      "Schools & Institutions": "♜",
      Hospitals: "✚",
    };
    const cleanIcon = (industry) => {
      const icon = String(industry.icon || "").trim();
      return icon && icon !== "?" ? icon : defaultIcons[industry.name] || "";
    };
    list.innerHTML = industries.map((industry) => {
      const icon = cleanIcon(industry);
      return `<button type="button" data-industry="${escapeHtml(industry.name)}" data-industry-message="${escapeHtml(industry.message || "")}">${icon ? `<span class="industry-icon" aria-hidden="true">${escapeHtml(icon)}</span>` : ""}<span>${escapeHtml(industry.name)}</span></button>`;
    }).join("");
    if (note) note.textContent = "Select an industry to see how we can tailor a solution.";
  };

  const apply = () => {
    const phone = cleanPhone(profile.phone);
    const whatsapp = cleanPhone(profile.whatsapp || profile.phone);
    renderWebsiteCategories();
    renderIndustries();
    renderCoverageMap();
    renderProductCatalogue();
    document.querySelectorAll(".socials").forEach((socials) => {
      if (!socials.querySelector("[data-company-youtube]")) socials.insertAdjacentHTML("beforeend", '<a data-company-youtube target="_blank" rel="noopener" aria-label="YouTube">YT</a>');
      if (!socials.querySelector("[data-company-linkedin]")) socials.insertAdjacentHTML("beforeend", '<a data-company-linkedin target="_blank" rel="noopener" aria-label="LinkedIn">in</a>');
    });
    setText("[data-company-name]", profile.companyName);
    setText("[data-company-ceo]", profile.ceoName);
    setText("[data-company-ceo-title]", profile.ceoTitle);
    setText("[data-company-founded-year]", profile.foundedYear);
    setText("[data-company-tagline]", profile.tagline);
    setText("[data-company-description]", profile.description);
    setText("[data-company-address]", profile.address);
    setText("[data-company-phone]", profile.phone ? `+91 ${profile.phone}` : "");
    setText("[data-company-email]", profile.email);
    setText("[data-company-hours]", profile.businessHours);
    const setStat = (selector, value) => {
      const number = Math.max(0, Number(value) || 0);
      document.querySelectorAll(selector).forEach((element) => {
        delete element.paramOriginalText;
        element.dataset.count = String(number);
        element.textContent = `${number}+`;
      });
    };
    setStat("[data-company-years-excellence]", profile.yearsExcellence);
    setStat("[data-company-happy-customers]", profile.happyCustomers);
    setStat("[data-company-products-installed]", profile.productsInstalled);
    setText("[data-company-happy-customers-summary]", `${Number(profile.happyCustomers) || 0}+ Happy Customers`);
    document.querySelectorAll(".footer__bottom > p:first-child").forEach((element) => {
      delete element.paramOriginalText;
      element.textContent = `© ${new Date().getFullYear()} ${profile.companyName}. All Rights Reserved.`;
    });
    document.querySelectorAll(".brand img").forEach((image) => {
      image.alt = profile.companyName || "Company logo";
      image.src = resolveImageSrc("assets/brand/logo.jpg");
    });
    document.querySelectorAll(".footer__logo").forEach((image) => {
      image.alt = profile.companyName || "Company logo";
      image.src = resolveImageSrc("assets/brand/footer-logo-white.png");
    });

    setLink('[aria-label="Facebook"]', profile.facebook);
    setLink('[aria-label="Instagram"]', profile.instagram);
    setLink('[data-company-youtube]', profile.youtube);
    setLink('[data-company-linkedin]', profile.linkedin);
    setLink('[data-company-website]', profile.website);
    setLink('[data-company-map]', profile.googleMaps);
    setLink('a[href^="tel:"]', phone ? `tel:+91${phone}` : "");
    setLink('a[href^="mailto:"]', profile.email ? `mailto:${profile.email}` : "");
    setLink(".floating-whatsapp", whatsapp ? `https://wa.me/91${whatsapp}` : "");

    document.querySelectorAll(".footer__grid").forEach((grid) => {
      const columns = grid.querySelectorAll(":scope > div");
      const about = columns[0]?.querySelector(":scope > p");
      const contact = Array.from(columns).find((column) => /Contact Us/i.test(column.querySelector("h3")?.textContent || ""));
      if (about && profile.description) {
        delete about.paramOriginalText;
        about.textContent = profile.description;
      }
      if (contact) {
        const address = contact.querySelector("p");
        const phoneLink = contact.querySelector('a[href^="tel:"]');
        const emailLink = contact.querySelector('a[href^="mailto:"]');
        let hours = contact.querySelector("[data-company-hours]");
        let website = contact.querySelector("[data-company-website]");
        let map = contact.querySelector("[data-company-map]");
        if (!hours) { contact.insertAdjacentHTML("beforeend", '<p data-company-hours></p>'); hours = contact.querySelector("[data-company-hours]"); }
        if (!website) { contact.insertAdjacentHTML("beforeend", '<a data-company-website target="_blank" rel="noopener">Website</a>'); website = contact.querySelector("[data-company-website]"); }
        if (!map) { contact.insertAdjacentHTML("beforeend", '<a data-company-map target="_blank" rel="noopener">View on Google Maps</a>'); map = contact.querySelector("[data-company-map]"); }
        if (address) { delete address.paramOriginalText; address.textContent = profile.address || ""; }
        if (phoneLink) { delete phoneLink.paramOriginalText; phoneLink.textContent = profile.phone ? `+91 ${profile.phone}` : ""; }
        if (emailLink) { delete emailLink.paramOriginalText; emailLink.textContent = profile.email || ""; }
        if (hours) { delete hours.paramOriginalText; hours.textContent = profile.businessHours || ""; hours.hidden = !profile.businessHours; }
        if (website) { website.href = profile.website || ""; website.hidden = !profile.website; }
        if (map) { map.href = profile.googleMaps || ""; map.hidden = !profile.googleMaps; }
      }
    });
    window.ParamLanguage?.applyCurrent?.();
  };

  const setProfile = (nextProfile, { persist = true } = {}) => {
    profile = { ...profile, ...(nextProfile || {}) };
    window.PARAM_COMPANY_PROFILE = profile;
    if (persist) {
      const { productCataloguePdfData, ...profileForStorage } = profile;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profileForStorage));
    }
    apply();
  };

  window.ParamCompanyProfile = { get: () => ({ ...profile }), setProfile, apply, hasLocalProfile: () => Boolean(localStorage.getItem(STORAGE_KEY)) };
  apply();
})();
