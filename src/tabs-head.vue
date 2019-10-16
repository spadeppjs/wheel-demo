<template>
    <div class="tabs-head" ref="tabsHead">
        <slot></slot>
        <div class="tabs-line" ref="tabsLine"></div>
        <div class="actions-wrapper">
            <slot name="actions"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: 'GuLuTabsHead',
    inject:['eventBus'],
    mounted(){
        this.eventBus.$on('update:selected',(item,vm)=>{
            this.updateLinePosition(vm)
        })
    },
    methods: {
        updateLinePosition(selectedVm){
            let {width,left} = selectedVm.$el.getBoundingClientRect()// 得到传入的元素长宽高等属性
            let {left: left2} = this.$refs.tabsHead.getBoundingClientRect()
            this.$refs.tabsLine.style.width = `${width}px`
            this.$refs.tabsLine.style.left = `${left - left2}px`
        }
    }
}
</script>
<style lang="scss" scoped>
$tab-hight: 40px;
$blue:blue;
$border-color:#ddd;
.tabs-head{
    display: flex;
    justify-content: start;
    align-items: center;
    height: $tab-hight;
    position: relative;
    border-bottom: 1px solid $border-color;
    > .tabs-line{
        position: absolute;
        bottom: 0;
        border-bottom: 1px solid $blue;
        transition: all 350ms;
    }
    > .actions-wrapper{
        margin-left: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 1em;
    }// 直接这样设置就可以实现元素右对齐，
    
}
</style>
