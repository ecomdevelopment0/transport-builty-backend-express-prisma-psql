import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { PROVIDER_CONSTANTS } from "../constants/common.constants";

export async function sendEmail(
  template: any,
  email: string,
  email_provider_configuration: any,
  data: any,
  criteria?: any,
) {
  if (email_provider_configuration?.name === PROVIDER_CONSTANTS.SMTP) {
    const compiledTemplate = handlebars.compile(template?.template);
    let html = compiledTemplate(data);
    const transporter = nodemailer.createTransport({
      service: email_provider_configuration?.type,
      auth: {
        user: email_provider_configuration?.client_id,
        pass: email_provider_configuration?.client_password,
      },
    });
    const info = await transporter.sendMail({
      from: email_provider_configuration?.client_id,
      to: email,
      subject: template?.subject,
      html,
    });
    console.log("Email sent via SMTP: " + info.response);
  } else {
    throw new Error("Invalid email provider configuration");
  }
}
