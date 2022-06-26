/*
    ImportView'deki listeye göre düzenlenecek.
    Başlangıç süresi, bitiş süresi tutulabilir.
    circular progress'e uygun düzenle. => https://vuetifyjs.com/en/components/progress-circular/#usage
*/
const state = {
    itemSchema: {
        id: 0,
        startedAt: null,
        finishedAt: null,
        inProgress: true,
    },
    operations: [],
};

const getters = {
    getAll() {
        // const tempData = ;
        // const sortedData = tempData
        //     .sort((a, b) => (b.id < a.id ? -1 : 1))
        //     .filter((v, i) => i < 10);
        return state.operations;
    },
    getTotal() {
        return state.operations.length;
    },
};
const mutations = {
    newOperation(state, uniqueId) {
        const newItem = Object.assign({},state.itemSchema);
        newItem.id = uniqueId;
        newItem.startedAt = new Date();
        newItem.finishedAt = null;
        state.operations.push(newItem);
    },
    updateProgress(state, operationDto) {
        const itemToUpdate = state.operations.find((t) => t.id == operationDto.id);
        itemToUpdate.finishedAt = operationDto.finishedAt;
        itemToUpdate.inProgress = false;
        state.operations = state.operations;
    },
};

const actions = {
    startNewOperation({ commit }, uniqueId) {
        commit("newOperation",uniqueId);
    },
    finishOperation({ commit }, dto) {
        commit("updateProgress", dto);
    },
};

const operationsModule = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};

export default operationsModule;