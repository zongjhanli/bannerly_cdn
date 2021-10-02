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
        let checker = customRadio.querySelector('.custom-check');
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
$('.js-length-6').on('input', function(e) {
    var $that = $(this),
        limit = 6; //調整字元數限制
    $that.attr('maxlength', limit);
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
            $that.attr('maxlength', limit);
            $that[0].value = value;
        }
    }, 0);
});

// ----------------------------------------------------------------------------------------------------

//fakeBtn假選項點擊響應
let fakeBtns = document.querySelectorAll('.label.full-touch:not(.js-exclude)');
for (const fakeBtn of fakeBtns) {
    fakeBtn.addEventListener('click', (e) => {
            let target = e.target;
            let checker = target.parentElement.querySelector('.custom-check');
            let tGroup = target.parentElement.parentElement;
            let tDPBox = target.parentElement.parentElement.parentElement.parentElement;
            let tInput = tDPBox.querySelector('.input.dropdown');
            let tDropCard = tInput.parentElement.querySelector('.drop-card');

            //多選選項 (預設)
            if (!checker.classList.contains('js-selected')) {
                checker.classList.add('js-selected');
                //target.dataset.select = 'true';
            } else if (checker.classList.contains('js-selected')) {
                checker.classList.remove('js-selected');
                //target.dataset.select = '';
            }

            //多選選項value同步至textarea
            let tTextAreas = tDPBox.parentElement.parentElement.querySelectorAll('textarea');
            for (const tTextArea of tTextAreas) {
                if (tDropCard.dataset.drop == 'multi' && tGroup.dataset.group === tTextArea.dataset.name &&
                    tInput.dataset.drop != 'ec') {
                    let multiSelecteds = tGroup.querySelectorAll('[data-select=true]');
                    let TextStr = Array.from(multiSelecteds, x => x.textContent);
                    tTextArea.value = TextStr.join('\n');
                }
            }

            // 單選選項專用響應 -> 模擬radio input
            if (checker.classList.contains('js-selected') && tDropCard.dataset.drop == 'single') {
                let allCheckers = tDropCard.querySelectorAll('.custom-check');
                for (const allChecker of allCheckers) {
                    allChecker.classList.remove('js-selected');
                }
                checker.classList.add('js-selected');
            }

            // 單選input專用響應 -> input value 不累加
            if (checker.classList.contains('js-selected') && tInput.dataset.drop == 'single') {
                tInput.value = target.textContent;
            } else {
                tInput.value = '';
            }

            // ec 尺寸數量同步
            let sizeCount = tGroup.querySelectorAll('.js-selected').length;
            let ecTabs = document.querySelectorAll('.label[data-tab]');
            for (const ecTab of ecTabs) {
                let countResult = ecTab.nextElementSibling;
                if (target.dataset.ec == null) {
                    if (tGroup.dataset.group === ecTab.dataset.tab) {
                        countResult.textContent = sizeCount;
                    }
                }
            }

            //ec 多選專用響應
            let tTabs = tDPBox.parentElement.parentElement.querySelectorAll('.label[data-tab]');
            for (const tTab of tTabs) {
                if (target.dataset.ec === tTab.dataset.tab) {
                    if (checker.classList.contains('js-selected')) {
                        tTab.parentElement.classList.add('js-show');
                    } else if (!checker.classList.contains('js-selected')) {
                        tTab.parentElement.classList.remove('js-show');
                    }
                }
            }
        }) //end of fakeButton click event
} //end of fakeButton loop

//tab + indicator 響應
let ecTabsCols = document.querySelectorAll('[data-col=ec-tab]');
for (const ecTabsCol of ecTabsCols) {
    ecTabsCol.addEventListener('click', (e) => {
            let target = e.target;
            let indicator = ecTabsCol.querySelector('.indicator'); //! 不需要使用target.querySelector
            let shownTabs = ecTabsCol.querySelectorAll('.a-button.js-show');
            let tabLength = shownTabs.length;

            //ec tab indicator 顯示/隱藏條件
            if (tabLength > 0) {
                indicator.style.display = 'block';
            } else {
                indicator.style.display = 'none';
            }

            for (const shownTab of shownTabs) {

                // ec drop option 點擊響應 -> 預設第一個tab以及相關右欄顯現
                if (target.nextElementSibling.classList.contains('custom-check')) {
                    shownTabs[0].style.opacity = '1';
                    let tCol = target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    let tDropGroups = tCol.nextElementSibling.querySelectorAll('.drop-group');
                    for (const tDropGroup of tDropGroups) {
                        tDropGroup.classList.remove('js-show');
                        if (tDropGroup.dataset.group === shownTabs[0].firstElementChild.dataset.tab) {
                            tDropGroup.classList.add('js-show');
                        }
                    }
                    let tTextAreas = tCol.nextElementSibling.querySelectorAll('.as-textarea');
                    for (const tTextArea of tTextAreas) {
                        tTextArea.classList.remove('js-show');
                        if (tTextArea.dataset.name === shownTabs[0].firstElementChild.dataset.tab) {
                            tTextArea.classList.add('js-show');
                        }
                    }
                }

                // ec tab 點擊響應
                if (target.dataset.tab != null) {
                    shownTab.style.opacity = '0.5';
                    target.parentElement.style.opacity = '1';

                    let tCol = target.parentElement.parentElement.parentElement;
                    let tDropGroups = tCol.nextElementSibling.querySelectorAll('.drop-group');
                    for (const tDropGroup of tDropGroups) {
                        tDropGroup.classList.remove('js-show');
                        if (tDropGroup.dataset.group === target.dataset.tab) {
                            tDropGroup.classList.add('js-show');
                        }
                    }
                    let tTextAreas = tCol.nextElementSibling.querySelectorAll('.as-textarea');
                    for (const tTextArea of tTextAreas) {
                        tTextArea.classList.remove('js-show');
                        if (tTextArea.dataset.name === target.dataset.tab) {
                            tTextArea.classList.add('js-show');
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
        }) //end of ecTabsCol click event
} //end of ecTabsCol loop


//multi-dropdown input value
document.addEventListener('click', (e) => {
    let target = e.target;
    e.preventDefault();
    let multiDropCards = document.querySelectorAll('.drop-card[data-drop=multi]');
    for (const multiDropCard of multiDropCards) {
        let shownGroup = multiDropCard.querySelector('.drop-group.js-show');
        let checkCount = shownGroup.querySelectorAll('.js-selected').length;
        let input = multiDropCard.parentElement.querySelector('.input.dropdown');

        if (target.dataset.drop == 'multi' && input == document.activeElement) {
            input.value = '';
        } else if (input != document.activeElement) {
            if (checkCount == '0') {
                input.value = '';
            } else {
                input.value = '已選' + checkCount + '項';
            }
        }
    }
});


//Global general dropdown behaviours
var dropCards = document.querySelectorAll('.drop-card');
for (const dropCard of dropCards) {
    //dropCard 範圍外收合下拉選單
    document.addEventListener('click', (e) => {
        let target = e.target;
        let dropArrow = dropCard.parentElement.querySelector('.dropdown-arrow');

        function globalCollapse() {
            dropCard.classList.add('js-collapsed');
            dropArrow.classList.remove('js-rotated');
            dropArrow.classList.add('unclickable');
        };
        if (!dropCard.classList.contains('js-collapsed')) {
            globalCollapse();
        }; //無論點選何處，dropCard預設全數收回

        function expand() {
            target.parentElement.querySelector('.drop-card').classList.remove('js-collapsed');
            target.parentElement.querySelector('.dropdown-arrow').classList.add('js-rotated');
            target.parentElement.querySelector('.dropdown-arrow').classList.remove('unclickable');
        };
        if (target.classList.contains('input', 'dropdown')) {
            expand(); //點選input時 -> dropdown開啟
        }
    })

    //dropCard 範圍內點擊響應
    dropCard.addEventListener('click', (e) => {
            let target = e.target;
            let tDropCard = target.parentElement.parentElement.parentElement;

            function keepExpand() {
                tDropCard.classList.remove('js-collapsed');
                tDropCard.parentElement.querySelector('.dropdown-arrow').classList.add('js-rotated');
                tDropCard.parentElement.querySelector('.dropdown-arrow').classList.remove('unclickable');
            };

            function collapse() {
                tDropCard.classList.add('js-collapsed');
                tDropCard.parentElement.querySelector('.dropdown-arrow').classList.remove('js-rotated');
                tDropCard.parentElement.querySelector('.dropdown-arrow').classList.add('unclickable');
            };
            if (target.classList.contains('label')) {
                if (tDropCard.dataset.drop == 'single') { collapse(); } //在single dropCard點按選項時一按即收合
                if (tDropCard.dataset.drop == 'multi') { keepExpand(); } //在multi dropCard點按選項時保持開啟
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

        }) //end of dropCard click event
} //end of dropCard loop


//input輸入時/輸入後響應
let dropInputs = document.querySelectorAll('.input.dropdown');
for (const dropInput of dropInputs) {
    let dropCard = dropInput.parentElement.querySelector('.drop-card');
    dropInput.addEventListener('input', (e) => {
            //e.preventDefault();
            let target = e.target;
            let capInput = target.value.toUpperCase();

            //選項隨著輸入值對照而進一步顯示or隱藏
            let dropOptions = dropCard.querySelectorAll('div.label');
            for (const dropOption of dropOptions) {
                //let label = dropOption.querySelector('div.label');
                let capLabel = dropOption.textContent.toUpperCase();

                dropOption.parentElement.classList.add('js-hide');

                if (capLabel.includes(capInput)) {
                    dropOption.parentElement.classList.remove('js-hide');
                }
            }
        }) //end of dropInput input event

    //輸入後若無match字符 -> 新增選項
    let timer,
        timeoutVal = 0; // time it takes to wait for user to stop typing in ms

    // detects when the user is actively typing
    //dropInput.addEventListener('keypress', handleKeyPress);
    // triggers a check to see if the user is actually done typing
    dropInput.addEventListener('keyup', handleKeyUp);

    function newOption() {
        let keyInText = dropInput.value;
        let dropGroup = dropCard.querySelector('.drop-group.js-show');
        let button = document.createElement('div');
        let label = document.createElement('div');
        let checker = document.createElement('div');

        button.appendChild(label);
        button.appendChild(checker);
        button.classList.add('a-button', 'as-list');
        label.classList.add('label', 'full-touch');
        checker.classList.add('custom-check', 'tick-right');
        label.textContent = '新增' + '「' + keyInText + '」';
        dropGroup.insertBefore(button, dropGroup.children[0]);
        label.dataset.custom = 'pending';


        //新增於document的選項需要重新設定點按響應
        document.addEventListener('click', (e) => {
                let target = e.target;
                let tChecker = target.nextElementSibling;
                let tDropCard = target.parentElement.parentElement.parentElement;
                let otherChecked = tDropCard.querySelector('.js-selected'); //for single


                function revealAll() {
                    let tOptions = dropInput.parentElement.querySelector('.drop-group.js-show').querySelectorAll('.a-button.as-list');
                    for (const tOption of tOptions) {
                        tOption.classList.remove('js-hide');
                    }
                }

                function confirmAppended() {
                    tChecker.classList.add('js-selected');
                    let tNewStr = target.textContent.replace('新增「', '').replace('」', '');
                    target.textContent = tNewStr;
                    dropInput.value = tNewStr;
                    target.dataset.custom = 'confirmed';
                }


                if (target.dataset.custom == pending) {
                    confirmAppended();
                    revealAll();
                    if (tDropCard.dataset.drop == 'single') {
                        otherChecked.classList.remove('js-selected');
                    }
                } else if (target.dataset.custom != pending) {
                    if (tDropCard.dataset.drop == 'single') {
                        otherChecked.classList.remove('js-selected');
                        tChecker.classList.add('js-selected');
                    } else if (tDropCard.dataset.drop == 'multi') {
                        if (!tChecker.classList.contains('js-selected')) {
                            tChecker.classList.add('js-selected');
                        } else if (tChecker.classList.contains('js-selected')) {
                            tChecker.classList.remove('js-selected');
                        }
                    }
                }



                //清除殘存的「未選選選項」
                if (document.querySelector('[data-custom=pending]') != null) {
                    document.querySelector('[data-custom=pending]').parentElement.remove();
                }
            }) //end of document click event

    } //end of newOption()

    function handleKeyUp(e) {
        window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
        timer = window.setTimeout(() => {
            if (dropInput.value != '') {
                newOption();
            }
            let dropInputConcated = dropInput.value.replace(dropInput.value, '').concat('新增「', dropInput.value, '」');
            let pendingOptions = dropCard.querySelectorAll('[data-custom=pending]');
            let existingOptions = dropCard.querySelectorAll('.label:not([data-custom=pending])');
            existingOptions.forEach((existingOption) => {
                pendingOptions.forEach((pendingOption) => {
                    let pendingOptionText = pendingOption.textContent;
                    if (dropInput.value == '') {
                        pendingOption.parentElement.remove(); //刪掉所有input字符後->刪
                    } else if (pendingOptionText.indexOf(dropInputConcated) == -1) {
                        pendingOption.parentElement.remove(); //刪刪改改後還是與新增建議同名者->刪
                    } else if (existingOption.textContent.includes(dropInput.value)) {
                        pendingOption.parentElement.remove(); //與既存選項同名者->刪
                    }
                })
            })
        }, timeoutVal);
    } //end of handleKeyUp()


    dropInput.addEventListener('focus', (e) => {
        let target = e.target;
        target.select();
        let tOptions = dropInput.parentElement.querySelector('.drop-group.js-show').querySelectorAll('.a-button.as-list');
        for (const tOption of tOptions) {
            tOption.classList.remove('js-hide');
        }
    })

} //end of dropInput loop !!!

// ----------------------------------------------------------------------------------------------------