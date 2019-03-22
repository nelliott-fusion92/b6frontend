<script>

  import axios from 'axios'
  import pageheader from '../components/pageheader.vue'

  export default {
    data: function(){
      return {
        BTCinfo: ''
      }
    },
    mounted () {
      console.log('rootstore', this.$root)
      this.timer = setInterval(this.getData, 30000)
      this.getData()
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    components: {
      pageheader
    },
    computed: {
      lastUpdated: function() {
        return this.BTCinfo.data.time.updated
      }
    },
    filters: {
      formatCurrency (value) {
        return value.toFixed(2)
      }
    },
    methods: {
      getData: function() {
        axios
          .get('https://api.coindesk.com/v1/bpi/currentprice.json')
          .then(response => (this.BTCinfo = response))
      }
    }
  }

</script>

<template>
  <div>
    <pageheader v-bind:title="$route.name" />
    <div class="btc" v-if="BTCinfo.data">
      <div>1 {{ BTCinfo.data.chartName}} =</div>
      <div v-for="(bpi, key) in BTCinfo.data.bpi">
        <span v-html="bpi.symbol"></span>{{ bpi.rate_float | formatCurrency }}
      </div>
      <div class="lastupdated">Last updated {{ lastUpdated }}</div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';
  .btc {
    font-family: 'Exo';
    font-size: 15px;
    line-height: 22px;
    font-weight: 400;
  }
  .lastupdated {
    color: $col;
    font-weight: bold;
    margin: 5px 0 0 0;
  }

</style>
