<script setup lang="ts">
import { ref } from 'vue';
import * as config from '../state/config';
import defaultRegions from '../assets/defaultRegions.json';
import { getRegions } from '../scripts/universalis';

const regions = ref<Region[]>(defaultRegions);
const region = ref(config.region.value);
const customRegion = ref('');
const isError = ref(false);

function handleFetchRegions() {
  getRegions()
    .then((r) => {
      isError.value = false;
      regions.value = r;
    })
    .catch((res) => {
      console.error(res.error);
      isError.value = true;

      if (!regions.value || !regions.value.length) {
        regions.value = defaultRegions;
      }
    });
}

function handleRegionChange() {
  config.setRegion(region.value);
}

function handleCustomRegionChange() {
  config.setRegion(customRegion.value);
}

handleFetchRegions();
</script>

<template>
  <div class="field-row-stacked" style="margin-top: 6px; width: min-content">
    <label for="region-select">Region, datacenter or world</label>
    <select
      v-model="region"
      id="region-select"
      @change="handleRegionChange"
      style="width: 150px"
    >
      <option disabled value="">Regions</option>
      <option v-for="region in regions">{{ region.name }}</option>
      <template
        v-for="region in regions.filter((r) => r.datacenters.length > 1)"
      >
        <option disabled value="">{{ region.name }}</option>
        <option v-for="dc in region.datacenters">{{ dc.name }}</option>
      </template>
      <option disabled value="">Worlds</option>
      <option
        v-for="world in regions
          .flatMap((r) => r.datacenters.flatMap((dc) => dc.worlds))
          .sort()"
      >
        {{ world }}
      </option>
      <option disabled value="">Special</option>
      <option>Custom</option>
    </select>
    <input
      v-if="region === 'Custom'"
      type="text"
      v-model="customRegion"
      @input="handleCustomRegionChange"
      placeholder="custom region"
      style="width: 150px; height: 21px"
    />
    <template v-if="isError">
      <label for="button-fetch-regions" style="color: red">
        Error fetching regions from Universalis! Make sure Universalis is not
        down or blocked.
      </label>
      <button id="button-fetch-regions" @click="handleFetchRegions">
        Retry
      </button>
    </template>
  </div>
</template>
