export interface TableDataProps {
    id?: number
    len?: number
    wkt?: string
    status?: number
}

export interface AddDataModalProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: (value: boolean) => void;
    tabulatorRef: React.MutableRefObject<any>;
}

export interface DeleteModalProps {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (value: boolean) => void;
    tabulatorRef: React.MutableRefObject<any>;
}

export interface EditDataModalProps {
    isEditModalOpen: boolean;
    setIsEditModalOpen: (value: boolean) => void;
    tabulatorRef: React.MutableRefObject<any>;
}

export interface LoadFileModalProps {
    isLoadModalOpen: boolean;
    setIsLoadModalOpen: (value: boolean) => void;
    setTableData: (value: TableDataProps[]) => void;
    tabulatorRef: React.MutableRefObject<any>;
}

export interface TableProps {
    tableData: TableDataProps[];
    setIsDeleteModalOpen: (value: boolean) => void;
    setIsEditModalOpen: (value: boolean) => void;
    setInputError: (value: string) => void;
    tabulatorRef: React.MutableRefObject<any>;
    map: any;
}

export interface MapProps {
    returnRef: any;
    inputError: string;
}

export interface DiagramProps {
    tabulatorRef: React.MutableRefObject<any>;
}