<script>

  import bannerdetailitem from '../components/bannerdetailitem.vue'
  import bannerblock from '../components/bannerblock.vue'
  import pageheader from '../components/pageheader.vue'
  import ObjectId from 'bson-objectid'

  export default {
    props: [
      'id',
    ],
    async created () {
      this.ObjectId = ObjectId
      //await this.$store.dispatch('GENERATE_TEST_ARRAY')
      console.log(this.id)
      await this.$store.dispatch('GET_ORDER', this.id)
    },
    methods: {
      previewBanner: function(id) {
        window.open(`${this.$store.state.b6_base}banner/${id}`)
      },
      downloadSpreadsheet: function() {
        window.open(this.order.spreadsheet)
      }
    },
    components: {
      bannerdetailitem,
      pageheader,
      bannerblock,
    },
    computed: {
      order: function() {
        return this.$store.state.currentOrder
      },
      orderDate: function() {
        return this.ObjectId(this.$store.state.currentOrder._id).getTimestamp()
      }
    }
  }

</script>

<template>
  <div v-if="loadStatus">
    <div>
      <pageheader :title="'Order for ' + order.client + ' / ' + order.name" />
      {{ this.formatDate(ObjectId(order._id).getTimestamp()) }}
      <div v-if="order.spreadsheet != ''" class="downloadspreadsheet" @click="downloadSpreadsheet()">
        <div class="doc"><i class="far fa-file-alt"></i></div> Download Spreadsheet
      </div>
      <br />
      <h3>Banners in this order: </h3>
      <bannerblock
        class="bannerblock"
        v-for="banner in order.banners"
        :banner="banner"
        :isPreset="false"
        :bannerURL="'/banners/' + banner._id"
        :key="banner._id" />
    </div>

  </div>


</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .downloadspreadsheet {
    cursor: pointer;
    margin: 10px 0 0 0;
    color: #0ff;
  }
  .doc {
    vertical-align: -7px;
    font-size: 32px;
    color: #FF0;
    display: inline-block;
    margin: 0 5px 0 0;
  }

</style>
