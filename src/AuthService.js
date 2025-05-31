import axios from "../axiosinstance";

class AuthService {
  static async login(login, password) {
    const { data } = await axios.post("/auth/login", { login, password });
    return data;
  }

  static async register(login, password) {
    // регистрация не используется, но оставляю для совместимости
    const { data } = await axios.post("/auth/register", { login, password });
    return data;
  }

  static async refresh(refresh_token) {
    const { data } = await axios.post("/auth/refresh", { refresh_token });
    return data;
  }

  static async logout(refresh_token) {
    const { data } = await axios.post("/auth/logout", { refresh_token });
    return data;
  }

  static async getMe() {
    const { data } = await axios.get("/auth/me");
    return data;
  }
}

export default AuthService; 