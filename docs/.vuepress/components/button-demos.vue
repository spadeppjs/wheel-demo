<template>
    <div>
        <h2>简单用法</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-button>默认按钮</g-button>
        <g-button icon="settings">默认按钮</g-button>
        <g-button :loading="true">默认按钮</g-button>
        <g-button disabled>默认按钮</g-button>
        <p>
            <strong>代码</strong>
        </p>
        <pre><code>{{content}}</code></pre>
    </div>
</template>
<script>
import Button from '../../../src/button'
export default {
    components:{
        'g-button': Button
    },
    data(){
        return{
            content:`
            <g-button>默认按钮</g-button>
            <g-button icon="setting">默认按钮</g-button>
            <g-button :loading="true">默认按钮</g-button>
            <g-button disabled>默认按钮</g-button>
            `.replace(/\t+| +/g,'').trim()
            // 上面的正则中//表示需要替换的内容，其中\t表示回车，后面的+号表示多个回车
            // |表示或者，空格和+表示多个空格，//后面跟的g表示全部的意思吧，
            // 逗号后面的''表示被替换的内容，为空，trim表示消除段落前后所有的空格和回车
        }
    }
}
</script>
