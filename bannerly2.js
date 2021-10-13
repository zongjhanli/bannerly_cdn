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
$(".js-length-10").on("input", function (e) {
    var $that = $(this),
        limit = 10; //調整字元數限制
    $that.attr("maxlength", limit);
    setTimeout(function () {
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
$(".js-length-6").on("input", function (e) {
    var $that = $(this),
        limit = 6; //調整字元數限制
    $that.attr("maxlength", limit);
    setTimeout(function () {
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

// ----------------------------------------------------------------------------------------------------

//.label 點按響應 (含dropCard、tabBox)
document.addEventListener("click", (e) => {
    let target = e.target; //以下宣告皆假設target為.label.full-touch
    let tChecker = target.parentElement.querySelector(".custom-check");
    let tBtn = target.parentElement;
    let tGroup = target.parentElement.parentElement;
    let tDPBox = target.parentElement.parentElement.parentElement.parentElement;
    let tInput = tDPBox.querySelector(".input.dropdown");
    let tDropCard = target.parentElement.parentElement.parentElement;

    //for labels in dropCards
    if (
        target.classList.contains("label") &&
        !target.parentElement.parentElement.classList.contains("f-block")
    ) {
        //多選選項 (預設)
        if (!tChecker.classList.contains("js-selected")) {
            tChecker.classList.add("js-selected");
            target.dataset.select = "true"; //for textarea文字同步
        } else if (tChecker.classList.contains("js-selected")) {
            tChecker.classList.remove("js-selected");
            target.dataset.select = ""; //for textarea文字同步
        }

        // 單選選項專用響應 -> 模擬radio input
        if (
            tChecker.classList.contains("js-selected") &&
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
        let sizeCount = tGroup.querySelectorAll(".js-selected").length;
        let ecTabs = document.querySelectorAll(".label[data-tab]");
        for (const ecTab of ecTabs) {
            let countResult = ecTab.nextElementSibling;
            if (target.dataset.ec == null) {
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
            let colL = tDPBox.parentElement.parentElement;
            let colR = colL.nextElementSibling;
            let tabBtn = document.createElement("div");
            let tabLabel = document.createElement("div");
            let tabCounter = document.createElement("div");

            target.dataset.ec = target.textContent;

            //新增 new tab
            tabBtn.classList.add("a-button", "as-tab", "js-hide", "js-show");
            tabLabel.classList.add("label", "full-touch");
            tabCounter.classList.add("_12px-500", "as-counts", "in-tab");
            tabLabel.textContent = tInput.value;
            tabLabel.dataset.tab = tInput.value;
            tabCounter.textContent = "0";
            tabBtn.appendChild(tabLabel);
            tabBtn.appendChild(tabCounter);
            let tabGroup = colL.querySelector("[data-box=tab]");
            tabGroup.insertBefore(tabBtn, tabGroup.children[0]);

            //新增 new dropGroup
            let newDropGroup = document.createElement("div");
            newDropGroup.classList.add("drop-group", "js-hide", "js-show");
            newDropGroup.dataset.group = tInput.value;
            let dropBox = colR.querySelector(".drop-card");
            dropBox.appendChild(newDropGroup);

            //新增 new textArea
            let newTextArea = document.createElement("textarea");
            newTextArea.classList.add(
                "input",
                "as-textarea",
                "bulk-select",
                "unclickable",
                "js-hide",
                "js-show"
            );
            newTextArea.placeholder = "↑點按以選擇" + tInput.value + "尺寸";
            newTextArea.dataset.name = tInput.value;
            newTextArea.id = tInput.value;
            let textAreaBox = colR.querySelector("[data-box=textarea]");
            textAreaBox.appendChild(newTextArea);
        }

        if (target.dataset.custom == "pending") {
            revealAll();
            confirmAppended();
            if (tInput.dataset.drop == "ec") {
                newTab();
            }
        }

        // ec drop option 點擊響應 -> 預設第一個tab以及相關dropGroup, textArea顯現
        if (tInput.dataset.drop == "ec") {
            let colL = tDPBox.parentElement.parentElement;
            let indicator = colL.querySelector(".indicator");
            let shownTabs = colL.querySelectorAll(".a-button.as-tab.js-show");
            for (const shownTab of shownTabs) {
                //ec tab indicator 顯示/隱藏條件
                let tabLength = shownTabs.length;
                if (tabLength > 0) {
                    indicator.style.display = "block";
                } else {
                    indicator.style.display = "none";
                }

                //每次選取/取消選取，tabBox重新更新「第一個」tab以及相關dropGroup, textArea顯現
                shownTab.style.opacity = "0.5";
                shownTabs[0].style.opacity = "1";
                let tDropGroups =
                    colL.nextElementSibling.querySelectorAll(".drop-group");
                for (const tDropGroup of tDropGroups) {
                    tDropGroup.classList.remove("js-show");
                    if (
                        tDropGroup.dataset.group ===
                        shownTabs[0].firstElementChild.dataset.tab
                    ) {
                        tDropGroup.classList.add("js-show");
                    }
                }
                let tTextAreas =
                    colL.nextElementSibling.querySelectorAll(".as-textarea");
                for (const tTextArea of tTextAreas) {
                    tTextArea.classList.remove("js-show");
                    let areaName = tTextArea.dataset.name;
                    if (
                        areaName.slice(0, areaName.length - 2) ===
                        shownTabs[0].firstElementChild.dataset.tab
                    ) {
                        tTextArea.classList.add("js-show");
                    }
                }
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

//@form-apply 案型增減響應
let swiper = document.querySelector("div.swiper");

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
    if (endTop <= -50 || startTop > 50) {
        swiper.style.opacity = "0";
        // swiper.style.display = 'none';
        setTimeout(function swiperDisplay() {
            swiper.style.display = "none";
        }, 2000);
    } else {
        swiper.style.display = "flex";
        swiper.style.opacity = "1";
    }
});

//頁面loading後預設隱藏未被新增的案型
window.onload = function () {
    swiper.style.opacity = "0";
    swiper.style.display = "none";

    let unhandleds = document.querySelectorAll("[data-handle=false]");
    for (const unhandled of unhandleds) {
        unhandled.classList.add("js-hide");
    }
};

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

        //新增or刪除案型「之後」產生案型編號
        let i;
        for (i = 0; i < shownSwipers.length; i++) {
            let n = i + 1;
            shownSwipers[i].firstElementChild.textContent = "案型 " + n;
            // !!無法同步數值
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
        target.classList.contains("a-button", "for-swiper") &&
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
}); //end of document click
//end of @form-apply 案型增減響應

//input輸入時/輸入後響應
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

//Global general dropdown behaviours
var dropCards = document.querySelectorAll(".drop-card");
for (const dropCard of dropCards) {
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
            target.parentElement
                .querySelector(".drop-card")
                .classList.remove("js-collapsed");
            target.parentElement
                .querySelector(".dropdown-arrow")
                .classList.add("js-rotated");
            target.parentElement
                .querySelector(".dropdown-arrow")
                .classList.remove("unclickable");
        }

        function expandByLabel() {
            tDropCard.classList.remove("js-collapsed");
            tDropCard.parentElement
                .querySelector(".dropdown-arrow")
                .classList.add("js-rotated");
            tDropCard.parentElement
                .querySelector(".dropdown-arrow")
                .classList.remove("unclickable");
        }

        if (!target.classList.contains("unclickable")) {
            if (target.classList.contains("input", "dropdown")) {
                expandByInput(); //點選input時 -> dropdown開啟
            } else if (
                target.classList.contains("label", "full-touch") &&
                tDropCard.dataset.drop == "multi"
            ) {
                expandByLabel(); //點選multi dropCard中的label時 -> dropdown開啟
            }
        }

        //如果點按在unclickable的input（#Size）
        if (target.classList.contains('dropdown-box')){
            if (target.firstElementChild.classList.contains("unclickable")) {
                //若是點按尚未選擇通路的尺寸input
                let colL = target.parentElement.parentElement.previousElementSibling; //in this case, target=dropdown-box
                let ecSelected = colL.querySelectorAll(".js-selected");
                let hinter = colL.querySelector(".empty-hinter");
                if (ecSelected.length == 0) {
                    hinter.classList.add("js-shake");
                    setTimeout(function () {
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
} //end of dropCard loop

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
                shownTab.style.opacity = "0.5";
                target.parentElement.style.opacity = "1";

                let tCol = target.parentElement.parentElement.parentElement;
                let tDropGroups =
                    tCol.nextElementSibling.querySelectorAll(".drop-group");
                for (const tDropGroup of tDropGroups) {
                    tDropGroup.classList.remove("js-show");
                    if (tDropGroup.dataset.group === target.dataset.tab) {
                        tDropGroup.classList.add("js-show");
                    }
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
    let hinters = document.querySelectorAll(".empty-hinter");

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
});//end of dropdown hinter提示

//快速套用主案型
let thunders = document.querySelectorAll('._14px-500.thunder');
for (const thunder of thunders) {
    thunder.addEventListener('click', (e)=>{
        let target = e.target;
        let tBtn = target.parentElement;
        let tShape = target.nextElementSibling;
        let tCardBox = target.parentElement.parentElement.parentElement.parentElement.parentElement;//thunder統一放在card-cap較好
        let tTextArea = tCardBox.querySelector('textarea');

        let tSwiped = tCardBox.parentElement.parentElement;
        let MASTER = tSwiped.querySelectorAll('.card-box')[0];
        let mTextArea = MASTER.querySelector('textarea');

        let keyName = MASTER.querySelector('[data-name]').dataset.name;
        //分為三種區塊進行核對
        if (keyName.includes('C-')) {
            //@Copywright區塊
            console.log('@Copywright');
            tTextArea.value = mTextArea.value;
        } else if (keyName.includes('P-')) {
            //@Product區塊
            let mTextArea = MASTER.querySelector('textarea');
            // console.log('@Product');
            tTextArea.value = mTextArea.value;

        } else if (keyName.includes('S-')) {
            //@Size區塊
            console.log('@Size');
            let tName = tTextArea.dataset.name;
            let mName = mTextArea.dataset.name;
            if (tName.slice(0, tName.length - 2) == mName.slice(0, mName.length - 2)) {
                tTextArea.value = mTextArea.value;
            }
            
        } 
    })
}

// ----------------------------------------------------------------------------------------------------
