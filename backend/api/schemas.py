from typing import List, Optional

from pydantic import BaseModel


class Auth(BaseModel):
    email: str
    password: str


class UserCreate(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str
    degree: str
    year: int


class UserUpdate(BaseModel):
    firstname: Optional[str]
    lastname: Optional[str]
    photo_url: Optional[str]
    github: Optional[str]
    linkedin: Optional[str]


class User(BaseModel):
    id: int
    firstname: str
    lastname: str
    email: str
    photo_url: Optional[str]
    github: Optional[str]
    linkedin: Optional[str]
    group_id: Optional[int]

    degree: str
    year: int

    class Config:
        orm_mode = True


class Group(BaseModel):
    id: int
    name: Optional[str]
    member: List[User]

    class Config:
        orm_mode = True


class Interaction(BaseModel):
    sender_id: int
    receiver_id: int
