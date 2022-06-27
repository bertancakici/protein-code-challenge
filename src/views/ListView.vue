<template>
	<v-simple-table dark>
		<template v-slot:default>
			<thead>
				<tr>
					<th class="text-left">card number</th>
					<th class="text-left">card type</th>
					<th class="text-left">expiration date</th>
				</tr>
			</thead>

			<tbody>
				<template v-if="!pagedData.items">
					<tr>
						<td colspan="3" class="text-center">[no-data]</td>
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
					<v-pagination @input="getActivePageData" v-model="pagedData.activePage" :length="pagedData.totalPage"> </v-pagination>

					<!-- <v-pagination v-model="pagedData.activePage" :length="pagedData.totalPage">
          </v-pagination> -->
				</div>
			</tfoot>
		</template>
	</v-simple-table>
</template>

<script>
	import worker from "/public/worker";
	import { mapState } from "vuex";

	export default {
		data() {
			/*
	     View açıldığında kaldığı sayfadan devam etmek için kullanılır.
	     false 'a çekilirse, her sayfa açıldığında 1. sayfadan başlar.
	     datatable'daki State saving  mantığı ile çalışır.
	     => https://datatables.net/examples/basic_init/state_save.html
	    */
			return {
				saveActivePage: true,
			};
		},
		async mounted() {
			const message = {
				method: "getPagedData",
				params: {
					activePage: this.saveActivePage == true ? this.lastActivePage : 0,
				},
			};
			await worker.postMessage(JSON.stringify(message));
		},
		computed: {
			...mapState("cardsModule", {
				pagedData: (state) => state.tblData,
				lastActivePage: (state) => state.lastActivePage,
			}),
		},
		methods: {
			getActivePageData(e) {
				const message = {
					method: "getPagedData",
					params: {
						activePage: e,
					},
				};
				worker.postMessage(JSON.stringify(message));
			},
		},
	};
</script>
