<template>
  <v-img
    app
    max-height="100vh"
    max-width="100vw"
    src="@/assets/images/exercicio-fisico-metabolismo.jpg"
  >
    <v-container class="d-flex justify-start" fill-height fluid text-center>
      <v-col md="4">
        <v-container class="white rounded-lg">
          <v-row>
            <v-col class="text-center mx-auto pb-4" cols="1" sm="4">
              <h1 class="h1 login">Cadastro</h1>
            </v-col>
          </v-row>
          <v-row></v-row>
          <v-divider class="ml-8 mr-8"></v-divider>
          <v-divider class="ml-8 mr-8"></v-divider>
          <v-divider class="mb-8 ml-8 mr-8"></v-divider>
          <v-row class="elavation-3 mx-auto">
            <v-col>
              <v-form>
                <v-text-field
                  outlined
                  v-model="form.username"
                  label="Apelido"
                  placeholder="Apelido"
                  :rules="rules"
                ></v-text-field>
                <v-text-field
                  outlined
                  v-model="form.first_name"
                  label="Nome"
                  placeholder="Nome"
                  :rules="rules"
                ></v-text-field>
                <v-text-field
                  outlined
                  v-model="form.last_name"
                  label="Sobrenome"
                  placeholder="Sobrenome"
                ></v-text-field>
                <v-text-field
                  outlined
                  v-model="form.email"
                  label="E-mail"
                  placeholder="usuario@gmail.com"
                  :rules="rules"
                ></v-text-field>
                <v-text-field
                  outlined
                  v-model="form.password"
                  label="Senha"
                  placeholder="Senha"
                  :rules="rules"
                  :type="show ? 'text' : 'password'"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="show = !show"
                >
                </v-text-field>
                <v-divider></v-divider>
                <v-divider></v-divider>
                <v-divider class="mb-8"></v-divider>
                <v-btn
                  @click="submitForm"
                  class="mb-4"
                  dark
                  color="#4A3CA5"
                  width="95%"
                  height="50px"
                  >Cadastrar</v-btn
                >
                <v-text
                  class="text--disabled cursor-pointer"
                  font-family="arial"
                  @click="voltarLogin"
                  >Voltar para o login</v-text
                >
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-container>
  </v-img>
</template>

<script>
import axios from "axios";

import { mapActions, mapMutations } from "vuex";

export default {
  
  data() {
    return {
      show: false,
      form: {},
    };
  },
  computed: {
    ...mapMutations("auth", ["unsetHeaders"]),
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async submitForm() {
      try {
        delete axios.defaults.headers.common["Authorization"];
        delete axios.defaults.headers.get["Authorization"];
        delete axios.defaults.headers.post["Authorization"];
        delete axios.defaults.headers.patch["Authorization"];
        await this.register(this.form);
        this.$router.push({ name: "LoginView" });
      } catch (e) {
        console.log(e);
      }
    },
    voltarLogin() {
      this.$router.push({ name: "LoginView" });
    },
  },
};
</script>

<style>
html {
  overflow-y: hidden;
}

.login {
  color: #4a3ca5;
}

.cursor-pointer {
  cursor: pointer;
}

body::-webkit-scrollbar {
  width: 5px;
}

body::-webkit-scrollbar-track {
  background: rgb(163, 206, 209);
}

body::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.473);
  border-radius: 200px;
  border: 1px solid rgb(163, 206, 209);
}
</style>