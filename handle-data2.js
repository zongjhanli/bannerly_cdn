//@Form-apply @Custom-apply 共用區塊 （專屬@Form-apply段落另外註記）
if (window.location.href.includes('form-apply') || window.location.href.includes('custom-apply')) {

    //Fetch 下拉選單常用選項
    const gsUrl = 'https://docs.google.com/spreadsheets/d';
    const query = `/gviz/tq?`; //google visualisation 
    let ssidDrop = '/1BFUMvMbYGRe8zQaiCBfQMrL6KoFBqi29Kh9_YcZphY0';
    const endpointDrop = `${gsUrl}${ssidDrop}${query}`;
    fetch(endpointDrop)
        .then(res => res.text())
        .then(data => {
            let jsData = data.substr(47).slice(0, -2);
            let json = JSON.parse(jsData);
            let rows = json.table.rows;
            let cols = json.table.cols;

            let i;
            let applicant = 0; //需求方
            let brand = 0; //品牌列表
            let ecName = 0; //通路列表
            let ecData = 0; //通路列表-data
            for (i = 0; i < cols.length; i++) {
                if (rows[0].c[i].v == '需求方') {
                    applicant += i;
                }
                if (rows[0].c[i].v == '品牌列表') {
                    brand += i;
                }
                if (rows[0].c[i].v == '通路列表') {
                    ecName += i;
                }
                if (rows[0].c[i].v == '通路列表-data') {
                    ecData += i;
                }
            }
            let r;
            for (r = 1; r < rows.length; r++) {
                if (rows[r].c[brand] != null) {
                    let brandOption;
                    if (!rows[r].c[brand].v.includes('*')) {
                        brandOption = '<div class="a-button as-list"><div class="label full-touch">' + rows[r].c[brand].v + '</div><div class="custom-check tick-right"></div></div>';
                    } else if (rows[r].c[brand].v.includes('*')) {
                        rows[r].c[brand].v = rows[r].c[brand].v.replace('*', '');
                        brandOption = '<div class="a-button as-list drop-div"><div class="label drop-div">' + rows[r].c[brand].v + '</div></div>';
                    }
                    $('#brand').parent().find('.drop-group').append(brandOption);
                }
                if (rows[r].c[applicant] != null) {
                    let option = '<div class="a-button as-list"><div class="label full-touch">' + rows[r].c[applicant].v + '</div><div class="custom-check tick-right"></div></div>'
                    $('#applicant').parent().find('.drop-group').append(option);
                }
                //@Form-apply 專屬段落
                if (window.location.href.includes('form-apply')) {
                    if (rows[r].c[ecName] != null && rows[r].c[ecData] != null) {
                        //左側tabBox裡面新增選項
                        let tab = '<div class="a-button as-tab js-hide"><div data-tab="' + rows[r].c[ecData].v + '" class="label full-touch js-exclude">' + rows[r].c[ecName].v + '</div><div class="_12px-500 as-counts in-tab">0</div></div>'
                        $('[data-box=tab]').append(tab);

                        //左側dropGroup裡面新增選項
                        let ecOption = '<div class="a-button as-list"><div data-ec="' + rows[r].c[ecData].v + '" class="label full-touch">' + rows[r].c[ecName].v + '</div><div class="custom-check tick-right"></div></div>'
                        $('[data-group=ecTabs]').parent().find('.drop-group').append(ecOption);

                        //新增右側dropGroup
                        let sizeGroup = '<div data-group="' + rows[r].c[ecData].v + '" class="drop-group js-hide"></div>'
                        $('[data-dropfor=size]').parent().find('.drop-card').append(sizeGroup);

                        ////新增textarea，需注意「案型編號」
                        let serial = ['A', 'B', 'C'];
                        let s;
                        for (s = 0; s < serial.length; s++) {
                            let txtarea = '<textarea name="' + rows[r].c[ecData].v + '-' + serial[s] + '" maxlength="5000" data-name="' + rows[r].c[ecData].v + '-' + serial[s] + '" id="' + rows[r].c[ecData].v + '-' + serial[s] + '" placeholder="" class="input as-textarea bulk-select unclickable js-hide w-input"></textarea>'
                            $('[data-box=textarea]').eq(s).append(txtarea);
                        }
                    }
                }
            }
            //@Form-apply 專屬段落
            if (window.location.href.includes('form-apply')) {
                //右側dropGroup裡面「依照通路」新增尺寸選項
                for (r = 1; r < rows.length; r++) {
                    let newSizeGroup = $('.col-right').find('.drop-group');
                    let i;
                    for (i = 0; i < cols.length; i++) {
                        $(newSizeGroup).each((nsg) => {
                            if ($(newSizeGroup).eq(nsg).attr('data-group') == rows[0].c[i].v) {
                                if (rows[r].c[i] != null) {
                                    let sizeOption = '<div class="a-button as-list"><div class="label full-touch">' + rows[r].c[i].v + '</div><div class="custom-check tick-right"></div></div>'
                                    $(newSizeGroup).eq(nsg).append(sizeOption);
                                }
                            }
                        })
                    }
                    let newSizeOption = $('.col-right').find('.label.full-touch');
                    $(newSizeOption).each((nso) => {
                        if ($(newSizeOption).eq(nso).text() == 'null') {
                            $(newSizeOption).eq(nso).parent().remove();
                        }
                    })
                }
            }
        })
}

//@Custom-apply input 專屬區塊
if (window.location.href.includes('custom-apply')) {
    let submit = document.querySelector('input[type=submit]');
    submit.addEventListener('click', () => {

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
                "timestamp": $('.submit-box').attr('data-stamp'),
                ////基本資訊
                "曝光日期": $('#date-exposure_range').val(),
                "主打品牌": $('#brand').val(),
                "活動類型": $("[name=case-format]").siblings(".w--redirected-checked").siblings("[name=case-format]").val(),
                "急迫度": $("[name=urgency]").siblings(".w--redirected-checked").siblings(".label").text().slice(3, 4),
                "曝光年份": $('[data-year]').attr('data-year'),
                ////送出前確認訊息
                "需求方": $("#applicant").val(),
                "相關路徑": $("#path").val(),
            }
        }).then(response => {
            console.log(response.data);
        });
    })
}

//@Form-apply input 專屬區塊
if (window.location.href.includes('form-apply')) {

    //ajax 讀取本機資料夾圖片名稱
    const folder = "常用商品/";

    let url2 = "";
    let imgNameArr = []
    $.ajax({
        url: folder,
        success: function(data) {
            $(data).find("a").attr("href", function(i, val) {
                url2 = folder + val.replace('/%E5%B8%B8%E7%94%A8%E5%95%86%E5%93%81/', '') + '/'
                $.ajax({
                    url: url2,
                    success: function(data) {
                        $(data).find("a").attr("href", function(i, imgName) {
                            if (imgName.match(/\.(jpe?g|png|gif)$/)) {
                                imgName = imgName.replace('/%E5%B8%B8%E7%94%A8%E5%95%86%E5%93%81/', '');
                                let slashIndex = imgName.indexOf('/');
                                imgName = imgName.slice(slashIndex + 1, imgName.length);
                                imgNameArr.push(imgName);
                                // $("body").append("<img src='" + url2 + val + "'>");
                            }
                        });
                    }
                });
            });
        }
    });
    setTimeout(function() {
        $('#Product').find('.drop-group').each((d) => {
            let i;
            for (i = 0; i < $(imgNameArr).length; i++) {
                let option = '<div class="a-button as-list"><div class="label full-touch">' + imgNameArr[i] + '</div><div class="custom-check tick-right"></div></div>'
                $('#Product').find('.drop-group').eq(d).append(option);
                // console.log(imgNameArr[i]);
            }
        })
    }, 1000);

    //sheetDB API 上傳資料
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
                "timestamp": $('.submit-box').attr('data-stamp'),
                ////基本資訊
                "曝光日期": $('#date-exposure_range').val(),
                "主打品牌": $('#brand').val(),
                "活動類型": $("[name=case-format]").siblings(".w--redirected-checked").siblings("[name=case-format]").val(),
                "急迫度": $("[name=urgency]").siblings(".w--redirected-checked").siblings(".label").text().slice(3, 4),
                "曝光年份": $('[data-year]').attr('data-year'),
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
                "案型1-自定義1尺寸": $("#custom1-A").val(),
                "案型1-自定義2尺寸": $("#custom2-A").val(),
                "案型1-自定義3尺寸": $("#custom3-A").val(),
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
                "案型2-自定義1尺寸": $("#custom1-A").val(),
                "案型2-自定義2尺寸": $("#custom2-A").val(),
                "案型2-自定義3尺寸": $("#custom3-A").val(),
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
                "案型3-自定義1尺寸": $("#custom1-A").val(),
                "案型3-自定義2尺寸": $("#custom2-A").val(),
                "案型3-自定義3尺寸": $("#custom3-A").val(),
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
if (!window.location.href.includes('form-apply') && !window.location.href.includes('custom-apply')) {

    const gsUrl = 'https://docs.google.com/spreadsheets/d';
    const query = `/gviz/tq?`; //google visualisation 

    //Fetch授權憑證
    $(document).ready(() => {
        $('.initial-bg').removeClass('js-hide');
    })
    let ssidCode = '/1AYelUO9rGPO3OSuxlWHLB5S2Z7NDg6D4j83gsvx6vS4';
    const endpointCode = `${gsUrl}${ssidCode}${query}`;
    fetch(endpointCode)
        .then(res => res.text())
        .then(data => {
            let jsData = data.substr(47).slice(0, -2);
            let json = JSON.parse(jsData);
            let rows = json.table.rows;
            let cols = json.table.cols;
            $('#validation').change((e) => {
                let target = e.target;
                let i;
                let iArr = [];
                for (i = 1; i < rows.length; i++) {
                    if (rows[i].c[2].v.indexOf($(target).val()) >= 0) {
                        $('.initial-bg').addClass('js-hide');
                        iArr.push(i);
                    }
                }
                if (rows[iArr[0]].c[0].v == 'applicant') {
                    $('.send').parent().remove();
                    console.log('applicant');
                } else if (rows[iArr[0]].c[0].v == 'MASTER') {
                    $('.end-case').parent().remove();
                    console.log('MASTER');
                }
            })
        })

    //Fetch下拉選單常用選項
    let ssidDrop = '/1BFUMvMbYGRe8zQaiCBfQMrL6KoFBqi29Kh9_YcZphY0';
    const endpointDrop = `${gsUrl}${ssidDrop}${query}`;
    fetch(endpointDrop)
        .then(res => res.text())
        .then(data => {
            let jsData = data.substr(47).slice(0, -2);
            let json = JSON.parse(jsData);
            let rows = json.table.rows;
            let cols = json.table.cols;

            let i;
            let designer = 0;
            for (i = 0; i < cols.length; i++) {
                if (rows[0].c[i].v == '設計方') {
                    designer += i;
                }
            }
            let r;
            for (r = 1; r < rows.length; r++) {
                if (rows[r].c[designer] != null) {
                    let option = '<div class="a-button as-list"><div class="label full-touch">' + rows[r].c[designer].v + '</div><div class="custom-check tick-right"></div></div>'
                    $('#designer').closest('.dropdown-box').find('.drop-group').append(option);
                }
            }
        })

    //Fetch案件資料
    let ssidList = '/1Jdm46l4ggZhEi44v2Y9ws6PaWHWnXnDFol9-HvETnLg';
    const endpointList = `${gsUrl}${ssidList}${query}`;
    fetch(endpointList)
        .then(res => res.text())
        .then(data => {
            let jsData = data.substr(47).slice(0, -2);
            let json = JSON.parse(jsData);
            let rows = json.table.rows;
            let listBox = document.querySelector('.list-box');

            //List欄位-output
            let rw;
            for (rw = 0; rw < rows.length; rw++) {
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
                    divLine.classList.add('a-divisional', 'for_list', 'unclickable');
                    title.classList.add('_14px-500', 'unclickable');
                    statsBox.classList.add('stats-flex', 'in-list', 'unclickable')
                    applicant.classList.add('_14px-500', 'as-stats');
                    designer.classList.add('_14px-500', 'as-stats');
                    status.classList.add('stats-chip')
                    listBox.insertBefore(list, null);


                    // title.textContent = '00/00~00/00 品牌類型BN';
                    // applicant.textContent = '需求方';
                    // designer.textContent = '設計方';
                    // status.textContent = '製作中';

                    let cells = rows[rw].c;

                    title.textContent = cells[0].v + '\u00a0\u00a0' + cells[1].v + cells[2].v;
                    if (cells[3] != null) {
                        title.textContent += ' (' + cells[3].v + ')';
                    }
                    applicant.textContent = cells[cells.length - 7].v.slice(0, 3).trim();
                    if (cells[cells.length - 5] != null) {
                        designer.textContent = cells[cells.length - 5].v.slice(0, 3).trim();
                        if (cells[cells.length - 2] != null) {
                            status.textContent = '已結案';
                            status.classList.add('js-endcase');
                        } else {
                            status.textContent = '製作中';
                        }
                    } else {
                        designer.textContent = '未指派';
                        designer.style.color = '#808080';
                        status.textContent = '未發單';
                        status.classList.add('js-tbc');
                    }
                    list.dataset.year = cells[4].v;
                }
            }

            //List 標註月份（H3）
            $(document).ready(function() {
                let l;
                for (l = 0; l < $('.a-list').length; l++) {
                    let base = $('.a-list').eq(l).children('._14px-500').text().slice(0, 2);
                    let plus = $('.a-list').eq(l + 1).children('._14px-500').text().slice(0, 2);
                    let minus = $('.a-list').eq(l - 1).children('._14px-500').text().slice(0, 2);

                    if (base - minus == 1 || plus - base == 1) {
                        let month = $('.a-list').eq(l).children('._14px-500').text().slice(0, 2) + '月';
                        let mHeader = '<h3 class="h3 month-indicator" data-m="' + month + '">' + month + '</h3>';
                        $(mHeader).attr('data-m', month);
                        $('.a-list').eq(l).before($(mHeader));
                        $('.a-list').eq(l).attr('data-m', month);
                    }
                }
                let firstMonth = $('.a-list').eq(0).children('._14px-500').text().slice(0, 2) + '月';
                let firstHeader = '<h3 class="h3 month-indicator" data-m="' + firstMonth + '">' + firstMonth + '</h3>';
                let lastMonth = $('.a-list').eq($('.a-list').length - 1).children('._14px-500').text().slice(0, 2) + '月';
                let lastHeader = '<h3 class="h3 month-indicator" data-m="' + lastMonth + '">' + lastMonth + '</h3>';
                $('.a-list').first().before(firstHeader);
                $('.a-list').first().attr('data-m', firstMonth);
                $('.a-list').last().before(lastHeader);
                $('.a-list').last().attr('data-m', lastMonth);

                //挖除月份標籤的"0"字樣
                $('.month-indicator').each((i) => {
                    if ($('.month-indicator').eq(i).text().slice(0, 1) == '0') {
                        $('.month-indicator').eq(i).text($('.month-indicator').eq(i).text().replace('0', ''));
                    }
                })

            })

            //List欄位-QUERY
            //quarter query 選項建置
            $(document).ready(function() {
                //首先判斷list中有「哪幾種」年份
                let yearArr = [];
                let labelArr = [];
                let l;
                for (l = $('.a-list').length - 1; l >= 0; l--) { //!!!影響順序
                    yearArr.push($('.a-list').eq(l).attr('data-year'));
                }
                yearArr = jQuery.unique(yearArr);
                //利用yearArr！！！以年為單位！！！分別sort(曝光月份)，因填單時月份不一定照升/降冪排序
                let y;
                for (y = 0; y < yearArr.length; y++) {
                    let monthArr = [];
                    for (l = $('.a-list').length - 1; l >= 0; l--) { //!!!影響順序
                        if ($('.a-list').eq(l).attr('data-year') == yearArr[y]) {
                            monthArr.push($('.a-list').eq(l).children('._14px-500').text().slice(0, 2));
                            monthArr.key = yearArr[y];
                        }
                    }
                    monthArr = monthArr.sort();
                    monthArr.reverse();
                    let q;
                    let m;
                    for (q = 4; q > 0; q--) { //利用4的倍數區間找出需要的Quarter值
                        for (m = monthArr.length - 1; m >= 0; m--) { //!!!影響順序
                            if ((q - 1) * 3 < monthArr[m] && q * 3 >= monthArr[m]) {
                                let labelText = 'Q' + q + '/' + monthArr.key.slice(2, 4); //利用「Quarter值」搭配「year」製造選項文字
                                labelArr.push(labelText);
                            }
                        }
                    }
                    labelArr = jQuery.unique(labelArr);
                }
                let label;
                for (label = 0; label < labelArr.length; label++) {
                    let newQ = '<div class="a-button as-list"><div class="label full-touch"></div><div class="custom-check tick-right"></div></div>';
                    $('[data-query=quarter]').find('.drop-group').append(newQ);
                    $('[data-query=quarter]').find('.label').eq(label).text(labelArr[label]);
                }

                //頁面load預設第一選項被選中
                let first = $('[data-query=quarter]').find('.drop-group').find('.label').first();
                $('[data-query=quarter]').children('.unclickable').not('.dropdown-arrow').text(first.text());
                first.siblings('.custom-check').addClass('js-selected');

                //添加「全案件」選項
                let newQ = '<div class="a-button as-list"><div class="label full-touch"></div><div class="custom-check tick-right"></div></div>';
                $('[data-query=quarter]').find('.drop-group').append(newQ);
                $('[data-query=quarter]').find('.label').last().text('全案件');
            })

            //search input 響應
            $('.search-input').change(function() {
                searchQuery();
                quarterQuery();
                statsQuery();
                // sortQuery();
            })

            $('.search-input').keyup(function(e) {
                $(this).parent().parent().find('.icon_32x.for-search-query').addClass('js-return');
                if (e.which == 13) {
                    $(this).parent().parent().find('.icon_32x.for-search-query').removeClass('js-return').addClass('js-clear-search');
                }
                if ($(this).val() == "") {
                    $(this).parent().parent().find('.icon_32x.for-search-query').removeClass('js-return').removeClass('js-clear-search');
                    $('.list').css('display', 'flex');
                    searchQuery();
                    quarterQuery();
                    statsQuery();
                }
            })

            $('.icon_32x.for-search-query').click(function(e) {
                    if ($(this).hasClass('js-clear-search')) {
                        $(this).parent().find('.search-input').val('');
                        $(this).removeClass('js-clear-search');
                    } else if ($(this).hasClass('js-return')) {
                        searchQuery();
                        quarterQuery();
                        statsQuery();
                        $(this).removeClass('js-return').addClass('js-clear-search');
                    }
                }) //end of search input 響應

            //filter 響應區塊
            $(document).click(function(e) {
                let target = $(e.target);

                // dropdown之間僅保留一個顯現，其餘收合
                if (target.hasClass('dropdown-box')) {
                    collapseAll();
                    target.find('.drop-card').toggleClass('js-collapsed');
                    target.find('.dropdown-arrow').toggleClass('js-rotated');
                    // sortQuery(); //!-- 這邊不叫喚的話會暫時跑掉，疑惑待解
                } else {
                    collapseAll();
                }

                function collapseAll() {
                    $('.dropdown-box.for-query').not(target).find('.drop-card').addClass('js-collapsed');
                    $('.dropdown-box.for-query').not(target).find('.dropdown-arrow').removeClass('js-rotated');
                }

                // drop option 轉換文字
                if (target.hasClass('label', 'full-touch') && target.parentsUntil('.query-box') != null) {
                    target.parentsUntil('.drop-group').siblings().find('.custom-check').removeClass('js-selected');
                    let tDropdownBox = target.parent().parent().parent().parent();

                    if (tDropdownBox.attr('data-query') == 'sort') { //sort、quarter不可同項目取消點選
                        target.siblings('.custom-check').addClass('js-selected');
                        target.addClass('unclickable');
                        target.parent().siblings().find('.label').removeClass('unclickable');
                    } else if (tDropdownBox.attr('data-query') == 'quarter') {
                        target.siblings('.custom-check').addClass('js-selected');
                    } else {
                        target.siblings('.custom-check').toggleClass('js-selected');
                    }

                    //clear all filters
                    let tFilterKey = tDropdownBox.children('.unclickable').not('.dropdown-arrow');
                    if (tDropdownBox.find('.js-selected').length != 0) {
                        tFilterKey.text(target.text());
                        tDropdownBox.not('[data-query=quarter]').addClass('js-filtering'); //quarter query 顏色維持charcoal，其他為prm B
                        tDropdownBox.not('[data-query=quarter]').find('.dropdown-arrow').addClass('js-filtering');
                    } else if (tDropdownBox.find('.js-selected').length == 0) {
                        tDropdownBox.not('[data-query=quarter]').removeClass('js-filtering'); //quarter query 顏色維持charcoal，其他為prm B
                        tDropdownBox.not('[data-query=quarter]').find('.dropdown-arrow').removeClass('js-filtering');
                        if (tDropdownBox.attr('data-query') == 'applicant') {
                            tFilterKey.text('需求方');
                        } else if (tDropdownBox.attr('data-query') == 'designer') {
                            tFilterKey.text('設計方');
                        } else if (tDropdownBox.attr('data-query') == 'status') {
                            tFilterKey.text('狀態');
                        }
                    }
                }

                //filter 模式開關
                if (target.hasClass('filter')) {
                    target.toggleClass('js-filtering');
                    target.parent().find('.dropdown-box').toggleClass('unclickable');
                    target.parent().find('.dropdown-arrow').toggleClass('js-hide');
                    target.parent().find('[data-query=sort]').toggleClass('js-hide');
                    //defaulting query conditions
                    let tDropdownBox = target.parent().find('.dropdown-box').not('[data-query=sort]');

                    tDropdownBox.find('.custom-check').removeClass('js-selected');
                    tDropdownBox.removeClass('js-filtering'); //quarter query 顏色維持charcoal，其他為prm B
                    tDropdownBox.find('.dropdown-arrow').removeClass('js-filtering');

                    tDropdownBox.each(function() {
                        let tFilterKey = $(this).children('.unclickable').not('.dropdown-arrow');
                        if ($(this).attr('data-query') == 'applicant') {
                            tFilterKey.text('需求方');
                        } else if ($(this).attr('data-query') == 'designer') {
                            tFilterKey.text('設計方');
                        } else if ($(this).attr('data-query') == 'status') {
                            tFilterKey.text('狀態');
                        }
                    })

                    //另行處理 dropdown-box sort query
                    let sortDropBox = target.parent().find('.dropdown-box[data-query=sort]');
                    let sortKey = sortDropBox.children('.unclickable').not('.dropdown-arrow');
                    sortDropBox.find('.custom-check').removeClass('js-selected');
                    sortDropBox.find('.custom-check').first().addClass('js-selected');
                    sortDropBox.find('.label').removeClass('unclickable');
                    sortDropBox.find('.label').first().addClass('unclickable');
                    if (!target.hasClass('js-filtering')) {
                        if (sortKey.text() === '新件置頂') {
                            sortQuery();
                        }
                    }
                    sortKey.text(sortDropBox.find('.label').first().text()); //在sortKey更換回default前，先執行sortQuery回復初始排序
                }

                //query 區塊
                if (target.parentsUntil('.query-box') != null) {
                    $('.a-list').css('display', 'flex'); //每次執行query之前，先顯現所有list
                    searchQuery();
                    quarterQuery(); //除了click event 也用於document.ready
                    statsQuery();
                    if (target.hasClass('label')) {
                        if (target.parent().parent().parent().parent().attr('data-query') == 'sort') {
                            sortQuery();
                        }
                    }
                }


            })

            $(document).ready(function() {
                quarterQuery();
            })

            function searchQuery() {
                let keyedTxt = $('.search-input').val();
                if (keyedTxt.includes(' ')) {
                    keyedTxt = keyedTxt.replace(/ /g, ',');
                    keyedTxt = keyedTxt.split(',');
                    // let t;
                    // for (t = 0; t < keyedTxt.length; t++) {
                    $(keyedTxt).each((i) => {
                        $('.a-list').css('display', 'flex');
                        $('.a-list').each((l) => {
                            if ($('.a-list').eq(l).children('._14px-500').text().toLowerCase().indexOf(keyedTxt[i].toLowerCase()) < 0) {
                                $('.a-list').eq(l).css('display', 'none');
                            }
                        })
                    })

                    // }
                } else {
                    $('.a-list').css('display', 'flex');
                    $('.a-list').each(function() {
                        if ($(this).children('._14px-500').text().toLowerCase().indexOf(keyedTxt.toLowerCase()) < 0) {
                            $(this).css('display', 'none');
                        }
                    })
                }
                // $('.a-list').each(function() {
                //     if ($(this).children('._14px-500').text().toLowerCase().indexOf(keyedTxt.toLowerCase()) < 0) {
                //         $(this).css('display', 'none');
                //     }
                // })
            }

            function quarterQuery() {
                $('.dropdown-box').each(function() {
                    if ($(this).attr('data-query') == 'quarter') {
                        let filterKey = $(this).children('.unclickable').not('.dropdown-arrow').text();
                        let qKey = filterKey.slice(1, 2);
                        if (filterKey.indexOf('全季') < 0) {
                            $('.a-list').each(function() {
                                let month = $(this).children('._14px-500').text().slice(0, 2);
                                if (month <= (qKey - 1) * 3 || month > qKey * 3) {
                                    $(this).css('display', 'none');
                                }
                            })
                        } else {
                            $('.a-list').css('display', 'flex');
                        }
                    }
                })
            }

            function statsQuery() {
                $('.dropdown-box').each(function() {
                    let filterKey = $(this).children('.unclickable').not('.dropdown-arrow').text();

                    if ($(this).parent().hasClass('stats-flex') && $(this).find('.js-selected').length > 0) {
                        $('.a-list').each(function() {
                            let statsStr =
                                $(this).find('.stats-flex').find('._14px-500:nth-child(1)').text() +
                                $(this).find('.stats-flex').find('._14px-500:nth-child(2)').text() +
                                $(this).find('.stats-chip').text();
                            if (statsStr.indexOf(filterKey) < 0) {
                                $(this).css('display', 'none');
                            }
                        })
                    }
                })
            }

            function sortQuery() {
                $('.dropdown-box[data-query=sort]').each(function() {
                    let sortKey = $(this).children('.unclickable').not('.dropdown-arrow').text();
                    let lists = document.querySelectorAll('.a-list');
                    let listBox = document.querySelector('.list-box');
                    let l;
                    for (l = lists.length - 1; l >= 0; l--) {
                        listBox.insertBefore(lists[l], null);
                    }
                });
            }
            //end of List欄位-QUERY


            $(document).ready(function() { monthIndicator(); })
            $(document).click(function() { monthIndicator(); })


            function monthIndicator() {
                //若list隱藏，月份標籤連帶隱藏
                $('.a-list[data-m]').each((m) => {
                    if ($('.a-list[data-m]').eq(m).is(':hidden')) {
                        $('.month-indicator[data-m]').eq(m).css('display', 'none');
                    } else {
                        $('.month-indicator[data-m]').eq(m).css('display', 'block');
                    }
                })
            }

            // Result欄位output
            document.addEventListener('click', (e) => {
                    let target = e.target;
                    let output = document.querySelector('.container.output');

                    if (target.classList.contains('a-list')) {

                        //tab區塊預設styling
                        $('.col-left').find('.a-button').not('.indicator').css('color', 'rgba(47, 90, 58, 0.5)');
                        $('.col-left').find('.a-button').not('.indicator').first().css('color', 'rgba(47, 90, 58, 1)');
                        $('.col-right').find('[data-output]').css('display', 'none');
                        $('.col-right').find('[data-output]').first().css('display', 'block');

                        output.classList.add('js-show');
                        let lists = document.querySelectorAll('.a-list');
                        outputData();

                        function outputData() {

                            let li;
                            for (li = 0; li < lists.length; li++) {
                                if (target == lists[li]) {
                                    let cols = json.table.cols;
                                    let tCells = rows[li].c;
                                    let i;
                                    for (i = 0; i < cols.length; i++) {
                                        if (tCells[i] != null) {
                                            //標題output
                                            $('[data-output=case-name]').text(tCells[0].v + '\u00a0\u00a0' + tCells[1].v + tCells[2].v);
                                            if (tCells[3] != null) { //急件
                                                $('[data-output=case-name]').text(($('[data-output=case-name]').text().concat(' (' + tCells[3].v + ')')));
                                            }
                                            //基本資訊output
                                            if (cols[i].label == '需求方') {
                                                $("[data-output='applicant']").text(tCells[i].v);
                                            }
                                            if (cols[i].label == '相關路徑') {
                                                $("[data-output='path']").text(tCells[i].v);
                                            }
                                            if (cols[i].label == '設計方') {
                                                $("[data-output='designer']").val(tCells[i].v);
                                            }
                                            if (cols[i].label == '初稿交件日期') {
                                                $("[data-output='ddl-1']").val(tCells[i].v);
                                            }
                                            if (cols[i].label == '完成日期') {
                                                $("[data-output='ddl-2']").val(tCells[i].v);
                                            }
                                            //主視覺output
                                            if (cols[i].label == '指定色調') {
                                                $("[data-output='color-tone']").text(tCells[i].v);
                                            }
                                            if (cols[i].label == '指定氛圍') {
                                                $("[data-output='theme']").text(tCells[i].v);
                                            }
                                            //案型1 output
                                            if (cols[i].label == '案型1-活動文案') {
                                                $("[data-output='C-A']").html(tCells[i].v.replaceAll(',', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-商品總數') {
                                                $("[data-output='P-count-A']").text(tCells[i].v.slice(2, 3) + '商品');
                                            }
                                            if (cols[i].label == '案型1-商品清單') {
                                                let pdSerial = tCells[i].v.replaceAll('\n', ',');
                                                pdSerial = pdSerial.split(',');
                                                jQuery.each(pdSerial, function(i, value) {
                                                    let url = "url(pd-temp/" + value + ".jpg)";
                                                    $("[data-output='P-A']").append($('<div></div>').addClass('img').css('background-image', url));
                                                })
                                            }
                                            if (cols[i].label == '案型1-尺寸總數') {
                                                $("[data-output='S-count2-A']").text(tCells[i].v.slice(2, 3) + '通路');
                                            }
                                            if (cols[i].label == '案型1-momo尺寸') {
                                                $("[data-output='momo-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-pchome尺寸') {
                                                $("[data-output='pchome-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-friday尺寸') {
                                                $("[data-output='friday-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-book尺寸') {
                                                $("[data-output='book-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-shopee尺寸') {
                                                $("[data-output='shopee-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-yahoo尺寸') {
                                                $("[data-output='yahoo-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-etmall尺寸') {
                                                $("[data-output='etmall-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-buy123尺寸') {
                                                $("[data-output='buy123-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-meimaii尺寸') {
                                                $("[data-output='meimaii-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-自定義1尺寸') {
                                                $("[data-output='custom1-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-自定義2尺寸') {
                                                $("[data-output='custom2-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-自定義3尺寸') {
                                                $("[data-output='custom3-A']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型1-通路名稱') {
                                                let ecNames = tCells[i].v.split(','); //values truned into an array
                                                let ec;
                                                for (ec = 0; ec < ecNames.length; ec++) {
                                                    let labels = $('.div-266h.side-184w').eq(0).find(".a-button.as-tab .label");
                                                    labels[ec].textContent = ecNames[ec];
                                                }
                                            }
                                            //案型2 output
                                            if (cols[i].label == '案型2-活動文案') {
                                                $("[data-output='C-B']").html(tCells[i].v.replaceAll(',', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-商品總數') {
                                                $("[data-output='P-count-B']").text(tCells[i].v.slice(2, 3) + '商品');
                                            }
                                            if (cols[i].label == '案型2-商品清單') {
                                                let pdSerial = tCells[i].v.replaceAll('\n', ',');
                                                pdSerial = pdSerial.split(',');
                                                jQuery.each(pdSerial, function(i, value) {
                                                    let url = "url(pd-temp/" + value + ".jpg)";
                                                    $("[data-output='P-B']").append($('<div></div>').addClass('img').css('background-image', url));
                                                })
                                            }
                                            if (cols[i].label == '案型2-尺寸總數') {
                                                $("[data-output='S-count2-B']").text(tCells[i].v.slice(2, 3) + '通路');
                                            }
                                            if (cols[i].label == '案型2-momo尺寸') {
                                                $("[data-output='momo-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-pchome尺寸') {
                                                $("[data-output='pchome-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-friday尺寸') {
                                                $("[data-output='friday-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-book尺寸') {
                                                $("[data-output='book-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-shopee尺寸') {
                                                $("[data-output='shopee-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-yahoo尺寸') {
                                                $("[data-output='yahoo-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-etmall尺寸') {
                                                $("[data-output='etmall-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-buy123尺寸') {
                                                $("[data-output='buy123-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-meimaii尺寸') {
                                                $("[data-output='meimaii-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-自定義1尺寸') {
                                                $("[data-output='custom1-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-自定義2尺寸') {
                                                $("[data-output='custom2-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-自定義3尺寸') {
                                                $("[data-output='custom3-B']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-通路名稱') {
                                                let ecNames = tCells[i].v.split(','); //values truned into an array
                                                let ec;
                                                for (ec = 0; ec < ecNames.length; ec++) {
                                                    let labels = $('.div-266h.side-184w').eq(1).find(".a-button.as-tab .label");
                                                    labels[ec].textContent = ecNames[ec];
                                                }
                                            }
                                            //案型3 output
                                            if (cols[i].label == '案型3-活動文案') {
                                                $("[data-output='C-C']").html(tCells[i].v.replaceAll(',', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-商品總數') {
                                                $("[data-output='P-count-C']").text(tCells[i].v.slice(2, 3) + '商品');
                                            }
                                            if (cols[i].label == '案型3-商品清單') {
                                                let pdSerial = tCells[i].v.replaceAll('\n', ',');
                                                pdSerial = pdSerial.split(',');
                                                jQuery.each(pdSerial, function(i, value) {
                                                    let url = "url(pd-temp/" + value + ".jpg)";
                                                    $("[data-output='P-C']").append($('<div></div>').addClass('img').css('background-image', url));
                                                })
                                            }
                                            if (cols[i].label == '案型3-尺寸總數') {
                                                $("[data-output='S-count2-C']").text(tCells[i].v.slice(2, 3) + '通路');
                                            }
                                            if (cols[i].label == '案型3-momo尺寸') {
                                                $("[data-output='momo-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-pchome尺寸') {
                                                $("[data-output='pchome-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-friday尺寸') {
                                                $("[data-output='friday-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-book尺寸') {
                                                $("[data-output='book-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-shopee尺寸') {
                                                $("[data-output='shopee-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-yahoo尺寸') {
                                                $("[data-output='yahoo-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-etmall尺寸') {
                                                $("[data-output='etmall-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-buy123尺寸') {
                                                $("[data-output='buy123-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-meimaii尺寸') {
                                                $("[data-output='meimaii-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-自定義1尺寸') {
                                                $("[data-output='custom1-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-自定義2尺寸') {
                                                $("[data-output='custom2-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-自定義3尺寸') {
                                                $("[data-output='custom3-C']").html(tCells[i].v.replaceAll('\n', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-通路名稱') {
                                                let ecNames = tCells[i].v.split(','); //values truned into an array
                                                let ec;
                                                for (ec = 0; ec < ecNames.length; ec++) {
                                                    let labels = $('.div-266h.side-184w').eq(2).find(".a-button.as-tab .label");
                                                    labels[ec].textContent = ecNames[ec];
                                                }
                                            }
                                            if (cols[i].label == 'timestamp') {
                                                $('[data-output=case-name]').attr('data-stamp', tCells[i].v);
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

                        //隱藏空白的pd pool
                        $('.block-pool').each(function() {
                            if ($(this).find('.img').length == 0) {
                                // $(this).parent().css('display', 'none');
                                $(this).css({
                                    'padding-left': '12px',
                                    'color': 'rgba(47, 90, 58, 0.5)'
                                });
                                $(this).text('曝光商品未選');
                            }
                        })

                        //隱藏空白的tab
                        let tabLabels = $(".a-button.as-tab .label");
                        for (const tabLabel of tabLabels) {
                            if (tabLabel.textContent == '') {
                                tabLabel.parentElement.style.display = 'none';
                            }
                        }
                        $('.send').siblings().click(() => {
                            let timestamp = $('[data-output=case-name]').attr('data-stamp');
                            let targetRow = 'https://sheetdb.io/api/v1/fx6gemwyky94h' + '/' + 'timestamp' + '/' + timestamp
                            axios.patch(targetRow, {
                                "data": {
                                    "設計方": $('#designer').val(),
                                    "初稿交件日期": $('#ddl-1').val(),
                                    "完成日期": $('#ddl-2').val()
                                }
                            }).then(response => {
                                console.log(response.data);
                            });
                        })
                    }
                }) //end of Result欄位output
        })
}