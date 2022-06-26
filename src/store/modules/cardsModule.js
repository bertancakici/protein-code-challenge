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
    setTblData(state,dto) {
        // const startIndex = pageNumber * 10;
        // const endIndex = startIndex == 0 ? 9 : ((pageNumber + 1) * 10) - 1;
        // const pagedData = {
        //     items: state.cards.slice(startIndex, endIndex),
        //     totalPage: state.cards.length / 10 - 1,
        //     totalRecords: state.cards.length,
        //     activePage: pageNumber == 0 ? 1 : pageNumber,
        //     pageSize: 10
        // }

        state.tblData = dto;

    },
};

const actions = {
    insertCards({ commit }, dataArr) {
        commit("addCards", dataArr);
    },
    setListViewData({ commit }, pagedData) {
        commit("setTblData", pagedData);
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