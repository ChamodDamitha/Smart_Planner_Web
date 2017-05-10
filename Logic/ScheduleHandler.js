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
    var tasks=[];
    for(var i=0;i<daily_data.fulltasks.length;i++){
        var t=daily_data.fulltasks[i];

        var recent_task={
            type:"FULL",
            desc:t.description,
            location:t.location,
            time:getNearestTime(t)
        };
        tasks.push(recent_task);
    }

    for(var i=0;i<daily_data.timetasks.length;i++){
        var t=daily_data.timetasks[i];

        var recent_task={
            type:"TIME",
            desc:t.description,
            time:getNearestTime(t)
        };
        tasks.push(recent_task);
    }

    for(var i=0;i<daily_data.locationtasks.length;i++){
        var t=daily_data.locationtasks[i];

        var recent_task={
            type:"LOCATION",
            desc:t.description,
            location:t.location
        };
        tasks.push(recent_task);
    }

    insertTasks(tasks,day,user);
}


function insertTasks(tasks,day,user) {
    if(day=="MON"){
        updateCollection(monday,tasks,user);
    }
    else if(day=="TUE"){
        updateCollection(tuesday,tasks,user);
    }
    else if(day=="WED"){
        updateCollection(wednesday,tasks,user);
    }
    else if(day=="THU"){
        updateCollection(thursday,tasks,user);
    }
    else if(day=="FRI"){
        updateCollection(friday,tasks,user);
    }
    else if(day=="SAT"){
        updateCollection(saturday,tasks,user);
    }
    else if(day=="SUN"){
        updateCollection(sunday,tasks,user);
    }
}

function updateCollection(db,tasks,user) {
    if(tasks.length!=0) {
        var task = tasks[0];

        db.findOne({user_email: user.email}, function (err, u) {
            console.log(u);
            if (u == null) {
                db.insert({user_email: user.email, tasks: [{time: task.time, task: task}]}, function (err, data) {
                    if (data != null) {
                        console.log("new  user added - " + data);
                        tasks.splice(0,1);
                        updateCollection(db,tasks,user);
                    }
                });
            }
            else {
                var task_added = false;
                for (var i = 0; i < u.tasks.length; i++) {
                    if (u.tasks[i].time == task.time) {
                        u.tasks[i].task = task;
                        task_added = true;
                        break;
                    }
                }
                if (!task_added) {
                    u.tasks.push({time: task.time, task: task});
                }
                db.update({user_email: user.email}, u, function (err, data) {
                    if (data != null) {
                        console.log("new user updated - " + data);
                        tasks.splice(0,1);
                        updateCollection(db,tasks,user);
                    }
                });
            }
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
