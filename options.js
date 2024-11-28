document.getElementById('save').addEventListener('click', () => {
    const color = document.getElementById('color').value;
    browser.storage.sync.set({ highlightColor: color }).then(() => {
      alert('Color saved!');
    });
  });
  