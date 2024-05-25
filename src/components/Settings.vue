<script setup lang="ts">
import { ref } from 'vue';
import * as config from '../state/config';

const region = ref(config.region.value);
const customRegion = ref('');
const maxListings = ref(config.maxListings.value);

function handleRegionChange() {
  config.setRegion(region.value);
}

function handleCustomRegionChange() {
  config.setRegion(customRegion.value);
}

function handleMaxListingsChange() {
  config.setMaxListings(maxListings.value);
}

//TODO fetch available servers/dcs/regions from universalis (and/or somewhere else)
</script>

<template>
  <fieldset>
    <legend>Configuration</legend>
    <div style="display: flex; flex-flow: row wrap; gap: 8px">
      <div class="field-row-stacked" style="margin-top: 6px">
        <label for="region-select">Region, datacenter or server</label>
        <select
          v-model="region"
          id="region-select"
          @change="handleRegionChange"
        >
          <option disabled value="">Regions</option>
          <option>Europe</option>
          <option>Japan</option>
          <option value="North-America">North America</option>
          <option>Oceania</option>
          <option value="China">中国</option>
          <option value="한국">한국</option>
          <option disabled value="">Europe</option>
          <option>Chaos</option>
          <option>Light</option>
          <option>Shadow</option>
          <option disabled value="">Japan</option>
          <option>Elemental</option>
          <option>Gaia</option>
          <option>Mana</option>
          <option>Meteor</option>
          <option disabled value="">North America</option>
          <option>Aether</option>
          <option>Crystal</option>
          <option>Dynamis</option>
          <option>Primal</option>
          <option disabled value="">中国</option>
          <option>陆行鸟</option>
          <option>莫古力</option>
          <option>猫小胖</option>
          <option>豆豆柴</option>
          <option disabled value="">Special</option>
          <option>Custom</option>
        </select>
        <input
          v-if="region === 'Custom'"
          type="text"
          v-model="customRegion"
          @input="handleCustomRegionChange"
          placeholder="custom region"
        />
      </div>
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
select {
  width: 150px;
}

input {
  width: 150px;
  height: 21px;
}
</style>
