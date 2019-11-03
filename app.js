var readytotable = false;
var select = false;
$(function(){
    $('.modal').modal();
    $('#modal-iospwainstall').modal('open');
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            deferredPrompt = e;
            $(".installprompt").slideDown();
            $(".ip-btn").click(function(){
                deferredPrompt.prompt();
                deferredPrompt.userChoice
                .then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        $(".installprompt").slideUp();
                    }
                    deferredPrompt = null;
                });
            })
        });
        const isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone|ipad|ipod/.test( userAgent );
          }
        const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
        if (isIos() && !isInStandaloneMode()) {
            if(localStorage.getItem("ios-ip-notagain") == "true"){
                $(".installprompt").slideDown();
            }
        }
        $(".ip-close").click(function(){
            $(".installprompt").slideUp();
        })
        $(".ip-btn").click(function(){
            if(isIos()){
                $('#modal-iospwainstall').modal('open');
            }
        })
        $(".hide-ip").click(function(){
            $(".installprompt").slideUp();
        })
        $(".notagainios").click(function(){
            localStorage.setItem('ios-ip-notagain', true);
        })
    }
    checkToEnable();
    $('.sidenav').sidenav();
    $(".show-appinfo").click(function(){
        $('.sidenav').sidenav('close');
        $('#modal-appinfo').modal('open');
    })
    $('.timepicker-start').timepicker();
    $('.timepicker-start').timepicker({
        autoClose: true,
        twelveHour: false
    });
    $('.timepicker-end').timepicker();
    $('.timepicker-end').timepicker({
        autoClose: true,
        twelveHour: false
    });
    $('.collapsible').collapsible();
    $('.fixed-action-btn').floatingActionButton();
    $(".show-edit-reg").click(function(){
        $("#edit-name-inpt").val(localStorage.getItem('csb-name'));
        $("#edit-id-inpt").val(localStorage.getItem('csb-id'));
        $("#edit-dloc-inpt").val(localStorage.getItem('csb-dloc'));
        M.updateTextFields();
        $(".error-modal-editinfo").hide();
        $('.sidenav').sidenav('close');
        $('#modal-editinfo').modal('open');
    })

    //edit info modal
    $(".update-info-btn").click(function(){
        var name = $("#edit-name-inpt").val();
        var id = $("#edit-id-inpt").val();
        var dloc = $("#edit-dloc-inpt").val();
        var prevkm = document.getElementById("prevkm-checkbox").checked;
        if(id !== "" && id !== null){
            $(".stats").hide();
            localStorage.setItem('csb-name', name);
            localStorage.setItem('csb-id', id);
            localStorage.setItem('csb-dloc', dloc);
            localStorage.setItem('csb-prevkm', prevkm);
            $('#modal-editinfo').modal('close');
            checkToEnable();
        }else{
            $(".error-modal-editinfo").show();
        }

    })
    //delete info modal
    $(".delete-info-btn").click(function(){
        localStorage.removeItem('csb-name');
        localStorage.removeItem('csb-id');
        localStorage.removeItem('csb-dloc');
        localStorage.removeItem('csb-prevkm');
        localStorage.removeItem('csb-prevkmcount');
        localStorage.removeItem('csb-table');
        $('#modal-editinfo').modal('close');
        checkToEnable();
    })
    //enable all functions
    function checkToEnable(){
        var id = localStorage.getItem('csb-id');
        if(id !== "" && id !== null){
            if(localStorage.getItem('csb-c-count') !== undefined && localStorage.getItem('csb-c-count') !== null){
                started();
            }else{
                $(".conf").hide();
                $(".start").fadeIn();
                $(".sidenav-trigger").fadeIn('fast');
                home();
            }

        }else{
            $(".start").hide();
            $(".conf").fadeIn();
            $(".sidenav-trigger").fadeOut('fast');
            $(".stats").hide();
        }
    }
    function home(){
        $("#start-startplace-inpt").val(localStorage.getItem('csb-dloc'));
        $("#start-name-inpt").val(localStorage.getItem('csb-name'));
        if(localStorage.getItem("csb-prevkm") == "true" && localStorage.getItem("csb-prevkmcount") !== undefined){
            $("#start-count-inpt").val(localStorage.getItem("csb-prevkmcount"));
        }else{
            $("#start-count-inpt").val("");
        }
        $("#start-time-inpt").val("");
        $("#start-destination-inpt").val("");
        $("#stop-rmoney-inpt").val("");
        $("#stop-rcount-inpt").val("");
        $("#stop-time-inpt").val("");
        $("#stop-count-inpt").val("");
        M.updateTextFields();
        $(".error-start").hide();
        $(".error-continue").hide();
    }
    //start
    $(".start-road-btn").click(function(){
        var count = $("#start-count-inpt").val();
        var destination = $("#start-destination-inpt").val();
        var startplace = $("#start-startplace-inpt").val();
        var name = $("#start-name-inpt").val();
        var time = $("#start-time-inpt").val();
        if(count.length > 2 && destination.length > 2 && startplace.length > 2 && name.length > 2){
            $(".error-start").hide();
            localStorage.setItem('csb-c-count', count);
            localStorage.setItem('csb-c-destination', destination);
            localStorage.setItem('csb-c-startplace', startplace);
            localStorage.setItem('csb-c-name', name);
            if(time.length > 0){
                localStorage.setItem('csb-c-time', time);
            }
            
            started();
            
        }else{
            $(".error-start").show();
        }
    })
    function started(){
        var count = localStorage.getItem('csb-c-count');
        var destination = localStorage.getItem('csb-c-destination');
        var startplace = localStorage.getItem('csb-c-startplace');
        var name = localStorage.getItem('csb-c-name');
        var time = localStorage.getItem('csb-c-time');
        if(count !== undefined && destination !== undefined && startplace !== undefined && name !== undefined){
            $(".conf").hide();
            $(".start").hide();
            $(".continue").fadeIn();
            $(".sidenav-trigger").fadeOut('fast');
            readytotable = true;
        }
    }
    $('.stop-road-btn').click(function(){
        if(readytotable == true){
            var fuel = false;
            var scount = $("#stop-count-inpt").val();
            var stime = $("#stop-time-inpt").val();
            var smoney = $("#stop-rmoney-inpt").val();
            var scountmoney = $("#stop-rcount-inpt").val();
            if(scount.length > 0){
                if(smoney.length > 0 && scountmoney.length >0){
                    fuel = true;
                }
                var d = new Date();
                var month = d.getMonth()+1;
                var day = d.getDate();
                //to table data
                var datet = d.getFullYear() + '/' +(month<10 ? '0' : '') + month + '/' +(day<10 ? '0' : '') + day;
                var namet = localStorage.getItem('csb-c-name');
                var regt = localStorage.getItem('csb-id');
                if(document.getElementById("roundtrip-checkbox").checked){
                    var roadt = localStorage.getItem('csb-c-startplace') + " -> " + localStorage.getItem('csb-c-destination') + " -> " + localStorage.getItem('csb-c-startplace');
                }else{
                    var roadt = localStorage.getItem('csb-c-startplace') + " -> " + localStorage.getItem('csb-c-destination');
                }
                if(localStorage.getItem('csb-c-time') !== undefined && localStorage.getItem('csb-c-time') !== null){
                    var timest = localStorage.getItem('csb-c-time');
                }else{
                    var timest = "-";
                }
                
                var countst = localStorage.getItem('csb-c-count');
                if(stime !== undefined && stime !== ""){
                    var timeendt = stime;
                }else{
                    var timeendt = "-";
                }
                var countendt = scount;

                var course = countendt - countst;

                var fmoneyt = smoney;
                var fcountt = scountmoney;
                var fuelinfo = fcountt + " L, " + fmoneyt + " PLN";

                if(localStorage.getItem('csb-table') == undefined || localStorage.getItem('csb-table') == null){
                    localStorage.setItem('csb-table', `<table><tr><th>Date</th><th>User (${regt})</th><th>Route</th><th>Hour of Departure</th><th>Counter Before Departure</th><th>Hour of Arrival</th><th>Counter After Arrival</th><th>Course</th><th>Refueling</th></tr></table>`);
                }
                if(fuel == false){
                    $('.hiddentable').html(localStorage.getItem('csb-table'));
                    $('.hiddentable tr:last').after(`<tr><td>${datet}</td><td>${namet}</td><td>${roadt}</td><td>${timest}</td><td>${countst}</td><td>${timeendt}</td><td>${countendt}</td><td>${course} km</td><td>-</td></tr>`);
                    localStorage.setItem('csb-table', $(".hiddentable").html());
                }else{
                    $('.hiddentable').html(localStorage.getItem('csb-table'));
                    $('.hiddentable tr:last').after(`<tr><td>${datet}</td><td>${namet}</td><td>${roadt}</td><td>${timest}</td><td>${countst}</td><td>${timeendt}</td><td>${countendt}</td><td>${course} km</td><td>${fuelinfo}</td></tr>`);
                    localStorage.setItem('csb-table', $(".hiddentable").html());
                }
                localStorage.setItem("csb-prevkmcount", countendt);
                localStorage.removeItem("csb-c-destination");
                localStorage.removeItem("csb-c-startplace");
                localStorage.removeItem("csb-c-name");
                localStorage.removeItem("csb-c-time");
                localStorage.removeItem("csb-c-count");    
                $(".continue").hide();
                checkToEnable();
                
            }else{
                $(".error-continue").show();
            }
        }
    })
    $(".show-stats").click(function(){
        $('.sidenav').sidenav('close');
        $(".start").slideUp();
        $(".stats").delay(350).fadeIn();
        $(".showtable").html("<p class='flow-text'>Nothing to see.</p>");
        if(localStorage.getItem("csb-table") !== undefined && localStorage.getItem("csb-table") !== null){
            $(".exportoptions").show();
            $(".showtable").html(localStorage.getItem("csb-table"));
            $(".edittools").show();
        }else{
            $(".exportoptions").hide();
            $(".edittools").hide();
        }
    })
    $(".show-start").click(function(){
        $('.sidenav').sidenav('close');
        $(".stats").slideUp();
        $(".start").delay(350).fadeIn();
        $("tr").removeClass('cursor');
        $("tr").removeClass('selected');
        select = false;
    })
    $(".delete-table-btn").click(function(){
        localStorage.removeItem("csb-table");
        $(".stats").hide();
        checkToEnable();
    })
    $(".removeselectedtable").click(function(){
        $("tr").last().remove();
        if($(".showtable").html() == "<table><tbody></tbody></table>"){
            localStorage.removeItem("csb-table");
        }else{
            localStorage.setItem('csb-table', $(".showtable").html());
        }
    })
    $(".print").click(function(){
        $("table").attr('border', 1);
        var divToPrint=document.getElementById("toprint");
        newWin= window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
        $("table").removeAttr("border");
    })
    $(".exporttable").click(function(){
        var reg = localStorage.getItem("csb-id");
        var wb = XLSX.utils.table_to_book(document.getElementById('tabletoprint'), {sheet:reg});
        var wbout = XLSX.write(wb, {bookType:'xlsx', bookSST:true, type: 'binary'});
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), `CSB - ${reg}.xlsx`);
    })
    $(".lk-logo").click(function(){
        window.open("https://leszekk.eu")
    })
});