<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  tabNames: string[];
}>();

const activeTab = ref(0);

function handleChangeTab(tab: number) {
  activeTab.value = tab;
}
</script>

<template>
  <div class="window-body" style="width: fit-content">
    <menu role="tablist">
      <li
        v-for="(tabName, idx) in tabNames"
        role="tab"
        :aria-selected="activeTab === idx"
        @click="handleChangeTab(idx)"
      >
        <a href="#" @click.prevent>{{ tabName }}</a>
      </li>
    </menu>
    <div
      v-for="(_, idx) in tabNames"
      class="window"
      role="tabpanel"
      v-show="activeTab === idx"
    >
      <div class="window-body"><slot :name="idx"></slot></div>
    </div>
  </div>
</template>
