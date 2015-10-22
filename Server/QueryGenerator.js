/**
 * Created by sarahg on 21/10/15.
 */

function generateQuery(column,table,dbvals,id){
    var tempQuery = 'select ';
    for (i=0; i<dbvals.length; i++) {
        tempQuery=tempQuery+'(select count('+column+') from '+table+' where '+column+'=\''+dbvals[i]+'\'';

        /********
         To scope by date...
         *********/
        //tempQuery=tempQuery+' and (date=\'2015-7-15\' or date=\'2015-7-16\' or date=\'2015-7-17\')';


        if (id) {
            tempQuery=tempQuery+' and cardID='+id;
        }
        tempQuery=tempQuery+') as v'+i;
        if (i<dbvals.length-1) {
            tempQuery=tempQuery+', ';
        } else {
            tempQuery=tempQuery+';';
        }
    }
    return tempQuery;
}


/**
 * @constructor
 */
var QueryGenerator = function(){};

QueryGenerator.prototype.GenerateQuery = function(column,table,dbvals,id){
    return generateQuery(column,table,dbvals,id);
};

module.exports = QueryGenerator;