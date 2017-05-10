/**
 * Created by chamod on 4/21/17.
 */


var monk = require('monk');
var collection = monk('localhost:27017/smart_planner_web').get("users");

exports.getReport = function (user,date) {

   for(var i=0;i<user.daily_report.length;i++){
       var d=user.daily_report[i];
       if(d.date==date){
           return d;
       }
    }


    for(var i=0;i<user.daily_data.length;i++){
       var d=user.daily_data[i];
       if(d.date==date){
           var d_report=generateReport(d);
           user.daily_report.push(d_report)
           collection.update({email: user.email}, {$set : {daily_report: user.daily_report} }, function (err, data) {
           });

           return d_report;

       }
    }

    return null;
}


function generateReport(daily_data) {
       var report={
           date:daily_data.date,
           completed_tasks:[],
           incompleted_tasks:[],
           completion:0
       } ;

       var completed=0,total=0;


       for(var i=0;i<daily_data.fulltasks.length;i++){
           var t=daily_data.fulltasks[i];
           if(t.completed){
               completed++;
               total++;
               report.completed_tasks.push({desc:t.description+" at "+t.location.name+" at "+t.time});
           }
           else{
               total++;
               report.incompleted_tasks.push({desc:t.description+" at "+t.location.name+" at "+t.time});
           }
       }
       for(var i=0;i<daily_data.timetasks.length;i++){
           var t=daily_data.timetasks[i];
           if(t.completed){
               completed++;
               total++;
               report.completed_tasks.push({desc:t.description+" at "+t.time});
           }
           else{
               total++;
               report.incompleted_tasks.push({desc:t.description+" at "+t.time});
           }
       }
       for(var i=0;i<daily_data.locationtasks.length;i++){
           var t=daily_data.locationtasks[i];
           if(t.completed){
               completed++;
               total++;
               report.completed_tasks.push({desc:t.description+" at "+t.location.name});
           }
           else{
               total++;
               report.incompleted_tasks.push({desc:t.description+" at "+t.location.name});
           }
       }

       report.completion=(completed*100/total).toFixed(2);
       return report;
 }


