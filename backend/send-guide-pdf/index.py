'''
Business: Send PDF guide to user email after form submission
Args: event with httpMethod, body (email, name)
Returns: HTTP response with success status
'''

import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    user_email = body_data.get('email', '')
    user_name = body_data.get('name', 'Клиент')
    
    if not user_email:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email is required'})
        }
    
    try:
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = os.environ.get('SMTP_PORT', '587')
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        
        if not all([smtp_host, smtp_user, smtp_password]):
            return {
                'statusCode': 500,
                'headers': {'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'SMTP not configured'})
            }
        
        msg = MIMEMultipart()
        msg['Subject'] = '🎁 Ваш подарок: Гайд "10 ошибок, которые убивают ваше дело"'
        msg['From'] = smtp_user
        msg['To'] = user_email
        
        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="margin: 0;">🎁 Ваш подарок готов!</h1>
            </div>
            <div style="padding: 30px; background: #f9fafb;">
              <p style="font-size: 16px; line-height: 1.6;">Здравствуйте, {user_name}!</p>
              
              <p style="font-size: 16px; line-height: 1.6;">
                Спасибо за интерес к моим услугам. Во вложении вы найдёте <strong>PDF-гайд "10 ошибок, которые убивают ваше дело"</strong>.
              </p>
              
              <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #92400e;">
                  <strong>💡 Совет:</strong> Изучите гайд внимательно — это поможет вам избежать критических ошибок в юридических вопросах.
                </p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6;">
                Если у вас возникли вопросы или нужна консультация, свяжитесь со мной:
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>📞 Телефон:</strong> +7 (908) 449-89-85</p>
                <p style="margin: 5px 0;"><strong>📧 Email:</strong> {smtp_user}</p>
                <p style="margin: 5px 0;"><strong>💬 Telegram:</strong> @fisenko_advocate</p>
              </div>
              
              <p style="font-size: 16px; line-height: 1.6;">
                С уважением,<br>
                <strong>Антон Фисенко</strong><br>
                Адвокат, 15 лет опыта
              </p>
            </div>
            <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 10px 10px;">
              <p style="margin: 0;">© 2025 Адвокат Антон Фисенко | Владивосток</p>
            </div>
          </body>
        </html>
        """
        
        msg.attach(MIMEText(html, 'html'))
        
        pdf_content = b"""PDF placeholder - replace with actual PDF file content"""
        
        pdf_attachment = MIMEApplication(pdf_content, _subtype='pdf')
        pdf_attachment.add_header('Content-Disposition', 'attachment', filename='10_oshibok_v_dele.pdf')
        msg.attach(pdf_attachment)
        
        server = smtplib.SMTP(smtp_host, int(smtp_port))
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'success': True, 'message': 'Guide sent successfully'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
