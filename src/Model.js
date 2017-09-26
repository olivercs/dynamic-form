const model = [
    {
        'name': 'questions1',
        'props': {
            'className': 'container-col-3'
        },
        'type': 'Container'
    },
    {
        'parent': 'questions1',
        'name': 'fruits2',
        'type': 'Dropdown',
        'props': {
            'options': [{ name: 'Apple', id: 1 }, { name: 'Pear', id: 2 }]
        }
    },
    {
        'parent': 'questions1',
        'name': 'name3',
        'type': 'TextField',
        'validations': [['equals', '', true], ['isDecimal']],
    },
    {
        'parent': 'questions1',
        'name': 'fruits4',
        'type': 'Dropdown',
        'props': {
            'options': [{ name: 'Apple', id: 1 }, { name: 'Pear', id: 2 }]
        }
    },
    {
        'parent': 'questions1',
        'name': 'name6',
        'type': 'Container',
        'props': {
            'className': 'container-col-2'
        }
    },
    {
        'parent': 'name6',
        'name': 'fruits7',
        'type': 'Dropdown',
        'props': {
            'options': [{ name: 'Apple', id: 1 }, { name: 'Pear', id: 2 }]
        }
    },
    {
        'parent': 'name6',
        'name': 'name8',
        'type': 'TextField',
        'validations': [['isEmail']]
    },
    {
        'parent': 'questions1',
        'name': 'fruits9',
        'type': 'Dropdown',
        'props': {
            'options': [{ name: 'Apple', id: 1 }, { name: 'Pear', id: 2 }]
        }
    }
];

export default model;