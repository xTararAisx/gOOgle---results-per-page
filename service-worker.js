const RULE_ID = 1;

updateRuleFromStorage();

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.numResults) {
    updateRule(changes.numResults.newValue);
  }
});

function updateRuleFromStorage() {
  chrome.storage.sync.get({numResults: "100"}, (data) => {
    updateRule(data.numResults);
  });
}

function updateRule(num) {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [RULE_ID],
    addRules: [buildRule(num)]
  }, () => {
    console.log("Rule set to ", num);
  });
}

function buildRule(num) {
  return {
    "id": RULE_ID,
    "priority": 1,
    "action": {
      "type": "redirect",
      "redirect": {
        "transform": {
          "queryTransform": {
            "addOrReplaceParams": [
              {"key": "num", "value": String(num)}
            ]
          }
        }
      }
    },
    "condition": {
      "urlFilter": "*://www.google.com/search*",
      "resourceTypes": ["main_frame"]
    }
  };
}
