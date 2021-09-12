// 此JS文件主要為Bannerly做了Webflow Designer無法支援的JS Events細部功能設定

//////// comment前綴說明
// "GLOBAL" -> 應用於全站所有相關物件
// "GLOBAL/@pagename" -> 為了特定頁面之相關物件從「全站通用」衍生出的區塊
// "@pagename" -> 只應用於某特定頁面的相關物件
// "+WD" -> 與Webflow Designer配合工作
// "!--" -> 有潛在疑慮
// "!++" -> 疑慮排除但需持續注意
// "???" -> 尚未測試or已遺忘當初目的
// "credit" -> 參考來源 
// test

// GLOBAL 跨區叫喚
let calleds = document.querySelectorAll('[data-called]');
let callers = document.querySelectorAll('[data-caller]');
callers.forEach((caller) => {
    caller.addEventListener('click', (e) => {
        let target = e.target;
        let dataCaller = target.dataset.caller;

        calleds.forEach((called) => {
            let dataCalled = called.dataset.called;
            if (dataCalled == dataCaller) { // !++ condition等式兩端不可互換
                called.classList.remove('js-toggle');
            } else {
                called.classList.add('js-toggle');
            }
        })

    })
})

// GLOBAL txt input文字題輸入時(placeholder消失時)，跳出輔助文字
let txtInputs = document.querySelectorAll('input[type=text]');
for (const txtInput of txtInputs) {
    txtInput.addEventListener('input', (e) => {
        let target = e.target;
        target.previousElementSibling.style.display = "block";
    })
}

// ----------------------------------------------------------------------------------------------------