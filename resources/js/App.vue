<template>
<div class="layout" id="app" v-if="$store.state.user">
    <Layout >
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                    <MenuItem name="4">
                            <Icon type="ios-paper"></Icon>
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
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                               <router-link to="tags"><a>Tags</a></router-link>
                            </template>
                            <MenuItem name="2-1">Option 1</MenuItem>
                            <MenuItem name="2-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                 <router-link to="categories"><a> Categories</a></router-link>
                            </template>
                            <MenuItem name="3-1">Option 1</MenuItem>
                            <MenuItem name="3-2">Option 2</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                  <router-link to="users"><a> Users</a></router-link>
                            </template>
                            <MenuItem name="4-1">Option 1</MenuItem>
                            <MenuItem name="4-2">Option 2</MenuItem>
                        </Submenu>
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

import WOW from "wowjs";

export default {
  components: {
    navbar: NavBar,
    OtherFooter,

  },
  props: ['user'],
  data: function () {
    return {
      showModal: false,
      isLoggedIn: false
    };
  },
  methods: {
    landingScroll(evt) {

      this.isFirefox = navigator.userAgent.indexOf("Firefox") > -1;
      this.isIe =
        navigator.userAgent.indexOf("MSIE") > -1 ||
        navigator.userAgent.indexOf("rv:") > -1;

      if (this.isFirefox) {
        //Set delta for Firefox
        this.delta = evt.detail * -120;
      } else if (this.isIe) {
        //Set delta for IE
        this.delta = -evt.deltaY;
      } else {
        //Set delta for all other browsers
        this.delta = evt.wheelDelta;
      }

      var header_navbar = document.querySelector(".navbar-area");
      var sticky = header_navbar.offsetTop;

      if (window.pageYOffset > sticky) {
        header_navbar.classList.add("sticky");
      } else {
        header_navbar.classList.remove("sticky");
      }

      // show or hide the back-top-top button
      var backToTo = document.querySelector(".scroll-top");
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        backToTo.style.display = "flex";
      } else {
        backToTo.style.display = "none";
      }

      this.clickTop();
    },
    clickTop() {
      var sections = document.querySelectorAll(".page-scroll");
      var scrollPos =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      for (var i = 0; i < sections.length; i++) {
        var currLink = sections[i];
        var val = currLink.getAttribute("href");
        var refElement = document.querySelector(val);
        var scrollTopMinus = scrollPos + 73;
        if (
          refElement.offsetTop <= scrollTopMinus &&
          refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
        ) {
          document.querySelector(".page-scroll").classList.remove("active");
          currLink.classList.add("active");
        } else {
          currLink.classList.remove("active");
        }
      }

      // for menu scroll
      var pageLink = document.querySelectorAll(".page-scroll");

      pageLink.forEach((elem) => {
        elem.addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(elem.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
            offsetTop: 1 - 60,
          });
        });
      });
    },

    async logout() {
        await this.$store.dispatch("LogOut");
         this.$store.commit('updatedUser', false)
        this.$router.push("/");
    },
  },
  created() {
    new WOW.WOW({
      live: true,
    }).init();
    this.$store.commit('updatedUser', this.user);

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
