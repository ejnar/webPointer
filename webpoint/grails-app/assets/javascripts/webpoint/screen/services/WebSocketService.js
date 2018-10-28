'use strict';

/* Services */

//var module = angular.module('webpoint.core');
//
//    module.factory('WebSocketService', WebSocketService);
//    WebSocketService.$inject = ['$log', '$websocket'];
//
//
//    function WebSocketService($log, $websocket){
//        $log.info('WebSocketService');
//
//        // Open a WebSocket connection
//        var dataStream = $websocket('ws://localhost:8080/api/guest/w/hello');
//
//        var collection = [];
//
//        dataStream.onMessage(function(message) {
//            collection.push(JSON.parse(message.data));
//        });
//
//        var methods = {
//            collection: collection,
//            get: function() {
//              dataStream.send(JSON.stringify({ action: 'get' }));
//            }
//        };
//        return methods;
//    }


//    <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js"></script>
//      <script src="bower_components/angular-websocket/angular-websocket.js"></script>
//      <section ng-controller="SomeController">
//        <ul>
//          <li ng-repeat="data in MyData.collection track by $index">
//            {{ data }}
//          </li>
//        </ul>
//      </section>
//      <script>
//        angular.module('YOUR_APP', [
//          'ngWebSocket' // you may also use 'angular-websocket' if you prefer
//        ])
//        //                          WebSocket works as well
//        .factory('MyData', function($websocket) {
//          // Open a WebSocket connection
//          var dataStream = $websocket('wss://website.com/data');
//
//          var collection = [];
//
//          dataStream.onMessage(function(message) {
//            collection.push(JSON.parse(message.data));
//          });
//
//          var methods = {
//            collection: collection,
//            get: function() {
//              dataStream.send(JSON.stringify({ action: 'get' }));
//            }
//          };
//
//          return methods;
//        })
//        .controller('SomeController', function ($scope, MyData) {
//          $scope.MyData = MyData;
//        });
//      </script>
