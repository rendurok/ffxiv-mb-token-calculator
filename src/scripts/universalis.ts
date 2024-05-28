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

type UniversalisDCData = {
  name: string;
  region: string;
  worlds: number[];
};

type UniversalisWorldData = {
  id: number;
  name: string;
};

export async function getRegions(): Promise<Region[]> {
  return Promise.all([
    axios.get(`${baseUrl}/data-centers`),
    axios.get(`${baseUrl}/worlds`),
  ]).then(([resDC, resWorld]) => {
    let regionMap = new Map<string, { name: string; worlds: string[] }[]>();
    const worldMap = new Map<number, string>(
      (<UniversalisWorldData[]>resWorld.data).map(({ id, name }) => [id, name])
    );

    (<UniversalisDCData[]>resDC.data).forEach(({ name, region, worlds }) => {
      const DCobj = {
        name,
        worlds: worlds.map((id) => worldMap.get(id) || 'error'),
      };
      const regionObj = regionMap.get(region);
      if (!regionObj) {
        regionMap.set(region, [DCobj]);
        return;
      }

      regionObj.push(DCobj);
    });

    return [...regionMap.entries()].map(([name, datacenters]) => ({
      name,
      datacenters,
    }));
  });
}
