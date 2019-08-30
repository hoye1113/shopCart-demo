$(function() {

    let json = localStorage.getItem('phone'); //拿本地数据实现购物车的存库
    let arr = JSON.parse(json);
    arr = arr || [];

    if (arr.length !== 0) { //如果有数据就不要显示空空如也
        $('.empty-tip').hide();
        $('.cart-header').show();
        $('.total-of').show();
    }

    let html = '';
    arr.forEach(e => {
        html += `<div class="item" data-id="${e.pID}">
    <div class="row">
      <div class="cell col-1 row">
        <div class="cell col-1">
          <input type="checkbox" class="item-ck" checked="">
        </div>
        <div class="cell col-4">
          <img src="${e.imgSrc}" alt="">
        </div>
      </div>
      <div class="cell col-4 row">
        <div class="item-name">${e.name}</div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="price">${e.price}</em>
      </div>
      <div class="cell col-1 tc lh70">
        <div class="item-count">
          <a href="javascript:void(0);" class="reduce fl ${e.number === 1 ? 'disabled' : ''}">-</a>
          <input autocomplete="off" type="text" class="number fl" value="${e.number}">
          <a href="javascript:void(0);" class="add fl">+</a>
        </div>
      </div>
      <div class="cell col-1 tc lh70">
        <span>￥</span>
        <em class="computed">${e.price * e.number}</em>
      </div>
      <div class="cell col-1">
        <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
      </div>
    </div>
  </div>`;
    });
    $('.item-list').append(html); //将数据添加

    function phoneMoney() {
        /*
        1.拿cks的checked值
        2.用数组遍历拿出id放进数组
        3.去寻找id里匹配的价格和数量
        4.相加获得一个数
        5.把值显示出来
        */
        let cked = $('.item-list input[type=checkbox]:checked'),
            ids = [];
        cked.each((i, e) => {
            ids.push(parseInt($(e).parents('.item').attr('data-id')));
        });
        let json = localStorage.getItem('phone');
        let arr = JSON.parse(json);
        arr = arr || [];
        let pNumber = 0,
            money = 0;
        arr.forEach((e) => {
            if (ids.indexOf(e.pID) !== -1) {
                money += e.price * e.number;
                pNumber += e.number;
            }
        })

        $('.selected').text(pNumber);
        $('.total-money').text(money);
        // 计算总数
        let count = 0;
        arr.forEach(e => {
            count += e.number;
        });
        // 把件数设置给购物车的泡泡
        $('.shopcar > .count').text(count);
    }
    phoneMoney();

    let pick_all = $('.pick-all');
    let cks = $('.item-list input[type=checkbox]');


    // pick_all.on('click', function() {
    //     let flag = $(this).prop('checked');
    //     cks.prop('checked', flag);
    //     pick_all.prop('checked', flag);
    // });

    pick_all.on('click', e => {
        let flag = $(e.target).prop('checked');

        cks.prop('checked', flag);
        pick_all.prop('checked', flag);
        console.log($('.item-list input[type=checkbox]:checked'));
        phoneMoney();
    });


    cks.on('click', () => {
        let flag = $('.item-list input[type=checkbox]:checked').length == cks.length;
        pick_all.prop('checked', flag);
        phoneMoney();
    })
    $(".item-list").on('click', '.add', function() {
        let number = parseInt($(this).prev().val());
        let reduce = $(this).siblings('.reduce');
        number >= 1 ? reduce.removeClass('disabled') : reduce.addClass('disabled');
        number++;
        $(this).prev().val(number);
        let id = parseInt($(this).parents('.item').attr('data-id'));
        let json = localStorage.getItem('phone');
        let arr = JSON.parse(json);
        arr = arr || [];
        let target = arr.find(e => {
            return e.pID == id;
        });
        target.number = number;
        json = JSON.stringify(arr);
        localStorage.setItem('phone', json);
        phoneMoney();

    })
    $(".item-list").on('click', '.reduce', function() {
        let number = parseInt($(this).next().val());
        if ($(this).hasClass('disabled')) {
            return;
        }
        number--;
        number > 1 ? $(this).removeClass('disabled') : $(this).addClass('disabled');
        $(this).next().val(number);
        let id = parseInt($(this).parents('.item').attr('data-id'));
        let json = localStorage.getItem('phone');
        let arr = JSON.parse(json);
        arr = arr || [];
        let target = arr.find(e => {
            return e.pID == id;
        });
        target.number = number;
        json = JSON.stringify(arr);
        localStorage.setItem('phone', json);
        phoneMoney();
    })

    $(".item-list").on('blur', '.number', function() {
        let id = parseInt($(this).parents('.item').attr('data-id')),
            number = Math.abs(parseInt($(this).val()));
        $(this).val(number);
        if (isNaN(number)) {
            layer.tips('件数必须是一个数字', this);
            return;
        }
        let arr = hoye.getLocalDataArray('phone');
        let target = arr.find(e => {
            return e.pID == id;
        });
        target.number = number;
        json = JSON.stringify(arr);
        localStorage.setItem('phone', json);
        phoneMoney();
    })

    $('.item-list').on('click', '.item-del', function() {
        let _this = this;
        let id = parseInt($(this).parents('.item').attr('data-id'));
        // layer.confirm('提示内容',选项,yes-点确定的回调函数,cancel-取消的回调函数)
        layer.confirm('您确定要删除吗？', {
            btn: ['确定', '取消'] //按钮
        }, function(index) {
            // 把对应的一行移除
            // console.log(_this);
            $(_this).parents('.item').remove();
            // 把对应的数据从本地数据中移除
            let arr = hoye.getLocalDataArray('phone');
            arr.forEach((e, i) => {
                if (e.pID === id) {
                    arr.splice(i, 1);
                }
            });
            // 覆盖回本地
            hoye.saveLocalDataArray('phone', arr);
            // 重新计算
            phoneMoney();
            // 把弹出层关闭
            layer.close(index);
            if (arr.length === 0) {
                $('.empty-tip').show();
                $('.cart-header').hide();
                $('.total-of').hide();
            }
        });


    })















})