/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 * @flow
 */
import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';

import * as styles from "./icon.css"


//import PropTypes from 'prop-types';


export interface IconProps {
    name: string,
    className?: string,
    size?: 'lg' | '2x' | '3x' | '4x' | '5x',
    rotate?: '45' | '90' | '135' | '180' | '225' | '270' | '315',
    flip?: 'horizontal' | 'vertical',
    fixedWidth?: boolean,
    spin?: boolean,
    pulse?: boolean,
    stack?: '1x' | '2x',
    inverse?: boolean,
};


export default class Icon extends Component<IconProps> {
    label: string;
    name: string;
    size: string;
    rotate: string;
    flip: string;
    spin: string;
    fixedWidth: string;
    stack: string;
    inverse: string;
    pulse: string;
    className: string;

    static get is() {
        return 'nk-icon'
    }

    static get props() {
        return {
            label: prop.string({attribute: true}),
            name: prop.string({attribute: true}),
            size: prop.string({attribute: true}),
            rotate: prop.string({attribute: true}),
            flip: prop.string({attribute: true}),
            spin: prop.string({attribute: true}),
            fixedWidth: prop.string({attribute: true}),
            stack: prop.string({attribute: true}),
            inverse: prop.string({attribute: true}),
            pulse: prop.string({attribute: true}),
            className: prop.string({attribute: true}),
        }
    }


    renderCallback() {

       //  TODO until the icon component can handle the import itself leave this here

        var link=document.createElement("link");
        link.rel='stylesheet';
        link.type='text/css';
        link.href='node_modules/font-awesome/css/font-awesome.css';
        document.head.insertAdjacentElement("beforeend",link);




        /*
                const {
                    name,
                    size,
                    rotate,
                    flip,
                    spin,
                    fixedWidth,
                    stack,
                    inverse,
                    pulse,
                    className,
                    ...props
                } = this._props;
        */

        let classNames = `fa fa-${this.name}`;
        if (this.size) {
            classNames = `${classNames} fa-${this.size}`;
        }
        if (this.rotate) {
            classNames = `${classNames} fa-rotate-${this.rotate}`;
        }
        if (this.flip) {
            classNames = `${classNames} fa-flip-${this.flip}`;
        }
        if (this.fixedWidth) {
            classNames = `${classNames} fa-fw`;
        }
        if (this.spin) {
            classNames = `${classNames} fa-spin`;
        }
        if (this.pulse) {
            classNames = `${classNames} fa-pulse`;
        }

        if (this.stack) {
            classNames = `${classNames} fa-stack-${this.stack}`;
        }
        if (this.inverse) {
            classNames = `${classNames} fa-inverse`;
        }

        if (this.className) {
            classNames = `${classNames} ${this.className}`;
        }


        classNames += " " + styles.resetHeight.toString();


        //{...props}
        return <div className={classNames}></div>;


    }
}

customElements.define(Icon.is, Icon);
