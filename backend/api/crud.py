from sqlalchemy.orm import Session

from . import models, schemas


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    # hash password
    db_user = models.User(
        firstname=user.firstname,
        lastname=user.lastname,
        email=user.email,
        hashed_password=user.password,
        degree=user.degree,
        year=user.year,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# def update_user(db: Session, user_id: int, user: dict):
#     user_dict = user.dict()
#     user_dict = {models.User: v for k, v in user_dict.items() if v is not None}
#     print(user_dict)
#     db.query(models.User).filter(models.User.id == user_id).update(user_dict)
#     db.commit()

#     return db.query(models.User).filter(models.User.id == user_id).first()