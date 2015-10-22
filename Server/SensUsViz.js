/**
 * Created by sarahg on 20/10/15.
 */

var async = require('async');

var Database = require('./Database');
var db = new Database();
var dbName = "censusDB";

var cache = require('./HTMLCache');
var dbVals = require('./DBValues');

var QueryGenerator = require('./QueryGenerator');
var qg = new QueryGenerator();

var results = require('./Results');



function getSummary(callback){
    var partValues = "nothing";
    var bloodTypeLabels = "\"A+\",\"A-\",\"B+\",\"B-\",\"O+\",\"O-\",\"AB+\",\"AB-\",\"Don't know\",\"Prefer not to say\"";
    var healthServiceLabels = "\"Private only\",\"Both private and NHS\",\"NHS only\",\"Other\",\"Prefer not to say\"";
    var neighbourNamesLabels = "\"0\",\"1-2\",\"3-4\",\"5-6\",\"7+\",\"Prefer not to say\"";
    var liveInLabels = "\"Housing shelter\",\"Social housing\",\"With family\",\"Private rental\",\"Home I own\",\"One of the homes I own\",\"Other\",\"Prefer not to say\"";;
    var publicTransportLabels = "\"0\",\"1\",\"2\",\"3\",\"4\",\"More than 4\",\"Prefer not to say\"";
    var findInfoLabels = "\"Family and friends\",\"Local resources\",\"Online social networks\",\"Other online resources\",\"Other\",\"Prefer not to say\"";
    var unwantedGiftsLabels = "\"Charity\",\"Friends or family\",\"Sell\",\"Throw away\",\"Store them\",\"Other\",\"Prefer not to say\"";
    var mostFaithLabels = "\"Myself\",\"Family or friends\",\"Local Councillor\",\"Government\",\"UN\",\"Universe\",\"Other\",\"Prefer not to say\"";
    var yesNoPNTSLabels = "\"Yes\",\"No\",\"Prefer not to say\"";
    var yesNoLabels = "\"Yes\",\"No\"";

    //viz 1
    var viz1String = '\n webLoc=1;\n pageTitle=\"What blood types are people?\";\n names=['+bloodTypeLabels+'];\n values=['+results.bloodTypeValues+'];\n partValues=\"'+partValues+'\";\n'+cache.pieChartData;

    //viz2
    var viz2String = '\n webLoc=2;\n pageTitle=\"\";\n titles1=\"How many people give blood...\";\n labels1=['+yesNoPNTSLabels+'];\n values1=['+results.giveBloodValues+'];\n partValues1=\"'+partValues+'\";\n'
        + '\n titles2=\"How many people have had unprotected sex...\";\n labels2=['+yesNoPNTSLabels+'];\n values2=['+results.unprotectedSexValues+'];\n partValues2=\"'+partValues+'\";\n'
        + '\n titles3=\"How many people are organ donors...\";\n labels3=['+yesNoPNTSLabels+'];\n values3=['+results.organDonorValues+'];\n partValues3=\"'+partValues+'\";\n'+cache.barChartData;

    //viz3
    var viz3String = '\n webLoc=3;\n pageTitle=\"Who would people share this data with?\";\n titles1=\"Hereditary conditions...\";\n familyVals1=['+results.sharingConditions1Values+'];\n partFamilyVals1=\"'+partValues+'\";\n'
        + '\n councilVals1=['+results.sharingConditions2Values+'];\n partCouncilVals1=\"'+partValues+'\";\n'
        + '\n publicVals1=['+results.sharingConditions3Values+'];\n partPublicVals1=\"'+partValues+'\";\n'
        + '\n titles2=\"Total GP visits in the last year...\";\n familyVals2=['+results.sharingGPVisits1Values+'];\n partFamilyVals2=\"'+partValues+'\";\n'
        + '\n councilVals2=['+results.sharingGPVisits2Values+'];\n partCouncilVals2=\"'+partValues+'\";\n'
        + '\n publicVals2=['+results.sharingGPVisits3Values+'];\n partPublicVals2=\"'+partValues+'\";\n'+cache.circleChartData;

    //viz4
    var viz4String = '\n webLoc=4;\n pageTitle=\"What data would people like to see?\";\n titles1=\"The average adult weight of people in their neighbourhood...\";\n labels1=['+yesNoLabels+'];\n values1=['+results.seeWeightValues+'];\n partValues1=\"'+partValues+'\";\n'
        + '\n titles2=\"The leading causes of death in their neighbourhood...\";\n labels2=['+yesNoLabels+'];\n values2=['+results.seeDeathValues+'];\n partValues2=\"'+partValues+'\";\n'
        + '\n titles3=\"How much time on average people in their neighbourhood spend exercising...\";\n labels3=['+yesNoLabels+'];\n values3=['+results.seeExerciseValues+'];\n partValues3=\"'+partValues+'\";\n'
        + '\n titles4=\"How many people in their neighbourhood got the flu last year...\";\n labels4=['+yesNoLabels+'];\n values4=['+results.seeFluValues+'];\n partValues4=\"'+partValues+'\";\n'+cache.stackedChartData;

    //viz 5
    var viz5String = '\n webLoc=5;\n pageTitle=\"What health services do people use?\";\n names=['+healthServiceLabels+'];\n values=['+results.healthServiceValues+'];\n partValues=\"'+partValues+'\";\n'+cache.pieChartData;

    //viz6
    var viz6String = '\n webLoc=6;\n pageTitle=\"How many neighbours do people know by name?\";\n names=['+neighbourNamesLabels+'];\n values=['+results.neighbourNamesValues+'];\n partValues=\"'+partValues+'\";\n'+cache.pieChartData;

    //viz7
    var viz7String = '\n webLoc=7;\n pageTitle=\"\";\n titles1=\"How many people are content where they live?\";\n labels1=['+yesNoPNTSLabels+'];\n values1=['+results.contentValues+'];\n partValues1=\"'+partValues+'\";\n'
        + '\n titles2=\"How many people feel a minority where they live?\";\n values2=['+results.minorityValues+'];\n partValues2=\"'+partValues+'\";\n'
        + '\n titles3=\"How many people would like to know if a sex offender moved to their street?\";\n values3=['+results.sexOffenderValues+'];\n partValues3=\"'+partValues+'\";\n'+cache.barChartData;

    //viz8
    var viz8String = '\n webLoc=8;\n pageTitle=\"Who would people share this data with?\";\n titles1=\"Fines received in last year...\";\n familyVals1=['+results.sharingFines1Values+'];\n partFamilyVals1=\"'+partValues+'\";\n'
        + '\n councilVals1=['+results.sharingFines2Values+'];\n partCouncilVals1=\"'+partValues+'\";\n'
        + '\n publicVals1=['+results.sharingFines3Values+'];\n partPublicVals1=\"'+partValues+'\";\n'
        + '\n titles2=\"If they voted in last elections...\";\n familyVals2=['+results.sharingVoted1Values+'];\n partFamilyVals2=\"'+partValues+'\";\n'
        + '\n councilVals2=['+results.sharingVoted2Values+'];\n partCouncilVals2=\"'+partValues+'\";\n'
        + '\n publicVals2=['+results.sharingVoted3Values+'];\n partPublicVals2=\"'+partValues+'\";\n'+cache.circleChartData;

    //viz9
    var viz9String = '\n webLoc=9;\n pageTitle=\"What information would people like to know?\";\n titles1=\"How much recycling their neighbourhood achieved last quarter...\";\n labels1=['+yesNoLabels+'];\n values1=['+results.seeRecyclingValues+'];\n partValues1=\"'+partValues+'\";\n'
        + '\n titles2=\"What sports teams are supported by neighbours...\";\n labels2=['+yesNoLabels+'];\n values2=['+results.seeTeamsValues+'];\n partValues2=\"'+partValues+'\";\n'
        + '\n titles3=\"Number of people in their neighbourhood with same nationality as them...\";\n labels3=['+yesNoLabels+'];\n values3=['+results.seeNationalityValues+'];\n partValues3=\"'+partValues+'\";\n'
        + '\n titles4=\"What languages are spoken in their neighbourhood\";\n labels4=['+yesNoLabels+'];\n values4=['+results.seeLanguagesValues+'];\n partValues4=\"'+partValues+'\";\n'+cache.stackedChartData;

    //viz10
    var viz10String = '\n webLoc=10;\n pageTitle=\"Where do people live?\";\n names=['+liveInLabels+'];\n values=['+results.liveInValues+'];\n partValues=\"'+partValues+'\";\n'+cache.pieChartData;

    //viz11
    var viz11String = '\n webLoc=11;\n pageTitle=\"How many hours do people spend on public transport daily?\";\n names=['+publicTransportLabels+'];\n values=['+results.publicTransportValues+'];\n partValues=\"'+partValues+'\";\n'+cache.pieChartData;

    //viz12
    var viz12String = '\n webLoc=12;\n pageTitle=\"\";\n titles1=\"How many people have met their local MP?\";\n labels1=['+yesNoPNTSLabels+'];\n values1=['+results.localMPValues+'];\n partValues1=\"'+partValues+'\";\n'
        + '\n titles2=\"How many people use their public library?\";\n labels2=['+yesNoPNTSLabels+'];\n values2=['+results.libraryValues+'];\n partValues2=\"'+partValues+'\";\n'
        + '\n titles3=\"How many people have a plan for financial support in their old age?\";\n labels3=['+yesNoPNTSLabels+'];\n values3=['+results.pensionValues+'];\n partValues3=\"'+partValues+'\";\n'+cache.barChartData;

    //viz13
    var viz13String = '\n webLoc=13;\n pageTitle=\"Who would people share this data with?\";\n titles1=\"Their whereabouts...\";\n familyVals1=['+results.sharingWhereabouts1Values+'];\n partFamilyVals1=\"'+partValues+'\";\n'
        + '\n councilVals1=['+results.sharingWhereabouts2Values+'];\n partCouncilVals1=\"'+partValues+'\";\n'
        + '\n publicVals1=['+results.sharingWhereabouts3Values+'];\n partPublicVals1=\"'+partValues+'\";\n'
        + '\n titles2=\"Number of complaints they\'ve filed in last year...\";\n familyVals2=['+results.sharingComplaints1Values+'];\n partFamilyVals2=\"'+partValues+'\";\n'
        + '\n councilVals2=['+results.sharingComplaints2Values+'];\n partCouncilVals2=\"'+partValues+'\";\n'
        + '\n publicVals2=['+results.sharingComplaints3Values+'];\n partPublicVals2=\"'+partValues+'\";\n'+cache.circleChartData;

    //viz14
    var viz14String = '\n webLoc=14;\n pageTitle=\"What data would people like to see?\";\n titles1=\"Who is living alone in their street...\";\n labels1=['+yesNoLabels+'];\n values1=['+results.seeLiveAloneValues+'];\n partValues1=\"'+partValues+'\";\n'
        + '\n titles2=\"Their friends\' whereabouts...\";\n labels2=['+yesNoLabels+'];\n values2=['+results.seeFriendsWhereaboutsValues+'];\n partValues2=\"'+partValues+'\";\n'
        + '\n titles3=\"Most used local services...\";\n labels3=['+yesNoLabels+'];\n values3=['+results.seeLocalServicesValues+'];\n partValues3=\"'+partValues+'\";\n'
        + '\n titles4=\"Financial stability of local businesses...\";\n labels4=['+yesNoLabels+'];\n values4=['+results.seeFinancesValues+'];\n partValues4=\"'+partValues+'\";\n'+cache.stackedChartData;

    //viz15
    var viz15String = '\n webLoc=15;\n pageTitle=\"Where do people find information about their city?\";\n names=['+findInfoLabels+'];\n values=['+results.findInfoValues+'];\n partValues=\"'+partValues+'\";\n'+cache.pieChartData;

    //viz16
    var viz16String = '\n webLoc=16;\n pageTitle=\"What do people do with unwanted gifts?\";\n names=['+unwantedGiftsLabels+'];\n values=['+results.unwantedGiftsValues+'];\n partValues=\"'+partValues+'\";\n'+cache.pieChartData;

    //viz17
    var viz17String = '\n webLoc=17;\n pageTitle=\"\";\n titles1=\"Would people eat a cake made by a new neighbour?\";\n labels1=['+yesNoPNTSLabels+'];\n values1=['+results.eatCakeValues+'];\n partValues1=\"'+partValues+'\";\n'
        + '\n titles2=\"Do people feel others trust them easily?\";\n labels2=['+yesNoPNTSLabels+'];\n values2=['+results.othersTrustValues+'];\n partValues2=\"'+partValues+'\";\n'
        + '\n titles3=\"Do people participate in public sharing websites?\";\n labels3=['+yesNoPNTSLabels+'];\n values3=['+results.publicSharingValues+'];\n partValues3=\"'+partValues+'\";\n'+cache.barChartData;

    //viz18
    var viz18String = '\n webLoc=18;\n pageTitle=\"Who would people share this data with?\";\n titles1=\"Details of underused household items...\";\n familyVals1=['+results.sharingHousehold1Values+'];\n partFamilyVals1=\"'+partValues+'\";\n'
        + '\n councilVals1=['+results.sharingHousehold2Values+'];\n partCouncilVals1=\"'+partValues+'\";\n'
        + '\n publicVals1=['+results.sharingHousehold3Values+'];\n partPublicVals1=\"'+partValues+'\";\n'
        + '\n titles2=\"Details of when they seek help or assistance...\";\n familyVals2=['+results.sharingAssistance1Values+'];\n partFamilyVals2=\"'+partValues+'\";\n'
        + '\n councilVals2=['+results.sharingAssistance2Values+'];\n partCouncilVals2=\"'+partValues+'\";\n'
        + '\n publicVals2=['+results.sharingAssistance3Values+'];\n partPublicVals2=\"'+partValues+'\";\n'+cache.circleChartData;

    //viz19
    var viz19String = '\n webLoc=19;\n pageTitle=\"What data would people like to see?\";\n titles1=\"How the government uses collected census data...\";\n labels1=['+yesNoLabels+'];\n values1=['+results.seeUseDataValues+'];\n partValues1=\"'+partValues+'\";\n'
        + '\n titles2=\"How social media sites use personal data...\";\n labels2=['+yesNoLabels+'];\n values2=['+results.seeSocialMediaValues+'];\n partValues2=\"'+partValues+'\";\n'
        + '\n titles3=\"What people on their street are concerned about...\";\n labels3=['+yesNoLabels+'];\n values3=['+results.seeConcernsValues+'];\n partValues3=\"'+partValues+'\";\n'
        + '\n titles4=\"What other people on their street need help with...\";\n labels4=['+yesNoLabels+'];\n values4=['+results.seeHelpValues+'];\n partValues4=\"'+partValues+'\";\n'+cache.stackedChartData;

    //viz20
    var viz20String = '\n webLoc=20;\n pageTitle=\"What do people put their faith in most?\";\n names=['+mostFaithLabels+'];\n values=['+results.mostFaithValues+'];\n partValues=\"'+partValues+'\";\n'+cache.pieChartData;

    callback(viz1String+viz2String+viz3String+viz4String+viz5String+viz6String+viz7String+viz8String+viz9String+
        viz10String+viz11String+viz12String+viz13String+viz14String+viz15String+viz16String+viz17String+viz18String+
        viz19String+viz20String);
}

function viz1(partID, callback){
    if(partID > 0){

        var partBloodTypeQuery = qg.GenerateQuery("bloodType","health",dbVals.bloodTypeDBVals,partID);

        db.GetFromDB(dbName, partBloodTypeQuery, function(values){
            var partResult = JSON.stringify(values);
            var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
            var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2,partTempValues.v3,partTempValues.v4,partTempValues.v5,partTempValues.v6,partTempValues.v7,partTempValues.v8,partTempValues.v9];
            var labels = "\"A+\",\"A-\",\"B+\",\"B-\",\"O+\",\"O-\",\"AB+\",\"AB-\",\"Don't know\",\"Prefer not to say\"";
            var title = "How does your blood type compare to others?";
            var webLoc = "1";
            callback("\n webLoc = "+webLoc+";\n pageTitle = \""+title+"\";\n values = ["+results.bloodTypeValues+"];\n partValues = ["+partValues+"];\n names = ["+labels+"];\n");
        });
    }else if (partID == 0){
        var partValues = "nothing";
        var labels = "\"A+\",\"A-\",\"B+\",\"B-\",\"O+\",\"O-\",\"AB+\",\"AB-\",\"Don't know\",\"Prefer not to say\"";
        var title = "What blood types are people?";
        var webLoc = "1";
        callback("\n webLoc = "+webLoc+";\n pageTitle = \""+title+"\";\n values = ["+results.bloodTypeValues+"];\n partValues = \""+partValues+"\";\n names = ["+labels+"];\n");
    }else{
        callback("");
    }
}

function viz2(partID, callback){
    var bar1String = "";
    var bar2String = "";
    var bar3String = "";

    if(partID > 0){

        var partGiveBloodQuery = qg.GenerateQuery("giveBlood","health",dbVals.yesNoDBVals,partID);
        var partUnprotectedSexQuery = qg.GenerateQuery("unprotectedSex","health",dbVals.yesNoDBVals,partID);
        var partOrganDonorQuery = qg.GenerateQuery("organDonor","health",dbVals.yesNoDBVals,partID);

        var processes = [];

        //retrieve give blood data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partGiveBloodQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Do you give blood?";
                var webLoc = "1";
                bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"\";\n\n labels1 = ['+labels+'];\n titles1 = \"'+title+'\";\n values1 = ['+results.giveBloodValues+'];\n partValues1 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });
        //retrieve sex data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partUnprotectedSexQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Have you had unprotected sex?";
                bar2String = '\n labels2 = ['+labels+'];\n titles2 = \"'+title+'\";\n values2 = ['+results.unprotectedSexValues+'];\n partValues2 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });
        //retrieve organ donor data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partOrganDonorQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Are you an organ donor?";
                bar3String = '\n labels3 = ['+labels+'];\n titles3 = \"'+title+'\";\n values3 = ['+results.organDonorValues+'];\n partValues3 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(bar1String + bar2String + bar3String);
        });

    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
        var title = "How many people give blood...";
        var webLoc = "1";
        bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"\";\n\n labels1 = ['+labels+'];\n titles1 = \"'+title+'\";\n values1 = ['+results.giveBloodValues+'];\n partValues1 = \"'+partValues+'\";\n\n';

        title = "How many people have had unprotected sex...";
        bar2String = '\n labels2 = ['+labels+'];\n titles2 = \"'+title+'\";\n values2 = ['+results.unprotectedSexValues+'];\n partValues2 = \"'+partValues+'\";\n\n';

        title = "How many people are organ donors...";
        bar3String = '\n labels3 = ['+labels+'];\n titles3 = \"'+title+'\";\n values3 = ['+results.organDonorValues+'];\n partValues3 = \"'+partValues+'\";\n\n';

        callback(bar1String + bar2String + bar3String);

    }else{
        callback("");
    }
}

function viz3(partID, callback){
    var circle1String = "";
    var circle2String = "";

    if (partID > 0) {

        var partSharingConditions1Query = qg.GenerateQuery("sharingConditions1","health",dbVals.sharingDBVals,partID);
        var partSharingConditions2Query = qg.GenerateQuery("sharingConditions2","health",dbVals.sharingDBVals,partID);
        var partSharingConditions3Query = qg.GenerateQuery("sharingConditions3","health",dbVals.sharingDBVals,partID);

        var partSharingGPVisits1Query = qg.GenerateQuery("sharingGPVisits1","health",dbVals.sharingDBVals,partID);
        var partSharingGPVisits2Query = qg.GenerateQuery("sharingGPVisits2","health",dbVals.sharingDBVals,partID);
        var partSharingGPVisits3Query = qg.GenerateQuery("sharingGPVisits3","health",dbVals.sharingDBVals,partID);

        var processes = [];

        //retrieve hereditary conditions data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingConditions1Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var labels = "\"Family or friends\",\"City council\",\"Public good\"";
                var title = "Your hereditary conditions...";
                var webLoc = "1";
                var pageTitle = "Who would you share this data with?";
                circle1String = circle1String+'\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n titles1 = \"'+title+'\";\n familyVals1 = ['+results.sharingConditions1Values+'];\n partFamilyVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingConditions2Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle1String = circle1String+'\n councilVals1 = ['+results.sharingConditions2Values+'];\n partCouncilVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingConditions3Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle1String = circle1String+'\n publicVals1 = ['+results.sharingConditions3Values+'];\n partPublicVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        //retrieve GP visits data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingGPVisits1Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "Your total GP visits in the last year...";
                circle2String = circle2String+'\n titles2 = \"'+title+'\";\n familyVals2 = ['+results.sharingGPVisits1Values+'];\n partFamilyVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingGPVisits2Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle2String = circle2String+'\n councilVals2 = ['+results.sharingGPVisits2Values+'];\n partCouncilVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingGPVisits3Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle2String = circle2String+'\n publicVals2 = ['+results.sharingGPVisits3Values+'];\n partPublicVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(circle1String + circle2String);
        });

    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"Family or friends\",\"City council\",\"Public good\"";
        var title = "Hereditary conditions...";
        var webLoc = "1";
        var pageTitle = "Who would people share this data with?";
        circle1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n titles1 = \"'+title+'\";\n familyVals1 = ['+results.sharingConditions1Values+'];\n partFamilyVals1 = \"'+partValues+'\";\n'
            + '\n councilVals1 = ['+results.sharingConditions2Values+'];\n partCouncilVals1 = \"'+partValues+'\";\n '
            + '\n publicVals1 = ['+results.sharingConditions3Values+'];\n partPublicVals1 = \"'+partValues+'\";\n';

        title = "Total GP visits in the last year...";
        circle2String = '\n titles2 = \"'+title+'\";\n familyVals2 = ['+results.sharingGPVisits1Values+'];\n partFamilyVals2 = \"'+partValues+'\";\n'
            + '\n councilVals2 = ['+results.sharingGPVisits2Values+'];\n partCouncilVals2 = \"'+partValues+'\";\n'
            + '\n publicVals2 = ['+results.sharingGPVisits3Values+'];\n partPublicVals2 = \"'+partValues+'\";\n';

        callback(circle1String + circle2String);

    }else {
        callback("");
    }
}

function viz4(partID, callback){
    var bar1String = "";
    var bar2String = "";
    var bar3String = "";
    var bar4String = "";

    if (partID > 0) {

        var partSeeWeightQuery = qg.GenerateQuery("seeWeight","health",dbVals.sharingDBVals,partID);
        var partSeeDeathQuery = qg.GenerateQuery("seeDeath","health",dbVals.sharingDBVals,partID);
        var partSeeExerciseQuery = qg.GenerateQuery("seeExercise","health",dbVals.sharingDBVals,partID);
        var partSeeFluQuery = qg.GenerateQuery("seeFlu","health",dbVals.sharingDBVals,partID);

        var processes = [];

        //weight data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeWeightQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "The average adult weight of people living in your neighbourhood...";
                var labels = "\"Yes\",\"No\"";
                var webLoc = "1";
                var pageTitle = "What information would you like to know?";
                bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1=\"'+title+'\";\n values1 = ['+results.seeWeightValues+'];\n partValues1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //death data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeDeathQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "The leading causes of death in your neighbourhood...";
                var labels = "\"Yes\",\"No\"";
                bar2String = '\n labels2 = ['+labels+'];\n titles2=\"'+title+'\";\n values2 = ['+results.seeDeathValues+'];\n partValues2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //exercise data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeExerciseQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "How much time on average people in your neighbourhood spend exercising...";
                var labels = "\"Yes\",\"No\"";
                bar3String = '\n labels3 = ['+labels+'];\n titles3=\"'+title+'\";\n values3 = ['+results.seeExerciseValues+'];\n partValues3 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //flu data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeFluQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "How many people in your neighbourhood got the flu last year...";
                var labels = "\"Yes\",\"No\"";
                bar4String = '\n labels4 = ['+labels+'];\n titles4=\"'+title+'\";\n values4 = ['+results.seeFluValues+'];\n partValues4 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(bar1String + bar2String + bar3String + bar4String);
        });
    } else if(partID == 0){
        var partValues = "nothing";
        var title = "The average adult weight of people living in their neighbourhood...";
        var labels = "\"Yes\",\"No\"";
        var webLoc = "1";
        var pageTitle = "What information would people like to know?";
        bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1 = \"'+title+'\";\n values1 = ['+results.seeWeightValues+'];\n partValues1 = \"'+partValues+'\";\n';

        title = "The leading causes of death in their neighbourhood...";
        bar2String = '\n labels2 = ['+labels+'];\n titles2 = \"'+title+'\";\n values2 = ['+results.seeDeathValues+'];\n partValues2 = \"'+partValues+'\";\n';

        title = "How much time on average people in their neighbourhood spend exercising...";
        bar3String = '\n labels3 = ['+labels+'];\n titles3 = \"'+title+'\";\n values3 = ['+results.seeExerciseValues+'];\n partValues3 = \"'+partValues+'\";\n';

        title = "How many people in their neighbourhood got the flu last year...";
        bar4String = '\n labels4 = ['+labels+'];\n titles4 = \"'+title+'\";\n values4 = ['+results.seeFluValues+'];\n partValues4 = \"'+partValues+'\";\n';

        callback(bar1String + bar2String + bar3String + bar4String);

    }else {
        callback("");
    }
}

function viz5(partID, callback){
    if(partID > 0){

        var partHealthServiceQuery = qg.GenerateQuery("healthService","health",dbVals.healthServiceDBVals,partID);

        db.GetFromDB(dbName, partHealthServiceQuery, function(values){
            var partResult = JSON.stringify(values);
            var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
            var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2,partTempValues.v3,partTempValues.v4];
            var labels = "\"Private only\",\"Both private and NHS\",\"NHS only\",\"Other\",\"Prefer not to say\"";
            var title = "What health services you and others use?";
            var webLoc = "1";
            callback("\n webLoc = "+webLoc+";\n pageTitle = \""+title+"\";\n values = ["+results.healthServiceValues+"];\n partValues = ["+partValues+"];\n names = ["+labels+"];\n");
        });
    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"Private only\",\"Both private and NHS\",\"NHS only\",\"Other\",\"Prefer not to say\"";
        var title = "What health services do people use?";
        var webLoc = "1";
        callback("\n webLoc = "+webLoc+";\n pageTitle = \""+title+"\";\n values = ["+results.healthServiceValues+"];\n partValues = \""+partValues+"\";\n names = ["+labels+"];\n");

    }else{
        callback("");
    }
}

function viz6(partID, callback){
    if(partID > 0){

        var partNeighbourNamesQuery = qg.GenerateQuery("neighbourNames","belonging",dbVals.neighbourNamesDBVals,partID);

        db.GetFromDB(dbName, partNeighbourNamesQuery, function(values){
            var partResult = JSON.stringify(values);
            var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
            var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5];
            var labels = "\"0\",\"1-2\",\"3-4\",\"5-6\",\"7+\",\"Prefer not to say\"";
            var title = "How many neighbours do you and others know by name?";
            var webLoc = "1";
            callback("\n webLoc = "+webLoc+";\n pageTitle = \""+title+"\";\n values = ["+results.neighbourNamesValues+"];\n partValues = ["+partValues+"];\n names = ["+labels+"];\n");
        });
    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"0\",\"1-2\",\"3-4\",\"5-6\",\"7+\",\"Prefer not to say\"";
        var title = "How many neighbours do people know by name?";
        var webLoc = "1";
        callback("\n webLoc = "+webLoc+";\n pageTitle = \""+title+"\";\n values = ["+results.neighbourNamesValues+"];\n partValues = \""+partValues+"\";\n names = ["+labels+"];\n");
    }else{
        callback("");
    }
}

function viz7(partID, callback){
    var bar1String = "";
    var bar2String = "";
    var bar3String = "";

    if(partID > 0){

        var partContentQuery = qg.GenerateQuery("content","belonging",dbVals.yesNoDBVals,partID);
        var partMinorityQuery = qg.GenerateQuery("minority","belonging",dbVals.yesNoDBVals,partID);
        var partSexOffenderQuery = qg.GenerateQuery("sexOffender","belonging",dbVals.yesNoDBVals,partID);

        var processes = [];

        //retrieve give blood data
        processes.push(function(internalCallback){
            db.GetFromDB(dbname, partContentQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Are you content where you live?";
                var pageTitle = "";
                var webLoc = "1";
                bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1 = \"'+title+'\";\n values1 = ['+results.contentValues+'];\n partValues1 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });
        //retrieve sex data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partMinorityQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Do you feel a minority where you live?";
                bar2String = '\n labels2 = ['+labels+'];\n titles2 = \"'+title+'\";\n values2 = ['+results.minorityValues+'];\n partValues2 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });
        //retrieve organ donor data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSexOffenderQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Would like to know if a sex offender moved to your street?";
                bar3String = '\n labels3 = ['+labels+'];\n titles3 = \"'+title+'\";\n values3 = ['+results.sexOffenderValues+'];\n partValues3 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(bar1String + bar2String + bar3String);
        });

    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
        var title = "How many people are content where they live?";
        var pageTitle = "";
        var webLoc = "1";
        bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1 = \"'+title+'\";\n values1 = ['+results.contentValues+'];\n partValues1 = \"'+partValues+'\";\n';

        title = "How many people feel a minority where they live?";
        bar2String = '\n labels2 = ['+labels+'];\n titles2 = \"'+title+'\";\n values2 = ['+results.minorityValues+'];\n partValues2 = \"'+partValues+'\";\n';

        title = "How many people would like to know if a sex offender moved to their street?";
        bar3String = '\n labels3 = ['+labels+'];\n titles3 = \"'+title+'\";\n values3 = ['+results.sexOffenderValues+'];\n partValues3 = \"'+partValues+'\";\n';

        callback(bar1String + bar2String + bar3String);

    }else{
        callback("");
    }
}

function viz8(partID, callback){
    var circle1String = "";
    var circle2String = "";

    if (partID > 0) {

        var partSharingFines1Query = qg.GenerateQuery("sharingFines1","belonging",dbVals.sharingDBVals,partID);
        var partSharingFines2Query = qg.GenerateQuery("sharingFines2","belonging",dbVals.sharingDBVals,partID);
        var partSharingFines3Query = qg.GenerateQuery("sharingFines3","belonging",dbVals.sharingDBVals,partID);

        var partSharingVoted1Query = qg.GenerateQuery("sharingVoted1","belonging",dbVals.sharingDBVals,partID);
        var partSharingVoted2Query = qg.GenerateQuery("sharingVoted2","belonging",dbVals.sharingDBVals,partID);
        var partSharingVoted3Query = qg.GenerateQuery("sharingVoted3","belonging",dbVals.sharingDBVals,partID);


        var processes = [];

        //retrieve fines data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingFines1Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "Number of fines you received this year...";
                var pageTitle = "Who would you share this data with?";
                var webLoc = "1";
                circle1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n titles1 = \"'+title+'\";\n familyVals1 = ['+results.sharingFines1Values+'];\n partFamilyVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingFines2Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle1String = circle1String+'councilVals1 = ['+results.sharingFines2Values+'];\n partCouncilVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingFines3Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle1String = circle1String+'publicVals1 = ['+results.sharingFines3Values+'];\n partPublicVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        //retrieve voted data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingVoted1Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "If you voted in the last elections...";
                circle2String = '\n titles2 = \"'+title+'\";\n familyVals2 = ['+results.sharingVoted1Values+'];\n partFamilyVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingVoted2Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle2String = circle2String+'councilVals2 = ['+results.sharingVoted2Values+'];\n partCouncilVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingVoted3Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle2String = circle2String+'publicVals2 = ['+results.sharingVoted3Values+'];\n partPublicVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(circle1String + circle2String);
        });

    }else if(partID == 0){
        var partValues = "nothing";
        var title = "Fines received in last year...";
        var pageTitle = "Who would people share this data with?";
        var webLoc = "1";
        circle1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n titles1 = \"'+title+'\";\n familyVals1 = ['+results.sharingFines1Values+'];\n partFamilyVals1 = \"'+partValues+'\";\n'
            + '\n councilVals1 = ['+results.sharingFines2Values+'];\n partCouncilVals1 = \"'+partValues+'\";\n'
            + '\n publicVals1 = ['+results.sharingFines3Values+'];\n partPublicVals1 = \"'+partValues+'\";\n';

        title = "If they voted in last elections...";
        circle2String = '\n titles2 = \"'+title+'\";\n familyVals2 = ['+results.sharingVoted1Values+'];\n partFamilyVals2 = \"'+partValues+'\";\n '
            + '\n councilVals2 = ['+results.sharingVoted2Values+'];\n partCouncilVals2 = \"'+partValues+'\";\n '
            + '\n publicVals2 = ['+results.sharingVoted3Values+'];\n partPublicVals2 = \"'+partValues+'\";\n';

        callback(circle1String + circle2String);
    }else {
        callback("");
    }
}

function viz9(partID, callback){
    var bar1String = "";
    var bar2String = "";
    var bar3String = "";
    var bar4String = "";

    if (partID > 0) {

        var partSeeRecyclingQuery = qg.GenerateQuery("seeRecycling","belonging",dbVals.sharingDBVals,partID);
        var partSeeTeamsQuery = qg.GenerateQuery("seeTeams","belonging",dbVals.sharingDBVals,partID);
        var partSeeNationalityQuery = qg.GenerateQuery("seeNationality","belonging",dbVals.sharingDBVals,partID);
        var partSeeLanguagesQuery = qg.GenerateQuery("seeLanguages","belonging",dbVals.sharingDBVals,partID);

        var processes = [];

        //recycling data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeRecyclingQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "How much recycling your neighbourhood achieved last quarter...";
                var labels = "\"Yes\",\"No\"";
                var pageTitle = "What information would you like to know?";
                var webLoc = "1";
                bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1=\"'+title+'\";\n values1 = ['+results.seeRecyclingValues+'];\n partValues1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //sports teams data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeTeamsQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "What sports teams are supported by your neighbours...";
                var labels = "\"Yes\",\"No\"";
                bar2String = '\n labels2 = ['+labels+'];\n titles2=\"'+title+'\";\n values2 = ['+results.seeTeamsValues+'];\n partValues2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //nationality data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeNationalityQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "Number of people in your neighbourhood with same nationality as you...";
                var labels = "\"Yes\",\"No\"";
                bar3String = '\n labels3 = ['+labels+'];\n titles3=\"'+title+'\";\n values3 = ['+results.seeNationalityValues+'];\n partValues3 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //languages data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeLanguagesQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "What languages are spoken in your neighbourhood...";
                var labels = "\"Yes\",\"No\"";
                bar4String = '\n labels4 = ['+labels+'];\n titles4=\"'+title+'\";\n values4 = ['+results.seeLanguagesValues+'];\n partValues4 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(bar1String + bar2String + bar3String + bar4String);
        });
    } else if(partID == 0){
        var partValues = "nothing";
        var title = "How much recycling their neighbourhood achieved last quarter...";
        var labels = "\"Yes\",\"No\"";
        var pageTitle = "What information would people like to know?";
        var webLoc = "1";
        bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1 = \"'+title+'\";\n values1 = ['+results.seeRecyclingValues+'];\n partValues1 = \"'+partValues+'\";\n';

        title = "What sports teams are supported by their neighbours...";
        bar2String = '\n labels2 = ['+labels+'];\n titles2 = \"'+title+'\";\n values2 = ['+results.seeTeamsValues+'];\n partValues2 = \"'+partValues+'\";\n';

        title = "Number of people in their neighbourhood with same nationality as them...";
        bar3String = '\n labels3 = ['+labels+'];\n titles3 = \"'+title+'\";\n values3 = ['+results.seeNationalityValues+'];\n partValues3 = \"'+partValues+'\";\n';

        title = "What languages are spoken in their neighbourhood...";
        bar4String = '\n labels4 = ['+labels+'];\n titles4 = \"'+title+'\";\n values4 = ['+results.seeLanguagesValues+'];\n partValues4 = \"'+partValues+'\";\n';

        callback(bar1String + bar2String + bar3String + bar4String);

    }else {
        callback("");
    }
}

function viz10(partID, callback){
    if(partID > 0){

        var partLiveInQuery = qg.GenerateQuery("liveIn","belonging",dbVals.liveInDBVals,partID);

        db.GetFromDB(dbName, partLiveInQuery, function(values){
            var partResult = JSON.stringify(values);
            var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
            var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2,partTempValues.v3,partTempValues.v4,partTempValues.v5,partTempValues.v6,partTempValues.v7];
            var labels = "\"Housing shelter\",\"Social housing\",\"With family\",\"Private rental\",\"Home I own\",\"One of the homes I own\",\"Other\",\"Prefer not to say\"";
            var pageTitle = "Where do you and others live?";
            var webLoc = "1";
            callback("\n webLoc = "+webLoc+";\n pageTitle = \""+pageTitle+"\";\n values = ["+results.liveInValues+"];\n partValues = ["+partValues+"];\n names = ["+labels+"];\n");
        });
    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"Housing shelter\",\"Social housing\",\"With family\",\"Private rental\",\"Home I own\",\"One of the homes I own\",\"Other\",\"Prefer not to say\"";
        var pageTitle = "Where do people live?";
        var webLoc = "1";
        callback("\n webLoc = "+webLoc+";\n pageTitle = \""+pageTitle+"\";\n values = ["+results.liveInValues+"];\n partValues = \""+partValues+"\";\n names = ["+labels+"];\n");
    }else{
        callback("");
    }
}

function viz11(partID, callback){
    if(partID > 0){

        var partPublicTransportQuery = qg.GenerateQuery("publicTransport","place",dbVals.publicTransportDBVals,partID);

        db.GetFromDB(dbName, partPublicTransportQuery, function(values){
            var partResult = JSON.stringify(values);
            var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
            var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6];
            var labels = "\"0\",\"1\",\"2\",\"3\",\"4\",\"More than 4\",\"Prefer not to say\"";
            var pageTitle = "How many hours do you and others spend on public transport daily?";
            var webLoc = "1";
            callback("\n webLoc = "+webLoc+";\n pageTitle = \""+pageTitle+"\";\n values = ["+results.publicTransportValues+"];\n partValues = ["+partValues+"];\n names = ["+labels+"];\n");
        });
    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"0\",\"1\",\"2\",\"3\",\"4\",\"More than 4\",\"Prefer not to say\"";
        var pageTitle = "How many hours do people spend on public transport daily?";
        var webLoc = "1";
        callback("\n webLoc = "+webLoc+";\n pageTitle = \""+pageTitle+"\";\n values = ["+results.publicTransportValues+"];\n partValues = \""+partValues+"\";\n names = ["+labels+"];\n");
    }else{
        callback("");
    }
}

function viz12(partID, callback){
    if(partID > 0){

        var bar1String = "";
        var bar2String = "";
        var bar3String = "";

        var partLocalMPQuery = qg.GenerateQuery("localMP","place",dbVals.yesNoDBVals,partID);
        var partLibraryQuery = qg.GenerateQuery("library","place",dbVals.yesNoDBVals,partID);
        var partPensionQuery = qg.GenerateQuery("pension","place",dbVals.yesNoDBVals,partID);

        var processes = [];

        //retrieve local MP data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partLocalMPQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Have you met your local MP?";
                var pageTitle = "";
                var webLoc = "1";
                bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1 = \"'+title+'\";\n values1 = ['+results.localMPValues+'];\n partValues1 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });
        //retrieve library data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partLibraryQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Do you use your public library?";
                bar2String = '\n labels2 = ['+labels+'];\n titles2 = \"'+title+'\";\n values2 = ['+results.libraryValues+'];\n partValues2 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });
        //retrieve pension data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partPensionQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Do you have a plan for financial support in your old age?";
                bar3String = '\n labels3 = ['+labels+'];\n titles3 = \"'+title+'\";\n values3 = ['+results.pensionValues+'];\n partValues3 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(bar1String + bar2String + bar3String);
        });

    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
        var title = "How many people have met their local MP?";
        var pageTitle = "";
        var webLoc = "1";
        bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1 = \"'+title+'\";\n values1 = ['+results.localMPValues+'];\n partValues1 = \"'+partValues+'\";\n';

        title = "How many people use their public library?";
        bar2String = '\n labels2 = ['+labels+'];\n titles2 = \"'+title+'\";\n values2 = ['+results.libraryValues+'];\n partValues2 = \"'+partValues+'\";\n';

        title = "How many people have a plan for financial support in their old age?";
        bar3String = '\n labels3 = ['+labels+'];\n titles3 = \"'+title+'\";\n values3 = ['+results.pensionValues+'];\n partValues3 = \"'+partValues+'\";\n';

        callback(bar1String + bar2String + bar3String);
    }else{
        callback("");
    }
}

function viz13(partID, callback){
    var circle1String = "";
    var circle2String = "";

    if (partID > 0) {

        var partSharingWhereabouts1Query = qg.GenerateQuery("sharingWhereabouts1","place",dbVals.sharingDBVals,partID);
        var partSharingWhereabouts2Query = qg.GenerateQuery("sharingWhereabouts2","place",dbVals.sharingDBVals,partID);
        var partSharingWhereabouts3Query = qg.GenerateQuery("sharingWhereabouts3","place",dbVals.sharingDBVals,partID);

        var partSharingComplaints1Query = qg.GenerateQuery("sharingComplaints1","place",dbVals.sharingDBVals,partID);
        var partSharingComplaints2Query = qg.GenerateQuery("sharingComplaints2","place",dbVals.sharingDBVals,partID);
        var partSharingComplaints3Query = qg.GenerateQuery("sharingComplaints3","place",dbVals.sharingDBVals,partID);


        var processes = [];

        //retrieve whereabouts data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingWhereabouts1Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var pageTitle = "Who would you share this data with?";
                var title = "Your whereabouts...";
                var webLoc = "1";
                circle1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n titles1 = \"'+title+'\";\n familyVals1 = ['+results.sharingWhereabouts1Values+'];\n partFamilyVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingWhereabouts2Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle1String = circle1String+'councilVals1 = ['+results.sharingWhereabouts2Values+'];\n partCouncilVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingWhereabouts3Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle1String = circle1String+'publicVals1 = ['+results.sharingWhereabouts3Values+'];\n partPublicVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        //retrieve complaints data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingComplaints1Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "The number of complaints you filed in last year...";
                circle2String = '\n titles2 = \"'+title+'\";\n familyVals2 = ['+results.sharingComplaints1Values+'];\n partFamilyVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingComplaints2Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle2String = circle2String+'councilVals2 = ['+results.sharingComplaints2Values+'];\n partCouncilVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingComplaints3Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle2String = circle2String+'publicVals2 = ['+results.sharingComplaints3Values+'];\n partPublicVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(circle1String + circle2String);
        });

    }else if(partID == 0){
        var partValues = "nothing";
        var pageTitle = "Who would people share this data with?";
        var title = "Their whereabouts...";
        var webLoc = "1";
        circle1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n titles1 = \"'+title+'\";\n familyVals1 = ['+results.sharingWhereabouts1Values+'];\n partFamilyVals1 = \"'+partValues+'\";\n'
            + '\n councilVals1 = ['+results.sharingWhereabouts2Values+'];\n partCouncilVals1 = \"'+partValues+'\";\n'
            + '\n publicVals1 = ['+results.sharingWhereabouts3Values+'];\n partPublicVals1 = \"'+partValues+'\";\n';

        title = "Number of complaints they\'ve filed in last year...";
        circle2String = '\n titles2 = \"'+title+'\";\n familyVals2 = ['+results.sharingComplaints1Values+'];\n partFamilyVals2 = \"'+partValues+'\";\n'
            + '\n councilVals2 = ['+results.sharingComplaints2Values+'];\n partCouncilVals2 = \"'+partValues+'\";\n'
            + '\n publicVals2 = ['+results.sharingComplaints3Values+'];\n partPublicVals2 = \"'+partValues+'\";\n';

        callback(circle1String + circle2String);
    }else {
        callback("");
    }
}

function viz14(partID, callback){
    var bar1String = "";
    var bar2String = "";
    var bar3String = "";
    var bar4String = "";

    if (partID > 0) {

        var partSeeLiveAloneQuery = qg.GenerateQuery("seeLiveAlone","place",dbVals.sharingDBVals,partID);
        var partSeeFriendsWhereaboutsQuery = qg.GenerateQuery("seeFriendsWhereabouts","place",dbVals.sharingDBVals,partID);
        var partSeeLocalServicesQuery = qg.GenerateQuery("seeLocalServices","place",dbVals.sharingDBVals,partID);
        var partSeeFinancesQuery = qg.GenerateQuery("seeFinances","place",dbVals.sharingDBVals,partID);

        var processes = [];

        //live alone data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeLiveAloneQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "Who is living alone in your street...";
                var labels = "\"Yes\",\"No\"";
                var pageTitle = "What information would you like to know?";
                var webLoc = "1";
                bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1=\"'+title+'\";\n values1 = ['+results.seeLiveAloneValues+'];\n partValues1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //friends whereabouts data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeFriendsWhereaboutsQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "Your friends' whereabouts throughout the day...";
                var labels = "\"Yes\",\"No\"";
                bar2String = '\n labels2 = ['+labels+'];\n titles2=\"'+title+'\";\n values2 = ['+results.seeFriendsWhereaboutsValues+'];\n partValues2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //local services data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeLocalServicesQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "Most used local services in your neighbourhood...";
                var labels = "\"Yes\",\"No\"";
                bar3String = '\n labels3 = ['+labels+'];\n titles3=\"'+title+'\";\n values3 = ['+results.seeLocalServicesValues+'];\n partValues3 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //finances data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeFinancesQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "The financial stability of local businesses...";
                var labels = "\"Yes\",\"No\"";
                bar4String = '\n labels4 = ['+labels+'];\n titles4=\"'+title+'\";\n values4 = ['+results.seeFinancesValues+'];\n partValues4 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(bar1String + bar2String + bar3String + bar4String);
        });
    } else if(partID == 0){
        var partValues = "nothing";
        var title = "Who is living alone in their street...";
        var labels = "\"Yes\",\"No\"";
        var pageTitle = "What information would people like to know?";
        var webLoc = "1";
        bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n titles1 = \"'+title+'\";\n labels1 = ['+labels+'];\n values1 = ['+results.seeLiveAloneValues+'];\n partValues1 = \"'+partValues+'\";\n';

        title = "Their friends' whereabouts...";
        bar2String = '\n titles2 = \"'+title+'\";\n values2 = ['+results.seeFriendsWhereaboutsValues+'];\n partValues2 = \"'+partValues+'\";\n';

        title = "Most used local services...";
        bar3String = '\n titles3 = \"'+title+'\";\n values3 = ['+results.seeLocalServicesValues+'];\n partValues3 = \"'+partValues+'\";\n';

        title = "Financial stability of local businesses...";
        bar4String = '\n titles4 = \"'+title+'\";\n values4 = ['+results.seeFinancesValues+'];\n partValues4 = \"'+partValues+'\";\n';

        callback(bar1String + bar2String + bar3String + bar4String);
    }else {
        callback("");
    }
}

function viz15(partID, callback){
    if(partID > 0){

        var partFindInfoQuery = qg.GenerateQuery("findInfo","place",dbVals.findInfoDBVals,partID);

        db.GetFromDB(dbName, partFindInfoQuery, function(values){
            var partResult = JSON.stringify(values);
            var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
            var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2,partTempValues.v3,partTempValues.v4,partTempValues.v5];
            var labels = "\"Family and friends\",\"Local resources\",\"Online social networks\",\"Other online resources\",\"Other\",\"Prefer not to say\"";
            var pageTitle = "Where do you and others find information about your city?";
            var webLoc = "1";
            callback("\n webLoc = "+webLoc+";\n pageTitle = \""+pageTitle+"\";\n values = ["+results.findInfoValues+"];\n partValues = ["+partValues+"];\n names = ["+labels+"];\n");
        });
    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"Family and friends\",\"Local resources\",\"Online social networks\",\"Other online resources\",\"Other\",\"Prefer not to say\"";
        var pageTitle = "Where do people find information about their city?";
        var webLoc = "1";
        callback("\n webLoc = "+webLoc+";\n pageTitle = \""+pageTitle+"\";\n values = ["+results.findInfoValues+"];\n partValues = \""+partValues+"\";\n names = ["+labels+"];\n");
    }else{
        callback("");
    }
}

function viz16(partID, callback){
    if(partID > 0){

        var partUnwantedGiftsQuery = qg.GenerateQuery("unwantedGifts","trust",dbVals.unwantedGiftsDBVals,partID);

        db.GetFromDB(dbName, partUnwantedGiftsQuery, function(values){
            var partResult = JSON.stringify(values);
            var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
            var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6];
            var labels = "\"Charity\",\"Friends or family\",\"Sell\",\"Throw away\",\"Store them\",\"Other\",\"Prefer not to say\"";
            var pageTitle = "What do you and others do with unwanted gifts?";
            var webLoc = "1";
            callback("\n webLoc = "+webLoc+";\n pageTitle = \""+pageTitle+"\";\n values = ["+results.unwantedGiftsValues+"];\n partValues = ["+partValues+"];\n names = ["+labels+"];\n");
        });
    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"Charity\",\"Friends or family\",\"Sell\",\"Throw away\",\"Store them\",\"Other\",\"Prefer not to say\"";
        var pageTitle = "What people do with unwanted gifts?";
        var webLoc = "1";
        callback("\n webLoc = "+webLoc+";\n pageTitle = \""+pageTitle+"\";\n values = ["+results.unwantedGiftsValues+"];\n partValues = \""+partValues+"\";\n names = ["+labels+"];\n");
    }else{
        callback("");
    }
}

function viz17(partID, callback){
    var bar1String = "";
    var bar2String = "";
    var bar3String = "";

    if(partID > 0){

        var partEatCakeQuery = qg.GenerateQuery("eatCake","trust",dbVals.yesNoDBVals,partID);
        var partOthersTrustQuery = qg.GenerateQuery("othersTrust","trust",dbVals.yesNoDBVals,partID);
        var partPublicSharingQuery = qg.GenerateQuery("publicSharing","trust",dbVals.yesNoDBVals,partID);

        var processes = [];

        //retrieve eat cake data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partEatCakeQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Would you eat a cake made by a new neighbour?";
                var pageTitle = "";
                var webLoc = "1";
                bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1 = \"'+title+'\";\n values1 = ['+results.eatCakeValues+'];\n partValues1 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });
        //retrieve others trust data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partOthersTrustQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Do you feel others trust you easily?";
                bar2String = '\n labels2 = ['+labels+'];\n titles2 = \"'+title+'\";\n values2 = ['+results.othersTrustValues+'];\n partValues2 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });
        //retrieve public sharing data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partPublicSharingQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2];
                var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
                var title = "Do you use public sharing websites?";
                bar3String = '\n labels3 = ['+labels+'];\n titles3 = \"'+title+'\";\n values3 = ['+results.publicSharingValues+'];\n partValues3 = ['+partValues+'];\n\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(bar1String + bar2String + bar3String);
        });

    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"Yes\",\"No\",\"Prefer not to say\"";
        var title = "Would people eat a cake made by a new neighbour?";
        var pageTitle = "";
        var webLoc = "1";
        bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1 = \"'+title+'\";\n values1 = ['+results.eatCakeValues+'];\n partValues1 = \"'+partValues+'\";\n';

        title = "Do people feel others trust them easily?";
        bar2String = '\n labels2 = ['+labels+'];\n titles2 = \"'+title+'\";\n values2 = ['+results.othersTrustValues+'];\n partValues2 = \"'+partValues+'\";\n';

        title = "Do people participate in public sharing websites?";
        bar3String = '\n labels3 = ['+labels+'];\n titles3 = \"'+title+'\";\n values3 = ['+results.publicSharingValues+'];\n partValues3 = \"'+partValues+'\";\n';

        callback(bar1String + bar2String + bar3String);
    }else{
        callback("");
    }
}

function viz18(partID, callback){
    var circle1String = "";
    var circle2String = "";

    if (partID > 0) {

        var partSharingHousehold1Query = qg.GenerateQuery("sharingHousehold1","trust",dbVals.sharingDBVals,partID);
        var partSharingHousehold2Query = qg.GenerateQuery("sharingHousehold2","trust",dbVals.sharingDBVals,partID);
        var partSharingHousehold3Query = qg.GenerateQuery("sharingHousehold3","trust",dbVals.sharingDBVals,partID);

        var partSharingAssistance1Query = qg.GenerateQuery("sharingAssistance1","trust",dbVals.sharingDBVals,partID);
        var partSharingAssistance2Query = qg.GenerateQuery("sharingAssistance2","trust",dbVals.sharingDBVals,partID);
        var partSharingAssistance3Query = qg.GenerateQuery("sharingAssistance3","trust",dbVals.sharingDBVals,partID);


        var processes = [];

        //retrieve household data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingHousehold1Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "Details of your underused household items...";
                var pageTitle = "Who would you share this data with?";
                var webLoc = "1";
                circle1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n titles1 = \"'+title+'\";\n familyVals1 = ['+results.sharingHousehold1Values+'];\n partFamilyVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingHousehold2Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle1String = circle1String+'councilVals1 = ['+results.sharingHousehold2Values+'];\n partCouncilVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingHousehold3Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle1String = circle1String+'publicVals1 = ['+results.sharingHousehold3Values+'];\n partPublicVals1 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        //retrieve assistance data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingAssistance1Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "When of when you seek help or assistance...";
                circle2String = circle2String+'familyVals2 = ['+results.sharingAssistance1Values+'];\n partFamilyVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingAssistance2Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle2String = circle2String+'councilVals2 = ['+results.sharingAssistance2Values+'];\n partCouncilVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSharingAssistance3Query, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                circle2String = circle2String+'publicVals2 = ['+results.sharingAssistance3Values+'];\n partPublicVals2 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(circle1String + circle2String);
        });

    }else if(partID == 0){
        var partValues = "nothing";
        var title = "Details of underused household items...";
        var pageTitle = "Who would people share this data with?";
        var webLoc = "1";
        circle1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n titles1 = \"'+title+'\";\n familyVals1 = ['+results.sharingHousehold1Values+'];\n partFamilyVals1 = \"'+partValues+'\";\n'
            + '\n councilVals1 = ['+results.sharingHousehold2Values+'];\n partCouncilVals1 = \"'+partValues+'\";\n'
            + '\n publicVals1 = ['+results.sharingHousehold3Values+'];\n partPublicVals1 = \"'+partValues+'\";\n';

        title = "Details of when they seek help or assistance...";
        circle2String = '\n titles2 = \"'+title+'\";\n familyVals2 = ['+results.sharingAssistance1Values+'];\n partFamilyVals2 = \"'+partValues+'\";\n'
            + '\n councilVals2 = ['+results.sharingAssistance2Values+'];\n partCouncilVals2 = \"'+partValues+'\";\n'
            + '\n publicVals2 = ['+results.sharingAssistance3Values+'];\n partPublicVals2 = \"'+partValues+'\";\n';

        callback(circle1String + circle2String);
    }else {
        callback("");
    }
}

function viz19(partID, callback){
    var bar1String = "";
    var bar2String = "";
    var bar3String = "";
    var bar4String = "";

    if (partID > 0) {

        var partSeeUseDataQuery = qg.GenerateQuery("seeUseData","trust",dbVals.sharingDBVals,partID);
        var partSeeSocialMediaQuery = qg.GenerateQuery("seeSocialMedia","trust",dbVals.sharingDBVals,partID);
        var partSeeConcernsQuery = qg.GenerateQuery("seeConcerns","trust",dbVals.sharingDBVals,partID);
        var partSeeHelpQuery = qg.GenerateQuery("seeHelp","trust",dbVals.sharingDBVals,partID);

        var processes = [];

        //use data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeUseDataQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "How the government uses your collected census data...";
                var labels = "\"Yes\",\"No\"";
                var pageTitle = "What information would you like to know?";
                var webLoc = "1";
                bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1=\"'+title+'\";\n values1 = ['+results.seeUseDataValues+'];\n partValues1 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //social media data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeSocialMediaQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "How social media websites use your personal information...";
                var labels = "\"Yes\",\"No\"";
                bar2String = '\n labels2 = ['+labels+'];\n titles2=\"'+title+'\";\n values2 = ['+results.seeSocialMediaValues+'];\n partValues2 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //concerns data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeConcernsQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "What people on your street are concerned about...";
                var labels = "\"Yes\",\"No\"";
                bar3String = '\n labels3 = ['+labels+'];\n titles3=\"'+title+'\";\n values3 = ['+results.seeConcernsValues+'];\n partValues3 = ['+partValues+'];\n';
                internalCallback();
            });
        });
        //help data
        processes.push(function(internalCallback){
            db.GetFromDB(dbName, partSeeHelpQuery, function(values){
                var partResult = JSON.stringify(values);
                var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
                var partValues = [partTempValues.v0,partTempValues.v1];
                var title = "What other people on your street need help with...";
                var labels = "\"Yes\",\"No\"";
                bar4String = '\n labels4 = ['+labels+'];\n titles4=\"'+title+'\";\n values4 = ['+results.seeHelpValues+'];\n partValues4 = ['+partValues+'];\n';
                internalCallback();
            });
        });

        async.parallel(processes, function(){
            console.log("finished processes - serving html...");
            callback(bar1String + bar2String + bar3String + bar4String);
        });
    } else if(partID == 0){
        var partValues = "nothing";
        var title = "How the government uses collected census data...";
        var labels = "\"Yes\",\"No\"";
        var pageTitle = "What information would people like to know?";
        var webLoc = "1";
        bar1String = '\n webLoc = '+webLoc+';\n pageTitle = \"'+pageTitle+'\";\n labels1 = ['+labels+'];\n titles1 = \"'+title+'\";\n values1 = ['+results.seeUseDataValues+'];\n partValues1 = \"'+partValues+'\";\n';

        title = "How social media websites use personal information...";
        bar2String = '\n labels2 = ['+labels+'];\n titles2 = \"'+title+'\";\n values2 = ['+results.seeSocialMediaValues+'];\n partValues2 = \"'+partValues+'\";\n';

        title = "What people on their street are concerned about...";
        bar3String = '\n labels3 = ['+labels+'];\n titles3 = \"'+title+'\";\n values3 = ['+results.seeConcernsValues+'];\n partValues3 = \"'+partValues+'\";\n';

        title = "What other people on their street need help with...";
        bar4String = '\n labels4 = ['+labels+'];\n titles4 = \"'+title+'\";\n values4 = ['+results.seeHelpValues+'];\n partValues4 = \"'+partValues+'\";\n';

        callback(bar1String + bar2String + bar3String + bar4String);
    }else {
        callback("");
    }
}

function viz20(partID, callback){
    if(partID > 0){

        var partMostFaithQuery = qg.GenerateQuery("mostFaith","trust",dbVals.mostFaithDBVals,partID);

        db.GetFromDB(dbName, partMostFaithQuery, function(values){
            var partResult = JSON.stringify(values);
            var partTempValues = JSON.parse(partResult.substr(1,partResult.length-2));
            var partValues = [partTempValues.v0,partTempValues.v1,partTempValues.v2,partTempValues.v3,partTempValues.v4,partTempValues.v5,partTempValues.v6,partTempValues.v7];
            var labels = "\"Myself\",\"Family or friends\",\"Local Councillor\",\"Government\",\"UN\",\"Universe\",\"Other\",\"Prefer not to say\"";
            var pageTitle = "What do your put your faith in most?";
            var webLoc = "1";
            callback("\n webLoc = "+webLoc+";\n pageTitle = \""+pageTitle+"\";\n values = ["+results.mostFaithValues+"];\n partValues = ["+partValues+"];\n names = ["+labels+"];\n");
        });
    }else if(partID == 0){
        var partValues = "nothing";
        var labels = "\"Myself\",\"Family or friends\",\"Local Councillor\",\"Government\",\"UN\",\"Universe\",\"Other\",\"Prefer not to say\"";
        var pageTitle = "What do people put their faith in most?";
        var webLoc = "1";
        callback("\n webLoc = "+webLoc+";\n pageTitle = \""+pageTitle+"\";\n values = ["+results.mostFaithValues+"];\n partValues = \""+partValues+"\";\n names = ["+labels+"];\n");
    }else{
        callback("");
    }
}



/**
 * @constructor
 */
var SensUsViz = function(){};

SensUsViz.prototype.GetSummary = function(callback){
    getSummary(callback);
};

SensUsViz.prototype.Viz1 = function(partID, callback){
    viz1(partID, callback);
};

SensUsViz.prototype.Viz2 = function(partID, callback){
    viz2(partID, callback);
};

SensUsViz.prototype.Viz3 = function(partID, callback){
    viz3(partID, callback);
};

SensUsViz.prototype.Viz4 = function(partID, callback){
    viz4(partID, callback);
};

SensUsViz.prototype.Viz5 = function(partID, callback){
    viz5(partID, callback);
};

SensUsViz.prototype.Viz6 = function(partID, callback){
    viz6(partID, callback);
};

SensUsViz.prototype.Viz7 = function(partID, callback){
    viz7(partID, callback);
};

SensUsViz.prototype.Viz8 = function(partID, callback){
    viz8(partID, callback);
};

SensUsViz.prototype.Viz9 = function(partID, callback){
    viz9(partID, callback);
};

SensUsViz.prototype.Viz10 = function(partID, callback){
    viz10(partID, callback);
};

SensUsViz.prototype.Viz11 = function(partID, callback){
    viz11(partID, callback);
};

SensUsViz.prototype.Viz12 = function(partID, callback){
    viz12(partID, callback);
};

SensUsViz.prototype.Viz13 = function(partID, callback){
    viz13(partID, callback);
};

SensUsViz.prototype.Viz14 = function(partID, callback){
    viz14(partID, callback);
};

SensUsViz.prototype.Viz15 = function(partID, callback){
    viz15(partID, callback);
};

SensUsViz.prototype.Viz16 = function(partID, callback){
    viz16(partID, callback);
};

SensUsViz.prototype.Viz17 = function(partID, callback){
    viz17(partID, callback);
};

SensUsViz.prototype.Viz18 = function(partID, callback){
    viz18(partID, callback);
};

SensUsViz.prototype.Viz19 = function(partID, callback){
    viz19(partID, callback);
};

SensUsViz.prototype.Viz20 = function(partID, callback){
    viz20(partID, callback);
};

module.exports = SensUsViz;