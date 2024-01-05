// Arrays to store the state of each circle
let blueA = [];
let redA = [];
let blackA = [];
let yellowA = [];

//const validIndices = [20,21,22,33,34,50,51,56,58,69,70,74,75,78,79,115,120,121,126,127,137,138,141,142,143,152,153,165,166,177,178,193,194,204,205,218,219,220,228,229,230,231,232,233,234,269,270,271,275,276,277,285,286,289,290,293,294,301,302,303,312,313,327,328,329,339,340,341,352,353,354];

// Timer variables
let startTime;
let lastUpdateTime = 0;
let isExperimentRunning = false;

const audioPlayer = document.getElementById('audioPlayer');

// Function to update arrays based on the clicked circle
function updateArrays(circleId) {
    //blueA.push(circleId === 'blue' ? 1 : 0);
    //redA.push(circleId === 'red' ? 1 : 0);
    //blackA.push(circleId === 'black' ? 1 : 0);
    //yellowA.push(circleId === 'yellow' ? 1 : 0);

    const elapsedTime = getElapsedTime();
    switch(circleId) {
      case "blue":
        blueA.push(elapsedTime);
        break;
      case "red":
        redA.push(elapsedTime);
        break;
      case "black":
        blackA.push(elapsedTime);
        break;
      case "yellow":
        yellowA.push(elapsedTime);
        break;

    }


  }

// Function to handle circle clicks
function handleCircleClick(event) {
  const clickedCircleId = event.target.id;

  // Update arrays based on the clicked circle
  if(isExperimentRunning){
    updateArrays(clickedCircleId);
  }
  

  // Log the updated arrays (you can replace this with any other logic)
  console.log('blueA:', blueA);
  console.log('redA:', redA);
  console.log('blackA:', blackA);
  console.log('yellowA:', yellowA);

}

//function runUpdate() {
//  if (isExperimentRunning) {
//        updateArrays('none');
//      }
//    }



// Function to start the timer
function startTimer() {
    startTime = new Date().getTime();
  }
  
  // Function to get the elapsed time
  function getElapsedTime() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    return elapsedTime;
  }

  function handleStartButtonClick() {
    if (!isExperimentRunning) {
      isExperimentRunning = true;
      startTimer();

      
      audioPlayer.play();

      var button = document.getElementById("startButton");
      button.disabled = true;
    }
  }

  function handleAudioEnd() {
    isExperimentRunning = false;
    //var result = getCorrectAnswers(redA, validIndices);
    //document.getElementById('resultsBox').innerText = 'Nombre de réponses correctes: ' + result;
    exportToCSV();
  }

  function exportToCSV() {
     //Combine arrays into a single array of arrays
    const data = [blueA, redA, blackA, yellowA];

     //Create a CSV content string
    //const csvContent = data.map(row => row.join(',')).join('\n');
    const csvContent = data.map(row => row.map(cell => cell.toFixed(2)).join(',')).join('\n');

    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a download link and trigger the download
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'experiment_data.csv';
    link.click();
  }

  //function getCorrectAnswers(redA, validIndices) {
    // Find the indices of '1' in array X
    //var indicesOfOnes = [];
    //for (var i = 0; i < redA.length; i++) {
      //if (redA[i] === 1) {
        //indicesOfOnes.push(i);
      //}
    //}
  
    //var validIndicesOfOnes = indicesOfOnes.filter(function(index) {
      //return validIndices.includes(index);
    //});
  
    // Compare the two arrays and count correct answers
    //var correct_ans = 0;
    //var smallerArray = validIndicesOfOnes.length <= indicesOfOnes.length ? validIndicesOfOnes : indicesOfOnes;
    //for (var j = 0; j < smallerArray.length; j++) {
      //if (indicesOfOnes.includes(validIndicesOfOnes[j])) {
        //correct_ans++;
      //}
    //}
  
    //return correct_ans;
  //}

  //function askForName() {
    //const userName = window.prompt("Dans ce test, vous devez cliquer sur le cercle rouge lorsque vous entendez le mot 'rouge'. NE cliquez PAS sur les autres cercles même si vous entendez leurs couleurs");
    
    
    //if (userName) {
    //    alert('Bonjour, ' + userName + '!'); // Display a greeting with the entered name
    //} else {
    //    alert('Vous n\'avez pas entré de nom.'); // Inform the user that no name was entered
    //}
//}

//askForName();

  // Start the timer when the page loads

  window.alert("Dans ce test, vous devez cliquer sur le cercle rouge lorsque vous entendez le mot 'rouge'. NE cliquez PAS sur les autres cercles même si vous entendez leurs couleurs.");
  
  document.getElementById('blue').addEventListener('click', handleCircleClick);
  
  document.getElementById('red').addEventListener('click', handleCircleClick);
  
  document.getElementById('black').addEventListener('click', handleCircleClick);
  
  document.getElementById('yellow').addEventListener('click',handleCircleClick);

  document.getElementById('startButton').addEventListener('click', handleStartButtonClick);

  audioPlayer.addEventListener('ended', handleAudioEnd);

// Log elapsed time every second
//setInterval(runUpdate, 500);