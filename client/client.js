import angular from "angular";
import uiRouter from "angular-ui-router";
import httpProxy from "./http-proxy";
import Controller from "./controller";

angular.module('request-retry', [uiRouter])

    .factory('httpProxy', ['$http', '$q', httpProxy])

    .config(['$stateProvider', $stateProvider => $stateProvider.state('root', {
      url: '',
      template: `
        <p>Llevamos {{$ctrl.count}} llamada(s)</p>
        <p ng-show="$ctrl.remaining > 0">Quedan {{$ctrl.remaining}} llamadas antes de que empiece a fallar</p>
        <p ng-show="$ctrl.remaining === 0">La próxima llamada fallará</p>
        <p ng-show="$ctrl.remaining === null">No sabemos cuántas llamadas podemos hacer antes de que empiece a fallar</p>
        
        <hr/>
        
        <button ng-click="$ctrl.callOnce()">Llamar una vez</button>
        
        <hr/>
        
        <p>Llamar cada <input ng-model="$ctrl.callDelay" type="number"/></p>
        <button ng-click="$ctrl.startCalling()">Empezar a llamar</button>
        <button ng-click="$ctrl.stopCalling()">Parar</button></p>
        
        <hr/>
        
        <p>Lanzar <input ng-model="$ctrl.callAmount" type="number"/> llamadas a la vez <button ng-click="$ctrl.callMany()">Lanzar llamadas</button></p>
        <ul>
          <li ng-repeat="call in $ctrl.calls">{{call.$$state.status}}</li>
        </ul>
      `,
      controller: Controller,
      controllerAs: '$ctrl'
    })])

    .config(['$urlRouterProvider', $urlRouterProvider => $urlRouterProvider.otherwise('/')]);

document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['request-retry']));