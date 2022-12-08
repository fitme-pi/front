<template>
  <v-container class="image d-flex justify-start" fill-height fluid text-center>
    <v-col md="4">
      <v-container class="white rounded-lg">
        <v-row class="d-flex justify-center">
          <v-col class="pb-7" cols="12" sm="4">
            <h1 class="h1 deep-purple--text darken-3">Login</h1>
          </v-col>
        </v-row>
        <v-row class="elavation-3 mx-auto">
          <v-col>
            <v-form form>
              <v-text-field
                outlined
                label="Nome de Usuário"
                placeholder="Nome"
                v-model="usuario.username"
                @keyup.enter="submitLogin"
              ></v-text-field>
              <v-text-field
                outlined
                label="Senha"
                placeholder="Senha"
                v-model="usuario.password"
                :type="show ? 'text' : 'password'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show = !show"
                @keyup.enter="submitLogin"
              >
              </v-text-field>
              <v-btn
                class="mx-2"
                dark
                color="#4A3CA5"
                @click="submitLogin"
                width="95%"
                height="50px"
                >Login</v-btn
              >
              <v-btn
                class="text--disabled mt-5 mb-2 cursor-pointer"
                font-family="arial"
                @click="criarConta"
                >Não tem uma conta? Crie aqui</v-btn
              >
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-container>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  created() {
    this.unsetHeaders();
  },
  data() {
    return {
      usuario: {},
      show: false,
    };
  },
  methods: {
    ...mapMutations("auth", ["unsetHeaders"]),
    ...mapActions("auth", ["login"]),

    async submitLogin() {
      try {
        await this.login(this.usuario);
        this.$router.push({ path: "/" });
      } catch (e) {
        this.errorLogin = true;
        console.log(e);
      }
    },
    criarConta() {
      this.$router.push({ name: "CadastroView" });
    },
  },
};
</script>

<style scoped>
.image {
  background-image: url("@/assets/images/exercicio-fisico-metabolismo.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
}
</style>
