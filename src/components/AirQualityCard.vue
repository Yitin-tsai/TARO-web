<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: Object,
})

const aqiColor = computed(() => {
  if (!props.data) return '#999'
  const aqi = props.data.aqi
  if (aqi <= 50) return '#52c41a'
  if (aqi <= 100) return '#faad14'
  if (aqi <= 150) return '#fa8c16'
  if (aqi <= 200) return '#f5222d'
  if (aqi <= 300) return '#722ed1'
  return '#820014'
})
</script>

<template>
  <el-card v-if="data">
    <div class="card-title">空氣品質 · {{ data.station }}</div>
    <div class="aqi-main">
      <span class="aqi-value" :style="{ color: aqiColor }">{{ data.aqi }}</span>
      <span class="aqi-status" :style="{ color: aqiColor }">{{ data.status }}</span>
    </div>
    <div class="aqi-details">
      <div class="detail-item">
        <span class="label">PM2.5</span>
        <span class="value">{{ data.pm25 }}</span>
      </div>
      <div class="detail-item">
        <span class="label">PM10</span>
        <span class="value">{{ data.pm10 }}</span>
      </div>
      <div class="detail-item">
        <span class="label">O₃</span>
        <span class="value">{{ data.o3 }}</span>
      </div>
      <div class="detail-item" v-if="data.mainPollutant">
        <span class="label">主要污染物</span>
        <span class="value">{{ data.mainPollutant }}</span>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.aqi-main {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
}

.aqi-value {
  font-size: 48px;
  font-weight: 300;
  line-height: 1;
}

.aqi-status {
  font-size: 16px;
  font-weight: 500;
}

.aqi-details {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
}

.detail-item {
  display: flex;
  gap: 6px;
  font-size: 14px;
}

.detail-item .label {
  color: #999;
}

.detail-item .value {
  font-weight: 500;
}
</style>
