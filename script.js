(function () {
  // The ID we will use for the Clone to SourceTree Button
  var cloneToSourceTreeButtonID = 'clone-to-sourcetree';
  var svgIcon = '<svg class="octicon octicon-sourcetree mr-3" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.5 14.4v-1.5c-2.6-1.2-4.2-3.9-4-6.7c0.3-3.5 3.4-6.3 6.9-6.2C12.1 0 15.1 3 15.1 6.7c0 2.7-1.6 5.1-4 6.2v1.5 c0 1-0.8 1.7-1.7 1.7H7.3C6.3 16.1 5.5 15.3 5.5 14.4z M9.6 14.6v-2.8l0.3-0.1c1.7-0.6 3.1-2 3.5-3.8c0.8-3.9-2.6-7.2-6.5-6.2 C5.4 2 4 3.2 3.5 4.7c-1.1 2.9 0.4 5.9 3.1 6.9l0.5 0.2v2.8H9.6z M8.9 9.4C6.9 9.8 5.2 8.1 5.6 6.1C5.8 5 6.7 4.2 7.8 4 c1.9-0.4 3.6 1.3 3.3 3.3C10.8 8.3 9.9 9.2 8.9 9.4z M8.3 5.4C7.6 5.4 7.1 6 7.1 6.7c0 0.7 0.6 1.2 1.2 1.2s1.2-0.6 1.2-1.2 C9.6 6 9 5.4 8.3 5.4z"></path></svg>';

  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      // If the Clone to SourceTree button already exists remove it
      RemoveButton();
      // Add the Clone to SourceTree button
      AddButton();
    }
  };

  function RemoveButton() {
    // Find the button IF it exists
    var cloneToSourceTreeButton = document.getElementById(cloneToSourceTreeButtonID);
    // Remove the button
    if (cloneToSourceTreeButton) {
      cloneToSourceTreeButton.remove();
    }
  }

  function AddButton() {
    console.log('Adding Button');
    // Grab the repo modal (popup)
    var repoModal = document.getElementsByTagName('get-repo')[0];
    // Make sure the repo modal window exits
    if (repoModal) {
      console.log('Got Repo Model');
      // Grab the URL from the HTTPS (Currently) connection
      var tabContainer = repoModal.getElementsByTagName("tab-container")[0];
      var inputs = tabContainer.getElementsByTagName("input");
      var sourceTreeUrl;
      // Search for a url that is a http url for git
      for (let input of inputs) {
        if (input.defaultValue.startsWith('git@github.com') && input.defaultValue.endsWith('.git')){
          sourceTreeUrl = input.defaultValue;
        }
      }
      // Check we found it before we try to use it!
      if (sourceTreeUrl.length > 0) {
        console.log('Sourcetree URL: ' + sourceTreeUrl);

        // Grab the buttons section at the bottom of the modal window to add our new button
        var buttonLayout = repoModal.getElementsByClassName("list-style-none")[0];

        // Create the list item
        var cloneToSourceTreeButton = document.createElement('li');
        cloneToSourceTreeButton.classList.add('Box-row');
        cloneToSourceTreeButton.classList.add('Box-row--hover-gray');
        cloneToSourceTreeButton.classList.add('p-0');
        cloneToSourceTreeButton.classList.add('CloneToSourcetree');
        // Set an ID so we can check for it later
        cloneToSourceTreeButton.id = cloneToSourceTreeButtonID;

        // Create the new button (link)
        var cloneToSourceTreeButtonLink = document.createElement('a');
        // Set the required classes (just match the current existing button's classes)
        cloneToSourceTreeButtonLink.classList.add('d-flex');
        cloneToSourceTreeButtonLink.classList.add('flex-items-center');
        cloneToSourceTreeButtonLink.classList.add('text-gray-dark');
        cloneToSourceTreeButtonLink.classList.add('text-bold');
        cloneToSourceTreeButtonLink.classList.add('no-underline');
        cloneToSourceTreeButtonLink.classList.add('p-3');
        // Set the button text
        cloneToSourceTreeButtonLink.innerHTML = svgIcon + " Open in Sourcetree";
        // Set it's link to open the SourceTree URL in SourceTree
        cloneToSourceTreeButtonLink.setAttribute('href', "sourcetree://cloneRepo?cloneUrl=" + sourceTreeUrl + "&type=github");
        // Add our link to our list entry
        cloneToSourceTreeButton.appendChild(cloneToSourceTreeButtonLink);

        // Add our button(in list entry) to the existing button layout we got before
        buttonLayout.appendChild(cloneToSourceTreeButton);
      } else {
        console.warn("git http URL not found!");
      }
      
    } else {
      console.log('Repo Model not found');
    }
  }

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      // Listen for messages sent from background.js
      if (request.message === 'URL_CHANGED') {
        // URL changed. Give it a sec few secs to load... Can't find a better way to do this. :(
        setTimeout(() => {
          // If the Clone to SourceTree button already exists remove it
          RemoveButton();
          // Add the Clone to SourceTree button
          AddButton();
        }, 2000);
      }
    }
  );
})();
