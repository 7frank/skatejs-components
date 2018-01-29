import {addHotkeys} from "./hotkeyList"
import {logHotkeyList}from "@nk/keyboard-interactions"

document.addEventListener("DOMContentLoaded", function () {
    addDemohandlers()
});

//we need to export something so it does not get removed

var lorem="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."

export function addDemohandlers() {
    const demoTags = [
        {
            combo: "f1", action: "dump keys to console", handler: function () {
            logHotkeyList()
        }.bind(this),
            description: lorem
        },
        {
            combo: "ctrl+,", action: "save File", handler: function () {
            console.log("hello hotkeylist", arguments)
        }.bind(this),
            description: lorem
        },
        {
            category:"test",
            combo: ["ctrl+ä","shift+z"], action: "doSomething", handler: function () {
            console.log("hello hotkeylist", arguments)
        }.bind(this),
            description: "a sample entry for the hotkeylist"
        }
    ];

    for (let entry of demoTags)
        addHotkeys(entry.action, entry.combo, entry.handler, entry)

}