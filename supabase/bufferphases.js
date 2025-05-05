[
    {
        "id": "d6acb7d28e29486a",
        "type": "buffer-parser",
        "z": "85a92599f02a6ce5",
        "name": "",
        "data": "payload",
        "dataType": "msg",
        "specification": "spec",
        "specificationType": "ui",
        "items": [
            {
                "type": "int16be",
                "name": "item1",
                "offset": 0,
                "length": 1,
                "offsetbit": 0,
                "scale": "1",
                "mask": ""
            }
        ],
        "swap1": "",
        "swap2": "",
        "swap3": "",
        "swap1Type": "swap",
        "swap2Type": "swap",
        "swap3Type": "swap",
        "msgProperty": "payload",
        "msgPropertyType": "str",
        "resultType": "keyvalue",
        "resultTypeType": "return",
        "multipleResult": false,
        "fanOutMultipleResult": false,
        "setTopic": true,
        "outputs": 1,
        "x": 930,
        "y": 380,
        "wires": [
            [
                "4697fcb556d7a4c6"
            ]
        ]
    }
]