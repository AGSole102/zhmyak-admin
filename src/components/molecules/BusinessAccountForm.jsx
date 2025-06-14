import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";

const BusinessAccountForm = ({ onSubmit, error }) => {
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture_url, setPictureUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ login, name, description, picture_url });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input placeholder="Логин" value={login} onChange={e => setLogin(e.target.value)} required />
      <Input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} required />
      <Input placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} required />
      <Input placeholder="URL картинки" value={picture_url} onChange={e => setPictureUrl(e.target.value)} required />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Button type="submit" className="bg-blue-600 text-white">Создать бизнес</Button>
    </form>
  );
};

export default BusinessAccountForm; 