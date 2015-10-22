/**
 * Created by sarahg on 20/10/15.
 */

var dbVals = require('./DBValues');

var QueryGenerator = require('./QueryGenerator');
var qg = new QueryGenerator();

//generate all the queries

//HEALTH
//viz 1
module.exports.bloodTypeQuery = qg.GenerateQuery("bloodType","health",dbVals.bloodTypeDBVals);

//viz 2
module.exports.giveBloodQuery = qg.GenerateQuery("giveBlood","health",dbVals.yesNoDBVals);
module.exports.unprotectedSexQuery = qg.GenerateQuery("unprotectedSex","health",dbVals.yesNoDBVals);
module.exports.organDonorQuery = qg.GenerateQuery("organDonor","health",dbVals.yesNoDBVals);

//viz 3
module.exports.sharingConditions1Query = qg.GenerateQuery("sharingConditions1","health",dbVals.sharingDBVals);
module.exports.sharingConditions2Query = qg.GenerateQuery("sharingConditions2","health",dbVals.sharingDBVals);
module.exports.sharingConditions3Query = qg.GenerateQuery("sharingConditions3","health",dbVals.sharingDBVals);
module.exports.sharingGPVisits1Query = qg.GenerateQuery("sharingGPVisits1","health",dbVals.sharingDBVals);
module.exports.sharingGPVisits2Query = qg.GenerateQuery("sharingGPVisits2","health",dbVals.sharingDBVals);
module.exports.sharingGPVisits3Query = qg.GenerateQuery("sharingGPVisits3","health",dbVals.sharingDBVals);

//viz 4
module.exports.seeWeightQuery = qg.GenerateQuery("seeWeight","health",dbVals.sharingDBVals);
module.exports.seeDeathQuery = qg.GenerateQuery("seeDeath","health",dbVals.sharingDBVals);
module.exports.seeExerciseQuery = qg.GenerateQuery("seeExercise","health",dbVals.sharingDBVals);
module.exports.seeFluQuery = qg.GenerateQuery("seeFlu","health",dbVals.sharingDBVals);

//viz 5
module.exports.healthServiceQuery = qg.GenerateQuery("healthService","health",dbVals.healthServiceDBVals);

//BELONGING
//viz 6
module.exports.neighbourNamesQuery = qg.GenerateQuery("neighbourNames","belonging",dbVals.neighbourNamesDBVals);

//viz 7
module.exports.contentQuery = qg.GenerateQuery("content","belonging",dbVals.yesNoDBVals);
module.exports.minorityQuery = qg.GenerateQuery("minority","belonging",dbVals.yesNoDBVals);
module.exports.sexOffenderQuery = qg.GenerateQuery("sexOffender","belonging",dbVals.yesNoDBVals);

//viz 8
module.exports.sharingFines1Query = qg.GenerateQuery("sharingFines1","belonging",dbVals.sharingDBVals);
module.exports.sharingFines2Query = qg.GenerateQuery("sharingFines2","belonging",dbVals.sharingDBVals);
module.exports.sharingFines3Query = qg.GenerateQuery("sharingFines3","belonging",dbVals.sharingDBVals);
module.exports.sharingVoted1Query = qg.GenerateQuery("sharingVoted1","belonging",dbVals.sharingDBVals);
module.exports.sharingVoted2Query = qg.GenerateQuery("sharingVoted2","belonging",dbVals.sharingDBVals);
module.exports.sharingVoted3Query = qg.GenerateQuery("sharingVoted3","belonging",dbVals.sharingDBVals);

//viz 9
module.exports.seeRecyclingQuery = qg.GenerateQuery("seeRecycling","belonging",dbVals.sharingDBVals);
module.exports.seeTeamsQuery = qg.GenerateQuery("seeTeams","belonging",dbVals.sharingDBVals);
module.exports.seeNationalityQuery = qg.GenerateQuery("seeNationality","belonging",dbVals.sharingDBVals);
module.exports.seeLanguagesQuery = qg.GenerateQuery("seeLanguages","belonging",dbVals.sharingDBVals);

//viz 10
module.exports.liveInQuery = qg.GenerateQuery("liveIn","belonging",dbVals.liveInDBVals);

//PLACE
//viz 11
module.exports.publicTransportQuery = qg.GenerateQuery("publicTransport","place",dbVals.publicTransportDBVals);

//viz 12
module.exports.localMPQuery = qg.GenerateQuery("localMP","place",dbVals.yesNoDBVals);
module.exports.libraryQuery = qg.GenerateQuery("library","place",dbVals.yesNoDBVals);
module.exports.pensionQuery = qg.GenerateQuery("pension","place",dbVals.yesNoDBVals);

//viz 13
module.exports.sharingWhereabouts1Query = qg.GenerateQuery("sharingWhereabouts1","place",dbVals.sharingDBVals);
module.exports.sharingWhereabouts2Query = qg.GenerateQuery("sharingWhereabouts2","place",dbVals.sharingDBVals);
module.exports.sharingWhereabouts3Query = qg.GenerateQuery("sharingWhereabouts3","place",dbVals.sharingDBVals);
module.exports.sharingComplaints1Query = qg.GenerateQuery("sharingComplaints1","place",dbVals.sharingDBVals);
module.exports.sharingComplaints2Query = qg.GenerateQuery("sharingComplaints2","place",dbVals.sharingDBVals);
module.exports.sharingComplaints3Query = qg.GenerateQuery("sharingComplaints3","place",dbVals.sharingDBVals);

//viz 14
module.exports.seeLiveAloneQuery = qg.GenerateQuery("seeLiveAlone","place",dbVals.sharingDBVals);
module.exports.seeFriendsWhereaboutsQuery = qg.GenerateQuery("seeFriendsWhereabouts","place",dbVals.sharingDBVals);
module.exports.seeLocalServicesQuery = qg.GenerateQuery("seeLocalServices","place",dbVals.sharingDBVals);
module.exports.seeFinancesQuery = qg.GenerateQuery("seeFinances","place",dbVals.sharingDBVals);

//viz 15
module.exports.findInfoQuery = qg.GenerateQuery("findInfo","place",dbVals.findInfoDBVals);

//TRUST
//viz 16
module.exports.unwantedGiftsQuery = qg.GenerateQuery("unwantedGifts","trust",dbVals.unwantedGiftsDBVals);

//viz 17
module.exports.eatCakeQuery = qg.GenerateQuery("eatCake","trust",dbVals.yesNoDBVals);
module.exports.othersTrustQuery = qg.GenerateQuery("othersTrust","trust",dbVals.yesNoDBVals);
module.exports.publicSharingQuery = qg.GenerateQuery("publicSharing","trust",dbVals.yesNoDBVals);

//viz 18
module.exports.sharingHousehold1Query = qg.GenerateQuery("sharingHousehold1","trust",dbVals.sharingDBVals);
module.exports.sharingHousehold2Query = qg.GenerateQuery("sharingHousehold2","trust",dbVals.sharingDBVals);
module.exports.sharingHousehold3Query = qg.GenerateQuery("sharingHousehold3","trust",dbVals.sharingDBVals);
module.exports.sharingAssistance1Query = qg.GenerateQuery("sharingAssistance1","trust",dbVals.sharingDBVals);
module.exports.sharingAssistance2Query = qg.GenerateQuery("sharingAssistance2","trust",dbVals.sharingDBVals);
module.exports.sharingAssistance3Query = qg.GenerateQuery("sharingAssistance3","trust",dbVals.sharingDBVals);

//viz 19
module.exports.seeUseDataQuery = qg.GenerateQuery("seeUseData","trust",dbVals.sharingDBVals);
module.exports.seeSocialMediaQuery = qg.GenerateQuery("seeSocialMedia","trust",dbVals.sharingDBVals);
module.exports.seeConcernsQuery = qg.GenerateQuery("seeConcerns","trust",dbVals.sharingDBVals);
module.exports.seeHelpQuery = qg.GenerateQuery("seeHelp","trust",dbVals.sharingDBVals);

//viz 20
module.exports.mostFaithQuery = qg.GenerateQuery("mostFaith","trust",dbVals.mostFaithDBVals);