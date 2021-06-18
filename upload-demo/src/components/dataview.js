import React, {useEffect, useState, useContext, Component} from "react";
import { GlobalContext } from "../context/globalcontext";
import DataTable from  'react-data-table-component'
import _, { cond, random } from 'lodash';
import { Loader } from "./progress";
import apiConfig from '../config.json';
import TableFiltter from './filter'
import {OverlayTrigger} from 'react-bootstrap'

const columns = [
    {
      name: "City",
      selector: "city",
      sortable: true
    },
    {
      name: "Latitude",
      selector: "latitude",
      sortable: true
    },
    {
      name: "Longitude",
      selector: "longitude",
      sortable: true,
      right: true
    }, {
        name:"Country",
        selector: "country",
        sortable: true,
        right: true
    },
    {
        name:"Citycode",
        selector: "citycode",
        sortable: true,
        right: true
    },
    {
        name:"Density",
        selector: "density",
        sortable: true,
        right: true
    },
    {
        name:"Timezone",
        selector: "timezone",
        sortable: true,
        right: true
    }
  ];

export function DataView() {    
    const {id , reset} = useContext(GlobalContext);
    let [data,setData] = useState();
    let [tempData,setTempData] = useState();
    let [totalRows,setTotalRows] = useState(1000);
    let [countPerPage,setPerPageCount] = useState(25);
    let [currentpage, setPage] = useState(1);
    let [sourtColumnState,setSortColumn] = useState(null);
    let [sortDirectionState,setSortDirection] = useState(null);
    let [searchKey, setSearchKey] = useState('');
    let [Dataloading,SetDataLoading] = useState(false);
    let [filters, setFilterAttr] = useState({});

    const getData = async (offset = 0, count = 25,sortcolumn=null,sortDirection="ASC",search = '') => {
        SetDataLoading(true);
        
        let url = `${apiConfig.baseurl}/data?id=${id}&offset=${offset}&count=${count}`;

        if(sortcolumn != null || sourtColumnState != null) {
            url += `&field=${sortcolumn || sourtColumnState}&sort=${sortDirection || sortDirectionState}`
        }

        if(search != '' || searchKey != (null || '')) {
            url += `&query=${searchKey || search}`
        }

        let res = await fetch(url);
        const rawdata =  await res.json();
        setData(rawdata.data);
        setTotalRows(rawdata.count);
        SetDataLoading(false);
        setTempData(rawdata.data);
        return rawdata;
    }

    const handlePageChange = (currentpage) => {
        console.log(currentpage);
        setPage(currentpage);
        //getData(countPerPage * (currentpage -1), countPerPage);
    }

    const handleRowPerPageChange =  (count, currentpage) => {
        console.log(count , currentpage)
        setPerPageCount(count);
        getData(count * (currentpage -1),count);
    }

    const handleSort = (column,sortdirection,event) => {
        console.log(column,sortdirection,event);
        setSortColumn(column.selector)
        setSortDirection(sortdirection)
        getData(countPerPage * (currentpage -1), countPerPage,column.selector,sortdirection)
    }

    const search = (event) => {
        const key = event.target.value
        setSearchKey(key);
    }

    const Applyfilter = (filter) => {
        console.log(tempData)
        if(!tempData)
            return; 
        
        if(Object.keys(filter).length < 1)
            return;

        let temp = tempData.filter(el => {
            let bool = true;
            for(const [key,value] of Object.entries(filter)){
                if(value && value != "") {
                    bool = bool && el[key].toString().toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
                }
            }
            return bool;
        })
        console.log(temp);
        setData(temp);
        setTotalRows(temp.length);
        console.log("applying filter");
    }

    const HandleFilter = (key,value) => {
        const temp = filters;
        temp[key]=value
        setFilterAttr(temp);
        Applyfilter(temp);
    }

    const ResetFilter = () => {
        setFilterAttr({})
        getData()
     }
   

    useEffect(() => {
        getData(countPerPage * (currentpage -1), countPerPage, null, null,'')
    },[searchKey,currentpage])

    useEffect(() =>{
        getData();
    },[])

    return(
        <section className="vh-100 w-100 bg-light">
            <article className="p-3">
                <article className="my-4 row">
                    <div className="col-8">
                        <div class="input-group w-25"> 
                            <input onChange={_.debounce(search,500)} type="search" placeholder="Search.." class="form-control"/>
                        </div>
                    </div>
                    <div className="offset-1 col-2 d-flex justify-content-end">
                    <OverlayTrigger trigger="click" placement="right" overlay={<TableFiltter filterHandler={HandleFilter} restHandler={ResetFilter}/>}>
                        <button variant="success" class="btn btn-secondary px-4 py-0">filters</button>
                    </OverlayTrigger>
                    </div>
                    <div className="col justdy-content-end d-flex justify-content-end">
                        <button type="button" className="btn-close align-self-center" aria-label="Close" onClick={reset}></button>
                    </div>
                </article>

                

                <DataTable 
                title="Data"
                className="shadow"
                columns={columns}
                data={data}
                highlightOnHover
                striped
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                paginationRowsPerPageOptions={[2,25,50,75,100,500]}
                paginationDefaultPage={currentpage}
                paginationPerPage={countPerPage}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleRowPerPageChange}
                paginationServer
                selectableRows
                sortServer
                onSort={handleSort}
                progressPending ={Dataloading}
                progressComponent={<Loader/>}
                highlightOnHover
                />

            </article>
        </section>
    )
}  
