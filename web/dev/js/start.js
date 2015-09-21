/*jslint browser: true, devel: true, white: true*/

// Make sure the Web Components are loaded before trying to use them
window.addEventListener('WebComponentsReady', function () {
    'use strict';
    
    // Make references to the DOM elements we want to use
    var addForm  = document.getElementById('add-form'),
        addSubmit  = document.getElementById('add-submit'),
        addResult = document.getElementById('add-result');
    
    // Paper-buttons don't behave like <button type="submit"> so we have to listen for the click ourselves
    addSubmit.addEventListener('click', function () {
        addForm.submit();
    });
    
    // When ajax-form recieves a response from the server we can parse it
    addForm.addEventListener('iron-form-response', function (evt) {
        addResult.value = evt.detail.sum;
    });
    
    addForm.addEventListener('iron-form-error', function (evt) {
        var response;
        
        // Handle error codes we have built into the LabVIEW application
        if (evt.detail.request.xhr.status === 500 && evt.detail.request.xhr.responseType === 'json') {
            response = evt.detail.request.xhr.response;
            
            addResult.value = response.message;
            console.log('LabVIEW Server Error Message: ', response.message);
            console.group();
            console.log('LabVIEW Server Error Status: ', response.error.status);
            console.log('LabVIEW Server Error Code: ', response.error.code);
            console.log('LabVIEW Server Error Source: ', response.error.source);
            console.groupEnd();
        } else {
            addResult.value = evt.detail.error.message;
        }
    });
});
