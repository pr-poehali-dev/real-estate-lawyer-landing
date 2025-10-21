'''
Business: Export all leads to CSV file for download
Args: event with httpMethod
Returns: CSV file with all leads data
'''

import json
import os
import psycopg2
import csv
from io import StringIO
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        db_url = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        
        cur.execute("""
            SELECT id, lead_type, name, phone, email, description, 
                   created_at, sent_to_telegram, sent_to_email
            FROM t_p22786070_real_estate_lawyer_l.leads
            ORDER BY created_at DESC
        """)
        
        leads = cur.fetchall()
        
        output = StringIO()
        writer = csv.writer(output)
        
        writer.writerow([
            'ID', 'Тип заявки', 'Имя', 'Телефон', 'Email', 
            'Описание', 'Дата создания', 'Отправлено в Telegram', 'Отправлено на Email'
        ])
        
        for lead in leads:
            lead_type_ru = 'Гайд' if lead[1] == 'guide' else 'Заявка'
            created_at_str = lead[6].strftime('%Y-%m-%d %H:%M:%S') if lead[6] else ''
            telegram_sent = 'Да' if lead[7] else 'Нет'
            email_sent = 'Да' if lead[8] else 'Нет'
            
            writer.writerow([
                lead[0],
                lead_type_ru,
                lead[2],
                lead[3],
                lead[4] or '',
                lead[5] or '',
                created_at_str,
                telegram_sent,
                email_sent
            ])
        
        csv_content = output.getvalue()
        output.close()
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': f'attachment; filename="leads_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv"',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': csv_content
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)})
        }
