<script setup lang="ts">
import { computed, ref } from 'vue';
import { region } from '../state/config';
import {
  fetchListings,
  hiddenListingIDs,
  resetHiddenListings,
} from '../state/listings';
import { tokenMap } from '../state/preset';

const isLoading = ref(false);
const errorMessage = ref('');
const canFetch = computed(() => region.value !== '' && tokenMap.value.size > 0);

function handleFetch() {
  errorMessage.value = '';
  isLoading.value = true;

  fetchListings()
    .catch((e) => {
      console.error(e);
      if (e?.response?.status === 404) {
        errorMessage.value = '404 Not Found: Check custom region';
      } else {
        errorMessage.value =
          'Unable to fetch listings! Make sure Universalis is working and XHR requests to universalis.app/api/ are allowed.';
      }
    })
    .finally(() => {
      isLoading.value = false;
    });
}

function handleResetHidden() {
  resetHiddenListings();
}
</script>

<template>
  <fieldset>
    <legend>Listings</legend>
    <div class="field-row">
      <button
        id="fetch-listings-button"
        :disabled="!canFetch"
        @click="handleFetch"
      >
        Fetch Listings
      </button>
      <label for="fetch-listings-button">
        <template v-if="isLoading">Loading...</template>
        <template v-if="errorMessage">
          <b style="color: red">{{ errorMessage }}</b>
        </template>
        <template v-if="!canFetch">Please select a region and items</template>
      </label>
    </div>
    <div class="field-row">
      <button
        id="reset-hidden-button"
        :disabled="!hiddenListingIDs.length"
        @click="handleResetHidden"
      >
        Reset hidden listings
      </button>
      <label v-if="hiddenListingIDs.length" for="reset-hidden-button">
        You will have to fetch new listings to re-see hidden ones
      </label>
    </div>
  </fieldset>
</template>

<style scoped>
button {
  width: max-content; 
  flex-shrink: 0;
}
</style>
