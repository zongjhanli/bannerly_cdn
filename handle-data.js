//@Form-apply 專屬區塊
if (window.location.href.includes('form-apply')) {
    let submit = document.querySelector('input[type=submit]');
    submit.addEventListener('click', () => {
        //lookup ec names
        let tabBoxes = $('[data-box=tab]');
        let Alabels = tabBoxes[0].querySelectorAll('.a-button.js-show .label');
        let Blabels = tabBoxes[1].querySelectorAll('.a-button.js-show .label');
        let Clabels = tabBoxes[2].querySelectorAll('.a-button.js-show .label');
        let AecStr = Array.from(Alabels, (x) => x.textContent);
        let BecStr = Array.from(Blabels, (x) => x.textContent);
        let CecStr = Array.from(Clabels, (x) => x.textContent);

        //reconstruct copywright value
        let AcopywrightStr = [];
        AcopywrightStr.push($("#C-1-A").val(), $("#C-2-A").val(), $("#C-3-A").val(), $("#C-4-A").val());
        let BcopywrightStr = [];
        if ($("#C-1-B").val() != "") {
            BcopywrightStr.push($("#C-1-B").val(), $("#C-2-B").val(), $("#C-3-B").val(), $("#C-4-B").val());
        }
        let CcopywrightStr = [];
        if ($("#C-1-C").val() != "") {
            CcopywrightStr.push($("#C-1-C").val(), $("#C-2-C").val(), $("#C-3-C").val(), $("#C-4-C").val());
        }

        axios.post('https://sheetdb.io/api/v1/fx6gemwyky94h', {
            "data": {
                ////基本資訊
                "曝光日期": $('#date-exposure_range').val(),
                "主打品牌": $('#brand').val(),
                "活動類型": $("[name=case-format]").siblings(".w--redirected-checked").siblings("[name=case-format]").val(),
                "急迫度": $("[name=urgency]").siblings(".w--redirected-checked").siblings(".label").text().slice(3, 4),
                ////主視覺
                "指定色調": $("[name=color-tone]").siblings(".w--redirected-checked").siblings("[name=color-tone]").val(),
                "指定氛圍": $("[name=theme]").siblings(".w--redirected-checked").siblings("[name=theme]").val(),
                ////案型1
                "案型1-活動文案": AcopywrightStr.toString(),
                //
                "案型1-商品總數": $("#P-count-A").val(),
                "案型1-商品清單": $("#P-A").val(),
                //
                "案型1-尺寸總數": $("#S-count2-A").val(),
                "案型1-momo尺寸": $("#momo-A").val(),
                "案型1-pchome尺寸": $("#pchome-A").val(),
                "案型1-friday尺寸": $("#friday-A").val(),
                "案型1-book尺寸": $("#book-A").val(),
                "案型1-shopee尺寸": $("#shopee-A").val(),
                "案型1-yahoo尺寸": $("#yahoo-A").val(),
                "案型1-etmall尺寸": $("#etmall-A").val(),
                "案型1-buy123尺寸": $("#buy123-A").val(),
                "案型1-meimaii尺寸": $("#meimaii-A").val(),
                "案型1-通路名稱": AecStr.toString(),
                ////案型2
                "案型2-活動文案": BcopywrightStr.toString(),
                //
                "案型2-商品總數": $("#P-count-B").val(),
                "案型2-商品清單": $("#P-B").val(),
                //
                "案型2-尺寸總數": $("#S-count2-B").val(),
                "案型2-momo尺寸": $("#momo-B").val(),
                "案型2-pchome尺寸": $("#pchome-B").val(),
                "案型2-friday尺寸": $("#friday-B").val(),
                "案型2-book尺寸": $("#book-B").val(),
                "案型2-shopee尺寸": $("#shopee-B").val(),
                "案型2-yahoo尺寸": $("#yahoo-B").val(),
                "案型2-etmall尺寸": $("#etmall-B").val(),
                "案型2-buy123尺寸": $("#buy123-B").val(),
                "案型2-meimaii尺寸": $("#meimaii-B").val(),
                "案型2-通路名稱": BecStr,
                ////案型3
                "案型3-活動文案": CcopywrightStr.toString(),
                //
                "案型3-商品總數": $("#P-count-C").val(),
                "案型3-商品清單": $("#P-C").val(),
                //
                "案型3-尺寸總數": $("#S-count2-C").val(),
                "案型3-momo尺寸": $("#momo-C").val(),
                "案型3-pchome尺寸": $("#pchome-C").val(),
                "案型3-friday尺寸": $("#friday-C").val(),
                "案型3-book尺寸": $("#book-C").val(),
                "案型3-shopee尺寸": $("#shopee-C").val(),
                "案型3-yahoo尺寸": $("#yahoo-C").val(),
                "案型3-etmall尺寸": $("#etmall-C").val(),
                "案型3-buy123尺寸": $("#buy123-C").val(),
                "案型3-meimaii尺寸": $("#meimaii-C").val(),
                "案型3-通路名稱": CecStr,
                ////送出前確認訊息
                "需求方": $("#applicant").val(),
                "相關路徑": $("#path").val(),
            }
        }).then(response => {
            console.log(response.data);
        });
    })
}