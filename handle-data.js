//@Form-apply input 專屬區塊
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

//@Index output 專屬區塊
if (!window.location.href.includes('form-apply')) {
    let baseUrl = 'https://docs.google.com/spreadsheets/d';
    let ssid = '/1Jdm46l4ggZhEi44v2Y9ws6PaWHWnXnDFol9-HvETnLg';
    const query1 = `/gviz/tq?`; //google visualisation 
    const endpoint1 = `${baseUrl}${ssid}${query1}`;

    fetch(endpoint1)
        .then(res => res.text())
        .then(data => {
            let jsData = data.substr(47).slice(0, -2);
            const json = JSON.parse(jsData);
            const rows = json.table.rows;
            let listBox = document.querySelector('.m-list_section');

            //List欄位output
            let rw;
            for (rw = 1; rw < rows.length; rw++) {
                listing(rw);

                function listing() {
                    let list = document.createElement('div');
                    let divLine = document.createElement('div');
                    let title = document.createElement('div');
                    let statsBox = document.createElement('div');
                    let applicant = document.createElement('div');
                    let designer = document.createElement('div');
                    let status = document.createElement('div');
                    statsBox.appendChild(applicant);
                    statsBox.appendChild(designer);
                    statsBox.appendChild(status);
                    list.appendChild(divLine);
                    list.appendChild(title);
                    list.appendChild(statsBox);

                    list.classList.add('a-list');
                    divLine.classList.add('a-divisional', 'for_list');
                    title.classList.add('_14px-500');
                    statsBox.classList.add('stats-flex', 'in-list')
                    applicant.classList.add('_14px-500', 'as-stats');
                    designer.classList.add('_14px-500', 'as-stats');
                    status.classList.add('stats-chip')
                    listBox.insertBefore(list, null);


                    title.textContent = '00/00~00/00 品牌類型BN';
                    applicant.textContent = '需求方';
                    designer.textContent = '設計方';
                    status.textContent = '製作中';

                    const cells = rows[rw].c;

                    title.textContent = cells[0].v + cells[1].v + cells[2].v + 'BN';
                    if (cells[3] != null) {
                        title.textContent += ' (' + cells[3].v + ')';
                    }
                    applicant.textContent = cells[cells.length - 7].v.slice(0, 3);
                    if (cells[cells.length - 5] != null) {
                        designer.textContent = cells[cells.length - 5].v.slice(0, 3);
                        status.textContent = '製作中';
                    } else {
                        designer.textContent = '未指派';
                        designer.style.color = '#808080';
                        status.textContent = '未發單';
                        status.style.background = '#f5f5f5';
                        status.style.color = '#808080';
                    }
                }
            }
            //end of List欄位output

            // Result欄位output
            document.addEventListener('click', (e) => {
                    let target = e.target;
                    let output = document.querySelector('.container.output');

                    if (target.classList.contains('back-home')) {
                        output.classList.remove('js-show');
                    }

                    if (target.classList.contains('a-list') || target.parentElement.classList.contains('a-list')) {
                        output.classList.add('js-show');
                        let lists = document.querySelectorAll('.a-list');
                        outputData();

                        function outputData() {
                            let li;
                            for (li = 0; li < lists.length; li++) {
                                if (target == lists[li]) {
                                    let tCells = rows[li + 1].c;
                                    let i;
                                    for (i = 0; i < tCells.length; i++) {
                                        if (tCells[i] != null) {
                                            //基本資訊output
                                            if (rows[0].c[i].v == '需求方') {
                                                $("[data-output='applicant']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '相關路徑') {
                                                $("[data-output='path']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '設計方') {
                                                $("[data-output='designer']").val(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '初稿交件日期') {
                                                $("[data-output='ddl-1']").val(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '完成日期') {
                                                $("[data-output='ddl-2']").val(tCells[i].v);
                                            }
                                            //主視覺output
                                            if (rows[0].c[i].v == '指定色調') {
                                                $("[data-output='color-tone']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '指定氛圍') {
                                                $("[data-output='theme']").text(tCells[i].v);
                                            }
                                            //案型1 output
                                            if (rows[0].c[i].v == '案型1-活動文案') {
                                                $("[data-output='C-A']").html(tCells[i].v.replaceAll(',', '<br>'));
                                            }
                                            if (rows[0].c[i].v == '案型1-商品總數') {
                                                $("[data-output='P-count-A']").text(tCells[i].v.slice(2, 3) + '商品');
                                            }
                                            if (rows[0].c[i].v == '案型1-商品清單') {
                                                $("[data-output='P-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-尺寸總數') {
                                                $("[data-output='S-count2-A']").text(tCells[i].v.slice(2, 3) + '通路');
                                            }
                                            if (rows[0].c[i].v == '案型1-momo尺寸') {
                                                $("[data-output='momo-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-pchome尺寸') {
                                                $("[data-output='pchome-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-friday尺寸') {
                                                $("[data-output='friday-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-book尺寸') {
                                                $("[data-output='book-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-shopee尺寸') {
                                                $("[data-output='shopee-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-yahoo尺寸') {
                                                $("[data-output='yahoo-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-etmall尺寸') {
                                                $("[data-output='etmall-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-buy123尺寸') {
                                                $("[data-output='buy123-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-meimaii尺寸') {
                                                $("[data-output='meimaii-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-自定義1尺寸') {
                                                $("[data-output='custom1-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-自定義2尺寸') {
                                                $("[data-output='custom2-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-自定義3尺寸') {
                                                $("[data-output='custom3-A']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型1-通路名稱') {
                                                let ecNames = tCells[i].v.split(','); //values truned into an array
                                                let ec;
                                                for (ec = 0; ec < ecNames.length; ec++) {
                                                    let labels = $('.div-266h.side-184w').eq(0).find(".a-button.as-tab .label");
                                                    labels[ec].textContent = ecNames[ec];
                                                }
                                            }
                                            //案型2 output
                                            if (rows[0].c[i].v == '案型2-活動文案') {
                                                $("[data-output='C-B']").html(tCells[i].v.replaceAll(',', '<br>'));
                                            }
                                            if (rows[0].c[i].v == '案型2-商品總數') {
                                                $("[data-output='P-count-B']").text(tCells[i].v.slice(2, 3) + '商品');
                                            }
                                            if (rows[0].c[i].v == '案型2-商品清單') {
                                                $("[data-output='P-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-尺寸總數') {
                                                $("[data-output='S-count2-B']").text(tCells[i].v.slice(2, 3) + '通路');
                                            }
                                            if (rows[0].c[i].v == '案型2-momo尺寸') {
                                                $("[data-output='momo-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-pchome尺寸') {
                                                $("[data-output='pchome-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-friday尺寸') {
                                                $("[data-output='friday-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-book尺寸') {
                                                $("[data-output='book-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-shopee尺寸') {
                                                $("[data-output='shopee-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-yahoo尺寸') {
                                                $("[data-output='yahoo-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-etmall尺寸') {
                                                $("[data-output='etmall-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-buy123尺寸') {
                                                $("[data-output='buy123-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-meimaii尺寸') {
                                                $("[data-output='meimaii-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-自定義1尺寸') {
                                                $("[data-output='custom1-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-自定義2尺寸') {
                                                $("[data-output='custom2-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-自定義3尺寸') {
                                                $("[data-output='custom3-B']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型2-通路名稱') {
                                                let ecNames = tCells[i].v.split(','); //values truned into an array
                                                let ec;
                                                for (ec = 0; ec < ecNames.length; ec++) {
                                                    let labels = $('.div-266h.side-184w').eq(1).find(".a-button.as-tab .label");
                                                    labels[ec].textContent = ecNames[ec];
                                                }
                                            }
                                            //案型3 output
                                            if (rows[0].c[i].v == '案型3-活動文案') {
                                                $("[data-output='C-C']").html(tCells[i].v.replaceAll(',', '<br>'));
                                            }
                                            if (rows[0].c[i].v == '案型3-商品總數') {
                                                $("[data-output='P-count-C']").text(tCells[i].v.slice(2, 3) + '商品');
                                            }
                                            if (rows[0].c[i].v == '案型3-商品清單') {
                                                $("[data-output='P-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-尺寸總數') {
                                                $("[data-output='S-count2-C']").text(tCells[i].v.slice(2, 3) + '通路');
                                            }
                                            if (rows[0].c[i].v == '案型3-momo尺寸') {
                                                $("[data-output='momo-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-pchome尺寸') {
                                                $("[data-output='pchome-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-friday尺寸') {
                                                $("[data-output='friday-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-book尺寸') {
                                                $("[data-output='book-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-shopee尺寸') {
                                                $("[data-output='shopee-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-yahoo尺寸') {
                                                $("[data-output='yahoo-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-etmall尺寸') {
                                                $("[data-output='etmall-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-buy123尺寸') {
                                                $("[data-output='buy123-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-meimaii尺寸') {
                                                $("[data-output='meimaii-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-自定義1尺寸') {
                                                $("[data-output='custom1-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-自定義2尺寸') {
                                                $("[data-output='custom2-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-自定義3尺寸') {
                                                $("[data-output='custom3-C']").text(tCells[i].v);
                                            }
                                            if (rows[0].c[i].v == '案型3-通路名稱') {
                                                let ecNames = tCells[i].v.split(','); //values truned into an array
                                                let ec;
                                                for (ec = 0; ec < ecNames.length; ec++) {
                                                    let labels = $('.div-266h.side-184w').eq(2).find(".a-button.as-tab .label");
                                                    labels[ec].textContent = ecNames[ec];
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        //隱藏空白的案型card
                        let sCards = $("[data-output='C-B'], [data-output='C-C']");
                        for (const sCard of sCards) {
                            if (sCard.textContent == "") {
                                sCard.parentElement.parentElement.parentElement.style.display = "none";
                            }
                        }

                        //隱藏空白的tab
                        let tabLabels = $(".a-button.as-tab .label");
                        for (const tabLabel of tabLabels) {
                            if (tabLabel.textContent == '') {
                                tabLabel.parentElement.style.display = 'none';
                            }
                        }
                    }
                }) //end of Result欄位output
        })
}