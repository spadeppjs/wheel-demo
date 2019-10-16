<template>
    <div>
        <h2>简单用法</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-input></g-input>
        <g-input value="请输入"></g-input>
        <g-input value="请输入" disabled></g-input>
        <g-input value="请输入" readonly></g-input>
        <p>
            <strong>代码</strong>
        </p>
        <pre><code>{{content1}}</code></pre>
        <h2>双向绑定</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-input v-model="value"></g-input>
        <div>
            value:{{value}}
        </div>
        <p>
            <strong>代码</strong>
        </p>
        <pre><code>{{content2}}</code></pre>
    </div>
</template>
<script>
import Input from '../../../src/input'
export default {
    components:{
        'g-input':Input
    },
    data(){
        return{
            value:'1',
            content1:`
            <g-input></g-input>
            <g-input value="请输入"></g-input>
            <g-input value="请输入" disabled></g-input>
            <g-input value="请输入" readonly></g-input>
            `.replace(/\t+| +/g,'').trim(),
            content2:`
            data(){
                return{
                    value:'1'
                }
            }

            <g-input v-model="value"></g-input>
            <div>
                value:{{value}}
            </div>                
            `.replace(/^ {12}/gm,'').trim()
        }
    }
}
</script>
