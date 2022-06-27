<template>
	<v-row>
		<v-col sm="12">
			<v-sheet rounded="lg">
				<div class="text-center">
					<v-btn elevation="2" @click="importData" class="mt-5"> Import Data </v-btn>
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
									Started/Finished At {{ item.startedAt }} <br />
									<strong> transaction time: calculate</strong>
								</v-list-item-title>
							</v-list-item-content>

							<v-list-item-action>
								<template v-if="item.inProgress">
									<v-progress-circular indeterminate color="primary"></v-progress-circular>
								</template>
								<template v-else>
									<v-icon style="color: green" large> mdi-checkbox-marked-circle </v-icon>
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
	// #region Internet Connection Check.
	// bir global variable'a set edilip, offlineJobs adlı bir state'e transaction'lar doldurulabilir.
	// online olduğunda ise offlineJobs kontrol edilir.
	// kalan transaction'lar handle edilip, kullanılan state güncellenebilir.
	// NOT: code challenge'da böyle bir madde yok.
	window.addEventListener("online", () => {
		console.log("Became online");
	});

	window.addEventListener("offline", () => {
		console.log("Became offline");
	});
	// #endregion

	import { mapState } from "vuex";

	import worker from "../worker";

	export default {
		computed: {
			...mapState("operationsModule", ["operations"]),
		},
		methods: {
			async importData() {
				const message = { method: "fetchData" };
				worker.postMessage(JSON.stringify(message));
			},
		},
	};
</script>
