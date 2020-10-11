# models.py
import flask_sqlalchemy, app
from sqlalchemy.ext.declarative import declarative_base
from app import db
import os

Base = declarative_base()

database_uri = os.environ['SQLALCHEMY_DATABASE_URI']

app.app.config['SQLALCHEMY_DATABASE_URI']=database_uri

def make_user(name):
    class User(db.Model):
        print(name)
        __tablename__ = name
        id = db.Column(db.Integer, primary_key=True)
        username = db.Column(db.String(120))
    
        def __init__(self, u):
            self.username = u
        
        def __repr__(self):
            return '<Users username: %s>' % self.username
            
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120))
    
    def __init__(self, u):
        __tablename__ = self.username
        self.username = u
        
    def __repr__(self):
        return '<Users username: %s>' % self.username