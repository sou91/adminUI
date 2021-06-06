import React from 'react'
import './Pagination.css'
function pagination({ usersPerPage, totalUsers, paginate, currentPage }) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav>
            <ul className='pagination'>
                <li className='page-item'>
                    <a href onClick={() => paginate(1, pageNumbers.length)} className='page-link'>&lt;&lt;</a>
                </li>
                <li className='page-item'>
                    <a href onClick={() => paginate(currentPage - 1, pageNumbers.length)} className='page-link'>&lt;</a>
                </li>
                {pageNumbers.map(number =>
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number, pageNumbers.length)} className={currentPage === number ? 'page-link selected' : 'page-link'}>
                            {number}
                        </a>
                    </li>
                )}
                <li className='page-item'>
                    <a href onClick={() => paginate(currentPage + 1, pageNumbers.length)} className='page-link'>&gt;</a>
                </li>
                <li className='page-item'>
                    <a href onClick={() => paginate(pageNumbers.length, pageNumbers.length)} className='page-link'>&gt;&gt;</a>
                </li>
            </ul>
        </nav>
    )
}

export default pagination
