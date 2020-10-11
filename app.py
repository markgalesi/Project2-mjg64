# app.py
from os.path import join, dirname
from dotenv import load_dotenv
import os
import flask
import flask_sqlalchemy
import flask_socketio
#import models 

MESSAGES_RECEIVED_CHANNEL = 'messages received'
current_user="user1"

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


db.create_all()
db.session.commit()

def emit_all_messages(channel):
    all_messages = [db_users.message for db_users in db.session.execute("SELECT * FROM " + current_user)]
    print(all_messages)
        
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
    print(data["username"])
    current_user=data["username"]
    try:
        db.session.execute("CREATE TABLE " + data["username"] + " (id serial PRIMARY KEY,message VARCHAR ( 255 ) NOT NULL,created_on TIMESTAMP NOT NULL);")
    except:
        current_user=data["username"]
    db.session.commit();
    
@socketio.on('new message input')
def on_new_message(data):
    print("Got an event for new message input with data:", data)
    print(data["message"])
    #db.session.add(models.make_user(data["username"]));
    db.session.execute("INSERT INTO " + current_user + " (message,created_on) VALUES ('" + data["message"] + "','2020-06-22 19:10:25-07');")
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
