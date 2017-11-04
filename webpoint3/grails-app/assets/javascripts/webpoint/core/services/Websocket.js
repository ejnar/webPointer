'use strict';

/* Services */

var app = angular.module('webpoint.core');


    app.factory('Websocket', Websocket);
    Websocket.$inject = ['$log', '$stomp', 'CashService'];


    function Websocket($log, $stomp, CashService){
        $log.info('Websocket');

        var socket = {

            connect: connect

        }
        return socket;

        function connect(topic) {

        }


    }