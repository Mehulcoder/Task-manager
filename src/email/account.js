var sgMail = require('@sendgrid/mail');
var sendgridAPIKey = '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';


sgMail.setApiKey(sendgridAPIKey);

var sendWelcomeEmail = function (email, name) {  
    sgMail.send({
        to: email,
        from:'mehul355180@gmail.com',
        subject:'Welcome Email',
        text: `Welcome to the application, ${name}. Let me know how you get along with the application`,
    });    
};

var sendCancellationEmail = function(email, name) {
    sgMail.send({
        to: email,
        from:'mehul355180@gmail.com',
        subject:'Sorry to see you leave',
        text: `Goodbye, ${name} I hope to see you soon`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}

