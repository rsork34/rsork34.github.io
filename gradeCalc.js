const NUM_ROWS = 10;

class grade {
    constructor(mark, weight) {
        this.mark = mark;
        this.weight = weight;
    }
}

$(document).ready(function () { 
    
});

// Loads rows of grade input table
function loadTable() {
    // Delete all table rows
    $('#gradesInputTable tbody').empty();

    let tableHtmlString = '';

    // Load table rows
    for (let i = 0; i < NUM_ROWS; i++) {
        tableHtmlString += `<tr><td>${i + 1}</td>`;
        tableHtmlString += `<td><input type="number" placeholder="0.0"></td>`;
        tableHtmlString += `<td><input type="number" placeholder="0.0"></td></tr>`;
    }

    $('#gradesInputTable').append(tableHtmlString);
}

function calculateGrade() {
    let gradeArray = [];
    let inputFields = document.getElementById("inputForm");
    let totalWeight = 0;
    let weightedGrade = 0;

    // Add each row of grade/weight to array of grades
    for (let i = 0, j = 0; i < inputFields.length; i+= 2, j++) {
        let tempGrade = new grade(inputFields[i].value, inputFields[i + 1].value / 100);

        // Don't count grades with no weight
        if (tempGrade.weight <= 0) {
            continue;
        }

        weightedGrade += parseFloat(tempGrade.weight) * parseFloat(tempGrade.mark);
        totalWeight += parseFloat(tempGrade.weight);
        gradeArray.push(tempGrade);
    }

    // Calculate final grade
    let finalGrade = weightedGrade / totalWeight;
    
    // Invalid input
    if (isNaN(totalWeight) || totalWeight == 0) {
        document.getElementById("p1error").innerHTML = "Please Enter Valid Weight(s)";
        return;
    }
    // Invalid weight entered
    else if (totalWeight > 1 || totalWeight < 0) {
        document.getElementById("p1error").innerHTML = "Total weight of grades is too high";
        return;
    }

    document.getElementById("p1error").innerHTML = "Grade: " + finalGrade.toPrecision(4);

}

function resetInput() {
    let inputFields = document.getElementById("inputForm");

    for (i = 0; i < inputFields.length; i++) {
        inputFields[i].value = 0;
        inputFields[i].weight = 0;
    }
}