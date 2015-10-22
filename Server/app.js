/**
 * Created by sarahg on 20/10/15.
 */

var httpPort = 5432;

var url = require('url');

var httpApp = require('http').Server(handleRequest, send404);

var cache = require('./HTMLCache');
var htmlCache = new cache();

var SensUs = require('./SensUs');
var su = new SensUs();

var SensUsViz = require('./SensUsViz');
var suv = new SensUsViz();


/******************************************************************
 * Helper function
 ******************************************************************/
function timeStampAsString(timeStamp) {
    var date = timeStamp.getFullYear() + "-" + (timeStamp.getMonth() + 1) + "-" + timeStamp.getDate();
    var time = timeStamp.toTimeString();
    return date + ' ' + time;
}

//Handle client connections (from browsers and sensus boxes)
function handleRequest(req, res){
    var path = url.parse(req.url).pathname;

    var handleUpdate = function(req,res){
        if(req.method == 'POST'){
            var update = '';
            req.on('data', function(data){
                //console.log('data = '+data);
                update += data;
            });
            req.on('end', function(){
                console.log("update = "+update);
                su.HandleInput(update);
                responseOK(res);
            });
        }
    };

    var serveHTML = function(contentData,res) {
        //served head, content and tail
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(contentData, 'utf8');
        res.end();
    };

    var serveScript = function(contentData,res) {
        //served head, content and tail
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(contentData, 'utf8');
        res.end();
    };

    var responseOK = function(res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('OK\n');
        res.end();
        console.log("response sent");
    };

    //variables for visualisations
    var timestamp = timeStampAsString(new Date());
    var temp = req.url;
    var temp2 = temp.indexOf('ID=');
    var partID = 0;
    if (temp2>0) {
        partID = temp.substr(temp2+3);
    }
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    //server request handler
    switch (path){
        case '/censusUpdate.html':
            handleUpdate(req,res);
            break;
        case '/summary':
            console.log(timestamp+' - '+ip+' - '+partID+' - UPD - update: '+req.url);
            suv.GetSummary(function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.tailData, res);
                }else {
                    responseOK(res);
                }
            });
            break;
        case '/viz1':   //Blood type
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz1(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.pieChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz2':   //Give blood
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz2(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.barChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz3':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz3(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.circleChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz4':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz4(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.stackedChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz5':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz5(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.pieChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz6':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz6(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.pieChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz7':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz7(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.barChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz8':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz8(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.circleChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz9':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz9(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.stackedChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz10':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz10(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.pieChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz11':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz11(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.pieChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz12':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz12(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.barChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz13':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz13(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString +  cache.circleChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz14':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz14(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.stackedChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz15':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz15(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.pieChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz16':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz16(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.pieChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz17':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz17(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.barChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz18':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz18(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.circleChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz19':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz19(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.stackedChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/viz20':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            suv.Viz20(partID, function(responseString){
                if(responseString != ""){
                    serveHTML(cache.headerData + responseString + cache.pieChartData + cache.tailData, res);
                }else{
                    responseOK(res);
                }
            });
            break;
        case '/d3.v3.min.js':
            console.log(timestamp+' - '+ip+' - '+partID+' - 200 - '+req.url);
            serveScript(cache.d3Data, res);
            break;
        case '/reload':
            console.log(timestamp+' - '+ip+' - '+partID+' - REL - '+req.url);
            htmlCache.ReCache();
            serveHTML(cache.headerData+'</script><center><h2>Recaching HTML files...</h2>'+cache.tailData, res);
            break;
        default:
            console.log(timestamp+' - '+ip+' - '+partID+' - 404 - '+req.url);
            send404(res);
    }
}

//404 handler
function send404(res){
    res.writeHead(404);
    res.write('Four Oh Four!\n');
    res.end();
    console.log('!');
};

/**
 * net listener
 */
httpApp.listen(httpPort, function(){
   console.log("SensUs http server listening on port: "+httpPort);
});