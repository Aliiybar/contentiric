const nodemailer = require('nodemailer');
const winston = require('winston');
const mongoose = require('mongoose');
const {MailServer} = require('../model')



function getEmailServerSettings(siteId, settingsName){
    if (!siteId){
        let setting = MailServer.findOne({settingsName:settingsName});
    }else
    { 
        let setting = MailServer.findOne({siteId:siteId, settingsName:settingsName});
    }
    if(!setting) {
        winston.error(`No email settings defined for siteId :  ${siteId} and settingsName : ${settingsName}` );
        return null;
    }
    return setting;
}

function sendBySettingName(siteId, settingsName, email){
    const setting = getEmailServerSettings(siteId, settingsName);
    if(!setting) { 
        setting = getEmailServerSettings(null, "DEFAULT_SITE_SETTINGS");
    }
    
    if(!setting) return false;
    return send(setting, email);
}

function send({ emailServerAddress, 
                emailServerUsername, 
                emailServerPassword, 
                emailServerPort, 
                emailServerUseSSL, 
                emailFromName, 
                emailFromAddress } = mailServer, 
              { toAddress,
                subject,
                bodyText,
                bodyHtml} = email, ) {
                    
    let transporter = nodemailer.createTransport({
        host: emailServerAddress,
        port: emailServerPort,
        secure: emailServerUseSSL, // true for 465, false for other ports
        auth: {
            user: emailServerUsername, // generated ethereal user
            pass: emailServerPassword // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: `"${emailFromName}" <${emailFromAddress}>`, // sender address
        to: `${toAddress}, ${toAddress}`, // list of receivers
        subject: subject, // Subject line
        text: bodyText, // plain text body
        html: bodyHtml // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            winston.error("Error sending email", error)
            return false;
        }
        winston.log('Message sent: %s', info.messageId);
        return true;
    });
}

module.exports = send;
module.exports = sendBySettingName;