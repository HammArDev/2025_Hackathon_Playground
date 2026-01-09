import "./App.css";
import ListGroup from "./components/ListGroup";
import ProfileCard from "./components/ProfileCard";
import ChatBot from "./components/ChatBot";
import CourseCard from "./components/CourseCard";
import Button from "./components/Button";
function App() {
  return (
    <>
      <div>
        <ListGroup />
      </div>
      <div>
        <ProfileCard />
      </div>
      <div>
        <ChatBot />
      </div>
      <div>
        <CourseCard
          name="CS160"
          description="Intermediate Java Programming Course"
          courseNum={324}
        />
      </div>
      <div>
        <CourseCard
          name="STAT250"
          description="Statistical Reasoning"
          courseNum={250}
        />
      </div>
      <Button
        type="outline-warning"
        content="Everything is awesome :)"
        onUserClick={() => alert("What")}
      />
    </>
  );
}
export default App;
