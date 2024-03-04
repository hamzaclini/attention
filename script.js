document.addEventListener('DOMContentLoaded', function () {
    const timerElement = document.getElementById('timer');
    const btnStart = document.getElementById("start");
    const btnPause = document.getElementById("pause");
    const btnSave = document.getElementById("save");
    const textInput1 = document.getElementById("textbox1");
    const textInput2 = document.getElementById("textbox2");
    const uniqueCont = document.getElementById("unique");
    const textInput3 = document.getElementById("textbox3");
    const title = document.getElementById("title");
    let count = 1;
    
    let experimentStartTime; 
    let elapsedSeconds = 0;
    let timerInterval;
    let errors = [];
    let corrected_errors = [];
    let forced_errors = [""];

    function updateTimer() {
        const currentTime = Date.now();
        elapsedSeconds = Math.floor((currentTime - experimentStartTime) / 1000);
        let remainingSeconds = 120 - elapsedSeconds;
        
        if (remainingSeconds <= 0) {
            clearInterval(timerInterval); 
        }

        if (remainingSeconds <= 10) {
            timerElement.style.color = 'red'; 
        }
        
        timerElement.textContent =  remainingSeconds + ' seconds';
        console.log(remainingSeconds);
    }

    
    btnStart.addEventListener("click", function(){
        clearInterval(timerInterval);
        timerElement.textContent = '120 seconds'
        experimentStartTime = Date.now();
        timerInterval = setInterval(updateTimer, 1000);
        btnStart.innerHTML = "Re-commence";
    });

    
    btnPause.addEventListener("click", function(){
        clearInterval(timerInterval); 
        let inputGroups = document.querySelectorAll(".disabled-label, .disabled-input");
        for (let i = 0; i < inputGroups.length; i++) {
            inputGroups[i].classList.remove("disabled-label", "disabled-input");
        }
    })

    
    btnSave.addEventListener("click", function(){
        console.log(count)
        errors.push(textInput1.value.trim());
        corrected_errors.push(textInput2.value.trim());
        if (count ===2){
            forced_errors.push(textInput3.value.trim())
            hideEverythingExceptTable();
            generateTable();
        }
        console.log(errors, corrected_errors, forced_errors);
        
        count ++;
        btnStart.innerHTML = "Commence";
        uniqueCont.style.display = 'flex';
        textInput1.value = "";
        textInput2.value = "";
        timerElement.textContent = '120 seconds';
        title.textContent = "Partie B";
        const labels = document.querySelectorAll('label');
        for (let i = 0; i < labels.length; i++) {
            labels[i].classList.add("disabled-label");
        }
        const inputs = document.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.add("disabled-input");
        }


        

        
    });

    function hideEverythingExceptTable() {
        const body = document.body;
        Array.from(body.children).forEach(element => {
            if (element !== tableContainer) {
                element.style.display = 'none';
            }
        })
        }

        function generateTable() {
            const parties = ["Partie A", "Partie B"];
            const table = document.createElement('table');
        
            const headerRow = table.insertRow();
            const headers = ["Partie", "Erreurs", "Erreurs corrigées", "Erreurs persévératives"];
            headers.forEach(headerText => {
                const headerCell = headerRow.insertCell();
                headerCell.textContent = headerText;
            });
        
            // Populate the table with data
            for (let i = 0; i < Math.max(parties.length, errors.length, corrected_errors.length, forced_errors.length); i++) {
                const row = table.insertRow();
                const partyCell = row.insertCell();
                partyCell.textContent = parties[i] || '';
        
                const errorCell = row.insertCell();
                errorCell.textContent = errors[i] || '';
        
                const correctedErrorCell = row.insertCell();
                correctedErrorCell.textContent = corrected_errors[i] || '';
        
                const forcedErrorCell = row.insertCell();
                forcedErrorCell.textContent = forced_errors[i] || '';
            }
        
            // Append the table to the table container
            const tableContainer = document.getElementById('tableContainer');
            tableContainer.innerHTML = ''; // Clear previous table
            tableContainer.appendChild(table);
        }
        
        
    
});