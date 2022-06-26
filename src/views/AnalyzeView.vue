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

        <template v-if="!groupedData.length">
          <tr>
            <td colspan="2" class="text-center"> [no-data]</td>
          </tr>
        </template>

        <template v-else>
          <tr v-for="(cardDetail,index) in groupedData" :key="index">
            <td>{{ cardDetail.cardType }}</td>
            <td>{{ cardDetail.transactionAmount }}</td>
          </tr>
        </template>
      </tbody>

    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
  computed:{
    ...mapGetters({
      groupedData: "cardsModule/getGroupedData"
    })
  }
}
</script>
