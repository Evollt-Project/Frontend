<script setup lang="ts">
import { ChevronRight } from "lucide-vue-next";
import type { ICollapsibleSidebarItem } from "~/types/ISidebarItem";
import { useSidebar } from "~/components/ui/sidebar/utils";
import { useWindowSize } from "@vueuse/core";
import type { RouteParamsRawGeneric } from "vue-router";

defineProps<{
  item: ICollapsibleSidebarItem;
}>();
const router = useRouter();
const { width } = useWindowSize();
const { toggleSidebar } = useSidebar();

const routeTo = (item: { url?: string; params?: RouteParamsRawGeneric }) => {
  if (width.value < 770) {
    toggleSidebar();
  }
  if (item.url) {
    router.push({ name: item.url, params: item.params });
  }
};
</script>

<template>
  <Collapsible
    v-if="item.items && item.items.length > 0"
    :key="item.title"
    as-child
    :default-open="item.isActive"
    class="group/collapsible"
  >
    <SidebarMenuItem>
      <CollapsibleTrigger as-child>
        <SidebarMenuButton :tooltip="item.title">
          <v-icon :icon="item.icon"></v-icon>
          <span>{{ item.title }}</span>
          <ChevronRight
            class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
          />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          <SidebarMenuSubItem
            v-for="subItem in item.items"
            :key="subItem.title"
          >
            <SidebarMenuSubButton as-child>
              <span class="cursor-pointer" @click="routeTo(subItem)">{{
                subItem.title
              }}</span>
            </SidebarMenuSubButton>
          </SidebarMenuSubItem>
        </SidebarMenuSub>
      </CollapsibleContent>
    </SidebarMenuItem>
  </Collapsible>
  <SidebarMenuItem v-else>
    <SidebarMenuButton :tooltip="item.title" @click="routeTo(item)">
      <v-icon :icon="item.icon"></v-icon>
      <span>{{ item.title }}</span>
    </SidebarMenuButton>
  </SidebarMenuItem>
</template>

<style scoped lang="scss"></style>
