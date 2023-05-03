import Box from "@mui/material/Box";
import Link from "next/link";
import { StyledListItem, socialContact } from "./u_socialContacts";

const SocialContacts = () => (
  <Box sx={{ display: "flex" }}>
    {socialContact.map(({ color, Icon, href }) => (
      <StyledListItem key={color} sx={{ mr: { xs: 2, md: 3 }, color: color }}>
        <Link href={href}>
          <Icon />
        </Link>
      </StyledListItem>
    ))}
  </Box>
);

export default SocialContacts;
