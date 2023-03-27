import Box from "@mui/system/Box";
import { memo, useState } from "react";
import EditDetails from "./edit-profile/EditProfile";
import { profileObj } from "./u_profile";
import Subtitle from "./subtitle/Subtitle";
import Btn from "../../../../others/btn/Btn";
import { useAppSelector } from "../../../../../store/hooks";
import { UserType } from "../../../../../utils/ts-types/__store/typesUser";

export default memo(function Profile() {
  const [edit, setEdit] = useState(false);
  const { userInfo } = useAppSelector(({ user }) => user);

  const keys = Object.keys(profileObj).map((key) => {
    return key === "phone number" ? "phoneNo" : key;
  }) as (keyof UserType)[];

  return edit ? (
    <EditDetails setEdit={setEdit} />
  ) : (
    <Box>
      <Subtitle
        title="name"
        text={`${userInfo.firstName} ${userInfo.lastName}`}
      />

      {keys.map((key) => (
        <Subtitle
          title={key === "phoneNo" ? "Phone Number" : key}
          text={userInfo[key]}
          key={key}
        />
      ))}

      <Btn onClick={() => setEdit(true)} size="small" sx={{ mt: 2 }}>
        Edit
      </Btn>
    </Box>
  );
});
