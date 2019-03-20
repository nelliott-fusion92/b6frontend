<script>

  import axios from 'axios'

  export default {
    data: function(){
      return {
        info: ''
      }
    },
    mounted () {
      this.timer = setInterval(this.getData, 30000)
      this.getData()
    },
    beforeDestroy () {
      clearInterval(this.timer)
    },
    computed: {
      lastUpdated: function() {
        return this.info.data.time.updated
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
          .then(response => (this.info = response))
      }
    }
  }

</script>

<template>

  <div v-if="info.data">
    <div>1 {{ info.data.chartName}} =</div>
    <div v-for="(bpi, key) in info.data.bpi">
      <span v-html="bpi.symbol"></span>{{ bpi.rate_float | formatCurrency }}
    </div>
    <div class="lastupdated">Last updated {{ lastUpdated }}</div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .lastupdated {
    color: $col;
  }

</style>
