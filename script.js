const symbol1real = [['34'], ['21'], ['22'], ['45'],
                     [], ['24'], ['23'], ['11']];

const symbol2real = [[], [], [], [], 
                     ['35'], [], [], []];

const img1ind = [[[34],[""]], [[""],[21]], [[22], [""]], [[""], [45]],
                 [[35], [35]], [[""],[24]], [[23],[""]], [[""],[11]]];


const img2ind = [[[""],[25]], [[11],[""]], [[""],[14]], [[41],[""]],
                 [[""],[""]], [[23],[23]], [[44],[""]], [[42],[""]]];



//const symbol1real = [];
//const symbol2real = [];

//const img1ind = [[14,]];
//const img2ind = [];


let count = 0;
let count2 = 0;
let sum = 0;
let epan = 0;
let counts = [4, 4]
let epans = ["1.2", "2.1"]

function assignIdsToCells() {
    var table = document.getElementById("tableContainer").getElementsByTagName("table")[0];
    var cells = table.getElementsByTagName("td");
    var row = 1;
    var col = 1;

    for (var i = 0; i < cells.length; i++) {
        cells[i].id = "" + row + col;
        col++;
        if(col > 5) {
            row++;
            col = 1;
        }
    }
}

function insertImagesIntoCells(index) {
    // Get references to all table cells
    var cells = document.getElementsByTagName("td");

    // Loop through each cell and clear its content
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerHTML = "";
    }
    
    
    var img1src = "Images/1.png";
    var img2src = "Images/2.png";

    setTableCaption("Table " + index);

    // Insert image 1 into cell with ID "cell11"
    if(img1ind[count][index]) {
        for (let i = 0; i < img1ind[count][index].length; i++) {
            var cell11 = document.getElementById(img1ind[count][index][i]);
            if (cell11) {
                var img1 = document.createElement("img");
                img1.src = img1src;
                cell11.appendChild(img1);
            }
        } 
    }
    
    

    // Insert image 2 into cell with ID "cell22"
    if(img2ind[count][index]) {
        for (let i = 0; i<img2ind[count][index].length; i++) {
            var cell22 = document.getElementById(img2ind[count][index]);
            if (cell22) {
                var img2 = document.createElement("img");
                img2.src = img2src;
                cell22.appendChild(img2);
            }
    
        }

    }
    
    
}

function setTableCaption(title) {
    var table = document.querySelector("#tableContainer table");
    var caption = table.createCaption();
    caption.textContent = title;

}

function play() {
    document.getElementById("tableContainer").style.display = 'none';
    document.getElementById("tableContainer2").style.display = 'table'; // Show the second table container
    document.getElementById("empty").style.display = 'table'; // Show the second table container
    document.getElementById("symContainer").style.display = 'block';
    document.getElementById("confirm").style.display = 'inline';
    
    const allImages = document.querySelectorAll('img');
    let selected;

    for (const image of allImages) {
        image.addEventListener("dragstart", function (event) {
            selected = event.target;
        });
    }

    // Get the reference to the "empty" table body
    var emptyTableBody = document.getElementById('empty');

    // Remove existing table rows
    emptyTableBody.innerHTML = '';

    // Dynamically create 4 rows and 5 columns of table cells
    for (var i = 0; i < 4; i++) {  // Rows
        // Create a new row
        var newRow = emptyTableBody.insertRow();

        // Create 5 cells in each row
        for (var j = 0; j < 5; j++) {  // Columns
            // Calculate the unique ID based on the position
            var id = '' + (i+1) + (j+1);

            // Insert a new cell in the row
            var newCell = newRow.insertCell();

            // Set the ID and content of the cell
            newCell.id = id;

            // Add dragover event listener to allow dropping on the dynamically created cell
            newCell.addEventListener("dragover", function (event) {
                event.preventDefault();
            });

            // Add drop event listener to handle the drop on the dynamically created cell
            newCell.addEventListener("drop", function (event) {
                // Check if the dropped element is an image
                if (selected && selected.tagName.toLowerCase() === 'img') {
                    if (this.childElementCount === 0) {
                        // Create a clone of the selected image
                        var clone = selected.cloneNode(true);

                        // Make the clone draggable
                        clone.draggable = true;

                        // Append the clone to the dropped cell
                        this.appendChild(clone);
                    }
                }
                selected = null;
            });

            newCell.addEventListener("click", function (event) {
                if (this.childElementCount === 1) {
                    this.removeChild(this.firstChild);
                }
            });
        }
    }
}

function arraysAreEqual(arr1, arr2) {
    // Check if both arrays have the same length
    if (arr1.length !== arr2.length) {
        return false;
    }

    // Sort the arrays
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    // Compare the sorted arrays element by element
    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    // If all elements match, arrays are equal
    return true;
}

function processImages() {
    if(count>0) {
        document.getElementById("tableContainer").style.display = 'grid';
        document.getElementById("empty").style.display = 'none';
        document.getElementById("symContainer").style.display = 'none';
        document.getElementById("confirm").style.display = 'none';

    }
    assignIdsToCells();

    let intervalId;
    let index = 1;
    insertImagesIntoCells(0);

    intervalId = setInterval(function() {
        insertImagesIntoCells(index);
        index++;

        if (index >= 2) {
            clearInterval(intervalId);
        }
    }, 1000);

    setTimeout(play, 2 * 1000);
}



// Call the functions after the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("start").addEventListener("click",function() {
        document.getElementById("title").style.display = 'none';
        document.getElementById("tableContainer").style.display = 'grid';
        document.getElementById("start").style.display = 'none';
        processImages();
    });

    // Register event listener for the "confirm" button
    document.getElementById("confirm").addEventListener("click", function() {
        var symbol1Ids = [];
        var symbol2Ids = [];
        const label = document.getElementById("correctCountLabel");
        const tableCells = document.querySelectorAll('#emptyTable td');

        // Initialize arrays to store ids for different symbols
        tableCells.forEach(function(cell) {
        // Iterate over the child elements of each table cell
            cell.childNodes.forEach(function(child) {
            if (child.nodeType === 1) { // Check if the child is an element node
                // Check the class of the child element
                if (child.classList.contains("symbol1")) {
                    symbol1Ids.push(cell.id);
                    }
                if (child.classList.contains("symbol2")) {
                    symbol2Ids.push(cell.id);
                    }
                }
            });
        });

        console.log(symbol1real[count])
        console.log(symbol1Ids)
        console.log(symbol2real[count])
        console.log(symbol2Ids)
        sum = sum + (arraysAreEqual(symbol1real[count], symbol1Ids) && arraysAreEqual(symbol2real[count], symbol2Ids));
        label.textContent = 'Le nombre de réponses correctes est ' + `(${sum})` + ' sur ' + `(${count+1})`;
        count ++;
        

        
        var emptyDiv = document.getElementById('empty');

        // Loop through each child element and remove it
        while (emptyDiv.firstChild) {
            emptyDiv.removeChild(emptyDiv.firstChild);
        }

        if(count2 < counts[epan]-1) {
            if(count < img1ind.length) {
                count2 ++;
                processImages()
            } else {
                document.getElementById("symContainer").style.display = 'none';
                document.getElementById("confirm").style.display = 'none';
                document.getElementById("start").style.display = 'none';
            }
        } else {
            document.getElementById("symContainer").style.display = 'none';
            document.getElementById("confirm").style.display = 'none';
            document.getElementById("start").style.display = 'inline';
            document.getElementById("title").innerHTML = "EMPAN " + epans[epan];
            document.getElementById("title").style.display = 'block';
            epan ++;
            count2 = 0;

        }



        // if(count2 == counts[epan]-1) {
        //     //document.getElementById("confirm").innerHTML = "fin";
        //     document.getElementById("symContainer").style.display = 'none';
        //     document.getElementById("confirm").style.display = 'none';
        //     document.getElementById("start").style.display = 'inline';
        //     document.getElementById("title").innerHTML = "EMPAN " + epans[epan];
        //     document.getElementById("title").style.display = 'block';
        //     epan ++;
        //     count2 = 0;
        // } else if(count < img1ind.length) {
        //     count2 ++;
        //     processImages()
        // } else {
        //     document.getElementById("symContainer").style.display = 'none';
        //     document.getElementById("confirm").style.display = 'none';
        // }
        
        
    });
});



