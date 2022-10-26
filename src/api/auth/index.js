import axios from 'axios'

class AuthService {
    async get() {
      const { data } = await axios.get("usuarios/");
      return data;
    }
    async register(user) {
      const { data } = await axios.post("registration/", user);
      return data;
    }
    async login(user) {
      const { data } = await axios.post("/", user);
      return data;
    }
    async update(newUser) {
      const { data } = await axios.patch("usuarios/", newUser);
      console.log("Após atualizar: ", data.nome);
    }
    async logout() {
      await axios.post("logout/");
    }
  }

export default new AuthService()