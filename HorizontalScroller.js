(function(){

if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

const css = `
.horizontal_scroller{
    transform: translateZ(0);
}

.horizontal_scroller .left_arrow{
    position: fixed;
    left: 0;
    top: 0;

    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 6px;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    
    font-weight: bold;
    font-size: 3em;
    color: black;
    user-select: none;
    
    opacity: 0;
    transition-duration: 400ms;
}

.horizontal_scroller .left_arrow:hover{
    opacity: 1;
    cursor: pointer;
}

.horizontal_scroller .right_arrow{
    position: fixed;
    right: 0;
    top: 0;

    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 6px;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    
    font-weight: bold;
    font-size: 3em;
    color: black;
    user-select: none;
    
    opacity: 0;
    transition-duration: 400ms;
}

.horizontal_scroller .right_arrow:hover{
    opacity: 1;
    cursor: pointer;
}


.horizontal_scroller_content{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    height: {0} {1};
} 
`;

const css2 = `
.horizontal_scroller_content{
    /*hide the scrollbar*/
    -ms-overflow-style: none; /*ie and edge*/
    scrollbar-width: none; /*firefox*/
}


/*hide the scrollbar in webkit*/
.horizontal_scroller_content::-webkit-scrollbar {
    display: none;
}
`;

window.buildHorizontalScrollers = (height = 400, unit = "px", hideScrollbars = false) => {

    //Adding css rules
    var style = document.createElement('style');
    let finalCss = css.format(height,unit) + (hideScrollbars ? css2 : "");
    style.appendChild(document.createTextNode(finalCss));
    document.getElementsByTagName('head')[0].appendChild(style);


    let scrollers = document.querySelectorAll(".horizontal_scroller");
    for(e of scrollers){

        //Already built scrollers shouldn't be rebuilt
        if(e.classList.contains("hs_built")) continue;

        e.classList.add("hs_built");
        let innerHtml = e.innerHTML;
        e.innerHTML = `
        <div class="left_arrow" onclick="leftArrowClick(event)">&#x276e</div>
        <div class="horizontal_scroller_content">${innerHtml}</div>
        <div class="right_arrow" onclick="rightArrowClick(event)">&#x276f</div>`;
    }
    

}

window.buildSingleScroller = (element, height = 400, unit = "px", hideScrollbar = false) => {

    if(!element || !element.classList || !element.classList.contains("horizontal_scroller")) return;
    if(element.classList.contains("hs_built")){
        console.error("This element is already a scroller");
        return;
    }

    //Adding css rules
    var style = document.createElement('style');
    let finalCss = css.format(height,unit) + (hideScrollbar ? css2 : "");
    style.appendChild(document.createTextNode(finalCss));
    document.getElementsByTagName('head')[0].appendChild(style);

    element.classList.add("hs_built");

    let innerHtml = element.innerHTML;
    element.innerHTML = `
    <div class="left_arrow" onclick="leftArrowClick(event)">&#x276e</div>
    <div class="horizontal_scroller_content">${innerHtml}</div>
    <div class="right_arrow" onclick="rightArrowClick(event)">&#x276f</div>`;   

}

window.resetScroller = (element) => {
    if(!element.classList.contains("hs_built")) return;

    let html = element.querySelector(".horizontal_scroller_content").innerHTML;
    element.innerHTML = html;

    element.classList.remove("hs_built");
}

//I did some tests, this version is slower over big collections of child elements. It triggers layout calculations and repainting many more times
function buildHorizontalScrollers_slower(height = 400, unit = "px", hideScrollbars = false){

    //Adding css rules
    var style = document.createElement('style');
    let finalCss = css.format(height,unit) + (hideScrollbars ? css2 : "");
    style.appendChild(document.createTextNode(finalCss));
    document.getElementsByTagName('head')[0].appendChild(style);
    
    

    let scrollers = document.querySelectorAll(".horizontal_scroller");
    for(e of scrollers){

        //Already built scrollers shouldn't be rebuilt
        if(e.classList.contains("hs_built")) continue;

        let content = document.createElement("div");
        content.classList.add("horizontal_scroller_content");

        let leftArrow = document.createElement("div");
        leftArrow.classList.add("left_arrow");
        leftArrow.appendChild(document.createTextNode("\u276e"));
        leftArrow.addEventListener("click",leftArrowClick);

        let rightArrow = document.createElement("div");
        rightArrow.classList.add("right_arrow");
        rightArrow.appendChild(document.createTextNode("\u276f"));
        rightArrow.addEventListener("click",rightArrowClick);

        let len = e.children.length;
        for(var i=0; i<len; i++){
            console.log(i);
            let child = e.children[0];
            child.remove();
            content.appendChild(child);
        }

        e.appendChild(leftArrow);
        e.appendChild(content);
        e.appendChild(rightArrow);
    }

}


window.leftArrowClick = (e) => {
    scrollToRight(e.target.nextElementSibling)
}


window.rightArrowClick = (e) => {
    scrollToLeft(e.target.previousElementSibling)
}


function scrollToLeft(element = null){
    if(element == null) return;
    element.scroll({
        top: 0,
        left: element.scrollLeft + element.offsetWidth/2,
        behavior: "smooth"
    });
}

function scrollToRight(element = null){
    if(element == null) return;
    element.scroll({
        top: 0,
        left: element.scrollLeft - element.offsetWidth/2,
        behavior: "smooth"
    });
}

})()