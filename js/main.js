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

// ----------------------------------------------------------------------------------------------------

//畫面尺寸過小提醒
window.addEventListener('resize', () => {

    screenToSmall();
    let width = window.innerWidth;
    let valKey = sessionStorage.getItem('key');
    if (width > 540 && valKey != null) {
        $('.portal-bg').addClass('js-hide');
    }
})

$(document).ready(() => {
    screenToSmall();
})

$('[data-update="sign-in"]').click(() => {
    setTimeout(() => {
        screenToSmall();
    }, 10)
})

$('#password').keydown(() => {
    setTimeout(() => {
        screenToSmall();
    }, 10)
})

function screenToSmall() {
    let valKey = sessionStorage.getItem('key');
    if (valKey != null) {
        let width = window.innerWidth;
        if (width < 540) {
            $('.portal-bg').removeClass('js-hide');
            $('.portal-bg div').not('.inactive').css('display', 'none');
            $('.screensize-illus').css('display', 'block');
            $('.screensize-illus div').css('display', 'block');
        } else {
            // $('.portal-bg').addClass('js-hide');
            $('.portal-bg div').not('.inactive').css('display', 'block');
            $('.screensize-illus').css('display', 'none');
            $('.screensize-illus div').css('display', 'none');
        }
    }

    mobileAndTabletCheck();

    function mobileAndTabletCheck() {
        let mobile = false;
        (function(a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) mobile = true; })(navigator.userAgent || navigator.vendor || $(window).opera);
        // console.log(mobile)
        // return check;
        if (mobile == false) {
            // console.log($('#mobileHinter'))
            $('#mobileHinter').css('display', 'none');
        } else {
            $('#desktopHinter').css('display', 'none');
        }
    };
}

//topbar 在頁面捲動時收斂
$(document).scroll(() => {
    let scrollY = $(document).scrollTop();
    if ($('.topbar-box')) {
        if (scrollY > 100) {
            $('.topbar-box').addClass('to-ceiling');
            $('.back-home').find('.annotate').css({
                'marginTop': '-3px'
            });
            $('.back-home').not('.annotate').css({
                'top': '8px',
                'marginLeft': '8px',
                'backgroundSize': '20px'
            });
        } else if (scrollY < 100) {
            $('.back-home').find('.annotate').css({
                'display': 'block',
                'marginTop': 'auto'
            });
            $('.back-home').css({
                'top': '32px',
                'marginLeft': '0px',
                'backgroundSize': '24px'
            });
            $('.topbar-box').removeClass('to-ceiling');
        }
    }
    if ($('.a-list.js-topbar')) {
        if (scrollY > 100) {
            $('.a-list.js-topbar').addClass('to-ceiling');
            $('.back-home').find('.annotate').css({
                'marginTop': '-3px'
            });
            $('.back-home').not('.annotate').css({
                'top': '0px',
                'marginLeft': '8px',
                'backgroundSize': '20px'
            });
        } else if (scrollY < 100) {
            $('.back-home').find('.annotate').css({
                'display': 'block',
                'marginTop': 'auto'
            });
            $('.back-home').css({
                'top': '32px',
                'marginLeft': '0px',
                'backgroundSize': '24px'
            });
            if (window.location.href.includes('read-me')) {
                $('.back-home').css('top', '20px');
            }
            $('.a-list.js-topbar').removeClass('to-ceiling');
        }
    }
})

//page-load animation
$(document).ready(function() {
    //頁面預設捲動至頂
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    } else {
        window.onbeforeunload = function() {
            window.scrollTo(0, 0);
        }
    }

    $('.page-load-illus').css('display', 'block');
    setTimeout(() => {
        $('.page-load-illus').removeClass('js-hide');
    }, 200)


    let valKey = sessionStorage.getItem('key');


    if (window.location.href.includes('form-type-a') ||
        window.location.href.includes('form-type-b') ||
        window.location.href.includes('read-me')) {
        if (valKey == null) {
            //redirect to home
            let address = window.location.href;
            if (window.location.href.includes('form-type-b')) {
                if (address.indexOf('html') < 0) {
                    address = address.replace('form-type-b', '');
                } else if (address.indexOf('html') >= 0) {
                    address = address.replace('form-type-b.html', '');
                }
                window.location.replace(address);
            } else if (window.location.href.includes('form-type-a')) {
                if (address.indexOf('html') < 0) {
                    address = address.replace('form-type-a', '');
                } else if (address.indexOf('html') >= 0) {
                    address = address.replace('form-type-a.html', '');
                }
                window.location.replace(address);
            } else if (window.location.href.includes('read-me')) {
                if (address.indexOf('html') < 0) {
                    address = address.replace('read-me', '');
                } else if (address.indexOf('html') >= 0) {
                    address = address.replace('read-me.html', '');
                }
                window.location.replace(address);
            }
        } else if (valKey != null) {
            if (window.location.href.includes('read-me')) {
                $('.container.for-list').css({
                    'bottom': '-100vh',
                    'position': 'fixed'
                });
            }

            $('.topbar-box.suspend').addClass('js-hide');
            $('.container.for-form').css({
                'opacity': '0',
                'transform': 'translateY(48px)'
            });
            setTimeout(() => {
                $('.back-home').css({
                    'left': 'calc(50vw + 296px)',
                    'opacity': 1
                });
                if (window.location.href.includes('read-me')) {
                    $('.back-home').css({
                        'left': 'calc(50vw + 244px)',
                        'opacity': 1
                    });
                }
            }, 1500)
        }
    } else {
        $('.container.for-list').css({
            'bottom': '-100vh',
            'position': 'fixed'
        });
        $('.query-box').addClass('js-collapsed');
    }
    setTimeout(() => {
        $('.page-load-illus').addClass('js-hide');
        setTimeout(() => {
            $('.page-load-illus').css('display', 'none');
        }, 100)
    }, 1500)

    setTimeout(() => {
        if (window.location.href.includes('form-type-a') ||
            window.location.href.includes('form-type-b') ||
            window.location.href.includes('read-me')) {
            $('.page-load-illus').parent().addClass('js-hide');
            $('.topbar-box.suspend').removeClass('js-hide');
            $('.container.for-form').css({
                'opacity': '1',
                'transform': 'translateY(0px)'
            });
            if (window.location.href.includes('read-me')) {
                $('.container.for-list').css({
                    'bottom': '0px',
                    'position': 'absolute'
                });
            }
        } else {
            if (valKey == null) {
                $('.portal.inactive').css('opacity', '0');
                $('.portal.inactive').removeClass('js-hide');
                setTimeout(() => {
                    $('.portal.inactive').css('opacity', '1');
                }, 200)
                $('.container.for-list').css({
                    'bottom': '-100vh',
                    'position': 'fixed'
                });
                $('.query-box').addClass('js-collapsed');
            } else if (valKey != null) {
                $('.portal-bg').addClass('js-hide');
                $('.container.for-list').css({
                    'bottom': '0px',
                    'position': 'absolute'
                });
                $('.query-box').removeClass('js-collapsed');
            }
        }
    }, 1600)
})

//datepicker widget
$(document).ready(function() {
    $('.date-input').not('.single-date').val(''); //預設日期txtInput.value =""
    if ($('.ranges')) {
        $('.ranges').find('li').last().css('display', 'none');
    }
})

$(document).click(() => {
    if ($('.daterangepicker').is(':visible')) {
        $('.daterangepicker').css('boxShadow', '0 4px 8px 0 hsla(0, 0%, 89.8%, 0.8)');
    } else {
        $('.daterangepicker').css('boxShadow', '0 4px 8px 0 hsla(0, 0%, 89.8%, 0)');
    }
})

//section hover 觸發cardbox transfrom + padding 變化
$('.section').each((s) => {
    $('.section').eq(s).hover(mEnter, mLeave);

    function mEnter() {
        // let target = e.target;
        $('.section').eq(s).find('.card').css('transform', 'translateY(-2px)');
    }

    function mLeave() {
        // let target = e.target;
        $('.section').eq(s).find('.card').css('transform', 'translateY(0px)');
        $('.section').eq(s).find('.card').css('padding-left', '28px');
        $('.section').eq(s).find('.card').css('padding-right', '28px');
    }
})

//GLOBAL 每次頁面load完畢，刪除網址末尾可能包含的#href字串
$(document).ready(function() {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        if (window.location.href.includes('#')) {
            let index = window.location.href.indexOf('#');
            window.location.href = window.location.href.slice(0, index);
        }
    }
})

//GLOBAL 自訂選項（適用於radio select、color picker）
$(document).ready(() => {
        let minihinters = $(".js-custom-input").parent().find('.js-limit-hinter , .icon_20x.for-custom-input');
        minihinters.css('display', 'none');
    })
    //若input class=".js-custom-input"，並且也另一class"js-limit-(number)" ，即由(number)定義字數限制（含全形/半形）
$(".js-custom-input").on("input", function() {
    let $that = $(this);
    let key = 'js-length';
    if ($that.attr('class').includes(key)) { //若不標註則會包括dropdown input
        let limit;
        let index = $that.attr('class').indexOf(key);
        let keyVal = $that.attr('class').slice(index + key.length + 1, index + key.length + 3);
        limit = keyVal;
        $that.attr("maxlength", limit);
        setTimeout(function() {
            let value = $that.val();
            //以下段落可將1個全形字視為2個字符
            // let reg = /[\u4e00-\u9fa5]{1}/g;
            // let notReg = /\w{1}/g;
            // let Cn = value.match(reg);
            // let En = value.match(notReg);
            // if (Cn) {
            //     limit = limit - Cn.length * 2;
            // }
            // if (En) {
            //     limit = limit - En.length;
            // }
            if (limit <= 0) {
                var finalLen = value.length + limit;
                value = value.substring(0, finalLen);
                $that.attr("maxlength", limit);
                $that[0].value = value;
            }
        }, 0);
        if ($that.attr('data-name') == 'custom--color') {
            $that.one('keydown', () => {
                if ($that.val().length == limit) {
                    alert('最多輸入' + limit + '字');
                }
            })
        }
        let limitHinter = $that.parent().find('.js-limit-hinter');
        let iconHinter = $that.parent().find('.icon_20x.for-custom-input');
        limitHinter.css('display', 'block');
        limitHinter.text('限' + limit + '字符');
        iconHinter.css('display', 'block');
        //enter 完成input change
        $that.keydown(function(event) {
            if (event.keyCode == 13) {
                $that.change();
                event.preventDefault();
                limitHinter.css('display', 'none');
                iconHinter.removeClass('js-return').addClass('js-clear-input');
            } else {
                limitHinter.css('display', 'block');
                iconHinter.addClass('js-return').removeClass('js-clear-input');
            }
        });
        $(this).change(function(e) {
            let target = e.target;

            if (!$(target).parent().hasClass('color-code')) {
                if ($(target).val().length > 0) {
                    let otherCheck = $(target).parent().parent().find('.custom-check');
                    let tCheck = $(target).parent().parent().find('[data-custom=radio-btn]').siblings('.custom-check');
                    otherCheck.removeClass('w--redirected-checked');
                    otherCheck.siblings('span').css('color', 'rgba(47, 90, 58, 0.5)');
                    tCheck.addClass('w--redirected-checked');
                    tCheck.parent().removeClass('js-toggle');
                    tCheck.siblings('span').text($(target).val());
                    tCheck.siblings('span').css('color', 'rgba(47, 90, 58, 1)');
                    tCheck.siblings('input').val($(target).val());

                    let limitHinter = $(target).parent().find('.js-limit-hinter');
                    let iconHinter = $(target).parent().find('.icon_20x.for-custom-input');
                    limitHinter.css('display', 'none');
                    iconHinter.removeClass('js-return').addClass('js-clear-input');
                    iconHinter.css('pointerEvents', 'all');
                    iconHinter.css('zIndex', '2');
                } else {
                    resetCustomBtn(e);
                }
            } else if ($(target).parent().hasClass('color-code')) {
                $(target).parent().parent().parent().parent().find('.input.color').trigger('click');
                $('.label.for-color').siblings('.custom-check').css('backgroundPosition', '50% 50%');
                $('.label.for-color').siblings('.custom-check').css('backgroundColor', "transparent");
            }
        })
        $('.icon_20x.for-custom-input').click((e) => {
            let target = e.target;
            $(target).removeClass('js-clear-input').addClass('js-return');
            $(target).css({
                'pointerEvents': 'none',
                'display': 'none'
            });
            $(this).val('');
            resetCustomBtn(e);
        })

        let allCheck = $that.parent().parent().find('input[type=radio]');
        $(allCheck).siblings('.label').click((e) => {
            // resetCustomBtn(e);//此時customBtn不能reset，而是保留在DOM上
            $(allCheck).siblings('.custom-check').removeClass('w--redirected-checked');
            $(allCheck).siblings('.label').css('color', 'rgba(47, 90, 58, 0.5');
            $(this).siblings('.custom-check').addClass('w--redirected-checked');
            $(this).css('color', 'rgba(47, 90, 58, 1)');
        })

        function resetCustomBtn(e) {
            let target = e.target;
            let tCheck = $(target).parent().parent().find('[data-custom=radio-btn]').siblings('.custom-check');
            tCheck.removeClass('w--redirected-checked');
            tCheck.parent().addClass('js-toggle');
            tCheck.siblings('span').text('');
            tCheck.siblings('span').css('color', 'rgba(47, 90, 58, 0.5)');
            tCheck.siblings('input').val('');
        }
    }
});

//GLOBAL .label 點按響應 (含dropCard、tabBox)
document.addEventListener("click", (e) => {
    let target = e.target; //以下宣告皆假設target為.label.full-touch

    //for labels in dropCards
    if (target.classList.contains("label") &&
        !target.parentElement.parentElement.classList.contains("f-block") &&
        !target.parentElement.parentElement.classList.contains("drop-group-s") &&
        !target.parentElement.parentElement.classList.contains("div-266h") &&
        !target.parentElement.parentElement.parentElement.parentElement.classList.contains("for-query") &&
        !target.parentElement.parentElement.parentElement.parentElement.classList.contains("for-actions")) {

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
        } else if (tInput.id == 'brand-id') {
            return;
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
            // 不可額外添加超過三個通路
            if (tInput.dataset.drop == "ec") {
                if (colL.querySelectorAll('[data-nth]').length < 3) {
                    newTab();
                } else {
                    tDropCard.querySelectorAll('[data-custom=confirmed]')[0].parentElement.remove();
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
                    let tabName = shownTabs[0].firstElementChild.dataset.tab;

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
                    let tDropGroups = colL.nextElementSibling.querySelectorAll(".drop-group");
                    if (tDropGroups != null) {
                        for (const tDropGroup of tDropGroups) {
                            tDropGroup.classList.remove("js-show");
                            if (tDropGroup.dataset.group === tabName) {
                                tDropGroup.classList.add("js-show");
                            }
                        }
                    }
                    let tTextAreas = colL.nextElementSibling.querySelectorAll(".as-textarea");
                    for (const tTextArea of tTextAreas) {
                        tTextArea.classList.remove("js-show");
                        let areaName = tTextArea.dataset.name;
                        if (areaName.slice(0, areaName.length - 2) === tabName) {
                            tTextArea.classList.add("js-show");
                        }
                    }

                    tSizeInput.placeholder = '選擇或輸入' + shownTabs[0].firstElementChild.textContent + '尺寸';
                }
            } else if (shownTabs.length == 0) {
                tSizeInput.placeholder = '選擇或輸入尺寸';
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
            //排除商品區塊選項可新增 && 排除品牌選項可新增（brandID無法生成）
            if (dropInput.value != "" && !dropInput.id.includes('P-count') && !dropInput.id.includes('brand')) {
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
            if (dropInput.value == "" && pendingOptions.length > 0) {
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
        if (dropInput.parentElement.querySelector(".drop-group.js-show") != null) {
            let tOptions = dropInput.parentElement.querySelector(".drop-group.js-show").querySelectorAll(".a-button.as-list");
            for (const tOption of tOptions) {
                tOption.classList.remove("js-hide");
            }
        }
    });
} //end of dropInput loop !!!
//end of GLOBAL input輸入時/輸入後響應

//Global general dropdown behaviours

//expand by hovering
$('.dropdown-box[data-query]').each((dp) => {
    $('.dropdown-box[data-query]').eq(dp).hover(
        function() {
            if (!$(this).hasClass('home') && !$(this).hasClass('new-case')) {
                $('.query-box').addClass('drop-expand');
            }
            if ($(this).hasClass('dropdown-box')) {
                $(this).find('.drop-card').removeClass('js-collapsed');
            } else if ($(this).closest('.drop-card') != null) {
                $(this).closest('.drop-card').removeClass('js-collapsed');
            }
            if ($(this).find('.dropdown-arrow') != null) {
                $(this).find('.dropdown-arrow').addClass('js-rotated');
            }
        },
        function() {
            if (!$(this).hasClass('home') && !$(this).hasClass('new-case')) {
                $('.query-box').removeClass('drop-expand');
            }
            $(this).find('.drop-card').addClass('js-collapsed');
            if ($(this).find('.dropdown-arrow') != null) {
                $(this).find('.dropdown-arrow').removeClass('js-rotated');
            }
        }
    );
})


//further response !!!冗余段落待檢查
var dropCards = document.querySelectorAll(".drop-card");
for (const dropCard of dropCards) {
    //排除filter query //!!!新舊衝突
    if (dropCard.parentElement.dataset.query == null) {
        //multi-dropdown input value 顯現>>>已選N項<<<
        document.addEventListener("click", (e) => {
            let target = e.target;
            let multiDropCards = document.querySelectorAll(".drop-card[data-drop=multi]");
            for (const multiDropCard of multiDropCards) {
                if (multiDropCard.querySelector(".drop-group.js-show") != null) {
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
                }
            }
        });

        //dropCard 範圍外收合下拉選單
        document.addEventListener("click", (e) => {
            let target = e.target;
            let dropArrow = dropCard.parentElement.querySelector(".dropdown-arrow"); // for global collapse
            let tDropCard;
            if (target.parentElement.parentElement != null) {
                tDropCard = target.parentElement.parentElement.parentElement; // for expandByLabel
            }
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
                let dropBox = target.parentElement;
                if (!target.parentElement.classList.contains('input-embed')) {
                    execute();
                } else if (target.parentElement.classList.contains('input-embed')) { //未包覆在form中的獨立input
                    dropBox = target.parentElement.parentElement;
                    execute();
                }

                function execute() {
                    dropBox.querySelector(".drop-card").classList.remove("js-collapsed");
                    dropBox.querySelector(".dropdown-arrow").classList.add("js-rotated");
                    dropBox.querySelector(".dropdown-arrow").classList.remove("unclickable");
                }
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
            if (target.classList.contains('dropdown-box') && !target.classList.contains('new-case') && target.dataset.query == undefined) { //排除newcase、filter query//!!!新舊衝突
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

//checked input styling
$(document).click(function(e) {
    let target = e.target;
    if (!$(target).siblings('.custom-check').hasClass('w--redirected-checked')) {
        if ($(target).parent().hasClass('full-chip')) {
            $(target).css('color', 'rgba(47, 90, 58, 1)');

        } else if ($(target).parent().hasClass('as-chip')) {
            $(target).parent().siblings().find('.label').css('color', 'rgba(47, 90, 58, 0.5)');
            $(target).css('color', 'rgba(47, 90, 58, 1)');
        }
    } else {
        if ($(target).parent().hasClass('full-chip')) {
            $(target).css('color', 'rgba(47, 90, 58, 0.5)');
        } else if ($(target).parent().hasClass('as-chip')) {
            $(target).parent().siblings().find('.label').css('color', 'rgba(47, 90, 58, 0.5)');
            $(target).css('color', 'rgba(47, 90, 58, 1)');
        }
    }
})

// ----------------------------------------------------------------------------------------------------

//@Index 專屬區塊
if (!window.location.href.includes('form-type-a') && !window.location.href.includes('form-type-b')) {

    //Result dropDown Label 點擊響應
    //!!!待解，jQuery不接受'js-'開頭的class name???
    $('[data-name=designer]').parent().find('.label').click(function() {
        if (!$(this).siblings('.custom-check').hasClass('j-selected')) {
            $(this).parentsUntil('.drop-card').find('.custom-check').removeClass('j-selected');
            $(this).siblings('.custom-check').addClass('j-selected');
        }
    })

    //a-list timeing-notes
    setTimeout(() => {
        $('.a-list').each((a) => {
            $('.a-list').eq(a).hover(
                function() {
                    if (!$(this).hasClass('js-topbar')) {
                        $(this).find('.timing-notes').removeClass('js-hide');
                        $(this).find('.a-divisional').css('display', 'none');
                        $('.month-indicator').css('opacity', '0.64');
                        $('.a-list').css('opacity', '0.64');
                        $(this).css('opacity', '1');
                        // $(this).find('._14px-500').css('fontSize', '15px'); //與css keyframe animation (font)互相衝突
                    }
                },
                function() {
                    $(this).find('.timing-notes').addClass('js-hide');
                    $(this).find('.a-divisional').css('display', 'block');
                    $('.month-indicator').css('opacity', '1');
                    $('.a-list').css('opacity', '1');
                    // $(this).css('opacity','1');
                    // $(this).find('._14px-500').css('fontSize', '14px');
                }
            )
            $('.a-list').eq(a).click((e) => {
                let target = e.target;
                if (!$(target).hasClass('for-timestamp')) {
                    $(target).find('.timing-notes').addClass('js-hide');
                }
            })
        })

        //copy text (using a temp input)
        $(document).ready(function() {
            let hinterA = '<div class="hinter-box cp-timestamp"><div class="_12px-500 for-hinter">複製文字</div><div class="hinter-triangle cp-timestamp"></div></div>';
            $(".for-timestamp").each((i) => {
                $(".for-timestamp").eq(i).click((e) => {
                    let target = e.target
                    copyText(target);
                    $('.hinter-box.cp-timestamp ._12px-500').text('已複製');
                    $('.hinter-box.cp-timestamp').css('left', '-40px');
                })
                $(".for-timestamp").eq(i).hover(
                    function() {
                        $(this).parent().append(hinterA);
                        setTimeout(() => {
                            $('.hinter-box.cp-timestamp').css('opacity', '1');
                        }, 100)
                    },
                    function() {
                        $('.hinter-box.cp-timestamp').remove();
                    }
                )
            })
            let hinterB = '<div class="hinter-box cp-output"><div class="_12px-500 for-hinter">複製文字</div><div class="hinter-triangle cp-timestamp"></div></div>';
            let copiable = $('div[data-output="applicant"] , div[data-output="designer"] , div[data-output="path"]');
            $(copiable).each((i) => {
                $(copiable).eq(i).click((e) => {
                    let target = e.target
                    copyText(target);
                    $('.hinter-box.cp-output ._12px-500').text('已複製');
                    $('.hinter-box.cp-output').css('left', '-64px');
                })
                $(copiable).eq(i).hover(
                    function() {
                        $(this).parent().append(hinterB);
                        setTimeout(() => {
                            $('.hinter-box.cp-output').css('opacity', '1');
                        }, 100)
                    },
                    function() {
                        $('.hinter-box.cp-output').remove();
                    }
                )
            })

            function copyText(el) {
                var tempInput = document.createElement("input");
                tempInput.value = el.textContent;
                //若複製email
                if (tempInput.value.includes('@')) {
                    let space = $(tempInput).val().indexOf(' ');
                    $(tempInput).val($(tempInput).val().slice(space, $(tempInput).val().length));
                }
                //若mac使用者複製相關路徑
                let isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
                let isIOS = /(iPhone|iPod|iPad)/i.test(navigator.platform);
                console.log('isMacLike:' + isMacLike + ',isIOS:' + isIOS);
                if (isMacLike || isIOS) {
                    $(tempInput).val($(tempInput).val().replace('P:\\', '/Volumes/品牌營銷處/'));
                    $(tempInput).val($(tempInput).val().replaceAll('\\', '/'));
                }

                document.body.appendChild(tempInput);
                tempInput.select();

                document.execCommand("copy");
                document.body.removeChild(tempInput);

                // alert("Copied the text: " + TempText.value);
            }
        })
    }, 1000)


}

// ----------------------------------------------------------------------------------------------------

//@form-type-a專屬區塊
if (window.location.href.includes('form-type-a')) {

    //消除scroll stuck
    $('#Swiped').scroll((e) => {
        let target = e.target;
        let bottom = $('#Swiped')[0].getBoundingClientRect().bottom;
        let wHeight = window.innerHeight;
        // console.log('top: ' + top + '/' + window.innerHeight)
        // console.log('bottom: ' + bottom + '/' + window.innerHeight)

        if (bottom - wHeight > 50) {
            // target.scrollIntoView({
            //     behavior: 'smooth',
            //     block: "center",
            //     inline: "nearest"
            // });
            window.scrollBy({
                behavior: 'smooth',
                top: bottom - wHeight + 32,
            });
        }
        //此段與下方衝突，替代方案為click event
        // if (top < 0) {
        //     window.scrollBy({
        //         behavior: 'smooth',
        //         top: top - 32,
        //     });
        // }

        if ($(target).scrollTop() > 1080) {
            let submitTop = $('#Submit')[0].getBoundingClientRect().top;
            let submitHeight = $('#Submit')[0].getBoundingClientRect().height;
            // console.log($('#Submit')[0].getBoundingClientRect())
            window.scrollBy({
                behavior: 'smooth',
                top: submitTop - submitHeight / 2,
            });
        }
    })

    $('#Swiped').click(() => {
        let top = $('#Swiped')[0].getBoundingClientRect().top;
        let bottom = $('#Swiped')[0].getBoundingClientRect().bottom;
        let wHeight = window.innerHeight;

        if (top < 0) {
            window.scrollBy({
                behavior: 'smooth',
                top: top - 32,
            });
        }

        if (bottom - wHeight > 50) {
            // target.scrollIntoView({
            //     behavior: 'smooth',
            //     block: "center",
            //     inline: "nearest"
            // });
            window.scrollBy({
                behavior: 'smooth',
                top: bottom - wHeight + 32,
            });
        }
    })

    //案型增減區always置中，以下判斷前一區塊在畫外的比例來猜測使用者行為
    // $(document).scroll(() => {
    //     let visualTop = $('#Visual')[0].getBoundingClientRect().top;
    //     let offsetBttm = $('#Swiped')[0].getBoundingClientRect().bottom;
    //     console.log(visualTop)
    //     if (visualTop > -80 && visualTop < 24) {
    //         scrollCenter();
    //     }

    //     function scrollCenter() {
    //         $('#Swiped')[0].scrollIntoView({
    //             behavior: 'smooth',
    //             block: "center",
    //             inline: "nearest"
    //         });
    //     }
    // })

    //案型增減區always置中，改為偵測#Swiped當中的任何scrollTop變化

    //product 若選擇「無需曝光商品」，其他選項將被鎖定
    $(document).click(() => {
        $('#Product').each((p) => {
            let pOption = $('#Product').eq(p).find('.label.full-touch');
            $(pOption).each((o) => {
                $(pOption).eq(o).click((e) => {
                    let target = e.target;
                    setTimeout(() => {
                        if ($(target).text() == '無需曝光商品' && $(target).attr('data-select') == 'true') {
                            $(target).parent().siblings().css('opacity', '0.5');
                            $(target).parent().siblings().find('.label').addClass('unclickable');
                            $(target).css('opacity', '1');
                            $(target).removeClass('unclickable');
                        }
                        if ($(target).text() == '無需曝光商品' && $(target).attr('data-select') == '') {
                            $(target).parent().siblings().css('opacity', '1');
                            $(target).parent().siblings().find('.label').removeClass('unclickable');
                        }
                    }, 100)
                })
            })
        })
    })


    //tab indicator 在沒有ec tab顯現時隱藏
    $(document).click(() => {
        $('[data-group=ecTabs]').find('.custom-check').each((t) => {
            let checker = $('[data-group=ecTabs]').find('.custom-check').eq(t);
            setTimeout(() => {
                if (!$(checker).hasClass('js-selected')) {
                    let ecName = $(checker).siblings().attr('data-ec');
                    let card = $(checker).closest('.card');
                    let txtArea = $(card).find('textarea');
                    let sizeGroup = $(card).find('.col-right').find('.drop-group');
                    let tabs = $(card).find('.as-tab').not('.indicator');
                    $(txtArea).each((t) => {
                        if ($(txtArea).eq(t).attr('name').indexOf(ecName) >= 0) {
                            if ($(txtArea).eq(t).val() != "") {
                                let confirm = window.confirm('確定取消勾選' + ecName + '？已勾選的' + ecName + '尺寸將被清除！')
                                if (confirm) {
                                    clearEC();
                                } else {
                                    $(checker).addClass('js-selected');
                                    $(tabs).css('color', 'rgba(47, 90, 58, 0.5)');
                                    $(tabs).each((b) => {
                                        if ($(tabs).eq(b).children('.label').attr('data-tab').indexOf(ecName) >= 0) {
                                            $(tabs).eq(b).addClass('js-show');
                                            $(tabs).eq(b).css('color', 'rgba(47, 90, 58, 1)');
                                            $(card).find('.col-right').find('.input[type="text"]').val('選擇或輸入' + $(tabs).eq(b).find('.label').text() + '尺寸');
                                        }
                                    })
                                    $(sizeGroup).each((s) => {
                                        if ($(sizeGroup).eq(s).attr('data-group') == ecName) {
                                            $(sizeGroup).removeClass('js-show');
                                            $(sizeGroup).eq(s).addClass('js-show');
                                        }
                                    })
                                    $(txtArea).removeClass('js-show');
                                    $(txtArea).eq(t).addClass('js-show');
                                    return;
                                }

                                function clearEC() {
                                    $(sizeGroup).each((s) => {
                                        if ($(sizeGroup).eq(s).attr('data-group') == ecName) {
                                            $(sizeGroup).eq(s).find('.custom-check').removeClass('js-selected');
                                        }
                                    })
                                    $(tabs).each((b) => {
                                        if ($(tabs).eq(b).children('.label').attr('data-tab').indexOf(ecName) >= 0) {
                                            $(tabs).eq(b).find('.as-counts').text('');
                                        }
                                    })
                                    $(card).find('.col-right').find('.input[type="text"]').val('')
                                    $(txtArea).eq(t).removeClass('js-show');
                                    $(txtArea).eq(t).text('');
                                    $(txtArea).eq(t).val('');
                                    $(card).find('.as-tab.indicator').css('top', '0px');
                                }
                            }
                        }
                    })
                }
            }, 10)

            if ($('[data-group=ecTabs]').eq(t).find('.js-selected').length == 0) {
                $('[data-group=ecTabs]').eq(t).closest('.col-left').find('.indicator').css('display', 'none');
            }
        })
    })

    //去除Webflow 為textarea預設的placeholder
    $(document).ready(() => {
        $('textarea').each((ta) => {
            if ($('textarea').eq(ta).attr('placeholder') == 'Example text') {
                $('textarea').eq(ta).attr('placeholder', '');
            }
        })
    })

    //color-code 點擊響應&套件開關
    $(document).click(function(e) {
        let target = e.target;

        if ($(target).siblings('input').attr('name') == 'color-tone') { //name = color-tone同組的radio btn的label
            let colorTool = $(target).parent().parent().parent().find('.color-block'); //colorTool 套件
            if ($(target).parent().attr('data-custom') == 'color-picker') {
                colorTool.removeClass('js-toggle');
                $(target).parent().css('backgroundImage', 'linear-gradient(180deg, rgba(255, 234, 0, 0.2), rgba(255, 234, 0, 0.2))');
                $(target).siblings('.custom-check').addClass('active');
            } else if ($(target).parent().attr('data-custom') != 'color-picker') {
                colorTool.addClass('js-toggle');
                $('[data-custom=color-picker]').css('backgroundImage', 'none');
                $('[data-custom=color-picker]').find('.custom-check').removeClass('active');
            }
        }
    });

    //SWIPER 案型增減響應
    let swiper = document.querySelector("div.swiper");

    //頁面loading後預設隱藏未被新增的案型
    window.onload = function() {
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
                    // shownSwiper.querySelector(".swiper-indicator").style.height = "0px";
                }
            }

            //新增案型（將隱藏的案型轉換為「可操作」的案型）
            if (target.classList.contains("js-add") && hiddenSwipers[0] != null) {
                disableAllSwipers();
                hiddenSwipers[0].classList.remove("js-hide");
                hiddenSwipers[0].dataset.handle = "true";
                hiddenBoxes[0].classList.remove("js-hide");
                hiddenBoxes[0].dataset.handle = "true";

                let shownSwipers = swiper.querySelectorAll(".a-button[data-handle=true]"); //!!需重新定義一次shownSwipers
                let n = shownSwipers.length;
                n -= 1;
                shownSwipers[n].classList.add("js-active");
                // shownSwipers[n].querySelector(".swiper-indicator").style.height = "4px";

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
                        target.previousElementSibling.previousElementSibling.textContent.charAt(0);
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
                    // shownSwipers[0].querySelector(".swiper-indicator").style.height = "4px";
                    shownSwipers[0].classList.remove("js-hide");
                    shownSwipers[0].dataset.handle = "true";

                    target.parentElement.classList.remove("js-active");
                    // target.parentElement.querySelector(".swiper-indicator").style.height =
                    //     "0px";
                    target.parentElement.classList.add("js-hide");
                    target.parentElement.dataset.handle = "false";

                    let swiped = section.querySelector(".swiped");
                    swiped.style.marginLeft = "0px"; //swiped視窗推至最左邊
                }
            }

            //新增or刪除案型「之後」產生案型編號
            shownSwipers = $(swiper).find(".a-button[data-handle=true]");
            let i;
            for (i = 0; i < shownSwipers.length; i++) {
                let n = i + 1;
                shownSwipers[i].firstElementChild.textContent = n;
                $('.section.in-swiped').each((s) => {
                    let m = $(shownSwipers).eq(i).find('.unclickable').text();
                    let capTitle = $('.section.in-swiped').eq(s).find('.card-box[data-handle=true]').eq(i).find('.cap-title');
                    if ($(shownSwipers).length > 1 && $(capTitle).text().length < 5) {
                        $(capTitle).text('案型 ' + m + '\xa0\xa0' + $(capTitle).text());
                    }
                    if ($(target).hasClass('js-remove')) {
                        if ($(shownSwipers).length == 1) {
                            let sliced = $(capTitle).text().slice(6, $(capTitle).text().length);
                            setTimeout(() => {
                                $(capTitle).text(sliced);
                            }, 100)
                        } else if ($(shownSwipers).length > 1) {
                            // m = $(shownSwipers).eq(i).find('.unclickable').text();
                            $(capTitle).text($(capTitle).text().replace(/[0-9]/g, m));
                        }
                    } else if ($(target).hasClass('js-add')) {
                        $(capTitle).text($(capTitle).text().replace(/[0-9]/g, m));
                    }
                })
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
                // swiperOption.querySelector(".swiper-indicator").style.height = "0px";
                target.classList.add("js-active");
                // target.querySelector(".swiper-indicator").style.height = "4px";
            }
            for (const section of sections) {
                let swiped = section.querySelector(".swiped");
                let serial = target.firstElementChild.textContent.charAt(0);
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
                swiperOption.style.borderRadius = "10px";
                // if (swiperOption.classList.contains('js-active')) {
                //     swiperOption.style.backgroundSize = '32px';
                // }
            }
        }

        function returnEdit() {
            swiperIcon.classList.add("js-edit");
            swiperIcon.classList.remove("js-add");
            for (const swiperOption of swiperOptions) {
                let remove = swiperOption.querySelector(".js-remove");
                remove.style.display = "none";
                swiperOption.style.backgroundColor = "transparent";
                swiperOption.style.borderRadius = "8px";
                // if (swiperOption.classList.contains('js-active')) {
                //     swiperOption.style.backgroundSize = '40px';
                // }
            }
        }
    });


    //swiper 位置初始設定 -> in case 放在旁側
    $(document).ready(() => {
        $('.swiper').css('marginBottom', '24px');
        // $('.swiper').css('bottom', 'calc(50vh - 230px)');
        // $('.swiper-title').css('left', -104 + 'px'); 
    })

    //swiper-title 位置隨長度變化 (目前採align-center(flex)自動計算)
    // $(document).click((e) => {
    //     let target = e.target;
    //     let caseLength = $(target).parent().parent().find('[data-handle=true]').length;
    //     if ($(target).hasClass("js-remove")) {
    //         if ($(target).parent().find('.unclickable').text() != '1') {
    //             caseLength -= 2;
    //             let newPos = -98 - (caseLength * 22) + 'px';
    //             // console.log(newPos)
    //             $('.swiper-title').css('left', newPos);
    //         }
    //     } else if ($(target).hasClass("js-add")) {
    //         let newPos = -98 - (caseLength * 22) + 'px';
    //         // console.log(newPos)
    //         if (caseLength < 3) {
    //             $('.swiper-title').css('left', newPos);
    //         }
    //     }
    // })

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
                        tSizeInput.placeholder = '選擇或輸入' + tabName + '尺寸';
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

    //@form-type-a hinter 響應
    //ec size 預設為不可點按
    window.addEventListener("load", () => {
        let dropInputs = document.querySelectorAll(".input.dropdown");
        for (const dropInput of dropInputs) {
            if (dropInput.dataset.name.includes("S-count2")) {
                dropInput.classList.add("unclickable");
            }
        }
    });

    //dropdown hinter提示
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

    //thunder hinter 響應
    let thunderBoxes = document.querySelectorAll('.th-box');
    for (const thunderBox of thunderBoxes) {
        thunderBox.addEventListener('mouseenter', (e) => {
            let target = e.target;
            let hinter = target.querySelector('.hinter-box');
            hinter.style.display = "flex";
        });
        thunderBox.addEventListener('mouseleave', (e) => {
            let target = e.target;
            let hinter = target.querySelector('.hinter-box');
            hinter.style.display = "none";
        });
    }
    //end of @form-type-a hinter 響應

    //anchor dot breathing
    $(document).ready(() => {
        // $('.anch-inner_circ').css('backgroundColor', '#3B7A47');
        $('.anch-inner_circ').css('display', 'none');
        $('.anch-inner_circ').eq(0).css('display', 'block');
        if (!window.location.href.includes('read-me')) {
            $('[data-anch]').attr('href', '#'); //暫時放棄webflow scroll script，因下方bind events 有bug 無法解決
        }
        $('body')[0].scrollIntoView({ //頁面重新整理預設回到頂端
            behavior: 'smooth',
            block: "start",
            inline: "nearest"
        });
    });

    //Scroll響應
    //[data-anch]
    $('[data-anch]').each((a) => {
            $('[data-anch]').eq(a).click(() => {
                if ($('[data-anch]').eq(a)) {
                    let s;
                    for (s = 0; s < $('.section').length; s++) {
                        if ($('[data-anch]').eq(a).attr('data-anch') == $('.section').eq(s).attr('id')) {
                            $('.section')[s].scrollIntoView({
                                behavior: 'smooth',
                                block: "center",
                                inline: "nearest"
                            });
                        }
                    }
                }
            })
        })
        //[data-anchS]
    $('[data-anchS]').each((as) => {
        $('[data-anchS]').eq(as).click((e) => {
            if ($('[data-anchS]').eq(as)) {
                $('.swiping-area')[0].scroll({
                    top: 498 * as,
                    behavior: 'smooth',
                    block: "start",
                    inline: "nearest"
                });
                $('.swipe-anchor.indicator').css('display', 'block');
                // let scrollPos = $('.swiping-area')[0].scrollTop;
                $('.swipe-anchor.indicator').css('top', as * 37 + 'px');
                $('.swipe-anchor').not('.indicator').removeClass('js-current');
                $('.swipe-anchor').not('.indicator').eq(as).addClass('js-current');
            }
        })
    })

    $(window).bind('mousewheel DOMMouseScroll scroll mouseup mousedown keyup keydown load', (e) => { //涵蓋所有頁面捲動的事件監聽
            let anchKey = window.location.href;
            $('[data-anch]').each((a) => {
                if (anchKey.includes($('[data-anch]').eq(a).attr('href')) ||
                    $('[data-anch]').eq(a).attr('class').includes('w--current')) {
                    $('[data-anch]').find('.anch-inner_circ').css('display', 'none');
                    $('[data-anch]').eq(a).find('.anch-inner_circ').css('display', 'block');
                    $('.swipe-anchor.indicator').css('display', 'none'); //#Swiped在畫外時隱藏
                    $('.swiped-alt-anch').css('display', 'block'); //#Swiped在畫外時顯現
                    $('.swipe-anchor').not('.indicator').removeClass('js-current');

                    if ($('[data-anch]').eq(a).attr('data-anch') == 'Swiped') {
                        $('.swipe-anchors-box').css('marginTop', '14px');
                        $('.swipe-anchors-box').css('marginBottom', '0px');
                        $('.m-anchors').css('height', '286px');

                        //調整$('.swipe-anchors-box')上下margin
                        $('.swiped-alt-anch').css('display', 'none'); //#Swiped在畫內時隱藏
                        $('.swipe-anchor.indicator').css('display', 'block'); //#Swiped在畫內時顯現
                        let scrollPos = $('.swiping-area')[0].scrollTop;
                        roundPos = Math.round(scrollPos / 498); //防止數值飄忽，難以錨定
                        $('.swipe-anchor.indicator').css('top', roundPos * 37 + 'px');
                        $('.swipe-anchor').not('.indicator').eq(roundPos).addClass('js-current');
                    } else if ($('[data-anch]').eq(a).attr('data-anch') == 'Submit') {
                        $('.swipe-anchors-box').css('marginBottom', '14px');
                        $('.swipe-anchors-box').css('marginTop', '0px');
                        $('.m-anchors').css('height', '286px');
                    } else {
                        $('.swipe-anchors-box').css('marginBottom', '0px');
                        $('.swipe-anchors-box').css('marginTop', '0px');
                        $('.m-anchors').css('height', '272px');
                    }
                }
                if (anchKey.includes('Info')) {
                    $('[data-anch]').find('.anch-inner_circ').css('display', 'none');
                    $('[data-anch]').eq(0).find('.anch-inner_circ').css('display', 'block');
                }
            })
        }) // end of anchor dot breathing

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
                                        tSizeInput.placeholder = '選擇或輸入' + tabName + '尺寸';
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
            let tBlockGroup = $(this).closest('.card-box').find('.height-318');

            if (thunder.attr('data-thunder') == 'false') {
                thunder.attr('data-thunder', 'true');
                tBlockGroup.addClass('thunder-locked');
                $(this).find('._12px-500.for-thunder').text('解除鎖定以編輯');
                $(this).find('._12px-500.for-thunder').css('width', '124px');

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
                $(this).find('._12px-500.for-thunder').text('套用自案型 1');
                $(this).find('._12px-500.for-thunder').css('width', 'auto');

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

            //thunder locking 提示
            $('.thunder-locked').each((th) => {
                $('.thunder-locked').eq(th).click(() => {
                    $('.thunder-locked').eq(th).addClass('js-shake');
                    setTimeout(function() {
                        $('.thunder-locked').eq(th).removeClass("js-shake");
                    }, 200);
                })
                $('.thunder-locked').eq(th).hover(mEnter, mLeave);

                function mEnter() {
                    $('.thunder-locked').eq(th).closest('.card').find('.hinter-box.for-thunder').css('display', 'flex');
                }

                function mLeave() {
                    $('.thunder-locked').eq(th).closest('.card').find('.hinter-box.for-thunder').css('display', 'none');
                }
            })
        }) //end of 快速套用主案型
}


// ----------------------------------------------------------------------------------------------------

// @read-me 專屬區塊
if (window.location.href.includes('read-me')) {
    //標題註記& 呈現內文安排
    $(document).ready(() => {
        let type = sessionStorage.getItem('type');
        if (type == 'applicant') {
            $('[data-display=master]').remove();
            $('[data-display=designer]').remove();
            $('.identity').text('需求方｜操作說明');
        } else if (type == 'designer') {
            $('[data-display=master]').remove();
            $('[data-display=applicant]').remove();
            $('.identity').text('設計方｜操作說明');
        } else if (type == 'MASTER') {
            $('[data-display=applicant]').remove();
            $('[data-display=designer]').remove();
            $('.identity').text('管理方｜操作說明');
        }
    })

    //#品牌權限  applicant需求方 顯示「品牌代號」
    let brandID = sessionStorage.getItem('brandID');
    $('.brand').text(brandID);

    //expander
    let expander = $('.p-h3').not('.js-exclude');
    $(expander).click((e) => {
        let target = e.target;
        $('.paragraph').not('.js-exclude').addClass('js-collapsed');
        $('.p-inline.arrow').removeClass('js-rotated');
        $(expander).css('opacity', '0.72');
        if ($(target).attr('data-expand') != 'true') {
            $(target).next('.paragraph').not('.js-exclude').removeClass('js-collapsed');
            $(target).find('.arrow').addClass('js-rotated');
            $(expander).attr('data-expand', 'false');
            $(target).attr('data-expand', 'true');
            $(target).css('opacity', '1');
        } else if ($(target).attr('data-expand') == 'true') {
            $('.paragraph').not('.js-exclude').addClass('js-collapsed');
            $('.p-inline.arrow').removeClass('js-rotated');
            $(target).attr('data-expand', 'false');
            $(expander).css('opacity', '0.72');
        }
    })

    // $('.paragraph').each((p) => {
    //     if (!$('.paragraph').eq(p).hasClass('js-collapsed')) {
    //         $('.paragraph').eq(p).prev('.p-h3').click((e) => {
    //             let target = e.target;
    //             console.log($(target))
    //             $('.paragraph').not('.js-exclude').addClass('js-collapsed');
    //             $('.p-inline.arrow').removeClass('js-rotated');
    //         })
    //     }
    // })

    // anchor
    // $(document).ready(() => {
    //     // $('.anch-inner_circ').css('backgroundColor', '#3B7A47');
    //     if (!window.location.href.includes('read-me')) {
    //         $('.anch-inner_circ').css('display', 'none');
    //         $('.anch-inner_circ').eq(0).css('display', 'block');
    //         $('[data-anch]').attr('href', '#'); //暫時放棄webflow scroll script，因下方bind events 有bug 無法解決
    //     }
    // });

    // $('.container.for-list').scroll(() => {
    //     $('h3').each((s) => {
    //         let offsetTop = $('h3')[s].getBoundingClientRect().top;
    //         let height = window.innerHeight;
    //         if (offsetTop < height * 0.33 && offsetTop > 96) {
    //             console.log($('h3')[s])

    //             $('[data-anch]').each((a) => {
    //                 if ($('[data-anch]').eq(a).attr('data-anch') == $('h3').eq(s).attr('id')) {
    //                     $('[data-anch]').eq(a).addClass('w--current');
    //                     $('.anch-inner_circ').css('display', 'none');
    //                     $('.anch-inner_circ').eq(a).css('display', 'block');
    //                 } else {
    //                     $('[data-anch]').eq(a).removeClass('w--current');
    //                     $('.anch-inner_circ').eq(a).css('display', 'none');
    //                 }
    //             })
    //         }
    //     })
    // })
    // $('[data-anch]').each((a) => {
    //     $('[data-anch]').eq(a).click(() => {
    //         if ($('[data-anch]').eq(a)) {
    //             let s;
    //             for (s = 0; s < $('h3').length; s++) {
    //                 if ($('[data-anch]').eq(a).attr('data-anch') == $('h3').eq(s).attr('id')) {
    //                     // console.log($('h3')[s])
    //                     let offsetTop = $('h3')[s].getBoundingClientRect().top - '96';
    //                     // console.log(offsetTop)

    //                     $('.container.for-list')[0].scrollBy({
    //                         top: offsetTop,
    //                         block: 'start',
    //                         behavior: 'smooth',
    //                     });
    //                 }
    //             }
    //         }
    //     })
    // })
};

// ----------------------------------------------------------------------------------------------------


//@form-type-a、@form-type-b 共用區塊
if (window.location.href.includes('form-type-a') || window.location.href.includes('form-type-b')) {

    //back-home觸發前彈跳提醒視窗
    // $(document).click(()=>{
    //     if ($('input:text').not(':empty').length > 0 || $('.w--redirected-checked').length > 0) {
    //         $('.back-home.trigger').css('display','block');
    //     }
    // })
    $('.back-home.trigger').click(() => {
        // let target = e.target;
        if ($('input[type=text]').val() != '' || $('textarea').text() != '' || $('.w--redirected-checked').length > 0) {
            let confirm = window.confirm('確定離開表單? 已填寫的欄位將不會儲存!');
            if (confirm) {
                jQuery('.back-home').not('.trigger').trigger('click');
            }
        } else {
            jQuery('.back-home').not('.trigger').trigger('click');
        }
    })


    //基本資訊填畢即更新同步topbar標題
    $('#Info').find('.card').click(() => {
        syncTitle();
    })

    // $('.js-custom-input').change(() => {
    //     syncTitle();
    // })

    function syncTitle() {
        setTimeout(() => {
            // let titleReady = false;
            let readyNum = 0;
            let titleBlock = $('#Info').find('.f-block[data-required=true]');
            // if (titleBlock.find('input[type=text]').val() != '' && titleBlock.find('.w--redirected-checked').length > 0) {
            $(titleBlock).each((t) => {
                if ($(titleBlock).eq(t).find('input[type=text]').val() != '') {
                    readyNum += 1;
                }
            })

            if (readyNum == 3) {
                let date = $(titleBlock).eq(0).find('input').val();
                let brand = $(titleBlock).eq(1).find('input').val();
                let format = $(titleBlock).eq(2).find('input').val();
                // let format = $(titleBlock).eq(2).find('.w--redirected-checked').siblings('input').val();
                let urgency = $('#Info').find('.f-block').eq(3).find('.w--redirected-checked').siblings('span').text();
                if (urgency != "") {
                    // urgency = ' (' + urgency.slice(0, 1) + ')';
                    urgency = '！' + urgency.slice(0, 1);
                }
                $('._18px-700.for-topbar').text(date + '\u00a0\u00a0' + brand + format + urgency);
                $('._18px-700.for-topbar').css('fontSize', '16px');
                setTimeout(() => {
                    $('._18px-700.for-topbar').css('fontSize', '18px');
                }, 200)
            } else {
                $('._18px-700.for-topbar').text('新件申請');
            }
        }, 10)
    }

    //按下enter後防止（瀏覽器預設）送出表單
    $(document).ready(function() {
        $(window).keydown(function(event) {
            if (event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        });
    });

    //取消webflow form 殘留響應
    $(document).ready(() => {
        $('w-form').removeClass('w-form');
    })

    //修正browser tab resize位移
    window.addEventListener('resize', () => {
        // console.log(window.innerHeight);
        window.scrollBy(window.innerHeight, 0);
    })

    //date-range-picker 年份處理
    $('.date-input').change(() => {
        if ($('.date-input').val().length > 0) {
            let year1 = $('.date-input').val().slice(0, 4);
            let year2 = $('.date-input').val().slice(12, 17);
            // console.log(year2)
            $('.date-input').attr('data-year', year2);
            $('.date-input').val($('.date-input').val().replaceAll(year1 + '/', ''));
            $('.date-input').val($('.date-input').val().replaceAll(year2 + '/', ''));
        }
    })

    //in-card、swiper、thunder hinter提示預設隱藏
    $(document).ready(() => {
        $('.hinter-box').not('.for-ec').css('display', 'none');
    });

    //submit (trigger) 按下後開始檢查，通過才傳送表單
    $('.submit-trigger').click((e) => {
        let target = e.target;

        // let hrefNow,
        //     hrefNext;
        $('.section').each((s) => {
            hrefNow = $('.section').eq(s).attr('id');
            if ($('.section').eq(s + 1) != null) {
                hrefNext = $('.section').eq(s + 1).attr('id');
            }
            // console.log('now: ' + hrefNow);
            // console.log('next: ' + hrefNext);

            let tSection = $('.section').not('.swiping-area').eq(s);
            let keyBlock = $(tSection).find('.card-box').not('.js-hide').find('[data-required=true]');
            $(keyBlock).each((rq) => {
                if ($(tSection).attr('id') != 'Size') {
                    if ($(tSection).attr('id') != 'Copywright' && $(tSection).attr('id') != 'Product') {
                        basicCheck();
                    } else {
                        basicCheck();
                        swiping();
                    }

                    function basicCheck() {
                        if ($(keyBlock).eq(rq).find('input[type=text]').not('[data-required=false]').length != 0 &&
                            $(keyBlock).eq(rq).find('input[type=text]').not('[data-required=false]').val() == '') {
                            hinterPoping();
                        } else if ($(keyBlock).eq(rq).find('textarea').length != 0 &&
                            $(keyBlock).eq(rq).find('textarea').val() == '') {
                            hinterPoping();
                        } else if ($(keyBlock).eq(rq).find('input[type=radio]').length != 0 &&
                            $(keyBlock).eq(rq).find('input[type=radio]').siblings('.w--redirected-checked').length == 0) {
                            hinterPoping();
                        }
                    }
                } else if ($(tSection).attr('id') == 'Size') {
                    let counter = $(keyBlock).eq(rq).find('.as-tab.js-show').find('.as-counts');
                    $(counter).each((c) => {
                        if ($(counter).eq(c).text() == '0') {
                            let tabHinter =
                                '<div class="hinter-box in-card lower-pos"><div class="_12px-500 for-hinter">尺寸未選</div><div class="hinter-triangle in-card"></div></div>';
                            $(counter).eq(c).parent().append(tabHinter);
                            tabHinter = $(counter).eq(c).siblings('.hinter-box');
                            $(tabHinter).css('display', 'block');
                            $(tabHinter).addClass("js-shake");
                            setTimeout(function() {
                                $(tabHinter).removeClass("js-shake");
                            }, 200);
                        }
                        swiping();
                    })
                }

                function swiping() { //hard-code js 版本見2021/11/04 commit
                    let sArr = [];
                    let sArrPushed = false;
                    $('.section.in-swiped').each((ss) => {
                            if ($('.section.in-swiped').eq(ss).find('.hinter-box').not('.nth-alert').not('.for-thunder').is(':visible')) {
                                if (!sArrPushed) {
                                    sArr.push(ss);
                                    sArrPushed = true;
                                }
                            }
                        })
                        // console.log('sArr0= ' + sArr[0])
                    let cardBox = $('.section.in-swiped').eq(sArr[0]).find('.card-box[data-handle=true]');
                    // let hinter = $(tSection).find('.hinter-box').not('.for-ec').not('.nth-alert').not('.for-thunder');
                    let cbArr = [];
                    let cbArrPushed = false;
                    $(cardBox).each((cb) => {
                        if ($(cardBox).eq(cb).find('.hinter-box').not('.nth-alert').not('.for-thunder').is(':visible')) {
                            if (!cbArrPushed) {
                                cbArr.push(cb);
                                cbArrPushed = true;
                            }
                        }
                    })
                    let swiped = false;
                    if (!swiped) {
                        swiped = true;
                        setTimeout(function() {
                                cb0 = cbArr[0];
                                $('.swiped').css('margin-left', "-" + 688 * 2 * cb0 + "px");
                                let swiper = $('.a-button.for-swiper[data-handle=true]');
                                // let cardBox = $('.section.in-swiped').find('.card-box[data-handle=true]');
                                $(swiper).removeClass('js-active');
                                $(swiper).eq(cb0).addClass('js-active');

                                if (cb0 == 1) {
                                    nextRotate();
                                    prevRotate();
                                    currRotate();
                                    // console.log('a')
                                } else if (cb0 == 0) {
                                    nextRotate();
                                    currRotate();
                                    // console.log('b')
                                } else if (cb0 == 2) {
                                    prevRotate();
                                    currRotate();
                                    // console.log('c')
                                }

                                function nextRotate() {
                                    let n;
                                    for (n = 0; n < 3; n++) {
                                        let cardBox = $('.section.in-swiped').eq(n).find('.card-box[data-handle=true]');
                                        $(cardBox).eq(cb0 + 1).css({
                                            'transform': 'rotateY(-80deg)',
                                            'opacity': '0'
                                        })
                                    }
                                }

                                function prevRotate() {
                                    let n;
                                    for (n = 0; n < 3; n++) {
                                        let cardBox = $('.section.in-swiped').eq(n).find('.card-box[data-handle=true]');
                                        $(cardBox).eq(cb0 - 1).css({
                                            'transform': 'rotateY(80deg)',
                                            'opacity': '0'
                                        })
                                    }
                                }

                                function currRotate() {
                                    let n;
                                    for (n = 0; n < 3; n++) {
                                        let cardBox = $('.section.in-swiped').eq(n).find('.card-box[data-handle=true]');
                                        $(cardBox).eq(cb0).css({
                                            'transform': 'rotateY(0deg)',
                                            'opacity': '1'
                                        })
                                    }
                                }

                                $('.swipe-anchor').not('.indicator').removeClass('js-current');
                                let scrollPos = $('.swiping-area')[0].scrollTop;
                                roundPos = Math.round(scrollPos / 498); //防止數值飄忽，難以錨定
                                $('.swipe-anchor.indicator').css('top', roundPos * 37 + 'px');
                                $('.swipe-anchor').not('.indicator').eq(roundPos).addClass('js-current');
                            }, 1000) //須等待頁面scroll完畢再出現案型swiping動畫較佳
                    }
                }

                function hinterPoping() {
                    let hinter = $(keyBlock).eq(rq).find('.hinter-box');
                    $(hinter).css('display', 'block');
                    $(hinter).addClass("js-shake");
                    setTimeout(function() {
                        $(hinter).removeClass("js-shake");
                    }, 200);

                    let hArr = [];
                    $('.hinter-box').each((h) => {
                            if ($('.hinter-box').eq(h).css('display') == 'block') {
                                hArr.push(h);
                            }
                        })
                        // console.log(hArr);
                    let firstSection = $('.hinter-box').eq(hArr[0]).closest('.section');
                    setTimeout(function() {
                        $(firstSection)[0].scrollIntoView({
                            behavior: 'smooth',
                            block: "center",
                            inline: "nearest"
                        });
                    }, 200);
                }
            })
        })

        let timestamp = moment().format();

        //solution found at https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
        function getPosition(string, subString, index) {
            return string.split(subString, index).join(subString).length;
        }
        let secondColon = getPosition(timestamp, ':', 2);
        timestamp = timestamp.slice(0, secondColon).replace('T', '').replaceAll('-', '').replace(':', '');
        let brand = $('.js-selected').parent('[data-branddata]').attr('data-branddata');
        // console.log(brand);
        timestamp = brand + '-' + timestamp;
        console.log(timestamp)

        $('.submit-box').attr('data-stamp', timestamp);

        if ($('.hinter-box:visible').length == 0) {
            $(target).siblings('.submit').trigger('click');
        } else {
            $(target).parent('.submit-box').addClass("js-shake");
            setTimeout(function() {
                $(target).parent('.submit-box').removeClass("js-shake");
            }, 200);
        }
    });

    //重新填寫觸發in-card hinter關閉
    $(document).click((e) => {
        let target = e.target;
        $('.f-block').each((f) => {
            if ($('.f-block').eq(f).find('.hinter-box').length != 0) {
                if ($('.f-block').eq(f).find('.hinter-box').css('display') == 'block') {
                    if ($(target).is('.label')) {
                        $(target).closest('.f-block').find('.hinter-box').css('display', 'none');
                    } else if ($(target).is('input[type=text]') || $(target).is('textarea')) {
                        $(target).closest('.f-block').find('.hinter-box').css('display', 'none');
                    }
                }
            }
        });
        $('.height-318').each((h) => {
            if ($('.height-318').eq(h).find('.hinter-box').length != 0) {
                if ($('.height-318').eq(h).find('.hinter-box').css('display') == 'block') {
                    if ($('.height-318').eq(h).find('[data-col=tab]').length == 0) { //無tab col的height-318 === #Product
                        if ($(target).is('.label')) {
                            $(target).closest('.height-318').find('.hinter-box').css('display', 'none');
                        }
                    } else { //#Size
                        if ($(target).is('.label') && $(target).parent().parent().attr('data-group') != 'ecTabs') {
                            let hinters = $(target).closest('.height-318').find('.hinter-box');
                            $(hinters).each((h) => {
                                if ($(target).closest('.drop-group').attr('data-group') == hinters.eq(h).siblings('.label').attr('data-tab')) {
                                    hinters.eq(h).css('display', 'none');
                                }
                            })
                        }
                    }
                }
            }
        });
    });
}