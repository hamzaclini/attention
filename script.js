document.addEventListener("DOMContentLoaded", function() {
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let changeBtns = document.querySelectorAll('.changable');
    const btnStart = document.getElementById("start");
    const timerElement = document.getElementById('timer');
    const btnInt = document.getElementById('notRelated');
    const btnDoub = document.getElementById('double');
    const btnSave = document.getElementById('save');
    const title = document.getElementById('title');
    const btnPause = document.getElementById('pause');
    const RLcheckboxes = document.querySelectorAll('.rl-checkbox');
    const RIcheckboxes = document.querySelectorAll('.ri-checkbox');
    const doubleT = document.getElementById('doubleT');
    const intrT = document.getElementById('notRelatedT');

    let timerInterval;
    let experimentStartTime; 
    let elapsedSeconds = 0;
    let times = [];
    let intrusions = 0;
    let doublons = 0;
    let count = 1;
    let intrusionsList = [];
    let doubleList = [];
    let RLcheckedCount = 0;
    let RIcheckedCount = 0;
    let RIcheckedCountList = [];
    let RLcheckedCountList = [];
    totalList = [];
    
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                // Uncheck other checkboxes in the same row
                let row = this.closest('tr'); // Get the closest parent row (tr)
                let otherCheckboxes = row.querySelectorAll('input[type="checkbox"]');
                otherCheckboxes.forEach(function(cb) {
                    if (cb !== checkbox) {
                        cb.checked = false;
                    }
                });
            }
        });
    });

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
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].classList.remove("disabledCheckbox");
        }
        for (let i = 0; i < changeBtns.length; i++) {
            changeBtns[i].classList.remove("disabledBtn");
        }
        btnStart.innerHTML = "Re-commence";
    });

    btnInt.addEventListener("click", function(){
        intrusions ++;
        intrT.textContent = intrusions + ' intrusions';
    })

    btnDoub.addEventListener("click", function(){
        doublons++;
        doubleT.textContent = doublons + ' doublons';
    })

    btnPause.addEventListener("click", function(){
        clearInterval(timerInterval); 
    })

    btnSave.addEventListener("click",function(){
        doubleList.push(doublons);
        doublons = 0;

        intrusionsList.push(intrusions);
        intrusions = 0;

        RIcheckboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                RIcheckedCount++;
            }
        });
        RIcheckedCountList.push(RIcheckedCount);
        


        RLcheckboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                RLcheckedCount++;
            }
        });
        RLcheckedCountList.push(RLcheckedCount);
        
        totalList.push(RIcheckedCount+RLcheckedCount);
        
        RIcheckedCount = 0;
        RLcheckedCount = 0;


        times.push(elapsedSeconds);

        if(count===4) {
            hideEverythingExceptTable();
            generateTable();
        }


        clearInterval(timerInterval);
        count ++;
        title.textContent = `Rappel ${count}`;
        btnStart.innerHTML = "Commence";
        timerElement.textContent = '120 seconds';
        for (let i = 0; i < changeBtns.length; i++) {
            changeBtns[i].classList.add("disabledBtn");
        }
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
            checkbox.classList.add("disabledCheckbox");
        });
        intrT.textContent = "0 intrusions"
        doubleT.textContent = "0 doublons"

        console.log(RLcheckedCountList, RIcheckedCountList, doubleList, intrusionsList)
        

    })


    function generateTable() {
        const rappels = ["Rappel 1", "Rappel 2", "Rappel 3", "Rappel 4"];
        const table = document.createElement('table');
    
        const headerRow = table.insertRow();
        const headers = ["", "RL", "RI", "Total", "Intrusions", "Doublons", "Temps"];
        headers.forEach(headerText => {
            const headerCell = headerRow.insertCell();
            headerCell.textContent = headerText;
        });
    
        // Populate the table with data
        for (let i = 0; i < Math.max(rappels.length, RLcheckedCountList.length, RIcheckedCountList.length, totalList.length, intrusionsList.length, doubleList.length, times.length); i++) {
            const row = table.insertRow();
            const rappelCell = row.insertCell();
            rappelCell.textContent = rappels[i] || '';
    
            const RLCell = row.insertCell();
            RLCell.textContent = RLcheckedCountList[i] || '';

            const RICell = row.insertCell();
            RICell.textContent = RIcheckedCountList[i] || '';
    
            const totalCell = row.insertCell();
            totalCell.textContent = totalList[i] || '';

            const intCell = row.insertCell();
            intCell.textContent = intrusionsList[i] || '';

            const doubCell = row.insertCell();
            doubCell.textContent = doubleList[i] || '';

            const timeCell = row.insertCell();
            timeCell.textContent = times[i] || '';
        }
    
        // Append the table to the table container
        const tableContainer = document.getElementById('tableContainer');
        tableContainer.innerHTML = ''; // Clear previous table
        tableContainer.appendChild(table);
    }

    function hideEverythingExceptTable() {
        const body = document.body;
        Array.from(body.children).forEach(element => {
            if (element !== tableContainer) {
                element.style.display = 'none';
            }
        })
        }

    
});
