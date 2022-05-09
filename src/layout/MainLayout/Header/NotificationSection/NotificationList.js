// material-ui
import {useTheme, styled} from '@mui/material/styles';
import {
    Avatar,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';

// assets
import {IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto} from '@tabler/icons';
import {useCart} from "react-use-cart";
import axios from "axios";
import {useAuthHeader, useAuthUser} from "react-auth-kit";
import {Alert, AlertTitle, Badge,} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {orange} from "@mui/material/colors";
import {useState} from "react";
// styles
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

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
    const theme = useTheme();

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        marginRight: '5px'
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
    console.log(auth)
    console.log(authHeader)

    const onSubmit = (e) => {
        e.preventDefault()
        axios.all([
            axios.post(
                url,
                {"panier": {items, cartTotal}},
                {headers: headers}
            ),
            axios.put()
        ])

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
    if (isEmpty) return <Box component="div"
                             sx={{overflow: 'auto', color: orange[900], fontSize: 22, marginBottom: 2, marginTop: 2}}>
        {aalert ? <Alert variant="filled" severity="success">
            <AlertTitle>Panier Envoyez avez succès</AlertTitle>
            Vous recevrais votre commande le plus vite possible
        </Alert> : null}
        Votre panier est vide
    </Box>;


    return (
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
            <Grid container spacing={{xs: 1, md: 1}} columns={{xs: 12, sm: 12, md: 12}} alignContent={"center"}
                  justifyContent={'center'}>
                <Grid item xs={12} sm={6} md={12}>
                    <Box component="div"
                         sx={{overflow: 'auto', color: "black", fontSize: 22, marginBottom: 2, marginTop: 2}}>
                        Prix Total {cartTotal} CFA
                    </Box>
                </Grid>
            </Grid>

            {items.map((item) => (
                <ListItemWrapper>
                    <ListItem alignItems="center">

                        <ListItemAvatar>
                            <Avatar
                                sx={{
                                    color: theme.palette.success.dark,
                                    backgroundColor: theme.palette.success.light,
                                    border: 'none',
                                    borderColor: theme.palette.success.main
                                }}
                            >
                                <StyledBadge badgeContent={item.quantity} color="secondary">
                                <ShoppingCartIcon stroke={1.5} size="1.3rem"/>
                                </StyledBadge>
                            </Avatar>

                        </ListItemAvatar>

                        <ListItemText primary={<Typography variant="subtitle1">{item.nom}</Typography>}/>
                        <ListItemSecondaryAction>
                            <Grid container justifyContent="flex-end">
                                <Grid item xs={12} marginLeft={5}>
                                    <Chip label={
                                        <>
                                            <RemoveIcon onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                                        sx={{color: "blue", borderRadius: 3}}/>
                                            <AddIcon onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                                                     sx={{color: "blue", borderRadius: 3}}/>
                                            <DeleteIcon onClick={() => removeItem(item.id)}
                                                        sx={{color: "red", borderRadius: 3}}/>
                                        </>
                                    } sx={chipErrorSX}/>
                                </Grid>
                            </Grid>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Grid container direction="column" className="list-container">
                        <Grid item xs={12} sx={{pb: 2}}>
                            <Typography variant="subtitle2"> {item.type + ':' + item.price + " CFA"}.</Typography>
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



        </List>
);
};

export default NotificationList;
