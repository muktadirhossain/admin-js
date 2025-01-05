import React, { useEffect, useState } from 'react';
import { ApiClient, useTranslation } from 'adminjs';

const Dashboard = () => {
    const { translateLabel } = useTranslation();
    const [data, setData] = useState(null);
    const api = new ApiClient();

    useEffect(() => {
        // Fetch data from the custom dashboard handler
        api.getDashboard()
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching dashboard data:', error);
            });
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>{translateLabel('dashboard')}</h1>
            {data ? (
                <div>
                    <p>{data.message}</p>
                    {/* Add custom charts, stats, or other elements here */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
