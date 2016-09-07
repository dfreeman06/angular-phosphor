import {
    Widget, WidgetFlag
} from 'phosphor/lib/ui/widget';


export class ContentWidget extends Widget {

    static createNode() {
        let node = document.createElement('div');
        let input = document.createElement('input');
        input.placeholder = 'Placeholder...';
        node.appendChild(input);
        return node;
    }

    constructor(name) {
        super({node: ContentWidget.createNode()});
        this.setFlag(WidgetFlag.DisallowLayout);
        this.addClass('content');
        this.addClass(name.toLowerCase());
        this.title.label = name;
        this.title.closable = true;
        this.title.caption = `Long description for: ${name}`;
    }

    get inputNode() {
        return this.node.firstChild;
    }

    onActivateRequest(msg) {
        if (this.isAttached) this.inputNode.focus();
    }
}
