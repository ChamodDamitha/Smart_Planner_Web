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

exports.getSchedule = function (user,day,res) {

    if(day=="MON"){
        monday.findOne({user_email:user.email},function (err,data) {
            res.send(JSON.stringify({success:true,msg:data}));
        });
    }
    if(day=="TUE"){
        tuesday.findOne({user_email:user.email},function (err,data) {
            res.send(JSON.stringify({success:true,msg:data}));
        });
    }
    if(day=="WED"){
        wednesday.findOne({user_email:user.email},function (err,data) {
            res.send(JSON.stringify({success:true,msg:data}));
        });
    }
    if(day=="THU"){
        thursday.findOne({user_email:user.email},function (err,data) {
            res.send(JSON.stringify({success:true,msg:data}));
        });
    }
    if(day=="FRI"){
        friday.findOne({user_email:user.email},function (err,data) {
            res.send(JSON.stringify({success:true,msg:data}));
        });
    }
    if(day=="SAT"){
        saturday.findOne({user_email:user.email},function (err,data) {
            res.send(JSON.stringify({success:true,msg:data}));
        });
    }
    if(day=="SUN"){
        sunday.findOne({user_email:user.email},function (err,data) {
            res.send(JSON.stringify({success:true,msg:data}));
        });
    }

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
            if (u == null) {
                db.insert({user_email: user.email, tasks: [{time: task.time, task: task}]}, function (err, data) {
                    if (data != null) {
                        console.log("new user schedule added - " + data);
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
                        console.log("schedule updated - " + data);
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
