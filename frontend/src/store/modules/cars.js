const state = {
  cars: null,
  car: null
}
const mutations = {
  carsList (state, data) {
    if (typeof data === 'object') {
      state.cars = data
    }
  },
  carDetails (state, data) {
    if (typeof data === 'object') {
      state.car = data
    }
  }
}
const actions = {
  setCarsList ({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const list = await this.$http.get('/')
        commit('carsList', list.data)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  },
  sort ({ commit }, flag) {
    return new Promise(async (resolve, reject) => {
      try {
        const list = await this.$http.get(`/sort/${flag}`)
        commit('carsList', list.data)
        resolve(true)
      } catch (error) {
        reject(error)
      }
    })
  },
  setCarDetails ({ commit }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const details = await this.$http.get(`/${id}`)
        commit('carDetails', details.data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
