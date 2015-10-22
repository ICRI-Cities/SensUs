/**
 * Created by sarahg on 20/10/15.
 */

var Database = require('./Database');
var db = new Database();
var dbName = "censusDB";

var queries = require('./Queries');

//refresh interval for getting MySQL queries into memory
var queryInterval = 10000;

/****************************************************************
 LOADING VISUALISATION DATA INTO MEMORY
 ****************************************************************/
// loads data both in the startup and then reloads after queryInterval

//var tempResult = "[]";
module.exports.bloodTypeValues = "[]";
module.exports.giveBloodValues = "[]";
module.exports.unprotectedSexValues = "[]";
module.exports.organDonorValues = "[]";
module.exports.sharingConditions1Values = "[]";
module.exports.sharingConditions2Values = "[]";
module.exports.sharingConditions3Values = "[]";
module.exports.sharingGPVisits1Values = "[]";
module.exports.sharingGPVisits2Values = "[]";
module.exports.sharingGPVisits3Values = "[]";
module.exports.seeWeightValues = "[]";
module.exports.seeDeathValues = "[]";
module.exports.seeExerciseValues = "[]";
module.exports.seeFluValues = "[]";
module.exports.healthServiceValues = "[]";

module.exports.neighbourNamesValues = "[]";
module.exports.contentValues = "[]";
module.exports.minorityValues = "[]";
module.exports.sexOffenderValues = "[]";
module.exports.sharingFines1Values = "[]";
module.exports.sharingFines2Values = "[]";
module.exports.sharingFines3Values = "[]";
module.exports.sharingVoted1Values = "[]";
module.exports.sharingVoted2Values = "[]";
module.exports.sharingVoted3Values = "[]";
module.exports.seeRecyclingValues = "[]";
module.exports.seeTeamsValues = "[]";
module.exports.seeNationalityValues = "[]";
module.exports.seeLanguagesValues = "[]";
module.exports.liveInValues = "[]";

module.exports.publicTransportValues = "[]";
module.exports.localMPValues = "[]";
module.exports.libaryValues = "[]";
module.exports.pensionValues = "[]";
module.exports.sharingWhereabouts1Values = "[]";
module.exports.sharingWhereabouts2Values = "[]";
module.exports.sharingWhereabouts3Values = "[]";
module.exports.sharingComplaints1Values = "[]";
module.exports.sharingComplaints2Values = "[]";
module.exports.sharingComplaints3Values = "[]";
module.exports.seeLiveAloneValues = "[]";
module.exports.seeFriendsWhereaboutsValues = "[]";
module.exports.seeLocalServicesValues = "[]";
module.exports.seeFinancesValues = "[]";
module.exports.findInfoValues = "[]";

module.exports.unwantedGiftsValues = "[]";
module.exports.eatCakeValues = "[]";
module.exports.othersTrustValues = "[]";
module.exports.publicSharingValues = "[]";
module.exports.sharingHousehold1Values = "[]";
module.exports.sharingHousehold2Values = "[]";
module.exports.sharingHousehold3Values = "[]";
module.exports.sharingAssistance1Values = "[]";
module.exports.sharingAssistance2Values = "[]";
module.exports.sharingAssistance3Values = "[]";
module.exports.seeUseDataValues = "[]";
module.exports.seeSocialMediaValues = "[]";
module.exports.seeConcernsValues = "[]";
module.exports.seeHelpValues = "[]";
module.exports.mostFaithValues = "[]";

// to make new viz copy the incomeQuery-rows below and change income-terms to new variables (also make new var above, and new query earlier)
//blood type
db.GetFromDB(dbName, queries.bloodTypeQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.bloodTypeValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6,tempValues.v7,tempValues.v8,tempValues.v9];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.bloodTypeQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.bloodTypeValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6,tempValues.v7,tempValues.v8,tempValues.v9];
    });
}, queryInterval+200);

//give blood
db.GetFromDB(dbName, queries.giveBloodQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.giveBloodValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.giveBloodQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        giveBloodValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+200);

//unprotected sex
db.GetFromDB(dbName, queries.unprotectedSexQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.unprotectedSexValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.unprotectedSexQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.unprotectedSexValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+300);

//organ donor
db.GetFromDB(dbName, queries.organDonorQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.organDonorValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.organDonorQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.organDonorValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+400);

//sharing conditions - 3
db.GetFromDB(dbName, queries.sharingConditions1Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingConditions1Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingConditions1Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingConditions1Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);
db.GetFromDB(dbName, queries.sharingConditions2Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingConditions2Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingConditions2Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingConditions2Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);
db.GetFromDB(dbName, queries.sharingConditions3Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingConditions3Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingConditions3Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingConditions3Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharing GP visits - 3
db.GetFromDB(dbName, queries.sharingGPVisits1Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingGPVisits1Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingGPVisits1Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingGPVisits1Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);
db.GetFromDB(dbName, queries.sharingGPVisits2Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingGPVisits2Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingGPVisits2Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingGPVisits2Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);
db.GetFromDB(dbName, queries.sharingGPVisits3Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingGPVisits3Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingGPVisits3Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingGPVisits3Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//weight
db.GetFromDB(dbName, queries.seeWeightQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeWeightValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeWeightQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeWeightValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//death
db.GetFromDB(dbName, queries.seeDeathQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeDeathValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeDeathQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeDeathValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//exercise
db.GetFromDB(dbName, queries.seeExerciseQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeExerciseValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeExerciseQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeExerciseValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//flu
db.GetFromDB(dbName, queries.seeFluQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeFluValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeFluQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeFluValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//health service
db.GetFromDB(dbName, queries.healthServiceQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.healthServiceValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.healthServiceQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.healthServiceValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4];
    });
}, queryInterval+400);

//neighbour names
db.GetFromDB(dbName, queries.neighbourNamesQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.neighbourNamesValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.neighbourNamesQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.neighbourNamesValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5];
    });
}, queryInterval+400);

//content
db.GetFromDB(dbName, queries.contentQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.contentValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.contentQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.contentValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+400);

//minority
db.GetFromDB(dbName, queries.minorityQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.minorityValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.minorityQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.minorityValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+400);

//sex offender
db.GetFromDB(dbName, queries.sexOffenderQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sexOffenderValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sexOffenderQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sexOffenderValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+400);

//sharingFines1
db.GetFromDB(dbName, queries.sharingFines1Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingFines1Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingFines1Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingFines1Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingFines2
db.GetFromDB(dbName, queries.sharingFines2Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingFines2Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingFines2Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingFines2Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingFines3
db.GetFromDB(dbName, queries.sharingFines3Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingFines3Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingFines3Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingFines3Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingVoted1
db.GetFromDB(dbName, queries.sharingVoted1Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingVoted1Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingVoted1Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingVoted1Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingVoted2
db.GetFromDB(dbName, queries.sharingVoted2Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingVoted2Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingVoted2Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingVoted2Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingVoted3
db.GetFromDB(dbName, queries.sharingVoted3Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingVoted3Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingVoted3Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingVoted3Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeRecycling
db.GetFromDB(dbName, queries.seeRecyclingQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeRecyclingValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeRecyclingQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeRecyclingValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeTeams
db.GetFromDB(dbName, queries.seeTeamsQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeTeamsValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeTeamsQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeTeamsValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeNationality
db.GetFromDB(dbName, queries.seeNationalityQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeNationalityValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeNationalityQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeNationalityValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeLanguages
db.GetFromDB(dbName, queries.seeLanguagesQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeLanguagesValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeLanguagesQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeLanguagesValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//live in
db.GetFromDB(dbName, queries.liveInQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.liveInValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6,tempValues.v7];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.liveInQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.liveInValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6,tempValues.v7];
    });
}, queryInterval+400);

//publicTransport
db.GetFromDB(dbName, queries.publicTransportQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.publicTransportValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.publicTransportQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.publicTransportValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6];
    });
}, queryInterval+400);

//localMP
db.GetFromDB(dbName, queries.localMPQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.localMPValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.localMPQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.localMPValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+400);

//library
db.GetFromDB(dbName, queries.libraryQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.libraryValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.libraryQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.libraryValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+400);

//pension
db.GetFromDB(dbName, queries.pensionQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.pensionValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.pensionQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.pensionValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+400);

//sharingWhereabouts1
db.GetFromDB(dbName, queries.sharingWhereabouts1Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingWhereabouts1Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingWhereabouts1Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingWhereabouts1Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingWhereabouts2
db.GetFromDB(dbName, queries.sharingWhereabouts2Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingWhereabouts2Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingWhereabouts2Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingWhereabouts2Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingWhereabouts3
db.GetFromDB(dbName, queries.sharingWhereabouts3Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingWhereabouts3Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingWhereabouts3Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingWhereabouts3Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingComplaints1
db.GetFromDB(dbName, queries.sharingComplaints1Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingComplaints1Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingComplaints1Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingComplaints1Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingComplaints2
db.GetFromDB(dbName, queries.sharingComplaints2Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingComplaints2Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingComplaints2Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingComplaints2Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingComplaints3
db.GetFromDB(dbName, queries.sharingComplaints3Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingComplaints3Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingComplaints3Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingComplaints3Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeLiveAlone
db.GetFromDB(dbName, queries.seeLiveAloneQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeLiveAloneValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeLiveAloneQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeLiveAloneValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeFriendsWhereabouts
db.GetFromDB(dbName, queries.seeFriendsWhereaboutsQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeFriendsWhereaboutsValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeFriendsWhereaboutsQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeFriendsWhereaboutsValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeLocalServices
db.GetFromDB(dbName, queries.seeLocalServicesQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeLocalServicesValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeLocalServicesQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeLocalServicesValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeFinances
db.GetFromDB(dbName, queries.seeFinancesQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeFinancesValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeFinancesQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeFinancesValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//findInfo
db.GetFromDB(dbName, queries.findInfoQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.findInfoValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.findInfoQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.findInfoValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5];
    });
}, queryInterval+400);


//unwwantedGifts
db.GetFromDB(dbName, queries.unwantedGiftsQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.unwantedGiftsValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.unwantedGiftsQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.unwantedGiftsValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6];
    });
}, queryInterval+400);

//eatCake
db.GetFromDB(dbName, queries.eatCakeQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.eatCakeValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.eatCakeQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.eatCakeValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+400);

//othersTrust
db.GetFromDB(dbName, queries.othersTrustQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.othersTrustValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.othersTrustQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.othersTrustValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+400);

//publicSharing
db.GetFromDB(dbName, queries.publicSharingQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.publicSharingValues = [tempValues.v0,tempValues.v1,tempValues.v2];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.publicSharingQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.publicSharingValues = [tempValues.v0,tempValues.v1,tempValues.v2];
    });
}, queryInterval+400);

//sharingHousehold1
db.GetFromDB(dbName, queries.sharingHousehold1Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingHousehold1Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingHousehold1Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingHousehold1Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingHousehold2
db.GetFromDB(dbName, queries.sharingHousehold2Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingHousehold2Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingHousehold2Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingHousehold2Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingHousehold3
db.GetFromDB(dbName, queries.sharingHousehold3Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingHousehold3Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingHousehold3Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingHousehold3Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingAssistance1
db.GetFromDB(dbName, queries.sharingAssistance1Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingAssistance1Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingAssistance1Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingAssistance1Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingAssistance2
db.GetFromDB(dbName, queries.sharingAssistance2Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingAssistance2Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingAssistance2Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingAssistance2Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//sharingAssistance3
db.GetFromDB(dbName, queries.sharingAssistance3Query, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.sharingAssistance3Values = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.sharingAssistance3Query, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.sharingAssistance3Values = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeUseData
db.GetFromDB(dbName, queries.seeUseDataQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeUseDataValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeUseDataQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeUseDataValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeSocialMedia
db.GetFromDB(dbName, queries.seeSocialMediaQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeSocialMediaValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeSocialMediaQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeSocialMediaValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeConcerns
db.GetFromDB(dbName, queries.seeConcernsQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeConcernsValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeConcernsQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeConcernsValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//seeHelp
db.GetFromDB(dbName, queries.seeHelpQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.seeHelpValues = [tempValues.v0,tempValues.v1];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.seeHelpQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.seeHelpValues = [tempValues.v0,tempValues.v1];
    });
}, queryInterval+400);

//mostFaith
db.GetFromDB(dbName, queries.mostFaithQuery, function(values) {
    tempResult = JSON.stringify(values);
    tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
    module.exports.mostFaithValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6,tempValues.v7];
});
setInterval(function(){
    db.GetFromDB(dbName, queries.mostFaithQuery, function(values) {
        tempResult = JSON.stringify(values);
        tempValues = JSON.parse(tempResult.substr(1,tempResult.length-2));
        module.exports.mostFaithValues = [tempValues.v0,tempValues.v1,tempValues.v2,tempValues.v3,tempValues.v4,tempValues.v5,tempValues.v6,tempValues.v7];
    });
}, queryInterval+400);