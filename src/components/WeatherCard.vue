<script setup>
defineProps({
  data: Object,
})
</script>

<template>
  <el-card v-if="data">
    <div class="card-title">天氣 · {{ data.district }}</div>
    <div class="weather-main">
      <span class="temp">{{ data.temp }}°</span>
      <span class="desc">{{ data.desc }}</span>
    </div>
    <div class="weather-details">
      <div class="detail-item">
        <span class="label">體感</span>
        <span class="value">{{ data.feelsLike }}°</span>
      </div>
      <div class="detail-item">
        <span class="label">降雨</span>
        <span class="value">{{ data.rainProb }}%</span>
      </div>
      <div class="detail-item">
        <span class="label">濕度</span>
        <span class="value">{{ data.humidity }}%</span>
      </div>
      <div class="detail-item">
        <span class="label">UV</span>
        <span class="value">{{ data.uvIndex }}</span>
      </div>
      <div class="detail-item">
        <span class="label">風速</span>
        <span class="value">{{ data.windSpeed }} m/s {{ data.windDir }}</span>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.weather-main {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 16px;
}

.temp {
  font-size: 48px;
  font-weight: 300;
  line-height: 1;
}

.desc {
  font-size: 16px;
  color: #666;
}

.weather-details {
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
