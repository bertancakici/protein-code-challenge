import Vue from 'vue'
import Vuex from 'vuex'

// modules
import operationsModule from "./modules/operationsModule"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        operationsModule
    }
})
export default store;