/*
    ImportView'deki listeye göre düzenlenecek.
    Başlangıç süresi, bitiş süresi tutulabilir.
    circular progress'e uygun düzenle. => https://vuetifyjs.com/en/components/progress-circular/#usage
*/
const state = {
    operations: [{
            id: 1,
            text: "Real-Time",
            icon: "mdi-clock",
            startedAt: "DateTime",
            finishedAt: "DateTime",
            inProgress: true,
        },
        {
            id: 2,
            text: "Audience",
            icon: "mdi-account",
            startedAt: "DateTime",
            finishedAt: "DateTime",
            inProgress: true,
        },
        {
            id: 3,
            text: "Conversions",
            icon: "mdi-flag",
            startedAt: "DateTime",
            finishedAt: "DateTime",
            inProgress: true,
        },
    ],
};

const getters = {
    getAll() {
        return state.operations
            .sort((a, b) => (b.id < a.id ? -1 : 1))
            .filter((v, i) => i < 10);
    },
    getTotal() {
        return state.operations.length;
    },
};
const mutations = {
    addOperation(state, operation) {
        state.operations.push(operation);
    },
};

const actions = {
    insertOperation({ commit }, operationItem) {
        commit("addOperation", operationItem);
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