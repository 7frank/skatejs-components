import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';

import * as styles from './window.css';



import * as  Resizable from 'resizable';
import CSSClassHelper from "./CSSClassHelper"

import "./icon"

/*
import "jquery.scrollbar/jquery.scrollbar.css"
import "jquery.scrollbar"
*/


import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

/*


import "simple-scrollbar"
import "simple-scrollbar/simple-scrollbar.css"


declare global {
    const SimpleScrollbar: any
}

 */

/**
 * NOTE to use other web-components improt them and check that you define them either via "window.d.ts"  file or  see https://github.com/Microsoft/TypeScript/issues/15449 for inline global
 *
 * TODO body should contain  vertical horizontal or absolute container maybe there are stable implementations out there
 * TODO have an optional footer
 * TODO have option to add custom icons in header
 * TODO "minimized" should trigger the toggleMinimizeWindow function in its set-method
 * FIXME in chrome, shadow dom does things differently and styles won't be rendered for elements the way we import them currently
 */


enum WindowAction {
    Minimize,
        Maximize,
        Close
}


export enum WindowClosingAction {
    Remove,
        Hide
}

const ClosingActionProp =prop.create<WindowClosingAction>({});



export interface HotkeyDialogProps {

}




/**
 * a window class with typical actions and behaviour
 *
 *
 */

export class HotkeyDialog extends HotkeyList<HotkeyDialogProps> {


    static get is() {
        return 'nk-hotkey-dialog'
    }

    static get props() {
        return {
            label: prop.string({attribute: true}),
            closingAction:ClosingActionProp({attribute: true, default: WindowClosingAction.Remove}),
            minimized: prop.boolean({
                attribute: true, default: false, set: function () {

                }
            }),
            maximized: prop.boolean({
                attribute: true, default: false
            }),
            useColor: prop.boolean({attribute: true, default: false})
        }
    }

  



    renderedCallback() {
        super.renderedCallback();



    }

    renderCallback() {


        return <div class={styles.window} onclick={this.bringToFront.bind(this)}>
    <div class={styles.head}><span>{this.title}</span>
        <span class={styles.headIcons}>
    <nk-icon name="window-minimize" class={this.useColor ? styles.iconMinimize : ""}
        onclick={() => this.setWindowAction(WindowAction.Minimize, this.minimized = !this.minimized)}></nk-icon>
        <nk-icon name="window-maximize"
        onclick={() => this.setWindowAction(WindowAction.Maximize, this.maximized = !this.maximized)}
    class={this.useColor ? styles.iconMaximize : ""}></nk-icon>
        <nk-icon name="close" class={this.useColor ? styles.iconClose : ""}
        onclick={this.closeWindow.bind(this)}></nk-icon>
        </span>
        </div>
        <div ss-container class={styles.body}>
    <slot class={styles.body}>{this.caption}</slot>
        </div>

        </div>
    }
}

customElements.define(HotkeyDialog.is, HotkeyDialog);