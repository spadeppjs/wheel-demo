<template>
  <div class="popover" ref="popover">
    <div  ref="contentWrapper" class="content-wrapper" v-if="visible" 
    :class="{[`position-${position}`]:true}"> 
      <slot name="content" :close="close"></slot> 
    </div>
    <span ref="triggerWrapper" style="display:inline-block">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: "GuLuPopover",
  props:{
    position:{
      type:String,
      default:'top',
      validator (value){
        return ['top','bottom','left','right'].indexOf(value) >=0
      }
    },
    trigger:{
      type:String,
      default: "click",
      validatot(value){
        return ['click','hover'].indexOf(value) >= 0
      }
    }
  },
  mounted(){
    if(this.trigger === 'click'){
      this.$refs.popover.addEventListener('click',this.onClick)
    } else {
      this.$refs.popover.addEventListener('mouseenter',this.open)
      this.$refs.popover.addEventListener('mouseleave',this.close)
    }
  },
  destroyed(){
    if(this.trigger === 'click'){
      this.$refs.popover.removeEventListener('click',this.onClick)
    } else {
      this.$refs.popover.removeEventListener('mouseenter',this.open)
      this.$refs.popover.removeEventListener('mouseleave',this.close)
    }
  },
  computed:{
    openEvent(){
      if(this.trigger === 'click'){
        return 'click'
      }else{
        return 'mouseenter'
      }
    },
    closeEvent(){
      if(this.trigger === 'click'){
        return 'click'
      }else{
        return 'mouseleave'
      }
    },
    // 当trigger为click的时候就返回click点击事件的关闭和打开，
    // 如果不是click就返回mouseenter和mouseleave进行关闭和打开
  },
  data() {
    return { visible: false };
  },
  methods: {
    positionContent(){
      const {contentWrapper,triggerWrapper} = this.$refs
      document.body.appendChild(contentWrapper)
      const {height: height2} = contentWrapper.getBoundingClientRect()
      const {width,height,top,left} = triggerWrapper.getBoundingClientRect()
      let positions = {
        top:{ left: left + window.scrollX, top: top + window.scrollY },
        bottom:{ left: left + window.scrollX, top: top + height + window.scrollY },
        left:{
          left: left + window.scrollX,
          top: top + window.scrollY + (height - height2) / 2
        },
        right:{
          left: left + window.scrollX + width,
          top: top + window.scrollY + (height - height2) / 2
        }
      }
      contentWrapper.style.left =  positions[this.position].left + 'px'
      contentWrapper.style.top =  positions[this.position].top + 'px'
      // 以上代码表示的是设置contentWrapper的style，
      // 其中向左移动的距离，由传入的position与positions列表对应值进行匹配。
    },
    onClickDocument(e){
      if( this.$refs.popover &&
      (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))
      ){return}
       if( this.$refs.contentWrapper &&
      (this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains(e.target))
      ){return}
        this.close()
    },
    open(){
      this.visible = true
      this.$nextTick(() => {
        this.positionContent()
        document.addEventListener("click", this.onClickDocument)
      })
    },
    close(){
      this.visible = false
      document.removeEventListener("click", this.onClickDocument)
    },
    onClick(event) {
      if(this.$refs.triggerWrapper.contains(event.target)){
        if (this.visible === true) {
          this.close()
        }else{
          this.open()
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$border-color:#999;
$border-radius:4px;
.popover {
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.content-wrapper {
  border-radius: $border-radius;
  position: absolute;
  border: 1px solid $border-color;
  background: white;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
  padding: .5em 1em;
  max-width: 20em;
  word-break: break-all;
  &::before,&::after{
    content: '';
    display: block;
    position: absolute;
    border: 10px solid transparent;
    width: 0;
    height: 0;
  }
  &.position-top{
    transform: translateY(-100%);
    margin-top: -10px;
    &::before,&::after{
      border-bottom: none;
      left: 10px;
    }
    &::before{
      border-top-color: #999;
      top: 100%;
    }
    &::after{
      border-top-color: white;
      top: calc(100% - 1px);
    }
  }
  &.position-bottom {
    margin-top: 10px;
    &::before,&::after{
      border-top: none;
      left: 10px;
    }
    &::before{
      border-bottom-color: #999;
      bottom: 100%;
    }
    &::after{
      border-bottom-color: white;
      bottom: calc(100% - 1px);
    }
  }
  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before,&::after{
      border-right: none;
      top: 50%;
      transform: translateY(-50%)
    }
    &::before{
      border-left-color: #999;
      left: 100%;
    }
    &::after{
      border-left-color: white;
      left: calc(100% - 1px);
    }
  }
  &.position-right {
    margin-left: 10px;
    &::before,&::after{
      border-left: none;
      top: 50%;
      transform: translateY(-50%)
    }
    &::before{
      border-right-color: #999;
      right: 100%;
    }
    &::after{
      border-right-color: white;
      right: calc(100% - 1px);
    }
  }
}
</style>
