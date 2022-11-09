<template>
  <v-container>
    <v-card
      v-for="(exercicio, index) in exercicios"
      :key="index"
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <iframe
        height="250px"
        width="374px"
        frameborder="0"
        allowfullscreen
        :src="tratarURL(exercicio.video_explicativo)"
      ></iframe>

      <v-card-title>{{ exercicio.nome }}</v-card-title>

      <v-card-text>
        <div class="my-4">
          {{ exercicio.descricao }}
        </div>
      </v-card-text>

      <v-card-title>{{ exercicio.grupo_muscular.nome }}</v-card-title>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-btn color="green" text @click="reserve"> Favoritar </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.pegarExercicios();
  },
  data: () => ({
    exercicios: [],
    loading: false,
  }),

  methods: {
    async pegarExercicios() {
      const { data } = await axios.get("api/exercicios/");
      this.exercicios = data;
      console.log(this.exercicios);
    },

    tratarURL(url) {
      return `${url.replace(".com/", ".com/embed/").replace("watch?v=", "")}`;
    },

    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
  },
};
</script>

<style></style>
