document.addEventListener('DOMContentLoaded', function () {
    const leftBox = document.getElementById('left');
    const rightBox = document.getElementById('right');
    const nextButton = document.getElementById('nextButton');
    //const questionElement = document.getElementById('question');
    const specialImage = document.getElementById('1');
    const endTimeButton = document.getElementById('endButton');
    var timerElement = document.getElementById('timer');
    //const timerElement = document.getElementById('timer');



  
    //const questions = [
    //  'Question 1: Which image do you prefer?',
    //  'Question 2: What color stands out the most?',
      // Add more questions as needed
    //];
  
    let currentQuestionIndex = 0;
    let timerSeconds = 0; // Add this line
    let experimentStartTime = Date.now(); // Record the start time when the page loads
    let elapsedSeconds = 0;
    const timeAndImageList = [];
    
  
    //function updateQuestion() {
    //  questionElement.textContent = questions[currentQuestionIndex];
  
      // Increment the question index
    //  currentQuestionIndex++;
  
      // Disable the button if there are no more questions
    //  if (currentQuestionIndex === questions.length) {
      //  nextButton.disabled = true;
      //}
    //}

    function updateTimer() {
      const currentTime = Date.now();
      elapsedSeconds = Math.floor((currentTime - experimentStartTime) / 1000);
      timerElement.textContent = 'Elapsed Time: ' + elapsedSeconds + ' seconds';
      //console.log('Total elapsed time:', elapsedSeconds, 'seconds');
      if (elapsedSeconds >= 300) {
        //console.log("Too much")
        experimentStartTime = currentTime;
        timeAndImageList.push([0,0,0,0]);
        resetRightBox();
        rightBox.appendChild(specialImage)
        elapsedSeconds = 0;

      }
    }
  
    function resetRightBox() {
        while (rightBox.firstChild) {
          leftBox.appendChild(rightBox.firstChild);
        }
    }

    //function updateTimer() {
        //timerElement.textContent = `Timer: ${timerSeconds} seconds`; // Update the timer element
        //timerSeconds++;
      //}

      function enlargeImage(selected) {
    
        selected.style.zIndex = 1;
        selected.style.transform = 'scale(1.5)'; // Adjustable
        selected.style.transition = 'transform 0.3s ease'; // Smooth transition
        //console.log([selected.id,selected.style.zIndex])
      }

      function resetImageSize(selected) {
        if (selected) {
          // Reset the image size to its original state
          selected.style.zIndex = 0;
          selected.style.transform = 'scale(1)';
          selected.style.transition = 'transform 0.3s ease'; // Smooth transition
          //console.log([selected.id,selected.style.zIndex])
        }
      }

      // Functions for Mobile Phones:
      let longTouchTimeout;

      function handleLongTouch(image) {
        clearTimeout(longTouchTimeout);
        longTouchTimeout = setTimeout(function () {
            enlargeImage(image);
        }, 500);
      }

      function handleTouchEnd(image) {
        clearTimeout(longTouchTimeout);
        resetImageSize(image);
    }

    const timerInterval = setInterval(updateTimer, 1000)
    
  
    nextButton.addEventListener('click', function () {
      experimentStartTime = Date.now();
      const imageIds = Array.from(rightBox.children).map(img => img.id);
      timeAndImageList.push([elapsedSeconds, ...imageIds]);
      //console.log(timeAndImageList)
      resetRightBox();
      //updateQuestion(); // Add this line if you want to update the question after resetting
      rightBox.appendChild(specialImage)
      elapsedSeconds = 0;
    });

    endTimeButton.addEventListener('click', function () {

      const currentTime = Date.now();
      const imageIds = Array.from(rightBox.children).map(img => img.id);
      timeAndImageList.push([elapsedSeconds, ...imageIds]);
      console.log(elapsedSeconds)
  
      const csvData = timeAndImageList.map(row => row.join(',')).join('\n');
  
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'experiment_data.csv';
      document.body.appendChild(a);
  
      a.click();
  
      document.body.removeChild(a);
  
      window.close(); 
  });
  
    const images = document.querySelectorAll('#left img');
    const allimages = document.querySelectorAll('img');
  
    let selected;

    for (const image of allimages) {
      image.addEventListener("mouseover",function (event) {
        enlargeImage(event.target);
      });

      image.addEventListener("mouseout",function (event){
        resetImageSize(event.target);
      })
    }
  
    for (const image of images) {
      image.addEventListener("dragstart", function (event) {
        selected = event.target;
  
        rightBox.addEventListener("dragover", function (event) {
          event.preventDefault();
        });
  
        rightBox.addEventListener("drop", function (event) {
          if (rightBox.childElementCount < 4) {
            rightBox.appendChild(selected);
          }
          selected = null;
        });
  
        leftBox.addEventListener("dragover", function (event) {
          event.preventDefault();
        });
  
        leftBox.addEventListener("drop", function (event) {
          leftBox.appendChild(selected);
          selected = null;
        });
      });
    }

    // For Mobile Phones

     for (const image of allimages) {
       image.addEventListener('touchstart', function (event) {
           event.preventDefault();
           handleLongTouch(event.target);
       },false);
  
       image.addEventListener('touchend', function (event) {
           event.preventDefault();
           handleTouchEnd(event.target);
       },false);
   }

   for (const image of images) {
     image.addEventListener("touchstart", function (event) {
         event.preventDefault(); 
         selected = event.target;
         rightBox.addEventListener("touchmove", function (event) {
             event.preventDefault();
         });
         rightBox.addEventListener("touchend", function (event) {
             if (rightBox.childElementCount < 4) {
                 rightBox.appendChild(selected);
             }
             selected = null;
         });
         leftBox.addEventListener("touchmove", function (event) {
             event.preventDefault();
         },false);
         leftBox.addEventListener("touchend", function (event) {
             leftBox.appendChild(selected);
             selected = null;
         },false);
     },false);
 }

    //for (const image of images) {
      //image.addEventListener("touchstart", function (event) {
        //selected = event.target;
        //console.log(selected)
      //});
    //}
      
  });
  
