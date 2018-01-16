import 'skatejs-web-components';
import {Component, h, prop, props} from 'skatejs';

import * as styles from './hotkeyList.css'

import {getRegistered,Hotkeys,showHotkeyList} from  "@nk/keyboard-interactions"

export interface HotkeyListProps {
    label: string;
    deletion: boolean;
}

export class HotkeyList extends Component<HotkeyListProps> {
    static get is() {
        return 'nk-hotkey-list'
    }

    static get props() {
        return {
            label: prop.string({attribute: true}),
            deletion: prop.boolean({attribute: true}),
        }
    }

    label: string;
    deletion: boolean;


    onTagClick(arg) {


      /*  Hotkeys('show help', 'h', function () {
            showHotkeyList();
        });*/

        console.log("registered",this,getRegistered())

        Hotkeys(arg.action, arg.combo,function(e){
            e.stopPropagation()
            e.preventDefault()

            arg.handler(e)

        })




}


    renderCallback() {


        const tags = [
            {
                combo: "ctrl+s", action: "save File", handler: function () {
                console.log("hello hotkeylist", arguments)
            }, description: "a sample entry for the hotkeylist"
            },
            {
                combo: "ctrl+alt+#", action: "custom action", handler: function () {
                console.log("hello hotkeylist2", arguments)
            }, description: "another sample entry"
            },
            {
                combo: "ctrl+a", action: "select all", handler: function () {
                console.log("hello hotkeylist3", arguments)
            }, description: "more sample stuff"
            },
        ];
        const allowDeletion = this.deletion ? 'deletion' : '';
        const tagElements = tags.map(t => {
            const tagContent = allowDeletion ? <span class='deletion'>{t.action}</span> :  <span>{t.action}</span>;

            return <div  class={styles.row}>
                {tagContent}
                <input value={t.combo}></input>
                <span class="description">{t.description}</span>
                <button  onclick={()=>this.onTagClick(t)}>bind combo</button>
            </div>;
        });


        /*    var rows = [];
            for (var i = 0; i < 5; i++) {
                rows.push(new Button());
            }*/

        return <div class={styles.list} >{tagElements}</div>
    }
}

customElements.define(HotkeyList.is, HotkeyList);