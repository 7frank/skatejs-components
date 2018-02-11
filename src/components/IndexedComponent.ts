
import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';

import * as _ from "lodash"

interface HTMLElementMap {
    [s: string]: HTMLElement;
}

interface IndexedComponentInterface {
    ids: HTMLElementMap

}

interface Styleable {
    css: string;
    //style():void

}


declare var Proxy:any;
declare var Reflect:any;


function createStyleTag(css){

        let style: any = document.createElement('style');

    style.type = 'text/css';
    if (style.styleSheet) {
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    return style


}


/**
 * he indexed component contains an ids attribute which holds a reference to all elements within the shadow dom that own a property "id"
 *
 */

export class IndexedComponent<T> extends Component<T> implements IndexedComponentInterface,Styleable {
    ids: HTMLElementMap;
    css: string;
    constructor() {
        super();


    }


    static get observedAttributes() {return ['css']; }

/*
    static get props () {
        return {
            css: prop.string({attribute: true,set:function(){
                console.log("css set",arguments)

            }})
        }
    }
*/


//css="div{boackground-color:red}"
    attributeChangedCallback(attr, oldValue, newValue) {


        //fixme does not update as intended
        if (attr == 'css') {
            this.css = newValue;

          this['rendererCallback']()
             console.log("css",newValue,this['rendererCallback'])

            this.renderedCallback()



        }

        super.attributeChangedCallback(attr, oldValue, newValue)
    }




    renderedCallback() {
        super.renderedCallback();


       this.initID();

//TODO have a property that updates when changed
    this.attachCSSasStyleTag()

    }


    private attachCSSasStyleTag() {

        if (this.css) {
            console.log("attach css",this.css)
           let styleTag= createStyleTag(this.css);
            this.shadowRoot.appendChild(styleTag)
        }
    }

    /**
     * initialize the ids that where found when the component was rendered the first time
     *
     */
    private initID() {


        if (this.ids) return

        var ids = this.shadowRoot.querySelectorAll('[id]');


        this.ids ={}
        _.each(ids, (el) => {
            let key = el.getAttribute("id");

            if (this.ids[key]) throw new Error("an id within a component declaration must be unique");

            this.ids[key] = el

        });


        this.ids= new Proxy(this.ids, {
            get: function(target, prop) {

                let val= Reflect.get(target, prop);
                if (typeof val=="undefined")
                    throw new Error("Cannot get id '"+ prop+"'. Must be declared in renderCallback.");


                return val;
            },
            set: function(target, prop, value) {
                throw new Error("Cannot set id '"+ prop+"' after component was created.");
                // return Reflect.set(target, prop, value);
            }
        });


    }
}