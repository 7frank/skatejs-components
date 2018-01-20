import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';

import * as styles from './hotkeyList.css'

import {getRegistered, Hotkeys, showHotkeyList} from "@nk/keyboard-interactions"

export interface HotkeyListProps {
    label: string;
    deletion: boolean;
}

export class HotkeyList extends Component<HotkeyListProps> {
    label: string;
    deletion: boolean;

    static get is() {
        return 'nk-hotkey-list'
    }

    static get props() {
        return {
            label: prop.string({attribute: true}),
            deletion: prop.boolean({attribute: true}),
        }
    }

    onTagClick(arg) {


        /*  Hotkeys('show help', 'h', function () {
              showHotkeyList();
          });*/
alert("TODO")
//TODO Mousetrap.unbind('a', callback2)

      /*  Hotkeys(arg.action, arg.combo, function (e) {
            e.stopPropagation()
            e.preventDefault()

            arg.handler(e)

        })*/


    }

    //TODO expose adding hotkeys via a htmlelement

    addHotkeys() {
        Hotkeys.apply(null, arguments);
    }

    getHK() {
        return {registered: getRegistered};

    }

    renderCallback() {

        const demoTags = [
            {
                combo: "ctrl+,", action: "save File", handler: function () {
                console.log("hello hotkeylist", arguments)
            }.bind(this),
                description: "a sample entry for the hotkeylist"
            }
        ];


        for (let entry of demoTags)
            Hotkeys(entry.action, entry.combo, entry.handler)
//-------------------------
        var registered = getRegistered()

        //TODO
        //var tags=Object.values(registered)
        var tags = []
        for (let i in registered)
            tags.push(registered[i])

        const allowDeletion = this.deletion ? 'deletion' : '';
        const tagElements = tags.map(t => {
            const tagContent = allowDeletion ? <span class='deletion'>{t.action}</span> : <span>{t.action}</span>;

            return <div class={styles.row}>
                {tagContent}
                <input value={t.combo}></input>
                <span class="description">{t.description}</span>
               <nk-icon size="lg" name="close"  onclick={() => this.onTagClick(t)}></nk-icon>
            </div>;
        });


        /*    var rows = [];
            for (var i = 0; i < 5; i++) {
                rows.push(new Button());
            }*/

        return <div class={styles.list}>{tagElements}</div>
    }
}

customElements.define(HotkeyList.is, HotkeyList);