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


class Group(BaseModel):
    id: int

    # members: List["backend.api.schemas.User"]

    class Config:
        orm_mode = True


class User(BaseModel):
    firstname: str
    lastname: str
    email: str
    photo_url: Optional[str]
    github: Optional[str]
    linkedin: Optional[str]
    groups: List[Group] = []

    degree: str
    year: int

    class Config:
        orm_mode = True
