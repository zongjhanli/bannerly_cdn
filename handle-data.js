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
            let json = JSON.parse(jsData);
            let rows = json.table.rows;
            let listBox = document.querySelector('.list-box');

            //List欄位-output
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

                    title.textContent = cells[0].v + '\u00a0\u00a0' + cells[1].v + cells[2].v + 'BN';
                    if (cells[3] != null) {
                        title.textContent += ' (' + cells[3].v + ')';
                    }
                    applicant.textContent = cells[cells.length - 7].v.slice(0, 3).trim();
                    if (cells[cells.length - 5] != null) {
                        designer.textContent = cells[cells.length - 5].v.slice(0, 3).trim();
                        status.textContent = '製作中';
                    } else {
                        designer.textContent = '未指派';
                        designer.style.color = '#808080';
                        status.textContent = '未發單';
                        status.style.background = '#f5f5f5';
                        status.style.color = '#808080';
                    }
                    list.dataset.year = cells[4].v;
                }
            }

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
                $('.a-list').each(function() {
                    $(this).css('display', 'flex');
                    if ($(this).children('._14px-500').text().toLowerCase().indexOf(keyedTxt.toLowerCase()) < 0) {
                        $(this).css('display', 'none');
                    }
                })
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


            // Result欄位output
            document.addEventListener('click', (e) => {
                    let target = e.target;
                    let output = document.querySelector('.container.output');

                    if (target.classList.contains('a-list') || target.parentElement.classList.contains('a-list')) {

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
                                    let tCells = rows[li + 1].c;
                                    let i;
                                    for (i = 0; i < cols.length; i++) {
                                        if (tCells[i] != null) {
                                            //標題output
                                            $('[data-output=case-name]').text(tCells[0].v + '\u00a0\u00a0' + tCells[1].v + tCells[2].v + 'BN');
                                            if (tCells[3] != null) {
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