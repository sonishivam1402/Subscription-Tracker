export const generateEmailTemplate = ({
    userName,
    subscriptionName,
    renewalDate,
    planName,
    price,
    paymentMethod,
    accountSettingsLink,
    supportLink,
    daysLeft,
}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscription Renewal Reminder</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        body {
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            color: #2c3e50;
            background-color: #f8fafc;
            margin: 0;
            padding: 20px;
        }
        .email-container {
            max-width: 700px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 8px 16px rgba(0,0,0,0.05);
            border-radius: 16px;
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
            color: white;
            text-align: center;
            padding: 30px 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 26px;
            font-weight: 600;
        }
        .content {
            padding: 30px;
        }
        .greeting {
            margin-bottom: 20px;
            font-size: 16px;
        }
        .subscription-details {
            background-color: #f1f5f9;
            border-left: 4px solid #6366f1;
            padding: 20px;
            margin-bottom: 20px;
            border-radius: 8px;
        }
        .renewal-warning {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin-top: 20px;
            border-radius: 8px;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .days-badge {
            background-color: #dc2626;
            color: white;
            padding: 6px 12px;
            border-radius: 9999px;
            font-weight: 600;
            font-size: 0.8em;
        }
        .cta-section {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
            gap: 10px;
            flex-wrap: wrap;
        }
        .cta-button {
            flex: 1;
            padding: 14px 0;
            background-color: #6366f1;
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            text-align: center;
            transition: background-color 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 6px rgba(99,102,241,0.3);
            display: block;
        }
        .cta-button:hover {
            background-color: #4f46e5;
            box-shadow: 0 6px 10px rgba(99,102,241,0.4);
        }
        .footer {
            background-color: #f9fafb;
            text-align: center;
            padding: 20px;
            font-size: 0.8em;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Subscription Renewal Reminder</h1>
        </div>

        <div class="content">
            <div class="greeting">
                <p>Hello ${userName},</p>
                <p>We hope this email finds you well. Your subscription for <strong>${subscriptionName}</strong> is approaching its renewal date.</p>
            </div>

            <div class="subscription-details">
                <table width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;">
                    <tr>
                        <td align="left" style="color:#374151; font-weight:600; padding: 8px 0;">Subscription</td>
                        <td align="right" style="padding: 8px 0;">${subscriptionName}</td>
                    </tr>
                    <tr>
                        <td align="left" style="color:#374151; font-weight:600; padding: 8px 0;">Plan</td>
                        <td align="right" style="padding: 8px 0;">${planName}</td>
                    </tr>
                    <tr>
                        <td align="left" style="color:#374151; font-weight:600; padding: 8px 0;">Renewal Date</td>
                        <td align="right" style="padding: 8px 0;">${renewalDate}</td>
                    </tr>
                    <tr>
                        <td align="left" style="color:#374151; font-weight:600; padding: 8px 0;">Price</td>
                        <td align="right" style="padding: 8px 0;">${price}</td>
                    </tr>
                    <tr>
                        <td align="left" style="color:#374151; font-weight:600; padding: 8px 0;">Payment Method</td>
                        <td align="right" style="padding: 8px 0;">${paymentMethod}</td>
                    </tr>
                </table>
            </div>

            <!-- Renewal Warning -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 8px; padding: 15px; font-size: 14px; margin-top: 20px;">
              <tr>
                <td style="padding: 10px 10px;">
                  <span style="display: inline-block; background-color: #dc2626; color: white; padding: 6px 12px; border-radius: 9999px; font-weight: 600; font-size: 0.8em;">${daysLeft} Days</span>
                </td>
                <td style="padding: 10px 0; color: #374151; font-size: 14px;">
                  To ensure uninterrupted service, please review and confirm your subscription details.
                </td>
              </tr>
            </table>
            
            <!-- CTA Buttons -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
              <tr>
                <td align="center" style="padding: 10px;">
                  <a href="${accountSettingsLink}" style="display: block; background-color: #6366f1; color: white; text-decoration: none; padding: 14px 0; border-radius: 8px; font-weight: 600; text-align: center; width: 100%; max-width: 240px;">Manage Subscription</a>
                </td>
                <td align="center" style="padding: 10px;">
                  <a href="${supportLink}" style="display: block; background-color: #6366f1; color: white; text-decoration: none; padding: 14px 0; border-radius: 8px; font-weight: 600; text-align: center; width: 100%; max-width: 240px;">Contact Support</a>
                </td>
              </tr>
            </table>
        </div>

        <div class="footer">
            <p>Need help? Contact our support team at any time.</p>
            <p>&copy; ${new Date().getFullYear()} Shivam. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

export const emailTemplates = [
    {
        label: "7 days before reminder",
        generateSubject: (data) => `⌛ Reminder: Your ${data.subscriptionName} Subscription Renews in 7 days!`,
        generateBody: (data) => generateEmailTemplate({
            userName: data.userName,
            subscriptionName: data.subscriptionName,
            renewalDate: data.renewalDate,
            planName: data.planName,
            price: data.price,
            paymentMethod: data.paymentMethod,
            accountSettingsLink: data.accountSettingsLink,
            supportLink: data.supportLink,
            daysLeft: 7,
        }),
    },
    {
        label: "5 days before reminder",
        generateSubject: (data) => `🗓️ ${data.subscriptionName} Renews in 5 Days: Stay Subscribed!!`,
        generateBody: (data) => generateEmailTemplate({
            userName: data.userName,
            subscriptionName: data.subscriptionName,
            renewalDate: data.renewalDate,
            planName: data.planName,
            price: data.price,
            paymentMethod: data.paymentMethod,
            accountSettingsLink: data.accountSettingsLink,
            supportLink: data.supportLink,
            daysLeft: 5,
        }),
    },
    {
        label: "2 days before reminder",
        generateSubject: (data) => `🎉 2 Days Left! ${data.subscriptionName} Subscription Renews`,
        generateBody: (data) => generateEmailTemplate({
            userName: data.userName,
            subscriptionName: data.subscriptionName,
            renewalDate: data.renewalDate,
            planName: data.planName,
            price: data.price,
            paymentMethod: data.paymentMethod,
            accountSettingsLink: data.accountSettingsLink,
            supportLink: data.supportLink,
            daysLeft: 2,
        }),
    },
    {
        label: "1 days before reminder",
        generateSubject: (data) => `✨ Final Reminder: Your ${data.subscriptionName} Renews Tomorrow!`,
        generateBody: (data) => generateEmailTemplate({
            userName: data.userName,
            subscriptionName: data.subscriptionName,
            renewalDate: data.renewalDate,
            planName: data.planName,
            price: data.price,
            paymentMethod: data.paymentMethod,
            accountSettingsLink: data.accountSettingsLink,
            supportLink: data.supportLink,
            daysLeft: 1,
        }),
    },
];