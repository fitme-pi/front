<template>
  <v-container class="pa-8" fluid>
    <v-form class="d-flex align-center flex-column">
      <h1 class="h1 py-8 pl-5">Adicione o exercício</h1>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          outlined
          v-model="exercicio.nome"
          cols="12"
          sm="6"
          md="3"
          dark
          label="Nome do exercício"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-textarea
          outlined
          v-model="exercicio.descricao"
          :rules="rules"
          cols="12"
          sm="6"
          md="3"
          dark
          label="Descrição do exercício"
        ></v-textarea>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-text-field
          outlined
          v-model="exercicio.video_explicativo"
          cols="12"
          sm="6"
          md="3"
          dark
          label="Video Explicativo do exercício"
        ></v-text-field>
      </v-col>
      <v-col class="d-flex" cols="12" sm="6" md="3">
        <v-select
          dark
          cols="12"
          sm="6"
          md="3"
          v-model="grupo"
          :items="grupos"
          item-text="nome"
          item-value="id"
          label="Grupo Muscular do exercício"
          outlined
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <div class="ma-3 mt-3">
          <v-btn :disabled="!formCompleto" @click="publicarExercicio">
            <h3>Publicar</h3>
          </v-btn>
        </div>
      </v-col>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    exercicio: {},
    grupo: {},
    grupos: [
      {
        id: 1,
        nome: "Costas",
      },
      {
        id: 2,
        nome: "Bíceps",
      },
      {
        id: 3,
        nome: "Ombros",
      },
      {
        id: 4,
        nome: "Glúteos",
      },
      {
        id: 5,
        nome: "Pernas",
      },
      {
        id: 6,
        nome: "Peito",
      },
      {
        id: 7,
        nome: "Tríceps",
      },
      {
        id: 8,
        nome: "Abdômen",
      },
    ],
    rules: [(v) => (v ? v.length <= 255 : false || "No máximo 255 caracteres")],
  }),
  computed: {
    formCompleto() {
      return typeof this.grupo !== "object" &&
        this.exercicio.nome !== undefined &&
        this.exercicio.descricao !== undefined &&
        this.exercicio.video_explicativo !== undefined
        ? true
        : false;
    },
  },
  methods: {
    async publicarExercicio() {
      try {
        this.exercicio.grupo_muscular = this.grupo;
        await axios.post("api/exercicios/", this.exercicio);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
