from datetime import datetime
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
app = Flask(__name__)

# Basic Flask configuration
app.config["SECRET_KEY"] = "development-key"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///math_game.db"
db.init_app(app)

# Import models after db initialization
from models import TopicProgress

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/progress/<topic>', methods=['POST'])
def update_progress(topic):
    try:
        data = request.json
        progress = TopicProgress.query.filter_by(topic=topic).first()
        
        if not progress:
            progress = TopicProgress(topic=topic)
            db.session.add(progress)
        
        if 'score' in data:
            progress.best_score = max(progress.best_score or 0, int(data['score']))
            progress.attempts = (progress.attempts or 0) + 1
            progress.completed = True
            progress.last_attempt = datetime.utcnow()
        
        db.session.commit()
        return jsonify({'status': 'success', 'best_score': progress.best_score})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/progress')
def get_progress():
    try:
        topics = TopicProgress.query.all()
        return jsonify([{
            'topic': t.topic,
            'best_score': t.best_score,
            'attempts': t.attempts,
            'completed': t.completed,
            'status_color': t.status_color
        } for t in topics])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Initialize database
with app.app_context():
    db.create_all()
    
    # Create default topics if needed
    default_topics = [
        'integers', 'operations', 'fractions', 'rounding', 'scientific',
        'ratios', 'decimals', 'percentages', 'powers', 'expressions',
        'algebra', 'geometry', 'quadratic', 'graphing'
    ]
    
    for topic_name in default_topics:
        if not TopicProgress.query.filter_by(topic=topic_name).first():
            db.session.add(TopicProgress(topic=topic_name))
    
    db.session.commit()