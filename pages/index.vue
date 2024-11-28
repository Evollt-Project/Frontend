<script setup lang="ts">
definePageMeta({
  name: "index",
});

useHead({
  title: "Evollt School | Главная",
});
</script>

<template>
  <div class="container mx-auto">
    <div class="grid gap-16">
      <Intro />

      <ArticleDiscountList />
    </div>

    <!-- <div class="grid gap-[20px] mt-5 grid-cols-3 auto-rows-fr"> -->
    <!--   <ArticleCard -->
    <!--     :article="{ -->
    <!--       id: 1, -->
    <!--       title: -->
    <!--         'Hello ofwejfoij ejiof joejfo ijeo jeofjeowjf oje oewjfoiwe jowj wo jweoifjewojo j oij ojefoijewojf', -->
    <!--       author: User.store.user, -->
    <!--       photo: -->
    <!--         'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/SQL_2019_Webpage_illustration_RE4r3wO:VP1-539x400?resMode=sharp2&op_usm=1.5,0.65,15,0&qlt=75', -->
    <!--       students_complete: '100', -->
    <!--       time: '92', -->
    <!--       rate: '5', -->
    <!--       price: 5000, -->
    <!--     }" -->
    <!--   /> -->
    <!--   <ArticleCard -->
    <!--     :article="{ -->
    <!--       id: 1, -->
    <!--       title: 'Hello', -->
    <!--       author: User.store.user, -->
    <!--       photo: -->
    <!--         'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/SQL_2019_Webpage_illustration_RE4r3wO:VP1-539x400?resMode=sharp2&op_usm=1.5,0.65,15,0&qlt=75', -->
    <!--       students_complete: '100', -->
    <!--       time: '92', -->
    <!--       rate: '5', -->
    <!--       price: 5000, -->
    <!--     }" -->
    <!--   /> -->
    <!--   <ArticleCard -->
    <!--     :article="{ -->
    <!--       id: 1, -->
    <!--       title: 'Hello', -->
    <!--       author: User.store.user, -->
    <!--       photo: -->
    <!--         'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/SQL_2019_Webpage_illustration_RE4r3wO:VP1-539x400?resMode=sharp2&op_usm=1.5,0.65,15,0&qlt=75', -->
    <!--       students_complete: '100', -->
    <!--       time: '92', -->
    <!--       rate: '5', -->
    <!--       price: 5000, -->
    <!--     }" -->
    <!--   /> -->
    <!-- </div> -->
  </div>
</template>

<style scoped></style>
