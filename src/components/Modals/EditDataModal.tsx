import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { useEffect } from 'react';
import { EditDataModalProps, TableDataProps } from '../../types';

const EditDataModal = ({ isEditModalOpen, setIsEditModalOpen, tabulatorRef }: EditDataModalProps) => {
    const [form] = Form.useForm()
    const currentValue = tabulatorRef?.current?.current?.getSelectedData()[0]

    const onFinish = (values : TableDataProps) => {
        tabulatorRef?.current?.current?.updateRow(currentValue.id, { ...currentValue, len: values.len, status: values.status, wkt: values.wkt });
        tabulatorRef?.current?.current?.deselectRow();
        setIsEditModalOpen(false);
        form.resetFields();
    };

    useEffect(() => {
        form.setFieldsValue({
            len: currentValue?.len,
            status: currentValue?.status,
            wkt: currentValue?.wkt,
        });
    }, [currentValue, form]);

    return (
        <Modal forceRender open={isEditModalOpen} onCancel={() => setIsEditModalOpen(false)} footer={null} getContainer={false}>
            <h1 className='text-2xl font-bold my-5'>Edit Data</h1>
            <Form
                onFinish={onFinish}
                labelCol={{ span: 24, offset: 0 }}
                autoComplete="off"
                form={form}
            >
                <Form.Item
                    label="Add Len (only numbers)"
                    name="len"
                    rules={[{ required: true, message: 'only numbers' }]}
                >
                    <InputNumber className='w-full' />
                </Form.Item>

                <Form.Item
                    label="Select Status"
                    rules={[{ required: true, message: 'Select Status' }]}
                    name="status"
                >
                    <Select>
                        <Select.Option value="0">0</Select.Option>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Add WKT"
                    name="wkt"
                    rules={[{ required: true, message: 'Add WKT' }]}
                >
                    <Input />
                </Form.Item>

                <div className='flex justify-end gap-3'>
                    <Button type="primary" danger htmlType="button" className='w-20' onClick={() => setIsEditModalOpen(false)}>
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

export default EditDataModal

