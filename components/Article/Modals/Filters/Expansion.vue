<script setup lang="ts">
defineProps<{
  title: string;
  text?: string;
}>();
</script>

<template>
  <v-expansion-panel rounded="lg">
    <v-expansion-panel-title>
      <template #default>
        <v-row no-gutters>
          <v-col class="d-flex justify-start" cols="4"> {{ title }} </v-col>
          <v-col v-if="text" class="text-grey" cols="8">
            <v-fade-transition leave-absolute>
              {{ text }}
            </v-fade-transition>
          </v-col>
        </v-row>
      </template>
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <slot name="panelContent" />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
