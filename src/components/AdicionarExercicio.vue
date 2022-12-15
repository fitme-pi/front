<template>
  <v-row justify="center">
    <v-dialog class="a" v-model="$parent.modal" width="600px">
      <v-form class="d-flex align-center flex-column">
        <h1 class="h1 py-8 pl-5">Adicione o exercício</h1>
        <v-col cols="12">
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
        <v-col cols="12">
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
        <v-col cols="12">
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
        <v-col class="d-flex" cols="12">
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
        <v-row class="mb-5">
          <div class="ma-3 mt-3">
            <v-btn :disabled="!formCompleto" @click="publicarExercicio">
              <h3>Publicar</h3>
            </v-btn>
          </div>
          <div class="ma-3 mt-3">
            <v-btn @click="$parent.modal = false">
              <h3>Cancelar</h3>
            </v-btn>
          </div>
        </v-row>
      </v-form>
    </v-dialog>
  </v-row>
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
    rules: [(v) => (v ? v.length <= 500 : false || "No máximo 500 caracteres")],
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
        this.$parent.modal = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
