
import 'skatejs-web-components';
import {Component, h, prop, props, emit} from 'skatejs';
import {VDOMElement} from "skatejs/src/ts-typings/api";

export interface TemplateListProps {
    data: object[];
    template: VDOMElement<any> | VDOMElement<any>[];
    canDelete:boolean;
    canAdd:boolean;
}




/**
 * a list item that contains a template renderer an array of objects for the template
 * an (x) for removing an item and a (+) for adding one entry
 *
 * this will be used to create the combo list and probably others if it is of use
 *
 **/

export class TemplateList extends Component<TemplateListProps> {
    data: object[];
    template: VDOMElement<any> | VDOMElement<any>[];
    canDelete:boolean;
    canAdd:boolean;

    static get is() {
        return 'nk-template-list'
    }

    static get props() {
        return {
          //  template: prop.({attribute: true, default: <div>to do</div>  }),
            data: prop.object({attribute: true}),
            canAdd: prop.boolean({attribute: true}),
            canDelete: prop.boolean({attribute: true}),
            data: prop.array({attribute: true, default: []}),
        }
    }



    renderCallback() {

        var createRow = t => {

       /*     return <div class={styles.inputWrapper}>
                <input value={t.combo} disabled={t.locked?true:false} onkeydown={onInputPress} className={(t.error) ? styles.error : ""}
                       title={(t.error) ? t.error : ""}></input>
                <label class={"fa fa-keyboard-o "+styles.inputIcon}></label>
            </div>;*/
        }


       var elements = this.data.map(createRow);

       return <div>
            {elements}
        </div>

    }
}


customElements.define(TemplateList.is, TemplateList);