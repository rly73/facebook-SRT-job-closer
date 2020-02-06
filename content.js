"use strict"

var mpk = ['MPK','FRE','SFO','SAF0','SUN','MVW'];
var mNum = '';
var sNum = '';
var count = 0;
var toggle = '';
var imageType = '';


function init(){
  chrome.storage.local.get(['onoff'],function(result){
    toggle = result.onoff;
    chrome.storage.local.get(['checkbox'],function(result){
      imageType = result.checkbox;
    })
    if(toggle == false){ //Check if powerbutton is OFF or ON

      var interval0 = setInterval(function(){

        const DASHBOARD = document.getElementsByClassName('_276g _23_w')[3];
        const QUEUE = document.getElementsByClassName('_58al')[1];

        if(typeof DASHBOARD !== 'undefined'){
          clearInterval(interval0);
          DASHBOARD.click();
          //Click on case number input
          const INPUT = document.getElementsByClassName('_40af _40ag')[0];
          var currentInputValue = INPUT.value;
          //Highlight text
          INPUT.setSelectionRange(0,100,"backward");

          //action after user scans in case number
          INPUT.addEventListener('focusout',function(){
            var endInputValue = INPUT.value;
            if(currentInputValue === endInputValue){
              init();
            }else{
              console.log("start click");
              var interval = setInterval(function(){
                const elem = document.getElementsByClassName('_olh')[0];
                if(typeof elem !== 'undefined') {
                  clearInterval(interval);

                    const jobs = document.getElementsByClassName('_2e42 _2yh_ _2yia');
                    var location = document.getElementsByClassName('_2e42 _2yia');
                    let i = 0;
                    console.log(i);
                    while( i < 20 ){
                      if(jobs[i].innerText === ""){
                        var num = 9 * (i + 1) - 3;
                        var loca = location[num].innerText;
                        var j = 0;
                        while(j < 6){
                            if(loca.includes(mpk[j])){
                              j = 8;
                              chrome.storage.local.set({'loca': 'MPL-I-X-Outbound-B'});
                            }
                            else{
                              j++;
                              chrome.storage.local.set({'loca': 'MPL-I-X-Outbound-C'});
                            }
                        }
                        if(j === 6){
                          chrome.storage.local.set({'loca': 'MPL-I-X-Outbound-C'});
                        }
                        jobs[i].click();
                        i = 20;
                      }

                      i++;
                    }

                }
              },250);
            }
          })
        } //Click on the Case Number Input Box
        else if(typeof QUEUE !== 'undefined'){ //Outbound DASHBOARDboard page
          clearInterval(interval0);
          let input = document.querySelectorAll("a[data-hovercard]");
          if(input.length === 1){
            //If there is a password reset task
            if(confirm("Task Found Don't Close The Job. Put Aside The Device. Press cancel to go back. Press OK to continue closing")){

            }else{
              window.history.back();
            }
          } //If there is password reset

          //If there is a no password reset task
          var outbound = document.getElementsByClassName('_58al')[1];
          outbound.click();
          if(imageType == true){
            chrome.storage.get(['loca'],function(result){
              locator = result.loca;
            })
          }
          else if(imageType == false){
            var location = document.getElementsByClassName('_68tl')[15].getElementsByClassName('ellipsis')[0].innerHTML;
            if(location.includes('IT')){
              location = document.getElementsByClassName('_68tl')[14].getElementsByClassName('ellipsis')[0].innerHTML;
            }
            let i = 0;
            while(i < 6){
              if(location.includes(mpk[i])){
                i = 8;
                chrome.storage.local.get(['mpkNum'],function(result){
                  mNum = result.mpkNum;
                  outbound.value = 'MPL-I-X-Outbound-B' + mNum + ' ' ;
                })
              }
              else{
                i++;
              }
            }
            if(i === 6){
              chrome.storage.local.get(['shipNum'],function(result){
                sNum = result.shipNum;
                outbound.value = 'MPL-I-X-Outbound-C' + sNum + ' ';
              })
            }
          }
          outbound.onchange = function(){
            if(imageType == true){
              setTimeout(function(){document.getElementsByClassName('_271k _271m _1qjd _7tvm _7tv2 _7tv4')[1].click();},1000);
            }
            else if(imageType == false){
              setTimeout(function(){document.getElementsByClassName('_271k _271m _1qjd _7tvm _7tv2 _7tv4')[2].click();},1000);
            }
            var interval = setInterval(function(){
              const elem = document.getElementsByClassName('_6tbn')[0];
              console.log(elem);
              if(typeof elem !== 'undefined') {
                clearInterval(interval);
                window.history.back();
              }
            },1500);
          }
        }
      },250)
    }
  })
}

init();
