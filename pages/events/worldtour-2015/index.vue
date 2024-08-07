<template>
  <div>
    <section class="citynav">
      <div class="newcities">
        <ul class="citylist">
          <NuxtLink to="/events/worldtour-2015/london">
            <li>London</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2015/newyork">
            <li>New York</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2015/toronto">
            <li>Toronto</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2015/canada">
            <li>Vancouver</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2015/hongkong">
            <li>Hong Kong</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2015/tokyo">
            <li>Tokyo</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2015/sydney">
            <li>Sydney</li>
          </NuxtLink>
          <NuxtLink to="/events/worldtour-2015/melbourne">
            <li>Melbourne</li>
          </NuxtLink>
        </ul>
      </div>
    </section>
    <client-only>
      <Swiper
        :modules="modules"
        class="flex h-full items-center justify-center"
        :slides-per-view="swiperOptions.slidesPerView"
        :centered-slides="swiperOptions.centeredSlides"
        :space-between="swiperOptions.spaceBetween"
        :autoplay="swiperOptions.autoplay"
        :navigation="swiperOptions.navigation"
      >
        <SwiperSlide
          v-for="step in articles"
          :key="step.name"
          class="grid grid-cols-1"
        >
          <div class="item" :class="step.class">
            <div class="carousel-caption">
              <div class="container">
                <h2 class="pull-left">{{ step.name }}</h2>
                <NuxtLink
                  class="btn btn-large btn-head pull-right"
                  :to="step.link"
                >
                  Register for {{ step.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <template #button-prev>
          <div
            class="carousel-prev-button absolute right-0 z-30 box-content h-4 w-4 p-4 pr-0 md:h-6 md:w-6"
          >
            <IconRightAngle class="h-full w-full" />
          </div>
        </template>
        <template #button-next>
          <div
            class="carousel-next-button absolute left-0 z-30 box-content h-4 w-4 p-4 pl-0 md:h-6 md:w-6"
          >
            <IconLeftAngle class="h-full w-full" />
          </div>
        </template>
      </Swiper>
    </client-only>
    <div class="container">
      <div class="row extramargin">
        <div class="col-md-8">
          <h1 style="text-transform: uppercase"
            >Benchmark
            <span
              style="
                font-weight: 200;
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
                text-align: center;
              "
              >| World Tour 2015</span
            ><br />
            <small
              >Battery Raw Materials | Supply Chain 20/20 <br />
              September-October 2015</small
            ></h1
          >
          <hr />
          <h3>Bringing leading expertise to your doorstep for free</h3>
          <p> </p
          ><ul>
            <li>What role do critical minerals play in batteries?</li>
            <li
              >How much graphite, lithium and cobalt will be needed and
              when?</li
            >
            <li>Will electric vehicles and utility storage take off?</li>
            <li
              >What opportunities will the emergence of major new markets
              bring?</li
            >
          </ul>
          <p></p>
          <hr />
          <h4 style="line-height: 2" class="extramargin"
            >Join us for the Benchmark | World Tour 2015 and hear from our
            independent analysts on the future for our industry.
          </h4>

          <p class="bigtext"
            >Specialising in the battery supply chain, Benchmark Mineral
            Intelligence presents a global tour of four continents between
            September and October 2015.
          </p>

          <p class="bigtext"
            >Presenters will include Simon Moores, Managing Director of
            Benchmark in addition to expert guest speakers and graphite, lithium
            and cobalt companies.
          </p>

          <p class="bigtext"
            >All delegates will receive complementary lunch; an afternoon of
            presentations and Q&amp;A sessions; and an evening drinks reception
            to meet the people behind Benchmark and industry peers.</p
          >
        </div>
        <div
          class="col-md-4"
          style="background: #303030; color: white; padding: 20px"
        >
          <h3 style="color: white">CALL FOR SPONSORS:</h3>
          <p
            >There are opportunities for a limited number companies to speak and
            sponsor the event.
          </p>

          <p>Contact us today: </p>
          <p
            ><b>Simon Moores - Managing Director</b><br />
            smoores@benchmarkminerals.com <br />
            +44 20 3751 0357</p
          >
        </div>
      </div>
      <hr />
    </div>
    <div class="jumbotron">
      <div class="container" style="text-align: center">
        <h1>Tour <span>| Dates &amp; Locations</span></h1>
        <div class="row">
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2015/london">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/london-small_t8apj4.jpg"
                alt="locations"
              />
            </NuxtLink>
            <h3 class="cityhead">
              LONDON <span>| England</span>
              <br />
              <small style="color: #333">11 September 2015</small>
            </h3>
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2015/newyork">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/newyork-small_ylehyi.jpg"
                alt="locations"
              />
            </NuxtLink>
            <h3 class="cityhead">
              NEW YORK <span>| USA</span>
              <br />
              <small style="color: #333">17 September 2015</small>
            </h3>
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2015/toronto">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/toronto-small_rlbpn3.jpg"
                alt="locations"
              />
            </NuxtLink>
            <h3 class="cityhead">
              TORONTO
              <span>| Canada</span>
              <br /><small style="color: #333">24 September 2015</small>
            </h3>
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2015/canada">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/vancouver-small_auqi88.jpg"
                alt="locations"
              />
            </NuxtLink>
            <h3 class="cityhead">
              VANCOUVER
              <span>| Canada</span>
              <br />
              <small style="color: #333">1 October 2015</small>
            </h3>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2015/sydney">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/sydney-small_pzrasc.jpg"
                alt="locations"
              />
            </NuxtLink>
            <h3 class="cityhead">
              SYDNEY <span>| Australia</span>
              <br />
              <small style="color: #333"> 22 October 2015</small>
            </h3>
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2015/melbourne">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/melbourne-small_wdwyyn.jpg"
                alt="locations"
              />
            </NuxtLink>
            <h3 class="cityhead">
              MELBOURNE <span>| AUSTRALIA</span>
              <br />
              <small style="color: #333"> 29 October 2015</small>
            </h3>
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2015/tokyo">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696308/assets/events/world-tour-2015/Smallcities/tokyo-small_oq2qdo.jpg"
                alt="locations"
              />
            </NuxtLink>
            <h3 class="cityhead">
              TOKYO <span>| Japan</span>
              <br />
              <small style="color: #333">15 October 2015</small>
            </h3>
          </div>
          <div class="col-md-3">
            <NuxtLink to="/events/worldtour-2015/hongkong">
              <img
                src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696309/assets/events/world-tour-2015/Smallcities/hongkong-small_iziqj5.jpg"
                alt="locations"
              />
            </NuxtLink>
            <h3 class="cityhead">
              HONG KONG <span>| China</span>
              <br />
              <small style="color: #333"> 8 October 2015</small>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row" style="text-align: center; margin-bottom: 2em">
        <h1>SPONSORS</h1>
        <hr />
        <img
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696450/assets/events/world-tour-2015/Sponsors/nemaska-lithium_aktk0l.jpg"
          alt="sponsors"
          style="margin-right: 10px"
        />
        <a href="http://www.westernlithium.com" target="_blank" rel="noopener">
          <img
            src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696450/assets/events/world-tour-2015/Sponsors/westernlithium_yme0ac.png"
            alt="sponsors"
            style="margin-left: 10px"
          />
        </a>
        <img
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696450/assets/events/world-tour-2015/Sponsors/greatlakes-graphite_x9kaho.jpg"
          alt="sponsors"
          style="margin-left: 10px"
        />
        <img
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696450/assets/events/world-tour-2015/Sponsors/syrah-resources_qqtorm.jpg"
          alt="sponsors"
        />
        <img
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696450/assets/events/world-tour-2015/Sponsors/avalon_gwup6r.jpg"
          alt="sponsors"
        />
        <img
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696450/assets/events/world-tour-2015/Sponsors/imx-resources_najelt.jpg"
          alt="sponsors"
        />
        <img
          src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696450/assets/events/world-tour-2015/Sponsors/neometals_j0aybr.jpg"
          alt="sponsors"
        />
        <hr />
        <p
          >There are opportunities for a limited number companies to speak and
          sponsor the event.
        </p>

        <p>Contact us today: </p>
        <p
          ><b>Simon Moores - Managing Director</b><br />
          smoores@benchmarkminerals.com <br />
          +44 20 3751 0357</p
        >
      </div>
    </div>
    <div class="jumbotron">
      <div class="container" style="text-align: center">
        <h1>Independent <span>| Speakers</span></h1>
        <div class="row">
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696437/assets/events/world-tour-2015/Speakers/gangsta-simon_fml8vb.jpg"
              alt="speakers"
            />
            <h3 class="cityhead"> SIMON <span> MOORES</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              Benchmark Mineral Intelligence - United Kingdom
            </p>
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/sam-jaffe_zxdnph.jpg"
              alt="speakers"
            />
            <h3 class="cityhead"> SAM <span>JAFFE</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              Managing Director, Cairn Energy Research Advisors
              <br />
              <NuxtLink to="/events/worldtour-2015/newyork" style="color: #333">
                New York
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/toronto" style="color: #333">
                Toronto
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/canada" style="color: #333">
                Vancouver
              </NuxtLink>
            </p>
            <p></p>
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/chris-b_vpi2n9.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">CHRIS <span> BERRY</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              Founder and President, House Mountain Partners LLC
              <br />
              <NuxtLink to="/events/worldtour-2015/newyork" style="color: #333">
                New York
              </NuxtLink>
            </p>
          </div>
          <div class="col-md-6">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/gianni_agoabf.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">GIANNI <span> KOVACEVIC</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              Gianni Kovacevic, Executive Chairman &amp; Director, CopperBank
              <br />
              <NuxtLink to="/events/worldtour-2015/canada" style="color: #333">
                Vancouver
              </NuxtLink>
            </p>
          </div>
          <div class="col-md-6">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696437/assets/events/world-tour-2015/Speakers/sanchiya_qurqlz.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">Sachiya <span> Inagaki</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              General Manager, Yano Research Institute, Tokyo
            </p>
          </div>
        </div>
        <h1>Public Company <span>| Speakers</span></h1>
        <div class="row">
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/speaker-guy_umfxxj.jpg"
              alt="speakers"
            />
            <h3 class="cityhead"> GUY <span> BOURASSA</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              Nemaska Lithium Corp
              <br />
              Canada
              <br />
              <NuxtLink to="/events/worldtour-2015/london" style="color: #333">
                London
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/newyork" style="color: #333">
                New York
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/toronto" style="color: #333">
                Toronto
              </NuxtLink>
            </p>
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/gorman_sfnln8.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">PAUL <span> Gorman</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              CEO, Great Lakes Graphite
              <br />
              (Canada)
              <br />
              <NuxtLink to="/events/worldtour-2015/newyork" style="color: #333">
                New York
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/toronto" style="color: #333">
                Toronto
              </NuxtLink>
            </p>
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/jay-c_brgjfb.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">JAY <span> CHMELAUSKAS</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              President &amp; CEO, Western Lithium
              <br />
              (Canada)
              <br />
              <NuxtLink to="/events/worldtour-2015/london" style="color: #333">
                London
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/newyork" style="color: #333">
                New York
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/toronto" style="color: #333">
                Toronto
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/canada" style="color: #333">
                Vancouver
              </NuxtLink>
              |
              <NuxtLink
                to="/events/worldtour-2015/hongkong"
                style="color: #333"
              >
                Hong Kong
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/tokyo" style="color: #333">
                Tokyo
              </NuxtLink>
            </p>
          </div>

          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696437/assets/events/world-tour-2015/Speakers/tolga_fwm9jd.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">TOLGA <span> KUMOVA</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              Managing Director, Syrah Resources
              <br />
              (Australia)
              <br />
              London, New York, Toronto, Vancouver
            </p>
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/don-bubar_jcp3po.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">DON <span> BUBAR</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              President &amp; CEO, Avalon Rare Metals
              <br />
              (Canada)
              <br />
              <NuxtLink to="/events/worldtour-2015/toronto" style="color: #333">
                Toronto
              </NuxtLink>
            </p>
          </div>

          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/greg-bowes_euxqtf.jpg"
              alt="speakers"
            />
            <h3 class="cityhead"> GREG<span> BOWES</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              CEO, Northern Graphite
              <br />
              (Canada)
              <br />
              <NuxtLink to="/events/worldtour-2015/toronto" style="color: #333">
                Toronto
              </NuxtLink>
            </p>
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/chris-reed_wbwrlu.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">CHRIS <span> REED</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              Managing Director, Neometals
              <br />
              <NuxtLink
                to="/events/worldtour-2015/hongkong"
                style="color: #333"
              >
                Hong Kong
              </NuxtLink>
            </p>
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/spinks_gtiff3.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">ANDREW <span> SPINKS</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              Managing Director, Kibaran Resources
              <br />
              <NuxtLink
                to="/events/worldtour-2015/melbourne"
                style="color: #333"
              >
                Melbourne
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/sydney" style="color: #333">
                Sydney
              </NuxtLink>
            </p>
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/frey_njixvc.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">CHRISTOPH <span> FREY</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              Kibaran Resources
              <br />
              <NuxtLink
                to="/events/worldtour-2015/melbourne"
                style="color: #333"
              >
                Melbourne
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/sydney" style="color: #333">
                Sydney
              </NuxtLink>
            </p>
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696436/assets/events/world-tour-2015/Speakers/tambanis_k3hkcg.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">STEVE <span> TAMBANIS</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              Managing Director Black Rock Mining
              <br />
              <NuxtLink
                to="/events/worldtour-2015/melbourne"
                style="color: #333"
              >
                Melbourne
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/sydney" style="color: #333">
                Sydney
              </NuxtLink>
            </p>
          </div>
          <div class="col-md-4">
            <img
              src="https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696437/assets/events/world-tour-2015/Speakers/bradboyle_mfhdrh.jpg"
              alt="speakers"
            />
            <h3 class="cityhead">BRAD <span> BOYLE</span></h3>
            <p style="font-size: 12px; text-transform: uppercase">
              CEO &amp; Managing Director, Triton Minerals
              <br />
              <NuxtLink
                to="/events/worldtour-2015/melbourne"
                style="color: #333"
              >
                Melbourne
              </NuxtLink>
              |
              <NuxtLink to="/events/worldtour-2015/sydney" style="color: #333">
                Sydney
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SwiperSlide, Swiper } from 'swiper/vue'
import { Autoplay, Navigation } from 'swiper/modules'
import type { SwiperOptions } from 'swiper/types'
import IconLeftAngle from '@/assets/icons/angle-left.svg'
import IconRightAngle from '@/assets/icons/RightAngle.svg'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

const modules = [Autoplay, Navigation]

const articles = [
  {
    name: 'London',
    class: 'london',
    link: '/events/worldtour-2015/london',
  },
  {
    name: 'New York',
    class: 'newyork',
    link: '/events/worldtour-2015/newyork',
  },
  {
    name: 'Toronto',
    class: 'toronto',
    link: '/events/worldtour-2015/toronto',
  },
  {
    name: 'Vancouver',
    class: 'vancouver',
    link: '/events/worldtour-2015/canada',
  },
  {
    name: 'Hong Kong',
    class: 'hongkong',
    link: '/events/worldtour-2015/hongkong',
  },
  {
    name: 'Tokyo',
    class: 'tokyo',
    link: '/events/worldtour-2015/tokyo',
  },
  {
    name: 'Sydney',
    class: 'sydney',
    link: '/events/worldtour-2015/sydney',
  },
  {
    name: 'Melbourne',
    class: 'melbourne',
    link: '/events/worldtour-2015/melbourne',
  },
]

const swiperOptions: SwiperOptions = {
  slidesPerView: 'auto',
  centeredSlides: true,
  spaceBetween: 30,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.carousel-prev-button',
    prevEl: '.carousel-next-button',
  },
}
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

.pull-right {
  float: right !important;
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
}

.item {
  width: 100%;
  min-height: 500px;
}

.london {
  background: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696312/assets/events/world-tour-2015/Carrousel/london-header_gpccsp.jpg');
  background-size: cover;
}

.newyork {
  background: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696313/assets/events/world-tour-2015/Carrousel/newyork-header_hlbpdn.jpg');
  background-size: cover;
}

.toronto {
  background: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696312/assets/events/world-tour-2015/Carrousel/toronto-header_ydjbus.jpg');
  background-size: cover;
}

.vancouver {
  background: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696312/assets/events/world-tour-2015/Carrousel/vancouver-header_ej2zgg.jpg');
  background-size: cover;
}

.hongkong {
  background: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696313/assets/events/world-tour-2015/Carrousel/hongkong-header_urmkab.jpg');
  background-size: cover;
}

.tokyo {
  background: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696312/assets/events/world-tour-2015/Carrousel/tokyo-skyline_gthjz7.jpg');
  background-size: cover;
}

.sydney {
  background: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696312/assets/events/world-tour-2015/Carrousel/sydney-header_bkuk4w.jpg');
  background-size: cover;
}

.melbourne {
  background: url('https://res.cloudinary.com/benchmarkminerals/image/upload/v1689696312/assets/events/world-tour-2015/Carrousel/melbourne-skyline_sifse2.jpg');
  background-size: cover;
}

.carousel-caption {
  width: 100%;
  left: 0;
  bottom: 0;
  min-height: 150px;
  padding-bottom: 0;
  padding-top: 65px;
  right: 20%;
  position: absolute;
  z-index: 10;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0 0 0 / 60%);
  background: linear-gradient(
    to bottom,
    rgba(0 0 0 / 0%) 0%,
    rgba(0 0 0 / 95%) 69%,
    #000 73%
  );
}

.carousel-caption h2 {
  color: white;
  text-align: left;
  margin-left: 20px;
  text-transform: uppercase;
  max-width: 400px;
  display: inline-block;
}

.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.428;
  border-radius: 4px;
  user-select: none;
}

.btn:hover,
.btn:focus,
.btn.focus {
  color: #333;
  text-decoration: none;
}

.btn-head {
  background: transparent;
  color: white;
  margin-top: 1em;
  margin-right: 2em;
  padding: 0.8em;
  border: 3px solid white;
  text-transform: uppercase;
  font-weight: bold;
}

.carousel-caption .btn {
  text-shadow: none;
}
</style>
