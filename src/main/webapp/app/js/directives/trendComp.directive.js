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
angular.module('UtilizationModule').directive('trendComp', trendComp);

trendComp.$inject = ['$sce'];

function trendComp($sce) {
    return {
        restrict: 'A',
        link: function($scope, elem, attr) {
        	var up = $sce.trustAsHtml('&#x25B2;');
            var down = $sce.trustAsHtml('&#x25BC;');
        	var month = $scope.$eval(attr.month);
        	var year = $scope.$eval(attr.year);
        	var finalTC ;
        	if(year === 0 && month !== 0){
        		finalTC = 100
        	} else if (year === 0 && month === 0) {
        		finalTC = 0
			} else {
        		var initialTC = (month-year)/year *100;
        		finalTC = Math.round(initialTC * 10) / 10;
        	}
        	if (finalTC < 0){
        		elem[0].outerHTML = Math.abs(finalTC) + '%' + down;
        	} else if (finalTC > 0) {
        		elem[0].outerHTML = finalTC + '%' + up;
			} else {
				elem[0].outerHTML = finalTC + '%';
			}
        }
    };
}


