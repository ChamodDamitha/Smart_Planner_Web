/**
 * Created by chamod on 4/30/17.
 */


var monk = require('monk');
var monday = monk('localhost:27017/smart_planner_web').get("monday");
var tuesday = monk('localhost:27017/smart_planner_web').get("tuesday");
var wednesday = monk('localhost:27017/smart_planner_web').get("wednesday");
var thursday = monk('localhost:27017/smart_planner_web').get("thursday");
var friday = monk('localhost:27017/smart_planner_web').get("friday");
var saturday = monk('localhost:27017/smart_planner_web').get("saturday");
var sunday = monk('localhost:27017/smart_planner_web').get("sunday");

exports.getSchedule = function (user,day) {

    if(day=="MON"){
        return monday.find({userId:user.id});
    }
    if(day=="TUE"){
        return tuesday.find({userId:user.id});
    }
    if(day=="WED"){
        return wednesday.find({userId:user.id});
    }
    if(day=="THU"){
        return thursday.find({userId:user.id});
    }
    if(day=="FRI"){
        return friday.find({userId:user.id});
    }
    if(day=="SAT"){
        return saturday.find({userId:user.id});
    }
    if(day=="SUN"){
        return sunday.find({userId:user.id});
    }


    return null;
}


exports.updateSchedule = function (user,day) {
    for(var i=0;i<user.daily_data.length;i++) {
        var d = user.daily_data[i];
        setSchedule(d,day,user);
    }
}


function setSchedule(daily_data,day,user) {

    for(var i=0;i<daily_data.fulltasks.length;i++){
        var t=daily_data.fulltasks[i];

        var recent_task={
            type:"FULL",
            desc:t.desc,
            location:t.location,
            time:getNearestTime(t.time)
        };
        insertTask(recent_task,day,user);

    }

    for(var i=0;i<daily_data.timetasks.length;i++){
        var t=daily_data.timetasks[i];

        var recent_task={
            type:"TIME",
            desc:t.desc,
            time:getNearestTime(t.time)
        };
        insertTask(recent_task,day,user);

    }

    for(var i=0;i<daily_data.locationtasks.length;i++){
        var t=daily_data.locationtasks[i];

        var recent_task={
            type:"LOCATION",
            desc:t.desc,
            location:t.location
        };
        insertTask(recent_task,day,user);

    }


}


function insertTask(task,day,user) {
    if(day=="MON"){
        monday.update({userId:user.id,time:task.time},task,function (err,data) {
            if (err != null) {
                return false;
            }
            return true;
        });
    }
    else if(day=="TUE"){
        tuesday.update({userId:user.id,time:task.time},task,function (err,data) {
            if (err != null) {
                return false;
            }
            return true;
        });
    }
    else if(day=="WED"){
        wednesday.update({userId:user.id,time:task.time},task,function (err,data) {
            if (err != null) {
                return false;
            }
            return true;
        });
    }
    else if(day=="THU"){
        thursday.update({userId:user.id,time:task.time},task,function (err,data) {
            if (err != null) {
                return false;
            }
            return true;
        });
    }
    else if(day=="FRI"){
        friday.update({userId:user.id,time:task.time},task,function (err,data) {
            if (err != null) {
                return false;
            }
            return true;
        });
    }
    else if(day=="SAT"){
        saturday.update({userId:user.id,time:task.time},task,function (err,data) {
            if (err != null) {
                return false;
            }
            return true;
        });
    }
    else if(day=="SUN"){
        sunday.update({userId:user.id,time:task.time},task,function (err,data) {
            if (err != null) {
                return false;
            }
            return true;
        });
    }
}


function getNearestTime(task) {
    var h=parseInt(task.time.split(":")[0]);
    var m=parseInt(task.time.split(":")[1]);
    if(m>=30){
        return h+1+":00";
    }
    return h+":00";
}
