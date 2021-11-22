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
            // let applicant = 0; //需求方
            let brand = 0; //品牌列表
            let ecName = 0; //通路列表
            let ecData = 0; //通路列表-data
            for (i = 0; i < cols.length; i++) {
                // if (rows[0].c[i].v == '需求方') {
                //     applicant += i;
                // }
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
                // if (rows[r].c[applicant] != null) {
                //     let option = '<div class="a-button as-list"><div class="label full-touch">' + rows[r].c[applicant].v + '</div><div class="custom-check tick-right"></div></div>'
                //     $('#applicant').parent().find('.drop-group').append(option);
                // }
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
        $('.icon_32x.btn-icon').removeClass('submit').addClass('js-loading');
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
                    "需求方": nameMail,
                    "相關路徑": $("#path").val(),
                }
            }).then(response => {
                console.log(response.data);
                $('.icon_32x.btn-icon').remove();
                let reIco = '<div class="icon_32x btn-icon js-complete"></div>'
                $('.submit-trigger').html('申請成功' + reIco);

                // redirect to home
                let address = window.location.href;
                setTimeout(() => {
                    if (address.indexOf('html') < 0) {
                        address = address.replace('custom-apply', '');
                    } else if (address.indexOf('html') >= 0) {
                        address = address.replace('custom-apply.html', '');
                    }
                    window.location.replace(address);
                }, 1000)
            });
        }, 2000)
    })
}

//@Form-apply input 專屬區塊
if (window.location.href.includes('form-apply')) {

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

            setTimeout(function() {
                $('#Product').find('.drop-group').each((d) => {
                    let i;
                    for (i = 0; i < $(imgArr).length; i++) {
                        let option = '<div class="a-button as-list"><div class="label full-touch">' + imgArr[i] + '</div><div class="custom-check tick-right"></div></div>'
                        $('#Product').find('.drop-group').eq(d).append(option);
                        // console.log(imgNameArr[i]);
                    }
                    let NOption = '<div class="a-button as-list"><div class="label full-touch">' + '無需曝光商品' + '</div><div class="custom-check tick-right"></div></div>'
                    $('#Product').find('.drop-group').eq(d).find('.a-button.as-list').eq(0).before($(NOption));
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

            //reconstruct copywright value
            let AcopywrightStr = [];
            AcopywrightStr.push($("#C-1-A").val(), $("#C-2-A").val(), $("#C-3-A").val(), '<div class="annotate case-note">註</div>' + '<div class="case-note">' + $("#C-4-A").val()) + '</div>';
            let BcopywrightStr = [];
            if ($("#C-1-B").val() != "") {
                BcopywrightStr.push($("#C-1-B").val(), $("#C-2-B").val(), $("#C-3-B").val(), '<div class="annotate case-note">註</div>' + '<div class="case-note">' + $("#C-4-B").val()) + '</div>';
            }
            let CcopywrightStr = [];
            if ($("#C-1-C").val() != "") {
                CcopywrightStr.push($("#C-1-C").val(), $("#C-2-C").val(), $("#C-3-C").val(), '<div class="annotate case-note">註</div>' + '<div class="case-note">' + $("#C-4-C").val()) + '</div>';
            }

            //讀取各ec尺寸
            let sizeA = $('.col-right').eq(0).find('textarea');
            let sizeB = $('.col-right').eq(1).find('textarea');
            let sizeC = $('.col-right').eq(2).find('textarea');

            let nameMail = sessionStorage.getItem('nameMail');

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
                    "案型2-通路名稱": BecStr,
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
                    "案型3-通路名稱": CecStr,
                    "案型3-通路data": CecData.toString(),
                    ////送出前確認訊息
                    "需求方": nameMail,
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
                        address = address.replace('form-apply', '');
                    } else if (address.indexOf('html') >= 0) {
                        address = address.replace('form-apply.html', '');
                    }
                    window.location.replace(address);
                }, 1000)
            });
        }, 2000)
    })
}

//@Index output 專屬區塊
if (!window.location.href.includes('form-apply') && !window.location.href.includes('custom-apply')) {

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
        $('.sign-up').addClass('js-btn2text');
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
        $('.portal').css('paddingBottom', '0px');
    })
    $('.back-portal').click(() => {
        $('.portal').addClass('inactive');
        $('[data-portal=sign-up]').css('display', 'none');
        $('[data-portal=sign-in]').css('display', 'none');
        $('.sign-up').not('.icon_32x').parent().css('display', 'block');
        $('.sign-in').parent().css('display', 'block');
        $('.sign-up').removeClass('js-btn2text');
        $('.sign-in').removeClass('js-btn2text');
        $('.back-portal').css('display', 'none');
    })
    $('[data-update=sign-up]').click((e) => {
        let target = e.target;
        let input = $(target).closest('.portal').find('input[type=text], input[type=email], input[type=password]');
        input.each((i) => {
            if (($(input).eq(i).val() == "")) {
                $(input).eq(i).closest('.f-block').find('.hinter-box').css('display', 'block');
                $(input).eq(i).closest('.f-block').find('.hinter-box').addClass("js-shake");
                $(target).addClass("js-shake");
                setTimeout(function() {
                    $(input).eq(i).closest('.f-block').find('.hinter-box').removeClass("js-shake");
                    $(target).removeClass("js-shake");
                }, 200);
            }
        })
        let radio = $(target).closest('.portal').find('input[type=radio]');
        // console.log($(radio).is(':checked'))
        if (!$(radio).eq(0).is(':checked') && !$(radio).eq(1).is(':checked')) {
            $(radio).eq(0).closest('.f-block').find('.hinter-box').css('display', 'block');
            $(radio).eq(0).closest('.f-block').find('.hinter-box').addClass("js-shake");
            $(target).addClass("js-shake");
            setTimeout(function() {
                $(radio).eq(0).closest('.f-block').find('.hinter-box').removeClass("js-shake");
                $(target).removeClass("js-shake");
            }, 200);
        }

        if ($('.hinter-box:visible').length == 0) {
            $('.icon_32x.btn-icon').removeClass('sign-up').addClass('js-loading');
            setTimeout(() => {
                axios.post('https://sheetdb.io/api/v1/mebkcye8qw7nd', {
                    "data": {
                        "user-type": $('[data-name=user-type]:checked').attr('data-type'),
                        "user-name": $('#user-name').val() + ' ' + $('#user-code').val(),
                        "code": $('#user-code').val(),
                        "brand-id": $('#brand-id').val()
                    }
                }).then(response => {
                    console.log(response.data);
                    $('.icon_32x.btn-icon').remove();
                    let reIco = '<div class="icon_32x btn-icon js-complete"></div>'
                    $('.submit-trigger').html('註冊成功' + reIco);

                    //redirect
                    let address = window.location.href;
                    setTimeout(() => {
                        if (address.indexOf('html') < 0) {
                            address = address.replace('form-apply', '');
                        } else if (address.indexOf('html') >= 0) {
                            address = address.replace('form-apply.html', '');
                        }
                        window.location.replace(address);
                    }, 1000)
                });
            }, 2000)
        }
    })

    $('input[type=text], input[type=email], input[type=password]').keydown((e) => {
        let target = e.target;
        if ($(target).val() != "") {
            if ($(target).closest('.f-block').find('.hinter-box').is(':visible')) {
                $(target).closest('.f-block').find('.hinter-box').css('display', 'none');
                $(target).closest('.f-block').find('.for-hinter').text('此欄必填');
            }
        }
    })

    $('input[type=radio]').click((e) => {
        let target = e.target;
        $(target).closest('.f-block').find('.hinter-box').css('display', 'none');
    })

    $('#dbcheck-code').change(() => {
        if ($('#dbcheck-code').val() != $('#user-code').val()) {
            $('#dbcheck-code').closest('.f-block').find('.hinter-box').css('display', 'block');
            $('#dbcheck-code').closest('.f-block').find('.hinter-box').addClass("js-shake");
            $('#dbcheck-code').closest('.f-block').find('.for-hinter').text("輸入錯誤");
            setTimeout(function() {
                $(input).eq(i).closest('.f-block').find('.hinter-box').removeClass("js-shake");
            }, 200);
        }
    })

    let ssidCode = '/1BFUMvMbYGRe8zQaiCBfQMrL6KoFBqi29Kh9_YcZphY0';
    const endpointCode = `${gsUrl}${ssidCode}${query}`;
    fetch(endpointCode)
        .then(res => res.text())
        .then(data => {
            let jsData = data.substr(47).slice(0, -2);
            let json = JSON.parse(jsData);
            let rows = json.table.rows;
            let cols = json.table.cols;
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

                $('#validation').change((e) => {
                    $('.icon_20x.for-portal.js-return').removeClass('js-return').addClass('js-clear-input');
                    let target = e.target;
                    let i;
                    let iArr = [];
                    for (i = 1; i < rows.length; i++) {
                        if (rows[i].c[2] != null) {
                            if (rows[i].c[2].v.indexOf($(target).val()) >= 0) {
                                $('.portal-bg').addClass('js-hide');
                                $('.query-box').removeClass('js-collapsed');
                                $('.container.for-list').css({
                                    'bottom': '0px',
                                    'position': 'absolute'
                                });
                                sessionStorage.setItem('key', $(target).val());
                                iArr.push(i);
                            } else {
                                $(target).addClass('js-shake');
                                setTimeout(() => {
                                    $(target).removeClass('js-shake');
                                }, 200)
                            }
                        }
                    }
                    let nameMail = rows[iArr[0]].c[1].v;
                    sessionStorage.setItem('nameMail', nameMail);
                    let space = nameMail.indexOf(' ');
                    let name = nameMail.slice(0, space + 1).trim();

                    if (rows[iArr[0]].c[0].v == 'applicant') {
                        $('[data-validation=master]').remove();
                        $('.identity').text('企劃人員｜' + name);
                    } else if (rows[iArr[0]].c[0].v == 'designer') {
                        $('[data-validation=master]').remove();
                        $('[data-validation=applicant]').remove();
                        $('.identity').text('設計人員｜' + name);
                    } else if (rows[iArr[0]].c[0].v == 'MASTER') {
                        // $('.submit-box[data-validation=applicant]').remove();
                        $('.card-box').eq(0).find('[data-validation=applicant]').remove();
                        $('[data-validation=share]').remove();
                        $('.identity').text('管理人員｜' + name);
                    }
                })
            } else if (valKey != null) {
                $('#validation').val(valKey);
                let nameMail = sessionStorage.getItem('nameMail');
                let space = nameMail.indexOf(' ');
                let name = nameMail.slice(0, space + 1).trim();
                let i;
                for (i = 1; i < rows.length; i++) {
                    if (rows[i].c[2] != null) {
                        if (rows[i].c[2].v == valKey) {
                            if (rows[i].c[0].v == 'applicant') {
                                $('[data-validation=master]').remove();
                                $('.identity').text('企劃人員｜' + name);
                            } else if (rows[i].c[0].v == 'designer') {
                                $('[data-validation=master]').remove();
                                $('[data-validation=applicant]').remove();
                                $('.identity').text('設計人員｜' + name);
                            } else if (rows[i].c[0].v == 'MASTER') {
                                $('[data-validation=share]').remove();
                                $('.card-box').eq(0).find('[data-validation=applicant]').remove();
                                $('.identity').text('管理人員｜' + name);
                            }
                        }
                    }
                }
                // setTimeout(() => {
                //     $('.portal-bg').addClass('js-hide');
                // }, 1000)
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
            for (i = 0; i < cols.length; i++) {
                if (rows[0].c[i].v == '設計方') {
                    designer += i;
                }
                if (rows[0].c[i].v == '需求方') {
                    applicant += i;
                }
                if (rows[0].c[i].v == '品牌列表-data') {
                    brandID += i;
                }
            }
            let r;
            for (r = 1; r < rows.length; r++) {
                if (rows[r].c[designer] != null) {
                    //output designer list for admin
                    let designerOption = '<div class="a-button as-list"><div class="label full-touch">' + rows[r].c[designer].v + '</div><div class="custom-check tick-right"></div></div>'
                    $('#designer').closest('.dropdown-box').find('.drop-group').append(designerOption);

                    //output designer query
                    let space = rows[r].c[designer].v.indexOf(' ');
                    let designerName = rows[r].c[designer].v.slice(0, space + 1).trim();
                    let designerQueryOption = '<div class="a-button as-list min-size"><div class="label full-touch min-size">' + designerName + '</div><div class="custom-check tick-right min-size"></div></div>'
                    $('[data-query=designer]').find('.drop-group').append(designerQueryOption);
                }
                if (rows[r].c[applicant] != null) {
                    //output applicant query
                    space = rows[r].c[applicant].v.indexOf(' ');
                    let applicantName = rows[r].c[applicant].v.slice(0, space + 1).trim();
                    let applicantQueryOption = '<div class="a-button as-list min-size"><div class="label full-touch min-size">' + applicantName + '</div><div class="custom-check tick-right min-size"></div></div>'
                    $('[data-query=applicant]').find('.drop-group').append(applicantQueryOption);
                }
                if (rows[r].c[brandID] != null) {
                    //output brand-id (sign-up)
                    let brandIdOption = '<div class="a-button as-list"><div class="label-s full-touch">' + rows[r].c[brandID].v + '</div><div class="custom-check tick-right"></div></div>'
                    $('input#brand-id').parent().find('.drop-group-s').append(brandIdOption);
                }
            }
            $('.label-s').click((e) => {
                let target = e.target;
                let tCheck = $(target).siblings('.custom-check');
                let tInput = document.querySelector('.dropdown-s');
                let tCard = $(target).closest('.drop-card-s');
                $(tCard).removeClass('js-collapsed');

                if (tCheck.hasClass('js-selected')) {
                    tCheck.removeClass('js-selected');
                } else if (!tCheck.hasClass('js-selected')) {
                    tCheck.addClass('js-selected');
                    tInput.value += target.textContent + ',';
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
                    list.dataset.output = "list";


                    // title.textContent = '00/00~00/00 品牌類型BN';
                    // applicant.textContent = '需求方';
                    // designer.textContent = '設計方';
                    // status.textContent = '製作中';

                    let cells = rows[rw].c;

                    title.textContent = cells[0].v + '\u00a0\u00a0' + cells[1].v + cells[2].v;
                    if (cells[3] != null) {
                        title.textContent += ' (' + cells[3].v + ')';
                    }
                    let spaceA = cells[cells.length - 7].v.indexOf(' ');
                    applicant.textContent = cells[cells.length - 7].v.slice(0, spaceA + 1).trim();
                    if (cells[cells.length - 5] != null) {
                        let spaceB = cells[cells.length - 5].v.indexOf(' ');
                        designer.textContent = cells[cells.length - 5].v.slice(0, spaceB + 1).trim();
                        if (cells[cells.length - 2] != null) {
                            status.textContent = '已結案';
                            status.classList.add('js-endcase');
                        } else {
                            status.textContent = '製作中';
                        }
                    } else {
                        designer.textContent = '未指派';
                        designer.style.color = '#A9A9A9';
                        status.textContent = '未發單';
                        status.classList.add('js-tbc');
                    }
                    list.dataset.year = cells[4].v;
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
                                let labelText = monthArr.key + '/' + '<div class="q-chr">Q</div>' + q; //利用「Quarter值」搭配「year」製造選項文字
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
                                tFilterKey.text('未完成');
                            }
                        }
                    }
                }

                if ($('.dropdown-box[data-query]').hasClass('js-filtering')) {
                    $('.icon_32x.filter').addClass('js-filtering');
                }

                //「清除filter」 提示顯現
                if ($('.icon_32x.filter').hasClass('js-filtering')) {
                    $('.icon_32x.filter').hover(mEnter, mLeave);
                }
                if (!hinted) {
                    if ($('.js-filtering[data-query]').length == 1 || $('.search-input').val().length != 0) {
                        mEnter();
                        setTimeout(() => {
                            mLeave();
                        }, 1500)
                        hinted = true;
                    }
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
                            tFilterKey.text('未完成');
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
                            if (filterKey == "未完成" && statsStr == "已結案") { //default
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

                                    let cols = json.table.cols;
                                    let tCells = rows[li].c;
                                    let i;
                                    for (i = 0; i < cols.length; i++) {
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
                                        $('.height-extended').eq(0).find('textarea').css('display', 'none');
                                        $('.height-extended').eq(0).find('textarea').css('display', 'block');
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
                                        $('.height-extended').eq(1).find('textarea').css('display', 'none');
                                        $('.height-extended').eq(1).find('textarea').css('display', 'block');
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
                                    for (sa = 0; sc < sizeIndexC.length; sc++) {
                                        let tabBtn = '<div class="a-button as-tab"><div data-ec="' + ecDatasC[sa] + '" class="label full-touch">' + ecNamesC[sc] + '</div><div class="_12px-500 as-counts in-tab">' + ((tCells[sizeIndexC[sc]].v.match(/\n/g) || []).length + 1) + '</div></div>';
                                        let sizeOutput = '<div data-output="' + ecDatasC[sc] + '" class="output as-textarea bulk">' + tCells[sizeIndexC[sc]].v.replaceAll('\n', '<br>') + '</div>';
                                        $('.height-extended').eq(2).append(sizeOutput);
                                        $('.side-184w').eq(2).append(tabBtn);
                                        $('.height-extended').eq(2).find('textarea').css('display', 'none');
                                        $('.height-extended').eq(2).find('textarea').css('display', 'block');
                                        $('.side-184w').eq(2).find('.as-tab').not('.indicator').css('color', 'rgba(47, 90, 58, 0.5)');
                                        $('.side-184w').eq(2).find('.as-tab').not('.indicator').eq(0).css('color', 'rgba(47, 90, 58, 1)');
                                        totalSizeC += (tCells[sizeIndexC[sc]].v.match(/\n/g) || []).length + 1;
                                    }
                                    $('[data-output=S-count2-C]').text($('[data-output=S-count2-C]').text() + '/ ' + totalSizeC + '尺寸');
                                }
                            } // end of list for-loop
                        } //end of function OutputData()
                        let magnifier = '<div class="img-magnifier"></div>';
                        $('.block-pool').append(magnifier);

                        //img 放大鏡
                        $('.img').each((i) => {
                            $('.img').eq(i).mousemove((e) => {
                                let target = e.target;
                                let posX = e.clientX;
                                let posY = e.clientY;
                                let pool = document.querySelector('.block-pool');
                                let poolOffset = pool.getBoundingClientRect();
                                let poolX = poolOffset.left;
                                let poolY = poolOffset.top;
                                let offset = target.getBoundingClientRect();
                                let imgX = offset.left;
                                let imgY = offset.top;
                                let imgUrl = $(target).css('backgroundImage');
                                console.log('posX: ' + posX)
                                console.log('imgX: ' + imgX)
                                    // console.log(Math.round((posX - imgX)))

                                $('.img-magnifier').css({
                                    'display': 'block',
                                    'top': Math.round((posY - poolY) - 32) + 'px', //減去放大鏡本身的一半以及block-pool的一半
                                    'left': Math.round((posX - poolX) - 32) + 'px',
                                })

                                $('.img-magnifier .img.big').remove();
                                let newImg = '<div class="img big"></div>';
                                $('.img-magnifier').append(newImg);
                                $('.img-magnifier').find('.img.big').css('backgroundImage', imgUrl);
                                $('.img-magnifier').find('.img.big').css({
                                    'margin-left': Math.round(-(posX - imgX) * 2.5 + 32) + 'px',
                                    'margin-top': Math.round(-(posY - imgY) * 2.5 + 32) + 'px',
                                })
                            });
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

                        //返回主畫面
                        $('.back-home').click(function() {
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
                        })

                        //更新表單
                        $('[data-update=send]').click((e) => {
                            let target = e.target;
                            let input = $(target).closest('.card').find('input').not('.submit');
                            input.each((i) => {
                                // console.log($(input).eq(2).val())

                                if (($(input).eq(i).val() == "")) {
                                    $(input).eq(i).closest('.f-block').find('.hinter-box').css('display', 'block');
                                    $(input).eq(i).closest('.f-block').find('.hinter-box').addClass("js-shake");
                                    $(target).addClass("js-shake");
                                    setTimeout(function() {
                                        $(input).eq(i).closest('.f-block').find('.hinter-box').removeClass("js-shake");
                                        $(target).removeClass("js-shake");
                                    }, 200);
                                }
                            })

                            if ($('.hinter-box:visible').length == 0) {
                                $('.icon_32x.btn-icon').removeClass('send').addClass('js-loading');
                                setTimeout(() => {
                                    let timestamp = $('[data-output=list]').attr('data-stamp');
                                    let targetRow = 'https://sheetdb.io/api/v1/fx6gemwyky94h' + '/' + 'timestamp' + '/' + timestamp
                                    axios.patch(targetRow, {
                                        "data": {
                                            "設計方": $('#designer').val(),
                                            "初稿交件日期": $('#ddl-1').val(),
                                            "完成日期": $('#ddl-2').val()
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
                                                address = address.replace('custom-apply', '');
                                            } else if (address.indexOf('html') >= 0) {
                                                address = address.replace('custom-apply.html', '');
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
                                                address = address.replace('custom-apply', '');
                                            } else if (address.indexOf('html') >= 0) {
                                                address = address.replace('custom-apply.html', '');
                                            }
                                            window.location.replace(address);
                                        }, 1000)
                                    });
                                }, 2000)
                            }
                        })
                    }
                }) //end of Result欄位output
        })
}