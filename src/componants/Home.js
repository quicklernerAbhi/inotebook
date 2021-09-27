import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

const Home = () => {
  return (
    <div>
      {/* form for adding notes  */}
      <AddNote />
      {/* to show notes  */}
      <Notes />
    </div>
  );
};

export default Home;
