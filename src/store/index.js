import Vue from 'vue'
import Vuex from 'vuex'

// modules
import operationsModule from "./modules/operationsModule"
import cardsModule  from "./modules/cardsModule"

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        operationsModule,
        cardsModule
    }
})
export default store;