import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import { ColumnDefinition, ReactTabulator } from 'react-tabulator';
import { drawWktFeature, validateGeometry } from './Map/MapHelpers';
import { TableProps } from '../types';

const Table = ({ tableData, setIsDeleteModalOpen, tabulatorRef, setIsEditModalOpen, setInputError, map }: TableProps) => {
    const locationIcon = () => `<button class="icon icon--location"></button>`
    const editIcon = () => `<button class="icon icon--edit"></button>`
    const deleteIcon = () => `<button class="icon icon--delete"></button>`

    const columns: ColumnDefinition[] = [
        { title: 'ID', field: 'id', headerFilter: "input", sorter: "number" },
        { title: 'Len', field: 'len', headerFilter: "input", },
        { title: 'WKT', field: 'wkt', headerFilter: "input" },
        { title: 'Status', field: 'status', headerFilter: "input", },
        {
            title: "", width: 20, formatter: locationIcon,
            cellClick: () => {
                if (tabulatorRef?.current?.current?.getSelectedData()?.length === 1) {
                    const wkt = tabulatorRef?.current?.current?.getSelectedData()[0].wkt
                    const validation = validateGeometry(wkt);
                    if (validation) {
                        drawWktFeature(map, wkt);
                        setInputError("");
                    } else {
                        setInputError("The submitted geometry is not a valid WKT");
                    }
                }
            },
        },
        {
            title: "", width: 20, formatter: editIcon,
            cellClick: () => {
                if (tabulatorRef?.current?.current?.getSelectedData()?.length === 1) {
                    setIsEditModalOpen(true)
                }
            },
        },
        {
            title: "", width: 20, formatter: deleteIcon,
            cellClick: () => {
                if (tabulatorRef?.current?.current?.getSelectedData()?.length === 1) {
                    setIsDeleteModalOpen(true)
                }
            },
        }
    ];

    const options = {
        layout: 'fitColumns',
        pagination: 'local',
        paginationSize: 10,
        paginationSizeSelector: [10, 20, 30, 40],
        initialSort: [{ column: 'id', dir: 'desc' }],
        selectable: 1,
        reactiveData: true,
        minHeight: 310
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