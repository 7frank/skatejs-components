import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';

import * as styles from './window.css';


import  Icon from './icon';

/**
 * TODO body should contain  vertical horizontal or absolute container maybe there are stable implementations out there
 *
 * TODO how to use other components within render all   <nk-icon  size="lg" name="plus" ></nk-icon>
 *
 */


export interface WindowProps {
    title: string;
    caption: string;
}

export class NkWindow extends Component<WindowProps> {
    static get is() {
        return 'nk-window'
    }



    static get props() {
        return {
            label: prop.string({attribute: true})
        }
    }

    title: string;
    caption: string;

    closeWindow(){

        this.remove()

    }


    renderCallback() {


        return <div class={styles.window + ' ' + styles.fillHeightOrMore}>
            <div class={styles.head}> <span>{this.title}</span>
                <span class={styles.headIcons}>

                      <span class={styles.iconMaximize}></span>
                      <span class={styles.iconMinimize}></span>
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