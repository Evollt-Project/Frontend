<script setup lang="ts">
definePageMeta({
  layout: "course-sidebar",
  name: "course",
});
const router = useRouter();
onBeforeMount(() => {
  router.push({
    name: "course-content",
  });
});
</script>
