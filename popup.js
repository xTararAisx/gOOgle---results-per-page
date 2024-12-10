document.addEventListener('DOMContentLoaded', () => {
  const numInput = document.getElementById('numInput');
  const setBtn = document.getElementById('setBtn');
  const status = document.getElementById('status');

  // Load current value
  chrome.storage.sync.get({numResults: "100"}, (data) => {
    numInput.value = data.numResults;
  });

  setBtn.addEventListener('click', () => {
    const val = numInput.value.trim();
    if (!val || isNaN(val) || val < 1) {
      status.textContent = "Please enter a valid number.";
      return;
    }
    chrome.storage.sync.set({numResults: val}, () => {
      status.textContent = "Number of results set to " + val;
    });
  });
});
