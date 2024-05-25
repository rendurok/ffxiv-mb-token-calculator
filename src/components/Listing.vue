<script setup lang="ts">
import { hideListing } from '../state/listings';

const props = defineProps<{
  listing: Listing;
}>();

function handleCloseClick() {
  hideListing(props.listing.listingID);
}
</script>

<template>
  <div class="window" style="min-width: 200px">
    <div class="title-bar">
      <div class="title-bar-text">
        {{ Math.round(listing.pricePerToken) }} gil token price
      </div>
      <div class="title-bar-controls">
        <button aria-label="Close" @click="handleCloseClick"></button>
      </div>
    </div>
    <div class="window-body">
      <p>{{ listing.itemName + (listing.hq ? ' HQ' : '') }}</p>
      <p v-show="listing.worldName">{{ listing.worldName }}</p>
      <p>
        {{
          `${listing.quantity !== 1 ? `${listing.quantity}x ` : ''}${
            listing.pricePerUnit
          } gil`
        }}
      </p>
      <p>{{ listing.tokens }} tokens</p>
    </div>
  </div>
</template>
