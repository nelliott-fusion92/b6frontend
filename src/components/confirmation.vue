<script>

  export default {
    props: [
      'message',
      'isShown',
    ],

  }

</script>

<template>

  <div v:if="isShown" class="confirmation">
    <div class="msg">{{ message }}</div>
    <div class="controls">
      <div class="option">Yes</div>
      <div class="option">No</div>
    </div>
  </div>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

  .confirmation {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -100px 0 0 -150px;
    width: 300px;
    height: 200px;
    border: solid 1px #444;
    background-color: #090909;
    color: #fff;
    text-align: center;
    padding: 10px;
  }
  .controls {
    margin: 15px 0 0 0;
  }
  .option {
    padding: 5px;
    display: inline-block;
    border: solid 2px #0FF;
    color: #0FF;
    cursor: pointer;
    user-select: none;
    margin: 0 5px;
    min-width: 50px;

  }
  .option:hover {
    color: #333;
    background-color: #0FF;
  }

</style>
