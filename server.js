const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT) || 4173;
const productsDataFile = path.join(root, "starter-products-data.json");
const productsDataScriptFile = path.join(root, "starter-products-data.js");
const companyProfileFile = path.join(root, "company-profile.json");
const companyProfileScriptFile = path.join(root, "company-profile-data.js");
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
};

const uploadFolders = {
  "digital-starters": path.join(root, "assets", "products", "digital-starters"),
  categories: path.join(root, "assets", "products", "categories"),
  maps: path.join(root, "assets", "maps"),
  catalogues: path.join(root, "assets", "catalogues"),
};
const productAssetsRoot = path.join(root, "assets", "products");

const sendJson = (res, status, payload) => {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store, max-age=0",
  });
  res.end(JSON.stringify(payload));
};

const categoryOrder = {
  "single-phase": 1,
  "three-phase": 2,
  "two-phase": 3,
  "sensor-remote": 4,
  sensor: 4,
};

const getProductBadgePriority = (product) => {
  if (product.productBadge === "top-rated") return 0;
  if (product.productBadge === "bestseller") return 1;
  return 2;
};

const sortProductsForDisplay = (products) =>
  products.sort((first, second) => {
    const badgePriority = getProductBadgePriority(first) - getProductBadgePriority(second);
    if (badgePriority !== 0) return badgePriority;
    const firstCategory = categoryOrder[first.category] || 99;
    const secondCategory = categoryOrder[second.category] || 99;
    if (firstCategory !== secondCategory) return firstCategory - secondCategory;
    return Number(second.createdAt || 0) - Number(first.createdAt || 0);
  });

const readProductsData = () => {
  try {
    const products = JSON.parse(fs.readFileSync(productsDataFile, "utf8"));
    return Array.isArray(products) ? sortProductsForDisplay(products) : [];
  } catch (error) {
    return [];
  }
};

const productDataScript = (products) =>
  `window.PARAM_STARTER_PRODUCTS_DATA = ${JSON.stringify(products, null, 2)};\n`;

const readCompanyProfile = () => {
  try {
    return JSON.parse(fs.readFileSync(companyProfileFile, "utf8"));
  } catch (error) {
    return {};
  }
};

const companyProfileScript = (profile) =>
  `window.PARAM_COMPANY_PROFILE = ${JSON.stringify(profile, null, 2)};\n`;

const withEmbeddedCatalogue = (profile = {}) => {
  const cataloguePath = String(profile.productCataloguePdf || "").replace(/\\/g, "/").replace(/^\.\//, "");
  if (!cataloguePath || !cataloguePath.startsWith("assets/") || path.extname(cataloguePath).toLowerCase() !== ".pdf") {
    return { ...profile, productCataloguePdfData: "" };
  }
  const file = path.resolve(root, cataloguePath);
  if (!file.startsWith(path.resolve(root, "assets") + path.sep) || !fs.existsSync(file)) {
    return { ...profile, productCataloguePdfData: profile.productCataloguePdfData || "" };
  }
  return {
    ...profile,
    productCataloguePdf: cataloguePath,
    productCataloguePdfData: "",
  };
};

const imageMimeTypes = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

const imageBundleFile = path.join(root, "image-bundle.js");

const walkProjectFiles = (folder, extensions) => {
  if (!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".git" || entry.name === ".agents" || entry.name === ".codex") return [];
    const fullPath = path.join(folder, entry.name);
    if (entry.isDirectory()) return walkProjectFiles(fullPath, extensions);
    return extensions.has(path.extname(entry.name).toLowerCase()) ? [fullPath] : [];
  });
};

const collectBundledImageReferences = () => {
  const references = new Set();
  const textFiles = walkProjectFiles(root, new Set([".html", ".js", ".json", ".css"]))
    .filter((file) => path.basename(file) !== "image-bundle.js");
  const patterns = [
    /(?:src|href)=["']([^"']+\.(?:png|jpe?g|webp|svg))(?:\?[^"']*)?["']/gi,
    /["'`]((?:assets|\.\/assets|\/assets)\/[^"'`\s)]+\.(?:png|jpe?g|webp|svg))(?:\?[^"'`]*)?["'`]/gi,
    /url\(["']?([^"')]+\.(?:png|jpe?g|webp|svg))(?:\?[^"')]*|)["']?\)/gi,
  ];

  textFiles.forEach((file) => {
    let content = "";
    try {
      content = fs.readFileSync(file, "utf8");
    } catch (error) {
      return;
    }
    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.exec(content))) {
        const imagePath = String(match[1] || "")
          .replace(/\\/g, "/")
          .replace(/^\.\//, "")
          .replace(/^\//, "")
          .split("?")[0];
        if (imagePath.startsWith("assets/")) references.add(imagePath);
      }
    });
  });

  return [...references].sort();
};

const listAssetImages = (folder = path.join(root, "assets")) => {
  if (!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(folder, entry.name);
    if (entry.isDirectory()) return listAssetImages(fullPath);
    return imageMimeTypes[path.extname(entry.name).toLowerCase()] ? [fullPath] : [];
  });
};

const cleanupUnusedImageAssets = (references = collectBundledImageReferences()) => {
  const usedImages = new Set(references.map((imagePath) => imagePath.replace(/\\/g, "/")));
  const assetsRoot = path.resolve(root, "assets");
  const deleted = [];

  listAssetImages(assetsRoot).forEach((file) => {
    const resolvedFile = path.resolve(file);
    if (!resolvedFile.startsWith(assetsRoot + path.sep)) return;
    const relativePath = path.relative(root, resolvedFile).replace(/\\/g, "/");
    if (usedImages.has(relativePath)) return;

    fs.unlinkSync(resolvedFile);
    deleted.push(relativePath);
  });

  return deleted;
};

const imageBundleScript = (images) => `(() => {
  const images = ${JSON.stringify(images)};
  const normalize = (value = "") => {
    const clean = String(value || "").split("?")[0].replace(/^https?:\\/\\/[^/]+\\//, "").replace(/^\\.\\//, "").replace(/^\\//, "");
    const assetIndex = clean.indexOf("assets/");
    return assetIndex >= 0 ? clean.slice(assetIndex) : clean;
  };
  const resolve = (value = "") => images[normalize(value)] || value;
  const patchObject = (value) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => { value[index] = patchObject(item); });
      return value;
    }
    if (value && typeof value === "object") {
      Object.keys(value).forEach((key) => { value[key] = patchObject(value[key]); });
      return value;
    }
    if (typeof value === "string") return resolve(value);
    return value;
  };
  const patchDomImages = () => {
    document.querySelectorAll("img").forEach((image) => {
      const current = image.getAttribute("src") || image.currentSrc || "";
      const bundled = resolve(current);
      if (bundled !== current && image.src !== bundled) image.src = bundled;
    });
  };
  window.ParamImageBundle = { images, resolve, patchObject, patchDomImages };
  document.documentElement.style.setProperty("--digital-starter-banner-image", \`url("\${resolve("assets/banners/digital-starter-banner.jpg")}")\`);
  if (window.PARAM_COMPANY_PROFILE) patchObject(window.PARAM_COMPANY_PROFILE);
  if (window.PARAM_STARTER_PRODUCTS_DATA) patchObject(window.PARAM_STARTER_PRODUCTS_DATA);
  document.addEventListener("DOMContentLoaded", patchDomImages);
  document.addEventListener("error", (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement)) return;
    const bundled = resolve(image.getAttribute("src") || image.currentSrc || "");
    if (bundled && bundled !== image.src) image.src = bundled;
  }, true);
  setTimeout(patchDomImages, 100);
  setTimeout(patchDomImages, 800);
})();
`;

const regenerateImageBundle = () => {
  const references = collectBundledImageReferences();
  const deletedImages = cleanupUnusedImageAssets(references);
  const images = {};
  references.forEach((imagePath) => {
    const fullPath = path.join(root, imagePath);
    if (!fs.existsSync(fullPath)) return;
    const extension = path.extname(fullPath).toLowerCase();
    const mimeType = imageMimeTypes[extension];
    if (!mimeType) return;
    const encoded = fs.readFileSync(fullPath).toString("base64");
    images[imagePath] = `data:${mimeType};base64,${encoded}`;
  });
  fs.writeFileSync(imageBundleFile, imageBundleScript(images), "utf8");
  return { bundledImages: Object.keys(images).length, deletedImages };
};

const sanitizeProfileValue = (value) => {
  if (Array.isArray(value)) return value.map(sanitizeProfileValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, sanitizeProfileValue(child)]));
  }
  if (typeof value === "boolean" || typeof value === "number") return value;
  return String(value ?? "").trim();
};

const readJsonBody = (req, callback) => {
  const chunks = [];
  let size = 0;

  req.on("data", (chunk) => {
    size += chunk.length;
    if (size > 1024 * 1024) {
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });

  req.on("end", () => {
    try {
      callback(null, JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
    } catch (error) {
      callback(error);
    }
  });
};

const safeFileName = (name) =>
  path
    .basename(name || "product-image.jpg")
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-|-$/g, "");

const parseMultipart = (buffer, boundary) => {
  const parts = {};
  const boundaryBuffer = Buffer.from(`--${boundary}`);
  let cursor = buffer.indexOf(boundaryBuffer);

  while (cursor !== -1) {
    cursor += boundaryBuffer.length;
    if (buffer[cursor] === 45 && buffer[cursor + 1] === 45) break;
    if (buffer[cursor] === 13 && buffer[cursor + 1] === 10) cursor += 2;

    const headerEnd = buffer.indexOf("\r\n\r\n", cursor);
    if (headerEnd === -1) break;

    const headers = buffer.slice(cursor, headerEnd).toString("utf8");
    const disposition = headers.match(/content-disposition: form-data;([^\r\n]+)/i)?.[1] || "";
    const name = disposition.match(/name="([^"]+)"/)?.[1];
    const filename = disposition.match(/filename="([^"]*)"/)?.[1];
    const contentType = headers.match(/content-type: ([^\r\n]+)/i)?.[1];
    const dataStart = headerEnd + 4;
    const nextBoundary = buffer.indexOf(boundaryBuffer, dataStart);
    if (nextBoundary === -1) break;

    let dataEnd = nextBoundary;
    if (buffer[dataEnd - 2] === 13 && buffer[dataEnd - 1] === 10) dataEnd -= 2;

    if (name) {
      parts[name] = {
        filename,
        contentType,
        data: buffer.slice(dataStart, dataEnd),
      };
    }

    cursor = nextBoundary;
  }

  return parts;
};

const handleImageUpload = (req, res) => {
  const contentType = req.headers["content-type"] || "";
  const boundary = contentType.match(/boundary=(.+)$/)?.[1];
  if (!boundary) {
    sendJson(res, 400, { error: "Missing upload boundary" });
    return;
  }

  const chunks = [];
  let size = 0;

  req.on("data", (chunk) => {
    size += chunk.length;
    if (size > 25 * 1024 * 1024) {
      req.destroy();
      return;
    }
    chunks.push(chunk);
  });

  req.on("end", () => {
    const parts = parseMultipart(Buffer.concat(chunks), boundary);
    const image = parts.image;
    const folder = parts.folder?.data.toString("utf8").trim() || "digital-starters";
    const targetFolder = uploadFolders[folder];

    if (!targetFolder || !image?.data.length) {
      sendJson(res, 400, { error: "Invalid image upload" });
      return;
    }

    const parsed = path.parse(safeFileName(image.filename));
    const isPdfUpload = folder === "catalogues";
    const allowedTypes = isPdfUpload ? ["application/pdf", "application/octet-stream", "application/x-pdf", "binary/octet-stream"] : ["image/png", "image/jpeg", "image/webp"];
    const hasPdfExtension = parsed.ext.toLowerCase() === ".pdf";
    if (!allowedTypes.includes(image.contentType) || (isPdfUpload && !hasPdfExtension)) {
      sendJson(res, 415, { error: folder === "catalogues" ? "Only PDF files are allowed" : "Only PNG, JPG, and WebP images are allowed" });
      return;
    }

    fs.mkdir(targetFolder, { recursive: true }, (folderError) => {
      if (folderError) {
        sendJson(res, 500, { error: "Could not create image folder" });
        return;
      }

      const ext = folder === "catalogues" ? ".pdf" : ([".png", ".jpg", ".jpeg", ".webp"].includes(parsed.ext) ? parsed.ext : ".jpg");
      const filename = `${parsed.name || (folder === "catalogues" ? "product-catalogue" : "product-image")}-${Date.now()}${ext}`;
      const target = path.join(targetFolder, filename);
      const relativePath = path.relative(root, target).replace(/\\/g, "/");

      fs.writeFile(target, image.data, (writeError) => {
        if (writeError) {
          sendJson(res, 500, { error: "Could not save image" });
          return;
        }

        sendJson(res, 200, { path: relativePath });
      });
    });
  });
};

const handleImageDelete = (req, res) => {
  readJsonBody(req, (error, body) => {
    if (error || !body.path) {
      sendJson(res, 400, { error: "Invalid delete request" });
      return;
    }

    const normalizedPath = String(body.path).replace(/\\/g, "/");
    if (!normalizedPath.startsWith("assets/products/")) {
      sendJson(res, 403, { error: "Only product asset images can be deleted" });
      return;
    }

    const target = path.resolve(root, normalizedPath);
    const productAssetsRoot = path.resolve(root, "assets", "products");

    if (!target.startsWith(productAssetsRoot + path.sep)) {
      sendJson(res, 403, { error: "Image path is outside product assets" });
      return;
    }

    fs.unlink(target, (unlinkError) => {
      if (unlinkError && unlinkError.code !== "ENOENT") {
        sendJson(res, 500, { error: "Could not delete image" });
        return;
      }

      sendJson(res, 200, { deleted: true, path: normalizedPath });
    });
  });
};

const listProductImages = (folder) => {
  if (!fs.existsSync(folder)) return [];

  return fs.readdirSync(folder, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(folder, entry.name);
    if (entry.isDirectory()) return listProductImages(fullPath);

    const ext = path.extname(entry.name).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".webp"].includes(ext)) return [];

    return path.relative(root, fullPath).replace(/\\/g, "/");
  });
};

const handleProductsSave = (req, res) => {
  readJsonBody(req, (error, body) => {
    if (error || !Array.isArray(body.products)) {
      sendJson(res, 400, { error: "Invalid products payload" });
      return;
    }

    const products = sortProductsForDisplay(body.products);

    fs.writeFile(productsDataFile, JSON.stringify(products, null, 2), "utf8", (writeError) => {
      if (writeError) {
        sendJson(res, 500, { error: "Could not save products" });
        return;
      }

      fs.writeFile(productsDataScriptFile, productDataScript(products), "utf8", (scriptError) => {
        if (scriptError) {
          sendJson(res, 500, { error: "Could not update static product data" });
          return;
        }

        let bundleResult = { bundledImages: 0, deletedImages: [] };
        try {
          bundleResult = regenerateImageBundle();
        } catch (bundleError) {
          sendJson(res, 500, { error: "Products saved, but image bundle could not be updated" });
          return;
        }

        sendJson(res, 200, { saved: true, count: products.length, ...bundleResult });
      });
    });
  });
};

const handleCompanyProfileSave = (req, res) => {
  readJsonBody(req, (error, body) => {
    if (error || !body.profile || typeof body.profile !== "object" || Array.isArray(body.profile)) {
      sendJson(res, 400, { error: "Invalid company profile payload" });
      return;
    }

    const profile = withEmbeddedCatalogue(sanitizeProfileValue(body.profile));
    fs.writeFile(companyProfileFile, JSON.stringify(profile, null, 2), "utf8", (writeError) => {
      if (writeError) {
        sendJson(res, 500, { error: "Could not save company profile" });
        return;
      }
      fs.writeFile(companyProfileScriptFile, companyProfileScript(profile), "utf8", (scriptError) => {
        if (scriptError) {
          sendJson(res, 500, { error: "Could not update company profile data" });
          return;
        }
        let bundleResult = { bundledImages: 0, deletedImages: [] };
        try {
          bundleResult = regenerateImageBundle();
        } catch (bundleError) {
          sendJson(res, 500, { error: "Company profile saved, but image bundle could not be updated" });
          return;
        }
        sendJson(res, 200, { saved: true, profile, ...bundleResult });
      });
    });
  });
};

http
  .createServer((req, res) => {
    let pathname = decodeURIComponent((req.url || "/").split("?")[0]);

    if (req.method === "POST" && pathname === "/api/upload-product-image") {
      handleImageUpload(req, res);
      return;
    }

    if (req.method === "POST" && pathname === "/api/delete-product-image") {
      handleImageDelete(req, res);
      return;
    }

    if (req.method === "GET" && pathname === "/api/product-images") {
      sendJson(res, 200, { images: listProductImages(productAssetsRoot) });
      return;
    }

    if (req.method === "GET" && pathname === "/api/products") {
      sendJson(res, 200, { products: readProductsData() });
      return;
    }

    if (req.method === "POST" && pathname === "/api/products") {
      handleProductsSave(req, res);
      return;
    }

    if (req.method === "GET" && pathname === "/api/company-profile") {
      sendJson(res, 200, { profile: readCompanyProfile() });
      return;
    }

    if (req.method === "POST" && pathname === "/api/company-profile") {
      handleCompanyProfileSave(req, res);
      return;
    }

    if (pathname === "/" || pathname === "") pathname = "/index.html";

    const file = path.resolve(root, "." + pathname);
    if (!file.startsWith(root)) {
      res.writeHead(403);
      res.end("Forbidden");
      return;
    }

    fs.readFile(file, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.end("Not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": types[path.extname(file)] || "application/octet-stream",
        "Cache-Control": "no-store, max-age=0",
      });
      res.end(data);
    });
  })
  .listen(port, "127.0.0.1", () => {
    try {
      const { bundledImages, deletedImages } = regenerateImageBundle();
      console.log(`Image bundle updated with ${bundledImages} images.`);
      if (deletedImages.length) console.log(`Removed ${deletedImages.length} unused images.`);
    } catch (error) {
      console.warn("Image bundle could not be updated:", error.message);
    }
    console.log(`Param Automation trial: http://127.0.0.1:${port}`);
  });
