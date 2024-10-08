import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const Location = () => {
    // Broadway Pizza branch locations
    const branches = [
        { name: "Broadway Pizza DHA Phase 5, Lahore", lat: 31.4622, lng: 74.4092 },
        { name: "Broadway Pizza Gulberg 3, Lahore", lat: 31.5204, lng: 74.3469 },
        { name: "Broadway Pizza Johar Town, Lahore", lat: 31.4722, lng: 74.2817 },
        { name: "Broadway Pizza Emporium Mall, Lahore", lat: 31.46798, lng: 74.2652 },
        { name: "Broadway Pizza Shadman, Lahore", lat: 31.5497, lng: 74.3357 },
        { name: "Broadway Pizza Bahria Town, Lahore", lat: 31.3654, lng: 74.2179 },
        { name: "Broadway Pizza Clifton, Karachi", lat: 24.8138, lng: 67.0299 },
        { name: "Broadway Pizza DHA Phase 2, Karachi", lat: 24.8216, lng: 67.0694 },
        { name: "Broadway Pizza Gulshan-e-Iqbal, Karachi", lat: 24.9212, lng: 67.1100 },
        { name: "Broadway Pizza North Nazimabad, Karachi", lat: 24.9401, lng: 67.0378 },
        { name: "Broadway Pizza Bahadurabad, Karachi", lat: 24.8899, lng: 67.0844 },
        { name: "Broadway Pizza Shaheed-e-Millat, Karachi", lat: 24.8652, lng: 67.0774 },
        { name: "Broadway Pizza F-10 Markaz, Islamabad", lat: 33.6957, lng: 73.0153 },
        { name: "Broadway Pizza Blue Area, Islamabad", lat: 33.7068, lng: 73.0577 },
        { name: "Broadway Pizza G-11 Markaz, Islamabad", lat: 33.6844, lng: 73.0497 },
        { name: "Broadway Saddar, Rawalpindi", lat: 33.5979, lng: 73.0473 },
        { name: "Broadway Peshawar Road, Rawalpindi", lat: 33.6164, lng: 73.0331 },
        { name: "Broadway D Ground, Faisalabad", lat: 31.4067, lng: 73.0869 },
        { name: "Broadway Jinnah Colony, Faisalabad", lat: 31.4203, lng: 73.0790 },
        { name: "Broadway Gulgasht Colony, Multan", lat: 30.2154, lng: 71.4674 },
        { name: "Broadway Cantt Area, Multan", lat: 30.1860, lng: 71.4840 },
        { name: "Broadway Citi Housing, Gujranwala", lat: 32.1595, lng: 74.1836 },
        { name: "Broadway Cantt Area, Sialkot", lat: 32.5060, lng: 74.5381 }
    ];

    const [userLocation, setUserLocation] = useState([40.759, -73.984]);  // Default location (NYC)
    const [nearestBranch, setNearestBranch] = useState(null);
    const mapRef = useRef(null);  // Store the map instance

    // Function to calculate the distance between two coordinates (Haversine formula)
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Earth radius in meters
        const φ1 = lat1 * Math.PI / 180;
        const φ2 = lat2 * Math.PI / 180;
        const Δφ = (lat2 - lat1) * Math.PI / 180;
        const Δλ = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // Function to find the nearest branch
    const findNearestBranch = (userLat, userLng) => {
        let nearestBranch = null;
        let minDistance = Infinity;
        branches.forEach(branch => {
            let distance = getDistance(userLat, userLng, branch.lat, branch.lng);
            if (distance < minDistance) {
                minDistance = distance;
                nearestBranch = branch;
            }
        });
        return nearestBranch;
    };

    // Initialize map and get user's location
    useEffect(() => {
        if (!mapRef.current) {
            const map = L.map('map').setView(userLocation, 13);
            mapRef.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            // Set default icon for markers
            const defaultIcon = L.icon({
                iconUrl: markerIcon,
                shadowUrl: markerShadow,
                iconSize: [25, 41],  // size of the icon
                iconAnchor: [12, 41],  // point of the icon which will correspond to marker's location
                popupAnchor: [1, -34],  // point from which the popup should open relative to the iconAnchor
                shadowSize: [41, 41]  // size of the shadow
            });

            // Update map with user's location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLat = position.coords.latitude;
                        const userLng = position.coords.longitude;
                        setUserLocation([userLat, userLng]);

                        // Update the map center and add marker for user's location
                        map.setView([userLat, userLng], 13);
                        L.marker([userLat, userLng], { icon: defaultIcon }).addTo(map)
                            .bindPopup("Your Location")
                            .openPopup();

                        // Find and mark the nearest Broadway Pizza branch
                        const nearest = findNearestBranch(userLat, userLng);
                        setNearestBranch(nearest);
                        if (nearest) {
                            L.marker([nearest.lat, nearest.lng], { icon: defaultIcon }).addTo(map)
                                .bindPopup(nearest.name)
                                .openPopup();
                        }
                    },
                    () => {
                        alert("Geolocation failed. Using default location.");
                    }
                );
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
    }, [userLocation]);

    return (
        <div>
            <h3>Nearest Broadway Pizza Locations</h3>
            <div id="map" style={{ height: "400px", width: "100%" }}></div>
        </div>
    );
};

export default Location;
