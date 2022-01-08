//@form-type-a @form-type-b 共用區塊 （專屬@form-type-a段落另外註記）
if (window.location.href.includes('form-type-a') || window.location.href.includes('form-type-b')) {

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
            // let applicant = 0; //需求方
            let brand = 0; //品牌列表
            let brandData = 0; //品牌列表-data
            let ecName = 0; //通路列表
            let ecData = 0; //通路列表-data
            let caseFormat = 0;
            let theme = 0;
            for (i = 0; i < cols.length; i++) {
                // if (rows[0].c[i].v == '需求方') {
                //     applicant += i;
                // }
                if (rows[0].c[i].v == '品牌列表') {
                    brand += i;
                }
                if (rows[0].c[i].v == '品牌列表-data') {
                    brandData += i;
                }
                if (rows[0].c[i].v == '活動類型') {
                    caseFormat += i;
                }
                if (rows[0].c[i].v == '指定氛圍') {
                    theme += i;
                }
                if (rows[0].c[i].v == '通路列表') {
                    ecName += i;
                }
                if (rows[0].c[i].v == '通路列表-data') {
                    ecData += i;
                }
            }

            let brandID = sessionStorage.getItem('brandID');
            if (brandID != 'ALL') {
                brandID += ',GI';
                brandID = brandID.split(',');
            } else if (brandID == 'ALL') {
                brandID = ['ALL'];
            }

            let r;
            for (r = 1; r < rows.length; r++) {
                if (rows[r].c[brand] != null) {
                    if (rows[r].c[brandData] != null || brandID[0] == 'ALL') {
                        let brandOption;
                        let id;
                        for (id = 0; id < brandID.length; id++) {
                            if (brandID[0] == 'ALL' || brandID[id] == rows[r].c[brandData].v) {
                                if (!rows[r].c[brand].v.includes('*')) {
                                    brandOption = '<div class="a-button as-list" data-brandData="' + rows[r].c[brandData].v + '"><div class="label full-touch">' + rows[r].c[brand].v + '</div><div class="custom-check tick-right"></div></div>';
                                }
                            }
                        }
                        if (brandID[0] == 'ALL') {
                            if (rows[r].c[brand].v.includes('*')) {
                                rows[r].c[brand].v = rows[r].c[brand].v.replace('*', '');
                                brandOption = '<div class="a-button as-list drop-div"><div class="label drop-div">' + rows[r].c[brand].v + '</div></div>';
                            }
                        }
                        $('#brand').parent().find('.drop-group').append(brandOption);
                    }
                }
                if (rows[r].c[caseFormat] != null) {
                    let formatOption = '<div class="a-button as-list"><div class="label full-touch">' + rows[r].c[caseFormat].v + '</div><div class="custom-check tick-right"></div></div>';
                    $('#case-format').parent().find('.drop-group').append(formatOption);
                }
                //@form-type-a 專屬段落
                if (window.location.href.includes('form-type-a')) {
                    if (rows[r].c[theme] != null) {
                        let themeOption = '<div class="a-button as-list"><div class="label full-touch">' + rows[r].c[theme].v + '</div><div class="custom-check tick-right"></div></div>';
                        $('#theme').parent().find('.drop-group').append(themeOption);
                    }
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
            //@form-type-a 專屬段落
            if (window.location.href.includes('form-type-a')) {
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

//@form-type-b input 專屬區塊
if (window.location.href.includes('form-type-b')) {
    let submit = document.querySelector('input[type=submit]');
    submit.addEventListener('click', () => {
        $('.icon_32x.btn-icon').removeClass('submit').addClass('js-loading');
        $('.submit-trigger').css('cursor', 'progress');
        setTimeout(() => {
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

            let nameMail = sessionStorage.getItem('nameMail');
            let space = nameMail.indexOf(' ');
            let name = nameMail.slice(0, space + 1).trim();
            let mail = nameMail.slice(space + 1, nameMail.length).trim();
            let brandID = $('#brand').parent().find('.js-selected').parent().attr('data-branddata');

            axios.post('https://sheetdb.io/api/v1/fx6gemwyky94h', {
                "data": {
                    "timestamp": $('.submit-box').attr('data-stamp'),
                    ////基本資訊
                    "曝光日期": $('#date-exposure_range').val(),
                    "主打品牌": $('#brand').val(),
                    "活動類型": $('#case-format').val(),
                    // "活動類型": $("[name=case-format]").siblings(".w--redirected-checked").siblings("[name=case-format]").val(),
                    "急迫度": $("[name=urgency]").siblings(".w--redirected-checked").siblings(".label").text().slice(3, 4),
                    "曝光年份": $('[data-year]').attr('data-year'),
                    "brandID": brandID,
                    ////送出前確認訊息
                    "需求方": name,
                    "需求方mail": mail,
                    "相關路徑": $("#path").val(),
                }
            }).then(response => {
                console.log(response.data);
                $('.icon_32x.btn-icon').remove();
                let reIco = '<div class="icon_32x btn-icon fit-right js-complete"></div>'
                $('.submit-trigger').html('申請成功' + reIco);

                // redirect to home
                let address = window.location.href;
                setTimeout(() => {
                    if (address.indexOf('html') < 0) {
                        address = address.replace('form-type-b', '');
                    } else if (address.indexOf('html') >= 0) {
                        address = address.replace('form-type-b.html', '');
                    }
                    window.location.replace(address);
                }, 1000)
            });
        }, 2000)
    })
}

//@form-type-a input 專屬區塊
if (window.location.href.includes('form-type-a')) {

    // //Github API via Personal Auth
    // setTimeout(() => {
    //     const headers = {
    //             "Authorization": 'Token' + key
    //         }
    //         // Fetch 常用商品清單 Github Repo Approach
    //     const repoRefs = 'https://api.github.com/repos/zongjhanli/bannerly_cdn/git/refs';
    //     let endpointGit = `${repoRefs}`;
    //     let IDfolderArr = [];
    //     fetch(endpointGit, {
    //             "method": "GET",
    //             "headers": headers
    //         })
    //         .then(async(response) => {
    //             const data = await response.json();
    //             // console.log()
    //             let sha = $(data)[0].object.sha;
    //             let repoLatest = 'https://api.github.com/repos/zongjhanli/bannerly_cdn/git/trees/' + sha;
    //             endpointGit = `${repoLatest}`;
    //             fetch(repoLatest, {
    //                     "method": "GET",
    //                     "headers": headers
    //                 })
    //                 .then(async(response) => {
    //                     const data = await response.json();
    //                     let repoTree = $(data)[0].tree;
    //                     let pdFolder;
    //                     $(repoTree).each((i) => {
    //                             if (repoTree[i].path == 'products') {
    //                                 pdFolder = repoTree[i].url;
    //                             }
    //                         })
    //                         // console.log(pdFolder)
    //                     fetch(pdFolder, {
    //                             "method": "GET",
    //                             "headers": headers
    //                         })
    //                         .then(async(response) => {
    //                             const data = await response.json();
    //                             let pdFolderTree = $(data)[0].tree;
    //                             // console.log($(data)[0].tree)
    //                             $(pdFolderTree).each((i) => {
    //                                 IDfolderArr.push($(pdFolderTree)[i].url);
    //                             })
    //                         });
    //                 });
    //         });

    //     setTimeout(function() {
    //         let imgNameArr = [];
    //         let ia;
    //         for (ia = 0; ia < IDfolderArr.length; ia++) {
    //             const subFolder = IDfolderArr[ia];
    //             endpointGit = `${subFolder}`;
    //             fetch(endpointGit, {
    //                     "method": "GET",
    //                     "headers": headers
    //                 })
    //                 .then(async(response) => {
    //                     const data = await response.json();
    //                     let imgTree = $(data)[0].tree;
    //                     // console.log()
    //                     $(imgTree).each((i) => {
    //                         imgNameArr.push($(imgTree)[i].path)
    //                     })
    //                 });
    //         }
    //         setTimeout(function() {
    //             $('#Product').find('.drop-group').each((d) => {
    //                 let img;
    //                 for (img = 0; img < imgNameArr.length; img++) {
    //                     imgNameArr = imgNameArr.filter(x => x != '.DS_Store'); //by MAC users
    //                     let option = '<div class="a-button as-list"><div class="label full-touch">' + imgNameArr[img] + '</div><div class="custom-check tick-right"></div></div>'
    //                     $('#Product').find('.drop-group').eq(d).append(option);
    //                 }
    //             })
    //         }, 2000)
    //     }, 3000)
    // }, 1000)

    // Fetch 常用商品清單 G - Sheet Approach


    const gsUrl = 'https://docs.google.com/spreadsheets/d';
    const query = `/gviz/tq?`; //google visualisation 
    // G-sheet 讀取圖片名稱
    let ssidPD = '/1--Bm763Gd8DNq6egYKQgHyewISd7gn3vZzDisb8NUbQ';
    const endpointPD = `${gsUrl}${ssidPD}${query}`;
    fetch(endpointPD)
        .then(res => res.text())
        .then(data => {
            let jsData = data.substr(47).slice(0, -2);
            let json = JSON.parse(jsData);
            let rows = json.table.rows;
            let cols = json.table.cols;
            let r;
            let imgArr = [];
            for (r = 1; r < rows.length; r++) {
                imgArr.push(rows[r].c[0].v);
            }
            imgArr.sort(); //sheet當中為亂序

            let brandID = sessionStorage.getItem('brandID');
            if (brandID != 'ALL') {
                brandID += ',GI';
                brandID = brandID.split(',');
            } else if (brandID == 'ALL') {
                brandID = ['ALL'];
            }
            // console.log(brandID)

            setTimeout(function() {
                $('#Product').find('.drop-group').each((d) => {
                    let id;
                    for (id = 0; id < brandID.length; id++) {
                        let i;
                        for (i = 0; i < $(imgArr).length; i++) {
                            if (imgArr[i].indexOf(brandID[id]) == 0 || brandID[0] == 'ALL') {
                                let option = '<div class="a-button as-list"><div class="label full-touch">' + imgArr[i] + '</div><div class="custom-check tick-right"></div></div>'
                                $('#Product').find('.drop-group').eq(d).append(option);
                            }
                        }
                    }
                    let NOption = '<div class="a-button as-list"><div class="label full-touch">' + '無需曝光商品' + '</div><div class="custom-check tick-right"></div></div>'
                    $('#Product').find('.drop-group').eq(d).find('.a-button.as-list').eq(0).before($(NOption));
                    // if ($('#Product').find('.drop-group').eq(d).find('.label').text().indexOf(brandID)<0) {
                    //     $('#Product').find('.drop-group').eq(d).find('.label')
                    // }
                })
            }, 1000);
        })

    //AJAX讀取本機資料夾圖片名稱 AJAX Local Server Approach
    // const folder = "products/";

    // let url2 = "";
    // let imgNameArr = []
    // $.ajax({
    //     url: folder,
    //     success: function(data) {
    //         // console.log($(data).find('li a').text())
    //         if ($(data).find("a").text().includes('AM') || $(data).find("a").text().includes('PM')) { //for VS code server
    //             $(data).find("a").attr("href", function(i, val) {
    //                 url2 = val + '/'
    //                 $.ajax({
    //                     url: url2,
    //                     success: function(data) {
    //                         $(data).find("a").attr("href", function(i, imgName) {
    //                             if (imgName.match(/\.(jpe?g|png|gif)$/)) {
    //                                 imgName = imgName.replace('/products/', '');
    //                                 let slashIndex = imgName.indexOf('/');
    //                                 imgName = imgName.slice(slashIndex + 1, imgName.length);
    //                                 imgNameArr.push(imgName);
    //                             }
    //                         });
    //                     }
    //                 });
    //             });
    //         } else if (!$(data).find("a").text().includes('AM') && !$(data).find("a").text().includes('PM')) { //for chrome web server
    //             $(data).find('li a').each((a) => {
    //                 urlLocal = folder + $(data).find('li a').eq(a).text();
    //                 $.ajax({
    //                     url: urlLocal,
    //                     success: function(data) {
    //                         $(data).find('li a').each((a) => {
    //                             let imgName = $(data).find('li a').eq(a).text();
    //                             if (imgName.match(/\.(jpe?g|png|gif)$/)) {
    //                                 let slashIndex = imgName.indexOf('/');
    //                                 imgName = imgName.slice(slashIndex + 1, imgName.length);
    //                                 imgNameArr.push(imgName);
    //                             }
    //                         });
    //                     }
    //                 });
    //             })
    //         }
    //     }
    // });
    // setTimeout(function() {
    //     $('#Product').find('.drop-group').each((d) => {
    //         let i;
    //         for (i = 0; i < $(imgNameArr).length; i++) {
    //             let option = '<div class="a-button as-list"><div class="label full-touch">' + imgNameArr[i] + '</div><div class="custom-check tick-right"></div></div>'
    //             $('#Product').find('.drop-group').eq(d).append(option);
    //             // console.log(imgNameArr[i]);
    //         }
    //     })
    // }, 1000);

    //sheetDB API 上傳資料

    let submit = document.querySelector('input[type=submit]');
    submit.addEventListener('click', () => {
        $('.icon_32x.btn-icon').removeClass('submit').addClass('js-loading');
        $('.submit-trigger').css('cursor', 'progress');
        setTimeout(() => {
            //lookup ec names
            let tabBoxes = $('[data-box=tab]');
            let Alabels = tabBoxes[0].querySelectorAll('.a-button.js-show .label');
            let Blabels = tabBoxes[1].querySelectorAll('.a-button.js-show .label');
            let Clabels = tabBoxes[2].querySelectorAll('.a-button.js-show .label');
            let AecStr = Array.from(Alabels, (x) => x.textContent);
            let BecStr = Array.from(Blabels, (x) => x.textContent);
            let CecStr = Array.from(Clabels, (x) => x.textContent);
            let AecData = Array.from(Alabels, (x) => x.dataset.tab);
            let BecData = Array.from(Blabels, (x) => x.dataset.tab);
            let CecData = Array.from(Clabels, (x) => x.dataset.tab);

            let noteA = '';
            if ($("#C-4-A").text() != '') {
                noteA = '<div class="annotate case-note">註</div>' + '<div class="case-note">' + $("#C-4-A").text() + '</div>';
            }
            let noteB = '';
            if ($("#C-4-B").text() != '') {
                noteB = '<div class="annotate case-note">註</div>' + '<div class="case-note">' + $("#C-4-B").text() + '</div>';
            }
            let noteC = '';
            if ($("#C-4-C").text() != '') {
                noteC = '<div class="annotate case-note">註</div>' + '<div class="case-note">' + $("#C-4-C").text() + '</div>';
            }

            //reconstruct copywright value
            let AcopywrightStr = [];
            AcopywrightStr.push($("#C-1-A").val(), $("#C-2-A").val(), $("#C-3-A").val(), noteA);
            AcopywrightStr = AcopywrightStr.filter((a) => a);
            let BcopywrightStr = [];
            if ($("#C-1-B").val() != "") {
                BcopywrightStr.push($("#C-1-B").val(), $("#C-2-B").val(), $("#C-3-B").val(), noteB);
                BcopywrightStr = BcopywrightStr.filter((b) => b);
            }
            let CcopywrightStr = [];
            if ($("#C-1-C").val() != "") {
                CcopywrightStr.push($("#C-1-C").val(), $("#C-2-C").val(), $("#C-3-C").val(), noteC);
                CcopywrightStr = CcopywrightStr.filter((c) => c);
            }

            //讀取各ec尺寸
            let sizeA = $('.col-right').eq(0).find('textarea');
            let sizeB = $('.col-right').eq(1).find('textarea');
            let sizeC = $('.col-right').eq(2).find('textarea');

            let nameMail = sessionStorage.getItem('nameMail');
            let space = nameMail.indexOf(' ');
            let name = nameMail.slice(0, space + 1).trim();
            let mail = nameMail.slice(space + 1, nameMail.length).trim();
            let brandID = $('#brand').parent().find('.js-selected').parent().attr('data-branddata');

            axios.post('https://sheetdb.io/api/v1/fx6gemwyky94h', {
                "data": {
                    "timestamp": $('.submit-box').attr('data-stamp'),
                    ////基本資訊
                    "曝光日期": $('#date-exposure_range').val(),
                    "主打品牌": $('#brand').val(),
                    "活動類型": $('#case-format').val(),
                    // "活動類型": $("[name=case-format]").siblings(".w--redirected-checked").siblings("[name=case-format]").val(),
                    "急迫度": $("[name=urgency]").siblings(".w--redirected-checked").siblings(".label").text().slice(3, 4),
                    "曝光年份": $('[data-year]').attr('data-year'),
                    "brandID": brandID,
                    ////主視覺
                    "指定色調": $("[name=color-tone]").siblings(".w--redirected-checked").siblings("[name=color-tone]").val(),
                    "指定氛圍": $('#theme').val(),
                    // "指定氛圍": $("[name=theme]").siblings(".w--redirected-checked").siblings("[name=theme]").val(),
                    ////案型1
                    "案型1-活動文案": AcopywrightStr.toString(),
                    //
                    "案型1-商品總數": $("#P-count-A").val(),
                    "案型1-商品清單": $("#P-A").val(),
                    //
                    "案型1-尺寸1": $(sizeA).eq(0).val(),
                    "案型1-尺寸2": $(sizeA).eq(1).val(),
                    "案型1-尺寸3": $(sizeA).eq(2).val(),
                    "案型1-尺寸4": $(sizeA).eq(3).val(),
                    "案型1-尺寸5": $(sizeA).eq(4).val(),
                    "案型1-尺寸6": $(sizeA).eq(5).val(),
                    "案型1-尺寸7": $(sizeA).eq(6).val(),
                    "案型1-尺寸8": $(sizeA).eq(7).val(),
                    "案型1-尺寸9": $(sizeA).eq(8).val(),
                    "案型1-自定義1尺寸": $("#custom1-A").val(),
                    "案型1-自定義2尺寸": $("#custom2-A").val(),
                    "案型1-自定義3尺寸": $("#custom3-A").val(),
                    "案型1-通路名稱": AecStr.toString(),
                    "案型1-通路data": AecData.toString(),
                    ////案型2
                    "案型2-活動文案": BcopywrightStr.toString(),
                    //
                    "案型2-商品總數": $("#P-count-B").val(),
                    "案型2-商品清單": $("#P-B").val(),
                    //
                    "案型2-尺寸1": $(sizeB).eq(0).val(),
                    "案型2-尺寸2": $(sizeB).eq(1).val(),
                    "案型2-尺寸3": $(sizeB).eq(2).val(),
                    "案型2-尺寸4": $(sizeB).eq(3).val(),
                    "案型2-尺寸5": $(sizeB).eq(4).val(),
                    "案型2-尺寸6": $(sizeB).eq(5).val(),
                    "案型2-尺寸7": $(sizeB).eq(6).val(),
                    "案型2-尺寸8": $(sizeB).eq(7).val(),
                    "案型2-尺寸9": $(sizeB).eq(8).val(),
                    "案型2-自定義1尺寸": $("#custom1-B").val(),
                    "案型2-自定義2尺寸": $("#custom2-B").val(),
                    "案型2-自定義3尺寸": $("#custom3-B").val(),
                    "案型2-通路名稱": BecStr.toString(),
                    "案型2-通路data": BecData.toString(),
                    ////案型3
                    "案型3-活動文案": CcopywrightStr.toString(),
                    //
                    "案型3-商品總數": $("#P-count-C").val(),
                    "案型3-商品清單": $("#P-C").val(),
                    //
                    "案型3-尺寸1": $(sizeC).eq(0).val(),
                    "案型3-尺寸2": $(sizeC).eq(1).val(),
                    "案型3-尺寸3": $(sizeC).eq(2).val(),
                    "案型3-尺寸4": $(sizeC).eq(3).val(),
                    "案型3-尺寸5": $(sizeC).eq(4).val(),
                    "案型3-尺寸6": $(sizeC).eq(5).val(),
                    "案型3-尺寸7": $(sizeC).eq(6).val(),
                    "案型3-尺寸8": $(sizeC).eq(7).val(),
                    "案型3-尺寸9": $(sizeC).eq(8).val(),
                    "案型3-自定義1尺寸": $("#custom1-C").val(),
                    "案型3-自定義2尺寸": $("#custom2-C").val(),
                    "案型3-自定義3尺寸": $("#custom3-C").val(),
                    "案型3-通路名稱": CecStr.toString(),
                    "案型3-通路data": CecData.toString(),
                    ////送出前確認訊息
                    "需求方": name,
                    "需求方mail": mail,
                    "相關路徑": $("#path").val(),
                }
            }).then(response => {
                console.log(response.data);
                $('.icon_32x.btn-icon').remove();
                let reIco = '<div class="icon_32x btn-icon js-complete"></div>'
                $('.submit-trigger').html('申請成功' + reIco);

                //redirect
                let address = window.location.href;
                setTimeout(() => {
                    if (address.indexOf('html') < 0) {
                        address = address.replace('form-type-a', '');
                    } else if (address.indexOf('html') >= 0) {
                        address = address.replace('form-type-a.html', '');
                    }
                    window.location.replace(address);
                }, 1000)
            });
        }, 2000)
    })
}

//@Index output 專屬區塊
if (!window.location.href.includes('form-type-a') &&
    !window.location.href.includes('form-type-b')) {


    //密碼顯隱
    const togglePasswords = document.querySelectorAll('#togglePassword');
    const passwords = document.querySelectorAll('.pssrd');

    for (const togglePassword of togglePasswords) {
        togglePassword.addEventListener('click', () => {
            // toggle the type attribute
            for (const password of passwords) {
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
            }

            // toggle the eye / eye slash icon
            $(togglePasswords).toggleClass('js-toggle-pssrd');
            // $('#togglePassword').each((p) => {
            //         $('#togglePassword').eq(p).toggleClass('js-toggle-pssrd');
            //     })
            // togglePassword.classList.toggle('js-toggle-pssrd');
        });
    }

    //修改基本資料hover
    // $('.identity').hover(
    //     function() {
    //         $('.identity').parent().find('.hinter-box').css('display', 'block');
    //     },
    //     function() {
    //         $('.identity').parent().find('.hinter-box').css('display', 'none');
    //     }
    // );

    //品牌代號dropdown 另行處理
    $('.dropdown-s').click(() => { sDrop(); });
    $('.portal-bg').click((e) => {
        let target = e.target;
        if (!$(target).hasClass('label') && !$(target).hasClass('dropdown-s')) {
            sCollapse();
        }
        setTimeout(() => {
            $('.dropdown-arrow-s').text('');
        }, 1)
    });
    $('.dropdown-arrow-s').click(() => {
        sCollapse();
    })

    function sDrop() {
        $('.drop-card-s').removeClass('js-collapsed');
        $('.dropdown-arrow-s').addClass('js-rotated');
        $('.dropdown-arrow-s').removeClass('unclickable');
    }

    function sCollapse() {
        $('.drop-card-s').addClass('js-collapsed');
        $('.dropdown-arrow-s').removeClass('js-rotated');
        $('.dropdown-arrow-s').addClass('unclickable');
    }

    const gsUrl = 'https://docs.google.com/spreadsheets/d';
    const query = `/gviz/tq?`; //google visualisation 

    let valKey = sessionStorage.getItem('key');
    //Fetch授權憑證
    $(document).ready(() => {
        $('[data-portal]').css('display', 'none');
        $('.back-portal').css('display', 'none');
        $('.icon_20x.for-portal').css('display', 'none');
        $('#validation').val('');
    })
    $('.sign-up').click(() => {
        $('[data-portal=sign-up]').css('display', 'block');
        $('.sign-in').parent().css('display', 'none');
        $('.sign-up').not('.icon_32x').addClass('js-btn2text');
        $('.portal').removeClass('inactive');
        $('.back-portal').css('display', 'block');
        $('.portal').css('paddingBottom', '72px');
    })
    $('.sign-in').click(() => {
        $('[data-portal=sign-in]').css('display', 'block');
        $('.sign-up').not('.icon_32x').parent().css('display', 'none');
        $('.sign-in').addClass('js-btn2text');
        $('.portal').removeClass('inactive');
        $('.back-portal').css('display', 'block');
        $('#validation').focus();
        $('.portal').css('paddingBottom', '72px');
    })
    $('.back-portal').click((e) => {
        let target = e.target;
        setTimeout(() => {
            if (!$(target).hasClass('for-config')) {
                $('.portal').addClass('inactive');
                $('[data-portal=sign-up]').css('display', 'none');
                $('[data-portal=sign-in]').css('display', 'none');
                $('.sign-up').not('.icon_32x').parent().css('display', 'block');
                $('.sign-in').parent().css('display', 'block');
                $('.sign-up').not('.icon_32x').removeClass('js-btn2text');
                $('.sign-in').removeClass('js-btn2text');
                $('.back-portal').css('display', 'none');
            }
        }, 10)
    })
    $('#dbcheck-code').change(() => {
        if ($('#dbcheck-code').val() != $('#user-code').val()) {
            let hinter = '<div class="inline-hinter">輸入錯誤</div>';
            $('#dbcheck-code').closest('.f-block').find('._12px-500').html('再次確認密碼' + hinter);
            setTimeout(function() {
                $('#dbcheck-code').closest('.f-block').find('.inline-hinter').remove();
            }, 1500);
        }
    })

    // $('#btn').click(() => {
    //     //php image upload
    //     fetch('image-upload.php', {
    //         method: "POST",
    //         body: new FormData(document.getElementById('file-upload'))
    //     })
    // })
    $('[data-update=sign-up]').click((e) => {
        let target = e.target;
        let input = $(target).closest('.portal').find('[data-portal=sign-up]').find('input[type=text], input[type=email], input[type=password]');
        input.each((i) => {
            if (($(input).eq(i).val() == "")) {
                let hinter = '<div class="inline-hinter">此欄必填</div>';
                $(input).eq(i).closest('.f-block').find('._12px-500').append(hinter);
                $(input).eq(i).closest('.f-block').addClass("js-shake");
                $(target).addClass("js-shake");
                setTimeout(function() {
                    $(input).eq(i).closest('.f-block').removeClass("js-shake");
                    $(target).removeClass("js-shake");
                }, 200);
            }
        })
        let radio = $(target).closest('.portal').find('input[type=radio]');
        // console.log($(radio).is(':checked'))
        if (!$(radio).eq(0).is(':checked') && !$(radio).eq(1).is(':checked')) {
            // $(radio).eq(0).closest('.f-block')[0].scrollIntoView()
            let hinter = '<div class="inline-hinter">此欄必填</div>';
            $(radio).eq(0).closest('.f-block').find('._12px-500').append(hinter);
            $(radio).eq(0).closest('.f-block').addClass("js-shake");
            $(target).addClass("js-shake");
            setTimeout(function() {
                $(radio).eq(0).closest('.f-block').removeClass("js-shake");
                $(target).removeClass("js-shake");
            }, 200);
        }
        //密碼須為6字符，並結合英數字（大小寫不限）
        if ($('#user-code').val() != "") {
            $('#user-code').each(function() {
                var validated = true;
                if ($(this).val().length < 6)
                    validated = false;
                if (!/\d/.test($(this).val()))
                    validated = false;
                if (!/[a-z]/.test($(this).val())) {
                    validated = false;
                }
                if (/[^0-9a-z]/.test($(this).val())) {
                    validated = false;
                }
                // $('div').text(validated ? "pass" : "fail");
                // use DOM traversal to select the correct div for this input above
                if (!validated) {
                    let hinter = '<div class="inline-hinter">請輸入6位英數字</div>';
                    $('#user-code').closest('.f-block').find('._12px-500').html('設定密碼' + hinter);
                } else if (validated = true) {
                    console.log('password OK')
                }
            });
        }

        //密碼double check
        if ($('#dbcheck-code').val() != "") {
            if ($('#dbcheck-code').val() != $('#user-code').val()) {
                let hinter = '<div class="inline-hinter">輸入錯誤</div>';
                $('#dbcheck-code').closest('.f-block').find('._12px-500').html('再次確認密碼' + hinter);
                // setTimeout(function() {
                //     $('#dbcheck-code').closest('.f-block').find('.inline-hinter').remove();
                // }, 1500);
            }
        }

        //email格式
        if ($('#user-mail').val() != "") {
            if ($('#user-mail').val().indexOf('@') < 0) {
                let hinter = '<div class="inline-hinter">格式錯誤</div>';
                $('#user-mail').closest('.f-block').find('._12px-500').html('公司郵箱' + hinter);
            }
        }

        let latestID = 0;
        //get latest id & ready to redefine lastest ID
        let ssidCode = '/1BFUMvMbYGRe8zQaiCBfQMrL6KoFBqi29Kh9_YcZphY0';
        const sheetID = `gid=251577508`;
        const endpointCode = `${gsUrl}${ssidCode}${query}${sheetID}`;
        fetch(endpointCode)
            .then(res => res.text())
            .then(data => {
                let jsData = data.substr(47).slice(0, -2);
                let json = JSON.parse(jsData);
                let rows = json.table.rows;
                let cols = json.table.cols;

                let i;
                let iArr = [];
                for (i = 1; i < rows.length; i++) {
                    if (rows[i].c[0] != null) {
                        iArr.push(rows[i].c[0].v)
                    }
                }
                latestID = Math.max(...iArr)
            })

        if ($('.inline-hinter:visible').length == 0) {
            $('.icon_32x.btn-icon').removeClass('sign-up').addClass('js-loading');
            $(target).css('cursor', 'progress');
            setTimeout(() => {

                //sheetDB POST
                axios.post('https://sheetdb.io/api/v1/mebkcye8qw7nd?sheet=members', {
                    "data": {
                        "id": latestID + 1,
                        "user-type": $('[data-name=user-type]:checked').attr('data-type'),
                        "user-name": $('#user-name').val() + ' ' + $('#user-mail').val(),
                        "code": $('#user-code').val(),
                        "brand-id": $('#brand-id').val()
                            // "image": $('#file-upload')[0].files
                    }
                }).then(response => {
                    console.log(response.data);
                    $('.icon_32x.btn-icon').remove();
                    let reIco = '<div class="icon_32x btn-icon fit-right js-complete"></div>'
                    $('.submit-trigger').html('註冊成功' + reIco);

                    //redirect
                    let address = window.location.href;
                    setTimeout(() => {
                        if (address.indexOf('html') < 0) {
                            address = address.replace('form-type-a', '');
                        } else if (address.indexOf('html') >= 0) {
                            address = address.replace('form-type-a.html', '');
                        }
                        window.location.replace(address);
                    }, 1000)
                });
            }, 2000)
        } else {
            //find the first one of unfilled inputs
            let firstIndex = 0;
            let sfBlock = $('[data-portal="sign-up"]').find('.f-block');
            let sf;
            let checked = false;
            for (sf = 0; sf < sfBlock.length; sf++) {
                if (!checked && sfBlock.eq(sf).find('.inline-hinter').is(':visible')) {
                    firstIndex += sf;
                    checked = true;
                }
            }
            // console.log(firstIndex);
            $('[data-portal="sign-up"]')[0].scroll({
                top: 71.81 * firstIndex,
                behavior: 'smooth',
                block: "start",
                inline: "nearest"
            });

            $(target).addClass("js-shake");
            setTimeout(function() {
                $(target).removeClass("js-shake");
            }, 200);
        }

        //sheet2api test  cannot post image neither
        // var data = {
        //     "user-type": $('[data-name=user-type]:checked').attr('data-type'),
        //     "user-name": $('#user-name').val() + ' ' + $('#user-mail').val(),
        //     "code": $('#user-code').val(),
        //     "brand-id": $('#brand-id').val(),
        //     // "image": $('#file-upload')[0].files
        // };
        // var url = 'https://sheet2api.com/v1/9nZsJjj6QoWn/申請站預設選項/members';
        // fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data),
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

    })

    $('.portal').find('input[type=text], input[type=email], input[type=password]').keydown((e) => {
        let target = e.target;
        setTimeout(() => {
            if ($(target).val() != "") {
                if ($(target).closest('.f-block').find('.inline-hinter').is(':visible')) {
                    $(target).closest('.f-block').find('.inline-hinter').remove();
                }
            }
        }, 50)
    })

    $('.portal').find('input[type=radio]').click((e) => {
        let target = e.target;
        if ($(target).closest('.f-block').find('.inline-hinter').is(':visible')) {
            $(target).closest('.f-block').find('.inline-hinter').remove();
        }
    })

    // https://docs.google.com/spreadsheets/d/1BFUMvMbYGRe8zQaiCBfQMrL6KoFBqi29Kh9_YcZphY0/edit#gid=251577508
    let ssidCode = '/1BFUMvMbYGRe8zQaiCBfQMrL6KoFBqi29Kh9_YcZphY0';
    const sheetID = `gid=251577508`;
    const endpointCode = `${gsUrl}${ssidCode}${query}${sheetID}`;
    fetch(endpointCode)
        .then(res => res.text())
        .then(data => {
            let jsData = data.substr(47).slice(0, -2);
            let json = JSON.parse(jsData);
            let rows = json.table.rows;
            let cols = json.table.cols;
            console.log(cols)

            if (valKey == null) {
                $('#validation').keyup((e) => {
                    let target = e.target;
                    if ($(target).val() != "") {
                        $('.icon_20x.for-portal').css('display', 'block');
                    } else {
                        $('.icon_20x.for-portal').css('display', 'none');
                    }
                })

                $('.icon_20x.for-portal').click((e) => {
                    let target = e.target;
                    $(target).css('display', 'none');
                    $(target).siblings('input').val('');

                    if ($(target).hasClass('js-clear-input')) {
                        $(target).removeClass('js-clear-input').addClass('js-return');
                    }
                    $('#validation').focus();
                })

                $('[data-update="sign-in"]').click((e) => {
                    validating();
                })

                $('#password').change((e) => {
                    $('.icon_20x.for-portal.js-return').removeClass('js-return').addClass('js-clear-input');
                    validating();
                })

                function validating() {
                    let input = $('[data-portal=sign-in]').find('input[type=text]');
                    input.each((i) => {
                        if (($(input).eq(i).val() == "")) {
                            let hinter = '<div class="inline-hinter">此欄必填</div>';
                            $(input).eq(i).closest('.f-block').find('._12px-500').append(hinter);
                            $(input).eq(i).closest('.f-block').addClass("js-shake");
                            $('[data-update=sign-in]').addClass("js-shake");
                            setTimeout(function() {
                                $(input).eq(i).closest('.f-block').removeClass("js-shake");
                                $('[data-update=sign-in]').removeClass("js-shake");
                            }, 200);
                        }
                    })

                    let employee = $('[data-portal="sign-in"]').find('#employee');
                    let password = $('[data-portal="sign-in"]').find('#password');
                    let i;
                    let iArr = [];
                    let validated = false;
                    for (i = 0; i < rows.length; i++) {
                        if (rows[i].c[2] != null) {
                            if ($(employee).val() != '') {
                                let allNameMail = rows[i].c[2].v;
                                let space = allNameMail.indexOf(' ');
                                let at = allNameMail.indexOf('@');
                                let name = allNameMail.slice(space, at).trim();
                                let fullMail = allNameMail.slice(space, allNameMail.length).trim();
                                if (name == $(employee).val() || fullMail == $(employee).val()) {
                                    iArr.push(i);
                                }
                            }
                        }
                    }
                    // console.log(iArr[0])
                    if (rows[iArr[0]] == null) {
                        let hinter = '<div class="inline-hinter">此帳號不存在</div>';
                        $(employee).closest('.f-block').find('._12px-500').append(hinter);
                        $('[data-update=sign-in]').addClass('js-shake');
                        setTimeout(() => {
                            $('[data-update=sign-in]').removeClass('js-shake');
                        }, 200)
                    } else if (rows[iArr[0]] != null) {
                        if ($(password).val() != '') {
                            if (rows[iArr[0]].c[3].v == $(password).val()) {
                                validated = true;
                            } else {
                                let hinter = '<div class="inline-hinter">密碼錯誤</div>';
                                $(password).closest('.f-block').find('._12px-500').append(hinter);
                                $('[data-update=sign-in]').addClass('js-shake');
                                setTimeout(() => {
                                    $('[data-update=sign-in]').removeClass('js-shake');
                                }, 200)
                            }
                        }
                        if (validated) {
                            $('.portal-bg').addClass('js-hide');
                            $('.query-box').removeClass('js-collapsed');
                            $('.container.for-list').css({
                                'bottom': '0px',
                                'position': 'absolute'
                            });
                            sessionStorage.setItem('id', rows[iArr[0]].c[0].v);
                            sessionStorage.setItem('type', rows[iArr[0]].c[1].v);
                            sessionStorage.setItem('nameMail', rows[iArr[0]].c[2].v);
                            sessionStorage.setItem('key', rows[iArr[0]].c[3].v);
                            sessionStorage.setItem('brandID', rows[iArr[0]].c[4].v);
                            // console.log(rows[iArr[0]].c[0].v + ',' + rows[iArr[0]].c[1].v + ',' + rows[iArr[0]].c[2].v + ',' + rows[iArr[0]].c[3].v)

                            let nameMail = rows[iArr[0]].c[2].v;
                            let space = nameMail.indexOf(' ');
                            let name = nameMail.slice(0, space + 1).trim();

                            let type = rows[iArr[0]].c[1].v;

                            let brandID = rows[iArr[0]].c[4].v;

                            let gear = '<div class="icon_20x gear"></div>'

                            if (type == 'applicant') {
                                $('[data-validation=master]').remove();
                                $('.member-name').text(name);
                                $('.identity').html('需求方' + gear);
                                let currWidth = 'calc(' + $('.member-name').css('width') + ' + ' + $('.identity').css('width') + ' + ' + '14px)';
                                $('.drop-card.for-identity').css('maxWidth', currWidth);
                            } else if (type == 'designer') {
                                $('[data-validation=master]').remove();
                                $('[data-validation=applicant]').remove();
                                $('.member-name').text(name);
                                $('.identity').html('設計方' + gear);
                                let currWidth = 'calc(' + $('.member-name').css('width') + ' + ' + $('.identity').css('width') + ' + ' + '14px)';
                                $('.drop-card.for-identity').css('maxWidth', currWidth);
                            } else if (type == 'MASTER') {
                                $('[data-send="MASTER"]').css('display', 'none');
                                // $('.submit-box[data-validation=applicant]').remove();
                                $('.card-box').eq(0).find('[data-validation=applicant]').remove();
                                $('[data-validation=share]').remove();
                                $('.member-name').text(name);
                                $('.identity').html('管理方' + gear);
                                let currWidth = 'calc(' + $('.member-name').css('width') + ' + ' + $('.identity').css('width') + ' + ' + '14px)';
                                $('.drop-card.for-identity').css('maxWidth', currWidth);
                            }
                        }
                    }
                }
            } else if (valKey != null) {
                $('#validation').val(valKey);
                let nameMail = sessionStorage.getItem('nameMail');
                let space = nameMail.indexOf(' ');
                let name = nameMail.slice(0, space + 1).trim();
                let gear = '<div class="icon_20x gear"></div>'

                let i;
                for (i = 1; i < rows.length; i++) {
                    if (rows[i].c[2] != null && rows[i].c[3] != null) {
                        if (rows[i].c[2].v == nameMail && rows[i].c[3].v == valKey) {
                            if (rows[i].c[1].v == 'applicant') {
                                $('[data-validation=master]').remove();
                                $('.member-name').text(name);
                                $('.identity').html('需求方' + gear);
                                let currWidth = 'calc(' + $('.member-name').css('width') + ' + ' + $('.identity').css('width') + ' + ' + '14px)';
                                $('.drop-card.for-identity').css('maxWidth', currWidth);
                            } else if (rows[i].c[1].v == 'designer') {
                                $('[data-validation=master]').remove();
                                $('[data-validation=applicant]').remove();
                                $('.member-name').text(name);
                                $('.identity').html('設計方' + gear);
                                let currWidth = 'calc(' + $('.member-name').css('width') + ' + ' + $('.identity').css('width') + ' + ' + '14px)';
                                $('.drop-card.for-identity').css('maxWidth', currWidth);
                            } else if (rows[i].c[1].v == 'MASTER') {
                                $('[data-send="MASTER"]').css('display', 'none');
                                $('.card-box').eq(0).find('[data-validation=applicant]').remove();
                                $('[data-validation=share]').remove();
                                $('.member-name').text(name);
                                $('.identity').html('管理方' + gear);
                                let currWidth = 'calc(' + $('.member-name').css('width') + ' + ' + $('.identity').css('width') + ' + ' + '14px)';
                                // console.log(currWidth)
                                $('.drop-card.for-identity').css('maxWidth', currWidth);
                            }
                        }
                    }
                }
            }

            let userType = 0;
            let nameMail = 0;
            for (i = 0; i < cols.length; i++) {
                if (cols[i].label == 'user-type') {
                    userType += i;
                }
                if (cols[i].label == 'user-name') {
                    nameMail += i;
                }
            }
            let r;
            for (r = 0; r < rows.length; r++) {
                if (rows[r].c[nameMail] != null) {
                    //TBC output applicant query
                    if (rows[r].c[userType].v == 'applicant') {
                        space = rows[r].c[nameMail].v.indexOf(' ');
                        let applicantName = rows[r].c[nameMail].v.slice(0, space + 1).trim();
                        let applicantQueryOption = '<div class="a-button as-list min-size"><div class="label full-touch min-size">' + applicantName + '</div><div class="custom-check tick-right min-size"></div></div>'
                        $('[data-query=applicant]').find('.drop-group').append(applicantQueryOption);
                    }
                    //TBC output designer assign options & designer query
                    if (rows[r].c[userType].v == 'MASTER' || rows[r].c[userType].v == 'designer') {
                        let designerOption = '<div class="a-button as-list"><div class="label full-touch">' + rows[r].c[nameMail].v + '</div><div class="custom-check tick-right"></div></div>'
                        $('#designer').closest('.dropdown-box').find('.drop-group').append(designerOption);

                        let space = rows[r].c[nameMail].v.indexOf(' ');
                        let designerName = rows[r].c[nameMail].v.slice(0, space + 1).trim();
                        let designerQueryOption = '<div class="a-button as-list min-size"><div class="label full-touch min-size">' + designerName + '</div><div class="custom-check tick-right min-size"></div></div>'
                        $('[data-query=designer]').find('.drop-group').append(designerQueryOption);
                    }
                }
            }
            //identity action區塊
            if (!window.location.href.includes('read-me')) {
                $('[data-action="config"]').click(() => {
                    $('.portal-bg').removeClass('js-hide');
                    $('.portal-title').css('display', 'flex');
                    $('.portal').removeClass('js-hide').removeClass('inactive');
                    $('.portal .f-block.in-combo').not('.config').css('display', 'none');
                    $('.portal .f-block.in-combo.config').css('display', 'block');
                    $('.portal .back-portal').css('display', 'block');
                    $('.portal .back-portal').addClass('for-config');
                    $('[data-portal="sign-in"]').css('display', 'none');
                    $('[data-portal="sign-up"]').css('display', 'block');
                    $('[data-portal="sign-up"] .f-block').css('display', 'flex');
                    $('.dropdown-box-s').css('display', 'flex');
                    $('[data-portal="sign-up"] .submit-box').not('.config').css('display', 'none');
                    $('[data-portal="sign-up"] .submit-box.config').css('display', 'flex');
                    $('[data-portal="sign-up"] .submit-box.config .submit-trigger.configuring').css('display', 'flex');

                    //抓取session storage已有資料
                    let nameMail = sessionStorage.getItem('nameMail');
                    let space = nameMail.indexOf(' ');
                    let name = nameMail.slice(0, space + 1).trim();
                    let mail = nameMail.slice(space, nameMail.length).trim();
                    let userType = sessionStorage.getItem('type');
                    let brandID = sessionStorage.getItem('brandID');
                    $('#user-name').val(name);
                    $('#user-mail').val(mail);
                    if (userType == 'MASTER') {
                        $('.literally-radio').parent().remove();
                        $('.dropdown-box-s').parent().remove();
                    } else {
                        if (userType == 'applicant') {
                            jQuery('[data-type="applicant"]').trigger('click');
                            $('[data-type="applicant"]').siblings('span').css('color', 'rgba(47, 90, 58, 1)');
                        } else if (userType == 'designer') {
                            jQuery('[data-type="designer"]').trigger('click');
                            $('[data-type="designer"]').siblings('span').css('color', 'rgba(47, 90, 58, 1)');
                        }
                        $('#brand-id').val(brandID)
                        let label = $('#brand-id').parent().find('.label-s');
                        let brandArr = brandID.split(',');
                        // console.log(brandArr)
                        $(label).each((l) => {
                            if (brandArr.indexOf($(label).eq(l).text()) == 0) {
                                $(label).eq(l).siblings('.custom-check').addClass('js-selected');
                            }
                        })
                    }
                    // $('#user-code').val(valKey);
                    // $('#dbcheck-code').val(valKey);
                })
                setTimeout(() => {
                    $('.back-portal').click((e) => {
                        let target = e.target;
                        if ($(target).hasClass('for-config')) {
                            let confirm = window.confirm('確認返回？資料更動將不會儲存！')
                            if (confirm) {
                                $('.portal-bg').addClass('js-hide');
                            }
                        }
                    })
                }, 10)
                $('[data-update="config"]').click((e) => {
                    let target = e.target;
                    let input = $(target).closest('.portal').find('[data-portal=sign-up]').find('input[type=text], input[type=email], input[type=password]');
                    input.each((i) => {
                        if (($(input).eq(i).val() == "")) {
                            let hinter = '<div class="inline-hinter">此欄必填</div>';
                            $(input).eq(i).closest('.f-block').find('._12px-500').append(hinter);
                            $(input).eq(i).closest('.f-block').addClass("js-shake");
                            $(target).addClass("js-shake");
                            setTimeout(function() {
                                $(input).eq(i).closest('.f-block').removeClass("js-shake");
                                $(target).removeClass("js-shake");
                            }, 200);
                        }
                    })
                    let radio = $(target).closest('.portal').find('input[type=radio]');
                    // console.log($(radio).is(':checked'))
                    if (!$(radio).eq(0).is(':checked') && !$(radio).eq(1).is(':checked')) {
                        // $(radio).eq(0).closest('.f-block')[0].scrollIntoView()
                        let hinter = '<div class="inline-hinter">此欄必填</div>';
                        $(radio).eq(0).closest('.f-block').find('._12px-500').append(hinter);
                        $(radio).eq(0).closest('.f-block').addClass("js-shake");
                        $(target).addClass("js-shake");
                        setTimeout(function() {
                            $(radio).eq(0).closest('.f-block').removeClass("js-shake");
                            $(target).removeClass("js-shake");
                        }, 200);
                    }
                    //密碼須為6字符，並結合英數字（大小寫不限）
                    if ($('#user-code').val() != "") {
                        $('#user-code').each(function() {
                            var validated = true;
                            if ($(this).val().length < 6)
                                validated = false;
                            if (!/\d/.test($(this).val()))
                                validated = false;
                            if (!/[a-z]/.test($(this).val())) {
                                validated = false;
                            }
                            if (/[^0-9a-z]/.test($(this).val())) {
                                validated = false;
                            }
                            // $('div').text(validated ? "pass" : "fail");
                            // use DOM traversal to select the correct div for this input above
                            if (!validated) {
                                let hinter = '<div class="inline-hinter">請輸入6位英數字</div>';
                                $('#user-code').closest('.f-block').find('._12px-500').html('設定密碼' + hinter);
                            } else if (validated = true) {
                                console.log('password OK')
                            }
                        });
                    }

                    //密碼double check
                    if ($('#dbcheck-code').val() != "") {
                        if ($('#dbcheck-code').val() != $('#user-code').val()) {
                            let hinter = '<div class="inline-hinter">輸入錯誤</div>';
                            $('#dbcheck-code').closest('.f-block').find('._12px-500').html('再次確認密碼' + hinter);
                            // setTimeout(function() {
                            //     $('#dbcheck-code').closest('.f-block').find('.inline-hinter').remove();
                            // }, 1500);
                        }
                    }

                    //email格式
                    if ($('#user-mail').val() != "") {
                        if ($('#user-mail').val().indexOf('@') < 0) {
                            let hinter = '<div class="inline-hinter">格式錯誤</div>';
                            $('#user-mail').closest('.f-block').find('._12px-500').html('公司郵箱' + hinter);
                        }
                    }

                    if ($('.inline-hinter:visible').length == 0) {
                        $('.icon_32x.btn-icon').removeClass('sign-up').addClass('js-loading');
                        $(target).css('cursor', 'progress');
                        setTimeout(() => {
                            //sheetDB PATCH user info
                            let id = sessionStorage.getItem('id');
                            console.log('id:' + id)
                            let targetRow = 'https://sheetdb.io/api/v1/mebkcye8qw7nd' + '/' + 'id' + '/' + id + '?sheet=members'
                            axios.patch(targetRow, {
                                "data": {
                                    "user-type": $('[data-name=user-type]:checked').attr('data-type'),
                                    "user-name": $('#user-name').val() + ' ' + $('#user-mail').val(),
                                    "code": $('#user-code').val(),
                                    "brand-id": $('#brand-id').val()
                                }
                            }).then(response => {
                                console.log(response.data);

                                //reset sessionStorage
                                // sessionStorage.setItem('id', rows[iArr[0]].c[0].v);
                                sessionStorage.setItem('type', $('[data-name=user-type]:checked').attr('data-type'));
                                sessionStorage.setItem('nameMail', $('#user-name').val() + ' ' + $('#user-mail').val());
                                sessionStorage.setItem('key', $('#user-code').val());
                                sessionStorage.setItem('brandID', $('#brand-id').val());

                                $('.icon_32x.btn-icon').remove();
                                let reIco = '<div class="icon_32x btn-icon fit-right js-complete"></div>'
                                $('.submit-trigger').html('修改成功' + reIco);

                                //redirect
                                let address = window.location.href;
                                setTimeout(() => {
                                    if (address.indexOf('html') < 0) {
                                        address = address.replace('form-type-a', '');
                                    } else if (address.indexOf('html') >= 0) {
                                        address = address.replace('form-type-a.html', '');
                                    }
                                    window.location.replace(address);
                                }, 1000)
                            });
                        }, 2000)
                    } else {
                        //find the first one of unfilled inputs
                        let firstIndex = 0;
                        let sfBlock = $('[data-portal="sign-up"]').find('.f-block');
                        let sf;
                        let checked = false;
                        for (sf = 0; sf < sfBlock.length; sf++) {
                            if (!checked && sfBlock.eq(sf).find('.inline-hinter').is(':visible')) {
                                firstIndex += sf;
                                checked = true;
                            }
                        }
                        // console.log(firstIndex);
                        $('[data-portal="sign-up"]')[0].scroll({
                            top: 71.81 * firstIndex,
                            behavior: 'smooth',
                            block: "start",
                            inline: "nearest"
                        });

                        $(target).addClass("js-shake");
                        setTimeout(function() {
                            $(target).removeClass("js-shake");
                        }, 200);
                    }
                })

                $('[data-action="sign-out"]').click(() => {
                    let confirm = window.confirm('確認登出？');
                    if (confirm) {
                        sessionStorage.clear();
                        let address = window.location.href;
                        setTimeout(() => {
                            if (address.indexOf('html') < 0) {
                                address = address.replace('form-type-b', '');
                            } else if (address.indexOf('html') >= 0) {
                                address = address.replace('form-type-b.html', '');
                            }
                            window.location.replace(address);
                        }, 1000)
                    }
                })
            }
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
            let applicant = 0;
            let brandID = 0;
            let brandIDarr = [];
            for (i = 0; i < cols.length; i++) {
                // if (rows[0].c[i].v == '設計方') {
                //     designer += i;
                // }
                // if (rows[0].c[i].v == '需求方') {
                //     applicant += i;
                // }
                if (rows[0].c[i].v == '品牌列表-data') {
                    brandID += i;
                }
            }
            let r;
            for (r = 1; r < rows.length; r++) {
                // if (rows[r].c[designer] != null) {
                //     //output designer list for admin
                //     let designerOption = '<div class="a-button as-list"><div class="label full-touch">' + rows[r].c[designer].v + '</div><div class="custom-check tick-right"></div></div>'
                //     $('#designer').closest('.dropdown-box').find('.drop-group').append(designerOption);

                //     //output designer query
                //     let space = rows[r].c[designer].v.indexOf(' ');
                //     let designerName = rows[r].c[designer].v.slice(0, space + 1).trim();
                //     let designerQueryOption = '<div class="a-button as-list min-size"><div class="label full-touch min-size">' + designerName + '</div><div class="custom-check tick-right min-size"></div></div>'
                //     $('[data-query=designer]').find('.drop-group').append(designerQueryOption);
                // }
                // if (rows[r].c[applicant] != null) {
                //     //output applicant query
                //     space = rows[r].c[applicant].v.indexOf(' ');
                //     let applicantName = rows[r].c[applicant].v.slice(0, space + 1).trim();
                //     let applicantQueryOption = '<div class="a-button as-list min-size"><div class="label full-touch min-size">' + applicantName + '</div><div class="custom-check tick-right min-size"></div></div>'
                //     $('[data-query=applicant]').find('.drop-group').append(applicantQueryOption);
                // }
                if (rows[r].c[brandID] != null) {
                    //output brand-id (sign-up)
                    brandIDarr.push(rows[r].c[brandID].v);
                }
            }

            function uniq(a) {
                return a.sort().filter(function(item, pos, ary) {
                    return !pos || item != ary[pos - 1];
                });
            }
            brandIDarr = uniq(brandIDarr);
            let br;
            for (br = 0; br < brandIDarr.length; br++) {
                let brandIdOption = '<div class="a-button as-list"><div class="label-s full-touch">' + brandIDarr[br] + '</div><div class="custom-check tick-right"></div></div>'
                $('input#brand-id').parent().find('.drop-group-s').append(brandIdOption);
            }

            $('.label-s').click((e) => {
                let target = e.target;
                let tCheck = $(target).siblings('.custom-check');
                let tInput = document.querySelector('.dropdown-s');
                let tCard = $(target).closest('.drop-card-s');
                let tHinter = $(tInput).closest('.f-block').find('.inline-hinter');

                if (tHinter != null) {
                    tHinter.remove();
                }

                setTimeout(() => {
                    $(tCard).removeClass('js-collapsed');
                    $(tCard).siblings('.dropdown-arrow-s').addClass('js-rotated');
                }, 1)

                if (tCheck.hasClass('js-selected')) {
                    tCheck.removeClass('js-selected');
                    let text = target.textContent;
                    let textIndex = tInput.value.indexOf(text);
                    if (textIndex > 0) {
                        tInput.value = tInput.value.replaceAll("," + text, "");
                    } else if (textIndex == 0) {
                        if (tInput.value.length > 2) {
                            tInput.value = tInput.value.replaceAll(text + ",", "");
                        } else if (tInput.value.length == 2) {
                            tInput.value = tInput.value.replaceAll(text, "");
                        }
                    }
                } else if (!tCheck.hasClass('js-selected')) {
                    tCheck.addClass('js-selected');
                    if (tInput.value == '') {
                        tInput.value += target.textContent;
                    } else {
                        tInput.value += (',' + target.textContent);
                    }
                }
            });
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
                    //main
                    let list = document.createElement('div');
                    let divLine = document.createElement('div');
                    let title = document.createElement('div');
                    let statsBox = document.createElement('div');
                    let applicant = document.createElement('div');
                    let designer = document.createElement('div');
                    let status = document.createElement('div');

                    list.classList.add('a-list');
                    divLine.classList.add('a-divisional', 'for_list', 'unclickable');
                    title.classList.add('_14px-500', 'unclickable');
                    statsBox.classList.add('stats-flex', 'in-list', 'unclickable')
                    applicant.classList.add('_14px-500', 'as-stats');
                    designer.classList.add('_14px-500', 'as-stats');
                    status.classList.add('stats-chip');

                    //timing-notes
                    let timingNotes = document.createElement('div');
                    let timestamp = document.createElement('div');
                    let ddlBox = document.createElement('div');
                    let ddl1 = document.createElement('div');
                    let ddl2 = document.createElement('div');

                    timingNotes.classList.add('timing-notes', 'js-hide');
                    timestamp.classList.add('_12px-500', 'for-timestamp');
                    ddlBox.classList.add('ddl-box');
                    ddl1.classList.add('_12px-500', 'for-ddl');
                    ddl2.classList.add('_12px-500', 'for-ddl');

                    timingNotes.appendChild(timestamp);
                    timingNotes.appendChild(ddlBox);
                    ddlBox.appendChild(ddl1);
                    ddlBox.appendChild(ddl2);

                    statsBox.appendChild(applicant);
                    statsBox.appendChild(designer);
                    statsBox.appendChild(status);
                    list.appendChild(divLine);
                    list.appendChild(title);
                    list.appendChild(statsBox);
                    list.appendChild(timingNotes);

                    listBox.insertBefore(list, null);
                    list.dataset.output = "list";


                    // title.textContent = '00/00~00/00 品牌類型BN';
                    // applicant.textContent = '需求方';
                    // designer.textContent = '設計方';
                    // status.textContent = '製作中';

                    let cells = rows[rw].c;
                    let cols = json.table.cols;
                    // let tCells = rows[li].c;
                    let i;
                    for (i = 0; i < cols.length; i++) {
                        //案件標題
                        if (cols[i].label == '曝光日期') {
                            $(title).text(cells[i].v);
                        }
                        if (cols[i].label == '主打品牌') {
                            $(title).text($(title).text() + '\u00a0\u00a0' + cells[i].v);
                        }
                        if (cols[i].label == '活動類型') {
                            $(title).text($(title).text() + cells[i].v);
                        }
                        if (cols[i].label == '急迫度' && cells[i] != null) {
                            // $(title).text($(title).text() + ' (' + cells[i].v + ')');
                            $(title).text($(title).text() + '！' + cells[i].v);
                        }
                        if (cols[i].label == '需求方') {
                            $(applicant).text(cells[i].v);
                        }
                        if (cols[i].label == '設計方') {
                            if (cells[i] != null) {
                                $(designer).text(cells[i].v);
                                $(status).text('製作中');
                                //設計方 <-> 設計單號 的g-sheet欄位順序不可調換
                                $(timestamp).html('設計單號 ' + cells[i + 5].v);
                                $(ddl1).html('初稿日期 ' + cells[i + 2].v.slice(5, cells[i + 2].v.length));
                                $(ddl2).html('完稿日期 ' + cells[i + 3].v.slice(5, cells[i + 3].v.length));
                            } else if (cells[i] == null) {
                                $(designer).text('未指派');
                                $(designer).css('color', '#a9a9a9');
                                $(status).text('未發單');
                                $(status).addClass('js-tbc');
                                // $(timestamp).html('設計單號 <div class="_12px-500 timing-null">待發單</div>');
                                $(timestamp).html('');
                                $(ddl1).html('初稿日期 <div class="_12px-500 timing-null">待指定</div>');
                                $(ddl2).html('完稿日期 <div class="_12px-500 timing-null">待指定</div>');
                            }
                        }
                        if (cols[i].label == '結案' && cells[i] != null) {
                            $(status).text('已結案');
                            $(status).addClass('js-endcase');
                        }
                        if (cols[i].label == '曝光年份') {
                            $(list).attr('data-year', cells[i].v);
                        }
                        if (cols[i].label == 'brandID') {
                            $(list).attr('data-brand', cells[i].v);
                        }
                    }
                }
            }

            //List 標註月份（H3 .month-indicator）
            function monthH3() {
                $('.month-indicator').remove();
                let mArr = [];
                $('.a-list:visible').each((l) => {
                    $('.a-list:visible').eq(l).attr('data-m', '');
                    if ($('.a-list:visible').eq(l).css('display') == 'flex') {

                        let base = $('.a-list:visible').eq(l).children('._14px-500').text().slice(0, 2);
                        let minus = $('.a-list:visible').eq(l - 1).children('._14px-500').text().slice(0, 2);
                        if ($('.a-list:visible').not(':hidden').length != 1) {
                            let offset = base - minus;
                            offset = Math.abs(offset);
                            // console.log(offset)
                            if (offset >= 1) {
                                let month = $('.a-list:visible').eq(l).children('._14px-500').text().slice(0, 2);
                                let mHeader = '<h3 class="h3 month-indicator" data-m="' + month + '">' + month + '</h3>';
                                $(mHeader).attr('data-m', month);
                                $('.a-list:visible').eq(l).before($(mHeader));
                                $('.a-list:visible').eq(l).attr('data-m', month);
                                mArr.push(month);
                            }
                        }
                    }
                })
                let firstMonth = $('.a-list').not(':hidden').eq(0).children('._14px-500').text().slice(0, 2);
                let firstHeader = '<h3 class="h3 month-indicator" data-m="' + firstMonth + '">' + firstMonth + '</h3>';
                let lastMonth = $('.a-list').not(':hidden').eq($('.a-list').not(':hidden').length - 1).children('._14px-500').text().slice(0, 2);
                let lastHeader = '<h3 class="h3 month-indicator" data-m="' + lastMonth + '">' + lastMonth + '</h3>';
                if ($('.a-list').not(':hidden').length != 1) {
                    if ($('.a-list').not(':hidden').eq(0).prev('.month-indicator').length < 1) {
                        $('.a-list').not(':hidden').first().before(firstHeader);
                        $('.a-list').not(':hidden').first().attr('data-m', firstMonth);
                    }
                    if ($('.a-list').not(':hidden').eq($('.a-list').not(':hidden').length - 1).prev('.month-indicator').length < 1) {
                        // console.log('last')
                        // $('.a-list').not(':hidden').last().before(lastHeader);
                        // $('.a-list').not(':hidden').last().attr('data-m', lastMonth);
                    }
                } else if ($('.a-list').not(':hidden').length == 1) {
                    $('.a-list').not(':hidden').first().before(firstHeader);
                    $('.a-list').not(':hidden').first().attr('data-m', firstMonth);
                }
                $('.month-indicator').each((i) => {
                        //所有H3加上[年份] 格式: yyyy/mm
                        let annotateY = '<div class="annotate h3-year">' + $('.month-indicator').eq(i).next().attr('data-year') + '/</div>';
                        $('.month-indicator').eq(i).html(annotateY + $('.month-indicator').eq(i).html());
                    })
                    // $('.month-indicator').each((i) => {
                    //     //只有1月加上[年份] 格式: yyyy/mm
                    //     if ($('.month-indicator').eq(i).text() == '01月') {
                    //         if ($('.month-indicator').eq(i - 1).text() == '12月' || $('.month-indicator').eq(i + 1).text() == '12月') {
                    //             let annotateY = '<div class="annotate h3-year">/' + $('.month-indicator').eq(i).next().attr('data-year') + '</div>';
                    //             $('.month-indicator').eq(i).html($('.month-indicator').eq(i).html() + annotateY);
                    //         }
                    //     }
                    // })
                    // $('.month-indicator').each((i) => {
                    //     //刪除「0」字樣
                    //     if ($('.month-indicator').eq(i).html().slice(0, 1) == '0') {
                    //         $('.month-indicator').eq(i).html($('.month-indicator').eq(i).html().replace('0', ''));
                    //     }
                    // })

                // let dpM; //duplicated month
                // $('.month-indicator').each((i) => {
                //         if (mArr.filter(x => x == $('.month-indicator').eq(i).text()).length > 1) {
                //             dpM = $('.month-indicator').eq(i).text();
                //         }
                //     })
                //     // $('.month-indicator').filter(x => $(x).attr('data-m') == dpM).eq(1).remove();
                // let mH3 = document.querySelectorAll('h3');
                // let dpH3 = [...mH3].filter(x => x.dataset.m == dpM);
                // $(dpH3).eq(1).remove();
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
                                // let labelText = 'Q' + q + '/' + monthArr.key.slice(2, 4); //利用「Quarter值」搭配「year」製造選項文字
                                let labelText = monthArr.key + '/' + '<div class="q-chr unclickable">Q</div>' + q; //利用「Quarter值」搭配「year」製造選項文字
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
                    $('[data-query=quarter]').find('.label').eq(label).html(labelArr[label]);
                }

                //頁面load預設第一選項被選中
                let first = $('[data-query=quarter]').find('.drop-group').find('.label').first();
                $('[data-query=quarter]').children('.unclickable').not('.dropdown-arrow').html(first.html());
                first.siblings('.custom-check').addClass('js-selected');

                //添加「全案件」選項
                let newQ = '<div class="a-button as-list"><div class="label full-touch"></div><div class="custom-check tick-right"></div></div>';
                $('[data-query=quarter]').find('.drop-group').append(newQ);
                $('[data-query=quarter]').find('.label').last().text('全季度');
            })

            let quarterQueryRan = false; //edge-case! 若目前季度皆已結案，預設顯示上一季度案件

            $(document).ready(function() {
                statsQuery();
                quarterQuery();
                monthH3();
                noResult();
            })

            //search input 響應
            $('.search-input').change(function() {
                searchQuery();
                quarterQuery();
                statsQuery();
                personQuery();
                monthH3();
                noResult();
                // sortQuery();
            })

            $('.search-input').keyup(function(e) {
                $(this).parent().parent().find('.icon_32x.for-search-query').addClass('js-return');
                if (e.which == 13) {
                    $(this).parent().parent().find('.icon_32x.for-search-query').removeClass('js-return').addClass('js-clear-search');
                    $(this).trigger('change');
                }
                if ($(this).val() == "") {
                    $(this).parent().parent().find('.icon_32x.for-search-query').removeClass('js-return').removeClass('js-clear-search');
                    $('.list').css('display', 'flex');
                    searchQuery();
                    quarterQuery();
                    statsQuery();
                    personQuery();
                    monthH3();
                }
            })

            $('.icon_32x.for-search-query').click(function(e) {
                    if ($(this).hasClass('js-clear-search')) {
                        noResult();
                        $(this).parent().find('.search-input').val('');
                        $(this).removeClass('js-clear-search');
                    } else if ($(this).hasClass('js-return')) {
                        searchQuery();
                        quarterQuery();
                        statsQuery();
                        personQuery();
                        monthH3();
                        $(this).removeClass('js-return').addClass('js-clear-search');
                    }
                }) //end of search input 響應

            let hinted = false; //for clear-filter hint

            //filter 響應區塊
            $(document).click(function(e) {
                let target = $(e.target);

                // dropdown之間僅保留一個顯現，其餘收合
                // if (target.hasClass('dropdown-box')) {
                //     collapseAll();
                //     target.find('.drop-card').toggleClass('js-collapsed');
                //     target.find('.dropdown-arrow').toggleClass('js-rotated');
                //     // sortQuery(); //!-- 這邊不叫喚的話會暫時跑掉，疑惑待解
                // } else {
                //     collapseAll();
                // }

                // function collapseAll() {
                //     $('.dropdown-box.for-query').not(target).find('.drop-card').addClass('js-collapsed');
                //     $('.dropdown-box.for-query').not(target).find('.dropdown-arrow').removeClass('js-rotated');
                // }

                // drop option 轉換文字
                if (!target.parent().parent().hasClass('brand-id')) {
                    if (target.hasClass('label', 'full-touch') && target.parentsUntil('.query-box') != null) {
                        noResult();
                        // quarterQuery();
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
                            tFilterKey.html(target.html());
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
                                tFilterKey.text('進度');
                            }
                        }
                    }
                }

                if ($('.dropdown-box[data-query]').not('[data-query="quarter"]').hasClass('js-filtering') || $('.search-input').val() != "") {
                    $('.icon_32x.filter').addClass('js-filtering');
                    if (!hinted) {
                        mEnter();
                        setTimeout(() => {
                            mLeave();
                        }, 1500)
                        hinted = true;
                    }
                } else {
                    $('.icon_32x.filter').removeClass('js-filtering');
                }

                //「清除filter」 提示顯現
                if ($('.icon_32x.filter').hasClass('js-filtering')) {
                    $('.icon_32x.filter').hover(mEnter, mLeave);
                }

                function mEnter() {
                    $('.icon_32x.filter').find('.hinter-box').css('display', 'block');
                }

                function mLeave() {
                    $('.icon_32x.filter').find('.hinter-box').css('display', 'none');
                }

                //filter 模式開關
                if (target.hasClass('filter')) {
                    if (target.hasClass('js-filtering')) {
                        noResult()
                        target.removeClass('js-filtering');
                        if ($('.search-input').val() != '') {
                            $('.search-input').val('');
                            $('.icon_32x.for-search-query').removeClass('js-clear-search');
                        }
                        let quarterKey = $('[data-query=quarter]').find('.unclickable').not('.dropdown-arrow').not('.q-chr');
                        let quarterFirstOption = $('[data-query=quarter]').parent().find('.label');
                        $(quarterFirstOption).siblings('.custom-check').removeClass('js-selected');
                        $(quarterFirstOption).eq(0).siblings('.custom-check').addClass('js-selected');
                        $(quarterKey).html($(quarterFirstOption).html());
                        $('[data-query=quarter]').removeClass('js-filtering');
                    }
                    //defaulting query conditions
                    let tDropdownBox = target.parent().find('.dropdown-box');

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
                            tFilterKey.text('進度');
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
                        // setTimeout(() => {
                        if (sortKey.text() === '新件置頂') {
                            sortQuery();
                            monthH3();
                        }
                        // }, 10)
                    }
                    sortKey.text(sortDropBox.find('.label').first().text()); //在sortKey更換回default前，先執行sortQuery回復初始排序
                }

                //query 區塊
                if (target.parentsUntil('.query-box') != null) {
                    $('.a-list').css('display', 'flex'); //每次執行query之前，先顯現所有list
                    searchQuery();
                    quarterQuery(); //除了click event 也用於document.ready
                    statsQuery();
                    personQuery();
                    monthH3();
                    if (target.hasClass('label')) {
                        if (target.parent().parent().parent().parent().attr('data-query') == 'sort') {
                            sortQuery();
                            monthH3();
                        }
                    }
                }
            })

            function searchQuery() {
                let keyedTxt = $('.search-input').val();
                if (keyedTxt.includes(' ')) {
                    keyedTxt = keyedTxt.replace(/ /g, ',');
                    keyedTxt = keyedTxt.split(',');
                    $(keyedTxt).each((i) => {
                        $('.a-list').css('display', 'flex');
                        $('.a-list').each((l) => {
                            if ($('.a-list').eq(l).children('._14px-500').text().toLowerCase().indexOf(keyedTxt[i].toLowerCase()) < 0) {
                                $('.a-list').eq(l).css('display', 'none');
                            }
                        })
                    })
                } else {
                    $('.a-list').css('display', 'flex');
                    $('.a-list').each(function() {
                        if ($(this).children('._14px-500').text().toLowerCase().indexOf(keyedTxt.toLowerCase()) < 0) {
                            $(this).css('display', 'none');
                        }
                    })
                }
            }

            function quarterQuery() {
                $('.dropdown-box').each(function() {
                    if ($(this).attr('data-query') == 'quarter') {
                        $(this).addClass('js-filtering');
                        let filterKey = $(this).children('.unclickable').not('.dropdown-arrow').text();

                        execute();

                        if (!quarterQueryRan && $('.a-list:visible').length == 0) {
                            quarterQueryRan = true;
                            $('.a-list').css('display', 'flex');
                            $(this).find('.unclickable').not('.dropdown-arrow').html($(this).find('.label').eq(1).html());
                            filterKey = $(this).children('.unclickable').not('.dropdown-arrow').text();
                            $(this).find('.label').eq(0).siblings().removeClass('js-selected');
                            $(this).find('.label').eq(1).siblings().addClass('js-selected');
                            execute();
                            statsQuery();
                        }

                        function execute() {
                            let qKey = filterKey.slice(filterKey.length - 1, filterKey.length);
                            if (filterKey.indexOf('全案件') < 0) {
                                $('.a-list').each(function() {
                                    let month = $(this).children('._14px-500').text().slice(0, 2);
                                    if (month <= (qKey - 1) * 3 || month > qKey * 3) {
                                        $(this).css('display', 'none');
                                    }
                                })
                            } else if (filterKey == '全案件') {
                                $('.a-list').css('display', 'flex');
                            }
                        }
                    }
                })
            }

            function personQuery() {
                $('.dropdown-box').each(function() {
                    if ($(this).attr('data-query') == 'designer') {
                        let filterKey = $(this).children('.unclickable').not('.dropdown-arrow').text();
                        if (filterKey != "設計方") {
                            $('.a-list').each(function(l) {
                                let statsStr = $('.a-list').eq(l).find('._14px-500.as-stats').eq(1).text();
                                if (statsStr == '未指派' || filterKey != statsStr) {
                                    $('.a-list').eq(l).css('display', 'none');
                                }
                            })
                        }
                    } else if ($(this).attr('data-query') == 'applicant') {
                        let filterKey = $(this).children('.unclickable').not('.dropdown-arrow').text();
                        if (filterKey != "需求方") {
                            $('.a-list').each(function(l) {
                                let statsStr = $('.a-list').eq(l).find('._14px-500.as-stats').eq(0).text();
                                if (filterKey != statsStr) {
                                    $('.a-list').eq(l).css('display', 'none');
                                }
                            })
                        }
                    }
                })
            }

            function statsQuery() {
                $('.dropdown-box').each(function() {
                    if ($(this).attr('data-query') == 'status') {
                        let filterKey = $(this).children('.unclickable').not('.dropdown-arrow').text();
                        $('.a-list').each(function(l) {
                            let statsStr = $('.a-list').eq(l).find('.stats-chip').text();
                            if (filterKey == "進度" && statsStr == "已結案") { //default
                                $('.a-list').eq(l).css('display', 'none');
                            } else if (filterKey == "已結案" && statsStr != "已結案") {
                                $('.a-list').eq(l).css('display', 'none');
                            } else if (filterKey == "製作中" && statsStr != "製作中") {
                                $('.a-list').eq(l).css('display', 'none');
                            } else if (filterKey == "未發單" && statsStr != "未發單") {
                                $('.a-list').eq(l).css('display', 'none');
                            }
                        })
                    }
                })
            }

            function sortQuery() {
                //翻轉rows順序
                let r;
                for (r = rows.length - 1; r >= 0; r--) {
                    console.log(r)
                    rows.push(rows[r]);
                }
                rows.splice(0, rows.length / 2);

                let lists = document.querySelectorAll('.a-list');
                let listBox = document.querySelector('.list-box');
                let l;
                for (l = lists.length - 1; l >= 0; l--) {
                    lists[l].remove();
                    listBox.insertBefore(lists[l], null);
                }
                monthH3();
            }
            // $('.dropdown-box.for-query').find('.label').mouseup(() => { noResult() })
            // $('.search-input').change(() => { noResult() })
            // $('.icon_32x.filter.js-filtering').click(() => { noResult() })

            function noResult() {
                setTimeout(() => {
                    if ($('.a-list:visible').length == 0) {
                        $('.empty-state').css('display', 'block');
                    }
                    if ($('.a-list:visible').length > 0) {
                        $('.empty-state').css('display', 'none');
                    }
                }, 50)
            }
            //end of List欄位-QUERY


            // Result欄位output
            document.addEventListener('click', (e) => {
                    let target = e.target;
                    let output = document.querySelector('.container.output');

                    if (target.classList.contains('a-list')) {
                        output.classList.add('js-show');

                        let lists = document.querySelectorAll('.a-list');
                        outputData();


                        function outputData() {
                            //tab區塊預設styling
                            $('.col-left').find('.a-button').not('.indicator').css('color', 'rgba(47, 90, 58, 0.5)');
                            setTimeout(() => {
                                $('.col-left').each((cl) => {
                                    // console.log($('.col-left').eq(cl).find('.a-button:visible').eq(0))
                                    $('.col-left').eq(cl).find('.a-button:visible').eq(0).css('color', 'rgba(47, 90, 58, 1)');
                                })
                            }, 100)
                            $('.col-right').find('[data-output]').css('display', 'none');
                            $('.col-right').find('[data-output]').first().css('display', 'block');

                            let sizeIndexA = [];
                            let sizeIndexB = [];
                            let sizeIndexC = [];
                            let ecDataA = 0;
                            let ecDataB = 0;
                            let ecDataC = 0;
                            let ecNameA = 0;
                            let ecNameB = 0;
                            let ecNameC = 0;

                            let li;
                            for (li = 0; li < lists.length; li++) {

                                if (target == lists[li]) {
                                    $(lists[li]).addClass('js-topbar'); //css animation has @keyframe
                                    $(lists[li]).find('.stats-flex').addClass('js-topbar'); //css animation has @keyframe
                                    $(lists[li]).find('._14px-500.as-stats').css('opacity', '0');

                                    $('.query-box').addClass('js-collapsed');
                                    $('.container.for-list').css({
                                        'bottom': '-100vh',
                                        'position': 'fixed'
                                    });
                                    setTimeout(() => {
                                        $('.container.output').css({
                                            'opacity': '1',
                                            'top': '0px'
                                        });
                                        setTimeout(() => {
                                            $('.back-home').css('left', 'calc(50vw + 296px)')
                                        }, 100)
                                    }, 100)
                                    $('.as-textarea[data-output]').text('');
                                    $('.as-counts').text('');
                                    $('.home-title').css({
                                        'z-index': '0',
                                        'opacity': '0'
                                    });

                                    //針對已發單、已結案的案件，cta顯示「已發單、已結案」
                                    if ($(lists[li]).find('.stats-chip').text() == '製作中') {
                                        assignInactive();
                                    } else if ($(lists[li]).find('.stats-chip').text() == '已結案') {
                                        endCaseInactive();
                                    }
                                    setTimeout(() => {
                                        if ($('[data-output="designer"]').text() == '未指派') {
                                            endCaseInactive();
                                            $('[data-update="end-case"]').html('確認結案<div class="icon_32x btn-icon end-case unclickable"></div>');
                                            $('[data-update="end-case"]').css({
                                                'maxWidth': 'none',
                                            })
                                            let disabledBtnHinter = '<div class="annotate dead-btn-hinter">本案尚未發單，無法結案</div>'
                                            $('[data-update="end-case"]').parent().parent().append(disabledBtnHinter);
                                        }
                                    }, 100)

                                    let cols = json.table.cols;
                                    let tCells = rows[li].c;
                                    let i;
                                    for (i = 0; i < cols.length; i++) {
                                        //分開處理空白的期限欄位
                                        if (cols[i].label == '初稿交件日期' && tCells[i] == null) {
                                            if ($("[data-output=ddl-1]").is('input')) {
                                                $("[data-output=ddl-1]").val('');
                                            }
                                        }
                                        if (cols[i].label == '完成日期' && tCells[i] == null) {
                                            if ($("[data-output=ddl-2]").is('input')) {
                                                $("[data-output=ddl-2]").val('');
                                            }
                                        }
                                        if (tCells[i] != null) {
                                            //標題output
                                            // $('[data-output=case-name]').text(tCells[0].v + '\u00a0\u00a0' + tCells[1].v + tCells[2].v);
                                            // if (tCells[3] != null) { //急件
                                            //     $('[data-output=case-name]').text(($('[data-output=case-name]').text().concat(' (' + tCells[3].v + ')')));
                                            // }
                                            //基本資訊output
                                            if (cols[i].label == '需求方') {
                                                $("[data-output='applicant']").text(tCells[i].v);
                                            }
                                            if (cols[i].label == '需求方mail') {
                                                $("[data-output='applicant']").text($("[data-output='applicant']").text() + ' ' + tCells[i].v);
                                            }
                                            setTimeout(() => {
                                                //管理方若點擊自己所點入的申請案件
                                                let nameMail = sessionStorage.getItem('nameMail');
                                                let type = sessionStorage.getItem('type');
                                                if ($("[data-output=applicant]").text() == nameMail && type == 'MASTER') {
                                                    $('[data-send="MASTER"]').css('display', 'block');
                                                }

                                                //核對需求方身份已決定是否顯示「結案」功能
                                                let brandID = sessionStorage.getItem('brandID');
                                                // let brandData = $(lists).eq(li).attr('data-brand');

                                                //以brandID核對
                                                // if (brandID != 'ALL') {
                                                //     if (brandID.indexOf(brandData) < 0) {
                                                //         $('[data-validation="applicant"]').css('display', 'none');
                                                //     }
                                                // }

                                                //以需求方核對 -> 核對點入查看的身份是否等同當初該案的申請者，因需求方的負責品牌可能會調動，故不以brandID做核對
                                                if (brandID != 'ALL') {
                                                    if ($('[data-output="applicant"]').text() != nameMail) {
                                                        // console.log(nameMail + $('[data-output="applicant"]').text())
                                                        $('[data-validation="applicant"]').css('display', 'none');
                                                    }
                                                }
                                            }, 100)
                                            if (cols[i].label == '相關路徑') {
                                                $("[data-output='path']").text(tCells[i].v);
                                            }
                                            if (cols[i].label == '設計方') {
                                                if ($("[data-output=designer]").is('input')) {
                                                    $("[data-output=designer]").val(tCells[i].v);
                                                } else {
                                                    $("[data-output=designer]").text(tCells[i].v);
                                                }
                                            }
                                            if (cols[i].label == '設計方mail') {
                                                if ($("[data-output=designer]").is('input')) {
                                                    $("[data-output=designer]").val($("[data-output=designer]").val() + ' ' + tCells[i].v);
                                                } else {
                                                    $("[data-output=designer]").text($("[data-output=designer]").text() + ' ' + tCells[i].v);
                                                }
                                            }
                                            if (cols[i].label == '初稿交件日期') {
                                                if ($("[data-output=ddl-1]").is('input')) {
                                                    $("[data-output=ddl-1]").val(tCells[i].v);
                                                } else {
                                                    $("[data-output=ddl-1]").text(tCells[i].v);
                                                }
                                            }
                                            if (cols[i].label == '完成日期') {
                                                if ($("[data-output=ddl-2]").is('input')) {
                                                    $("[data-output=ddl-2]").val(tCells[i].v);
                                                } else {
                                                    $("[data-output=ddl-2]").text(tCells[i].v);
                                                }

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
                                                // if (tCells[i].v.indexOf(',,,') > 0) {
                                                //     if (tCells[i].v.indexOf(',,,') == tCells[i].v.length - 3) {
                                                //         brChecked = tCells[i].v.replace(',,,', '');
                                                //     } else if (tCells[i].v.indexOf(',,,') != tCells[i].v.length - 3) {
                                                //         brChecked = tCells[i].v.replace(',,,', ',');
                                                //     }
                                                // } else if (tCells[i].v.indexOf(',,') > 0) {
                                                //     if (tCells[i].v.indexOf(',,') == tCells[i].v.length - 2) {
                                                //         brChecked = tCells[i].v.replace(',,', '');
                                                //     } else if (tCells[i].v.indexOf(',,') != tCells[i].v.length - 2) {
                                                //         brChecked = tCells[i].v.replace(',,', ',');
                                                //     }
                                                // }
                                            }
                                            if (cols[i].label == '案型1-商品總數') {
                                                $("[data-output='P-count-A']").text(tCells[i].v.slice(2, 3) + '商品');
                                            }
                                            if (cols[i].label == '案型1-商品清單') {
                                                if (tCells[i].v != '無需曝光商品') {
                                                    let pdSerial = tCells[i].v.replaceAll('\n', ',');
                                                    pdSerial = pdSerial.split(',');
                                                    jQuery.each(pdSerial, function(i, imgName) {
                                                        let brandID = imgName.slice(0, 2);
                                                        let url = "url(products/" + brandID + '/' + imgName + ")";
                                                        $("[data-output='P-A']").append($('<div></div>').addClass('img').css('background-image', url));
                                                    })
                                                } else {
                                                    $("[data-output='P-A']").css({
                                                        'padding-left': '12px',
                                                        'color': 'rgba(47, 90, 58, 0.5)'
                                                    });
                                                    $("[data-output='P-A']").text('無需曝光商品');
                                                }
                                            }
                                            if (cols[i].label.indexOf('案型1') >= 0 && cols[i].label.indexOf('尺寸') >= 0) {
                                                sizeIndexA.push(i);
                                            }
                                            if (cols[i].label == '案型1-通路名稱') {
                                                ecNameA += i;
                                                $("[data-output='S-count2-A']").text((tCells[i].v.match(/,/g) || []).length + 1 + '通路');
                                            }
                                            if (cols[i].label == '案型1-通路data') {
                                                ecDataA += i;
                                            }

                                            //案型2 output
                                            if (cols[i].label == '案型2-活動文案') {
                                                $("[data-output='C-B']").html(tCells[i].v.replaceAll(',', '<br>'));
                                            }
                                            if (cols[i].label == '案型2-商品總數') {
                                                $("[data-output='P-count-B']").text(tCells[i].v.slice(2, 3) + '商品');
                                            }
                                            if (cols[i].label == '案型2-商品清單') {
                                                if (tCells[i].v != '無需曝光商品') {
                                                    let pdSerial = tCells[i].v.replaceAll('\n', ',');
                                                    pdSerial = pdSerial.split(',');
                                                    jQuery.each(pdSerial, function(i, imgName) {
                                                        let brandID = imgName.slice(0, 2);
                                                        let url = "url(products/" + brandID + '/' + imgName + ")";
                                                        $("[data-output='P-B']").append($('<div></div>').addClass('img').css('background-image', url));
                                                    })
                                                } else {
                                                    $("[data-output='P-B']").css({
                                                        'padding-left': '12px',
                                                        'color': 'rgba(47, 90, 58, 0.5)'
                                                    });
                                                    $("[data-output='P-B']").text('無需曝光商品');
                                                }
                                            }
                                            if (cols[i].label.indexOf('案型2') >= 0 && cols[i].label.indexOf('尺寸') >= 0) {
                                                sizeIndexB.push(i);
                                            }
                                            if (cols[i].label == '案型2-通路名稱') {
                                                ecNameB += i;
                                                $("[data-output='S-count2-B']").text((tCells[i].v.match(/,/g) || []).length + 1 + '通路');
                                            }
                                            if (cols[i].label == '案型2-通路data') {
                                                ecDataB += i;
                                            }
                                            //案型3 output
                                            if (cols[i].label == '案型3-活動文案') {
                                                $("[data-output='C-C']").html(tCells[i].v.replaceAll(',', '<br>'));
                                            }
                                            if (cols[i].label == '案型3-商品總數') {
                                                $("[data-output='P-count-C']").text(tCells[i].v.slice(2, 3) + '商品');
                                            }
                                            if (cols[i].label == '案型3-商品清單') {
                                                if (tCells[i].v != '無需曝光商品') {
                                                    let pdSerial = tCells[i].v.replaceAll('\n', ',');
                                                    pdSerial = pdSerial.split(',');
                                                    jQuery.each(pdSerial, function(i, imgName) {
                                                        let brandID = imgName.slice(0, 2);
                                                        let url = "url(products/" + brandID + '/' + imgName + ")";
                                                        $("[data-output='P-C']").append($('<div></div>').addClass('img').css('background-image', url));
                                                    })
                                                } else {
                                                    $("[data-output='P-C']").css({
                                                        'padding-left': '12px',
                                                        'color': 'rgba(47, 90, 58, 0.5)'
                                                    });
                                                    $("[data-output='P-C']").text('無需曝光商品');
                                                }
                                            }
                                            if (cols[i].label.indexOf('案型3') >= 0 && cols[i].label.indexOf('尺寸') >= 0) {
                                                sizeIndexC.push(i);
                                            }
                                            if (cols[i].label == '案型3-通路名稱') {
                                                ecNameC += i;
                                                $("[data-output='S-count2-C']").text((tCells[i].v.match(/,/g) || []).length + 1 + '通路');
                                            }
                                            if (cols[i].label == '案型3-通路data') {
                                                ecDataC += i;
                                            }
                                            if (cols[i].label == 'timestamp') {
                                                $('[data-output=list]').attr('data-stamp', tCells[i].v);
                                            }
                                        }
                                    }
                                    //案型1-製作尺寸 + ec tab
                                    let ecNamesA = tCells[ecNameA].v.split(','); //values truned into an array
                                    let ecDatasA = tCells[ecDataA].v.split(',');
                                    let totalSizeA = 0;
                                    let sa;
                                    for (sa = 0; sa < sizeIndexA.length; sa++) {
                                        let tabBtn = '<div class="a-button as-tab"><div data-ec="' + ecDatasA[sa] + '" class="label full-touch">' + ecNamesA[sa] + '</div><div class="_12px-500 as-counts in-tab">' + ((tCells[sizeIndexA[sa]].v.match(/\n/g) || []).length + 1) + '</div></div>';
                                        let sizeOutput = '<div data-output="' + ecDatasA[sa] + '" class="output as-textarea bulk">' + tCells[sizeIndexA[sa]].v.replaceAll('\n', '<br>') + '</div>';
                                        $('.height-extended').eq(0).append(sizeOutput);
                                        $('.side-184w').eq(0).append(tabBtn);
                                        $('.height-extended').eq(0).find('.as-textarea').css('display', 'none');
                                        $('.height-extended').eq(0).find('.as-textarea').eq(0).css('display', 'block');
                                        $('.side-184w').eq(0).find('.as-tab').not('.indicator').css('color', 'rgba(47, 90, 58, 0.5)');
                                        $('.side-184w').eq(0).find('.as-tab').not('.indicator').eq(0).css('color', 'rgba(47, 90, 58, 1)');
                                        totalSizeA += (tCells[sizeIndexA[sa]].v.match(/\n/g) || []).length + 1;
                                    }
                                    $('[data-output=S-count2-A]').text($('[data-output=S-count2-A]').text() + '/ ' + totalSizeA + '尺寸');

                                    //案型2-製作尺寸 + ec tab
                                    let ecNamesB = tCells[ecNameB].v.split(','); //values truned into an array
                                    let ecDatasB = tCells[ecDataB].v.split(',');
                                    let totalSizeB = 0;
                                    let sb;
                                    for (sb = 0; sb < sizeIndexB.length; sb++) {
                                        let tabBtn = '<div class="a-button as-tab"><div data-ec="' + ecDatasB[sb] + '" class="label full-touch">' + ecNamesB[sb] + '</div><div class="_12px-500 as-counts in-tab">' + ((tCells[sizeIndexB[sb]].v.match(/\n/g) || []).length + 1) + '</div></div>';
                                        let sizeOutput = '<div data-output="' + ecDatasB[sb] + '" class="output as-textarea bulk">' + tCells[sizeIndexB[sb]].v.replaceAll('\n', '<br>') + '</div>';
                                        $('.height-extended').eq(1).append(sizeOutput);
                                        $('.side-184w').eq(1).append(tabBtn);
                                        $('.height-extended').eq(1).find('.as-textarea').css('display', 'none');
                                        $('.height-extended').eq(1).find('.as-textarea').eq(0).css('display', 'block');
                                        $('.side-184w').eq(1).find('.as-tab').not('.indicator').css('color', 'rgba(47, 90, 58, 0.5)');
                                        $('.side-184w').eq(1).find('.as-tab').not('.indicator').eq(0).css('color', 'rgba(47, 90, 58, 1)');
                                        totalSizeB += (tCells[sizeIndexB[sb]].v.match(/\n/g) || []).length + 1;
                                    }
                                    $('[data-output=S-count2-B]').text($('[data-output=S-count2-B]').text() + '/ ' + totalSizeB + '尺寸');

                                    //案型3-製作尺寸 + ec tab
                                    let ecNamesC = tCells[ecNameC].v.split(','); //values truned into an array
                                    let ecDatasC = tCells[ecDataC].v.split(',');
                                    let totalSizeC = 0;
                                    let sc;
                                    for (sc = 0; sc < sizeIndexC.length; sc++) {
                                        // console.log(tCells[sizeIndexC[1]]);
                                        if (tCells[sizeIndexC[sc]].v != null) {
                                            let tabBtn = '<div class="a-button as-tab"><div data-ec="' + ecDatasC[sc] + '" class="label full-touch">' + ecNamesC[sc] + '</div><div class="_12px-500 as-counts in-tab">' + ((tCells[sizeIndexC[sc]].v.match(/\n/g) || []).length + 1) + '</div></div>';
                                            let sizeOutput = '<div data-output="' + ecDatasC[sc] + '" class="output as-textarea bulk">' + tCells[sizeIndexC[sc]].v.replaceAll('\n', '<br>') + '</div>';
                                            $('.height-extended').eq(2).append(sizeOutput);
                                            $('.side-184w').eq(2).append(tabBtn);
                                            $('.height-extended').eq(2).find('.as-textarea').css('display', 'none');
                                            $('.height-extended').eq(2).find('.as-textarea').eq(0).css('display', 'block');
                                            $('.side-184w').eq(2).find('.as-tab').not('.indicator').css('color', 'rgba(47, 90, 58, 0.5)');
                                            $('.side-184w').eq(2).find('.as-tab').not('.indicator').eq(0).css('color', 'rgba(47, 90, 58, 1)');
                                            totalSizeC += (tCells[sizeIndexC[sc]].v.match(/\n/g) || []).length + 1;
                                        }
                                    }
                                    $('[data-output=S-count2-C]').text($('[data-output=S-count2-C]').text() + '/ ' + totalSizeC + '尺寸');
                                }
                            } // end of list for-loop
                        } //end of function OutputData()


                        //img 放大鏡
                        $('.img').not('.big').each((i) => {
                            $('.img').not('.big').eq(i).mousemove((e) => {
                                let target = e.target;
                                let posX = e.clientX;
                                let posY = e.clientY;

                                let offset = target.getBoundingClientRect();
                                let imgX = offset.left;
                                let imgY = offset.top;
                                let imgUrl = $(target).css('backgroundImage');
                                // console.log('posX: ' + posX)
                                // console.log('imgX: ' + imgX)
                                // console.log(Math.round((posX - imgX)))

                                let magnifier = '<div class="img-magnifier"></div>';
                                if ($(target).parent('.block-pool').find('.img-magnifier').length == 0) {
                                    $(target).parent('.block-pool').append(magnifier);
                                }

                                $('.block-pool').each((m) => {
                                    if ($('.block-pool')[m] == target.parentElement) {
                                        let pool = document.querySelectorAll('.block-pool')[m];
                                        let poolOffset = pool.getBoundingClientRect();
                                        let poolX = poolOffset.left;
                                        let poolY = poolOffset.top;
                                        let tMagnifier = $('.block-pool').eq(m).find('.img-magnifier');
                                        $(tMagnifier).css({
                                            'display': 'block',
                                            'top': Math.round((posY - poolY) - 28) + 'px', //減去放大鏡本身的一半以及block-pool的一半
                                            'left': Math.round((posX - poolX) - 28) + 'px',
                                        })

                                        $(tMagnifier).find('.img.big').remove();
                                        let newImg = '<div class="img big"></div>';
                                        $(tMagnifier).append(newImg);
                                        $(tMagnifier).find('.img.big').css('backgroundImage', imgUrl);
                                        $(tMagnifier).find('.img.big').css({
                                            'margin-left': Math.round(-(posX - imgX) * 1.75 + 28) + 'px',
                                            'margin-top': Math.round(-(posY - imgY) * 1.75 + 28) + 'px',
                                        })
                                    }

                                    $('.block-pool').eq(m).mouseleave(() => {
                                        $('.block-pool').eq(m).find('.img').removeClass('db-size');
                                    })
                                });
                            })
                            $('.img').not('.big').eq(i).mouseenter((e) => {
                                $('.img').not('.big').removeClass('db-size');
                                $('.img').not('.big').eq(i).addClass('db-size');
                            })
                        })



                        $('div').not('.img, .img-magnifier').mouseenter(() => {
                            $('.img-magnifier').css('display', 'none');
                        })


                        //!! tab 點按響應
                        $('.side-184w').each((t) => {
                            let shownLabel = $('.side-184w').eq(t).find('.label[data-ec]:visible');
                            $(shownLabel).click((e) => {
                                $(shownLabel).parent().css('color', 'rgba(47, 90, 58, 0.5)');
                                let target = e.target;
                                let s;
                                for (s = 0; s < shownLabel.length; s++) {
                                    if (shownLabel.eq(s).text() == $(target).text()) {
                                        $('.side-184w').eq(t).find('.a-button.as-tab.indicator').css('top', s * 36 + 'px');
                                        $(target).parent().css('color', 'rgba(47, 90, 58, 1)');

                                        let textarea = $(target).closest('.height-318').find('.as-textarea');
                                        $(textarea).css('display', 'none');
                                        $(textarea).eq(s).css('display', 'block');
                                    }
                                }
                            })
                        })

                        //交件日期若非空，隱藏placeholder
                        if ($('.date-input').length != 0) {
                            if ($('.date-input').val().length == 0) {
                                $('.date-input').parent().siblings('.placeholder').css('display', 'block');
                                $('.date-input').parent().css('opacity', '0');
                            } else {
                                $('.date-input').parent().siblings('.placeholder').css('display', 'none');
                                $('.date-input').parent().css('opacity', '1');
                            }
                        }

                        //資料更新區註明tbc
                        if ($("[data-output=designer]").not('input').text() == "") {
                            $("[data-output=designer]").not('input').text("未指派");
                            $("[data-output=designer]").not('input').css('color', 'rgba(47, 90, 58, 0.5)');
                        }
                        if ($("[data-output=ddl-1]").not('input').text() == "") {
                            $("[data-output=ddl-1]").not('input').text("未指派");
                            $("[data-output=ddl-1]").not('input').css('color', 'rgba(47, 90, 58, 0.5)');
                        }
                        if ($("[data-output=ddl-2]").not('input').text() == "") {
                            $("[data-output=ddl-2]").not('input').text("未指派");
                            $("[data-output=ddl-2]").not('input').css('color', 'rgba(47, 90, 58, 0.5)');
                        }

                        //隱藏空白的案型card
                        setTimeout(() => {
                                let copyWright = $("[data-output='C-A'], [data-output='C-B'], [data-output='C-C']");
                                $(copyWright).each((c) => {
                                    if ($(copyWright).eq(c).text().length == 0) {
                                        $(copyWright).eq(c).closest('.card-box').css('display', 'none');
                                    }
                                })
                            }, 1)
                            //若多案型標註案型編號
                        setTimeout(() => {
                            $('[data-detail="true"]:visible').each((c) => {
                                let capTitle = $('[data-detail="true"]:visible').eq(c).find('.cap-title');
                                if ($('[data-detail="true"]:visible').length > 1) {
                                    $(capTitle).text($(capTitle).text() + ' ' + (c + 1));
                                }
                            })
                        }, 100)

                        let currDesigner = $('input[data-output="designer"]').val();
                        let currDDL1 = $('input[data-output="ddl-1"]').val();
                        let currDDL2 = $('input[data-output="ddl-2"]').val();

                        $('[data-output="designer"]').parent().parent().find('.label').click((e) => {
                            let target = e.target;
                            let tInput = $(target).closest('.dropdown-box').find('.input');
                            setTimeout(() => {
                                if ($(tInput).val() != currDesigner) {
                                    readyToAssign();
                                } else {
                                    assignInactive();
                                }
                            }, 50)
                        })
                        $('[data-output="ddl-1"]').change((e) => {
                            let target = e.target;
                            if ($(target).val() != currDDL1) {
                                readyToAssign();
                            } else {
                                assignInactive();
                            }
                        })
                        $('[data-output="ddl-2"]').change((e) => {
                            let target = e.target;
                            if ($(target).val() != currDDL2) {
                                readyToAssign();
                            } else {
                                assignInactive();
                            }
                        })

                        function assignInactive() {
                            $('[data-update="send"]').html('已發單<div class="icon_32x btn-icon js-complete unclickable"></div>');
                            $('[data-update="send"]').addClass('unclickable');
                            $('[data-update="send"]').css({
                                'maxWidth': '124px',
                                'backgroundColor': '#808080'
                            })
                        }

                        function readyToAssign() {
                            $('[data-update="send"]').html('確認發單<div class="icon_32x btn-icon send unclickable"></div>');
                            $('[data-update="send"]').removeClass('unclickable');
                            $('[data-update="send"]').css({
                                'maxWidth': 'none',
                                'backgroundColor': 'rgba(51, 51, 51, 0.85)'
                            })
                        }

                        function endCaseInactive() {
                            $('[data-update="end-case"]').html('已結案<div class="icon_32x btn-icon js-complete unclickable"></div>');
                            $('[data-update="end-case"]').addClass('unclickable');
                            $('[data-update="end-case"]').css({
                                'maxWidth': '124px',
                                'backgroundColor': '#808080'
                            })
                        }

                        function readyToEndCase() {
                            $('[data-update="end-case"]').html('確認結案<div class="icon_32x btn-icon end-case unclickable"></div>');
                            $('[data-update="end-case"]').removeClass('unclickable');
                            $('[data-update="end-case"]').css({
                                'maxWidth': 'none',
                                'backgroundColor': 'rgba(51, 51, 51, 0.85)'
                            })
                        }

                        //返回主畫面
                        $('.back-home').click(() => {
                            $('[data-send="MASTER"]').css('display', 'none');

                            $('.dead-btn-hinter').remove();
                            $('.cta-flex.in-card').css('display', 'flex');

                            readyToAssign();
                            readyToEndCase();

                            $('.container.output').removeClass('js-show');
                            // setTimeout(() => {
                            $('.home-title').css({
                                'z-index': '7',
                                'opacity': '1'
                            });
                            // }, 200)

                            //defaulting list[li]
                            $(lists).each((l) => {
                                if ($(lists).eq(l).css('position') == 'fixed') {
                                    $(lists).eq(l).removeClass('js-topbar');
                                    $(lists).eq(l).find('.stats-flex').removeClass('js-topbar');
                                    $(lists).eq(l).find('._14px-500.as-stats').css('opacity', '1');
                                }
                            })
                            $('.query-box').removeClass('js-collapsed');
                            $('.container.for-list').css({
                                'bottom': '0px',
                                'position': 'absolute'
                            });
                            $('.container.output').css({
                                'opacity': '0',
                                'top': '48px'
                            });
                            $('.back-home').css('left', 'calc(50vw + 240px)');

                            //defaulting hinters
                            $('.hinter-box').css('display', 'none');

                            ////defaulting output blocks
                            //capTitle
                            $('[data-detail="true"]').each((c) => {
                                let capTitle = $('[data-detail="true"]').eq(c).find('.cap-title');
                                if ($(capTitle).text().length > 4) {
                                    $(capTitle).text($(capTitle).text().slice(0, ($(capTitle).text().length - 2)));
                                }
                            })

                            //card-box
                            $('.container.output').find('.card-box').css('display', 'block');

                            //info area
                            $("[data-output='designer']").text('');
                            $("[data-output='designer']").val('');
                            $("[data-output='ddl-1']").text('');
                            $("[data-output='ddl-1']").val('');
                            $("[data-output='ddl-2']").text('');
                            $("[data-output='ddl-2']").val('');
                            $("[data-output=designer]").not('input').css('color', 'rgba(47, 90, 58, 1)');
                            $("[data-output=ddl-1]").not('input').css('color', 'rgba(47, 90, 58, 1)');
                            $("[data-output=ddl-2]").not('input').css('color', 'rgba(47, 90, 58, 1)');
                            //pd count area
                            $('[data-output=P-count-A], [data-output=P-count-B], [data-output=P-count-C]').text('0');

                            //img area
                            $('.img').remove();
                            $("[data-output='P-A']").each(function() {
                                $(this).css({
                                    'padding-left': '8px',
                                    'color': 'rgba(47, 90, 58, 0.5)'
                                });
                                $(this).text('');
                            })

                            //tab area
                            $('.a-button.as-tab.indicator').css('top', '0px');
                            $('.col-left').find('.a-button').not('.indicator').remove();
                            $('.col-right').find('[data-output]').remove();

                            $('[data-validation="applicant"]').css('display', 'flex');
                        })
                        $(document).click(() => {
                            setTimeout(() => {
                                let input = $('[data-update=send]').closest('.card').find('input').not('.submit');
                                input.each((i) => {
                                    if ($(input).eq(i).val() != "") {
                                        $(input).eq(i).closest('.f-block').find('.hinter-box').css('display', 'none');
                                    }
                                })
                            }, 10)
                        })

                        //更新表單
                        $('[data-update=send]').click((e) => {
                            let target = e.target;
                            let input = $(target).closest('.card').find('input').not('.submit');
                            input.each((i) => {
                                // console.log($(input).eq(2).val())
                                if ($(input).eq(i).val() == "") {
                                    $(input).eq(i).closest('.f-block').find('.hinter-box').css('display', 'block');
                                    $(input).eq(i).closest('.f-block').find('.hinter-box').addClass("js-shake");
                                    $(target).addClass("js-shake");
                                    setTimeout(function() {
                                        $(input).eq(i).closest('.f-block').find('.hinter-box').removeClass("js-shake");
                                        $(target).removeClass("js-shake");
                                    }, 200);
                                }
                            })

                            //Update timestamp
                            let newTimestamp = moment().format();
                            //solution found at https://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
                            function getPosition(string, subString, index) {
                                return string.split(subString, index).join(subString).length;
                            }
                            let secondColon = getPosition(newTimestamp, ':', 2);
                            newTimestamp = newTimestamp.slice(0, secondColon).replace('T', '').replaceAll('-', '').replace(':', '');
                            let brand;
                            $(lists).each((l) => {
                                if ($(lists).eq(l).css('position') == 'fixed') {
                                    brand = $(lists).eq(l).attr('data-brand');
                                }
                            })
                            newTimestamp = brand + '-' + newTimestamp;
                            // console.log(newTimestamp)

                            let nameMail = $('#designer').val();
                            let space = nameMail.indexOf(' ');
                            let name = nameMail.slice(0, space + 1).trim();
                            let mail = nameMail.slice(space + 1, nameMail.length).trim();

                            if ($('.hinter-box:visible').length == 0) {
                                $('.icon_32x.btn-icon').removeClass('send').addClass('js-loading');
                                $(target).css('cursor', 'progress');

                                setTimeout(() => {
                                    let timestamp = $('[data-output=list]').attr('data-stamp');
                                    let targetRow = 'https://sheetdb.io/api/v1/fx6gemwyky94h' + '/' + 'timestamp' + '/' + timestamp
                                    axios.patch(targetRow, {
                                        "data": {
                                            "設計方": name,
                                            "設計方mail": mail,
                                            "初稿交件日期": $('#ddl-1').val(),
                                            "完成日期": $('#ddl-2').val(),
                                            "timestamp": newTimestamp
                                        }
                                    }).then(response => {
                                        console.log(response.data);
                                        $('.icon_32x.btn-icon').remove();
                                        let reIco = '<div class="icon_32x btn-icon js-complete"></div>'
                                        $('.submit-trigger').html('發單成功' + reIco);
                                        setTimeout(() => {
                                                $(lists).each((l) => {
                                                    if ($(lists).eq(l).css('position') == 'fixed') {
                                                        $(lists).eq(l).find('.stats-chip').removeClass('js-tbc');
                                                        $(lists).eq(l).find('.stats-chip').text('製作中');
                                                    }
                                                })
                                            }, 200)
                                            // redirect to home
                                        let address = window.location.href;
                                        setTimeout(() => {
                                            if (address.indexOf('html') < 0) {
                                                address = address.replace('form-type-b', '');
                                            } else if (address.indexOf('html') >= 0) {
                                                address = address.replace('form-type-b.html', '');
                                            }
                                            window.location.replace(address);
                                        }, 1000)
                                    });
                                }, 2000)
                            }
                        })
                        $('[data-update=end-case]').click((e) => {
                            let target = e.target;
                            if ($("[data-output=designer]").text() == '未指派' || $("[data-output=ddl-1]").text() == '未指派' || $("[data-output=ddl-2]").text() == '未指派') {
                                $(target).addClass("js-shake");
                                setTimeout(function() {
                                    $(target).removeClass("js-shake");
                                }, 200);
                            } else {
                                $('.icon_32x.btn-icon').removeClass('end-case').addClass('js-loading');
                                $(target).css('cursor', 'progress');

                                setTimeout(() => {
                                    let timestamp = $('[data-output=list]').attr('data-stamp');
                                    let targetRow = 'https://sheetdb.io/api/v1/fx6gemwyky94h' + '/' + 'timestamp' + '/' + timestamp
                                    axios.patch(targetRow, {
                                        "data": {
                                            "結案": "true"
                                        }
                                    }).then(response => {
                                        console.log(response.data);
                                        $('.icon_32x.btn-icon').remove();
                                        let reIco = '<div class="icon_32x btn-icon js-complete"></div>'
                                        $('.submit-trigger').html('結案成功' + reIco);
                                        setTimeout(() => {
                                                $(lists).each((l) => {
                                                    if ($(lists).eq(l).css('position') == 'fixed') {
                                                        $(lists).eq(l).find('.stats-chip').addClass('js-endcase');
                                                        $(lists).eq(l).find('.stats-chip').text('已結案');
                                                    }
                                                })
                                            }, 200)
                                            // redirect to home
                                        let address = window.location.href;
                                        setTimeout(() => {
                                            if (address.indexOf('html') < 0) {
                                                address = address.replace('form-type-b', '');
                                            } else if (address.indexOf('html') >= 0) {
                                                address = address.replace('form-type-b.html', '');
                                            }
                                            window.location.replace(address);
                                        }, 1000)
                                    });
                                }, 2000)
                            }
                        })
                        $('[data-update=delete]').click(() => {
                            let confirm = window.confirm('確定刪除本案件? 刪除後不可復原!');
                            if (confirm) {
                                let timestamp = $('[data-output=list]').attr('data-stamp');
                                let targetRow = 'https://sheetdb.io/api/v1/fx6gemwyky94h' + '/' + 'timestamp' + '/' + timestamp
                                axios.delete(targetRow)
                                    .then(response => {
                                        console.log(response.data);
                                        let address = window.location.href;
                                        if (address.indexOf('html') < 0) {
                                            address = address.replace('form-type-b', '');
                                        } else if (address.indexOf('html') >= 0) {
                                            address = address.replace('form-type-b.html', '');
                                        }
                                        window.location.replace(address);
                                    });
                            }
                        });
                    }
                }) //end of Result欄位output
        })
}