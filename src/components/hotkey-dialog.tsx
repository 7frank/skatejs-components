import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';


import {NkWindow} from "./window";
import {HotkeyList, HotkeyListProps} from "./hotkeyList";


//import "./hotkey-dialog.css"
import * as styles from './hotkey-dialog.css';


/**
 * a dialog based on some basic window. For now there is no ok/cancel behaviour.
 * TODO have an intermediate dialog class
 *
 *
 */


declare global {
    namespace JSX {
        interface IntrinsicElements {
            "nk-hotkey-list": any;//HotkeyListProps & Partial<HTMLElement>////HotkeyList;
        }
    }
}


export interface HotkeyDialogProps {
    defaultCombo: string
}


export class HotkeyDialog extends NkWindow {


    static get is() {
        return 'nk-hotkey-dialog'
    }

    public static get props() {
        return {
            ...super.getProps(), ...{
                defaultCombo: prop.string({attribute: true, default: "f1"}),

            }
        }
    }


    defaultCombo: string;

    renderedCallback() {
        super.renderedCallback();

        //TODO remove as soon as it gets old :->
        var css = "font-weight: bold; font-size: 30px;color: red; text-shadow: 2px 2px 0 rgb(217,31,38) , 4px 4px 0 rgb(226,91,14) , 6px 6px 0 rgb(245,221,8) , 8px 8px 0 rgb(5,148,68) , 10px 10px 0 rgb(2,135,206) , 12px 12px 0 rgb(4,77,145) , 14px 14px 0 rgb(42,21,113)"
        console.log("%cKey-Map %s", css, 'hit "'+this.defaultCombo+'" to trigger the configuration dialog');

        var hkList: HotkeyList = this.shadowRoot.querySelector("#hotkeys")
       var Hotkeys=hkList.getHotkeysInstance()
        Hotkeys.register("Toggle Keymap Dialog.", [{combo:this.defaultCombo,locked: true}])

        Hotkeys().on("Toggle Keymap Dialog.", function () {

            var d = this.style.display

            this.style.display = d == "none" ? "" : "none"

        }.bind(this) )

    }


    renderCallback() {
        var css:any=styles



        return super.renderCallback( [<style>{css._getCss()}</style>,<nk-hotkey-list id="hotkeys"></nk-hotkey-list>])

    }


    /**
     * pauses bound actions from triggering when combo is hit
     */
    pause() {
        var hkList: HotkeyList = this.shadowRoot.querySelector("#hotkeys")
        hkList.pause()
    }

    /**
     * resumes triggering bound actions   when combo is hit
     */
    unpause() {
        var hkList: HotkeyList = this.shadowRoot.querySelector("#hotkeys")
        hkList.unpause()

    }

}

customElements.define(HotkeyDialog.is, HotkeyDialog);

