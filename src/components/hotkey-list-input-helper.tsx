//import { h, render } from 'preact'
//import 'preact/devtools'
//import Main from './components/Main'


/*
render((
    <Main />
), mountNode, mountNode.lastChild)
*/




declare var Promise: any;

export function getElementFromEvent(e) {
    return e.currentTarget || (e.path && e.path[0])

}


export function createDialog(opt) {

    //TODO elements get re-rendered a lot on initialization
    // console.log(opt)

    var HI = opt.el._instance
    if (!HI.startRecording) console.error("createInputItemAlt needs a proper instance of humaninput see: %c npm search humaninput", 'color: #bada55')


    return new Promise(function (ok, fail) {


        var mInterval;
        var that;
        var filter;//for textarea to work
        function onFocus(evt) {
            that = this;
            //backup filter
            filter = HI.filter

            HI.filter = (e) => {
                return true
            }

            console.log("target", evt)

            HI.startRecording();

            //every now and then update the view.. to get the current combo
            mInterval = setInterval(function () {

                updateInputField(evt)

            }, 1000)


        }


        //on input blur finalize the combo
        function onBlur(evt) {
            var allEvents = HI.stopRecording();
            clearInterval(mInterval)
            //restore filter
            HI.filter = filter

            ok(allEvents)


        }


        //helper
        function updateInputField(evt) {
            var allEvents = HI.stopRecording();
            console.log("event-sequence", evt, [allEvents])
            //write result into input element
            getElementFromEvent(evt).value = allEvents.join(" ");
        }


        var dlg= document.createElement("nk-window")
        dlg.title = "create custom key sequence"
        document.body.appendChild(dlg)

        var input = document.createElement("textarea")
        dlg.appendChild(input)

        var okBtn = document.createElement("button")
        okBtn.innerText="ok"
        dlg.appendChild(okBtn)
        dlg.addEventListener("click",function(){


//FIXME importin preact devtools breaks stuff
          //  const mountNode = dlg//document.getElementById('root')
           // render((<div>test</div>), mountNode, mountNode.lastChild)





            //FIXME proper typing ...
            dlg['closeWindow']()
        })

       // input.addEventListener("focus mouseenter", onFocus)
       // input.addEventListener("blur mouseleave", onBlur)


    })


}

