const symbol1real = [['14'], ['21'], ['43'], ['11'], ['21'], ['15'], ['21'], ['25'], ['41'], ['22'],
                    ['13','24'], ['15','24'], ['31','42'], [], ['13','24'], ['12', '35'], ['14','31'], ['11','23'], ['13','33'], ['31','43'],
                    ['14','21','25'], ['14','31'], ['24','35'], ['12','13'], ['21','32'], ['12','13','25'], ['34','45'], ['32'], ['24','25','42'], ['25'],
                    ['11','24','41'], ['15','25'], ['23','25'], ['23','22','35'], ['12','31','41','33'], ['24','32'], ['13','31','33','44'], ['21','23'], ['12','22','24','33'], ['31','12'],
                    ['34','44'], ['11','15','31','55'], ['13','34'], ['12','13','24','44'], ['23','32'], ['33','35'], ['15','31'],['11','25','41'], ['11','23','31','35'],['25','32','44'],
                    ['42','43'], ['12','13','23','25','45'], ['12','23','31','32'], ['15','21','24'], ['22','25','31','45'], ['12','14','32'], ['15','22','23','31'], ['13','41','42'], ['23','34','35','42','45'],['13','31','32','35','43']];

const symbol2real = [[], [], [], [], [], [], [], [], [], [],
                    [], [], [], ['15'], [], [], [], [], [],[],
                    [], [], [], [], [], [], [], [], [], [],
                    [], [], [], [], [], [], [], [], [], [],
                    ['32'], [], [], [], [], [], [],[],[],[],
                    ['23'], [], [], ['35'], [], ['21'], [], [], [],[]];

const img1ind = [[[14],[""]], [[21],[""]], [[""],[43]], [[11],[""]], [[""],[21]], [[15],[""]], [[21],[""]], [[""],[25]], [[41],[""]], [[22],[""]],
                [[13],[24]], [[""],[15,24]], [[31],[42]], [[15],[15]], [[""],[13,24]], [[""],[12,35]], [[14, 31],[""]], [[11, 23],[""]], [[33],[13]], [[31],[43]],
                [[14],[21,25]], [[14,31],[""]], [[24],[35]], [[13],[21]], [[21,32],[""]], [[25], [12,13]], [[45],[34]], [[""],[32]], [[24,25],[42]], [[25], [""]],
                [[41],[11,24]], [[""]],[15,25], [[""],[23,25]], [[23],[22,35]], [[31,41,33],[12]], [[32],[24]], [[13,31,33],[44]], [[""],[21,23]], [[33],[12,22,24]], [[12,31],[""]],
                [[32,34,44],[32]], [[11,15,31],[55]], [[13],[34]], [[44],[12,13,24]], [[23],[32]], [[35],[33]], [[15, 31],[33]], [[11, 41],[25]], [[23],[11,31,35]], [[23],[25,54]],
                [[23,42,43],[23]], [[12,45],[13,23,25]], [[23,31,32],[12]], [[15, 21, 24, 35],[35]], [[25],[22,31,45]], [[12,14,21,32],[21]], [[15,22],[23,31]], [[41,42],[13]], [[23,42],[34,35,45]], [[13,43,35],[31,32]]];


const img2ind = [[[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]],
                [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]],
                [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]],
                [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]], [[""],[""]],
                [[""],[""]], [[""],[""]], [[""],[34]], [[""],[15]], [[""],[11]], [[""],[13]], [[12], [""]], [[23],[33]], [[""],[""]], [[""],[13,22]],
                [[23],[""]], [[14,44],[""]], [[33],[11]], [[""],[44]], [[""],[""]], [[14,23],[""]], [[""],[""]], [[44],[24]], [[""],[""]], [[""],[21,44]],
                [[""],[21]], [[""],[43]], [[25],[11,44]], [[33], [""]], [[24,32,42],[""]], [[23,43,44],[""]], [[21,23],[14]], [[""],[12,31]], [[35],[""]], [[""],[12,42]],
                [[""],[43,44]], [[24],[""]], [[22],[45]], [[""],[25]], [[11],[32]], [[""],[33]], [[23],[13]], [[34],[15,24]], [[""],[43]], [[21],[""]]];



//const symbol1real = [];
//const symbol2real = [];

//const img1ind = [[14,]];
//const img2ind = [];


let count = 0;
let sum = 0;

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

function play(){
    document.getElementById("tableContainer").style.display = 'none';
    document.getElementById("empty").style.display = 'grid';
    document.getElementById("symContainer").style.display = 'block';
    document.getElementById("confirm").style.display = 'inline';
    const allImages = document.querySelectorAll('img');
let selected;

for (const image of allImages) {
    image.addEventListener("dragstart", function (event) {
        selected = event.target;
    });
}



// Get the reference to the "emptyDiv" container
var emptyDiv = document.getElementById('empty');



// Dynamically create 4 rows and 5 columns of divs
for (var i = 0; i < 4; i++) {  // Rows
    // Create 5 columns in each row
    for (var j = 0; j < 5; j++) {  // Columns
        // Calculate the unique ID based on the position
        //var id = (i * 5) + j + 1;
        var id = '' + (i+1) + (j+1);

        // Create a new div element
        var newDiv = document.createElement('div');

        // Set the ID and content of the div
        //newDiv.id = id.toString();
        newDiv.id = id

        // Add dragover event listener to allow dropping on the dynamically created div
        newDiv.addEventListener("dragover", function (event) {
            event.preventDefault();
        });

        // Add drop event listener to handle the drop on the dynamically created div
        newDiv.addEventListener("drop", function (event) {
            // Check if the dropped element is an image
            if (selected && selected.tagName.toLowerCase() === 'img') {
                if (this.childElementCount === 0) {
                    // Create a clone of the selected image
                var clone = selected.cloneNode(true);

                // Make the clone draggable
                clone.draggable = true;

                // Append the clone to the dropped div
                this.appendChild(clone);
                }
                
            }
            selected = null;
        });

        newDiv.addEventListener("click", function (event) {
            if(this.childElementCount === 1) {
                this.removeChild(this.firstChild);
            }
        });

        // Append the div to the "emptyDiv" div
        emptyDiv.appendChild(newDiv);


        
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
    }, 5000);

    setTimeout(play, 2 * 5000);
}



// Call the functions after the DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    processImages()
    

    document.getElementById("confirm").addEventListener("click", function() {
        var symbol1Ids = [];
        var symbol2Ids = [];
        const label = document.getElementById("correctCountLabel");
        var divs = document.querySelectorAll("#empty > div");

        divs.forEach(function(div) {
            // Iterate over the child elements of each div
            div.childNodes.forEach(function(child) {
                if (child.nodeType === 1) { // Check if the child is an element node
                    // Check the class of the child element
                    if (child.classList.contains("symbol1")) {
                        symbol1Ids.push(div.id);
                    }
                    if (child.classList.contains("symbol2")) {
                        symbol2Ids.push(div.id);
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
        if(count < img1ind.length) {
            processImages()
        } else {
            document.getElementById("symContainer").style.display = 'none';
            document.getElementById("confirm").style.display = 'none';
        }
        
        
    });
});



