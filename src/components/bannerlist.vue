<script>

  import axios from 'axios'
  import bannerlistitem from './bannerlistitem.vue'

  export default {
    props: [
      'api_base',
    ],
    data: function(){
      return {
        banners: null,
      }
    },
    components: {
      bannerlistitem
    },
    mounted () {
      axios
        .get(`${this.api_base}v1/banners`)
        .then((response) => {
          this.banners = response.data
        })
    },
    methods: {
      listClicked: function(e, x) {
        console.log(e)
      }
    }
  }

</script>

<template>

  <div>
    <bannerlistitem v-for="banner in banners" v-bind:banner="banner" urlRoot="banner" :key="banner._id" />
    <div id="listbox-id-1" class="slds-dropdown slds-dropdown_length-5 slds-dropdown_fluid" role="listbox">
      <ul class="slds-listbox slds-listbox_vertical" role="presentation">
        <li v-for="banner in banners" v-bind:banner="banner" :key="banner._id" role="presentation" class="slds-listbox__item">
          <div id="option1" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
            <span class="slds-media__figure slds-listbox__option-icon"></span>
            <span class="slds-media__body">
              <span @click="listClicked(banner.name)"class="slds-truncate" :title="banner.name"> {{ banner.name }}</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<style lang="css" scoped>

  @import url('../../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css');
  #listbox-id-1 {
    width: 300px;
    left: 155px;
    float: none;
  }

</style>
