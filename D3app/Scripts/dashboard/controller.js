(function () {
    'use strict';

    angular.module('myApp.controllers')
		.controller('myController', myController);

    myController.$inject = ['$scope', 'dataService', 'optionService'];

    function myController($scope, dataService, optionService) {
        var mc = this;
        console.log($scope.LatLong);
        console.log($scope.DelType);
        mc.chartData = [];
        mc.locationData = [];
        mc.ready = 0;
        mc.chartOptions = optionService.chartOptions;
        mc.mapOptions = optionService.mapOptions;
        mc.applyFilter = function (type) {
            mc.chartData = dataService.getData(type);
            mc.ready++;
        }

        //mc.loadLocationData = function () {
        //    mc.locationData = dataService.getLocationData();
        //    mc.ready++;
        //}

        dataService.loadData(setChartData);

        function setChartData() {
            $scope.$apply(function () {
                mc.locationData = dataService.getLocationData();
               // mc.chartData = dataService.getData("country");
                if ($scope.LatLong != undefined) {
                    mc.chartData = dataService.getChartData($scope.LatLong, $scope.DelType);
                    
                }
                mc.ready++;
            });
           
        }
    }

})();