import 'angular';
import 'angular-mocks';

const context = require.context('./src', true, /\.js$/);

context.keys().forEach(context);