<template>
  <div :class="classes">
  	<img :src="src" v-if="src">
  	<seal-icon :name="icon" v-else-if="icon"></seal-icon>
  	<span ref="children" class="sealui-avatar__string" :style="childrenStyle" v-else><slot></slot></span>
  </div>
</template>

<script>
import SealIcon from './SealIcon';
//import { oneOf } from 'main/utils/util';
export default {
  name: 'SealAvatar',
  components: { SealIcon },
  props: {
  	src:{
  		type:String,
  		default:''
  	},
  	shape: {
      // validator (value) {
      //   return oneOf(value, ['circle', 'square']);
      // },
      default: 'circle'
    },
  	size:{
  		// validator (value) {
    //     return oneOf(value, ['small', 'large', 'default']);
    //   },
      default: 'default'
  	},
  	icon: {
			type: String
		}
  },
  data () {
    return {
      scale: 1,
      isSlotShow: false
    };
  },
  computed: {
    classes () {
      return [
        `sealui-avatar`,
        `sealui-avatar__${this.shape}`,
        `sealui-avatar__${this.size}`,
        {
          [`sealui-avatar__image`]: !!this.src,
          [`sealui-avatar__icon`]: !!this.icon
        }
      ];
    },
    childrenStyle () {
			let style = {};
			if (this.isSlotShow) {
			  style = {
		      msTransform: `scale(${this.scale})`,
		      WebkitTransform: `scale(${this.scale})`,
		      transform: `scale(${this.scale})`,
		      position: 'absolute',
		      display: 'inline-block',
		      left: `calc(50% - ${Math.round(this.$refs.children.offsetWidth / 2)}px)`
			  };
			}

			return style;
			}
  },
  methods: {
    setScale () {
      this.isSlotShow = !this.src && !this.icon;
      if (this.$refs.children) {
          const childrenWidth = this.$refs.children.offsetWidth;
          const avatarWidth = this.$el.getBoundingClientRect().width;
          // add 4px gap for each side to get better performance
          if (avatarWidth - 12 < childrenWidth) {
              this.scale = (avatarWidth - 12) / childrenWidth;
          } else {
              this.scale = 1;
          }
      }
    }
  },
  mounted () {
    this.setScale();
  },
  updated () {
    this.setScale();
  }
};
</script>
