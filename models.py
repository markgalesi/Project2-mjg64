# models.py
import flask_sqlalchemy, app
from app import db
import os

database_uri = os.environ['SQLALCHEMY_DATABASE_URI']

app.app.config['SQLALCHEMY_DATABASE_URI']=database_uri

class Usps(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String(120))
    
    def __init__(self, a):
        self.address = a
        
    def __repr__(self):
        return '<Usps address: %s>' % self.address
        
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120))
    
    def __init__(self, u):
        self.username = u
        
    def __repr__(self):
        return '<Users username: %s>' % self.username 

