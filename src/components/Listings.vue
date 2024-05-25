<script setup lang="ts">
import Listing from './Listing.vue';
import { listings } from '../state/listings';
</script>

<template>
  <div
    v-show="listings.length"
    style="margin-top: 0.5em; display: flex; flex-flow: row wrap; gap: 8px"
  >
    <Listing v-for="listing in listings" :listing />
  </div>
</template>
