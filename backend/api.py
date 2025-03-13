from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashCard.db'
db = SQLAlchemy(app)

class FlashCard(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(100), nullable=False)
    answer = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'Question: {self.question}\nAnswer: {self.answer}'

@app.route('/')
def home():
    return '<h1>flask api</h1>'

if __name__ == '__main__':
    app.run(debug=True)