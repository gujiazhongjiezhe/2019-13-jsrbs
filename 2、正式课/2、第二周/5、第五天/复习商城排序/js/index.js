let data = null;

let xhr = new XMLHttpRequest;
xhr.open('GET','../json/product.json', false);
xhr.onreadystatechange = function(){
    if(xhr.status === 200&& xhr.readyState === 4){
        data = JSON.parse(xhr.responseText);
    }
}
xhr.send();
let cardBox =  document.getElementById('cardBox');
renderHtml()
function renderHtml(){
    let htmlStr = ``;
    for (var i = 0; i < data.length; i++) {
        var {title, time, hot, price, img} = data[i]
        htmlStr+=`
        <li data-time="${time}" data-hot="${hot}" data-price="${price}">
        <img src="${img}" alt="">
        <span>${title}</span>
        <span>${time}</span>
        <span>${hot}</span>
        <span>${price}</span>
    </li>
        ` 
    }
    cardBox.innerHTML = htmlStr
}

let navList = document.getElementsByTagName('a');
let cardList = document.getElementsByTagName('li');
cardList = utils.toArray(cardList);

for (var i = 0; i < navList.length; i++) {
    navList[i].index = i;
    navList[i].flag = -1;
    navList[i].onclick = function(){
        this.flag*=-1;
        sortList.call(this);
        clearArrow.call(this);
        addArrow.call(this);
    }
}

function sortList(){
    // this->当前点击的元素
    let _this = this; // 创建一个私有变量，用来存储当前作用域的this(this就是当前点击的元素)
    let dataAry = ['data-time','data-hot', 'data-price'];
    cardList.sort(function (a,b){
        a = a.getAttribute(dataAry[_this.index]);
        b = b.getAttribute(dataAry[_this.index]);
        if(_this.index === 0){
            a = a.replace(/-/g, '');
            b = b.replace(/-/g, '');
        }
        return (a-b)*_this.flag
    });
    let frg = document.createDocumentFragment();
    for (var i = 0; i < cardList.length; i++) {
        frg.appendChild(cardList[i])
    }
    cardBox.appendChild(frg)
}
function clearArrow(){
    for (var i = 0; i < navList.length; i++) {
        if(this !== navList[i]){
            navList[i].children[0].classList.remove('bg');
            navList[i].children[1].classList.remove('bg');
            navList[i].flag = -1;
        }

    }
}
function addArrow(){
    let up = this.children[0];
    let down = this.children[1];
    if(this.flag>0){
        up.classList.add('bg')
        down.classList.remove('bg')
    }
    else{
        up.classList.remove('bg')
        down.classList.add('bg')   
    }
}