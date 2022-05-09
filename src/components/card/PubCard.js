import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Link, useNavigate} from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {cyan, pink} from "@mui/material/colors";
import {createTheme, ThemeProvider} from "@mui/material";
import {Paid} from "@mui/icons-material";
import {useState} from "react";
import {useCart} from "react-use-cart";
import {useIsAuthenticated} from 'react-auth-kit'
import DoneIcon from "@mui/icons-material/Done";
import Box from "@mui/material/Box";
import ReactPlayer from "react-player";
export default function PubCard({products}) {
    const [c, setC] = useState(1);
    const {addItem, removeItem, inCart} = useCart();
    let navigate = useNavigate();
    const theme = createTheme();
    const auth=useIsAuthenticated()

    theme.typography.h3 = {
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '6.4rem',
        },
    };
    return (
        <Card sx={{
            borderRadius: '4%',
        }}
              bgcolor={"grey.900"}>

            <CardContent

                sx={{
bgcolor:"grey.900"
                }}
            >

                <ReactPlayer
                    playIcon={<Button variant={"contained"}>play</Button>}
                    playing
                    width={"100%"}
                    height={"100%"}
                    url={`https://allcine227.com/image/${products.videoName}`}/>
                <ThemeProvider theme={theme}>
                    <Typography component="h3" color={"white"}>
                        {products.nom}
                    </Typography>
                    <Box component="div" sx={{overflow: 'auto', color: 'white'}}>
                        {products.description}
                    </Box>
                </ThemeProvider>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: 1,
                        backgroundColor:inCart(products.id) ?"#1b5e20":"#006064",
                    }}
                    onClick={() => {
                        setC(c + 1)
                        if (auth()) {
                            if (c % 2 === 1) {
                                inCart(products.id) ? removeItem(products.id) : addItem({
                                    'nom': products.nom,
                                    'price':500,
                                    'id': products.id,
                                    'type':'pub'
                                })
                            } else {
                                removeItem(products.id)
                            }
                        } else {
                            navigate(`/login`)
                        }
                    }}
                >
                    <AddShoppingCartIcon
                        sx={{color: cyan[500]}}
                    />{inCart(products.id)?<DoneIcon/>: "Ajouter" }
                </Button>

            </CardActions>
        </Card>
    );
}
