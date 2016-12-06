(function () {
    'use strict';


    angular.module('myApp.services')
       .factory('dataService', dataService);

    function dataService() {
        var myfilter, mychartfilter, countryDimension, countryGroup, siteDimension, locationDeliveryTypeDimension, siteGroup, locationGroup, dataLoaded, chartFilterByLocation, chartFilterByDelType, chartGroup, chartGroupByServiceLine;
        dataLoaded = false;
        var allData = [];
        function initCrossfilter(data) {
            myfilter = new crossfilter(data);
            countryDimension = myfilter.dimension(function (d) { return d.Country });
            siteDimension = myfilter.dimension(function (d) { return d.Site });
            locationDeliveryTypeDimension = myfilter.dimension(function (d) { return d.latitude_longitude + ';' + d.DeliveryType });

            countryGroup = countryDimension.group().reduceSum(function (d) {
                return parseFloat(d.Baseline);
            });

            siteGroup = siteDimension.group().reduceSum(function (d) {
                return parseFloat(d.Baseline);
            });

            locationGroup = locationDeliveryTypeDimension.group().reduceSum(function (d) {
                return parseFloat(d.Baseline);
            });
        }

        function chartCrossFilter(latlong, delType) {
            mychartfilter = new crossfilter(allData);
            chartFilterByLocation = mychartfilter.dimension(function (d) { return d.latitude_longitude; });
            chartFilterByLocation.filter(latlong);

            chartFilterByDelType = mychartfilter.dimension(function (d) { return d.DeliveryType; });
            chartFilterByDelType.filter(delType);
            chartGroupByServiceLine = mychartfilter.dimension(function (d) { return d.ServiceLine; });


            chartGroup = chartGroupByServiceLine.group().reduceSum(function (d) {
                return parseFloat(d.Baseline);
            });







        }


        return {
            loadData: function (callback) {
                queue()
                     .defer(d3.csv, "/../data/sample-data.csv")
                        .await(function (error, data) {
                            initCrossfilter(data);
                            allData = data;
                            dataLoaded = true;
                            callback();
                        });
            },

            getData: function (type) {
                var ret = [];
                if (dataLoaded) {
                    if (type == 'country') {
                        ret = countryGroup.all();
                    } else {
                        ret = siteGroup.all();
                    }
                }

                return ret.map(function (d) { return d.value; });
            },
            getLocationData: function () {
                var ret = [];
                var allRecs = [];
                if (dataLoaded) {
                    ret = locationGroup.all().map(function (d) { return d; });
                    ret.sort(function (a, b) { return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0); });
                }
                return ret;
            },

            getChartData: function (latLong, delType) {
                var ret = [];
                var serviceLines = [];
                var expenseSubGroup = [];
                if (dataLoaded) {
                    chartCrossFilter(latLong, delType);
                    ret = chartGroup.all().map(function (d) {
                        if (d.value > 0)
                            return d;
                    });
                    for (let rec of ret) {
                        if (rec != undefined)
                            serviceLines.push(rec);
                    }
                    for (let sl of serviceLines) {
                        var expGroups = [];
                        allData.forEach(function (element) {
                            if (element.latitude_longitude == latLong && element.DeliveryType == delType && element.ServiceLine == sl.key) {
                                var expGroup = { baseLine: element.Baseline, expenseSubGroup: element.expenseSubGroup.substring(1, 4) };
                                expGroups.push(expGroup);
                            }
                        });
                        sl.expgroups = new Array();
                        sl.expgroups = expGroups;



                    }
                }
                return serviceLines;
            }

        };

    }

}());
