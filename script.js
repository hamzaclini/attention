const symbol1real = [['14'],
                     ['21'],
                     ['13'],
                     ['13','24'],
                     ['31','33'],
                     ['14','21','25'],
                     ['34','44'],
                     ['15','21','24'],
                     ['22','43','45'],
                     ['13','24','43','45'],
                     ['11','12','13','24','42'],
                     ['12','22','25','35'],
                     ['33','35','41','42','44'],
                     ['14','21','22','23'],
                     ['12','13','34','35','42','45'],
                     ['12','13','14','22','25','32','43'],  //8.1
                     ['21','22','31','35','41','43'],       //8.2
                     ['11','13','21','24','25','31','43','45'],     //9.1
                     ['11','15','23','25','41','42','43'],  //9.2
                     ['11','13','14','34','42','43','45'],  //10.1
                     ['11','15','24','31','32','34','41'],          //10.2
                     ['11','12','15','21','23','25','41','45'],     //11.1
                     ['11','12','24','25','35','41','44','45'],     //11.2
                     ['11','13','14','21','23','31','32','43'],   //12.1
                     ['13','14','23','24','31','32','33','44']]; //12.2

const symbol2real = [[],
                     [],
                     [],
                     [],
                     [],
                     ['32'],
                     ['35'],
                     ['12'],
                     ['23'],
                     [],
                     ['14','33'],
                     ['43'],
                     ['15','24','35'],
                     ['11'],
                     ['21'],        //8.1
                     ['15','23'],   //8.2
                     ['41'],        //9.1
                     ['35','44'],       //9.2
                     ['21','24','31'],  //10.1
                     ['13','35','45'],  //10.2
                     ['14','33','42'],  //11.1
                     ['14','23','32'],  //11.2
                     ['12','25','41','44'],  //12.1
                     ['11','15','42','45']]; //12.2

const img1ind = [[[14],[""]],
                 [[21],[""]],
                 [[13],[24]],
                 [[33],[31]],
                 [[14],[21,25]],
                 [[32,34,44],[32]],
                 [[15,21,24,35],[35]],
                 [[12,22,45],[12,43]],
                 [[13,23,45],[23,24,43]],
                 [[24],[11,12,13,42]],
                 [[14,21,22],[14,25,33,35]],
                 [[33,43],[35,41,42,43,44]],
                 [[15,21,24,35],[14,15,22,23,24,35]],
                 [[11,12,13],[42]],
                 [[13,21,22,25,45],[12,14,21,32]],
                 [[15,21,23,35,41],[15,22,23,31,43]],
                 [[13,21,25,41,43],[11,14,31,41,45]],
                 [[23,25,35,41,42,44],[11,15,35,43,44]],
                 [[11,21,24,31,34,45],[13,14,21,24,31,42,43]],
                 [[13,24,31,34,35,45],[11,13,15,32,35,41,45]],
                 [[11,14,15,21,23,33,42,45],[12,14,25,33,41,42]],
                 [[12,14,23,24,32,35,44],[11,14,23,25,32,41,45]],
                 [[12,13,23,25,31,41,43,44],[11,12,14,21,25,32,41,44]],
                 [[11,15,23,24,31,42,44,45],[11,13,14,15,32,33,42,45]]]; 


const img2ind = [[[""],[44]], //1.1
                 [[14],[21]], //1.2
                 [[25],[""]], //2.1
                 [[11],[21]], //2.2
                 [[23],[14]], //3.1
                 [[""],[21]], //3.2
                 [[""],[25]], //4.1
                 [[15,42],[""]], //4.2
                 [[""],[13]], // 5.1
                 [[13,35,42,43],[25,31]], //5.2
                 [[34],[24,42]],  // 6.1
                 [[22,24,34,41],[13]], // 6.2
                 [[42],[43]],  // 7.1
                 [[25,31],[12,43]], // 7.2
                 [[41],[13,43]], // 8.1
                 [[14],[13]],  // 8.2
                 [[33,42],[""]],  // 9.1
                 [[""],[33]],  // 9.2
                 [[15,23,41],[15,23,45]], // 10.1
                 [[14,22,44],[14,22,43]], // 10.2
                 [[13,34,41],[13,15,21,45]],  // 11.1
                 [[11,15,21],[22,24,42,44]],  // 11.2
                 [[11,24,32],[24,31,34]],  //12.1
                 [[14,32,35],[23,25,31,43]]]; 



//const symbol1real = [];
//const symbol2real = [];

//const img1ind = [[14,]];
//const img2ind = [];

let stop = 0;
const mytime = 500;
let score = [];
let count = 0;
let count2 = 0;
let sum = 0;
let epan = 0;
let counts = 1;
let epans = ["1.2", "2.1", "2.2", "3.1", "3.2", "4.1", "4.2", "5.1", "5.2", "6.1", "6.2", "7.1", "7.2", "8.1", "8.2", "9.1", "9.2", "10.1", "10.2", "11.1", "11.2", "12.1", "12.2"]

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

    setTableCaption(index);

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

function setTableCaption(index) {
    var table = document.querySelector("#tableContainer table");
    var caption = table.createCaption();
    
    // Generate title based on index
    var title = "Table " + (index + 1);
    caption.textContent = title;

    // Set background color based on index
    if (index === 0) {
        caption.style.backgroundColor = "blue";
    } else if (index === 1) {
        caption.style.backgroundColor = "green";
    }

    caption.style.fontSize = "20px"; // Adjust as needed

    // Adjust top and bottom margins
    caption.style.marginTop = "10px"; // Adjust as needed
    caption.style.marginBottom = "10px"; // Adjust as needed
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
    };

    // For mobile phones

    for (const image of allImages) {
        image.addEventListener("touchstart", function (event) {
            selected = event.target;
            console.log("Hello!")
        });
    };

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

            newCell.addEventListener("touchmove", function (event) {
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


            newCell.addEventListener("touchend", function (event) {
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
    }, mytime);

    setTimeout(play, 2 * mytime);
}



// Call the functions after the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("next").addEventListener("click",function() {
        document.getElementById("example1").style.display = 'none';
        document.getElementById("example2").style.display = 'block';
        document.getElementById("ex1").style.display = 'none';
        document.getElementById("ex2").style.display = 'block';
        document.getElementById("next").style.display = 'none';
        document.getElementById("understood").style.display = 'inline';
    });
    document.getElementById("understood").addEventListener("click", function() {
        document.getElementById("example2").style.display = 'none';
        document.getElementById("ex2").style.display = 'none';
        document.getElementById("understood").style.display = 'none';
        document.getElementById("title").style.display = 'block';
        document.getElementById("start").style.display = 'inline';


    });
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

        console.log(symbol1real[count]);
        console.log(symbol1Ids);
        console.log(symbol2real[count]);
        console.log(symbol2Ids);
        score.push(arraysAreEqual(symbol1real[count], symbol1Ids) && arraysAreEqual(symbol2real[count], symbol2Ids) ? 1 : 0);
        console.log(score);
        if (score.length === 2) {
            let newsum = score[0] + score[1];
            if (newsum === 0) {
                stop = 1;
                const failedElement = document.getElementById('failed');

                // Get all elements except the one you want to keep visible
                const allElements = document.body.getElementsByTagName('*');

                // Loop through all elements
                for (let i = 0; i < allElements.length; i++) {
                    const element = allElements[i];

                // Check if the element is not the one you want to keep visible
                if (element !== failedElement) {
                // Hide the element
                    element.style.display = 'none';
                    document.getElementById("failed").style.display = 'block';
                    }
                }
            
            }
            score = [];
        } 

        if(stop !== 1) {
            sum = sum + (arraysAreEqual(symbol1real[count], symbol1Ids) && arraysAreEqual(symbol2real[count], symbol2Ids));
        label.textContent = 'Le nombre de réponses correctes est ' + `(${sum})` + ' sur ' + `(${count+1})`;
        count ++;
        

        
        var emptyDiv = document.getElementById('empty');

        // Loop through each child element and remove it
        while (emptyDiv.firstChild) {
            emptyDiv.removeChild(emptyDiv.firstChild);
        }

        if(count2 < counts-1) {
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



