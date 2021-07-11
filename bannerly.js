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


// GLOBAL 新增自定義選項（適用於radio select）
const customOptions = document.querySelectorAll('input[type="text"].js_custom_option');
for (const customOption of customOptions) {
    customOption.addEventListener('change', (e) => {
        // 避免 refresh
        e.preventDefault();
        let target = e.target;

        // 新增母元素與子元素
        // !++ 與webflow預設的input結構不相同
        let input = document.createElement('input');
        let label = document.createElement('label');
        let span = document.createElement('span');
        label.appendChild(input);
        label.appendChild(span);

        // 新增元素的外觀設定
        span.style.fontWeight = "normal";
        input.style.display = "none";
        label.classList.add('a-button', 'as_chip', 'js_selected');

        // 新增母元素的指定位置
        let parentDiv = target.parentElement;
        parentDiv.appendChild(label);

        // 新增子元素之attribute隨user key-in變化
        let keyInText = target.value;
        span.textContent = keyInText;
        input.value = keyInText;
        input.textContent = keyInText;
        let groupName = target.previousElementSibling.querySelector("input").name //webflow radio select 需設置群體名稱
        input.name = groupName;
        input.dataset.name = groupName;
        input.type = "radio";
        input.classList.add('w--redirected-checked');
        input.checked = true; // ??? 與上一行取捨

        // 新增自定義選項後，相關DOM元素的反應
        let otherOptions = parentDiv.querySelectorAll(".custom_check");
        for (const otherOption of otherOptions) {

            // 當選項被新增 -> 隱藏Text Input，並取消選取其他選項，藉以擬仿radio的特性
            if (input.textContent.length != 0) {
                target.classList.remove('js_toggle_display');
                otherOption.classList.remove('w--redirected-checked');
            }

            // 當選項被移除 -> 重新顯示Text Input，並清除原本已新增的選項
            function reset() {
                target.value = ""; // !-- 尚未檢查 target所鍵入value是否殘存
                target.classList.add('js_toggle_display');
                label.remove();
            }
            label.addEventListener('click', reset)
            otherOption.parentElement.addEventListener('click', reset)

        }
    })
}


// GLOBAL 新增選項字數限制
// crefit 待補上
$('.js_lengthlimit').on('input', function(e) {
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
                called.classList.remove('js_toggle_display');
            } else {
                called.classList.add('js_toggle_display');
            }
        })

    })
})

// ----------------------------------------------------------------------------------------------------



// ----------------------------------------------------------------------------------------------------

// @Detail-Entries
// #Copywrighting 多項文案區塊切換時的縮放互動
let cpCards = document.querySelectorAll('[data-card=copywright]');
for (const cpCard of cpCards) {

    let expandArrows = document.querySelectorAll('.js_expand');
    for (const expandArrow of expandArrows) {
        expandArrow.addEventListener('click', (e) => {
                let target = e.target;
                let targetBlock = target.parentElement.querySelector('.js_copywright');
                let cardContent = target.parentElement;
                let currentCard = cardContent.parentElement;

                let cpTxtInput = cpCard.querySelector('.js_copywright');
                let cpCardContent = cpCard.firstElementChild;
                let cpExpandArrow = cpCard.querySelector('.js_expand');

                // 縮小的card -> 1)不顯示txt input  2)card尺寸較窄小  3)顯現“expand”箭頭
                if (cpCard == currentCard) {
                    target.classList.add("js_hide");
                    targetBlock.classList.add("js_show");
                    cardContent.classList.remove("js_resize");
                } else {
                    cpExpandArrow.classList.remove("js_hide");
                    cpTxtInput.classList.remove("js_show");
                    cpCardContent.classList.add("js_resize");
                }
            })
            // 卡片小標更換：僅有在場的card才會被依序標上版本數字
        let cpBlock = document.querySelector("#Copywrighting");
        cpBlock.addEventListener('click', (e) => {
            //以數字標示card，最大值為3
            let shownCards = [...cpCards].filter(element => element.classList.contains('js_show'));
            let nums = [0, 1, 2];
            for (const num of nums) {
                let numValue = num + 1;

                let cardTitle = shownCards[num].querySelector(".field_title");
                cardTitle.textContent = "文案 " + numValue;
                if (cardTitle.parentElement.classList.contains("js_resize") == true) {
                    cardTitle.textContent = "文案 " + numValue + ", 套用至"; // 被縮小的card，其標題在閱讀上接續"套用通路"
                } else if (cardTitle.parentElement.classList.contains("js_resize") == false) {
                    cardTitle.textContent = "文案 " + numValue; // 放大檢視的card，其標題簡短敘述"
                } else {
                    cardTitle.textContent = "";
                }
            }
        })

    }
}

// #Copywrighting 新增文案：最初顯示1版本，最多新增至3版本
let addVR = document.querySelector(".js_add_copywright");
addVR.addEventListener('click', (e) => {
    let hiddenDiv = document.querySelectorAll("[data-card=copywright]:not(.js_show)");
    if (hiddenDiv.length > 0) {
        hiddenDiv[0].classList.add("js_show");
    } else {
        alert("文案版本上限為3種");
    }
})

// #Copywrighting 刪除文案版本，但第1版因txt input為required，不放置delete圖示亦無法刪除
let removes = document.querySelectorAll(".js_remove");
for (const remove of removes) {
    remove.addEventListener('click', (e) => {
        let c = e.target;
        let cCard = c.parentElement.parentElement;
        let cCardContent = c.parentElement;
        let cCardArrow = cCard.querySelector('.js_expand');
        let cTxtInput = cCard.querySelector('.js_copywright');

        let aCard = cpCards[0];
        let aCardContent = aCard.firstElementChild;
        let aCardArrow = aCard.querySelector('.js_expand');
        let aTxtInput = aCard.querySelector('.js_copywright');
        cCard.classList.remove("js_show");
        if (!cCardContent.classList.contains('js_resize')) {
            aCardArrow.classList.add("js_hide");
            aTxtInput.classList.add("js_show");
            aCardContent.classList.remove("js_resize");

            cCardArrow.classList.remove("js_hide");
            cTxtInput.classList.remove("js_show");
            cCardContent.classList.add("js_resize");
        }
    })
}