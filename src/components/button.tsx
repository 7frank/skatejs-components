import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';

export interface ButtonProps {
    label: string;
}

export class Button extends Component<ButtonProps> {
    label: string;

    static get is() {
        return 's-button'
    }

    static get props() {
        return {
            label: prop.string({attribute: true}),
        }
    }

    renderCallback() {
        return <button>{this.label}</button>
    }
}

customElements.define(Button.is, Button);