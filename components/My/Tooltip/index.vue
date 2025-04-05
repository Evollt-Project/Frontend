<script lang="ts" setup>
import type { ComponentPublicInstance } from "vue";

const props = defineProps<{
  activator?: Element | "parent" | (string & {}) | ComponentPublicInstance;
  maxWidth?: string | number;
  location?: TooltipLocationType;
}>();

type TooltipLocationType = "left" | "top" | "bottom" | "right";

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
  <!-- NOTE: Этот компонент не понимает, что есть props "opwn-on-click", поэтому и возникает ошибка. Не надо пробовать ее исправить! -->
  <v-tooltip v-bind="tooltipProps" open-on-click>
    <slot />
  </v-tooltip>
</template>
