import 'skatejs-web-components';
import {Component, h, prop, props, emit} from 'skatejs';

import * as styles from './hotkeyList.css'

import * as _ from 'lodash'

import {
    getRegistered,
    Hotkeys,
    isBound,
    rebind,
    resetActionCombosToDefault,
    addComboForAction
} from "@nk/keyboard-interactions"


import * as event2stringProto from 'key-event-to-string';


export interface ICombo {
    combo: string;
    type?: string;
    stopPropagation: boolean;
    preventDefault: boolean;
    error: string;
}

/**
 * Interface for the hotkey parameters
 *
 * @interface ICombo
 *
 * @param
 *
 */


export interface IOptions {
    combo: ICombo[] | string | string[];
    action: string;
    title?: string;

    handler(): any;

    category?: string;
    description?: string;
    selector?: string;
    target?: HTMLElement;
}

export interface HotkeyListProps {
    label: string;
    entries: object[];
    details: DetailMode;
}


enum DetailMode {
    Minimal,
    Normal,
    Detailed,
    Verbose
}


const DetailModeProp = prop.create<DetailMode>({});

//TODO split and refactor .. the event to string part should probably be put into the interactionss library as it is closer logically
function onInputPress(event, id: number, action: string) {

    event.preventDefault();
    event.stopPropagation();

    let details = event2stringProto.details(event)


    var c = null;

    if (details.hasKey) {

        //use KeydownEvent.key as it is the currently suggested way
        if (!c && event.key)
            c = event.key

        //making the best of it for legacy support
        if (!c) {
            console.warn("missing feature: KeydownEvent.key - using backup for older browsers. This might fail with some special characters on non US keyboards.")
            c = details.map.character
        }

        //should never happen
        if (!c)
        {
            console.warn("keyboard event: could not detect key")
        }
if (c=="+") c="Plus"


}

    // modifiers to string
    var d="";
    if (event.shiftKey == true)
        d = "Shift+" + d;
    if (event.altKey == true)
        d = "Alt+" + d;
    if (event.ctrlKey == true)
        d = "Ctrl+" + d;
    if (event.metaKey == true)
        d = "Meta+" + d;

    //merge character and modifiers
   if (c)
   c= d+c;
    else
   c=d.slice(0, -1);

    //write result into input element
    event.target.value = c;

    //re-bind result
    if (!isBound(c)) {

        rebind(action, id, c);

        this.rendererCallback()
    }

    return false;

}

/**
 * Note: mappings for special chars may fail due to 'I18n'
 * TODO bind special char +
 *
 */


export class HotkeyList extends Component<HotkeyListProps> {
    label: string;
    entries: object[];
    details: DetailMode;

    static get is() {
        return 'nk-hotkey-list'
    }

    static get props() {
        return {
            label: prop.string({attribute: true}),
            entries: prop.array({attribute: true, default: []}),
            details: DetailModeProp({attribute: true, default: DetailMode.Normal}),
        }
    }

    resetActions(action: string): void {

        resetActionCombosToDefault(action)


    }


    addComboForAction(action: string): void {

        addComboForAction(action)

    }

    /**
     * @inheritDoc Hotkeys
     */
    addHotkeys(...args) {
        Hotkeys.apply(null, args);
    };


    renderCallback() {

        Hotkeys.onChange(function () {
            this.rendererCallback()
        }.bind(this));


        //-------------------------
        //get registered key combinations and group them by category
        var tagGroups = _(_.values(getRegistered())).groupBy("category").value()


        /**
         * creates a single input element.
         *
         * @param t
         * @param key
         * @param action
         * @returns {any}
         */
        var createInputItem = (t, key, action) => {

            var iconTypes = {keyboard: "keyboard-o"};
            var icon = iconTypes[t.type]
            if (!icon) icon = "question"

            //TODO evaluate keyboard/mouse/touch/gestures there might be more options and a plugin system could help etc.


            return <div class={styles.inputWrapper}>
                <input value={t.combo} disabled={t.locked ? true : false}
                       onkeydown={(evt) => onInputPress.bind(this)(evt, key, action)}
                       title={(t.error) ? t.error : ""}></input>
                {(!t.error) ? <nk-icon class={styles.inputIcon} name={icon}></nk-icon> :
                    <nk-icon class={styles.inputIcon} color={"yellow"} name={"exclamation-triangle"}></nk-icon>}


            </div>;
        }


        var isArrayEqual = function (x, y) {
            return _(x).differenceWith(y, _.isEqual).isEmpty();
        };


        /**
         *
         * @param t - an object that contains some options
         * @returns {any} - the partial dom entries
         */
        var createRow = t => {


            var item = t.combo.map((tag, key) => createInputItem(tag, key, t.action));


            return <div class={styles.row}>
                <span class={styles.action}>{t.action}</span>
                <div>{item}
                    <button class={styles.addEntry} onclick={() => this.addComboForAction(t.action)}>
                        <nk-icon name="plus"></nk-icon>
                    </button>
                </div>
                {!isArrayEqual(t.combo, t.defaults) ? <nk-icon class="default" name="undo"
                                                               title={"reset to defaults:" + t.defaults.map((el) => el.combo).join(" ")}
                                                               onclick={() => this.resetActions(t.action)}></nk-icon> :
                    <span></span>}

                {this.details >= DetailMode.Normal ? <span class={styles.description}>{t.description}</span> :
                    <span></span>}
            </div>;
        }


        var createHeader = t => {

            return <div class={styles.row + " " + styles.rowHeader}>
                <span>action</span>
                <span>combo(s)</span>
                <span></span>
                {this.details >= DetailMode.Normal ? <span>description</span> : <span></span>}
            </div>;
        }


        /**
         *
         * @param tags - an array of option objects
         * @param key - the object key, in our case the category name
         * @returns {any} - the partial dom entries
         */

        var createSection = (tags, key) => {

            const tagElements = tags.map(createRow);
            const tagElementHeader = createHeader(tags[0]);
            return <fieldset class={styles.section}>
                <legend>{key}</legend>
                {tagElementHeader}
                {tagElements}
            </fieldset>
        }


        const tagSections = _.values(_.mapValues(tagGroups, createSection));


        var css: any = styles

        return <div class={styles.list}>
            <style>{css._getCss()}</style>
            <div>{this.label}</div>
            {tagSections}</div>
    }

    /**
     * pauses bound actions from triggering when combo is hit
     */

    pause() {
        _.values(getRegistered()).forEach(function (item) {
            if (item.el && item.el.pause) item.el.pause()
        })

    }

    /**
     * resumes triggering bound actions   when combo is hit
     */
    unpause() {
        _.values(getRegistered()).forEach(function (item) {
            if (item.el && item.el.unpause) item.el.unpause()
        })

    }


}

/**
 * {@link @nk/keyboard-interactions#Hotkeys()}
 */
export function addHotkeys(...args) {
    Hotkeys.apply(null, args);
};

customElements.define(HotkeyList.is, HotkeyList);