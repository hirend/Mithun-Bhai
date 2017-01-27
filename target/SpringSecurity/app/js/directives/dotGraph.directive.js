/*
 * Copyright (c) 2016 Vital Images, Inc. All Rights Reserved.
 *
 * This is UNPUBLISHED PROPRIETARY SOURCE CODE of Vital Images, Inc.;
 * the contents of this file may not be disclosed to third parties,
 * copied or duplicated in any form, in whole or in part, without the
 * prior written permission of Vital Images, Inc.
 *
 * RESTRICTED RIGHTS LEGEND:
 * Use, duplication or disclosure by the Government is subject to
 * restrictions as set forth in subdivision (c)(1)(ii) of the Rights
 * in Technical Data and Computer Software clause at DFARS 252.227-7013,
 * and/or in similar or successor clauses in the FAR, DOD or NASA FAR
 * Supplement. Unpublished rights reserved under the Copyright Laws of
 * the United States.
 */

/** This can be only applicable for div with id attribute, id attribute is must for this directive to work*/
angular.module('UtilizationModule').directive('dotGraph', dotGraph);

dotGraph.$inject = [];

function dotGraph() {
    return {
        restrict: 'A',
        link: function($scope, elem, attr) {
        	$scope.$watch(attr.dotGraph, function(value) {

                var xAxis = [1, 2, 3, 4, 5,6,7,8,9,10,11,12];
                var yAxis = [];
                var i = 0;
                angular.forEach(value, function (option) {
                    yAxis[i] = option.totalVolumes;
                    i++;
                });
                var chartPlots  = {
                    x: xAxis,
                    y: yAxis
                };
        		createGraph(chartPlots);
    	    });
        	function createGraph(plots){
        		var trace = [{
					x: plots.x, y: plots.y,
					mode: 'lines', name: 'Dot',
					line: { dash: 'dot', width: 1, color: 'rgb(89, 89, 89)' }
				}];
        		var layout = 
        			{ margin: { l: 50, r: 0, b: 0, t: 0 },
        			autoscale: true, height: 25, width: 400,
    			    xaxis: {
    			      range: [1, 12],
    			      autorange: false, showgrid: false, zeroline: false,
    			      showline: false, autotick: true, ticks: '', showticklabels: false
    			    },
    			    yaxis: {
    			      autorange: true, showgrid: false, zeroline: false,
    			      showline: false, autotick: true, ticks: '', showticklabels: false
    			    },
    			    legend: {
    			      y: 0.5, traceorder: 'reversed',
    			      font: { size: 8 }
    			    }
    			  };
        		Plotly.newPlot(elem[0], trace, layout, {displayModeBar: false});
        	}
        }
    };
}


