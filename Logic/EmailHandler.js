/**
 * Created by chamod on 5/15/17.
 */

exports.sendEmail = function (report,email) {

    var helper = require('sendgrid').mail;
    var fromEmail = new helper.Email('chamoddamitha@gmail.com');
    var toEmail = new helper.Email(email);
    var subject = 'Smart Planner - Daily Report';
    var content = new helper.Content('text/html',getHtmlReport(report));
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);

    var sg = require('sendgrid')("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");
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
        if (error) {
            console.log('Error response received');
        }
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });



}



function getHtmlReport(report) {
    var rep= '<h2>Date : '+report.date + '</h2>' +
    '<h3>Task Completion : </h3>' + report.completion + '%' +
    '<h3>Completed tasks</h3>'+
    '<select>';

    for(var i=0;i<report.completed_tasks.length;i++){
        rep += '<option>'+ report.completed_tasks[i].desc + '</option>';
    }

    rep += '</select><h3>Inomplete tasks</h3><select>';

    for(var i=0;i<report.incompleted_tasks.length;i++){
        rep += '<option>'+ report.incompleted_tasks[i].desc + '</option>';
    }


    rep += '</select>';
    return rep;
}