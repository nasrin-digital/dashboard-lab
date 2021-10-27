function showSecondFile()
{

    var selectArray = [ 'set1_20200113_153423', 'set2_20200113_160143', 'set3_20200113_163919'];
    var firstFileId = $("#firstFileSelect").find('option:selected').attr('id');
    
    if(firstFileId == 0)
    {
        $("#secondFileSelect").empty();
        $('#secondFileSelect').append('<option id="0">Please select</option>');
    }
    else{
        
        $("#secondFileSelect").empty();
        $('#secondFileSelect').append('<option id="0">Please select</option>');
        for( var i = 1 ; i <= 3 ; i++)
        {
            if(firstFileId != i){
                $('#secondFileSelect').append('<option id= "'+(i)+'" >'+selectArray[i-1]+'</option>');  
            }
        }
    }
}

function showCalculateChart(){
    var firstFileId = $("#firstFileSelect").find('option:selected').attr('id');
    if(firstFileId != 0){
        var secondFileId = $("#secondFileSelect").find('option:selected').attr('id');
        if(secondFileId != 0){
            var calculateId = $("#calculateSelect").find('option:selected').attr('id');
            if(calculateId != 0){
                $("#calculateMessage").html('');


                ///start calculating for chart
                var csvImported = finalResult.split("#"); // csv results value

                //Get CSV1 values
                var csvFile1 = csvImported[0];
                var csvFileSplit1= csvFile1.split('@');
                var csv1TString = csvFileSplit1[0].split(',');
                var csv1T = [];
                for(var i = 0 ; i < csv1TString.length ; ++i )
                {
                    csv1T[i] = parseFloat(csv1TString[i]).toFixed(3);
                }
                
                var csv1XString = csvFileSplit1[1].split(',');
                var csv1X = [];
                for(var i = 0 ; i < csv1XString.length ; ++i )
                {
                    csv1X[i] = parseFloat(csv1XString[i]);
                }

                //Get CSV2 values 
                var csvFile2 = csvImported[1];
                var csvFileSplit2= csvFile2.split('@');
                var csv2XString = csvFileSplit2[1].split(',');
                var csv2X = [];
                for(var i = 0 ; i < csv2XString.length ; ++i )
                {
                    csv2X[i] = parseFloat(csv2XString[i]);
                }

                //Get CSV3 values
                var csvFile3 = csvImported[2];
                var csvFileSplit3 = csvFile3.split('@');
                var csv3XString = csvFileSplit3[1].split(',');
                var csv3X = [];
                for(var i = 0 ; i < csv3XString.length ; ++i )
                {
                    csv3X[i] = parseFloat(csv3XString[i]);
                }


    
                var calcFirst =[];
                if(firstFileId ==  1)   calcFirst = csv1X;
                else if(firstFileId ==  2)   calcFirst = csv2X;
                else    calcFirst = csv3X;

                var calcSecond =[];
                if(secondFileId ==  1)   calcSecond = csv1X;
                else if(secondFileId ==  2)   calcSecond = csv2X;
                else    calcSecond = csv3X;

                var min = Math.min(calcFirst.length, calcSecond.length);
                
                var calcResult = [];
                if(calculateId == 1){ // If it'a add

                    for(var k = 0;  k < min ; k++){
                            
                            calcResult[k] = calcFirst[k]+ calcSecond[k];
                    }    
                }
                else if(calculateId == 2){ // If it'a Substract

                    for(var k = 0;  k < min ; k++){
                            
                            calcResult[k] = calcFirst[k] - calcSecond[k];
                    }    
                }
                else{ // If it'a add

                    for(var k = 0;  k < min ; k++){
                            
                            calcResult[k] = calcFirst[k] / calcSecond[k];
                    }    
                }
                
                $("#calcResetZoomBtn").css("display", "");
                var firstFileValue = $("#firstFileSelect").find('option:selected').val();
                var secondFileValue = $("#secondFileSelect").find('option:selected').val();
                var calcType = '';
                if(calculateId == 1)    calcType ='Add';
                else if(calculateId == 2) calcType ='Substract';
                else    calcType = 'Divide';

                var ctx2 = $("#calcChart");
				window.calcChart = new Chart(ctx2,  {
					type: 'line',
					data: {
					  labels:	csv1T,
					  datasets: [
						  { 
							label: firstFileValue + ' ' + calcType + ' ' +secondFileValue,
							data: calcResult,
							borderColor: "#3e95cd",
							fill: false
						}
					]
					},
					options: {
						zoomEnabled: true, 
						responsive: true,
						title: {
							display: true,
							fontSize: 22,
							text: 'Result of '+ calcType +' files'
						},
						legend: {
							onHover: function(e) {
							   e.target.style.cursor = 'pointer';
							}
							
						 },
						 hover: {
							onHover: function(e) {
							   var point = this.getElementAtEvent(e);
							   if (point.length) e.target.style.cursor = 'pointer';
							   else e.target.style.cursor = 'default';
							}
						 },
						scales: {
							xAxes: [{
								labelAngle: -30
							}],
							yAxes: [{
								includeZero: false
							}]
						},
						plugins: {
							zoom: {
								// Container for pan options
								pan: {
									// Boolean to enable panning
									enabled: true,
						
									// Panning directions. Remove the appropriate direction to disable
									// Eg. 'y' would only allow panning in the y direction
									// A function that is called as the user is panning and returns the
									// available directions can also be used:
									//   mode: function({ chart }) {
									//     return 'xy';
									//   },
									mode: '',
						
									rangeMin: {
										// Format of min pan range depends on scale type
										x: null,
										y: null
									},
									rangeMax: {
										// Format of max pan range depends on scale type
										x: null,
										y: null
									},
						
									// Function called while the user is panning
									onPan: function({chart}) { },
									// Function called once panning is completed
									onPanComplete: function({chart}) {  }
								},
						
								// Container for zoom options
								zoom: {
									// Boolean to enable zooming
									enabled: true,
						
									// Enable drag-to-zoom behavior
									//drag: dragOptions,
									drag: {
											 borderColor: 'rgba(225,225,225,0.3)',
											  borderWidth: 5,
											  backgroundColor: 'rgb(225,225,225)',
											  
										 },
						
									// Drag-to-zoom effect can be customized
									// drag: {
									// 	 borderColor: 'rgba(225,225,225,0.3)'
									// 	 borderWidth: 5,
									// 	 backgroundColor: 'rgb(225,225,225)',
									// 	 animationDuration: 0
									// },
						
									// Zooming directions. Remove the appropriate direction to disable
									// Eg. 'y' would only allow zooming in the y direction
									// A function that is called as the user is zooming and returns the
									// available directions can also be used:
									//   mode: function({ chart }) {
									//     return 'xy';
									//   },
									mode: 'xy',
						
									rangeMin: {
										// Format of min zoom range depends on scale type
										x: null,
										y: null
									},
									rangeMax: {
										// Format of max zoom range depends on scale type
										x: null,
										y: null
									},
						
									// Speed of zoom via mouse wheel
									// (percentage of zoom on a wheel event)
									speed: 0.1,
									// Function called while the user is zooming
									onZoom: function({chart}) { },
									// Function called once zooming is completed
									onZoomComplete: function({chart}) {  }
									
								}
							}
						}
					}
				});
                 

                // end chart
                
            }// end if(calculateId != 0)
            else{
                $("#calculateMessage").html('Please select calculation type');
            }
        }
        else{
            $("#calculateMessage").html('Please select second file');
        }
    }
    else{
        $("#calculateMessage").html('Please select first file');
    }
}

window.resetZoomCalculate = function() {
    window.calcChart.resetZoom();
};