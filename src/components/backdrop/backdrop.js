import { Backdrop, CircularProgress } from '@material-ui/core'
import React from 'react'

const AppBackdrop = ({open, handleClose}) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default AppBackdrop;