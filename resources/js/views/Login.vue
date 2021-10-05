<template>
  <div>
    <form name="form" @submit.prevent="handlelogin">
      <div class="form-row">
        <div class="input-group col-sm-12 mb-3">
          <input
            type="email"
            class="form-control"
            name="email"
            v-validate="'required'"
            v-model="form.email"
            placeholder="Correo"
          />
        </div>
        <div class="input-group col-sm-12">
          <div
            class="alert d-flex w-100 alert-danger"
            v-if="errors.has('email')"
            role="danger"
          >
            El email es requerido
            <button
              type="button"
              class="close ml-auto"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>

      <div class="form-row">
        <div class="input-group col-sm-12 mb-3">
          <input
            type="password"
            class="form-control"
            name="password"
            v-validate="'required'"
            v-model="form.password"
            placeholder="Contraseña"
          />
        </div>
        <div class="input-group col-sm-12">
          <div
            class="alert d-flex w-100 alert-danger"
            v-if="errors.has('password')"
            role="danger"
          >
            La contraseña es requerida
            <button
              type="button"
              class="close ml-auto"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
      <div class="input-group col-sm-12 mb-3">
        <div v-if="message" class="alert d-flex  w-100 alert-danger" role="alert">
          {{ message }}
          <button
            type="button"
            class="close ml-auto"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6">
          <a href="/#/forgot" class="small">He olvidado mi contraseña</a>
        </div>
        <div class="col-lg-6">
          <button
            type="submit"
            :disabled="isLoggin"
            :loading="isLoggin"
            class="d-flex btn btn-primary justify-content-center float-right"
          >
            {{ isLoggin ? "Iniciando" : "Iniciar Sesión" }}
          </button>
        </div>
        <!-- /.col -->
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },

      showError: false,
      isLoggin: false,
      message: "",
    };
  },
  methods: {
    ...mapActions(["LogIn"]),
    handlelogin() {
      this.$isLoggin = true;
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          this.$isLoggin = false;
          return;
        }
        if (this.form.email && this.form.password) {
          this.submit();
        }
      });
    },
    async submit() {
      const User = new FormData();
      User.append("email", this.form.email);
      User.append("password", this.form.password);
      try {
        await this.LogIn(User);
        this.closeModal();

          this.$router.push("/dashboard");

        this.showError = false;
      } catch (error) {
        this.showError = true;
        console.error(error);
      }
    },
       closeModal() {
      this.$emit("close");}

  },
};
</script>

<style>
</style>
