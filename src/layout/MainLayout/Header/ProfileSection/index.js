import {useState, useRef, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

// material-ui
import {styled, useTheme} from '@mui/material/styles';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    InputAdornment,
    List, ListItem, ListItemAvatar,
    ListItemButton,
    ListItemIcon, ListItemSecondaryAction,
    ListItemText,
    OutlinedInput,
    Paper,
    Popper,
    Stack,
    Switch,
    Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';
import User1 from 'assets/images/users/user-round.svg';
import Profile from 'assets/profile.jpg'

// assets
import {IconLogout, IconMenu2, IconSearch, IconSettings, IconUser} from '@tabler/icons';
import CallIcon from '@mui/icons-material/Call';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmailIcon from '@mui/icons-material/Email';
import axios from "axios";
import PersonPinIcon from '@mui/icons-material/PersonPin';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {grey, yellow} from "@mui/material/colors";

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

    const [sdm, setSdm] = useState(true);
    const [value, setValue] = useState('');
    const [notification, setNotification] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [aalert, setAlert] = useState(false)
    const [c, setC] = useState(0);
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    const url = `https://admin.allcine227.com/api/users/${id}`


    const getData = async () => {
        axios
            .get(url, {
                headers: {
                    "name": "",
                    "password": ""
                }
            })
            .then(
                (res) => {
                    setProduct(res.data);

                },
                (error) => {
                    setIsLoaded(true);
                }
            )
    }

    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);
    const handleLogout = async () => {
        console.log('Logout');
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        getData()
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    const ListItemWrapper = styled('div')(({theme}) => ({
        cursor: 'pointer',
        padding: 16,
        '&:hover': {
            background: theme.palette.primary.light
        },
        '& .MuiListItem-root': {
            padding: 0
        }
    }));

    return (
        <>
            <Chip
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        src={`https://admin.allcine227.com/profile/${product.imageName}`}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main}/>}
                variant="outlined"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="primary"
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({TransitionProps}) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow
                                          shadow={theme.shadows[16]}>
                                    <Typography sx={{
                                        fontSize: 18,
                                        color: 'black',
                                        marginTop: 2,
                                        marginLeft: 1,
                                        fontFamily: 'arial'
                                    }}>Profile d'utilisateur</Typography>

                                    <ListItemWrapper>
                                        <ListItem alignItems="center">

                                            <ListItemAvatar>

                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={`https://admin.allcine227.com/profile/${product.imageName}`}
                                                    style={{alignSelf: "center"}}
                                                    sx={{width: 80, height: 80, marginTop: 2, marginLeft: 1}}
                                                />

                                            </ListItemAvatar>

                                            <ListItemText primary={<Typography sx={{
                                                fontSize: 25,
                                                color: 'black',
                                                marginLeft: 1,
                                                fontFamily: 'arial'
                                            }}
                                                                               variant="subtitle1">{product.nom}</Typography>}
                                                          secondary={
                                                              <Stack direction={'row'} alignItems={'center'} gap={1}>
                                                                  <EmailIcon sx={{marginLeft: 1}}/>
                                                                  <Typography sx={{
                                                                      fontSize: 16,
                                                                      fontFamily: 'arial'
                                                                  }}
                                                                              variant="subtitle1">{product.email}
                                                                  </Typography>
                                                              </Stack>}
                                            />


                                        </ListItem>
                                        <Divider/>
                                        <ListItem alignItems="center" sx={{marginTop:2}}>

                                            <ListItemAvatar>

                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        width: 60,
                                                        height:50,
                                                        ...theme.typography.commonAvatar,
                                                        transition: 'all .2s ease-in-out',
                                                        background: grey[800],
                                                        color: theme.palette.secondary.dark,
                                                        '&:hover': {
                                                            background: theme.palette.secondary.dark,
                                                            color: theme.palette.secondary.light
                                                        }
                                                    }}
                                                    color="inherit"
                                                >
                                                    <MonetizationOnIcon stroke={1.5} sx={{width:80,color:yellow[200]}}/>
                                                </Avatar>

                                            </ListItemAvatar>

                                            <ListItemText primary={<Typography sx={{
                                                fontSize: 22,
                                                color: yellow[700],
                                                marginLeft: 1,
                                                fontFamily: 'arial'
                                            }}
                                                                               variant="subtitle1">Solde: {product.solde} CFA</Typography>}
                                                          secondary={
                                                              <Typography sx={{
                                                                  fontSize: 16,
                                                                  fontFamily: 'arial',
                                                                  marginLeft: 1,
                                                              }}
                                                                          variant="subtitle1">{"Expire dans 24H"}
                                                              </Typography>}/>


                                        </ListItem>
                                        <Divider/>
                                        <ListItem alignItems="center" sx={{marginTop:2}}>

                                            <ListItemAvatar>

                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        width: 60,
                                                        height:50,
                                                        ...theme.typography.commonAvatar,
                                                        transition: 'all .2s ease-in-out',
                                                        background: grey[800],
                                                        color: theme.palette.secondary.dark,
                                                        '&:hover': {
                                                            background: theme.palette.secondary.dark,
                                                            color: theme.palette.secondary.light
                                                        }
                                                    }}
                                                    color="inherit"
                                                >
                                                    <LocationOnIcon stroke={1.5} sx={{width:80,color:"white"}}/>
                                                </Avatar>

                                            </ListItemAvatar>

                                            <ListItemText primary={<Typography sx={{
                                                fontSize: 22,
                                                marginLeft: 1,
                                                fontFamily: 'arial'
                                            }}
                                                                               variant="subtitle1">Adresse</Typography>}
                                                          secondary={
                                                              <Typography sx={{
                                                                  fontSize: 16,
                                                                  fontFamily: 'arial',
                                                                  marginLeft: 1,
                                                              }}
                                                                          variant="subtitle1">{product.adresse}
                                                              </Typography>}/>


                                        </ListItem>
                                        <Divider/>
                                        <ListItem alignItems="center" sx={{marginTop:2}}>

                                            <ListItemAvatar>

                                                <Avatar
                                                    variant="rounded"
                                                    sx={{
                                                        width: 60,
                                                        height:50,
                                                        ...theme.typography.commonAvatar,
                                                        transition: 'all .2s ease-in-out',
                                                        background: grey[800],
                                                        color: theme.palette.secondary.dark,
                                                        '&:hover': {
                                                            background: theme.palette.secondary.dark,
                                                            color: theme.palette.secondary.light
                                                        }
                                                    }}
                                                    color="inherit"
                                                >
                                                    <CallIcon stroke={1.5} sx={{width:80,color:'white'}}/>
                                                </Avatar>

                                            </ListItemAvatar>

                                            <ListItemText primary={<Typography sx={{
                                                fontSize: 22,
                                                marginLeft: 1,
                                                fontFamily: 'arial'
                                            }}
                                                                               variant="subtitle1">Telephone</Typography>}
                                                          secondary={
                                                              <Typography sx={{
                                                                  fontSize: 16,
                                                                  fontFamily: 'arial',
                                                                  marginLeft: 1,
                                                              }}
                                                                          variant="subtitle1">{product.telephone}
                                                              </Typography>}/>


                                        </ListItem>

                                    </ListItemWrapper>

                                    <PerfectScrollbar style={{
                                        height: '100%',
                                        maxHeight: 'calc(100vh - 250px)',
                                        overflowX: 'hidden'
                                    }}>
                                        <Box sx={{p: 2}}>
                                            <List
                                                component="nav"
                                                sx={{
                                                    width: '100%',
                                                    maxWidth: 350,
                                                    minWidth: 300,
                                                    backgroundColor: theme.palette.background.paper,
                                                    borderRadius: '10px',
                                                    [theme.breakpoints.down('md')]: {
                                                        minWidth: '100%'
                                                    },
                                                    '& .MuiListItemButton-root': {
                                                        mt: 0.5
                                                    }
                                                }}
                                            >

                                                <ListItemButton
                                                    sx={{borderRadius: `${customization.borderRadius}px`}}
                                                    selected={selectedIndex === 0}
                                                    onClick={(event) => handleListItemClick(event, 0, '/user/account-profile/profile1')}
                                                >
                                                    <ListItemIcon>
                                                        <IconSettings stroke={1.5} size="2.3rem"/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography variant="body2" fontSize={18}>Parametre du
                                                        compte</Typography>}/>
                                                </ListItemButton>

                                                <ListItemButton
                                                    sx={{borderRadius: `${customization.borderRadius}px`}}
                                                    selected={selectedIndex === 4}
                                                    onClick={handleLogout}
                                                >
                                                    <ListItemIcon>
                                                        <IconLogout stroke={1.5} size="2.3rem"/>
                                                    </ListItemIcon>
                                                    <ListItemText primary={<Typography
                                                        variant="body2" fontSize={18}>Deconexion</Typography>}/>
                                                </ListItemButton>
                                            </List>
                                        </Box>
                                    </PerfectScrollbar>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
