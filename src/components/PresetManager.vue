<script setup lang="ts">
import { savePresets } from '../scripts/saveLoad';
import {
  customPresets,
  deleteCustomPreset,
  exportPreset,
  exportPresets,
  usePreset,
} from '../state/preset';

function handleExportPresets() {
  exportPresets();
}

function handleSavePresets() {
  savePresets();
}

function handleUsePreset(id: string) {
  usePreset(id);
}

function handleExportPreset(id: string) {
  exportPreset(id);
}

function handlePresetDelete(id: string, title?: string) {
  if (
    confirm(
      `Do you want to delete the preset${title ? ' called ' + title : ''}?`
    )
  ) {
    deleteCustomPreset(id);
  }
}
</script>

<template>
  <div v-if="customPresets.size" style="display: flex; flex-direction: column">
    <div style="display: flex; gap: 8px">
      <button @click="handleExportPresets" style="flex-grow: 1">
        Save All to File
      </button>
      <button @click="handleSavePresets">Save All to Localsotrage</button>
    </div>
    <table style="background-color: transparent">
      <tr v-for="[id, { title }] in customPresets.entries()" style="">
        <td style="padding-right: 2em; padding-top: 10px">{{ title }}</td>
        <td style="display: flex; flex-wrap: wrap; padding-top: 10px">
          <button @click="handleUsePreset(id)">Use</button>
          <button @click="handleExportPreset(id)">Export</button>
          <button @click="handlePresetDelete(id, title)">Delete</button>
        </td>
      </tr>
    </table>
  </div>
  <div v-else>You don't have any custom presets yet.</div>
</template>
