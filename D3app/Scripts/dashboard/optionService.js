(function () {
    'use strict';


    angular.module('myApp.services')
       .factory('optionService', optionService);

    function optionService() {
        return {

            chartOptions: {
                container: 'container',
                innerRadius: 80,
                outerRadius: 200,
                colors: ['red', 'blue']
            },
            mapOptions: {
                scale: 1300,
                width: 1200,
                height: 700,
                fillColorRed: 'red',
                fillColorBlue: 'blue',
            }
        };
    }

}());