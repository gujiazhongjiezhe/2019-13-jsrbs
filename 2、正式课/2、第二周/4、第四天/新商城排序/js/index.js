/* 
    第一步：从服务器获取数据，然后渲染到页面上
        1、创建一个变量，准备接收请求来的数据
        2、利用ajax请求数据，然后把数据放到一个变量中
            1、创建一个ajax实例
            2、打开一个请求连接，基于get请求同步完成
            3、监听服务器返回的信息状态，如果状态是200，而且状态码是4，证明数据请求成功
            4、发送ajax请求
        3、把请求来的数据赋值给变量接收
*/
let data = null; // 创建一个变量，准备接收请求来的数据
let cardBox = document.getElementById('cardBox');
let xhr = new XMLHttpRequest; // 创建一个ajax实例
xhr.open('GET', '../json/product.json', false); // 打开一个请求连接，基于get请求同步完成
xhr.onreadystatechange = function () {
    // 如果状态是200，而且状态码是4，证明数据请求成功
    if (xhr.status === 200 && xhr.readyState === 4) {
        // 把请求来的数据赋值给变量接收
        data = xhr.responseText;
    }
}
xhr.send() // 发送ajax请求

data = JSON.parse(data); // 把json格式的字符串转换为json格式的对象,要不然没法操作

renderHtml() //让渲染数据的方法执行

// 向页面渲染数据的方法
function renderHtml() {
    let htmlStr = ``; // 创建一个变量，准备接收拼接好的字符串
    data.forEach((item) => {
        let {time,hot,price,title} = item
        // 有多少项就循环多少次，就会往htmlStr里拼接多少个li
        // console.log(item)
        // 把每一个item的时间、热度、价格等属性自定义到结构体上
        htmlStr += `
        <li data-time="${item.time}" data-hot = "${item.hot}" data-price="${item.price}">
        <img src="${item.img}" alt="">
        <span>${item.title}</span>
        <span>${item.time}</span>
        <span>${item.hot}</span>
        <span>${item.price}</span>
    </li>
        `
    })
    console.log(htmlStr)
    cardBox.innerHTML = htmlStr; // 把字符串的数据渲染到页面
}

/* 
    第二步：点击相应的按钮进行按照时间、热度、价格进行排序
    1、向操作谁就获取谁
    2、给相应的元素绑定相应的事件
    3、在事件里做你想做的事
*/
let navList = document.getElementsByTagName('a'); // 获取三个按钮(a标签)
let cardList = cardBox.getElementsByTagName('li'); // 获取所有的li
// console.log(navList, cardList);
cardList = utils.toArray(cardList); // 把类数组转数组
for (var i = 0; i < navList.length; i++) {
    navList[i].flag = -1; // 给每一个a标签增加一个flag属性用来判断是升降续
    navList[i].index = i; // 给每一个按钮设置自定义属性，存储的是当前的索引
    navList[i].onclick = function () {
        // 此方法里的this就是你当前点击的元素
        this.flag *= -1; // 每点击一次就把当前元素身上的flag乘等于-1
        sortList.call(this);
        clearArrow.call(this);
        addArrow.call(this);
    }
}

function sortList() {
    // 这的this就是当前点击的元素
    let dataAry = ['data-time', 'data-hot', 'data-price']; // 属性映射表，通过当前点击按钮的索引，拿到映射表中对应的属性名
    // console.log(dataAry[this.index])

    cardList.sort((a, b) => {
        // 这的this就是当前点击的元素(a标签)
        console.log(this.flag);
        //当我们拿到数据进行页面渲染时，可以把我们想要用的数据绑定到标签的结构上
        // console.log(a,b)

        // 1、先通过按钮的索引拿到要进行排序的属性名，
        // 2、然后根据属性名拿到li结构上对应的属性值，
        // 3、把属性值重新赋值给变量a和b进行比较排序
        a = a.getAttribute(dataAry[this.index]);
        b = b.getAttribute(dataAry[this.index]);

        // 如果条件成立，说你点击的是时间按钮，时间中带有"-",不能进行相减
        if (this.index === 0) {
            // 把时间的"-"去掉
            a = a.replace(/-/g, '');
            b = b.replace(/-/g, '');
        }
        // flag为1的时候是升序，flag为-1的时候为降序
        // 利用return一个负数就会倒叙的原理来进行升降序的切换
        return (a - b) * this.flag
    })
    // console.log(cardList)

    // 把排好序的数组插入到页面中
    for (var i = 0; i < cardList.length; i++) {
        cardBox.appendChild(cardList[i])
    }
}

function clearArrow() {
    //这里的this就是当前点击的元素(a标签)
    // 元素.calssList:当前元素的class名列表
    // 元素.calssList.remove('class名'):移除指定的class名
    for (var i = 0; i < navList.length; i++) {
        if (this != navList[i]) {
            // 如果这个条件成立，那就是未被点击的按钮，把未被点击的按钮的flag置为默认值-1
            navList[i].children[0].classList.remove('bg');
            navList[i].children[1].classList.remove('bg');
            navList[i].flag = -1;
        }

    }
}

function addArrow() {
    // this就是当前点击的元素
    let up = this.children[0]; // 获取向上的箭头
    let down = this.children[1]; // 获取向下的箭头

    // 如果当前按钮的flag大于0，说明现在是升序
    if (this.flag > 0) {
        up.classList.add('bg');
        down.classList.remove('bg')
    } else {
        up.classList.remove('bg');
        down.classList.add('bg')
    }

}