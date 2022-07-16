import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Grid } from '@material-ui/core';
import Footer from "./Footer";

const Profile = () => {
    const [details, setDetails] = useState([]);

    useEffect((e) => {
        axios.post(`${process.env.REACT_APP_API_URL}/userProfiledetails`, {}, {
            headers: {
                'Authorization': `${localStorage.getItem("token")}`,
            }
        })
            .then((res) => {
                console.log(res.data);
                setDetails(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <Container maxWidth="md" style={{ minHeight: "50rem" }}>
                <h1 className="text-center mb-4">Welcome <b><em>{details.name}</em></b></h1>
                <h3 style={{ color: "blue" }} className="mb-4"><em>Registered Events</em></h3>
                <Grid container spacing={5} alignItems="flex-end">
                    {details.events?.map((item) => {
                        return (
                            <Grid item key={item.eventId} xs={12} md={4}>
                                <div class="card-sl">
                                    <div class="card-image">
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/admin/getimg/${item.eventId}`} alt='poster' />
                                    </div>
                                    <div class="card-heading">
                                        {item.eventId}
                                    </div>
                                    <a href={`/event/${item.eventId}`} class="card-button"> View</a>
                                </div>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default Profile;