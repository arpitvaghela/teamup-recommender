import pandas as pd

from typing import Set, List, Tuple


def get_recipient(df: pd.DataFrame, u: int) -> Set[int]:
    """Get recipient of user u

    Args:
        u : a sender user

    Returns:
        Set of recipient user of user u
    """
    try:
        u_row = df.loc[u]
        return set(u_row.loc[u_row == 1].index)
    except KeyError:
        return set()


def similar_recipient(df: pd.DataFrame, r: int) -> Set[int]:
    """Get similar recipients of user r

    Args:
        r : a recipient user

    Returns:
        Set of similar recipient

    Note:
        r ~r r' => w -> r & w -> r'
    """
    try:
        df_r = df.loc[df[r] == 1]  # df where r is a recipient
    except KeyError:
        return set()

    list_of_similar_r = df_r.apply(
        lambda r: r.loc[r == 1].index, axis=1
    )  # list of similar recipient in each row

    S = set()  # create a set of recipients

    for l in list_of_similar_r:
        S |= set(l)

    try:
        S.remove(r)
    except KeyError:
        pass

    return S


def similar_sender(df: pd.DataFrame, s: int) -> Set[int]:
    """Get similar sender of user s

    Args:
        s : a sender user

    Returns :
        Set of similar sender

    Note :
        s ~s s' =>  s -> w & s' -> w
    """
    R = get_recipient(df, s)  # recipients of s
    df_s = df.loc[:, R]  # dataframe where s is a sender
    df_s = df_s[(df_s == 1).any(axis=1)]

    S = set(df_s.index)  # set of similar senders
    try:
        S.remove(s)  # remove current user
    except KeyError:
        pass

    return S


def Basic_CF(df: pd.DataFrame, u: int) -> List[Tuple[int, int]]:
    """Recommend similar recipient of the recipient of u

    Args:
        u : user

    Returns:
        Sorted list of (user,vote) Tuples of recommendation

    Note:
        C = {<u,r> : (u -> r' & r' ~r r & u -/> r & r -/> u )}
        votes(u,r) = |{r' : u -> r' & r' ~r r }|
    """

    votes = {r: 0 for r in df.columns}  # initial votes are 0

    R1 = get_recipient(df, u)  # set of recipients
    for r1 in R1:
        R = similar_recipient(df, r1)  # set of similar recipients
        for r in R:
            if r not in R1 and u not in get_recipient(
                df, r
            ):  # increment votes[r] if u -/> r and r -/> u
                votes[r] += 1

    return sorted(
        list(votes.items()), key=lambda e: e[1], reverse=True
    )  # return Soreted Tuple


def Inverted_CF_Recipient(df: pd.DataFrame, u: int) -> List[Tuple[int, int]]:
    """Recommend recipient of similar recipient of u
    Args:
        u : user
    Returns:
        Sorted list of (user.votes) Tuple of recommendation
    Note:
        C = {<u,r> : (r' ~r u & r' -> r & u -/> r & r -/> u )}
        votes(u,r) = |r' : { r' ~r u & r' -> r }|
    """
    votes = {r: 0 for r in df.columns}  # initial votes are 0

    U1 = get_recipient(df, u)

    R1 = similar_recipient(df, u)
    for r1 in R1:
        R = get_recipient(df, r1)
        for r in R:
            if r not in U1 and u not in get_recipient(df, r):
                votes[r] += 1

    return sorted(
        list(votes.items()), key=lambda e: e[1], reverse=True
    )  # return Soreted Tuple


def Inverted_CF_Sender(df: pd.DataFrame, u: int) -> List[Tuple[int, int]]:
    """Recommend similar sender of recipient of u
     Args:
        u : User
    Returns:
        Sorted list of (user.votes) Tuple of recommendation
    Note:
        C = {<u,s> : (u -> s' & s' ~s s & u -/> s & s -/> u )}
        votes(u,s) = |s' : { s' ~s s & u -> s' }|
    """

    votes = {r: 0 for r in df.columns}  # initial votes are 0
    S1 = get_recipient(df, u)
    for s1 in S1:
        S = similar_sender(df, s1)
        for s in S:
            if s not in S1 and u not in get_recipient(df, s):
                votes[s] += 1
    return sorted(
        list(votes.items()), key=lambda e: e[1], reverse=True
    )  # return Soreted Tuple


def Best_Two_CF(df: pd.DataFrame, u: int) -> List[Tuple[int, int]]:
    """Best Two CF = Basic CF + Inverted CF Recipient
    Args:
        u : User
    Returns:
        Sorted list of (user.votes) Tuple of recommendation

    """
    votes = {r: 0 for r in df.columns}  # initial votes are 0

    # basic CF
    R1 = get_recipient(df, u)  # set of recipients
    for r1 in R1:
        R = similar_recipient(df, r1)  # set of similar recipients
        for r in R:
            if r not in R1 and u not in get_recipient(
                df, r
            ):  # increment votes[r] if u -/> r and r -/> u
                votes[r] += 1

    # inverted cf recipient
    S1 = get_recipient(df, u)
    for s1 in S1:
        S = similar_sender(df, s1)
        for s in S:
            if s not in S1 and u not in get_recipient(df, s):
                votes[s] += 1

    return sorted(
        list(votes.items()), key=lambda e: e[1], reverse=True
    )  # return Soreted Tuple
