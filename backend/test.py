from api.crud import get_all_user_id
from api.database import SessionLocal, engine
from api import models
from CF import Best_Two_CF
import pandas as pd
import numpy as np

models.Base.metadata.create_all(bind=engine)
db = SessionLocal()


def create_interaction_matrix():

    ids = np.array(get_all_user_id(db)).reshape(-1)
    # create matrix with zeros
    interaction_matrix = pd.DataFrame(0, index=ids, columns=ids)
    # fill matrix based on interaction table
    for u in db.query(models.Interaction):
        interaction_matrix[u.receiver_id][u.sender_id] = 1
    return interaction_matrix


def get_best_two_recommedations():
    iM = create_interaction_matrix()
    print(iM)
    return [u[0] for u in Best_Two_CF(iM, 5) if u[1] > 0]

    # all_received = set(
    #     np.array(
    #         db.query(models.Interaction.sender_id)
    #         .filter(models.Interaction.receiver_id == 9)
    #         .all()
    #     )
    #     .reshape(-1)
    #     .tolist()
    # )
    # all_send = set(
    #     np.array(
    #         db.query(models.Interaction.receiver_id)
    #         .filter(models.Interaction.sender_id == 9)
    #         .all()
    #     )
    #     .reshape(-1)
    #     .tolist()
    # )
    # print(all_received - all_send)


if __name__ == "__main__":
    # user_a = db.query(models.User).filter(models.User.id == 3).first()
    # user_b = db.query(models.User).filter(models.User.id == 5).first()
    # db_group = db.query(models.Group).filter(models.Group.id == user_a.group_id).first()
    # db_group.member.append(user_b)
    # db.add(db_group)
    # db.commit()

    deleteme = db.query(models.Group).filter(~models.Group.member.any()).all()
    for x in deleteme:
        x.delete()

    db.commit()