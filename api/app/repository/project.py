from sqlalchemy.orm import Session
from app import models, schemas
from fastapi import HTTPException, status

class ProjectRepository:
    @staticmethod
    def create_project(db: Session, project: schemas.ProjectCreate, owner_id: int):
        db_project = models.Project(**project.model_dump(), owner_id=owner_id)
        db.add(db_project)
        db.commit()
        db.refresh(db_project)
        return db_project

    @staticmethod
    def get_user_projects(db: Session, user_id: int):
        return db.query(models.Project).filter(models.Project.owner_id == user_id).all()
    
    @staticmethod
    def get_project_by_id(db: Session, project_id: int, owner_id: int):
      return db.query(models.Project).filter(models.Project.id == project_id, models.Project.owner_id == owner_id).first()

    @staticmethod
    def get_all_projects(db: Session, owner_id: int):
      return db.query(models.Project).filter(models.Project.owner_id == owner_id).all()

    @staticmethod
    def update_project(db: Session, db_project: models.Project, project_update: schemas.ProjectCreate):
        for key, value in project_update.dict().items():
            setattr(db_project, key, value)
        db.commit()
        db.refresh(db_project)
        return db_project

    @staticmethod
    def delete_project(db: Session, db_project: models.Project):
        db.delete(db_project)
        db.commit()
