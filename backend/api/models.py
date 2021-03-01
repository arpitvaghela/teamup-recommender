from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from .database import Base

# user_group_association_table = Table(
#     "association",
#     Base.metadata,
#     Column("user_id", Integer, ForeignKey("users.id")),
#     Column("group_id", Integer, ForeignKey("groups.id")),
# )


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    photo_url = Column(String, nullable=True)
    degree = Column(String)
    year = Column(Integer)
    github = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)

    received_count = Column(Integer)
    group_id = Column(Integer, ForeignKey("groups.id"))


class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    member = relationship("User")


class Interaction(Base):
    __tablename__ = "interactions"

    sender_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    receiver_id = Column(Integer, ForeignKey("users.id"), primary_key=True)


class PositiveInteractions(Base):
    __tablename__ = "positive_interactions"

    sender_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    receiver_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
