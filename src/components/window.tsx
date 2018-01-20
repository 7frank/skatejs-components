import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';

import * as styles from './window.css';
import * as Draggable from 'Draggable';

import * as  Resizable from 'resizable';
import CSSClassHelper from "./CSSClassHelper"

import "./icon"

/**
 * NOTE to use other web-components improt them and check that you define them either via "window.d.ts"  file or  see https://github.com/Microsoft/TypeScript/issues/15449 for inline global
 *
 * TODO body should contain  vertical horizontal or absolute container maybe there are stable implementations out there
 * TODO have an optional footer
 * TODO have option to add custom icons in header
 * TODO "minimized" should trigger the toggleMinimizeWindow function in its set-method

 */


export interface WindowProps {
    title: string;
    caption: string;
    closingAction: string;
    minimized: boolean;
    useColor: boolean;
}


/**
 * a window class with typical actions and behaviour
 *
 *
 */

export class NkWindow extends Component<WindowProps> {
    title: string;
    caption: string;
    closingAction: string;
    minimized: boolean;
    useColor: boolean;

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
            }),
            useColor: prop.boolean({attribute: true, default: false})
        }
    }

    /**
     *
     * @param {string} icon - fa icon string without the "fa-" prefix {@link http://fontawesome.io/} latest versions of icons might not be supported
     * @param {(e: Event) => void} handler - a event handler
     * @param {string} what - the event on which the handler will be triggered
     * @returns {ElementTagNameMap[keyof ElementTagNameMap]} - the instance of the icon created
     */

    addHeaderIconFontAwesome(icon: string, handler: (e: Event) => void, what: string = "click") {
        return this.addHeaderIcon('<nk-icon size="lg" name='+icon+' ></nk-icon>',handler,what);

    }

    /**
     * @param {string} icon - DOM string of the content that should be visible
     * @param {(e: Event) => void} handler - a event handler
     * @param {string} what - the event on which the handler will be triggered
     * @returns {ElementTagNameMap[keyof ElementTagNameMap]} - the instance of the icon created
     */
    addHeaderIcon(icon: string, handler: (e: Event) => void, what: string = "click") {
        var cl = "." + styles.headIcons.toLocaleString();

        var el = this.shadowRoot.querySelector(cl);

        el.insertAdjacentHTML('afterbegin', icon);
        el.addEventListener(what, handler);

        return el

    }

    toggleMinimizeWindow(bMinimize: boolean) {

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

        var mHandle = this.shadowRoot.querySelector(headSelector);

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
                      <nk-icon size="lg" name="window-maximize"
                               class={this.useColor ? styles.iconMaximize : ""}></nk-icon>
                      <nk-icon size="lg" name="window-minimize" class={this.useColor ? styles.iconMinimize : ""}
                               onclick={() => this.toggleMinimizeWindow(this.minimized = !this.minimized)}></nk-icon>
                      <nk-icon size="lg" name="close" class={this.useColor ? styles.iconClose : ""}
                               onclick={this.closeWindow.bind(this)}></nk-icon>
                </span>
            </div>
            <div class={styles.body}>
               <slot class={styles.body}>{this.caption}</slot>
            </div>

        </div>
    }
}

customElements.define(NkWindow.is, NkWindow);