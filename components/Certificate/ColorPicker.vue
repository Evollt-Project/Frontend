<script setup lang="ts">
const props = defineProps<{
  color: string;
}>();
const emits = defineEmits(["color"]);

const color = ref(props.color);

watch(
  () => props.color,
  (value) => {
    color.value = value;
  }
);

watch(color, (value) => {
  emits("color", value);
});
</script>

<template>
  <v-menu :close-on-content-click="false" location="end">
    <template v-slot:activator="{ props }">
      <div
        :style="{ backgroundColor: color }"
        v-bind="props"
        class="w-6 h-6 rounded-full"
      ></div>
    </template>

    <v-card min-width="300">
      <v-color-picker
        v-model="color"
        hide-inputs
        show-swatches
      ></v-color-picker>
    </v-card>
  </v-menu>
</template>

<style scoped lang="scss"></style>
