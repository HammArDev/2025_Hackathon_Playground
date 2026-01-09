import './ListGroup.css'
function ListGroup() {
    return <ul className="list-group">
        <li className = "list-group-item custom-list-item-header">Available Health Representative</li>
        <li className = "list-group-item bg-info text-white border-2"> Joe Smith</li>
        <li className = "list-group-item bg-info text-white border-2"> Gerald Carter</li>
        <li className = "list-group-item bg-info text-white border-2"> Henry Calvin</li>
        <li className = "list-group-item bg-info text-white border-2"> George Washington</li>
    </ul>;
}
export default ListGroup;