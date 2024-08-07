<template>
  <div class="event-city-page">
    <slot />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
/* stylelint-disable */
@import url('https://fonts.googleapis.com/css?family=Merriweather:300,400|Raleway:300,400,700');
/* stylelint-enable */
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

.header-title h1 {
  color: #3a3533;
  font-weight: bold;
  line-height: 1.1;
  text-align: left;
  text-transform: uppercase;
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

.h1 .small,
.h1 small,
.h2 .small,
.h2 small,
.h3 .small,
.h3 small,
.h4 .small,
.h4 small,
.h5 .small,
.h5 small,
.h6 .small,
.h6 small,
h1 .small,
h1 small,
h2 .small,
h2 small,
h3 .small,
h3 small,
h4 .small,
h4 small,
h5 .small,
h5 small,
h6 .small,
h6 small {
  font-weight: 400;
  line-height: 1;
  color: #777;
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

  .col-md-2 {
    width: 16.6667%;
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

  .col-md-9 {
    width: 75%;
  }

  .col-md-10 {
    width: 83.3333%;
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

.event-city-page * {
  font-family: Raleway, sans-serif;
}

.heading.inner {
  height: 35%;
  background-image: url('https://www-old.benchmarkminerals.com/worldtour2017/img/innerpage-head-1.jpg');
  background-position: center bottom;
}

.heading {
  background-color: #00d9d3;
  color: white;
  position: fixed;
  width: 100%;
  background-size: cover;
}

.heading.inner h3 {
  margin: 10% 15px 5px;
}

.heading h3 {
  font-family: Raleway, sans-serif;
  font-weight: bold;
  max-width: 650px;
  text-transform: uppercase;
  line-height: 1;
}

.heading h3 img {
  margin: -20px 15px 0;
}

.heading h3 span {
  color: #222a32;
}

.heading.inner h2 {
  margin: 0 15px;
}

.heading h2 {
  font-family: Merriweather, serif;
  font-weight: 300;
  border-top: 2px solid white;
  border-bottom: 2px solid white;
  padding: 0.5em;
  max-width: 675px;
  line-height: 1.3;
  margin: 0 auto;
  font-size: 35px;
}

.heading h2 span {
  color: #222a32;
  font-weight: 400;
}

.mainbody.inner {
  top: 35%;
}

.mainbody {
  position: absolute;
  z-index: 2;
  top: 85%;
  width: 100%;
  background: white;
}

.mainbody .stats {
  position: relative;
  background-color: #222a32;
  min-height: 95px;
  width: 100%;
}

.mainbody.inner .stats .lastyear {
  position: absolute;
  top: -55px;
  left: 0;
  font-weight: bolder;
  text-transform: uppercase;
  font-family: Raleway, sans-serif;
}

.mainbody.inner .stats h3 {
  font-size: 30px;
  color: #00d9d3;
  font-family: Merriweather, serif;
  margin-bottom: 10px;
  margin-top: 20px;
}

.mainbody.inner .stats .lastyear .desc {
  color: #222a32;
  font-weight: normal;
}

.mainbody.inner .stats h3 .desc {
  font-size: 16px;
}

.stats h3 .desc {
  color: white;
  font-family: Raleway, sans-serif;
  font-weight: lighter;
  font-size: 20px;
}

.stats::after {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 25px 35px 0;
  border-color: #222a32 transparent transparent;
  content: ' ';
  position: relative;
  bottom: -40px;
  left: 50%;
}

.content {
  padding-top: 3em;
}

.speakerlist {
  background: #ededed;
  padding: 25px 5px;
}

.speakerlist .speaker {
  display: block;
  width: 100%;
  clear: both;
  min-height: 80px;
}

.speaker {
  margin-bottom: 2em;
  min-height: 130px;
}

.speakerlist .speaker img {
  max-width: 75px;
  max-height: 75px;
  margin-left: 5px;
  margin-right: 15px;
  border-radius: 100%;
  width: 90px;
  height: 90px;
}

.speakerlist .speaker h5 {
  font-size: 14px;
  margin-top: 20px;
  font-family: Merriweather, serif;
  margin-bottom: 5px;
  font-weight: 300;
}

.speaker p {
  text-transform: uppercase;
  line-height: 1;
  font-size: 10px;
}

p {
  margin-bottom: 10px;
}

hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
  height: 0;
  box-sizing: content-box;
}

#cd-google-map {
  position: relative;
  min-height: 100px;
}

@media only screen and (min-width: 768px) {
  #cd-google-map address {
    font-size: 0.9375rem;
    text-align: center;
  }
}

#cd-google-map address h4 {
  color: white;
}

#cd-google-map address {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 1em;
  background-color: #222a32;
  color: white;
  font-size: 18px;
}

address {
  margin-bottom: 20px;
  font-style: normal;
  line-height: 1.4286;
}
</style>
