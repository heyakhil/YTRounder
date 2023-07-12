const clear = (() => {
    const defined = v => v !== null && v !== undefined;
    const timeout = setInterval(() => {
        const ad = [...document.querySelectorAll('.ad-showing')][0];
        if (defined(ad)) {
            const video = document.querySelector('video');
            if (defined(video)) {
                video.currentTime = video.duration;
            }
        }
    }, 500);
    return function() {
        clearTimeout(timeout);
    }
})();



async function ManagerPlayButton(indexLink) {
    const totalTime = 30000
    const playerDetails = await document.getElementById('ytd-player')
    const childData = playerDetails.querySelectorAll('#container #movie_player .ytp-chrome-bottom .ytp-chrome-controls .ytp-left-controls button')
    const subscribeBtn = document.querySelector('#subscribe-button button')

    setTimeout(() => {
        window.scroll(0, 500)
        //Pause the video
        // subscribeBtn.click()
        childData[0].click()
    }, totalTime)

    //Write the comment 
    setTimeout(() => {
        const something = document.getElementById('placeholder-area')
        something.click()
        const writeMessage = document.getElementById('contenteditable-root')
        writeMessage.textContent = "I love this song"
    }, totalTime*2)
    
    // Submit the comment
    setTimeout(() => {
        // const addComment = document.querySelectorAll('#buttons #submit-button button')
        // console.log('AddComments', addComment)
        // addComment[0].disabled = false
        // addComment[0].click()
    },  (totalTime*2)+10000)

    //Go to the next video
    setTimeout(async() => {
        localStorage.setItem("index",indexLink+1);
        await RunningSctiptio(arr[indexLink], indexLink)
    }, (totalTime*2)+20000)
}

const arr = [
    {
        url:'https://www.youtube.com/results?search_query=waxing+stand+up+comedy',
        isSubscribe: true,
        isLike: true,
        isComment: true,
        commentMsg: 'I love this song',
        watchHr: 30000
    },
    {
        url:'https://www.youtube.com/results?search_query=calm+down',
        isSubscribe: false,
        isLike: true,
        isComment: true,
        commentMsg: 'I love this song',
        watchHr: 10000
    },
    {
        url:"https://www.youtube.com/results?search_query=grind",
        isSubscribe: true,
        isLike: true,
        isComment: false,
        commentMsg: 'I love this song',
        watchHr: 30000
    },
    {
        url:"https://www.youtube.com/results?search_query=machayenge",
        isSubscribe: true,
        isLike: true,
        isComment: true,
        commentMsg: 'I love this song',
        watchHr: 30000
    },
    {
        url:"https://www.youtube.com/results?search_query=pasoori",
        isSubscribe: false,
        isLike: false,
        isComment: false,
        commentMsg: 'I love this song',
        watchHr: 30000
    },
    
]



const RunningSctiptio = async (url, index = -1) => {
    console.log("index-=-==-=-",index)
    if(url){
        window.location.replace(url);
    }
    const contentList = document.querySelectorAll('#contents ytd-video-renderer #dismissible #title-wrapper a')
    contentList && contentList[0].click()
    
    setTimeout(() => {
        if(document.readyState === 'complete'){
            if(document.querySelector("div.ad-showing")){
                clear()
            }
            console.log("Yes page is loaded")
            ManagerPlayButton(index)   
        }
    }, 10000); 
    
}

let index = localStorage.getItem("index");
if(index == null || index == ""){
    localStorage.setItem("index", 0);
    index = 0;                        
}else{
    index = parseInt(index);
}
console.log("-=-==-=-",index)

RunningSctiptio("",index)