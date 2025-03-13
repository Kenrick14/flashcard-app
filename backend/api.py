# https://youtu.be/z3YMz-Gocmw?si=VriWTCjMJcHIXl64
# enter 'py api.py' in bash terminal to run the server
# enter environment by typing 'source .venv/Scripts/activate' in bash
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
from flask_cors import CORS


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flashCard.db'
db = SQLAlchemy(app)
api = Api(app)
CORS(app) 

class FlashCardModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(100), nullable=False)
    answer = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'Question: {self.question}\nAnswer: {self.answer}'

#reqparse is used to parse the request data ( VALIDATE IF THE DATA IS CORRECT)
flashcard_args = reqparse.RequestParser()
flashcard_args.add_argument('question', type=str, help='Question is required', required=True)
flashcard_args.add_argument('answer', type=str, help='Answer is required', required=True)

flashCard_fields = {
    'id': fields.Integer,
    'question': fields.String,
    'answer': fields.String
}

# Define API Resource
class FlashCards(Resource):
    @marshal_with(flashCard_fields)
    def get(self):
        flashcards = FlashCardModel.query.all()
        return flashcards, 200
    
    @marshal_with(flashCard_fields)
    def post(self):
        args = flashcard_args.parse_args()
        flashcard = FlashCardModel(question=args['question'], answer=args['answer'])
        db.session.add(flashcard)
        db.session.commit()
        flashcards = FlashCardModel.query.all()
        return flashcards, 201

class FlashCard(Resource):
    @marshal_with(flashCard_fields)
    def get(self, id):
        flashcard = FlashCardModel.query.filter_by(id=id).first()
        if not flashcard:
            abort(404, message='Flashcard not found')
        return flashcard, 200
    
    @marshal_with(flashCard_fields)
    def patch(self, id):
        args = flashcard_args.parse_args()
        flashcard = FlashCardModel.query.filter_by(id=id).first()
        if not flashcard:
            abort(404, message='Flashcard not found')
        flashcard.question = args['question']
        flashcard.answer = args['answer']
        db.session.commit()
        return flashcard, 200
    
    @marshal_with(flashCard_fields)
    def delete(self, id):
        flashcard = FlashCardModel.query.filter_by(id=id).first()
        if not flashcard:
            abort(404, message='Flashcard not found')
        db.session.delete(flashcard)
        db.session.commit()
        return flashcard, 204
    
api.add_resource(FlashCards, '/flashcards/')
api.add_resource(FlashCard, '/flashcard/<int:id>')

@app.route('/')
def home():
    return '<h1>flask api</h1>'
if __name__ == '__main__':
    app.run(debug=True)