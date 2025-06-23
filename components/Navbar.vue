<template>
  <header class="bg-white shadow-sm py-3 px-4 md:px-8">
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center">
        <nuxt-link to="/" class="flex items-center">
          <div class="w-10 h-10 bg-emerald-400 rounded-md flex items-center justify-center mr-2">
            <!-- You can replace this with your actual logo -->
          </div>
          <span class="text-emerald-400 font-bold text-2xl">BOZOR</span>
        </nuxt-link>
      </div>

      <!-- Search and Catalog -->
      <div class="hidden md:flex items-center flex-1 mx-8">
        <el-button type="success" class="flex items-center bg-emerald-50 text-emerald-400 border-0 mr-2">
          <el-icon class="mr-1"><Grid /></el-icon>
          Katalog
        </el-button>
        <div class="flex flex-1 relative">
          <el-input
            v-model="searchQuery"
            placeholder="Kategoriya qidiring..."
            class="flex-1"
            size="large"
          />
          <el-button
            type="success"
            class="absolute right-0 h-full bg-emerald-400 hover:bg-emerald-500"
            size="large"
          >
            <el-icon><Search /></el-icon>
          </el-button>
        </div>
      </div>

      <!-- Icons -->
      <div class="flex items-center space-x-4">
        <el-badge :value="1" class="item">
          <el-button class="text-gray-700 border-0">
            <el-icon size="24"><Heart /></el-icon>
          </el-button>
        </el-badge>
        
        <el-button class="text-gray-700 border-0">
          <el-icon size="24"><User /></el-icon>
        </el-button>
        
        <el-badge :value="1" class="item">
          <el-button class="text-gray-700 border-0">
            <el-icon size="24"><ShoppingCart /></el-icon>
          </el-button>
        </el-badge>
      </div>
    </div>

    <!-- Mobile Search (visible only on small screens) -->
    <div class="md:hidden mt-3">
      <div class="flex items-center">
        <el-button type="success" class="flex items-center bg-emerald-50 text-emerald-400 border-0 mr-2">
          <el-icon><Grid /></el-icon>
        </el-button>
        <div class="flex flex-1 relative">
          <el-input
            v-model="searchQuery"
            placeholder="Kategoriya qidiring..."
            class="flex-1"
          />
          <el-button
            type="success"
            class="absolute right-0 h-full bg-emerald-400 hover:bg-emerald-500"
          >
            <el-icon><Search /></el-icon>
          </el-button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { Search, Grid, User, ShoppingCart } from '@element-plus/icons-vue';

const searchQuery = ref('');
</script>

<style scoped>
:deep(.el-input__wrapper) {
  border-radius: 4px;
  box-shadow: 0 0 0 1px #e5e7eb inset;
}

:deep(.el-button.is-text) {
  background-color: transparent;
}

:deep(.el-badge__content.is-fixed) {
  top: 8px;
  right: 8px;
  background-color: #f43f5e;
  border: none;
}
</style>