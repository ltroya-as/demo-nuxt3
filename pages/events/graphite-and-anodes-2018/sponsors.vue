<template>
  <div>
    <div class="header">
      <div class="container-title container-title-feature-image">
        <div class="col-md-12">
          <div class="header-title">
            <h1 class="container-title-text">SPONSORS</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="bt-container">
      <nav
        class="navbar navbar-inverse"
        style="margin-top: 0; height: 65px !important; background-color: #222"
      >
        <div class="bt-container">
          <div class="navbar-header">
            <NuxtLink class="navbar-brand" to="/events/graphite-and-anodes-2018"
              ><img
                src="https://i2.wp.com/benchmarkminerals.com/wp-content/uploads/2017/12/graphite-anodes2018-.png?resize=300%2C88"
                style="padding-top: 0; max-width: 100%; height: 50px"
                alt="logo"
            /></NuxtLink>
          </div>
          <ul class="nav navbar-nav navbar-right">
            <li>
              <NuxtLink to="/events/graphite-and-anodes-2018"> Home </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/events/graphite-and-anodes-2018/location">
                Location
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/events/graphite-and-anodes-2018/agenda">
                Agenda
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/events/graphite-and-anodes-2018/sponsors">
                Sponsors
              </NuxtLink>
            </li>
          </ul>
        </div>
      </nav>
      <div class="jumbotron events graphite2018">
        <div class="bt-container">
          <div class="row">
            <div class="col-md-6 col-md-offset-3 welcome text-center">
              <h1>SPONSORS</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="bt-container">
        <div class="row">
          <div
            class="col-md-10 col-md-offset-1"
            style="padding-top: 40px; padding-bottom: 40px"
          >
            <div class="row sponsors">
              <div class="col-md-3">
                <img
                  src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,f_auto/v1691613143/assets/events/cathodes-2018/kibaran_jhlyel.webp"
                  alt=""
                  class="img-responsive"
                  width="214"
                  height="41"
                />
              </div>

              <div class="col-md-3">
                <img
                  src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,f_auto/v1691613143/assets/events/cathodes-2018/hexagon_n2937m.webp"
                  alt=""
                  class="img-responsive"
                  width="214"
                  height="90"
                />
              </div>

              <div class="col-md-3">
                <img
                  src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,f_auto/v1691613143/assets/events/cathodes-2018/syrah-resources_w6iqvz.webp"
                  alt=""
                  class="img-responsive"
                  width="214"
                  height="70"
                />
              </div>

              <div class="col-md-3">
                <img
                  src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,f_auto/v1691613143/assets/events/cathodes-2018/bass-metals_jgibis.webp"
                  alt=""
                  class="img-responsive"
                  width="200"
                  height="74"
                />
              </div>
              <div class="col-md-3">
                <img
                  loading="lazy"
                  src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,f_auto/v1691613143/assets/events/cathodes-2018/batteryminerals_vcq2vt.webp"
                  alt=""
                  width="214"
                  height="204"
                  class="img-responsive"
                />
              </div>
              <div class="col-md-3">
                <img
                  src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,f_auto/v1691613143/assets/events/cathodes-2018/talga_lmlzi6.webp"
                  alt=""
                  class="img-responsive"
                  width="214"
                  height="214"
                />
              </div>
              <div class="col-md-3">
                <img
                  src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,f_auto/v1691613144/assets/events/cathodes-2018/northern-graphite_mjheoy.webp"
                  alt=""
                  class="img-responsive"
                  width="200"
                  height="200"
                />
              </div>
              <div class="col-md-3">
                <img
                  src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,f_auto/v1691613144/assets/events/cathodes-2018/tirupati_ihpcll.webp"
                  alt=""
                  class="img-responsive"
                  width="214"
                  height="255"
                />
              </div>
              <div class="col-md-3">
                <img
                  src="https://res.cloudinary.com/benchmarkminerals/image/upload/c_fill,q_auto,g_auto,f_auto/v1691613144/assets/events/cathodes-2018/westwater_xivgff.webp"
                  alt=""
                  class="img-responsive"
                  width="214"
                  height="62"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const description =
  'Register today for: Anode material selection: natural vs synthetic graphite Market deepdive: supply, demand and price forecasts Future materials: silicon, lithium, graphene &amp; more Lithium ion Battery demand: Utility storage, electric vehicles, consumer electronics, and rise of the megafactories Meet the decision makers: The entire lithium ion supply chain, from mine to battery market'
const title =
  'The world’s first dedicated anodes event, bringing together key stakeholders from across the natural and synthetic graphite supply chain | Benchmark Mineral Intelligence'
const image =
  'https://i1.wp.com/www.benchmarkminerals.com/wp-content/uploads/2019/02/graphits-anodes-2019.png?fit=600%2C160&#038;ssl=1'
const { getSeoInfo } = useSeo()
const seo = getSeoInfo(
  { title },
  {
    twitterDescription: description,
    opengraphDescription: description,
    twitterImage: image,
    opengraphImage: image,
  },
)
useHead(seo)
</script>

<style scoped>
/* Benchmark Theme */
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

h2 {
  font-size: 30px;
  margin: 25px 0;
}

h3 {
  font-size: 20px;
  margin: 22px 0;
}

h4 {
  font-size: 20px;
  margin: 25px 0;
}

h5 {
  font-size: 13px;
  color: rgb(58 53 51 / 80%);
  margin: 30px 0;
}

p {
  margin: 0 0 24px;
}

menu,
ol,
ul {
  margin: 16px 0;
  padding: 0 0 0 40px;
}

hr {
  background: url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658190474/assets/dotted-line_gumis6.png?_i=AA')
    repeat center top;
  background-size: 4px 4px;
  border: 0;
  height: 1px;
  margin: 0 0 24px;
}

.col-md-12 {
  padding: 0;
}

.content ul {
  list-style: none;
  padding-left: 14px;
}

.content li {
  font-size: 16px;
  padding-bottom: 10px;
  line-height: 1.5em;
}

.content ul.no-column,
.content.no-column > li {
  columns: 1;
}

embed,
iframe,
object,
video {
  max-width: 100%;
}
</style>

<style scoped>
/* Page Styles */
.btn {
  border-radius: 10px;
}

.btn-c2a,
input[type='submit'] {
  background: transparent !important;
  color: #222 !important;
  margin-top: 1em !important;
  margin-right: 0 !important;
  padding: 0.8em !important;
  border: 3px solid #222 !important;
  text-transform: uppercase !important;
  font-weight: bold !important;
}

.btn-c2a:hover,
input[type='submit']:hover {
  background: #222 !important;
  border: 3px solid #222 !important;
  color: #fff !important;
}

a:hover {
  color: #ddd;
  text-decoration: underline;
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

caption,
th,
td {
  font-weight: normal;
  text-align: left;
}

caption {
  font-size: 16px;
  margin: 20px 0;
}

th {
  font-weight: bold;
  text-transform: uppercase;
}

td {
  border-top: 1px solid #ededed;
  padding: 6px 10px 6px 0;
}

.agenda-body {
  background-image: url('https://www.benchmarkminerals.com/wp-content/uploads/2019/05/graphite-2019-back.jpg');
  background-position: center top;
  background-repeat: no-repeat;
}

.site {
  background-color: transparent !important;
}

.mwf19-header {
  background-image: url('https://www.benchmarkminerals.com/wp-content/uploads/2019/05/graphite-2019-back.jpg');
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

/* I commented the font-family here because it was colliding with the tailwind class */
.mwf19-head-text {
  color: white;
  display: inline-block;

  /* font-family: 'Montserrat', Helvetica, sans-serif; */
  font-weight: bold;
  text-transform: uppercase;
  width: auto;
}

.mwf19-logo-container {
  width: auto;
  display: inline-block;
  padding-top: 3rem;
}

.mwf19-head-text h1 {
  font-size: 8rem;
  font-weight: bold;
  color: white;
}

.mwf19-head-text h2 {
  font-weight: bold;
  color: #3a3533;
  font-size: 34px;
}

.mwf19-head-text h2 small {
  color: white;
  display: block;
}

.mwf19-head-text p {
  color: #3a3533;
  font-size: 18px;
}

section.mainbody {
  padding-bottom: 0;
  font-size: 16px;
}

.darksection {
  background-color: #101010;
  padding: 3rem 0;
  margin-top: 40px;
}

.darksection .header h2 {
  color: #007389;
}

.darksection p {
  color: white;
}

footer {
  display: none;
}

.citylist p {
  display: none;
}

.entry-content {
  padding: 10px;
}

.mwf19-background {
  background-color: rgb(0 115 137 / 70%);
}

.form {
  color: white;
}

.form h4 {
  color: white;
  font-weight: bold;
}

.form .btn-register {
  border-color: white !important;
  width: 100%;
  display: block;
  color: white !important;
}

.form input,
.form label {
  width: 100%;
}

.form p {
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0 15px;
}

.events .welcome {
  text-shadow: #333 2px 2px 5px;
}

.form .price .cost {
  background: rgb(255 255 255 / 20%);
  padding: 10px;
}

.form .price span {
  font-size: 20px;
  font-weight: bold;
}

.nav-pills {
  border-top: 1px #007389 solid;
  border-bottom: 1px #007389 solid;
  padding: 1rem 0;
}

.nav-pills > li {
  float: left;
}

.nav-pills a {
  color: #212121;
  text-transform: uppercase;
  font-weight: bold;
}

.nav-pills > li > a {
  border-radius: 4px;
}

nav > li > a:focus,
.nav > li > a:hover {
  text-decoration: none;
}

.speaker h5,
.speaker p {
  text-transform: capitalize;
  color: white;
}

.speaker img {
  filter: grayscale(100%);
}

.speaker {
  min-height: 255px !important;
  max-height: 255px !important;
}

.container-title-feature-image {
  height: 250px;
  padding-top: 30px;
  background-image: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689698079/assets/events/world-tour-2015/background_uybqa8.png');
}

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

.header {
  margin-bottom: 20px;
}

.header-title {
  width: 80%;
  margin-left: 17%;
}

.header-title h1 {
  color: #3a3533;
  font-weight: bold;
  line-height: 1.1;
  text-align: left;
  text-transform: uppercase;
  font-size: 40px;
}

.container-title-text {
  background-color: white;
  box-shadow: 10px 10px 0 0 #ffbd03;
  display: inline-block;
  padding: 20px;
}

.navbar-header {
  float: left;
}

.navbar-right {
  columns: 4;
  padding-left: 14px;
  color: white;
  float: right;
  padding-right: 14px;
}

.jumbotron,
.container-fluid .jumbotron {
  padding-right: 60px;
  padding-left: 60px;
}

.jumbotron {
  background: #fbba00;
  color: #222;
  background-image: url('https://i1.wp.com/www-old.benchmarkminerals.com/wp-content/uploads/2019/04/graphite-anodes-2018_event-background.jpg?fit=2000%2C500&ssl=1');
  background-position: center center;
  background-size: cover;
  padding-top: 48px;
  padding-bottom: 48px;
}

.jumbotron h1 {
  font-size: 2.5em;
  text-transform: uppercase;
  margin: 1.5em 0;
}

.events {
  color: white;
  margin-bottom: 30px;
}

.events h1 {
  font-weight: bold;
  color: white;
  font-size: 34px;
  line-height: 1.2;
  text-shadow: #333 2px 2px 5px;
}

img.aligncenter {
  margin: 5px auto;
}

.speaker-section {
  background: #222;
  margin-bottom: 20px;
}

.speaker-section h2 {
  color: white;
}

.speaker h5 {
  font-size: 14px;
  margin-bottom: 5px;
  margin-top: 15px;
  text-transform: uppercase;
}

.speaker p {
  font-size: 10px;
  text-transform: uppercase;
}

.intro {
  font-size: 18px;
  margin: 30px 0;
}

.intro-list {
  list-style: square !important;
  padding: 0 0 0 40px !important;
}

.col-md-offset-3 {
  margin-left: 25%;
}

.section-info {
  background-color: rgba(202 42 76 / 100%);
  color: white;
  margin-top: 30px;
  padding-bottom: 30px;
}

.btn-register {
  border-color: white !important;
  width: 100%;
  display: block;
  color: white !important;
  font-weight: bold;
  border-width: 2px;
  text-transform: uppercase;
}

.darkback {
  background: #222;
  color: white;
  margin-top: 4em;
  padding: 4em;
}

.icon-container {
  color: white;
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

.col-md-offset-1 {
  margin-left: 8.333%;
}

.sponsors .col-md-3 {
  height: 220px;
}
</style>

<style scoped>
/* Bootstrap Classes */
.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4286;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
}

.btn.focus,
.btn:focus,
.btn:hover {
  color: #333;
  text-decoration: none;
}

.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
}

table {
  background-color: transparent;
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

.row {
  margin-right: -15px;
  margin-left: -15px;
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

.container::after,
.nav::after,
.row::after {
  clear: both;
}

.bt-container {
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.nav {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.nav > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
}

.text-right {
  text-align: right;
}

.pull-right {
  float: right !important;
}

@media (min-width: 768px) {
  .bt-container {
    width: 750px;
  }

  .col-sm-6 {
    width: 50%;
  }
}

@media (min-width: 992px) {
  .bt-container {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .bt-container {
    width: 1170px;
  }
}

@media (min-width: 992px) {
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

  .col-md-10 {
    width: 83.333%;
  }

  .col-md-12 {
    width: 100%;
  }

  .col-md-offset-2 {
    margin-left: 16.6667%;
  }
}

@media (min-width: 992px) {
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

.img-responsive {
  display: block;
  max-width: 100%;
  height: auto;
}

.embed-responsive {
  position: relative;
  display: block;
  height: 0;
  padding: 0;
  overflow: hidden;
}

.embed-responsive-16by9 {
  padding-bottom: 56.25%;
}

.embed-responsive .embed-responsive-item,
.embed-responsive embed,
.embed-responsive iframe,
.embed-responsive object,
.embed-responsive video {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.img-circle {
  border-radius: 50%;
  width: 90px;
  height: 90px;
}
</style>
