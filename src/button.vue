<template>
  <button class="g-button wxyz" :class="{[`icon-${iconPosition}`]:true}"
  @click="$emit('click')">
    <g-icon class="icon" v-if="icon && !loading" :name="icon"></g-icon>
    <g-icon class='loading icon' v-if="loading" name='loading'></g-icon>
    <div class="g-button-content">
      <slot></slot>
    </div>
  </button>
</template>
<script>
import Icon from './icon'
export default {
  name: 'GuLuButton',
  // props: ["icon", "iconPosition"]
  components:{
    'g-icon':Icon
  },
  // 这里是进行局部定义
  props:{
    icon:{},
    loading:{
      type:Boolean,
      default:false
    },
    iconPosition:{
      type:String,
      default:'left',
      validator(value){
        return !(value !== 'left' && value !== 'right')
      }
      // 此处是为了验证iconposition只有left和right
    }
  }
};
</script>
<style lang="scss" scoped>
$font-size:14px;
$button-height:32px;
$button-bg:white;
$button-active-bg:#eee;
$border-radius: 4px;
$color:#333;
$border-color: #999;
$border-color-hover:#666;
@keyframes spain {
  0%{transform: rotate(0deg)}
  100%{transform: rotate(360deg)}
}
.g-button { font-size: $font-size; height: $button-height; padding: 0 1em;
  border-radius: $border-radius; border: 1px solid $border-color;
  background: $button-bg; display: inline-flex; justify-content: center;
  align-items: center; vertical-align: middle;
  // 解决inline不对齐的情况
  &:hover { border-color: $border-color-hover; }
  &:active { background: $button-active-bg; }
  &:focus { outline: none; }
  >.icon{ order: 1;margin-right: .1em; }
  >.g-button-content{ order: 2; }

  &.icon-right {
    > .icon { order: 2;margin-left: .1em;margin-right: 0; }
    > .g-button-content { order: 1; }
  }
  .loading{ animation: spain 1s infinite linear; }
}
</style>