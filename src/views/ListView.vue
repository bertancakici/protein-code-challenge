<template>
  <div class="list">
    <h1>This is list page</h1>
    <p> {{ cc }}</p>
    <v-btn @click="sendMsg">Gönder</v-btn>
  </div>
</template>

<script>

// import worker from "/public/worker-api"
import { mapGetters, mapActions } from 'vuex'

export default {
  computed:{
    ...mapGetters({
      cc: "operationsModule/getAName"
    })
  },
  methods:{
    ...mapActions({
      setName:"operationsModule/cname"
    }),
    sendMsg(){
      this.setName("halil");
    }
  }
}
</script>

