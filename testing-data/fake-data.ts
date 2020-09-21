import { IRootState } from '../src/services';

export const fakeState: IRootState = {
    BillService: {
        tab: 0,
        expanded: {},
        getAllBills: {
            data: [
                {
                    id: 'testid-bill',
                    name: 'Test Bill',
                    categoryId: 1,
                    transactions: [
                        {
                            id: 1,
                            date: '01-01-2020',
                            amount: 100,
                        },
                        {
                            id: 2,
                            date: '02-01-2020',
                            amount: 150,
                        },
                        {
                            id: 3,
                            date: '03-01-2020',
                            amount: 200.53,
                        },
                    ],
                    isBill: true,
                },
                {
                    id: 'testid-pbill',
                    name: 'Test Bill',
                    categoryId: 2,
                    transactions: [
                        {
                            id: 3,
                            date: '01-02-2020',
                            amount: 250,
                        },
                        {
                            id: 4,
                            date: '02-02-2020',
                            amount: 300,
                        },
                        {
                            id: 5,
                            date: '03-02-2020',
                            amount: 350.47,
                        },
                    ],
                    isBill: false,
                }
            ],
            fetching: false,
            error: null,
            formattedError: null,
        },
        getBills: {
            data: [
                {
                    id: 'testid-bill',
                    name: 'Test Bill',
                    categoryId: 1,
                    transactions: [
                        {
                            id: 1,
                            date: '01-01-2020',
                            amount: 100,
                        },
                        {
                            id: 2,
                            date: '02-01-2020',
                            amount: 150,
                        },
                        {
                            id: 3,
                            date: '03-01-2020',
                            amount: 200.53,
                        },
                    ],
                    isBill: true,
                }
            ],
            fetching: false,
            error: null,
            formattedError: null,
        },
        getPBills: {
            data: [
                {
                    id: 'testid-pbill',
                    name: 'Test Bill',
                    categoryId: 2,
                    transactions: [
                        {
                            id: 3,
                            date: '01-02-2020',
                            amount: 250,
                        },
                        {
                            id: 4,
                            date: '02-02-2020',
                            amount: 300,
                        },
                        {
                            id: 5,
                            date: '03-02-2020',
                            amount: 350.47,
                        },
                    ],
                    isBill: false,
                }
            ],
            fetching: false,
            error: null,
            formattedError: null,
        },
        updateBill: {
            data: {},
            fetching: false,
            error: null,
            formattedError: null,
        },
    },
    CategoriesService: {
        get: {
            data: {
                1: {
                    "id": 1,
                    "name": "Phone"
                },
                2: {
                    "id": 2,
                    "name": "TV"
                },
                3: {
                    "id": 3,
                    "name": "Bank Charges"
                },
                4: {
                    "id": 4,
                    "name": "Transport"
                },
                5: {
                    "id": 5,
                    "name": "Groceries"
                },
                6: {
                    "id": 6,
                    "name": "Eating Out"
                },
                7: {
                    "id": 7,
                    "name": "Shopping"
                }
            },
            fetching: false,
            error: null,
            formattedError: null,
        },
    },
};
