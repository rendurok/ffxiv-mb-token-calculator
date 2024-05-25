import { ref, computed, readonly } from 'vue';
import {
  exportFile,
  getDefaultPresets,
  loadPresets,
  savePresets,
} from '../scripts/saveLoad';
import { constructPresets } from '../scripts/presetUtils';

function newPresetID() {
  return crypto.randomUUID();
}

const defaultPresets_ = ref(new Map<string, Preset>());
const customPresets_ = ref(new Map<string, Preset>());
const currentPreset_ = ref({
  id: '',
  title: '',
  tokenMap: new Map<number, TokenData>(),
});

export const customPresets = readonly(customPresets_);
export const currentPreset = readonly(currentPreset_);
export const presets = computed(
  () =>
    new Map([
      ...defaultPresets_.value.entries(),
      ...customPresets_.value.entries(),
    ])
);

export const presetsInfo = computed(() =>
  [...presets.value.entries()].map(([id, { title }]) => ({ id, title }))
);
export const tokenMap = computed(() => currentPreset.value.tokenMap);

export function usePreset(presetID: string) {
  const newPreset = presets.value.get(presetID);
  if (!newPreset) return;

  currentPreset_.value = {
    id: presetID,
    title: newPreset.title,
    tokenMap: new Map(
      newPreset.items.map(({ itemID, ...itemData }) => [itemID, itemData])
    ),
  };
}

export function addCustomPreset(preset: Preset, save: boolean = true): string {
  const id = newPresetID();
  customPresets_.value.set(id, preset);

  if (save) savePresets();
  return id;
}

export function addCustomPresets(presets: PresetInput) {
  if (Array.isArray(presets)) {
    presets.forEach((p) => addCustomPresets(p));
    return;
  }

  addCustomPreset(presets, false);
  savePresets();
}

export function deleteCustomPreset(presetID: string) {
  customPresets_.value.delete(presetID);
  savePresets();
}

export function exportPreset(id: string) {
  const preset = presets.value.get(id);
  if (!preset) return;

  exportFile(preset, `preset ${preset.title}`);
}

export function exportPresets() {
  exportFile([...customPresets.value.values()], 'presets');
}

getDefaultPresets().then((presets) =>
  presets.forEach((p) => defaultPresets_.value.set(newPresetID(), p))
);
addCustomPresets(constructPresets(loadPresets()));
