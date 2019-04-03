<script>

  import Bannerdisplay from '../components/bannerdisplay.vue'
  import Bannercomponent from '../components/bannercomponent.vue'
  import Bannerstate from '../components/bannerstate.vue'
  import Bannerprop from '../components/bannerprop.vue'
  import Services from '../components/services.vue'
  import pageheader from '../components/pageheader.vue'

  export default {
    props: [
      'id',
    ],
    components: {
      Services,
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
    <pageheader :title="banner.name" />
    <div class="bannerid">#{{banner._id}}</div>
    <div class="panel">
      <h3>Banner Details</h3>
      <div class="panelbody">
        <label>Banner Name</label>
        <input v-model="banner.name" @input="setBannerProperty" />
        <label>Dimensions</label><br />
        <input class="smallinput" :value="banner.width" /> <input class="smallinput" :value="banner.height" />
        <br />
        <label>Description</label>
        <textarea :value="banner.description"></textarea>
      </div>
    </div>
    <div class="panel">
      <h3>Services</h3>
      <div class="panelbody">
        <Services />
      </div>
    </div>
    <div class="panel bigpanel">
      <h3>States</h3>
      <div class="panelbody bigpanelbody">
        <div class="statelist">
          <Bannerstate class="banner-state" v-for="(state, key) in banner.states" :statekey="key" :state="state" :key="key" />
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';
  .panel {
    display: inline-block;
    width: 300px;
    height: 400px;
    max-height: 400px;
    overflow-y: auto;
    margin: 0 5px 5px 0;
    vertical-align:top;
    background: #050505;
    border: solid 1px #4A4A4A;
  }
  .panel h3 {
    background-color: #212121;
    padding: 10px;
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;
    color: #FFF;
    user-select:none;
    border-bottom: solid 1px #4A4A4A;
  }
  .panelbody {
    padding: 10px;
  }
  .bigpanel {
    display: block;
    width: auto;
    height: auto;
    max-height: none;
  }
  .bigpanel h3 {
    margin: 0;
  }
  .bigpanelbody {
    padding: 0;
  }
  .statelist {
    width: 100%;
    display: inline-block;
  }
  .bannerid {
    color: #0FF;
    font-size: 20px;
    margin: 0 0 10px 0;
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
    //margin: 0 0 0 10px;
    //padding: 10px;
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
