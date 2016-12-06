(function () {
    'use strict';

    angular.module('myApp.directives')
      .directive('pieChartDirective', [function () {
          return {
              restrict: 'EA',
              scope: {
                  ready: '=',
                  chartData: '=',
                  chartOptions: '='
              },
              link: function (scope, iElement) {
                  scope.$watch('ready', function (newVals) {
                      if (newVals == 1) {
                          var i = 0;
                          var formatSuffix = d3.format("2s");
                          for (let chart of scope.chartData) {
                              var container = 'container' + i.toString();
                              d3.select(iElement[0]).append('div').attr('id', container).style('width', '400px').style('float','left');
                              d3.select('#' + container).append('label').attr('for', 'ServiceLine').html(chart.key + "&nbsp;&nbsp;&nbsp;");
                              d3.select('#' + container).append('label').attr('for', 'BaseLine').html(formatSuffix(chart.value));
                              Piechart(chart.expgroups, scope.chartOptions, container);  
                              i++;
                          }



                      }
                  }, true);
              }
          };
      }]);
}());