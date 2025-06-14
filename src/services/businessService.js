import axios from "../../axiosinstance";

// --- Бизнес аккаунты (админ) ---
export const registerBusiness = (data) =>
  axios.post("/market/business/register", data);

export const getAllBusinesses = (params = {}) =>
  axios.get("/market/admin/business/", { params });

export const banBusiness = (bid) =>
  axios.delete("/market/admin/business/", { params: { bid } });

// --- Карточки маркетплейса (админ) ---
export const getAllMarketplaceCards = (params = {}) =>
  axios.get("/market/admin/card/", { params });

export const deleteMarketplaceCard = (cid) =>
  axios.delete("/market/admin/card/", { params: { cid } });

// --- Категории товаров (админ) ---
export const createCategory = (data) =>
  axios.post("/market/admin/tags/", data);

export const updateCategory = (data) =>
  axios.put("/market/admin/tags/", data);

export const deleteCategory = (tag_name) =>
  axios.delete(`/market/admin/tags/${tag_name}`);

// --- Карточки для бизнеса ---
export const getBusinessCards = (params = {}) =>
  axios.get("/market/business/card/", { params });

export const createBusinessCard = (data) =>
  axios.post("/market/business/card/", data);

export const updateBusinessCard = (data) =>
  axios.put("/market/business/card/", data);

export const deleteBusinessCard = (cid) =>
  axios.delete("/market/business/card/", { params: { cid } });

// --- Промокоды для карточек бизнеса ---
export const getBusinessCardPromos = (cid) =>
  axios.get("/market/business/card/promo/", { params: { cid } });

export const generateBusinessCardPromos = (data) =>
  axios.post("/market/business/card/promo/generate", data);

// --- Промокоды для карточек (админ) ---
export const getAdminCardPromos = (cid) =>
  axios.get("/market/admin/card/promo/", { params: { cid } }); 