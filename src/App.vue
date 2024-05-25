<script setup lang="ts">
import Listings from './components/Listings.vue';
import Settings from './components/Settings.vue';
import About from './components/static/About.vue';
import ItemsSelect from './components/ItemsSelect.vue';
import FetchListingsButton from './components/FetchListingsButton.vue';
</script>

<template>
  <div class="window" style="min-width: fit-content">
    <div class="title-bar">
      <div class="title-bar-text">FFXIV Marketboard Token Calculator</div>
    </div>
    <div class="window-body">
      <About />
      <Settings />
      <ItemsSelect />
      <FetchListingsButton />
    </div>
  </div>
  <Listings />
</template>
