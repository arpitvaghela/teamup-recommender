from typing import List, Optional

from pydantic import BaseModel


class UserCreate(BaseModel):
    firstname: str
    lastname: str
    email: str
    password: str
    branch: str
    year: int


class Group(BaseModel):
    id: int

    members: List["teamup.api.schemas.User"]

    class Config:
        orm_mode = True


class User(BaseModel):
    id: int
    firstname: str
    lastname: str
    email: str
    photo_url: Optional[str]
    github: Optional[str]
    linkedin: Optional[str]
    groups: List[Group] = []

    branch: str
    year: int

    class Config:
        orm_mode = True
