import angular from 'angular';
import {Application} from 'phosphor/lib/ui/application';
import {Widget} from 'phosphor/lib/ui/widget';
import {ApplicationShell, ContentWidget} from './ContentWidget';

import {
    DockPanel
} from 'phosphor/lib/ui/dockpanel';


require('./phosphor.scss');

const WIDGET_CLASS = 'p-Widget';

function WidgetFactory($compile, $scope) {
    class ComponentWidget extends Widget {
        constructor(options) {
            super();
            let template = options.template;
            this._node = $compile(template)($scope)[0];
            this.addClass(WIDGET_CLASS);

            let [tag, ...bindings] = template.split('<')[1].split('>')[0].split(' ');
            this.title.label = tag;
            this.title.caption = `Bindings: ${bindings}`;
            this.title.closable = true;
        }
    }

    return ComponentWidget;
}

class Phosphor extends Application {
    constructor($element, $compile, $scope) {
        super();
        const ComponentWidget = WidgetFactory($compile, $scope);
        this._element = $element[0];
        window.app = this;
        this.start().then(()=> {
            let dock = this.dock,
                b1 = new ContentWidget('blue'),
                y1 = new ContentWidget('yellow'),
                g1 = new ContentWidget('green'),
                t = new ComponentWidget({template: '<test value="a"></test>'}),
                t1 = new ComponentWidget({template: '<test value="a"></test>'});


            dock.addWidget(b1);
            dock.addWidget(y1, {mode: 'split-bottom', ref: b1});
            dock.addWidget(g1, {mode: 'split-left', ref: y1});
            dock.addWidget(t, {mode: 'split-bottom', ref: b1});
            dock.addWidget(t1, {mode: 'split-right', ref: t});

            if (!window.ph) {
                window.ph = new ComponentWidget({template: '<phosphor></phosphor>'});
                dock.addWidget(window.ph, {mode: 'split-right', ref: b1});
            }

        });
    }

    createShell() {
        this.dock = new DockPanel();
        return this.dock;
    }

    attachShell(id) {
        console.log('attach shell', id);
        Widget.attach(this.dock, this._element);
    }
}


const module = angular.module('phosphor', [])
    .component('phosphor', {
        bindings: {},
        controller: Phosphor
    });

export default module.name;
