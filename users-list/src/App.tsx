import React, {ChangeEvent, useEffect, useState} from 'react';
import './index.scss';
import {Users} from './components/Users';
import {Success} from "./components/Success";

// list of users: https://reqres.in/api/users

function App() {
    const [users, setUsers] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [searchValue, setSearchValue] = useState('')
    const [invites, setInvites] = useState<number[]>([])
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then(res => res.json())
            .then(json => setUsers(json.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])
    const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.currentTarget.value)
    }

    const onClickInvite = (id: number) => {
        if (invites.includes(id)) {
            setInvites(prev => prev.filter(_id => _id !== id))
        } else {
            setInvites((prev) => [...prev, id])
        }
    }

    const onClickSendInvite = ()=> {
        setSuccess(true)
    }
    return (
        <div className="App">
            {
                success
                    ? <Success count={invites.length}/>
                    : <Users
                        onChangeSearchValue={onChangeSearchValue}
                        searchValue={searchValue}
                        isLoading={isLoading}
                        items={users}
                        invites={invites}
                        onClickInvite={onClickInvite}
                        onClickSendInvite={onClickSendInvite}
                    />
            }
        </div>
    );
}

export default App;