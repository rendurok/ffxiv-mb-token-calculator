<script setup lang="ts">
import { ref } from 'vue';
import * as config from '../state/config';
import RegionSelect from './RegionSelect.vue';

const maxListings = ref(config.maxListings.value);

function handleMaxListingsChange() {
  config.setMaxListings(maxListings.value);
}
</script>

<template>
  <fieldset>
    <legend>Configuration</legend>
    <div style="display: flex; flex-flow: row wrap; gap: 8px">
      <RegionSelect />
      <div class="field-row-stacked">
        <label for="max-results">Maximum displayed listings</label>
        <input
          v-model="maxListings"
          id="max-results"
          type="number"
          @input="handleMaxListingsChange"
        />
      </div>
    </div>
  </fieldset>
</template>

<style scoped>
input {
  width: 150px;
  height: 21px;
}
</style>
