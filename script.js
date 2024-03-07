document.addEventListener("DOMContentLoaded", function () {
    let count;
    count = 1;
    var responses  = [];
    var actual = [];

    

    let start = document.getElementById("start");
    let main = document.getElementById("content");
    start.addEventListener("click", function (){
        if (count === 1) {
            count ++;
            main.style.display = 'none';
            document.getElementById("first").style.display = "none";
            document.getElementById("second").style.display = "block";
            surveyfn1();
        } else if (count === 2) {
            count ++;
            main.style.display = 'none';
            document.getElementById("second").style.display = "none";
            document.getElementById("third").style.display = "block";
            surveyfn2();
        } else if(count === 3) {
            count ++;
            main.style.display = 'none';
            document.getElementById("third").style.display = "none";
            document.getElementById("fourth").style.display = "block";
            surveyfn3();
        } else if(count === 4) {
            count ++;
            main.style.display = 'none';
            document.getElementById("fourth").style.display = "none";
            document.getElementById("fifth").style.display = "block";
            surveyfn4();
        } else if(count === 5) {
          count ++;
          main.style.display = 'none';
          document.getElementById("fifth").style.display = "none";
          //document.getElementById("start").innerHTML = "Affiche résultats";
          surveyfn5();


        } else if(count === 6) {
          console.log(responses.flat(Infinity));
          document.getElementById("start").style.display = 'none';
          let tableHTML = calculateConfusionMatrix();
          document.getElementById('confusionMatrixTable').innerHTML = tableHTML ;
          document.getElementById('confusionMatrixTable').style.display = 'block';
          save_csv();
        }


    });

        window.stop = function() {
          const elementsWithId = document.querySelectorAll('[id]');

        // Hide each element
        elementsWithId.forEach(element => {
          element.style.display = 'none';
        });
          let tableHTML = calculateConfusionMatrix();
          document.getElementById('confusionMatrixTable').innerHTML = tableHTML ;
          document.getElementById('confusionMatrixTable').style.display = 'block';
          save_csv();

    }

    let surveyfn1 = function(){
      function resetVariables() {
        selectedIds = [];
        currentRow = 1;
    }
    const changeBtn = document.querySelectorAll('.change');


    changeBtn.forEach(button => {
        button.addEventListener('click', function() {
          resetVariables();
        });
      })
    document.getElementById("surveyContainer1").style.display = "block";
    var currentRow = 1;
    function hideAllRowsExceptCurrent() {
      var allRows = document.querySelectorAll(".image-row");
      var allReps = document.querySelectorAll(".reponse-row");
      allRows.forEach(function (row, index) {
        row.style.display = index + 1 === currentRow ? "flex" : "none";
      });
      allReps.forEach(function (row, index) {
        row.style.display = index + 1 === currentRow ? "block" : "none";
      });
    }
    hideAllRowsExceptCurrent();
    
  
    function next() {
      var currentRowElement = document.getElementById("imageRow1" + currentRow);
      var currentReponseElement = document.getElementById("reponseRow1" + currentRow);
      var currentRowValues = currentReponseElement.querySelectorAll(
        'input[name="response' + currentRow + '"]:checked'
      );
      if (currentRowValues.length > 0) {
        currentRowValues.forEach(function (radio) {
          //responses.push(radio.value);
        });
        document.getElementById("backButton1").style.display = 'inline';
        currentRowElement.style.display = "none";
        currentReponseElement.style.display = "none";
        currentRow++;
        if (currentRow === 8) {
          document.getElementById("nextButton1").innerHTML = "Fin";
        }
        var nextRowElement = document.getElementById("imageRow1" + currentRow);
        var nextReponseElement = document.getElementById("reponseRow1" + currentRow);
  
        if (nextRowElement) {
          nextRowElement.style.display = "flex";
          nextReponseElement.style.display = "block";
  
        } else {
          console.log("No more rows");
          document.getElementById("surveyContainer1").style.display = "none";
          main.style.display = 'block';
          
        }
      } else {
        window.alert("Veuillez sélectionner une réponse avant de continuer.");
      }
      console.log("Responses:", responses);
    }
  
    function back() {
      var currentRowElement = document.getElementById("imageRow1" + currentRow);
      var currentReponseElement = document.getElementById("reponseRow1" + currentRow);
      
      currentRowElement.style.display = "none";
      currentReponseElement.style.display = "none";
      currentRow--;
      var prevRowElement = document.getElementById("imageRow1" + currentRow);
      var prevReponseElement = document.getElementById("reponseRow1" + currentRow);
      responses.pop();
      prevRowElement.style.display = "flex";
      prevReponseElement.style.display = "block";
      if(currentRow === 1) {
        document.getElementById("backButton1").style.display = 'none';
      }
    }
  
    document.getElementById("nextButton1").addEventListener("click", next);
    document.getElementById("backButton1").addEventListener("click", back);
    };

    // Function related to second test




    let surveyfn2 = function() {
      function resetVariables() {
        selectedImages.forEach(function(image) {
          image.classList.remove('highlighted');
         selectedImages = [];
        });
        selectedIds = [];
        currentRowIndex = 1;
    }
    const changeBtn = document.querySelectorAll('.change');


    changeBtn.forEach(button => {
        button.addEventListener('click', function() {
          resetVariables();
        });
      })
        const correct2 = [["J", "J"], ["T", "T"], ["T", "T"], ["N", "N"]];
        document.getElementById("surveyContainer2").style.display = "block";
        document.getElementById("imageRow21").style.display = "flex";

  var selectedImages = [];
  var selectedIds = [];
  var currentRowIndex = 1; 

  function getSelectedImageIds() {
    var selectedIds = selectedImages.map(function(image) {
      return image.firstElementChild.classList.item(0);
    });
    return selectedIds
  }

  function highlightImage(container) {
    container.classList.toggle('highlighted');
    console.log(container.firstElementChild.classList.item(0));
    if (container.classList.contains('highlighted')) {
      selectedImages.push(container);
     
    } else {
      selectedImages = selectedImages.filter(function(item) {
        return item !== container;
      });
    }

    // If more than two images are selected, remove the highlight from the first selected image
    if (selectedImages.length > 2) {
      selectedImages[0].classList.remove('highlighted');
      selectedImages.shift(); // Remove the first selected image from the array
      
    }
    console.log(selectedImages);
    selectedIds = getSelectedImageIds(selectedImages);
    //console.log(selectedIds)

  }
  // Expose the highlightImage function to the global scope
  window.highlightImage = highlightImage;

  window.showNextRow2 = function() {
    if(selectedImages.length < 2) {
      window.alert("Veuillez séléctionner deux images avant continuer")
      selectedImages.forEach(function(image) {
        image.classList.remove('highlighted');
      selectedImages = [];
      });


    } else {
      selectedImages.forEach(function(image) {
        image.classList.remove('highlighted');
      selectedImages = [];
      });
      document.getElementById("backButton2").style.display = "inline"
    var currentRow = document.getElementById('imageRow2' + currentRowIndex);
    var nextRowIndex = currentRowIndex + 1;
    console.log(selectedIds)
    responses.push(selectedIds);
    actual.push(correct2[currentRowIndex-1])
    //selectedImages = [];
    selectedIds = [];
    
    console.log(responses);
    console.log(actual);

    // If there is a next row, toggle the display property
    if (nextRowIndex <= 4) { // Change 3 to the total number of rows
      var nextRow = document.getElementById('imageRow2' + nextRowIndex);
      //var currentRow = document.getElementById('imageRow' + currentRowIndex);
      currentRow.style.display = 'none';
      nextRow.style.display = 'flex';

      if (nextRowIndex == 4) {
        document.getElementById('nextButton2').innerHTML = "Fin"
      }
      

      currentRowIndex = nextRowIndex; 
    } else {
      document.getElementById("surveyContainer2").style.display = 'none';
      main.style.display = 'block';
    }
    }
    
    
  }

  window.showPrevRow2 = function() {
    selectedImages.forEach(function(image) {
       image.classList.remove('highlighted');
     });
    console.log(selectedImages)
    document.getElementById('nextButton2').innerHTML = "Next"
    var currentRow = document.getElementById('imageRow2' + currentRowIndex);
    var prevRowIndex = currentRowIndex - 1;
    var prevRow = document.getElementById('imageRow2' + prevRowIndex);
    
    if (prevRowIndex <  2) {
      document.getElementById("backButton2").style.display = "none";
    } 
    responses.pop();
    actual.pop();
    selectedImages = [];
    selectedIds = [];
    console.log(responses)
    console.log(actual)
    currentRow.style.display = 'none';
    prevRow.style.display = 'flex';
    currentRowIndex = prevRowIndex;

    };

};


    let surveyfn3 = function(){
      function resetVariables() {
        selectedImages.forEach(function(image) {
          image.classList.remove('highlighted');
         selectedImages = [];
        });
        selectedIds = [];
        currentRowIndex = 1;
    }
    const changeBtn = document.querySelectorAll('.change');


    changeBtn.forEach(button => {
        button.addEventListener('click', function() {
          resetVariables();
        });
      })
        
      const correct3 = ["J", "N", "P", "C", "D", "P", "C", "D", "T"];
        document.getElementById("surveyContainer3").style.display = "block";
        document.getElementById("imageRow31").style.display = "flex";
        document.getElementById("imageHaut31").style.display = "block";
        var selectedImages = [];
  var selectedIds = [];
  //var responses = [];
  var currentRowIndex = 1; // Initial row index
  //var currentRow = document.getElementById('imageRow' + currentRowIndex);

  function getSelectedImageIds() {
    var selectedIds = selectedImages.map(function(image) {
      return image.firstElementChild.classList.item(0);;
    });
    return selectedIds
  }

  function highlightImage(container) {
    // Toggle the 'highlighted' class on the clicked image container
    container.classList.toggle('highlighted');

    // If the container is now highlighted, add it to the selected images; otherwise, remove it
    if (container.classList.contains('highlighted')) {
      selectedImages.push(container);
     
    } else {
      selectedImages = selectedImages.filter(function(item) {
        return item !== container;
      });
    }

    // If more than two images are selected, remove the highlight from the first selected image
    if (selectedImages.length > 1) {
      selectedImages[0].classList.remove('highlighted');
      selectedImages.shift(); // Remove the first selected image from the array
      
    }
    //console.log(selectedImages);
    selectedIds = getSelectedImageIds(selectedImages);
    //console.log(selectedIds)

  }
  // Expose the highlightImage function to the global scope
  window.highlightImage = highlightImage;

  window.showNextRow3 = function() {
    if(selectedImages.length < 1) {
      window.alert("Veuillez séléctionner une image avant continuer")
      selectedImages.forEach(function(image) {
        image.classList.remove('highlighted');
       selectedImages = [];
      });


    } else {
      selectedImages.forEach(function(image) {
        image.classList.remove('highlighted');
       selectedImages = [];
      });
      
    document.getElementById("backButton3").style.display = "inline"
    var currentRow = document.getElementById('imageRow3' + currentRowIndex);
    var currentImgHaut = document.getElementById('imageHaut3' + currentRowIndex);
    var nextRowIndex = currentRowIndex + 1;
    console.log(selectedIds)
    responses.push(selectedIds);
    actual.push(correct3[currentRowIndex-1]);
    //selectedImages = [];
    selectedIds = [];
    
    console.log(responses)

    // If there is a next row, toggle the display property
    if (nextRowIndex <= 9) { // Change 3 to the total number of rows
      var nextRow = document.getElementById('imageRow3' + nextRowIndex);
      var nextImgHaut = document.getElementById('imageHaut3' + nextRowIndex);
      //var currentRow = document.getElementById('imageRow' + currentRowIndex);
      currentRow.style.display = 'none';
      nextRow.style.display = 'flex';
      currentImgHaut.style.display = 'none';
      nextImgHaut.style.display = 'block';

      if (nextRowIndex == 9) {
        document.getElementById('nextButton3').innerHTML = "Fin"
      }
      

      currentRowIndex = nextRowIndex; 
    } else {
      document.getElementById("surveyContainer3").style.display = 'none';
      main.style.display = 'block';
    }
  }


    
  }

  window.showPrevRow3 = function() {
    selectedImages.forEach(function(image) {
       image.classList.remove('highlighted');
     });
    console.log(selectedImages)
    document.getElementById('nextButton3').innerHTML = "Next"
    var currentRow = document.getElementById('imageRow3' + currentRowIndex);
    var currentImgHaut = document.getElementById('imageHaut3' + currentRowIndex);
    var prevRowIndex = currentRowIndex - 1;
    var prevRow = document.getElementById('imageRow3' + prevRowIndex);
    var prevImgHaut = document.getElementById('imageHaut3' + prevRowIndex)
    
    if (prevRowIndex <  2) {
      document.getElementById("backButton3").style.display = "none";
    } 
    responses.pop();
    actual.pop();
    selectedImages = [];
    selectedIds = [];
    console.log(responses)
    currentRow.style.display = 'none';
    prevRow.style.display = 'flex';
    currentImgHaut.style.display = 'none';
    prevImgHaut.style.display = 'block';
    currentRowIndex = prevRowIndex;

  }
    };

    let surveyfn4 = function(){
      function resetVariables() {
        selectedImages.forEach(function(image) {
          image.classList.remove('highlighted');
         selectedImages = [];
        });
        selectedIds = [];
        currentRowIndex = 1;
    }
    const changeBtn = document.querySelectorAll('.change');


    changeBtn.forEach(button => {
        button.addEventListener('click', function() {
          resetVariables();
        });
      })
        const correct4 = [["T", "T"],["D","D"],["N","N"],["C","C"]];
        document.getElementById("surveyContainer4").style.display = "block";
        document.getElementById("imageRow41").style.display = "flex";
        var selectedImages = [];
  var selectedIds = [];
  //var responses = [];
  var currentRowIndex = 1; // Initial row index
  //var currentRow = document.getElementById('imageRow' + currentRowIndex);

  function getSelectedImageIds() {
    var selectedIds = selectedImages.map(function(image) {
      return image.firstElementChild.classList.item(0);
    });
    return selectedIds
  }

  function highlightImage(container) {
    // Toggle the 'highlighted' class on the clicked image container
    container.classList.toggle('highlighted');

    // If the container is now highlighted, add it to the selected images; otherwise, remove it
    if (container.classList.contains('highlighted')) {
      selectedImages.push(container);
     
    } else {
      selectedImages = selectedImages.filter(function(item) {
        return item !== container;
      });
    }

    // If more than two images are selected, remove the highlight from the first selected image
    if (selectedImages.length > 2) {
      selectedImages[0].classList.remove('highlighted');
      selectedImages.shift(); // Remove the first selected image from the array
      
    }
    //console.log(selectedImages);
    selectedIds = getSelectedImageIds(selectedImages);
    //console.log(selectedIds)

  }
  // Expose the highlightImage function to the global scope
  window.highlightImage = highlightImage;

  window.showNextRow4 = function() {
    if(selectedImages.length < 2) {
      window.alert("Veuillez séléctionner deux images avant continuer")
      selectedImages.forEach(function(image) {
        image.classList.remove('highlighted');
       selectedImages = [];
      });


    } else {
      selectedImages.forEach(function(image) {
        image.classList.remove('highlighted');
       selectedImages = [];
      });

      document.getElementById("backButton4").style.display = "inline"
    var currentRow = document.getElementById('imageRow4' + currentRowIndex);
    var nextRowIndex = currentRowIndex + 1;
    console.log(selectedIds)
    responses.push(selectedIds);
    actual.push(correct4[currentRowIndex-1])
    //selectedImages = [];
    selectedIds = [];
    
    console.log(responses)

    // If there is a next row, toggle the display property
    if (nextRowIndex <= 4) { // Change 3 to the total number of rows
      var nextRow = document.getElementById('imageRow4' + nextRowIndex);
      //var currentRow = document.getElementById('imageRow' + currentRowIndex);
      currentRow.style.display = 'none';
      nextRow.style.display = 'flex';

      if (nextRowIndex == 4) {
        document.getElementById('nextButton4').innerHTML = "Fin"
      }
      

      currentRowIndex = nextRowIndex; 
    } else {
      document.getElementById("surveyContainer4").style.display = 'none';
      main.style.display = 'block';
    }

    }
    
  }

  window.showPrevRow4 = function() {
    selectedImages.forEach(function(image) {
       image.classList.remove('highlighted');
     });
    console.log(selectedImages)
    document.getElementById('nextButton4').innerHTML = "Next"
    var currentRow = document.getElementById('imageRow4' + currentRowIndex);
    var prevRowIndex = currentRowIndex - 1;
    var prevRow = document.getElementById('imageRow4' + prevRowIndex);
    
    if (prevRowIndex <  2) {
      document.getElementById("backButton4").style.display = "none";
    } 
    responses.pop();
    actual.pop();
    selectedImages = [];
    selectedIds = [];
    console.log(responses)
    currentRow.style.display = 'none';
    prevRow.style.display = 'flex';
    currentRowIndex = prevRowIndex;

  }
    };

    let surveyfn5 = function(){
      let timerSeconds = 0;
      let elapsedSeconds = 0;
      function resetVariables() {
        document.getElementById("intro").style.display = 'block';
        document.getElementById('startButton').style.display = 'inline';
        document.getElementById('noNext').style.display = 'none';
        document.getElementById('withNext').style.display = 'none';
        document.getElementById("backButton5").style.display = "none";
        document.getElementById('nextButton5').style.display = 'none';
        document.getElementById('montreButton').style.display = 'none';
        selectedImages.forEach(function(image) {
          image.classList.remove('highlighted');
        });
        selectedImages = [];
        clearInterval(intervalId);
        elapsedSeconds = 0;
        selectedIds = [];
        clearInterval(intervalId);
        currentRowIndex = 1;
    }
    const changeBtn = document.querySelectorAll('.change');


    changeBtn.forEach(button => {
        button.addEventListener('click', function() {
          resetVariables();
        });
      })
      const correct5 = [["J", "J"], ["P", "P"], ["J", "J"], ["C", "C"], ["P", "P"], ["C", "C"], ["N", "N"], ["D", "D"], ["N", "N"], ["T", "T"]];
      document.getElementById("surveyContainer5").style.display = "block";
       // Add this line
  //let experimentStartTime = Date.now(); // Record the start time when the page loads
  //let elapsedSeconds = 0;
  var selectedImages = [];
  var selectedIds = [];
  //var responses = [];
  var currentRowIndex = 1; 
  let intervalId; // Initial row index
  //var currentRow = document.getElementById('imageRow' + currentRowIndex);

  function getSelectedImageIds() {
    var selectedIds = selectedImages.map(function(image) {
      return image.firstElementChild.classList.item(0);
    });
    return selectedIds
  }

  function highlightImage(container) {
    // Toggle the 'highlighted' class on the clicked image container
    container.classList.toggle('highlighted');

    // If the container is now highlighted, add it to the selected images; otherwise, remove it
    if (container.classList.contains('highlighted')) {
      selectedImages.push(container);
     
    } else {
      selectedImages = selectedImages.filter(function(item) {
        return item !== container;
      });
    }

    // If more than two images are selected, remove the highlight from the first selected image
    if (selectedImages.length > 2) {
      selectedImages[0].classList.remove('highlighted');
      selectedImages.shift(); // Remove the first selected image from the array
      
    }
    //console.log(selectedImages);
    selectedIds = getSelectedImageIds(selectedImages);
    //console.log(selectedIds)

  }
  // Expose the highlightImage function to the global scope
  window.highlightImage = highlightImage;

  window.showNextRow = function() {
    if(selectedImages.length < 2) {
      window.alert("Veuillez séléctionner deux images avant continuer")
      selectedImages.forEach(function(image) {
        image.classList.remove('highlighted');
       selectedImages = [];
      });


    } else {
      selectedImages.forEach(function(image) {
        image.classList.remove('highlighted');
       selectedImages = [];
      });
      //document.getElementById("backButton").style.display = "inline"
    var currentRow = document.getElementById('imageRow5' + currentRowIndex);
    console.log(selectedIds);
    responses.push(selectedIds);
    actual.push(correct5[currentRowIndex-1])
    selectedIds = [];
    console.log(responses)
    if (currentRowIndex === 10) {
      document.getElementById("surveyContainer5").style.display = 'none';
      main.style.display = 'block';
    } else {
      currentRow.style.display = 'none';
      currentRowIndex = currentRowIndex + 1;
      showImage();

    }
    
    

    }
    


    

    // If there is a next row, toggle the display property
    // if (nextRowIndex <= 10) { // Change 3 to the total number of rows
    //   var nextRow = document.getElementById('imageRow' + nextRowIndex);
    //   var nextImgHaut = document.getElementById('imageHaut' + nextRowIndex);
    //   //var currentRow = document.getElementById('imageRow' + currentRowIndex);
    //   currentRow.style.display = 'none';
    //   //nextRow.style.display = 'flex';
    //   //currentImgHaut.style.display = 'none';
    //   nextImgHaut.style.display = 'block';

    //   if (nextRowIndex == 10) {
    //     document.getElementById('nextButton').innerHTML = "Finish"
    //   }
      

    //   currentRowIndex = nextRowIndex; 
    // } else {
    //   document.getElementById("surveyContainer").style.display = 'none';
    // }
  }

  window.showPrevRow = function() {
    document.getElementById("backButton5").style.display = "none";
    clearInterval(intervalId);
    
    selectedImages.forEach(function(image) {
       image.classList.remove('highlighted');
     });

    console.log(selectedImages)
    //document.getElementById('nextButton').innerHTML = "Next"
    var currentRow = document.getElementById('imageRow5' + currentRowIndex);
    var currentImgHaut = document.getElementById('imageHaut5' + currentRowIndex);
    var prevRowIndex = currentRowIndex - 1;
    var prevRow = document.getElementById('imageRow5' + prevRowIndex);
    var prevImgHaut = document.getElementById('imageHaut5' + prevRowIndex)
    
    if (prevRowIndex <  2) {
      document.getElementById("backButton5").style.display = "none";
    } 
    responses.pop();
    actual.pop();
    selectedImages = [];
    selectedIds = [];
    console.log(responses)
    currentImgHaut.style.display = 'none';
    //currentRow.style.display = 'none';
    prevRow.style.display = 'flex';
    document.getElementById('nextButton5').style.display = 'inline';
    
    //prevImgHaut.style.display = 'block';
    currentRowIndex = prevRowIndex;

  }



  function showImage() {
    if(currentRowIndex > 1) {
      document.getElementById("backButton5").style.display = "inline";
    }
    //let experimentStartTime = Date.now();
    if (currentRowIndex === 1) {
      document.getElementById('startButton').style.display = 'none';
    } else {
      document.getElementById('withNext').style.display = 'none';
      document.getElementById('nextButton5').style.display = 'none';
    }
    clearInterval(intervalId);
    document.getElementById('montreButton').style.display = 'none';
    var currentImg = document.getElementById('imageHaut5' + currentRowIndex);
    document.getElementById('noNext').style.display = 'block'
    currentImg.style.display = 'block';
    var currentRow = document.getElementById('imageRow5' + currentRowIndex);
    elapsedSeconds = 0;
    intervalId = setInterval(function () {
      elapsedSeconds += 1;
      console.log('Elapsed time:', elapsedSeconds, 'seconds');
      if (elapsedSeconds >= 5) {
        clearInterval(intervalId);
        currentImg.style.display = 'none';
        document.getElementById("backButton5").style.display = "none";
        document.getElementById('noNext').style.display = 'none'
        document.getElementById('withNext').style.display = 'block'
        currentRow.style.display = 'flex';
        document.getElementById('nextButton5').style.display = 'inline';
        document.getElementById('montreButton').style.display = 'inline';
        if (currentRowIndex === 10) {
          document.getElementById('nextButton5').innerHTML = "Fin"
        } 
        //currentRowIndex = currentRowIndex + 1;
      }
    }, 1000);
  }

  
  window.start = function(){
    document.getElementById("intro").style.display = 'none';
    showImage();
  }

  window.montre = function() {
    document.getElementById("backButton5").style.display = "none";
    selectedImages.forEach(function(image) {
      image.classList.remove('highlighted');
    });
    selectedImages = [];
    var currentRow = document.getElementById('imageRow5' + currentRowIndex);
    currentRow.style.display = 'none';
    document.getElementById('noNext').style.display = 'block';
    document.getElementById('withNext').style.display = 'none';
    document.getElementById('nextButton5').style.display = 'none';
    document.getElementById('montreButton').style.display = 'none';
    showImage()
  }

    };

    window.firstFn = function(){
      const idsToCheck = ["second","third","fourth","fifth","surveyContainer1", "surveyContainer2", "surveyContainer3", "surveyContainer4", "surveyContainer5"];

      idsToCheck.forEach(id => {
        const element = document.getElementById(id);
        if (element && getComputedStyle(element).display !== 'none') {
          element.style.display = 'none';
        }
      });
        document.getElementById("first").style.display = "block";
        main.style.display = 'block';
        count = 1;

    }

    
     window.secondFn = function(){
       const idsToCheck = ["first","third","fourth","fifth","surveyContainer1", "surveyContainer2", "surveyContainer3", "surveyContainer4", "surveyContainer5"];

       idsToCheck.forEach(id => {
         const element = document.getElementById(id);
         if (element && getComputedStyle(element).display !== 'none') {
           element.style.display = 'none';
         }
       });
         document.getElementById("second").style.display = "block";
         main.style.display = 'block';
         count = 2;

     }

     window.thirdFn = function(){
      const idsToCheck = ["first","second","fourth","fifth","surveyContainer1", "surveyContainer2", "surveyContainer3", "surveyContainer4", "surveyContainer5"];

      idsToCheck.forEach(id => {
        const element = document.getElementById(id);
        if (element && getComputedStyle(element).display !== 'none') {
          element.style.display = 'none';
        }
      });
        document.getElementById("third").style.display = "block";
        main.style.display = 'block';
        count = 3;

    }

    window.fourthFn = function(){
      const idsToCheck = ["first","second","third","fifth","surveyContainer1", "surveyContainer2", "surveyContainer3", "surveyContainer4", "surveyContainer5"];

      idsToCheck.forEach(id => {
        const element = document.getElementById(id);
        if (element && getComputedStyle(element).display !== 'none') {
          element.style.display = 'none';
        }
      });
        document.getElementById("fourth").style.display = "block";
        main.style.display = 'block';
        count = 4;

    }


    window.fifthFn = function(){
      const idsToCheck = ["first","second","third","fourth","surveyContainer1", "surveyContainer2", "surveyContainer3", "surveyContainer4", "surveyContainer5"];

      idsToCheck.forEach(id => {
        const element = document.getElementById(id);
        if (element && getComputedStyle(element).display !== 'none') {
          element.style.display = 'none';
        }
      });
        document.getElementById("fifth").style.display = "block";
        main.style.display = 'block';
        count = 5;

    }

    const buttons = document.querySelectorAll('.change');


buttons.forEach(button => {
    button.addEventListener('click', function() {
      const imageRows = document.querySelectorAll('.image-row');
      imageRows.forEach(row => {
          row.style.display = 'none';
      });
      document.querySelectorAll('[id^="imageHaut"]').forEach(element => {
        element.style.display = 'none';
    });
      //document.getElementById("imageRow21").style.display = 'flex';
      //document.getElementById("imageHaut31").style.display = 'flex';
      //document.getElementById("imageRow31").style.display = 'flex';
      //document.getElementById("imageRow41").style.display = 'flex';
      //document.getElementById("imageHaut51").style.display = 'flex';
      //document.getElementById("imageRow51").style.display = 'flex';
      

    });
});

    
    
    
    function calculateConfusionMatrix() {
      const emotionMap = {
        "J": "Joie",
        "T": "Tristesse",
        "N": "Neutre",
        "D": "Dégoût",
        "C": "Colère",
        "P": "Peur"
      };

      //let actualList = ["J", "J", "T", "T", "T", "T", "N", "N", "J", "N", "P", "C", "D", "P", "C", "D", "T", "T", "T","D","D","N","N","C","C",
      // "J", "J", "P", "P", "J", "J", "C", "C", "P", "P", "C", "C", "N", "N", "D", "D", "N", "N", "T", "T"];
      //const actualList = ["J", "J", "T", "T", "T", "T", "N", "N", "J", "N", "P", "C", "D", "P", "C", "D", "T", "J", "J", "P", "P", "J", "J", "C", "C"];
      let predictedList = responses.flat(Infinity);
      let actualList = actual.flat(Infinity);
      //let predictedList = ["J", "J", "T", "T", "T", "T", "N", "N", "J", "N", "P", "C", "D", "P", "C", "D", "T", "J", "J", "P", "P", "J", "J", "C", "C", "P", "P", "C", "C", "N", "N", "D", "D", "N", "N", "T", "T"];
      //predictedList = predictedList.slice(8);
      let classes = ["J", "T", "N", "D", "C", "P"];
      console.log(`Actual List:` + actualList);
      console.log(`Predicted List:` + predictedList);

      actualList = actualList.map(letter => emotionMap[letter] || letter);
      predictedList = predictedList.map(letter => emotionMap[letter] || letter);
      classes = classes.map(letter => emotionMap[letter] || letter);



      const confusionMatrix = {};
      const colorMatrix = {};

  
      classes.forEach(actualClass => {
        confusionMatrix[actualClass] = {};
        colorMatrix[actualClass] = {};
        classes.forEach(predictedClass => {
          confusionMatrix[actualClass][predictedClass] = 0;
          colorMatrix[actualClass][predictedClass] = '#FFFFFF';
        });
      });



  
      const maxLength = Math.min(actualList.length, predictedList.length);
      for (let i = 0; i < maxLength; i++) {
        const actual = actualList[i];
        const predicted = predictedList[i];
        confusionMatrix[actual][predicted] += 1;
      }

      for (const [outerKey, innerObject] of Object.entries(confusionMatrix)) {
        for (const [innerKey, value] of Object.entries(innerObject)) {
            // Do something with the value
            if (value === 0) {
              confusionMatrix[outerKey][innerKey] = '';
          }
        }
      }

      for (let i = 0; i < maxLength; i++) {
        const actual = actualList[i];
        const predicted = predictedList[i];
        if(actual===predicted){
          colorMatrix[actual][predicted] = "#0000FF";
        }
      }

      for (let i = 0; i < maxLength; i++) {
        const actual = actualList[i];
        const predicted = predictedList[i];
        if(actual!==predicted){
          if(colorMatrix[actual][predicted] === "#FFFFFF"){
            colorMatrix[actual][predicted] = "#FFCCCB"
          } else {
            colorMatrix[actual][predicted] = makeDarker(colorMatrix[actual][predicted]);
            console.log(colorMatrix[actual][predicted])
          }
          colorMatrix[actual][actual] = makeLighter(colorMatrix[actual][actual]);
          console.log(colorMatrix[actual][actual])
        }
      }

      console.log(confusionMatrix)
      console.log(colorMatrix)

      const tableHTML = `
    <tr>
      <th>Réel \\ Prédit</th>
      ${classes.map(className => `<th>${className}</th>`).join('')}
    </tr>
    ${classes.map(actualClass => `
      <tr>
        <th>${actualClass}</th>
        ${classes.map(predictedClass => `
          <td style="background-color: ${colorMatrix[actualClass][predictedClass]};">${confusionMatrix[actualClass][predictedClass]}</td>
        `).join('')}
      </tr>
    `).join('')}
`;
  
      return tableHTML;
    }


    function makeDarker(color) {
      // Convert hexadecimal color to RGB components
      let red = parseInt(color.substring(1, 3), 16);
      let green = parseInt(color.substring(3, 5), 16);
      let blue = parseInt(color.substring(5, 7), 16);
  
      // Define the amount by which to darken the color
      const darkness = 50;
  
      // Subtract the darkness from each RGB component (clamping at 0)
      red = Math.max(0, red - darkness);
      green = Math.max(0, green - darkness);
      blue = Math.max(0, blue - darkness);
  
      // Convert the new RGB values back to hexadecimal
      const darkerHex = "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).toUpperCase().slice(1);
  
      return darkerHex;
  }

  function makeLighter(color) {
    // Convert hexadecimal color to RGB components
    let red = parseInt(color.substring(1, 3), 16);
    let green = parseInt(color.substring(3, 5), 16);
    let blue = parseInt(color.substring(5, 7), 16);

    // Define the amount by which to lighten the color
    const lightness = 50;

    // Add the lightness to each RGB component (clamping at 255)
    red = Math.min(255, red + lightness);
    green = Math.min(255, green + lightness);
    blue = Math.min(255, blue + lightness);

    // Convert the new RGB values back to hexadecimal
    const lighterHex = "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).toUpperCase().slice(1);

    return lighterHex;
}

function save_csv(){
  actual.unshift("label");
  responses.unshift("response")
  const data = [actual.flat(Infinity), responses.flat(Infinity)];
  function transpose(array) {
    return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
  }
  const transposedData = transpose(data);
  const csvData = transposedData.map(row => row.join(';')).join('\n');
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'emotion_data.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  //window.close(); 
}

   


    
  });
  