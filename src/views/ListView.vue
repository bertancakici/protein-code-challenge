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
        <template v-if="!pagedData.items">
          <tr>
            <td colspan="3" class="text-center"> [no-data]</td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="card in pagedData.items" :key="card.id">
            <td>{{ card.credit_card_number }}</td>
            <td>{{ card.credit_card_type }}</td>
            <td>{{ card.credit_card_expiry_date }}</td>
          </tr>
        </template>
      </tbody>

      <tfoot>
        <div class="text-center">
          <v-pagination @input="getActivePageData" v-model="pagedData.activePage" :length="pagedData.totalPage">
          </v-pagination>

          <!-- <v-pagination v-model="pagedData.activePage" :length="pagedData.totalPage">
          </v-pagination> -->
        </div>
      </tfoot>

    </template>

  </v-simple-table>
</template>

<script>
import worker from "/public/worker"
import { mapGetters } from "vuex"; // mapState

export default {
  async mounted() {
    const message = {
      method: "getPagedData",
      params: {
        activePage: 0
      }
    };
    await worker.postMessage(JSON.stringify(message));
  },
  computed: {
    ...mapGetters({
      pagedData: "cardsModule/listViewData"
    })
   
  },
  methods: {
      getActivePageData(e) {
        const message = {
          method: "getPagedData",
          params: {
            activePage: e
          }
        };
        worker.postMessage(JSON.stringify(message));
      }
    }
};
</script>

