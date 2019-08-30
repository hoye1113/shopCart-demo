$(function() {
    let id = parseInt(location.search.substring(4));
    $('.choose-item>.dd>a').removeClass('current'); //选择配色重置
    $('.choose-item>.dd>a').on('click', function(e) { //排他，可自由选配色
        e.preventDefault(); //阻止跳转
        $(this).siblings().removeClass('current');
        $(this).addClass('current');
    })

    let target = phoneData.find((e) => { //找数组对应的id
        let ID = parseInt(location.search.substring(4));
        if (e.pID == ID) {
            return e;
        }
    })
    $(".sku-name").text(target.name); //改名字
    $(".preview-img>img").attr('src', target.imgSrc); //改图片
    $(".summary-price .dd>em").text('¥' + target.price); //改价格
    let inputNumber = $('.choose-number'); //件数框
    let btnReduce = $(".reduce"); //减号
    let number;


    inputNumber.on('blur', function() {
        number = parseInt(inputNumber.val());
        number <= 2 ? btnReduce.addClass('disabled') : btnReduce.removeClass('disabled');
        if (isNaN(number)) {
            inputNumber.val(1);
            number = inputNumber.val();
        }
        number = Math.abs(inputNumber.val());
        inputNumber.val(number);
    })

    $('.add').on('click', function() {
        number = parseInt(inputNumber.val());
        number++;
        inputNumber.val(number);
        if (number > 1) {
            $('.reduce').removeClass('disabled');
        }
    })

    btnReduce.on('click', function() {
            number = parseInt($('.choose-number').val());
            if ($(this).hasClass('disabled')) {
                return;
            }
            if (number <= 2) {
                btnReduce.addClass('disabled');
            }
            number--;
            inputNumber.val(number);
        })
        // ---------------- 8月27号的新的代码
        // 给加入购物车按钮注册点击事件

    $('.addshopcar').on('click', function() {
        //构建我们要存储的数据对象，然后存储到localStorage里面
        // {
        //   pID : 商品的id,
        //   imgSrc : 图片的路径,
        //   name : 商品的名字和信息,
        //   price : 单价,
        //   number : 数量
        // }
        let json = localStorage.getItem('phone');
        let arr = JSON.parse(json);
        arr = arr || [];
        let number = parseInt(inputNumber.val())
        let mate = arr.find(e => {
            return e.pID === id;
        });
        if (mate) {
            mate.number += number;
        } else {
            let dataObj = {
                pID: target.pID,
                imgSrc: target.imgSrc,
                name: target.name,
                price: target.price,
                number: number
            }
            arr.unshift(dataObj);
        }
        json = JSON.stringify(arr);
        localStorage.setItem('phone', json);
        location.href = './cart.html';
    })
})