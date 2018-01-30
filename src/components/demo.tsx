import {addHotkeys, IOptions} from "./hotkeyList"
import {logHotkeyList} from "@nk/keyboard-interactions"

document.addEventListener("DOMContentLoaded", function () {
    addDemohandlers()
});






//we need to export something so it does not get removed

var lorem = "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."

export function addDemohandlers() {
    const demoTags:IOptions[]  = [
        {
            combo: "f2", action: "dump keys to console", handler: function () {
            logHotkeyList()
        },
            description: lorem
        },
        {
            combo: "ctrl+,", action: "alert(123)", handler: function () {
            alert(123)
        },
            description: lorem
        },
        {
            category: "test",
            combo: ["ctrl+ä", "shift+z"], action: "multipass", handler: function () {
            console.log("hello hotkeylist", arguments)
        },
            description: "a sample entry for the hotkeylist"
        },{
            combo: ["up up down down","up up down down left right left right b a enter"], action: "chain combos", handler: function () {
                alert('konami code');
            },
            description: "mousetrap allows for chaining of keyboard events. in this case entering the sequence 'up up down down left right left right b a enter' will trigger the handler NOTE: currently stopPropagation and preventDefault aren't used"
        }
    ];


  //  let demoTagsHelper :IOptions[] = demoTags
    for (let entry of demoTags)
       addHotkeys(entry.action, entry.combo, entry.handler, entry)

}

