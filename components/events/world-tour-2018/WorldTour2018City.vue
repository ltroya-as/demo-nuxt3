<template>
  <div class="event-city-page">
    <slot />
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

.container {
  max-width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.container::after,
.container::before,
.nav::after,
.nav::before,
.row::before,
.row::after {
  display: table;
  content: ' ';
}

.pull-left {
  float: left !important;
}

.container::after,
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
}

@media (min-width: 768px) {
  .container {
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
  .container {
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
  .container {
    width: 1170px;
  }
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

.container-title-no-feature-image {
  background-image: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689698079/assets/events/world-tour-2015/background_uybqa8.png');
}

.event-city-page {
  background: black;
}

.heading {
  background-image: url('https://www-old.benchmarkminerals.com/wp-content/uploads/2018/01/world-tour-2018-back.jpg');
  background-position: center center;
  background-color: #111;
  color: white;
  position: fixed;
  width: 100%;
  background-size: cover;
}

.heading h2,
.heading h3 {
  color: white;
}

.heading h2 span,
.heading h3 span {
  color: #fbba00;
}

.heading h2 span {
  font-weight: lighter;
  font-size: 18px;
}

.stats {
  background-color: #101010;
  min-height: 50px;
}

.citylist {
  padding: 0;
}

.citylist a {
  color: white;
  font-weight: bold;
  padding: 15px;
  width: 100%;
  background: #101010;
  display: block;
  margin-bottom: 5px;
}

.citylist a li {
  list-style: none;
  text-transform: uppercase;
}

.stats::after {
  bottom: -40px;
  border-color: #101010 transparent transparent;
}

.darksection {
  background-color: #101010;
}

.darksection .header h2 {
  color: #fbba00;
}

footer {
  display: none;
}

.heading.front.citystop {
  height: 380px;
}

.mainbody {
  position: relative;
  padding-top: 380px;
  margin-top: 10px;
}

.mainbody > .container {
  background: white;
}

.citystop h3 {
  margin-top: 10%;
}

.citystop .cityname {
  font-size: 30px;
  text-transform: uppercase;
}

.citystop .cityname span {
  color: #fbba00;
  font-size: 30px;
}

.stats h3 {
  color: white;
  font-size: 18px;
  margin-top: 40px;
  float: left;
}

.content {
  padding-bottom: 80px;
}

.citylist a p {
  padding-left: 20px;
  font-size: 12px;
  font-weight: lighter;
}

.citylist a li span {
  color: #fbba00;
}

.heading.front {
  height: 85%;
}

.header-title h1 {
  font-family: Montserrat, sans-serif;
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

@media only screen and (min-width: 644px) {
  .header-title h1 {
    font-size: 40px;
  }
}

@media only screen and (min-width: 644px) {
  .container-title-no-feature-image {
    height: 250px;
    padding-top: 30px;
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

@media only screen and (min-width: 990px) {
  .header-title {
    width: 80%;
    margin-left: 17%;
  }
}

.heading h3 {
  font-family: Raleway, sans-serif;
  font-weight: bold;
  max-width: 650px;
  margin: 15% auto 5px;
  text-transform: uppercase;
  line-height: 1;
}

.heading h2 {
  font-weight: bold;
  font-family: Merriweather, serif;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  padding: 0.5em;
  max-width: 675px;
  line-height: 1.3;
  margin: 0 auto;
  font-size: 35px;
}

.heading h3 img {
  margin: -20px 15px 0;
}

.heading p {
  margin: 5px auto;
  width: 650px;
  text-align: center;
}

.speaker {
  min-height: 155px;
  margin-bottom: 2em;
}

.speaker img {
  margin-right: 15px;
  border-radius: 100%;
  width: 90px;
  height: 90px;
}

.speaker h5 {
  color: white;
  font-family: Merriweather, serif;
  margin-bottom: 5px;
  font-weight: 300;
  font-size: 15px;
}

.speaker p {
  color: white;
  text-transform: uppercase;
  line-height: 1;
  font-size: 10px;
}
</style>
