import Vue from 'vue'
import Vuex from 'vuex'

// modules
import operationsModule from "./modules/operationsModule"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        operationsModule
    }
})