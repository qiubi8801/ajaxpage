# ajaxPage
a ajaxPage based on jquery

```javascript
$('#J_page').ajaxPage({
    "limit" : 10,
    "dataCount" : 300,
    "curNum" : 5,
    "pageTotal" : 10,
    "pageLen" : 5,
    "isHaveSelect" : true,
    "isHaveGoLink" : true,
    "isHaveTotal" : true,
    "onChange" : function(pageNun){
        //console.log(pageNun);
    }
})
