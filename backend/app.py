from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/login', methods=['POST'])
def handle_login():
    username = request.json.get('username')
    password = request.json.get('password')

    # ここでユーザ名とパスワードの認証を行う
    # 例: ユーザ名とパスワードが適切かどうかをチェックする

    if username == 'example_user' and password == 'example_password':
        return jsonify({'message': 'ログインに成功しました'})
    else:
        return jsonify({'message': 'ユーザ名またはパスワードが正しくありません'}), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
