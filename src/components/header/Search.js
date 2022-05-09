import React from 'react';
import {styled} from "@mui/material/styles";
import {alpha, InputBase} from "@mui/material";
import {useForm} from "react-hook-form";
import Box from "@mui/material/Box";


const Search = ({setsearch}) => {
    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.60),
        '&:hover': {
            backgroundColor: "white",
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
    const {register, handleSubmit} = useForm();
    const handleRegistration = (data) => setsearch(data.name);

    return (<Box sx={{

        marginBottom: 1,
        width: 300
    }}
    >
        <Search>

                <form onSubmit={handleSubmit(handleRegistration)}>
                    <StyledInputBase
                        placeholder="Reherche…"
                        inputProps={{'aria-label': 'Recherche'}}
                        name="name" {...register('name')}
                    />
                </form>

        </Search>
</Box>
    );
};

export default Search;
