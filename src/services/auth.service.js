import axios from "axios";

const API_URL = "https://hoodwink.medkomtek.net/api/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "auth/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem("token", JSON.stringify(response.data.token));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  register(email, password) {
    return axios.post(API_URL + "register", {
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
