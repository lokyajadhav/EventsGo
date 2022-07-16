import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Container, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Poster from './Home/Poster';
import Settings from './Home/Event_card_settings';
import SettingsMD from './Home/Event_card_settings_MD';
import SettingSM from './Home/Event_card_settings_Sm';
import Slider from 'react-slick';
import { BiChevronsRight } from 'react-icons/bi';
import React from 'react';

import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple } from 'mdb-react-ui-kit';

import './posts.css';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const Posts = ({ posts, loading }) => {
    const classes = useStyles();

    const [fileName, setFileName] = useState("");

    useEffect(() => {
    }, [loading])
    if (loading) {
        return <h2>Loading...</h2>
    }
    console.log("posts", posts)

    return (
        <>
            <Container maxWidth="md" style={{ minHeight: "50rem" }}>
                <Grid container spacing={5} alignItems="flex-end">
                    {posts?.map((post) => {
                        return (
                            <Grid item key={post.eventId} xs={12} md={4}>
                                <div class="card-sl">
                                    <div class="card-image">
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/admin/getimg/${post.eventId}`} alt='poster' />
                                    </div>
                                    <div class="card-heading">
                                        {post.title}
                                    </div>
                                    {/* <div class="card-text">
                                        {post.description}
                                    </div> */}
                                    <div class="card-text">
                                        {post.date.slice(0, 10)}
                                    </div>
                                    <a href={`/event/${post.eventId}`} class="card-button"> View</a>
                                </div>
                                {/* <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={`${process.env.REACT_APP_API_URL}/admin/getimg/${post.eventId}`}
                                            title="title name"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" className="text-truncate" >
                                                {post.title}
                                            </Typography>
                                            <div className="d-flex flex-row text-truncate">
                                                <label>Panel:</label>
                                                {post.organizedBy}
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Link to={`/event/${post.eventId}`} className="btn btn-light">View</Link>
                                    </CardActions>
                                </Card> */}
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </>
    );
};
export default Posts;
