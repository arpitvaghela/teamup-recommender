from sqlalchemy.orm import Session
from . import models, schemas

import pandas as pd
import numpy as np

from CF import Best_Two_CF


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_all_user_id(db: Session):
    return db.query(models.User.id).all()


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


def send_interaction(db: Session, sender_id, reciever_id):
    db_interaction = models.Interaction(sender_id=sender_id, reciever_id=reciever_id)

    db.add(db_interaction)
    db.commit()
    return db_interaction


def create_interaction_matrix(db: Session):
    ids = np.array(get_all_user_id(db)).reshape(-1)
    # create matrix with zeros
    interaction_matrix = pd.DataFrame(0, index=ids, columns=ids)
    # fill matrix based on interaction table
    for u in db.query(models.Interaction):
        interaction_matrix[u.reciever_id][u.sender_id] = 1
    return interaction_matrix


def recommed_best_two(db: Session, user_id):
    iM = create_interaction_matrix(db)
    recommended_user_ids = [u[0] for u in Best_Two_CF(iM, user_id) if u[1] > 0]
    return db.query(models.User).filter(models.User.id.in_(recommended_user_ids)).all()


# def update_user(db: Session, user_id: int, user: dict):
#     user_dict = user.dict()
#     user_dict = {models.User: v for k, v in user_dict.items() if v is not None}
#     print(user_dict)
#     db.query(models.User).filter(models.User.id == user_id).update(user_dict)
#     db.commit()

#     return db.query(models.User).filter(models.User.id == user_id).first()