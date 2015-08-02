//Copyright August 2015, all rights reserved.
var commands = {
    'definedCommands': ['quit', 'displaytt', 'prematuresend'],
    'implementation': [
        function(argumentArray){
            //quit implementation
            //arguments not called
            var areYouSure = confirm('Are you sure you want to quit?');
            if(areYouSure === true){
                alert('Alert: Here are your current NZSC Truthtables... \n ' + JSON.stringify(truthtables));
                stop = true;
            }
            else{
                alert('Alert: Quit procedure terminated!');
            }
        },
        function(argumentArray){
            //displaytt implementation
            //arguments not called
            alert(JSON.stringify(truthtables));
        },
        function(argumentArray){
            //prematuresend implementation
            //arguments[0, 1] are called
            //syntax: /prematuresend/<location id>/<stringify>
            var output = truthtables;
            if(argumentArray[1] === true || argumentArray[1] == 'true'){
                output = JSON.stringify(truthtables);
            }
            document.getElementById(argumentArray[0]).innerHTML = output;
        }
    ],
    'sendErrorMessage':function(){
        alert('Error: Invalid Command Call!');
    },
    'execute': function(keyword){
        //keyword must be pre-sanitized or else program may crash
        keyword = keyword.split('/');
        var statement = keyword[1];
        keyword.splice(0, 2);
        //keyword.slice() removes the first two items of the array which are '' and the statement
        //keyword is now an array of arguments that will be passed into an implemented function as an array
        if(this.definedCommands.indexOf(statement) > -1){
            if(keyword.length > 0){
                this.implementation[this.definedCommands.indexOf(statement)](keyword);
            }
            else{
                this.implementation[this.definedCommands.indexOf(statement)]();
            }
        }
        else{
            this.sendErrorMessage();
        }
    }
};
