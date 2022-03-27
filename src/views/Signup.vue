<template>
  <main class="form-signin gradient-mesh">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 form-heading">Sign Up</h1>

      <div class="form-errors" :if="formError">{{ errorMessage }}</div>

      <div class="form-floating">
        <label for="floatingInput">Username</label>
        <input
          v-model="userName"
          class="form-control"
          :class="[!isUsernameValid ? 'input-error' : '']"
          placeholder="Username"
          required
        />
        <ul v-if="!isUsernameValid" class="form-errors">
          <li>Username should be between 4 and 8 characters</li>
          <li>Should be latin letters</li>
          <li>
            Can have digits and special characters but should beging with latin
            letters
          </li>
        </ul>
      </div>

      <div class="form-floating">
        <label for="floatingInput">Email</label>
        <input
          type="email"
          class="form-control"
          :class="[!isEmailValid ? 'input-error' : '']"
          v-model="email"
          placeholder="Email"
          required
        />
        <ul v-if="!isEmailValid" class="form-errors">
          <li>Enter valid email</li>
        </ul>
      </div>
      <div class="form-floating">
        <label for="floatingPassword">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          :class="[!isPasswordValid ? 'input-error' : '']"
          id="floatingPassword"
          placeholder="Password"
          required
          autofocus
        />
        <ul v-if="!isPasswordValid" class="form-errors">
          <li>Password must be at least 14 characters</li>
          <li>
            Should contains at least one character that is not a latin letter
            and not a digit
          </li>
        </ul>
      </div>

      <button
        class="w-100 btn btn-lg btn-primary"
        type="submit"
        :disabled="submiting"
      >
        {{ submiting ? "Submiting..." : "Sign Up" }}
      </button>
      <p class="m-3 muted-text bottom-text">
        Pokemon and Pokemon names are trademarks of Nintendo
      </p>
    </form>
  </main>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "Signup",
  setup() {
    const userName = ref("");
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const formError = ref(false);
    const submiting = ref(false);
    const router = useRouter();

    const passwordRegex =
      /^(?!.*\s)(?=.*[a-zA-Z])(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).{14,}$/;
    const usernameReqex = /(?=^.{4,8}$)^[A-Za-z]+[0-9_@./#&+-]*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isUsernameValid = computed(() => {
      if (userName.value === "") return true;

      return usernameReqex.test(userName.value);
    });

    const isEmailValid = computed(() => {
      if (email.value === "") return true;

      return emailRegex.test(email.value);
    });

    const isPasswordValid = computed(() => {
      if (password.value === "") return true;

      return passwordRegex.test(password.value);
    });

    function submit() {
      if (
        !isUsernameValid.value ||
        !isEmailValid.value ||
        !isPasswordValid.value
      )
        return;

      submiting.value = true;

      axios
        .post("users", {
          username: userName.value,
          email: email.value,
          password: password.value,
        })
        .then(() => {
          formError.value = false;
          submiting.value = false;
          router.push("/login");
        })
        .catch((error) => {
          const { message } = error.response?.data;

          formError.value = true;
          submiting.value = false;

          if (
            message &&
            message ===
              `Can't insert key ${userName.value}, it violates the unique constraint`
          ) {
            errorMessage.value = "Username is taken";
          } else if (
            message &&
            message ===
              `Can't insert key ${email.value}, it violates the unique constraint`
          ) {
            errorMessage.value = "Email is taken";
          } else {
            errorMessage.value = "Something went wrong. Try again";
          }
        });
    }

    return {
      userName,
      email,
      password,
      isUsernameValid,
      isEmailValid,
      isPasswordValid,
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
