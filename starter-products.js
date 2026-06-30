const STARTER_PRODUCTS_STORAGE_KEY = "paramAutomationStarterProducts";
const MIN_EXPECTED_PRODUCT_COUNT = 4;
const STARTER_PRODUCTS_DATA_VERSION = "20260628-02";

const DEFAULT_STARTER_PRODUCTS = [
  {
    id: "three-phase-digital-starter-motor-protection",
    code: "PA-DMS-3P-SU-7.5HP",
    model: "PA-DMS-3P-SU-7.5HP",
    category: "three-phase",
    name: "Three Phase Digital Starter With Motor Protection",
    availability: "In Stock",
    image: "assets/products/digital-starters/1-photoroom-1782039376874.jpg",
    mrp: 4999,
    price: 3999,
    offer: "After discount price. Order confirmation and payment QR will be shared after call or message.",
    short:
      "Three phase electronic motor starter for motors up to 7.5 HP with motor protection features.",
    fullAbout:
      "PARAM Three Phase Digital Starter is a smart and reliable device designed to protect and automate motors for agricultural and industrial operations.",
    features: [
      "Dry Run Protection",
      "Overload Protection",
      "Under/Over Voltage Protection",
      "Remote Control",
      "Auto Water Level Control",
      "Phase Failure Protection",
      "Pump Protection",
      "Timer & Auto Function",
    ],
    topFeatures: [
      "Dry Run Protection",
      "Overload Protection",
      "Under Voltage Protection",
      "Over Voltage Protection",
      "Phase Failure Protection",
      "Auto Restart Function",
      "Timer Function",
    ],
    specs: {
      Voltage: "415V AC",
      Frequency: "50Hz",
      "Motor Capacity": "Up to 7.5 HP",
      "Starting Type": "DOL (Direct On Line)",
      Display: "Digital LED Display",
      Protection: "Multiple Protection",
      Warranty: "1 Year",
    },
    details: [
      "Direct On Line electronic motor starter for 415V, 3 phase, 50Hz AC supply.",
      "Suitable for three phase motors up to 7.5 HP after site and load confirmation.",
      "Digital voltage and ampere display with Auto/Manual operation control.",
      "Includes high/low voltage protection, single phase protection, overload protection and dry run protection.",
    ],
    sop: [
      "Confirm motor HP, supply voltage and wiring condition before installation.",
      "Set protection values according to motor requirement and site condition.",
      "Test start, stop, auto/manual mode and protection response before regular use.",
    ],
    installation: [
      "Install the starter in a dry and protected location.",
      "Use correct MCB/contactor/wiring according to motor load.",
      "Connect R/Y/B input and output terminals properly.",
      "Installation should be completed by a qualified electrician only.",
    ],
    videos: {
      intro: "https://www.instagram.com/reel/DY4DpJMDuYC/?igsh=OWxzZXdsaTRzYWpt",
      installation: "",
      sop: "",
    },
    offers: ["Free installation guide", "Free WhatsApp technical support", "Bulk order discount available", "Free software updates", "1 year warranty"],
  },
  {
    id: "digital-motor-ac-starter-voltage-protection-1-5hp",
    code: "PA-DMS-1P-AC-1.5HP",
    model: "PA-DMS-1P-AC-1.5HP",
    category: "single-phase",
    name: "Digital Motor/AC Starter With Voltage Protection",
    availability: "In Stock",
    image: "assets/products/digital-starters/2-photoroom-1781545398800.jpg",
    mrp: 2499,
    price: 1999,
    offer: "Order confirmation and payment QR will be shared after call or message.",
    short: "Digital Motor/AC Starter with voltage, electronic overload and dry run protection.",
    fullAbout:
      "Digital Motor/AC Starter with voltage protection, electronic overload protection and dry run protection for single phase motor or AC starter applications.",
    features: [
      "Voltage Protection",
      "Electronic Overload Protection",
      "Dry Run Protection",
      "Digital Display",
      "Manual Start/Stop Control",
    ],
    topFeatures: [
      "Voltage Protection",
      "Electronic Overload Protection",
      "Dry Run Protection",
      "Digital SSD Display",
      "1 Year Warranty",
    ],
    specs: {
      Voltage: "230-250V AC",
      Frequency: "50Hz",
      "Motor Capacity": "1.5 HP",
      "Starting Type": "Normal Starter",
      Display: "SSD",
      Protection: "Voltage, Overload, Dry Run",
      Warranty: "1 Year",
    },
    details: [
      "Digital Motor/AC Starter for single phase motor applications.",
      "Designed with voltage, electronic overload and dry run protection.",
      "Suitable for mono block pump applications up to 1.5 HP after site confirmation.",
    ],
    sop: [
      "Check power supply before starting.",
      "Confirm input and output wiring is connected correctly.",
      "Turn ON the main supply.",
      "Press START and monitor voltage/current display.",
      "Use STOP/RESET to stop or reset the starter.",
    ],
    installation: [
      "Install in a dry and protected location.",
      "Connect input P/N and output P/N terminals properly.",
      "Use correct wiring and earthing as per motor load.",
      "Set protection values according to motor requirement.",
      "Installation should be completed by a qualified electrician only.",
    ],
    videos: {
      intro: "",
      installation: "",
      sop: "",
    },
    offers: ["Free installation guide", "Free WhatsApp technical support", "1 year warranty"],
  },
];

const STATIC_STARTER_PRODUCTS =
  Array.isArray(window.PARAM_STARTER_PRODUCTS_DATA) && window.PARAM_STARTER_PRODUCTS_DATA.length
    ? window.PARAM_STARTER_PRODUCTS_DATA
    : DEFAULT_STARTER_PRODUCTS;

const productImageReferences = (product = {}) => [
  product.image,
  ...(product.images || []),
  product.wiringImage,
  ...(product.wiringImages || []),
  ...Object.values(product.detailImages || {}),
  ...Object.values(product.videoThumbnails || {}),
].filter(Boolean);

const productsHaveBundledImages = (products = []) => {
  if (!window.ParamImageBundle?.resolve) return true;
  return products.every((product) =>
    productImageReferences(product).every((image) => {
      if (!String(image).startsWith("assets/")) return true;
      return window.ParamImageBundle.resolve(image).startsWith("data:");
    })
  );
};

const loadStarterProducts = () => {
  try {
    const savedProducts = JSON.parse(localStorage.getItem(STARTER_PRODUCTS_STORAGE_KEY));
    if (Array.isArray(savedProducts) && savedProducts.length >= MIN_EXPECTED_PRODUCT_COUNT && productsHaveBundledImages(savedProducts)) {
      return sortProductsForDisplay(savedProducts);
    }
    if (Array.isArray(savedProducts)) localStorage.removeItem(STARTER_PRODUCTS_STORAGE_KEY);
  } catch (error) {
  }

  return window.location.protocol === "file:" ? sortProductsForDisplay(STATIC_STARTER_PRODUCTS) : [];
};

const categoryOrder = {
  "single-phase": 1,
  "three-phase": 2,
  "two-phase": 3,
  "sensor-remote": 4,
  sensor: 4,
};

const getProductOrderTime = (product) => Number(product.createdAt || 0);

const getProductBadgePriority = (product) => {
  if (product.productBadge === "top-rated") return 0;
  if (product.productBadge === "bestseller") return 1;
  return 2;
};

const sortProductsForDisplay = (products) =>
  [...products].sort((first, second) => {
    const badgePriority = getProductBadgePriority(first) - getProductBadgePriority(second);
    if (badgePriority !== 0) return badgePriority;
    const firstCategory = categoryOrder[first.category] || 99;
    const secondCategory = categoryOrder[second.category] || 99;
    if (firstCategory !== secondCategory) return firstCategory - secondCategory;
    return getProductOrderTime(second) - getProductOrderTime(first);
  });

let STARTER_PRODUCTS = loadStarterProducts();

const saveStarterProducts = (products) => {
  STARTER_PRODUCTS = sortProductsForDisplay(products);
  localStorage.setItem(STARTER_PRODUCTS_STORAGE_KEY, JSON.stringify(STARTER_PRODUCTS));
};

const getCurrentProductLanguage = () => window.ParamLanguage?.getCurrent?.() || localStorage.getItem("param-language") || "en";

const getProductBadgeLabel = (product) => {
  if (product.productBadge === "top-rated") return getCurrentProductLanguage() === "hi" ? "टॉप-रेटेड" : "Top-Rated";
  if (product.productBadge === "bestseller") return getCurrentProductLanguage() === "hi" ? "बेस्टसेलर" : "Bestseller";
  return "";
};

const localizedProductValue = (product, key, fallback = "") => {
  if (getCurrentProductLanguage() !== "hi") return fallback;
  return product.translations?.hi?.[key] || fallback;
};

const localizedProductList = (product, key, fallback = []) => {
  if (getCurrentProductLanguage() !== "hi") return fallback;
  return product.translations?.hi?.[key] || fallback;
};

const refreshProductViews = ({ applyLanguage = true } = {}) => {
  renderStarterList();
  applyActiveStarterFilter();
  renderProductDetail();
  renderPdpPage();
  fillOrderProductSelect();
  if (applyLanguage) window.ParamLanguage?.applyCurrent?.();
};

const loadServerStarterProducts = async () => {
  try {
    const response = await fetch("/api/products", { cache: "no-store" });
    if (!response.ok) throw new Error("Products API is not available.");
    const result = await response.json();
    if (!Array.isArray(result.products) || !result.products.length) throw new Error("Products API returned no products.");

    saveStarterProducts(result.products);
    refreshProductViews();
  } catch (error) {
    try {
      const response = await fetch(`starter-products-data.json?v=${STARTER_PRODUCTS_DATA_VERSION}`, { cache: "no-store" });
      if (!response.ok) throw new Error("Static product data is not available.");
      const result = await response.json();
      const products = Array.isArray(result) ? result : result.products;
      if (!Array.isArray(products) || !products.length) throw new Error("Static product data returned no products.");
      saveStarterProducts(products);
      refreshProductViews();
    } catch (staticError) {
      if (!STARTER_PRODUCTS.length) {
        STARTER_PRODUCTS = sortProductsForDisplay(STATIC_STARTER_PRODUCTS);
        refreshProductViews();
      }
    }
  }
};

window.ParamStarterStore = {
  getProducts: () => STARTER_PRODUCTS,
  setProducts: saveStarterProducts,
  refreshViews: refreshProductViews,
  syncProducts: async (products) => {
    saveStarterProducts(products);
    if (window.location.protocol === "file:") return;

    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ products: STARTER_PRODUCTS }),
    });

    if (!response.ok) throw new Error("Could not save products to server.");
  },
  getDefaults: () => [...DEFAULT_STARTER_PRODUCTS],
  reset: () => {
    localStorage.removeItem(STARTER_PRODUCTS_STORAGE_KEY);
    STARTER_PRODUCTS = sortProductsForDisplay(STATIC_STARTER_PRODUCTS);
    return STARTER_PRODUCTS;
  },
};

const getContactPhone = () => {
  const digits = String(window.ParamCompanyProfile?.get?.().whatsapp || window.ParamCompanyProfile?.get?.().phone || "918109521547").replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
};
const CONTACT_EMAIL = "Paramsoni57@gmail.com";
const SHIPPING_NOTE = "Shipping charges extra, if applicable.";
const PRICE_CONDITION_NOTE = "Final price is inclusive of all taxes, and prices may vary as per market conditions.";
const DEFAULT_DISPLAY_INSTRUCTIONS = [
  "At: Auto Mode",
  "Set: Set Customise setting",
  "dly: Restart Delay Time",
  "Hi: High Voltage",
  "OL: Electronic Overload",
  "dry: Dry Run Protection",
  "don: Dry Run On Time",
  "tof: Timer Off Time",
  "SPP: If Red And Yellow On, But Blue is Off",
  "SPP Blinking: Red, Yellow, Blue Reverse And Dim",
  "CSP: Unbalance Current Which Is No Auto reset",
  'USP: "+-" 70 Volt Fluctuation (Auto reset In On minutes)',
  "Note: Manual Mode: Press RST Button To Reset System",
  "Note: Auto Mode Automatically Reset as Per Delay Time",
  "Note: OL (Over Load) and CSP (Unbalance Current) Are Not Auto reset In Auto/Manual Mode",
  "Note: If Red And Yellow Not Available Starter not Start",
];
let orderItems = [];

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const getProductUnit = (product) => product.unit || "Piece";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const resolveImageSrc = (value = "") => window.ParamImageBundle?.resolve?.(value) || value;

const renderTextBlocks = (value = "") =>
  String(value)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br />")}</p>`)
    .join("");

const findProduct = (id) => STARTER_PRODUCTS.find((product) => product.id === id) || STARTER_PRODUCTS[0];
const getDiscountPercent = (product) => Math.round(((product.mrp - product.price) / product.mrp) * 100);
const getProductImages = (product) =>
  [product.image, ...(product.images || []).filter((image) => image && image !== product.image)].filter(Boolean).slice(0, 5);

const getProductShareUrl = (product) => {
  const url = new URL(window.location.href);
  url.pathname = url.pathname.replace(/[^/]*$/, "starter-product-details.html");
  url.search = `?id=${encodeURIComponent(product.id)}`;
  url.hash = "";
  return url.href;
};

const shareProduct = async (product) => {
  if (!product) return;
  const productName = localizedProductValue(product, "name", product.name);
  const productUnit = getProductUnit(product);
  const shareUrl = getProductShareUrl(product);
  const shareText = `${productName}\nPrice: ${formatPrice(product.price)} / ${productUnit}\nProduct Link: ${shareUrl}`;
  const shareData = {
    title: `${productName} | Param Automation`,
    text: shareText,
    url: shareUrl,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return;
    }
  } catch (error) {
    if (error?.name === "AbortError") return;
  }

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const popup = window.open(whatsappUrl, "_blank", "noopener");
  if (popup) return;

  try {
    await navigator.clipboard?.writeText(shareUrl);
    alert(getCurrentProductLanguage() === "hi" ? "Product link copy हो गई है।" : "Product link copied.");
  } catch (error) {
    prompt(getCurrentProductLanguage() === "hi" ? "Product link copy करें:" : "Copy product link:", shareUrl);
  }
};

const getTableVisibility = (product) => ({
  displayInstructions: product.tableVisibility?.displayInstructions !== false,
  singlePhaseChart: product.tableVisibility?.singlePhaseChart !== false,
  threePhaseChart: product.tableVisibility?.threePhaseChart !== false,
});

const getProductDetailImage = (product = {}, key = "") => product.detailImages?.[key] || "";

const renderProductDetailImage = (product, key, fallbackText) => {
  const image = resolveImageSrc(getProductDetailImage(product, key));
  const productName = localizedProductValue(product, "name", product.name);
  return image
    ? `<img class="product-detail-image" src="${image}" alt="${productName} ${fallbackText}" loading="lazy" />`
    : `<p>${fallbackText} image will be added here.</p>`;
};

const renderStarterList = () => {
  const list = document.querySelector("[data-starter-list]");
  if (!list) return;

  const products = sortProductsForDisplay(STARTER_PRODUCTS);
  if (!products.length) {
    list.innerHTML = `<p class="admin-empty-state">Loading products...</p>`;
    return;
  }

  list.innerHTML = products.map(
    (product) => {
      const productName = localizedProductValue(product, "name", product.name);
      const productUnit = getProductUnit(product);
      const badgeLabel = getProductBadgeLabel(product);
      return `
      <article class="starter-card starter-product-card" data-starter-category="${product.category}">
        ${badgeLabel ? `<span class="starter-card__rank-badge starter-card__rank-badge--${product.productBadge}">${badgeLabel}</span>` : ""}
        <img src="${resolveImageSrc(product.image)}" alt="${productName}" />
        <div>
          <div class="starter-card__meta">
            <small class="starter-model">Model: ${product.model}</small>
            <small class="stock-badge ${product.availability === "In Stock" ? "is-stock" : "is-out"}">${product.availability}</small>
          </div>
          <h3>${productName}</h3>
          <div class="starter-price">
            <span class="starter-price__mrp">MRP <s>${formatPrice(product.mrp)}</s></span>
            <div class="starter-price__final">
              <strong>${formatPrice(product.price)} / ${productUnit}</strong>
              <span class="starter-price__tag">${getDiscountPercent(product)}% OFF</span>
            </div>
            <span class="starter-price__note">${PRICE_CONDITION_NOTE}</span>
          </div>
          <div class="starter-card__actions">
            <a href="starter-product-details.html?id=${product.id}">Product Details</a>
            <button type="button" data-buy-product="${product.id}">Buy Product</button>
            <a class="starter-card__call" href="tel:+${getContactPhone()}">Call For Best Price</a>
          </div>
        </div>
      </article>
    `;
    }
  ).join("");
};

const setupStarterFilters = () => {
  const filterButtons = document.querySelectorAll("[data-starter-filter]");
  const productList = document.querySelector("[data-starter-list]");
  if (!filterButtons.length || !productList) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.starterFilter;
      filterButtons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      productList.querySelectorAll("[data-starter-category]").forEach((card) => {
        const category = card.dataset.starterCategory;
        const show =
          filter === "all" ||
          category === filter ||
          (filter === "sensor-remote" && category === "sensor") ||
          (filter === "sensor" && category === "sensor-remote");
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
};

const applyActiveStarterFilter = () => {
  const productList = document.querySelector("[data-starter-list]");
  const activeButton = document.querySelector("[data-starter-filter].is-active");
  if (!productList || !activeButton) return;

  const filter = activeButton.dataset.starterFilter || "all";
  productList.querySelectorAll("[data-starter-category]").forEach((card) => {
    const category = card.dataset.starterCategory;
    const show =
      filter === "all" ||
      category === filter ||
      (filter === "sensor-remote" && category === "sensor") ||
      (filter === "sensor" && category === "sensor-remote");
    card.classList.toggle("is-hidden", !show);
  });
};

const renderProductDetail = () => {
  const detailRoot = document.querySelector("[data-product-detail]");
  if (!detailRoot) return;
  if (!STARTER_PRODUCTS.length) return;

  const product = findProduct(new URLSearchParams(window.location.search).get("id"));
  if (!product) return;
  const productName = localizedProductValue(product, "name", product.name);
  const productShort = localizedProductValue(product, "short", product.short);
  const productDetails = localizedProductList(product, "details", product.details || []);
  const productSop = localizedProductList(product, "sop", product.sop || []);
  const productInstallation = localizedProductList(product, "installation", product.installation || []);
  const productUnit = getProductUnit(product);
  detailRoot.innerHTML = `
    <section class="starter-detail-hero">
      <div class="container starter-detail-grid">
        <img src="${resolveImageSrc(product.image)}" alt="${productName}" />
        <div>
          <p class="eyebrow">Param Automation Product</p>
          <h1>${productName}</h1>
          <p class="model-line">Model Name: <strong>${product.model}</strong></p>
          <p>${productShort}</p>
          <dl class="price-list price-list--large">
            <div><dt>MRP</dt><dd><s>${formatPrice(product.mrp)}</s></dd></div>
            <div><dt>After Discount</dt><dd>${formatPrice(product.price)} / ${productUnit}</dd></div>
          </dl>
          <p class="price-condition-note">${PRICE_CONDITION_NOTE}</p>
          <p class="offer-text">${product.offer}</p>
          <div class="starter-detail-actions">
            <a class="btn btn--primary" href="digital-motor-starters.html#starter-types">Back To Products</a>
            <a class="btn btn--light" href="tel:+${getContactPhone()}">Call For Best Price</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section product-full-detail">
      <div class="container product-full-grid">
        <article>
          <h2>Product Full Details</h2>
          <ul>${productDetails.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
        <article>
          <h2>SOP Content Video</h2>
          <div class="video-placeholder">SOP video will be added here.</div>
          <ul>${productSop.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
        <article>
          <h2>Installation Instruction</h2>
          <ul>${productInstallation.map((item) => `<li>${item}</li>`).join("")}</ul>
        </article>
        <article>
          <h2>Installation Video</h2>
          <div class="video-placeholder">Installation video will be added here.</div>
        </article>
      </div>
    </section>
  `;
};

const renderVideoCard = (label, url, thumbnail, productName = "Product") => {
  const tag = url ? "a" : "div";
  const attrs = url ? ` href="${url}" target="_blank" rel="noopener"` : "";
  const resolvedThumbnail = resolveImageSrc(thumbnail);
  const image = resolvedThumbnail
    ? `<img src="${resolvedThumbnail}" alt="${productName} ${label} preview" loading="lazy" />`
    : `<div class="video-card__fallback"></div>`;

  return `
    <${tag} class="video-card"${attrs}>
      ${image}
      <span class="video-card__play">Play</span>
      <strong>${label}</strong>
    </${tag}>
  `;
};

const getYouTubeVideoId = (url = "") => {
  const match = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : "";
};

const getVideoPreviewImage = (url, fallback) => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : fallback;
};

const renderDisplayInstructionRows = (items = []) => {
  const instructions = items.length ? items : DEFAULT_DISPLAY_INSTRUCTIONS;
  return `
    <tr><th>Display</th><th>Instruction</th></tr>
    ${instructions
    .map((item) => {
      const separator = item.indexOf(":");
      if (separator === -1) return `<tr><td colspan="2">${item}</td></tr>`;
      return `<tr><th>${item.slice(0, separator).trim()}</th><td>${item.slice(separator + 1).trim()}</td></tr>`;
    })
    .join("")}
  `;
};

const renderProductGallery = (product) => {
  const images = getProductImages(product);
  const productName = localizedProductValue(product, "name", product.name);
  const galleryImage = document.querySelector(".gallery-main img");
  const thumbs = document.querySelector("[data-gallery-thumbs]");

  if (galleryImage) {
    galleryImage.src = resolveImageSrc(images[0] || product.image);
    galleryImage.alt = productName;
  }

  if (!thumbs) return;
  thumbs.innerHTML = images
    .map(
      (image, index) => `
        <button type="button" class="${index === 0 ? "is-active" : ""}" data-gallery-image="${image}" aria-label="Show product image ${index + 1}">
          <img src="${resolveImageSrc(image)}" alt="${productName} image ${index + 1}" />
        </button>
      `
    )
    .join("");
};

const applyTableVisibility = (product) => {
  const visibility = getTableVisibility(product);
  const showDisplayInstructions = visibility.displayInstructions && Boolean(getProductDetailImage(product, "displayInstructions"));
  const showSinglePhaseChart = visibility.singlePhaseChart && Boolean(getProductDetailImage(product, "singlePhaseChart"));
  const showThreePhaseChart = visibility.threePhaseChart && Boolean(getProductDetailImage(product, "threePhaseChart"));
  document.querySelector("[data-detail-tab='display-instructions']")?.toggleAttribute("hidden", !showDisplayInstructions);
  document.querySelector("#display-instructions")?.toggleAttribute("hidden", !showDisplayInstructions);
  document.querySelector("[data-chart-block='singlePhaseChart']")?.toggleAttribute("hidden", !showSinglePhaseChart);
  document.querySelector("[data-chart-block='threePhaseChart']")?.toggleAttribute("hidden", !showThreePhaseChart);
};

const activateDetailTab = (tab = "overview") => {
  const activeTab = tab === "overview" ? "overview" : tab;
  document.querySelectorAll("[data-detail-tab]").forEach((link) => {
    const isActive = link.dataset.detailTab === activeTab;
    link.classList.toggle("is-active", isActive);
    link.setAttribute("aria-current", isActive ? "true" : "false");
  });

  document.querySelectorAll("[data-detail-section]").forEach((section) => {
    const groups = (section.dataset.detailSection || "").split(/\s+/);
    const show = activeTab === "overview" || groups.includes(activeTab);
    section.hidden = !show;
  });

  document.querySelectorAll("[data-detail-piece]").forEach((piece) => {
    const groups = (piece.dataset.detailPiece || "").split(/\s+/);
    piece.hidden = activeTab !== "overview" && !groups.includes(activeTab);
  });
};

const renderPdpPage = () => {
  const page = document.querySelector(".product-page");
  if (!page) return;
  if (!STARTER_PRODUCTS.length) return;

  const product = findProduct(new URLSearchParams(window.location.search).get("id"));
  if (!product) return;
  const discount = getDiscountPercent(product);
  const productUnit = getProductUnit(product);
  const productName = localizedProductValue(product, "name", product.name);
  const productOverview = localizedProductValue(product, "fullAbout", product.fullAbout || product.short);
  const productSop = localizedProductList(product, "sop", product.sop || []);
  const productInstallation = localizedProductList(product, "installation", product.installation || []);
  document.title = `${productName} | Param Automation`;

  const breadcrumbTitle = document.querySelector(".breadcrumb strong");
  if (breadcrumbTitle) breadcrumbTitle.textContent = productName;

  renderProductGallery(product);

  const title = document.querySelector(".product-summary h1");
  if (title) title.textContent = productName;

  let modelLine = document.querySelector(".product-summary .model-line");
  if (!modelLine && title) {
    modelLine = document.createElement("p");
    modelLine.className = "model-line";
    title.insertAdjacentElement("afterend", modelLine);
  }
  if (modelLine) modelLine.innerHTML = `Model Name: <strong>${product.model}</strong>`;

  const priceBlock = document.querySelector(".pdp-price");
  if (priceBlock) {
    priceBlock.innerHTML = `
      <p>M.R.P.: <s>${formatPrice(product.mrp)}</s> <strong>${discount}% OFF</strong></p>
      <h2>Your Price : ${formatPrice(product.price)} / ${productUnit}</h2>
      <span>${PRICE_CONDITION_NOTE}</span>
      <span class="shipping-note">${SHIPPING_NOTE}</span>
    `;
  }

  const inTheBoxBlock = document.querySelector("[data-in-the-box]");
  if (inTheBoxBlock) {
    const inTheBoxItems = Array.isArray(product.inTheBox)
      ? product.inTheBox.filter(Boolean)
      : String(product.inTheBox || "").split("\n").map((item) => item.trim()).filter(Boolean);
    inTheBoxBlock.hidden = !inTheBoxItems.length;
    if (inTheBoxItems.length) {
      inTheBoxBlock.innerHTML = `<h3>In the Box</h3><ul>${inTheBoxItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
    }
  }

  const offersList = document.querySelector(".offers-box ul");
  if (offersList) {
    const offers = product.offers || ["Free installation guide", "Free WhatsApp technical support", "1 year warranty"];
    offersList.innerHTML = offers.map((offer) => `<li>${offer}</li>`).join("");
  }

  const buyButton = document.querySelector("[data-buy-product]");
  if (buyButton) buyButton.dataset.buyProduct = product.id;

  const bestPriceButton = document.querySelector("[data-call-best-price]");
  if (bestPriceButton) bestPriceButton.href = `tel:+${getContactPhone()}`;

  const shareButton = document.querySelector("[data-share-product]");
  if (shareButton) {
    shareButton.dataset.shareProduct = product.id;
    shareButton.setAttribute("aria-label", `Share ${productName}`);
  }

  const featureRibbon = document.querySelector(".feature-ribbon__grid");
  if (featureRibbon) {
    featureRibbon.innerHTML = (product.features || []).map((feature) => `<span>${feature}</span>`).join("");
  }

  const overview = document.querySelector("[data-overview-text]");
  if (overview) overview.innerHTML = renderTextBlocks(productOverview);

  const specsTable = document.querySelector("#specifications table");
  if (specsTable) {
    specsTable.innerHTML = Object.entries(product.specs || {}).map(([key, value]) => `<tr><th>${key}</th><td>${value}</td></tr>`).join("");
  }

  const topFeatures = document.querySelector("#specifications .check-list");
  if (topFeatures) {
    topFeatures.innerHTML = (product.topFeatures || product.features || []).map((feature) => `<li>${feature}</li>`).join("");
  }

  const sopList = document.querySelector("#sop ol");
  if (sopList) {
    sopList.innerHTML = productSop.map((step) => `<li>${step}</li>`).join("");
  }

  const installationList = document.querySelector("#installation ol");
  if (installationList) {
    installationList.innerHTML = productInstallation.map((step) => `<li>${step}</li>`).join("");
  }

  const wiringDiagram = document.querySelector("[data-wiring-diagram]");
  if (wiringDiagram) {
    const wiringImages = (product.wiringImages?.length ? product.wiringImages : [product.wiringImage]).filter(Boolean).slice(0, 2);
    wiringDiagram.innerHTML = wiringImages.length
      ? `<div class="wiring-diagram-gallery">${wiringImages.map((image, index) => `<img class="wiring-diagram-image" src="${resolveImageSrc(image)}" alt="${productName} wiring diagram ${index + 1}" />`).join("")}</div>`
      : `<p>Wiring diagram image will be added here.</p>`;
  }

  const displayInstructions = document.querySelector("[data-display-instructions]");
  if (displayInstructions) {
    displayInstructions.innerHTML = renderProductDetailImage(product, "displayInstructions", "Display instruction");
  }

  const singlePhaseChart = document.querySelector("[data-detail-image='singlePhaseChart']");
  if (singlePhaseChart) {
    singlePhaseChart.innerHTML = renderProductDetailImage(product, "singlePhaseChart", "Single-phase ampere chart");
  }

  const threePhaseChart = document.querySelector("[data-detail-image='threePhaseChart']");
  if (threePhaseChart) {
    threePhaseChart.innerHTML = renderProductDetailImage(product, "threePhaseChart", "Three-phase FLC chart");
  }
  activateDetailTab("overview");
  applyTableVisibility(product);

  const videoGrid = document.querySelector("#videos");
  if (videoGrid) {
    const videoThumbs = product.videoThumbnails || {};
    const introThumb = getVideoPreviewImage(product.videos?.intro, videoThumbs.intro || product.image);
    const installationThumb = getVideoPreviewImage(
      product.videos?.installation,
      videoThumbs.installation || product.wiringImages?.[0] || product.wiringImage || product.image
    );
    const sopThumb = getVideoPreviewImage(product.videos?.sop, videoThumbs.sop || product.wiringImages?.[0] || product.wiringImage || product.image);

    videoGrid.innerHTML = [
      renderVideoCard("Product Introduction", product.videos?.intro, introThumb, productName),
      renderVideoCard("Installation Video", product.videos?.installation, installationThumb, productName),
      renderVideoCard("SOP Training Video", product.videos?.sop, sopThumb, productName),
    ].join("");
  }
};

const fillOrderProductSelect = () => {
  const select = document.querySelector("[data-order-product]");
  if (!select) return;

  select.innerHTML = sortProductsForDisplay(STARTER_PRODUCTS).map(
    (product) => `<option value="${product.id}">${product.model} - ${localizedProductValue(product, "name", product.name)} - ${formatPrice(product.price)}</option>`
  ).join("");
};

const renderOrderItems = () => {
  const list = document.querySelector("[data-order-items]");
  if (!list) return;

  if (!orderItems.length) {
    list.innerHTML = `<p>No items added yet.</p>`;
    return;
  }

  const total = orderItems.reduce((sum, item) => {
    const product = findProduct(item.productId);
    return sum + product.price * item.qty;
  }, 0);

  list.innerHTML = `
    <table>
      <thead>
        <tr><th>S.No.</th><th>Product</th><th>Model</th><th>Qty</th><th>Amount</th><th></th></tr>
      </thead>
      <tbody>
        ${orderItems
          .map((item, index) => {
            const product = findProduct(item.productId);
            const productName = localizedProductValue(product, "name", product.name);
            return `
              <tr>
                <td class="order-serial-cell">${index + 1}</td>
                <td>${productName}</td>
                <td class="order-model-cell">${product.model}</td>
                <td><input class="order-line-qty" type="number" min="1" value="${item.qty}" data-update-item-qty="${index}" aria-label="Quantity for ${productName}" /></td>
                <td data-line-amount="${index}">${formatPrice(product.price * item.qty)}</td>
                <td><button type="button" data-remove-item="${index}">Remove</button></td>
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
    <div class="order-total-row">
      <span>Total Amount</span>
      <strong>${formatPrice(total)}</strong>
    </div>
  `;
};

const refreshOrderAmountDisplay = () => {
  const total = orderItems.reduce((sum, item, index) => {
    const product = findProduct(item.productId);
    const amount = product.price * item.qty;
    const amountCell = document.querySelector(`[data-line-amount="${index}"]`);
    if (amountCell) amountCell.textContent = formatPrice(amount);
    return sum + amount;
  }, 0);

  const totalCell = document.querySelector(".order-total-row strong");
  if (totalCell) totalCell.textContent = formatPrice(total);
};

const addSelectedOrderItem = () => {
  const productSelect = document.querySelector("[data-order-product]");
  const qtyInput = document.querySelector("[data-order-qty]");
  if (!productSelect || !qtyInput) return;

  orderItems.push({
    productId: productSelect.value,
    qty: Math.max(1, Number(qtyInput.value) || 1),
  });
  qtyInput.value = "1";
  renderOrderItems();
};

const openOrderForm = (productId) => {
  const modal = document.querySelector(".order-modal");
  const productSelect = document.querySelector("[data-order-product]");
  const qtyInput = document.querySelector("[data-order-qty]");
  if (!modal || !productSelect || !qtyInput) return;

  orderItems = [{ productId, qty: 1 }];
  productSelect.value = productId;
  qtyInput.value = "1";
  renderOrderItems();

  if (typeof modal.showModal === "function") {
    modal.showModal();
  }
};

const buildOrderRequirementText = (form) => {
  const total = orderItems.reduce((sum, item) => {
    const product = findProduct(item.productId);
    return sum + product.price * item.qty;
  }, 0);

  const lines = [
    `Param Automation Product Requirement`,
    `Customer: ${form.name.value}`,
    `Phone: ${form.phone.value}`,
    `Pincode: ${form.pincode.value}`,
    `Address: ${form.address.value}`,
    ``,
    `Selected Items:`,
    ...orderItems.map((item, index) => {
      const product = findProduct(item.productId);
      return `${index + 1}. ${localizedProductValue(product, "name", product.name)} | Model: ${product.model} | Qty: ${item.qty} | Amount: ${formatPrice(product.price * item.qty)}`;
    }),
    ``,
    `Approx Total: ${formatPrice(total)}`,
    `Shipping: ${SHIPPING_NOTE}`,
    `Requirement: ${form.notes.value || "Not provided"}`,
    ``,
    `Note: Please confirm order on call/message. Payment QR will be shared after confirmation.`,
  ];

  return { total, text: lines.join("\n") };
};

document.addEventListener("click", (event) => {
  const buyButton = event.target.closest("[data-buy-product]");
  if (buyButton) openOrderForm(buyButton.dataset.buyProduct);

  const closeButton = event.target.closest("[data-close-order]");
  if (closeButton) document.querySelector(".order-modal")?.close();

  const addButton = event.target.closest("[data-add-order-item]");
  if (addButton) addSelectedOrderItem();

  const removeButton = event.target.closest("[data-remove-item]");
  if (removeButton) {
    orderItems.splice(Number(removeButton.dataset.removeItem), 1);
    renderOrderItems();
  }
});

document.addEventListener("input", (event) => {
  const itemQtyInput = event.target.closest("[data-update-item-qty]");
  if (itemQtyInput) {
    const itemIndex = Number(itemQtyInput.dataset.updateItemQty);
    if (orderItems[itemIndex]) {
      orderItems[itemIndex].qty = Math.max(1, Number(itemQtyInput.value) || 1);
      refreshOrderAmountDisplay();
    }
    return;
  }

  const numericInput = event.target.closest('input[name="phone"], input[name="pincode"]');
  if (!numericInput) return;

  numericInput.value = numericInput.value.replace(/\D/g, "");
});

document.querySelector("[data-order-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!orderItems.length) addSelectedOrderItem();
  const requirement = buildOrderRequirementText(event.currentTarget);
  window.open(`https://wa.me/${getContactPhone()}?text=${encodeURIComponent(requirement.text)}`, "_blank", "noopener");
  document.querySelector(".order-modal")?.close();
});

document.addEventListener("click", (event) => {
  const galleryButton = event.target.closest("[data-gallery-image]");
  if (galleryButton) {
    const mainImage = document.querySelector(".gallery-main img");
    const image = galleryButton.querySelector("img");
    if (!mainImage || !image) return;
    document.querySelectorAll("[data-gallery-image]").forEach((item) => item.classList.remove("is-active"));
    galleryButton.classList.add("is-active");
    mainImage.src = resolveImageSrc(galleryButton.dataset.galleryImage);
    mainImage.alt = image.alt;
    return;
  }

  const detailTab = event.target.closest("[data-detail-tab]");
  if (detailTab) {
    event.preventDefault();
    activateDetailTab(detailTab.dataset.detailTab);
    const product = findProduct(new URLSearchParams(window.location.search).get("id"));
    if (product) applyTableVisibility(product);
    history.replaceState(null, "", detailTab.getAttribute("href"));
    return;
  }

  const shareButton = event.target.closest("[data-share-product]");
  if (shareButton) {
    const product = findProduct(shareButton.dataset.shareProduct || new URLSearchParams(window.location.search).get("id"));
    shareProduct(product);
  }
});

document.querySelector("[data-direct-order-form]")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const quantity = form.quantity.value;
  const unitPrice = STARTER_PRODUCTS[0].price;
  const total = quantity === "5+" ? "Bulk order - confirm on call" : formatPrice(unitPrice * Number(quantity));

  const message = [
    "Param Automation Product Requirement",
    "",
    `Product: ${form.product.value}`,
    `Qty: ${quantity}`,
    `Approx Amount: ${total}`,
    "",
    `Name: ${form.name.value}`,
    `Mobile: ${form.phone.value}`,
    `WhatsApp: ${form.whatsapp.value}`,
    `Email: ${form.email.value || "Not provided"}`,
    `Address: ${form.address.value}`,
    `Village / City: ${form.city.value}`,
    `District: ${form.district.value}`,
    `State: ${form.state.value}`,
    `Pincode: ${form.pincode.value}`,
    `Remarks: ${form.remarks.value || "Not provided"}`,
    "",
    "Please confirm order on call/message. Payment QR will be shared after confirmation.",
  ].join("\n");

  window.open(`https://wa.me/${getContactPhone()}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

renderStarterList();
setupStarterFilters();
renderProductDetail();
renderPdpPage();
fillOrderProductSelect();
loadServerStarterProducts();
