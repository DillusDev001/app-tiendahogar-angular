import { Persona } from "../../persona-module/persona/persona.interface";
import { ColumnSort } from "../../../../interfaces/column-sort.interface";

export interface Depositante {

    ci: string;
    ocupacion: string;
    sector: string;
    nota: string;
    fec_mod: string;
    user_mod: string;
    estado: number;

    persona: Persona;

}

let tableHeader: ColumnSort[] = [
    {
        column: 'nombres',
        icon: 'fa-solid fa-sort-up fa-lg',
        style: 'text-color-white cursor-pointer transition-opacity duration-500 opacity-0 hover:opacity-100',
        sort: 'asc',
        selected: true
    },
    {
        column: 'apellidos',
        icon: 'fa-solid fa-sort-up fa-lg',
        style: 'text-color-white cursor-pointer transition-opacity duration-500 opacity-0 hover:opacity-100',
        sort: 'asc',
        selected: true
    },
    {
        column: 'ci',
        icon: 'fa-solid fa-sort-up fa-lg',
        style: 'text-color-white cursor-pointer',
        sort: 'asc',
        selected: false
    },
]


const Methods = {
    tableSortView(index: number) {
        // cambiar los valores a index
        if (tableHeader[index].selected) {
            tableHeader[index].sort = tableHeader[index].sort === 'asc' ? 'desc' : 'asc';
            tableHeader[index].icon = tableHeader[index].sort === 'asc' ? 'fa-solid fa-sort-up fa-lg' : 'fa-solid fa-sort-down fa-lg';
        } else {
            tableHeader[index].style = 'text-color-white cursor-pointer';
            tableHeader[index].selected = true;
        }


        tableHeader = tableHeader.map((header, i) => {
            if (i !== index) {
                return {
                    ...header,
                    icon: 'fa-solid fa-sort-up fa-lg',
                    style: 'text-color-white cursor-pointer transition-opacity duration-500 opacity-0 hover:opacity-100',
                    sort: 'asc',
                    selected: false
                };
            } else {
                return {
                    ...header
                };
            }
        });
    },

    getColumn(index: number): string {
        return tableHeader[index].column;
    },

    getIcon(index: number): string {
        return tableHeader[index].icon;
    },

    getStyle(index: number): string {
        return tableHeader[index].style;
    },

    getSort(index: number): string {
        return tableHeader[index].sort;
    },

    sortDepositante(column: string, orderBy: string, data: Depositante[]): Depositante[] {

        let dataReturn = [] as Depositante[];
        switch (column) {
            case 'ci':
                return data.sort((a, b) => orderBy === 'asc' ? a.ci.localeCompare(b.ci) : b.ci.localeCompare(a.ci));

            case 'nombres':
                return data.sort((a, b) => orderBy === 'asc' ? a.persona.nombres.localeCompare(b.persona.nombres) : b.persona.nombres.localeCompare(a.persona.nombres));

            case 'apellidos':
                return data.sort((a, b) => orderBy === 'asc' ? a.persona.apellidos.localeCompare(b.persona.apellidos) : b.persona.apellidos.localeCompare(a.persona.apellidos));

            default:
                return data;

        }
    }
};

// Exporta el objeto `methods`
export { Methods };
