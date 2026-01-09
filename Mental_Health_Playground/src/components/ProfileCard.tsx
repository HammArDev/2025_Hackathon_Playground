import "./ProfileCard.css";
function ProfileCard() {
  return (
    <>
        <fieldset>
            <p>This information will only be used to set your profile. We'll keep it confidential, trust me.</p>
        </fieldset>
        <fieldset className="UserEntry">
          <legend>Profile</legend>
          <p>
            <label htmlFor="nameInput">Name</label>
            <input type="text" id="nameInput" placeholder="Ex. Patrick Starfish"></input>
          </p>
          <p>
            <label htmlFor="bioInput">Bio</label>
            <textarea id="bioInput" placeholder="Let your creative spirit fly!"></textarea>
        </p>
        </fieldset>
    </>
  );
}
export default ProfileCard;
