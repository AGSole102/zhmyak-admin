import React, { useEffect, useState } from "react";
import * as api from "../../services/upgradeCardsService";
import Button from "../atoms/Button";

const initialForm = {
  main_text: "",
  secondary_text: "",
  color: "",
  icon: "",
  url: "",
};

const UserNotificationModal = ({ open, onClose, user }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [formError, setFormError] = useState(null);
  const [sending, setSending] = useState(false);
  const [sendAll, setSendAll] = useState(false);

  useEffect(() => {
    if (open && user?.uid) fetchNotifications();
    // eslint-disable-next-line
  }, [open, user?.uid]);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.getNotifications(user.uid);
      setNotifications(data);
    } catch (e) {
      setError(e.response?.data?.detail || "Ошибка загрузки уведомлений");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSending(true);
    try {
      if (sendAll) {
        await api.createAndSendNotificationToTg({ ...form, uid: null });
      } else {
        await api.createAndSendNotificationToTg({ ...form, uid: user.uid });
      }
      setForm(initialForm);
      fetchNotifications();
      onClose();
    } catch (e) {
      setFormError(e.response?.data?.detail || "Ошибка отправки уведомления");
    } finally {
      setSending(false);
    }
  };

  const handleSendToTg = async (notif_id) => {
    try {
      await api.sendNotificationToTg(user.uid, notif_id);
      fetchNotifications();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка отправки в TG");
    }
  };

  const handleMarkRead = async (notif_id) => {
    try {
      await api.markNotificationsRead(user.uid, [notif_id]);
      fetchNotifications();
    } catch (e) {
      alert(e.response?.data?.detail || "Ошибка отметки как прочитанное");
    }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded shadow p-8 w-full max-w-2xl relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl">×</button>
        <h2 className="text-xl font-bold mb-4">Уведомления пользователя</h2>
        <form onSubmit={handleSend} className="flex flex-col gap-2 mb-6">
          <label className="flex flex-col gap-1">
            Основной текст
            <input name="main_text" value={form.main_text} onChange={handleChange} className="border rounded px-3 py-2" required />
          </label>
          <label className="flex flex-col gap-1">
            Второй текст
            <input name="secondary_text" value={form.secondary_text} onChange={handleChange} className="border rounded px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1">
            Цвет
            <input name="color" value={form.color} onChange={handleChange} className="border rounded px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1">
            Иконка
            <input name="icon" value={form.icon} onChange={handleChange} className="border rounded px-3 py-2" />
          </label>
          <label className="flex flex-col gap-1">
            URL
            <input name="url" value={form.url} onChange={handleChange} className="border rounded px-3 py-2" />
          </label>
          <div className="flex gap-2 items-center">
            <label className="flex items-center gap-1">
              <input type="checkbox" checked={sendAll} onChange={e => setSendAll(e.target.checked)} />
              Отправить всем пользователям
            </label>
            <Button type="submit" className="bg-blue-600 text-white" disabled={sending}>{sending ? "Отправка..." : "Отправить"}</Button>
          </div>
          {formError && <div className="text-red-600 text-sm">{formError}</div>}
        </form>
        <h3 className="font-semibold mb-2">История уведомлений</h3>
        {loading ? <div>Загрузка...</div> : error ? <div className="text-red-600 mb-2">{error}</div> : (
          <div className="max-h-64 overflow-y-auto">
            {notifications.length === 0 ? <div className="text-gray-500">Нет уведомлений</div> : (
              <table className="min-w-full text-xs border">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-2 py-1">Текст</th>
                    <th className="px-2 py-1">Дата</th>
                    <th className="px-2 py-1">Статус</th>
                    <th className="px-2 py-1">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((n) => (
                    <tr key={n.notif_id} className="border-b">
                      <td className="px-2 py-1">
                        <div>{n.main_text}</div>
                        <div className="text-xs text-gray-500">{n.secondary_text}</div>
                      </td>
                      <td className="px-2 py-1">{n.created_at ? n.created_at.split("T")[0] : "-"}</td>
                      <td className="px-2 py-1">{n.was_seen ? "Прочитано" : "Не прочитано"}</td>
                      <td className="px-2 py-1 flex gap-1">
                        <Button onClick={() => handleSendToTg(n.notif_id)} className="bg-green-600 text-white" type="button">В TG</Button>
                        {!n.was_seen && <Button onClick={() => handleMarkRead(n.notif_id)} className="bg-gray-400 text-white" type="button">Прочитано</Button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNotificationModal; 