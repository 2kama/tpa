import React from 'react'

export const Table = ({headers, data}) => {
    return (
        <div className="table-responsive">

        <table className="table">
            <thead>
                <tr>
                    {headers.map((header,idx) => <th key={idx}>{header.headerText || header.dataKey}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    data.map((ele, idx) => {
                        return (
                            <tr key={idx}>
                                {headers.map((header, idx) => {
                                   return ele[header.dataKey] && <td key={idx}>{ele[header.dataKey]}</td>
                                })}
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

        </div>
        
    )
}
