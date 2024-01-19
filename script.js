document.addEventListener('DOMContentLoaded', function() {
  var selectedImages = [];
  var selectedIds = [];
  var responses = [];
  var currentRowIndex = 1; // Initial row index

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
    var currentRow = document.getElementById('imageRow' + currentRowIndex);
    var nextRowIndex = currentRowIndex + 1;
    responses.push(selectedIds);
    selectedImages = [];
    selectedIds = [];
    console.log(responses)

    // If there is a next row, toggle the display property
    if (nextRowIndex <= 4) { // Change 3 to the total number of rows
      var nextRow = document.getElementById('imageRow' + nextRowIndex);

      currentRow.style.display = 'none';
      nextRow.style.display = 'flex';

      if (nextRowIndex == 4) {
        document.getElementById('nextButton').innerHTML = "Finish"
      }
      

      currentRowIndex = nextRowIndex; // Update the current row index
    } else {
      document.getElementById("surveyContainer").style.display = 'none';
    }
  }
});
