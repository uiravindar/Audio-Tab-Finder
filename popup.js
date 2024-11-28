// Retrieve the saved color and set it to the color picker
browser.storage.sync.get('highlightColor').then(data => {
    if (data.highlightColor) {
      document.getElementById('colorPicker').value = data.highlightColor;
    }
  });
  
  // Listen for changes in color and save the selected color
  document.getElementById('colorPicker').addEventListener('input', (event) => {
    const color = event.target.value;
    browser.storage.sync.set({ highlightColor: color });
  });
  