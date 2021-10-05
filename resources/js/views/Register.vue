<template>
  <div class="register">
    <div class="card-body register-card-body">
      <form name="form" @submit.prevent="handleRegister">
        <div class="form-row">
          <div class="input-group col-sm-12 mb-3">
            <input
              type="text"
              class="form-control"
              name="username"
              v-model="form.username"
              v-validate="'required|min:3|max:20'"
              placeholder="Nombre"
            />
          </div>
          <div class="input-group col-sm-12">
            <div
              v-if="submitted && errors.has('username')"
              class="alert d-flex  alert-danger w-100 "
            >
              {{ errors.first("username") }}
              <button
                type="button"
                class="close ml-auto "
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
              type="email"
              class="form-control"
              placeholder="Correo"
              v-model="form.email"
              v-validate="'required|email|max:50'"
              name="email"
            />
          </div>

          <div class="input-group col-sm-12">
            <div
              v-if="submitted && errors.has('email')"
              class="alert d-flex  alert-danger w-100"
            >
              {{ errors.first("email") }}
              <button
                type="button"
                class="close ml-auto "
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
              placeholder="Contraseña"
              v-model="form.password"
              ref="password"
              v-validate="'required|min:6|max:40'"
              name="password"
            />
          </div>
          <div class="input-group col-sm-12">
            <div
              v-if="submitted && errors.has('password')"
              class="alert d-flex  alert-danger w-100"
            >
              {{ errors.first("password") }}
              <button
                type="button"
                class="close ml-auto "
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="input-group mb-3 col-sm-12">
            <input
              v-model="form.password_confirmation"
              v-validate="'required|confirmed:password'"
              vid="password"
              class="form-control"
              name="password_confirmation"
              type="password"
              placeholder="Confirmar contraseña"
              data-vv-as="password"
            />
          </div>
          <div class="input-group col-sm-12">
            <div
              v-if="submitted && errors.has('password_confirmation')"
              class="alert d-flex  alert-danger w-100"
            >
              {{ errors.first("password_confirmation") }}
              <button
                type="button"
                class="close ml-auto "
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        </div>

        <div class="row">
          <div
            class="
              col-sm-12
              d-flex
              justify-content-center justify-content-lg-end
              mb-3
            "
          >
            <button
              type="submit"
              class="btn btn-primary d-flex justify-content-center"
            >
              Registrarse
            </button>
          </div>
          <!-- /.col -->
        </div>
      </form>
      <div class="row">
        <div class="col-sm-12 mb-3">
          <div
            class="alert"
            v-if="showError"
            :class="successful ? 'alert-success' : 'alert-danger w-100'"
            role="alert"
          >
            {{ message }}
            <button
              type="button"
              class="close ml-auto "
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      showError: false,
      submitted: false,
      successful: false,
      message: "",
    };
  },
  methods: {
    ...mapActions(["Register"]),
    handleRegister() {
      this.message = "";
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.submit();
        }
      });
    },
    async submit() {
      try {
        await this.Register(this.form);
        this.message = "Usuario Creado !";
        this.successful = true;
        this.showError = false;
        this.$router.push("/dashboard");

      } catch (error) {
            this.showError = true;
        console.log(error);
        this.message = "Error al crear el usuario Creado !";

      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
