/*--***************************
	Show mean value of x at step 2
  *****************************/
 
  function showBarChart() {
	
	function randomColorFactor() { // chart use a random color each load
		return Math.round(Math.random() * 255);
	}
	function randomColor(opacity) {
		return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',' + (opacity || '.3') + ')';
	}

    var ctx1 = $("#mean");
	window.meanChart = new Chart(ctx1,  {
		type: 'bar',
		data: {
		labels:	[ '01/13/2020 15:34:23', '01/13/2020 16:01:43', '01/13/2020 16:39:19'],
		datasets: [
			{
				label: 'Mean x at step 2',
				data: [ csv1Step2Mean, csv2Step2Mean, csv3Step2Mean],  // csv1Step2Mean comes from global variable
				backgroundColor: randomColor(0.4),
				
			}
		]
		},
		options: {
			zoomEnabled: true, 
			responsive: true,
			title: {
				display: true,
				fontSize: 22,
				text: 'This chart shows mean value of x at step 2 for each CSV files'
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

	window.resetZoomMean = function() {
		window.meanChart.resetZoom();
	};
}
