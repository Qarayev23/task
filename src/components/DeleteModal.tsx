import { Button, Modal } from 'antd'

const DeleteModal = ({ isDeleteModalOpen, setIsDeleteModalOpen, tabulatorRef }) => {
    const handleDelete = () => {
        console.log(tabulatorRef.current.current);

        const selectedRowId = tabulatorRef.current.current.getSelectedData()[0].id
        
        tabulatorRef.current.current.deleteRow(selectedRowId)
        setIsDeleteModalOpen(false)
    }

    return (
        <Modal open={isDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)} footer={null}>
            <h1 className='text-2xl font-bold my-5'>Confirm Delete/</h1>
            <p>Are you sure want to delete this data</p>
            <div className='flex justify-end gap-3'>
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

