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
// test test

// GLOBAL 跨區叫喚
let calleds = document.querySelectorAll("[data-called]");
let callers = document.querySelectorAll("[data-caller]");
callers.forEach((caller) => {
    caller.addEventListener("click", (e) => {
        let target = e.target;
        let dataCaller = target.dataset.caller;

        calleds.forEach((called) => {
            let dataCalled = called.dataset.called;
            if (dataCalled == dataCaller) {
                // !++ condition等式兩端不可互換
                called.classList.remove("js-toggle");
            } else {
                called.classList.add("js-toggle");
            }
        });
    });
});

// GLOBAL 新增自定義選項（適用於radio select）
const customInputs = document.querySelectorAll(
    'input[type="text"].js-custom-input:not(.dropdown)'
);
for (const customInput of customInputs) {
    customInput.addEventListener("change", (e) => {
        let target = e.target;
        let customRadio = target.previousElementSibling;
        let span = customRadio.querySelector("span");
        let input = customRadio.querySelector("input");
        let checker = customRadio.querySelector(".custom-check");
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
                target.classList.add("js-toggle");
                customRadio.classList.remove("js-toggle");
                otherOption.classList.remove("w--redirected-checked");
                checker.classList.add("w--redirected-checked");
            }

            // 當選項被移除 -> 重新顯示Text Input，並清除原本已新增的選項
            function reset() {
                target.value = ""; // !-- 尚未檢查 target所鍵入value是否殘存
                target.classList.remove("js-toggle");
                customRadio.classList.add("js-toggle");
            }
            customRadio.addEventListener("click", reset);
            otherOption.parentElement.addEventListener("click", reset);
        }
    });
}

// GLOBAL 新增選項字數限制
// crefit 待補上
$(".js-length-10").on("input", function(e) {
    var $that = $(this),
        limit = 10; //調整字元數限制
    $that.attr("maxlength", limit);
    setTimeout(function() {
        var value = $that.val(),
            reg = /[\u4e00-\u9fa5]{1}/g,
            notReg = /\w{1}/g;
        var Cn = value.match(reg);
        var En = value.match(notReg);
        if (Cn) {
            limit = limit - Cn.length * 2;
        }
        if (En) {
            limit = limit - En.length;
        }
        if (limit <= 0) {
            var finalLen = value.length + limit;
            value = value.substring(0, finalLen);
            $that.attr("maxlength", limit);
            $that[0].value = value;
        }
    }, 0);
});
$(".js-length-6").on("input", function(e) {
    var $that = $(this),
        limit = 6; //調整字元數限制
    $that.attr("maxlength", limit);
    setTimeout(function() {
        var value = $that.val(),
            reg = /[\u4e00-\u9fa5]{1}/g,
            notReg = /\w{1}/g;
        var Cn = value.match(reg);
        var En = value.match(notReg);
        if (Cn) {
            limit = 0;
        }
        if (En) {
            limit = limit - En.length;
        }
        if (limit <= 0) {
            var finalLen = value.length + limit;
            value = value.substring(0, finalLen);
            $that.attr("maxlength", limit);
            $that[0].value = value;
        }
    }, 0);
});

//GLOBAL .label 點按響應 (含dropCard、tabBox)
document.addEventListener("click", (e) => {
    let target = e.target; //以下宣告皆假設target為.label.full-touch

    //for labels in dropCards
    if (target.classList.contains("label") &&
        !target.parentElement.parentElement.classList.contains("f-block") &&
        !target.parentElement.parentElement.classList.contains("div-266h") &&
        !target.parentElement.parentElement.parentElement.parentElement.classList.contains("for-query")) {
        let tChecker = target.parentElement.querySelector(".custom-check");
        let tBtn = target.parentElement;
        let tGroup = target.parentElement.parentElement;
        let tDPBox = target.parentElement.parentElement.parentElement.parentElement;
        let tInput = tDPBox.querySelector(".input.dropdown");
        let tDropCard = target.parentElement.parentElement.parentElement;
        let colL = tDPBox.parentElement.parentElement;
        let colR = colL.nextElementSibling;

        //多選選項
        if (tDropCard.dataset.drop == "multi") {
            if (!tChecker.classList.contains("js-selected")) {
                tChecker.classList.add("js-selected");
                target.dataset.select = "true"; //for textarea文字同步
            } else if (tChecker.classList.contains("js-selected")) {
                tChecker.classList.remove("js-selected");
                target.dataset.select = ""; //for textarea文字同步
            }
        }

        // 單選選項專用響應 -> 模擬radio input
        if (
            tDropCard.dataset.drop == "single"
        ) {
            let allCheckers = tDropCard.querySelectorAll(".custom-check");
            for (const allChecker of allCheckers) {
                allChecker.classList.remove("js-selected");
            }
            tChecker.classList.add("js-selected");
        }

        // 單選input專用響應 -> input value 不累加
        if (
            tChecker.classList.contains("js-selected") &&
            tInput.dataset.drop == "single"
        ) {
            tInput.value = target.textContent;
        } else {
            tInput.value = "";
        }

        // ec 尺寸數量同步
        if (target.dataset.ec == null) {
            let sizeCount = tGroup.querySelectorAll(".js-selected").length;
            let tCardBox = tGroup.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
            let ecTabs = tCardBox.querySelectorAll(".label[data-tab]");
            for (const ecTab of ecTabs) {
                let countResult = ecTab.nextElementSibling;
                if (tGroup.dataset.group === ecTab.dataset.tab) {
                    countResult.textContent = sizeCount;
                }
            }
        }

        //ec tab 多選專用響應
        let tTabs =
            tDPBox.parentElement.parentElement.querySelectorAll(".label[data-tab]");
        for (const tTab of tTabs) {
            if (target.dataset.ec === tTab.dataset.tab) {
                if (tChecker.classList.contains("js-selected")) {
                    tTab.parentElement.classList.add("js-show");
                } else if (!tChecker.classList.contains("js-selected")) {
                    tTab.parentElement.classList.remove("js-show");
                }
            }
        }

        //針對自dropdown input甫新增的選項
        function revealAll() {
            let tOptions = tGroup.querySelectorAll(".a-button.as-list");
            for (const tOption of tOptions) {
                tOption.classList.remove("js-hide");
            }
        } //將filter後的其他選項取消隱藏

        function confirmAppended() {
            tChecker.classList.add("js-selected");
            let tNewStr = target.textContent.replace("新增「", "").replace("」", "");
            target.textContent = tNewStr;
            tInput.value = tNewStr;
            target.dataset.custom = "confirmed";
        } //將 >>> 新增「」<<< 字樣刪除，並切換data-custom狀態

        function newTab() {
            let tabBtn = document.createElement("div");
            let tabLabel = document.createElement("div");
            let tabCounter = document.createElement("div");

            target.dataset.ec = target.textContent;

            //新增 new tab
            tabBtn.classList.add("a-button", "as-tab", "js-hide", "js-show");
            tabLabel.classList.add("label", "full-touch");
            tabCounter.classList.add("_12px-500", "as-counts", "in-tab");
            tabLabel.textContent = tInput.value;
            tabCounter.textContent = "0";
            tabBtn.appendChild(tabLabel);
            tabBtn.appendChild(tabCounter);
            let tabGroup = colL.querySelector("[data-box=tab]");
            tabGroup.insertBefore(tabBtn, tabGroup.children[0]);

            //新增 new dropGroup
            let newDropGroup = document.createElement("div");
            newDropGroup.classList.add("drop-group", "js-hide", "js-show");
            let dropBox = colR.querySelector(".drop-card");
            dropBox.insertBefore(newDropGroup, dropBox.querySelectorAll('[data-group]')[0]);

            //新增 new textArea
            let textAreaBox = colR.querySelector("[data-box=textarea]");
            let newTextArea = document.createElement("textarea");
            let oldTextAreas = textAreaBox.querySelectorAll('textarea');
            let strLength = oldTextAreas[0].dataset.name.length;
            let serial = oldTextAreas[0].dataset.name.slice(strLength - 2, strLength);
            newTextArea.maxLength = '5000';
            // newTextArea.placeholder = "↑點按以選擇" + tInput.value + "尺寸";
            newTextArea.placeholder = "";
            newTextArea.classList.add(
                "input",
                "as-textarea",
                "bulk-select",
                "unclickable",
                "js-hide",
                "w-input",
                "js-show"
            );
            textAreaBox.insertBefore(newTextArea, oldTextAreas[0]);

            //添加dataset custom + nth
            let nth = tabGroup.querySelectorAll('[data-nth]').length; //判斷目前有幾個自定義通路已存在
            if (nth < 3) {
                nth += 1;
                tabLabel.dataset.nth = nth;
                tabLabel.dataset.tab = 'custom' + nth;
                newDropGroup.dataset.group = 'custom' + nth;
                newTextArea.name = 'custom' + nth + serial;
                newTextArea.dataset.name = 'custom' + nth + serial;
                newTextArea.id = 'custom' + nth + serial;
            } else {
                tabBtn.remove();
                newDropGroup.remove();
                newTextArea.remove();
            }
        }

        if (target.dataset.custom == "pending") {
            confirmAppended();
            revealAll();
            if (tInput.dataset.drop == "ec") {
                if (colL.querySelectorAll('[data-nth]').length < 3) {
                    newTab();
                } else {
                    tDropCard.querySelectorAll('[data-custom=confirmed]')[0].parentElement.remove();
                    console.log(colL.parentElement.querySelector('.hinter-box'));
                    colL.parentElement.querySelector('.hinter-box.nth-alert').style.display = 'block';
                    setTimeout(() => {
                        colL.parentElement.querySelector('.hinter-box.nth-alert').style.display = 'none';
                    }, 3000)
                }
            }
        } else if (target.dataset.select == 'true') {
            revealAll();
        }

        // ec drop option 點擊響應 -> 預設第一個tab以及相關dropGroup, textArea顯現
        if (tInput.dataset.drop == "ec") {
            let colL = tDPBox.parentElement.parentElement;
            let indicator = colL.querySelector(".indicator");
            let shownTabs = colL.querySelectorAll(".a-button.as-tab.js-show");
            let tSizeInput = tDPBox.parentElement.parentElement.parentElement.querySelectorAll('.input.dropdown')[1];

            if (shownTabs.length != 0) {

                for (const shownTab of shownTabs) {
                    let tabName = shownTabs[0].firstElementChild.textContent;

                    //ec tab indicator 顯示/隱藏條件
                    let tabLength = shownTabs.length;
                    if (tabLength > 0) {
                        indicator.style.display = "block";
                    } else {
                        indicator.style.display = "none";
                    }

                    //每次選取/取消選取，tabBox重新更新「第一個」tab以及相關dropGroup, textArea顯現
                    shownTab.style.color = "rgba(47, 90, 58, 0.5)";
                    shownTabs[0].style.color = "rgba(47, 90, 58, 1)";
                    let tDropGroups =
                        colL.nextElementSibling.querySelectorAll(".drop-group");
                    for (const tDropGroup of tDropGroups) {
                        tDropGroup.classList.remove("js-show");
                        if (tDropGroup.dataset.group === tabName) {
                            tDropGroup.classList.add("js-show");
                        }
                    }
                    let tTextAreas =
                        colL.nextElementSibling.querySelectorAll(".as-textarea");
                    for (const tTextArea of tTextAreas) {
                        tTextArea.classList.remove("js-show");
                        let areaName = tTextArea.dataset.name;
                        if (areaName.slice(0, areaName.length - 2) === tabName) {
                            tTextArea.classList.add("js-show");
                        }
                    }

                    tSizeInput.placeholder = '請輸入' + tabName + '尺寸';
                }
            } else if (shownTabs.length == 0) {
                tSizeInput.placeholder = '請輸入尺寸';
            }
        }

        //多選選項value同步至textarea
        let tTextAreas = tDPBox.parentElement.parentElement.querySelectorAll("textarea");
        for (const tTextArea of tTextAreas) {
            let areaName = tTextArea.dataset.name;
            if (tInput.dataset.drop != "ec" && tDropCard.dataset.drop == "multi") {
                if (tGroup.dataset.group === areaName.slice(0, areaName.length - 2) ||
                    tGroup.dataset.group === tTextArea.dataset.name) {
                    let multiSelecteds = tGroup.querySelectorAll("[data-select=true]");
                    let TextStr = Array.from(multiSelecteds, (x) => x.textContent);
                    tTextArea.value = TextStr.join("\n");
                }
            }
        } //!!!此段必須放在confirmAppended();執行之後，否則新增的選項將會讀取到未replace前的>>>新增「」字樣<<<
    } //end of if statement : for labels in dropCards
}); //end of document click event
//end of  GLOBAL .label 點按響應 (含dropCard、tabBox)

//GLOBAL input輸入時/輸入後響應
let dropInputs = document.querySelectorAll(".input.dropdown");
for (const dropInput of dropInputs) {
    let dropCard = dropInput.parentElement.querySelector(".drop-card");

    dropInput.addEventListener("input", (e) => {
        let target = e.target;
        let capInput = target.value.toLowerCase();

        //選項隨著輸入值對照而進一步顯示or隱藏
        let dropOptions = dropCard.querySelectorAll("div.label");
        for (const dropOption of dropOptions) {
            //let label = dropOption.querySelector('div.label');
            let capLabel = dropOption.textContent.toLowerCase();

            dropOption.parentElement.classList.add("js-hide");

            if (capLabel.includes(capInput)) {
                dropOption.parentElement.classList.remove("js-hide");
            }
        }
    }); //end of dropInput input event

    //輸入後若無match字符 -> 新增選項
    let timer,
        timeoutVal = 0; // time it takes to wait for user to stop typing in ms

    // detects when the user is actively typing
    //dropInput.addEventListener('keypress', handleKeyPress);
    // triggers a check to see if the user is actually done typing
    dropInput.addEventListener("keyup", handleKeyUp);


    function newOption() {
        let pendingOptions = dropCard.querySelectorAll("[data-custom=pending]");
        for (const pendingOption of pendingOptions) {
            pendingOption.parentElement.remove();
        } //在新增建議選項前，便已刪除其他未選的建議選項 -> 每次輸入時都只有1個建議選項存在
        let keyInText = dropInput.value;
        let dropGroup = dropCard.querySelector(".drop-group.js-show");
        let button = document.createElement("div");
        let label = document.createElement("div");
        let checker = document.createElement("div");

        button.appendChild(label);
        button.appendChild(checker);
        button.classList.add("a-button", "as-list");
        label.classList.add("label", "full-touch");
        checker.classList.add("custom-check", "tick-right");
        label.textContent = "新增" + "「" + keyInText + "」";
        dropGroup.insertBefore(button, dropGroup.children[0]);
        label.dataset.custom = "pending";
    } //end of newOption()

    function handleKeyUp(e) {
        window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
        timer = window.setTimeout(() => {
            if (dropInput.value != "") {
                newOption();
            }
            // let dropInputConcated = dropInput.value
            //     .replace(dropInput.value, "")
            //     .concat("新增「", dropInput.value, "」");
            let pendingOptions = dropCard.querySelectorAll("[data-custom=pending]");
            let existingOptions = dropCard.querySelectorAll(
                ".label:not([data-custom=pending])"
            );
            let existingStrUpper = Array.from(existingOptions, (e) =>
                e.textContent.toLowerCase()
            );
            let dropInputUpper = dropInput.value.toLowerCase();
            //for (const pendingOption of pendingOptions) {
            if (dropInput.value == "") {
                pendingOptions[0].parentElement.remove(); //刪掉所有input字符後->刪
                //} else if (e.keyCode == 8) {
                //pendingOptions[0].parentElement.remove(); //只要按下清除鍵->刪
            } else if (existingStrUpper.indexOf(dropInputUpper) != -1) {
                pendingOptions[0].parentElement.remove(); //與既存選項同名者->刪
            }
            //}
        }, timeoutVal);
    } //end of handleKeyUp()

    dropInput.addEventListener("focus", (e) => {
        let target = e.target;
        target.select(); //全選文字
        let tOptions = dropInput.parentElement
            .querySelector(".drop-group.js-show")
            .querySelectorAll(".a-button.as-list");
        for (const tOption of tOptions) {
            tOption.classList.remove("js-hide");
        }
    });
} //end of dropInput loop !!!
//end of GLOBAL input輸入時/輸入後響應

//Global general dropdown behaviours
var dropCards = document.querySelectorAll(".drop-card");
for (const dropCard of dropCards) {
    //排除filter query //!!!新舊衝突
    if (dropCard.parentElement.dataset.query == null) {
        //multi-dropdown input value 顯現>>>已選N項<<<
        document.addEventListener("click", (e) => {
            let target = e.target;
            let multiDropCards = document.querySelectorAll(
                ".drop-card[data-drop=multi]"
            );
            for (const multiDropCard of multiDropCards) {
                let shownGroup = multiDropCard.querySelector(".drop-group.js-show");
                let checkCount = shownGroup.querySelectorAll(".js-selected").length;
                let input = multiDropCard.parentElement.querySelector(".input.dropdown");

                if (target.dataset.drop == "multi" && input == document.activeElement) {
                    input.value = "";
                } else if (input != document.activeElement) {
                    if (checkCount == "0") {
                        input.value = "";
                    } else {
                        input.value = "已選" + checkCount + "項";
                    }
                }
                //!!!瀏覽器讀取if condition延遲
                // if (target.nextElementSibling.nextElementSibling.classList.contains('drop-card')) {
                //     let tDropcard = target.nextElementSibling.nextElementSibling;
                //     if( tDropcard.style.height = '0px'){
                //         tDropcard.style.borderWidth = '0px';
                //     } else {
                //         tDropcard.style.borderWidth = '1px';
                //     }
                // }
            }
        });

        //dropCard 範圍外收合下拉選單
        document.addEventListener("click", (e) => {
            let target = e.target;
            let dropArrow = dropCard.parentElement.querySelector(".dropdown-arrow"); // for global collapse
            let tDropCard = target.parentElement.parentElement.parentElement; // for expandByLabel
            let pendingOption = document.querySelector("[data-custom=pending]");

            function globalCollapse() {
                dropCard.classList.add("js-collapsed");
                dropArrow.classList.remove("js-rotated");
                dropArrow.classList.add("unclickable");
            }
            if (!dropCard.classList.contains("js-collapsed")) {
                globalCollapse();
                if (pendingOption != null) {
                    pendingOption.parentElement.remove();
                }
            } //無論點選何處，dropCard預設全數收回

            function expandByInput() {
                target.parentElement.querySelector(".drop-card").classList.remove("js-collapsed");
                target.parentElement.querySelector(".dropdown-arrow").classList.add("js-rotated");
                target.parentElement.querySelector(".dropdown-arrow").classList.remove("unclickable");
            }

            function expandByLabel() {
                tDropCard.classList.remove("js-collapsed");
                tDropCard.parentElement.querySelector(".dropdown-arrow").classList.add("js-rotated");
                tDropCard.parentElement.querySelector(".dropdown-arrow").classList.remove("unclickable");
            }

            if (!target.classList.contains("unclickable")) {
                if (target.classList.contains("input") &&
                    target.classList.contains("dropdown")) {
                    expandByInput(); //點選input時 -> dropdown開啟
                } else if (
                    target.classList.contains("label", "full-touch") &&
                    tDropCard.dataset.drop == "multi"
                ) {
                    expandByLabel(); //點選multi dropCard中的label時 -> dropdown開啟
                }
            }

            //如果點按在unclickable的input（#Size）
            if (target.classList.contains('dropdown-box') && target.dataset.query == '') { //排除filter query//!!!新舊衝突
                if (target.firstElementChild.classList.contains("unclickable")) {
                    //若是點按尚未選擇通路的尺寸input
                    let colL = target.parentElement.parentElement.previousElementSibling; //in this case, target=dropdown-box
                    let ecSelected = colL.querySelectorAll(".js-selected");
                    let hinter = colL.querySelector(".hinter-box");
                    if (ecSelected.length == 0) {
                        hinter.classList.add("js-shake");
                        setTimeout(function() {
                            hinter.classList.remove("js-shake");
                        }, 200);
                    }
                }
            }
        });

        //dropCard 範圍內點擊響應
        dropCard.addEventListener("click", (e) => {
            let target = e.target;
            let tDropCard = target.parentElement.parentElement.parentElement;

            function keepExpand() {
                tDropCard.classList.remove("js-collapsed");
                tDropCard.parentElement
                    .querySelector(".dropdown-arrow")
                    .classList.add("js-rotated");
                tDropCard.parentElement
                    .querySelector(".dropdown-arrow")
                    .classList.remove("unclickable");
            }

            function collapse() {
                tDropCard.classList.add("js-collapsed");
                tDropCard.parentElement
                    .querySelector(".dropdown-arrow")
                    .classList.remove("js-rotated");
                tDropCard.parentElement
                    .querySelector(".dropdown-arrow")
                    .classList.add("unclickable");
            }
            if (target.classList.contains("label")) {
                if (tDropCard.dataset.drop == "single") {
                    collapse();
                } else if (tDropCard.dataset.drop == "multi") {
                    keepExpand();
                } //single dropCard點按選項時一按即收合 / multi dropCard點按選項時保持開啟
            } //!-- 尚未考慮使用tab切換選項的使用情境

            //若dropCard 無任何選項，顯現empty alert
            // if (dropCard.querySelectorAll('.a-button.as-list').length == 0 && dropCard.querySelector('.empty-alert') == null) {
            //     function emptyAlert() {
            //         let labelAlert = document.createElement('div');
            //         labelAlert.textContent = '尚未加入任何選項';
            //         labelAlert.classList.add('label', 'full-touch', 'empty-alert');
            //         dropCard.appendChild(labelAlert);
            //     }
            //     emptyAlert;
            // } else if (dropCard.querySelectorAll('.a-button.as-list').length != 0 && dropCard.querySelector('.empty-alert') != null) {
            //     dropCard.querySelector('.empty-alert').remove();
            // }
        }); //end of dropCard click event
    }
} //end of dropCard loop
//end of Global general dropdown behaviours

// ----------------------------------------------------------------------------------------------------

//@Index 專屬區塊
if (!window.location.href.includes('form-apply') && !window.location.href.includes('custom-apply')) {
    //Result dropDown Label 點擊響應
    //!!!待解，jQuery不接受'js-'開頭的class name???
    $('[data-name=designer]').parent().find('.label').click(function() {
        if (!$(this).siblings('.custom-check').hasClass('j-selected')) {
            $(this).parentsUntil('.drop-card').find('.custom-check').removeClass('j-selected');
            $(this).siblings('.custom-check').addClass('j-selected');
        }
    })

    //Result Tab 點擊響應
    $('.label[data-ec]').click(function() {
        $(this).parent().siblings().not('.indicator').css('color', 'rgba(47, 90, 58, 0.5)');
        $(this).parent().css('color', 'rgba(47, 90, 58, 1)');

        let tabGroup = $(this).parent().parent();
        let eachLabel = tabGroup.find('.label[data-ec]');
        let eachResult = tabGroup.parent().parent().find('[data-output]');
        console.log(eachResult)
        let i;
        for (i = 0; i < eachLabel.length; i++) {
            if (eachLabel.eq(i).text() == $(this).text()) {
                eachResult.css('display', 'none');
                eachResult.eq(i).css('display', 'block');

                i = i * 36 + 'px';
                tabGroup.find('.a-button.as-tab.indicator').css('top', i);
            }
        }
    })

    $('.back-home').click(function() {
        $('.container.output').removeClass('js-show');

        //defaulting output blocks

        //pd count area
        $('[data-output=P-count-A], [data-output=P-count-B], [data-output=P-count-C]').text('0');

        //img area
        $('.img').remove();
        $('.block-pool').each(function() {
            if ($(this).find('.img').length == 0) {
                // $(this).parent().css('display', 'none');
                $(this).css({
                    'padding-left': '8px',
                    'color': 'rgba(47, 90, 58, 0.5)'
                });
                $(this).text('');
            }
        })

        //tab area
        $('.a-button.as-tab.indicator').css('top', '0px');
        $('.col-left').find('.a-button').not('.indicator').css('color', 'rgba(47, 90, 58, 0.5)');
        $('.col-left').find('.a-button').not('.indicator').first().css('color', 'rgba(47, 90, 58, 1)');
        $('.col-right').find('[data-output]').css('display', 'none');
        $('.col-right').find('[data-output]').first().css('display', 'block');
    })
}


// ----------------------------------------------------------------------------------------------------

//@Form-apply、@Custom-apply 專屬區塊
if (window.location.href.includes('form-apply') || window.location.href.includes('custom-apply')) {

    //修正browser tab resize位移
    window.addEventListener('resize', () => {
        // console.log(window.innerHeight);
        window.scrollBy(window.innerHeight, 0);
    })

    //date-range-picker 年份處理
    $(document).click(function() {
        if ($('.date-input').val().length > 0) {
            let year = $('.date-input').val().slice(0, 4);
            $('.date-input').attr('data-year', year);
            $('.date-input').val($('.date-input').val().replaceAll(year + '/', ''));
        }
    })

    //@form-apply 案型增減響應
    let swiper = document.querySelector("div.swiper");

    //頁面loading後預設隱藏未被新增的案型
    window.onload = function() {
        swiper.style.opacity = "0";
        swiper.style.display = "none";

        let unhandleds = document.querySelectorAll("[data-handle=false]");
        for (const unhandled of unhandleds) {
            unhandled.classList.add("js-hide");
        }
    };

    //swiper只有在特定範圍內才會出現
    document.addEventListener("scroll", () => {
        let start = document.querySelector("#Copywright");
        let startOffset = start.getBoundingClientRect();
        let startTop = startOffset.top;

        let end = document.querySelector("#Size");
        let endOffset = end.getBoundingClientRect();
        let endTop = endOffset.top;

        // console.log('startTop' + startTop);
        // console.log('endTop' + endTop);
        if (endTop < -50 || startTop > 50) {
            swiper.style.opacity = "0";
            swiper.classList.add('unclickable');
        } else {
            swiper.style.display = "flex";
            swiper.style.opacity = "1";
            swiper.classList.remove('unclickable');

            //copied from returnEdit
            let swiperIcon = swiper.querySelector(".icon_28x.for-swiper");
            let swiperOptions = swiper.querySelectorAll(".a-button");
            swiperIcon.classList.add("js-edit");
            swiperIcon.classList.remove("js-add");
            for (const swiperOption of swiperOptions) {
                let remove = swiperOption.querySelector(".js-remove");
                remove.style.display = "none";
                swiperOption.style.backgroundColor = "transparent";
            }
        }
    });

    document.addEventListener("click", (e) => {
        let target = e.target;
        let swiperIcon = swiper.querySelector(".icon_28x.for-swiper");
        let swiperOptions = swiper.querySelectorAll(".a-button");
        let sections = document.querySelectorAll("#Copywright, #Product, #Size");

        //案型增減
        let hiddenSwipers = swiper.querySelectorAll(".a-button[data-handle=false]");
        for (const section of sections) {
            let hiddenBoxes = section.querySelectorAll(".card-box[data-handle=false]");
            let shownSwipers = swiper.querySelectorAll(".a-button[data-handle=true]");

            function disableAllSwipers() {
                for (const shownSwiper of shownSwipers) {
                    shownSwiper.classList.remove("js-active");
                    shownSwiper.querySelector(".swiper-indicator").style.height = "0px";
                }
            }

            //新增案型（將隱藏的案型轉換為「可操作」的案型）
            if (target.classList.contains("js-add")) {
                disableAllSwipers();
                hiddenSwipers[0].classList.remove("js-hide");
                hiddenSwipers[0].dataset.handle = "true";
                hiddenBoxes[0].classList.remove("js-hide");
                hiddenBoxes[0].dataset.handle = "true";

                let shownSwipers = swiper.querySelectorAll(".a-button[data-handle=true]"); //!!需重新定義一次shownSwipers
                let n = shownSwipers.length;
                n -= 1;
                shownSwipers[n].classList.add("js-active");
                shownSwipers[n].querySelector(".swiper-indicator").style.height = "4px";

                let swiped = section.querySelector(".swiped");
                swiped.style.marginLeft = "-" + 688 * 2 * n + "px"; //swiped視窗推至最右邊
                let shownCards = section.querySelectorAll(".card-box[data-handle=true]");
                shownCards[n].style.transform = "rotateY(0deg)";
                shownCards[n].style.opacity = "1";
                shownCards[n].classList.remove("js-hide");
                shownCards[n].dataset.handle = "true";
            }

            //刪除案型 (將指定刪除的案型及其相聯的card-box隱藏起來)
            if (target.classList.contains("js-remove")) {
                let allRemoveBtns = target.parentElement.parentElement.querySelectorAll('.js-remove');
                if (target != allRemoveBtns[0]) { //第一個案型不可刪除
                    let serial =
                        target.previousElementSibling.previousElementSibling.textContent.charAt(
                            3
                        );
                    serial -= 1;
                    let shownCards = section.querySelectorAll(".card-box");
                    shownCards[serial].classList.add("js-hide");
                    shownCards[serial].dataset.handle = "false";
                    shownCards[0].style.transform = "rotateY(0deg)";
                    shownCards[0].style.opacity = "1";
                    shownCards[0].classList.remove("js-hide");
                    shownCards[0].dataset.handle = "true";

                    disableAllSwipers();
                    shownSwipers[0].classList.add("js-active");
                    shownSwipers[0].querySelector(".swiper-indicator").style.height = "4px";
                    shownSwipers[0].classList.remove("js-hide");
                    shownSwipers[0].dataset.handle = "true";

                    target.parentElement.classList.remove("js-active");
                    target.parentElement.querySelector(".swiper-indicator").style.height =
                        "0px";
                    target.parentElement.classList.add("js-hide");
                    target.parentElement.dataset.handle = "false";

                    let swiped = section.querySelector(".swiped");
                    swiped.style.marginLeft = "0px"; //swiped視窗推至最左邊
                }
            }

            //新增or刪除案型「之後」產生案型編號
            let i;
            for (i = 0; i < shownSwipers.length; i++) {
                let n = i + 1;
                shownSwipers[i].firstElementChild.textContent = "案型 " + n;
                // !!無法同步數值至capTitle
                // let shownBoxes = section.querySelectorAll('.card-box[data-handle=true]');
                // let m = shownSwipers[i].firstElementChild.textContent.charAt(3);
                // let capTitle = shownBoxes[i].querySelector('.cap-title');
                // if (capTitle.textContent.length < 5) {
                //     capTitle.textContent = '案型 ' + m + '\xa0\xa0' + capTitle.textContent;
                // } else {
                //     capTitle.textContent.replace(4, m);
                // }
            }
        }

        //點按swiper -> swiper-indicator + 全頁swiped移動
        if (
            target.classList.contains("a-button") &&
            target.classList.contains("for-swiper") &&
            !target.classList.contains("js-remove")
        ) {
            for (const swiperOption of swiperOptions) {
                swiperOption.classList.remove("js-active");
                swiperOption.querySelector(".swiper-indicator").style.height = "0px";
                target.classList.add("js-active");
                target.querySelector(".swiper-indicator").style.height = "4px";
            }
            for (const section of sections) {
                let swiped = section.querySelector(".swiped");
                let serial = target.firstElementChild.textContent.charAt(3);
                serial -= 1;
                swiped.style.marginLeft = "-" + 688 * 2 * serial + "px";
                let cardBoxes = section.querySelectorAll(".card-box[data-handle=true]");

                function selfTransform() {
                    cardBoxes[serial].style.transform = "rotateY(0deg)";
                    cardBoxes[serial].style.opacity = "1";
                }

                function nextTransform() {
                    cardBoxes[serial + 1].style.transform = "rotateY(-80deg)";
                    cardBoxes[serial + 1].style.opacity = "0";
                }

                function prevTransform() {
                    cardBoxes[serial - 1].style.transform = "rotateY(80deg)";
                    cardBoxes[serial - 1].style.opacity = "0";
                }

                if (cardBoxes.length == 3) {
                    if (serial == 1) {
                        selfTransform();
                        prevTransform();
                        nextTransform();
                    }
                    if (serial == 0) {
                        selfTransform();
                        nextTransform();
                    }
                    if (serial == 2) {
                        selfTransform();
                        prevTransform();
                    }
                } else if (cardBoxes.length == 2) {
                    if (serial == 0) {
                        selfTransform();
                        nextTransform();
                    }
                    if (serial == 1) {
                        selfTransform();
                        prevTransform();
                    }
                }
            }
        }

        //swiper edit mode基本切換
        if (
            target.classList.contains("js-edit") ||
            target.classList.contains("js-add")
        ) {
            editMode();
            // setTimeout(returnEdit, 3000);
        } else {
            returnEdit();
        }

        function editMode() {
            swiperIcon.classList.remove("js-edit");
            swiperIcon.classList.add("js-add");
            for (const swiperOption of swiperOptions) {
                let remove = swiperOption.querySelector(".js-remove");
                remove.style.display = "block";
                swiperOption.style.backgroundColor = "rgba(59,122,71,0.2)";
            }
        }

        function returnEdit() {
            swiperIcon.classList.add("js-edit");
            swiperIcon.classList.remove("js-add");
            for (const swiperOption of swiperOptions) {
                let remove = swiperOption.querySelector(".js-remove");
                remove.style.display = "none";
                swiperOption.style.backgroundColor = "transparent";
            }
        }
    }); //end of @form-apply 案型增減響應

    //tab + indicator 響應
    let tabBoxs = document.querySelectorAll("[data-box=tab]");
    for (const tabBox of tabBoxs) {
        tabBox.addEventListener("click", (e) => {
            let target = e.target;
            let tBox = target.parentElement.parentElement;
            let indicator = tBox.querySelector(".indicator"); //! 不需要使用target.querySelector
            let shownTabs = tBox.querySelectorAll(".a-button.js-show");
            let tabLength = shownTabs.length;

            for (const shownTab of shownTabs) {
                // ec tab 點擊響應
                if (target.dataset.tab != null) {
                    shownTab.style.color = "rgba(47, 90, 58, 0.5)";
                    target.parentElement.style.color = "rgba(47, 90, 58, 1)";

                    let tCol = target.parentElement.parentElement.parentElement;
                    let tDropGroups =
                        tCol.nextElementSibling.querySelectorAll(".drop-group");
                    for (const tDropGroup of tDropGroups) {
                        tDropGroup.classList.remove("js-show");
                        if (tDropGroup.dataset.group === target.dataset.tab) {
                            tDropGroup.classList.add("js-show");
                        }
                    }

                    let tabName = shownTab.firstElementChild.textContent;
                    let tSizeInput = tCol.nextElementSibling.querySelector('[data-dropfor=size]');
                    if (target == shownTab.firstElementChild) {
                        tSizeInput.placeholder = '請輸入' + tabName + '尺寸';
                    }

                    let tTextAreas =
                        tCol.nextElementSibling.querySelectorAll(".as-textarea");
                    for (const tTextArea of tTextAreas) {
                        tTextArea.classList.remove("js-show");
                        let areaName = tTextArea.dataset.name;
                        // console.log(areaName.slice(0,areaName.length-2));
                        //去除textArea序號以核對
                        if (areaName.slice(0, areaName.length - 2) === target.dataset.tab) {
                            tTextArea.classList.add("js-show");
                        }
                    }

                    //tab 切換 -> indicator移動
                    for (i = 0; i < tabLength; i++) {
                        let topV = i * 36 + "px";
                        if (shownTabs[i] == target.parentElement) {
                            indicator.style.top = topV;
                        }
                    }
                }
            } // end of shownTab loop
        }); //end of ecTabsCol click event
    } //end of ecTabsCol loop

    //@form-apply hinter 響應
    //dropdown hinter提示
    window.addEventListener("load", () => {
        let dropInputs = document.querySelectorAll(".input.dropdown");
        for (const dropInput of dropInputs) {
            if (dropInput.dataset.name.includes("S-count2")) {
                dropInput.classList.add("unclickable");
            }
        }
    });

    document.addEventListener("click", () => {
        let hinters = document.querySelectorAll(".hinter-box.for-ec");

        for (const hinter of hinters) {
            let tDropOptions = hinter.parentElement.querySelectorAll(".js-selected");
            if (tDropOptions.length == 0) {
                hinter.style.display = "block";

                let colR =
                    hinter.parentElement.parentElement.parentElement.nextElementSibling;
                let inputR = colR.querySelector(".input.dropdown");
                inputR.classList.add("unclickable");
            } else {
                hinter.style.display = "none";

                let colR =
                    hinter.parentElement.parentElement.parentElement.nextElementSibling;
                let inputR = colR.querySelector(".input.dropdown");
                inputR.classList.remove("unclickable");
            }
        }
    }); //end of dropdown hinter提示

    //其他hinter提示
    window.addEventListener("load", () => {
        let hinters = document.querySelectorAll(".hinter-box.in-card, .hinter-box.for-swiper, .hinter-box.for-thunder");
        for (const hinter of hinters) {
            hinter.style.display = 'none';
        }

        //預設日期txtInput.value =""
        let dateInput = document.querySelector('.date-input');
        dateInput.value = "";
    });

    //swiper hinter 響應
    let removeBtn = document.querySelectorAll('.swiper .js-remove');
    removeBtn[0].addEventListener("click", () => {
        let swprHinter = document.querySelector(".hinter-box.for-swiper");
        swprHinter.style.display = "block";
        swprHinter.classList.add("js-shake");
        setTimeout(function() {
            swprHinter.classList.remove("js-shake");
        }, 200);
        setTimeout(function() {
            swprHinter.style.display = "none";
        }, 2000);
    });

    //in-card hinter 響應
    let nextBtns = document.querySelectorAll('[data-next], .submit.w-button');
    for (const nextBtn of nextBtns) {
        nextBtn.addEventListener("click", () => {
            let tSection = nextBtn.parentElement.parentElement;
            if (tSection.id == 'Info' || tSection.id == 'Visual' || tSection.id == 'Submit') {
                let fBlocks = tSection.querySelectorAll('.f-block');
                let f;
                for (f = 0; f < fBlocks.length; f++) {
                    if (tSection.id == 'Info') {
                        txtInputCheck();
                        radioInputCheck();
                    } else if (tSection.id == 'Visual') {
                        radioInputCheck();
                    } else if (tSection.id == 'Submit') {
                        console.log('submit')
                        txtInputCheck();
                        txtAreaCheck();
                    }

                    function txtInputCheck() {
                        if (fBlocks[f].querySelector('input[type=text]:not(.js-length-10)') && //若有txtInput未填寫
                            fBlocks[f].querySelector('input[type=text]').value == "") {
                            fBlocks[f].querySelector('.hinter-box').style.display = 'block';
                        }
                    }

                    function radioInputCheck() {
                        if (fBlocks[f].querySelector('input[type=radio]') && //若radio Input全無勾選
                            !fBlocks[f].querySelector('.w--redirected-checked')) {
                            fBlocks[f].querySelector('.hinter-box').style.display = 'block';
                        }
                    }

                    function txtAreaCheck() {
                        if (fBlocks[f].querySelector('textarea') && //若textArea未填寫
                            fBlocks[f].querySelector('textarea').value == "") {
                            fBlocks[f].querySelector('.hinter-box').style.display = 'block';
                        }
                    }
                }
            } else if (tSection.id == 'Copywright' || tSection.id == 'Product' || tSection.id == 'Size') {
                let swipeds = document.querySelectorAll('.swiped');
                let cardBoxes = tSection.querySelectorAll('.card-box:not(.js-hide)'); //必須屬於可操作案型
                let c;
                for (c = 0; c < cardBoxes.length; c++) {
                    if (tSection.id == 'Copywright') {
                        txtAreaCheck();
                        swipeTo();
                    }
                    if (tSection.id == 'Product') {
                        txtAreaCheck();
                        swipeForProduct();
                    }
                    if (tSection.id == 'Size') {
                        sizeCheck();
                        swipeForSize();
                    }

                    function swiping() {
                        let swipers = document.querySelectorAll('.a-button.for-swiper[data-handle=true]');
                        for (const swiper of swipers) {
                            let indicator = swiper.querySelector('.swiper-indicator');
                            swiper.classList.remove('js-active');
                            indicator.style.height = "0px";
                            swipers[c].classList.add('js-active');
                            swipers[c].querySelector('.swiper-indicator').style.height = "4px";
                        }

                        for (const swiped of swipeds) {
                            swiped.style.marginLeft = "-" + 688 * 2 * c + "px";
                            let cardBoxes = swiped.querySelectorAll('.card-box:not(.js-hide)'); //重新定義carBox為全頁物件
                            cardBoxes[c].style.transform = "rotateY(0deg)";
                            cardBoxes[c].style.opacity = "1";
                            if (cardBoxes[c + 1]) {
                                cardBoxes[c + 1].style.transform = "rotateY(-80deg)";
                                cardBoxes[c + 1].style.opacity = "0";
                            }
                            if (cardBoxes[c - 1]) {
                                cardBoxes[c - 1].style.transform = "rotateY(80deg)";
                                cardBoxes[c - 1].style.opacity = "0";
                            }
                        }
                    }

                    function swipeForProduct() {
                        let allHinters = tSection.querySelectorAll('.hinter-box');
                        if (allHinters[c].style.display == 'block') {
                            allHinters[c].dataset.shown = 'true';
                        }
                        let shownHinters = tSection.querySelectorAll('.hinter-box[data-shown=true]');

                        if (shownHinters[0] == allHinters[c]) {
                            swiping();
                        }
                    }

                    function swipeForSize() {
                        let allHinters = tSection.querySelectorAll('.hinter-box');
                        for (const allHinter of allHinters) {
                            if (allHinter.style.display == 'block') {
                                allHinter.dataset.shown = 'true';
                            }
                        }
                        let shownHinters = tSection.querySelectorAll('.hinter-box[data-shown=true]');
                        let colLs = tSection.querySelectorAll('.col-left');
                        if (shownHinters[0].parentElement.parentElement.parentElement === colLs[c] ||
                            shownHinters[0].parentElement.parentElement.parentElement.parentElement === colLs[c]) { //判斷S-count1序號，並考量ecDrop hinter以及sizeTab hinter兩種情形
                            console.log(c);
                            console.log(shownHinters[0]);
                            swiping();
                        }
                    }

                    function txtAreaCheck() {
                        if (cardBoxes[c].querySelector('textarea') && //若textArea(主標)未填寫
                            cardBoxes[c].querySelector('textarea').value == "") {
                            cardBoxes[c].querySelector('.hinter-box').style.display = 'block';
                        }
                    }

                    function sizeCheck() {
                        let sizeTabs = cardBoxes[c].querySelectorAll('.a-button.as-tab:not(.indicator)');
                        for (const sizeTab of sizeTabs) {
                            if (sizeTab.querySelector('.as-counts').textContent == "0") { //若有通路未選尺寸，需要創造hinter-box
                                let hinterBox = document.createElement('div');
                                let hinterLabel = document.createElement('div');
                                let hinterTriangle = document.createElement('div');
                                hinterBox.classList.add('hinter-box', 'in-card', 'lower-pos');
                                hinterLabel.classList.add('_12px-500', 'for-hinter');
                                hinterTriangle.classList.add('hinter-triangle', 'in-card');
                                hinterBox.appendChild(hinterLabel);
                                hinterBox.appendChild(hinterTriangle);
                                hinterBox.dataset.shown = 'true';
                                hinterLabel.textContent = '尺寸未選';
                                sizeTab.insertBefore(hinterBox, null);
                            }
                        }
                    }
                }
            }
        });

        function pass() {
            console.log('pass');
        }
    }

    //thunder hinter 響應
    let thunderBoxes = document.querySelectorAll('.th-box');
    for (const thunderBox of thunderBoxes) {
        thunderBox.addEventListener('mouseenter', (e) => {
            let target = e.target;
            let hinter = target.querySelector('.hinter-box');
            hinter.style.display = "block";
        });
        thunderBox.addEventListener('mouseleave', (e) => {
            let target = e.target;
            let hinter = target.querySelector('.hinter-box');
            hinter.style.display = "none";
        });
    } //end of @form-apply hinter 響應

    //快速套用主案型
    // let thunderBoxes = document.querySelectorAll('.th-box');
    for (const thunderBox of thunderBoxes) {
        thunderBox.addEventListener('click', (e) => {
            let target = e.target;
            let tCardBox = target.parentElement.parentElement.parentElement; //.thunder-apply 位於card-cap
            let tSwiped = tCardBox.parentElement;
            let MASTER = tSwiped.querySelectorAll('.card-box')[0];

            if (!target.querySelector('.thunder').classList.contains('js-thunder')) {
                //案型套用
                let tTextAreas = tCardBox.querySelectorAll('textarea');
                let mTextAreas = MASTER.querySelectorAll('textarea');
                let keyName = MASTER.querySelector('[data-name]').dataset.name;

                //分為三種區塊進行核對
                if (keyName.includes('C-')) {
                    //@Copywright區塊
                    for (const tTextArea of tTextAreas) {
                        for (const mTextArea of mTextAreas) {
                            tTextArea.value = mTextArea.value; //textArea Sync
                        }
                    }
                    let tTxtInputs = tCardBox.querySelectorAll('input[type=text]');
                    let mTxtInputs = MASTER.querySelectorAll('input[type=text]');
                    for (const tTxtInput of tTxtInputs) {
                        for (const mTxtInput of mTxtInputs) {
                            let tName = tTxtInput.dataset.name;
                            let mName = mTxtInput.dataset.name;
                            if (tName.slice(0, tName.length - 2) == mName.slice(0, mName.length - 2)) {
                                tTxtInput.value = mTxtInput.value; //textInput Sync
                            }
                        }
                    }
                } else if (keyName.includes('P-')) {
                    //@Product區塊
                    for (const tTextArea of tTextAreas) {
                        for (const mTextArea of mTextAreas) {
                            tTextArea.value = mTextArea.value; //textArea Sync
                        }
                    }
                    mirror(); //dropOption Sync
                } else if (keyName.includes('S-')) {
                    mirror(); //dropOption Sync
                }

                function mirror() {
                    let tDropCards = tCardBox.querySelectorAll('.drop-card');
                    let tGroups = tCardBox.querySelectorAll('[data-group]');
                    let mGroups = MASTER.querySelectorAll('[data-group]');

                    if (tDropCards.length == 1) { //指涉#Product區塊
                        mirroring();
                    } else if (tDropCards.length == 2) { //指涉#Size區塊
                        mirroringGroups(); // 因#Size區塊可能會發生Group數量異動（新增通路時）
                        mirroring();
                    }

                    //更新 size dropgroups
                    function mirroringGroups() {
                        let tg;
                        for (tg = 1; tg < tGroups.length; tg++) {
                            if (tGroups[tg].dataset.group != 'xxx') { //data-group=xxx是預留的.js-show，為了保持global dropdown behaviour的運作
                                tDropCards[1].removeChild(tGroups[tg]);
                            }
                        }

                        function createGroup() {
                            let newGroup = document.createElement('div');
                            newGroup.dataset.group = "";
                            newGroup.classList.add('drop-group', 'js-hide');
                            tDropCards[1].insertBefore(newGroup, tLeftGroups[0]); //tLeftGroups[0]=[data-group=xxx]
                        }

                        let tLeftGroups = tDropCards[1].querySelectorAll('[data-group]');
                        let offset = mGroups.length - 1 - tLeftGroups.length; //判斷案型1比當下案型多出多少group，但須先排除ecTabs與[data-group='xxx']
                        let o;
                        for (o = 1; o <= offset; o++) createGroup(o);

                        let tNGroups = tCardBox.querySelectorAll('[data-group]'); //若不重新定義，瀏覽器將抓取被刪除的但仍記憶著的tGroups
                        let tng;
                        for (tng = 0; tng < tNGroups.length; tng++) {
                            tNGroups[tng].dataset.group = mGroups[tng].dataset.group;
                        }
                    }

                    function mirroring() {
                        let tNGroups = tCardBox.querySelectorAll('[data-group]');
                        let tng;
                        for (tng = 0; tng < tNGroups.length; tng++) {

                            function createGroupOption() {
                                let button = document.createElement("div");
                                let label = document.createElement("div");
                                let checker = document.createElement("div");
                                button.appendChild(label);
                                button.appendChild(checker);
                                button.classList.add("a-button", "as-list");
                                label.classList.add("label", "full-touch");
                                checker.classList.add("custom-check", "tick-right");
                                label.dataset.custom = "confirmed";
                                label.dataset.select = "";
                                label.dataset.ec = "";
                                tNGroups[tng].insertBefore(button, null);
                            }

                            //僅針對dropGroup[0]
                            let tBtns = tNGroups[tng].querySelectorAll('.a-button');
                            if (tBtns != null) {
                                let t;
                                for (t = 0; t < tBtns.length; t++) tNGroups[tng].removeChild(tBtns[t]);
                                // 將m、n分開核對，因為m不一定等於n
                            }

                            let mBtns = mGroups[tng].querySelectorAll('.a-button');
                            let m;
                            for (m = 0; m < mBtns.length; m++) createGroupOption(m + 1);
                            let tNewBtns = tNGroups[tng].querySelectorAll('.a-button');

                            let tLabels = tNGroups[tng].querySelectorAll('.label');
                            let mLabels = mGroups[tng].querySelectorAll('.label');
                            for (m = 0; m < mBtns.length; m++) {
                                tLabels[m].textContent = mLabels[m].textContent;
                                tLabels[m].dataset.ec = mLabels[m].textContent;
                            }

                            // 新增 textArea 響應區塊
                            if (tCardBox.querySelector('[data-box=textarea]') != null) {
                                let tAreaBox = tCardBox.querySelector('[data-box=textarea]');
                                let mAreaBox = MASTER.querySelector('[data-box=textarea]');
                                let tTextAreas = tAreaBox.querySelectorAll('textarea');
                                let mTextAreas = mAreaBox.querySelectorAll('textarea');

                                for (t = 0; t < tTextAreas.length; t++) tAreaBox.removeChild(tTextAreas[t]);
                                for (m = 0; m < mTextAreas.length; m++) createTextArea(m);
                                for (m = 0; m < mTextAreas.length; m++) renameTextArea(m);

                                function createTextArea() {
                                    let textArea = document.createElement('textarea');
                                    textArea.dataset.name = m;
                                    textArea.maxlength = '5000';
                                    textArea.name = m;
                                    textArea.id = m;
                                    textArea.placeholder = '';
                                    textArea.classList.add('input', 'as-textarea', 'bulk-select', 'unclickable', 'js-hide', 'w-input');
                                    tAreaBox.insertBefore(textArea, null);
                                }

                                function renameTextArea() {
                                    let tNewTextAreas = tAreaBox.querySelectorAll('textarea');
                                    let tStrLength = tTextAreas[0].dataset.name.length;
                                    let mStrLength = mTextAreas[m].dataset.name.length;
                                    let tSerial = tTextAreas[0].dataset.name.slice(tStrLength - 2, tStrLength);
                                    tNewTextAreas[m].dataset.name = mTextAreas[m].dataset.name.slice(0, mStrLength - 2) + tSerial;
                                    tNewTextAreas[m].name = mTextAreas[m].name.slice(0, mStrLength - 2) + tSerial;
                                    tNewTextAreas[m].id = mTextAreas[m].id.slice(0, mStrLength - 2) + tSerial;
                                    tNewTextAreas[m].value = mTextAreas[m].value;
                                }
                            }

                            // 同步mBtns「勾選狀態」至全部tBtns（包含ec、size）
                            for (m = 0; m < mBtns.length; m++) {
                                if (mBtns[m].querySelector('.custom-check').classList.contains('js-selected')) {
                                    tNewBtns[m].querySelector('.custom-check').classList.add('js-selected');
                                    tNewBtns[m].querySelector('.label').dataset.select = 'true';
                                }
                            }

                            // 新增 ec tab 響應區塊
                            if (tCardBox.querySelector('[data-box=tab]') != null) {
                                let tTabBox = tCardBox.querySelector('[data-box=tab]');
                                let mTabBox = MASTER.querySelector('[data-box=tab]');
                                let tTabs = tTabBox.querySelectorAll('.a-button.as-tab:not(.indicator)');
                                let mTabs = mTabBox.querySelectorAll('.a-button.as-tab:not(.indicator)');

                                function createTab() {
                                    let tab = document.createElement("div");
                                    let label = document.createElement("div");
                                    let counter = document.createElement("div");
                                    tab.appendChild(label);
                                    tab.appendChild(counter);
                                    tab.classList.add("a-button", "as-tab", "js-hide");
                                    label.classList.add("label", "full-touch");
                                    label.dataset.tab = "";
                                    counter.classList.add("_12px-500", "as-counts", "in-tab");
                                    tTabBox.insertBefore(tab, null);
                                }

                                for (t = 0; t < tTabs.length; t++) tTabBox.removeChild(tTabs[t]);
                                for (m = 0; m < mTabs.length; m++) {
                                    createTab(m + 1);
                                    let mTabLabels = mTabBox.querySelectorAll('.label');
                                    let mTabCounts = mTabBox.querySelectorAll('.as-counts');
                                    let tNewLabels = tTabBox.querySelectorAll('.label');
                                    let tNewCounts = tTabBox.querySelectorAll('.as-counts');

                                    tNewLabels[m].dataset.tab = mTabLabels[m].dataset.tab;
                                    tNewLabels[m].textContent = mTabLabels[m].textContent;
                                    tNewCounts[m].textContent = mTabCounts[m].textContent;
                                    if (mTabLabels[m].dataset.nth != "") {
                                        tNewLabels[m].dataset.nth = mTabLabels[m].dataset.nth;
                                    }
                                }


                                // !!!步驟重複
                                let mTabGroup = MASTER.querySelector('[data-group=ecTabs]');
                                let mEcChecks = mTabGroup.querySelectorAll('.custom-check');
                                let mec
                                for (mec = 0; mec < mEcChecks.length; mec++) {
                                    if (mEcChecks[mec].classList.contains('js-selected')) {
                                        let tTabBox = tCardBox.querySelector('[data-box=tab]');
                                        let tTabs = tTabBox.querySelectorAll('.a-button.as-tab:not(.indicator)');
                                        tTabs[mec].classList.add('js-show');
                                        let shownTabs = tTabBox.querySelectorAll('.a-button.as-tab.js-show:not(.indicator)');
                                        shownTabs[0].style.color = "rgba(47, 90, 58, 1)";
                                        let indicator = tTabBox.querySelector('.indicator');
                                        indicator.style.display = 'block';
                                        indicator.style.top = '0px';

                                        tNGroups[1].classList.add('js-show'); //tNGroups[0]=ecTabs
                                        tNGroups[tNGroups.length - 1].classList.remove('js-show');

                                        let tTextareas = tCardBox.querySelectorAll('textarea');
                                        tTextareas[0].classList.add('js-show');

                                        let tSizeInput = tCardBox.querySelectorAll('.input.dropdown')[1];
                                        let tabName = shownTabs[0].firstElementChild.textContent;
                                        tSizeInput.placeholder = '請輸入' + tabName + '尺寸';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }

    //thunder動畫
    $('.th-box').click(function thundering() {
            let thG1 = $(this).find('.g-1');
            let thG2 = $(this).find('.g-2');
            let thG3 = $(this).find('.g-3');
            let thG4 = $(this).find('.g-4');
            let thW1 = $(this).find('._w-1');
            let thW2 = $(this).find('._w-2');
            let thW3 = $(this).find('._w-3');
            let thW4 = $(this).find('._w-4');
            let thAllW = $(this).find('.th-w');
            let thunder = $(this).find('.thunder');
            let tBlockGroup = $(this).parentsUntil('.card-box').find('.height-318');

            if (thunder.attr('data-thunder') == 'false') {
                thunder.attr('data-thunder', 'true');
                tBlockGroup.addClass('thunder-locked');

                thG1.css({
                    'transform': 'translate(4px,4px) rotate(40deg)'
                });
                thG3.css({
                    'transform': 'translate(-4px,-4px) rotate(40deg)'
                });
                thW1.css({
                    'transform': 'translate(6px,6px) rotate(40deg)'
                });
                thW3.css({
                    'transform': 'translate(-5px,-5px) rotate(40deg)'
                });
                thW2.css({
                    'transform': 'translate(-5px,7px)'
                });
                thW4.css({
                    'transform': 'translate(5px,-7px)'
                });
                setTimeout(function() {
                    thW2.css({
                        'transform': 'translate(-7px,7px)'
                    });
                    thW4.css({
                        'transform': 'translate(7px,-7px)'
                    });
                    thunder.css({
                        'border': '1px solid rgba(255,251,204,1)'
                    })
                    thAllW.css({
                        'backgroundColor': 'rgba(255,251,204,1)',
                    })
                }, 100)
            } else if (thunder.attr('data-thunder') == 'true') {
                thunder.attr('data-thunder', 'false');
                tBlockGroup.removeClass('thunder-locked');

                thG1.css({
                    'transform': 'translate(0px,0px) rotate(40deg)'
                });
                thG3.css({
                    'transform': 'translate(0px,0px) rotate(40deg)'
                });
                thW1.css({
                    'transform': 'translate(0px,0px) rotate(40deg)'
                });
                thW3.css({
                    'transform': 'translate(0px,0px) rotate(40deg)'
                });
                thW2.css({
                    'transform': 'translate(0px,0px)'
                });
                thW4.css({
                    'transform': 'translate(0px,0px)'
                });
                setTimeout(function() {
                    // thW2.css({
                    //     'transform': 'translate(7px,-7px)'
                    // });
                    // thW4.css({
                    //     'transform': 'translate(-7px,7px)'
                    // });
                    thunder.css({
                        'border': '1px solid rgba(255,255,255,0.2)'
                    })
                    thAllW.css({
                        'backgroundColor': 'rgba(255,255,255,0.7)',
                    })
                }, 100)
            }
        }) //end of 快速套用主案型


}


// ----------------------------------------------------------------------------------------------------