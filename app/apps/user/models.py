from app import db


class User(db.Model):

    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50), index=True, unique=True)
    password = db.Column(db.String(128))

    def is_active(self):
        return True

    def get_id(self):
        return str(self.id)
