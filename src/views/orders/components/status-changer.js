import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const StatusChanger = ({ onChangeHandler, status }) => {

    const authState = useSelector(state => state.auth)
    const owner = authState.role === "owner";

    const [editable, setEditable] = useState(false)


    const nextOwnerStatus = () => {
        if (status === 'placed')
            return 'processing'
        else if (status === 'processing')
            return 'inroute'
        else if (status === 'inroute')
            return 'delivered'
        else return ""
    }

    const nextUserStatus = () => {
        if (status === 'placed')
            return 'cancelled'
        else if (status === 'delivered')
            return 'received'
        else return ""
    }

    const nextStatus = owner ? nextOwnerStatus() : nextUserStatus();

    return (
        nextStatus ?
            <Button
                variant="outlined"
                color={owner ? 'secondary' : 'primary'}
                disabled={!nextStatus}
                onClick={() => onChangeHandler(nextStatus)}
            >
                {nextStatus.toUpperCase()} ORDER
            </Button>
            : ""
    )
}

export default StatusChanger;