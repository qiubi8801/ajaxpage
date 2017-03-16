
/*
    * 异步分页
    * @method $(selector).ajaxPage({})
    * @param {Number}     limit            每页要显示的数据条数(与 dataCount 搭配使用 不可与pageTotal共存，pageTotal优先级高)
    * @param {Number}     dataCount        后台总的数据条数(与 limit 搭配使用 不可与pageTotal共存，pageTotal优先级高)
    * @param {Number}     curNum           当前页码
    * @param {Number}     pageTotal        总页码
    * @param {Number}     pageLen          省略号中间要显示的页码结构个数
    * @param {Boolean}    isHaveSelect     是否有select下拉
    * @param {Boolean}    isHaveGoLink     是否有直达输入框和按钮
    * @param {Boolean}    isHaveTotal      是否显示页码总计
    * @param {function}   onChange         页码更改时的回调
*/
;$.fn.ajaxPage = function(options){

    var defaults = {
        "limit" : 10,
        "dataCount" : 300,
        "curNum" : 5,
        "pageTotal" : 10,
        "pageLen" : 5,
        "isHaveSelect" : false,
        "isHaveGoLink" : false,
        "isHaveTotal" : true,
        "onChange" : function(pagenum){}
    };

    var ops = $.extend(defaults, options);

    return this.each(function(){
        var _this = $(this),
            _pageLenHalf = parseInt(ops.pageLen / 2)
            _total = 0;

        //总页码，由dataCount和limit得出或取自于pageTotal
        if(ops.pageTotal){
            _total = ops.pageTotal
        }else{
            _total = Math.ceil(ops.dataCount / ops.limit);
        }

        function _init(){
            _getPager(ops.curNum);
        }

        function _getPager(pageTo){
            if (!isNaN(pageTo)){
                ops.curNum = parseInt(pageTo);
            }
            _creatPager();
            ops.onChange(pageTo);
        }

        function _creatPager(){
            var arr = [];
            if (ops.pageTotal <= 1){
                _this.html('');
                return;
            }
            arr.push('<ul>');

            var beginInx = ops.curNum - _pageLenHalf <= 0 ? 1 : ops.curNum - _pageLenHalf;
            var endIdx = ops.curNum + _pageLenHalf >= _total ? _total : ops.curNum + _pageLenHalf;

            if (_total >= ops.pageLen){
                if (beginInx < _pageLenHalf){
                    endIdx = ops.pageLen;
                }
                if (beginInx > _total - ops.pageLen){
                    beginInx = _total - ops.pageLen + 1;
                }
            }

            //分页结构开始
            if (ops.curNum <= 1){
                arr.push('<li class="disabled"><span>首页</span></li><li class="disabled"><span>上一页</span></li>');
            } else {
                arr.push('<li class="goFirst"><a href="#" class="pageTo" pageto="1">首页</a></li><li class="goPrev"><a href="#" class="pageTo" pageto="'+ (ops.curNum - 1) +'">上一页</a></li>');
            }

            if (beginInx > 1){
                arr.push('<li><a href="#" class="pageTo" pageto="1">1</a></li>');
            }
            if (beginInx > 2){
                arr.push('<li class="dotted"><span>...</span></li>');
            }

            for (var i = beginInx; i <= endIdx; i++){
                arr.push('<li'+ (i == ops.curNum ? ' class="curPage"' : '') +'><a href="#" class="pageTo" pageto="'+ i +'">'+ i +'</a></li>');
            }
            if (endIdx < _total - 1){
                arr.push('<li class="dotted"><span>...</span></li>');
            }
            if (endIdx < _total){
                arr.push('<li><a class="pageTo" href="#" pageTo="' + _total + '">' + _total + '</a></li>');
            }

            if (ops.curNum >= _total){
                arr.push('<li class="disabled"><span>下一页</span></li><li class="disabled"><span>末页</span></li>');
            } else {
                arr.push('<li class="goNext"><a href="#" class="pageTo" pageto="'+ (ops.curNum + 1) +'">下一页</a></li><li class="goLast"><a href="#" class="pageTo" pageto="'+ _total +'">末页</a></li>');
            }

            if(ops.isHaveTotal){
                arr.push('<li class="pageTotal"><span>共 '+ _total +' 页</span></li>');
            }

            if (ops.isHaveSelect){
                arr.push('<li class="pageSelect"><select id="selectPageNum">');
                for (var i = 1; i <= _total; i++){
                    arr.push('<option' + (i == ops.curNum ? ' selected="selected"' : '') + ' value="' + i +'">第' + i + '页</option>');
                }
                arr.push('</select></li>');
            }

            if (ops.isHaveGoLink){
                arr.push('<li class="goPage">');
                    arr.push('<span>到 </span>');
                    arr.push('<input type="text" class="targetPage" value="'+ ops.curNum +'"/>');
                    arr.push('<span> 页</span>');
                arr.push('</li>');
                arr.push('<li>');
                    arr.push('<a href="#" class="btnConfirm">确定</a>');
                arr.push('</li>');
            }
            arr.push('</ul>');
            var pageHtml = $(arr.join(''));

            $('a.pageTo', pageHtml).on('click',function (e){
                e.preventDefault();
                var pageTo = $(this).attr('pageto');
                _getPager(pageTo);
            });

            $('#selectPageNum', pageHtml).on('change',function (){
                var pageTo = $(this).val();
                _getPager(pageTo);
            });

            $('.btnConfirm', pageHtml).on('click',function (e){
                e.preventDefault();
                var text = $('.targetPage', pageHtml);
                if ($.trim(text.val()) == '' || isNaN(text.val()) || parseInt(text.val()) < 0 || parseInt(text.val()) > _total){
                    text.css('border', '1px solid red');
                    return false;
                }
                text.css('border', '1px solid #CCC');
                _getPager(text.val());
            });
            _this.html(pageHtml);
        }
        _init();
    });
};











