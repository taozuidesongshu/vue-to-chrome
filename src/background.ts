// 如果manifest.json未配置 action.default_popup，点击扩展按钮会触发此事件

// chrome.action.onClicked.addListener(tab => {
//     console.log('点击了插件图标')
//     if (tab.id) {
//         chrome.tabs.sendMessage(tab.id, { toggleVisible: true });
//     }
// });

// 插件激活
chrome.tabs.onActivated.addListener(handlePopup)

// 页签变更
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     if (changeInfo.status === 'loading') {
//         handlePopup()
//     }
// })

// 监听来自content-script的消息
// chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
//  switch (request.code) {
//      case 'desc':{
//
//      }
//      break
//      case 'save':{
//
//      }
//          break
//  }
// })


// 页面切换
function handlePopup(isLogin) {
    console.log(chrome)
   //  chrome.tabs.query({
   //      active: true,
   //      currentWindow: true,
   //      windowId: chrome.windows.WINDOW_ID_CURRENT
   //  }, async(tabs) => {
   //      const fileName = await regUrl(tabs[0].url, isLogin)
   //      const html = `popups/${fileName}.html`
   //      if (['popups/category.html', 'popups/detail.html'].includes(html)) {
   //          chrome.action.setIcon({
   //              path: '/assets/images/icon_default.png',
   //              tabId: tabs[0].id
   //          })
   //      }
   //      chrome.action.setPopup({
   //          popup: html,
   //          tabId: tabs[0].id
   //      })
   // })
}

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