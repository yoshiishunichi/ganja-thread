<template>
  <div class="container">
    <h1>無意味なことを書く掲示板</h1>
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
    <div class="post-form">
      <p class="name-holder">
        <input
          v-model="newName"
          class="name-input"
          type="text"
          :placeholder="defaultName"
        />
      </p>
      <p class="text-holder">
        <textarea
          v-model="newText"
          class="text-input"
          type="text"
          @click="notAttention"
        />
      </p>
      <p class="button-holder">
        <button class="button" @click="addThread">投稿</button>
      </p>
      <p v-if="notText" class="attention">本文を入力してください！</p>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase'

export default {
  data() {
    return {
      newName: '',
      defaultName: '名無し',
      newText: '',
      notText: false,
    }
  },
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
    addThread() {
      let name = this.newName
      this.newText = this.newText.replace(/(^\s+)|(\s+$)/g, '')
      if (!this.newName) {
        name = this.defaultName
      }
      if (this.newText) {
        const text = this.newText
        const postedAt = firebase.firestore.Timestamp.fromDate(new Date())

        this.$store.dispatch('addThread', { name, text, postedAt })
        this.newText = ''
      } else {
        this.notText = true
      }
    },
    notAttention() {
      this.notText = false
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
  word-wrap: break-word;
}

h1 {
  font-size: 30px;
  padding-top: 24px;
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

.post-form {
  background: #ccc;
  width: 30%;
  max-width: 250px;
  min-width: 200px;
  position: fixed;
  z-index: 100;
  opacity: 0.9;
  right: 12px;
  bottom: 21px;
  height: 280px;
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

.name-holder {
  text-align: left;
  margin-top: 18px;
  margin-bottom: 18px;
  margin-left: 12px;
}

.text-holder {
  text-align: left;
  margin-left: 12px;
}

.button-holder {
  margin: 9px auto;
}

.name-input,
.text-input,
.button {
  outline: none;
  border-radius: 5px;
}

.name-input {
  height: 24px;
  width: 70%;
  padding-left: 3px;
  border-width: 1px;
}

.text-input {
  height: 150px;
  width: 97%;
  padding-left: 3px;
  resize: none;
}

.button {
  width: 40%;
  cursor: pointer;
  border: 1px #333 solid;
  background: #3b8070;
  color: white;
  font-weight: bold;
}

.button:hover {
  opacity: 0.7;
}

.attention {
  color: red;
  font-weight: bold;
  font-size: 15px;
}
</style>
