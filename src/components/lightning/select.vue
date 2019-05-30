<script>

  export default {
    props: [
      'name',
      'value',
      'options',
      'placeholder',
    ],
    data () {
      return {
        content: this.value,
      }
    },
    components: {

    },
    methods: {
      handleInput: function(e) {
        this.$emit('input', {
          value: e.target.options[e.target.options.selectedIndex].value,
        })
        this.content = e.target.options[e.target.options.selectedIndex].value
      },
    },
    computed: {
    }
  }

</script>

<template>

  <div class="slds-form-element">
  <label class="slds-form-element__label" for="select-01">Select Label</label>
  <div class="slds-form-element__control">
    <div class="slds-select_container">
      <select v-model="content" @input="handleInput" class="slds-select" id="select-01">
        <option disabled value="">{{ placeholder }}</option>
        <option v-for="option in options" :value="option">{{ option }}</option>
      </select>
    </div>
  </div>
</div>

</template>

<style lang="scss" scoped>
  @import url('../../../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css');

  select {
    color: #000;
  }

</style>
