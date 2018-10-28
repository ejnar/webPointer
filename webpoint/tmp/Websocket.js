'use strict';

/* Services */

var app = angular.module('webpoint.core');


//    app.factory('Websocket', Websocket);
//    Websocket.$inject = ['$log', '$stomp', 'CashService'];
//
//
//    function Websocket($log, $stomp, CashService){
//        $log.info('Websocket');
//
//        var headers = { login: 'mylogin', passcode: 'mypasscode'};
//
//        var socket = {
//
//            connect: connect
//
//        }
//        return socket;
//
//        function connect(updatePayload) {
//            $stomp.connect('/stomp', headers)
//                .then(function (frame) {
//                    var subscription = $stomp.subscribe('/topic/song', function (payload, headers, res) {
//                        $log.debug(payload)
//                        updatePayload(payload);
//                    }, {'headers': 'are awesome' });
//               });
//        }
//
//
//    }