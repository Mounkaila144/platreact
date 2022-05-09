import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Grid, Pagination} from "@mui/material";
import Search from "../../components/header/Search";
import ArticleCard from "../../components/card/article";

const Materiel = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [product, setProduct] = useState([]);
    const [pagecount, setpagecount] = useState(0);
    const [page, setPage] = React.useState(1);


    const url=`https://admin.allcine227.com/api/articles.json?page=${page}`
    const getData =async () => {
        axios
            .get(url,{
                headers:{
                    "name":"",
                    "password":""
                }
            })
            .then(
                (res) => {
                    setIsLoaded(true);
                    setProduct(res.data);
                    setpagecount(50)

                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        getData()
        window.scrollTo(0, 0);
    }, [page])

    const handleChange = (event, value) => {
        setPage(value);
    }
        return (
            <>
                <Grid container spacing={{xs: 1, md: 1}} columns={{xs: 12, sm: 12, md: 12}}>
                    <Grid item xs={12} sm={12} md={6} width={4}>

                        <Search/>

                    </Grid>
                </Grid>
                <Grid container spacing={{xs: 1, md: 1}} columns={{xs: 12, sm: 12, md: 12}}>
                    {product.map((products) => (
                        <Grid item xs={12} sm={6} md={4}>
                                <ArticleCard sx={{boxShadow: 6,}}
                                              products={products}
                                />
                        </Grid>

                    ))}
                </Grid>



            </>
    )

};

export default Materiel;
