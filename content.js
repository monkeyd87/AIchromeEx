

const images = document.querySelector('.mw-file-element').src
const data = document.body.innerText
chrome.runtime.sendMessage({action:'sendData',src:images, data},function(res){
  
   
})
