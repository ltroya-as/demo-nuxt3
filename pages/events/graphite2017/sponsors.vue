<template>
  <div id="page" class="migrated">
    <!-- #navbar -->
    <div class="header" style="-webkit-text-fill-color: #3a3533">
      <div class="container-title container-title-no-feature-image">
        <div class="col-md-12">
          <div class="header-title">
            <h1 class="container-title-text">Sponsors</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="bt-container">
      <div class="cont">
        <nav class="navbar navbar-default graphnav" style="margin-top: 0">
          <div class="bt-container">
            <div class="navbar-header">
              <NuxtLink class="navbar-brand" to="/events/graphite2017">
                <img
                  style="padding-top: 0; max-width: 100%; height: 50px"
                  src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1690825472/assets/events/graphite-2017/graphite-2017-logo_syfftg.png"
                />
              </NuxtLink>
            </div>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <NuxtLink to="/events/graphite2017">Home</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/events/graphite2017/location">
                  Location
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/events/graphite2017/agenda"> Agenda</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/events/graphite2017/sponsors">
                  Sponsors
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/events/graphite2017/hosts"> Hosts</NuxtLink>
              </li>
              <li>
                <a href="http://imformed.com/"> IMformed </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

    <div class="bt-container">
      <div class="row">
        <div class="col-md-12">
          <h2>Sponsors</h2>
        </div>
      </div>
    </div>

    <div class="bt-container">
      <div class="row morespace">
        <div></div>
        <div class="col-md-3 sponsors" style="margin-bottom: 30px"
          ><img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1690825474/assets/events/graphite-2017/Sponsors/amg-logo_kabzvv.webp"
            width="302"
            height="96"
        /></div>
        <div class="col-md-3 sponsors" style="margin-bottom: 30px"
          ><img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1690825474/assets/events/graphite-2017/Sponsors/greatlakes-graphite_rze8qn.webp"
            width="202"
            height="74"
        /></div>
        <div class="col-md-3 sponsors" style="margin-bottom: 30px"
          ><img
            loading="lazy"
            width="300"
            height="129"
            class="alignnone wp-image-3290 size-medium"
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1690825474/assets/events/graphite-2017/Sponsors/tritron_ogdsfo.webp?resize=300%2C129&amp;ssl=1"
            alt=""
            srcset="
              https://res.cloudinary.com/benchmarkminerals/image/upload/v1690825474/assets/events/graphite-2017/Sponsors/tritron_ogdsfo.webp?resize=300%2C129&amp;ssl=1 300w,
              https://res.cloudinary.com/benchmarkminerals/image/upload/v1690825474/assets/events/graphite-2017/Sponsors/tritron_ogdsfo.webp?w=512&amp;ssl=1            512w
            "
            sizes="(max-width: 300px) 100vw, 300px"
        /></div>
        <div class="col-md-3 sponsors" style="margin-bottom: 30px"
          ><img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1690825474/assets/events/graphite-2017/Sponsors/renascor_cc5zme.webp"
            width="189"
            height="114"
        /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  color: #3a3533;
  line-height: 1.3;
  text-transform: uppercase;
  font-weight: bold;
}

h1 {
  margin: 33px 0;
  font-size: 36px;
}

h2 {
  font-size: 30px;
  margin: 25px 0;
}

h3 {
  margin: 22px 0;
  font-size: 20px;
}

a {
  color: #3a3533;
}

a:visited {
  color: #23527c;
}

a:hover {
  color: #23527c;
  text-decoration: underline;
}

menu,
ol,
ul {
  margin: 16px 0;
  padding: 0 0 0 40px;
}

.header-title h1 {
  color: #3a3533;
  font-weight: bold;
  line-height: 1.1;
  text-align: left;
  text-transform: uppercase;
}

.container-title-text {
  background-color: white;
  box-shadow: 10px 10px 0 0 #ffbd03;
  display: inline-block;
  padding: 20px;
}

.bt-container {
  max-width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.bt-container::after,
.bt-container::before,
.nav::after,
.nav::before,
.row::before,
.row::after {
  display: table;
  content: ' ';
}

.bt-container::after,
.nav::after,
.row::after {
  clear: both;
}

.content p {
  font-size: 18px;
  line-height: 1.6;
}

.col-xs-12,
.col-lg-1,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-md-1,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9 {
  position: relative;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

.row {
  margin-right: -15px;
  margin-left: -15px;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}

.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: #f9f9f9;
}

.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  padding: 8px;
  line-height: 1.4286;
  vertical-align: top;
  border-top: 1px solid #ddd;
}

table {
  border-bottom: 1px solid #ededed;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 14px;
  line-height: 2;
  margin: 0 0 20px;
  width: 100%;
}

@media only screen and (max-width: 643px) {
  .header-title {
    width: 86%;
  }

  .col-md-12 {
    padding: 0;
  }

  .header-title h1 {
    font-size: 28px;
    margin-bottom: 10px;
  }
}

@media only screen and (min-width: 644px) {
  .container-title {
    background-size: cover;
    clip-path: polygon(
      0 0,
      100% 0,
      100% 33%,
      100% 90%,
      53% 90%,
      50% 100%,
      47% 90%,
      0 90%
    );
    padding-left: 80px;
  }

  .container-title-feature-image {
    height: 500px;
    padding-top: 130px;
  }

  .header {
    width: 100%;
  }

  .header-title h1 {
    font-size: 40px;
  }

  .cont {
    padding: 20px 30px 30px;
  }
}

@media (min-width: 768px) {
  .bt-container {
    width: 750px;
  }
}

@media only screen and (min-width: 990px) {
  .header-title {
    width: 80%;
    margin-left: 17%;
  }
}

@media (min-width: 992px) {
  .bt-container {
    width: 970px;
  }

  .col-md-3 {
    width: 25%;
  }

  .col-md-4 {
    width: 33.3333%;
  }

  .col-md-5 {
    width: 41.6667%;
  }

  .col-md-6 {
    width: 50%;
  }

  .col-md-7 {
    width: 58.3333%;
  }

  .col-md-8 {
    width: 66.6667%;
  }

  .col-md-12 {
    width: 100%;
  }

  .col-md-offset-2 {
    margin-left: 16.6667%;
  }

  .col-xs-12,
  .col-md-1,
  .col-md-10,
  .col-md-11,
  .col-md-12,
  .col-md-2,
  .col-md-3,
  .col-md-4,
  .col-md-5,
  .col-md-6,
  .col-md-7,
  .col-md-8,
  .col-md-9 {
    float: left;
  }
}

@media (min-width: 1200px) {
  .bt-container {
    width: 1170px;
  }
}

body {
  background: #fff;
  font-family: Raleway, sans-serif;
  font-size: 16px;
}

.speaker {
  min-height: 250px;
}

.sponsors {
  text-align: center;
}

.sponsors > img {
  max-width: 100%;
}
/* stylelint-disable */
.header {
  text-transform: uppercase !important;
  font-size: 3.5em;
  padding-bottom: 0.7em;
  background: linear-gradient(#18e4e4, #fff832);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  border-bottom: 1px solid #18e4e4;
}
/* stylelint-enable */

@media only screen and (min-width: 644px) {
  .container-title {
    background-size: cover;
    clip-path: polygon(
      0 0,
      100% 0,
      100% 33%,
      100% 90%,
      53% 90%,
      50% 100%,
      47% 90%,
      0 90%
    );
    padding-left: 80px;
  }
}

.stillbanner {
  background: #495d64;
  color: #000;
  padding: 0.5em 3em;
}

.container-fluid.stillbanner .col-md-12 {
  float: none;
}

.graphnav.navbar-default {
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(90 90 90 / 35%);
  text-transform: uppercase;
  margin-bottom: 0;
}

.graphnav.navbar-default .bt-container {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.graphnav.navbar-default .bt-container .navbar-header {
  width: fit-content;
}

.graphnav.navbar-default ul li a {
  color: #525252 !important;
}

.navbar-nav {
  float: left;
  margin: 0;
  padding: 0;
}

.banner h2 {
  font-weight: 300;
  text-transform: uppercase;
  font-size: 1.6em;
}

.trans-container * {
  color: white;
}

.disclaimer {
  background: #fff;
  color: #4b4f54;
  padding: 20px;
}

.container-title-no-feature-image {
  height: 250px;
  padding-top: 30px;
  background-image: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689698079/assets/events/world-tour-2015/background_uybqa8.png');
}

.darkback {
  background: #222;
  color: white;
  margin-top: 4em;
  padding: 4em;
}

.header.small {
  font-size: 2em;
  margin: 1em 0;
}

.container-fluid {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.morespace {
  margin-top: 2em;
}
/* stylelint-disable */
.btn-graph,
input[type='submit'] {
  background: #fff832;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZjgzMiIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxOGU0ZTQiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);
  background: -moz-linear-gradient(top, #fff832 0%, #18e4e4 100%);
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0%, #fff832),
    color-stop(100%, #18e4e4)
  );
  background: -webkit-linear-gradient(top, #fff832 0%, #18e4e4 100%);
  background: -o-linear-gradient(top, #fff832 0%, #18e4e4 100%);
  background: -ms-linear-gradient(top, #fff832 0%, #18e4e4 100%);
  background: linear-gradient(to bottom, #fff832 0%, #18e4e4 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#fff832', endColorstr='#18e4e4', GradientType=0);
  font-weight: bold;
  padding: 1em;
  text-transform: uppercase;
  border: none;
  color: black;
  border-radius: 4px;
}
/* stylelint-enable */

#cd-google-map address {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 1em;
  background-color: #18e4e4;
  color: white;
  font-size: 18px;
}

@media (min-width: 768px) {
  .navbar-right {
    display: flex;
    gap: 15px;
    margin-left: auto !important;
  }
}

@media screen and (max-width: 990px) {
  .navbar-right {
    display: flex;
    gap: 15px;
    flex-direction: column;
    margin-left: 0 !important;
  }

  .graphnav.navbar-default .bt-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
}

@media (min-width: 992px) {
  .col-md-offset-2 {
    margin-left: 16.6667%;
  }
}
</style>
