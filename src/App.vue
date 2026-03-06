<script setup>
import { ref, onMounted } from 'vue'
import { Loading } from '@element-plus/icons-vue'
import { fetchDashboard } from './api/dashboard.js'
import WeatherCard from './components/WeatherCard.vue'
import AirQualityCard from './components/AirQualityCard.vue'
import MetroCard from './components/MetroCard.vue'
import BusCard from './components/BusCard.vue'
import YouBikeCard from './components/YouBikeCard.vue'

const FALLBACK_LAT = 25.0478
const FALLBACK_LNG = 121.5170

const COOLDOWN_SEC = 15

const loading = ref(true)
const error = ref(null)
const dashboard = ref(null)
const updatedAt = ref(null)
const refreshing = ref(false)
const cooldown = ref(0)
let cooldownTimer = null

function getLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: FALLBACK_LAT, lng: FALLBACK_LNG })
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve({ lat: FALLBACK_LAT, lng: FALLBACK_LNG }),
      { timeout: 5000 }
    )
  })
}

async function loadData() {
  try {
    error.value = null
    const { lat, lng } = await getLocation()
    const data = await fetchDashboard(lat, lng)
    dashboard.value = data
    updatedAt.value = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
  } catch (e) {
    error.value = e.message || '載入失敗'
  } finally {
    loading.value = false
    refreshing.value = false
  }
}

function startCooldown() {
  cooldown.value = COOLDOWN_SEC
  clearInterval(cooldownTimer)
  cooldownTimer = setInterval(() => {
    cooldown.value--
    if (cooldown.value <= 0) clearInterval(cooldownTimer)
  }, 1000)
}

async function refresh() {
  if (cooldown.value > 0 || refreshing.value) return
  refreshing.value = true
  startCooldown()
  await loadData()
}

onMounted(loadData)
</script>

<template>
  <div class="app-header">
    <h1>TARO<span class="sub">台北生活即時資訊</span></h1>
    <div class="header-right">
      <span v-if="updatedAt">{{ updatedAt }} 更新</span>
      <el-button size="small" :loading="refreshing" :disabled="cooldown > 0" @click="refresh">
        {{ cooldown > 0 ? cooldown + 's' : '重新整理' }}
      </el-button>
    </div>
  </div>

  <div v-if="loading" class="loading-container">
    <el-icon class="is-loading" :size="32"><Loading /></el-icon>
    <span>取得位置與資料中...</span>
  </div>

  <div v-else-if="error" class="error-container">
    <p>{{ error }}</p>
    <el-button @click="refresh">重試</el-button>
  </div>

  <div v-else class="dashboard-grid">
    <WeatherCard :data="dashboard?.weather" />
    <AirQualityCard :data="dashboard?.airQuality" />
    <MetroCard :data="dashboard?.metro" />
    <BusCard :data="dashboard?.bus" />
    <YouBikeCard :data="dashboard?.youbike" />
  </div>
</template>
