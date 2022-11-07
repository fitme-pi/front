<template>
  <v-container v-if="user ? user.is_staff : false" class="pa-8" fluid>
    <h1 class="h1">Fitme</h1>
    <v-form>
      <v-text-field
        dark
        label="Nova tarefa"
        v-model="novaTarefa"
        @keydown.enter="adicionar"
      >
        <v-icon slot="append" @click="adicionar">mdi-send</v-icon>
      </v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-list v-for="tarefa of tarefas" :key="tarefa.titulo">
      <v-list-item-group>
        <v-list-item>
          {{ tarefa.titulo }}
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      novaTarefa: "",
      tarefas: [],
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  methods: {
    adicionar(e) {
      e.preventDefault();
      this.tarefas.push({ titulo: this.novaTarefa });
      this.novaTarefa = "";
    },
  },
};
</script>

<style></style>
