<template>
  <div id="nav" class="mb-4" style="margin-bottom:3rem;">
    <Menu mode="horizontal"  active-name="1">
        <MenuItem name="1">
            <Icon type="ios-paper" />
           Inicio
        </MenuItem>
        <MenuItem name="2">
            <Icon type="ios-people" />
           Caracteristicas
        </MenuItem>
        <MenuItem name="3"><router-link :to="{name: 'SignUp'}">Registrese</router-link></MenuItem>
        <MenuItem name="4"><router-link :to="{name: 'SignIn'}">Iniciar Sesión</router-link></MenuItem>

    </Menu>
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

 },
  mounted(){

  }
};
</script>

<style lang="scss" scoped>

</style>


