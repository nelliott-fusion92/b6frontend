<script>

  import Bannerdetailitem from '../components/bannerdetailitem.vue'
  import Bannerdisplay from '../components/bannerdisplay.vue'
  import Bannercomponent from '../components/bannercomponent.vue'
  import Bannerstate from '../components/bannerstate.vue'
  import Bannerprop from '../components/bannerprop.vue'
  import pageheader from '../components/pageheader.vue'

  export default {
    props: [
      'id',
    ],
    components: {
      Bannerdetailitem,
      Bannerdisplay,
      Bannercomponent,
      Bannerstate,
      Bannerprop,
      pageheader,
    },
    beforeMount () {
      this.$store.dispatch('GET_COMPONENTS')
      this.$store.dispatch('GET_TERMS')
    },
    mounted () {
      this.$store.dispatch('GET_BANNER', this.id)
    },
    computed: {
      banner: function() {
        return this.$store.state.currentBanner
      },
    },
    methods: {
      setBannerProperty: function(e) {
        console.log(e)
        //this.$store.dispatch('SET_BANNER_PROPERTY', e)
      },
      undo: function() {
        this.$store.commit('undo')
      },
    },
  }

</script>

<template>

  <div v-if="loadStatus">
    <pageheader title="Banner Editor" />
    #<span class="bannerid">{{banner._id}}</span><br /><br />
    <label>Banner Name</label>
    <input v-model="banner.name" @input="setBannerProperty" class="biginput" />
    <label>Dimensions</label><br />
    <input class="smallinput" :value="banner.width" /> <input class="smallinput" :value="banner.height" />
    <br />
    <label>Description</label>
    <textarea :value="banner.description"></textarea>
    <div class="statelist">
      <Bannerstate class="banner-state" v-for="(state, key) in banner.states" :statekey="key" :state="state" :key="key" />
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';
  .statelist {
    width: 100%;
    display: inline-block;
    margin: 0 0 20px 0;
  }
  .bannerid {
    color: #0FF;
    font-size: 16px;
  }
  .banner-state {
    font-size: 16px;
    padding: 15px 10px;
    background-color: #050505;
    border-bottom: solid 1px #222;
  }
  .banner-state:last-child {
    border-bottom: none;
  }
  .banner-state:nth-child(even) {
    background-color: #101010;
  }
  .banner-state div {
    margin: 0 0 0 10px;
    padding: 10px;
  }
  .biginput {
    font-size: 16px;
    height: auto;
    width: 400px;
  }
  .smallinput {
    font-size: 14px;
    width: 60px;
    display: inline-block;
  }
  .state-title {
    display: block;
    margin: 0 0 10px 0;
  }
  .component {
    font-size: 12px;
    color: #FF0;
    background-color: #000111;
  }
  .component:nth-child(odd) {
    background-color: #000104;
  }
  .banner-state:nth-child(even) {
    background-color: #101010;
  }

</style>
