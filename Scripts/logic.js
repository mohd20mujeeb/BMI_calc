window.addEventListener('load', bindEvents);
function bindEvents(){
    document.querySelector('#compute').addEventListener('click', takeInput);
    document.querySelector('#weight').addEventListener('input', updateWeight);
}
function takeInput(){
    const age = parseInt(document.querySelector('#age').value);
    const gender = getGender();
    
    const weight = document.querySelector('#weight').value;
    const height = document.querySelector('#height').value;
    console.log('Age is ', age, ' Gender is ', gender, 'Height ', height, ' Weight ', weight);
    computeBMI(weight, height);
}
function updateWeight(){
    // weight-output
    const slider = this;
    document.querySelector('#weight-output').innerText = slider.value;
}
function getGender(){
    const radio = document.querySelectorAll('input[name="gender"]');
    if(radio[0].checked){
        return radio[0].value;
    }
    else if(radio[1].checked){
        return radio[1].value;
    }
    else{
        return null;
    }
}
let angle=0;
let color="";
function computeBMI(weight, height){
    const heightInMeter = height/100;
    const bmi = weight / (heightInMeter * heightInMeter);
    const divResult = document.querySelector('#result');
    divResult.innerHTML = '';
    const h4 = document.createElement('h4');
    
    h4.innerText  = 'Your BMI is '+bmi.toFixed(0);
    divResult.appendChild(h4);

    const pTag = document.createElement('p');
    if(bmi<18.5){
        angle=45;
        color="blue";
        pTag.innerText='UnderWeight';
    }
    else if(bmi>=18.5 && bmi <=24.9){ 
        color="yellow";
        angle=90;
        pTag.innerText='Normal';
    }
    else if(bmi>=25 && bmi<=29.9){
        color="green";
        angle =120;
        pTag.innerText='OverWeight';
    }
    else if(bmi>=30 && bmi <=40){
        color="red";
        angle=150;
        pTag.innerText='Obesity ';
    }
    document.querySelector('#bmi-fill').style.stroke=color;
    divResult.appendChild(pTag);
    doUpdateBMIMeter();

    function doUpdateBMIMeter(){
  const needle = document.querySelector('#needle');
  const currentRotation= getNeedleRotation(needle);
  const steps= (angle-currentRotation)/100;
  let progress = 0;
  function moveNeedle(){
    if(progress < 100){
        progress++;
        const newRotation = currentRotation + steps * progress;
        needle.style.transform=`rotate(${newRotation}deg)`
        requestAnimationFrame(moveNeedle); 
    }
  }
  //first time
  requestAnimationFrame(moveNeedle);
    }
    function getNeedleRotation(needle){
        const transform=window.getComputedStyle(needle).getPropertyValue('transform');
        if(transform != 'none'){
          const values= transform.split('(')[1].split(')')[0].split(',');
          const a= values[0];
          const b = values[1];
          const radians=Math.atan(b,a);
          const degree = radians * (180/Math.PI);
          return degree < 0 ? degree + 360 : degree;
        }
    }


}