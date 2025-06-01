import axios from "../../axiosinstance";

export const getUpgrades = (locale = "ru-RU", provider = "postgres") =>
  axios.get("/upgrades", { params: { locale, provider } });

export const createUpgrade = (data, provider = "postgres") =>
  axios.post("/upgrades", data, { params: { provider } });

export const updateUpgrade = (card_id, data, provider = "postgres") =>
  axios.patch(`/upgrades/${card_id}`, data, { params: { provider } });

export const deleteUpgrade = (card_id, provider = "postgres") =>
  axios.delete(`/upgrades`, { params: { card_id, provider } });

export const moveUpgrade = (card_id, new_order, provider = "postgres") =>
  axios.patch(`/upgrades/${card_id}/move`, { card_id, new_order }, { params: { provider } });

export const getDependencies = (provider = "postgres") =>
  axios.get("/upgrades/dependencies", { params: { provider } });

export const getDependency = (card_id, provider = "postgres") =>
  axios.get(`/upgrades/dependencies/${card_id}`, { params: { provider } });

export const createDependency = (card_id, data, provider = "postgres") =>
  axios.post(`/upgrades/dependencies/${card_id}`, data, { params: { provider } });

export const getCombo = () => axios.get("/upgrades/combo");
export const createCombo = (data) => axios.post("/upgrades/combo", data);
export const getComboStatus = () => axios.get("/upgrades/combo/status");
export const getComboCompletion = (uid) => axios.get(`/upgrades/combo/${uid}`);

// Referral API
export const getReferralLink = (master_uid) =>
  axios.get("/referral", { params: { master_uid } });

export const addReferral = (data) =>
  axios.post("/referral/add", data);

export const listReferrals = (params) =>
  axios.get("/referral/list", { params });

export const getReferralIncome = (master_uid) =>
  axios.get("/referral/income", { params: { master_uid } });

export const getMasterChain = (referral_uid) =>
  axios.get("/referral/master_chain", { params: { referral_uid } });

export const payReferral = (master_uid, provider = "redis") =>
  axios.post("/referral/pay", null, { params: { master_uid, provider } });

export const generateReferralCodes = () =>
  axios.post("/referral/generate_codes");

// Tasks API
export const getTasks = () => axios.get("/tasks/");
export const createTask = (data) => axios.post("/tasks/", data);
export const getUserTasks = (uid) => axios.get("/tasks/user", { params: { uid } });
export const deleteTask = (task_id) => axios.delete(`/tasks/${task_id}`);
export const updateTaskStatus = (task_id, uid, provider = "postgres") => axios.put(`/tasks/${task_id}/status`, null, { params: { uid, provider } });

// Notifications API
export const getNotifications = (uid, { offset = 0, limit = 100, provider = "postgres" } = {}) =>
  axios.get(`/notifications/${uid}`, { params: { offset, limit, provider } });
export const getNotificationsCount = (uid, provider = "postgres") =>
  axios.get(`/notifications/${uid}/count`, { params: { provider } });
export const markNotificationsRead = (uid, notifications_ids, provider = "postgres") =>
  axios.post(`/notifications/${uid}/read`, { notifications_ids }, { params: { provider } });
export const createNotification = (data, provider = "postgres") =>
  axios.post(`/notifications/create`, data, { params: { provider } });
export const sendNotificationToTg = (uid, notif_id, provider = "postgres") =>
  axios.post(`/notifications/${uid}/tgsend`, null, { params: { notif_id, provider } });
export const createAndSendNotificationToTg = (data, provider = "postgres") =>
  axios.post(`/notifications/tgcreate`, data, { params: { provider } }); 