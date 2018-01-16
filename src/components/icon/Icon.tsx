/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 * @flow
 */
import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';


//import PropTypes from 'prop-types';



export interface IconProps{
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


        let classNames = `fa fa-${name}`;
        if (size) {
            classNames = `${classNames} fa-${size}`;
        }
        if (rotate) {
            classNames = `${classNames} fa-rotate-${rotate}`;
        }
        if (flip) {
            classNames = `${classNames} fa-flip-${flip}`;
        }
        if (fixedWidth) {
            classNames = `${classNames} fa-fw`;
        }
        if (spin) {
            classNames = `${classNames} fa-spin`;
        }
        if (pulse) {
            classNames = `${classNames} fa-pulse`;
        }

        if (stack) {
            classNames = `${classNames} fa-stack-${stack}`;
        }
        if (inverse) {
            classNames = `${classNames} fa-inverse`;
        }

        if (className) {
            classNames = `${classNames} ${className}`;
        }

        //{...props}
        return <div  className={classNames} />;
    }
}

customElements.define(Icon.is, Icon);
