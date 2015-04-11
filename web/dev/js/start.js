/*jslint browser: true, devel: true, white: true*/

// Make sure the Web Components are loaded before trying to use them
// We have to use a polymer specific function for now due to limitations of the polyfills
window.addEventListener('polymer-ready', function () {
    'use strict';
    
    // Declare all variables at the start of the function
    var addForm  = document.getElementById('add-form'),
        addSubmit  = document.getElementById('add-submit'),
        addResult = document.getElementById('add-result'),
        data;
    
    // Paper-buttons don't behave like <button type="submit"> so we have to listen for the click ourselves
    addSubmit.addEventListener('click', function () {
        addForm.submit();
    });
    
    // When ajax-form recieves a response from the server we can parse it
    addForm.addEventListener('submitted', function (evt) {
        
        // On a 200 OK response show the resulting sum in the field with id 'add-result'
        if (evt.detail.status === 200) {
            data = JSON.parse(evt.detail.responseText);
            addResult.value = data.sum;
        }
        
        // Otherwise show an error to the user and log response to browser console
        else {
            addResult.value = 'Error: ' + evt.detail.statusText;
            console.log('Error: ' + evt.detail.responseText);
        }
    });
});
