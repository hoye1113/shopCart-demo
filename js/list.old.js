$(function () {
  // 需要在一开始加载页面的时候，就生成多个手机的商品
  // 遍历数组，根据每个数组，生成固定结构就可以了
  // console.log(phoneData); // 因为 数组是全局数组，可以直接使用
  let ul = $('.goods-list > ul');
  phoneData.forEach(e => {
    // 根据固定结构，生成商品
    let li = $(`<li class="goods-list-item">
    <a href="detail.html?id=1">
      <div class="item-img">
        <img src="${e.imgSrc}" alt="">
      </div>
      <div class="item-title">${e.name}</div>
      <div class="item-price">
        <span class="now">¥${e.price}</span>
      </div>
      <div class="sold">
        <span> 已售 <em>${e.percent}% </em></span>
        <div class="scroll">
          <div class="per" style="width:${e.percent}%"></div>
        </div>
        <span>剩余<i>${e.left}</i>件</span>
      </div>
    </a>
    <a href="#" class="buy">
      查看详情
    </a>
  </li>`);

    // 不建议把获取元素写到循环里面，在外面或取了之后，在里面使用即可
    ul.append(li);
  })
});