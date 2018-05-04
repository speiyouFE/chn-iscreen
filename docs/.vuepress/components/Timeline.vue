<template>
  <li class="sealui-timeline--item" :class="[headColorShow ? 'is-'+color : '']">
      <div class="sealui-timeline--item__tail"></div>
      <div class="sealui-timeline--item__head" :class="headClasses" :style="customColor" ref="dot">
        <slot name="dot"></slot>
      </div>
      <div class="sealui-timeline--item__content">
          <slot></slot>
      </div>
  </li>
</template>

<script>

export default {
    name: 'TimelineItem',
    props: {
        color: {
            type: String,
            default: 'primary'
        }
    },
    data () {
        return {
            dot: false
        };
    },
    mounted () {
        this.dot = this.$refs.dot.innerHTML.length ? true : false;
    },
    computed: {
      headClasses () {
          return [
              {
                  [`is-custom`]: this.dot
              }
          ];
      },
      headColorShow () {
          return this.color == 'primary' || this.color == 'danger' || this.color == 'success' || this.color == 'info' || this.color == 'dark' || this.color == 'warning';
      },
      customColor () {
          let style = {};
          if (this.color) {
              if (!this.headColorShow) {
                  style = {
                      'color': this.color,
                      'border-color': this.color
                  };
              }
          }
          return style;
      }
  }
};
</script>
