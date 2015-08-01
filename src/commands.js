var commands = {
    'definedCommands': ['quit', 'displaytt'],
    'implementation': [
        function(argumentArray){
            //arguments not called
            stop = true;
        },
        function(argumentArray){
            //arguments not called
            alert(JSON.stringify(truthtables));
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
