import { readonly, ref } from 'vue';
import * as universalis from '../scripts/universalis';
import { tokenMap } from './preset';
import { calculateItemsInfo } from '../scripts/itemInfo';
import { maxListings, region } from './config';

const listings_ = ref<Listing[]>([]);
const hidden_ = ref<string[]>([]);

export const listings = readonly(listings_);
export const hiddenListingIDs = readonly(hidden_);

export async function fetchListings() {
  return universalis
    .getListings(Array.from(tokenMap.value.keys()), region.value)
    .then((listingData) => {
      const filteredListings = hidden_.value.length
        ? listingData.filter((l) => !hidden_.value.includes(l.listingID))
        : listingData;

      listings_.value = calculateItemsInfo(filteredListings, tokenMap.value)
        .sort((a, b) => a.pricePerToken - b.pricePerToken)
        .slice(0, maxListings.value);
    });
}

export function hideListing(listingID: string) {
  hidden_.value.push(listingID);
  listings_.value = listings_.value.filter((l) => l.listingID !== listingID);
}

export function resetHiddenListings() {
  hidden_.value = [];
}
