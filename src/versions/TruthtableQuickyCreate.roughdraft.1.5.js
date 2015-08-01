//By Kyle Lin, Copyright (C) July, 2015, all rights reserved. Apologies for messiness of code, this is a mere roughdraft.
//Version 1.5
//Basic user-input sanitization added
//Deductive-reasoning added
var moves = ['Kick', 'Ninja Sword', 'Nunchucks', 'Shadow Fireball', 'Shadow Slip', 'Run in Circles', 'Lightning Fast Karate Chop', 'Rampage', 'Strength/Muscle', 'Zap', 'Regenerate', 'Gravedigger', 'Zombie Corps', 'Apocalypse', 'Samurai Sword', 'Helmet', 'Smash', 'Lightning', 'Earthquake', 'Twist', 'Bend', 'Juggling Knives', 'Acid Spray', 'Nose', 'Backwards Mustachio', 'Nose of the Taunted', 'Mustache Mash', 'Big Hairy Deal'];
var truthtables = {
    'reference': (function(){var newMoves = [];for(var moveChecked in moves){newMoves.push(moves[moveChecked]);}return newMoves;})(),
    'tables': []
};
var stop = false;
var doNothing = function(){
    
};
var MoveInfoPackage = function(name, wins, ties, losses, specialTies, exceptions){
    this.name = name;
    this.wins = wins;
    this.ties = ties;
    this.losses = losses;
    this.specialTies = specialTies;
    this.exceptions = exceptions;
};
var numberToResult = function(number){
    return ['ties', 'wins', 'loses', 'specially ties', 'is treated specially'][number];
};
var persistentlyAsk = function(moveArgument, target, moveComparedTo, smart){
    //moveArgument is a string, target is the target object, moveComparedTo is a numerical index, smart is an option to make deductions based on previous comparisons.
    if(stop === false){
        var check = function(){
            for(var existingComparisonsChecked in truthtables.tables){
                if([moveArgument, moves[moveComparedTo]].indexOf(truthtables.tables[existingComparisonsChecked].name) > -1){
                    return existingComparisonsChecked;
                }
            }
            return -1;
        };
        var counterpartIndex = check();
        if(smart && (counterpartIndex > -1)){
            if(truthtables.tables[counterpartIndex].name === moves[moveComparedTo]){
                var deducedResult;
                for(var existingOperandsChecked in truthtables.tables[counterpartIndex]){
                    if((truthtables.tables[counterpartIndex])[existingOperandsChecked].indexOf(moveArgument) > -1){
                        deducedResult = existingOperandsChecked;
                    }
                }
                deducedResult = ['wins', 'losses', 'ties', 'specialTies', 'exceptions'][['losses', 'wins', 'ties', 'specialTies', 'exceptions'].indexOf(deducedResult)];
                target[deducedResult].push(moves[moveComparedTo]);
            }
        }
        else{
            var comparison = prompt(moveArgument + ' versus ' + moves[moveComparedTo] + ' results in ____?');
            var confirmation = confirm('Are you sure that ' + moveArgument + ' ' + numberToResult(comparison) + ' against ' + moves[moveComparedTo] + '?');
            if(confirmation){
                if(typeof target[['ties', 'wins', 'losses', 'specialTies', 'exceptions'][comparison]] === 'object'){
                    target[['ties', 'wins', 'losses', 'specialTies', 'exceptions'][comparison]].push(moves[moveComparedTo]);
                }
                else{
                    alert('Input invalid!');
                    persistentlyAsk(moveArgument, target, moveComparedTo, smart);
                }
            }
            else{
                persistentlyAsk(moveArgument, target, moveComparedTo, smart);
            }
        }
    }
};
var requireInfo = function(moveArgument, smart){
    var moveInfo = new MoveInfoPackage(moveArgument, [], [], [], [], []);
    for(var moveComparedTo in moves){
        persistentlyAsk(moveArgument, moveInfo, moveComparedTo, smart);
    }
    return moveInfo;
};
var create = function(smart){
    if(stop === false){
        for(var moveResearched in moves){
            truthtables.tables.push(requireInfo(moves[moveResearched], smart));
        }
    }
};
console.log(truthtables);
var send = function(locationId, stringify/*, quotes*/){
    var output = truthtables;
    if(stringify === true){
        output = JSON.stringify(truthtables);
        /*if(quotes === 1){
            var outputArray = output.split('');
            for(var outputArrayChecked in outputArray){
                if(outputArray[outputArrayChecked] === '\u0022'){
                    outputArray[outputArrayChecked] = '\u0027';
                }
            }
        }*/
    }
    if(locationId !== null && locationId !== undefined){
        document.getElementById(locationId).innerHTML = output;
    }
};
/*Initiation Code:
create(true);
send('tt', true);
*/
