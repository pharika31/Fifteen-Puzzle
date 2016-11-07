var puzzlePieces = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", ""];

var originalPuzzlePieces = puzzlePieces;
var emptySquare = 0, totalRows = 4, totalCols = 4, nRow, nCol;
var nSquare = 4;


function shuffleAndCreatePuzzle()
{
    printTable(puzzlePieces.sort(function(a, b){return 0.5 - Math.random()}));   
}


//function for initial display without shuffleAndCreatePuzzle
function initialPuzzle()
{
	var table = document.getElementById("pTable");
    table.innerHTML = "";

    var row, cPiece, k = 0;

    for(var i = 0; i < nSquare; i++)
    {
        row = table.insertRow(i);
        for(var j = 0; j < nSquare; j++)
        {
            cPiece = row.insertCell(j);
            cPiece.tags=k;
            cPiece.id="c"+k; 
			cPiece.class="c"+k;
			if(k==15){
				cPiece.id="emptySquare"; 
			}
            cPiece.innerHTML = "<td>" + puzzlePieces[k] + "</td>";
           if(k<=15){
		   k++;
		   
		   }
		   
        }
    }
}

function printTable(thisPuzzleOrder)
{
    var table = document.getElementById("pTable");
    table.innerHTML = "";

    var row, cPiece, k = 0;

    for(var i = 0; i < nSquare; i++)
    {
        row = table.insertRow(i);
        for(var j = 0; j < nSquare; j++)
        {
            cPiece = row.insertCell(j);
            cPiece.tags=k;
            cPiece.id="c"+thisPuzzleOrder[k]; 
			
            cPiece.innerHTML = "<td>" + thisPuzzleOrder[k] + "</td>";
            cPiece.onclick = function (){getRowCol(this);};
			//added by Harika
			cPiece.onmouseover = function() {highlightIfValid(this);};
			cPiece.onmouseout = function() {removeHighlight(this);};
			//end
            if(thisPuzzleOrder[k] == "")
            {
                cPiece.id="emptySquare";
                emptySquare = k;
            }
            k++;
        }
    }
}

//function to highlight cell on hover if its movable -Harika

function highlightIfValid(cell) {
	nRow = parseInt(cell.tags / totalRows);
    nCol = cell.tags % totalCols;
    emptyRow = parseInt(emptySquare/totalRows);
    emptyCol = emptySquare % totalCols;

    console.log("Cell Col :" + nCol +"\nEmptyCol : "+ emptyCol);

    if(emptyRow == nRow)
    {
       //highlight on hover
	   cell.className += " highlightTile";
	 
    }
	if(emptyCol == nCol){
		cell.className += " highlightTile";
	}

	}
//remove highlight
function removeHighlight(cell) {
				var className =cell.className;
				className = className.replace(" highlightTile","");
				cell.className = className;
}
			
//end -Harika

function getRowCol(cell)
{
    nRow = parseInt(cell.tags / totalRows);
    nCol = cell.tags % totalCols;
    emptyRow = parseInt(emptySquare/totalRows);
    emptyCol = emptySquare % totalCols;

    console.log("Cell Col :" + nCol +"\nEmptyCol : "+ emptyCol);

    if(cell.tags == emptySquare)
    {
        alert("You can't move the empty square");
    }

    else if(emptyRow == nRow)
    {
        console.log("Movable, Same Row");
        if(nCol < emptyCol)
        {
            slideRowLeft(cell, nCol, emptyCol);
        }
        else
        {
            slideRowRight(cell, nCol, emptyCol);
        }
    }

    else if(emptyCol == nCol)
    {
        console.log("Movable, Same Cols");
        if(nRow < emptyRow)
        {
            slideColDown(cell, nRow, emptyRow);
        }
        else
        {
            slideColUp(cell, nRow, emptyRow);
        }
    }
}

function slideRowLeft(cell, nCol, emptyCol)
{
    console.log("sliding left");
    
    for(var i = emptyCol; i > nCol; i--)
    {
        console.log("Empty:" + emptySquare);
        puzzlePieces[emptySquare] = puzzlePieces[emptySquare-1];
        puzzlePieces[emptySquare-1] = "";
        emptySquare--;
    }

    printTable(puzzlePieces);
}

function slideRowRight(cell, nCol, emptyCol)
{
    console.log("sliding right");
    for(var i = emptyCol; i < nCol; i++)
    {
        console.log("Empty:" + emptySquare);
        puzzlePieces[emptySquare] = puzzlePieces[emptySquare+1];
        puzzlePieces[emptySquare+1] = "";
        emptySquare++;
    }

    printTable(puzzlePieces);
}

function slideColUp(cell, nRow, emptyRow)
{
    console.log("sliding up");
    for(var i = emptyRow; i < nRow; i++)
    {
        puzzlePieces[emptySquare] = puzzlePieces[emptySquare + nSquare];
        puzzlePieces[emptySquare + nSquare] = "";
        emptySquare += nSquare;
    }
    printTable(puzzlePieces);
}

function slideColDown(cell, nRow, emptyRow)
{
    console.log("sliding down");
    for(var i = emptyRow; i > nRow; i--)
    {
        puzzlePieces[emptySquare] = puzzlePieces[emptySquare - nSquare];
        puzzlePieces[emptySquare - nSquare] = "";
        emptySquare -= nSquare;
    }
    printTable(puzzlePieces);
}

//function to change background of tiles
function changeBg(){
				var option = document.getElementById("bg");
				var val = option.options[option.selectedIndex].value;
				var body = document.getElementsByTagName('body')[0];
				if(val==0){
					changeStyleSheet("style0.css") ;
				} 
				else if(val==1){
					changeStyleSheet("style1.css") ;
				}
				else if(val==2){
					changeStyleSheet("style2.css") ;
				}
				else if(val==3){
					changeStyleSheet("style3.css") ;
				} 
			
			}
			
//function to change stylesheet
function changeStyleSheet(sheet) {
    document.getElementById("style").setAttribute("href", sheet);  
}
