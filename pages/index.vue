<template>
  <div class="container">
    <h1>ganja_tuberについて語るスレ</h1>
    <div class="threads-container">
      <div
        v-for="(thread, index) in $store.getters.getThreads"
        :key="index"
        class="thread"
      >
        <div class="meta">
          <p class="num">No. {{ index + 1 }}</p>
          <p class="posted">
            投稿日: {{ getDateFormat(thread.postedAt.toDate()) }}
          </p>
        </div>
        <div class="content">
          <h3 class="name">名前: {{ thread.name }}さん</h3>
          <!-- eslint-disable vue/no-v-html -->
          <h2
            class="text"
            v-html="getDescription(thread.text.replaceAll('\\n', '\n'))"
          ></h2>
        </div>
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
    getDescription(text) {
      const splitDescription = text.split('\n')
      const brDescription = splitDescription.join('<br />')
      return brDescription
    },
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

.meta {
  overflow: hidden;
}

p {
  font-size: 15px;
}

.num {
  float: left;
  margin-left: 12px;
  margin-top: 12px;
}

.posted {
  float: right;
  margin-top: 12px;
  margin-right: 12px;
}

.content {
  clear: both;
  margin-left: 24px;
  margin-right: 12px;
  margin-top: 18px;
  text-align: left;
}

.name {
  font-size: 15px;
  font-weight: normal;
  text-decoration: underline;
  color: #666;
}

.text {
  font-size: 21px;
  margin-top: 9px;
  padding-bottom: 12px;
}
</style>
