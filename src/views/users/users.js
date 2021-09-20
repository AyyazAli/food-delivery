import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { Block, Check, Stop } from '@material-ui/icons';
import Layout from 'layouts/layout';
import React, { useEffect, useState } from 'react'
import axiosInstance from 'utils/axiosInstance';

const Users = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        axiosInstance.get('/user').then(response => {
            setUsers(response.data.data)
        })
    }, [])

    const changeUserStatus = (id, currentStatus) => {
        axiosInstance.patch(`/user/${id}`, {
            accountStatus: currentStatus === 'active' ? 'blocked' : 'active'
        }).then(response => {
            const index = users.findIndex(oneUser => oneUser._id === id)
            const allUsers = [...users];
            allUsers[index].accountStatus = response.data.user.accountStatus
            setUsers(allUsers)
        })
    }

    return (
        <Layout title="Users">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.map((singleUser, index) => (
                    <TableRow key={index}>
                            <TableCell>{singleUser.firstName}</TableCell>
                            <TableCell>{singleUser.lastName}</TableCell>
                            <TableCell>{singleUser.email}</TableCell>
                            <TableCell>{singleUser.accountStatus}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => changeUserStatus(singleUser._id, singleUser.accountStatus)}>
                                    {singleUser.accountStatus === 'active' ?
                                        <Block /> :
                                        <Check />
                                    }
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Layout>
    )
}

export default Users;