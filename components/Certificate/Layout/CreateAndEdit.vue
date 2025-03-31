<script lang="ts" setup>
import { ref, reactive, onMounted, type CSSProperties } from "vue";
import type { ICertificateTypePosition } from "~/types/ICertificate";

defineProps<{
  blocks: ICertificateTypePosition[];
}>();
const emits = defineEmits(["path"]);

const imageUrl = ref<string | null>(null);

const state = reactive({
  dragData: {
    logo: { offsetX: 0, offsetY: 0 },
    title: { offsetX: 0, offsetY: 0 },
    date: { offsetX: 0, offsetY: 0 },
  },
  currentDrag: null as ICertificateTypePosition | null,
});

const editor = ref<HTMLElement | null>(null);
const config = useRuntimeConfig();
const image = ref<HTMLImageElement | null>(null);
const fileInput: Ref<HTMLInputElement | null> = ref(null);

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    imageUrl.value = URL.createObjectURL(file);
    emits("path", file);
  }
}

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer) {
    const file = event.dataTransfer.files[0];
    if (file) {
      imageUrl.value = URL.createObjectURL(file);
      emits("path", file);
    }
  }
};

function blockStyle(block: ICertificateTypePosition): CSSProperties {
  return {
    position: "absolute" as "absolute",
    left: `${block.x}px`,
    top: `${block.y}px`,
    color: block.color,
    fontSize: `${block.size}px`,
    padding: "5px",
    background: "rgba(0, 123, 255, 0.5)",
    cursor: "move",
  };
}

function startDrag(block: ICertificateTypePosition, event: MouseEvent) {
  state.currentDrag = block;
  // @ts-ignore
  state.dragData[block.type].offsetX = event.clientX - block.x;
  // @ts-ignore
  state.dragData[block.type].offsetY = event.clientY - block.y;
  document.addEventListener("mousemove", (e) => onDrag(e, block.type));
  document.addEventListener("mouseup", stopDrag);
}

function onDrag(event: MouseEvent, reference: string = "") {
  if (state.currentDrag && editor.value && image.value) {
    const rect = image.value.getBoundingClientRect();
    const dragType = state.currentDrag.type;
    const block = state.currentDrag;

    const newX = event.clientX - state.dragData[dragType].offsetX;
    const newY = event.clientY - state.dragData[dragType].offsetY;
    const newBlock = document.getElementById(`block-${reference}`);

    block.x = Math.min(
      Math.max(newX, 0),
      rect.width - (newBlock?.offsetWidth ?? 1)
    );
    block.y = Math.min(
      Math.max(newY, 0),
      rect.height - (newBlock?.offsetHeight ?? 1)
    );
  }
}

function stopDrag() {
  state.currentDrag = null;
  document.removeEventListener("mousemove", onDrag);
  document.removeEventListener("mouseup", stopDrag);
}
</script>

<template>
  <div class="editor-container">
    <input
      type="file"
      ref="fileInput"
      class="hidden"
      @change="onFileChange"
      accept="image/*"
    />

    <div
      class="upload-area w-full h-48"
      @click="triggerFileInput"
      @dragover.prevent
      @drop="handleDrop"
    >
      Перетащите или выберите фотографию
    </div>

    <div v-if="imageUrl" class="image-editor" ref="editor">
      <img :src="imageUrl" ref="image" class="uploaded-image" />

      <div
        v-for="block in blocks"
        :style="blockStyle(block)"
        :id="`block-${block.type}`"
        class="draggable-block"
        @mousedown="(event) => startDrag(block, event)"
      >
        <div v-if="block.type == 'logo'">
          {{ config.public.app_name }}
        </div>
        <div v-if="block.type == 'title'">Иванов Иван Иванович</div>
        <div v-if="block.type == 'date'">dd.mm.yyyy</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editor-container {
  .logo__title {
    font-family: var(--logoFont);
  }

  .image-editor {
    position: relative;
    display: inline-block;
    margin-top: 20px;
  }
  .uploaded-image {
    max-width: 100%;
    user-select: none;
    pointer-events: none;
    height: auto;
  }
  .draggable-block {
    position: absolute;
    font-weight: bold;
    border: 1px solid white;
    border-radius: 4px;
    text-align: center;
    user-select: none;
  }

  .upload-area {
    width: 100%;
    height: 200px;
    border: 2px dashed #ddd;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #666;
    cursor: pointer;
    text-align: center;
  }
}
</style>
