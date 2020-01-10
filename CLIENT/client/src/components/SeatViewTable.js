import React from 'react';
class SeatViewTable extends React.Component{
    
    createSeat = () => {
        let table = []
        for (let i = 0; i < this.props.entire_row; i++) {
            let children = []
            for (let j = 0; j < this.props.entire_column; j++) {
                children.push(<td>{`${i+1}${j + 1}`}</td>)
            }
            table.push(<tr>{children}</tr>)
        }
          return table
        }
    
    render(){
        return(
            <div>
                <table>
                    {this.createSeat()}
                </table>
            </div>
        )
    }
}
export default SeatViewTable;