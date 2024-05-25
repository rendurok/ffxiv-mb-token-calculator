<script setup lang="ts"></script>

<template>
  <fieldset>
    <legend>About</legend>
    <p>
      This is a tool for Final Fantasy XIV that uses data from the
      <a href="https://universalis.app/">Universalis</a> marketboard aggregator.
      It grabs marketboard listings of multiple items that can be traded for
      varying amounts of tokens, and then finds the items with the cheapest
      per-token prices.
    </p>
    <p>
      Be aware that all listings of a all crafted combat gear in a tier for a
      datacenter will be megabytes (MB) in size. As such, you might have to wait
      a little for the listings. You may even find yourself rate-limited.
    </p>
    <p>
      This tool depends on the Universalis API, so if you're having issues, make
      sure Universalis is not down or blocked.
    </p>
    <p>
      <a href="https://github.com/rendurok/ffxiv-mb-token-calculator">Source</a>
    </p>
  </fieldset>
</template>

<style scoped>
p {
  margin-top: 0;
}

fieldset p:last-child {
  margin-bottom: 0;
}
</style>
