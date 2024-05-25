import { readonly, ref } from 'vue';

const region_ = ref('');

export const region = readonly(region_);

export function setRegion(region: string) {
  region_.value = region;
}

const maxListings_ = ref(20);
export const maxListings = readonly(maxListings_);

export function setMaxListings(n: number) {
  if (!n || n < 1) return;
  maxListings_.value = n;
}
