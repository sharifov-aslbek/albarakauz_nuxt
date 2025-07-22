import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRuntimeConfig } from "#app";

export const useCategoryAllStore = defineStore(
  "categoryAllStore",
  () => {
    const { locale } = useI18n();
    const config = useRuntimeConfig();
    const apiBase = config.public.NUXT_PUBLIC_BACKEND_URL;
    const product = ref<any>(null);
    const categoryData = ref<any>(null);
    const title = ref("");
    const description = ref("");
    const image = ref("");
    const showCategory = ref(false);

    const getAllCategory = async () => {
      try {
        const res = await fetch(
          `${apiBase}/${locale.value}/category/all`
        );
        const json = await res.json();

        console.log("locale.value", locale.value);

        if (json?.data) {
          categoryData.value = json.data;
        } else {
          console.warn("APIdan data yo‘q");
        }
      } catch (e) {
        console.error("API error:", e);
      }
    };

    return {
      product,
      title,
      description,
      image,
      getAllCategory,
      categoryData,
      showCategory,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
      paths: ["categoryData"],
    },
  }
);
