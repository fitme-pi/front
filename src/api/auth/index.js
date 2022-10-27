import axios from "axios"

class AuthService {
  async get(infoUser) {
    let id = null
    const ids = await axios.get("usuarios/")
    ids.data.forEach(x => {
      if (infoUser.username == x.username) {
        id = x.id
      }
    });
    const { data } = await axios.get(`usuarios/${id}/`);
    return data;
  }
  async register(user) {
    const { data } = await axios.post("register/", user);
    return data;
  }
  async login(user) {
    const { data } = await axios.post("token/", user);
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