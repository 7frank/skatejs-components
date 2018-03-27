/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 * @flow
 */
import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';



import * as styles from "./icon.css"

/**
 * ...some documentation for the issue with webpack and font-awesome
 * the following code does partially work but with restrictions and future changes in mind
 * the "module not defined" - error of typescript/webpack was due to the loader not creating proper typings
 * this was prevented by using the existing loader for global scripts that is injecting them into the shadow dom
 *   and copying the font-awesome library under src/.. /icon for the laoder to find it.
 *   also a global  import still has to exist further increasing the bundle size
 *
 *  NOTE: the font-face for fontawesome will have to be created by the package that uses it
 *
 *
 *   TODO create separate bundle for the icon imports
 *
 */


import {IndexedComponent} from "../IndexedComponent";

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
    color: string
};




export default class Icon extends IndexedComponent<IconProps> {
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
    color: string

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
            color: prop.string({attribute: true}),
        }
    }


    renderCallback() {


          let classNames = `fa fa-${this.name}`;
      //  let classNames = "" + fa.fa + " " + fa[iconName];


        //TODO alter code below so it will find the classes again
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

        var cssLinks=`
                @import url("assets/fa/css/font-awesome.min.css");
        `

        return <div id="self" className={classNames}>
            <style>
                @import url("assets/fa/css/font-awesome.min.css");
            </style>


        </div>;


    }

    renderedCallback() {
        super.renderedCallback()
        this.ids.self.style.color = this.color;


    }
}


customElements.define(Icon.is, Icon);
