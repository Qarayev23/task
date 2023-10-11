import { useRef, useState } from 'react';
import { Button } from 'antd';
import LoadFileModal from './components/Modals/LoadFIleModal';
import AddDataModal from './components/Modals/AddDataModal';
import Table from './components/Table';
import EditDataModal from './components/Modals/EditDataModal';
import DeleteModal from './components/Modals/DeleteModal';
import Diagram from './components/Diagram';
import MapComponent from './components/Map/Map';
import { TableDataProps } from './types';

function App() {
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [inputError, setInputError] = useState("");
  const [tableData, setTableData] = useState<TableDataProps[]>([]);
  const [map, setMap] = useState(null);
  const tabulatorRef = useRef<React.MutableRefObject<any>>(null);

  return (
    <div className='m-5'>
      <div className='flex gap-3 mb-5'>
        <Button type="primary" onClick={() => setIsLoadModalOpen(true)}>Load Excel File</Button>
        {
          tabulatorRef?.current?.current?.getData(true).length > 0 &&
          <Button type="primary" onClick={() => setIsAddModalOpen(true)}>Add New Data</Button>
        }
      </div>
      <div className='flex flex-col lg:flex-row gap-3'>
        <div className='w-full lg:w-1/2'>
          <Table
            tabulatorRef={tabulatorRef}
            tableData={tableData}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            setInputError={setInputError}
            map={map}
          />
        </div>
        <div className='w-full lg:w-1/2'>
          <MapComponent returnRef={setMap} inputError={inputError} />
        </div>
      </div>
      {tabulatorRef?.current?.current?.getData(true).length > 0 && <Diagram tabulatorRef={tabulatorRef} />}
      <LoadFileModal
        isLoadModalOpen={isLoadModalOpen}
        setIsLoadModalOpen={setIsLoadModalOpen}
        setTableData={setTableData}
        tabulatorRef={tabulatorRef} />
      <AddDataModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        tabulatorRef={tabulatorRef} />
      <EditDataModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        tabulatorRef={tabulatorRef} />
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        tabulatorRef={tabulatorRef} />
    </div>
  );
}

export default App;