import * as React from 'react';
import Box from '@mui/material/Box';
import Header from "../components/header/index";
import {Grid, Pagination} from "@mui/material";
import * as PropTypes from "prop-types";
import {green, grey, indigo} from "@mui/material/colors";
import {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";

import axios from "axios";
import ProductCard from "../components/card/ProductCard";
import HeaderPhone from "../components/header/App";


function Item(props) {
    return null;
}

Item.propTypes = {
    elevation: PropTypes.number,
    props: PropTypes.node
};


export default function Home(props) {

    return (
        <Box
            sx={{
                bgcolor:indigo[900],
                width: '100%',
                '& > .MuiBox-root > .MuiBox-root': {
                    p: 1,
                    borderRadius: 2,
                    fontSize: '0.875rem',
                    fontWeight: '700',
                },
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `"header header header header"
        "main main main main"`,
                }}
            >
                <Box sx={{gridArea: 'header'}}>{props.top}</Box>
                <Box
                    sx={{
                        bgcolor: indigo[900],
                        marginTop:7,
                        gridArea: 'main'

                    }}
                >
                    {props.left}
                </Box>

            </Box>
        </Box>
    );
}
