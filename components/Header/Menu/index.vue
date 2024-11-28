<script setup lang="ts">
const catalogModal = ref(false);
const router = useRouter();
</script>

<template>
  <div class="flex gap-5">
    <div>
      <div
        variant="outline"
        @click="catalogModal = true"
        class="bg-transparent cursor-pointer"
      >
        Каталог
      </div>
      <ModalsCatalog
        :dialog="catalogModal"
        @dialog="(e) => (catalogModal = e)"
      />
    </div>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <div class="cursor-pointer">Веб-разработка</div>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem
              class="cursor-pointer"
              @click="
                router.push({
                  name: 'profession',
                  params: { tag: 'frontend' },
                })
              "
            >
              <span>Frontend разработчик</span>
              <DropdownMenuShortcut>
                <v-icon icon="mdi-application-outline"></v-icon>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
              class="cursor-pointer"
              @click="
                router.push({ name: 'profession', params: { tag: 'backend' } })
              "
            >
              <span>Backend разработчик</span>
              <DropdownMenuShortcut>
                <v-icon icon="mdi-server-outline"></v-icon>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>
