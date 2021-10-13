<template>
  <div id="app" @wheel="landingScroll"  v-if="!this.$route.meta.requiresAuth">
    <Sing v-if="showModal" @close="closeModal()"  />
    <NavBar @open="openModal()"  />
    <router-view />
    <Footer v-if="!this.$route.meta.guest"/>
  </div>
  <div v-else>
      <div>
      <!--========== ADMIN SIDE MENU one ========-->
      <div class="_1side_menu" >
        <div class="_1side_menu_logo">
          <h3 style="text-align:center;">Logo Image</h3>
          <!--<img src="/img/logo.jpg" style="width: 108px;margin-left: 68px;"/>-->
        </div>

        <!--~~~~~~~~ MENU CONTENT ~~~~~~~~-->
        <div class="_1side_menu_content">
          <div class="_1side_menu_img_name">
            <!-- <img class="_1side_menu_img" src="/pic.png" alt="" title=""> -->
            <p class="_1side_menu_name">Admin</p>
          </div>

          <!--~~~ MENU LIST ~~~~~~-->
          <div class="_1side_menu_list">
            <ul class="_1side_menu_list_ul">
              <li><router-link to="dashboard"><a><Icon type="ios-speedometer" /> Dashboard</a></router-link></li>
              <li><router-link to="tags"><a><Icon type="ios-speedometer" /> Tags</a></router-link></li>
              <li><router-link to="categories"><a><Icon type="ios-speedometer" /> Categories</a></router-link></li>
            </ul>
          </div>
        </div>
      </div>
      <!--========== ADMIN SIDE MENU ========-->

      <!--========= HEADER ==========-->
      <div class="header">
        <div class="_2menu _box_shadow">
          <div class="_2menu_logo">
            <ul class="open_button">
              <li>
                <Icon type="ios-list" />
              </li>
              <!--<li><Icon type="ios-albums" /></li>-->
            </ul>
          </div>
        </div>
      </div>
      <!--========= HEADER ==========-->
    </div>
    	<router-view/>
  </div>
</template>
<script>
// @is an alias to /src
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
import Sing from "./views/Sing.vue";
import WOW from "wowjs";
import CountUp from "countup";
export default {
  components: {
    NavBar,
    Footer,
    Sing,
  },
  data: function () {
    return {
      showModal: false,
    };
  },
  methods: {
    fadeout() {
      document.querySelector(".preloader").style.opacity = "0";
      document.querySelector(".preloader").style.display = "none";
    },
    initCount() {
      const countUp = new CountUp({
        start: 0,
        duration: 2000,
        intvalues: true,
        interval: 100,
        append: " ",
      });
      if (!countUp.error) {
        countUp.start();
      } else {
        console.error(countUp.error);
      }
    },
    filterButton() {
      let filterButtons = document.querySelectorAll(
        ".portfolio-btn-wrapper button"
      );
      filterButtons.forEach((e) =>
        e.addEventListener("click", () => {
          let filterValue = event.target.getAttribute("data-filter");
          iso.arrange({
            filter: filterValue,
          });
        })
      );

      var elements = document.getElementsByClassName("portfolio-btn");
      for (var i = 0; i < elements.length; i++) {
        elements[i].onclick = function () {
          var el = elements[0];
          while (el) {
            if (el.tagName === "BUTTON") {
              el.classList.remove("active");
            }
            el = el.nextSibling;
          }
          this.classList.add("active");
        };
      }
    },
    landingScroll(evt) {
      console.log("scroll");
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
    openModal() {
      this.showModal = true;
      console.log(this.showModal);
    },
    closeModal() {
      this.showModal = false;
    },
  },
  created() {
    setTimeout(() => {
      this.filterButton();
      this.initCount();
    }, 1000);
    setTimeout(() => {
      console.log("Hola");
      this.fadeout();
    }, 2000);
    new WOW.WOW({
      live: true,
    }).init();
  },
  mounted() {},
};
</script>
<style>
</style>
