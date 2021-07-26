import React from 'react'

export const Table = ({headers, data}) => {
    return (
        <table className="table table-striped table-hover">
            <thead>
                <tr>
                    {headers.map((header,idx) => <th key={idx}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    data.map((ele, idx) => {
                        return (
                            <tr key={idx}>
                                {headers.map((header, idx) => {
                                   return ele[header] && <td key={idx}>{ele[header]}</td>
                                })}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
