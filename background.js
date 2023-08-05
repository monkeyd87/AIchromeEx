let storedData;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.action == 'sendData'){
        
        storedData =message
        sendResponse('working')

    }

    if(message.action == 'getData'){
        sendResponse(storedData)
    }
   
});
