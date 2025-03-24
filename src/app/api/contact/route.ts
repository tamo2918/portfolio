import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const dynamic = 'force-static';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // バリデーション
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'お名前、メールアドレス、メッセージは必須です' },
        { status: 400 }
      );
    }

    // メール送信用のトランスポーターを作成
    // 注意: 本番環境では環境変数を使用することをお勧めします
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mrt.t0304@gmail.com', // 送信元のメールアドレス
        pass: process.env.EMAIL_PASSWORD // Gmailのアプリパスワード（環境変数から取得）
      }
    });

    // メールの内容
    const mailOptions = {
      from: `"ポートフォリオサイト" <mrt.t0304@gmail.com>`,
      to: 'mrt.t0304@gmail.com', // 宛先のメールアドレス
      subject: `ポートフォリオサイトからのお問い合わせ - ${name}様より`,
      text: `
名前: ${name}
メールアドレス: ${email}

メッセージ:
${message}
      `,
      html: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #6366f1; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">ポートフォリオサイトからのお問い合わせ</h2>
  <p><strong>名前:</strong> ${name}</p>
  <p><strong>メールアドレス:</strong> ${email}</p>
  <div style="margin-top: 20px;">
    <strong>メッセージ:</strong>
    <p style="white-space: pre-wrap; background-color: #f8fafc; padding: 15px; border-radius: 5px;">${message}</p>
  </div>
  <p style="color: #94a3b8; font-size: 12px; margin-top: 30px;">このメールはポートフォリオサイトのお問い合わせフォームから自動送信されました。</p>
</div>
      `
    };

    // メール送信
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'メッセージが送信されました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'メッセージの送信に失敗しました' },
      { status: 500 }
    );
  }
} 