const idNotFoundError = (resource) => {
    return {
        status: 404,
        title: `${capitalize(resource)} not found`,
        detail: `Param '${lowercase(resource)}Id' is incorrect, or it no longer exists`
    }
}

const conflictError = (resourceName, field) => {
    return {
        status: 409,
        title: `${capitalize(resourceName)} conflicts with an existing resource`,
        detail: `Unique field '${lowercase(field)}' is already in use`
    }
}

module.exports = {
    idNotFoundError,
    conflictError
};

const capitalize = str => str[0].toUpperCase() + str.substring(1, str.length).toLowerCase();
const lowercase = str => str.toLowerCase();