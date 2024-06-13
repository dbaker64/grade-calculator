let grades = [];
let numGrades = 0;

//document set-up
const newGradeBtn = document.querySelector("#new-grade-btn");
newGradeBtn.addEventListener("click", function () {
    createGradeModule();
});
const gradesContainer = document.querySelector("#grades-container");

//grade object constructor
function Grade(num, den, type, exempt, id){
    this.num = parseInt(num);
    this.den = parseInt(den);
    this.type = parseInt(type);
    this.exempt = exempt;
    this.id = parseInt(id);
}

//function to add a grade
function makeGrade(n,d,t,e,i){
    let newGrade = new Grade(n,d,t,e,i);
    numGrades++;
    grades.push(newGrade);
    console.table(grades);
}

//creating grade module
function createGradeModule() {
    let gradeIndex = numGrades;
    let gradeForm = document.createElement("form");
    gradeForm.setAttribute("id",`${numGrades}-form`);

    let gradeDiv = document.createElement("div");
    gradeDiv.setAttribute("class",`${numGrades} grade-container`);
    gradeForm.appendChild(gradeDiv);

    let valueDiv = document.createElement("div");
    valueDiv.setAttribute("class",`${numGrades} value-container`);
    gradeDiv.appendChild(valueDiv);

        let numDiv = document.createElement("div");
        numDiv.setAttribute("class",`${numGrades} num-container`);
        valueDiv.appendChild(numDiv);

            let numInput = document.createElement("input");
            numInput.setAttribute("type","number");
            numInput.setAttribute("id",`${numGrades}-num-input`);
            numInput.setAttribute("class","val-input");
            numDiv.appendChild(numInput);

        let divDiv = document.createElement("div");
        divDiv.setAttribute("class",`${numGrades} div-container`);
        divDiv.innerText = "/";
        valueDiv.appendChild(divDiv);

        let denDiv = document.createElement("div");
        denDiv.setAttribute("class",`${numGrades} den-container`);
        valueDiv.appendChild(denDiv);

            let denInput = document.createElement("input");
            denInput.setAttribute("type","number");
            denInput.setAttribute("id",`${numGrades}-den-input`);
            denInput.setAttribute("class","val-input");
            denDiv.appendChild(denInput);

    let optionDiv = document.createElement("div");
    optionDiv.setAttribute("class",`${numGrades} option-container`);
    gradeDiv.appendChild(optionDiv);

        let typeDiv = document.createElement("div");
        typeDiv.setAttribute("class",`${numGrades} type-container`);
        optionDiv.appendChild(typeDiv);

            let radioHTML = `
                <div>
                    <input name="${numGrades} type" type="radio" id=${numGrades}+"-quarter" value="0">
                    <label for=${numGrades}+"-quarter">Quarter/Final</label>
                </div>
                <div>
                    <input name="${numGrades} type" type="radio" id=${numGrades}+"-major" value="1">
                    <label for=${numGrades}+"-major">Major</label>
                </div>
                <div>
                    <input name="${numGrades} type" type="radio" id=${numGrades}+"-minor" value="2">
                    <label for=${numGrades}+"-minor">Minor</label>
                </div>
            `;
            typeDiv.innerHTML = radioHTML;

        let exemptDiv = document.createElement("div");
        exemptDiv.setAttribute("class",`${numGrades} exempt-container`);

            let exemptBoxDiv = document.createElement("div");
            exemptDiv.appendChild(exemptBoxDiv);

            let exemptBox = document.createElement("input");
            exemptBox.setAttribute("type","checkbox");
            exemptBox.setAttribute("id",`${numGrades}-exempt-box`);
            exemptBoxDiv.appendChild(exemptBox);

            let exemptBoxLabel = document.createElement("label");
            exemptBoxLabel.setAttribute("for",`${numGrades}-exempt-box`);
            exemptBoxLabel.innerText = "Exempt";
            exemptBoxDiv.appendChild(exemptBoxLabel);

            let saveButton = document.createElement("button");
            saveButton.setAttribute("id",`${numGrades}-save-button`);
            saveButton.setAttribute("type","submit");
            saveButton.setAttribute("form",`${numGrades}-form`);
            saveButton.setAttribute("class","save-btn")
            saveButton.innerText = "Save";
            saveButton.addEventListener("click",() => {
                event.preventDefault();
                let num = numInput.value;
                let den = denInput.value;
                let type = displayRadioValue(parseInt(numGrades));
                let exempt;
                if(exemptBox.checked == true){
                    exempt = true;
                }else{
                    exempt = false;
                }
                let index = gradeIndex;
                if(gradeIndex >= numGrades){
                    makeGrade(num,den,type,exempt,index);
                    updateGrade();
                }else{
                    grades[gradeIndex].num = parseInt(num);
                    grades[gradeIndex].den = parseInt(den);
                    grades[gradeIndex].type = parseInt(displayRadioValue(parseInt(numGrades-1)));
                    grades[gradeIndex].exempt = exempt;
                    grades[gradeIndex].id = parseInt(index);
                    console.table(grades);
                    updateGrade();
                }
            })
            exemptDiv.appendChild(saveButton);

        optionDiv.appendChild(exemptDiv);

    gradesContainer.appendChild(gradeForm);
}

function displayRadioValue(id) {
    let ele = document.getElementsByName(id+' type');
    console.log(id+" type");
    console.log(ele);

    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked)
            return ele[i].value;
    }
}

//AP vs Honors Class
function isAPClass() {
    let checkbox = document.querySelector("#ap");
    if(checkbox.checked == true){
        return true;
    }else{
        return false;
    }
}

//CALCULATE THE GRADE
function calcGrade() {
    let majorMod = 0.6;
    let minorMod = 0.4;
    let output = 0;

    if(isAPClass()){//converts modifiers to use AP ones
        majorMod = 0.7;
        minorMod = 0.3;
    }else{
        majorMod = 0.6;
        minorMod = 0.4;
    }

    let quarterGradeArr = [];
    let majorGradeArr = [];
    let minorGradeArr = [];

    for(let i = 0; i < grades.length; i++){//distributes grades accordingly
        if(grades[i].type == 0){
            quarterGradeArr.push(grades[i]);
        }else if(grades[i].type == 1){
            majorGradeArr.push(grades[i]);
        }else{
            minorGradeArr.push(grades[i]);
        }
    }

    let quarterSubAvg = 0;
    let majorSubAvg = 0;
    let minorSubAvg = 0;
    let quarterNum = 0;
    let quarterDen = 0;
    let majorNum = 0;
    let majorDen = 0;
    let minorNum = 0;
    let minorDen = 0;

    if(quarterGradeArr.length != 0){
        for(let i = 0; i < quarterGradeArr.length; i++){
            quarterNum += quarterGradeArr[i].num;
            quarterDen += quarterGradeArr[i].den;
        }
        quarterSubAvg = quarterNum / quarterDen;
    }

    if(majorGradeArr.length != 0){
        for(let i = 0; i < majorGradeArr.length; i++){
            majorNum += majorGradeArr[i].num;
            majorDen += majorGradeArr[i].den;
        }
        majorSubAvg = majorNum / majorDen;
    }

    if(minorGradeArr.length != 0){
        for(let i = 0; i < minorGradeArr.length; i++){
            minorNum += minorGradeArr[i].num;
            minorDen += minorGradeArr[i].den;
        }
        minorSubAvg = minorNum / minorDen;
    }

    if(quarterSubAvg != 0){
        output = quarterSubAvg;
    }else if(majorGradeArr.length === 0){
        output = minorSubAvg;
    }else if(minorGradeArr.length === 0){
        output = majorSubAvg;
    }else{
        output = (majorSubAvg * majorMod) + (minorSubAvg * minorMod);
    }
    return (output * 100).toFixed(2);
}

//UPDATING THE DISPLAYS
function updateGrade() {
    let overallGrade = calcGrade();
    const display = document.querySelector("#grade-display");
    display.innerText = overallGrade+"%";
}

//showing instructions
const instructionsButton = document.querySelector("#show-instructions");
const instructionsModal = document.querySelector("#instructions-modal");
instructionsButton.addEventListener("click", () => {
    instructionsModal.showModal();
})