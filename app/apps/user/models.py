from app import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128))

    def is_active(self):
        return True

    def get_id(self):
        return str(self.id)

    def __repr__(self):
        return '<User %r>' % (self.name)
