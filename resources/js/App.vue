<template>
<div class="layout" id="app" v-if="$store.state.auth.user">
    <Layout >
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <img src="images/logo/logo.svg" alt="logoProject" >
                    </div>
                    <div class="layout-nav" style="margin-left:auto;display: flex;margin-left: auto;justify-content: end;">
                    <MenuItem name="4">

                            <a  @click="logout"><Icon type="ios-speedometer" /> Cerrar Sesión</a>
                    </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                                <router-link to="dashboard"><a> Inicio</a></router-link>
                        </MenuItem>
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                                <router-link to="tags"><a> Tags</a></router-link>
                        </MenuItem>
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                                <router-link to="categories"><a> Categories</a></router-link>
                        </MenuItem>
                        <MenuItem name="1">
                            <Icon type="ios-navigate"></Icon>
                                <router-link to="users"><a> Users</a></router-link>
                        </MenuItem>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Vista</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                        <router-view/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>


</div>
<div v-else>
      <navbar />
     <router-view/>
</div>


</template>
<script>
// @is an alias to /src
import NavBar from "./components/NavBar.vue";
import OtherFooter from "./components/Footer.vue";


export default {
  components: {
    navbar: NavBar,
    OtherFooter,

  },

  data: function () {
    return {
      showModal: false,
      isLoggedIn: false
    };
  },
  methods: {
 async logout() {
    await this.$store.dispatch("LogOut");

    this.$router.push("/");
},
  },

  mounted() {},
};
</script>
<style scoped>
    .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>
