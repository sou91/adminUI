import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Pagination from './view/pagination/Pagination'
import Table from './view/table/Table'
function App() {
  const [currentUserInfo, setcurrentUserInfo] = useState([]);
  let completeUserInfo = useRef([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLength, setPaginationLength] = useState(0);
  const [isSelectAllChecked, setisSelectAllChecked] = useState(false);
  const usersPerPage = 10;

  useEffect(() => {
    //server call to admin ui response
    fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      .then(res => res.json())
      .then(
        (result) => {
          completeUserInfo.current = result;
          setPaginationLength(result.length);
          paginationSet();
          console.log(result);
        },
        (error) => {
          console.log(error);
        }
      )
  }, []);
  const findUser = (evt) => {
    setCurrentPage(prevVal=>{
      const searchedStr = evt.target.value;
      const indexOfLastUser = prevVal * usersPerPage;
      const indexOfFirstUser = indexOfLastUser - usersPerPage;
      const filteredResp = completeUserInfo.current.filter((obj) => {
        let returnVal=false;
        if (obj.name.includes(searchedStr) || obj.email.includes(searchedStr) || obj.role.includes(searchedStr)) {
          returnVal = true;
        }
        return returnVal;
      })
      const currentUserInfo = filteredResp.slice(indexOfFirstUser, indexOfLastUser);
      setcurrentUserInfo(currentUserInfo);
      setPaginationLength(filteredResp.length);
      return prevVal;
    })
  }
  //change page
  const paginate = (pageNo, totalPages) => {
    if (pageNo <= 0) {
      pageNo = 1;
    } else if (pageNo > totalPages) {
      pageNo = totalPages;
    }
    setCurrentPage(pageNo);
    paginationSet();
    
  };
  const rowSelect=(id,evt) =>{
    const selectedRowIndex = completeUserInfo.current.findIndex((el)=>el.id===id);
    completeUserInfo.current[selectedRowIndex].isSelected=evt.target.checked;
    paginationSet();
  }
  const deleteRow = (id)=>{
    const selectedRowIndex = completeUserInfo.current.findIndex((el)=>el.id===id);
    let completeArr =[...completeUserInfo.current];
    completeArr.splice(selectedRowIndex,1);
    completeUserInfo.current=completeArr;
    setPaginationLength(completeArr.length);
    paginationSet();
  }
  const deleteSelected = ()=>{
    let completeArr =[...completeUserInfo.current];
    for(var i=0; i<=completeArr.length; i++){
      if(completeArr.length>0 && completeArr[i] && completeArr[i].isSelected){
        completeArr.splice(i,1);
        i--;
      }
    }
    completeUserInfo.current=completeArr;
    setPaginationLength(completeArr.length);
    setisSelectAllChecked(false);
    paginationSet();
  }
  const paginationSet=()=>{
    setCurrentPage((prevVal=1)=>{
      const indexOfLastUser = prevVal * usersPerPage;
      const indexOfFirstUser = indexOfLastUser - usersPerPage;
      const currentUserInfo = completeUserInfo.current.slice(indexOfFirstUser, indexOfLastUser);
      setcurrentUserInfo(currentUserInfo);
      return prevVal;
    })
  }
  const rowSelectAll=(evt)=>{
    setCurrentPage((prevVal)=>{
      let range2= prevVal*10-1;
      let range1= prevVal*10-10;
      completeUserInfo.current.forEach((el,index)=>{
        if(range1<=index && index<=range2){
          el.isSelected=evt.target.checked;
        }
      })
    })
    paginationSet();
    setisSelectAllChecked(evt.target.checked);
  }
 const editRow=(id)=>{
    const selectedRowIndex = completeUserInfo.current.findIndex((el)=>el.id===id);
    completeUserInfo.current[selectedRowIndex].isEditable= !completeUserInfo.current[selectedRowIndex].isEditable;
    paginationSet();
 }
  const changeVal = (evt, id) => {
    const inptName= evt.target.name;
    const selectedRowIndex = completeUserInfo.current.findIndex((el)=>el.id===id);
    completeUserInfo.current[selectedRowIndex][inptName]=evt.target.value;
    paginationSet();
  }
  return (
    <div className="App">
      <input className='searchInput' type='text' onChange={findUser} placeholder='Search by name, email or role' />
      <Table userInfo={currentUserInfo} rowSelect={rowSelect} deleteRow={deleteRow} rowSelectAll={rowSelectAll} editRow={editRow} changeVal={changeVal}
      isSelectAllChecked={isSelectAllChecked}/>
      <div className='page-controls'>
        <button class="button" onClick={deleteSelected}>Delete Selected</button>
        <Pagination usersPerPage={usersPerPage} totalUsers={paginationLength} paginate={paginate} currentPage={currentPage}/>
      </div>
    </div>
  );
}

export default App;
