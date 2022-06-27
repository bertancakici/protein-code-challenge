<template>
  <v-simple-table dark>
    <template v-slot:default>

      <thead>
        <tr>
          <th class="text-left">
            Card Type
          </th>
          <th class="text-left">
            Transaction Amount
          </th>
        </tr>
      </thead>

      <tbody>

        <template v-if="!groupedData.items">
          <tr>
            <td colspan="2" class="text-center"> [no-data]</td>
          </tr>
        </template>

        <template v-else>
          <tr v-for="(cardDetail, index) in groupedData.items" :key="index">
            <td>{{ cardDetail.cardType }}</td>
            <td>{{ cardDetail.transactionAmount }}</td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td class="text-right"> Total :</td>
          <td> {{ groupedData.totalRecords }}</td>
        </tr>
      </tfoot>
    </template>
  </v-simple-table>
</template>

<script>
import worker from '/public/worker'
import { mapGetters } from 'vuex'

export default {
  async mounted() {
    const message = {
      method: "getAnalyzePageData"
    }
    await worker.postMessage(JSON.stringify(message));
  },
  computed: {
    ...mapGetters({
      groupedData: "cardsModule/getGroupedData"
    })
  }
}
</script>
