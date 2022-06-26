<template>
  <v-simple-table dark>

    <template v-slot:default>

      <thead>
        <tr>
          <th class="text-left">
            card number
          </th>
          <th class="text-left">
            card type
          </th>
          <th class="text-left">
            expiration date
          </th>
        </tr>
      </thead>

      <tbody>
        <template v-if="!getPagedData.items">
          <tr>
            <td colspan="3" class="text-center"> [no-data]</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="card in getPagedData.items" :key="card.id">
            <td>{{ card.credit_card_number }}</td>
            <td>{{ card.credit_card_type }}</td>
            <td>{{ card.credit_card_expiry_date }}</td>
          </tr>
        </template>
      </tbody>

      <tfoot>
        <div class="text-center">
          <v-pagination @input="getActivePageData" v-model="getPagedData.activePage" :length="getPagedData.totalPage">
          </v-pagination>
        </div>
      </tfoot>

    </template>

  </v-simple-table>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getPagedData: "cardsModule/getPagedData"
    })
  },
  methods: {
    ...mapActions({
      setTblData: "cardsModule/setTblData"
    }),
    getActivePageData(activePageNumb) {
      this.setTblData(activePageNumb);
    }
  }
};
</script>

