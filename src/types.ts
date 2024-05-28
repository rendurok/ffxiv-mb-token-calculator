type Item = {
  name: string;
  itemID: number;
  tokensNQ: number;
  tokensHQ: number;
};

type Listing = {
  listingID: string;
  itemID: number;
  pricePerUnit: number;
  quantity: number;
  worldName: string;
  hq: boolean;
  pricePerToken: number;
  itemName: string;
  tokens: number;
};

type Preset = {
  title: string;
  items: {
    itemID: number;
    tokensNQ: number;
    tokensHQ: number;
    name: string;
  }[];
};

type PresetInput = Preset | (Preset | PresetInput)[];

type TokenData = { tokensNQ: number; tokensHQ: number; name: string };

type TokenMap = Map<number, TokenData>;

type ValidationResult = {
  success: boolean;
  message: string;
  multiple?: boolean;
};

type Region = {
  name: string;
  datacenters: {
    name: string;
    worlds: string[];
  }[];
};
