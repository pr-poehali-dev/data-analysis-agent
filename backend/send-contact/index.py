import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event, context):
    """Отправка заявки с сайта на почту alek764@yandex.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    cors = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': cors, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not email or not message:
        return {'statusCode': 400, 'headers': cors, 'body': json.dumps({'error': 'Все поля обязательны'})}

    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    sender = 'alek764@yandex.ru'
    receiver = 'alek764@yandex.ru'

    msg = MIMEMultipart('alternative')
    msg['From'] = f'Магазин простых сложностей <{sender}>'
    msg['To'] = receiver
    msg['Subject'] = f'Заявка с сайта от {name}'

    text_body = f'Имя: {name}\nEmail: {email}\n\nСообщение:\n{message}'

    html_body = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1c1510; color: #d4c4a8; border: 1px solid #8B4513;">
        <h2 style="color: #CD7F32; border-bottom: 1px solid #8B4513; padding-bottom: 10px;">Новая заявка с сайта</h2>
        <p><strong style="color: #CD7F32;">Имя:</strong> {name}</p>
        <p><strong style="color: #CD7F32;">Email:</strong> <a href="mailto:{email}" style="color: #d4c4a8;">{email}</a></p>
        <p style="margin-top: 16px;"><strong style="color: #CD7F32;">Сообщение:</strong></p>
        <p style="padding: 12px; background: #251c14; border-left: 3px solid #8B4513;">{message}</p>
    </div>
    """

    msg.attach(MIMEText(text_body, 'plain', 'utf-8'))
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, receiver, msg.as_string())

    return {'statusCode': 200, 'headers': cors, 'body': json.dumps({'success': True})}
