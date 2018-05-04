<template>
  <div class="page-container">
    <Content :custom="true"/>
  </div>
</template>
<style lang="stylus">
  @import '../theme/styles/config.styl'
  .page-container
    max-width $contentWidth
    margin 0px auto
    background #fff
    border-radius 4px
    border 1px solid #EBEEF5;
</style>