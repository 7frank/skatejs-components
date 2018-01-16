import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';

import * as styles from './window.css';


//  //,
/**
 * TODO body should contain  vertical horizontal or absolute container maybe there are stable implementations out there
 *
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
            label: prop.string({attribute: true}),
        }
    }

    title: string;
    caption: string;

    renderCallback() {
        return <div class={styles.window + ' ' + styles.fillHeightOrMore}>
            <div class={styles.head}>{this.title}
                <span class={styles.headIcons}>
                      <span class={styles.iconMaximize}>x</span>
                      <span class={styles.iconMinimize}>x</span>
                      <span class={styles.iconClose}>x</span>
                </span>
            </div>
            <div class={styles.body}>
                <slot class={styles.body}>{this.caption}</slot>
            </div>

        </div>
    }
}

customElements.define(NkWindow.is, NkWindow);