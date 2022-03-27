<template>
  <main class="form-signin gradient-mesh">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 form-heading">Log In</h1>

      <div class="form-errors" :if="formError">{{ errorMessage }}</div>

      <div class="form-floating">
        <label for="floatingInput">Email</label>
        <input
          type="email"
          class="form-control"
          v-model="email"
          placeholder="Email"
          required
        />
      </div>
      <div class="form-floating">
        <label for="floatingPassword">Password</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          id="floatingPassword"
          placeholder="Password"
          required
        />
      </div>

      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
        :disabled="submiting"
      >
        {{ submiting ? "Submiting ..." : "Log In" }}
      </button>

      <p class="m-3 muted-text bottom-text text-center">
        Pokemon and Pokemon names are trademarks of Nintendo
      </p>
    </form>
  </main>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const formError = ref(false);
    const submiting = ref(false);
    const router = useRouter();

    function submit() {
      submiting.value = true;
      axios
        .post("authentication", {
          email: email.value,
          password: password.value,
          strategy: "local",
        })
        .then(({ data }) => {
          submiting.value = false;
          formError.value = false;
          localStorage.name = data.user.username;
          localStorage.token = data.accessToken;

          router.push("/");
        })
        .catch((error) => {
          const { message } = error.response?.data;

          submiting.value = false;
          formError.value = true;
          errorMessage.value = message;
        });
    }

    return {
      email,
      password,
      errorMessage,
      formError,
      submit,
      submiting,
    };
  },
};
</script>

<style lang="scss">
@import "@/scss/form.scss";
@import "@/scss/global.scss";
</style>
