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

        var hkList: HotkeyList = this.shadowRoot.querySelector("#hotkeys")
        hkList.addHotkeys("Toggle Keymap Dialog.", [{combo:this.defaultCombo,locked: true}], function () {

            var d = this.style.display

            this.style.display = d == "none" ? "" : "none"

        }.bind(this), )

    }

    addHotkeys(...args)
    {
        console.log(this,args)
       var  hkList:HotkeyList = this.shadowRoot.querySelector('#hotkeys');
        return hkList.addHotkeys(...args)
    }

    renderCallback() {
        var css:any=styles



        return super.renderCallback( [<style>{css._getCss()}</style>,<nk-hotkey-list id="hotkeys"></nk-hotkey-list>])

    }
}

customElements.define(HotkeyDialog.is, HotkeyDialog);

