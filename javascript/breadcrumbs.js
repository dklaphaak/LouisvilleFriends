// breadcrumbs
// This function populates the breadcrumb section of the page.

function breadcrumbs()
{
	if ((document.getElementById) && document.getElementById('breadcrumb_dynamic')) { // Make sure browser supports getElementById and breadcrumb_dynamic exists
		var wrkLocation = location.href;
		var wrkLength = wrkLocation.indexOf("#");  // Find the begining of any anchor reference
		if (wrkLength != -1) {
			wrkLocation = wrkLocation.substr(0,wrkLength);  // Remove the anchor reference
		}	
		var wrkLength = wrkLocation.indexOf("?");  // Find the begining of the query string
		if (wrkLength != -1) {
			wrkLocation = wrkLocation.substr(0,wrkLength);  // Remove the query string
		}

		wrkLocation = unescape(wrkLocation);

		//var re = /<\S[^>]*>/g; // Remove html tags from a string
		var re = /<.*/g; // remove < and anything after
		wrkLocation = wrkLocation.replace(re, "");

		var arrURL=wrkLocation.split("/"); // Array containing the current location, split at the slashes
		var output='<a href="/">Home</a>'; // The string which will be output to the browser, starts with a link to the home page
		var path = '/'; // Link for the crumbs

		// If last item is blank or index.* or default.*, remove it
		if (arrURL[arrURL.length-1] == '' || arrURL[arrURL.length-1].match(/^index\.|^default\./i) ) {
			arrURL.length--;
		}

		if (arrURL.length > 3) {
			for (counter = 3;counter < arrURL.length-1;counter++) {  // Loop to display the links
				path += arrURL[counter] + '/';  // always end links to folder with '/' 
				output += ' | <a href="' + path + '">' + (arrURL[counter].replace(/_/g,' ')) + '</a>';
			}

			// Display the name of the current page in bold
			output += ' | <strong>' + (arrURL[arrURL.length-1].replace(/_/g,' ').replace(/\.\w{3,5}$/,'')) + '</strong>';
		}

		document.getElementById('breadcrumb_dynamic').innerHTML = output;  // Display the breadcrumbs
	}
};


function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

//addLoadEvent(nameOfSomeFunctionToRunOnPageLoad);
//addLoadEvent(function() {
  /* more code to run on page load */
//})
;

addLoadEvent(breadcrumbs);  // Add breadcrumbs to the page onload event handler

// End of breadcrumbs javascript
