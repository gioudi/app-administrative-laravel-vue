<template>
  <!-- Start Footer Area -->
  <footer class="footer style2 ">
    <div class="footer-middle">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-12">
            <!-- Single Widget -->
            <div class="f-about single-footer">
              <div class="logo">
                <router-link to="index.html"
                  ><img src="images/logo/white-logo.svg" alt="Logo"
                /></router-link>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
              <div class="footer-social">
                <ul>
                  <li>
                    <router-link to="#"
                      ><i class="lni lni-facebook-original"></i
                    ></router-link>
                  </li>
                  <li>
                    <router-link to="#"
                      ><i class="lni lni-twitter-original"></i
                    ></router-link>
                  </li>
                  <li>
                    <router-link to="#"
                      ><i class="lni lni-linkedin-original"></i
                    ></router-link>
                  </li>
                  <li>
                    <router-link to="#"
                      ><i class="lni lni-google"></i
                    ></router-link>
                  </li>
                </ul>
              </div>
            </div>
            <!-- End Single Widget -->
          </div>
          <div class="col-lg-8 col-md-8 col-12">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-12">
                <!-- Single Widget -->
                <div class="single-footer sm-custom-border f-link">
                  <h3>Nosotros</h3>
                  <ul>
                    <li><router-link to="/">Inicio</router-link></li>
                    <li><router-link to="#">Equipo SOD</router-link></li>
                  </ul>
                </div>
                <!-- End Single Widget -->
              </div>
             <!--  <div class="col-lg-4 col-md-6 col-12"> -->
                <!-- Single Widget -->
            <!--     <div class="single-footer sm-custom-border f-link"> -->
               <!--    <h3>Features</h3> -->
                  <!-- <ul> -->
                   <!--  <li><router-link to="#">Easy to use</router-link></li>
                    <li>
                      <router-link to="#">Work on all device</router-link>
                    </li>
                    <li><router-link to="#">Always up to date</router-link></li>
                    <li>
                      <router-link to="#">Track your devices</router-link>
                    </li> -->
                 <!--  </ul> -->
                <!-- </div> -->
                <!-- End Single Widget -->
              <!-- </div> -->

              <div class="col-lg-6 col-md-6 col-12">
                <!-- Single Widget -->
                <div
                  class="
                    single-footer
                    md-custom-border
                    sm-custom-border
                    f-contact
                  "
                >
                  <h3>Información de Contacto</h3>
                  <ul>
                    <li><i class="lni lni-map-marker"></i> Bogota, COL</li>
                    <li>
                      <i class="lni lni-envelope"></i>sod@misena.edu.co
                    </li>
                    <li><i class="lni lni-phone"></i> +57 548 159 2491</li>
                  </ul>
                </div>
                <!-- End Single Widget -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/ End Footer Middle -->
    <!-- Start Footer Bottom -->
    <div class="footer-bottom">
      <div class="container">
        <div class="inner">
          <div class="row">
            <div class="col-12">
              <div class="left">
                <p>
                  Diseñado y desarrollado por<router-link
                    to=""
                    rel="nofollow"
                    target="_blank"
                    >Team SOD
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End Footer Middle -->
  </footer>
  <!--/ End Footer Area -->
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>

@import './resources/sass/_variables.scss';


.footer {
    z-index: 2;
    position: relative;
    background: linear-gradient(45deg, $primary, $secondary);


    &::before {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;

      background-size: cover;
      background-repeat: no-repeat;
      background-position: top;
      z-index: -1;
    }

    .call-action .inner-content {
      padding: 100px 0;
      border-bottom: 1px solid $black2;

      h2 {
        font-size: 28px;
        font-weight: 700;
        display: block;
        color: $white;
      }

      p {
        color: rgba($white, 0.7);
        display: block;
        margin-top: 30px;
        font-size: 15px;
        font-weight: 500;
        line-height: 30px;
      }

      .button {
        float: right;

        .btn:hover {
          background-color: $white;
          color: $primary;
        }
      }
    }

    .logo {
      margin-bottom: 26px;

      img {
        width: 150px;
      }
    }

    .f-about {
      padding-right: 85px;

      p {
        color: $white;
        font-size: 14px;
        line-height: 28px;
      }
    }

    .footer-social {
      margin-top: 30px;

      ul li {
        display: inline-block;
        margin-right: 10px;

        &:last-child {
          margin-right: 0;
        }

        a {
          font-size: 12px;
          display: block;
          background: transparent;
          border: none;
          color: $white;
          position: relative;
          z-index: 3;
          height: 35px;
          width: 35px;
          display: block;
          border-radius: 6px;
          border: 1px solid #eeeeeeb3;
          text-align: center;
          line-height: 35px;

          &:hover {
            color: #081828;
            background-color: $white;
            border-color: transparent;
          }
        }
      }
    }

    .footer-middle {
      padding-bottom: 120px;
      padding-top: 90px;
    }

    .single-footer {
      margin-top: 30px;

      h3 {
        color: $white;
        font-size: 16px;
        font-weight: 600;
        position: relative;
        text-transform: capitalize;
        margin-bottom: 30px;
      }
    }

    .f-link ul li {
      margin-bottom: 18px;
      position: relative;

      &:last-child {
        margin: 0;
      }

      a {
        display: inline-block;
        color: $white;
        font-size: 14px;
        font-weight: 400;
        position: relative;

       transition:all 0.3s ease;

        &:hover {
          opacity: 0.7;
        }
      }
    }

    .f-contact ul {
      margin-top: 20px;

      li {
        display: block;
        margin-bottom: 15px;
        color: $white;
        position: relative;
        padding-left: 35px;

        i {
          display: inline-block;
          font-size: 18px;
          color: $white;
          position: absolute;
          left: 0;
          top: 0;
        }

        &:last-child {
          margin: 0;
        }
      }
    }

    .footer-bottom {
      padding: 30px 0;
      background-color: transparent;
      border-top: 2px solid #eeeeee69;

      .inner {
        text-align: center;

        p {
          color: $white;
          font-size: 14px;

          a {
            font-weight: 400;
            display: inline-block;
            margin-left: 6px;
            color: $white;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
  }
</style>
