const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";
const ADMIN_SESSION_KEY = "paramAutomationAdminSession";
const ADMIN_DETAIL_IMAGE_DEFAULTS_KEY = "paramAutomationDetailImageDefaults";

const loginPanel = document.querySelector("[data-login-panel]");
const dashboard = document.querySelector("[data-dashboard]");
const loginForm = document.querySelector("[data-admin-login-form]");
const loginButton = document.querySelector("[data-admin-login-button]");
const loginError = document.querySelector("[data-login-error]");
const logoutButtons = document.querySelectorAll("[data-admin-logout]");
const adminSectionTabs = document.querySelectorAll("[data-admin-section-tab]");
const adminSections = document.querySelectorAll("[data-admin-section]");
const productForm = document.querySelector("[data-product-form]");
const productList = document.querySelector("[data-admin-products]");
const productCount = document.querySelector("[data-product-count]");
const productSearch = document.querySelector("[data-product-search]");
const formTitle = document.querySelector("[data-form-title]");
const imagePreviewList = document.querySelector("[data-image-preview-list]");
const uploadStatus = document.querySelector("[data-upload-status]");
const wiringPreviewList = document.querySelector("[data-wiring-preview-list]");
const wiringUploadStatus = document.querySelector("[data-wiring-upload-status]");
const detailImagePreviewLists = document.querySelectorAll("[data-detail-image-preview]");
const coverageMapPreviewList = document.querySelector("[data-coverage-map-preview-list]");
const coverageMapStatus = document.querySelector("[data-coverage-map-status]");
const cataloguePreviewList = document.querySelector("[data-catalogue-preview-list]");
const catalogueStatus = document.querySelector("[data-catalogue-status]");
const billForm = document.querySelector("[data-bill-form]");
const billStatus = document.querySelector("[data-bill-status]");
const billItemsRoot = document.querySelector("[data-bill-items]");
const billTotalsRoot = document.querySelector("[data-bill-totals]");
const billProductTypeSelect = document.querySelector("[data-bill-product-type]");
const billCategorySelect = document.querySelector("[data-bill-category]");
const billProductSelect = document.querySelector("[data-bill-product]");
const quoteForm = document.querySelector("[data-quote-form]");
const quoteStatus = document.querySelector("[data-quote-status]");
const quoteItemsRoot = document.querySelector("[data-quote-items]");
const quoteTotalsRoot = document.querySelector("[data-quote-totals]");
const quoteProductTypeSelect = document.querySelector("[data-quote-product-type]");
const quoteCategorySelect = document.querySelector("[data-quote-category]");
const quoteProductSelect = document.querySelector("[data-quote-product]");
const companyProfileForm = document.querySelector("[data-company-profile-form]");
const companyProfileStatus = document.querySelector("[data-company-profile-status]");
const reloadCompanyProfileButton = document.querySelector("[data-reload-company-profile]");
const saveCompanyProfileButton = document.querySelector("[data-save-company-profile]");
const websiteCategoryRows = document.querySelector("[data-website-category-rows]");
const industryEditorRows = document.querySelector("[data-industry-editor-rows]");
const addWebsiteCategoryButton = document.querySelector("[data-add-website-category]");
const addIndustryButton = document.querySelector("[data-add-industry]");
const mapStateSelect = document.querySelector("[data-map-state]");
const mapDistrictSelect = document.querySelector("[data-map-district]");
const mapCityInput = document.querySelector("[data-map-city]");
const mapAreaList = document.querySelector("[data-map-area-list]");
const addMapAreaButton = document.querySelector("[data-add-map-area]");
const adminResolveImageSrc = (value = "") => window.ParamImageBundle?.resolve?.(value) || value;
const productTypeCategories = {
  "digital-motor-starters": [
    { value: "single-phase", label: "Single Phase" },
    { value: "three-phase", label: "Three Phase" },
    { value: "two-phase", label: "Two Phase" },
    { value: "sensor-remote", label: "Sensor / Remote" },
  ],
  "smart-home-automation": [
    { value: "home-automation", label: "Home Automation" },
    { value: "smart-switch", label: "Smart Switch" },
    { value: "lighting-control", label: "Lighting Control" },
  ],
  "water-purifiers-softeners": [
    { value: "water-purifier", label: "Water Purifier" },
    { value: "water-softener", label: "Water Softener" },
    { value: "ro-system", label: "RO System" },
  ],
  "security-surveillance": [
    { value: "security-camera", label: "Security Camera" },
    { value: "cctv-system", label: "CCTV System" },
    { value: "alarm-system", label: "Alarm System" },
  ],
};

const productImageFolders = {
  "digital-motor-starters": "digital-starters",
  "smart-home-automation": "categories",
  "water-purifiers-softeners": "categories",
  "security-surveillance": "categories",
};
const stateDistrictOptions = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Itanagar", "East Siang", "Lower Subansiri", "Papum Pare", "Tawang", "West Kameng", "West Siang"],
  Assam: ["Baksa", "Barpeta", "Cachar", "Dibrugarh", "Goalpara", "Golaghat", "Jorhat", "Kamrup", "Nagaon", "Sivasagar", "Tinsukia"],
  Bihar: ["Araria", "Bhagalpur", "Darbhanga", "Gaya", "Muzaffarpur", "Patna", "Purnia", "Rohtas", "Samastipur"],
  Chhattisgarh: ["Balod", "Baloda Bazar", "Bastar", "Bilaspur", "Durg", "Janjgir-Champa", "Korba", "Raigarh", "Raipur", "Rajnandgaon", "Surguja"],
  Goa: ["North Goa", "South Goa"],
  Gujarat: ["Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Gandhinagar", "Jamnagar", "Junagadh", "Kachchh", "Rajkot", "Surat", "Vadodara", "Valsad"],
  Haryana: ["Ambala", "Faridabad", "Gurugram", "Hisar", "Karnal", "Panipat", "Rewari", "Rohtak", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kullu", "Mandi", "Shimla", "Solan", "Una"],
  Jharkhand: ["Bokaro", "Dhanbad", "Dumka", "East Singhbhum", "Giridih", "Hazaribagh", "Ranchi", "West Singhbhum"],
  Karnataka: ["Bengaluru Urban", "Belagavi", "Ballari", "Dakshina Kannada", "Dharwad", "Kalaburagi", "Mysuru", "Shivamogga", "Tumakuru", "Udupi"],
  Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Thiruvananthapuram", "Thrissur"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narmadapuram", "Narsinghpur", "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Bhandara", "Chandrapur", "Dhule", "Jalgaon", "Kolhapur", "Mumbai", "Nagpur", "Nanded", "Nashik", "Pune", "Solapur", "Thane", "Wardha"],
  Manipur: ["Bishnupur", "Churachandpur", "Imphal East", "Imphal West", "Thoubal"],
  Meghalaya: ["East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "West Garo Hills"],
  Mizoram: ["Aizawl", "Champhai", "Kolasib", "Lunglei", "Mamit"],
  Nagaland: ["Dimapur", "Kohima", "Mokokchung", "Mon", "Tuensang"],
  Odisha: ["Balasore", "Bhadrak", "Cuttack", "Ganjam", "Khordha", "Puri", "Sambalpur", "Sundargarh"],
  Punjab: ["Amritsar", "Bathinda", "Jalandhar", "Ludhiana", "Patiala", "SAS Nagar"],
  Rajasthan: ["Ajmer", "Alwar", "Bharatpur", "Bikaner", "Jaipur", "Jodhpur", "Kota", "Udaipur"],
  Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Thanjavur", "Tiruchirappalli", "Tirunelveli", "Vellore"],
  Telangana: ["Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahabubnagar", "Nalgonda", "Nizamabad", "Warangal"],
  Tripura: ["Dhalai", "Gomati", "North Tripura", "South Tripura", "West Tripura"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ayodhya", "Bareilly", "Gorakhpur", "Jhansi", "Kanpur Nagar", "Lucknow", "Meerut", "Prayagraj", "Varanasi"],
  Uttarakhand: ["Almora", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Udham Singh Nagar"],
  "West Bengal": ["Darjeeling", "Hooghly", "Howrah", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "South 24 Parganas"],
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  Chandigarh: ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
  Delhi: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "South Delhi", "West Delhi"],
  "Jammu and Kashmir": ["Anantnag", "Baramulla", "Jammu", "Kathua", "Srinagar", "Udhampur"],
  Ladakh: ["Kargil", "Leh"],
  Lakshadweep: ["Lakshadweep"],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
};
const defaultDisplayInstructions = [
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
const detailImageConfigs = [
  {
    key: "displayInstructions",
    title: "Display Instruction Image",
    checkboxName: "showDisplayTable",
    fileName: "displayInstructionImageFile",
    fieldName: "displayInstructionImage",
  },
  {
    key: "singlePhaseChart",
    title: "Single-Phase Ampere Chart Image",
    checkboxName: "showSinglePhaseChart",
    fileName: "singlePhaseChartImageFile",
    fieldName: "singlePhaseChartImage",
  },
  {
    key: "threePhaseChart",
    title: "Three-Phase Chart Image",
    checkboxName: "showThreePhaseChart",
    fileName: "threePhaseChartImageFile",
    fieldName: "threePhaseChartImage",
  },
];
let adminProducts = [];
let selectedProductFiles = [];
let selectedWiringFiles = [];
let selectedDetailImageFiles = {};
let selectedCoverageMapFile = null;
let selectedCatalogueFile = null;
let billItems = [];
let quoteItems = [];
const ADMIN_SERVER_URL = "http://127.0.0.1:4173/admin-login.html";
const BILL_GST_RATE = 0.18;
const getCompanyPhone = () => {
  const digits = String(window.ParamCompanyProfile?.get?.().whatsapp || window.ParamCompanyProfile?.get?.().phone || "918109521547").replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
};

const serverErrorMessage = () =>
  `Failed to fetch because this page is not connected to the local server. Start server.js and open ${ADMIN_SERVER_URL}.`;

const ensureServerPage = () => {
  if (window.location.protocol === "file:") {
    throw new Error(serverErrorMessage());
  }
};

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const listFromTextarea = (value) =>
  value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const specsFromTextarea = (value) =>
  listFromTextarea(value).reduce((specs, line, index) => {
    const separator = line.indexOf(":");
    if (separator === -1) {
      specs[`Specification ${index + 1}`] = line;
      return specs;
    }

    const key = line.slice(0, separator).trim();
    const specValue = line.slice(separator + 1).trim();
    if (key && specValue) specs[key] = specValue;
    return specs;
  }, {});

const textareaFromSpecs = (specs = {}) =>
  Object.entries(specs)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

const getSelectedFeatures = () =>
  Array.from(productForm.querySelectorAll('input[name="features"]:checked')).map((input) => input.value);

const setSelectedFeatures = (features = []) => {
  const selected = new Set(features);
  productForm.querySelectorAll('input[name="features"]').forEach((input) => {
    input.checked = selected.has(input.value);
  });
};

const displayInstructionToParts = (instruction = "") => {
  const separator = instruction.indexOf(":");
  if (separator === -1) return { code: instruction.trim(), text: "" };
  return {
    code: instruction.slice(0, separator).trim(),
    text: instruction.slice(separator + 1).trim(),
  };
};

const escapeInputValue = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const syncDisplayInstructionsInput = () => {
  const rows = productForm.querySelectorAll("[data-display-instruction-row]");
  const instructions = Array.from(rows)
    .map((row) => {
      const code = row.querySelector("[data-display-code]")?.value.trim() || "";
      const text = row.querySelector("[data-display-text]")?.value.trim() || "";
      if (!code && !text) return "";
      return text ? `${code}: ${text}` : code;
    })
    .filter(Boolean);

  productForm.elements.displayInstructions.value = instructions.join("\n");
  return instructions;
};

const renderDisplayInstructionEditor = (instructions = defaultDisplayInstructions) => {
  const body = productForm.querySelector("[data-display-instruction-rows]");
  if (!body) return;

  body.innerHTML = instructions
    .map((instruction) => {
      const { code, text } = displayInstructionToParts(instruction);
      return `
        <tr data-display-instruction-row>
          <td><input type="text" value="${escapeInputValue(code)}" data-display-code /></td>
          <td><input type="text" value="${escapeInputValue(text)}" data-display-text /></td>
          <td><button type="button" data-remove-display-row>Remove</button></td>
        </tr>
      `;
    })
    .join("");
  syncDisplayInstructionsInput();
};

const setDefaultDisplayInstructions = () => {
  renderDisplayInstructionEditor(defaultDisplayInstructions);
};

const getGalleryImagesFromField = () =>
  listFromTextarea((productForm.elements.galleryImages?.value || "").replaceAll("|", "\n")).slice(0, 4);

const setGalleryImagesField = (images = []) => {
  productForm.elements.galleryImages.value = images.filter(Boolean).slice(0, 4).join("|");
};

const getRetainedProductImages = () => getGalleryImagesFromField();

const setRetainedProductImages = (images = []) => {
  setGalleryImagesField(images);
};

const getFileKey = (file) => `${file.name}-${file.size}-${file.lastModified}`;

const addSelectedProductFiles = (files = []) => {
  const retainedCount = getRetainedProductImages().length;
  const slots = Math.max(0, 4 - retainedCount);
  const currentKeys = new Set(selectedProductFiles.map(getFileKey));

  for (const file of files) {
    if (selectedProductFiles.length >= slots) break;
    const key = getFileKey(file);
    if (currentKeys.has(key)) continue;
    selectedProductFiles.push(file);
    currentKeys.add(key);
  }
};

const renderProductImagePreviewList = () => {
  if (!imagePreviewList || !uploadStatus) return;
  const retainedImages = getRetainedProductImages();
  const selectedItems = selectedProductFiles.map((file, index) => ({
    type: "file",
    index,
    src: URL.createObjectURL(file),
    label: file.name,
  }));
  const retainedItems = retainedImages.map((src, index) => ({
    type: "existing",
    index,
    src,
    label: src,
  }));
  const items = [...retainedItems, ...selectedItems].slice(0, 4);

  uploadStatus.textContent = items.length
    ? `${items.length} product image${items.length === 1 ? "" : "s"} ready. First image will be main product image.`
    : "No image selected";

  imagePreviewList.innerHTML = items
    .map(
      (item) => `
        <div class="admin-image-preview-card">
          <img src="${escapeInputValue(item.src)}" alt="${escapeInputValue(item.label)}" />
          <button type="button" data-remove-product-preview="${item.type}" data-preview-index="${item.index}">Remove</button>
        </div>
      `
    )
    .join("");
};

const getRetainedWiringImages = () =>
  listFromTextarea((productForm.elements.wiringImages?.value || "").replaceAll("|", "\n")).slice(0, 2);

const setRetainedWiringImages = (images = []) => {
  const retained = images.filter(Boolean).slice(0, 2);
  productForm.elements.wiringImages.value = retained.join("|");
  productForm.elements.wiringImage.value = retained[0] || "";
};

const addSelectedWiringFiles = (files = []) => {
  const slots = Math.max(0, 2 - getRetainedWiringImages().length);
  const currentKeys = new Set(selectedWiringFiles.map(getFileKey));
  for (const file of files) {
    if (selectedWiringFiles.length >= slots) break;
    const key = getFileKey(file);
    if (currentKeys.has(key)) continue;
    selectedWiringFiles.push(file);
    currentKeys.add(key);
  }
};

const renderWiringImagePreviewList = () => {
  if (!wiringPreviewList || !wiringUploadStatus) return;
  const retainedItems = getRetainedWiringImages().map((src, index) => ({ type: "existing", index, src, label: src }));
  const selectedItems = selectedWiringFiles.map((file, index) => ({ type: "file", index, src: URL.createObjectURL(file), label: file.name }));
  const items = [...retainedItems, ...selectedItems].slice(0, 2);
  wiringUploadStatus.textContent = items.length ? `${items.length} of 2 wiring diagram images ready.` : "No wiring diagram selected";
  wiringPreviewList.innerHTML = items.map((item) => `
    <div class="admin-image-preview-card">
      <img src="${escapeInputValue(item.src)}" alt="${escapeInputValue(item.label)}" />
      <button type="button" data-remove-wiring-preview="${item.type}" data-preview-index="${item.index}">Remove</button>
    </div>`).join("");
};

const getDetailImageConfig = (key) => detailImageConfigs.find((config) => config.key === key);

const getDetailImagesFromFields = () =>
  detailImageConfigs.reduce((images, config) => {
    images[config.key] = productForm.elements[config.fieldName]?.value.trim() || "";
    return images;
  }, {});

const setDetailImagesFields = (images = {}) => {
  detailImageConfigs.forEach((config) => {
    if (productForm.elements[config.fieldName]) {
      productForm.elements[config.fieldName].value = images[config.key] || "";
    }
  });
};

const getRememberedDetailImages = () => {
  try {
    const savedImages = JSON.parse(localStorage.getItem(ADMIN_DETAIL_IMAGE_DEFAULTS_KEY));
    return savedImages && typeof savedImages === "object" ? savedImages : {};
  } catch (error) {
    return {};
  }
};

const rememberDetailImages = (images = {}) => {
  const mergedImages = {
    ...getRememberedDetailImages(),
    ...Object.fromEntries(Object.entries(images).filter(([, image]) => Boolean(image))),
  };
  localStorage.setItem(ADMIN_DETAIL_IMAGE_DEFAULTS_KEY, JSON.stringify(mergedImages));
  return mergedImages;
};

const detailImagesWithRememberedFallback = (images = {}) => ({
  ...getRememberedDetailImages(),
  ...Object.fromEntries(Object.entries(images || {}).filter(([, image]) => Boolean(image))),
});

const setSelectedDetailImageFile = (key, file) => {
  if (!key || !file) return;
  selectedDetailImageFiles = {
    ...selectedDetailImageFiles,
    [key]: file,
  };
};

const renderDetailImagePreviews = () => {
  if (!detailImagePreviewLists.length) return;
  const retainedImages = getDetailImagesFromFields();

  detailImagePreviewLists.forEach((previewList) => {
    const key = previewList.dataset.detailImagePreview;
    const config = getDetailImageConfig(key);
    if (!config) return;
    const selectedFile = selectedDetailImageFiles[key];
    const src = selectedFile ? URL.createObjectURL(selectedFile) : retainedImages[key];
    const label = selectedFile?.name || retainedImages[key] || config.title;

    previewList.innerHTML = src
      ? `
        <div class="admin-image-preview-card">
          <img src="${escapeInputValue(src)}" alt="${escapeInputValue(label)}" />
          <button type="button" data-remove-detail-image="${key}">Remove</button>
        </div>
      `
      : `<p class="admin-empty-state">${config.title} not selected.</p>`;
  });
};

const getCoverageMapImage = () => productForm?.ownerDocument?.querySelector('[name="coverageMapImage"]')?.value?.trim() || companyProfileForm?.elements.coverageMapImage?.value?.trim() || "";

const renderCoverageMapPreview = () => {
  if (!coverageMapPreviewList || !coverageMapStatus || !companyProfileForm?.elements.coverageMapImage) return;
  const src = selectedCoverageMapFile ? URL.createObjectURL(selectedCoverageMapFile) : companyProfileForm.elements.coverageMapImage.value.trim();
  coverageMapStatus.textContent = src ? "Coverage map image ready." : "No coverage map image selected";
  coverageMapPreviewList.innerHTML = src
    ? `
      <div class="admin-image-preview-card admin-image-preview-card--wide">
        <img src="${escapeInputValue(src)}" alt="Coverage map preview" />
        <button type="button" data-remove-coverage-map-preview>Remove</button>
      </div>
    `
    : "";
};

const renderCataloguePreview = () => {
  if (!cataloguePreviewList || !catalogueStatus || !companyProfileForm?.elements.productCataloguePdf) return;
  const pathValue = companyProfileForm.elements.productCataloguePdf.value.trim();
  const label = selectedCatalogueFile?.name || pathValue;
  catalogueStatus.textContent = label ? `Product catalogue ready: ${label}` : "No product catalogue selected";
  cataloguePreviewList.innerHTML = label
    ? `
      <div class="admin-image-preview-card admin-image-preview-card--wide">
        <div class="admin-pdf-preview-card">
          <strong>PDF Catalogue</strong>
          <span>${escapeInputValue(label)}</span>
        </div>
        <button type="button" data-remove-catalogue-preview>Remove</button>
      </div>
    `
    : "";
};

const getAdminTableVisibility = (fields) => ({
  displayInstructions: fields.showDisplayTable.checked,
  singlePhaseChart: fields.showSinglePhaseChart.checked,
  threePhaseChart: fields.showThreePhaseChart.checked,
});

const setAdminTableVisibility = (visibility = {}) => {
  productForm.elements.showDisplayTable.checked = visibility.displayInstructions !== false;
  productForm.elements.showSinglePhaseChart.checked = visibility.singlePhaseChart !== false;
  productForm.elements.showThreePhaseChart.checked = visibility.threePhaseChart !== false;
};

const adminFormatPrice = (value) =>
  typeof formatPrice === "function"
    ? formatPrice(value)
    : new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(value);

const getProducts = () => adminProducts.length ? adminProducts : window.ParamStarterStore?.getProducts?.() || [];

const loadProductsForAdmin = async () => {
  if (window.location.protocol === "file:") return;

  try {
    const response = await fetch("/api/products");
    if (!response.ok) return;
    const result = await response.json();
    if (Array.isArray(result.products)) {
      adminProducts = adminSortProductsForDisplay(result.products);
      window.ParamStarterStore?.setProducts?.(adminProducts);
    }
  } catch (error) {
    if (uploadStatus) uploadStatus.textContent = error.message;
  }
};

const adminCategoryOrder = {
  "single-phase": 1,
  "three-phase": 2,
  "two-phase": 3,
  "sensor-remote": 4,
  sensor: 4,
};

const adminSortProductsForDisplay = (products) =>
  [...products].sort((first, second) => {
    const firstActivity = Number(first.updatedAt || first.createdAt || 0);
    const secondActivity = Number(second.updatedAt || second.createdAt || 0);
    return secondActivity - firstActivity;
  });

const setProducts = async (products) => {
  adminProducts = adminSortProductsForDisplay(products);
  await window.ParamStarterStore.syncProducts(adminProducts);
  renderAdminProducts();
};

const setAdminSection = (section = "products") => {
  adminSections.forEach((panel) => {
    panel.hidden = panel.dataset.adminSection !== section;
  });

  adminSectionTabs.forEach((button) => {
    const isActive = button.dataset.adminSectionTab === section;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  if (section === "billing") {
    renderBillSelectors();
    renderBillItems();
  }

  if (section === "quotation") {
    renderQuoteSelectors();
    renderQuoteItems();
  }

  if (section === "company-profile") loadCompanyProfileForAdmin();
};

const fillCompanyProfileForm = (profile = {}) => {
  if (!companyProfileForm) return;
  Array.from(companyProfileForm.elements).forEach((field) => {
    if (field.name && Object.prototype.hasOwnProperty.call(profile, field.name)) field.value = profile[field.name] || "";
  });
  renderWebsiteCategoryEditor(profile.websiteCategories || []);
  renderIndustryEditor(profile.industries || []);
  renderMapAreaEditor();
  selectedCoverageMapFile = null;
  selectedCatalogueFile = null;
  if (companyProfileForm.elements.productCataloguePdfFile) companyProfileForm.elements.productCataloguePdfFile.value = "";
  renderCoverageMapPreview();
  renderCataloguePreview();
};

const websiteCategoryRowMarkup = (category = {}) => `
  <article class="admin-repeater-row" data-website-category-row>
    <div class="admin-repeater-grid">
      <label>Card / Category Name<input type="text" data-category-name value="${escapeInputValue(category.name || "")}" required /></label>
      <label>Filter Name<input type="text" data-category-filter value="${escapeInputValue(category.filterLabel || "")}" required /></label>
      <label class="admin-repeater-wide">Description<textarea rows="2" data-category-description>${escapeInputValue(category.description || "")}</textarea></label>
      <label>Image Path / URL<input type="text" data-category-image value="${escapeInputValue(category.image || "")}" /></label>
      <label>Open Link<input type="text" data-category-link value="${escapeInputValue(category.link || "#contact")}" /></label>
      <label class="admin-repeater-toggle"><input type="checkbox" data-category-enabled ${category.enabled !== false ? "checked" : ""} /> Show on website</label>
    </div>
    <div class="admin-repeater-actions"><button type="button" data-move-row="up">↑ Up</button><button type="button" data-move-row="down">↓ Down</button><button type="button" data-remove-repeater-row>Remove</button></div>
  </article>`;

const industryRowMarkup = (industry = {}) => `
  <article class="admin-repeater-row" data-industry-editor-row>
    <div class="admin-repeater-grid">
      <label>Industry Name<input type="text" data-industry-name value="${escapeInputValue(industry.name || "")}" required /></label>
      <label>Icon / Symbol<input type="text" data-industry-icon value="${escapeInputValue(industry.icon || "•")}" maxlength="4" /></label>
      <label class="admin-repeater-wide">Website Message<textarea rows="2" data-industry-message>${escapeInputValue(industry.message || "")}</textarea></label>
      <label class="admin-repeater-toggle"><input type="checkbox" data-industry-enabled ${industry.enabled !== false ? "checked" : ""} /> Show on website</label>
    </div>
    <div class="admin-repeater-actions"><button type="button" data-move-row="up">↑ Up</button><button type="button" data-move-row="down">↓ Down</button><button type="button" data-remove-repeater-row>Remove</button></div>
  </article>`;

const renderWebsiteCategoryEditor = (categories = []) => {
  if (websiteCategoryRows) websiteCategoryRows.innerHTML = categories.map(websiteCategoryRowMarkup).join("");
};

const renderIndustryEditor = (industries = []) => {
  if (industryEditorRows) industryEditorRows.innerHTML = industries.map(industryRowMarkup).join("");
};

const parseMapAreas = (value = "") =>
  String(value || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length === 1) return { state: "Madhya Pradesh", district: parts[0], city: "" };
      return {
        state: parts[0] || "Madhya Pradesh",
        district: parts[1] || parts[0] || "",
        city: parts[2] || "",
      };
    })
    .filter((area) => area.district);

const formatMapAreas = (areas = []) =>
  areas
    .filter((area) => area?.district)
    .map((area) => [area.state || "Madhya Pradesh", area.district, area.city || ""].join("|").replace(/\|$/, ""))
    .join("\n");

const getMapAreas = () => parseMapAreas(companyProfileForm?.elements.serviceLocations?.value || "");

const setMapAreas = (areas = []) => {
  if (!companyProfileForm?.elements.serviceLocations) return;
  companyProfileForm.elements.serviceLocations.value = formatMapAreas(areas);
  renderMapAreaEditor();
};

const populateMapStateOptions = () => {
  if (!mapStateSelect) return;
  const selectedState = mapStateSelect.value || "Madhya Pradesh";
  mapStateSelect.innerHTML = Object.keys(stateDistrictOptions)
    .map((state) => `<option value="${escapeInputValue(state)}">${escapeInputValue(state)}</option>`)
    .join("");
  if (stateDistrictOptions[selectedState]) mapStateSelect.value = selectedState;
};

const populateMapDistrictOptions = () => {
  if (!mapDistrictSelect) return;
  const selectedState = mapStateSelect?.value || "Madhya Pradesh";
  const districts = stateDistrictOptions[selectedState] || [];
  const selectedDistrict = mapDistrictSelect.value;
  mapDistrictSelect.innerHTML = districts
    .map((district) => `<option value="${escapeInputValue(district)}">${escapeInputValue(district)}</option>`)
    .join("");
  if (selectedDistrict && districts.includes(selectedDistrict)) mapDistrictSelect.value = selectedDistrict;
};

const renderMapAreaEditor = () => {
  if (!mapAreaList) return;
  const areas = getMapAreas();
  mapAreaList.innerHTML = areas.length
    ? areas.map((area, index) => `
      <span class="admin-map-area-chip">
        <strong>${escapeInputValue(area.district)}</strong>
        <em>${escapeInputValue(area.state || "Madhya Pradesh")}</em>
        ${area.city ? `<small>${escapeInputValue(area.city)}</small>` : ""}
        <button type="button" data-remove-map-area="${index}" aria-label="Remove ${escapeInputValue(area.district)}">×</button>
      </span>
    `).join("")
    : `<p class="admin-empty-state">No highlighted area added yet.</p>`;
};

const addMapArea = () => {
  if (!companyProfileForm?.elements.serviceLocations || !mapDistrictSelect) return;
  const nextArea = {
    state: mapStateSelect?.value || "Madhya Pradesh",
    district: mapDistrictSelect.value,
    city: mapCityInput?.value.trim() || "",
  };
  if (!nextArea.district) return;
  const areas = getMapAreas().filter((area) => `${area.state}|${area.district}|${area.city}` !== `${nextArea.state}|${nextArea.district}|${nextArea.city}`);
  areas.push(nextArea);
  if (mapCityInput) mapCityInput.value = "";
  setMapAreas(areas);
};

const collectWebsiteCategories = () => Array.from(websiteCategoryRows?.querySelectorAll("[data-website-category-row]") || []).map((row) => ({
  name: row.querySelector("[data-category-name]").value.trim(),
  filterLabel: row.querySelector("[data-category-filter]").value.trim(),
  description: row.querySelector("[data-category-description]").value.trim(),
  image: row.querySelector("[data-category-image]").value.trim(),
  link: row.querySelector("[data-category-link]").value.trim() || "#contact",
  enabled: row.querySelector("[data-category-enabled]").checked,
}));

const collectIndustries = () => Array.from(industryEditorRows?.querySelectorAll("[data-industry-editor-row]") || []).map((row) => ({
  name: row.querySelector("[data-industry-name]").value.trim(),
  icon: row.querySelector("[data-industry-icon]").value.trim() || "•",
  message: row.querySelector("[data-industry-message]").value.trim(),
  enabled: row.querySelector("[data-industry-enabled]").checked,
}));

const loadCompanyProfileForAdmin = async () => {
  if (!companyProfileForm) return;
  if (companyProfileStatus) companyProfileStatus.textContent = "Loading...";
  try {
    ensureServerPage();
    const response = await fetch("/api/company-profile", { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load company profile.");
    const data = await response.json();
    fillCompanyProfileForm(data.profile || {});
    window.ParamCompanyProfile?.setProfile?.(data.profile || {}, { persist: false });
    if (companyProfileStatus) companyProfileStatus.textContent = "Saved details loaded";
  } catch (error) {
    fillCompanyProfileForm(window.ParamCompanyProfile?.get?.() || window.PARAM_COMPANY_PROFILE || {});
    if (companyProfileStatus) companyProfileStatus.textContent = error.message;
  }
};

const companyProfileFromForm = () => {
  const currentProfile = window.ParamCompanyProfile?.get?.() || window.PARAM_COMPANY_PROFILE || {};
  const profile = Object.fromEntries(
    Array.from(companyProfileForm?.elements || [])
      .filter((field) => field.name && field.type !== "file")
      .map((field) => [field.name, (field.value || "").trim()])
  );
  profile.coverageMapImage = profile.coverageMapImage || currentProfile.coverageMapImage || "assets/maps/india-professional-map.jpg";
  profile.updatedAt = new Date().toISOString();
  return {
    ...profile,
    websiteCategories: collectWebsiteCategories(),
    industries: collectIndustries(),
  };
};

const saveCompanyProfile = async (event) => {
  event.preventDefault();
  const saveButton = saveCompanyProfileButton || companyProfileForm?.querySelector('button[type="submit"]');
  if (saveButton) saveButton.disabled = true;
  if (companyProfileStatus) companyProfileStatus.textContent = "Saving...";
  let uploadedCataloguePath = "";
  try {
    ensureServerPage();
    uploadedCataloguePath = await uploadProductCataloguePdf();
    await uploadCoverageMapImage();
    const profile = companyProfileFromForm();
    if (uploadedCataloguePath && companyProfileForm?.elements.productCataloguePdf) {
      profile.productCataloguePdf = uploadedCataloguePath;
      companyProfileForm.elements.productCataloguePdf.value = uploadedCataloguePath;
    }
    window.ParamCompanyProfile?.setProfile?.(profile);
    const response = await fetch("/api/company-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not save company profile.");
    window.ParamCompanyProfile?.setProfile?.(data.profile || profile);
    const savedCataloguePath = data.profile?.productCataloguePdf || profile.productCataloguePdf || "";
    if (savedCataloguePath && companyProfileForm?.elements.productCataloguePdf) {
      companyProfileForm.elements.productCataloguePdf.value = savedCataloguePath;
    }
    if (companyProfileStatus) {
      companyProfileStatus.textContent = savedCataloguePath
        ? `Company profile saved successfully. Catalogue saved: ${savedCataloguePath}`
        : "Company profile saved successfully";
    }
  } catch (error) {
    const profile = companyProfileFromForm();
    if (!selectedCoverageMapFile && !selectedCatalogueFile) {
      window.ParamCompanyProfile?.setProfile?.(profile);
    }
    if (companyProfileStatus) {
      companyProfileStatus.textContent = selectedCatalogueFile
        ? `Product catalogue PDF was not uploaded: ${error.message || "Restart server.js, then upload the PDF and save again."}`
        : selectedCoverageMapFile
        ? `Map image was not uploaded: ${error.message || "Restart server.js, then upload the map and save again."}`
        : `Saved in this browser. ${error.message || "Restart server.js to synchronize the website files."}`;
    }
  } finally {
    if (saveButton) saveButton.disabled = false;
  }
};

const setLoggedIn = (isLoggedIn) => {
  if (loginPanel) loginPanel.hidden = isLoggedIn;
  if (dashboard) dashboard.hidden = !isLoggedIn;
  logoutButtons.forEach((button) => {
    button.hidden = !isLoggedIn;
  });
  document.body.classList.remove("admin-auth-pending", "admin-is-login", "admin-is-dashboard");
  document.body.classList.add(isLoggedIn ? "admin-is-dashboard" : "admin-is-login");
  if (isLoggedIn) {
    setAdminSection("products");
    if (productCount) productCount.textContent = "Loading products...";
    if (productList) productList.innerHTML = `<p class="admin-empty-state">Loading existing products...</p>`;
    refreshAdminProductList().catch((error) => {
      if (productList) productList.innerHTML = `<p class="admin-empty-state">${error.message || "Could not load products."}</p>`;
      if (productCount) productCount.textContent = "0 Products";
    });
  } else {
    if (productList) productList.innerHTML = "";
    if (productCount) productCount.textContent = "0 Products";
  }
};

const handleAdminLogin = (event) => {
  event?.preventDefault();
  if (!loginForm) return;
  const isValid =
    loginForm.elements.username?.value.trim() === ADMIN_USERNAME &&
    loginForm.elements.password?.value === ADMIN_PASSWORD;
  if (loginError) loginError.hidden = isValid;

  if (!isValid) return;
  localStorage.setItem(ADMIN_SESSION_KEY, "active");
  setLoggedIn(true);
};

const loadProjectImages = async () => {};

const updateCategoryOptions = (selectedCategory = "") => {
  if (!productForm?.elements.productType || !productForm?.elements.category) return;
  const fields = productForm.elements;
  const categories = productTypeCategories[fields.productType.value] || productTypeCategories["digital-motor-starters"];
  fields.category.innerHTML = categories
    .map((item) => `<option value="${item.value}">${item.label}</option>`)
    .join("");

  if (selectedCategory && categories.some((item) => item.value === selectedCategory)) {
    fields.category.value = selectedCategory;
  }
};

const resetProductForm = () => {
  if (!productForm) return;
  productForm.reset();
  updateCategoryOptions();
  productForm.elements.id.value = "";
  selectedProductFiles = [];
  productForm.elements.image.value = "";
  productForm.elements.nameHi.value = "";
  productForm.elements.unit.value = "Piece";
  productForm.elements.productBadge.value = "";
  productForm.elements.inTheBox.value = "";
  setRetainedProductImages([]);
  selectedWiringFiles = [];
  setRetainedWiringImages([]);
  productForm.elements.technicalSpecs.value = "Voltage: Confirm on call\nFrequency: 50Hz\nMotor Capacity: As per model\nWarranty: 1 Year";
  setSelectedFeatures([]);
  productForm.elements.sopProcedure.value = "Confirm product requirement before installation.";
  productForm.elements.installationInstruction.value = "Installation should be completed by a qualified electrician only.";
  setAdminTableVisibility();
  selectedDetailImageFiles = {};
  setDetailImagesFields(getRememberedDetailImages());
  setDefaultDisplayInstructions();
  productForm.elements.videoIntro.value = "";
  productForm.elements.videoInstallation.value = "";
  productForm.elements.videoSop.value = "";
  productForm.elements.overviewHi.value = "";
  productForm.elements.sopProcedureHi.value = "";
  productForm.elements.installationInstructionHi.value = "";
  renderProductImagePreviewList();
  renderWiringImagePreviewList();
  renderDetailImagePreviews();
  formTitle.textContent = "Add Product";
};

const uploadProductImage = async (form) => {
  ensureServerPage();
  const fields = form.elements;
  const folder = productImageFolders[fields.productType.value] || "categories";
  const productImages = getRetainedProductImages();
  const availableSlots = Math.max(0, 4 - productImages.length);
  const files = selectedProductFiles.slice(0, availableSlots);

  for (const file of files) {
    productImages.push(await uploadFileToProductAssets(file, folder));
  }

  if (!productImages.length) throw new Error("Please upload at least one product image.");
  const finalImages = productImages.slice(0, 4);
  fields.image.value = finalImages[0];
  setRetainedProductImages(finalImages);
  selectedProductFiles = [];
  renderProductImagePreviewList();
  return finalImages;
};

const uploadFileToProductAssets = async (file, folder = "digital-starters") => {
  ensureServerPage();
  const body = new FormData();
  body.append("image", file);
  body.append("folder", folder);

  const response = await fetch("/api/upload-product-image", {
    method: "POST",
    body,
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "File upload failed. Open this page through server.js, then try again.");
  return result.path;
};

const uploadWiringDiagramImages = async (form) => {
  const fields = form.elements;
  const wiringImages = getRetainedWiringImages();
  const folder = productImageFolders[fields.productType.value] || "digital-starters";
  for (const file of selectedWiringFiles.slice(0, Math.max(0, 2 - wiringImages.length))) {
    wiringImages.push(await uploadFileToProductAssets(file, folder));
  }
  setRetainedWiringImages(wiringImages);
  selectedWiringFiles = [];
  fields.wiringImageFile.value = "";
  return wiringImages;
};

const uploadProductDetailImages = async (form) => {
  const fields = form.elements;
  const folder = productImageFolders[fields.productType.value] || "digital-starters";
  const detailImages = getDetailImagesFromFields();

  for (const config of detailImageConfigs) {
    const file = selectedDetailImageFiles[config.key];
    if (!file) continue;
    detailImages[config.key] = await uploadFileToProductAssets(file, folder);
    if (fields[config.fieldName]) fields[config.fieldName].value = detailImages[config.key];
    if (fields[config.fileName]) fields[config.fileName].value = "";
  }

  selectedDetailImageFiles = {};
  setDetailImagesFields(detailImages);
  rememberDetailImages(detailImages);
  renderDetailImagePreviews();
  return detailImages;
};

const uploadCoverageMapImage = async () => {
  if (!selectedCoverageMapFile || !companyProfileForm?.elements.coverageMapImage) return companyProfileForm?.elements.coverageMapImage?.value || "";
  const imagePath = await uploadFileToProductAssets(selectedCoverageMapFile, "maps");
  companyProfileForm.elements.coverageMapImage.value = imagePath;
  selectedCoverageMapFile = null;
  if (companyProfileForm.elements.coverageMapImageFile) companyProfileForm.elements.coverageMapImageFile.value = "";
  renderCoverageMapPreview();
  return imagePath;
};

const uploadProductCataloguePdf = async () => {
  const file = selectedCatalogueFile || companyProfileForm?.elements.productCataloguePdfFile?.files?.[0] || null;
  if (!file || !companyProfileForm?.elements.productCataloguePdf) return companyProfileForm?.elements.productCataloguePdf?.value || "";
  if (!file.name.toLowerCase().endsWith(".pdf")) throw new Error("Only PDF files are allowed for product catalogue.");
  if (catalogueStatus) catalogueStatus.textContent = `Uploading product catalogue: ${file.name}`;
  const pdfPath = await uploadFileToProductAssets(file, "catalogues");
  companyProfileForm.elements.productCataloguePdf.value = pdfPath;
  selectedCatalogueFile = null;
  if (companyProfileForm.elements.productCataloguePdfFile) companyProfileForm.elements.productCataloguePdfFile.value = "";
  renderCataloguePreview();
  return pdfPath;
};

const deleteProductImage = async (imagePath) => {
  if (!imagePath) return;
  ensureServerPage();

  const response = await fetch("/api/delete-product-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path: imagePath }),
  });

  if (!response.ok) {
    throw new Error("Product removed, but image file could not be deleted. Open this page through server.js and try again.");
  }
};

const isProjectProductImage = (imagePath = "") =>
  String(imagePath).replace(/\\/g, "/").startsWith("assets/products/");

const productImagePaths = (product = {}) =>
  [
    ...(product.images || []),
    product.image,
    ...(product.wiringImages || []),
    product.wiringImage,
    ...Object.values(product.detailImages || {}),
  ]
    .filter(Boolean)
    .filter(isProjectProductImage)
    .filter((imagePath, index, images) => images.indexOf(imagePath) === index);

const deleteUnusedProductImages = async (candidateImages = [], products = []) => {
  const referencedImages = new Set(products.flatMap(productImagePaths));
  const unusedImages = candidateImages
    .filter(Boolean)
    .filter(isProjectProductImage)
    .filter((imagePath, index, images) => images.indexOf(imagePath) === index)
    .filter((imagePath) => !referencedImages.has(imagePath));

  for (const imagePath of unusedImages) {
    try {
      await deleteProductImage(imagePath);
      if (uploadStatus) uploadStatus.textContent = `Removed unused image: ${imagePath}`;
    } catch (error) {
      if (uploadStatus) uploadStatus.textContent = error.message;
    }
  }
};

const renderAdminProducts = () => {
  if (!productList || !productCount) return;
  const products = adminSortProductsForDisplay(getProducts());
  const query = productSearch?.value.trim().toLowerCase() || "";
  const filteredProducts = query
    ? products.filter((product) => [product.name, product.model, product.productType, product.category, product.availability, product.productBadge]
        .some((value) => String(value || "").toLowerCase().includes(query)))
    : products;
  productCount.textContent = query
    ? `${filteredProducts.length} of ${products.length} Products`
    : `${products.length} Product${products.length === 1 ? "" : "s"}`;

  if (!products.length) {
    productList.innerHTML = `<p class="admin-empty-state">No products added yet.</p>`;
    return;
  }

  if (!filteredProducts.length) {
    productList.innerHTML = `<p class="admin-empty-state">No products match your search.</p>`;
    return;
  }

  productList.innerHTML = filteredProducts
    .map(
      (product) => `
        <article class="admin-product-row">
          <img src="${adminResolveImageSrc(product.image)}" alt="${product.name}" />
          <div>
            <small>${String(product.category || "").replace("-", " ")} | ${product.availability || ""}${product.productBadge ? ` | ${product.productBadge === "top-rated" ? "Top-Rated" : "Bestseller"}` : ""}</small>
            <h3>${product.name || ""}</h3>
            <p>${product.model || ""} | MRP ${adminFormatPrice(product.mrp || 0)} | Price ${adminFormatPrice(product.price || 0)} / ${product.unit || "Piece"}</p>
          </div>
          <div class="admin-product-row__actions">
            <button type="button" data-edit-product="${product.id}">Edit</button>
            <button type="button" data-remove-product="${product.id}">Remove</button>
          </div>
        </article>
      `
    )
    .join("");
};

const productTypeLabels = {
  "digital-motor-starters": "Digital Motor Starters",
  "smart-home-automation": "Smart Home Automation",
  "water-purifiers-softeners": "Water Purifiers & Softeners",
  "security-surveillance": "Security & Surveillance",
};

const categoryLabel = (value = "") =>
  String(value)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const getProductWarranty = (product = {}) => {
  const warrantyFeature = (product.features || []).find((feature) =>
    /^(1 Year|6 Month|3 Month) Warranty$/i.test(feature)
  );
  if (warrantyFeature) return warrantyFeature;

  const specWarranty = product.specs?.Warranty || product.specs?.warranty || "";
  if (!specWarranty) return "-";
  return /warranty/i.test(specWarranty) ? specWarranty : `${specWarranty} Warranty`;
};

const getAdminProductUnit = (product = {}) => product.unit || "Piece";

const billNumber = () => {
  const now = new Date();
  return `PA-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
};

const quoteNumber = () => {
  const now = new Date();
  return `PA-QT-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
};

const todayValue = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const initBillForm = () => {
  if (!billForm) return;
  billForm.elements.billNumber.value = billNumber();
  billForm.elements.billingDate.value = todayValue();
  renderBillSelectors();
  renderBillItems();
};

const uniqueValues = (items, getter) => [...new Set(items.map(getter).filter(Boolean))];

const renderBillSelectors = () => {
  if (!billForm || !billProductTypeSelect || !billCategorySelect || !billProductSelect) return;
  const products = adminSortProductsForDisplay(getProducts());
  const previousType = billProductTypeSelect.value;
  const previousCategory = billCategorySelect.value;
  const previousProduct = billProductSelect.value;
  const types = uniqueValues(products, (product) => product.productType || "digital-motor-starters");
  billProductTypeSelect.innerHTML = types
    .map((type) => `<option value="${type}">${productTypeLabels[type] || categoryLabel(type)}</option>`)
    .join("");
  if (previousType && types.includes(previousType)) billProductTypeSelect.value = previousType;

  const selectedType = billProductTypeSelect.value || types[0] || "";
  const categoryProducts = products.filter((product) => (product.productType || "digital-motor-starters") === selectedType);
  const categories = uniqueValues(categoryProducts, (product) => product.category);
  billCategorySelect.innerHTML = categories
    .map((category) => `<option value="${category}">${categoryLabel(category)}</option>`)
    .join("");
  if (previousCategory && categories.includes(previousCategory)) billCategorySelect.value = previousCategory;

  const selectedCategory = billCategorySelect.value || categories[0] || "";
  const modelProducts = categoryProducts.filter((product) => product.category === selectedCategory);
  billProductSelect.innerHTML = modelProducts
    .map((product) => `<option value="${product.id}">${product.model} - ${product.name}</option>`)
    .join("");
  if (previousProduct && modelProducts.some((product) => product.id === previousProduct)) {
    billProductSelect.value = previousProduct;
  }

  updateBillRateFromProduct();
};

const updateBillRateFromProduct = () => {
  if (!billForm || !billProductSelect) return;
  const product = getProducts().find((item) => item.id === billProductSelect.value);
  if (product) billForm.elements.billRate.value = product.price || product.mrp || 0;
};

const addBillItem = () => {
  if (!billForm || !billProductSelect?.value) return;
  const product = getProducts().find((item) => item.id === billProductSelect.value);
  if (!product) return;
  const qty = Math.max(1, Number(billForm.elements.billQty.value) || 1);
  const rate = Math.max(0, Number(billForm.elements.billRate.value) || product.price || 0);
  billItems.push({
    productId: product.id,
    productType: product.productType || "digital-motor-starters",
    category: product.category,
    model: product.model,
    name: product.name,
    warranty: getProductWarranty(product),
    unit: getAdminProductUnit(product),
    qty,
    rate,
  });
  billForm.elements.billQty.value = "1";
  updateBillRateFromProduct();
  renderBillItems();
};

const getBillTotals = () => {
  const subtotal = billItems.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const discount = Math.max(0, Number(billForm?.elements.discount.value) || 0);
  const taxable = Math.max(0, subtotal - discount);
  const gst = billForm?.elements.gstMode.value === "with" ? Math.round(taxable * BILL_GST_RATE) : 0;
  const finalAmount = taxable + gst;
  const paidAmount = Math.max(0, Number(billForm?.elements.paidAmount.value) || 0);
  const balanceAmount = Math.max(0, finalAmount - paidAmount);
  return { subtotal, discount, taxable, gst, finalAmount, paidAmount, balanceAmount };
};

const renderBillItems = () => {
  if (!billItemsRoot || !billTotalsRoot) return;
  if (!billItems.length) {
    billItemsRoot.innerHTML = `<p class="admin-empty-state">No bill items added yet.</p>`;
  } else {
    billItemsRoot.innerHTML = `
      <table>
        <thead>
          <tr><th>#</th><th>Type</th><th>Category</th><th>Model</th><th>Product</th><th>Product Warranty</th><th>Unit</th><th>Qty</th><th>Rate</th><th>Amount</th><th></th></tr>
        </thead>
        <tbody>
          ${billItems
            .map(
              (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${productTypeLabels[item.productType] || categoryLabel(item.productType)}</td>
                  <td>${categoryLabel(item.category)}</td>
                  <td>${item.model}</td>
                  <td>${item.name}</td>
                  <td>${item.warranty || "-"}</td>
                  <td>${item.unit || "Piece"}</td>
                  <td><input type="number" min="1" value="${item.qty}" data-bill-qty="${index}" /></td>
                  <td><input type="number" min="0" value="${item.rate}" data-bill-rate="${index}" /></td>
                  <td>${adminFormatPrice(item.qty * item.rate)}</td>
                  <td><button type="button" data-remove-bill-item="${index}">Remove</button></td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  const totals = getBillTotals();
  billTotalsRoot.innerHTML = `
    <span>Subtotal: <strong>${adminFormatPrice(totals.subtotal)}</strong></span>
    <span>Discount: <strong>${adminFormatPrice(totals.discount)}</strong></span>
    <span>GST: <strong>${adminFormatPrice(totals.gst)}</strong></span>
    <span>Final Amount: <strong>${adminFormatPrice(totals.finalAmount)}</strong></span>
    <span>Paid: <strong>${adminFormatPrice(totals.paidAmount)}</strong></span>
    <span>Balance: <strong>${adminFormatPrice(totals.balanceAmount)}</strong></span>
  `;
};

const billData = () => ({
  billNumber: billForm.elements.billNumber.value,
  billingDate: billForm.elements.billingDate.value,
  customerName: billForm.elements.customerName.value.trim(),
  customerPhone: billForm.elements.customerPhone.value.trim(),
  customerGst: billForm.elements.customerGst.value.trim(),
  customerAddress: billForm.elements.customerAddress.value.trim(),
  gstMode: billForm.elements.gstMode.value,
  paidDate: billForm.elements.paidDate.value,
  remarks: billForm.elements.remarks.value.trim(),
  items: [...billItems],
  totals: getBillTotals(),
});

const billRowsHtml = (items) =>
  items
    .map(
      (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${escapeInputValue(productTypeLabels[item.productType] || categoryLabel(item.productType))}</td>
          <td>${escapeInputValue(categoryLabel(item.category))}</td>
          <td>${escapeInputValue(item.model)}</td>
          <td>${escapeInputValue(item.name)}</td>
          <td>${escapeInputValue(item.warranty || "-")}</td>
          <td>${escapeInputValue(item.unit || "Piece")}</td>
          <td>${item.qty}</td>
          <td>${adminFormatPrice(item.rate)}</td>
          <td>${adminFormatPrice(item.qty * item.rate)}</td>
        </tr>
      `
    )
    .join("");

const billWhatsAppUrl = (data) => {
  const lines = [
    "Param Automation Bill",
    `Bill No: ${data.billNumber}`,
    `Billing Date: ${data.billingDate}`,
    `Customer: ${data.customerName}`,
    `Mobile: ${data.customerPhone || "-"}`,
    "",
    "Products:",
    ...data.items.map((item, index) => `${index + 1}. ${item.model} | ${item.name} | Warranty ${item.warranty || "-"} | Unit ${item.unit || "Piece"} | Qty ${item.qty} | Rate ${adminFormatPrice(item.rate)} | Amount ${adminFormatPrice(item.qty * item.rate)}`),
    "",
    `Subtotal: ${adminFormatPrice(data.totals.subtotal)}`,
    `Discount: ${adminFormatPrice(data.totals.discount)}`,
    `GST: ${adminFormatPrice(data.totals.gst)}`,
    `Final Amount: ${adminFormatPrice(data.totals.finalAmount)}`,
    `Paid: ${adminFormatPrice(data.totals.paidAmount)}`,
    `Balance: ${adminFormatPrice(data.totals.balanceAmount)}`,
    "",
    "Please find bill details from Param Automation.",
  ];
  const destinationPhone = data.customerPhone && /^\d{10}$/.test(data.customerPhone)
    ? `91${data.customerPhone}`
    : getCompanyPhone();
  return `https://wa.me/${destinationPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
};

const billDocumentHtml = (data) => `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <base href="${window.location.origin}/" />
      <title>Bill ${escapeInputValue(data.billNumber)}</title>
      <style>
        * { box-sizing: border-box; }
        @page { size: A4; margin: 8mm; }
        body { margin: 0; padding: 16px; color: #111; font-family: Arial, sans-serif; font-size: 11px; }
        .actions { position: sticky; top: 0; z-index: 3; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; padding: 10px; margin: -16px -16px 14px; background: #f4f8f6; border-bottom: 1px solid #d7ded9; }
        .actions button, .actions a { min-height: 38px; display: inline-flex; align-items: center; justify-content: center; padding: 0 14px; color: #fff; background: #064425; border: 0; border-radius: 6px; font: 800 13px Arial, sans-serif; text-decoration: none; cursor: pointer; }
        .bill { width: min(190mm, 100%); margin: 0 auto; border: 1px solid #d7ded9; padding: 7mm; }
        .head { display: grid; grid-template-columns: minmax(0, 1.45fr) minmax(190px, 0.75fr); gap: 14px; border-bottom: 3px solid #064425; padding-bottom: 10px; }
        .brand { display: flex; gap: 10px; align-items: center; min-width: 0; }
        .brand img { width: 92px; max-height: 58px; object-fit: contain; }
        h1, h2, h3, p { margin: 0; }
        h1 { color: #064425; font-size: 22px; }
        h2 { font-size: 17px; }
        h3 { font-size: 12px; }
        .meta { text-align: right; line-height: 1.45; }
        .meta p { white-space: nowrap; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 12px 0; }
        .box { border: 1px solid #dfe8e3; padding: 8px; min-height: 76px; line-height: 1.4; }
        table { width: 100%; table-layout: fixed; border-collapse: collapse; font-size: 9.4px; }
        th, td { border: 1px solid #dfe8e3; padding: 4px; text-align: left; vertical-align: top; overflow-wrap: anywhere; }
        th { background: #f4f8f6; color: #064425; }
        th:nth-child(1), td:nth-child(1) { width: 3%; }
        th:nth-child(2), td:nth-child(2) { width: 10%; }
        th:nth-child(3), td:nth-child(3) { width: 8%; }
        th:nth-child(4), td:nth-child(4) { width: 12%; }
        th:nth-child(5), td:nth-child(5) { width: 22%; }
        th:nth-child(6), td:nth-child(6) { width: 10%; }
        th:nth-child(7), td:nth-child(7) { width: 6%; }
        th:nth-child(8), td:nth-child(8) { width: 5%; }
        th:nth-child(9), td:nth-child(9) { width: 11%; }
        th:nth-child(10), td:nth-child(10) { width: 13%; }
        .totals { width: 300px; margin-left: auto; margin-top: 10px; }
        .totals div { display: flex; justify-content: space-between; gap: 12px; padding: 4px 0; border-bottom: 1px solid #e5ece8; }
        .totals .final { font-size: 14px; font-weight: 800; color: #064425; }
        .footer { display: flex; justify-content: flex-end; gap: 20px; margin-top: 34px; align-items: end; }
        .sign { min-width: 190px; text-align: center; border-top: 1px solid #111; padding-top: 7px; }
        .note { margin-top: 10px; font-size: 10px; line-height: 1.35; color: #333; }
        @media (max-width: 720px) { body { padding: 10px; } .actions { margin: -10px -10px 12px; } .bill { width: 100%; padding: 10px; } .head, .grid { grid-template-columns: 1fr; } .meta { text-align: left; } .meta p { white-space: normal; } }
        @media print { body { padding: 0; } .actions { display: none; } .bill { width: 190mm; max-width: 100%; min-height: 281mm; border: 1px solid #d7ded9; padding: 6mm; } }
      </style>
    </head>
    <body>
      <div class="actions">
        <button type="button" onclick="window.print()">Print / Save PDF</button>
        <button type="button" onclick="shareBillPdfFile()">Share PDF File</button>
        <a href="${escapeInputValue(billWhatsAppUrl(data))}" target="_blank" rel="noopener">Share on WhatsApp</a>
      </div>
      <div class="bill">
        <div class="head">
          <div class="brand">
            <img src="assets/brand/logo.jpg" alt="Param Automation" />
            <div>
              <p>Jhanda Chowk, Gadarwara, Dist:- Narsinghpur, Madhya Pradesh - 487551</p>
              <p>Mobile: +91 8109521547 | Email: Paramsoni57@gmail.com</p>
            </div>
          </div>
          <div class="meta">
            <h2>Tax Invoice / Bill</h2>
            <p><strong>Bill No:</strong> ${escapeInputValue(data.billNumber)}</p>
            <p><strong>Billing Date:</strong> ${escapeInputValue(data.billingDate)}</p>
            <p><strong>GST:</strong> ${data.gstMode === "with" ? "With GST 18%" : "Without GST"}</p>
          </div>
        </div>

        <div class="grid">
          <div class="box">
            <h3>Bill To</h3>
            <p><strong>${escapeInputValue(data.customerName)}</strong></p>
            <p>${escapeInputValue(data.customerAddress).replace(/\n/g, "<br />")}</p>
            <p>Mobile: ${escapeInputValue(data.customerPhone || "-")}</p>
            <p>GSTIN: ${escapeInputValue(data.customerGst || "-")}</p>
          </div>
          <div class="box">
            <h3>Payment</h3>
            <p>Paid Date: ${escapeInputValue(data.paidDate || "-")}</p>
            <p>Remarks: ${escapeInputValue(data.remarks || "-")}</p>
          </div>
        </div>

        <table>
          <thead>
            <tr><th>#</th><th>Product Type</th><th>Category</th><th>Model</th><th>Product</th><th>Product Warranty</th><th>Unit</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>
          </thead>
          <tbody>${billRowsHtml(data.items)}</tbody>
        </table>

        <div class="totals">
          <div><span>Subtotal</span><strong>${adminFormatPrice(data.totals.subtotal)}</strong></div>
          <div><span>Discount</span><strong>${adminFormatPrice(data.totals.discount)}</strong></div>
          <div><span>Taxable Amount</span><strong>${adminFormatPrice(data.totals.taxable)}</strong></div>
          <div><span>GST</span><strong>${adminFormatPrice(data.totals.gst)}</strong></div>
          <div class="final"><span>Final Amount</span><strong>${adminFormatPrice(data.totals.finalAmount)}</strong></div>
          <div><span>Paid Amount</span><strong>${adminFormatPrice(data.totals.paidAmount)}</strong></div>
          <div><span>Balance Amount</span><strong>${adminFormatPrice(data.totals.balanceAmount)}</strong></div>
        </div>

        <p class="note">Warranty, installation, transport, and service terms are applicable as confirmed by Param Automation. This is a computer generated bill prepared from the admin dashboard.</p>

        <div class="footer">
          <div class="sign">Authorized Signature<br />Param Automation</div>
        </div>
      </div>
      <script>
        function billPdfSafe(value) {
          return String(value).replace(/\\\\/g, "\\\\\\\\").replace(/\\(/g, "\\\\(").replace(/\\)/g, "\\\\)").replace(/[^\\x20-\\x7E]/g, "?");
        }
        function billPdfLines() {
          var rawLines = document.querySelector(".bill").innerText.replace(/₹/g, "Rs.").split(/\\n+/);
          var lines = [];
          rawLines.forEach(function(rawLine) {
            var line = rawLine.trim();
            if (!line) return;
            while (line.length > 92) {
              lines.push(line.slice(0, 92));
              line = line.slice(92);
            }
            lines.push(line);
          });
          return lines.slice(0, 62);
        }
        function buildBillPdfBlob() {
          var content = ["BT", "/F1 9 Tf", "42 800 Td", "11 TL"];
          billPdfLines().forEach(function(line, index) {
            content.push((index === 0 ? "" : "T* ") + "(" + billPdfSafe(line) + ") Tj");
          });
          content.push("ET");
          var stream = content.join("\\n");
          var objects = [
            "<< /Type /Catalog /Pages 2 0 R >>",
            "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
            "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
            "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
            "<< /Length " + stream.length + " >>\\nstream\\n" + stream + "\\nendstream"
          ];
          var pdf = "%PDF-1.4\\n";
          var offsets = [0];
          objects.forEach(function(object, index) {
            offsets.push(pdf.length);
            pdf += (index + 1) + " 0 obj\\n" + object + "\\nendobj\\n";
          });
          var xref = pdf.length;
          pdf += "xref\\n0 " + (objects.length + 1) + "\\n0000000000 65535 f \\n";
          offsets.slice(1).forEach(function(offset) {
            pdf += String(offset).padStart(10, "0") + " 00000 n \\n";
          });
          pdf += "trailer\\n<< /Size " + (objects.length + 1) + " /Root 1 0 R >>\\nstartxref\\n" + xref + "\\n%%EOF";
          return new Blob([pdf], { type: "application/pdf" });
        }
        async function shareBillPdfFile() {
          var file = new File([buildBillPdfBlob()], document.title.replace(/[^a-z0-9-]+/gi, "-").replace(/^-|-$/g, "") + ".pdf", { type: "application/pdf" });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: document.title, text: "Param Automation Bill PDF" });
            return;
          }
          alert("PDF file sharing is supported mainly on mobile browsers. Use Print / Save PDF, then attach the saved PDF in WhatsApp.");
        }
        window.addEventListener("load", () => {
          window.focus();
          setTimeout(() => window.print(), 350);
        });
      </script>
    </body>
  </html>
`;

const validateBill = () => {
  if (!billForm) return false;
  if (!billForm.reportValidity()) return false;
  if (!billItems.length) {
    if (billStatus) billStatus.textContent = "Add at least one product.";
    return false;
  }
  return true;
};

const generateBillPdf = () => {
  if (!validateBill()) return;
  const billWindow = window.open("", "_blank");
  if (!billWindow) {
    if (billStatus) billStatus.textContent = "Popup blocked. Allow popup to generate PDF.";
    return;
  }
  billWindow.opener = null;
  billWindow.document.open();
  billWindow.document.write(billDocumentHtml(billData()));
  billWindow.document.close();
  billWindow.focus();
  if (billStatus) billStatus.textContent = "Bill opened. Choose Save as PDF in print dialog.";
};

const shareBillOnWhatsApp = () => {
  if (!validateBill()) return;
  window.open(billWhatsAppUrl(billData()), "_blank", "noopener");
};

const clearBill = () => {
  if (!billForm) return;
  billItems = [];
  billForm.reset();
  billForm.elements.billNumber.value = billNumber();
  billForm.elements.billingDate.value = todayValue();
  renderBillSelectors();
  renderBillItems();
  if (billStatus) billStatus.textContent = "Ready";
};

const initQuoteForm = () => {
  if (!quoteForm) return;
  quoteForm.elements.quoteNumber.value = quoteNumber();
  quoteForm.elements.quoteDate.value = todayValue();
  renderQuoteSelectors();
  renderQuoteItems();
};

const renderQuoteSelectors = () => {
  if (!quoteForm || !quoteProductTypeSelect || !quoteCategorySelect || !quoteProductSelect) return;
  const products = getProducts();
  const previousType = quoteProductTypeSelect.value;
  const previousCategory = quoteCategorySelect.value;
  const previousProduct = quoteProductSelect.value;
  const types = [...new Set(products.map((product) => product.productType || "digital-motor-starters"))];

  quoteProductTypeSelect.innerHTML = types
    .map((type) => `<option value="${type}">${productTypeLabels[type] || categoryLabel(type)}</option>`)
    .join("");
  if (types.includes(previousType)) quoteProductTypeSelect.value = previousType;

  const selectedType = quoteProductTypeSelect.value || types[0] || "";
  const typeProducts = products.filter((product) => (product.productType || "digital-motor-starters") === selectedType);
  const categories = [...new Set(typeProducts.map((product) => product.category))];
  quoteCategorySelect.innerHTML = categories
    .map((category) => `<option value="${category}">${categoryLabel(category)}</option>`)
    .join("");
  if (categories.includes(previousCategory)) quoteCategorySelect.value = previousCategory;

  const selectedCategory = quoteCategorySelect.value || categories[0] || "";
  const categoryProducts = typeProducts.filter((product) => product.category === selectedCategory);
  quoteProductSelect.innerHTML = categoryProducts
    .map((product) => `<option value="${product.id}">${product.model} - ${product.name}</option>`)
    .join("");
  if (categoryProducts.some((product) => product.id === previousProduct)) quoteProductSelect.value = previousProduct;
  updateQuotePricesFromProduct();
};

const updateQuotePricesFromProduct = () => {
  if (!quoteForm || !quoteProductSelect) return;
  const product = getProducts().find((item) => item.id === quoteProductSelect.value);
  if (!product) return;
  quoteForm.elements.quoteMrp.value = product.mrp || 0;
  quoteForm.elements.quoteWholesaleRate.value = product.price || product.mrp || 0;
};

const addQuoteItem = () => {
  if (!quoteForm || !quoteProductSelect?.value) return;
  const product = getProducts().find((item) => item.id === quoteProductSelect.value);
  if (!product) return;
  quoteItems.push({
    productId: product.id,
    productType: product.productType || "digital-motor-starters",
    category: product.category,
    model: product.model,
    name: product.name,
    warranty: getProductWarranty(product),
    unit: getAdminProductUnit(product),
    qty: Math.max(1, Number(quoteForm.elements.quoteQty.value) || 1),
    mrp: Math.max(0, Number(quoteForm.elements.quoteMrp.value) || product.mrp || 0),
    wholesaleRate: Math.max(0, Number(quoteForm.elements.quoteWholesaleRate.value) || product.price || 0),
  });
  quoteForm.elements.quoteQty.value = "1";
  updateQuotePricesFromProduct();
  renderQuoteItems();
};

const quoteDiscountPercent = (item) => item.mrp > 0
  ? Math.max(0, Math.round(((item.mrp - item.wholesaleRate) / item.mrp) * 10000) / 100)
  : 0;

const getQuoteTotals = () => {
  const totalMrp = quoteItems.reduce((sum, item) => sum + item.qty * item.mrp, 0);
  const wholesaleTotal = quoteItems.reduce((sum, item) => sum + item.qty * item.wholesaleRate, 0);
  const totalSavings = Math.max(0, totalMrp - wholesaleTotal);
  const discountPercent = totalMrp > 0 ? Math.round((totalSavings / totalMrp) * 10000) / 100 : 0;
  return { totalMrp, wholesaleTotal, totalSavings, discountPercent };
};

const renderQuoteItems = () => {
  if (!quoteItemsRoot || !quoteTotalsRoot) return;
  if (!quoteItems.length) {
    quoteItemsRoot.innerHTML = `<p class="admin-empty-state">No quotation items added yet.</p>`;
  } else {
    quoteItemsRoot.innerHTML = `
      <table>
        <thead><tr><th>#</th><th>Model</th><th>Product</th><th>Warranty</th><th>Unit</th><th>Qty</th><th>MRP</th><th>Wholesale Price</th><th>Discount</th><th>Amount</th><th></th></tr></thead>
        <tbody>${quoteItems.map((item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${escapeInputValue(item.model)}</td>
            <td>${escapeInputValue(item.name)}</td>
            <td>${escapeInputValue(item.warranty || "-")}</td>
            <td>${escapeInputValue(item.unit || "Piece")}</td>
            <td><input type="number" min="1" value="${item.qty}" data-quote-qty="${index}" /></td>
            <td><input type="number" min="0" value="${item.mrp}" data-quote-mrp="${index}" /></td>
            <td><input type="number" min="0" value="${item.wholesaleRate}" data-quote-rate="${index}" /></td>
            <td>${quoteDiscountPercent(item)}%</td>
            <td>${adminFormatPrice(item.qty * item.wholesaleRate)}</td>
            <td><button type="button" data-remove-quote-item="${index}">Remove</button></td>
          </tr>`).join("")}</tbody>
      </table>`;
  }
  const totals = getQuoteTotals();
  quoteTotalsRoot.innerHTML = `
    <span>Total MRP: <strong>${adminFormatPrice(totals.totalMrp)}</strong></span>
    <span>Wholesale Total: <strong>${adminFormatPrice(totals.wholesaleTotal)}</strong></span>
    <span>Dealer Savings: <strong>${adminFormatPrice(totals.totalSavings)}</strong></span>
    <span>Overall Discount: <strong>${totals.discountPercent}%</strong></span>`;
};

const quoteData = () => ({
  quoteNumber: quoteForm.elements.quoteNumber.value,
  quoteDate: quoteForm.elements.quoteDate.value,
  dealerName: quoteForm.elements.dealerName.value.trim(),
  dealerPhone: quoteForm.elements.dealerPhone.value.trim(),
  dealerAddress: quoteForm.elements.dealerAddress.value.trim(),
  items: [...quoteItems],
  totals: getQuoteTotals(),
});

const quoteWhatsAppUrl = (data) => {
  const lines = [
    "Param Automation Wholesale Estimate Quotation",
    `Quotation No: ${data.quoteNumber}`,
    `Date: ${data.quoteDate}`,
    `Dealer: ${data.dealerName}`,
    "",
    ...data.items.map((item, index) => `${index + 1}. ${item.model} | ${item.name} | Unit ${item.unit || "Piece"} | Qty ${item.qty} | MRP ${adminFormatPrice(item.mrp)} | Wholesale ${adminFormatPrice(item.wholesaleRate)} | Discount ${quoteDiscountPercent(item)}% | Amount ${adminFormatPrice(item.qty * item.wholesaleRate)}`),
    "",
    `Total MRP: ${adminFormatPrice(data.totals.totalMrp)}`,
    `Wholesale Total: ${adminFormatPrice(data.totals.wholesaleTotal)}`,
    `Dealer Savings: ${adminFormatPrice(data.totals.totalSavings)} (${data.totals.discountPercent}%)`,
    "Prices are estimates and may vary with quantity, taxes, transport, and market conditions.",
  ];
  const phone = /^\d{10}$/.test(data.dealerPhone) ? `91${data.dealerPhone}` : getCompanyPhone();
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
};

const quoteRowsHtml = (items) => items.map((item, index) => `
  <tr>
    <td>${index + 1}</td><td>${escapeInputValue(item.model)}</td><td>${escapeInputValue(item.name)}</td>
    <td>${escapeInputValue(item.unit || "Piece")}</td><td>${item.qty}</td>
    <td>${adminFormatPrice(item.mrp)}</td><td>${adminFormatPrice(item.wholesaleRate)}</td>
    <td>${quoteDiscountPercent(item)}%</td><td>${adminFormatPrice(item.qty * item.wholesaleRate)}</td>
  </tr>`).join("");

const quoteDocumentHtml = (data) => `<!doctype html><html><head><meta charset="utf-8" />
  <base href="${window.location.origin}/" /><title>Quotation ${escapeInputValue(data.quoteNumber)}</title>
  <style>
    *{box-sizing:border-box}@page{size:A4;margin:8mm}body{margin:0;padding:16px;color:#111;font:11px Arial,sans-serif}.actions{display:flex;justify-content:center;gap:10px;margin-bottom:14px}.actions button,.actions a{padding:10px 14px;border:0;border-radius:6px;background:#064425;color:#fff;font-weight:800;text-decoration:none;cursor:pointer}.quote{width:min(190mm,100%);margin:auto;border:1px solid #d7ded9;padding:7mm}.head{display:grid;grid-template-columns:1.4fr .8fr;gap:14px;border-bottom:3px solid #064425;padding-bottom:10px}.brand{display:flex;align-items:center;gap:10px}.brand img{width:92px;max-height:58px;object-fit:contain}h2,h3,p{margin:0}.meta{text-align:right;line-height:1.5}.dealer{margin:12px 0;padding:9px;border:1px solid #dfe8e3;line-height:1.4}table{width:100%;table-layout:fixed;border-collapse:collapse;font-size:9px}th,td{border:1px solid #dfe8e3;padding:4px;text-align:left;vertical-align:top;overflow-wrap:anywhere}th{background:#f4f8f6;color:#064425}.totals{width:310px;margin:12px 0 0 auto}.totals div{display:flex;justify-content:space-between;padding:4px;border-bottom:1px solid #ddd}.final{font-size:14px;color:#064425}.note{margin-top:16px;line-height:1.45}.sign{width:190px;margin:38px 0 0 auto;border-top:1px solid #111;padding-top:7px;text-align:center}@media print{body{padding:0}.actions{display:none}.quote{width:190mm;max-width:100%;min-height:281mm;padding:6mm}}
  </style></head><body><div class="actions"><button onclick="window.print()">Print / Save PDF</button><a href="${escapeInputValue(quoteWhatsAppUrl(data))}" target="_blank">Share To Dealer WhatsApp</a></div>
  <main class="quote"><div class="head"><div class="brand"><img src="assets/brand/logo.jpg" alt="Param Automation"/><div><p>Jhanda Chowk, Gadarwara, Dist:- Narsinghpur, Madhya Pradesh - 487551</p><p>Mobile: +91 8109521547 | Email: Paramsoni57@gmail.com</p></div></div><div class="meta"><h2>Estimate Quotation</h2><p><strong>No:</strong> ${escapeInputValue(data.quoteNumber)}</p><p><strong>Date:</strong> ${escapeInputValue(data.quoteDate)}</p></div></div>
  <div class="dealer"><h3>Quotation To</h3><p><strong>${escapeInputValue(data.dealerName)}</strong></p><p>${escapeInputValue(data.dealerAddress).replace(/\n/g,"<br />")}</p><p>Mobile: ${escapeInputValue(data.dealerPhone || "-")}</p></div>
  <table><thead><tr><th>#</th><th>Model</th><th>Product</th><th>Unit</th><th>Qty</th><th>MRP</th><th>Wholesale Price</th><th>Discount</th><th>Amount</th></tr></thead><tbody>${quoteRowsHtml(data.items)}</tbody></table>
  <div class="totals"><div><span>Total MRP</span><strong>${adminFormatPrice(data.totals.totalMrp)}</strong></div><div><span>Dealer Savings</span><strong>${adminFormatPrice(data.totals.totalSavings)}</strong></div><div><span>Overall Discount</span><strong>${data.totals.discountPercent}%</strong></div><div class="final"><span>Wholesale Total</span><strong>${adminFormatPrice(data.totals.wholesaleTotal)}</strong></div></div>
  <p class="note"><strong>Estimate terms:</strong> Prices are estimates and may vary with order quantity, applicable taxes, transport charges, product availability, and market conditions. Final rates will be confirmed when the order is placed.</p><div class="sign">Authorized Signature<br/>Param Automation</div></main>
  <script>window.addEventListener("load",()=>{window.focus();setTimeout(()=>window.print(),350)});<\/script></body></html>`;

const validateQuote = () => {
  if (!quoteForm?.reportValidity()) return false;
  if (!quoteItems.length) {
    if (quoteStatus) quoteStatus.textContent = "Add at least one product.";
    return false;
  }
  return true;
};

const generateQuotePdf = () => {
  if (!validateQuote()) return;
  const popup = window.open("", "_blank");
  if (!popup) {
    if (quoteStatus) quoteStatus.textContent = "Popup blocked. Allow popup to generate quotation.";
    return;
  }
  popup.opener = null;
  popup.document.open();
  popup.document.write(quoteDocumentHtml(quoteData()));
  popup.document.close();
  popup.focus();
  if (quoteStatus) quoteStatus.textContent = "Quotation opened for PDF or print.";
};

const shareQuoteOnWhatsApp = () => {
  if (!validateQuote()) return;
  window.open(quoteWhatsAppUrl(quoteData()), "_blank", "noopener");
};

const clearQuote = () => {
  if (!quoteForm) return;
  quoteItems = [];
  quoteForm.reset();
  quoteForm.elements.quoteNumber.value = quoteNumber();
  quoteForm.elements.quoteDate.value = todayValue();
  renderQuoteSelectors();
  renderQuoteItems();
  if (quoteStatus) quoteStatus.textContent = "Ready";
};

const refreshAdminProductList = async () => {
  try {
    await loadProductsForAdmin();
    renderAdminProducts();
    renderBillSelectors();
    renderQuoteSelectors();
  } catch (error) {
    if (productList) productList.innerHTML = `<p class="admin-empty-state">${error.message || "Could not load products."}</p>`;
    if (productCount) productCount.textContent = "0 Products";
  }
};

window.refreshAdminProductList = refreshAdminProductList;
window.openAdminDashboardFallback = handleAdminLogin;

loginForm?.addEventListener("submit", handleAdminLogin);

const productFromForm = (form) => {
  const fields = form.elements;
  const products = getProducts();
  const latestActivity = products.reduce(
    (latest, product) => Math.max(latest, Number(product.updatedAt || 0), Number(product.createdAt || 0)),
    0
  );
  const existing = products.find((product) => product.id === fields.id.value);
  const existingProduct = { ...(existing || {}) };
  delete existingProduct.errorCodes;
  const id = fields.id.value || `${slugify(fields.name.value)}-${Date.now()}`;
  const features = getSelectedFeatures();
  const overview = fields.overview.value.trim();
  const nameHi = fields.nameHi?.value.trim() || "";
  const overviewHi = fields.overviewHi?.value.trim() || "";
  const specs = specsFromTextarea(fields.technicalSpecs.value);
  const sop = listFromTextarea(fields.sopProcedure.value);
  const sopHi = listFromTextarea(fields.sopProcedureHi?.value || "");
  const installation = listFromTextarea(fields.installationInstruction.value);
  const installationHi = listFromTextarea(fields.installationInstructionHi?.value || "");
  const inTheBox = listFromTextarea(fields.inTheBox.value);
  const displayInstructions = syncDisplayInstructionsInput();
  const productImages = getRetainedProductImages();
  const detailImages = getDetailImagesFromFields();
  const createdAt = existing?.createdAt || Date.now();
  const hiTranslation = {
    ...(existing?.translations?.hi || {}),
    ...(nameHi ? { name: nameHi } : {}),
    ...(overviewHi ? { short: overviewHi, fullAbout: overviewHi, details: [overviewHi] } : {}),
    ...(sopHi.length ? { sop: sopHi } : {}),
    ...(installationHi.length ? { installation: installationHi } : {}),
  };

  return {
    ...existingProduct,
    id,
    createdAt,
    updatedAt: Math.max(Date.now(), latestActivity + 1),
    code: fields.model.value.trim(),
    model: fields.model.value.trim(),
    productType: fields.productType.value,
    category: fields.category.value,
    name: fields.name.value.trim(),
    availability: fields.availability.value,
    productBadge: fields.productBadge.value,
    unit: fields.unit.value,
    image: fields.image.value.trim(),
    images: productImages.length ? productImages : [fields.image.value.trim()].filter(Boolean),
    wiringImage: fields.wiringImage.value.trim(),
    wiringImages: getRetainedWiringImages(),
    detailImages,
    tableVisibility: getAdminTableVisibility(fields),
    mrp: Number(fields.mrp.value) || 0,
    price: Number(fields.price.value) || 0,
    offer: existing?.offer || "Order confirmation and payment QR will be shared after call or message.",
    short: overview,
    fullAbout: overview,
    translations: {
      ...(existing?.translations || {}),
      ...(Object.keys(hiTranslation).length ? { hi: hiTranslation } : {}),
    },
    features,
    topFeatures: features,
    specs: Object.keys(specs).length ? specs : existing?.specs || {
      Voltage: "Confirm on call",
      Frequency: "50Hz",
      "Motor Capacity": "As per model",
      Warranty: "1 Year",
    },
    details: [overview],
    inTheBox,
    sop: sop.length ? sop : existing?.sop || ["Confirm product requirement before installation."],
    installation: installation.length ? installation : existing?.installation || ["Installation should be completed by a qualified electrician only."],
    displayInstructions: displayInstructions.length ? displayInstructions : defaultDisplayInstructions,
    videos: {
      intro: fields.videoIntro.value.trim(),
      installation: fields.videoInstallation.value.trim(),
      sop: fields.videoSop.value.trim(),
    },
    offers: existing?.offers || ["Free WhatsApp technical support", "1 year warranty"],
  };
};

const editProduct = (id) => {
  const product = getProducts().find((item) => item.id === id);
  if (!product) return;
  const fields = productForm.elements;

  fields.id.value = product.id;
  fields.name.value = product.name;
  fields.nameHi.value = product.translations?.hi?.name || "";
  fields.model.value = product.model;
  fields.productType.value = product.productType || (["single-phase", "two-phase", "three-phase", "sensor", "sensor-remote"].includes(product.category) ? "digital-motor-starters" : "smart-home-automation");
  updateCategoryOptions(product.category);
  fields.category.value = product.category;
  fields.mrp.value = product.mrp;
  fields.price.value = product.price;
  fields.unit.value = product.unit || "Piece";
  fields.availability.value = product.availability;
  fields.productBadge.value = product.productBadge || "";
  fields.image.value = product.image;
  selectedProductFiles = [];
  setRetainedProductImages((product.images?.length ? product.images : [product.image]).filter(Boolean).slice(0, 4));
  selectedWiringFiles = [];
  setRetainedWiringImages((product.wiringImages?.length ? product.wiringImages : [product.wiringImage]).filter(Boolean).slice(0, 2));
  selectedDetailImageFiles = {};
  setDetailImagesFields(detailImagesWithRememberedFallback(product.detailImages || {}));
  setAdminTableVisibility(product.tableVisibility);
  fields.overview.value = product.fullAbout || product.short || "";
  fields.overviewHi.value = product.translations?.hi?.fullAbout || product.translations?.hi?.short || "";
  fields.technicalSpecs.value = textareaFromSpecs(product.specs);
  fields.inTheBox.value = (product.inTheBox || []).join("\n");
  setSelectedFeatures(product.features || []);
  fields.sopProcedure.value = (product.sop || []).join("\n");
  fields.sopProcedureHi.value = (product.translations?.hi?.sop || []).join("\n");
  fields.installationInstruction.value = (product.installation || []).join("\n");
  fields.installationInstructionHi.value = (product.translations?.hi?.installation || []).join("\n");
  renderDisplayInstructionEditor(product.displayInstructions?.length ? product.displayInstructions : defaultDisplayInstructions);
  fields.videoIntro.value = product.videos?.intro || "";
  fields.videoInstallation.value = product.videos?.installation || "";
  fields.videoSop.value = product.videos?.sop || "";
  renderProductImagePreviewList();
  renderWiringImagePreviewList();
  renderDetailImagePreviews();
  formTitle.textContent = "Edit Product";
  productForm.scrollIntoView({ behavior: "smooth", block: "start" });
};

logoutButtons.forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    resetProductForm();
    loginForm.reset();
    setLoggedIn(false);
    window.location.assign("index.html#top");
  });
});

productForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const saveButton = form.querySelector('button[type="submit"]');
  if (saveButton) saveButton.disabled = true;
  if (uploadStatus) uploadStatus.textContent = "Saving product image...";

  try {
    await uploadProductImage(form);
    await uploadWiringDiagramImages(form);
    await uploadProductDetailImages(form);
  } catch (error) {
    if (uploadStatus) uploadStatus.textContent = error.message;
    if (saveButton) saveButton.disabled = false;
    return;
  }

  const nextProduct = productFromForm(form);
  const products = getProducts();
  const existingIndex = products.findIndex((product) => product.id === nextProduct.id);
  const previousProductImages = existingIndex >= 0 ? productImagePaths(products[existingIndex]) : [];

  if (existingIndex >= 0) {
    products[existingIndex] = nextProduct;
  } else {
    products.unshift(nextProduct);
  }

  try {
    if (productSearch) productSearch.value = "";
    await setProducts(products);
  } catch (error) {
    if (uploadStatus) uploadStatus.textContent = error.message;
    if (saveButton) saveButton.disabled = false;
    return;
  }

  await deleteUnusedProductImages(previousProductImages, products);
  resetProductForm();
  if (saveButton) saveButton.disabled = false;
});

productForm?.elements.imageFile?.addEventListener("change", (event) => {
  addSelectedProductFiles(Array.from(event.currentTarget.files || []));
  event.currentTarget.value = "";
  renderProductImagePreviewList();
});

productForm?.elements.wiringImageFile?.addEventListener("change", (event) => {
  addSelectedWiringFiles(Array.from(event.currentTarget.files || []));
  event.currentTarget.value = "";
  renderWiringImagePreviewList();
});

detailImageConfigs.forEach((config) => {
  productForm?.elements[config.fileName]?.addEventListener("change", (event) => {
    const file = event.currentTarget.files?.[0];
    if (file) setSelectedDetailImageFile(config.key, file);
    event.currentTarget.value = "";
    renderDetailImagePreviews();
  });
});

productForm?.elements.productType?.addEventListener("change", () => {
  updateCategoryOptions();
});

productSearch?.addEventListener("input", renderAdminProducts);

companyProfileForm?.addEventListener("submit", saveCompanyProfile);
saveCompanyProfileButton?.addEventListener("click", (event) => {
  saveCompanyProfile(event);
});
reloadCompanyProfileButton?.addEventListener("click", loadCompanyProfileForAdmin);
addWebsiteCategoryButton?.addEventListener("click", () => {
  websiteCategoryRows?.insertAdjacentHTML("beforeend", websiteCategoryRowMarkup({ enabled: true, link: "contact.html" }));
});
addIndustryButton?.addEventListener("click", () => {
  industryEditorRows?.insertAdjacentHTML("beforeend", industryRowMarkup({ enabled: true, icon: "•" }));
});
populateMapStateOptions();
populateMapDistrictOptions();
renderMapAreaEditor();
mapStateSelect?.addEventListener("change", populateMapDistrictOptions);
addMapAreaButton?.addEventListener("click", addMapArea);
companyProfileForm?.elements.productCataloguePdfFile?.addEventListener("change", (event) => {
  selectedCatalogueFile = event.currentTarget.files?.[0] || null;
  renderCataloguePreview();
});
companyProfileForm?.elements.productCataloguePdf?.addEventListener("input", () => {
  selectedCatalogueFile = null;
  renderCataloguePreview();
});
companyProfileForm?.elements.coverageMapImageFile?.addEventListener("change", (event) => {
  selectedCoverageMapFile = event.currentTarget.files?.[0] || null;
  renderCoverageMapPreview();
});
companyProfileForm?.elements.coverageMapImage?.addEventListener("input", () => {
  selectedCoverageMapFile = null;
  renderCoverageMapPreview();
});
companyProfileForm?.addEventListener("click", (event) => {
  if (event.target.closest("[data-remove-catalogue-preview]")) {
    selectedCatalogueFile = null;
    if (companyProfileForm.elements.productCataloguePdfFile) companyProfileForm.elements.productCataloguePdfFile.value = "";
    if (companyProfileForm.elements.productCataloguePdf) companyProfileForm.elements.productCataloguePdf.value = "";
    renderCataloguePreview();
    return;
  }

  if (event.target.closest("[data-remove-coverage-map-preview]")) {
    selectedCoverageMapFile = null;
    if (companyProfileForm.elements.coverageMapImageFile) companyProfileForm.elements.coverageMapImageFile.value = "";
    if (companyProfileForm.elements.coverageMapImage) companyProfileForm.elements.coverageMapImage.value = "";
    renderCoverageMapPreview();
    return;
  }

  const mapRemoveButton = event.target.closest("[data-remove-map-area]");
  if (mapRemoveButton) {
    const areas = getMapAreas();
    areas.splice(Number(mapRemoveButton.dataset.removeMapArea), 1);
    setMapAreas(areas);
    return;
  }

  const removeButton = event.target.closest("[data-remove-repeater-row]");
  if (removeButton) {
    removeButton.closest(".admin-repeater-row")?.remove();
    return;
  }
  const moveButton = event.target.closest("[data-move-row]");
  if (!moveButton) return;
  const row = moveButton.closest(".admin-repeater-row");
  if (moveButton.dataset.moveRow === "up" && row?.previousElementSibling) row.parentElement.insertBefore(row, row.previousElementSibling);
  if (moveButton.dataset.moveRow === "down" && row?.nextElementSibling) row.parentElement.insertBefore(row.nextElementSibling, row);
});

billProductTypeSelect?.addEventListener("change", renderBillSelectors);
billCategorySelect?.addEventListener("change", renderBillSelectors);
billProductSelect?.addEventListener("change", updateBillRateFromProduct);
quoteProductTypeSelect?.addEventListener("change", renderQuoteSelectors);
quoteCategorySelect?.addEventListener("change", renderQuoteSelectors);
quoteProductSelect?.addEventListener("change", updateQuotePricesFromProduct);

billForm?.addEventListener("input", (event) => {
  const qtyInput = event.target.closest("[data-bill-qty]");
  if (qtyInput) {
    const index = Number(qtyInput.dataset.billQty);
    if (billItems[index]) billItems[index].qty = Math.max(1, Number(qtyInput.value) || 1);
    renderBillItems();
    return;
  }

  const rateInput = event.target.closest("[data-bill-rate]");
  if (rateInput) {
    const index = Number(rateInput.dataset.billRate);
    if (billItems[index]) billItems[index].rate = Math.max(0, Number(rateInput.value) || 0);
    renderBillItems();
    return;
  }

  if (event.target.matches('input[name="discount"], input[name="paidAmount"], select[name="gstMode"]')) {
    renderBillItems();
  }
});

billForm?.addEventListener("change", (event) => {
  if (event.target.matches('select[name="gstMode"], input[name="paidDate"], input[name="billingDate"]')) {
    renderBillItems();
  }
});

quoteForm?.addEventListener("input", (event) => {
  const qtyInput = event.target.closest("[data-quote-qty]");
  const mrpInput = event.target.closest("[data-quote-mrp]");
  const rateInput = event.target.closest("[data-quote-rate]");
  if (qtyInput && quoteItems[Number(qtyInput.dataset.quoteQty)]) {
    quoteItems[Number(qtyInput.dataset.quoteQty)].qty = Math.max(1, Number(qtyInput.value) || 1);
  } else if (mrpInput && quoteItems[Number(mrpInput.dataset.quoteMrp)]) {
    quoteItems[Number(mrpInput.dataset.quoteMrp)].mrp = Math.max(0, Number(mrpInput.value) || 0);
  } else if (rateInput && quoteItems[Number(rateInput.dataset.quoteRate)]) {
    quoteItems[Number(rateInput.dataset.quoteRate)].wholesaleRate = Math.max(0, Number(rateInput.value) || 0);
  } else {
    return;
  }
  renderQuoteItems();
});

document.addEventListener("click", async (event) => {
  const sectionButton = event.target.closest("[data-admin-section-tab]");
  if (sectionButton) {
    setAdminSection(sectionButton.dataset.adminSectionTab);
    return;
  }

  const previewRemoveButton = event.target.closest("[data-remove-product-preview]");
  if (previewRemoveButton) {
    const index = Number(previewRemoveButton.dataset.previewIndex);
    if (previewRemoveButton.dataset.removeProductPreview === "existing") {
      const images = getRetainedProductImages();
      images.splice(index, 1);
      setRetainedProductImages(images);
      productForm.elements.image.value = images[0] || "";
    } else {
      selectedProductFiles.splice(index, 1);
      productForm.elements.imageFile.value = "";
    }
    renderProductImagePreviewList();
    return;
  }

  const wiringPreviewRemoveButton = event.target.closest("[data-remove-wiring-preview]");
  if (wiringPreviewRemoveButton) {
    const index = Number(wiringPreviewRemoveButton.dataset.previewIndex);
    if (wiringPreviewRemoveButton.dataset.removeWiringPreview === "existing") {
      const images = getRetainedWiringImages();
      images.splice(index, 1);
      setRetainedWiringImages(images);
    } else {
      selectedWiringFiles.splice(index, 1);
      productForm.elements.wiringImageFile.value = "";
    }
    renderWiringImagePreviewList();
    return;
  }

  const detailImageRemoveButton = event.target.closest("[data-remove-detail-image]");
  if (detailImageRemoveButton) {
    const key = detailImageRemoveButton.dataset.removeDetailImage;
    const config = getDetailImageConfig(key);
    if (config) {
      delete selectedDetailImageFiles[key];
      if (productForm.elements[config.fieldName]) productForm.elements[config.fieldName].value = "";
      if (productForm.elements[config.fileName]) productForm.elements[config.fileName].value = "";
      renderDetailImagePreviews();
    }
    return;
  }

  if (event.target.closest("[data-add-display-row]")) {
    const currentRows = syncDisplayInstructionsInput();
    renderDisplayInstructionEditor([...currentRows, ""]);
    return;
  }

  const displayRowRemoveButton = event.target.closest("[data-remove-display-row]");
  if (displayRowRemoveButton) {
    displayRowRemoveButton.closest("[data-display-instruction-row]")?.remove();
    syncDisplayInstructionsInput();
    return;
  }

  const editButton = event.target.closest("[data-edit-product]");
  if (editButton) editProduct(editButton.dataset.editProduct);

  const removeButton = event.target.closest("[data-remove-product]");
  if (removeButton) {
    removeButton.disabled = true;
    const products = getProducts();
    const product = products.find((item) => item.id === removeButton.dataset.removeProduct);
    const remainingProducts = products.filter((item) => item.id !== removeButton.dataset.removeProduct);
    const removedProductImages = productImagePaths(product);

    try {
      await setProducts(remainingProducts);
    } catch (error) {
      if (uploadStatus) uploadStatus.textContent = error.message;
      removeButton.disabled = false;
      return;
    }

    await deleteUnusedProductImages(removedProductImages, remainingProducts);
  }

  if (event.target.closest("[data-clear-form]")) resetProductForm();

  if (event.target.closest("[data-add-bill-item]")) {
    addBillItem();
    return;
  }

  const billRemoveButton = event.target.closest("[data-remove-bill-item]");
  if (billRemoveButton) {
    billItems.splice(Number(billRemoveButton.dataset.removeBillItem), 1);
    renderBillItems();
    return;
  }

  if (event.target.closest("[data-generate-bill-pdf]")) {
    event.preventDefault();
    generateBillPdf();
    return;
  }

  if (event.target.closest("[data-share-bill-whatsapp]")) {
    shareBillOnWhatsApp();
    return;
  }

  if (event.target.closest("[data-clear-bill]")) {
    clearBill();
    return;
  }

  if (event.target.closest("[data-add-quote-item]")) {
    addQuoteItem();
    return;
  }

  const quoteRemoveButton = event.target.closest("[data-remove-quote-item]");
  if (quoteRemoveButton) {
    quoteItems.splice(Number(quoteRemoveButton.dataset.removeQuoteItem), 1);
    renderQuoteItems();
    return;
  }

  if (event.target.closest("[data-generate-quote-pdf]")) {
    event.preventDefault();
    generateQuotePdf();
    return;
  }

  if (event.target.closest("[data-share-quote-whatsapp]")) {
    shareQuoteOnWhatsApp();
    return;
  }

  if (event.target.closest("[data-clear-quote]")) {
    clearQuote();
    return;
  }

});

productForm?.querySelector("[data-display-instruction-rows]")?.addEventListener("input", syncDisplayInstructionsInput);

try {
  updateCategoryOptions();
  resetProductForm();
  loadProjectImages();
  initBillForm();
  initQuoteForm();
  setAdminSection("products");
  setLoggedIn(localStorage.getItem(ADMIN_SESSION_KEY) === "active");
} catch (error) {
  console.error("Admin dashboard initialization failed:", error);
  setLoggedIn(localStorage.getItem(ADMIN_SESSION_KEY) === "active");
}
