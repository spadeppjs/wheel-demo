<template>
    <div class="collapseItem">
        <div class="title" @click="toggle">
            {{title}}
        </div>
        <div class="content" v-if="open">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "GuLuCollapseItem",
    
    props:{
        title:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
    },
    data(){
        return{
            open: false,
        }
    },
    inject:['eventBus'],
    mounted(){
        this.eventBus && this.eventBus.$on('update:selected',(names)=>{
            if(names.indexOf(this.name) >= 0 ){
                this.open = true                
            }else{
                this.open = false
            }
            // 监听传回的事件，看看传回的VM是否b包含自己，如果包含了，就显示，不包含就关闭。
        })
    },
    methods:{
        toggle(){
            if (this.open) {
                this.eventBus && this.eventBus.$emit('update:removeselected',this.name)
            }else{
                this.eventBus && this.eventBus.$emit('update:addselected',this.name)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    $grey: #ddd;
    $border-radius:4px;
    .collapseItem{
        > .title{
            border: 1px solid $grey;
            margin: -1px;
            min-height: 32px;
            display: flex;
            align-items: center;
            padding: 0 8px;
        }
        &:first-child{
            > .title{
                border-top-left-radius: $border-radius;
                border-top-right-radius: $border-radius;
            }
        }
        &:last-child{
            > .title:last-child{
                border-bottom-left-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
            }
            // 选择最后一项没有内容
        }        
        > .content{
            padding: 8px;
        }
    }
</style>
