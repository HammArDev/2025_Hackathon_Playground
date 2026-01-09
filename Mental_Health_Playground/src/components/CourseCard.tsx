import { useState } from "react";

interface Props{
    name: String;
    description: String;
    courseNum: number;
}
function CourseCard(props: Props){
    const [inc, setInc] = useState(0);
    const jump = () => setInc(inc+4);
    return(
    <>
    <div><h1>{props.name}--{props.courseNum+inc}</h1></div>
    {jump}
    <div><p>{props.description}</p></div>
    </>
    );
}
export default CourseCard;