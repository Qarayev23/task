import { Button, Form, InputNumber, Modal, Select } from 'antd'

const AddDataModal = ({ isAddModalOpen, setIsAddModalOpen, tabulatorRef }) => {
    const [form] = Form.useForm()

    const onFinish = (values) => {
        const idArray = tabulatorRef.current.current.getData(true).map(item => item.id).sort((a, b) => b - a);
        tabulatorRef.current.current.addData({ ...values, id: idArray[0] + 1 })
        setIsAddModalOpen(false);
        form.resetFields();
    };

    return (
        <Modal open={isAddModalOpen} onCancel={() => setIsAddModalOpen(false)} footer={null} >
            <h1 className='text-2xl font-bold my-5'>Add New Data</h1>
            <Form
                onFinish={onFinish}
                labelCol={{ span: 24, offset: 0 }}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Add Len (only numbers)"
                    name="len"
                    rules={[{ required: true, message: 'Add Len (only numbers)' }]}
                >
                    <InputNumber className='w-full' />
                </Form.Item>

                <Form.Item
                    label="Select Status"
                    rules={[{ required: true, message: 'Dəyər seçin!' }]}
                    name="status"
                >
                    <Select>
                        <Select.Option value="0">0</Select.Option>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                    </Select>
                </Form.Item>

                <div className='flex justify-end gap-3'>
                    <Button type="primary" danger htmlType="button" className='w-20' onClick={() => setIsAddModalOpen(false)}>
                        Delete
                    </Button>
                    <Button type="primary" htmlType="submit" className='w-20'>
                        Submit
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default AddDataModal

