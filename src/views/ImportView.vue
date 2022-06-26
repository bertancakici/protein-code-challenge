<template>
  <v-row>
    <v-col sm="12">
      <v-sheet rounded="lg">
        <!--  -->
        <div class="text-center">
          <v-btn elevation="2" @click="importData" class="mt-5">
            Import Data</v-btn
          >
        </div>

        <v-virtual-scroll :items="operations" height="500" item-height="64">
          <template v-slot:default="{ item }">
            <v-list-item :key="item.id">
              <v-list-item-action>
                <v-btn fab small depressed color="primary">
                  {{ item.id }}
                </v-btn>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  <!-- {{ item.text }} -->
                    Started/Finished At {{ item.startedAt }}  <br>
                    <strong> transaction time: calculate</strong>
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <template v-if="item.inProgress">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </template>
                <template v-else>
                    <v-icon style="color:green;" large> mdi-checkbox-marked-circle </v-icon>
                </template>
              </v-list-item-action>
            </v-list-item>

            <v-divider></v-divider>
          </template>
        </v-virtual-scroll>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import worker from "/public/worker";

// import { getData, insertCards } from "/public/worker-api";

export default {
  data() {
    return {
      requestUrl:
        "https://random-data-api.com/api/business_credit_card/random_card?size=100",
    };
  },
  computed: {
    ...mapGetters({
      operations: "operationsModule/getAll",
      totalOps: "operationsModule/getTotal",
    }),
  },
  methods: {
    ...mapActions({
      createOperation: "operationsModule/insertOperation",
    }),
    async importData() {
      worker.postMessage("getData");
      /*
        Gerektiği yerde akışı düzenle
        1- Başlangıç Zamanını Al,
        2- State'e operasyonu ekle.
        3- Verileri çek. (error varsa handle et)
        4- Db'deki cards tablosuna yaz.
        5- Bitiş zamanını tut.
        6- Operasyonlar State'ini güncelle.
      */

      // progress için düzenleme gerekiyor.
      // const response = await getData(this.requestUrl);
      // if (response.succeded) {
      //   const dataArr = response.data;
      //   const insertCardResult = await insertCards(dataArr);
      //   // console.log(insertCardResult, "insertCardResult");
      //   if (insertCardResult) {
      //     // state güncelle.
      //   }
      // }
    },
    newOperation() {
      const item = {
        id: this.totalOps + 1,
        text: "Real-Time",
        icon: "mdi-clock",
      };
      this.createOperation(item);
    },
  },
};
</script>
