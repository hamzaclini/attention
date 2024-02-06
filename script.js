document.addEventListener("DOMContentLoaded", function () {
    let count;
    count = 1;
    var responses  = [];

    

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
          document.getElementById("start").innerHTML = "Affiche résultats";
          surveyfn5();


        } else if(count === 6) {
          console.log(responses.flat(Infinity));
          document.getElementById("start").style.display = 'none';
          let tableHTML = calculateConfusionMatrix();
          document.getElementById('confusionMatrixTable').innerHTML = tableHTML ;
          document.getElementById('confusionMatrixTable').style.display = 'block';
        }


    });

    let surveyfn1 = function(){
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
          responses.push(radio.value);
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
    //selectedImages = [];
    selectedIds = [];
    
    console.log(responses)

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
    selectedImages = [];
    selectedIds = [];
    console.log(responses)
    currentRow.style.display = 'none';
    prevRow.style.display = 'flex';
    currentRowIndex = prevRowIndex;

    };

};


    let surveyfn3 = function(){
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
    selectedImages = [];
    selectedIds = [];
    console.log(responses)
    currentRow.style.display = 'none';
    prevRow.style.display = 'flex';
    currentRowIndex = prevRowIndex;

  }
    };

    let surveyfn5 = function(){
      document.getElementById("surveyContainer5").style.display = "block";
      let timerSeconds = 0; // Add this line
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
    let elapsedSeconds = 0;
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

    function calculateConfusionMatrix() {
      const emotionMap = {
        "J": "Joie",
        "T": "Tristesse",
        "N": "Neutre",
        "D": "Dégoût",
        "C": "Colère",
        "P": "Peur"
      };

      let actualList = ["J", "J", "T", "T", "T", "T", "N", "N", "J", "N", "P", "C", "D", "P", "C", "D", "T", "T", "T","D","D","N","N","C","C",
       "J", "J", "P", "P", "J", "J", "C", "C", "P", "P", "C", "C", "N", "N", "D", "D", "N", "N", "T", "T"];
      //const actualList = ["J", "J", "T", "T", "T", "T", "N", "N", "J", "N", "P", "C", "D", "P", "C", "D", "T", "J", "J", "P", "P", "J", "J", "C", "C"];
      let predictedList = responses.flat(Infinity);
      //let predictedList = ["J", "J", "T", "T", "T", "T", "N", "N", "J", "N", "P", "C", "D", "P", "C", "D", "T", "J", "J", "P", "P", "J", "J", "C", "C", "P", "P", "C", "C", "N", "N", "D", "D", "N", "N", "T", "T"];
      predictedList = predictedList.slice(8);
      let classes = ["J", "T", "N", "D", "C", "P"];

      actualList = actualList.map(letter => emotionMap[letter] || letter);
      predictedList = predictedList.map(letter => emotionMap[letter] || letter);
      classes = classes.map(letter => emotionMap[letter] || letter);



      const confusionMatrix = {};

  
      classes.forEach(actualClass => {
        confusionMatrix[actualClass] = {};
        classes.forEach(predictedClass => {
          confusionMatrix[actualClass][predictedClass] = 0;
        });
      });
  
      actualList.forEach((actual, index) => {
        const predicted = predictedList[index];
        confusionMatrix[actual][predicted] += 1;
      });

      const tableHTML = `
    <tr>
      <th>Actual \\ Predicted</th>
      ${classes.map(className => `<th>${className}</th>`).join('')}
    </tr>
    ${classes.map(actualClass => `
      <tr>
        <th>${actualClass}</th>
        ${classes.map(predictedClass => `
          <td>${confusionMatrix[actualClass][predictedClass]}</td>
        `).join('')}
      </tr>
    `).join('')}
  `;
  
      return tableHTML;
    }

  });
  