import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';

import * as styles from './window.css';
import * as Draggable from 'Draggable';

import * as  Resizable from 'resizable';
import CSSClassHelper from "./CSSClassHelper"

/**
 * TODO body should contain  vertical horizontal or absolute container maybe there are stable implementations out there
 *
 * TODO how to use other components within render all   <nk-icon  size="lg" name="plus" ></nk-icon>
 * TODO have an optional footer
 * TODO have option to add custom icons in header
 * TODO "minimized" should trigger the toggleMinimizeWindow function in its set-method

 */


export interface WindowProps {
    title: string;
    caption: string;
    closingAction: string;
    minimized: boolean;
}


/**
 * a window class with typical actions and behaviour
 *
 *
 */

export class NkWindow extends Component<WindowProps> {
    static get is() {
        return 'nk-window'
    }


    static get props() {
        return {
            label: prop.string({attribute: true}),
            closingAction: prop.string({attribute: true, default: "remove"}),
            minimized: prop.boolean({
                attribute: true, default: false, set: function () {

                }
            })
        }
    }

    title: string;
    caption: string;
    closingAction: string;
    minimized: boolean;

    toggleMinimizeWindow(bMinimize:boolean) {

        var bodyCssSelector = "." + styles.body.toString();
        var hiddenClass = styles.hidden.toString();

        var classHelper = new CSSClassHelper(this.shadowRoot.querySelector(bodyCssSelector));

        bMinimize ? classHelper.addClass(hiddenClass) : classHelper.removeClass(hiddenClass);


    }

    closeWindow() {


        if (this.closingAction == "remove")
            this.remove();
        else if (this.closingAction == "hide")
            this.setAttribute("visible", "false");
        else
            throw new Error("unsupported closing action");

    }


    /**
     * todo use draggable from resizable instead of separate package
     */

    renderedCallback() {
        super.renderedCallback();


        var headSelector = "." + styles.head.toString();

        var mHandle = this.shadowRoot.querySelector(headSelector)   //.querySelector(":first-child").querySelector(":first-child");

        new Draggable(this, {
            handle: mHandle,
            grid: 10,
            onDrag: function () {


            }

        });


        var resizable = new Resizable(this, {
            //within: 'parent',
            handles: 's, se, e',
            threshold: 10,
            draggable: false
        });

    }

    bringToFront(e) {


        var queryResult = document.querySelectorAll("[focused]");

        for (let i in queryResult) {
            queryResult[i].removeAttribute("focused")
        }
        ;

        this.parentNode.appendChild(this);
        this.setAttribute("focused", "true");
        this.setAttribute("tabindex", "1");
        this.focus();
    }

    renderCallback() {


        return <div class={styles.window} onclick={this.bringToFront.bind(this)}>
            <div class={styles.head}><span>{this.title}</span>
                <span class={styles.headIcons}>

                      <span class={styles.iconMaximize}></span>
                      <span class={styles.iconMinimize} onclick={()=>this.toggleMinimizeWindow(this.minimized = !this.minimized)}></span>
                      <span class={styles.iconClose} onclick={this.closeWindow.bind(this)}></span>
                </span>
            </div>
            <div class={styles.body}>
                <slot class={styles.body}>{this.caption}</slot>
            </div>

        </div>
    }
}

customElements.define(NkWindow.is, NkWindow);