import {useState, useRef, useEffect} from 'react';
import {Link} from 'react-router-dom';

// material-ui
import {styled, useTheme} from '@mui/material/styles';
import {
    Avatar, Badge,
    Box,
    Button,
    ButtonBase,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid, List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


// assets
import {IconBell, IconBrandTelegram} from '@tabler/icons';
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import axios from "axios";
import {useCart} from "react-use-cart";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {Alert, AlertTitle} from "@mui/lab";

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

// notification status options
// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleChange = (event) => {
        if (event?.target.value) setValue(event?.target.value);
    };

    const auth = useAuthUser()
    const authHeader = useAuthHeader()


    const [aalert, setAlert] = useState(false)
    const [c, setC] = useState(0);
    const url = `https://admin.allcine227.com/api/commandes`
    const token = localStorage.getItem('token')
    const headers = {
        'authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    const onSubmit = (e) => {
        e.preventDefault()
        axios
            .post(
                url,
                {"panier": {items, cartTotal}},
                {headers: headers}
            )
            .then((res) => {
                if (res.status === 201) {
                    emptyCart()
                    setAlert(true)
                    setTimeout(() => {
                        setAlert(false)
                    }, 5000);
                } else {

                }
            }).catch(
            function () {

            })
    }
    const nb = (type) => {
        return Math.floor(items.reduce((acc, arr) => acc + (arr.type === type ? 1 : 0), 0) / 5) * 500
    }

    const StyledBadge = styled(Badge)(({theme}) => ({
        '& .MuiBadge-badge': {
            top: 5,
            border: `1px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));
    const {
        emptyCart,
        isEmpty,
        totalUniqueItems,
        items,
        updateItemQuantity,
        removeItem,
        cartTotal,
    } = useCart();

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{borderRadius: '12px'}}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light
                            }
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <ShoppingCartIcon stroke={1.5} size="1.3rem"/>
                        <IconBell/>
                    </Avatar>
                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
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
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({TransitionProps}) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={true} elevation={20} content={false} boxShadow
                                          shadow={theme.shadows[16]}>
                                    {isEmpty? <Box component="div" sx={{overflow: 'auto', fontSize: 22, marginBottom:2,marginTop:1}}>
                                    {aalert ?<Alert variant="filled" severity="success">
                                        <AlertTitle>Panier Envoyez avez succès</AlertTitle>
                                        Vous recevrais votre commande le plus vite possible
                                    </Alert>:null}
                                    Votre panier est vide
                                </Box>:
                                    <>
                                    <CardActions sx={{p: 1.25, justifyContent: 'center'}}>
                                        <Button variant="contained" onClick={onSubmit} disableElevation
                                                endIcon={<IconBrandTelegram stroke={1.5} size="1.3rem"/>}>
                                            Envoyer la commande
                                        </Button>
                                    </CardActions>
                                    <Grid container direction="column" spacing={2}>

                                        <Grid item xs={12}>
                                            <PerfectScrollbar
                                                style={{
                                                    height: '100%',
                                                    maxHeight: 'calc(100vh - 205px)',
                                                    overflowX: 'hidden'
                                                }}
                                            >
                                                <List
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 330,
                                                        py: 0,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            maxWidth: 300
                                                        },
                                                        '& .MuiListItemSecondaryAction-root': {
                                                            top: 22
                                                        },
                                                        '& .MuiDivider-root': {
                                                            my: 0
                                                        },
                                                        '& .list-container': {
                                                            pl: 7
                                                        }
                                                    }}
                                                >
                                                    <Grid container spacing={{xs: 1, md: 1}}
                                                          columns={{xs: 12, sm: 12, md: 12}} alignContent={"center"}
                                                          justifyContent={'center'}>
                                                        <Grid item xs={12} sm={6} md={12}>
                                                            <Box component="div"
                                                                 sx={{
                                                                     overflow: 'auto',
                                                                     color: "black",
                                                                     fontSize: 22,
                                                                     marginBottom: 2,
                                                                     marginTop: 2
                                                                 }}>
                                                                Prix Total {cartTotal} CFA
                                                            </Box>
                                                        </Grid>
                                                    </Grid>

                                                    {items.map((item) => (
                                                        <ListItemWrapper>
                                                                <ListItem alignItems="center">

                                                                    <ListItemAvatar>

                                                                        <StyledBadge badgeContent={item.quantity}
                                                                                     color="secondary">
                                                                            <ShoppingCartIcon stroke={1.5}
                                                                                              size="1.3rem"/>
                                                                        </StyledBadge>

                                                                    </ListItemAvatar>

                                                                    <ListItemText primary={<Typography
                                                                        variant="subtitle1">{item.nom}</Typography>}/>
                                                                    <ListItemSecondaryAction>
                                                                        <Grid container justifyContent="flex-end">
                                                                            <Grid item xs={12} marginLeft={5}>
                                                                                <>
                                                                                    <RemoveIcon
                                                                                        onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                                                        sx={{
                                                                                            color: "blue",
                                                                                            borderRadius: 3
                                                                                        }}/>
                                                                                    <AddIcon
                                                                                        onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                                                        sx={{
                                                                                            color: "blue",
                                                                                            borderRadius: 3
                                                                                        }}/>
                                                                                    <DeleteIcon
                                                                                        onClick={() => removeItem(item.id)}
                                                                                        sx={{
                                                                                            color: "red",
                                                                                            borderRadius: 3
                                                                                        }}/>
                                                                                </>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </ListItemSecondaryAction>
                                                            </ListItem>
                                                            <Grid container direction="column"
                                                                  className="list-container">
                                                                <Grid item xs={12} sx={{pb: 2}}>
                                                                    <Typography
                                                                        variant="subtitle2"> {item.type + ':' + item.price + " CFA"}.</Typography>
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <Grid container>
                                                                        <Grid item>

                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </ListItemWrapper>
                                                    ))}
                                                    <Divider/>


                                                </List> </PerfectScrollbar>
                                        </Grid>
                                    </Grid></>}
                                    <Divider/>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;
