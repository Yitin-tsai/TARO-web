<script setup>
defineProps({
  data: Array,
})
</script>

<template>
  <el-card v-if="data && data.length > 0" class="full-width">
    <div class="card-title">YouBike</div>
    <div class="stations">
      <div v-for="s in data" :key="s.stationNo" class="station-item">
        <div class="station-info">
          <span class="station-name">{{ s.name }}</span>
          <span class="station-dist">{{ s.distanceMeters }}m</span>
        </div>
        <div class="station-counts">
          <span class="bikes" :class="{ low: s.availableBikes <= 3 }">
            可借 {{ s.availableBikes }}
          </span>
          <span class="divider">/</span>
          <span class="slots" :class="{ low: s.emptySlots <= 3 }">
            可還 {{ s.emptySlots }}
          </span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.stations {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.station-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f5f5f5;
}

.station-item:last-child {
  border-bottom: none;
}

.station-info {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.station-name {
  font-size: 14px;
  font-weight: 500;
}

.station-dist {
  font-size: 12px;
  color: #999;
}

.station-counts {
  display: flex;
  gap: 6px;
  font-size: 14px;
}

.bikes {
  color: #52c41a;
  font-weight: 500;
}

.slots {
  color: #1890ff;
  font-weight: 500;
}

.bikes.low, .slots.low {
  color: #f5222d;
}

.divider {
  color: #ddd;
}
</style>
