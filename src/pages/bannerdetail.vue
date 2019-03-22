<script>

  import { isArray, isObject } from 'lodash-es'

  import Bannerdetailitem from '../components/bannerdetailitem.vue'
  import Bannerdisplay from '../components/bannerdisplay.vue'
  import Bannerprop from '../components/bannerprop.vue'
  import pageheader from '../components/pageheader.vue'

  export default {
    props: [
      'id',
    ],
    components: {
      Bannerdetailitem,
      Bannerdisplay,
      Bannerprop,
      pageheader,
    },
    mounted () {
      this.$store.dispatch('GET_BANNER', this.id)
      this.$store.dispatch('GET_COMPONENTS')
    },
    computed: {
      banner: function() {
        return this.$store.state.currentBanner
      },
    },
  }

</script>

<template>

  <div v-if="loadStatus">
    <pageheader v-bind:title="$route.name" />
    <Bannerdetailitem v-if="banner._id" v-bind:banner="banner" />
    <div class="bannerprops">
      <Bannerprop class="bannerprop" v-if="banner._id" v-for="(item, key, index) in banner" v-bind:_path="key" v-bind:_item="item" v-bind:_key="key" :key="key" />
    </div>
    <!-- <Bannerdisplay v-if="banner._id" v-bind:banner="banner" /> -->

  </div>


</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';
  .bannerprops::-webkit-scrollbar { width: 10px !important; opacity: 0.5 !important; }
  .bannerprops {
    background-color: #001828 !important;
    color: #14AEFE;
    padding: 20px 10px;
    margin: 10px 0;
    border: solid 1px #005270;
    overflow-x: hidden;
    overflow-y: auto;
    width: 500px;
    max-height: 600px;
    font-family: 'Open Sans', sans-serif;
    font-weight: normal;
    box-sizing: content-box;
    overflow-y: scroll;
  }


</style>
