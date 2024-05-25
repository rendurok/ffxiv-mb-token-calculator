<script setup lang="ts">
import { currentPreset, presetsInfo, usePreset } from '../state/preset';

function handlePresetChange(event: Event) {
  usePreset((<HTMLInputElement>event.target)?.value);
}
</script>

<template>
  <div class="window-body">
    <div class="field-row-stacked">
      <label for="preset-select">Preset</label>
      <select
        @change="handlePresetChange"
        id="preset-select"
        :value="currentPreset.id"
      >
        <option disabled value="">--Select a Preset--</option>
        <option v-for="{ id, title } in presetsInfo" :value="id">
          {{ title }}
        </option>
      </select>
    </div>
  </div>
</template>
