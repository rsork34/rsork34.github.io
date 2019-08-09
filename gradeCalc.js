const NUM_ROWS = 5;
let curRows = 0;

$(document).ready(function () {
    loadTable();
});

// Loads rows of grade input table
function loadTable() {
    // Delete all table rows
    $('#gradesInputTable tbody').empty();

    let tableHtmlString = '';

    // Load table rows
    for (let i = 0; i < NUM_ROWS; i++) {
        tableHtmlString += `<tr><td style="text-align:center;"><b>${i + 1}</b></td>`;
        tableHtmlString += `<td><input id="gradeInput${i}" type="number" min="0" placeholder="0.0"></td>`;
        tableHtmlString += `<td><input id="weightInput${i}" type="number" min="0" placeholder="0.0"></td></tr>`;
    }

    $('#gradesInputTable').append(tableHtmlString);
    curRows = NUM_ROWS;
}

function validateRow(mark, weight, line) {
    /* Ensure both fields are entered per row */
    // Both fields are empty or weight 0 so grade does not factor in - skip row
    if ((mark.length === 0 && weight.length === 0) || (weight === 0)) {
        return 'skip';
    }
    else if (mark.length === 0 && weight.length !== 0) {
        alert('Missing mark on line ' + line);
        return 'invalid';
    }
    else if (mark.length !== 0 && weight.length === 0) {
        alert('Missing weight on line ' + line);
        return 'invalid';
    }

    // Validate input
    if (mark < 0) {
        alert('Invalid Mark On Line ' + line);
        return 'invalid';
    }
    else if (weight < 0) {
        alert('Invalid Weight On Line ' + line);
        return 'invalid';
    }

    return 'valid';
}

function calculateGrade() {
    let totalWeight = 0;
    let weightedGrade = 0;

    // Minus one to ignore the header row
    let numRows = $('#gradesInputTable tr').length - 1;

    for (let i = 0; i < numRows; i++) {
        // Mark and weight for current row
        let curMark = $(`#gradeInput${i}`).val();
        let curWeight = $(`#weightInput${i}`).val();

        // Validate input
        // Skip row if weight is 0
        let validInput = validateRow(curMark, curWeight, (i + 1));
        if (validInput === 'skip') {
            continue;
        }
        else if (validInput === 'invalid') {
            return;
        }

        curMark = parseFloat(curMark);
        curWeight = parseFloat(curWeight);

        // Don't count grades with no weight
        if (curWeight === 0) {
            continue;
        }

        // Used for final calculation
        weightedGrade += (curWeight * curMark);
        totalWeight += curWeight;
    }

    // Invalid input
    if (isNaN(totalWeight) || totalWeight === 0) {
        alert('Please Enter Valid Weight(s)');
        return;
    }
    // Invalid weight entered
    else if (totalWeight > 100) {
        alert('Total weight of grades must be 100. You entered: ' + totalWeight);
        return;
    }

    // Calculate final grade
    let finalGrade = weightedGrade / totalWeight;
    alert('Final Grade: ' + finalGrade);
}

function resetInput() {
    loadTable();
}

function addRow() {
    let newRowHtml = '';

    curRows++;

    newRowHtml += `<tr><td style="text-align:center;"><b>${curRows}</b></td>`;
    newRowHtml += `<td><input id="gradeInput${curRows}" type="number" min="0" placeholder="0.0"></td>`;
    newRowHtml += `<td><input id="weightInput${curRows}" type="number" min="0" placeholder="0.0"></td></tr>`;

    $('#gradesInputTable').append(newRowHtml);
}