import 'skatejs-web-components';
import {Component, h, prop, props, emit} from 'skatejs';
import * as keycode from "keycode"

import * as styles from './hotkeyList.css'

import * as _ from 'lodash'

import {getRegistered, Hotkeys, isBound, rebind, resetActionCombosToDefault,addComboForAction} from "@nk/keyboard-interactions"

export interface HotkeyListProps {
    label: string;
    deletion: boolean;
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


function onInputPress(event, id, action) {

    event.preventDefault();

    if (event.keyCode >= 16 && event.keyCode <= 18) return;

    var c = keycode.names[event.keyCode];
    if (event.shiftKey == true)
        c = "Shift+" + c;
    if (event.altKey == true)
        c = "Alt+" + c;
    if (event.ctrlKey == true)
        c = "Ctrl+" + c;


    event.target.value = c;

    if (!isBound(c)) {

        rebind(action, id, c);

        this.rendererCallback()
    }

    return false;

}

export class HotkeyList extends Component<HotkeyListProps> {
    label: string;
    deletion: boolean;
    entries: object[];
    details: DetailMode;

    static get is() {
        return 'nk-hotkey-list'
    }

    static get props() {
        return {
            label: prop.string({attribute: true}),
            deletion: prop.boolean({attribute: true}),
            entries: prop.array({attribute: true, default: []}),
            details: DetailModeProp({attribute: true, default: DetailMode.Normal}),
        }
    }

    resetActions(action) {

        resetActionCombosToDefault(action)


    }


    addComboForAction(action)
    {

        addComboForAction(action)

    }

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


        var createInputItem = (t, key, action) => {

            var icon = "fa-keyboard-o";

            //TODO evaluate keyboard/mouse/touch/gestures there mihgt be omre options and a plugin system could help etc.


            return <div class={styles.inputWrapper}>
                <input value={t.combo} disabled={t.locked ? true : false}
                       onkeydown={(evt) => onInputPress.bind(this)(evt, key, action)}
                       className={(t.error) ? styles.error : ""}
                       title={(t.error) ? t.error : ""}></input>
                <label class={"fa " + icon + " " + styles.inputIcon}></label>
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
                        <nk-icon name="plus"  ></nk-icon>
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


        return <div class={styles.list}>
            <div>{this.label}</div>
            {tagSections}</div>
    }
}

export function addHotkeys(...args) {
    Hotkeys.apply(null, args);
};

customElements.define(HotkeyList.is, HotkeyList);