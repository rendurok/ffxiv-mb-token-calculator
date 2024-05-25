<script setup lang="ts">
import { computed, ref } from 'vue';
import { addCustomPreset, addCustomPresets, usePreset } from '../state/preset';
import {
  constructPreset,
  constructPresets,
  validatePresets,
} from '../scripts/presetUtils';
import PresetInstructions from './static/PresetInstructions.vue';

const validationError = ref('');
const isValidated = ref(false);
const isMultiplePresets = ref(false);
const userText = ref('');

const userJSON = computed(() => {
  let possiblePreset: unknown;

  try {
    possiblePreset = JSON.parse(userText.value);
  } catch {}

  return possiblePreset;
});

async function handleImport(event: Event) {
  const target = <HTMLInputElement>event.target;
  if (!target?.files) return;

  return target.files[0].text().then((textContent) => {
    userText.value = textContent;
    handleUserText();
  });
}

function handleUserText() {
  isValidated.value = false;
  const p = userJSON.value;

  const { success, message, multiple } = validatePresets(p);
  validationError.value = message;
  isValidated.value = success;
  isMultiplePresets.value = multiple || false;
}

function handleSave() {
  addCustomPresets(constructPresets(userJSON.value));
}

function handleSaveAndActivate() {
  const newPreset = constructPreset(userJSON.value);
  if (newPreset) usePreset(addCustomPreset(newPreset));
}
</script>

<template>
  <div
    class="field-row"
    style="align-items: stretch; gap: 8px; flex-wrap: wrap-reverse"
  >
    <div class="field-row-stacked">
      <div class="field-row">
        <label for="preset-upload">Import:</label>
        <input
          type="file"
          accept="application/json"
          id="preset-upload"
          @change="handleImport"
          style="margin-top: 0"
        />
      </div>
      <textarea
        v-model="userText"
        placeholder="paste JSON here"
        @input="handleUserText"
        style="flex-grow: 1; font-family: 'Courier New', Courier, monospace"
      ></textarea>
      <span v-show="validationError" style="color: red">
        {{ validationError }}
      </span>
      <div class="save-buttons">
        <button
          :disabled="!isValidated || isMultiplePresets"
          @click="handleSaveAndActivate"
        >
          Save and Set Active
        </button>
        <button :disabled="!isValidated" @click="handleSave">Save Only</button>
      </div>
    </div>
    <PresetInstructions />
  </div>
</template>

<style scoped>
.save-buttons {
  display: flex;
  gap: 8px;
}

.save-buttons > button {
  flex-grow: 1;
  margin-top: 0;
  width: max-content;
}
</style>
