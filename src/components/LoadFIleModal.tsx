import { Modal } from 'antd'
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

const LoadFileModal = ({ isLoadModalOpen, setIsLoadModalOpen, setTableData, tabulatorRef }) => {
    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = new Uint8Array(e.target?.result as ArrayBuffer);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                const formattedData = jsonData.slice(1).map((row) => ({
                    id: Number(row[0]),
                    len: row[1],
                    wkt: row[2],
                    status: row[3],
                }));
                setTableData(() => formattedData)
                tabulatorRef?.current?.current?.setData(formattedData)
                setIsLoadModalOpen(false)
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: '.xlsx',
    });

    return (
        <Modal open={isLoadModalOpen} onCancel={() =>  setIsLoadModalOpen(false)} footer={null}>
            <div  {...getRootProps()} className='border border-dashed border-gray-500 rounded p-8 text-center cursor-pointer mt-8'>
                <input {...getInputProps()} />
                <p>Drag & drop an Excel file here, or click to select one</p>
            </div>
        </Modal>
    )
}

export default LoadFileModal

