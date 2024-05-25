import axios from 'axios';
import { customPresets } from '../state/preset';
import presetData from '/presetData.json?url';

export async function getDefaultPresets(): Promise<Preset[]> {
  return axios
    .get(presetData)
    .then(({ data }) => {
      return data;
    })
    .catch(() => {
      return [];
    });
}

export function savePresets() {
  localStorage.setItem(
    'presets',
    JSON.stringify([...customPresets.value.values()])
  );
}

export function loadPresets(): unknown[] {
  let stored: unknown;

  try {
    stored = JSON.parse(localStorage.getItem('presets') || '');
  } catch {}

  if (Array.isArray(stored)) {
    return stored;
  } else {
    localStorage.removeItem('presets');
    return [];
  }
}

export function exportFile(data: unknown, filename: string) {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const elem = window.document.createElement('a');
  elem.href = window.URL.createObjectURL(blob);
  elem.download = `${filename}.json`;
  document.body.appendChild(elem);
  elem.click();
  document.body.removeChild(elem);
}
