import nodemailer from "nodemailer";

export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  public async sendWelcomeEmail(to: string) {
    const info = await this.transporter.sendMail({
      from: '"Joseph" <esseyjoseph7@gmail.com>',
      to,
      subject: "Bienvenue sur Test de Joseph",
      html: `
        <h1>Bienvenue !</h1>
        <p>Merci de vous être inscrit sur Test. Nous sommes heureux de vous compter parmi nous.</p>
      `,
    });

    console.log("Message sent: %s", info.messageId);
  }
}
