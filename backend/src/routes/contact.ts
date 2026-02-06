import { Router, Request, Response } from 'express';
import { validateContact } from '../middleware/validateRequest';
import { ContactRequestBody } from '../types';
import transporter, { EMAIL_FROM, EMAIL_NOTIFICATION_TO } from '../config/email';

const router = Router();

router.post('/', validateContact, async (req: Request, res: Response): Promise<void> => {
  try {
    const { lastName, firstName, companyName, email, phone, inquiryType, inquiryDetail } = req.body as ContactRequestBody;

    const fullName = `${lastName} ${firstName}`;

    // 社内通知メール
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_NOTIFICATION_TO,
      subject: `【オタスケAI】新規お問い合わせ: ${inquiryType}`,
      text: [
        '新しいお問い合わせがありました。',
        '',
        `氏名: ${fullName}`,
        `会社名: ${companyName}`,
        `メールアドレス: ${email}`,
        `電話番号: ${phone}`,
        `お問い合わせ種別: ${inquiryType}`,
        '',
        'お問い合わせ内容:',
        inquiryDetail,
      ].join('\n'),
    });

    // ユーザー自動返信メール
    await transporter.sendMail({
      from: EMAIL_FROM,
      to: email,
      subject: '【オタスケAI】お問い合わせを受け付けました',
      text: [
        `${fullName} 様`,
        '',
        'この度はオタスケAIにお問い合わせいただき、誠にありがとうございます。',
        '以下の内容でお問い合わせを受け付けました。',
        '',
        `お問い合わせ種別: ${inquiryType}`,
        '',
        'お問い合わせ内容:',
        inquiryDetail,
        '',
        '担当者より1〜2営業日以内にご連絡いたします。',
        'しばらくお待ちくださいませ。',
        '',
        '---',
        'オタスケAI',
        '株式会社ZETTAI',
        'TEL: 070-8960-8679（平日 10:00-18:00）',
      ].join('\n'),
    });

    res.json({ message: 'お問い合わせを受け付けました。確認メールをお送りしましたのでご確認ください。' });
  } catch (err) {
    console.error('Contact form submission failed:', err);
    res.status(500).json({ error: 'お問い合わせの送信に失敗しました。しばらく経ってからお試しください。' });
  }
});

export default router;
