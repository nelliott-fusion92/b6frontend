<script>

  export default {
    props: [
      'name',
      'value',
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
          value: this.content,
        })
      },
    },
    computed: {
    }
  }

</script>

<template>

  <div class="slds-form-element">
    <label class="slds-form-element__label" for="text-input-id-1">{{ name }}</label>
    <div class="slds-form-element__control">
      <input type="text" id="text-input" :placeholder="placeholder" v-model="content" @input="handleInput" class="slds-input" />
    </div>
  </div>

</template>

<style lang="scss" scoped>
  @import url('../../../node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.min.css');

  input {
    color: #000;
  }

</style>
