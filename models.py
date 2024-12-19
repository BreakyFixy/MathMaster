from datetime import datetime
from app import db

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
        if self.best_score == 10:
            return 'list-group-item-success'
        elif self.best_score >= 7:
            return 'list-group-item-warning'
        elif self.best_score >= 4:
            return 'list-group-item-danger'
        else:
            return 'list-group-item-dark'
