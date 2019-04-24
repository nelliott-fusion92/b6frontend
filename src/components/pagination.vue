<script>
  import Vue from 'vue'

  export default {
    data: function() {
      return {
        limit: this.$store.state.bannersQuery.limit,
        skip: this.$store.state.bannersQuery.skip,
      }
    },

    mounted: function() {

    },

    methods: {
      turnPage: function(e) {
        this.$emit('change', {
          skip: parseInt(this.skip),
          limit: parseInt(this.limit),
        })
      }
    }
  }

</script>

<template>

  <div>
    <div class="inputgroup">
      <label>Page</label>
      <input type="number" v-model="skip" @change="turnPage" />
    </div>
    <div class="inputgroup">
      <label>Limit</label>
      <input type="number" v-model="limit" @change="turnPage" />
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';
  input {
    width: 50px;
  }
  .inputgroup {
    display: inline-block;
    margin: 0 10px 0 0;
  }
</style>
