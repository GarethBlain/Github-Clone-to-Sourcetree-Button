(function () {
  // The ID we will use for the Clone to SourceTree Button
  var cloneToSourceTreeButtonID = 'clone-to-sourcetree';

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
    // Grab the repo modal (popup)
    var repoModal = document.getElementsByClassName("get-repo-modal")[0];
    // Make sure the repo modal window exits
    if (repoModal) {
      // Grab the URL from the HTTPS (Currently) connection
      var httpsGroup = repoModal.getElementsByClassName("https-clone-options")[0];
      var inputGroup = httpsGroup.getElementsByClassName("input-group")[0];
      var gitUrlLayout = inputGroup.getElementsByClassName("input-monospace")[0];
      var sourceTreeUrl = gitUrlLayout.value;
      // Grab the buttons section at the bottom of the modal window to add our new button
      var buttonLayout = repoModal.getElementsByClassName("mt-2")[0];

      // Create the new button (link)
      var cloneToSourceTreeButton = document.createElement('a');
      // Set an ID so we can check for it later
      cloneToSourceTreeButton.id = cloneToSourceTreeButtonID;
      // Set the required classes (just match the current existing button's classes)
      cloneToSourceTreeButton.classList.add('flex-1');
      cloneToSourceTreeButton.classList.add('btn');
      cloneToSourceTreeButton.classList.add('btn-outline');
      cloneToSourceTreeButton.classList.add('get-repo-btn');
      // Set the button text 
      cloneToSourceTreeButton.innerHTML = "Open in Sourcetree";
      // Set it's link to open the SourceTree URL in SourceTree
      cloneToSourceTreeButton.setAttribute('href', "sourcetree://cloneRepo?cloneUrl=" + sourceTreeUrl + "&type=github");
      
      // Add our button to the existing button layout we got before
      buttonLayout.appendChild(cloneToSourceTreeButton);
    }
  }
})();