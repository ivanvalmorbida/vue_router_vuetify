<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Cpe",
  data: function data() {
    return {
      texto: 'Ivanxxxx',
    }
  },
  methods: {
    onSubmit() {
      try {
        axios
          .post("/mielinax/ws/uf.asmx/carregar", {})
          .then((response) => {
            console.log(response.data.d);
          }, (error) => {
            throw error || new Error(`Request failed`);
          })
      } catch (error: any) {
        // Consider implementing your own error handling logic here
        console.error(error);
        alert(error.message);
      }
    }
  },
  mounted() {
    this.onSubmit();
  },
});
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
