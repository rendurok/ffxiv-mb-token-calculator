import axios from 'axios';

const baseUrl = 'https://universalis.app/api/v2';

type UniversalisItemData = {
  itemID: number;
  lastUploadTime: number;
  listings: {
    lastReviewTime: number;
    pricePerUnit: number;
    quantity: number;
    worldName: string;
    worldID: number;
    hq: boolean;
    listingID: string;
  }[];
};

export async function getListings(itemIds: number[], region: string) {
  if (itemIds.length === 0) return [];

  return axios
    .get(
      `${baseUrl}/${region}/${itemIds
        .reduce((s, id) => `${s},${id}`, '')
        .slice(
          1
        )}?entries=0&fields=items.itemID,items.lastUploadTime,items.listings.lastReviewTime,items.listings.pricePerUnit,items.listings.quantity,items.listings.worldName,items.listings.worldID,items.listings.hq,items.listings.listingID`
    )
    .then((response) =>
      Object.values<UniversalisItemData>(response.data.items).flatMap(
        ({ itemID, listings }) =>
          listings.map(
            ({ listingID, pricePerUnit, quantity, worldName, hq }) => ({
              listingID,
              itemID,
              pricePerUnit,
              quantity,
              worldName,
              hq,
            })
          )
      )
    );
}
