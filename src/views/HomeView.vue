<template>
  <HomeStaff v-if="user ? user.is_staff : false" />
  <HomeUser v-else />
</template>

<script>
import { mapState } from "vuex";
import HomeStaff from "@/components/HomeStaff.vue";
import HomeUser from "@/components/HomeUser.vue";

export default {
  components: { HomeStaff, HomeUser },
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
