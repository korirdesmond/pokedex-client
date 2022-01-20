<template>
  <main class="form-signin gradient-mesh">
    <form>
      <h1 class="h3 mb-3 form-heading">Log In</h1>

      <div class="form-floating">
        <label for="floatingInput">Email</label>
        <input
          type="email"
          class="form-control"
          name="email"
          placeholder="Email"
        />
      </div>
      <div class="form-floating">
        <label for="floatingPassword">Password</label>
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
        />
      </div>

      <button class="w-100 btn btn-lg btn-primary" type="submit">Log In</button>

      <p class="m-3 muted-text bottom-text">
        Pokemon and Pokemon names are trademarks of Nintendo
      </p>
    </form>
  </main>
</template>

<style lang="scss">
@import "@/scss/form.scss";
@import "@/scss/global.scss";
</style>

<script lang="ts">
export default {
  name: "Login",
};
</script>
