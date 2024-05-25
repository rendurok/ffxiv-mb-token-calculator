<script setup lang="ts">
import presetData from '/presetData.json?url';
</script>

<template>
  <div class="field-row-stacked" style="width: min-content; margin-left: 0">
    Preset JSON must be of the following form:
    <ul class="tree-view">
      <li>
        {
        <ul>
          <li>"title": string,</li>
          <li>
            "items": {
            <ul>
              <li>"itemID": number,</li>
              <li>"name": string,</li>
              <li>"tokensNQ": number,</li>
              <li>"tokensHQ": number</li>
            </ul>
            }[]
          </li>
        </ul>
      </li>
      <li>}</li>
    </ul>
    <p>
      Specifying multiple presets at the same time is possible by putting them
      in an Array.
    </p>
    <p>Use of an external editor (like notepad++ or vscode) is recommended.</p>
    <p><a :href="presetData">Default presets</a> for example</p>
  </div>
</template>

<style scoped>
.tree-view {
  font-family: 'Courier New', Courier, monospace;
  width: max-content;
  margin-top: 11px;
}

p {
  margin-top: 0;
}

p:last-child {
  margin-bottom: 0;
}
</style>
