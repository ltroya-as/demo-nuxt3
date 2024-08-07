<template>
  <div>
    <!-- #navbar -->
    <nav class="navbar navbar-default graphnav">
      <div class="container-fluid">
        <div class="navbar-header">
          <NuxtLink class="navbar-brand" to="/events/graphite2016"
            ><img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689717330/assets/events/graphite-2016/Images/graphite-logo_tptopc.png"
              style="padding-top: 0"
          /></NuxtLink>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li><NuxtLink to="/events/graphite2016">Home</NuxtLink></li>
          <li>
            <NuxtLink to="/events/graphite2016/location"> Location </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/events/graphite2016/agenda"> Agenda </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/events/graphite2016/sponsors"> Sponsors </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/events/graphite2016/hosts"> Hosts </NuxtLink>
          </li>
          <li><a href="http://imformed.com/">IMformed</a></li>
        </ul>
      </div>
    </nav>
    <div class="container-fluid stillbanner">
      <div class="col-md-12">
        <h2 class="header">HOSTS</h2>
      </div>
    </div>
    <div class="bt-container">
      <div class="row morespace">
        <div class="col-md-6" style="padding-top: 20px">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689720126/assets/events/graphite-2016/sponsors2/benchmark-dark-logo_zzi7ti.png"
            style="height: 100px"
          />
          <h3>Benchmark Mineral Intelligence</h3>
          <p
            ><strong
              >THE SOURCE FOR INTELLIGENCE ON CRITICAL MINERALS AND METALS,
              DISRUPTIVE TECHNOLOGY AND EMERGING MARKETS</strong
            >
          </p>
          <p
            >Established by Simon Moores in 2014 with a specialist focus on
            battery raw materials such as graphite, lithium and cobalt,
            Benchmark Mineral Intelligence collects detailed market prices,
            data, and intelligence on these private, opaque industries.
          </p>
          <p
            >Through the experience of its analysts and the specialist focus,
            Benchmark offers a suite of high quality subscription services,
            managed by Andrew Miller, from price data and indices to forecasts
            and a quarterly magazine.
          </p>
          <p
            >Benchmark has advised some of the world’s most influential
            corporations including: leading producers of critical minerals, end
            users such as electric vehicle and battery producers, and large
            investment houses and brokers.</p
          >
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702185/assets/events/world-tour-2016/Speakers/simon-moores_z0t95b.jpg"
            class="morespace"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702182/assets/events/world-tour-2016/Speakers/andrew-miller_pg4yrf.jpg"
            style="margin-left: 15px"
            class="morespace"
          />
        </div>
        <div class="col-md-6" style="background: white; padding-top: 20px">
          <img
            src="http://imformed.com/wp-content/uploads/2014/12/Imformed-web-draft-logo-e1418316533251.jpg"
          />
          <h3>IMFORMED</h3>
          <p
            ><strong
              >IMFORMED is the new source of professional networking
              opportunities and market research expertise for the global
              non-metallic minerals industry founded by Mike O’Driscoll and
              Ismene Clarke.</strong
            ></p
          >

          <p
            >Mike and Ismene have forged careers spanning three decades in the
            industrial minerals industry, spent mostly at Industrial Minerals
            magazine, and are recognised and trusted as experts within the
            market.</p
          >
          <p
            >They have deep experience, a high reputation, and a proven track
            record gleaned from a combined 40-year career in devising, managing,
            and commercialising industry leading events, and original editorial
            and information products for the international industrial minerals
            business.</p
          >
          <p
            >In early 2015 they decided to pursue a fresh and independent course
            with which to better serve the market by launching IMFORMED.</p
          >
          <img
            src="http://imformed.com/wp-content/uploads/2014/12/IMG_0251-1024x682.jpg"
            style="max-width: 100%"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
}
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  color: inherit;
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

.navbar-default ul li a:hover,
.navbar-default ul li a:active,
.navbar-default ul li a:focus {
  border-bottom: 7px solid #18e4e4;
}

.nav > li {
  position: relative;
  display: block;
}

.nav-pills > li {
  float: left;
}

.nav-pills > li > a {
  border-radius: 4px;
}

.nav > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
}

.nav-pills a {
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
}

.banner {
  background: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689717330/assets/events/graphite-2016/Images/splash_b4o9sw.jpg')
    no-repeat 0 0;
  color: #fff;
  padding: 6em 6em 4em;
  background-size: cover;
  margin-right: 0;
  width: 100%;
}

.banner ul li {
  font-size: 16px;
}

.nav > li > a:focus,
.nav > li > a:hover {
  text-decoration: none;
}

.nav-pills a:hover {
  color: #ff0;
  background-color: rgba(0 0 0 / 60%);
}

hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-color: #aaa !important;
  border-top: 1px solid #eee;
}

.front-speaker {
  min-height: 350px;
}

.stillbanner {
  background: #232124;
  color: #000;
  padding: 0.5em 3em !important;
}

.container-fluid::after,
.container-fluid::before {
  display: table;
  content: ' ';
}

.container-fluid::after {
  clear: both;
}

.darkback {
  background: #232124;
  color: #fff;
}

section {
  display: block;
  padding: 1em 0 4em;
}

.morespace {
  margin-top: 2em;
  display: inline;
}

.icon-container {
  color: white;
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

.agenda h2 {
  text-transform: uppercase;
  font-weight: bold;
  border-left: 10px solid #18e4e4;
  padding-left: 15px;
}

.agenda h4 {
  font-size: 1.5em;
  text-transform: capitalize;
  font-weight: 500;
}

.agenda h5 {
  font-size: 1em;
  margin-left: 2em;
  font-weight: lighter;
  text-transform: capitalize;
}

.disclaimer .col-md-6 {
  min-height: 425px;
}

.exhibitors > img {
  display: inline;
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

  .container-fluid {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
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

.header {
  text-transform: uppercase !important;
  font-size: 3.5em;
  margin: 1em;
  padding-bottom: 0.7em;
  background: linear-gradient(#18e4e4, #fff832);
  color: transparent;
  text-align: center;
  border-bottom: 1px solid #18e4e4;
  /* stylelint-disable */
  -webkit-background-clip: text;
  /* stylelint-enable */
}

.container-title-feature-image {
  background-image: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689717330/assets/events/graphite-2016/Images/graphite2017-splash_wgxtjk.webp');
}

@media only screen and (min-width: 644px) {
  .container-title-feature-image {
    height: 500px;
    padding-top: 130px;
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
}

.graphnav.navbar-default {
  background-color: #fff;
  box-shadow: 0 2px 5px 0 rgba(90 90 90 / 35%);
  text-transform: uppercase;
  margin-bottom: 0;
}

.graphnav.navbar-default .bt-container,
.graphnav.navbar-default .container-fluid {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}

.graphnav.navbar-default .bt-container .navbar-header,
.graphnav.navbar-default .container-fluid .navbar-header {
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

.trans-container {
  background: rgba(0 0 0 / 60%);
  padding: 3em;
  color: white;
  float: left;
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

p {
  margin: 0 0 10px;
}

.disclaimer p {
  font-size: 14px;
}

.img-circle {
  border-radius: 100%;
}

.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.428;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
}

.btn-c2a {
  background: linear-gradient(to bottom, #fff832 0, #18e4e4 100%) !important;
  font-weight: bold;
  padding: 1em;
  text-transform: uppercase;
  border: none;
  color: #000;
}

.header.small {
  font-size: 2em;
}

@media (min-width: 768px) {
  .navbar-right {
    display: flex;
    gap: 15px;
    margin-left: auto !important;
  }

  .container-fluid > .navbar-collapse,
  .container-fluid > .navbar-header,
  .container > .navbar-collapse,
  .container > .navbar-header {
    margin-right: 0;
    margin-left: 0;
  }

  .navbar > .container .navbar-brand,
  .navbar > .container-fluid .navbar-brand {
    margin-left: -15px;
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
</style>
