<template>
  <div class="container">
    <h1>ganja_tuberについて語るスレ</h1>
    <div class="threads-container">
      <div
        v-for="(thread, index) in $store.getters.getThreads"
        :key="index"
        class="thread"
      >
        <p>No. {{ index + 1 }}</p>
        <p>投稿日: {{ getDateFormat(thread.postedAt.toDate()) }}</p>
        <h3>名前: {{ thread.name }}さん</h3>
        <h2>{{ thread.text }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('fetchNewStatus')
  },
  methods: {
    getDateFormat(postedAt) {
      const year = postedAt.getFullYear()
      const month = postedAt.getMonth() + 1
      const date = postedAt.getDate()
      let hours = postedAt.getHours()
      if (hours <= 9) {
        hours = '0' + String(hours)
      }
      let minutes = postedAt.getMinutes()
      if (minutes <= 9) {
        minutes = '0' + String(minutes)
      }
      return `${year}/${month}/${date} ${hours}:${minutes}`
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  font-size: 30px;
  margin-top: 24px;
  margin-bottom: 24px;
  color: white;
}

.thread {
  background: white;
  margin-bottom: 12px;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  max-width: 1000px;
  border-radius: 15px;
}
</style>
