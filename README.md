# MyWorkspace

This is a repository contains API for created using TypeScript 3.2,Express,Node js.

## Install

Install the node packages via:

`$ npm install`

And then run the grunt task to compile the TypeScript:

`$ npm run grunt`

## Starting

To start the server run:

`$ npm start`


problem:

 
Get the number of array values based on gendrating array of combination based

Generating Array of combination values based on number of array values and that values store it database, and also below tasks are completed.
1. Show the values in UI
2. Update and Delete the particular values based on user wish.

Kindly Refer the functionality

1. create combination for array

Test cases 1:

Method: POST
Url: http://localhost:6000/combination/createcombination

1. Input:
body:
{
    "color": [
        "blue",
        "yellow",
        "green",
        "red"
    ],
    "size": [
        "small",
        "medium",
        "large"
    ]
}

Output:
    {
    "status": true,
    "code": 200,
    "message": "Success",
    "data": [
        {
            "combination_id": 61,
            "color": "blue",
            "size": "small"
        },
        {
            "combination_id": 62,
            "color": "blue",
            "size": "medium"
        },
        {
            "combination_id": 63,
            "color": "blue",
            "size": "large"
        },
        {
            "combination_id": 64,
            "color": "yellow",
            "size": "small"
        },
        {
            "combination_id": 65,
            "color": "yellow",
            "size": "medium"
        },
        {
            "combination_id": 66,
            "color": "yellow",
            "size": "large"
        },
        {
            "combination_id": 67,
            "color": "green",
            "size": "small"
        },
        {
            "combination_id": 68,
            "color": "green",
            "size": "medium"
        },
        {
            "combination_id": 69,
            "color": "green",
            "size": "large"
        },
        {
            "combination_id": 70,
            "color": "red",
            "size": "small"
        },
        {
            "combination_id": 71,
            "color": "red",
            "size": "medium"
        },
        {
            "combination_id": 72,
            "color": "red",
            "size": "large"
        }
    ]
}

Test cases 2:

input:
body:

    {
    "color": [
        "blue",
        "yellow",
        "green",
        "red"
    ],
    "size": [
        "small",
        "medium",
        "large"
    ],
    "fit":[
         "s",
        "d",
        "f",
        "g"
    ]
}
  output:
    {
    "status": true,
    "code": 200,
    "message": "Success",
    "data": [
        {
            "combination_id": 73,
            "color": "blue",
            "size": "small",
            "fit": "s"
        },
        {
            "combination_id": 74,
            "color": "blue",
            "size": "small",
            "fit": "d"
        },
        {
            "combination_id": 75,
            "color": "blue",
            "size": "small",
            "fit": "f"
        },
        {
            "combination_id": 76,
            "color": "blue",
            "size": "small",
            "fit": "g"
        },
        {
            "combination_id": 77,
            "color": "blue",
            "size": "medium",
            "fit": "s"
        },
        {
            "combination_id": 78,
            "color": "blue",
            "size": "medium",
            "fit": "d"
        },
        {
            "combination_id": 79,
            "color": "blue",
            "size": "medium",
            "fit": "f"
        },
        {
            "combination_id": 80,
            "color": "blue",
            "size": "medium",
            "fit": "g"
        },
        {
            "combination_id": 81,
            "color": "blue",
            "size": "large",
            "fit": "s"
        },
        {
            "combination_id": 82,
            "color": "blue",
            "size": "large",
            "fit": "d"
        },
        {
            "combination_id": 83,
            "color": "blue",
            "size": "large",
            "fit": "f"
        },
        {
            "combination_id": 84,
            "color": "blue",
            "size": "large",
            "fit": "g"
        },
        {
            "combination_id": 85,
            "color": "yellow",
            "size": "small",
            "fit": "s"
        },
        {
            "combination_id": 86,
            "color": "yellow",
            "size": "small",
            "fit": "d"
        },
        {
            "combination_id": 87,
            "color": "yellow",
            "size": "small",
            "fit": "f"
        },
        {
            "combination_id": 88,
            "color": "yellow",
            "size": "small",
            "fit": "g"
        },
        {
            "combination_id": 89,
            "color": "yellow",
            "size": "medium",
            "fit": "s"
        },
        {
            "combination_id": 90,
            "color": "yellow",
            "size": "medium",
            "fit": "d"
        },
        {
            "combination_id": 91,
            "color": "yellow",
            "size": "medium",
            "fit": "f"
        },
        {
            "combination_id": 92,
            "color": "yellow",
            "size": "medium",
            "fit": "g"
        },
        {
            "combination_id": 93,
            "color": "yellow",
            "size": "large",
            "fit": "s"
        },
        {
            "combination_id": 94,
            "color": "yellow",
            "size": "large",
            "fit": "d"
        },
        {
            "combination_id": 95,
            "color": "yellow",
            "size": "large",
            "fit": "f"
        },
        {
            "combination_id": 96,
            "color": "yellow",
            "size": "large",
            "fit": "g"
        },
        {
            "combination_id": 97,
            "color": "green",
            "size": "small",
            "fit": "s"
        },
        {
            "combination_id": 98,
            "color": "green",
            "size": "small",
            "fit": "d"
        },
        {
            "combination_id": 99,
            "color": "green",
            "size": "small",
            "fit": "f"
        },
        {
            "combination_id": 100,
            "color": "green",
            "size": "small",
            "fit": "g"
        },
        {
            "combination_id": 101,
            "color": "green",
            "size": "medium",
            "fit": "s"
        },
        {
            "combination_id": 102,
            "color": "green",
            "size": "medium",
            "fit": "d"
        },
        {
            "combination_id": 103,
            "color": "green",
            "size": "medium",
            "fit": "f"
        },
        {
            "combination_id": 104,
            "color": "green",
            "size": "medium",
            "fit": "g"
        },
        {
            "combination_id": 105,
            "color": "green",
            "size": "large",
            "fit": "s"
        },
        {
            "combination_id": 106,
            "color": "green",
            "size": "large",
            "fit": "d"
        },
        {
            "combination_id": 107,
            "color": "green",
            "size": "large",
            "fit": "f"
        },
        {
            "combination_id": 108,
            "color": "green",
            "size": "large",
            "fit": "g"
        },
        {
            "combination_id": 109,
            "color": "red",
            "size": "small",
            "fit": "s"
        },
        {
            "combination_id": 110,
            "color": "red",
            "size": "small",
            "fit": "d"
        },
        {
            "combination_id": 111,
            "color": "red",
            "size": "small",
            "fit": "f"
        },
        {
            "combination_id": 112,
            "color": "red",
            "size": "small",
            "fit": "g"
        },
        {
            "combination_id": 113,
            "color": "red",
            "size": "medium",
            "fit": "s"
        },
        {
            "combination_id": 114,
            "color": "red",
            "size": "medium",
            "fit": "d"
        },
        {
            "combination_id": 115,
            "color": "red",
            "size": "medium",
            "fit": "f"
        },
        {
            "combination_id": 116,
            "color": "red",
            "size": "medium",
            "fit": "g"
        },
        {
            "combination_id": 117,
            "color": "red",
            "size": "large",
            "fit": "s"
        },
        {
            "combination_id": 118,
            "color": "red",
            "size": "large",
            "fit": "d"
        },
        {
            "combination_id": 119,
            "color": "red",
            "size": "large",
            "fit": "f"
        },
        {
            "combination_id": 120,
            "color": "red",
            "size": "large",
            "fit": "g"
        }
    ]
}


---------------------------------------------Get all Combination---------------------------------------------

    Url: http://localhost:6000/combination/getall
    Method: GET

Input:

Output:
{
    "status": true,
    "code": 200,
    "message": "Success",
    "data": [
        {
            "combination_id": 61,
            "color": "blue",
            "size": "small"
        },
        {
            "combination_id": 62,
            "color": "blue",
            "size": "medium"
        },
        {
            "combination_id": 63,
            "color": "blue",
            "size": "large"
        },
        {
            "combination_id": 64,
            "color": "yellow",
            "size": "small"
        },
        {
            "combination_id": 65,
            "color": "yellow",
            "size": "medium"
        },
        {
            "combination_id": 66,
            "color": "yellow",
            "size": "large"
        },
        {
            "combination_id": 67,
            "color": "green",
            "size": "small"
        },
        {
            "combination_id": 68,
            "color": "green",
            "size": "medium"
        },
        {
            "combination_id": 69,
            "color": "green",
            "size": "large"
        },
        {
            "combination_id": 70,
            "color": "red",
            "size": "small"
        },
        {
            "combination_id": 71,
            "color": "red",
            "size": "medium"
        },
        {
            "combination_id": 72,
            "color": "red",
            "size": "large"
        }
    ]
}
----------------------------------------------GetById Combination Api----------------------------------------

Url:http://localhost:6000/combination/getone?combination_id=120
query: 
  combination_id: 120
Method: GET

Input:

Output: 
{
    "status": true,
    "code": 200,
    "message": "Success",
    "data": {
        "combination_id": 120,
        "color": "red",
        "size": "large",
        "fit": "g"
    }
}

---------------------------------------------Update Combination api------------------------------------------

Url: http://localhost:6000/combination/update?combination_id=72
query: 
  combination_id: 120
Method: PUT

Input: 
body:
 {
    "color": "orange",
    "size": "medium"
}

Output:
{
    "status": true,
    "code": 200,
    "message": "Success",
    "data": [
        1
    ]
}

----------------------------------------------Delete Combination Api-----------------------------------------


Url: http://localhost:6000/combination/delete?combination_id=62
query: 
  combination_id: 62
Method: DELTE

Input: 

Output:
{
    "status": true,
    "code": 200,
    "message": "Success",
    "data": {
        "message": "Data deleted"
    }
}