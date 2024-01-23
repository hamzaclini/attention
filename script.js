document.addEventListener('DOMContentLoaded', function() {
  var selectedImages = [];
  var selectedIds = [];
  var responses = [];
  var currentRowIndex = 1; // Initial row index
  //var currentRow = document.getElementById('imageRow' + currentRowIndex);

  function getSelectedImageIds() {
    var selectedIds = selectedImages.map(function(image) {
      return image.id;
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

  window.showNextRow = function() {
    document.getElementById("backButton").style.display = "inline"
    var currentRow = document.getElementById('imageRow' + currentRowIndex);
    var currentImgHaut = document.getElementById('imageHaut' + currentRowIndex);
    var nextRowIndex = currentRowIndex + 1;
    console.log(selectedIds)
    responses.push(selectedIds);
    //selectedImages = [];
    selectedIds = [];
    
    console.log(responses)

    // If there is a next row, toggle the display property
    if (nextRowIndex <= 5) { // Change 3 to the total number of rows
      var nextRow = document.getElementById('imageRow' + nextRowIndex);
      var nextImgHaut = document.getElementById('imageHaut' + nextRowIndex);
      //var currentRow = document.getElementById('imageRow' + currentRowIndex);
      currentRow.style.display = 'none';
      nextRow.style.display = 'flex';
      currentImgHaut.style.display = 'none';
      nextImgHaut.style.display = 'block';

      if (nextRowIndex == 5) {
        document.getElementById('nextButton').innerHTML = "Finish"
      }
      

      currentRowIndex = nextRowIndex; 
    } else {
      document.getElementById("surveyContainer").style.display = 'none';
    }
  }

  window.showPrevRow = function() {
    selectedImages.forEach(function(image) {
       image.classList.remove('highlighted');
     });
    console.log(selectedImages)
    document.getElementById('nextButton').innerHTML = "Next"
    var currentRow = document.getElementById('imageRow' + currentRowIndex);
    var currentImgHaut = document.getElementById('imageHaut' + currentRowIndex);
    var prevRowIndex = currentRowIndex - 1;
    var prevRow = document.getElementById('imageRow' + prevRowIndex);
    var prevImgHaut = document.getElementById('imageHaut' + prevRowIndex)
    
    if (prevRowIndex <  2) {
      document.getElementById("backButton").style.display = "none";
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

});
