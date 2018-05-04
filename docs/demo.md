---
sidebar: false
---

# 演示

## 强提示
:::tip  
adas
:::
:::success Notice 
默认的主题提供了一个首页（`Homepage`）的布局 (用于 <a href="#">这个网站的主页</a>)。想要使用它，需要在你的根级 README.md 的 <a href="#">YAML front matter</a> 指定 home: true。以下是这个网站实际使用的数据
:::
:::danger  
adas
:::
:::warning  
adas
:::
:::info  
adas
:::

:::dark  
adas
:::

## 列表
:::list 标题
dasda
:::
:::list.danger 标题
- dasda
- addasdasd
:::

:::list.warning 标题
dasda
:::

:::list.success 标题
dasda
:::

:::list.dark 标题
dasda
:::


## 组件演示
默认的主题提供了一个首页（`Homepage`）的布局 (用于 <a href="#">这个网站的主页</a>)。想要使用它，需要在你的根级 README.md 的 <a href="#">YAML front matter</a> 指定 home: true。以下是这个网站实际使用的数据：
### 时间轴
<p>
<seal-timeline>
  <timeline color="primary">
    <h3>发布1.0.0</h3>
    <p>发布时间：2018-05-01</p>
    <p><a href="#">初步排除网络异常1</a></p>
    <p>初步排除网络异常2</p>
  </timeline>
  <timeline color="danger">
    <seal-icon name="share" slot="dot"></seal-icon>
    <p>初步排除网络异常1</p>
    <p>初步排除网络异常2</p>
  </timeline>
  <timeline color="success">
    <p>初步排除网络异常1</p>
    <p>初步排除网络异常2</p>
  </timeline>
</seal-timeline>
</p>

## Vue

<template>
  <div class="vue-demo">
    <SealButton type="danger">红色按钮</SealButton>
    <SealButton type="success">绿色按钮</SealButton>
    <SealAlert type="success" title="提示信息" description="提示内容"></SealAlert>
    <SealAlert>提示</SealAlert>
    <SealAvatar icon="user" shape="square"></SealAvatar>
  </div>  
</template>

### MD


``` js
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

<style lang="stylus">
  .vue-demo
    padding 1rem
    border 1px solid #ebeef5
    margin 1rem 0
    border-radius 3px
    > div
      margin 0.5rem 0
      &:last-child
        margin-bottom 0
</style>