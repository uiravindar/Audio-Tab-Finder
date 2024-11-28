let highlightColor = '#ff4500'; // Default color

// Function to update tab highlighting and change icons
function updateTabHighlighting() {
  browser.tabs.query({}).then(tabs => {
    tabs.forEach(tab => {
      // Check if audio or video is playing in the tab
      browser.tabs.executeScript(tab.id, {
        code: checkMediaPlaying.toString()
      }).then(result => {
        if (result && result[0]) {
          const { mediaType, isPlaying } = result[0];

          // Set the tab color and update the icon based on media type
          if (isPlaying) {
            browser.tabs.executeScript(tab.id, {
              code: changeTabColorAndIcon.toString() + `(${JSON.stringify(mediaType)})`
            });
          } else {
            // Reset the tab color and icon if no media is playing
            browser.tabs.executeScript(tab.id, {
              code: resetTabColorAndIcon.toString()
            });
          }
        }
      });
    });
  });
}

// Function to check if audio or video is playing
function checkMediaPlaying() {
  const audio = document.querySelector('audio');
  const video = document.querySelector('video');
  
  if (audio && !audio.paused && !audio.ended) {
    return { mediaType: 'audio', isPlaying: true };
  }
  
  if (video && !video.paused && !video.ended) {
    return { mediaType: 'video', isPlaying: true };
  }

  return { mediaType: null, isPlaying: false };
}

// Function to change tab color and icon based on media type
function changeTabColorAndIcon(mediaType) {
  // Change tab background color
  document.documentElement.style.backgroundColor = highlightColor;
  
  // Set the icon based on media type
  if (mediaType === 'audio') {
    browser.browserAction.setIcon({ path: "audio_icon.png" });
  } else if (mediaType === 'video') {
    browser.browserAction.setIcon({ path: "video_icon.png" });
  }
}

// Reset the tab color and icon when no media is playing
function resetTabColorAndIcon() {
  document.documentElement.style.backgroundColor = ''; // Reset background color
  browser.browserAction.setIcon({ path: "default_icon.png" }); // Reset icon
}

// Listen for tab updates and media events
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateTabHighlighting();
  }
});

// Periodically check for changes in media playback
setInterval(updateTabHighlighting, 1000);
