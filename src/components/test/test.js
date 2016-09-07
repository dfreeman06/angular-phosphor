import angular from 'angular';
require('./test.scss');


class TestComponent {
    constructor($element) {
        console.log('simple component');
    }
}

const module = angular.module('test', [])
    .component('test', {
        template: require('./test.html'),
        bindings: {value: '='},
        controller: TestComponent
    });

export default module.name;
