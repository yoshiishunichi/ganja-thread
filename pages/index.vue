<template>
  <div class="container">
    <h1>ganja_tuberについて語るスレ</h1>
    <div class="threads-container">
      <div v-for="(thread, index) in $store.getters.getThreads" :key="index">
        <p>No. {{ index + 1 }}</p>
        <p>{{ thread.postedAt.toDate() }}</p>
        <h3>{{ thread.name }}さん</h3>
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
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
</style>
