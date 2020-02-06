//Sending a message to content script
document.addEventListener('DOMContentLoaded', documentEvents , false);

function changeColor(color){
  let line = document.getElementsByTagName('hr');
  for(let i = 0;i < 4;i++){
    line[i].style.borderColor = "black";
  }
}

function documentEvents(){
  //Get value of checkbox
  const checkbox = document.getElementById('check');
  //Get value of power button
  const powerbutton = document.getElementById('onoff');

  //Get dropdown elements for cart number
  const shipCart = document.getElementById('shipNum');
  const mpkCart = document.getElementById('mpkNum');

  //Get currently set cart number values from chrome storage
  chrome.storage.local.get(['mpkNum'],function(result){
    mpkCart.value = result.mpkNum;
  })
  chrome.storage.local.get(['shipNum'],function(result){
    shipCart.value = result.shipNum;
  })
  chrome.storage.local.get(['checkbox'],function(result){
    let type = document.getElementById('imagingType');
    checkbox.checked = result.checkbox;
    if(checkbox.checked ==  false){
      type.innerText = 'Standard Imaging';
    }
    else if(checkbox.checked == true){
      type.innerText = 'Loaner Imaging';
    }
  })
  chrome.storage.local.get(['onoff'],function(result){
    console.log(result.onoff);
    let power = document.getElementById('onoff');
    let powerbutton = document.getElementsByClassName('onoffbtn')[0];
    power.checked = result.onoff;
    console.log(power.checked);
    if(power.checked == false){
      powerbutton.style.opacity = "1";
    }
    else if(power.checked == true){
      powerbutton.style.opacity = "0.25";
    }
  })

  //Department
  const department = document.getElementById('depart');
  department.addEventListener('change',function(){
    if(department.value == "Shipping"){
      window.location = "popup2.html";
    }
  })
  //Check for power checkbox
  const powercheck = document.getElementById('onoff');
  console.log("pwer check is  " + powercheck.checked);
  powercheck.addEventListener('change',function(){
    power = document.getElementsByClassName('onoffbtn')[0];
    if(powercheck.checked == false){
      power.style.opacity = "1";
    }
    else if(powercheck.checked == true){
      power.style.opacity = "0.25";
    }
    chrome.storage.local.set({'onoff':powercheck.checked},function(){
      console.log("Power button is set to" + powercheck.checked);
    })
  });


  //Event Listener for Standard and Loaner Imaging Toggle Button
  checkbox.addEventListener('change',function(){
    let checkbox = document.getElementById('check');
    let type = document.getElementById('imagingType');

    console.log('Checkbox is now ' + checkbox.checked);
    if(checkbox.checked ==  false){
      type.innerText = 'Standard Imaging';
      changeColor("#40A9E9");
    }
    else if(checkbox.checked == true){
      type.innerText = 'Loaner Imaging';
      changeColor("#F0694C");
    }
    chrome.storage.local.set({'checkbox': checkbox.checked},function(){
      console.log('Checkbox is set to ' + checkbox.checked);
    })
  })

  //Pull currently select values froma cache and set it to the currently selected in select tag
  const submit = document.getElementById('sbtn');

  submit.addEventListener('click',function(){
    const shipCart = document.getElementById('shipNum');
    const mpkCart = document.getElementById('mpkNum');

    //Set Cart values in chrome.storage
    chrome.storage.local.set({'shipNum': shipCart.value},function(){
      console.log('Shipping num is set to ' + shipCart.value);
    });
    chrome.storage.local.set({'mpkNum': mpkCart.value},function(){
      console.log('MPK num is set to ' + mpkCart.value);
    });
    const powercheck = document.getElementById('onoff');
    console.log("pwer check is  " + powercheck.checked);
  })


}
