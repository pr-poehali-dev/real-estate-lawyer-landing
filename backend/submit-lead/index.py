'''
Business: Save lead to database and send notifications to Telegram and Email
Args: event with httpMethod, body (name, phone, email, description, leadType)
Returns: HTTP response with success status
'''

import json
import os
import psycopg2
import urllib.request
import urllib.parse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
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
    
    name = body_data.get('name', '')
    phone = body_data.get('phone', '')
    email = body_data.get('email', '')
    description = body_data.get('description', '')
    lead_type = body_data.get('leadType', 'general')
    
    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Name and phone are required'})
        }
    
    telegram_sent = False
    email_sent = False
    
    try:
        db_url = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        cur.execute(
            "INSERT INTO t_p22786070_real_estate_lawyer_l.leads (lead_type, name, phone, email, description, sent_to_telegram, sent_to_email) VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id",
            (lead_type, name, phone, email, description, False, False)
        )
        lead_id = cur.fetchone()[0]
        conn.commit()
        
        telegram_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID')
        
        if telegram_token and telegram_chat_id:
            lead_type_ru = 'Гайд' if lead_type == 'guide' else 'Заявка'
            message = f"""🔔 Новая {lead_type_ru}!

👤 Имя: {name}
📞 Телефон: {phone}
📧 Email: {email if email else 'Не указан'}
📝 Описание: {description if description else 'Не указано'}

ID: #{lead_id}"""
            
            telegram_url = f"https://api.telegram.org/bot{telegram_token}/sendMessage"
            telegram_data = {
                'chat_id': telegram_chat_id,
                'text': message,
                'parse_mode': 'HTML'
            }
            
            req = urllib.request.Request(
                telegram_url,
                data=json.dumps(telegram_data).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )
            
            with urllib.request.urlopen(req) as response:
                if response.status == 200:
                    telegram_sent = True
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = os.environ.get('SMTP_PORT', '587')
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        lawyer_email = os.environ.get('LAWYER_EMAIL')
        
        if all([smtp_host, smtp_user, smtp_password, lawyer_email]):
            lead_type_ru = 'Запрос на гайд' if lead_type == 'guide' else 'Заявка на консультацию'
            
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'Новая заявка с сайта: {name}'
            msg['From'] = smtp_user
            msg['To'] = lawyer_email
            
            html = f"""
            <html>
              <body style="font-family: Arial, sans-serif;">
                <h2 style="color: #2c5282;">🔔 {lead_type_ru}</h2>
                <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Имя:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Телефон:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Email:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{email if email else 'Не указан'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;"><strong>Описание:</strong></td>
                    <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">{description if description else 'Не указано'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px;"><strong>ID заявки:</strong></td>
                    <td style="padding: 10px;">#{lead_id}</td>
                  </tr>
                </table>
              </body>
            </html>
            """
            
            msg.attach(MIMEText(html, 'html'))
            
            server = smtplib.SMTP(smtp_host, int(smtp_port))
            server.starttls()
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
            server.quit()
            
            email_sent = True
        
        cur.execute(
            "UPDATE t_p22786070_real_estate_lawyer_l.leads SET sent_to_telegram = %s, sent_to_email = %s WHERE id = %s",
            (telegram_sent, email_sent, lead_id)
        )
        conn.commit()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'leadId': lead_id,
                'telegramSent': telegram_sent,
                'emailSent': email_sent
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
