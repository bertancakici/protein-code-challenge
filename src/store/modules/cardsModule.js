const state = {
    tableHeaders: [
        { text: 'ID', value: 'id', },
        { text: 'Unique Id', value: 'uid' },
        { text: 'Credit Card Number', value: 'credit_card_number' },
        { text: 'Expiry Date', value: 'credit_card_expiry_date' },
        { text: 'Card Type', value: 'credit_card_type' }
    ],
    cards: [],
    tblData: {},
    groupedData: {}
};

const getters = {
    getAll(state) {
        return state.cards;
    },
    getTableHeaders(state) {
        return state.tableHeaders;
    },
    listViewData(state) {
        return state.tblData;
    },
    getGroupedData(state) {
        return state.groupedData;
    }
};

const mutations = {
    addCards(state, cardArr) {
        state.cards = cardArr;
    },
    setTblData(state,dto) {
        state.tblData = dto;

    },
    insertGroupedData(state, data){
        state.groupedData = data;
    }

};

const actions = {
    insertCards({ commit }, dataArr) {
        commit("addCards", dataArr);
    },
    setListViewData({ commit }, pagedData) {
        commit("setTblData", pagedData);
    },
    setGroupedData({commit}, groupedDataArr){
        commit("insertGroupedData", groupedDataArr);
    }

};

const cardsModule = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default cardsModule;