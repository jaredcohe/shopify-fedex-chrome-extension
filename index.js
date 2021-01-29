chrome.browserAction.onClicked.addListener(function(activeTab){
  // Logs to chrome extension details page
  console.log("Shopify FedEx Chrome Extension logging BEFORE");
  console.log('Turning ' + activeTab.url + ' red!');

  // Get the data on click and pass it to the other tab
  chrome.tabs.executeScript(
    null, // Logging in this code block logs in the source chrome console
    { code: 'var data = []; data[0] = document.getElementsByName("firstName")[0].value; console.log(data[0]); data[1] = document.getElementsByName("lastName")[0].value; data[2] = document.getElementsByName("address1")[0].value; data[3] = document.getElementsByName("address2")[0].value; data[4] = document.getElementsByName("city")[0].value; data[5] = document.getElementsByName("province")[0].value; data[6] = document.getElementsByName("zip")[0].value; data[7] = document.getElementsByName("country")[0].value; data[8] = document.querySelectorAll(\'input[value^="+1"]\')[0].value.substring(3); console.log("logs to source chrome console"); data'
  }, function(data) {
    var newURL = "https://www.fedex.com/shipping/shipEntryAction.do?method=doEntry&link=1&locale=en_US&urlparams=us&sType=F";
    chrome.tabs.create({ url: newURL, selected: true, active: true },
      function(tab) {
          // Logs to chrome extension details page
          console.log("created tab, pass data");
          console.log(tab);
          console.log(data);
          console.log(data[0]);
          console.log(data[0][6]);
          fillForm(data);
    });
  });
});

// Find the fedex tab and fill the form
function fillForm(data) {
  chrome.tabs.query({currentWindow: true, url: "*://www.fedex.com/*" }, function(tabs) {
    // Logs to chrome extension details page
    console.log(data); console.log(data[0]); console.log(data[0][0]); console.log(tabs); console.log(tabs[0]); console.log(tabs[1]); chrome.tabs.executeScript( tabs[0].id,
      { code: 'console.log("XXX: Log to target chrome console"); console.log("' + data[0][0] + ': Log to target chrome console"); document.getElementById("toData.contactName").value = "' + data[0][0] + ' ' + data[0][1] + '"; document.getElementById("toData.addressLine1").value = "' + data[0][2] + '"; document.getElementById("toData.addressLine2").value = "' + data[0][3] + '"; document.getElementById("toData.city").value = "' + data[0][4] + '"; document.getElementById("toData.stateProvinceCode").value = "' + data[0][5] + '"; document.getElementById("toData.zipPostalCode").value = "' + data[0][6] + '"; document.getElementById("toData.phoneNumber").value = "' + data[0][8] + '";'
      }
    );
  });
};
