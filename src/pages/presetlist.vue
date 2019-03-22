<script>

  import axios from 'axios'
  import bannerlistitem from '../components/bannerlistitem.vue'
  import down from '../../node_modules/@salesforce-ux/design-system/assets/icons/utility/down.svg'

  //var req = require.context('../../node_modules/@salesforce-ux/design-system/assets/icons/utility/', true, /\.svg$/);
  //req.keys().forEach(req);


  export default {
    props: [
      'api_base',
    ],
    data: function(){
      return {
        listOpen: false,
        selectedName: 'Select an option',
      }
    },
    components: {
      bannerlistitem,
      down
    },
    mounted () {
      this.$store.dispatch('GET_PRESETS')
    },
    methods: {
      bannerClicked(_banner) {
        this.listOpen = !this.listOpen
        this.selectedName = _banner.name
      },
    },
    computed: {
      presets: function() {
        return this.$store.state.presets
      },
    },
    filters: {
      bannerURL: function(id) {
        return `/presets/${id}`
      }
    }
  }

</script>

<template>


  <div class="slds-form-element">
    <label class="slds-form-element__label" for="combobox-unique-id-6">Search</label>
    <div class="slds-form-element__control">
      <div class="slds-combobox_container slds-size_small">
        <div v-bind:class="{ 'slds-is-open': listOpen }" class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click" aria-expanded="false" aria-haspopup="listbox" role="combobox">
          <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
            <input @click="listOpen = !listOpen" class="slds-input slds-combobox__input" id="combobox-unique-id-6" aria-activedescendant="listbox-option-unique-id-01" aria-controls="listbox-unique-id" autocomplete="off" role="textbox" type="text" placeholder="Select an Option" readonly=""
              v-bind:value="this.selectedName" />
            <span class="slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right">
              <down class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true" width="20" height="20" viewBox="0 0 52 52" />
            </span>
          </div>
          <div id="listbox-unique-id" role="listbox">
            <ul class="slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid" role="presentation">
              <li v-for="banner in presets" v-bind:banner="banner" :key="banner._id" role="presentation" class="slds-listbox__item">
                <router-link :to="banner._id | bannerURL">
                  <div @click="bannerClicked(banner)" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
                    <span class="slds-media__figure slds-listbox__option-icon"></span>
                    <span class="slds-media__body">
                      <span class="slds-truncate" :title="banner.name"> {{ banner.name }}</span>
                    </span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>




</template>

<style lang="css" scoped>


  #listbox-id-1 {
    width: 300px;
    left: 155px;
    float: none;
  }
  svg {
    left: 10px;
    height: 100%;

  }
  svg path {
    fill: #000;
    background-size: 20px 20px;
  }

  i {

  }

</style>
