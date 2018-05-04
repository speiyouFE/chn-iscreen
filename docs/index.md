---
title: 大语文课中互动包更新日志
layout: SealRelease
navbar: false
pageClass: releaseList
---

<script>
  import ChangeLog from './CHANGELOG.md';
  export default {
    components: {
      ChangeLog
    },
    data() {
      return {
        count: 3
      };
    },
    mounted() {
      const changeLog = this.$refs.changeLog;
      const changeLogNodes = changeLog.$el.children;
      let a = changeLogNodes[1].querySelector('a');
      a && a.remove();
      console.log(changeLogNodes)
      let release = changeLogNodes[1].textContent.trim();
      //let fragments = `<li><h3><a href="javascript:;" target="_blank">${release}</a></h3>`;
      let fragments = `<li class="sealui-timeline--item is-success">
                        <div class="sealui-timeline--item__tail"></div>
                        <div class="sealui-timeline--item__head is-custom">
                          <i class="sealui-icon-praise-fill"></i>
                        </div>
                        <div class="sealui-timeline--item__content">
                          <h3>当前版本号: ${release}<sup class="sealui-badge__content is-fixed">new</sup></h3>`;
      for (let len = changeLogNodes.length, i = 2; i < len; i++) {
        let node = changeLogNodes[i];
        //a = changeLogNodes[i].querySelector('a');
        //a && a.remove();
        if (node.tagName !== 'H3') {
          fragments += changeLogNodes[i].outerHTML;
        } else {
          release = changeLogNodes[i].textContent.trim();
          fragments += `</div>
                      </li>
                      <li class="sealui-timeline--item is-dark">
                        <div class="sealui-timeline--item__tail"></div>
                        <div class="sealui-timeline--item__head is-custom">
                          <i class="sealui-icon-windows-fill"></i>
                        </div>
                        <div class="sealui-timeline--item__content">
                        <h3>版本号: ${release}</h3>`;
          //fragments += `</li><li><h3><a href="javascript:;" target="_blank">${release}</a></h3>`;
        }
        if(node.tagName == 'UL'){
          if(i == 3 || i == 5){
            fragments += `<a href="//chn-iscreen-release.nmtree.com/${release}/iscreen.asar?v=${+new Date()}" target="_blank" class="sealui-button is-success"><i class="sealui-icon-download"></i><span>下载 ${release} 测试版</span></a>`;
          }else{
            fragments += `<a href="//chn-iscreen-release.nmtree.com/${release}/iscreen.asar?v=${+new Date()}" target="_blank" class="sealui-button is-warning"><span>下载 ${release} 测试版</span></a>`;
          }
          
        }
      }

      fragments = fragments.replace(/@(\w+)/g, '<a href="http://ssgitlab.speiyou.com/chinese/iscreen/commit/$1" target="_blank"># Git Commit</a>');
      //fragments = fragments.replace(/@(\w+)/g, '<a href="javascript:;" target="_blank">@$1</a>');
      this.$refs.timeline.innerHTML = `${fragments}</li>`;

      changeLog.$el.remove();
    }
  };
</script>

<template>
  <div class="page-changelog">
    <div class="heading">
      <button class="sealui-button">
        <a href="http://ssgitlab.speiyou.com/chinese/iscreen/repository/archive.tar?ref=dev" target="_blank" class="">GitLab Releases</a>
      </button>
      <i class="sealui-icon-man"></i>大语文 <em style="font-weight: bold;color:#505050;font-style: normal;">课中互动包</em> 更新日志
      <p style="margin:0;padding:0;color:rgba(0,0,0,.3);font-size: 14px;">注意：所有包均为内部测试包，请跟进实际需要自行下载。</p>
    </div>
    <ul class="sealui-timeline" ref="timeline"></ul>
    <change-log ref="changeLog"></change-log>
  </div>
</template>

<style lang="stylus">
  .releaseList
    background url(https://assets-cdn.shimo.im/assets/images/home/index/banner_back_2x-cf0f8ec03f.jpg);
    background-size cover;
    background-position center;
    code
      display inline-block
      border-radius 3px
      padding: .05rem .5rem;
      font-size: inherit;
    .custom-layout
      padding 4.6rem 0 1rem 0;
  .no-navbar.releaseList
    .custom-layout
      padding 1rem 0;
  .page-changelog
    padding 0rem 3rem 0 3rem
    .heading
      font-size 2rem
      margin 0 -3rem
      padding 2rem 3rem
      background rgba(0,0,0,.02)
      border-radius 4px 4px 0 0
      border-bottom 1px solid #EBEEF5;
      .sealui-button 
        float right
    .sealui-timeline
      padding-top: 2rem;
  .sealui-timeline--item
    padding-bottom 2rem
  .sealui-timeline--item__content
    color #303133
    font-size 1rem
    h3
      font-size 1.3rem
      position relative;
      display inline-block; 
      padding-bottom 1rem
    p
      font-size 1rem
      padding 0
      color inherit
      line-height inherit
      em
        font-style normal
        font-weight 600
        color #23b7e5
        padding-left .2rem
      & span > em
        color #20A0FF
    ul
      padding 0.5rem 0
      margin 0
      position relative;
      & > li 
        list-style-type: none;
        font-size: 1rem
        a
          color:#23b7e5
          &:hover
            color #09bb07
      ul
        padding 0 0 0 1rem
    .sealui-button
      margin-top:1rem
  .sealui-timeline--item__head
    top 2px
  .sealui-timeline--item:first-child .sealui-timeline--item__head i
    font-size 22px
    margin -1px 0 0 -3px
  .sealui-badge__content.is-fixed
    right 0;
    line-height 1.4;
  .custom-item--list
    padding 0.5rem 0  1.5rem 0
    margin 0
    .custom-item--list__title
      font-weight 600
    ul 
      padding 0 0 0 1rem
  @media (max-width: 419px ) and (max-width: 959px) 
    #app
      overflow hidden
    .releaseList
      background none
      .page-container
        border 0 none
        border-radius 0
      .custom-layout
        padding-top 3.6rem
        padding-bottom 0
      .page-changelog
        border-radius 0
        padding: 0rem 1rem 0 1rem
        border 0 none
        .heading
          font-size 1.5rem
          padding 1rem 1.5rem
          margin-left -1.5rem
          margin-right -1.5rem
          .sealui-button
            display none
    .no-navbar.releaseList
      .custom-layout
        padding 0 !important;

      .page-changelog
        border-radius 0
        padding: 0rem 1rem 0 1rem;
        .heading
          margin 0 -1rem
          padding 1rem
          font-size 1.5rem;
          .sealui-button
            display none

</style>