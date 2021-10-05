<template>
  <div class="modal" id="modalLogin" tabindex="-1" style="display: block">
    <div class="modal-dialog fadeInDown animated">
      <div class="modal-content">
        <div class="modal-header border-0">
          <h4 class="card-title custom-card-title">
           Continúa para iniciar el  Demo
          </h4>
          <button
            type="button"
            class="close"
            form-dismiss="modal"
            @click="closeModal()"
            aria-label="Close"
          >
           <i class="lni lni-close"></i>
          </button>
        </div>
        <div class="modal-body">
          <Tabs>
            <Tab name="Iniciar sesión" :selected="true">
              <Login  @close="closeModal()" />
            </Tab>
            <Tab name="Registro">
              <Register />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from "../components/Tabs.vue";
import Tab from "../components/Tab.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
export default {
  name: "Sign",
  components: {
    Tabs,
    Tab,
    Login,
    Register,
  },
  methods:{
       closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
