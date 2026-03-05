<script setup>
defineProps({
  data: Object,
})
</script>

<template>
  <el-card v-if="data && data.stops && data.stops.length > 0">
    <template v-for="stop in data.stops" :key="stop.stationName">
      <div class="card-title">
        公車 · {{ stop.stationName }}
        <span class="distance">{{ stop.distanceMeters }}m</span>
      </div>

      <div class="routes">
        <div
          v-for="route in stop.routes"
          :key="route.routeName + '-' + route.direction"
          class="route-item"
          :class="{ inactive: route.status !== '正常' }"
        >
          <span class="route-name">{{ route.routeName }}</span>
          <span class="route-dest">{{ route.destination }}</span>
          <span class="route-eta" v-if="route.status === '正常' && route.estimateMin != null">
            <template v-if="route.estimateMin <= 1">即將到站</template>
            <template v-else>{{ route.estimateMin }} 分</template>
          </span>
          <span class="route-status" v-else>{{ route.status }}</span>
        </div>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.distance {
  font-size: 12px;
  color: #999;
  font-weight: 400;
}

.routes {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.route-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  padding: 4px 0;
}

.route-item.inactive {
  opacity: 0.45;
}

.route-name {
  font-weight: 600;
  min-width: 60px;
  color: #1890ff;
}

.route-dest {
  flex: 1;
  color: #666;
  font-size: 13px;
}

.route-eta {
  font-weight: 500;
  color: #52c41a;
  white-space: nowrap;
}

.route-status {
  color: #999;
  font-size: 13px;
  white-space: nowrap;
}
</style>
