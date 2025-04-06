import { Modal } from "@mui/material";

export function ModalWindow() {
    return (

        <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
        </Modal>
    )
}