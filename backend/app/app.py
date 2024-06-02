from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import bcrypt 
 
app = Flask(__name__)
CORS(app)
 
def connect_database():
    try:
        connection = mysql.connector.connect(
            host='database',
            database='db',
            user='light',
            password='light'
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print("データベース接続でエラーが発生しました:", e)
 
def verify_user(username, password):
    connection = connect_database()
    if connection is not None:
        cursor = connection.cursor()
        query = "SELECT password FROM Students WHERE username = %s"
        cursor.execute(query, (username,))
        result = cursor.fetchone()
        connection.close()
        if result:
            hashed_password = result[0].encode()
            return bcrypt.checkpw(password.encode(), hashed_password)
        else:
            return False
    return False
 
@app.route('/api/login', methods=['POST'])
def handle_login():
    username = request.json.get('username')
    password = request.json.get('password')
    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode('utf-8')
   
    if verify_user(username, hashed_password):
        return jsonify({'message': {username}})
    else:
        return jsonify({'message': 'ユーザ名またはパスワードが正しくありません'})
 
@app.route('/api/signup', methods=['POST'])
def handle_signup():
    username = request.json.get('username')
    password = request.json.get('password')
   
    if not username or not password:
        return jsonify({'message': 'ユーザ名とパスワードは必須です'}), 400
 
    connection = connect_database()
    if connection is not None:
        cursor = connection.cursor()
        # ユーザ名が既に存在するかどうかチェック
        cursor.execute("SELECT * FROM Students WHERE username = %s", (username,))
        if cursor.fetchone() is not None:
            connection.close()
            return jsonify({'message': 'このユーザ名は既に使用されています'}), 409
 
        # パスワードのハッシュ化
        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode('utf-8')
 
        # 新規ユーザーのデータベースへの登録
        cursor.execute("INSERT INTO Students (username, password) VALUES (%s, %s)", (username, hashed_password))
        connection.commit()
        connection.close()
        return jsonify({'message': 'ユーザー登録が完了しました'}), 201
 
    return jsonify({'message': 'データベースエラー'}), 500
 
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
 