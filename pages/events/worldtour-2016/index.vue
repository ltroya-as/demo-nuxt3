<template>
  <div>
    <section class="citynav">
      <div class="newcities">
        <ul class="citylist">
          <NuxtLink to="/events/worldtour-2016/london">
            <li>London</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2016/germany">
            <li>Germany</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2016/sydney">
            <li>Sydney</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2016/melbourne">
            <li>Melbourne</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2016/tokyo">
            <li>Tokyo</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2016/hongkong">
            <li>Hong Kong</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2016/silicon">
            <li>Silicon Valley</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2016/canada">
            <li>Vancouver</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2016/toronto">
            <li>Toronto</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2016/newyork">
            <li>New York</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2016/washington">
            <li>Washington D.C</li>
          </NuxtLink>
        </ul>
      </div>
    </section>
    <section class="world-tour-splash">
      <div class="container">
        <div class="row">
          <div class="col-md-3 col-md-offset-1 col-xs-12">
            <div class="worldtour2016head">
              <h1 style="text-transform: uppercase; line-height: 1">
                Benchmark<span> <br />World Tour 2016</span>
              </h1>
              <div class="row stats">
                <div class="col-md-8" style="color: #ddd">
                  <p style="padding-top: 2em">Total Attendees 2016:</p>
                </div>
                <div class="col-md-4" style="color: #ddd; padding-top: 2em">
                  <p id="running-total" class="bigstat">736</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-md-offset-2 col-xs-12">
            <div class="row stats">
              <div class="col-xs-12">
                <p style="padding-top: 2em">London 2016 Attendees:</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="london-upstream">20</span>%</p>
                <p class="statdesc">upstream</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="london-investors">67</span>%</p>
                <p class="statdesc">investors</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="london-downstream">13</span>%</p>
                <p class="statdesc">downstream</p>
              </div>

              <hr />
              <div class="col-xs-12">
                <p style="padding-top: 2em">Germany 2016 Attendees:</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="germany-upstream">38</span>%</p>
                <p class="statdesc">upstream</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="germany-investors">21</span>%</p>
                <p class="statdesc">investors</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="germany-downstream">41</span>%</p>
                <p class="statdesc">downstream</p>
              </div>

              <hr />
              <div class="col-xs-12">
                <p style="padding-top: 2em">Sydney 2016 Attendees:</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="sydney-upstream">24</span>%</p>
                <p class="statdesc">upstream</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="sydney-investors">64</span>%</p>
                <p class="statdesc">investors</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="sydney-downstream">12</span>%</p>
                <p class="statdesc">downstream</p>
              </div>

              <hr />
              <div class="col-xs-12">
                <p style="padding-top: 2em">Melbourne 2016 Attendees:</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="melbourne-upstream">38</span>%</p>
                <p class="statdesc">upstream</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="melbourne-investors">52</span>%</p>
                <p class="statdesc">investors</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"
                  ><span id="melbourne-downstream">10</span>%</p
                >
                <p class="statdesc">downstream</p>
              </div>
              <div class="col-xs-12">
                <p style="padding-top: 2em">Tokyo 2016 Attendees:</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="tokyo-upstream">8</span>%</p>
                <p class="statdesc">upstream</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="tokyo-investors">0</span>%</p>
                <p class="statdesc">investors</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="tokyo-downstream">92</span>%</p>
                <p class="statdesc">downstream</p>
              </div>
              <div class="col-xs-12">
                <p style="padding-top: 2em">Hong Kong 2016 Attendees:</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="hongkong-upstream">24</span>%</p>
                <p class="statdesc">upstream</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="hongkong-investors">76</span>%</p>
                <p class="statdesc">investors</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="hongkong-downstream">0</span>%</p>
                <p class="statdesc">downstream</p>
              </div>
              <div class="col-xs-12">
                <p style="padding-top: 2em">Silicon Valley 2016 Attendees:</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="svalley-upstream">36</span>%</p>
                <p class="statdesc">upstream</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="svalley-investors">8</span>%</p>
                <p class="statdesc">investors</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="svalley-downstream">56</span>%</p>
                <p class="statdesc">downstream</p>
              </div>

              <div class="col-xs-12">
                <p style="padding-top: 2em">Vancouver 2016 Attendees:</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="vancouver-upstream">33</span>%</p>
                <p class="statdesc">upstream</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="vancouver-investors">58</span>%</p>
                <p class="statdesc">investors</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="vancouver-downstream">9</span>%</p>
                <p class="statdesc">downstream</p>
              </div>
              <div class="col-xs-12">
                <p style="padding-top: 2em">Toronto 2016 Attendees:</p>
              </div>

              <div class="col-xs-4">
                <p class="bigstat"><span id="toronto-upstream">34</span>%</p>
                <p class="statdesc">upstream</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="toronto-investors">62</span>%</p>
                <p class="statdesc">investors</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="toronto-downstream">4</span>%</p>
                <p class="statdesc">downstream</p>
              </div>
              <div class="col-xs-12">
                <p style="padding-top: 2em">New York 2016 Attendees:</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="newyork-upstream">22</span>%</p>
                <p class="statdesc">upstream</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="newyork-investors">74</span>%</p>
                <p class="statdesc">investors</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="newyork-downstream">4</span>%</p>
                <p class="statdesc">downstream</p>
              </div>

              <div class="col-xs-12">
                <p style="padding-top: 2em">Washington 2016 Attendees:</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="washington-upstream">22</span>%</p>
                <p class="statdesc">upstream</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"><span id="washington-investors">9</span>%</p>
                <p class="statdesc">investors</p>
              </div>
              <div class="col-xs-4">
                <p class="bigstat"
                  ><span id="washington-downstream">69</span>%</p
                >
                <p class="statdesc">downstream</p>
              </div>

              <hr />

              <div class="col-xs-12">
                <p style="padding-top: 2em">World Tour 2015:</p>
              </div>
              <div class="col-xs-4">
                <p id="attendees" class="bigstat">477</p>
                <p class="statdesc">attendees</p>
              </div>
              <div class="col-xs-4">
                <p id="cities" class="bigstat">8</p>
                <p class="statdesc">cities</p>
              </div>
              <div class="col-xs-4">
                <p id="continents" class="bigstat">4</p>
                <p class="statdesc">continents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="row extramargin">
        <div class="col-md-8">
          <h4 style="text-transform: uppercase">Sponsors</h4>
          <hr />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702187/assets/events/world-tour-2016/Sponsors/Advantage-Lithium_mtz6tp.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702186/assets/events/world-tour-2016/Sponsors/alabama-graphite_f9rz09.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702186/assets/events/world-tour-2016/Sponsors/nano-one_h0cazx.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689699832/assets/events/world-tour-2015/Sponsors/blackrock_f3sbgq.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689698299/assets/events/world-tour-2015/Sponsors/northern-graphite_se63vh.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702187/assets/events/world-tour-2016/Sponsors/nevada-gold_zitghq.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702186/assets/events/world-tour-2016/Sponsors/critical-elements_fbwsq7.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702185/assets/events/world-tour-2016/Sponsors/fortune-minerals_ylgykz.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702186/assets/events/world-tour-2016/Sponsors/pure-energy-minerals_w9mrwp.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702187/assets/events/world-tour-2016/Sponsors/pilbara_ytaq37.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696450/assets/events/world-tour-2015/Sponsors/syrah-resources_qqtorm.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702186/assets/events/world-tour-2016/Sponsors/orocobre_skzkdp.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702184/assets/events/world-tour-2016/Sponsors/lithium-x_gkthmq.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696450/assets/events/world-tour-2015/Sponsors/nemaska-lithium_aktk0l.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696450/assets/events/world-tour-2015/Sponsors/neometals_j0aybr.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689708917/assets/events/world-tour-2016/Sponsors/talga_djbicl.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702187/assets/events/world-tour-2016/Sponsors/ontario-graphite_xlmig7.jpg"
            alt="sponsors"
            style="margin: 10px"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696450/assets/events/world-tour-2015/Sponsors/avalon_gwup6r.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702187/assets/events/world-tour-2016/Sponsors/dakota-minerals_inlge9.jpg"
            alt="sponsors"
          />
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702185/assets/events/world-tour-2016/Sponsors/european-metals_dp8aph.jpg"
            alt="sponsors"
          />
        </div>
        <div class="col-md-4">
          <h4 style="text-transform: uppercase">Hosts</h4>
          <hr />

          <div style="text-align: center">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702186/assets/events/world-tour-2016/Sponsors/ubslogo_zokg3d.png"
              class="img-responsive"
              alt="host"
            />
            <p
              ><NuxtLink to="/events/worldtour-2016/london" style="color: #333"
                >LONDON</NuxtLink
              >
              |
              <NuxtLink to="/events/worldtour-2016/sydney" style="color: #333"
                >SYDNEY</NuxtLink
              >
              |
              <NuxtLink
                to="/events/worldtour-2016/melbourne"
                style="color: #333"
                >MELBOURNE</NuxtLink
              >
            </p>
          </div>
          <div style="text-align: center">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702186/assets/events/world-tour-2016/Sponsors/hitech-logo_ayrvja.jpg"
              alt="host"
              class="img-responsive"
              style="width: 150px"
            />
            <p
              ><NuxtLink to="/events/worldtour-2016/germany" style="color: #333"
                >GERMANY</NuxtLink
              ></p
            >
          </div>
          <div class="" style="text-align: center">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702187/assets/events/world-tour-2016/Sponsors/dundee-capital_hh4rqc.jpg"
              alt="host"
              class="img-responsive"
              style="width: 150px"
            />
            <p
              ><NuxtLink to="/events/worldtour-2016/toronto" style="color: #333"
                >TORONTO</NuxtLink
              ></p
            >
          </div>
        </div>
      </div>
      <div class="row extramargin">
        <hr />
        <div class="col-md-8">
          <h1 style="text-transform: uppercase">
            Benchmark
            <span class="world-tour-span">| World Tour 2016</span><br />
            <small style="font-size: 0.6em"
              >Lithium-ion Battery Supply Chain | Investment Seminars<br />
              September-October 2016</small
            ></h1
          >
          <hr />
          <h3
            >BRINGING LEADING SUPPLY CHAIN EXPERTISE TO YOUR DOORSTEP FOR
            FREE</h3
          >
          <p> KEY QUESTIONS THE SEMINARS WILL ANSWER </p
          ><ul>
            <li
              >Lithium-ion megafactories: what volumes will be coming
              on-stream</li
            >
            <li
              >Full EVs: impact of Tesla’s Model III &amp; Chevrolet's Volt
            </li>
            <li>Utility / Stationary storage: When is the tipping point?</li>
            <li>Lithium supply: brines versus hard rock</li>
            <li>Graphite supply: natural versus synthetic</li>
            <li
              >Cobalt: Nickel and Copper cuts, how will supply be impacted?</li
            >
          </ul>
          <p></p>
          <hr />
          <h4 style="line-height: 2" class="extramargin"
            >Join us for the Benchmark | World Tour 2016 and hear from our
            independent analysts on the future for our industry.
          </h4>

          <p class="bigtext"
            >The Benchmark World Tour will return after an extremely successful
            2015 which saw us present in front of over 477 delegates and
            privately to &gt;60 institutional investors in 10 cities.
          </p>

          <p class="bigtext"
            >The free, half-day investment seminars focus on the emerging
            lithium-ion battery supply chain and what this means for raw
            material demand of lithium, graphite and cobalt. Hear from
            independent experts on key subjects throughout the supply chain.
          </p>

          <p class="bigtext"
            >Such was the demand, we have expanded the 2016 Tour to 10 cities to
            include Germany (TBA) and Washington DC on our official list of host
            venues. Demand is high and limited. Sign up by clicking on the
            relevant city.</p
          >
          <div id="piechart_3d" style="width: 100%; min-height: 500px"
            ><div style="position: relative"
              ><div
                dir="ltr"
                style="position: relative; width: 750px; height: 500px"
                ><div
                  aria-label="A chart."
                  style="
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                  "
                  ><svg
                    width="750"
                    height="500"
                    aria-label="A chart."
                    style="overflow: hidden"
                  >
                    <defs id="_ABSTRACT_RENDERER_ID_0"></defs>
                    <rect
                      x="0"
                      y="0"
                      width="750"
                      height="500"
                      stroke="none"
                      stroke-width="0"
                      fill="#ffffff"
                    ></rect>
                    <g>
                      <text
                        text-anchor="start"
                        x="143"
                        y="70.9"
                        font-family="Arial"
                        font-size="14"
                        font-weight="bold"
                        stroke="none"
                        stroke-width="0"
                        fill="#000000"
                      >
                        World Tour 2015 Attendance Breakdown
                      </text>
                      <rect
                        x="143"
                        y="59"
                        width="464"
                        height="14"
                        stroke="none"
                        stroke-width="0"
                        fill-opacity="0"
                        fill="#ffffff"
                      ></rect>
                    </g>
                    <g>
                      <rect
                        x="453"
                        y="96"
                        width="154"
                        height="222"
                        stroke="none"
                        stroke-width="0"
                        fill-opacity="0"
                        fill="#ffffff"
                      ></rect>
                      <g
                        column-id="Upstream: Incl. exploration stage, producers, and traders"
                      >
                        <rect
                          x="453"
                          y="96"
                          width="154"
                          height="68"
                          stroke="none"
                          stroke-width="0"
                          fill-opacity="0"
                          fill="#ffffff"
                        ></rect>
                        <g>
                          <text
                            text-anchor="start"
                            x="472"
                            y="107.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            Upstream: Incl.
                          </text>
                          <text
                            text-anchor="start"
                            x="472"
                            y="125.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            exploration stage,
                          </text>
                          <text
                            text-anchor="start"
                            x="472"
                            y="143.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            producers, and
                          </text>
                          <text
                            text-anchor="start"
                            x="472"
                            y="161.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            traders
                          </text>
                        </g>
                        <circle
                          cx="460"
                          cy="103"
                          r="7"
                          stroke="none"
                          stroke-width="0"
                          fill="#222222"
                        ></circle>
                      </g>
                      <g
                        column-id="Downstream: Incl.  buyers, government organisations, associations and journalists"
                      >
                        <rect
                          x="453"
                          y="173"
                          width="154"
                          height="86"
                          stroke="none"
                          stroke-width="0"
                          fill-opacity="0"
                          fill="#ffffff"
                        ></rect>
                        <g>
                          <text
                            text-anchor="start"
                            x="472"
                            y="184.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            Downstream: Incl.
                          </text>
                          <text
                            text-anchor="start"
                            x="472"
                            y="202.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            buyers, government
                          </text>
                          <text
                            text-anchor="start"
                            x="472"
                            y="220.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            organisations,
                          </text>
                          <text
                            text-anchor="start"
                            x="472"
                            y="238.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            associations and
                          </text>
                          <text
                            text-anchor="start"
                            x="472"
                            y="256.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            journalists
                          </text>
                        </g>
                        <circle
                          cx="460"
                          cy="180"
                          r="7"
                          stroke="none"
                          stroke-width="0"
                          fill="#fbba00"
                        ></circle>
                      </g>
                      <g
                        column-id="Investors: Incl. institutional, retail, analysts and brokers"
                      >
                        <rect
                          x="453"
                          y="268"
                          width="154"
                          height="50"
                          stroke="none"
                          stroke-width="0"
                          fill-opacity="0"
                          fill="#ffffff"
                        ></rect>
                        <g>
                          <text
                            text-anchor="start"
                            x="472"
                            y="279.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            Investors: Incl.
                          </text>
                          <text
                            text-anchor="start"
                            x="472"
                            y="297.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            institutional, retail,
                          </text>
                          <text
                            text-anchor="start"
                            x="472"
                            y="315.9"
                            font-family="Arial"
                            font-size="14"
                            stroke="none"
                            stroke-width="0"
                            fill="#222222"
                          >
                            analysts and brokers
                          </text>
                        </g>
                        <circle
                          cx="460"
                          cy="275"
                          r="7"
                          stroke="none"
                          stroke-width="0"
                          fill="#666666"
                        ></circle>
                      </g>
                    </g>
                    <g>
                      <path
                        d="M430,236.7L430,265.3A143,114.4,0,0,1,398.04291236868005,337.3820493057477L398.04291236868005,308.7820493057477A143,114.4,0,0,0,430,236.7"
                        stroke="#1a1a1a"
                        stroke-width="1"
                        fill="#1a1a1a"
                      ></path>
                      <path
                        d="M287,236.7L287,265.3L398.04291236868005,337.3820493057477L398.04291236868005,308.7820493057477"
                        stroke="#1a1a1a"
                        stroke-width="1"
                        fill="#1a1a1a"
                      ></path>
                      <path
                        d="M287,236.7L287,122.29999999999998A143,114.4,0,0,1,398.04291236868005,308.7820493057477L287,236.7A0,0,0,0,0,287,236.7"
                        stroke="#222222"
                        stroke-width="1"
                        fill="#222222"
                      ></path>
                      <text
                        text-anchor="start"
                        x="363.66719320563885"
                        y="205.76009013153904"
                        font-family="Arial"
                        font-size="14"
                        stroke="none"
                        stroke-width="0"
                        fill="#ffffff"
                      >
                        35.8%
                      </text>
                    </g>
                    <g>
                      <path
                        d="M158.7211740790586,287.2555872779724L158.7211740790586,315.8555872779724A143,114.4,0,0,1,144,265.3L144,236.7A143,114.4,0,0,0,158.7211740790586,287.2555872779724"
                        stroke="#4d4d4d"
                        stroke-width="1"
                        fill="#4d4d4d"
                      ></path>
                      <path
                        d="M287,236.7L287,265.3L158.7211740790586,315.8555872779724L158.7211740790586,287.2555872779724"
                        stroke="#4d4d4d"
                        stroke-width="1"
                        fill="#4d4d4d"
                      ></path>
                      <path
                        d="M287,236.7L158.7211740790586,287.2555872779724A143,114.4,0,0,1,287,122.29999999999998L287,236.7A0,0,0,0,0,287,236.7"
                        stroke="#666666"
                        stroke-width="1"
                        fill="#666666"
                      ></path>
                      <text
                        text-anchor="start"
                        x="175.94842198417442"
                        y="197.5131151922889"
                        font-family="Arial"
                        font-size="14"
                        stroke="none"
                        stroke-width="0"
                        fill="#ffffff"
                      >
                        32.3%
                      </text>
                    </g>
                    <g>
                      <path
                        d="M398.04291236868005,308.7820493057477L398.04291236868005,337.3820493057477A143,114.4,0,0,1,158.72117407905864,315.85558727797246L158.72117407905864,287.25558727797244A143,114.4,0,0,0,398.04291236868005,308.7820493057477"
                        stroke="#bc8c00"
                        stroke-width="1"
                        fill="#bc8c00"
                      ></path>
                      <path
                        d="M287,236.7L398.04291236868005,308.7820493057477A143,114.4,0,0,1,158.72117407905864,287.25558727797244L287,236.7A0,0,0,0,0,287,236.7"
                        stroke="#fbba00"
                        stroke-width="1"
                        fill="#fbba00"
                      ></path>
                      <text
                        text-anchor="start"
                        x="253.9900632539128"
                        y="331.6572468092064"
                        font-family="Arial"
                        font-size="14"
                        stroke="none"
                        stroke-width="0"
                        fill="#ffffff"
                      >
                        31.9%
                      </text>
                    </g>
                    <g></g>
                  </svg>
                </div>
              </div>
              <div></div></div
          ></div>
        </div>
        <div class="col-md-4">
          <div style="background: #303030; color: white; padding: 20px">
            <h3 style="color: white">CALL FOR SPONSORS:</h3>
            <p
              >There are opportunities for a limited number companies to speak
              and sponsor the event.
            </p>

            <p>Contact us today: </p>
            <p
              ><b>Simon Moores - Managing Director</b><br />
              smoores@benchmarkminerals.com <br />
              +44 20 3287 3399</p
            >
          </div>
        </div>
      </div>
    </div>
    <div class="jumbotron">
      <div class="container" style="text-align: center">
        <h1
          >Tour
          <span style="font-weight: 200; text-align: center"
            >| Dates &amp; Locations</span
          ></h1
        >
        <div class="row">
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2016/london">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/london-small_t8apj4.jpg"
                alt="city"
              />
            </NuxtLink>
            <h3 class="cityhead"
              >LONDON <span class="jumbotron-city-description">| England</span
              ><br /><small style="color: #333">6 June 2016</small></h3
            >
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2016/germany">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702186/assets/events/world-tour-2016/Cities/hamburg_gr7ldr.jpg"
                alt="city"
              />
            </NuxtLink>
            <h3 class="cityhead"
              >DRESDEN <span class="jumbotron-city-description">| Germany</span
              ><br /><small style="color: #333">9 &amp; 10 June 2016</small></h3
            >
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2016/newyork">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/newyork-small_ylehyi.jpg"
                alt="city"
              />
            </NuxtLink>
            <h3 class="cityhead"
              >NEW YORK <span class="jumbotron-city-description">| US</span
              ><br /><small style="color: #333">19 October 2016</small></h3
            >
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2016/washington">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702185/assets/events/world-tour-2016/Cities/washington-small_jgelzb.jpg"
                alt="city"
              />
            </NuxtLink>
            <h3 class="cityhead"
              >WASHINGTON <span class="jumbotron-city-description">| US</span
              ><br /><small style="color: #333">21 October 2016</small></h3
            >
          </div>
        </div>

        <div class="row">
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2016/toronto">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/toronto-small_rlbpn3.jpg"
                alt="city"
              />
            </NuxtLink>
            <h3 class="cityhead"
              >TORONTO <span class="jumbotron-city-description">| Canada</span
              ><br /><small style="color: #333">17 October 2016</small></h3
            >
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2016/canada">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/vancouver-small_auqi88.jpg"
                alt="city"
              />
            </NuxtLink>
            <h3 class="cityhead"
              >VANCOUVER <span class="jumbotron-city-description">| Canada</span
              ><br /><small style="color: #333">13 October 2016</small></h3
            >
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2016/tokyo">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696308/assets/events/world-tour-2015/Smallcities/tokyo-small_oq2qdo.jpg"
                alt="city"
              />
            </NuxtLink>
            <h3 class="cityhead"
              >TOKYO <span class="jumbotron-city-description">| Japan</span
              ><br /><small style="color: #333">15 September 2016</small></h3
            >
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2016/hongkong">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/hongkong-small_iziqj5.jpg"
                alt="city"
              />
            </NuxtLink>
            <h3 class="cityhead"
              >HONG KONG <span class="jumbotron-city-description">| China</span
              ><br /><small style="color: #333">23 September 2016</small></h3
            >
          </div>
        </div>
        <div class="row">
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2016/sydney">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/sydney-small_pzrasc.jpg"
                alt="city"
              />
            </NuxtLink>
            <h3 class="cityhead"
              >SYDNEY <span class="jumbotron-city-description">| Australia</span
              ><br /><small style="color: #333">6 September 2016</small></h3
            >
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2016/melbourne">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/melbourne-small_wdwyyn.jpg"
                alt="city"
              />
            </NuxtLink>
            <h3 class="cityhead"
              >MELBOURNE
              <span class="jumbotron-city-description">| AUSTRALIA</span
              ><br /><small style="color: #333"> 8 September 2016</small></h3
            >
          </div>
        </div> </div
      ><!-- /.container -->
    </div>
    <div class="whitejumbo container" style="text-align: center">
      <h1>Guest <span>| Speakers</span></h1>
      <div class="row">
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702185/assets/events/world-tour-2016/Speakers/simon-moores_z0t95b.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            >SIMON
            <span>
              MOORES <br />
              BENCHMARK</span
            ></h3
          >
        </div>
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702182/assets/events/world-tour-2016/Speakers/andrew-miller_pg4yrf.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            >ANDY
            <span>
              MILLER <br />
              BENCHMARK</span
            ></h3
          >
        </div>
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702182/assets/events/world-tour-2016/Speakers/patrick-hummel_o99zoj.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            ><span
              >PATRICK HUMMEL, HEAD OF AUTO RESEARCH <br />
              UBS<br />
              <NuxtLink to="/events/worldtour-2016/london"
                >London</NuxtLink
              ></span
            ></h3
          >
        </div>
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702184/assets/events/world-tour-2016/Speakers/d.paskert_vjkc1i.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            ><span
              >DIERK PASKERT <br />
              Hi Tech Materials<br />
              <NuxtLink to="/events/worldtour-2016/germany"
                >Germany</NuxtLink
              ></span
            ></h3
          >
        </div>
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702184/assets/events/world-tour-2016/Speakers/joe-lowry_mclkgw.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            ><span
              >JOE LOWRY, PRESIDENT <br />
              Global Lithium LLC<br />
              <NuxtLink to="/events/worldtour-2016/silicon"
                >Silicon Valley</NuxtLink
              ></span
            ></h3
          >
        </div>
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702182/assets/events/world-tour-2016/Speakers/e.loois_g3e7ig.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            ><span
              >ELBERT LOOIS <br />
              Hi Tech Materials<br />
              <NuxtLink to="/events/worldtour-2016/germany"
                >Germany</NuxtLink
              ></span
            ></h3
          >
        </div>
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702182/assets/events/world-tour-2016/Speakers/chris-b_jqidan.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            ><span
              >CHRIS BERRY <br />
              House Mountain Partners LLC<br />
              <NuxtLink to="/events/worldtour-2016/newyork"
                >New York</NuxtLink
              ></span
            ></h3
          >
        </div>
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702185/assets/events/world-tour-2016/Speakers/rick-chamberlain_pexuwf.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            ><span
              >RICK CHAMBERLAIN, CTO <br />
              Boston Power Inc<br />
              <NuxtLink to="/events/worldtour-2016/washington"
                >Washington</NuxtLink
              >
              |
              <NuxtLink to="/events/worldtour-2016/newyork">New York</NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2016/toronto">Toronto</NuxtLink>
            </span></h3
          >
        </div>
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702183/assets/events/world-tour-2016/Speakers/cornelius-pieper_atgvbe.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            ><span
              >DR. CORNELIUS PIEPER, MD <br />
              The Boston Consulting Group<br />
              <NuxtLink to="/events/worldtour-2016/london"
                >London</NuxtLink
              ></span
            ></h3
          >
        </div>
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689709677/assets/events/world-tour-2016/Speakers/dan-mcgroarty_l7qzze.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            ><span
              >DAN MCGROARTY, PRINCIPAL <br />
              Carmot Strategic Group &amp; President, American Resources Policy
              Network<br />
              <NuxtLink to="/events/worldtour-2016/washington"
                >Washington D.C</NuxtLink
              ></span
            ></h3
          >
        </div>
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702182/assets/events/world-tour-2016/Speakers/sam-jaffe_gtnvpm.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            ><span
              >SAM JAFFE, MD <br />
              Cairn Energy Research Associates<br />
              <NuxtLink to="/events/worldtour-2016/washington"
                >Washington D.C</NuxtLink
              ></span
            ></h3
          >
        </div>
        <div class="col-md-4">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702182/assets/events/world-tour-2016/Speakers/amnesty-international_pk0nid.jpg"
            alt="Speakers"
          />
          <h3 class="cityhead"
            ><span
              >JOSHUA ROSENZWEIG, BUSINESS &amp; HUMAN RIGHTS STRATEGY ADVISOR
              <br />
              Amnesty International<br />
              <NuxtLink to="/events/worldtour-2016/hongkong"
                >Hong Kong</NuxtLink
              ></span
            ></h3
          >
        </div>
      </div>
    </div>
    <div class="jumbotron" style="margin-bottom: 0">
      <div class="container" style="text-align: center">
        <h1>Public Company <span>| Speakers</span></h1>
        <div class="row">
          <div class="col-md-4" style="text-align: center">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702183/assets/events/world-tour-2016/Speakers/warren-stayner_iag1pm.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >WARREN STANYER, CEO <br />
                Nevada Sunrise Gold Corporation<br />
                <NuxtLink to="/events/worldtour-2016/canada"
                  >Vancouver</NuxtLink
                >
              </span></h3
            >
          </div>

          <div class="col-md-4" style="text-align: center">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702184/assets/events/world-tour-2016/Speakers/greg-bowes_jztweu.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >GREG BOWES, CEO <br />
                Northern Graphite<br />
                <NuxtLink to="/events/worldtour-2016/toronto">Toronto</NuxtLink>
              </span></h3
            >
          </div>

          <div class="col-md-4" style="text-align: center">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702184/assets/events/world-tour-2016/Speakers/robin-goad_ijqkip.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >ROBIN GOAD, CEO <br />
                Fortune Minerals Ltd<br />
                <NuxtLink to="/events/worldtour-2016/canada"
                  >Vancouver</NuxtLink
                >
              </span></h3
            >
          </div>
          <div class="col-md-4" style="text-align: center">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702184/assets/events/world-tour-2016/Speakers/donald-baxter_wea2mv.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >DONALD BAXTER, CEO <br />
                Alabama Graphite Corp<br />
                <NuxtLink to="/events/worldtour-2016/washington"
                  >Washington</NuxtLink
                >
                |
                <NuxtLink to="/events/worldtour-2016/newyork"
                  >New York</NuxtLink
                ></span
              ></h3
            >
          </div>
          <div class="col-md-4" style="text-align: center">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702184/assets/events/world-tour-2016/Speakers/mike-tamlin_fztmcv.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >MIKE TAMLIN, COO <br />
                Neometals<br />
                <NuxtLink to="/events/worldtour-2016/tokyo">Tokyo</NuxtLink> |
                <NuxtLink to="/events/worldtour-2016/silicon"
                  >Silicon Valley</NuxtLink
                ></span
              ></h3
            >
          </div>

          <div class="col-md-4" style="text-align: center">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702183/assets/events/world-tour-2016/Speakers/jfmeilleur_edtpqf.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >JEAN - FRANCOIS MEILLEUR, VP<br />
                Critical Elements<br />
                <NuxtLink to="/events/worldtour-2016/sydney">Sydney</NuxtLink> |
                <NuxtLink to="/events/worldtour-2016/melbourne"
                  >Melbourne</NuxtLink
                >
                |
                <NuxtLink to="/events/worldtour-2016/hongkong"
                  >Hong Kong</NuxtLink
                >
              </span></h3
            >
          </div>

          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702185/assets/events/world-tour-2016/Speakers/tanaka_wa6qkf.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >YOSHIAKI TANAKA, SENIOR ASSOCIATE<br />
                Yano Research<br />
                <NuxtLink to="/events/worldtour-2016/tokyo">Tokyo</NuxtLink>
              </span></h3
            >
          </div>

          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702183/assets/events/world-tour-2016/Speakers/dan-blondal_fbxjj7.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >DAN BLONDAL, CEO<br />
                Nano One Materials<br />
                <NuxtLink to="/events/worldtour-2016/canada"
                  >Vancouver</NuxtLink
                >
                |
                <NuxtLink to="/events/worldtour-2016/silicon"
                  >Silicon Valley</NuxtLink
                >
                |
                <NuxtLink to="/events/worldtour-2016/newyork"
                  >New York</NuxtLink
                ></span
              ></h3
            >
          </div>

          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702184/assets/events/world-tour-2016/Speakers/e-niedermeyer_e9rywv.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >EDWARD NIEDERMEYER,<br />
                FREELANCE AUTO ANALYIST<br />
                <NuxtLink to="/events/worldtour-2016/canada"
                  >Vancouver</NuxtLink
                ></span
              ></h3
            >
          </div>

          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702182/assets/events/world-tour-2016/Speakers/tambanis_kbkzkn.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >STEVE TAMBANIS, MD <br />
                Black Rock Mining<br />
                <NuxtLink to="/events/worldtour-2016/london">London</NuxtLink> |
                <NuxtLink to="/events/worldtour-2016/germany">Germany</NuxtLink>
                |
                <NuxtLink to="/events/worldtour-2016/sydney">Sydney</NuxtLink> |
                <NuxtLink to="/events/worldtour-2016/melbourne"
                  >Melbourne</NuxtLink
                >
                | <NuxtLink to="/events/worldtour-2016/tokyo">Tokyo</NuxtLink> |
                <NuxtLink to="/events/worldtour-2016/newyork"
                  >New York</NuxtLink
                ></span
              ></h3
            >
          </div>

          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702184/assets/events/world-tour-2016/Speakers/ken-brinsden_eczryk.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >KEN BRINSDEN, CEO &amp; MANAGING DIRECTOR <br />
                Pilbara Minerals<br />
                <NuxtLink to="/events/worldtour-2016/melbourne"
                  >Melbourne</NuxtLink
                >
                |
                <NuxtLink to="/events/worldtour-2016/sydney"
                  >Sydney</NuxtLink
                ></span
              ></h3
            >
          </div>

          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702183/assets/events/world-tour-2016/Speakers/tolga_dpriqf.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >TOLGA KUMOVA, MANAGING DIRECTOR <br />
                Syrah Resources<br />
                <NuxtLink to="/events/worldtour-2016/melbourne"
                  >Melbourne</NuxtLink
                >
                |
                <NuxtLink to="/events/worldtour-2016/sydney"
                  >Sydney</NuxtLink
                ></span
              ></h3
            >
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702184/assets/events/world-tour-2016/Speakers/speaker-placeholder_zn399x.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >DAVID HALL, COMMERCIAL MANAGER <br />
                Orocobre<br />
                <NuxtLink to="/events/worldtour-2016/melbourne"
                  >Melbourne</NuxtLink
                >
                |
                <NuxtLink to="/events/worldtour-2016/sydney"
                  >Sydney</NuxtLink
                ></span
              ></h3
            >
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702182/assets/events/world-tour-2016/Speakers/brian-paes-braga_grktds.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >BRIAN PAES BRAGA, CEO <br />
                Lithium X<br />
                <NuxtLink to="/events/worldtour-2016/london">London</NuxtLink> |
                <NuxtLink to="/events/worldtour-2016/germany">Germany</NuxtLink>
                |
                <NuxtLink to="/events/worldtour-2016/silicon"
                  >Silicon Valley</NuxtLink
                ></span
              ></h3
            >
          </div>

          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702182/assets/events/world-tour-2016/Speakers/chris-reed_t4ztu1.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >CHRIS REED, MD <br />
                Neometals<br />
                <NuxtLink to="/events/worldtour-2016/london">London</NuxtLink> |
                <NuxtLink to="/events/worldtour-2016/germany"
                  >Germany</NuxtLink
                ></span
              ></h3
            >
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702185/assets/events/world-tour-2016/Speakers/speaker-guy_a96rpk.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >GUY BOURASSA, PRESIDENT <br />
                Nemaska Lithium Inc<br />
                <NuxtLink to="/events/worldtour-2016/sydney">Sydney</NuxtLink> |
                <NuxtLink to="/events/worldtour-2016/melbourne"
                  >Melbourne</NuxtLink
                >
              </span></h3
            >
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702182/assets/events/world-tour-2016/Speakers/mark-thomson_tk1gud.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >MARK THOMPSON, MD <br />
                Talga Resources<br />
                <NuxtLink to="/events/worldtour-2016/germany">Germany</NuxtLink>
                |
                <NuxtLink to="/events/worldtour-2016/london">London</NuxtLink>
              </span></h3
            >
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702183/assets/events/world-tour-2016/Speakers/tom-burkett_rxzkqr.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >TOM BURKETT, CEO <br />
                Ontario Graphite Ltd<br />
                <NuxtLink to="/events/worldtour-2016/germany">Germany</NuxtLink>
                |
                <NuxtLink to="/events/worldtour-2016/london">London</NuxtLink>
              </span></h3
            >
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702183/assets/events/world-tour-2016/Speakers/tolga_dpriqf.jpg"
              alt="Speakers"
            />
            <h3 class="cityhead"
              ><span
                >TOLGA KUMOVA, MD <br />
                Syrah Resources<br />
                <NuxtLink to="/events/worldtour-2016/washington"
                  >Washington</NuxtLink
                >
                |
                <NuxtLink to="/events/worldtour-2016/newyork"
                  >New York</NuxtLink
                >
              </span></h3
            >
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702185/assets/events/world-tour-2016/Speakers/don-bubar_diigfw.jpg"
            />
            <h3 class="cityhead"
              ><span
                >DON BUBAR, CEO <br />
                Avalon Advanced Materials Inc<br />
                <NuxtLink to="/events/worldtour-2016/london">London</NuxtLink> |
                <NuxtLink to="/events/worldtour-2016/newyork"
                  >New York</NuxtLink
                >
                |
                <NuxtLink to="/events/worldtour-2016/toronto">Toronto</NuxtLink>
              </span></h3
            >
          </div>
        </div>
      </div>
    </div>
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
h4,
h3,
h5,
h6 {
  color: #3a3533;
  line-height: 1.3;
  text-transform: uppercase;
  font-weight: 500;
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
  font-size: 1.2em;
}

h1 small,
h2 small,
h3 small,
h4 small,
h5 small,
h6 small,
.h1 small,
.h2 small,
.h3 small,
.h4 small,
.h5 small,
.h6 small,
h1 .small,
h2 .small,
h3 .small,
h4 .small,
h5 .small,
h6 .small,
.h1 .small,
.h2 .small,
.h3 .small,
.h4 .small,
.h5 .small,
.h6 .small {
  font-weight: normal;
  line-height: 1;
  color: #aaa;
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

.col-xs-4,
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

.col-xs-12 {
  width: 100%;
}

.col-xs-4 {
  width: 33.3333%;
}

li {
  list-style: disc;
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

  .jumbotron {
    padding: 48px 0;
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

  .col-md-offset-1 {
    margin-left: 8.3333%;
  }

  .col-xs-4,
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

.heading.front {
  height: 85%;
}

.heading h3 {
  color: #fff;
  font-family: Raleway, sans-serif;
  font-weight: bold;
  max-width: 650px;
  margin: 25% auto 5px;
  text-transform: uppercase;
  line-height: 1;
}

.heading h3 img {
  margin: -20px 15px 0;
}

.heading h3 span {
  color: #222a32;
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
  color: #fff;
}

.heading h2 span {
  color: #222a32;
  font-weight: 400;
}

.heading p {
  color: #fff;
  margin: 5px auto;
  width: 650px;
  text-align: center;
}

.heading h4 {
  font-family: Merriweather, serif;
  font-size: 20px;
  margin-top: 30px;
}

.heading h4 span {
  font-weight: 400;
}

.heading h4 small {
  text-align: center;
  color: #222a35;
  font-size: 20px;
  display: block;
  font-weight: 300;
  margin-top: 15px;
}

@media (max-width: 970px) {
  .heading {
    max-width: 100%;
  }
}

.mainbody {
  position: absolute;
  z-index: 2;
  top: 85%;
  width: 100%;
  background: white;
}

.stats {
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 20px;
  margin-top: 20px;
}

.stats h3 {
  color: #00d9d3;
  font-family: Merriweather, serif;
  font-size: 36px;
}

.stats h3 .desc {
  color: white;
  font-family: Raleway, sans-serif;
  font-weight: lighter;
  font-size: 20px;
}

.content {
  padding-top: 3em;
}

a {
  color: #337ab7;
  text-decoration: none;
}

.citylist a .cityitem {
  background: #ededed;
  padding: 5px 10px;
  margin-top: 2px;
}

.citylist a .cityitem h4 {
  text-transform: uppercase;
  color: #00d9d3;
  margin-bottom: 2px;
  font-size: 16px;
  font-weight: bold;
}

.citylist a .cityitem p {
  text-transform: uppercase;
  color: #222a32;
  font-size: 14px;
}

.citylist a .cityitem:hover {
  background: #222a32;
  text-decoration: none;
}

.citylist a .cityitem:hover p {
  color: white;
}

.h4,
.h5,
.h6,
h4,
h5,
h6 {
  margin-top: 10px;
  margin-bottom: 10px;
}

p {
  margin: 0 0 10px;
}

.darksection {
  background: #222a32;
  color: white;
  padding: 6em 0;
  margin-top: 1em;
}

.darksection .header h2 {
  color: #00d9d3;
  font-family: Merriweather, serif;
  font-weight: 300;
  font-size: 34px;
  margin: 1em 0;
}

.speaker {
  margin-bottom: 2em;
  min-height: 130px;
}

.speaker img {
  margin-right: 15px;
  border-radius: 100%;
  width: 90px;
  height: 90px;
}

.speaker h5 {
  color: #fff;
  font-family: Merriweather, serif;
  margin-bottom: 5px;
  font-weight: 300;
  font-size: 15px;
}

.speaker p {
  text-transform: uppercase;
  line-height: 1;
  font-size: 10px;
}

.citynav {
  background: #555;
}

.newcities {
  background: #333;
  width: 100%;
  font-weight: bold;
  font-family: Montserrat, sans-serif !important;
  text-align: center;
  font-size: 16px;
  text-transform: uppercase;
}

.newcities .citylist {
  margin-bottom: 0;
  padding: 10px 0 15px;
}

.citylist a {
  color: white;
}

.citylist li {
  list-style: none;
  display: inline-block;
  padding: 10px 20px 0;
}

.world-tour-splash {
  background: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689702183/assets/events/world-tour-2016/Speakers/2016back_yf1bqh.jpg');
  min-height: 100vh;
  background-size: cover;
}

.worldtour2016head {
  margin-left: auto;
  margin-right: auto;
  z-index: 9;
  width: 100%;
  text-align: center;
  margin-top: 20%;
}

.worldtour2016head h1 {
  color: white;
  margin-top: 20px !important;
  margin-bottom: 10px !important;
}

.worldtour2016head h1 span {
  font-weight: 200;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  text-align: center;
  margin-left: 2px;
  color: #fbba00;
  font-size: 28px;
}

.bigstat {
  font-size: 30px;
  margin-bottom: 0;
}

.statdesc {
  text-transform: uppercase;
  font-weight: lighter;
  font-size: 12px;
}

.extramargin {
  margin-top: 2em;
}

hr {
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #ddd;
  box-sizing: content-box;
  height: 0;
}

img {
  display: inline-block !important;
}

.world-tour-span {
  font-weight: 200;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  text-align: center;
}

.bigtext {
  font-size: 1em;
  line-height: 2;
}

.jumbotron {
  background: #fbba00;
  color: #222;
  background-image: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689698079/assets/events/world-tour-2015/background_uybqa8.png');
  background-size: cover;
  margin-bottom: 30px;
}

.jumbotron h3 {
  font-weight: 200;
  font-family: Helvetica, Arial, sans-serif !important;
  text-transform: none;
  font-size: 1.5em;
  line-height: 1.6em;
}

.jumbotron-city-description {
  font-weight: 200;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  text-align: center;
  text-transform: uppercase;
}

.cityhead {
  font-size: 14px !important;
  line-height: 1;
  min-height: 100px;
}
</style>
