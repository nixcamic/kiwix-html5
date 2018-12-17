/**
 * init.js : Configuration for the library require.js
 * This file handles the dependencies between javascript libraries
 * 
 * Copyright 2013-2014 Mossroy and contributors
 * License GPL v3:
 * 
 * This file is part of Kiwix.
 * 
 * Kiwix is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Kiwix is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Kiwix (file LICENSE-GPLv3.txt).  If not, see <http://www.gnu.org/licenses/>
 */
'use strict';
var params={};
location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(s,k,v){params[k]=v});

// using this to test workaround for bugzilla.mozilla.org/show_bug.cgi?id=1378228
var isFirefox = typeof InstallTrigger !== 'undefined';

// This value decides what "read" functions modules expose. 
// Reads may be File based or XHR based.
var mode = params['mode'] || 'file';
if (isFirefox && (mode !== 'file')) {
    mode = 'xhrFF';
};
// If archive has been specified in URL always default to xhr mode as File object can't be created
if (params['archive'] && mode === 'file') {
    if(isFirefox)
        mode = 'xhrFF';
    else
        mode = 'xhr';
};

// Convert string to bool if params["case"] exists else default to true
var caseSense = params.hasOwnProperty('case') ? params['case'] == 'true'  : false;

var appSettings = {
    // Search Settings
    maxResults : parseInt(params['upto']) || 10,
    from: parseInt(params['from']) || 0,
    match: params['match'] || 'PrefixAndArticleMatch',
    caseSensitive: caseSense,
    // if false user has to hit enter or press the search button after typing
    autoComplete : true,
    autoCompleteResubmitTimer: 700,
    includeSnippet: false,
    maxAsyncSnippetReads: 5,
    includeThumb: true,
    // Article Loader Settings
    // Number of images initially searched for and loaded 
    initialImageLoad: 5, 
    maxAsyncImageReads: 3,
    // In above the fold mode i.e. "quick" mode workerCount+1 workers will run
    workerCount: 2, 
    // ImageSearch
    maxAsyncArticleReads: 2
}
// TODO: Since mode is passed to different modules. 
// Anytime it changes it needs to be updated in each. How?
require.config({
    baseUrl: 'js/lib',
    config: {  'util':{mode: mode},
               'finder':{workerPath: 'dirEntryFinder.js'},  
             '../app':{mode: mode, settings: appSettings, isFirefox:isFirefox}
    },
    paths: {
        'jquery': 'jquery-2.1.4',
        'bootstrap': 'bootstrap'
    },
    shim: {
        'jquery' : {
            exports : '$'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});

requirejs(['bootstrap', '../app']);