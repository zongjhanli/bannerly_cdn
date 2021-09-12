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

// Global
// datepicker.js function (區間日期選項)
$('#date-exposure_range').daterangepicker({
    ranges: {
        '今天': [moment(), moment()],
        '下一週': [moment().add(1, 'week').startOf('week'), moment().add(1, 'week').endOf('week')],
        '下一月份': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')],
    },
    "alwaysShowCalendars": true,
    "startDate": moment(),
    "endDate": moment().add(0, 'week').endOf('week'),
    "minDate": moment(),
    "opens": "center",
}, function(start, end, label) {});

// datepicker.js function (單一日期選項)            
$('#date-deadline').daterangepicker({
    "singleDatePicker": true,
    "alwaysShowCalendars": true,
    "startDate": moment(),
    "endDate": moment(),
    "minDate": moment(),
    "opens": "center",
    "drops": "up"
}, function(start, label) {});

// @Basic-Entries date-input placeholder被按下後即隱藏
let dateInputEmbeds = document.querySelectorAll('.date-input-embed');
for (const dateInputEmbed of dateInputEmbeds) {
    dateInputEmbed.addEventListener('click', (e) => {
        let target = e.target;
        let dateInputPlaceholder = dateInputEmbed.nextElementSibling;

        dateInputEmbed.style.opacity = "1.0"; //default: 0
        dateInputPlaceholder.style.display = "none"; // default: block, unclickable
    })
}