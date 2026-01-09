interface ButtonProps{
    type: String;
    content: String;
    onUserClick: ()=>void;
}
function Button({type, content, onUserClick}: ButtonProps){
    function createButton(){
        let awesome = "btn btn-";
        awesome+=type;
        return <button type="button" className={awesome} onClick={onUserClick}>{content}</button>
    }
    return(
        createButton()
    );
}
export default Button;