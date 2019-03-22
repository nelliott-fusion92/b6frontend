<script>

  import axios from 'axios'
  import bannerlistitem from '../components/bannerlistitem.vue'
  import pageheader from '../components/pageheader.vue'
  import down from '../../node_modules/@salesforce-ux/design-system/assets/icons/utility/down.svg'

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
      pageheader,
      down
    },
    mounted () {
      this.$store.dispatch('GET_BANNERS')
    },
    computed: {
      banners: function() {
        return this.$store.state.banners
      },
    },
    methods: {
      bannerClicked(_banner) {
        this.listOpen = !this.listOpen
        this.selectedName = _banner.name
      },
    },
    filters: {
      bannerURL: function(id) {
        return `/banners/${id}`
      }
    }
  }

</script>

<template>

  <div>
    <pageheader v-bind:title="$route.name" />
    <div class="slds-form-element">
      <label class="slds-form-element__label" for="combobox-unique-id-6">Search</label>
      <div class="slds-form-element__control">
        <div class="slds-combobox_container slds-size_small">
          <div v-bind:class="{ 'slds-is-open': listOpen }" class="slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click" aria-expanded="false" aria-haspopup="listbox" role="combobox">
            <div class="slds-combobox__form-element slds-input-has-icon slds-input-has-icon_right" role="none">
              <input style="color: #000;" @click="listOpen = !listOpen" class="slds-input slds-combobox__input" id="combobox-unique-id-6" aria-activedescendant="listbox-option-unique-id-01" aria-controls="listbox-unique-id" autocomplete="off" role="textbox" type="text" placeholder="Select an Option" readonly=""
                v-bind:value="this.selectedName" />
              <span class="slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right">
                <down class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true" width="20" height="20" viewBox="0 0 52 52" />
              </span>
            </div>
            <div id="listbox-unique-id" role="listbox">
              <ul class="slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid" role="presentation">
                <li v-for="banner in banners" v-bind:banner="banner" :key="banner._id" role="presentation" class="slds-listbox__item">
                  <router-link class="listlink" :to="banner._id | bannerURL">
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

  .listlink {
    font-family: 'Exo', sans-serif;
    font-weight: normal;
    color: #000;
  }

</style>
