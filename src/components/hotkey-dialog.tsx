import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';


import {NkWindow} from "./window";
import {HotkeyList, HotkeyListProps} from "./hotkeyList";

/**
 * a dialog based on some basic window
 * TODO have an intermediate dialog class
 *
 *
 */


declare global {
    namespace JSX {
        interface IntrinsicElements {
            "nk-hotkey-list":any;//HotkeyListProps & Partial<HTMLElement>////HotkeyList;
        }
    }
}


export interface HotkeyDialogProps {
    defaultCombo:string
}




export class HotkeyDialog extends NkWindow {


    static get is() {
        return 'nk-hotkey-dialog'
    }

    public static get props() {
        return {
            ...super.getProps(), ...{
                defaultCombo: prop.string({attribute: true,default:"f1"}),

            }
        }
    }


    defaultCombo:string;
    renderedCallback() {
        super.renderedCallback();



    }

    renderCallback() {

      return super.renderCallback( <nk-hotkey-list></nk-hotkey-list>)

    }
}

customElements.define(HotkeyDialog.is, HotkeyDialog);

