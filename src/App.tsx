import { useRef, useState } from 'react';
import { Button } from 'antd';
import LoadFileModal from './components/LoadFIleModal';
import AddDataModal from './components/AddDataModal';
import Table from './components/Table';
import EditDataModal from './components/EditDataModal';
import DeleteModal from './components/DeleteModal';
import { Pie } from 'react-chartjs-2';
import Diagram from './components/Diagram';

function App() {
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tableData, setTableData] = useState<any[]>([]);
  const tabulatorRef = useRef(null);

  return (
    <div className='m-7'>
      <div className='flex gap-3 mb-5'>
        <Button type="primary" onClick={() => setIsLoadModalOpen(true)}>Load Excel File</Button>
        {tableData.length > 0 &&
          <Button type="primary" onClick={() => setIsAddModalOpen(true)}>Add New Data</Button>
        }
      </div>
      <LoadFileModal isLoadModalOpen={isLoadModalOpen} setIsLoadModalOpen={setIsLoadModalOpen} setTableData={setTableData} tabulatorRef={tabulatorRef} />
      <AddDataModal isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} tabulatorRef={tabulatorRef} />
      <EditDataModal isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} tabulatorRef={tabulatorRef} />
      <DeleteModal isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} tabulatorRef={tabulatorRef} />
      <Table tabulatorRef={tabulatorRef} tableData={tableData} setIsDeleteModalOpen={setIsDeleteModalOpen} setIsEditModalOpen={setIsEditModalOpen}/>
      {
        tableData.length > 0 &&
        <Diagram tabulatorRef={tabulatorRef} />
      }
    </div>
  );
}

export default App;

