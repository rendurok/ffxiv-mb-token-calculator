<script setup lang="ts">
import PresetSelection from './PresetSelection.vue';
import Tabber from './Tabber.vue';
import ManualItems from './ManualItems.vue';
import PresetManager from './PresetManager.vue';
</script>

<template>
  <fieldset>
    <legend>Items and Tokens</legend>
    <Tabber :tabNames="['Use Preset', 'Manage Presets', 'Manual']">
      <template #0><PresetSelection /></template>
      <template #1><PresetManager /></template>
      <template #2><ManualItems /></template>
    </Tabber>
  </fieldset>
</template>
