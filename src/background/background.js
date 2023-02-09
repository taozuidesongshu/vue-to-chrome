// importScripts('./a.js')


chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  switch (request.type) {
    case "Cookie": {
      ChromegetCookie(request.url, request.name).then(res=>{
        sendResponse(res)
      })
      return true
    }
  }
})
function ChromegetCookie(url, name) {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({ 'url': url, 'name': name }, function(cookie) {
      if (cookie) {
        resolve(cookie.value)
      } else {
        resolve(false)
      }
    })
  })
}