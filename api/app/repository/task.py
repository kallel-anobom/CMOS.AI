from sqlalchemy.orm import Session
from app import models, schemas

class TaskRepository:
    @staticmethod
    def create_task(db: Session, task: schemas.TaskCreate):
      db_task = models.Task(**task.model_dump())  # Usa owner_id diretamente do schema
      db.add(db_task)
      db.commit()
      db.refresh(db_task)
      return db_task

    @staticmethod
    def get_project_tasks(db: Session, project_id: int):
        return db.query(models.Task).filter(models.Task.project_id == project_id).all()
    
    @staticmethod
    def get_project_task_by_id(db: Session, project_id: int, owner_id: int):
      return db.query(models.Task).filter(models.Task.id == project_id, models.Task.owner_id == owner_id).first()

    @staticmethod
    def get_all_tasks(db: Session, owner_id: int):
      return db.query(models.Task).filter(models.Task.owner_id == owner_id).all()

    @staticmethod
    def update_task(db: Session, db_task: models.Task, task_update: schemas.TaskCreate):
        for key, value in task_update.dict().items():
          setattr(db_task, key, value)
        db.commit()
        db.refresh(db_task)
        return db_task

    @staticmethod
    def delete_tasks(db: Session, db_task: models.Task):
        db.delete(db_task)
        db.commit()