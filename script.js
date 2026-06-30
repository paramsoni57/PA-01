const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const productTrack = document.querySelector(".product-track");
const filterButtons = document.querySelectorAll("[data-filter]");
const productCards = document.querySelectorAll(".product-card");
const industryButtons = document.querySelectorAll("[data-industry]");
const industryNote = document.querySelector("#industry-note");
const modal = document.querySelector(".quote-modal");
const languageControls = document.querySelectorAll("[data-language-select]");
const siteExitButton = document.querySelector("[data-site-exit]");
let currentLanguage = "en";

document.addEventListener("click", async (event) => {
  const catalogueLink = event.target.closest("[data-product-catalogue]");
  if (!catalogueLink || catalogueLink.dataset.catalogueReady !== "false") return;
  event.preventDefault();

  if (window.location.protocol !== "file:") {
    try {
      const response = await fetch("/api/company-profile", { cache: "no-store" });
      if (response.ok) {
        const data = await response.json();
        if (data.profile) window.ParamCompanyProfile?.setProfile?.(data.profile);
      }
    } catch (error) {
      // The alert below explains the user-facing state if the catalogue is still unavailable.
    }
  }

  if (catalogueLink.dataset.catalogueReady === "true" && catalogueLink.href && catalogueLink.getAttribute("href") !== "#") {
    window.location.href = catalogueLink.href;
    return;
  }

  alert("Product catalogue PDF is not uploaded yet. Please contact Param Automation or try again later.");
});

document.addEventListener("error", (event) => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied === "true") return;
  const originalSource = image.getAttribute("src") || image.currentSrc || "";
  const bundledSource = window.ParamImageBundle?.resolve?.(originalSource) || originalSource;
  image.dataset.fallbackApplied = "true";
  image.src = bundledSource !== originalSource ? bundledSource : window.ParamImageBundle?.resolve?.("assets/brand/logo.jpg") || "assets/brand/logo.jpg";
}, true);

siteExitButton?.addEventListener("click", () => {
  window.close();
  if (!window.closed) {
    const currentTab = window.open("", "_self");
    currentTab?.close();
  }
  setTimeout(() => {
    if (!window.closed) window.location.replace("about:blank");
  }, 100);
});

const cleanHindiTranslations = {
  "topbar.tagline": "Admin Dashboard",
  "language.label": "भाषा",
  "nav.home": "होम",
  "nav.about": "हमारे बारे में",
  "nav.products": "उत्पाद",
  "nav.services": "सेवाएं",
  "nav.gallery": "गैलरी",
  "nav.blog": "ब्लॉग",
  "nav.bill": "बिल बनाएं",
  "nav.contact": "संपर्क करें",
  "nav.quote": "कोटेशन लें",
  "hero.title": "स्मार्ट समाधान",
  "hero.subtitle": "हर घर, कृषि और उद्योग के लिए",
  "hero.text": "बुद्धिमान ऑटोमेशन उत्पाद जो दक्षता बढ़ाते हैं, ऊर्जा बचाते हैं, सुरक्षा बेहतर करते हैं और रोजमर्रा के कार्यों को आसान बनाते हैं।",
  "hero.products": "उत्पाद देखें",
  "hero.contact": "संपर्क करें",
  "features.innovative": "नवीन तकनीक",
  "features.energy": "ऊर्जा बचत",
  "features.reliable": "विश्वसनीय उत्पाद",
  "features.support": "विशेषज्ञ तकनीकी सहायता",
  "features.custom": "कस्टम समाधान",
  "features.customers": "1000+ संतुष्ट ग्राहक",
  "products.title": "हमारे उत्पाद",
  "products.subtitle": "दैनिक जरूरतों के लिए स्मार्ट समाधान",
  "filters.all": "सभी",
  "filters.home": "होम",
  "filters.industry": "इंडस्ट्री",
  "filters.water": "वॉटर",
  "filters.security": "सिक्योरिटी",
  "product.starter.title": "डिजिटल मोटर स्टार्टर",
  "product.starter.text": "स्मार्ट फीचर्स और ऑटोमैटिक कंट्रोल के साथ एडवांस मोटर सुरक्षा।",
  "product.home.title": "स्मार्ट होम ऑटोमेशन",
  "product.home.text": "लाइट, स्विच, सुरक्षा और ऊर्जा मॉनिटरिंग को एक सिस्टम से ऑटोमेट करें।",
  "product.water.title": "वॉटर प्यूरीफायर और सॉफ्टनर",
  "product.water.text": "घर, उद्योग और कमर्शियल स्थानों के लिए शुद्ध और सॉफ्ट पानी समाधान।",
  "product.security.title": "सिक्योरिटी और सर्विलांस",
  "product.security.text": "सुरक्षा और रिमोट मॉनिटरिंग के लिए उन्नत CCTV और सुरक्षा सिस्टम।",
  "industries.title": "हम जिन क्षेत्रों में सेवा देते हैं",
  "industries.subtitle": "घर, खेत और सुविधाओं के लिए ऑटोमेशन",
  "industry.note": "एक क्षेत्र चुनें और देखें कि Param Automation कैसे समाधान दे सकता है।",
  "stats.years": "वर्षों का अनुभव",
  "stats.customers": "संतुष्ट ग्राहक",
  "stats.installed": "इंस्टॉल किए गए उत्पाद",
  "cta.title": "क्या आप अपनी दुनिया ऑटोमेट करना चाहते हैं?",
  "cta.text": "आइए मिलकर एक स्मार्ट, सुरक्षित और अधिक कुशल भविष्य बनाएं।",
  "cta.button": "फ्री कंसल्टेशन लें",
  "footer.about": "हम घरों, कृषि और उद्योगों के लिए तकनीक और विश्वसनीयता के साथ अभिनव ऑटोमेशन समाधान प्रदान करते हैं।",
  "footer.quickLinks": "क्विक लिंक",
  "footer.products": "उत्पाद",
  "footer.contact": "संपर्क करें",
  "modal.title": "कोटेशन लें",
  "modal.text": "अपनी जरूरत बताएं, हम आपके लिए सही ऑटोमेशन समाधान तैयार करेंगे।",
};

const textTranslations = {
  hi: {
    "Explore Products": "उत्पाद देखें",
    "Contact Us": "संपर्क करें",
    "View More": "और देखें",
    "All": "सभी",
    "Industry": "इंडस्ट्री",
    "Water": "वॉटर",
    "Security": "सिक्योरिटी",
    "Smart Homes": "स्मार्ट होम",
    "Agriculture & Irrigation": "कृषि और सिंचाई",
    "Manufacturing Industries": "मैन्युफैक्चरिंग इंडस्ट्री",
    "Commercial Buildings": "कमर्शियल बिल्डिंग",
    "Schools & Institutions": "स्कूल और संस्थान",
    "Hospitals": "अस्पताल",
    "Home": "होम",
    "About Us": "हमारे बारे में",
    "Products": "उत्पाद",
    "Services": "सेवाएं",
    "Gallery": "गैलरी",
    "Blog": "ब्लॉग",
    "Quick Links": "क्विक लिंक",
    "Digital Motor Starters": "डिजिटल मोटर स्टार्टर",
    "Home Automation": "होम ऑटोमेशन",
    "Water Purifiers": "वॉटर प्यूरीफायर",
    "Water Softeners": "वॉटर सॉफ्टनर",
    "Security Systems": "सिक्योरिटी सिस्टम",
    "Accessories": "एक्सेसरीज",
    "Privacy Policy": "प्राइवेसी पॉलिसी",
    "Terms & Conditions": "नियम और शर्तें",
    "Name": "नाम",
    "Phone": "फोन",
    "Requirement": "आवश्यकता",
    "Message": "संदेश",
    "Send Request": "अनुरोध भेजें",
    "Digital Motor Starter": "डिजिटल मोटर स्टार्टर",
    "Save Money With Lower Maintenance": "कम मेंटेनेंस के साथ पैसे बचाएं",
    "A digital starter helps reduce motor rewinding, emergency repair, contact-kit replacement, electricity wastage and repeated service visits by stopping faults before they become expensive damage.": "डिजिटल स्टार्टर खराबी को महंगा नुकसान बनने से पहले रोककर मोटर रीवाइंडिंग, इमरजेंसी रिपेयर, कॉन्टैक्ट-किट बदलने, बिजली की बर्बादी और बार-बार सर्विस विजिट के खर्च को कम करने में मदद करता है।",
    "Smart Home Automation": "स्मार्ट होम ऑटोमेशन",
    "Water Purifiers & Softeners": "वॉटर प्यूरीफायर और सॉफ्टनर",
    "Advanced protection for motors with smart features and automatic control.": "स्मार्ट फीचर्स और ऑटोमैटिक कंट्रोल के साथ एडवांस मोटर सुरक्षा।",
    "Automate lighting, switches, security and energy monitoring from one system.": "लाइट, स्विच, सुरक्षा और ऊर्जा मॉनिटरिंग को एक सिस्टम से ऑटोमेट करें।",
    "Pure and soft water solutions for homes, industries and commercial spaces.": "घर, उद्योग और कमर्शियल स्थानों के लिए शुद्ध और सॉफ्ट पानी समाधान।",
    "Advanced CCTV and security systems for remote monitoring and safety.": "सुरक्षा और रिमोट मॉनिटरिंग के लिए एडवांस CCTV और सिक्योरिटी सिस्टम।",
    "Select an industry to see how we can tailor a solution.": "एक क्षेत्र चुनें और देखें कि हम आपके लिए कैसे समाधान तैयार कर सकते हैं।",
    "We provide innovative automation solutions for homes, agriculture and industries with the perfect blend of technology and reliability.": "हम घरों, कृषि और उद्योगों के लिए तकनीक और विश्वसनीयता के सही मेल के साथ अभिनव ऑटोमेशन समाधान प्रदान करते हैं।",
    "Website": "वेबसाइट",
    "View on Google Maps": "Google Maps पर देखें",
    "Generate Bill": "बिल बनाएं",
    "Enter password": "पासवर्ड दर्ज करें",
    "Bill Password": "बिल पासवर्ड",
    "Unlock Bill Form": "बिल फॉर्म खोलें",
    "Estimate Quotation": "अनुमानित कोटेशन",
    "Bill Number": "बिल नंबर",
    "Billing Date": "बिल दिनांक",
    "Customer Name": "ग्राहक का नाम",
    "Customer Mobile": "ग्राहक मोबाइल",
    "Customer GSTIN": "ग्राहक GSTIN",
    "GST Option": "GST विकल्प",
    "Customer Address": "ग्राहक पता",
    "State": "राज्य",
    "District": "जिला",
    "City / Town": "शहर / कस्बा",
    "Local Address": "स्थानीय पता",
    "Product Type": "उत्पाद प्रकार",
    "Category": "कैटेगरी",
    "Model Number": "मॉडल नंबर",
    "Rate": "रेट",
    "Paid Amount": "भुगतान राशि",
    "Bill Paid Date": "बिल भुगतान दिनांक",
    "Remarks": "टिप्पणी",
    "Generate PDF / Print": "PDF बनाएं / प्रिंट करें",
    "Print Shipping Label": "शिपिंग लेबल प्रिंट करें",
    "Share Bill Details On WhatsApp": "बिल विवरण WhatsApp पर भेजें",
    "Clear Bill": "बिल साफ करें",
    "Quotation Number": "कोटेशन नंबर",
    "Quotation Date": "कोटेशन दिनांक",
    "Dealer Name": "डीलर का नाम",
    "Dealer Mobile": "डीलर मोबाइल",
    "Dealer Address": "डीलर पता",
    "Wholesale Price": "होलसेल कीमत",
    "Generate Estimate PDF / Print": "अनुमान PDF बनाएं / प्रिंट करें",
    "Share To Dealer WhatsApp": "डीलर WhatsApp पर भेजें",
    "Clear Estimate": "अनुमान साफ करें",
    "Water Purifier / Softener": "वॉटर प्यूरीफायर / सॉफ्टनर",
    "Security & Surveillance": "सिक्योरिटी और सर्विलांस",
    "Custom Automation": "कस्टम ऑटोमेशन",
    "About Param Automation": "Param Automation के बारे में",
    "Smart Living, Safe Living, Luxury Living": "स्मार्ट लिविंग, सेफ लिविंग, लग्जरी लिविंग",
    "Founded in 2024 by Param Soni, Param Automation was established with a vision to make everyday living smarter, safer and more comfortable through practical automation technology.": "2024 में Param Soni द्वारा स्थापित Param Automation का उद्देश्य व्यावहारिक ऑटोमेशन तकनीक से दैनिक जीवन को अधिक स्मार्ट, सुरक्षित और आरामदायक बनाना है।",
    "Founded in": "स्थापना वर्ष",
    "was established with a vision to make everyday living smarter, safer and more comfortable through practical automation technology.": "की स्थापना व्यावहारिक ऑटोमेशन तकनीक से दैनिक जीवन को अधिक स्मार्ट, सुरक्षित और आरामदायक बनाने के उद्देश्य से हुई।",
    "Founded": "स्थापना",
    "Years R&D Experience": "वर्ष R&D अनुभव",
    "Core Segments": "मुख्य क्षेत्र",
    "Company Profile": "कंपनी प्रोफाइल",
    "Precision Innovation for Smart Living": "स्मार्ट जीवन के लिए सटीक नवाचार",
    "Founder & CEO": "संस्थापक और CEO",
    "Core Focus": "मुख्य फोकस",
    "Homes, Agriculture & Industries": "घर, कृषि और उद्योग",
    "Specialization": "विशेषज्ञता",
    "Smart automation, water management and motor protection": "स्मार्ट ऑटोमेशन, जल प्रबंधन और मोटर सुरक्षा",
    "Our Foundation": "हमारी नींव",
    "Built From Real Problems And Field Experience": "वास्तविक समस्याओं और फील्ड अनुभव से निर्मित",
    "The foundation of Param Automation is built upon more than 10 years of research, development, testing and real-world experience. During this journey, we closely observed the challenges faced by homeowners, farmers and industries in managing water, energy and daily operations efficiently.": "Param Automation की नींव 10 वर्षों से अधिक के शोध, विकास, परीक्षण और वास्तविक अनुभव पर आधारित है। इस यात्रा में हमने घरों, किसानों और उद्योगों के सामने पानी, ऊर्जा और दैनिक संचालन को कुशलता से संभालने वाली चुनौतियों को नजदीक से देखा।",
    "One of the most common problems we encountered was poor water management. Thousands of homes and agricultural users face water tank overflows, unnecessary water wastage, excessive electricity consumption, continuous motor running and motor burnouts caused by dry running or improper operation.": "सबसे आम समस्याओं में से एक खराब जल प्रबंधन थी। हजारों घरों और कृषि उपयोगकर्ताओं को टैंक ओवरफ्लो, अनावश्यक पानी की बर्बादी, अधिक बिजली खपत, लगातार मोटर चलना और ड्राई रन या गलत संचालन से मोटर जलने जैसी समस्याएं होती हैं।",
    "Rather than accepting these problems as unavoidable, we made it our mission to develop smarter and more reliable solutions. After years of research and field testing, Param Automation introduced advanced Digital Motor Starters with Fully Automatic Water Level Control Systems.": "इन समस्याओं को सामान्य मानने के बजाय हमने स्मार्ट और विश्वसनीय समाधान विकसित करने को अपना मिशन बनाया। वर्षों के शोध और फील्ड टेस्टिंग के बाद Param Automation ने पूर्ण ऑटोमैटिक वॉटर लेवल कंट्रोल सिस्टम के साथ एडवांस डिजिटल मोटर स्टार्टर पेश किए।",
    "Our Driving Force": "हमारी प्रेरणा",
    "Automation That Protects Motors, Saves Water And Reduces Manual Work": "ऑटोमेशन जो मोटर की सुरक्षा करे, पानी बचाए और मैनुअल काम घटाए",
    "Our products are designed to automate water management, protect motors, conserve water, reduce electricity consumption and remove the need for constant manual monitoring.": "हमारे उत्पाद जल प्रबंधन को ऑटोमेट करने, मोटर की सुरक्षा करने, पानी बचाने, बिजली की खपत कम करने और लगातार मैनुअल निगरानी की जरूरत हटाने के लिए बनाए गए हैं।",
    "Technology | Safety | Comfort | Efficiency | Luxury": "तकनीक | सुरक्षा | आराम | दक्षता | लग्जरी",
    "What We Do": "हम क्या करते हैं",
    "Intelligent Solutions For Homes, Agriculture And Industries": "घर, कृषि और उद्योगों के लिए इंटेलिजेंट समाधान",
    "Smart Water Management": "स्मार्ट जल प्रबंधन",
    "Fully Automatic Water Level Controllers": "पूर्ण ऑटोमैटिक वॉटर लेवल कंट्रोलर",
    "Smart Pump Protection Systems": "स्मार्ट पंप प्रोटेक्शन सिस्टम",
    "Intelligent Water Management Automation": "इंटेलिजेंट जल प्रबंधन ऑटोमेशन",
    "Wi-Fi Smart Switches": "Wi-Fi स्मार्ट स्विच",
    "IoT-Based Smart Appliances": "IoT आधारित स्मार्ट उपकरण",
    "Mobile App Controlled Devices": "मोबाइल ऐप नियंत्रित डिवाइस",
    "Complete Home Automation Solutions": "पूर्ण होम ऑटोमेशन समाधान",
    "Smart Security Solutions": "स्मार्ट सुरक्षा समाधान",
    "Smart Security Cameras": "स्मार्ट सुरक्षा कैमरे",
    "Remote Monitoring Systems": "रिमोट मॉनिटरिंग सिस्टम",
    "Advanced Safety Technologies": "एडवांस सुरक्षा तकनीक",
    "Water Treatment Solutions": "वॉटर ट्रीटमेंट समाधान",
    "Zero-Maintenance Water Softeners": "जीरो-मेंटेनेंस वॉटर सॉफ्टनर",
    "Home Water Improvement Systems": "होम वॉटर इम्प्रूवमेंट सिस्टम",
    "Agricultural Water Treatment Solutions": "कृषि जल उपचार समाधान",
    "Our Philosophy": "हमारा दर्शन",
    "True Luxury Is Comfort, Safety And Reliability": "सच्ची लग्जरी आराम, सुरक्षा और विश्वसनीयता है",
    "At Param Automation, we believe luxury is not just about expensive products. True luxury is knowing your home is protected, your water is managed automatically, your energy is used efficiently and your daily life is made easier through intelligent technology.": "Param Automation में हमारा मानना है कि लग्जरी केवल महंगे उत्पादों का नाम नहीं है। सच्ची लग्जरी यह भरोसा है कि आपका घर सुरक्षित है, पानी अपने आप मैनेज हो रहा है, ऊर्जा कुशलता से उपयोग हो रही है और दैनिक जीवन इंटेलिजेंट तकनीक से आसान बन रहा है।",
    "Every product we manufacture undergoes testing and refinement to ensure reliability, durability and performance.": "हमारा हर उत्पाद विश्वसनीयता, टिकाऊपन और प्रदर्शन सुनिश्चित करने के लिए परीक्षण और सुधार से गुजरता है।",
    "Vision": "विजन",
    "Mission": "मिशन",
    "To become a trusted leader in Smart Home, Agriculture and Industrial Automation by delivering innovative solutions that improve everyday life and create a smarter future.": "स्मार्ट होम, कृषि और इंडस्ट्रियल ऑटोमेशन में भरोसेमंद लीडर बनना, जो दैनिक जीवन को बेहतर बनाने और स्मार्ट भविष्य बनाने वाले समाधान प्रदान करे।",
    "To develop intelligent automation products that enhance comfort, improve safety, conserve resources and empower customers with reliable technology.": "ऐसे इंटेलिजेंट ऑटोमेशन उत्पाद विकसित करना जो आराम बढ़ाएं, सुरक्षा सुधारें, संसाधन बचाएं और ग्राहकों को विश्वसनीय तकनीक से सक्षम बनाएं।",
    "Leadership Message": "लीडरशिप संदेश",
    "Message from the Founder & CEO": "संस्थापक और CEO का संदेश",
    "Param Automation was born from a simple observation: many everyday problems can be solved through intelligent automation. Our journey began with water management challenges faced by families and farmers, and it has evolved into a mission to create smart solutions that improve lives. Every product we build reflects our commitment to innovation, reliability and customer satisfaction.": "Param Automation एक सरल अवलोकन से शुरू हुआ: दैनिक जीवन की कई समस्याएं इंटेलिजेंट ऑटोमेशन से हल की जा सकती हैं। हमारी यात्रा परिवारों और किसानों की जल प्रबंधन चुनौतियों से शुरू हुई और आज जीवन को बेहतर बनाने वाले स्मार्ट समाधान बनाने के मिशन में बदल चुकी है। हमारा हर उत्पाद नवाचार, विश्वसनीयता और ग्राहक संतुष्टि के प्रति हमारी प्रतिबद्धता को दर्शाता है।",
    "Founder & CEO, Param Automation": "संस्थापक और CEO, Param Automation",
    "Param Automation Products": "Param Automation उत्पाद",
    "Select a starter, review pricing and offers, then open product details or share your requirement for order confirmation.": "स्टार्टर चुनें, कीमत और ऑफर देखें, फिर उत्पाद विवरण खोलें या ऑर्डर पुष्टि के लिए अपनी आवश्यकता भेजें।",
    "About Digital Starter": "डिजिटल स्टार्टर के बारे में",
    "View Products": "उत्पाद देखें",
    "View Product": "उत्पाद देखें",
    "Download Product Catalogue": "उत्पाद कैटलॉग डाउनलोड करें",
    "Microcontroller-Based Smart Motor Protection": "माइक्रोकंट्रोलर आधारित स्मार्ट मोटर सुरक्षा",
    "Param Automation Digital Motor Starter continuously monitors motor voltage, current and operating conditions in real time to protect your motor, save electricity and simplify water management.": "Param Automation डिजिटल मोटर स्टार्टर आपकी मोटर की सुरक्षा, बिजली बचत और जल प्रबंधन को आसान बनाने के लिए वोल्टेज, करंट और संचालन स्थिति को रियल टाइम में मॉनिटर करता है।",
    "Introduction": "परिचय",
    "Traditional motor starters are designed with fixed operating parameters, regardless of motor load, power conditions or application requirements. In homes and agricultural fields, this can lead to motor burnout, starter damage, excessive electricity consumption, dry running and costly maintenance.": "पारंपरिक मोटर स्टार्टर फिक्स पैरामीटर पर काम करते हैं, मोटर लोड, पावर कंडीशन या उपयोग की जरूरतों के अनुसार नहीं। घरों और कृषि क्षेत्रों में इससे मोटर जलना, स्टार्टर खराब होना, अधिक बिजली खपत, ड्राई रन और महंगा मेंटेनेंस हो सकता है।",
    "Fluctuating voltage, overload conditions, phase failures and poor power supply can reduce motor life. Conventional starters are unable to adapt to changing conditions, leaving motors vulnerable to damage and downtime.": "वोल्टेज उतार-चढ़ाव, ओवरलोड, फेज फेलियर और खराब पावर सप्लाई मोटर की उम्र कम कर सकती है। सामान्य स्टार्टर बदलती स्थितियों के अनुसार काम नहीं कर पाते, जिससे मोटर नुकसान और डाउनटाइम के जोखिम में रहती है।",
    "Param Automation has developed an advanced Microcontroller-Based Digital Motor Starter that is customizable according to the motor rated current and site requirement, ensuring maximum protection, efficiency and reliability.": "Param Automation ने एडवांस माइक्रोकंट्रोलर आधारित डिजिटल मोटर स्टार्टर विकसित किया है, जिसे मोटर रेटेड करंट और साइट आवश्यकता के अनुसार कस्टमाइज किया जा सकता है, जिससे अधिकतम सुरक्षा, दक्षता और विश्वसनीयता मिलती है।",
    "Smart Protection. Smart Water Management. Smart Living.": "स्मार्ट सुरक्षा। स्मार्ट जल प्रबंधन। स्मार्ट जीवन।",
    "Protect your motor from damage, save electricity, prevent water wastage and get complete peace of mind through intelligent automation.": "इंटेलिजेंट ऑटोमेशन से अपनी मोटर को नुकसान से बचाएं, बिजली बचाएं, पानी की बर्बादी रोकें और पूर्ण शांति पाएं।",
    "High & Low Voltage Protection": "हाई और लो वोल्टेज सुरक्षा",
    "The starter monitors supply voltage and switches off the motor during unsafe high or low voltage conditions.": "स्टार्टर सप्लाई वोल्टेज मॉनिटर करता है और असुरक्षित हाई या लो वोल्टेज पर मोटर बंद कर देता है।",
    "Electronic Overload Protection": "इलेक्ट्रॉनिक ओवरलोड सुरक्षा",
    "Advanced overload monitoring prevents excessive current draw, overheating and winding damage.": "एडवांस ओवरलोड मॉनिटरिंग अधिक करंट, ओवरहीटिंग और वाइंडिंग डैमेज से बचाती है।",
    "Dry Run Protection": "ड्राई रन सुरक्षा",
    "When water is unavailable or load is insufficient, the system stops the motor to prevent burnout.": "पानी उपलब्ध न होने या लोड कम होने पर सिस्टम मोटर को बंद कर देता है ताकि मोटर जलने से बचे।",
    "Single Phasing Protection": "सिंगल फेजिंग सुरक्षा",
    "The starter monitors all supply phases and prevents operation if any phase is missing or faulty.": "स्टार्टर सभी सप्लाई फेज मॉनिटर करता है और किसी फेज के मिसिंग या खराब होने पर ऑपरेशन रोकता है।",
    "Automatic Restart Function": "ऑटोमैटिक रीस्टार्ट फंक्शन",
    "After temporary faults are resolved, the starter can automatically restore operation for convenience.": "अस्थायी फॉल्ट ठीक होने के बाद स्टार्टर सुविधा के लिए ऑपरेशन अपने आप शुरू कर सकता है।",
    "Auto & Manual Operation": "ऑटो और मैनुअल ऑपरेशन",
    "Users can switch between automatic and manual operation whenever site conditions require it.": "यूजर साइट की जरूरत के अनुसार ऑटोमैटिक और मैनुअल ऑपरेशन में स्विच कर सकते हैं।",
    "Fully Customizable Settings": "पूर्ण कस्टमाइज सेटिंग्स",
    "Every protection parameter can be adjusted according to motor and site requirements.": "हर सुरक्षा पैरामीटर मोटर और साइट की जरूरत के अनुसार सेट किया जा सकता है।",
    "Motor Current Limits": "मोटर करंट लिमिट",
    "High Voltage Cut-Off": "हाई वोल्टेज कट-ऑफ",
    "Low Voltage Cut-Off": "लो वोल्टेज कट-ऑफ",
    "Overload Settings": "ओवरलोड सेटिंग्स",
    "Dry Run Sensitivity": "ड्राई रन सेंसिटिविटी",
    "Restart Delay Time": "रीस्टार्ट डिले टाइम",
    "Operating Timers": "ऑपरेटिंग टाइमर",
    "Water Management Functions": "जल प्रबंधन फंक्शन",
    "Built-In Automation Features": "इन-बिल्ट ऑटोमेशन फीचर्स",
    "The starter is designed for reliable home and agricultural automation.": "यह स्टार्टर भरोसेमंद होम और कृषि ऑटोमेशन के लिए डिजाइन किया गया है।",
    "Timer-Based Operation for scheduled motor use": "शेड्यूल मोटर उपयोग के लिए टाइमर आधारित ऑपरेशन",
    "Long-Range Remote Operation up to 2 kilometers with compatible systems": "कम्पैटिबल सिस्टम के साथ 2 किलोमीटर तक लंबी दूरी का रिमोट ऑपरेशन",
    "Automatic Tank Filling when overhead tank level is low": "ओवरहेड टैंक का लेवल कम होने पर ऑटोमैटिक टैंक भरना",
    "Automatic Motor Stop when the tank is full": "टैंक भरने पर ऑटोमैटिक मोटर बंद",
    "Overflow Prevention for efficient water usage": "कुशल जल उपयोग के लिए ओवरफ्लो रोकथाम",
    "Benefits": "लाभ",
    "Protects motors from burnout": "मोटर को जलने से बचाता है",
    "Prevents starter damage": "स्टार्टर डैमेज रोकता है",
    "Saves electricity costs": "बिजली खर्च बचाता है",
    "Prevents water overflow": "पानी ओवरफ्लो रोकता है",
    "Reduces maintenance expenses": "मेंटेनेंस खर्च कम करता है",
    "Extends motor life": "मोटर की उम्र बढ़ाता है",
    "Automatic water management": "ऑटोमैटिक जल प्रबंधन",
    "Remote operation capability": "रिमोट ऑपरेशन सुविधा",
    "Fully customizable protection settings": "पूर्ण कस्टमाइज सुरक्षा सेटिंग्स",
    "Reliable performance for home and agricultural applications": "घर और कृषि उपयोग के लिए विश्वसनीय प्रदर्शन",
    "Starter Products": "स्टार्टर उत्पाद",
    "Single Phase": "सिंगल फेज",
    "Three Phase": "थ्री फेज",
    "Two Phase": "टू फेज",
    "Sensor": "सेंसर",
    "Sensors / Remote": "सेंसर / रिमोट",
    "Remote": "रिमोट",
    "Remote Heavy Duty": "रिमोट हेवी ड्यूटी",
    "i has a range of 100 mtr only for house uses": "इसकी रेंज 100 मीटर है, केवल घर के उपयोग के लिए",
    "It Has Remote Control range of 1.5 km to 2 km its a very log range uses for Agriculture only": "इसमें रिमोट कंट्रोल की रेंज 1.5 किमी से 2 किमी तक है, यह बहुत लंबी रेंज का है और केवल कृषि उपयोग के लिए है",
    "Magnetic Float sensor": "मैग्नेटिक फ्लोट सेंसर",
    "very Heavy Duty Megantic Float Swich sensor": "बहुत हेवी ड्यूटी मैग्नेटिक फ्लोट स्विच सेंसर",
    "Three Phase Digital Starter With Motor Protection": "मोटर सुरक्षा के साथ थ्री फेज डिजिटल स्टार्टर",
    "Digital Motor/AC Starter With Voltage Protection": "वोल्टेज सुरक्षा के साथ डिजिटल मोटर/AC स्टार्टर",
    "Three phase electronic motor starter for motors up to 7.5 HP with motor protection features.": "7.5 HP तक की मोटर के लिए मोटर सुरक्षा फीचर्स वाला थ्री फेज इलेक्ट्रॉनिक मोटर स्टार्टर।",
    "Digital Motor/AC Starter with voltage, electronic overload and dry run protection.": "वोल्टेज, इलेक्ट्रॉनिक ओवरलोड और ड्राई रन सुरक्षा वाला डिजिटल मोटर/AC स्टार्टर।",
    "Model": "मॉडल",
    "In Stock": "स्टॉक में",
    "Out Of Stock": "स्टॉक में नहीं",
    "MRP": "MRP",
    "Product Details": "उत्पाद विवरण",
    "Buy Product": "उत्पाद खरीदें",
    "Buy Product": "उत्पाद खरीदें",
    "Select quantity, add more starter items if needed, then send requirement on WhatsApp.": "मात्रा चुनें, जरूरत हो तो और स्टार्टर आइटम जोड़ें, फिर WhatsApp पर आवश्यकता भेजें।",
    "Product": "उत्पाद",
    "Qty": "मात्रा",
    "Add Item": "आइटम जोड़ें",
    "No items added yet.": "अभी कोई आइटम नहीं जोड़ा गया।",
    "Shipping charges extra, if applicable.": "लागू होने पर शिपिंग चार्ज अतिरिक्त।",
    "Full Name": "पूरा नाम",
    "Mobile Number": "मोबाइल नंबर",
    "Pincode": "पिनकोड",
    "Delivery Address": "डिलीवरी पता",
    "Message / Requirement": "संदेश / आवश्यकता",
    "Send Requirement on WhatsApp": "WhatsApp पर आवश्यकता भेजें",
    "Product rating": "उत्पाद रेटिंग",
    "Reviews": "रिव्यू",
    "Your Price": "आपकी कीमत",
    "Inclusive of all taxes": "सभी टैक्स सहित",
    "Offers": "ऑफर",
    "Free installation guide": "फ्री इंस्टॉलेशन गाइड",
    "Free WhatsApp technical support": "फ्री WhatsApp तकनीकी सहायता",
    "Bulk order discount available": "बल्क ऑर्डर डिस्काउंट उपलब्ध",
    "Free software updates": "फ्री सॉफ्टवेयर अपडेट",
    "1 year warranty": "1 वर्ष वारंटी",
    "Buy Now": "अभी खरीदें",
    "Share Product": "प्रोडक्ट शेयर करें",
    "Call Now": "अभी कॉल करें",
    "Call For Best Price": "सर्वश्रेष्ठ कीमत के लिए कॉल करें",
    "Improve Motor Life": "मोटर की आयु बढ़ाएं",
    "In the Box": "बॉक्स में शामिल सामग्री",
    "Final price is inclusive of all taxes, and prices may vary as per market conditions.": "अंतिम कीमत में सभी कर शामिल हैं, और बाजार की स्थिति के अनुसार कीमत बदल सकती है।",
    "Remote Control": "रिमोट कंट्रोल",
    "Overload Protection": "ओवरलोड सुरक्षा",
    "Under/Over Voltage Protection": "अंडर/ओवर वोल्टेज सुरक्षा",
    "Auto Water Level Control": "ऑटो वॉटर लेवल कंट्रोल",
    "Phase Failure Protection": "फेज फेलियर सुरक्षा",
    "Pump Protection": "पंप सुरक्षा",
    "Timer & Auto Function": "टाइमर और ऑटो फंक्शन",
    "Overview": "ओवरव्यू",
    "Specifications": "स्पेसिफिकेशन",
    "SOP Procedure": "SOP प्रक्रिया",
    "Installation Guide": "इंस्टॉलेशन गाइड",
    "Videos": "वीडियो",
    "About Product": "उत्पाद के बारे में",
    "Technical Specifications": "तकनीकी स्पेसिफिकेशन",
    "Top Features": "मुख्य फीचर्स",
    "SOP (Standard Operating Procedure)": "SOP (स्टैंडर्ड ऑपरेटिंग प्रोसीजर)",
    "Installation Instruction": "इंस्टॉलेशन निर्देश",
    "Product Introduction": "उत्पाद परिचय",
    "Installation Video": "इंस्टॉलेशन वीडियो",
    "SOP Training Video": "SOP ट्रेनिंग वीडियो",
    "Play": "चलाएं",
    "Voltage": "वोल्टेज",
    "Frequency": "फ्रीक्वेंसी",
    "Motor Capacity": "मोटर क्षमता",
    "Starting Type": "स्टार्टिंग टाइप",
    "Display": "डिस्प्ले",
    "Protection": "सुरक्षा",
    "Warranty": "वारंटी",
    "Digital LED Display": "डिजिटल LED डिस्प्ले",
    "Multiple Protection": "मल्टीपल सुरक्षा",
    "Digital SSD Display": "डिजिटल SSD डिस्प्ले",
    "Normal Starter": "नॉर्मल स्टार्टर",
    "Voltage Protection": "वोल्टेज सुरक्षा",
    "Manual Start/Stop Control": "मैनुअल स्टार्ट/स्टॉप कंट्रोल",
    "PARAM Three Phase Digital Starter is a smart and reliable device designed to protect and automate motors for agricultural and industrial operations.": "PARAM थ्री फेज डिजिटल स्टार्टर कृषि और औद्योगिक संचालन के लिए मोटर को सुरक्षित और ऑटोमेट करने वाला स्मार्ट और विश्वसनीय उपकरण है।",
    "Digital Motor/AC Starter with voltage protection, electronic overload protection and dry run protection for single phase motor or AC starter applications.": "सिंगल फेज मोटर या AC स्टार्टर उपयोग के लिए वोल्टेज सुरक्षा, इलेक्ट्रॉनिक ओवरलोड सुरक्षा और ड्राई रन सुरक्षा वाला डिजिटल मोटर/AC स्टार्टर।",
    "Direct On Line electronic motor starter for 415V, 3 phase, 50Hz AC supply.": "415V, 3 फेज, 50Hz AC सप्लाई के लिए Direct On Line इलेक्ट्रॉनिक मोटर स्टार्टर।",
    "Suitable for three phase motors up to 7.5 HP after site and load confirmation.": "साइट और लोड पुष्टि के बाद 7.5 HP तक की थ्री फेज मोटर के लिए उपयुक्त।",
    "Digital voltage and ampere display with Auto/Manual operation control.": "ऑटो/मैनुअल ऑपरेशन कंट्रोल के साथ डिजिटल वोल्टेज और एम्पियर डिस्प्ले।",
    "Includes high/low voltage protection, single phase protection, overload protection and dry run protection.": "हाई/लो वोल्टेज सुरक्षा, सिंगल फेज सुरक्षा, ओवरलोड सुरक्षा और ड्राई रन सुरक्षा शामिल।",
    "Confirm motor HP, supply voltage and wiring condition before installation.": "इंस्टॉलेशन से पहले मोटर HP, सप्लाई वोल्टेज और वायरिंग स्थिति की पुष्टि करें।",
    "Set protection values according to motor requirement and site condition.": "मोटर आवश्यकता और साइट स्थिति के अनुसार सुरक्षा वैल्यू सेट करें।",
    "Test start, stop, auto/manual mode and protection response before regular use.": "नियमित उपयोग से पहले स्टार्ट, स्टॉप, ऑटो/मैनुअल मोड और सुरक्षा रिस्पॉन्स टेस्ट करें।",
    "Install the starter in a dry and protected location.": "स्टार्टर को सूखी और सुरक्षित जगह पर इंस्टॉल करें।",
    "Use correct MCB/contactor/wiring according to motor load.": "मोटर लोड के अनुसार सही MCB/कॉन्टैक्टर/वायरिंग का उपयोग करें।",
    "Connect R/Y/B input and output terminals properly.": "R/Y/B इनपुट और आउटपुट टर्मिनल सही तरीके से कनेक्ट करें।",
    "Installation should be completed by a qualified electrician only.": "इंस्टॉलेशन केवल योग्य इलेक्ट्रीशियन द्वारा किया जाना चाहिए।",
    "Digital Motor/AC Starter for single phase motor applications.": "सिंगल फेज मोटर उपयोग के लिए डिजिटल मोटर/AC स्टार्टर।",
    "Designed with voltage, electronic overload and dry run protection.": "वोल्टेज, इलेक्ट्रॉनिक ओवरलोड और ड्राई रन सुरक्षा के साथ डिजाइन किया गया।",
    "Suitable for mono block pump applications up to 1.5 HP after site confirmation.": "साइट पुष्टि के बाद 1.5 HP तक के मोनो ब्लॉक पंप उपयोग के लिए उपयुक्त।",
    "Check power supply before starting.": "स्टार्ट करने से पहले पावर सप्लाई जांचें।",
    "Confirm input and output wiring is connected correctly.": "इनपुट और आउटपुट वायरिंग सही तरीके से कनेक्ट है इसकी पुष्टि करें।",
    "Turn ON the main supply.": "मेन सप्लाई ON करें।",
    "Press START and monitor voltage/current display.": "START दबाएं और वोल्टेज/करंट डिस्प्ले मॉनिटर करें।",
    "Use STOP/RESET to stop or reset the starter.": "स्टार्टर रोकने या रीसेट करने के लिए STOP/RESET का उपयोग करें।",
    "Install in a dry and protected location.": "सूखी और सुरक्षित जगह पर इंस्टॉल करें।",
    "Connect input P/N and output P/N terminals properly.": "इनपुट P/N और आउटपुट P/N टर्मिनल सही तरीके से कनेक्ट करें।",
    "Use correct wiring and earthing as per motor load.": "मोटर लोड के अनुसार सही वायरिंग और अर्थिंग का उपयोग करें।",
    "Set protection values according to motor requirement.": "मोटर आवश्यकता के अनुसार सुरक्षा वैल्यू सेट करें।",
    "Product Full Details": "उत्पाद का पूरा विवरण",
    "SOP Content Video": "SOP कंटेंट वीडियो",
    "SOP video will be added here.": "SOP वीडियो यहां जोड़ा जाएगा।",
    "Installation video will be added here.": "इंस्टॉलेशन वीडियो यहां जोड़ा जाएगा।",
    "Check power supply.": "पावर सप्लाई जांचें।",
    "Ensure motor wiring is correct.": "सुनिश्चित करें कि मोटर वायरिंग सही है।",
    "Press START button.": "START बटन दबाएं।",
    "Monitor display and motor status.": "डिस्प्ले और मोटर स्थिति मॉनिटर करें।",
    "Install in a dry protected location.": "सूखी और सुरक्षित जगह पर इंस्टॉल करें।",
    "Connect R/Y/B input and output terminals properly.": "R/Y/B इनपुट और आउटपुट टर्मिनल सही तरीके से कनेक्ट करें।",
    "Use correct wiring and earthing.": "सही वायरिंग और अर्थिंग का उपयोग करें।",
    "Installation by qualified electrician only.": "इंस्टॉलेशन केवल योग्य इलेक्ट्रीशियन द्वारा करें।",
    "Under Voltage Protection": "अंडर वोल्टेज सुरक्षा",
    "Over Voltage Protection": "ओवर वोल्टेज सुरक्षा",
    "Auto Restart Function": "ऑटो रीस्टार्ट फंक्शन",
    "Timer Function": "टाइमर फंक्शन",
    "1 Year": "1 वर्ष",
    "1 Year Warranty": "1 वर्ष वारंटी",
    "Voltage, Overload, Dry Run": "वोल्टेज, ओवरलोड, ड्राई रन",
    "DOL (Direct On Line)": "DOL (Direct On Line)",
    "Up to 7.5 HP": "7.5 HP तक",
  },
};

const translations = {
  en: {
    "topbar.tagline": "Admin Dashboard",
    "language.label": "Language",
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.products": "Products",
    "nav.services": "Services",
    "nav.gallery": "Gallery",
    "nav.blog": "Blog",
    "nav.bill": "Generate Bill",
    "nav.contact": "Contact Us",
    "nav.quote": "Get A Quote",
    "hero.title": "Smart Solutions",
    "hero.subtitle": "For Every Home, Agriculture & Industry",
    "hero.text": "Intelligent automation products that improve efficiency, save energy, enhance safety and simplify everyday operations.",
    "hero.products": "Explore Products",
    "hero.contact": "Contact Us",
    "features.innovative": "Innovative Technology",
    "features.energy": "Energy Efficient",
    "features.reliable": "Reliable Products",
    "features.support": "Expert Technical Support",
    "features.custom": "Customized Solutions",
    "features.customers": "1000+ Happy Customers",
    "products.title": "Our Products",
    "products.subtitle": "Solutions Built For Daily Work",
    "filters.all": "All",
    "filters.home": "Home",
    "filters.industry": "Industry",
    "filters.water": "Water",
    "filters.security": "Security",
    "product.starter.title": "Digital Motor Starters",
    "product.starter.text": "Advanced protection for motors with smart features and automatic control.",
    "product.home.title": "Smart Home Automation",
    "product.home.text": "Automate lighting, switches, security and energy monitoring from one system.",
    "product.water.title": "Water Purifiers & Softeners",
    "product.water.text": "Pure and soft water solutions for homes, industries and commercial spaces.",
    "product.security.title": "Security & Surveillance",
    "product.security.text": "Advanced CCTV and security systems for remote monitoring and safety.",
    "industries.title": "Industries We Serve",
    "industries.subtitle": "Automation For Homes, Farms And Facilities",
    "industry.note": "Select an industry to see how Param Automation can tailor a solution.",
    "stats.years": "Years of Excellence",
    "stats.customers": "Happy Customers",
    "stats.installed": "Products Installed",
    "cta.title": "Ready to Automate Your World?",
    "cta.button": "Get A Free Consultation",
    "footer.about": "We provide innovative automation solutions for homes, agriculture and industries with the perfect blend of technology and reliability.",
    "footer.quickLinks": "Quick Links",
    "footer.products": "Products",
    "footer.contact": "Contact Us",
    "modal.title": "Get A Quote",
    "modal.text": "Share your requirement and we will prepare the right automation solution.",
  },
  hi: {
    "topbar.tagline": "Admin Dashboard",
    "language.label": "भाषा",
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.products": "उत्पाद",
    "nav.services": "सेवाएं",
    "nav.gallery": "गैलरी",
    "nav.blog": "ब्लॉग",
    "nav.bill": "बिल बनाएं",
    "nav.contact": "संपर्क करें",
    "nav.quote": "कोटेशन लें",
    "features.innovative": "नवीन तकनीक",
    "features.energy": "ऊर्जा बचत",
    "features.reliable": "विश्वसनीय उत्पाद",
    "features.support": "विशेषज्ञ तकनीकी सहायता",
    "features.custom": "कस्टम समाधान",
    "features.customers": "1000+ संतुष्ट ग्राहक",
    "products.title": "हमारे उत्पाद",
    "products.subtitle": "दैनिक कार्यों के लिए स्मार्ट समाधान",
    "filters.all": "सभी",
    "filters.home": "होम",
    "filters.industry": "इंडस्ट्री",
    "filters.water": "वॉटर",
    "filters.security": "सिक्योरिटी",
    "product.starter.title": "डिजिटल मोटर स्टार्टर",
    "product.starter.text": "स्मार्ट फीचर्स और ऑटोमैटिक कंट्रोल के साथ मोटर सुरक्षा।",
    "product.home.title": "स्मार्ट होम ऑटोमेशन",
    "product.home.text": "लाइट, स्विच, सुरक्षा और ऊर्जा मॉनिटरिंग को एक सिस्टम से ऑटोमेट करें।",
    "product.water.title": "वॉटर प्यूरीफायर और सॉफ्टनर",
    "product.water.text": "घर, उद्योग और कमर्शियल स्थानों के लिए शुद्ध और सॉफ्ट पानी समाधान।",
    "product.security.title": "सिक्योरिटी और सर्विलांस",
    "product.security.text": "सुरक्षा और रिमोट मॉनिटरिंग के लिए उन्नत CCTV और सुरक्षा सिस्टम।",
    "industries.title": "हम जिन क्षेत्रों में सेवा देते हैं",
    "industries.subtitle": "घर, खेत और सुविधाओं के लिए ऑटोमेशन",
    "industry.note": "एक क्षेत्र चुनें और देखें कि Param Automation कैसे समाधान दे सकता है।",
    "stats.years": "वर्षों का अनुभव",
    "stats.customers": "संतुष्ट ग्राहक",
    "stats.installed": "इंस्टॉल किए गए उत्पाद",
    "cta.title": "क्या आप अपनी दुनिया ऑटोमेट करना चाहते हैं?",
    "cta.button": "फ्री कंसल्टेशन लें",
    "footer.about": "हम घरों, कृषि और उद्योगों के लिए तकनीक और विश्वसनीयता के साथ अभिनव ऑटोमेशन समाधान प्रदान करते हैं।",
    "footer.quickLinks": "क्विक लिंक",
    "footer.products": "उत्पाद",
    "footer.contact": "संपर्क करें",
    "modal.title": "कोटेशन लें",
    "modal.text": "अपनी जरूरत बताएं, हम आपके लिए सही ऑटोमेशन समाधान तैयार करेंगे।",
  },
};

const applyLanguage = (language) => {
  const dictionary = language === "hi" ? { ...translations.en, ...cleanHindiTranslations } : translations.en;
  currentLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = dictionary[element.dataset.i18n];
    if (value) element.textContent = value;
  });
  languageControls.forEach((control) => {
    if (control.type === "checkbox") {
      control.checked = language === "hi";
    } else {
      control.value = language;
    }
  });
  localStorage.setItem("param-language", language);
  window.ParamStarterStore?.refreshViews?.({ applyLanguage: false });
  window.ParamDigitalChoice?.applyLanguage?.(language);
  applyTextLanguage(language);
};

window.ParamLanguage = {
  applyCurrent: () => applyTextLanguage(currentLanguage),
  getCurrent: () => currentLanguage,
};

const shouldSkipTextNode = (node) => {
  const parent = node.parentElement;
  if (!parent) return true;
  return Boolean(parent.closest("script, style, noscript, svg, canvas, [data-no-translate], [data-translated-block]"));
};

const normalizedText = (value) => value.replace(/\s+/g, " ").trim();

const productParagraphTranslationsHi = {
  "The **Param Automation Single Phase Digital Control Panel with Motor Protection & Liquid Level Controller (LLC)** is a smart microcontroller-based solution designed for single-phase submersible pumps up to 2 HP. Built to provide maximum motor safety and convenience, this control panel continuously monitors the operating condition of your motor and power supply. It protects the motor from common problems such as high voltage, low voltage, overload, dry running, and single-phasing, which are among the leading causes of motor failure and costly repairs. The system is fully customized according to the motor's current rating, ensuring reliable performance and long service life.": "**Param Automation सिंगल फेज डिजिटल कंट्रोल पैनल, मोटर सुरक्षा और लिक्विड लेवल कंट्रोलर (LLC)** सिंगल फेज सबमर्सिबल पंपों के लिए एक स्मार्ट माइक्रोकंट्रोलर आधारित समाधान है, जो 2 HP तक के मोटर के लिए उपयुक्त है। यह कंट्रोल पैनल मोटर और पावर सप्लाई की स्थिति को लगातार मॉनिटर करता है, जिससे मोटर को अधिक सुरक्षा और सुविधा मिलती है। यह हाई वोल्टेज, लो वोल्टेज, ओवरलोड, ड्राई रन और सिंगल फेजिंग जैसी सामान्य समस्याओं से मोटर की सुरक्षा करता है, जो मोटर खराब होने और महंगे रिपेयर के मुख्य कारण होते हैं। यह सिस्टम मोटर की करंट रेटिंग के अनुसार पूरी तरह कस्टमाइज किया जा सकता है, जिससे भरोसेमंद प्रदर्शन और लंबी सर्विस लाइफ मिलती है।",
  "This control panel is equipped with a built-in **Fully Automatic Water Level Controller** that automatically manages water transfer between underground and overhead tanks. When the overhead tank becomes empty, the system can start the motor automatically, and once the tank is full, it stops the motor, preventing water overflow and unnecessary electricity consumption. Dry Run Protection continuously monitors water availability and immediately switches off the motor if the water source is insufficient, protecting the pump from overheating and damage. The panel also includes convenient Auto/Manual operation modes and supports remote operation, making daily water management easier and more efficient.": "इस कंट्रोल पैनल में बिल्ट-इन **फुली ऑटोमैटिक वॉटर लेवल कंट्रोलर** दिया गया है, जो अंडरग्राउंड टैंक और ओवरहेड टैंक के बीच पानी की सप्लाई को अपने आप मैनेज करता है। जब ओवरहेड टैंक खाली होता है, तो सिस्टम मोटर को अपने आप चालू कर सकता है और टैंक भर जाने पर मोटर को बंद कर देता है। इससे पानी का ओवरफ्लो और अनावश्यक बिजली खपत रुकती है। ड्राई रन सुरक्षा पानी की उपलब्धता को लगातार मॉनिटर करती है और पानी की कमी होने पर मोटर को तुरंत बंद कर देती है, जिससे पंप ओवरहीटिंग और नुकसान से बचता है। इसमें ऑटो/मैनुअल ऑपरेशन मोड और रिमोट ऑपरेशन की सुविधा भी है, जिससे रोजाना पानी का मैनेजमेंट आसान और अधिक प्रभावी हो जाता है।",
  "For single-phase submersible motors, the panel is designed to operate with **Starting Capacitor and Running Capacitor**, which are selected according to the motor manufacturer's recommended values. These capacitors are easily available in the local market and can be replaced whenever required. With its advanced protection features, automatic water level management, easy installation, and rugged design, the Param Automation Digital Control Panel helps increase motor life, reduce maintenance costs, save electricity, and provide worry-free operation for homes, farms, and agricultural water systems. Backed by a 1-year warranty, it offers a reliable and safe solution for protecting your valuable motor investment.": "सिंगल फेज सबमर्सिबल मोटर के लिए यह पैनल **स्टार्टिंग कैपेसिटर और रनिंग कैपेसिटर** के साथ काम करने के लिए डिजाइन किया गया है। ये कैपेसिटर मोटर निर्माता द्वारा सुझाई गई वैल्यू के अनुसार चुने जाते हैं। ये कैपेसिटर स्थानीय बाजार में आसानी से उपलब्ध होते हैं और जरूरत पड़ने पर बदले जा सकते हैं। एडवांस सुरक्षा फीचर्स, ऑटोमैटिक वॉटर लेवल मैनेजमेंट, आसान इंस्टॉलेशन और मजबूत डिजाइन के साथ Param Automation डिजिटल कंट्रोल पैनल मोटर की लाइफ बढ़ाने, मेंटेनेंस खर्च कम करने, बिजली बचाने और घर, खेत तथा कृषि जल सिस्टम के लिए चिंता मुक्त ऑपरेशन देने में मदद करता है। 1 साल वारंटी के साथ यह आपकी मूल्यवान मोटर को सुरक्षित रखने के लिए भरोसेमंद और सुरक्षित समाधान है।",
};

Object.entries({ ...productParagraphTranslationsHi }).forEach(([key, value]) => {
  productParagraphTranslationsHi[key.replace(/\*\*/g, "")] = value.replace(/\*\*/g, "");
});

const translateCommonProductText = (value) => {
  const normalized = value.replace(/\s+/g, " ").trim();
  const rangeMatch = normalized.match(/^(?:i\s+)?has\s+a\s+range\s+of\s+([0-9]+)\s*(?:mtr|meter|metre|meters|metres)\s+only\s+for\s+(?:house|home)\s+uses?\.?$/i);
  if (rangeMatch) return `इसकी रेंज ${rangeMatch[1]} मीटर है, केवल घर के उपयोग के लिए`;
  const remoteRangeMatch = normalized.match(/^it\s+has\s+remote\s+control\s+range\s+of\s+([0-9.]+)\s*(?:km|kilometer|kilometers)\s+to\s+([0-9.]+)\s*(?:km|kilometer|kilometers)\s+its\s+a\s+very\s+(?:long|log)\s+range\s+uses?\s+for\s+agriculture\s+only\.?$/i);
  if (remoteRangeMatch) {
    return `इसमें रिमोट कंट्रोल की रेंज ${remoteRangeMatch[1]} किमी से ${remoteRangeMatch[2]} किमी तक है, यह बहुत लंबी रेंज का है और केवल कृषि उपयोग के लिए है`;
  }

  const phraseReplacements = [
    [/\bSingle Phase Control Panel\b/gi, "सिंगल फेज कंट्रोल पैनल"],
    [/\bThree Phase Control Panel\b/gi, "थ्री फेज कंट्रोल पैनल"],
    [/\bTwo Phase Control Panel\b/gi, "टू फेज कंट्रोल पैनल"],
    [/\bDigital Motor Starter\b/gi, "डिजिटल मोटर स्टार्टर"],
    [/\bDigital Motor\/AC Starter\b/gi, "डिजिटल मोटर/AC स्टार्टर"],
    [/\bMono Block Motor\b/gi, "मोनो ब्लॉक मोटर"],
    [/\bDry Run Sensor\b/gi, "ड्राई रन सेंसर"],
    [/\bTelephone Cable\b/gi, "टेलीफोन केबल"],
    [/\bColor Coding\b/gi, "कलर कोडिंग"],
    [/\bMotor Protection Device\b/gi, "मोटर सुरक्षा डिवाइस"],
    [/\bMotor Protection\b/gi, "मोटर सुरक्षा"],
    [/\bMicro Controller Based\b/gi, "माइक्रो कंट्रोलर आधारित"],
    [/\bFully Customised According To Motor\b/gi, "मोटर के अनुसार पूरी तरह कस्टमाइज"],
    [/\bAuto\s*\/\s*Manual Button\b/gi, "ऑटो / मैनुअल बटन"],
    [/\bSingle Phase Protection\b/gi, "सिंगल फेज सुरक्षा"],
    [/\bHi Voltage Protection\b/gi, "हाई वोल्टेज सुरक्षा"],
    [/\bLo Voltage Protection\b/gi, "लो वोल्टेज सुरक्षा"],
    [/\bLow Voltage Protection\b/gi, "लो वोल्टेज सुरक्षा"],
    [/\bHigh Voltage Protection\b/gi, "हाई वोल्टेज सुरक्षा"],
    [/\bElectronic Over Load Protection\b/gi, "इलेक्ट्रॉनिक ओवरलोड सुरक्षा"],
    [/\bElectronic Overload Protection\b/gi, "इलेक्ट्रॉनिक ओवरलोड सुरक्षा"],
    [/\bDry Run Protection\b/gi, "ड्राई रन सुरक्षा"],
    [/\bLiquid Level Controller\b/gi, "लिक्विड लेवल कंट्रोलर"],
    [/\bWater Level Control\b/gi, "वॉटर लेवल कंट्रोल"],
    [/\bUnder Ground\b/gi, "अंडर ग्राउंड"],
    [/\bOverhead Tank\b/gi, "ओवरहेड टैंक"],
    [/\bRemote Enabled Device\b/gi, "रिमोट सक्षम डिवाइस"],
    [/\bSafe Device For Home\/Agriculture Uses\b/gi, "घर/कृषि उपयोग के लिए सुरक्षित डिवाइस"],
    [/\bEasy Installation\b/gi, "आसान इंस्टॉलेशन"],
    [/\bProduct Details\b/gi, "उत्पाद विवरण"],
    [/\bProduct Full Details\b/gi, "उत्पाद की पूरी जानकारी"],
    [/\bProduct Introduction\b/gi, "उत्पाद परिचय"],
    [/\bProduct Overview\b/gi, "उत्पाद ओवरव्यू"],
    [/\bTechnical Specification\b/gi, "तकनीकी विवरण"],
    [/\bSOP Procedure\b/gi, "SOP प्रक्रिया"],
    [/\bInstallation Instruction\b/gi, "इंस्टॉलेशन निर्देश"],
    [/\bInstallation Video\b/gi, "इंस्टॉलेशन वीडियो"],
    [/\bSOP Training Video\b/gi, "SOP ट्रेनिंग वीडियो"],
    [/\bWiring Diagram\b/gi, "वायरिंग डायग्राम"],
    [/\bDisplay Instruction\b/gi, "डिस्प्ले निर्देश"],
    [/\bOrder confirmation\b/gi, "ऑर्डर कन्फर्मेशन"],
    [/\bpayment QR\b/gi, "पेमेंट QR"],
    [/\bFree WhatsApp technical support\b/gi, "फ्री WhatsApp तकनीकी सहायता"],
    [/\bFree installation guide\b/gi, "फ्री इंस्टॉलेशन गाइड"],
    [/\bBulk order discount available\b/gi, "बल्क ऑर्डर डिस्काउंट उपलब्ध"],
    [/\bsoftware updates\b/gi, "सॉफ्टवेयर अपडेट"],
    [/\b1 year warranty\b/gi, "1 साल वारंटी"],
    [/\b1 Year Warranty\b/gi, "1 साल वारंटी"],
    [/\b6 Month Warranty\b/gi, "6 महीने वारंटी"],
    [/\b3 Month Warranty\b/gi, "3 महीने वारंटी"],
    [/\bWithout Capacitor\b/gi, "कैपेसिटर के बिना"],
    [/\bWith Capacitor\b/gi, "कैपेसिटर के साथ"],
    [/\bFor Submersible\b/gi, "सबमर्सिबल के लिए"],
    [/\bFor Heavy Duty\b/gi, "हेवी ड्यूटी के लिए"],
    [/\bUp To\b/gi, "तक"],
    [/\bIn Stock\b/gi, "स्टॉक में"],
    [/\bOut Of Stock\b/gi, "स्टॉक में नहीं"],
  ];

  const replacements = [
    [/\bOverview\b/gi, "ओवरव्यू"],
    [/\bSpecification\b/gi, "विवरण"],
    [/\bTechnical\b/gi, "तकनीकी"],
    [/\bProcedure\b/gi, "प्रक्रिया"],
    [/\bInstruction\b/gi, "निर्देश"],
    [/\bInstallation\b/gi, "इंस्टॉलेशन"],
    [/\bIntroduction\b/gi, "परिचय"],
    [/\bWarranty\b/gi, "वारंटी"],
    [/\bYear\b/gi, "साल"],
    [/\bMonth\b/gi, "महीने"],
    [/\bDevice\b/gi, "डिवाइस"],
    [/\bPanel\b/gi, "पैनल"],
    [/\bSubmersible\b/gi, "सबमर्सिबल"],
    [/\bCapacitor\b/gi, "कैपेसिटर"],
    [/\bWithout\b/gi, "के बिना"],
    [/\bWith\b/gi, "के साथ"],
    [/\bAccording\b/gi, "अनुसार"],
    [/\bCustomised\b/gi, "कस्टमाइज"],
    [/\bCustomized\b/gi, "कस्टमाइज"],
    [/\bBased\b/gi, "आधारित"],
    [/\bController\b/gi, "कंट्रोलर"],
    [/\bManual\b/gi, "मैनुअल"],
    [/\bAuto\b/gi, "ऑटो"],
    [/\bButton\b/gi, "बटन"],
    [/\bSafe\b/gi, "सुरक्षित"],
    [/\bEasy\b/gi, "आसान"],
    [/\bAvailable\b/gi, "उपलब्ध"],
    [/\bDiscount\b/gi, "डिस्काउंट"],
    [/\bPrice\b/gi, "कीमत"],
    [/\bDetails\b/gi, "विवरण"],
    [/\bProduct\b/gi, "उत्पाद"],
    [/\bSupport\b/gi, "सहायता"],
    [/\bGuide\b/gi, "गाइड"],
    [/\bTraining\b/gi, "ट्रेनिंग"],
    [/\bVideo\b/gi, "वीडियो"],
    [/\bDiagram\b/gi, "डायग्राम"],
    [/\bWiring\b/gi, "वायरिंग"],
    [/\bDisplay\b/gi, "डिस्प्ले"],
    [/\bMagnetic\b/gi, "मैग्नेटिक"],
    [/\bMegantic\b/gi, "मैग्नेटिक"],
    [/\bFloat\b/gi, "फ्लोट"],
    [/\bSwitch\b/gi, "स्विच"],
    [/\bSwich\b/gi, "स्विच"],
    [/\bSensor\b/gi, "सेंसर"],
    [/\bRemote\b/gi, "रिमोट"],
    [/\bHeavy Duty\b/gi, "हेवी ड्यूटी"],
    [/\bAgriculture\b/gi, "कृषि"],
    [/\bLong\b/gi, "लंबी"],
    [/\bLog\b/gi, "लंबी"],
    [/\bKm\b/gi, "किमी"],
    [/\bKilometer\b/gi, "किमी"],
    [/\bKilometers\b/gi, "किमी"],
    [/\bHas\b/gi, "है"],
    [/\bIts\b/gi, "यह"],
    [/\bFor\b/gi, "के लिए"],
    [/\bVery\b/gi, "बहुत"],
    [/\bDigital\b/gi, "डिजिटल"],
    [/\bMotor\b/gi, "मोटर"],
    [/\bStarter\b/gi, "स्टार्टर"],
    [/\bProtection\b/gi, "सुरक्षा"],
    [/\bVoltage\b/gi, "वोल्टेज"],
    [/\bOverload\b/gi, "ओवरलोड"],
    [/\bPhase\b/gi, "फेज"],
    [/\bSingle\b/gi, "सिंगल"],
    [/\bTwo\b/gi, "टू"],
    [/\bThree\b/gi, "थ्री"],
    [/\bWater\b/gi, "वॉटर"],
    [/\bLevel\b/gi, "लेवल"],
    [/\bControl\b/gi, "कंट्रोल"],
    [/\bRange\b/gi, "रेंज"],
    [/\bMtr\b/gi, "मीटर"],
    [/\bsq\s*mm\b/gi, "sq mm"],
    [/\bMeter\b/gi, "मीटर"],
    [/\bMeters\b/gi, "मीटर"],
    [/\bHouse\b/gi, "घर"],
    [/\bHome\b/gi, "घर"],
    [/\bUses\b/gi, "उपयोग"],
    [/\bUse\b/gi, "उपयोग"],
    [/\bOnly\b/gi, "केवल"],
  ];

  const translated = [...phraseReplacements, ...replacements].reduce((text, [pattern, replacement]) => text.replace(pattern, replacement), value);
  return translated === value ? value : translated;
};

const translatePlainText = (value, language) => {
  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  const key = normalizedText(value);
  if (!key) return value;
  if (language === "en") return value;
  if (productParagraphTranslationsHi[key]) return `${leading}${productParagraphTranslationsHi[key]}${trailing}`;
  const translated = textTranslations[language]?.[key];
  if (translated) return `${leading}${translated}${trailing}`;

  const replacements = [
    [/^(\d+)\+\s+Happy Customers$/i, "$1+ संतुष्ट ग्राहक"],
    [/^©\s+(\d{4})\s+Param Automation\.\s+All Rights Reserved\.$/i, "© $1 Param Automation. सर्वाधिकार सुरक्षित।"],
    [/^Model:\s*/i, "मॉडल: "],
    [/^Model Name:\s*/i, "मॉडल नाम: "],
    [/^Your Price\s*:\s*/i, "आपकी कीमत: "],
    [/^Total Amount$/i, "कुल राशि"],
    [/^Amount$/i, "राशि"],
    [/^S\.No\.$/i, "क्रमांक"],
    [/^Remove$/i, "हटाएं"],
    [/^M\.R\.P\.:\s*/i, "M.R.P.: "],
    [/^(\d+)% OFF$/i, "$1% छूट"],
    [/^\(Inclusive of all taxes\)$/i, "(सभी टैक्स सहित)"],
    [/\/\s*Piece$/i, "/ पीस"],
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(key)) return `${leading}${key.replace(pattern, replacement)}${trailing}`;
  }

  if (key.length > 140 && /[a-z]/i.test(key) && !/(Motor|Starter|Control|Panel|Sensor|Cable|Phase|Protection|Submersible|Capacitor|Warranty|Product)/i.test(key)) return value;
  return `${leading}${translateCommonProductText(key)}${trailing}`;
};

const applyTextLanguage = (language) => {
  document.querySelectorAll("[data-overview-text] p").forEach((paragraph) => {
    if (!paragraph.paramOriginalText) paragraph.paramOriginalText = normalizedText(paragraph.textContent || "");
    const translated = language === "en"
      ? paragraph.paramOriginalText
      : productParagraphTranslationsHi[paragraph.paramOriginalText] || translatePlainText(paragraph.paramOriginalText, language);
    paragraph.textContent = translated;
    paragraph.dataset.translatedBlock = "true";
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    if (shouldSkipTextNode(node)) return;
    if (!node.paramOriginalText) node.paramOriginalText = node.nodeValue;
    node.nodeValue = language === "en" ? node.paramOriginalText : translatePlainText(node.paramOriginalText, language);
  });

  document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((field) => {
    if (!field.dataset.originalPlaceholder) field.dataset.originalPlaceholder = field.placeholder;
    field.placeholder = language === "en" ? field.dataset.originalPlaceholder : translatePlainText(field.dataset.originalPlaceholder, language);
  });
};

const getLanguageFromControl = (control) =>
  control.type === "checkbox" ? (control.checked ? "hi" : "en") : control.value;

const showLanguagePrompt = () => {
  if (document.querySelector("[data-language-prompt]")) return;
  const prompt = document.createElement("div");
  prompt.className = "language-prompt";
  prompt.setAttribute("data-language-prompt", "");
  prompt.setAttribute("role", "dialog");
  prompt.setAttribute("aria-modal", "true");
  prompt.setAttribute("aria-labelledby", "language-prompt-title");
  prompt.innerHTML = `
    <div class="language-prompt__card">
      <p class="language-prompt__eyebrow">Select Language</p>
      <h2 id="language-prompt-title">भाषा चुनें</h2>
      <p class="language-prompt__text">Choose your preferred website language.</p>
      <div class="language-prompt__actions">
        <button type="button" data-language-choice="en">English</button>
        <button type="button" data-language-choice="hi">हिंदी</button>
      </div>
    </div>
  `;
  document.body.appendChild(prompt);

  prompt.addEventListener("click", (event) => {
    const button = event.target.closest("[data-language-choice]");
    if (!button) return;
    applyLanguage(button.dataset.languageChoice || "en");
    prompt.classList.add("is-closing");
    setTimeout(() => prompt.remove(), 180);
  });
};

let languageObserverTimer;
const languageObserver = new MutationObserver(() => {
  clearTimeout(languageObserverTimer);
  languageObserverTimer = setTimeout(() => applyTextLanguage(currentLanguage), 30);
});

document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", window.location.pathname);
  });
});

if (languageControls.length) {
  const savedLanguage = localStorage.getItem("param-language");
  applyLanguage(savedLanguage || "en");
  languageObserver.observe(document.body, { childList: true, subtree: true });
  languageControls.forEach((control) => {
    control.addEventListener("change", () => {
      applyLanguage(getLanguageFromControl(control));
    });
  });
  if (!savedLanguage) {
    window.addEventListener("load", showLanguagePrompt, { once: true });
  }
}

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navMenu?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll(".slider-arrow").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.classList.contains("slider-arrow--right") ? 1 : -1;
    productTrack.scrollBy({
      left: direction * Math.min(580, productTrack.clientWidth),
      behavior: "smooth",
    });
  });
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");

    productCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !show);
    });

    productTrack.scrollTo({ left: 0, behavior: "smooth" });
  });
});

const industryMessages = {
  en: {
    "Smart Homes": "Smart homes get app-based lighting, appliance control, monitoring and safety automation.",
    "Agriculture & Irrigation": "Agriculture systems can automate pumps, starters, water schedules and power protection.",
    "Manufacturing Industries": "Factories can use starters, panels, monitoring and custom controls for reliable production.",
    "Commercial Buildings": "Commercial buildings benefit from central controls, energy saving and security integration.",
    "Schools & Institutions": "Institutions can simplify water systems, safety monitoring and electrical automation.",
    Hospitals: "Hospitals can improve uptime with reliable controls, water treatment and security systems.",
  },
  hi: {
    "Smart Homes": "स्मार्ट होम में ऐप आधारित लाइट, उपकरण कंट्रोल, मॉनिटरिंग और सुरक्षा ऑटोमेशन मिलता है।",
    "Agriculture & Irrigation": "कृषि सिस्टम पंप, स्टार्टर, पानी की शेड्यूलिंग और पावर सुरक्षा को ऑटोमेट कर सकते हैं।",
    "Manufacturing Industries": "फैक्ट्री में विश्वसनीय उत्पादन के लिए स्टार्टर, पैनल, मॉनिटरिंग और कस्टम कंट्रोल मिलते हैं।",
    "Commercial Buildings": "कमर्शियल बिल्डिंग में सेंट्रल कंट्रोल, ऊर्जा बचत और सुरक्षा इंटीग्रेशन उपयोगी है।",
    "Schools & Institutions": "संस्थानों में पानी सिस्टम, सुरक्षा मॉनिटरिंग और इलेक्ट्रिकल ऑटोमेशन आसान होता है।",
    Hospitals: "हॉस्पिटल में भरोसेमंद कंट्रोल, वॉटर ट्रीटमेंट और सुरक्षा सिस्टम से अपटाइम बेहतर होता है।",
  },
};

industryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    industryButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    industryNote.textContent = button.dataset.industryMessage || industryMessages[currentLanguage]?.[button.dataset.industry] || "";
  });
});

const countStats = () => {
  document.querySelectorAll("[data-count]").forEach((stat) => {
    const target = Number(stat.dataset.count);
    const suffix = target >= 1000 ? "+" : "+";
    const duration = 900;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.floor(target * progress);
      stat.textContent = `${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
};

const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countStats();
        observer.disconnect();
      }
    });
  },
  { threshold: 0.35 }
);

const statsPanel = document.querySelector(".stats-panel");
if (statsPanel) statsObserver.observe(statsPanel);

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    if (typeof modal?.showModal === "function") {
      modal.showModal();
    }
  });
});

document.querySelectorAll("[data-close-quote]").forEach((button) => {
  button.addEventListener("click", () => {
    modal?.close("cancel");
  });
});

modal?.addEventListener("close", () => {
  const form = modal.querySelector("form");
  if (modal.returnValue !== "cancel" && form) {
    form.reset();
  }
});

const digitalAboutButton = document.querySelector("[data-toggle-digital-about]");
const digitalAboutSection = document.querySelector("#digital-starter-info");
const digitalAboutCloseTriggers = document.querySelectorAll("[data-hide-digital-about]");

digitalAboutButton?.addEventListener("click", () => {
  if (!digitalAboutSection) return;

  digitalAboutSection.hidden = false;
  digitalAboutButton.textContent = "About Digital Starter";
  digitalAboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

digitalAboutCloseTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!digitalAboutSection) return;
    digitalAboutSection.hidden = true;
  });
});
