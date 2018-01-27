import 'skatejs-web-components';
import {Component, h, prop, props, emit} from 'skatejs';
import * as keycode from "keycode"

import * as styles from './hotkeyList.css'

import * as _ from 'lodash'

import {getRegistered, Hotkeys, isBound, rebind} from "@nk/keyboard-interactions"

export interface HotkeyListProps {
    label: string;
    deletion: boolean;
    entries: object[];
}


function getActionForInput(input) {

    return input.parentElement.firstChild.innerText
}

function onInputPress(event) {

    event.preventDefault();

    if (event.keyCode >= 16 && event.keyCode <= 18) return;

    var c = keycode.names[event.keyCode];
    if (event.shiftKey == true)
        c = "Shift+" + c;
    if (event.altKey == true)
        c = "Alt+" + c;
    if (event.ctrlKey == true)
        c = "Ctrl+" + c;


    this.value = c;

    if (!isBound(c))
        rebind(getActionForInput(this), c);


    return false;

}

export class HotkeyList extends Component<HotkeyListProps> {
    label: string;
    deletion: boolean;
    entries: object[];

    static get is() {
        return 'nk-hotkey-list'
    }

    static get props() {
        return {
            label: prop.string({attribute: true, default: " entries in hotkey list"}),
            deletion: prop.boolean({attribute: true}),
            entries: prop.array({attribute: true, default: []}),
        }
    }

    onTagClick(arg) {


        alert("TODO")
        //TODO Mousetrap.unbind('a', callback2)


    }

    addHotkeys(...args) {
        Hotkeys.apply(null, args);
    };


    renderCallback() {

        Hotkeys.onChange(function () {
            console.log("TODO hotkeylist needs update");

            //TODO find out why altering the label will result in proper display of one ... although altering entries should do the same ..
            this.label = "  entr" + ((this.entries.length == 1) ? "y" : "ies") + " in hotkey list";
            this.entries.push("foo")
        }.bind(this));


        //-------------------------
        //get registered key combinations and group them by category
        var tagGroups = _(_.values(getRegistered())).groupBy("category").value()

        /**
         *
         * @param t - an object that contains some options
         * @returns {any} - the partial dom entries
         */
        var createRow = t => {

            return <div class={styles.row}>
                <span class={styles.action}>{t.action}</span>
                <input value={t.combo} onkeydown={onInputPress} className={(t.error) ? styles.error : ""}
                       title={(t.error) ? t.error : ""}></input>
                {t.combo != t.defaults ? <nk-icon class="default" name="undo" title={t.defaults}></nk-icon> : <span></span>}
                <nk-icon name="close" onclick={() => this.onTagClick(t)}></nk-icon>
                <span class={styles.description}>{t.description}</span>
            </div>;
        }


        var createHeader = t => {

            return <div class={styles.row+" "+styles.rowHeader }>
                <span>action</span>
                <span>combo</span>
                <span></span>
                <span></span>
                <span>description</span>
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

        return <div class={styles.list}>
            <div>{this.entries.length + " " + this.label}</div>
            {tagSections}</div>
    }
}

export function addHotkeys(...args) {
    Hotkeys.apply(null, args);
};

customElements.define(HotkeyList.is, HotkeyList);