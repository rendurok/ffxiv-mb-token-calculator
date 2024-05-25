export function calculateItemsInfo<T>(
  items: ({ itemID: number; pricePerUnit: number; hq: boolean } & T)[],
  tokenMap:
    | Map<number, { tokensNQ: number; tokensHQ: number; name?: string }>
    | ReadonlyMap<number, { tokensNQ: number; tokensHQ: number; name?: string }>
): (T & {
  itemID: number;
  pricePerUnit: number;
  hq: boolean;
  pricePerToken: number;
  itemName: string;
  tokens: number;
})[] {
  return items.map((item) => {
    const tokenMapRow = tokenMap.get(item.itemID);
    if (!tokenMapRow) {
      console.error('could not get info for:', item);
      return { ...item, pricePerToken: -1, itemName: 'error', tokens: 0 };
    }

    const tokens =
      (item.hq ? tokenMapRow.tokensHQ : tokenMapRow.tokensNQ) || -1;

    const name = tokenMapRow.name || 'name unknown';

    return {
      ...item,
      pricePerToken: item.pricePerUnit / tokens,
      itemName: name,
      tokens,
    };
  });
}
