<script setup lang="ts">

import lightCard1 from '~/assets/img/AboutCourses/LightCard1.svg';
import darkCard1 from '~/assets/img/AboutCourses/DarkCard1.svg';
import lightCard2 from '~/assets/img/AboutCourses/LightCard2.svg';
import darkCard2 from '~/assets/img/AboutCourses/DarkCard2.svg';
import lightCard3 from "~/assets/img/AboutCourses/LightCard3.svg";
import darkCard3 from "~/assets/img/AboutCourses/DarkCard3.svg";

const isDark = useDark();
</script>

<template>
  <div class="flex gap-5 flex-col md:flex-row">
    <AboutCoursesCardItem
      :img="isDark ? darkCard1 : lightCard1"
    >
      <template v-slot:title>
        Курсы от лучших авторов — всё в одном месте
      </template>
      <template v-slot:text>
        Учись у тех, кто делает результат, а не просто рассказывает о нём Мы
        собрали для тебя сильные образовательные программы от проверенных
        экспертов — практиков, которые знают, как применить знания в реальной
        работе. Ты найдёшь курсы по аналитике, дизайну, маркетингу,
        программированию и другим востребованным направлениям. Все курсы
        проходят модерацию, чтобы ты получал только качественный и актуальный
        контент. Хочешь прокачать конкретный навык или сменить профессию с нуля?
        Мы поможем подобрать подходящий курс. Учиться можно в удобное время, в
        удобном темпе — на твоих условиях.
      </template>
    </AboutCoursesCardItem><AboutCoursesCardItem
      :img="isDark ? darkCard2 : lightCard2"
    >
      <template v-slot:title>
        Обучение под ритм твоей жизни
      </template>
      <template v-slot:text>
        Ты выбираешь, как и когда учиться
        Каждый обучается по-своему — и мы это учли.
        На платформе доступны разные форматы: видеоуроки, текстовые инструкции, задания с обратной связью, вебинары. Хочешь погружаться с ноутбука дома — отлично. Нужно учиться в дороге — всё под рукой в мобильной версии.
        Темы курсов тоже разнообразны — от технических навыков до креативных профессий и soft skills.
        Благодаря фильтрам и рекомендациям ты быстро найдёшь то, что нужно именно тебе.
        Никакого давления и дедлайнов — только комфорт и польза.
      </template>
    </AboutCoursesCardItem>
    <AboutCoursesCardItem
      :img="isDark ? darkCard3 : lightCard3"
    >
      <template v-slot:title>
        Всё, что тебе нужно — это начать
      </template>
      <template v-slot:text>
        Остальное мы уже сделали за тебя
        Платформа устроена как удобный маркетплейс: авторы загружают свои программы, а ты просто выбираешь, что подходит.
        Интерфейс интуитивный — легко разобраться, даже если раньше не проходил онлайн-обучение. Быстрая регистрация, мгновенная оплата, доступ с любого устройства.
        Ты можешь ставить цели, отслеживать прогресс и возвращаться к материалам в любое время.
        Поддержка всегда на связи, отзывы открыты, всё прозрачно.
        Фокус на обучении, а не на технических сложностях — мы позаботились о твоём удобстве.
      </template>
    </AboutCoursesCardItem>
  </div>
</template>

<style scoped lang="scss"></style>
