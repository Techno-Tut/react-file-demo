import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { Popover } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { GlobalContext } from '../context/globalcontext';


const data = [{}]

export default function TableFiltter({filterHandler,restHandler}) {

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
        filterHandler(key,data);
    }

    const reset =() => {
        document.querySelectorAll('[data-filter]').forEach(el => {
            el.value = '';
        });
        restHandler();
    }

    return(
        <Popover id="popover-contained" className="filter shadow-lg">
            <Popover.Content>
                <section className="">
                    {
                        columns.map(el => {
                            return(
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon3">{el.name}</span>
                                    </div>
                                    {el.cell()}
                                </div>           
                            );
                        })
                    }
                    <input type="button" className="btn btn-danger w-100" value="Reset" onClick={reset}></input>
                </section>
            </Popover.Content>
        </Popover>
    );
}