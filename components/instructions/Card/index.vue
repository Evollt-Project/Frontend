<script setup lang="ts">

</script>

<template>
  <div class="relative w-[400px] rounded-2xl h-[230px] instruction hover:cursor-pointer bg-[#171717]">
    <div class="flex justify-between px-[40px] pt-[35px]">
      <div class="flex flex-col w-[70%] gap-[25px]">
        <div class="font-bold">
          Регистрация и профиль
        </div>
        <div class="font-semibold size-">
          Узнаете как создать аккаунт и редактировать профиль
        </div>
      </div>
      <div class="">
        <v-icon size="50px" icon="mdi-account-outline"/>
      </div>
    </div>
    <div class="absolute bottom-1 right-1 mr-[35px] mb-2.5">Подробнее <v-icon icon="mdi-chevron-right"/></div>
  </div>
</template>

<style scoped lang="scss">
.instruction {
  transition: 400ms;
  &:hover {
    box-shadow: 0 0 5px 0 #FFFFFF;
    scale: 101%;
  }
}
</style>
