import './Table.css'
import React, { useState, useEffect } from 'react';
import editImg from '../../assets/edit.svg';
import deleteImg from '../../assets/delete.svg'
function Table({ userInfo, rowSelect, deleteRow, rowSelectAll, editRow, changeVal, isSelectAllChecked }) {
    const [tableInfo, settableInfo] = useState([]);
    useEffect(() => {
        const tableInfo = [...userInfo];
        settableInfo(tableInfo);
    }, [userInfo])
    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th><input type="checkbox" onChange={(evt) => rowSelectAll(evt)} checked={isSelectAllChecked} /></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableInfo.map((user) => {
                            return (
                                <tr key={user.id} className={user.isSelected ? 'row-selected' : ''}>
                                    <td><input type="checkbox" checked={user.isSelected} onChange={(evt) => rowSelect(user.id, evt)} /></td>
                                    <td>
                                        {
                                            user.isEditable
                                                ?
                                                <input type='text' value={user.name} onChange={(evt) => changeVal(evt, user.id)} name='name' />
                                                :
                                                user.name
                                        }
                                    </td>
                                    <td>
                                        {
                                            user.isEditable
                                                ?
                                                <input type='text' value={user.email} onChange={(evt) => changeVal(evt, user.id)} name='email' />
                                                :
                                                user.email
                                        }
                                    </td>
                                    <td>
                                        {
                                            user.isEditable
                                                ?
                                                <input type='text' value={user.role} onChange={(evt) => changeVal(evt, user.id)} name='role' />
                                                :
                                                user.role
                                        }
                                    </td>
                                    <td>
                                        <img
                                            src={editImg}
                                            onClick={() => { editRow(user.id) }} 
                                            alt='edit'/>
                                        <img
                                            src={deleteImg}
                                            onClick={() => deleteRow(user.id)} 
                                            alt='delete'/>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table
