import React, { useState } from "react";
import ImageWithFallback from "../atoms/ImageWithFallback";

const initialState = {
  card_id: "",
  order: 0,
  name: { "ru-RU": "", "en-EN": "" },
  init_price: 0,
  passive_income: 0,
  picture: "",
  description: "",
  card_type: "Business",
};

const cardTypes = ["Business", "Estate", "Offers"];

const UpgradeCardForm = ({ initial = initialState, onSubmit, onCancel, isEdit = false }) => {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "picture" && files && files[0]) {
      setForm((prev) => ({ ...prev, picture: files[0].name }));
      setSelectedFile(URL.createObjectURL(files[0]));
    } else if (name.startsWith("name.")) {
      const lang = name.split(".")[1];
      setForm((prev) => ({ ...prev, name: { ...prev.name, [lang]: value } }));
    } else {
      setForm((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.card_id || !form.name["ru-RU"] || !form.init_price) {
      setError("Обязательные поля: card_id, имя (ru-RU), цена");
      return;
    }
    setError(null);
    onSubmit(form);
  };

  // Очищаем URL объекта при размонтировании компонента
  React.useEffect(() => {
    return () => {
      if (selectedFile) {
        URL.revokeObjectURL(selectedFile);
      }
    };
  }, [selectedFile]);

  const renderPreview = () => {
    if (selectedFile) {
      // Показываем превью выбранного файла
      return (
        <ImageWithFallback
          src={selectedFile}
          alt="preview"
          className="w-24 h-24 object-contain mt-2 border"
        />
      );
    } else if (isEdit && form.picture) {
      // В режиме редактирования показываем существующую картинку
      const imageUrl = form.picture.startsWith("http") 
        ? form.picture 
        : `https://quackit.ru:8443/images/business/${form.card_type}/${form.picture}`;
      return (
        <ImageWithFallback
          src={imageUrl}
          alt="current"
          className="w-24 h-24 object-contain mt-2 border"
        />
      );
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        ID карточки
        <input
          name="card_id"
          value={form.card_id}
          onChange={handleChange}
          placeholder="ID карточки"
          className="border rounded px-3 py-2"
          disabled={isEdit}
          required
        />
      </label>
      <label className="flex flex-col gap-1">
        Название (ru-RU)
        <input
          name="name.ru-RU"
          value={form.name["ru-RU"]}
          onChange={handleChange}
          placeholder="Название (ru-RU)"
          className="border rounded px-3 py-2"
          required
        />
      </label>
      <label className="flex flex-col gap-1">
        Название (en-EN)
        <input
          name="name.en-EN"
          value={form.name["en-EN"]}
          onChange={handleChange}
          placeholder="Название (en-EN)"
          className="border rounded px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1">
        Начальная цена
        <input
          name="init_price"
          type="number"
          value={form.init_price}
          onChange={handleChange}
          placeholder="Начальная цена"
          className="border rounded px-3 py-2"
          required
        />
      </label>
      <label className="flex flex-col gap-1">
        Пассивный доход
        <input
          name="passive_income"
          type="number"
          value={form.passive_income}
          onChange={handleChange}
          placeholder="Пассивный доход"
          className="border rounded px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1">
        Картинка
        <input
          name="picture"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="border rounded px-3 py-2"
        />
        {renderPreview()}
      </label>
      <label className="flex flex-col gap-1">
        Порядок
        <input
          name="order"
          type="number"
          value={form.order}
          onChange={handleChange}
          placeholder="Порядок"
          className="border rounded px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1">
        Описание
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Описание"
          className="border rounded px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1">
        Тип карточки
        <select
          name="card_type"
          value={form.card_type}
          onChange={handleChange}
          className="border rounded px-3 py-2"
        >
          {cardTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </label>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{isEdit ? "Сохранить" : "Создать"}</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded">Отмена</button>
      </div>
    </form>
  );
};

export default UpgradeCardForm;