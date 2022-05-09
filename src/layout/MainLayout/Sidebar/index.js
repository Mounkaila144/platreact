import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {Avatar, Box, ButtonBase, Drawer, Typography, useMediaQuery} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import { BrowserView, MobileView } from 'react-device-detect';

// project imports
import MenuList from './MenuList';
import LogoSection from '../LogoSection';
import MenuCard from './MenuCard';
import { drawerWidth } from 'store/constant';
import {grey} from "@mui/material/colors";
import {useIsAuthenticated, useSignOut} from "react-auth-kit";
import {useNavigate} from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';


// ==============================|| SIDEBAR DRAWER ||============================== //

const Sidebar = ({ drawerOpen, drawerToggle, window }) => {
    const theme = useTheme();
    const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
    const signOut = useSignOut()
    const auth = useIsAuthenticated()

    let navigate = useNavigate();

    const drawer = (
        <>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <Box sx={{ display: 'flex', p: 2, mx: 'auto' }}>
                    <LogoSection />
                </Box>
            </Box>
            <BrowserView>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
                        paddingLeft: '16px',
                        paddingRight: '16px'
                    }}
                >
                    <MenuList />
                    {auth() ?<ButtonBase onClick={signOut} sx={{borderRadius: '12px',marginLeft:3,marginBottom:3 ,overflow: 'hidden'}}>
                            <Avatar
                                variant="square"
                                sx={{
                                    width:200,
                                    height:35,
                                    transition: 'all .2s ease-in-out',
                                    color: theme.palette.secondary.dark,
                                    '&:hover': {
                                        background: "red",
                                        color: theme.palette.secondary.light
                                    }
                                }}

                                color="inherit"
                            >
                                <Typography>Deconnexion</Typography><LoginIcon stroke={1.5} size="1.3rem"/>

                            </Avatar>
                        </ButtonBase>

                        :
                        <ButtonBase sx={{borderRadius: '12px',marginLeft:3, marginBottom:3 , overflow: 'hidden'}}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    width:200,
                                    height:35,
                                    transition: 'all .2s ease-in-out',
                                    color: theme.palette.secondary.dark,
                                    '&:hover': {
                                        background: theme.palette.secondary.dark,
                                        color: theme.palette.secondary.light
                                    }
                                }}
                                onClick={() => navigate(`/login`)}
                                color="inherit"
                            >
                                <Typography>Connexion</Typography><LoginIcon stroke={1.5} size="1.3rem"/>

                            </Avatar>
                        </ButtonBase>
                    }
                    <MenuCard />
                </PerfectScrollbar>
            </BrowserView>
            <MobileView>
                <Box sx={{ px: 2 }}>
                    <MenuList />
                    {auth() ?<ButtonBase onClick={signOut} sx={{borderRadius: '12px',marginLeft:3,marginBottom:3 ,overflow: 'hidden'}}>
                            <Avatar
                                variant="square"
                                sx={{
                                    width:200,
                                    height:35,
                                    transition: 'all .2s ease-in-out',
                                    color: theme.palette.secondary.dark,
                                    '&:hover': {
                                        background: "red",
                                        color: theme.palette.secondary.light
                                    }
                                }}

                                color="inherit"
                            >
                                <Typography>Deconnexion</Typography><LoginIcon stroke={1.5} size="1.3rem"/>

                            </Avatar>
                        </ButtonBase>

                        :
                        <ButtonBase sx={{borderRadius: '12px',marginLeft:3, marginBottom:3 , overflow: 'hidden'}}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    width:200,
                                    height:35,
                                    transition: 'all .2s ease-in-out',
                                    color: theme.palette.secondary.dark,
                                    '&:hover': {
                                        background: theme.palette.secondary.dark,
                                        color: theme.palette.secondary.light
                                    }
                                }}
                                onClick={() => navigate(`/login`)}
                                color="inherit"
                            >
                                <Typography>Connexion</Typography><LoginIcon stroke={1.5} size="1.3rem"/>

                            </Avatar>
                        </ButtonBase>
                    }
                    <MenuCard />
                </Box>
            </MobileView>
        </>
    );

    const container = window !== undefined ? () => window.document.body : undefined;

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, width: matchUpMd ? drawerWidth : 'auto' }} aria-label="mailbox folders">
            <Drawer
                container={container}
                variant={matchUpMd ? 'persistent' : 'temporary'}
                anchor="left"
                open={drawerOpen}
                onClose={drawerToggle}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        background: grey[100],
                        color: "red",
                        borderRight: 'none',
                        [theme.breakpoints.up('md')]: {
                            top: '88px'
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                {drawer}
            </Drawer>
        </Box>
    );
};

Sidebar.propTypes = {
    drawerOpen: PropTypes.bool,
    drawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default Sidebar;
