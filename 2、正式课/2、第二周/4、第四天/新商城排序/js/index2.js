let data = null;
let xhr = new XMLHttpRequest;
xhr.open('get', '../json/product.json', false);
xhr.onreadystatechange = function () {
    // ajax的请求是分步骤执行的，每执行一步当前绑定的函数就会执行一次
    if (xhr.status === 200 && xhr.readyState === 4) {
        data = xhr.responseText;
    }
}
xhr.send();

data = JSON.parse(data);
let cardBox = document.getElementsByTagName('csrdBox');
renderHtml();
function renderHtml() {
    let htmlStr = ``;
    data.forEach((item)=>{
        htmlStr+=`
        <li>
            <img src="${item.img}" alt="">
            <span>标题：${item.title}</span>
            <span>热度：${item.hot}</span>
            <span>价格：${item.price}</span>
        </li>
        `
    })
    cardBox.innerHTML = htmlstr;
}