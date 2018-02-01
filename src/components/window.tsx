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

/**
* TODO and another case of .. explicite declare, which we'd like to avoid. so for now a simple string instead of import,declare will do
 **/
//import 'perfect-scrollbar/css/perfect-scrollbar.css';
//import scrollbarCSS = require('./perfect-scrollbar.css.txt');
var scrollbarCSS=`.ps__rail-x,.ps__rail-y{display:none;opacity:0;position:absolute}.ps{overflow:hidden!important;overflow-anchor:none;-ms-overflow-style:none;touch-action:auto;-ms-touch-action:auto}.ps__rail-x{transition:background-color .2s linear,opacity .2s linear;-webkit-transition:background-color .2s linear,opacity .2s linear;height:15px;bottom:0}.ps__rail-y{transition:background-color .2s linear,opacity .2s linear;-webkit-transition:background-color .2s linear,opacity .2s linear;width:15px;right:0}.ps--active-x>.ps__rail-x,.ps--active-y>.ps__rail-y{display:block;background-color:transparent}.ps--focus>.ps__rail-x,.ps--focus>.ps__rail-y,.ps--scrolling-x>.ps__rail-x,.ps--scrolling-y>.ps__rail-y,.ps:hover>.ps__rail-x,.ps:hover>.ps__rail-y{opacity:.6}.ps__rail-x:focus,.ps__rail-x:hover,.ps__rail-y:focus,.ps__rail-y:hover{background-color:#eee;opacity:.9}.ps__thumb-x,.ps__thumb-y{background-color:#aaa;border-radius:6px;position:absolute}.ps__thumb-x{transition:background-color .2s linear,height .2s ease-in-out;-webkit-transition:background-color .2s linear,height .2s ease-in-out;height:6px;bottom:2px}.ps__thumb-y{transition:background-color .2s linear,width .2s ease-in-out;-webkit-transition:background-color .2s linear,width .2s ease-in-out;width:6px;right:2px}.ps__rail-x:focus>.ps__thumb-x,.ps__rail-x:hover>.ps__thumb-x{background-color:#999;height:11px}.ps__rail-y:focus>.ps__thumb-y,.ps__rail-y:hover>.ps__thumb-y{background-color:#999;width:11px}@supports (-ms-overflow-style:none){.ps{overflow:auto!important}}@media screen and (-ms-high-contrast:active),(-ms-high-contrast:none){.ps{overflow:auto!important}}`

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



export interface WindowProps {
    title: string;
    caption: string;
    closingAction: WindowClosingAction;
    minimized: boolean;
    maximized: boolean;
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
    closingAction: WindowClosingAction;
    minimized: boolean;
    maximized: boolean;
    useColor: boolean;

    static get is() {
        return 'nk-window'
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

    public static getProps()
    {
        return NkWindow.props
    }


    /**
     *
     * @param {string} icon - fa icon string without the "fa-" prefix {@link http://fontawesome.io/} latest versions of icons might not be supported
     * @param {(e: Event) => void} handler - a event handler
     * @param {string} what - the event on which the handler will be triggered
     * @returns {ElementTagNameMap[keyof ElementTagNameMap]} - the instance of the icon created
     */

    addHeaderIconFontAwesome(icon: string, handler: (e: Event) => void, what: string = "click") {
        return this.addHeaderIcon('<nk-icon name=' + icon + ' ></nk-icon>', handler, what);

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


    /**
     * Set the window state like minimized, maximized, closed.
     *
     * @param {WindowAction} action
     * @param {boolean} bState - sets action to true or false
     */

    setWindowAction(action: WindowAction, bState: boolean) {

        switch (action) {

            case WindowAction.Maximize: {
                if (this.minimized) this.toggleMinimizeWindow(this.minimized != this.minimized)
                this.toggleMaximizedWindow(bState);
                break;
            }

            case WindowAction.Minimize: {
                if (this.maximized) this.toggleMaximizedWindow(this.maximized != this.maximized)
                this.toggleMinimizeWindow(bState);
                break;
            }

            case WindowAction.Close: {
                this.closeWindow();
                break;
            }

        }
    }


    toggleMinimizeWindow(bMinimize: boolean) {


        var bodyCssSelector = "." + styles.body.toString();
        var hiddenClass = styles.hidden.toString();

        var classHelper = new CSSClassHelper(this.shadowRoot.querySelector(bodyCssSelector));

        bMinimize ? classHelper.addClass(hiddenClass) : classHelper.removeClass(hiddenClass);


    }

    toggleMaximizedWindow(bMaximize: boolean) {


        var maximizedClass = styles.maximized.toString();

        var classHelper = new CSSClassHelper(this);

        bMaximize ? classHelper.addClass(maximizedClass) : classHelper.removeClass(maximizedClass);


    }


    closeWindow() {

        if (this.closingAction == WindowClosingAction.Remove)
            this.remove();
        else if (this.closingAction == WindowClosingAction.Hide)
            this.setAttribute("visible", "false");
        else
            throw new Error("unsupported closing action");

    }


    /**
     * todo use draggable from resizable instead of separate package
     */

    renderedCallback() {
        super.renderedCallback();



        var bs = "." + styles.body.toString();

        const bhandle: HTMLElement  = this.shadowRoot.querySelector(bs);


          var scrollbar=new PerfectScrollbar(bhandle)



     //   SimpleScrollbar.initEl(bhandle);

/*
        //NOTE: Typecasting to any to suppress warnings
        const instance = jQuery(bhandle) as any;
        instance.scrollbar()
*/
        //---------------------------------------

        var headSelector = "." + styles.head.toString();

        var mHandle = this.shadowRoot.querySelector(headSelector);


        var resizable = new Resizable(this, {
            //within: 'parent',
            handles: 's, se, e',
            threshold: 10,
            draggable: {
                handle: mHandle
            },
            resize:function(){
                scrollbar.update()
            console.log("resized")
            }
        });




    }

    bringToFront(e) {


        var queryResult = document.querySelectorAll("[focused]");

        if (queryResult.length>0)
        for (let i in queryResult) {
           if (queryResult[i].removeAttribute) //TODO chrome has trouble finding method..
            queryResult[i].removeAttribute("focused")


        }

        if (this.parentNode.lastChild != this)
            this.parentNode.appendChild(this);
        this.setAttribute("focused", "true");
        // this.setAttribute("tabindex", "1");
        if (document.activeElement != this)
            this.focus();

    }

    renderCallback(el) {

        
        var css:any=styles


        return <div class={styles.window} onclick={this.bringToFront.bind(this)}>
            <style>{css._getCss()}</style>  <style>{scrollbarCSS}</style>
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
            <div ss-container class={styles.body}>{el}
                <slot class={styles.body}>{this.caption}</slot>
            </div>

        </div>
    }
}

customElements.define(NkWindow.is, NkWindow);