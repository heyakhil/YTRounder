
const getTabId = () => {
    return chrome.tabs.query({active:true, currentWindow:true})
}

const removeIndexFromLocal = () => {
    localStorage.removeItem('index')
}

const runFuntion = async () => {
    let newUrl ='https://www.youtube.com/results?search_query=app+development+company+india'
    const tab = await getTabId()

    await chrome.tabs.update(tab[0].id, {url: newUrl})
    await chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
        console.log('changeInfo.status', typeof changeInfo.status)
        if (changeInfo.status === 'complete') {
            console.log('Chaly kya')
            console.log('checkingtheindex', index)
            chrome.scripting.executeScript({
                target: {tabId},
                files  : ["scraping/scrapData.js"],
            }).then((result) => console.log('SCritp injected 2222', result))
        }
    })
}

const clearnFunction = async() => {
    const tab = await getTabId()
    await chrome.tabs.update(tab[0].id, {url: "https://www.youtube.com/"})
    await chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
        chrome.scripting.executeScript({
            target : {tabId},
            func : removeIndexFromLocal,
        }).then(() => console.log("injected a function"));
    })
}
    


const btn = document.getElementById('startbtn').addEventListener('click',  runFuntion)
const clearnBtn = document.getElementById('clear').addEventListener('click',  clearnFunction)