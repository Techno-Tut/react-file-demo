import _ from 'lodash';
import React, { useContext, useState } from 'react';
import DataTable from 'react-data-table-component';
import { GlobalContext } from '../context/globalcontext';


const data = [{}]

export default function TableFiltter() {
    let {filter ,setFilterAttr} = useContext(GlobalContext);

    const columns = [
        {
            name:"city",
            cell: row => <input className="form-control" data-filter="city" type="search" onChange={_.debounce(handleFilterChange,500)}></input>
        },
        {
            name: "Latitude",
            cell: row => <input className="form-control" data-filter="latitude" type="search" onChange={_.debounce(handleFilterChange,500)}></input>
        },
        {
            name: "Longitude",
            cell: row => <input className="form-control" data-filter="longitude" type="search" onChange={_.debounce(handleFilterChange,500)}></input>
        }, 
        {
            name:"Country",
            cell: row => <input className="form-control" data-filter="country" type="search" onChange={_.debounce(handleFilterChange,500)}></input>
        },
        {
            name:"Citycode",
            cell: row => <input className="form-control" data-filter="citycode" type="search" onChange={_.debounce(handleFilterChange,500)}></input>
        },
        {
            name:"Density",
            cell: row => <input className="form-control" data-filter="density" type="search" onChange={_.debounce(handleFilterChange,500)}></input>
        },
        {
            name:"Timezone",
            cell: row => <input className="form-control" data-filter="timezone" type="search" onChange={_.debounce(handleFilterChange,500)}></input>
        }
        ];
    
    const handleFilterChange = (event) => {
        let el = event.target;
        let data = el.value;
        let key = el.getAttribute("data-filter")
        setFilterAttr(key,data);
        console.log(data,key);
    }

    return(
        <section>
            <DataTable 
            title="Filter"
            className="shadow"
            columns={columns}
            data={data}
            />
        </section>
    );
}