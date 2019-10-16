<template>
<div class="gulu-toast" :class="toastClasses">
  <div class="toast" ref="toast">
    <div class="message">
        <slot v-if="!enableHtml"></slot>
        <div v-else v-html="$slots.default[0]"></div>
    </div>
    <div class="line" ref="line"></div>
    <span class="close" @click="clickClose">{{closeButton.text}}</span>
  </div>
</div>
</template>
<script>
export default {
  name: "GuLuToast",
  props: {
    autoClose: {
      type: [Boolean,Number],
      default: 50,
      validator(value){
        return value === false || typeof value === 'number'
      }
    },
    closeButton: {
      type: Object,
      default() {
        return {
          text: "关闭",
          callback: undefined
          // 传入的callback默认为undefined
        };
      }
    },
    enableHtml: {
      type: Boolean,
      default: false
    },
    position:{
      type: String,
      default: 'top',
      validator(value){
        return ['top','bottom','middle'].indexOf(value) >=0
      }
    }
  },
  mounted() {
    this.updataStyle()
    this.exeAutoClose()
  },
  computed: {
    toastClasses(){
      return {
        [`position-${this.position}`]:true
      }
    }
  },
  methods: {
    updataStyle(){
      this.$nextTick(() => {
        this.$refs.line.style.height = 
          `${this.$refs.toast.getBoundingClientRect().height}px`
      })
    },
    exeAutoClose(){
      if (this.autoClose) {
        setTimeout(() => {
          this.close();
        }, this.autoClose * 1000);
      }
    },
    close() {
      this.$el.remove(), 
      this.$emit('close'),
      this.$destroy();
    },
    log() {
      console.log("测试");
    },
    clickClose() {
      this.close();
      if (this.closeButton && typeof this.closeButton.callback === "function") {
        // 这里判断是否有closeButton，以及closeButton的callback是否为函数
        this.closeButton.callback(this);
        // 此处的this表示toast实例
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$font-size: 14px;
$toast-min-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
@keyframes slide-top{
  0%{opacity: 0; transform: translateY(-100%)}
  100%{opacity: 1; transform: translateY(0%)}
};
@keyframes slide-buttom{
  0%{opacity: 0; transform: translateY(100%)}
  100%{opacity: 1; transform: translateY(0%)}
};
@keyframes slide-middle{
  0%{opacity: 0;}
  100%{opacity: 1;}
};
.gulu-toast{
  $transform-time: 0.3s;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  &.position-top{
    top: 0;
    .toast{
      animation: slide-top $transform-time;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
  &.position-bottom{
    bottom: 0;
    .toast{
      animation: slide-buttom $transform-time;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
  &.position-middle{
    top: 50%;
    transform: translateY(-50%,-50%);
    .toast{
      animation: slide-middle $transform-time;
    }
  }
}
.toast {
  
  font-size: $font-size;
  min-height: $toast-min-height;
  background: $toast-bg;
  line-height: 1.8;
  color: white;
  display: flex;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  padding: 0 16px;
  .close {
    padding-left: 16px;
    flex-shrink: 0;
    cursor:pointer;
  }
  .line {
    height: 100%;
    border-left: 1px solid #666;
    margin-left: 16px;
  }
  .message{
    padding:8px 0;
  }

}
</style>

