from sqlalchemy import desc, not_
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
    return (
        db.query(models.User)
        .order_by(desc(models.User.received_count))
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_popular_users(db: Session, user_id: int):
    all_send = set(
        np.array(
            db.query(models.Interaction.receiver_id)
            .filter(models.Interaction.sender_id == user_id)
            .all()
        )
        .reshape(-1)
        .tolist()
    )
    return (
        db.query(models.User)
        .filter(not_(models.User.id.in_(all_send)))
        .order_by(desc(models.User.received_count))
        .all()
    )


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

# def team_up(db:Session,u1:int,u2:int):
    

def send_interaction(db: Session, sender_id:int, receiver_id:int):
    db_interaction = models.Interaction(sender_id=sender_id, receiver_id=receiver_id)

    db.add(db_interaction)
    # if r-> s, then create group and add to successful interactions 
    if db.query(models.Interaction).filter(sender_id=receiver_id, receiver_id=receiver_id).first() is not None:
        

    # update received count
    db.query(models.User.id).filter(models.User.id == receiver_id).update(
        {models.User.received_count: models.User.received_count + 1}
    )
    db.commit()
    return db_interaction


def create_interaction_matrix(db: Session):
    ids = np.array(get_all_user_id(db)).reshape(-1)
    # create matrix with zeros
    interaction_matrix = pd.DataFrame(0, index=ids, columns=ids)
    # fill matrix based on interaction table
    for u in db.query(models.Interaction):
        interaction_matrix[u.receiver_id][u.sender_id] = 1
    return interaction_matrix


def recommed_best_two(db: Session, user_id: int):
    iM = create_interaction_matrix(db)
    recommended_user_ids = set(u[0] for u in Best_Two_CF(iM, user_id) if u[1] > 0)

    # users to whom the user has already send
    all_send = set(
        np.array(
            db.query(models.Interaction.receiver_id)
            .filter(models.Interaction.sender_id == user_id)
            .all()
        )
        .reshape(-1)
        .tolist()
    )
    final_recommendations = recommended_user_ids - all_send
    return db.query(models.User).filter(models.User.id.in_(final_recommendations)).all()


def get_pending_requests(db: Session, user_id: int):
    all_received = set(
        np.array(
            db.query(models.Interaction.sender_id)
            .filter(models.Interaction.receiver_id == user_id)
            .all()
        )
        .reshape(-1)
        .tolist()
    )
    all_send = set(
        np.array(
            db.query(models.Interaction.receiver_id)
            .filter(models.Interaction.sender_id == user_id)
            .all()
        )
        .reshape(-1)
        .tolist()
    )
    unseen_received = all_received - all_send
    return db.query(models.User).filter(models.User.id.in_(unseen_received)).all()


# def update_user(db: Session, user_id: int, user: dict):
#     user_dict = user.dict()
#     user_dict = {models.User: v for k, v in user_dict.items() if v is not None}
#     print(user_dict)
#     db.query(models.User).filter(models.User.id == user_id).update(user_dict)
#     db.commit()

#     return db.query(models.User).filter(models.User.id == user_id).first()