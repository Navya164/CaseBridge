import axios from 'axios';

export const getUserPermissions = async () => {

    const userId =
        localStorage.getItem('userId');

    const response =
        await axios.get(
            `http://localhost:8080/api/permissions/user/${userId}`
        );

    return response.data;
};

export const hasPermission = (
    permissions,
    permissionName
) => {

    return permissions.includes(
        permissionName
    );
};