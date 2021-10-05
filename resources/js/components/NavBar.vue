<template>
  <div id="nav">
    <!-- Start Header Area -->
    <header class="header">
      <div class="navbar-area">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-12">
              <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand logo" href="/">
                  <img
                    class="primary-logo"
                    src=""
                    alt="Logo"
                  />
                  <img
                    class="alt-logo"
                    src="#"
                    alt="Logo"
                  />
                </a>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                  <span class="toggler-icon"></span>
                </button>
                <div
                  class="collapse navbar-collapse sub-menu-bar"
                  id="navbarSupportedContent"
                >
                  <ul id="nav" class="navbar-nav ml-auto">
                    <li class="nav-item">
                      <a class="page-scroll active" href="/"
                        >Inicio</a
                      >
                    </li>
                    <li class="nav-item" v-if="!isLoggedIn">
                      <a class="page-scroll" href="#features"
                        >Características</a
                      >
                    </li>
                     <li class="nav-item" v-if="!isLoggedIn">
                      <a class="page-scroll" href="#call-action"
                        >Planes</a
                      >
                    </li>

                    <li class="nav-item" v-if="!isLoggedIn">
                      <a class="page-scroll"  role="button"  @click="openModal()"
                        >Iniciar Sesión</a
                      >
                    </li>
                    <li class="nav-item" v-if="isLoggedIn">
                      <a class="page-scroll" @click="logout">Cerrar Sesión</a>
                    </li>
                  </ul>
                </div>
              </nav>
              <!-- navbar -->
            </div>
          </div>
          <!-- row -->
        </div>
        <!-- container -->
      </div>
      <!-- navbar area -->
    </header>
  </div>
</template>

<script>

export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/");
    },
    toggle(){
         let navbarToggler = document.querySelector(".navbar-toggler");
         var navbarCollapse = document.querySelector(".collapse");

        document.querySelectorAll(".page-scroll").forEach(e =>
            e.addEventListener("click", () => {
                navbarToggler.classList.remove("active");
                navbarCollapse.classList.remove('show')
            })
        );
        navbarToggler.addEventListener('click', function () {
            navbarToggler.classList.toggle("active");
             navbarCollapse.classList.toggle('show');
        })
    },
    openModal(){

       // console.log("click");
        this.$emit("open");


    }

  },
  mounted(){
      this.toggle();

  }
};
</script>

<style lang="scss" scoped>

</style>


