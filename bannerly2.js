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

// // GLOBAL 全域input選擇後改變外觀
// let checkers = document.querySelectorAll('.custom-check');
// checkers.forEach((checker) => {
//     checker.addEventListener('click', (e) => {
//     		e.preventDefault();
//         let target = e.target;
//         let Parent = target.parentElement;
//         if (target.classList.contains('w--redirected-checked')) {
//             Parent.classList.add('js-selected');
//         } else {
//             Parent.classList.remove('js-selected');
//         }
//     })
// })

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

// GLOBAL 新增自定義選項（適用於radio select）
const customInputs = document.querySelectorAll('input[type="text"].js-custom-input:not(.dropdown)');
for (const customInput of customInputs) {
    customInput.addEventListener('change', (e) => {
        // 避免 refresh
        e.preventDefault();
        let target = e.target;
        let customRadio = target.previousElementSibling;
        let span = customRadio.querySelector('span');
        let input = customRadio.querySelector('input');
        let checker = customRadio.querySelector('div.custom-check');
        let parentDiv = target.parentElement;

        // 新增子元素之attribute隨user key-in變化
        let keyInText = target.value;
        span.innerText = keyInText;
        input.value = keyInText;
        input.id = keyInText;

        // 新增自定義選項後，相關DOM元素的反應
        let otherOptions = parentDiv.querySelectorAll(".custom-check");
        for (const otherOption of otherOptions) {

            // 當選項被新增 -> 隱藏Text Input，並取消選取其他選項，藉以擬仿radio的特性
            if (span.innerText.length != 0) {
                target.classList.add('js-toggle');
                customRadio.classList.remove('js-toggle');
                otherOption.classList.remove('w--redirected-checked');
                checker.classList.add('w--redirected-checked');
            }

            // 當選項被移除 -> 重新顯示Text Input，並清除原本已新增的選項
            function reset() {
                target.value = ""; // !-- 尚未檢查 target所鍵入value是否殘存
                target.classList.remove('js-toggle');
                customRadio.classList.add('js-toggle');
            }
            customRadio.addEventListener('click', reset)
            otherOption.parentElement.addEventListener('click', reset)

        }
    })
}


// GLOBAL 新增選項字數限制
// crefit 待補上
$('.js-length-10').on('input', function(e) {
    var $that = $(this),
        limit = 10; //調整字元數限制
    $that.attr('maxlength', limit);
    setTimeout(function() {
        var value = $that.val(),
            reg = /[\u4e00-\u9fa5]{1}/g,
            notReg = /\w{1}/g;
        var Cn = value.match(reg);
        var En = value.match(notReg);
        if (Cn) {
            limit = limit - (Cn.length * 2);
        }
        if (En) {

            limit = limit - En.length;
        }
        if (limit <= 0) {
            var finalLen = value.length + limit;
            value = value.substring(0, finalLen);
            $that.attr('maxlength', limit);
            $that[0].value = value;
        }
    }, 0);
});

// ----------------------------------------------------------------------------------------------------