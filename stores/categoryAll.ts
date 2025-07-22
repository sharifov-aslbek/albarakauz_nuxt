import { defineStore } from "pinia";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRuntimeConfig } from "#app";
import axios from "axios"; // ✅ AXIOSNI QO‘SHDIK
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // ⚠️ kerak bo‘lsa import qilish esdan chiqmasin

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
        const response = await axios.get(
          `${apiBase}/${locale.value}/category/all`
        );

        console.log("locale.value", locale.value);

        if (response.data?.data) {
          categoryData.value = response.data.data;
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
  // {
    // persist: {
    //   storage: piniaPluginPersistedstate.localStorage(),
    //   paths: ["categoryData"],
    // },
  // }
);
