<template>
  <div class="sealui-badge">
    <slot></slot>
    <transition name="sealui-zoom-in-center">
      <sup
        v-show="show && ( content || dot )"
        v-text="content"
        class="sealui-badge__content"
        :class="[
          type ? 'is-'+type : '',
          { 'is-fixed': $slots.default, 'is-dot': dot }
        ]">
      </sup>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'seal-badge',

  props: {
    value: {},
    max: Number,
    dot: Boolean,
    type : String,
    show:{
      type : Boolean,
      default:true
    }
  },

  computed: {
    content() {
      if (this.dot) return;

      const value = this.value;
      const max = this.max;

      if (typeof value === 'number' && typeof max === 'number') {
        return max < value ? `${max}+` : value;
      }

      return value;
    }
  }
};
</script>
