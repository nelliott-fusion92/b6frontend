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
        listOpen: false,
        selectedName: 'Select an option'
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
      listingClicked(_name) {
        console.log(_name)
        this.listOpen = !this.listOpen
        this.selectedName = _name
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
            <span class="slds-icon_container slds-icon-utility-down slds-input__icon slds-input__icon_right" title="Description of icon when needed">
              <svg class="slds-icon slds-icon slds-icon_x-small slds-icon-text-default" aria-hidden="true">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#down" />
              </svg>
              <span class="slds-assistive-text">Description of icon when needed</span>
            </span>
          </div>
          <div id="listbox-unique-id" role="listbox">
            <ul class="slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid" role="presentation">
              <li v-for="banner in banners" v-bind:banner="banner" :key="banner._id" role="presentation" class="slds-listbox__item">
                <div @click="listingClicked(banner.name)" class="slds-media slds-listbox__option slds-listbox__option_plain slds-media_small" role="option">
                  <span class="slds-media__figure slds-listbox__option-icon"></span>
                  <span class="slds-media__body">
                    <span class="slds-truncate" :title="banner.name"> {{ banner.name }}</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
