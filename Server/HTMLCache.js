/**
 * Created by sarahg on 20/10/15.
 */

var fs = require('fs');

/****************************************************************
 PREREADING WEB SERVER COMPONENTS INTO MEMORY
 ****************************************************************/

//prepreads the html files into memory variables
var d3Data = '';
var tailData = '';
var headerData = '';
var stackedChartData = '';
var pieChartData = '';
var circleChartData = '';
var barChartData = '';

module.exports.d3Data = d3Data;
module.exports.tailData = tailData;
module.exports.headerData = headerData;
module.exports.stackedChartData = stackedChartData;
module.exports.pieChartData = pieChartData;
module.exports.circleChartData = circleChartData;
module.exports.barChartData = barChartData;


function readHTMLtoCache() {
    //common files
    fs.readFile(__dirname + '/public/html/d3.v3.min.js', function(err, data){
        if (err){
            process.stdout.write('Failed to preload /public/html/d3.v3.min.js\n'+err);
        };
        module.exports.d3Data = data;
    });
    fs.readFile(__dirname + '/public/html/tail.html', function(err, data){
        if (err){
            process.stdout.write('Failed to preload /public/html/tail.html\n'+err);
        };
        module.exports.tailData = data;
    });
    fs.readFile(__dirname + '/public/html/header.html', function(err, data){
        if (err){
            process.stdout.write('Failed to preload /public/html/header.html\n'+err);
        };
        module.exports.headerData = data;
    });


    //Stacked graphics files
    fs.readFile(__dirname + '/public/html/stackedChart.html', function(err, data){
        if (err){
            process.stdout.write('Failed to preload /public/html/stackedChart.html\n'+err);
        };
        module.exports.stackedChartData = data;
    });

    //Pie graphics files
    fs.readFile(__dirname + '/public/html/pieChart.html', function(err, data){
        if (err){
            process.stdout.write('Failed to preload /public/html/pieChart.html\n'+err);
        };
        module.exports.pieChartData = data;
    });

    //Circle graphics files
    fs.readFile(__dirname + '/public/html/circleChart.html', function(err, data){
        if (err){
            process.stdout.write('Failed to preload /public/html/circleChart.html\n'+err);
        };
        module.exports.circleChartData = data;
    });

    //bar graphics
    fs.readFile(__dirname + '/public/html/barChart.html', function(err, data){
        if (err){
            process.stdout.write('Failed to preload /public/html/barChart.html\n'+err);
        };
        module.exports.barChartData = data;
    });

}

//and let's also execute it before the server starts
readHTMLtoCache();

/**
 * @constructor
 */
var HTMLCache = function(){};

HTMLCache.prototype.ReCache = function(){
    readHTMLtoCache();
};

module.exports = HTMLCache;