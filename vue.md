## vue总结
* vue是一套构建用户界面的渐进式框架
* 条件渲染：
     1、v-if
     2、template v-if
     3、v-show
     4、v-else
* 常用指令
    v-html   
            更新元素的 innerHTML 
    v-show   
            根据表达式之真假值，切换元素的 display CSS 属性
    v-if

    v-else   
            v-else 元素必须紧跟在 v-if 元素或者 v-else-if的后面——否则它不能被识别
    v-else-if  
            v-if 的 else-if 块。可以链式的多次使用
    v-for     
            基于源数据多次渲染元素或模板块。此指令之值，必须使用特定语法 alias in expression ，为当前遍历的元素提供别名
    v-on    
            .stop - 调用 event.stopPropagation()。
            .prevent - 调用 event.preventDefault()。
            .capture - 添加事件侦听器时使用 capture 模式。
            .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
            .{keyCode | keyAlias} - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
            .native - 监听组件根元素的原生事件。
    v-bind
            .prop - 被用于绑定 DOM 属性。(what’s the difference?)
            .camel - transform the kebab-case attribute name into camelCase. (supported since 2.1.0)
            用法：

            动态地绑定一个或多个特性，或一个组件 prop 到表达式。

            在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象。可以通过下面的教程链接查看详情。

            在绑定 prop 时，prop 必须在子组件中声明。可以用修饰符指定不同的绑定类型。

            没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象。
    v-model
            v-model 并不关心表单控件初始化所生成的值。因为它会选择 Vue 实例数据来作为具体的值
* 双向绑定v-model
    <div id="app">
        <p>{{ message }}</p>
        <input type="text" v-model="message"/>
    </div>

### vue的钩子函数（生命周期）
    组件也是一样，每个阶段它的内部构造是不一样的。所以一般特定的钩子做特定的事，比如ajax获取数据就可以在mounted阶段.
    beforecreated：el 和 data 并未初始化
    created:完成了 data 数据的初始化，el没有
    beforeMount：完成了 el 和 data 初始化
    mounted ：完成挂载
    
* 举个栗子
    beforecreate ：可以在这加个loading事件
    created ：在这结束loading，还做一些初始化，实现函数自执行
    mounted ： 在这发起后端请求，拿回数据，配合路由钩子做一些事情
    beforeDestory： 你确认删除XX吗？ 
    destoryed ：当前组件已被删除，清空相关内容