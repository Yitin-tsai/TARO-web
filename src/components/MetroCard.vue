<script setup>
defineProps({
  data: Object,
})
</script>

<template>
  <el-card v-if="data">
    <div class="card-title">
      捷運 · {{ data.station }}
      <span class="distance">{{ data.distanceMeters }}m</span>
    </div>

    <div class="exit-info" v-if="data.nearestExit">
      最近出口：{{ data.nearestExit.exitName }}
      <span v-if="data.nearestExit.elevator" class="elevator-badge">電梯</span>
    </div>

    <div class="directions">
      <div v-for="dir in data.directions" :key="dir.lineId + '-' + dir.direction" class="direction-group">
        <div class="line-header">
          <span class="line-dot" :style="{ background: dir.color }"></span>
          <span class="line-name">{{ dir.lineName }}</span>
        </div>
        <div class="trains">
          <div v-for="(train, i) in dir.trains" :key="i" class="train-item">
            <span class="dest">{{ train.destination }}</span>
            <span class="wait" :class="{ soon: train.waitMin <= 3 }">
              {{ train.waitMin }} 分
            </span>
          </div>
          <div v-if="!dir.trains || dir.trains.length === 0" class="no-train">暫無班次</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.distance {
  font-size: 12px;
  color: #999;
  font-weight: 400;
}

.exit-info {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}

.elevator-badge {
  display: inline-block;
  background: #e6f7ff;
  color: #1890ff;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  margin-left: 4px;
}

.directions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.line-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}

.line-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.line-name {
  font-size: 14px;
  font-weight: 500;
}

.trains {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 16px;
}

.train-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.dest {
  color: #555;
}

.wait {
  font-weight: 500;
  color: #333;
}

.wait.soon {
  color: #f5222d;
}

.no-train {
  font-size: 13px;
  color: #ccc;
}
</style>
