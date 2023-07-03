import React, { useState, useEffect, useContext } from 'react';
import axiosInstance from '../axios';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { ActivityContext, ActivityProvider } from '../utils/ActivityContext';
import { useNavigate } from 'react-router-dom';

import "./Dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Getactivities = () => {

    const navigate = useNavigate();
    const { setActivity } = useContext(ActivityContext);
    const [activities, setActivities] = useState([]);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const handleDelete = (activity) => {
        setSelectedActivity(activity);
        setDeleteConfirmationOpen(true);
    };

    const handleUpdate = (activity) => {
        setActivity(activity);
        navigate('/updateActivity');
        console.log(activity)
    };

    const handleView = (activity) => {
        setActivity(activity);
        navigate('/viewactivity');
        console.log(activity)
    };

    const confirmDelete = () => {
        if (selectedActivity) {
            axiosInstance
                .post(`activite/delete/${selectedActivity.id}/`)
                .then((response) => {
                    console.log(response.data);  // Log the success message if needed
                    setActivities(activities.filter((activity) => activity.id !== selectedActivity.id));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setDeleteConfirmationOpen(false);
    };

    const cancelDelete = () => {
        setDeleteConfirmationOpen(false);
        setSelectedActivity(null);
    };


    useEffect(() => {
        // Fetch activities data from the backend
        axiosInstance
            .get(`activite/get/`)
            .then((response) => {
                setActivities(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <table class="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Activité pédagogique</th>
                    <th>Niveau</th>
                    <th>Leçon</th>
                    <th>Date de création</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map((activity) => (
                        <tr key={activity.id}>
                            <td>{activity.name}</td>
                            <td>{activity.subject}</td>
                            <td>{activity.lesson}</td>
                            <td>{activity.level}</td>
                            
                            <td>
                                <a href="#" class="view" title="View" data-toggle="tooltip" onClick={() => handleView(activity.id)} style={{ color: "#0BA7AA" }}><i class="material-icons">&#xE417;</i></a>
                                <a href="#" className="edit" title="Edit" data-toggle="tooltip" onClick={() => handleUpdate(activity.id)}>
                                    <i className="material-icons">&#xE254;</i>
                                </a>
                                <a href="#" class="delete" title="Delete" data-toggle="tooltip" style={{ color: "red" }} onClick={() => handleDelete(activity.id)}><i class="material-icons">&#xE872;</i></a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dialog
                open={deleteConfirmationOpen}
                onClose={cancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this activity?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Getactivities;
