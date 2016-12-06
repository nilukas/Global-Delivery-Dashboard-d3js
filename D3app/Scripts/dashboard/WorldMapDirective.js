(function () {
    'use strict';

    angular.module('myApp.directives')
      .directive('worldMapDirective', [function () {
          return {
              restrict: 'EA',
              scope: {
                  ready: '=',
                  mapData: '=',
                  mapOptions: '='
              },
              link: function (scope, iElement) {
                  d3.select(iElement[0]).append('div').attr('id', 'container');

                  scope.$watch('ready', function (newVals) {
                      if (newVals == 1) {
                          WorldMap(scope.mapData, scope.mapOptions);
                      }
                  }, true);

              }
          };
      }]);
}());