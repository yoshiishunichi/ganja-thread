import firebase from '~/plugins/firebase'

const db = firebase.firestore()
const threadsRef = db.collection('threads')

export const state = () => ({
  postedAt: new Date(),
  name: '',
  text: '',
  threads: [],
})

export const mutations = {
  setName(state, name) {
    state.name = name
  },
  setText(state, text) {
    state.text = text
  },
  setTime(state) {
    state.postedAt = Date.now()
  },
  addThread(state, thread) {
    state.threads.push(thread)
  },
}

export const actions = {
  fetchNewStatus({ commit }) {
    threadsRef
      .orderBy('postedAt')
      .get()
      .then((res) => {
        res.forEach((doc) => {
          console.log('success :' + `${doc.id} => ${doc.data()}`)
          commit('addThread', doc.data())
        })
      })
      .catch((err) => {
        console.log('error :' + err)
      })
  },
}

export const getters = {
  getName(state) {
    return state.name
  },
  getText(state) {
    return state.text
  },
  getTime(state) {
    return state.postedAt
  },
  getThreads(state) {
    return state.threads
  },
}
