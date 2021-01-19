<template>
  <v-btn dark color="#4285F4" v-on:click="getGoogleAuth">
    <v-icon left class="mr-4">
      mdi-google
    </v-icon>
    {{prompt}}
  </v-btn>
</template>

<script>
export default {
  props: {
    prompt: String
  },
  methods: {
    getGoogleAuth() {
      this.$gAuth.signIn().then((GoogleUser) => {
        this.$emit("submitted", GoogleUser);
      });
    },
  },
};
</script>

<style></style>
