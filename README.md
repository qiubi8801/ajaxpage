# ajaxPage
a ajaxPage based on jquery

###HTML结构
```html
<div id="J_page" class="ui-pagination"></div>

###调用
```javascript
$('#J_page').ajaxPage({
    "limit" : 10,       //每页要显示的数据条数(与 dataCount 搭配使用 不可与pageTotal共存，pageTotal优先级高)
    "dataCount" : 300,  //后台总的数据条数(与 limit 搭配使用 不可与pageTotal共存，pageTotal优先级高)
    "curNum" : 5,       //当前页码
    "pageTotal" : 10,   //总页码
    "pageLen" : 5,      //省略号中间要显示的页码结构个数
    "isHaveSelect" : true,  //是否有select下拉
    "isHaveGoLink" : true,  //是否有直达输入框和按钮
    "isHaveTotal" : true,   //是否显示页码总计
    "onChange" : function(pageNun){     //切换页码的回调
        //console.log(pageNun);
    }
})
