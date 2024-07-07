document.addEventListener('DOMContentLoaded', () => {
  const vaultNameInput = document.getElementById('vaultName');
  const saveButton = document.getElementById('save');

  chrome.storage.sync.get(['vaultName'], (result) => {
    if (result.vaultName) {
      vaultNameInput.value = result.vaultName;
    }
  });

  saveButton.addEventListener('click', () => {
    const vaultName = vaultNameInput.value;
    chrome.storage.sync.set({ vaultName }, () => {
      alert('Vault name saved!');
    });
  });
});