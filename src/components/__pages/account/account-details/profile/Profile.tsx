import Box from "@mui/system/Box";
import { memo, useState } from "react";
import EditDetails from "./edit-profile/EditProfile";
import { mockProfile } from "./u_profile";
import Subtitle from "./subtitle/Subtitle";
import Btn from "../../../../others/btn/Btn";

export default memo(function Profile() {
  const [edit, setEdit] = useState(false);

  return edit ? (
    <EditDetails setEdit={setEdit} />
  ) : (
    <Box>
      <Subtitle title="name" text="john doe" key="john doe" />
      {Object.entries(mockProfile).map(([title, text]) => (
        <Subtitle title={title} text={text} key={title} />
      ))}
      <Btn onClick={() => setEdit(true)} size="small" sx={{ mt: 2 }}>
        Edit
      </Btn>
    </Box>
  );
});
