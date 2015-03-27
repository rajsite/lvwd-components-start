/*jslint browser: true*/

// Make sure the Web Components are loaded before trying to use them
// We rely on a Polymer specific event (polymer-ready) due to limitations of the polyfill
// Hopefully in the future we could instead rely on a standard event such as DomContentLoaded
window.addEventListener('polymer-ready', function (e) {
    'use strict';
    var addForm  = document.getElementById('addform'),
        addSubmit  = document.getElementById('addsubmit'),
        addResult = document.getElementById('addresult'),
        data;
    
    addSubmit.addEventListener('click', function () {
        addForm.submit();
    });
    
    addForm.addEventListener('submitted', function (evt) {
        if (evt.detail.status === 200) {
            data = JSON.parse(evt.detail.responseText);
            addResult.value = data.sum;
        } else {
            addResult.value = 'Error: ' + evt.detail.statusText;
        }
    });
    
});
