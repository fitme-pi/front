<template>
  <v-container class="d-flex align-center flex-column" fluid> Oi </v-container>
</template>

<script>
import axios from "axios";

export default {
  created() {
    this.buscarTreinoPorId();
  },
  data: () => ({}),

  methods: {
    async buscarTreinoPorId() {
      const { data } = await axios.get(`api/treinos/${this.$route.params.id}/`);
      this.treinos = data;
    },
  },
};
</script>
