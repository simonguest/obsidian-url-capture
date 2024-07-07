chrome.commands.onCommand.addListener((command) => {
  if (command === "append-url") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      const url = activeTab.url;
      const title = activeTab.title;
      const dateTime = new Date().toLocaleString();

      chrome.storage.sync.get(["vaultName"], (result) => {
        const vaultName = result.vaultName || "MyVault";
        const data = 
`
URL: ${url}
Title: ${title}
Captured: ${dateTime}

`;
        const encodedData = encodeURIComponent(data);
        const obsidianUri = `obsidian://advanced-uri?vault=${vaultName}&daily=true&mode=append&data=${encodedData}`;

        chrome.tabs.create({ url: obsidianUri });
      });
    });
  }
});