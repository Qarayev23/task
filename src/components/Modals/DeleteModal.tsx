import { Button, Modal } from 'antd'
import { DeleteModalProps } from '../../types'

const DeleteModal = ({ isDeleteModalOpen, setIsDeleteModalOpen, tabulatorRef }: DeleteModalProps) => {
    const selectedRowId = tabulatorRef?.current?.current?.getSelectedData()[0]?.id
    const handleDelete = () => {
        tabulatorRef.current.current.deleteRow(selectedRowId)
        setIsDeleteModalOpen(false)
    }

    return (
        <Modal open={isDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)} footer={null}>
            <h1 className='text-2xl font-bold my-7'>Confirm Delete</h1>
            <p className='text-base'>Are you sure want to delete data by ID: <b>{selectedRowId}</b></p>
            <div className='flex justify-end gap-3 mt-7'>
                <Button className='w-20' onClick={() => setIsDeleteModalOpen(false)}>
                    Cancel
                </Button>
                <Button type="primary" danger className='w-20' onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteModal

