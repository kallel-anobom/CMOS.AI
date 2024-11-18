from http.client import HTTPException
from sqlalchemy.orm import Session
from app.repository.task import TaskRepository
from app import schemas, models

def create_task(db: Session, task: schemas.TaskCreate, current_user: models.User):
    task_data = task.model_dump()
    task_data["owner_id"] = current_user.id
    return TaskRepository.create_task(db, schemas.TaskCreate(**task_data))

def get_project_tasks(db: Session, project_id: int, current_user: models.User):
  return TaskRepository.get_project_tasks(db, project_id, current_user.id)
def get_task(db: Session, task_id: int, current_user: models.User):
  task = TaskRepository.get_project_task_by_id(db, task_id, current_user.id)
  if not task:
      raise HTTPException(status_code=404, detail="Task not found")
  return task

def list_tasks(db: Session, current_user: models.User):
  return TaskRepository.get_all_tasks(db, current_user.id)

def update_task(db: Session, task_id: int, task_update: schemas.TaskCreate, current_user: models.User):
    db_task = TaskRepository.get_project_task_by_id(db, task_id, current_user.id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return TaskRepository.update_task(db, db_task, task_update)

def delete_tasks(db: Session, task_id: int, current_user: models.User):
    db_task = TaskRepository.get_project_task_by_id(db, task_id, current_user.id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    TaskRepository.delete_tasks(db, db_task)
