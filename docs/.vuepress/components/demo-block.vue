<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <slot name="source"></slot>
    <div class="description">
      <slot></slot>
      	<i :class="[iconClass, { 'hovering': hovering }]" @click="isExpanded = !isExpanded"></i>

    </div>
    <!-- <div class="demo-block-control" @click="isExpanded = !isExpanded">
      <i :class="[iconClass, { 'hovering': hovering }]"></i>
      <span v-show="hovering">{{ controlText }}</span>
    </div> -->
    <div class="meta">
      <slot name="highlight"></slot>
      <div class="meta-tool">
		  </div>
    </div>

  </div>
</template>

<style lang="stylus">
  .demo-block {
    border: solid 1px #e9e9e9;
    border-radius: 4px;
    transition: .2s;

    &.hover {
      box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }

    code {
      font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }

    .demo-button {
      float: right;
    }

    .source {
      padding: 24px;
    }

    .meta {
      border-top: solid 1px #e9e9e9;
      clear: both;
      overflow: hidden;
      height:0px;
      transition: height .2s;
      margin-bottom: -1px;
      .meta-tool{
      	height: 50px;
      	line-height: 50px;
				text-align: center;
			}
    }

    .description {
      padding: 6px 60px 18px 24px;
      width: 100%;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 1.8;
      color: #5e6d82;
      word-break: break-word;
      position: relative;
      border-top: solid 1px #e9e9e9;
			i{
				position: absolute;
				right: 8px;
				top: 50%;
				margin-top: -9px;
				transform: translateX(-50%);
				color: rgba(0,0,0,.65);
				font-size: 20px;
				cursor: pointer;
			}

      &::after{
        position: absolute;
        top: -13px;
        content: '组件描述';
        font-size: 14px;
        font-weight: 500;
        left: 13px;
        background-color:#fff;
        padding: 0 10px;
        border-radius: 0 0 3px 0;
        color: #314659;
      }
      p {
        margin: 12px 0 0px;
      }

      code {
        color: #5e6d82;
        background-color:rgba(248, 248, 248, 0.08);
        margin: 0 4px;
        transform: translateY(-2px);
        display: inline-block;
        padding: 1px 5px;
        font-size: 12px;
        border-radius: 3px;
      }
    }

    .highlight {
      width: 100%;
      border-top: solid 0px #e9e9e9;
      border-bottom: solid 1px #e9e9e9;
      position: relative;
      border-radius:0;
      /*
      &::after{
        position: absolute;
        top: 0px;
        content: '示例代码';
        font-size: 12px;
        left: 0;
        background-color: rgba(0,0,0,.1);
        padding: 2px 5px;
        border-radius: 0 0 3px 0;
        color: #666;
        border: 0px solid #e9e9e9;
        border-top: 0 none;
        border-left: 0 none;
      }*/
      pre {
        margin: 0;
      }

      code.hljs {
        margin: 0;
        border: none;
        max-height: none;
        padding-top:0px;
        &::-webkit-scrollbar-thumb {
				    background-color: #e6e6e6;
				    border-radius: 4px;
				}
        &::before {
          content: none;
        }
      }
    }

    .demo-block-control {
      border-top: solid 1px #e9e9e9;
      height: 40px;
      box-sizing: border-box;
      background-color:#fafafa;

      text-align: center;
      color:rgba(0,0,0,.55);
      cursor: pointer;
      transition: .2s;
      position: relative;

      i {
        font-size: 12px;
        line-height: 40px;
        transition: .3s;
        &.hovering {
          transform: translateX(-40px);
        }
      }

      span {
        position: absolute;
        transform: translateX(-30px);
        font-size: 14px;
        line-height: 40px;
        transition: .3s;
        display: inline-block;
      }
			/*
      &:hover {
        color: #20a0ff;
        background-color: #f8f8f8;
      }
			*/
      & .text-slide-enter,
      & .text-slide-leave-active {
        opacity: 0;
        transform: translateX(10px);
      }
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        hovering: false,
        isExpanded: false,
      };
    },

    props: {
      jsfiddle: Object,
      default() {
        return {};
      }
    },

    methods: {
    	goJsfiddle() {
        const { script, html, style } = this.jsfiddle;
        const resourcesTpl = '<scr' + 'ipt src="//unpkg.com/vue/dist/vue.js"></scr' + 'ipt>' +
        '\n<scr' + `ipt src="//pc.vue.sealui.nmtree.com/lib/index.js?v=1"></scr` + 'ipt>';
        let jsTpl = (script || '').replace(/export default/, 'var SealMain =').trim();
        let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`;
        let cssTpl = `@import url("//pc.vue.sealui.nmtree.com/lib/theme-default/index.css?v=1");\n${(style || '').trim()}\n`;
        jsTpl = jsTpl
          ? jsTpl + '\nvar SealCont = Vue.extend(SealMain)\nnew SealCont().$mount(\'#app\')'
          : 'new Vue().$mount(\'#app\')';
        const data = {
          js: jsTpl,
          css: cssTpl,
          html: htmlTpl,
          panel_js: 3,
          panel_css: 1
        };
        const form = document.getElementById('fiddle-form') || document.createElement('form');
        form.innerHTML = '';
        const node = document.createElement('textarea');

        form.method = 'post';
        form.action = 'http://jsfiddle.net/api/post/library/pure/';
        form.target = '_blank';

        for (let name in data) {
          node.name = name;
          node.value = data[name].toString();
          form.appendChild(node.cloneNode());
        }
        form.setAttribute('id', 'fiddle-form');
        form.style.display = 'none';
        document.body.appendChild(form);

        form.submit();
      }
    },

    computed: {

      blockClass() {
        //return `demo-${ this.$router.currentRoute.path.split('/').pop() }`;
      },

      iconClass() {
        return this.isExpanded ? 'sealui-icon-caret-up' : 'sealui-icon-caret-down';
      },

      controlText() {
        return this.isExpanded ? 'Hide Code' : 'Show Code';
      },

      codeArea() {
        return this.$el.getElementsByClassName('meta')[0];
      },

      codeAreaHeight() {
        if (this.$el.getElementsByClassName('description').length > 0) {
          return Math.max(this.$el.getElementsByClassName('description')[0].clientHeight, this.$el.getElementsByClassName('highlight')[0].clientHeight);
        }
        return this.$el.getElementsByClassName('highlight')[0].clientHeight;
      }
    },

    watch: {
      isExpanded(val) {
        this.codeArea.style.height = val ? `${ this.codeAreaHeight + 55 }px` : '0';
        //this.codeArea.style.height = val ? `auto` : '0px';
      }
    },

    mounted() {
      this.$nextTick(() => {
        let highlight = this.$el.getElementsByClassName('highlight')[0];
        if (this.$el.getElementsByClassName('description').length === 0) {
          highlight.style.width = '100%';
          highlight.borderRight = 'none';
        }
      });
    }
  };
</script>
