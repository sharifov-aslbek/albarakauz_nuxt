import { defineStore } from "pinia";
import { ref } from "vue";
import { useRuntimeConfig } from "#app";
import { useI18n } from "vue-i18n";

export const useCategoryStore = defineStore(
  "categoryStore",
  () => {
    const config = useRuntimeConfig();
    const apiBase = config.public.NUXT_PUBLIC_BACKEND_URL;

    const { locale } = useI18n();

    const product = ref<any>(null);
    const categoryData = ref<any>(null);
    const onecategoryData = ref<any>(null);
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

    const getOneCategory = async (id: number) => {
      try {
        const res = await fetch(
          `${apiBase}/${locale.value}/category/retrieve?id=${id}`
        );
        const json = await res.json();

        if (json?.data) {
          onecategoryData.value = json.data;
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
      getOneCategory,
      onecategoryData,
    };
  },
  {
    // persist: {
    //   storage: piniaPluginPersistedstate.localStorage(),
    //   paths: ['categoryData']
    // }
  }
);
