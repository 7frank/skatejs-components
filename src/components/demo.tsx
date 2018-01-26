import {addHotkeys} from "./hotkeyList"


document.addEventListener("DOMContentLoaded", function () {
    addDemohandlers()
});

//we need to export something so it does not get removed

export function addDemohandlers() {
    const demoTags = [
        {
            combo: "ctrl+,", action: "save File", handler: function () {
            console.log("hello hotkeylist", arguments)
        }.bind(this),
            description: "a sample entry for the hotkeylist"
        },
        {
            category:"test",
            combo: "ctrl+ä", action: "doSomething", handler: function () {
            console.log("hello hotkeylist", arguments)
        }.bind(this),
            description: "a sample entry for the hotkeylist"
        }
    ];

    for (let entry of demoTags)
        addHotkeys(entry.action, entry.combo, entry.handler, entry)

}