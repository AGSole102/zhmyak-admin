import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import ErrorMessage from "../atoms/ErrorMessage";
import SuccessMessage from "../atoms/SuccessMessage";

const LoginForm = () => {
  const { loginUser, loading, error } = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    const ok = await loginUser(login, password);
    setSuccess(ok);
    if (!ok) setLocalError(error || "Ошибка авторизации");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xs mx-auto">
      <h2 className="text-xl font-bold">Вход</h2>
      <Input
        type="text"
        placeholder="Логин"
        value={login}
        onChange={e => setLogin(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit" className="bg-blue-600 text-white" disabled={loading}>
        {loading ? "Вход..." : "Войти"}
      </Button>
      {localError && <ErrorMessage>{localError}</ErrorMessage>}
      {success && <SuccessMessage>Успешный вход!</SuccessMessage>}
    </form>
  );
};

export default LoginForm; 