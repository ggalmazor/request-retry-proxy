import angular from "angular";
import uiRouter from "angular-ui-router";
import httpProxy from "./http-proxy";
import Controller from "./controller";

angular.module('request-retry', [uiRouter])

    .factory('httpProxy', ['$http', '$q', httpProxy])

    .config(['$stateProvider', $stateProvider => $stateProvider.state('root', {
      url: '',
      template: `
        <p>We have called {{$ctrl.count}} times to the server</p>
        <p ng-show="$ctrl.remaining > 0">You can call {{$ctrl.remaining}} more times to the server before having to reauthenticate</p>
        <p ng-show="$ctrl.remaining === 0">Next call it's going to fail</p>
        <p ng-show="$ctrl.remaining === null">We don't know how many calls we can make yet</p>
        
        <hr/>
        
        <button ng-click="$ctrl.callOnce()">Call once</button>
        
        <hr/>
        
        <p>Call every <input ng-model="$ctrl.callDelay" type="number"/></p>
        <button ng-click="$ctrl.startCalling()">Start</button>
        <button ng-click="$ctrl.stopCalling()">Stop</button>
        
        <hr/>
        
        <p>Call <input ng-model="$ctrl.callAmount" type="number"/> times at once</p>
        <button ng-click="$ctrl.callMany()">Call many</button>
        <ul>
          <li ng-repeat="call in $ctrl.calls">Call #{{$index}} status is: <span ng-show="call.$$state.status === 0">pending</span><span ng-show="call.$$state.status === 1">completed</span></li>
        </ul>
      `,
      controller: Controller,
      controllerAs: '$ctrl'
    })])

    .config(['$urlRouterProvider', $urlRouterProvider => $urlRouterProvider.otherwise('/')]);

document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['request-retry']));