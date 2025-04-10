<script setup lang="ts">
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await User.approveEmail({
    id: Number(route.query["id"]),
    hash: String(route.query["hash"]),
    signature: String(route.query["signature"]),
    expires: String(route.query["expires"]),
  }).then((response) => {
    if (!response.data.token) {
      router.push({
        name: "index",
      });
      return;
    }
    localStorage.setItem("token", response.data.token);

    router
      .push({
        name: "profile",
      })
      .then(() => {
        window.location.reload();
      });
  });
});
</script>

<template></template>
