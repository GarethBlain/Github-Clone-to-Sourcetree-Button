(function () {
  // The ID we will use for the Clone to SourceTree Button
  var cloneToSourceTreeButtonID = 'clone-to-sourcetree';
  var svgIcon = '<svg width="16" height="16" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="sourcetree" class="octicon octicon-file-zip mr-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="color: #0047B3;"><path fill="currentColor" d="M427.2 203c0-112.1-90.9-203-203-203C112.1-.2 21.2 90.6 21 202.6A202.86 202.86 0 0 0 161.5 396v101.7a14.3 14.3 0 0 0 14.3 14.3h96.4a14.3 14.3 0 0 0 14.3-14.3V396.1A203.18 203.18 0 0 0 427.2 203zm-271.6 0c0-90.8 137.3-90.8 137.3 0-.1 89.9-137.3 91-137.3 0z"></path></svg>';

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
    var repoModal = document.getElementsByClassName("get-repo-modal")[0];
    // Make sure the repo modal window exits
    if (repoModal) {
      console.log('Got Repo Model');
      // Grab the URL from the HTTPS (Currently) connection
      var httpsGroup = repoModal.getElementsByClassName("https-clone-options")[0];
      var inputGroup = httpsGroup.getElementsByClassName("input-group")[0];
      var gitUrlLayout = inputGroup.getElementsByClassName("input-monospace")[0];
      var sourceTreeUrl = gitUrlLayout.value;
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
