/*
    + ImportView'deki listeye göre düzenlenecek.
    + Başlangıç süresi, bitiş süresi tutulabilir.
    + circular progress'e uygun düzenle. => https://vuetifyjs.com/en/components/progress-circular/#usage
    - Ne kadar sürede tamamlandığı düzenlenecek. (review'de yap.)
*/
const state = {
    operations: []
};

const getters = {
    getAll() {
        return state.operations.sort((a, b) => (b.id < a.id ? -1 : 1))
        .filter((v, i) => i < 10);;
    },
    getTotal() {
        return state.operations.length;
    },
};

const mutations = {
    newOperation(state, uniqueId) {
        // order'landiği için ilk item son object oluyor.
        const lastItemId = state.operations[0]?.id ?? 0 ;
        // console.log(lastItemId);
        const newItem = {
            id : lastItemId + 1,
            uid: uniqueId,
            startedAt : new Date(),
            finishedAt : null,
            inProgress:true
        }
        state.operations.push(newItem);
    },
    updateProgress(state, operationDto) {
        const itemToUpdate = state.operations.find((t) => t.uid == operationDto.uid);
        itemToUpdate.finishedAt = operationDto.finishedAt;
        itemToUpdate.inProgress = false;
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