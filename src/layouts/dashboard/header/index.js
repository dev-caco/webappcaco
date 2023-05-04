import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import logo from '../../../assets/logo.png'
// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 55;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: '#ffffff' }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `100%`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: 55,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {/* <Searchbar /> */}
        {/* INITIAL COMMENT OUT */}

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="left"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <img src={logo} alt="Caco Phone" width ={180} height = {44}/>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
