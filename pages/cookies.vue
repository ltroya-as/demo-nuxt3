<template>
  <div class="mt-10 px-2 pb-20 lg:pb-36">
    <article class="max-w-article-container-medium mx-auto">
      <h1 class="mb-6 text-2xl font-bold md:text-4xl">Cookies</h1>
      <h1 class="my-5 text-2xl font-bold uppercase"
        >Cookie Policy for Benchmark Minerals</h1
      >
      <p>
        This is the Cookie Policy for Benchmark Minerals, accessible from
        <NuxtLink to="/" class="font-semibold hover:underline"
          >https://www.benchmarkminerals.com</NuxtLink
        >
      </p>
      <h4 class="mb-3 mt-8 text-xl font-bold">What Are Cookies</h4>
      <p>
        As is common practice with almost all professional websites this site
        uses cookies, which are tiny files that are downloaded to your computer,
        to improve your experience. This page describes what information they
        gather, how we use it and why we sometimes need to store these cookies.
        We will also share how you can prevent these cookies from being stored
        however this may downgrade or ‘break’ certain elements of the sites
        functionality. For more general information on cookies see the Wikipedia
        article on HTTP Cookies.
      </p>
      <h4 class="mb-3 mt-8 text-xl font-bold">How We Use Cookies</h4>
      <p>
        We use cookies for a variety of reasons detailed below. Unfortunately in
        most cases there are no industry standard options for disabling cookies
        without completely disabling the functionality and features they add to
        this site. It is recommended that you leave on all cookies if you are
        not sure whether you need them or not in case they are used to provide a
        service that you use.
      </p>
      <h4 class="mb-3 mt-8 text-xl font-bold">Disabling Cookies</h4>
      <p>
        You can prevent the setting of cookies by adjusting the settings on your
        browser (see your browser Help for how to do this). Be aware that
        disabling cookies will affect the functionality of this and many other
        websites that you visit. Disabling cookies will usually result in also
        disabling certain functionality and features of the this site. Therefore
        it is recommended that you do not disable cookies.
      </p>
      <h4 class="mb-3 mt-8 text-xl font-bold">The Cookies We Set</h4>
      <ul class="ml-7 list-disc">
        <li>
          Account related cookies<br />
          If you create an account with us then we will use cookies for the
          management of the signup process and general administration. These
          cookies will usually be deleted when you log out however in some cases
          they may remain afterwards to remember your site preferences when
          logged out.
        </li>
        <li>
          Login related cookies<br />
          We use cookies when you are logged in so that we can remember this
          fact. This prevents you from having to log in every single time you
          visit a new page. These cookies are typically removed or cleared when
          you log out to ensure that you can only access restricted features and
          areas when logged in.
        </li>
      </ul>
      <h4 class="mb-3 mt-8 text-xl font-bold">Third Party Cookies</h4>
      <p class="mb-3">
        In some special cases we also use cookies provided by trusted third
        parties. The following section details which third party cookies you
        might encounter through this site.
      </p>
      <ul class="ml-7 list-disc">
        <li>
          This site uses Google Analytics which is one of the most widespread
          and trusted analytics solution on the web for helping us to understand
          how you use the site and ways that we can improve your experience.
          These cookies may track things such as how long you spend on the site
          and the pages that you visit so we can continue to produce engaging
          content.<br />
          For more information on Google Analytics cookies, see the official
          Google Analytics page.
        </li>
        <li>
          We also use social media buttons and/or plugins on this site that
          allow you to connect with your social network in various ways. For
          these to work the following social media sites including; LinkedIn,
          Twitter and Instagram, will set cookies through our site which may be
          used to enhance your profile on their site or contribute to the data
          they hold for various purposes outlined in their respective privacy
          policies.
        </li>
      </ul>
      <h4 class="mb-3 mt-8 text-xl font-bold">More Information</h4>
      <p>
        If you are still looking for more information then you can contact us at
        <a
          class="font-semibold hover:underline"
          href="mailto:priority@benchmarkminerals.com"
          >priority@benchmarkminerals.com</a
        >
      </p>
    </article>
  </div>
</template>

<script setup lang="ts">
const { getSeoInfo } = useSeo()
const seo = getSeoInfo({ title: 'Cookies' })
useHead(seo)
</script>
