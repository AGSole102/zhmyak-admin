import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";

const BusinessCardForm = ({ onSubmit, error, card }) => {
  const [title, setTitle] = useState(card?.title || "");
  const [description, setDescription] = useState(card?.description || "");
  const [price, setPrice] = useState(card?.price || "");
  const [image_urls, setImageUrls] = useState(card?.images?.join(", ") || "");
  const [tags, setTags] = useState(card?.tags?.join(", ") || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      price: Number(price),
      image_urls: image_urls.split(",").map(s => s.trim()).filter(Boolean),
      tags: tags.split(",").map(s => s.trim()).filter(Boolean),
      ...(card?.cid ? { cid: card.cid } : {})
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input placeholder="Название" value={title} onChange={e => setTitle(e.target.value)} required />
      <Input placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} required />
      <Input placeholder="Цена" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
      <Input placeholder="Ссылки на изображения (через запятую)" value={image_urls} onChange={e => setImageUrls(e.target.value)} />
      <Input placeholder="Теги (через запятую)" value={tags} onChange={e => setTags(e.target.value)} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="submit" className="bg-blue-600 text-white">{card ? 'Сохранить' : 'Создать карточку'}</Button>
    </form>
  );
};

export default BusinessCardForm; 