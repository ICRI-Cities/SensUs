/**
 * Created by sarahg on 20/10/15.
 */

var Database = require('./Database');
var db = new Database();
var dbName = "censusDB";

var fs = require('fs');

function parseOne(boxData, date, time){
    console.log("parsing demographics data...");
    if(boxData.length == 7){
        var cardID, age, gender, income, education, postcode, duration;
        cardID = boxData[0];
        age = boxData[1];
        gender = boxData[2];
        income = boxData[3];
        education = boxData[4];
        postcode = boxData[5];
        duration = boxData[6];

        var query = 'insert into demographics set ?';
        var storeset = {date: date, time: time, cardID: cardID, age: age, gender: gender,
            income: income, education: education, postcode: postcode, duration: duration};
        db.StoreToDB(dbName, query, storeset);
        console.log("demographics data stored to database");
    }else{
        console.log("ERROR - not enough data chunks received. Cannot store in database");
        writeToFile(1, boxData, date, time);
    }
}

function parseTwo(boxData, date, time){
    console.log("parsing health data...");
    if(boxData.length == 22){
        var cardID, bloodType, giveBlood, unprotectedSex, organDonor,
            sharingMoods1, sharingMoods2, sharingMoods3,
            sharingConditions1, sharingConditions2, sharingConditions3,
            sharingSymptoms1, sharingSymptoms2, sharingSymptoms3,
            sharingGPVisits1, sharingGPVisits2, sharingGPVisits3,
            seeWeight, seeDeath, seeExercise, seeFlu, healthService;
        cardID = boxData[0];
        healthService = boxData[1];
        sharingConditions1 = boxData[2];
        sharingConditions2 = boxData[3];
        sharingConditions3 = boxData[4];
        sharingMoods1 = boxData[5];
        sharingMoods2 = boxData[6];
        sharingMoods3 = boxData[7];
        sharingSymptoms1 = boxData[8];
        sharingSymptoms2 = boxData[9];
        sharingSymptoms3 = boxData[10];
        sharingGPVisits1 = boxData[11];
        sharingGPVisits2 = boxData[12];
        sharingGPVisits3 = boxData[13];
        bloodType = boxData[14];
        giveBlood = boxData[15];
        unprotectedSex = boxData[16];
        organDonor = boxData[17];
        seeWeight = boxData[18];
        seeDeath = boxData[19];
        seeExercise = boxData[20];
        seeFlu = boxData[21];


        var query = 'insert into health set ?';
        var storeset = {date: date, time: time, cardID: cardID, bloodType: bloodType,
            giveBlood: giveBlood, unprotectedSex: unprotectedSex, organDonor: organDonor,
            sharingMoods1: sharingMoods1, sharingMoods2: sharingMoods2, sharingMoods3: sharingMoods3,
            sharingConditions1: sharingConditions1, sharingConditions2: sharingConditions2, sharingConditions3: sharingConditions3,
            sharingSymptoms1: sharingSymptoms1, sharingSymptoms2: sharingSymptoms2, sharingSymptoms3: sharingSymptoms3,
            sharingGPVisits1: sharingGPVisits1, sharingGPVisits2: sharingGPVisits2, sharingGPVisits3: sharingGPVisits3,
            seeWeight: seeWeight, seeDeath: seeDeath, seeExercise: seeExercise, seeFlu: seeFlu, healthService: healthService};
        db.StoreToDB(dbName, query, storeset);
        console.log("health data stored to database");
    }else{
        console.log("ERROR - not enough data chunks received. Cannot store in database");
        writeToFile(2, boxData, date, time);
    }
}

function parseThree(boxData, date, time){
    console.log("parsing belonging data...");
    if(boxData.length == 22){
        var cardID, content, minority, sexOffender, neighbourNames,
            sharingShop1, sharingShop2, sharingShop3,
            sharingFines1, sharingFines2, sharingFines3,
            sharingMoved1, sharingMoved2, sharingMoved3,
            sharingVoted1, sharingVoted2, sharingVoted3,
            seeRecycling, seeTeams, seeNationality, seeLanguages, liveIn;
        cardID = boxData[0];
        liveIn = boxData[1];
        sharingShop1 = boxData[2];
        sharingShop2 = boxData[3];
        sharingShop3 = boxData[4];
        sharingFines1 = boxData[5];
        sharingFines2 = boxData[6];
        sharingFines3 = boxData[7];
        sharingMoved1 = boxData[8];
        sharingMoved2 = boxData[9];
        sharingMoved3 = boxData[10];
        sharingVoted1 = boxData[11];
        sharingVoted2 = boxData[12];
        sharingVoted3 = boxData[13];
        neighbourNames = boxData[14];
        content = boxData[15];
        minority = boxData[16];
        sexOffender = boxData[17];
        seeRecycling = boxData[18];
        seeTeams = boxData[19];
        seeNationality = boxData[20];
        seeLanguages = boxData[21];

        var query = 'insert into belonging set ?';
        var storeset = {date: date, time: time, cardID: cardID, content: content,
            minority: minority, sexOffender: sexOffender, neighbourNames: neighbourNames,
            sharingShop1: sharingShop1, sharingShop2: sharingShop2, sharingShop3: sharingShop3,
            sharingFines1: sharingFines1, sharingFines2: sharingFines2, sharingFines3: sharingFines3,
            sharingMoved1: sharingMoved1, sharingMoved2: sharingMoved2, sharingMoved3: sharingMoved3,
            sharingVoted1: sharingVoted1, sharingVoted2: sharingVoted2, sharingVoted3: sharingVoted3,
            seeRecycling: seeRecycling, seeTeams: seeTeams, seeNationality: seeNationality,
            seeLanguages: seeLanguages, liveIn: liveIn};
        db.StoreToDB(dbName, query, storeset);
        console.log('belonging data stored to database');
    }else{
        console.log("ERROR - not enough data chunks received. Cannot store in database");
        writeToFile(3, boxData, date, time);
    }
}

function parseFour(boxData, date, time){
    console.log("parsing place data...");
    if(boxData.length == 22){
        var cardID, publicTransport, localMP, library, pension,
            sharingTransportModes1, sharingTransportModes2, sharingTransportModes3,
            sharingWhereabouts1, sharingWhereabouts2, sharingWhereabouts3,
            sharingComplaints1, sharingComplaints2, sharingComplaints3,
            sharingBuyLocal1, sharingBuyLocal2, sharingBuyLocal3,
            seeLiveAlone, seeFriendsWhereabouts, seeLocalServices, seeFinances, findInfo;
        cardID = boxData[0];
        findInfo = boxData[1];
        sharingTransportModes1 = boxData[2];
        sharingTransportModes2 = boxData[3];
        sharingTransportModes3 = boxData[4];
        sharingWhereabouts1 = boxData[5];
        sharingWhereabouts2 = boxData[6];
        sharingWhereabouts3 = boxData[7];
        sharingComplaints1 = boxData[8];
        sharingComplaints2 = boxData[9];
        sharingComplaints3 = boxData[10];
        sharingBuyLocal1 = boxData[11];
        sharingBuyLocal2 = boxData[12];
        sharingBuyLocal3 = boxData[13];
        publicTransport = boxData[14];
        library = boxData[15];
        pension = boxData[16];
        localMP = boxData[17];
        seeLiveAlone = boxData[18];
        seeFriendsWhereabouts = boxData[19];
        seeLocalServices = boxData[20];
        seeFinances = boxData[21];

        var query = 'insert into place set ?';
        var storeset = {date: date, time: time, cardID: cardID, publicTransport: publicTransport,
            localMP: localMP, library: library, pension: pension,
            sharingTransportModes1: sharingTransportModes1, sharingTransportModes2: sharingTransportModes2, sharingTransportModes3: sharingTransportModes3,
            sharingWhereabouts1: sharingWhereabouts1, sharingWhereabouts2: sharingWhereabouts2, sharingWhereabouts3: sharingWhereabouts3,
            sharingComplaints1: sharingComplaints1, sharingComplaints2: sharingComplaints2, sharingComplaints3: sharingComplaints3,
            sharingBuyLocal1: sharingBuyLocal1, sharingBuyLocal2: sharingBuyLocal2, sharingBuyLocal3: sharingBuyLocal3,
            seeLiveAlone: seeLiveAlone, seeFriendsWhereabouts: seeFriendsWhereabouts, seeLocalServices: seeLocalServices,
            seeFinances: seeFinances, findInfo: findInfo};
        db.StoreToDB(dbName, query, storeset);
        console.log('place data stored to database');
    }else{
        console.log("ERROR - not enough data chunks received. Cannot store in database");
        writeToFile(4, boxData, date, time);
    }
}

function parseFive(boxData, date, time){
    console.log("parsing trust data...");
    if(boxData.length == 22){
        var cardID, eatCake, othersTrust, unwantedGifts, publicSharing,
            sharingHousehold1, sharingHousehold2, sharingHousehold3,
            sharingSpace1, sharingSpace2, sharingSpace3,
            sharingAssistance1, sharingAssistance2, sharingAssistance3,
            sharingFinances1, sharingFinances2, sharingFinances3,
            seeUseData, seeSocialMedia, seeConcerns, seeHelp, mostFaith;
        cardID = boxData[0];
        mostFaith = boxData[1];
        sharingHousehold1 = boxData[2];
        sharingHousehold2 = boxData[3];
        sharingHousehold3 = boxData[4];
        sharingSpace1 = boxData[5];
        sharingSpace2 = boxData[6];
        sharingSpace3 = boxData[7];
        sharingFinances1 = boxData[8];
        sharingFinances2 = boxData[9];
        sharingFinances3 = boxData[10];
        sharingAssistance1 = boxData[11];
        sharingAssistance2 = boxData[12];
        sharingAssistance3 = boxData[13];
        unwantedGifts = boxData[14];
        eatCake = boxData[15];
        othersTrust = boxData[16];
        publicSharing = boxData[17];
        seeUseData = boxData[18];
        seeSocialMedia = boxData[19];
        seeConcerns = boxData[20];
        seeHelp = boxData[21];

        var query = 'insert into trust set ?';
        var storeset = {date: date, time: time, cardID: cardID, eatCake: eatCake, othersTrust: othersTrust,
            unwantedGifts: unwantedGifts, publicSharing: publicSharing,
            sharingHousehold1: sharingHousehold1, sharingHousehold2: sharingHousehold2, sharingHousehold3: sharingHousehold3,
            sharingSpace1: sharingSpace1, sharingSpace2: sharingSpace2, sharingSpace3: sharingSpace3,
            sharingAssistance1: sharingAssistance1, sharingAssistance2: sharingAssistance2, sharingAssistance3: sharingAssistance3,
            sharingFinances1: sharingFinances1, sharingFinances2: sharingFinances2, sharingFinances3: sharingFinances3,
            seeUseData: seeUseData, seeSocialMedia: seeSocialMedia, seeConcerns: seeConcerns,
            seeHelp: seeHelp, mostFaith: mostFaith};
        db.StoreToDB(dbName, query, storeset);
        console.log('trust data stored to database');
    }else{
        console.log("ERROR - not enough data chunks received. Cannot store in database");
        writeToFile(5, boxData, date, time);
    }
}

function writeToFile(boxID, boxData, date, time){
    var corruptString = date+','+time+','+boxID+','+boxData+'\n';
    fs.appendFile('corruptData.txt', corruptString, function (err){
        if(err) throw err;
        console.log('corrupt data saved');
    });
}


/**
 * @constructor
 */
var SensUs = function(){};

SensUs.prototype.HandleInput = function(update){
    var chunks = update.split(",");

    if(chunks.length > 0){

        var boxID = chunks[0];

        var boxData = new Array();
        for(var i=1; i<chunks.length; i++){
            boxData[i-1] = chunks[i];
        }

        var timestamp = new Date();
        var date = timestamp.getFullYear()+"-"+(timestamp.getMonth()+1)+"-"+timestamp.getDate();
        var time = timestamp.toTimeString();

        switch(boxID){
            case "1": parseOne(boxData, date, time);
                break;
            case "2": parseTwo(boxData, date, time);
                break;
            case "3": parseThree(boxData, date, time);
                break;
            case "4": parseFour(boxData, date, time);
                break;
            case "5": parseFive(boxData, date, time);
                break;
            default: console.log("ERROR - message received from unknown box");
        }
    }else{
        console.log("ERROR - could not read message");
    }
};

module.exports = SensUs;