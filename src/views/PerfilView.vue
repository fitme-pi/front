<template>
  <!-- <v-app>
      <v-app-bar app color="#0C0B30" class="cabecalho" dark elevation="3">
        <v-list-item>
          <h1>Fitme</h1>
        </v-list-item>
        <v-list-item-group class="d-flex">
          <v-list-item>
            <v-icon size="35" class="mr-4" name="usuario"
              >mdi-account-circle</v-icon
            >
            <label for="usuario" class="cursor-pointer">{{
              user.username
            }}</label>
          </v-list-item>
          <v-list-item @click="submitLogout">Sair</v-list-item>
        </v-list-item-group>
      </v-app-bar>
    </v-app> -->
  <v-container class="d-flex align-center flex-column" fluid>
    <v-col cols="12" sm="4">
      <h1 class="h1 d-flex justify-center">{{ user.username }}</h1>
      <v-icon dark size="200" class="d-flex justify-center" name="usuario"
        >mdi-account-circle</v-icon
      >
      <v-divider dark></v-divider>
      <v-divider dark></v-divider>
      <v-divider dark class="mb-5"></v-divider>
      <v-form>
        <v-container>
          <v-text-field
            v-model="newUser.first_name"
            background-color="white"
            label="Nome"
            placeholder="Nome"
            filled
            rounded
            dense
            width="50%"
          >
          </v-text-field>
          <v-text-field
            v-model="newUser.last_name"
            background-color="white"
            label="Sobrenome"
            placeholder="Sobrenome"
            filled
            rounded
            dense
            width="50%"
          >
          </v-text-field>
          <v-text-field
            v-model="newUser.email"
            background-color="white"
            label="E-mail"
            placeholder="usuario@gmail.com"
            filled
            rounded
            dense
          >
          </v-text-field>
          <v-btn color="#133F86" dark width="100%" @click="updateInfo">
            salvar alterações
          </v-btn>
          <v-btn
            class="mt-10"
            color="#133F86"
            dark
            width="100%"
            @click="dialogUsername = true"
          >
            Trocar de usuário
          </v-btn>
          <v-btn
            class="mt-3"
            color="#133F86"
            dark
            width="100%"
            @click="dialogPassword = true"
          >
            Redefirnir senha
          </v-btn>
          <v-btn
            class="mt-3"
            color="#133F86"
            dark
            width="100%"
            @click="dialogDelUser = true"
          >
            Deletar conta
          </v-btn>
        </v-container>
      </v-form>
    </v-col>
    <v-row justify="center">
      <v-dialog v-model="dialogUsername" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Troque o seu usuário</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Novo usuário"
                    v-model="newUserUsername.new_username"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Senha"
                    v-model="newUserUsername.current_password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogUsername = false">
              Fechar
            </v-btn>
            <v-btn color="blue darken-1" text @click="updateUsername">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogPassword" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Troque a senha de sua conta</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Senha atual"
                    v-model="newPassword.current_password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Nova senha"
                    v-model="newPassword.new_password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Confirmação nova senha"
                    v-model="newPassword.re_new_password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogPassword = false">
              Fechar
            </v-btn>
            <v-btn color="blue darken-1" text @click="updatePassord">
              Salvar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelUser" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Digite sua senha para deletar sua conta</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Senha"
                    v-model="delUser.current_password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogDelUser = false">
              Fechar
            </v-btn>
            <v-btn color="blue darken-1" text @click="deleteAccount">
              Deletar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
  <!-- <v-col cols="8" class="ml-10">
      <v-row class="d-flex justify-center">
        <h1 class="h1">Progresso Semanal</h1>
      </v-row>
      <v-img src="@/assets/images/0xcexG1C9BroKmojA.png" class="mt-15"></v-img>
    </v-col> -->
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  created() {
    this.newUser = { ...this.user };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  data() {
    return {
      show: false,
      dialogUsername: false,
      dialogPassword: false,
      dialogDelUser: false,
      newUser: {},
      newUserUsername: {},
      newPassword: {},
      delUser: {},
    };
  },
  methods: {
    ...mapMutations("auth", ["setLogout"]),
    ...mapActions("auth", [
      "updateUser",
      "updateUserUsername",
      "updateUserPassword",
      "deleteUser",
    ]),

    compareInfo() {
      return (
        this.newUser.first_name != this.user.first_name ||
        this.newUser.last_name != this.user.last_name ||
        this.newUser.email != this.user.email
      );
    },
    async updateInfo() {
      if (this.compareInfo()) {
        try {
          await this.updateUser(this.newUser);
        } catch (e) {
          console.log(e);
        }
      }
    },
    async updateUsername() {
      try {
        await this.updateUserUsername(this.newUserUsername);
        this.dialogUsername = false;
      } catch (e) {
        console.log(e);
      }
    },
    async updatePassord() {
      try {
        await this.updateUserPassword(this.newPassword);
        this.dialogPassword = false;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteAccount() {
      try {
        await this.deleteUser(this.delUser);
        this.dialogPassword = false;
      } catch (e) {
        console.log(e);
      }
    },
    async submitLogout() {
      try {
        await this.setLogout();
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
