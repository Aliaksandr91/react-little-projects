import React, {ChangeEvent, FC} from 'react';
import {Skeleton} from './Skeleton';
import {User, UserType} from "./User";

interface UsersPropsType {
    items: UserType[]
    isLoading: boolean
    searchValue: string
    onChangeSearchValue: (value: ChangeEvent<HTMLInputElement>) => void
    invites: number[]
    onClickInvite: (id: number) => void
    onClickSendInvite: () => void
}

export const Users: FC<UsersPropsType> = ({
                                              items,
                                              isLoading,
                                              searchValue,
                                              onChangeSearchValue,
                                              invites,
                                              onClickInvite,
                                              onClickSendInvite
                                          }) => {

    return (
        <>
            <div className="search">
                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                </svg>
                <input value={searchValue} onChange={onChangeSearchValue} type="text"
                       placeholder="Find a user..."/>
            </div>
            {isLoading ? (
                <div className="skeleton-list">
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
            ) : (
                <ul className="users-list">
                    {
                        items
                            .filter(user => {
                                const fullName = (user.first_name + user.last_name).toLowerCase()
                                return fullName.includes(searchValue.toLowerCase()) || user.email.toLowerCase().includes(searchValue.toLowerCase())
                            })
                            .map(user => <User
                                id={user.id}
                                onClickInvite={onClickInvite}
                                isInvited={invites.includes(user.id)}
                                avatar={user.avatar}
                                email={user.email}
                                first_name={user.first_name}
                                last_name={user.last_name}
                                key={user.id}
                            />)

                    }
                </ul>
            )}
            {
                invites.length > 0 && <button onClick={onClickSendInvite} className="send-invite-btn">Send invite</button>
            }

        </>
    );
};