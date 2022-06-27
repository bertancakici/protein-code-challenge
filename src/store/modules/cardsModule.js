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
    lastActivePage:0,
    groupedData: {},
    
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
    },
    getLastActivePage(state){
        return state.lastActivePage;
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
    },
    updateLastActivePage(state,num){
        state.lastActivePage = num;
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
    },
    setLastActivePage({commit},pageNumber){
        commit("updateLastActivePage", pageNumber);
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