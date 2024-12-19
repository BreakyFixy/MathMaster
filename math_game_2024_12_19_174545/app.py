
import os
import logging
from datetime import datetime
from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)
app = Flask(__name__)

# Basic Flask configuration
app.config.update(
    SECRET_KEY=os.environ.get("FLASK_SECRET_KEY", "development-key"),
    SQLALCHEMY_DATABASE_URI="sqlite:///math_game.db",
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    TEMPLATES_AUTO_RELOAD=True
)

# Initialize SQLAlchemy with app
db.init_app(app)

# Model definition
class TopicProgress(db.Model):
    """Model representing a user's progress in a specific math topic."""
    
    __tablename__ = "topic_progress"

    id = db.Column(db.Integer, primary_key=True)
    topic = db.Column(db.String(64), nullable=False)
    best_score = db.Column(db.Integer, default=0)
    attempts = db.Column(db.Integer, default=0)
    completed = db.Column(db.Boolean, default=False)
    last_attempt = db.Column(db.DateTime, default=datetime.utcnow)

    @property
    def status_color(self) -> str:
        """Return Bootstrap class name based on completion and score."""
        if not self.completed:
            return 'list-group-item-light'
        if self.best_score >= 9:
            return 'list-group-item-success'
        elif self.best_score >= 7:
            return 'list-group-item-warning'
        elif self.best_score >= 5:
            return 'list-group-item-warning orange'
        else:
            return 'list-group-item-danger'

@app.route('/')
def index():
    try:
        logger.debug("Rendering index page")
        return render_template('index.html')
    except Exception as e:
        logger.error(f"Error rendering index: {e}")
        return "An error occurred", 500

@app.route('/api/progress/<topic>', methods=['POST'])
def update_progress(topic):
    try:
        data = request.json
        logger.debug(f"Received progress update for topic {topic}: {data}")
        
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
        logger.error(f"Error updating progress: {e}")
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
        logger.error(f"Error getting progress: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Initialize database and create tables
    with app.app_context():
        try:
            db.create_all()
            logger.info("Database tables created successfully")
            
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
            logger.info("Default topics initialized successfully")
        except Exception as e:
            logger.error(f"Error initializing database: {e}")
            db.session.rollback()
            raise

    app.run(host='0.0.0.0', port=5000)
