$(document).ready(function(){
    // Function to include HTML
    function includeHTML() {
        var z, i, elmnt, file, xhttp;
        z = document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
            elmnt = z[i];
            file = elmnt.getAttribute("include-html");
            if (file) {
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            elmnt.innerHTML = this.responseText;
                            elmnt.removeAttribute("include-html");
                            // Re-initialize event handlers
                            initializeEventHandlers();
                            includeHTML(); // Continue loading other elements
                        }
                        if (this.status == 404) { 
                            elmnt.innerHTML = "An error has occured, please reload.";
                        }
                    }
                };
                xhttp.open("GET", file, true);
                xhttp.send();
                return; // Exit function to avoid multiple AJAX requests
            }
        }
    }

    // Call the includeHTML function and initialize event handlers
    includeHTML();
    initializeEventHandlers();
});