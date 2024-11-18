from http.client import HTTPException
from sqlalchemy.orm import Session
from app.repository.project import ProjectRepository
from app import schemas, models

def create_project(db: Session, project: schemas.ProjectCreate, current_user: models.User):
    return ProjectRepository.create_project(db, project, current_user.id)

def get_project(db: Session, project_id: int, current_user: models.User):
    project = ProjectRepository.get_project_by_id(db, project_id, current_user.id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

def list_projects(db: Session, current_user: models.User):
    return ProjectRepository.get_all_projects(db, current_user.id)

def update_project(db: Session, project_id: int, project_update: schemas.ProjectCreate, current_user: models.User):
    db_project = ProjectRepository.get_project_by_id(db, project_id, current_user.id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjectRepository.update_project(db, db_project, project_update)

def delete_project(db: Session, project_id: int, current_user: models.User):
    db_project = ProjectRepository.get_project_by_id(db, project_id, current_user.id)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    ProjectRepository.delete_project(db, db_project)
