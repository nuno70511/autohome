const idNotFoundError = (resource) => {
    return {
        status: 404,
        title: `${capitalize(resource)} not found`,
        detail: `Param '${lowercase(resource)}Id' is incorrect, or it no longer exists`
    }
}

const resourceNotFoundError = (resource) => {
    return {
        status: 404,
        title: `${capitalize(resource)} not found`,
        detail: `'${capitalize(resource)}' is incorrect, or it no longer exists`
    }
}

const conflictError = (resource, field) => {
    return {
        status: 409,
        title: `${capitalize(resource)} conflicts with an existing resource`,
        detail: `Unique field '${field}' is already in use`
    }
}

const authorizationError = () => {
    return {
        status: 401,
        title: `Authentication fail`,
        detail: `The email or password are invalid`
    }
}

module.exports = {
    idNotFoundError,
    resourceNotFoundError,
    conflictError,
    authorizationError
};

const capitalize = str => str[0].toUpperCase() + str.substring(1, str.length).toLowerCase();
const lowercase = str => str.toLowerCase();