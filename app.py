# app.py
from os.path import join, dirname
from dotenv import load_dotenv
from datetime import datetime
import os
import flask
import flask_sqlalchemy
import flask_socketio
import chatter
import time

MESSAGES_RECEIVED_CHANNEL = 'messages received'

app = flask.Flask(__name__)

socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")

dotenv_path = join(dirname(__file__), 'sql.env')
load_dotenv(dotenv_path)

database_uri = os.environ['DATABASE_URL']

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri

db = flask_sqlalchemy.SQLAlchemy(app)
db.init_app(app)
db.app = app


chat = chatter.chatter()
try:
    db.session.execute("CREATE TABLE users (id serial PRIMARY KEY,username VARCHAR ( 255 ) NOT NULL);")
    db.session.commit();
except:
    print("user db created")
    
try:
    db.session.execute("CREATE TABLE messages (id serial PRIMARY KEY,message VARCHAR ( 255 ) NOT NULL,created_on TIMESTAMP NOT NULL,from_user VARCHAR ( 255 ));")
    db.session.commit();
except:
    print("messages db created")

def emit_all_messages(channel):
    all_messages = [[db_user.message,str(db_user.created_on),db_user.from_user] for db_user in db.session.execute("SELECT * FROM messages")]
    #print("ALL" + str(all_messages))
    socketio.emit(channel, {
        'allMessages': all_messages
    })


@socketio.on('connect')
def on_connect():
    print('Someone connected!')
    socketio.emit('connected', {
        'test': 'Connected'
    })
    
    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)
    

@socketio.on('disconnect')
def on_disconnect():
    print ('Someone disconnected!')

@socketio.on('new username input')
def on_new_username(data):
    print("Got an event for new username input with data:", data)
    global current_user
    current_user=data["username"]
    try:
        db.session.execute("INSERT INTO users (username VARCHAR ( 255 ) NOT NULL) VALUES (" + data["username"] + ")")
    except:
        current_user=data["username"]
    db.session.commit();
    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)
    
@socketio.on('new message input')
def on_new_message(data):
    print("Got an event for new message input with data:", data)
    now = datetime.now()
    newMessage=data["message"].replace('\'','\'\'')
    newUser=data["username"].replace('\'','\'\'')
    db.session.execute("INSERT INTO messages (message,created_on,from_user) VALUES ('" + newMessage + "','" + str(now) + "', '" + newUser + "');")
    db.session.commit();
    messageString=str(newMessage)
    if(messageString[:2]=='!!'):
        now = datetime.now()
        response = chat.response(data["message"]).replace('\'','\'\'')
        db.session.execute("INSERT INTO messages (message,created_on,from_user) VALUES ('" + response + "','" + str(now) + "', 'bot');")
        db.session.commit();
    
    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

@app.route('/')
def index():
    emit_all_messages(MESSAGES_RECEIVED_CHANNEL)

    return flask.render_template("index.html")

if __name__ == '__main__': 
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )
