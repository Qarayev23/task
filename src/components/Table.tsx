import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import { ReactTabulator } from 'react-tabulator';

const Table = ({ tableData, setIsDeleteModalOpen, tabulatorRef, setIsEditModalOpen }) => {
    const locationIcon = () => `<button class="icon icon--location"></button>`
    const editIcon = () => `<button class="icon icon--edit"></button>`
    const deleteIcon = () => `<button class="icon icon--delete"></button>`

    const columns = [
        { title: 'ID', field: 'id', headerFilter: "input", sorter: "number" },
        { title: 'Len', field: 'len', headerFilter: "input" },
        { title: 'WKT', field: 'wkt', headerFilter: "input" },
        { title: 'Status', field: 'status', headerFilter: "input" },
        {
            title: false, field: false, headerFilter: false, width: 20, formatter: locationIcon,
            cellClick: function () {

            },
        },
        {
            title: false, field: false, headerFilter: false, width: 20, formatter: editIcon,
            cellClick: function () {
                const selectedDataLength = tabulatorRef.current.current.getSelectedData().length
                if (selectedDataLength > 0 && selectedDataLength < 2) {
                    setIsEditModalOpen(true)
                }
            },
        },
        {
            title: false, field: false, headerFilter: false, width: 20, formatter: deleteIcon,
            cellClick: function () {
                if (tabulatorRef.current.current.getSelectedData().length === 1) {
                    setIsDeleteModalOpen(true)
                }
            },
        }
    ];

    const options = {
        layout: 'fitColumns',
        pagination: 'local',
        paginationSize: 20,
        paginationSizeSelector: [10, 20, 30, 40],
        initialSort: [{ column: 'id', dir: 'desc' }],
        selectable: true,
        reactiveData: true,
    }

    return (
        <ReactTabulator
            onRef={ref => (tabulatorRef.current = ref)}
            data={tableData}
            columns={columns}
            options={options}

        />
    )
}

export default Table