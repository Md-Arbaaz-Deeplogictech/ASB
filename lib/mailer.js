/**
 * Email module.
 *
 * (C) 2020 TekMonks. All rights reserved.
 * See enclosed LICENSE file.
 */
const nodemailer = require("nodemailer");

/**
 * Sends an email.
 * @param {string} to            To email address
 * @param {string} cc            This will put recipients in cc
 * @param {string} bcc           This will put recipients in bcc
 * @param {string} from          From email address
 * @param {string} title         The subject of the email
 * @param {string} email_html    The content of the email as HTML
 * @param {string} email_text    The content of the email as Text
 * @param {Array} attachments   The set of attachments, format [{path: path/to/file},...]
 * @param {Object} conf          The config contains {host, port, secure, user, pass} for SMTP
 * @returns {result:true|false, response: Mailer response on true, error: Error on false}
 */
module.exports.email = async function (
  to,
  cc,
  bcc,
  from,
  title,
  email_html,
  email_text,
  attachments,
  conf
) {
  const smtpConfig = {
      pool: true,
      host: conf.server,
      port: conf.port,
      secure: conf.secure,
      auth: { user: conf.user, pass: conf.pass },
    },
    transporter = nodemailer.createTransport(smtpConfig);

  const nodeMailerAttachments = [];
  for (const attachment of attachments)
    nodeMailerAttachments.push({ path: attachment });

  try {
    const response = await transporter.sendMail({
      from: from,
      to: to,
      cc:cc,
      bcc:bcc,
      subject: title,
      text: email_text,
      html: email_html,
      attachments: nodeMailerAttachments,
    });
    return { result: true, response };
  } catch (err) {
    LOG.error(`Email send failed due to ${err}`);
    return { result: false, error: err };
  }
};
