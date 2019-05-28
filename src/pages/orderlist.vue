<script>

  import axios from 'axios'
  import pageheader from '../components/pageheader.vue'
  import ObjectId from 'bson-objectid'
  import moment from 'moment'

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
      pageheader,
    },
    async created () {
      this.ObjectId = ObjectId
      await this.$store.dispatch('GET_ORDERS')
    },
    computed: {
      orders: function() {
        return this.$store.state.orders
      },

    },
    methods: {
      deleteOrder: function(e, id) {
        e.preventDefault()
        this.$store.dispatch('DELETE_ORDER', id)
      },
      regenerate: function(e, id) {
        e.preventDefault()
        console.log(id)
        //this.$store.dispatch('REGENERATE_ORDER', this.banner)

      },
      orderDate: function(id) {
        return moment(this.ObjectId(id).getTimestamp()).format('M/DD/YYYY h:mm a')
      },
      submitFile: async function(){
        await this.$store.dispatch('UPLOAD_FILE', this.file)
        await this.$store.dispatch('GET_ORDERS')

      },
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
      }
    }
  }

</script>

<template>

  <div v-if="loadStatus">

    <pageheader v-bind:title="$route.name" />
    <div>
      <div class="ordercontainer" v-for="order in orders">
        <router-link class="orderlink" :to="'/orders/' + order._id">
          <div class="client">{{ order.client }}</div>
          <div :title="order.name" class="ordertitle">{{ order.name }}</div>
          <div class="orderdetails">
            <div class="orderdate">{{ orderDate(order._id) }}</div>
            {{ order.banner_count}} banners
            <div class="icons">
              <span @click="deleteOrder($event, order._id)"><i class="fas fa-trash-alt"></i></span>
              <span @click="regenerate($event, order._id)"><i class="fas fa-sync-alt"></i></span>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <div>
      <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
      <button @click="submitFile()">Submit</button>
    </div>

  </div>

</template>

<style lang="css" scoped>
  .ordercontainer {
    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 250px;
    height: 120px;
    border: solid 1px #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 9px;
    white-space: nowrap;
    margin: 0 10px 10px 0;
    color: #fff;
  }
  .ordercontainer:hover {
    border: solid 1px #0ff;
    background-color: rgba(0, 20, 60, .5);
  }
  .client {
    left: -7px;
    top: -7px;
    position: relative;
    display: inline-block;
    text-transform: uppercase;
    color: #4f2;
    padding: 1px 4px;
    font-family: 'Open Sans';
    font-size: 11px;
  }
  .ordertitle {
    width: 200px;
    color: #0AF;
    margin: 0 0 1px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;

  }
  .orderdate {
    -webkit-font-smoothing: auto;
    font-smoothing: auto;
    color: #FF0;
    font-size: 10px;
    font-weight: bold;
    font-family: 'Gotham';
  }
  .icons{
    position: absolute;
    bottom:0;
    text-align:right;
    z-index: 11;
    width: 100%;
    padding: 0 10px 2px 0;
  }
  .icons span:hover {
    color: #0FF;
  }
  .orderdetails {
    color: #fff !important;
  }
  .disabled {
    opacity: .5;
    pointer-events: none;
  }
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

  #filters {
    padding: 5px;
    border-bottom: dotted 1px #999;
    margin: 0 0 10px 0;
  }

  .listlink {
    font-family: 'Exo', sans-serif;
    font-weight: normal;
    color: #000;
  }

  .error {
    color: #F00 !important;
  }
  .loading-display {
    margin: 0 0 5px 0;
  }
  @keyframes flickerAnimation {
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-o-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-moz-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  @-webkit-keyframes flickerAnimation{
    0%   { opacity:1; }
    50%  { opacity:0; }
    100% { opacity:1; }
  }
  .animateflicker {
     -webkit-animation: flickerAnimation .5s infinite;
     -moz-animation: flickerAnimation .5s infinite;
     -o-animation: flickerAnimation .5s infinite;
      animation: flickerAnimation .5s infinite;
      color: #FF0 !important;
  }

</style>
