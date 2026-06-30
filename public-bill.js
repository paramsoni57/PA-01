const publicBillDialog = document.querySelector("[data-public-bill-dialog]");
const publicBillLock = document.querySelector("[data-public-bill-lock]");
const publicBillForm = document.querySelector("[data-public-bill-form]");
const publicBillStatus = document.querySelector("[data-public-bill-status]");
const publicBillItemsRoot = document.querySelector("[data-public-bill-items]");
const publicBillTotalsRoot = document.querySelector("[data-public-bill-totals]");
const publicBillTypeSelect = document.querySelector("[data-public-bill-product-type]");
const publicBillCategorySelect = document.querySelector("[data-public-bill-category]");
const publicBillProductSelect = document.querySelector("[data-public-bill-product]");
const publicStateSelect = document.querySelector("[data-public-state]");
const publicDistrictSelect = document.querySelector("[data-public-district]");
const publicDocumentSwitch = document.querySelector("[data-public-document-switch]");
const publicDocumentModeButtons = document.querySelectorAll("[data-public-document-mode]");
const publicEstimateForm = document.querySelector("[data-public-estimate-form]");
const publicQuoteItemsRoot = document.querySelector("[data-public-quote-items]");
const publicQuoteTotalsRoot = document.querySelector("[data-public-quote-totals]");
const publicQuoteTypeSelect = document.querySelector("[data-public-quote-product-type]");
const publicQuoteCategorySelect = document.querySelector("[data-public-quote-category]");
const publicQuoteProductSelect = document.querySelector("[data-public-quote-product]");

const PUBLIC_BILL_PASSWORD_HASH = "f8ff61f4cd8617771a4d4c92b7bd176ce1a37e09a4d1a80034b7f8f76d43e1df";
const PUBLIC_BILL_GST_RATE = 0.18;
const getPublicCompanyPhone = () => {
  const digits = String(window.ParamCompanyProfile?.get?.().whatsapp || window.ParamCompanyProfile?.get?.().phone || "918109521547").replace(/\D/g, "");
  return digits.length === 10 ? `91${digits}` : digits;
};
let publicBillItems = [];
let publicQuoteItems = [];
let publicBillUnlocked = false;

const publicProductTypeLabels = {
  "digital-motor-starters": "Digital Motor Starters",
  "smart-home-automation": "Smart Home Automation",
  "water-purifiers-softeners": "Water Purifiers & Softeners",
  "security-surveillance": "Security & Surveillance",
};

const indianStateDistricts = {
  "Andhra Pradesh": ["Alluri Sitharama Raju", "Anakapalli", "Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "NTR", "Palnadu", "Prakasam", "Sri Potti Sriramulu Nellore", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "Other / Not Listed"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "East Kameng", "East Siang", "Lohit", "Lower Dibang Valley", "Lower Subansiri", "Namsai", "Papum Pare", "Tawang", "Upper Siang", "West Kameng", "West Siang", "Other / Not Listed"],
  Assam: ["Baksa", "Barpeta", "Bongaigaon", "Cachar", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karimganj", "Lakhimpur", "Nagaon", "Sivasagar", "Sonitpur", "Tinsukia", "Other / Not Listed"],
  Bihar: ["Araria", "Aurangabad", "Begusarai", "Bhagalpur", "Bhojpur", "Darbhanga", "Gaya", "Katihar", "Madhubani", "Muzaffarpur", "Nalanda", "Patna", "Purnia", "Rohtas", "Samastipur", "Saran", "Vaishali", "Other / Not Listed"],
  Chhattisgarh: ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Janjgir-Champa", "Jashpur", "Kabirdham", "Korba", "Koriya", "Mahasamund", "Raigarh", "Raipur", "Rajnandgaon", "Surguja", "Other / Not Listed"],
  Goa: ["North Goa", "South Goa", "Other / Not Listed"],
  Gujarat: ["Ahmedabad", "Amreli", "Anand", "Banaskantha", "Bharuch", "Bhavnagar", "Gandhinagar", "Jamnagar", "Junagadh", "Kachchh", "Kheda", "Mehsana", "Rajkot", "Surat", "Vadodara", "Valsad", "Other / Not Listed"],
  Haryana: ["Ambala", "Bhiwani", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar", "Other / Not Listed"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una", "Other / Not Listed"],
  Jharkhand: ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Giridih", "Godda", "Gumla", "Hazaribagh", "Palamu", "Ranchi", "West Singhbhum", "Other / Not Listed"],
  Karnataka: ["Bagalkot", "Ballari", "Bengaluru Rural", "Bengaluru Urban", "Belagavi", "Bidar", "Chikkamagaluru", "Dakshina Kannada", "Dharwad", "Hassan", "Kalaburagi", "Mysuru", "Shivamogga", "Tumakuru", "Udupi", "Vijayapura", "Other / Not Listed"],
  Kerala: ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad", "Other / Not Listed"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Indore", "Jabalpur", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narmadapuram", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha", "Other / Not Listed"],
  Maharashtra: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Chandrapur", "Dhule", "Jalgaon", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nashik", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Solapur", "Thane", "Wardha", "Yavatmal", "Other / Not Listed"],
  Manipur: ["Bishnupur", "Churachandpur", "Imphal East", "Imphal West", "Senapati", "Thoubal", "Ukhrul", "Other / Not Listed"],
  Meghalaya: ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "Ri Bhoi", "South Garo Hills", "West Garo Hills", "West Khasi Hills", "Other / Not Listed"],
  Mizoram: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip", "Other / Not Listed"],
  Nagaland: ["Dimapur", "Kohima", "Mokokchung", "Mon", "Phek", "Tuensang", "Wokha", "Zunheboto", "Other / Not Listed"],
  Odisha: ["Angul", "Balasore", "Bargarh", "Bhadrak", "Bolangir", "Cuttack", "Dhenkanal", "Ganjam", "Jagatsinghpur", "Kalahandi", "Kendrapara", "Khordha", "Koraput", "Mayurbhanj", "Puri", "Sambalpur", "Sundargarh", "Other / Not Listed"],
  Punjab: ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Ludhiana", "Mansa", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar", "Other / Not Listed"],
  Rajasthan: ["Ajmer", "Alwar", "Banswara", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Chittorgarh", "Dausa", "Jaipur", "Jaisalmer", "Jodhpur", "Kota", "Nagaur", "Pali", "Sikar", "Udaipur", "Other / Not Listed"],
  Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim", "Other / Not Listed"],
  "Tamil Nadu": ["Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dindigul", "Erode", "Kancheepuram", "Kanyakumari", "Madurai", "Nagapattinam", "Salem", "Thanjavur", "Tiruchirappalli", "Tirunelveli", "Tiruppur", "Vellore", "Other / Not Listed"],
  Telangana: ["Adilabad", "Hyderabad", "Jagtial", "Karimnagar", "Khammam", "Mahabubnagar", "Medchal-Malkajgiri", "Nalgonda", "Nizamabad", "Rangareddy", "Sangareddy", "Siddipet", "Warangal", "Other / Not Listed"],
  Tripura: ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura", "Other / Not Listed"],
  "Uttar Pradesh": ["Agra", "Aligarh", "Ayodhya", "Azamgarh", "Bareilly", "Basti", "Bulandshahr", "Gautam Buddha Nagar", "Ghaziabad", "Gorakhpur", "Jhansi", "Kanpur Nagar", "Lucknow", "Mathura", "Meerut", "Moradabad", "Prayagraj", "Saharanpur", "Varanasi", "Other / Not Listed"],
  Uttarakhand: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi", "Other / Not Listed"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Purba Medinipur", "South 24 Parganas", "Other / Not Listed"],
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman", "Other / Not Listed"],
  Chandigarh: ["Chandigarh", "Other / Not Listed"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu", "Other / Not Listed"],
  Delhi: ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "South Delhi", "West Delhi", "Other / Not Listed"],
  "Jammu and Kashmir": ["Anantnag", "Baramulla", "Doda", "Jammu", "Kathua", "Kupwara", "Pulwama", "Rajouri", "Srinagar", "Udhampur", "Other / Not Listed"],
  Ladakh: ["Kargil", "Leh", "Other / Not Listed"],
  Lakshadweep: ["Lakshadweep", "Other / Not Listed"],
  Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam", "Other / Not Listed"],
};

const publicCategoryOrder = {
  "single-phase": 1,
  "three-phase": 2,
  "two-phase": 3,
  "sensor-remote": 4,
  sensor: 4,
};

const publicProducts = () =>
  (Array.isArray(window.PARAM_STARTER_PRODUCTS_DATA) ? window.PARAM_STARTER_PRODUCTS_DATA : [])
    .slice()
    .sort((first, second) => {
      const firstCategory = publicCategoryOrder[first.category] || 99;
      const secondCategory = publicCategoryOrder[second.category] || 99;
      if (firstCategory !== secondCategory) return firstCategory - secondCategory;
      return Number(second.createdAt || 0) - Number(first.createdAt || 0);
    });

const publicFormatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const publicEscape = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const publicCategoryLabel = (value = "") =>
  String(value)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

const publicUniqueValues = (items, getter) => [...new Set(items.map(getter).filter(Boolean))];

const publicBillNumber = () => {
  const now = new Date();
  return `PA-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
};

const publicTodayValue = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const publicGetWarranty = (product = {}) => {
  const warrantyFeature = (product.features || []).find((feature) => /^(1 Year|6 Month|3 Month) Warranty$/i.test(feature));
  if (warrantyFeature) return warrantyFeature;
  const specWarranty = product.specs?.Warranty || product.specs?.warranty || "";
  if (!specWarranty) return "-";
  return /warranty/i.test(specWarranty) ? specWarranty : `${specWarranty} Warranty`;
};

const publicHashText = async (value) => {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, "0")).join("");
};

const publicRenderStateOptions = () => {
  if (!publicStateSelect || !publicDistrictSelect) return;
  const previousState = publicStateSelect.value || "Madhya Pradesh";
  publicStateSelect.innerHTML = Object.keys(indianStateDistricts)
    .map((state) => `<option value="${publicEscape(state)}">${publicEscape(state)}</option>`)
    .join("");
  publicStateSelect.value = indianStateDistricts[previousState] ? previousState : "Madhya Pradesh";
  publicRenderDistrictOptions();
};

const publicRenderDistrictOptions = () => {
  if (!publicStateSelect || !publicDistrictSelect) return;
  const previousDistrict = publicDistrictSelect.value;
  const districts = indianStateDistricts[publicStateSelect.value] || ["Other / Not Listed"];
  publicDistrictSelect.innerHTML = districts
    .map((district) => `<option value="${publicEscape(district)}">${publicEscape(district)}</option>`)
    .join("");
  if (previousDistrict && districts.includes(previousDistrict)) publicDistrictSelect.value = previousDistrict;
  else if (districts.includes("Narsinghpur")) publicDistrictSelect.value = "Narsinghpur";
};

const publicCustomerAddress = () => {
  if (!publicBillForm) return "";
  const fields = publicBillForm.elements;
  return [
    fields.customerLocalAddress.value.trim(),
    `City/Town - ${fields.customerCity.value.trim()}`,
    `Dist - ${fields.customerDistrict.value}`,
    `State - ${fields.customerState.value}`,
    `Pin code - ${fields.customerPincode.value.trim()}`,
  ]
    .filter(Boolean)
    .join(", ");
};

const publicRenderSelectors = () => {
  if (!publicBillForm || !publicBillTypeSelect || !publicBillCategorySelect || !publicBillProductSelect) return;
  const products = publicProducts();
  const previousType = publicBillTypeSelect.value;
  const previousCategory = publicBillCategorySelect.value;
  const previousProduct = publicBillProductSelect.value;

  const types = publicUniqueValues(products, (product) => product.productType || "digital-motor-starters");
  publicBillTypeSelect.innerHTML = types
    .map((type) => `<option value="${publicEscape(type)}">${publicProductTypeLabels[type] || publicCategoryLabel(type)}</option>`)
    .join("");
  if (previousType && types.includes(previousType)) publicBillTypeSelect.value = previousType;

  const selectedType = publicBillTypeSelect.value || types[0] || "";
  const categoryProducts = products.filter((product) => (product.productType || "digital-motor-starters") === selectedType);
  const categories = publicUniqueValues(categoryProducts, (product) => product.category);
  publicBillCategorySelect.innerHTML = categories
    .map((category) => `<option value="${publicEscape(category)}">${publicCategoryLabel(category)}</option>`)
    .join("");
  if (previousCategory && categories.includes(previousCategory)) publicBillCategorySelect.value = previousCategory;

  const selectedCategory = publicBillCategorySelect.value || categories[0] || "";
  const modelProducts = categoryProducts.filter((product) => product.category === selectedCategory);
  publicBillProductSelect.innerHTML = modelProducts
    .map((product) => `<option value="${publicEscape(product.id)}">${publicEscape(product.model)} - ${publicEscape(product.name)}</option>`)
    .join("");
  if (previousProduct && modelProducts.some((product) => product.id === previousProduct)) publicBillProductSelect.value = previousProduct;
  publicUpdateRateFromProduct();
};

const publicUpdateRateFromProduct = () => {
  if (!publicBillForm || !publicBillProductSelect) return;
  const product = publicProducts().find((item) => item.id === publicBillProductSelect.value);
  if (product) publicBillForm.elements.billRate.value = product.price || product.mrp || 0;
};

const publicAddBillItem = () => {
  const product = publicProducts().find((item) => item.id === publicBillProductSelect?.value);
  if (!product || !publicBillForm) return;
  const qty = Math.max(1, Number(publicBillForm.elements.billQty.value) || 1);
  const rate = Math.max(0, Number(publicBillForm.elements.billRate.value) || product.price || 0);
  publicBillItems.push({
    productId: product.id,
    productType: product.productType || "digital-motor-starters",
    category: product.category,
    model: product.model,
    name: product.name,
    warranty: publicGetWarranty(product),
    unit: product.unit || "Piece",
    qty,
    rate,
  });
  publicBillForm.elements.billQty.value = "1";
  publicUpdateRateFromProduct();
  publicRenderBillItems();
};

const publicGetBillTotals = () => {
  const subtotal = publicBillItems.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const discount = Math.max(0, Number(publicBillForm?.elements.discount.value) || 0);
  const taxable = Math.max(0, subtotal - discount);
  const gst = publicBillForm?.elements.gstMode.value === "with" ? Math.round(taxable * PUBLIC_BILL_GST_RATE) : 0;
  const finalAmount = taxable + gst;
  const paidAmount = Math.max(0, Number(publicBillForm?.elements.paidAmount.value) || 0);
  const balanceAmount = Math.max(0, finalAmount - paidAmount);
  return { subtotal, discount, taxable, gst, finalAmount, paidAmount, balanceAmount };
};

const publicRenderBillItems = () => {
  if (!publicBillItemsRoot || !publicBillTotalsRoot) return;
  if (!publicBillItems.length) {
    publicBillItemsRoot.innerHTML = `<p class="admin-empty-state">No bill items added yet.</p>`;
  } else {
    publicBillItemsRoot.innerHTML = `
      <table>
        <thead>
          <tr><th>#</th><th>Type</th><th>Category</th><th>Model</th><th>Product</th><th>Product Warranty</th><th>Unit</th><th>Qty</th><th>Rate</th><th>Amount</th><th></th></tr>
        </thead>
        <tbody>
          ${publicBillItems
            .map(
              (item, index) => `
                <tr>
                  <td>${index + 1}</td>
                  <td>${publicProductTypeLabels[item.productType] || publicCategoryLabel(item.productType)}</td>
                  <td>${publicCategoryLabel(item.category)}</td>
                  <td>${publicEscape(item.model)}</td>
                  <td>${publicEscape(item.name)}</td>
                  <td>${publicEscape(item.warranty || "-")}</td>
                  <td>${publicEscape(item.unit || "Piece")}</td>
                  <td><input type="number" min="1" value="${item.qty}" data-public-bill-qty="${index}" /></td>
                  <td><input type="number" min="0" value="${item.rate}" data-public-bill-rate="${index}" /></td>
                  <td>${publicFormatPrice(item.qty * item.rate)}</td>
                  <td><button type="button" data-public-remove-bill-item="${index}">Remove</button></td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    `;
  }

  const totals = publicGetBillTotals();
  publicBillTotalsRoot.innerHTML = `
    <span>Subtotal: <strong>${publicFormatPrice(totals.subtotal)}</strong></span>
    <span>Discount: <strong>${publicFormatPrice(totals.discount)}</strong></span>
    <span>GST: <strong>${publicFormatPrice(totals.gst)}</strong></span>
    <span>Final Amount: <strong>${publicFormatPrice(totals.finalAmount)}</strong></span>
    <span>Paid: <strong>${publicFormatPrice(totals.paidAmount)}</strong></span>
    <span>Balance: <strong>${publicFormatPrice(totals.balanceAmount)}</strong></span>
  `;
};

const publicBillData = () => ({
  billNumber: publicBillForm.elements.billNumber.value,
  billingDate: publicBillForm.elements.billingDate.value,
  customerName: publicBillForm.elements.customerName.value.trim(),
  customerPhone: publicBillForm.elements.customerPhone.value.trim(),
  customerGst: publicBillForm.elements.customerGst.value.trim(),
  customerState: publicBillForm.elements.customerState.value,
  customerDistrict: publicBillForm.elements.customerDistrict.value,
  customerCity: publicBillForm.elements.customerCity.value.trim(),
  customerPincode: publicBillForm.elements.customerPincode.value.trim(),
  customerLocalAddress: publicBillForm.elements.customerLocalAddress.value.trim(),
  customerAddress: publicCustomerAddress(),
  gstMode: publicBillForm.elements.gstMode.value,
  paidDate: publicBillForm.elements.paidDate.value,
  remarks: publicBillForm.elements.remarks.value.trim(),
  items: [...publicBillItems],
  totals: publicGetBillTotals(),
});

const publicBillRowsHtml = (items) =>
  items
    .map(
      (item, index) => `
        <tr>
          <td>${index + 1}</td>
          <td>${publicEscape(publicProductTypeLabels[item.productType] || publicCategoryLabel(item.productType))}</td>
          <td>${publicEscape(publicCategoryLabel(item.category))}</td>
          <td>${publicEscape(item.model)}</td>
          <td>${publicEscape(item.name)}</td>
          <td>${publicEscape(item.warranty || "-")}</td>
          <td>${publicEscape(item.unit || "Piece")}</td>
          <td>${item.qty}</td>
          <td>${publicFormatPrice(item.rate)}</td>
          <td>${publicFormatPrice(item.qty * item.rate)}</td>
        </tr>
      `
    )
    .join("");

const publicBillWhatsAppUrl = (data) => {
  const lines = [
    "Param Automation Bill",
    `Bill No: ${data.billNumber}`,
    `Billing Date: ${data.billingDate}`,
    `Customer: ${data.customerName}`,
    `Mobile: ${data.customerPhone || "-"}`,
    "",
    "Products:",
    ...data.items.map((item, index) => `${index + 1}. ${item.model} | ${item.name} | Warranty ${item.warranty || "-"} | Unit ${item.unit || "Piece"} | Qty ${item.qty} | Rate ${publicFormatPrice(item.rate)} | Amount ${publicFormatPrice(item.qty * item.rate)}`),
    "",
    `Subtotal: ${publicFormatPrice(data.totals.subtotal)}`,
    `Discount: ${publicFormatPrice(data.totals.discount)}`,
    `GST: ${publicFormatPrice(data.totals.gst)}`,
    `Final Amount: ${publicFormatPrice(data.totals.finalAmount)}`,
    `Paid: ${publicFormatPrice(data.totals.paidAmount)}`,
    `Balance: ${publicFormatPrice(data.totals.balanceAmount)}`,
    "",
    "Please find bill details from Param Automation.",
  ];
  const destinationPhone = /^\d{10}$/.test(data.customerPhone) ? `91${data.customerPhone}` : getPublicCompanyPhone();
  return `https://wa.me/${destinationPhone}?text=${encodeURIComponent(lines.join("\n"))}`;
};

const publicBillDocumentHtml = (data) => {
  const baseHref = window.location.protocol === "file:" ? document.baseURI : `${window.location.origin}/`;
  const whatsappUrl = publicBillWhatsAppUrl(data);
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <base href="${publicEscape(baseHref)}" />
      <title>Bill ${publicEscape(data.billNumber)}</title>
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
        .box { border: 1px solid #dfe8e3; padding: 8px; min-height: 70px; line-height: 1.35; }
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
        <button type="button" onclick="shareBillPdfFile()">Share PDF File (Mobile)</button>
        <a href="${publicEscape(whatsappUrl)}" target="_blank" rel="noopener">Share Bill Details on WhatsApp</a>
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
            <p><strong>Bill No:</strong> ${publicEscape(data.billNumber)}</p>
            <p><strong>Billing Date:</strong> ${publicEscape(data.billingDate)}</p>
            <p><strong>GST:</strong> ${data.gstMode === "with" ? "With GST 18%" : "Without GST"}</p>
          </div>
        </div>
        <div class="grid">
          <div class="box">
            <h3>Bill To</h3>
            <p><strong>${publicEscape(data.customerName)}</strong></p>
            <p>${publicEscape(data.customerAddress)}</p>
            <p>Mobile: ${publicEscape(data.customerPhone || "-")}</p>
            <p>GSTIN: ${publicEscape(data.customerGst || "-")}</p>
          </div>
          <div class="box">
            <h3>Payment</h3>
            <p>Paid Date: ${publicEscape(data.paidDate || "-")}</p>
            <p>Remarks: ${publicEscape(data.remarks || "-")}</p>
          </div>
        </div>
        <table>
          <thead>
            <tr><th>#</th><th>Product Type</th><th>Category</th><th>Model</th><th>Product</th><th>Product Warranty</th><th>Unit</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>
          </thead>
          <tbody>${publicBillRowsHtml(data.items)}</tbody>
        </table>
        <div class="totals">
          <div><span>Subtotal</span><strong>${publicFormatPrice(data.totals.subtotal)}</strong></div>
          <div><span>Discount</span><strong>${publicFormatPrice(data.totals.discount)}</strong></div>
          <div><span>Taxable Amount</span><strong>${publicFormatPrice(data.totals.taxable)}</strong></div>
          <div><span>GST</span><strong>${publicFormatPrice(data.totals.gst)}</strong></div>
          <div class="final"><span>Final Amount</span><strong>${publicFormatPrice(data.totals.finalAmount)}</strong></div>
          <div><span>Paid Amount</span><strong>${publicFormatPrice(data.totals.paidAmount)}</strong></div>
          <div><span>Balance Amount</span><strong>${publicFormatPrice(data.totals.balanceAmount)}</strong></div>
        </div>
        <p class="note">Warranty, installation, transport, and service terms are applicable as confirmed by Param Automation. This is a computer generated bill prepared from the Param Automation website.</p>
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
      <\/script>
    </body>
  </html>`;
};

const publicValidateBill = () => {
  if (!publicBillUnlocked || !publicBillForm) return false;
  if (!publicBillForm.reportValidity()) return false;
  if (!publicBillItems.length) {
    if (publicBillStatus) publicBillStatus.textContent = "Add at least one product.";
    return false;
  }
  return true;
};

const publicValidateShippingDetails = () => {
  if (!publicBillUnlocked || !publicBillForm) return false;
  const requiredFields = [
    publicBillForm.elements.customerName,
    publicBillForm.elements.customerPhone,
    publicBillForm.elements.customerState,
    publicBillForm.elements.customerDistrict,
    publicBillForm.elements.customerCity,
    publicBillForm.elements.customerPincode,
    publicBillForm.elements.customerLocalAddress,
  ];
  return requiredFields.every((field) => field.reportValidity());
};

const publicGenerateBillPdf = () => {
  if (!publicValidateBill()) return;
  const billWindow = window.open("", "_blank");
  if (!billWindow) {
    if (publicBillStatus) publicBillStatus.textContent = "Popup blocked. Allow popup to generate PDF.";
    return;
  }
  billWindow.opener = null;
  billWindow.document.open();
  billWindow.document.write(publicBillDocumentHtml(publicBillData()));
  billWindow.document.close();
  billWindow.focus();
  if (publicBillStatus) publicBillStatus.textContent = "Bill opened. Save as PDF or print.";
};

const publicShippingLabelHtml = (data) => `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Shipping Label ${publicEscape(data.billNumber)}</title>
      <style>
        * { box-sizing: border-box; }
        @page { size: A6 landscape; margin: 5mm; }
        body { margin: 0; padding: 14px; color: #111; font-family: Arial, sans-serif; }
        .label { width: min(100%, 138mm); margin: 0 auto; padding: 10px 12px; border: 2px solid #111; }
        .top { display: flex; align-items: center; justify-content: space-between; gap: 12px; border-bottom: 2px solid #111; padding-bottom: 8px; }
        img { width: 104px; max-height: 62px; object-fit: contain; }
        h1, h2, p { margin: 0; }
        h1 { font-size: 20px; text-align: right; text-transform: uppercase; letter-spacing: 0; }
        h2 { margin: 10px 0 6px; font-size: 13px; text-transform: uppercase; letter-spacing: 0; }
        .to { min-height: 92px; padding: 10px 12px; border: 1px solid #222; font-size: 15px; line-height: 1.25; }
        .to strong { display: block; margin-bottom: 4px; font-size: 18px; line-height: 1.15; text-transform: uppercase; }
        .address-line { margin-top: 2px; overflow-wrap: anywhere; }
        .address-line--place { font-weight: 800; }
        .phone-line { margin-top: 6px; font-size: 16px; font-weight: 900; }
        .from { margin-top: 8px; padding: 8px 10px; background: #f4f4f4; border: 1px dashed #444; font-size: 13px; line-height: 1.35; font-weight: 700; }
        .from strong { font-size: 14px; text-transform: uppercase; }
        .actions { display: flex; justify-content: center; gap: 10px; margin-bottom: 12px; }
        .actions button { min-height: 38px; padding: 0 14px; color: #fff; background: #064425; border: 0; border-radius: 6px; font-weight: 800; cursor: pointer; }
        @media print { body { padding: 0; } .actions { display: none; } .label { width: 138mm; max-width: 100%; border-width: 2px; } }
      </style>
    </head>
    <body>
      <div class="actions"><button type="button" onclick="window.print()">Print Shipping Label</button></div>
      <section class="label">
        <div class="top">
          <img src="assets/brand/logo.jpg" alt="Param Automation" />
          <h1>Shipping Label</h1>
        </div>
        <h2>Ship To</h2>
        <div class="to">
          <strong>${publicEscape(data.customerName)}</strong>
          <p class="address-line address-line--place">${publicEscape(data.customerAddress)}</p>
          <p class="phone-line">Mobile: ${publicEscape(data.customerPhone || "-")}</p>
        </div>
        <div class="from">
          <strong>From:</strong> Param Automation, Jhanda Chowk, Gadarwara, Dist:- Narsinghpur, Madhya Pradesh - 487551<br />
          Mobile: +91 8109521547
        </div>
      </section>
      <script>
        window.addEventListener("load", () => {
          window.focus();
          setTimeout(() => window.print(), 350);
        });
      <\/script>
    </body>
  </html>
`;

const publicGenerateShippingLabel = () => {
  if (!publicValidateShippingDetails()) return;
  const labelWindow = window.open("", "_blank");
  if (!labelWindow) {
    if (publicBillStatus) publicBillStatus.textContent = "Popup blocked. Allow popup to print shipping label.";
    return;
  }
  labelWindow.opener = null;
  labelWindow.document.open();
  labelWindow.document.write(publicShippingLabelHtml(publicBillData()));
  labelWindow.document.close();
  labelWindow.focus();
  if (publicBillStatus) publicBillStatus.textContent = "Shipping label opened for print.";
};

const publicShareBillOnWhatsApp = () => {
  if (!publicValidateBill()) return;
  window.open(publicBillWhatsAppUrl(publicBillData()), "_blank", "noopener");
};

const publicQuoteNumber = () => {
  const now = new Date();
  return `PA-QT-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
};

const publicSetDocumentMode = (mode = "bill") => {
  if (!publicBillUnlocked) return;
  const showBill = mode === "bill";
  if (publicBillForm) publicBillForm.hidden = !showBill;
  if (publicEstimateForm) publicEstimateForm.hidden = showBill;
  publicDocumentModeButtons.forEach((button) => {
    const active = button.dataset.publicDocumentMode === mode;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
  const title = document.querySelector("#public-bill-title");
  if (title) title.textContent = showBill ? "Generate Bill" : "Estimate Quotation";
  if (publicBillStatus) publicBillStatus.textContent = showBill ? "Bill form ready" : "Estimate form ready";
  if (!showBill) {
    publicRenderQuoteSelectors();
    publicRenderQuoteItems();
  }
};

const publicRenderQuoteSelectors = () => {
  if (!publicEstimateForm || !publicQuoteTypeSelect || !publicQuoteCategorySelect || !publicQuoteProductSelect) return;
  const products = publicProducts();
  const previousType = publicQuoteTypeSelect.value;
  const previousCategory = publicQuoteCategorySelect.value;
  const previousProduct = publicQuoteProductSelect.value;
  const types = publicUniqueValues(products, (product) => product.productType || "digital-motor-starters");
  publicQuoteTypeSelect.innerHTML = types.map((type) => `<option value="${publicEscape(type)}">${publicProductTypeLabels[type] || publicCategoryLabel(type)}</option>`).join("");
  if (types.includes(previousType)) publicQuoteTypeSelect.value = previousType;
  const selectedType = publicQuoteTypeSelect.value || types[0] || "";
  const typeProducts = products.filter((product) => (product.productType || "digital-motor-starters") === selectedType);
  const categories = publicUniqueValues(typeProducts, (product) => product.category);
  publicQuoteCategorySelect.innerHTML = categories.map((category) => `<option value="${publicEscape(category)}">${publicCategoryLabel(category)}</option>`).join("");
  if (categories.includes(previousCategory)) publicQuoteCategorySelect.value = previousCategory;
  const selectedCategory = publicQuoteCategorySelect.value || categories[0] || "";
  const categoryProducts = typeProducts.filter((product) => product.category === selectedCategory);
  publicQuoteProductSelect.innerHTML = categoryProducts.map((product) => `<option value="${publicEscape(product.id)}">${publicEscape(product.model)} - ${publicEscape(product.name)}</option>`).join("");
  if (categoryProducts.some((product) => product.id === previousProduct)) publicQuoteProductSelect.value = previousProduct;
  publicUpdateQuotePrices();
};

const publicUpdateQuotePrices = () => {
  if (!publicEstimateForm) return;
  const product = publicProducts().find((item) => item.id === publicQuoteProductSelect?.value);
  if (!product) return;
  publicEstimateForm.elements.quoteMrp.value = product.mrp || 0;
  publicEstimateForm.elements.quoteWholesaleRate.value = product.price || product.mrp || 0;
};

const publicAddQuoteItem = () => {
  const product = publicProducts().find((item) => item.id === publicQuoteProductSelect?.value);
  if (!product || !publicEstimateForm) return;
  publicQuoteItems.push({
    productId: product.id,
    model: product.model,
    name: product.name,
    warranty: publicGetWarranty(product),
    unit: product.unit || "Piece",
    qty: Math.max(1, Number(publicEstimateForm.elements.quoteQty.value) || 1),
    mrp: Math.max(0, Number(publicEstimateForm.elements.quoteMrp.value) || product.mrp || 0),
    wholesaleRate: Math.max(0, Number(publicEstimateForm.elements.quoteWholesaleRate.value) || product.price || 0),
  });
  publicEstimateForm.elements.quoteQty.value = "1";
  publicUpdateQuotePrices();
  publicRenderQuoteItems();
};

const publicQuoteDiscount = (item) => item.mrp > 0 ? Math.max(0, Math.round(((item.mrp - item.wholesaleRate) / item.mrp) * 10000) / 100) : 0;

const publicQuoteTotals = () => {
  const totalMrp = publicQuoteItems.reduce((sum, item) => sum + item.qty * item.mrp, 0);
  const wholesaleTotal = publicQuoteItems.reduce((sum, item) => sum + item.qty * item.wholesaleRate, 0);
  const savings = Math.max(0, totalMrp - wholesaleTotal);
  const discount = totalMrp > 0 ? Math.round((savings / totalMrp) * 10000) / 100 : 0;
  return { totalMrp, wholesaleTotal, savings, discount };
};

const publicRenderQuoteItems = () => {
  if (!publicQuoteItemsRoot || !publicQuoteTotalsRoot) return;
  publicQuoteItemsRoot.innerHTML = publicQuoteItems.length ? `<table><thead><tr><th>#</th><th>Model</th><th>Product</th><th>Warranty</th><th>Unit</th><th>Qty</th><th>MRP</th><th>Wholesale Price</th><th>Discount</th><th>Amount</th><th></th></tr></thead><tbody>${publicQuoteItems.map((item, index) => `<tr><td>${index + 1}</td><td>${publicEscape(item.model)}</td><td>${publicEscape(item.name)}</td><td>${publicEscape(item.warranty || "-")}</td><td>${publicEscape(item.unit)}</td><td><input type="number" min="1" value="${item.qty}" data-public-quote-qty="${index}" /></td><td><input type="number" min="0" value="${item.mrp}" data-public-quote-mrp="${index}" /></td><td><input type="number" min="0" value="${item.wholesaleRate}" data-public-quote-rate="${index}" /></td><td>${publicQuoteDiscount(item)}%</td><td>${publicFormatPrice(item.qty * item.wholesaleRate)}</td><td><button type="button" data-public-remove-quote-item="${index}">Remove</button></td></tr>`).join("")}</tbody></table>` : `<p class="admin-empty-state">No estimate items added yet.</p>`;
  const totals = publicQuoteTotals();
  publicQuoteTotalsRoot.innerHTML = `<span>Total MRP: <strong>${publicFormatPrice(totals.totalMrp)}</strong></span><span>Wholesale Total: <strong>${publicFormatPrice(totals.wholesaleTotal)}</strong></span><span>Dealer Savings: <strong>${publicFormatPrice(totals.savings)}</strong></span><span>Overall Discount: <strong>${totals.discount}%</strong></span>`;
};

const publicQuoteData = () => ({
  quoteNumber: publicEstimateForm.elements.quoteNumber.value,
  quoteDate: publicEstimateForm.elements.quoteDate.value,
  dealerName: publicEstimateForm.elements.dealerName.value.trim(),
  dealerPhone: publicEstimateForm.elements.dealerPhone.value.trim(),
  dealerAddress: publicEstimateForm.elements.dealerAddress.value.trim(),
  items: [...publicQuoteItems],
  totals: publicQuoteTotals(),
});

const publicQuoteWhatsAppUrl = (data) => {
  const lines = ["Param Automation Wholesale Estimate Quotation", `Quotation No: ${data.quoteNumber}`, `Date: ${data.quoteDate}`, `Dealer: ${data.dealerName}`, "", ...data.items.map((item, index) => `${index + 1}. ${item.model} | ${item.name} | Unit ${item.unit} | Qty ${item.qty} | MRP ${publicFormatPrice(item.mrp)} | Wholesale ${publicFormatPrice(item.wholesaleRate)} | Discount ${publicQuoteDiscount(item)}% | Amount ${publicFormatPrice(item.qty * item.wholesaleRate)}`), "", `Total MRP: ${publicFormatPrice(data.totals.totalMrp)}`, `Wholesale Total: ${publicFormatPrice(data.totals.wholesaleTotal)}`, `Dealer Savings: ${publicFormatPrice(data.totals.savings)} (${data.totals.discount}%)`, "Prices are estimates and may vary with quantity, taxes, transport, and market conditions."];
  const phone = /^\d{10}$/.test(data.dealerPhone) ? `91${data.dealerPhone}` : getPublicCompanyPhone();
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
};

const publicQuoteRowsHtml = (items) => items.map((item, index) => `<tr><td>${index + 1}</td><td>${publicEscape(item.model)}</td><td>${publicEscape(item.name)}</td><td>${publicEscape(item.unit)}</td><td>${item.qty}</td><td>${publicFormatPrice(item.mrp)}</td><td>${publicFormatPrice(item.wholesaleRate)}</td><td>${publicQuoteDiscount(item)}%</td><td>${publicFormatPrice(item.qty * item.wholesaleRate)}</td></tr>`).join("");

const publicQuoteDocumentHtml = (data) => `<!doctype html><html><head><meta charset="utf-8"/><base href="${window.location.origin}/"/><title>Quotation ${publicEscape(data.quoteNumber)}</title><style>*{box-sizing:border-box}@page{size:A4;margin:8mm}body{margin:0;padding:16px;color:#111;font:11px Arial,sans-serif}.actions{display:flex;justify-content:center;gap:10px;margin-bottom:14px}.actions button,.actions a{padding:10px 14px;border:0;border-radius:6px;background:#064425;color:#fff;font-weight:800;text-decoration:none}.quote{width:min(190mm,100%);margin:auto;border:1px solid #d7ded9;padding:7mm}.head{display:grid;grid-template-columns:1.4fr .8fr;gap:14px;border-bottom:3px solid #064425;padding-bottom:10px}.brand{display:flex;align-items:center;gap:10px}.brand img{width:92px;max-height:58px;object-fit:contain}h2,h3,p{margin:0}.meta{text-align:right;line-height:1.5}.dealer{margin:12px 0;padding:9px;border:1px solid #dfe8e3;line-height:1.4}table{width:100%;table-layout:fixed;border-collapse:collapse;font-size:9px}th,td{border:1px solid #dfe8e3;padding:4px;text-align:left;vertical-align:top;overflow-wrap:anywhere}th{background:#f4f8f6;color:#064425}.totals{width:310px;margin:12px 0 0 auto}.totals div{display:flex;justify-content:space-between;padding:4px;border-bottom:1px solid #ddd}.final{font-size:14px;color:#064425}.note{margin-top:16px;line-height:1.45}.sign{width:190px;margin:38px 0 0 auto;border-top:1px solid #111;padding-top:7px;text-align:center}@media print{body{padding:0}.actions{display:none}.quote{width:190mm;max-width:100%;min-height:281mm;padding:6mm}}</style></head><body><div class="actions"><button onclick="window.print()">Print / Save PDF</button><a href="${publicEscape(publicQuoteWhatsAppUrl(data))}" target="_blank">Share To Dealer WhatsApp</a></div><main class="quote"><div class="head"><div class="brand"><img src="assets/brand/logo.jpg" alt="Param Automation"/><div><p>Jhanda Chowk, Gadarwara, Dist:- Narsinghpur, Madhya Pradesh - 487551</p><p>Mobile: +91 8109521547 | Email: Paramsoni57@gmail.com</p></div></div><div class="meta"><h2>Estimate Quotation</h2><p><strong>No:</strong> ${publicEscape(data.quoteNumber)}</p><p><strong>Date:</strong> ${publicEscape(data.quoteDate)}</p></div></div><div class="dealer"><h3>Quotation To</h3><p><strong>${publicEscape(data.dealerName)}</strong></p><p>${publicEscape(data.dealerAddress).replace(/\n/g, "<br />")}</p><p>Mobile: ${publicEscape(data.dealerPhone || "-")}</p></div><table><thead><tr><th>#</th><th>Model</th><th>Product</th><th>Unit</th><th>Qty</th><th>MRP</th><th>Wholesale Price</th><th>Discount</th><th>Amount</th></tr></thead><tbody>${publicQuoteRowsHtml(data.items)}</tbody></table><div class="totals"><div><span>Total MRP</span><strong>${publicFormatPrice(data.totals.totalMrp)}</strong></div><div><span>Dealer Savings</span><strong>${publicFormatPrice(data.totals.savings)}</strong></div><div><span>Overall Discount</span><strong>${data.totals.discount}%</strong></div><div class="final"><span>Wholesale Total</span><strong>${publicFormatPrice(data.totals.wholesaleTotal)}</strong></div></div><p class="note"><strong>Estimate terms:</strong> Prices are estimates and may vary with order quantity, applicable taxes, transport charges, product availability, and market conditions. Final rates will be confirmed when the order is placed.</p><div class="sign">Authorized Signature<br/>Param Automation</div></main><script>window.addEventListener("load",()=>{window.focus();setTimeout(()=>window.print(),350)});<\/script></body></html>`;

const publicValidateQuote = () => {
  if (!publicEstimateForm?.reportValidity()) return false;
  if (!publicQuoteItems.length) {
    if (publicBillStatus) publicBillStatus.textContent = "Add at least one estimate item.";
    return false;
  }
  return true;
};

const publicGenerateQuotePdf = () => {
  if (!publicValidateQuote()) return;
  const popup = window.open("", "_blank");
  if (!popup) return;
  popup.opener = null;
  popup.document.open();
  popup.document.write(publicQuoteDocumentHtml(publicQuoteData()));
  popup.document.close();
  popup.focus();
  if (publicBillStatus) publicBillStatus.textContent = "Estimate opened for PDF or print.";
};

const publicClearQuote = () => {
  if (!publicEstimateForm) return;
  publicQuoteItems = [];
  publicEstimateForm.reset();
  publicEstimateForm.elements.quoteNumber.value = publicQuoteNumber();
  publicEstimateForm.elements.quoteDate.value = publicTodayValue();
  publicRenderQuoteSelectors();
  publicRenderQuoteItems();
};

const publicClearBill = () => {
  if (!publicBillForm) return;
  publicBillItems = [];
  publicBillForm.reset();
  publicBillForm.elements.billNumber.value = publicBillNumber();
  publicBillForm.elements.billingDate.value = publicTodayValue();
  publicRenderStateOptions();
  publicRenderSelectors();
  publicRenderBillItems();
  if (publicBillStatus) publicBillStatus.textContent = "Bill form ready";
};

const publicUnlockBill = () => {
  publicBillUnlocked = true;
  publicBillLock.hidden = true;
  if (publicDocumentSwitch) publicDocumentSwitch.hidden = false;
  publicClearBill();
  publicClearQuote();
  publicSetDocumentMode("bill");
};

const publicLogoutBill = () => {
  publicBillUnlocked = false;
  publicBillItems = [];
  publicQuoteItems = [];
  if (publicBillForm) {
    publicBillForm.reset();
    publicBillForm.hidden = true;
  }
  if (publicEstimateForm) {
    publicEstimateForm.reset();
    publicEstimateForm.hidden = true;
  }
  if (publicDocumentSwitch) publicDocumentSwitch.hidden = true;
  if (publicBillLock) {
    publicBillLock.reset();
    publicBillLock.hidden = false;
  }
  if (publicBillStatus) publicBillStatus.textContent = "Logged out";
  publicBillDialog?.close();
  history.replaceState(null, "", `${window.location.pathname}${window.location.search}#top`);
  document.querySelector("#top")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const publicOpenBillDialog = () => {
  if (!publicBillDialog) return;
  if (!publicBillUnlocked) {
    publicBillLock.hidden = false;
    publicBillForm.hidden = true;
    if (publicEstimateForm) publicEstimateForm.hidden = true;
    if (publicDocumentSwitch) publicDocumentSwitch.hidden = true;
    if (publicBillStatus) publicBillStatus.textContent = "Enter password";
  } else {
    if (publicDocumentSwitch) publicDocumentSwitch.hidden = false;
    publicSetDocumentMode("bill");
  }
  if (typeof publicBillDialog.showModal === "function") publicBillDialog.showModal();
  else publicBillDialog.setAttribute("open", "");
  if (window.location.hash === "#generate-bill") {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}#top`);
  }
};

document.addEventListener("click", (event) => {
  const openBill = event.target.closest("[data-open-public-bill]");
  if (openBill) {
    event.preventDefault();
    publicOpenBillDialog();
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}#top`);
    return;
  }

  if (event.target.closest("[data-close-public-bill]")) {
    publicLogoutBill();
    return;
  }

  const modeButton = event.target.closest("[data-public-document-mode]");
  if (modeButton) {
    publicSetDocumentMode(modeButton.dataset.publicDocumentMode);
    return;
  }

  if (event.target.closest("[data-public-add-bill-item]")) {
    publicAddBillItem();
    return;
  }

  const removeButton = event.target.closest("[data-public-remove-bill-item]");
  if (removeButton) {
    publicBillItems.splice(Number(removeButton.dataset.publicRemoveBillItem), 1);
    publicRenderBillItems();
    return;
  }

  if (event.target.closest("[data-public-generate-bill-pdf]")) {
    publicGenerateBillPdf();
    return;
  }

  if (event.target.closest("[data-public-generate-shipping-label]")) {
    publicGenerateShippingLabel();
    return;
  }

  if (event.target.closest("[data-public-share-bill-whatsapp]")) {
    publicShareBillOnWhatsApp();
    return;
  }

  if (event.target.closest("[data-public-clear-bill]")) publicClearBill();

  if (event.target.closest("[data-public-add-quote-item]")) {
    publicAddQuoteItem();
    return;
  }

  const quoteRemoveButton = event.target.closest("[data-public-remove-quote-item]");
  if (quoteRemoveButton) {
    publicQuoteItems.splice(Number(quoteRemoveButton.dataset.publicRemoveQuoteItem), 1);
    publicRenderQuoteItems();
    return;
  }

  if (event.target.closest("[data-public-generate-quote-pdf]")) {
    publicGenerateQuotePdf();
    return;
  }

  if (event.target.closest("[data-public-share-quote-whatsapp]")) {
    if (publicValidateQuote()) window.open(publicQuoteWhatsAppUrl(publicQuoteData()), "_blank", "noopener");
    return;
  }

  if (event.target.closest("[data-public-clear-quote]")) publicClearQuote();
});

publicBillLock?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const hash = await publicHashText(publicBillLock.elements.billPassword.value);
  if (hash !== PUBLIC_BILL_PASSWORD_HASH) {
    if (publicBillStatus) publicBillStatus.textContent = "Wrong password";
    publicBillLock.elements.billPassword.select();
    return;
  }
  publicBillLock.reset();
  publicUnlockBill();
});

publicBillTypeSelect?.addEventListener("change", publicRenderSelectors);
publicBillCategorySelect?.addEventListener("change", publicRenderSelectors);
publicBillProductSelect?.addEventListener("change", publicUpdateRateFromProduct);
publicStateSelect?.addEventListener("change", publicRenderDistrictOptions);
publicQuoteTypeSelect?.addEventListener("change", publicRenderQuoteSelectors);
publicQuoteCategorySelect?.addEventListener("change", publicRenderQuoteSelectors);
publicQuoteProductSelect?.addEventListener("change", publicUpdateQuotePrices);

publicBillForm?.addEventListener("input", (event) => {
  const qtyInput = event.target.closest("[data-public-bill-qty]");
  if (qtyInput) {
    const index = Number(qtyInput.dataset.publicBillQty);
    if (publicBillItems[index]) publicBillItems[index].qty = Math.max(1, Number(qtyInput.value) || 1);
    publicRenderBillItems();
    return;
  }

  const rateInput = event.target.closest("[data-public-bill-rate]");
  if (rateInput) {
    const index = Number(rateInput.dataset.publicBillRate);
    if (publicBillItems[index]) publicBillItems[index].rate = Math.max(0, Number(rateInput.value) || 0);
    publicRenderBillItems();
    return;
  }

  if (event.target.matches('input[name="discount"], input[name="paidAmount"], select[name="gstMode"]')) publicRenderBillItems();

  if (event.target.matches('input[name="customerPincode"], input[name="customerPhone"]')) {
    event.target.value = event.target.value.replace(/\D/g, "");
  }
});

publicEstimateForm?.addEventListener("input", (event) => {
  const qty = event.target.closest("[data-public-quote-qty]");
  const mrp = event.target.closest("[data-public-quote-mrp]");
  const rate = event.target.closest("[data-public-quote-rate]");
  if (qty && publicQuoteItems[Number(qty.dataset.publicQuoteQty)]) {
    publicQuoteItems[Number(qty.dataset.publicQuoteQty)].qty = Math.max(1, Number(qty.value) || 1);
  } else if (mrp && publicQuoteItems[Number(mrp.dataset.publicQuoteMrp)]) {
    publicQuoteItems[Number(mrp.dataset.publicQuoteMrp)].mrp = Math.max(0, Number(mrp.value) || 0);
  } else if (rate && publicQuoteItems[Number(rate.dataset.publicQuoteRate)]) {
    publicQuoteItems[Number(rate.dataset.publicQuoteRate)].wholesaleRate = Math.max(0, Number(rate.value) || 0);
  } else {
    if (event.target.matches('input[name="dealerPhone"]')) event.target.value = event.target.value.replace(/\D/g, "");
    return;
  }
  publicRenderQuoteItems();
});

if (window.location.hash === "#generate-bill") {
  window.addEventListener("load", publicOpenBillDialog);
}
