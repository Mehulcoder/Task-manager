var sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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

