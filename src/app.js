import angular from 'angular';
import uiRouter from 'angular-ui-router';

import Phosphor from './components/phosphor/phosphor';
import Test from './components/test/test';

const AppComponent = {
    template: '<h1>Title</h1><phosphor></phosphor>'
};

const stateConfig = ($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/');

    const app = {
        url: '/',
        name: 'app',
        template: '<app></app>'
    };

    $stateProvider
        .state(app);
};

const root = angular
    .module('app', [
        uiRouter,
        Phosphor,
        Test,
    ])
    .component('app', AppComponent)
    .config(stateConfig)
    .name;

export default root;