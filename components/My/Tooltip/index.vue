<script lang="ts" setup>
import { Anchor } from "lucide-vue-next";
import type { ComponentPublicInstance } from "vue";

const props = defineProps<{
  activator?: Element | "parent" | (string & {}) | ComponentPublicInstance;
  maxWidth?: string | number;
  location?: typeof Anchor;
}>();

const DEFAULT_TOOLTIP_VALUE = {
  activator: "parent",
  maxWidth: "300px",
  location: "bottom",
};

const tooltipProps = computed(() => ({
  activator: props.activator ?? DEFAULT_TOOLTIP_VALUE.activator,
  maxWidth: props.maxWidth ?? DEFAULT_TOOLTIP_VALUE.maxWidth,
  location: props.location ?? DEFAULT_TOOLTIP_VALUE.location,
}));
</script>

<template>
  <v-tooltip v-bind="tooltipProps">
    <slot />
  </v-tooltip>
</template>
