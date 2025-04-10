<script setup lang="ts">
import { Swiper } from "swiper/vue";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/scss";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "@/assets/scss/swiper/navigation.scss";

const modules = ref([Navigation, FreeMode]);
</script>

<template>
  <div class="max-w-[1336px]">
    <component
      :is="Swiper"
      :slidesPerView="1"
      :free-mode="true"
      :spaceBetween="30"
      :navigation="{
        nextEl: '.swiper-navigation-custom-right',
        prevEl: '.swiper-navigation-custom-left',
      }"
      class="py-5 px-5"
      :modules="modules"
    >
      <slot name="slides"></slot>

      <div class="swiper-navigation">
        <div class="swiper-navigation-custom-left">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4L2 8L6 12"
              stroke="#39393A"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 8L2.66667 8"
              stroke="#39393A"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M1.9974 8L2.66406 8"
              stroke="#39393A"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="swiper-navigation-custom-right">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12L14 8L10 4"
              stroke="#39393A"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2 8H13.3333"
              stroke="#39393A"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.0026 8H13.3359"
              stroke="#39393A"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </component>
  </div>
</template>
