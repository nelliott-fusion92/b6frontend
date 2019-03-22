<script>

  import { isArray, isObject } from 'lodash-es'

  import Bannerdetailitem from '../components/bannerdetailitem.vue'
  import Bannerdisplay from '../components/bannerdisplay.vue'
  import Bannerprop from '../components/bannerprop.vue'

  export default {
    props: [
      'id',
    ],
    components: {
      Bannerdetailitem,
      Bannerdisplay,
      Bannerprop,
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

  <div>

    <Bannerdetailitem v-if="banner._id" v-bind:banner="banner" />
    <div class="bannerprops">
      <Bannerprop class="bannerprop" v-if="banner._id" v-for="(item, key, index) in banner" v-bind:_path="key" v-bind:_item="item" v-bind:_key="key" :key="key" />
    </div>
    <!-- <Bannerdisplay v-if="banner._id" v-bind:banner="banner" /> -->

  </div>


</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .bannerprops {
    padding: 10px;
    border: solid 1px #333;
    overflow-x: hidden;
    overflow-y: auto;
    width: 500px;
    max-height: 600px;
  }

</style>
