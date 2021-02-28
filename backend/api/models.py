from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from .database import Base

user_group_association_table = Table(
    'association', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('group_id', Integer, ForeignKey('groups.id')))


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    photo_url = Column(String, nullable=True)
    branch = Column(String)
    year = Column(Integer)
    github = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)

    groups = relationship("Group",
                          secondary=user_group_association_table,
                          back_populates="members")


class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    members = relationship("User",
                           secondary=user_group_association_table,
                           back_populates="groups")


class Interaction(Base):
    __tablename__ = "interactions"

    sender_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    reciever_id = Column(Integer, ForeignKey('users.id'), primary_key=True)


class PositiveInteractions(Base):
    __tablename__ = "positive_interactions"

    sender_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    reciever_id = Column(Integer, ForeignKey('users.id'), primary_key=True)