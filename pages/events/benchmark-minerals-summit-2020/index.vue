<template>
  <div class="body">
    <div class="header">
      <div class="container-title container-title_feature-image">
        <div class="col-md-12">
          <div class="header-title">
            <h1 class="container-title-text">Benchmark Summit 2020</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="bt-container">
      <div class="cont">
        <div class="bt-container content">
          <div class="row">
            <div class="col-md-12">
              <span style="color: #f00">
                Due to the coronavirus / COVID-19 pandemic, the Benchmark Summit
                2020 in Washington DC will now take place online on Tuesday 20
                October 2020.&nbsp;</span
              >
              <h3>Tuesday 20 October 2020 – Online @ 1pm Washington DC</h3>
              <strong>Connecting industry and government.</strong>

              A online summit (for 2020 only) that brings together stakeholders
              in the lithium ion battery to electric vehicle and energy storage
              supply chains and US government representatives.
              <ul>
                <li
                  >The Benchmark Summit (in person) will return to Washington DC
                  in 2021 –
                  <a
                    href="https://www.benchmarkminerals.com/events/benchmarksummit2021/"
                    >apply here</a
                  >.</li
                >
              </ul>
              <h3>SESSION 1: The Keynotes @ 1pm EDT (Washington DC)</h3>
              <ul>
                <li>1:00pm Chair’s Opening Remark</li>
                <li
                  >1:10pm <strong>Senator Lisa Murkowski</strong> (R-Alaska),
                  Chairman, U.S. Senate Committee for Energy &amp; Natural
                  Resources</li
                >
                <li
                  >1:20pm <strong>Senator Joe Manchin</strong>&nbsp;(D-West
                  Virginia), Ranking Member, U.S. Senate Committee for Energy
                  &amp; Natural Resources</li
                >
                <li
                  >1:30pm <strong>State of the Industry</strong> – Simon Moores,
                  Managing Director, Benchmark</li
                >
                <li
                  >1:50pm <b>Witness Statement –</b> Vivas Kumar, Principal,
                  Benchmark</li
                >
                <li>2:10pm Finish</li>
              </ul>
              <h2
                ><a
                  href="https://us02web.zoom.us/webinar/register/WN_1Q1rD3Y_Q9KseISHmMkJfg"
                  >Join this session&nbsp;</a
                ></h2
              >
              <h3
                >SESSION 2: Building an EV supply chain in the USA @4pm EDT
                (Washington DC) (<a
                  href="https://us02web.zoom.us/webinar/register/WN_xr2xRCYyQtCISXmDnmzw6w"
                  >Join here</a
                >)</h3
              >
              <ul>
                <li
                  >4:00pm
                  <strong
                    >Chair’s Opening Remarks – Emily Hersh, Managing Partner,
                    DCDB&nbsp;</strong
                  ></li
                >
                <li
                  >4:15pm&nbsp;<strong
                    ><span style="color: #000"
                      >Securing America’s&nbsp;Future Energy</span
                    >&nbsp;</strong
                  >–&nbsp;Robbie Diamond,&nbsp;<span style="color: #000"
                    >Founder, President and CEO</span
                  ></li
                >
                <li
                  >4:30pm <strong>Urbix Resources</strong> – Nico Cuevas Gomez,
                  Executive Chairman &amp; Co-Founder</li
                >
                <li
                  >4.45pm&nbsp;<strong>Standard Lithium</strong> – Robert
                  Mintak, CEO &amp; Director</li
                >
                <li
                  >5pm<strong>&nbsp;Piedmont Lithium</strong> – Keith Phillips,
                  Managing Director</li
                >
                <li
                  >5:15pm&nbsp;<strong>ioneer</strong> – Bernard Rowe, Managing
                  Director</li
                >
                <li
                  >5.30pm&nbsp;<strong>American Lithium Corp</strong> – Michael
                  Kobler, CEO &amp; Director</li
                >
                <li
                  >5.45pm <b>American Battery Technology Company</b>&nbsp;–
                  David Batstone, Member, Board of Directors</li
                >
              </ul>
              <h2
                ><strong
                  ><a
                    href="https://us02web.zoom.us/webinar/register/WN_xr2xRCYyQtCISXmDnmzw6w"
                    >Join this session&nbsp;</a
                  ></strong
                ></h2
              >
              If you are interested in speaking, email Ben Ash on
              <a href="mailto:bash@benchmarkminerals.com"
                >bash@benchmarkminerals.com</a
              >
              or Will Plunkett
              <a href="mailto:wplunkett@benchmarkminerals.com"
                >wplunkett@benchmarkminerals.com</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const description =
      'Due to the coronavirus / COVID-19 pandemic, the Benchmark Summit 2020 in Washington DC will now take place online on Tuesday 20 October 2020.  Tuesday 20 October 2020 &#8211; Online @ 1pm Washington DC Connecting industry and government. A online summit (for 2020 only) that brings together stakeholders in the lithium ion battery to electric &hellip; Continue reading Benchmark Summit 2020 &rarr;'
    const image =
      'https://i0.wp.com/www.benchmarkminerals.com/wp-content/uploads/2019/05/summit.jpeg?fit=1600%2C1067&#038;ssl=1'
    const { getSeoInfo } = useSeo()
    const seo = getSeoInfo(
      {
        title: 'Benchmark Summit 2020 | Benchmark Mineral Intelligence',
      },
      {
        twitterDescription: description,
        opengraphDescription: description,
        twitterImage: image,
        opengraphImage: image,
      },
    )
    useHead(seo)
  },
}
</script>

<style scoped>
/* stylelint-disable selector-class-pattern */
.body {
  font-size: 14px;
  background-repeat: no-repeat;
  background-size: auto;
  padding: 0;
  border-top: 3px solid #ffbd03;
  line-height: 1.5em;
}

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

.container-title_feature-image {
  background-image: url('https://i0.wp.com/www.benchmarkminerals.com/wp-content/uploads/2019/05/summit.jpeg?fit=1600%2C1067&ssl=1');
}

.bt-container {
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

.content ul {
  list-style: none;
  padding-left: 14px;
  columns: 2;
}

.content li {
  font-size: 16px;
  padding-bottom: 10px;
  line-height: 1.5em;
}

.content ul li::before {
  color: #fabd02;
  content: '\25A0';
  font-size: 1em;
  padding-right: 15px;
  position: relative;
}

.content ul.no-column,
.content.no-column > li {
  columns: 1;
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
  .body {
    background-image: url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185117/assets/events/benchmark-minerals-summit-2020/bg-light-cropped_scogzp.png?_i=AA');
  }

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
  .body {
    background-image: url('https://res.cloudinary.com/benchmarkminerals/image/upload/f_auto,q_auto/v1658185117/assets/events/benchmark-minerals-summit-2020/bg-light-cropped_scogzp.png?_i=AA');
    background-position: top 150px right;
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

  .container-title_feature-image {
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
</style>
