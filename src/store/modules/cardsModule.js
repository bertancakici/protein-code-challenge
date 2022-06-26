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
    getAll() {
        return state.cards;
    },
    getTableHeaders() {
        return state.tableHeaders;
    },
    getPagedData() {
        return state.tblData;
    },
    getGroupedData() {
        const groupedData = [];
        state.cards.map((obj, i) => {
            var item = groupedData.find(t => t.cardType == obj.credit_card_type);
            if (typeof item == typeof undefined) {
                groupedData.push({
                    cardType: obj.credit_card_type,
                    transactionAmount: 1
                })
            } else
                item.transactionAmount += 1;
        });

        return groupedData;
    }
};

const mutations = {
    addCards(state, cardArr) {
        state.cards = cardArr;
    },
    setTblViewModel(state, pageNumber) {
        const startIndex = pageNumber * 10;
        const endIndex = startIndex == 0 ? 9 : ((pageNumber + 1) * 10) - 1;
        const pagedData = {
            items: state.cards.slice(startIndex, endIndex),
            totalPage: state.cards.length / 10 - 1,
            totalRecords: state.cards.length,
            activePage: pageNumber == 0 ? 1 : pageNumber,
            pageSize: 10
        }

        state.tblData = pagedData;

    },
};

const actions = {
    insertCards({ commit }, dataArr) {
        commit("addCards", dataArr);
    },
    setTblData({ commit }, activePage) {
        commit("setTblViewModel", activePage);
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