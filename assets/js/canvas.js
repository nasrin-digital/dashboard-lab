/*--***************************
	Call Linechart as prechart
  *****************************/
$(document).ready(function() {
    showChart('lineChart1');
});
/*--***************************
	define g variables
  *****************************/
let csvURL_1 = './assets/CSV/set1_20200113_153423.csv';
let csvURL_2 = './assets/CSV/set2_20200113_160143.csv';
let csvURL_3 = './assets/CSV/set3_20200113_163919.csv';
var finalResult='';
var csv1Step2Mean = 0;
var csv2Step2Mean = 0;
var csv3Step2Mean = 0;

/*--***************************
	Main function 
  *****************************/
function showChart(chartType){
	
	new Promise(function(resolve, reject) { /** load CSV1 values and store to finalresult & calculate mean value of x at step 2 */

		var xhr = new XMLHttpRequest();
		xhr.onload = function() {
			var csvTempLines1 = this.responseText.split(/\r\n|\n/);
			var csvFile1X = [];
			var csvFile1T = [];
			var step2Total = 0;
			var step2Counter = 0;
			for( i = 1 ; i < csvTempLines1.length ; ++i)
			{
				var csvLines1 = csvTempLines1[i].split(',');
				csvFile1T[i-1] = csvLines1[1];
				csvFile1X[i-1] = csvLines1[2];
				if(csvLines1[3] == '2.0'){
					step2Total += parseFloat(csvFile1X[i-1]);
					++step2Counter;
				}
				
			}
			// get the mean of step2 values 
			csv1Step2Mean = step2Total/step2Counter;
			finalResult += csvFile1T+"@"+csvFile1X+"#";
			resolve(this.responseText);
		};
		xhr.onerror = reject;
		xhr.open('GET', csvURL_1);
		xhr.send();
	  
	  }).then(function(result) { /** load CSV2 values and store to finalresult & calculate mean value of x at step 2 */
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.onload = function() {
				var csvTempLines1 = this.responseText.split(/\r\n|\n/); 
				var csvFile2X = [];
				var csvFile2T = [];
				var step2Total = 0;
				var step2Counter = 0;
				for( i = 1 ; i < csvTempLines1.length ; ++i)
				{
					var csvLines1 = csvTempLines1[i].split(',');
					csvFile2T[i-1] = csvLines1[1];
					csvFile2X[i-1] = csvLines1[2];
					if(csvLines1[3] == '2.0'){
						step2Total += parseFloat(csvFile2X[i-1]);
						++step2Counter;
					}
					
				}
				// get the mean of step2 values 
				csv2Step2Mean = step2Total/step2Counter; 
				finalResult += csvFile2T+"@"+csvFile2X+"#";
				resolve(this.responseText);
			};
			xhr.onerror = reject;
			xhr.open('GET', csvURL_2);
			xhr.send();
		});
	  
	  }).then(function(result) { /** load CSV3 values and store to finalresult & calculate mean value of x at step 2 */
	  
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest();
			xhr.onload = function() {
				var csvTempLines1 = this.responseText.split(/\r\n|\n/);
				var csvFile3X = [];
				var csvFile3T = [];
				var step2Total = 0;
				var step2Counter = 0;
				for( i = 1 ; i < csvTempLines1.length ; ++i)
				{
					var csvLines1 = csvTempLines1[i].split(',');
					csvFile3T[i-1] = csvLines1[1];
					csvFile3X[i-1] = csvLines1[2];
					if(csvLines1[3] == '2.0'){
						step2Total += parseFloat(csvFile3X[i-1]);
						++step2Counter;
					}
					
				}
				// get the mean of step2 values 
				csv3Step2Mean = step2Total/step2Counter; 
				//console.log("mean"+csv2Step2Mean);
				finalResult += csvFile3T+"@"+csvFile3X+"#";
				resolve(this.responseText);
			};
			xhr.onerror = reject;
			xhr.open('GET', csvURL_3);
			xhr.send();
		});
	  
	  }).then(function() {
			
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
			var csv2TString = csvFileSplit2[0].split(',');
			var csv2T = [];
			for(var i = 0 ; i < csv2TString.length ; ++i )
			{
				csv2T[i] = parseFloat(csv2TString[i]).toFixed(3);
			}
	
			var csv2XString = csvFileSplit2[1].split(',');
			var csv2X = [];
			for(var i = 0 ; i < csv2XString.length ; ++i )
			{
				csv2X[i] = parseFloat(csv2XString[i]);
			}

			//Get CSV3 values
			var csvFile3 = csvImported[2];
			var csvFileSplit3 = csvFile3.split('@');
			var csv3TString = csvFileSplit3[0].split(',');
			var csv3T = [];
			for(var i = 0 ; i < csv3TString.length ; ++i )
			{
				csv3T[i] = parseFloat(csv3TString[i]).toFixed(3);
			}
	
			var csv3XString = csvFileSplit3[1].split(',');
			var csv3X = [];
			for(var i = 0 ; i < csv3XString.length ; ++i )
			{
				csv3X[i] = parseFloat(csv3XString[i]);
			}
			
			if(chartType == 'scatterChart'){ // make json for scatter chart
				var csv1Scatter = [];
				for(var i = 0; i < csv1X.length ; ++i)
				{
					x = csv1T[i];
					y = csv1X[i];
					var json = {x: x, y: y};
					csv1Scatter.push(json);
				}

				var csv2Scatter = [];
				for(var i = 0; i < csv2X.length ; ++i)
				{
					x = csv2T[i];
					y = csv2X[i];
					var json = {x: x, y: y};
					csv2Scatter.push(json);
				}

				var csv3Scatter = [];
				for(var i = 0; i < csv3X.length ; ++i)
				{
					x = csv3T[i];
					y = csv3X[i];
					var json = {x: x, y: y};
					csv3Scatter.push(json);
				}
			}
			
			var minX = Math.min(csv1X.length, csv2X.length, csv3X.length);

			/***** Start mean chart ****** */
			if(chartType == 'lineChart1') showBarChart(); 
			/***** End mean chart ****** */

			/***** Start linechart  ****** */
			if(chartType == 'lineChart' || chartType == 'lineChart1'){

				/***** switch btn colors  ****** */
				document.getElementById("lineChart").className = "btn btn-success";
				document.getElementById("scatterChart").className = "btn btn-light";
			

				var ctx = $("#canvas");
				window.csvChart = new Chart(ctx,  {
					type: 'line',
					data: {
					  labels:	csv1T,
					  datasets: [
						  { 
							label: "01/13/2020 15:34:23",
							data: csv1X,
							borderColor: "#3e95cd",
							fill: false
						},
						{
							label: '01/13/2020 16:01:43',
							data: csv2X,
							borderColor: "#3cba9f",
        					fill: false
						},
						{
							label: '01/13/2020 16:39:19',
							data: csv3X,
							borderColor: "#c45850",
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
							text: 'Select each file name to see the line chart or compaire with other files'
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
									drag: true,
						
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
									}
									
								}
							}
						}
					}
				});
		
			}// end chartType == 'line'
			if(chartType == 'scatterChart'){

				// switch btn colors
				document.getElementById("scatterChart").className = "btn btn-success";
				document.getElementById("lineChart").className = "btn btn-light";

				var ctx = $("#canvas");
				window.csvChart = new Chart(ctx,  {
					type: 'scatter',
					data: {
						datasets: [
							{
								label: '01/13/2020 15:34:23',
								data:	csv1Scatter,
								pointBackgroundColor: '#3e95cd',
								backgroundColor: '#3e95cd'
							
							},
							{
								label: '01/13/2020 16:01:43',
								data:	csv2Scatter,
								pointBackgroundColor: '#3cba9f',
								backgroundColor: '#3cba9f'
							
							},
							{
								label: '01/13/2020 16:39:19',
								data:	csv3Scatter,
								pointBackgroundColor: '#c45850',
								backgroundColor: '#c45850'
							
							}
						]
					},
					options: {
						zoomEnabled: true, 
						responsive: true,
						title: {
							display: true,
							fontSize: 22,
							text: 'Select each file name to see the scatter chart or compaire with other files'
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
											  animationDuration: 0
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
		
			}// end chartType == 'scatter'
			
			window.resetZoom = function() {
				window.csvChart.resetZoom();
			};
	
			/*window.toggleDragMode = function() {
				var chart = window.myLine;
				var zoomOptions = chart.options.plugins.zoom.zoom;
				zoomOptions.drag = zoomOptions.drag ? false : dragOptions;
	
				chart.update();
				document.getElementById('drag-switch').innerText = zoomOptions.drag ? 'Disable drag mode' : 'Enable drag mode';
			};*/
	
			
	});	
}


