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

angular.module('AerolineModule').factory('utils', utils);

utils.$inject = ['$location', '$window'];

function utils($location, $window) {
    return {
        origin: origin,
        href: href,
        aerolineRoot: aerolineRoot,
        isUndefinedOrNull: isUndefinedOrNull
    };

    function origin() {
        var port = $location.port() ? ':' + $location.port() : '';
        return $location.protocol() + '://' + $location.host() + port;
    }

    function aerolineRoot() {
        return origin() + '/CustomerFollowUpApp';
    }

    function href(path) {
        $window.location.href = path;
    }

    function isUndefinedOrNull(obj) {
        return !angular.isDefined(obj) || obj===null;
    }
}